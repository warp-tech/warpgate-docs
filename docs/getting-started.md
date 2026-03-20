# Getting started (binary)

NOTE: For Docker / k8s, see [Getting started on Docker](./getting-started-on-docker.md).

* Download the binary and save it as `/usr/bin/warpgate`:
    * grab a stable/beta release from the [Releases](https://github.com/warp-tech/warpgate/releases) page
    * or get a [nightly build](https://nightly.link/warp-tech/warpgate/workflows/build/main)
* Make it executable:

```
chmod +x /usr/bin/warpgate
```

## Setup

Run `warpgate setup` and follow the prompts. If you want to use a non-default (`/etc/warpgate.yaml`) config path, pass it to all `warpgate` commands via `--config <path>`.

To use an external database (MySQL or PostgreSQL) instead of the built-in SQLite, add `--database-url mysql://...` or `--database-url postgres://...`.

## Enabling Admin Token (Optional)

<div class="badge font-xs text-bg-warning mb-3">v0.12+</div>

For programmatic access to the admin API, you can enable an admin token:

1. Add `--enable-admin-token` to your Warpgate startup command
2. Set the `WARPGATE_ADMIN_TOKEN` environment variable with your desired token

```bash
# Example: Running with admin token
WARPGATE_ADMIN_TOKEN=my-secret-token warpgate run --config /etc/warpgate.yaml
```

Or in your systemd service file:

```ini
[Service]
Environment="WARPGATE_ADMIN_TOKEN=my-secret-token"
ExecStart=/usr/bin/warpgate run --config /etc/warpgate.yaml --enable-admin-token
```

### Using the Admin Token

Use the token in the `x-warpgate-token` header:

```bash
curl -H "x-warpgate-token: my-secret-token" \
  https://warpgate.acme.inc/@warpgate/api/parameters
```

!!! warning "Security Note"
    The admin token provides full administrative access. Keep it secure and rotate it regularly.

!!! NOTE "Unattended setup"
    There's also a non-interactive setup mode available - check out `warpgate unattended-setup --help`

Here's what it might look like:

```
$ warpgate setup

13:43:10  INFO Welcome to Warpgate 0.6.0
13:43:10  INFO Let's do some basic setup first.
13:43:10  INFO The new config will be written in /etc/warpgate.yaml.
13:43:10  INFO * Paths can be either absolute or relative to /etc.
✔ Directory to store app data (up to a few MB) in · /var/lib/warpgate
✔ Endpoint to listen for SSH connections on · 0.0.0.0:2222
✔ Endpoint to expose admin web interface on · 0.0.0.0:8888
✔ Do you want to record user sessions? · yes
✔ Set a password for the Warpgate admin user · ********
13:43:28  INFO Generated configuration:
[...]
13:43:28  INFO Saved into /etc/warpgate.yaml
13:43:28  INFO Using config: "/etc/warpgate.yaml" (users: 1, targets: 1, roles: 1)
13:43:28  INFO Generating HTTPS certificate
13:43:28  INFO
13:43:28  INFO Admin user credentials:
13:43:28  INFO   * Username: admin
13:43:28  INFO   * Password: <your password>
13:43:28  INFO
13:43:28  INFO You can now start Warpgate with:
13:43:28  INFO   warpgate --config /etc/warpgate.yaml run
```

If you need to start over, delete or move away the config file and run `warpgate setup` again.

You can now start Warpgate with `warpgate run` and the output should look like this:

```
$ warpgate run

13:44:13  INFO Warpgate version=0.6.0
13:44:13  INFO Using config: "/etc/warpgate.yaml" (users: 1, targets: 1, roles: 1)
13:44:13  INFO --------------------------------------------
13:44:13  INFO Warpgate is now running.
13:44:13  INFO Accepting SSH connections on 0.0.0.0:2222
13:44:13  INFO Access admin UI on https://0.0.0.0:8888
13:44:13  INFO --------------------------------------------
13:44:13  INFO Listening address=0.0.0.0:2222
13:44:13  INFO Listening address=0.0.0.0:8888
```

Try accessing `https://<host>:8888/@warpgate/admin` (note the `https://`) via a browser to confirm that the Admin UI is functional.

The default username is `admin` and the password is the one you've set during setup.

![](images/login.png)
/// caption
Login screen
///

![](images/session-list.png)
/// caption
Session list in the admin UI
///


## Setting Config Path via Environment

<div class="badge font-xs text-bg-warning mb-3">v0.20+</div>

You can set the config path using the `WARPGATE_CONFIG` environment variable instead of the `--config` flag:

```bash
# Set config via environment variable
export WARPGATE_CONFIG=/etc/warpgate.yaml
warpgate run
```

This is useful for:
- Docker containers
- Kubernetes deployments
- Simplifying command-line usage

On `systemd`, follow [Installing as a systemd service](systemd.md) to configure Warpgate to run as a service.

### Up next

* [Adding an SSH target](./targets/ssh.md)
* [Adding an HTTP target](./targets/http.md)
