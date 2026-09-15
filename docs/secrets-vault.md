# Using Vault/OpenBao as a secret backend

By default, Warpgate stores target credentials and its own SSH host/client keys directly in its database and config file, unencrypted. If your team already runs [HashiCorp Vault](https://developer.hashicorp.com/vault) or [OpenBao](https://openbao.org/), you can instead point Warpgate at it and have secrets resolved from there at connection time, instead of duplicating them into a second, separately-managed store.

Under the hood this is a pluggable **secret backend** abstraction: the built-in database/config storage is just the default backend, and Vault/OpenBao is a second backend you can configure alongside (or instead of) it, per credential field. Vault and OpenBao share the same HTTP API, so both are handled by the same backend implementation.

Only the **KV v2 secret engine** is supported currently.

## Why use a secret backend

**Easier secret rotation.** Without a secret backend, rotating a password or SSH key that a target uses means updating it both upstream *and* in Warpgate. With a Vault/OpenBao reference, the secret is rotated in one place and Warpgate simply picks up the new value the next time it opens a connection to the target. No Warpgate config change, no restart.

**Stronger, audited storage.** Vault/OpenBao provide hardened, access-controlled storage with their own audit logging, fine-grained policies, and (depending on setup) auto-unseal. Delegating storage to them is generally a stronger posture than Warpgate keeping an unencrypted copy of the same secret in its own database, and it lets your security team apply the same policies and monitoring they already use for everything else.

**Sharing one secret across multiple targets.** Many targets in practice share credentials (e.g. the same service account across a fleet of hosts). Stored inline, that means N separate copies in Warpgate, and rotation means N separate updates (with drift between them failing silently). Point every target at the *same* `vault://backend/mount/path#field` reference instead, and they rotate together atomically the moment the one underlying secret changes. The admin UI's "Used by N targets" indicator (see below) exists specifically to make this sharing visible before you edit or rotate a shared reference.

**Secure storage and rotation of Warpgate's own SSH keys.** Warpgate's own private keys (the host keys it presents to clients, and the client keys it uses to connect to upstream SSH targets) are sensitive, long-lived material. Storing them in Vault/OpenBao instead of on disk makes rotating them straightforward rather than a manual, error-prone operation (see [Storing Warpgate's own SSH host/client keys](#storing-warpgates-own-ssh-hostclient-keys-in-vaultopenbao) below).

## How it works

* You configure one or more named backends under `secrets.backends` in `warpgate.yaml`.
* Credential fields (e.g. a target's password) can hold either an inline value (existing behavior, unchanged) or a **reference**, stored internally in the form:

  ```
  vault://<backend-name>/<mount>/<kv-path>#<field>
  ```

  or the equivalent `openbao://` scheme. For example:

  ```
  vault://vault-prod/secret/prod/myapp#password
  ```

  This points at the `password` field of the KV v2 secret at `secret/prod/myapp` (mount `secret`, path `prod/myapp`), resolved through the backend named `vault-prod`. In the admin UI you don't type the combined string at all. Instead, you fill in three separate fields (**Secret backend**, **Secret path**, **Key**, see [Referencing a secret from a target](#referencing-a-secret-from-a-target) below) and the UI assembles the reference for you.
  
* The value is fetched fresh from Vault/OpenBao whenever Warpgate opens a connection to the target. It is never persisted to Warpgate's own database or config file.
* Any inline value that happens to start with `vault://` or `openbao://` is always interpreted as a reference, not a literal password. Avoid inline secrets that start with those prefixes.

## Configuration

```yaml
secrets:
  backends:
    - name: vault-prod
      type: vault           # or "openbao"
      address: https://vault.internal:8200
      namespace: warpgate    # optional
      auth:
        method: app_role
        role_id_file: /run/secrets/role_id
        secret_id_file: /run/secrets/secret_id
        mount: approle       # optional, default shown
      tls:
        ca_cert: /etc/vault-ca.pem
        skip_verify: false
```

`name` is the identifier used in `vault://<name>/...` references — it must be unique and must not contain a `/`.

!!! note
    Warpgate watches `warpgate.yaml` and reloads it automatically on save. Adding, removing, or editing a backend under `secrets.backends` takes effect immediately — no restart required.

### Authentication methods

* **`token`** — a static token. Simple, but the token doesn't rotate on its own; prefer this only for local testing. See [Vault Docs](https://developer.hashicorp.com/vault/docs/auth/token) or [OpenBao Docs](https://openbao.org/docs/auth/token/).

  ```yaml
  auth:
    method: token
    token: hvs.xxxxxxxx
  ```

* **`app_role`** — `role_id` and `secret_id` are read from files at runtime (not embedded in `warpgate.yaml`), so
  they can be delivered via your secrets-injection mechanism of choice (e.g. a mounted Kubernetes secret). See [Vault Docs](https://developer.hashicorp.com/vault/docs/auth/approle) or [OpenBao Docs](https://openbao.org/docs/auth/approle/).

  ```yaml
  auth:
    method: app_role
    role_id_file: /run/secrets/role_id
    secret_id_file: /run/secrets/secret_id
    mount: approle   # optional, default "approle"
  ```

* **`kubernetes`** — Vault [Kubernetes auth](https://developer.hashicorp.com/vault/docs/auth/kubernetes), using the pod's own service-account JWT. This is the standard method when running Warpgate via the Helm chart or Kubernetes operator. See [Vault Docs](https://developer.hashicorp.com/vault/docs/auth/kubernetes) or [OpenBao Docs](https://openbao.org/docs/auth/kubernetes/).

  ```yaml
  auth:
    method: kubernetes
    role: warpgate
    jwt_path: /var/run/secrets/kubernetes.io/serviceaccount/token  # optional, default shown
    mount: kubernetes   # optional, default "kubernetes"
  ```

For AppRole and Kubernetes auth, Warpgate renews the login in the background ahead of the token's lease expiry, so long-running gateways don't need to be restarted as tokens rotate. If Vault/OpenBao is briefly unreachable (at startup or later) Warpgate logs a warning and keeps retrying rather than failing to boot. Any target not using that backend keeps working normally in the meantime.

### Referencing a secret from a target

In the admin UI, open a target's credentials field (e.g. an SSH target's password) and switch it to reference mode **Password from Vault / OpenBao** under Authenticate using. You'll need:

* **Secret backend:** one of the names configured under `secrets.backends`.
* **Secret path:** the KV mount and path, exactly as you'd pass to `vault kv get`, e.g. `secret/prod/myapp` (do **not** include the `data/` segment Vault's HTTP API adds internally).
* **Key:** the field name inside that secret, e.g. `password`.

A "Test retrieval" button lets you confirm the reference resolves before saving. It only reports success/failure, it never displays the retrieved value. If more than one target shares the same reference, the UI shows "Used by N targets" so you know the blast radius before editing or rotating it.

To share one secret across a fleet of targets, give every target the exact same reference (e.g. a shared service-account password used by ten hosts) is one KV path in Vault/OpenBao, and ten targets each pointing `password:` at `vault://vault-prod/secret/prod/fleet-svc-account#password`. Rotate the secret once in Vault/OpenBao and all ten pick it up on their next connection.


### Storing Warpgate's own SSH host/client keys in Vault/OpenBao

Warpgate's SSH host and client keys can also live in a secret backend instead of on disk:

```yaml
ssh:
  keys:
    backend: vault-prod
    path: secret/warpgate/ssh-keys
```

On first start, Warpgate checks if SSH host and client keys already exist under this path. Host and client keys are generated independently, each as an Ed25519 and an RSA key pair, so four keys end up at that one KV path: `host-ed25519`, `host-rsa`, `client-ed25519`, `client-rsa`. Any of the four that's missing is generated and written back; any that already exists is left alone. On subsequent starts they're read back. They are kept in memory only and never written to disk in this mode.

### Monitoring backend health

The admin UI's **Config → Secret Backends** page lists every configured backend together with a live health check (Vault's `/sys/health` status) and lets you re-check a single backend on demand.

## Security considerations

### What happens if Vault/OpenBao becomes unreachable?

* **Already-open sessions are unaffected.** A secret is only resolved when Warpgate opens a *new* connection to a target; it is not re-fetched for the lifetime of an existing session.
* **New connections to targets using a Vault/OpenBao reference will fail** with a clear error once any cached authentication has expired, until Vault/OpenBao is reachable again. Targets using inline credentials, or a different (reachable) backend, are unaffected. A single backend outage does not bring down the rest of the gateway.
* **Warpgate itself still boots even if Vault/OpenBao is down at startup**, including when its own SSH host/client keys are backend-managed. A background task and a one-shot retry-on-use keep trying to re-authenticate, so service resumes automatically as soon as Vault/OpenBao comes back, with no restart required.

!!! note
    There is **no local fallback cache** of previously-resolved secrets. By design a revoked or rotated secret in Vault/OpenBao takes effect immediately rather than being masked by a stale copy. Plan Vault/OpenBao's own availability (HA mode, multiple nodes) accordingly if secret resolution is on the critical path for connecting to a target.

### Logging

* Every resolve and store attempt (success **and** failure) is written to the audit log (`SecretResolved` / `SecretStored` events), with the backend name and the reference locator (`scheme://backend/path#field`).


### What permissions does Warpgate need in Vault/OpenBao?

Warpgate only ever talks to the **KV v2** engine, and only within the mount(s)/paths you reference. Grant the narrowest policy that covers those paths.

* Read-only access is sufficient for target credentials that are provisioned externally (the common case).
* Read **and** write access is only needed for paths where Warpgate itself generates and persists a value. Currently, its own SSH host/client keys when `ssh.keys` is backend-managed. Target credentials are always read-only from Warpgate's perspective. It never writes back a rotated or generated target password.
* For AppRole/Kubernetes auth, the background renewal task re-authenticates via a fresh login rather than renewing the existing token, so no extra token-renewal permission (e.g. `auth/token/renew-self`) is required — just the ability to log in via the AppRole/Kubernetes auth mount, which any role/ServiceAccount bound to it already has.

!!! warning
    Do not hand Warpgate a root or admin token.

### Recommended policies

Scope a policy per environment/mount rather than granting blanket `secret/*` access. For example, a policy for a backend that only resolves target credentials read-only under `secret/prod/*`:

```hcl
# read-only-targets.hcl
path "secret/data/prod/*" {
  capabilities = ["read"]
}
```

If the same backend also stores Warpgate's own SSH host/client keys at `secret/warpgate/ssh-keys`, add narrowly-scoped read+write (but not `delete` or `destroy`) on that one path:

```hcl
path "secret/data/warpgate/ssh-keys" {
  capabilities = ["create", "read", "update"]
}
```

Notes:

* These policies grant nothing on `secret/metadata/*`. Warpgate itself never calls the metadata endpoint or lists paths — a KV v2 read of `secret/data/...` already returns the version needed for its check-and-set writes. Add `list`/`read` on the matching `secret/metadata/*` path yourself only if you also want to browse or inspect these secrets with the `vault kv` CLI or the Vault UI.
* Warpgate's KV v2 writes use check-and-set (`cas`): `create` covers the very first write to a path that doesn't exist yet, and `update` covers every write after that (including the read-modify-write Warpgate does when only one of several fields at a path changes).
* Deliberately omit `delete`, `destroy`, and `patch` unless you have a specific reason to grant them. Warpgate does not need them, and withholding them limits the damage a leaked token can
  do.
* If you use AppRole, bind the policy to the AppRole role (`vault write auth/approle/role/<role> token_policies=...`) and set a sensible `secret_id_ttl` / `token_ttl`. Warpgate renews well ahead of expiry (at 75% of the lease), but a very short TTL still means more frequent round-trips to Vault.
* If you use Kubernetes auth, scope the Vault role's `bound_service_account_names` / `bound_service_account_namespaces` to the specific ServiceAccount Warpgate runs as, not a wildcard.
* Put each environment (prod/staging/…) or each tenant, if you run multi-tenant behind its own backend `name` and its own Vault policy/token, rather than one shared token scoped to everything. This both limits blast radius and keeps the audit log's `backend` field meaningful.