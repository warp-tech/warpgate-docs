# User authentication and roles

In the [previous example](./targets/ssh.md), we've reused the Warpgate's `admin` user, which only had a password as its only way to authenticate. Warpgate supports passwords, public keys, authenticator apps, SSO (OIDC), API tokens and combinations thereof as authentication methods.

## Changing a user's password

Log into the Warpgate admin UI and navigate to `Config` > `Users` > `admin`, delete the old password and click `Add password` to add a new one.

![](images/editing-password.png)
/// caption
Adding a password
///

Users can also manage their own password by clicking their username in the top right corner. This can be globally disabled via `Config` > `Global parameter`.

## Adding a public key for a user

* Grab the user's public key in OpenSSH format (normally, you can just copy the `~/.ssh/id_<type>.pub` file contents), e.g.:

```text
ssh-ed25519 AAAAC...bD4I user@host
```

* Click `Add public key` and paste it:

![](images/editing-pk.png)
/// caption
Adding a public key
///

## Adding a client certificate for a user

<div class="badge font-xs text-bg-warning mb-3">v0.22+</div>

Warpgate supports client certificates for authentication, which is especially useful for the [Kubernetes target](./targets/kubernetes.md).

*   Click `Add certificate` and upload your PEM-formatted client certificate:

![](images/editing-cert.png)
/// caption
Adding a client certificate
///

Users can then authenticate by presenting this certificate during the TLS handshake.

## Requiring multiple authentication factors

Warpgate can require a client to present both a public key and a password.

* In the `Auth policy` > `SSH` section, uncheck `Any credential` and select both `Password` and `Key`:

![](images/mfa-policy.png)
/// caption
Setting up a multifactor auth policy
///

## SSH client authentication methods

<div class="badge font-xs text-bg-warning mb-3">v0.20+</div>

Warpgate allows you to configure which SSH client authentication methods are accepted when users connect to Warpgate. By default, all three methods are enabled:

- **Public key** - SSH key-based authentication
- **Password** - Password authentication
- **Keyboard-interactive** - Challenge-response authentication (e.g., RSA SecurID, PAM)

To configure these settings:

1. In the admin UI, navigate to `Config` > `Global parameters` > `Auth policy` > `SSH`
2. Toggle the authentication methods you want to allow or disallow

### Example: Restricting to public key only

If you want users to only authenticate using SSH keys (for better security), disable both `Password` and `Keyboard-interactive`:

```yaml
# Config example (via API)
ssh_client_auth_publickey: true
ssh_client_auth_password: false
ssh_client_auth_keyboard_interactive: false
```

This is useful in environments where:
- You want to enforce key-based authentication for all users
- You have compliance requirements that mandate SSH keys
- You want to disable password-based access entirely

### Example: Allowing password fallback

If you want to allow passwords as a fallback but prefer keys:

```yaml
# Config example (via API)
ssh_client_auth_publickey: true
ssh_client_auth_password: true
ssh_client_auth_keyboard_interactive: false
```

## Using roles to assign access

You can use _roles_ to grant a new user access to multiple targets at once (or assign multiple users to a target).

* Create and remove roles under `Config` > `Roles`.
* Assign roles to users and targets on their respective configuration pages.

## API Tokens

<div class="badge font-xs text-bg-warning mb-3">v0.13+</div>

Warpgate supports API tokens for programmatic access. Users can create and manage their own API tokens through the web interface.

### Creating an API Token

1. Log into the Warpgate web interface
2. Click your username in the top right corner
3. Navigate to the "API Tokens" section
4. Click "Create Token"
5. Give it a label (e.g., "CI/CD Pipeline")
6. Optionally set an expiry date
7. Click "Create"

### Important: Save the Secret

When you create a token, **the secret is only shown once**. Make sure to copy and save it immediately - you won't be able to see it again.

The secret will look like this:

```
wg_sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Using API Tokens

Use the token in the `x-warpgate-token` header when making API requests:

```bash
# Example: Get current user info
curl -H "x-warpgate-token: wg_sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
  https://warpgate.acme.inc/@warpgate/api/info
```

### Managing Tokens

You can view and revoke API tokens at any time by:
1. Clicking your username in the top right corner
2. Going to the "API Tokens" section
3. Click the trash icon next to any token to revoke it

### Token Expiry

When creating a token, you can set an optional expiry date. After the expiry date, the token will automatically become invalid and cannot be used.
