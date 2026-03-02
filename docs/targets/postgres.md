# Adding PostgreSQL targets

## Authentication setup

Currently, Warpgate can connect to PostgreSQL servers with a username/password using `md5` and `password` (plaintext) auth mode.

As a PostgreSQL protocol server, Warpgate only allows secure (TLS) connections and uses `password` auth mode.

## Enabling PostgreSQL listener

Enable the PostgreSQL protocol in your config file (default: `/etc/warpgate.yaml`) if you didn't do so during the initial setup:

```diff
+ postgres:
+   enable: true
+   certificate: /var/lib/warpgate/tls.certificate.pem
+   key: /var/lib/warpgate/tls.key.pem
```

You can reuse the same certificate and key that are used for the HTTP listener.

## Connection setup

Log into the Warpgate admin UI and navigate to `Config` > `Targets` > `Add target` and give the new PostgreSQL target a name:

![](../images/adding-postgres.png)
/// caption
Adding a PostgreSQL target
///

Fill out the configuration:

![](../images/postgres-config.png)
/// caption
PostgreSQL target configuration
///

The target should show up on the Warpgate's homepage:

![](../images/postgres-on-home.png)
/// caption
PostgreSQL target on the homepage
///

Users will be able to click the entry to obtain connection instructions:

![](../images/postgres-instructions.png)
/// caption
PostgreSQL target connection instructions
///

## Client setup

You can now use any PostgreSQL client applications to connect through Warpgate with the following settings:

* Host: the Warpgate host
* Port: the Warpgate PostgreSQL port (default: 55432)
* Username: `admin#<target-name>` or `admin:<target-name>`, in this example: `admin#db1`
* Password: your Warpgate admin password
* TLS: enabled
* Cleartext password authentication: allowed

If your client uses a database URL, use: `postgresql://<username>#<target>:<password>@<warpgate host>:<warpgate postgresql port>?sslmode=require`

## Default database name

<div class="badge font-xs text-bg-warning mb-3">v0.20+</div>

You can specify a default database name that Warpgate will automatically connect to when a client connects to this target. This is useful when:

- Your application always needs a specific database
- You want to simplify connection strings for users
- You have database-per-user setups

To configure this:

1. In the target configuration, fill in the `Default database` field
2. When users connect, Warpgate will automatically use this database

### Example

If you have a PostgreSQL target named `analytics` and you want users to automatically connect to the `reports` database:

```
Default database: reports
```

Now users can connect with a simplified connection string:

```bash
# Instead of:
psql "host=warpgate.acme.inc port=55432 user=admin#analytics dbname=reports sslmode=require"

# They can just use:
psql "host=warpgate.acme.inc port=55432 user=admin#analytics sslmode=require"
```

The database will default to `reports` automatically.

While your PostgreSQL session is running, you'll be able to see its status in the Admin UI, including the query log:

![](../images/postgres-log.png)
/// caption
PostgreSQL session log
///

## 2-factor authentication

<div class="badge font-xs text-bg-warning mb-3">v0.14+</div>

Warpgate supports the "In-browser auth" authentication for PostgreSQL clients by sending a login link in a PostgreSQL notice message. Some clients might ignore notice messages, but the users will still be able see and confirm their login request if they log into the Warpgate web UI.

### Up next

* [User authentication and roles](../auth-and-roles.md)
