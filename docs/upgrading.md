---
title: Upgrading
description: How to upgrade a Warpgate deployment safely - backups, automatic database migrations, native/Docker/Helm steps, cluster upgrades and rolling back.
---

# Upgrading

A Warpgate upgrade is a binary (or image) swap: when the new version starts, it applies any pending database migrations automatically and picks up where the old one left off. Everything carries over.

Release announcements go out via the [newsletter](newsletter.md), and every release has notes on the [Releases](https://github.com/warp-tech/warpgate/releases) page.

There is no required upgrade path at this time; you can directly upgrade to the latest version from any previous version.

Warpgate makes no availability guarantees during a rolling upgrade - meaning you'll need a short maintenance window.

## Before you upgrade

* Read the release notes for the version you're moving to - breaking changes and manual steps are called out there.
* Back up the config file (`/etc/warpgate.yaml`), the data directory (the `/data` volume on Docker) and most importantly, the database - see [backup and restore](backup.md). Restoring those is the only supported way of rolling back an upgrade.
* A staging environment is recommended. Having one allows you to test target connections and familiarize yourself with any new features first.

## Native binary

* Replace `/usr/bin/warpgate` with the new binary from the [Releases](https://github.com/warp-tech/warpgate/releases) page and `chmod +x` it
* Restart the service: `systemctl restart warpgate` (see [systemd](systemd.md))
* Check the logs - the startup banner prints the new version, and any migrations run before the listeners come up

## Docker

Point the container at the new image tag and recreate it.

With Docker Compose, bump the image tag in `docker-compose.yml` and run `docker compose up -d`.

Pin a specific `X.Y` or `X.Y.Z` tag rather than `latest` so that you control the version.

## Helm

See [upgrading a Helm deployment](getting-started-on-helm.md#upgrading).

## Clusters

All nodes share one database schema, so upgrade the whole [cluster](clustering.md) at once. You do not need to sequence node upgrades.

* The first upgraded node migrates the shared database on startup (race-free).
* Nodes still running the old version will keep serving open sessions, but opening new sessions might fail.
* Don't run mixed versions longer than strictly necessary.

## Rolling back

The supported way back is restoring the database backup you made before the upgrade, then redeploying the old binary or image tag. An older Warpgate will not start against a database that a newer version has migrated.
