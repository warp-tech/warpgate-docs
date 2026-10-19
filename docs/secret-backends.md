---
title: Vault / OpenBao
description: Fetch target passwords, SSH keys and Kubernetes tokens from HashiCorp Vault or OpenBao at connection time instead of storing them in Warpgate, or have them sign a short-lived SSH certificate per connection.
---

# Secret backends

<div class="badge font-xs text-bg-warning mb-3">v0.30+</div>

Instead of storing target credentials in its own database, Warpgate can fetch them from **HashiCorp Vault** compatible secret stores (e.g. **OpenBao**) when a session is opened. Warpgate stores only a *reference* to the secret in its configuration. The value is read from the backend at connection time and never saved or shown.

A backend's SSH secrets engine can also [sign SSH certificates](targets/ssh.md#ssh-certificates-signed-by-vault-openbao), so that the target SSH server can trust a CA instead of a stored service account credential.

Backends are managed under `Config` > `Secret backends`. 

## Connecting a backend

A backend is a Vault or OpenBao address plus credentials:

* **Token** - a static token. Warpgate will renew it as long as it's renewable, but cannot replace it once it expires.
* **AppRole** - role ID and secret ID. Warpgate logs in again on its own when the token expires.
* **Kubernetes** - the pod's service account token is exchanged for a Vault token through the given role. On Helm or Kubernetes deployments this means no Vault credential is stored in Warpgate at all.

Vault Enterprise and OpenBao namespaces are supported. Secret references can only read **KV version 2** secrets engines.

`Allowed path prefixes` limits the prefixes that may be referenced: `[mount]/[path]` for secret references and `[mount]/sign/[role]` for [SSH certificate signing](targets/ssh.md#ssh-certificates-signed-by-vault-openbao). If left empty, anything is allowed.

## Referencing a secret

To use a referenced secret for a target login, click `Use secret backend` next to the password or PK field and choose the backend, secret path and field.

References work for:

* SSH, RDP, VNC, MySQL and PostgreSQL target passwords
* Kubernetes bearer tokens and client-certificate private keys
* Warpgate's own SSH client keys: under `Config` > `SSH keys`, a key can be added by reference instead of pasting it. The referenced field holds the private key in OpenSSH or PKCS#8 PEM format without a passphrase.

## Secret resolution

* The secret is loaded from the backend for every new session and is not stored. Kubernetes targets reuse their upstream API clients for up to 5 minutes.
* Every secret read is logged as a `SecretResolved` audit event, and every certificate request as `SshCertificateIssued`.

## Encryption at rest

The backend's own auth credentials (token or AppRole secret ID) are stored in Warpgate's database and are covered by [encryption at rest](encryption.md). References are not secret and are stored as-is.

### Up next

* [Encrypting credentials at rest](encryption.md)
* [Running a cluster](clustering.md)
