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

<div class="badge font-xs text-bg-warning mb-3">v0.21+</div>

Warpgate supports client certificates for authentication over the [Kubernetes API](./targets/kubernetes.md) protocol.

* Click `Issue certificate` and Warpgate will generate a keypair in-browser and issue a client certificate for the user:

![](images/create-certificate-1.png)
/// caption
Issuing a client certificate
///

![](images/create-certificate-2.png)
/// caption
Certificate is issued
///

Since the private key is not stored, you must download it immediately, or copy both the certificate and the key as a kubectl config snippet.

## Requiring multiple authentication factors

Warpgate can require a client to present both a public key and a password.

* In the `Auth policy` > `SSH` section, uncheck `Any credential` and select both `Password` and `Key`:

![](images/mfa-policy.png)
/// caption
Setting up a multifactor auth policy
///

## SSH client authentication methods

<div class="badge font-xs text-bg-warning mb-3">v0.20+</div>

Warpgate allows you to globally block SSH authentication methods. This can be useful if you exclusively use public key authentication and would like to prevent network scanners from hammering password authentication on a public port. By default, all methods are enabled.

You can disable them individually under `Config` > `Global parameters` > `SSH authentication methods`:

![](images/ssh-methods.png)
/// caption
SSH authentication methods configuration in Global Parameters
///

## Using roles to assign access

You can use _roles_ to grant a new user access to multiple targets at once (or assign multiple users to a target).

* Create and remove roles under `Config` > `Roles`.
* Assign roles to users and targets on their respective configuration pages.

## API Tokens

<div class="badge font-xs text-bg-warning mb-3">v0.13+</div>

Warpgate supports API tokens for programmatic access. Users can create and manage their own API tokens through the web interface by clicking their username in the top right corner and navigating to the "API Tokens" section.

Requests made with an API token are considered authenticated in the same way as if the user would have logged in normally.

### Using API Tokens

Pass the token in the `x-warpgate-token` header when making API requests:

```bash
# Example: Get server info
curl -H "x-warpgate-token: xyz" https://warpgate.acme.inc/@warpgate/api/info
```
