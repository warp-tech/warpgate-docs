---
title: Backup and restore
description: What to back up in a Warpgate deployment - config, data directory, database, encryption key and recordings - and how to restore it.
---

# Backup and restore

A complete Warpgate backup is 5 things: the config file, the data directory, the database and (if used) the at-rest encryption key and recording files.

## What to back up

### The config file

`/etc/warpgate.yaml` on a native install. On Docker it's inside the data volume.

### The data directory

`/var/lib/warpgate` on a native install. On Docker it's the `/data` volume itself. It contains:

* TLS certificates
* SSH host keys
* SQLite database (if using SQLite - see below)
* Recordings if using the default on-disk recording storage

### The database

The database holds the entire Warpgate configuration - everything that is not in the config file itself.

#### Built-in SQLite

The database is at `<data dir>/db/db.sqlite3` and runs in WAL mode. To make a live backup of a hot database, use the `sqlite3` CLI itself:

```bash
sqlite3 /var/lib/warpgate/db/db.sqlite3 ".backup '/backups/warpgate-db.sqlite3'"
```

This is safe to run while Warpgate itself is running.

When Warpgate is stopped, a cold copy is also possible: just copy the entire `db/` directory, including the `-wal` and `-shm` files.

#### External MySQL or PostgreSQL

Use your regular database backup tools, e.g.:

```bash
pg_dump "$DATABASE_URL" > warpgate.sql
```

```bash
mysqldump warpgate > warpgate.sql
```

!!! WARNING "Credentials are in the dump"
    Unless you've enabled [encryption at rest](encryption.md), the database backup will contain target credentials in plaintext - secure the backups accordingly. With encryption enabled, encrypted credentials are useless without the key.

### The encryption key

If you use [credential encryption at rest](encryption.md), `WARPGATE_ENCRYPTION_KEY` is not stored anywhere except your environment configuration. A database backup restored without the key will work but all target credentials will be unusable.

Store the encryption key in your secret manager or other secure location separately from the backups.

### Recordings

If recordings are stored on S3, you can rely on the bucket's own versioning/replication. If they're on a shared filesystem or in the default `<data>/recordings` directory, include that path in your backup - recordings are append-only files and can be `rsync`'ed.

## Restoring

1. Install the **same Warpgate version** the backup was taken from.
2. Restore the config file and the data directory.
3. Restore the database (for external databases, restore the dump and check `database_url` in the config points at it).
4. Restore the `WARPGATE_ENCRYPTION_KEY` environment variable, if you use encryption.
5. Start Warpgate and test everything.

If you've lost the admin login specifically, use `warpgate recover-access` to reset it - see [recovering admin access](recovering-access.md).

## Test it

Restore your backup onto a staging host or container, log in, and test target connection connections. Do it before you need it in production.

In a [cluster](clustering.md), the database, recordings storage and encryption key are shared - it's enough back them up once centrally.
