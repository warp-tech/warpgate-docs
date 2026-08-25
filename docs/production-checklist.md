---
title: Warpgate production deployment checklist
description: A pre-launch checklist for self-hosting Warpgate - TLS, SSO, roles, credential encryption, clustering, backups, logging and go-live testing.
---

# Production deployment checklist

## Install and configuration

- [ ] Pick a deployment method: [native binary](getting-started.md), [Docker](getting-started-on-docker.md), [Helm](getting-started-on-helm.md) or the community [Kubernetes operator](getting-started-on-kubernetes.md).
- [ ] Run Warpgate under a supervisor that restarts it (a [systemd unit](systemd.md) for native installs)
- [ ] Move off the built-in SQLite to an external MySQL or PostgreSQL (`database_url` in the config file) if you want clustering or expect the estate to grow.

## TLS and networking

- [ ] Replace the self-signed certificate generated during setup with a real one for your domain.
- [ ] Add [SNI certificates](sni.md) for target subdomains not covered by that certificate.
- [ ] Behind a reverse proxy: forward `Host` and `X-Forwarded-Proto`, and set `http.trust_x_forwarded_headers` (see [running behind a reverse proxy](reverse-proxy.md))
- [ ] Behind a TCP load balancer: enable the [PROXY protocol](reverse-proxy.md#tcp-proxy-protocol) per listener
- [ ] Mount your internal [root CAs](custom-ca.md) if target certificates use a private CA

## Identity and access

- [ ] Connect your identity provider: [SSO via OIDC](sso.md).
- [ ] Give each admin their own account instead of sharing the one created at setup.
- [ ] Give each team the narrowest [role](roles.md) that works, and keep the admin role a short list.

## Hardening

- [ ] Require [OTP](otp.md) or [multiple factors](auth.md#requiring-multiple-authentication-factors) for admins and for sensitive targets.
- [ ] Enable [login protection](login-protection.md) - IP blocking and user lockout thresholds - for your traffic.
- [ ] Turn off password SSH logins under `Config` > `Global parameters` if you are not using password credentials.
- [ ] Turn off web SSH or the web remote desktop client under `Config` > `Global parameters` > `SSH` if your policy doesn't allow them.
- [ ] Set up password complexity rules under `Config` > `Global parameters` > `Password policy`.
- [ ] Decide your policy on [tickets](tickets.md) and self-service ticket requests before users start asking.
- [ ] Enable [credential encryption at rest](encryption.md) - particularly with an external database, replicas or off-host backups.
- [ ] Store the encryption key where you can recover it.

## Scaling and HA

- [ ] Set up additional nodes: shared database, S3 recordings storage and the at-rest encryption key everywhere - see [running a cluster](clustering.md)
- [ ] Confirm nodes can reach each other on their HTTP listener port (for cross-node proxying)
- [ ] Check that taking one node out of the load balancer doesn't disturb sessions on the others.

## Backups

See the [backup and restore guide](backup.md).

- [ ] The config file (`/etc/warpgate.yaml`)
- [ ] The data directory (on Docker that's the `/data` volume)
- [ ] The database
- [ ] The at-rest encryption key
- [ ] Session recordings

## Observability

- [ ] Forward logs to your aggregator: [log forwarding](log-forwarding.md).
- [ ] Subscribe to [release and security announcements](newsletter.md) so upgrades and advisories don't arrive by surprise.

## Before you go live

- [ ] Test connections to each target as an end user
- [ ] Play back a session recording and confirm it lands in the storage you configured
- [ ] Test admin access recovery with `warpgate recover-access` - see [recovering admin access](recovering-access.md).
- [ ] Restore your backup onto a temporary deployment and test it
- [ ] Always upgrade that temporary deployment host to the next version before you do it in production

<section class="production-review-cta" aria-labelledby="production-review-teleport-title">
    <p class="production-review-eyebrow">Validate the deployment plan before rollout</p>
    <h2 id="production-review-teleport-title">Want this verified against your setup?</h2>
    <p>Ask Warpgate's maintainers to review your target inventory, identity setup, HA design, recording retention and rollout plan - or deploy it yourself using the public documentation.</p>
    <div class="production-review-actions">
        <a class="btn btn-success" href="/for-business/#support-options">Request a production-readiness review</a>
    </div>
</section>
