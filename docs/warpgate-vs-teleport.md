---
title: Warpgate vs. Teleport — an open-source, self-hosted Teleport alternative
description: Looking for a Teleport alternative? Warpgate is a self-hosted, Apache-2.0 bastion with no agents and no client app — SSH, Kubernetes, databases, web apps, RDP/VNC, SSO and session recording, all free at any company size.
---

# Warpgate vs. Teleport

Warpgate is an **open-source, self-hosted Teleport alternative**. It and [Teleport](https://goteleport.com/) both give you audited, authenticated access to internal infrastructure — but they sit at very different points on the spectrum. Teleport is a large, agent-based **identity platform**; Warpgate is a **lightweight, transparent bastion** that runs from a single binary and works with the clients you already have. For most teams that simply need secure, audited access to their servers, databases and desktops, Warpgate gets you there with a fraction of the moving parts — and none of it behind a paywall.

!!! note
    Teleport is an actively developed product and its capabilities and edition boundaries change over time. Treat the details below as a good-faith orientation, **last verified August 2026**, and check the [Teleport documentation](https://goteleport.com/docs/) for its current feature set.

## At a glance

| | Warpgate | Teleport |
|---|---|---|
| **Footprint** | A Rust binary plus SQLite, MySQL or PostgreSQL; multiple nodes can share a database for clustering. | A cluster of services (Auth, Proxy) plus a backend |
| **Agents on targets** | **None** — nothing is installed on your servers | Typically a Teleport agent per resource (agentless SSH via CA is possible) |
| **Client software** | **None** — users keep their normal `ssh`, `mysql`, `psql`, `kubectl`, browser or RDP/VNC client | `tsh` CLI, the Teleport Connect desktop app, and the web UI (standard clients work through a local proxy) |
| **Selecting a target** | A special username / the web UI | `tsh` / resource labels / the web UI |
| **Protocols** | SSH, HTTP(S), MySQL, PostgreSQL, Kubernetes, RDP, VNC | SSH, Kubernetes, databases, web & TCP apps, Windows desktop (RDP) |
| **Authentication** | Password, SSH public key, OTP (TOTP), **SSO via OIDC** (Google, Microsoft, Apple or any custom provider), client certificates, in-browser approval | Short-lived certificates, MFA (TOTP / WebAuthn), SSO (GitHub in the open-source edition; **SAML/OIDC require Enterprise**) |
| **Self-service / JIT access** | Tickets and self-service **ticket requests** with admin approval — included | Access Requests with approval workflows — Enterprise |
| **Session recording** | Replay for SSH, Kubernetes, RDP and VNC; query/activity logs for databases and HTTP | SSH, Kubernetes and Windows desktop; databases/apps as audit events (see [below](#session-recording)) |
| **In-browser access** | SSH, RDP, VNC and HTTP (see [below](#browser-based-access)) | SSH, Windows desktop, web apps and Kubernetes (see [below](#browser-based-access)) |
| **Language** | Rust | Go |
| **Licensing** | **Apache-2.0, fully self-hosted, no paid tier** | Community Edition free only for companies under **100 employees and under $10M annual revenue** (v16+ binaries are commercially licensed); many features require Enterprise / Cloud |

## Philosophy

**Warpgate is a transparent proxy.** Users connect with the tools they already have — Warpgate sits in the middle, authenticates them, applies access control and records or logs the session. Nothing is installed on the targets and there's no dedicated client to distribute. The whole thing is one binary and one database, and every feature is in the open-source build.

**Teleport is a platform.** It brings its own cluster, certificate authority, per-resource agents, CLI and a broad surface of features (identity governance, device trust, machine identity and more). That reach is genuinely powerful for large organisations — at the cost of more infrastructure to run, a client to roll out, and an Enterprise licence for much of the governance tooling. There's also a hard commercial line: since v16, Teleport's Community Edition is licensed for free use only by companies with **fewer than 100 employees and less than $10M in annual revenue** — cross either threshold and even the base product requires a paid edition. Warpgate has no such boundary: every feature is free at any size, forever.

## Session recording

Warpgate records and replays interactive SSH, Kubernetes exec/attach, RDP and VNC sessions. MySQL and PostgreSQL produce query logs, while HTTP produces session/activity logs rather than replayable recordings. Teleport records its interactive protocols and captures database/app activity as structured audit events.

| Protocol | Warpgate | Teleport |
|---|---|---|
| SSH | ✅ terminal replay (+ per-command audit log, v0.27) | ✅ terminal replay |
| Kubernetes | ✅ API calls + `exec`/`attach` replay | ✅ `exec` replay |
| RDP | ✅ video | ✅ video |
| VNC | ✅ video | ❌ (VNC not supported) |
| MySQL / PostgreSQL | ✅ query log | audit-log query events |
| HTTP / web apps | ✅ session log | audit-log request events |

## Browser-based access

Both offer a browser client for some protocols. Warpgate additionally proxies HTTP targets natively — reaching a web target *is* just opening it in your browser.

| Protocol | Warpgate | Teleport |
|---|---|---|
| SSH | ✅ web terminal | ✅ web terminal |
| RDP | ✅ web desktop | ✅ web desktop |
| VNC | ✅ web desktop | ❌ |
| HTTP / web apps | ✅ native (Warpgate is an HTTP proxy) | ✅ App Access |
| Kubernetes | ❌ (CLI via generated `kubeconfig`) | ✅ web `exec` terminal |
| MySQL / PostgreSQL | ❌ (native DB client) | ❌ (CLI / Teleport Connect) |

## Self-service and just-in-time access

Warpgate ships just-in-time access in the open-source build:

* **Tickets** — scoped, single- or limited-use access secrets for a specific target.
* **Ticket requests** — users request access to a target from the portal; an admin approves it (or you allow it automatically), with per-target limits on duration and number of uses.

Teleport's equivalent, **Access Requests** (just-in-time role elevation with approval workflows), lives in its Enterprise tier.

## When Warpgate is the better choice

* You want a bastion running **in the next hour**, from a single binary, with no agents and no cluster to operate.
* You want users to keep using **standard clients** (OpenSSH, `psql`, `kubectl`, mstsc, a browser) with nothing extra to install.
* You value a **small, auditable, Apache-2.0 codebase** where every feature — SSO, MFA, session recording, ticket requests, clustering — is in the free build.
* Your access needs are well covered by SSH, HTTP, MySQL, PostgreSQL, Kubernetes, RDP and VNC.

<section class="production-review-cta" aria-labelledby="production-review-teleport-title">
    <p class="production-review-eyebrow">Evaluating Warpgate for production?</p>
    <h2 id="production-review-teleport-title">Validate the architecture before rollout</h2>
    <p>Ask Warpgate's maintainers to review your target inventory, identity setup, HA design, recording retention and rollout plan—or deploy it yourself using the public documentation.</p>
    <div class="production-review-actions">
        <a class="btn btn-success" href="/for-business/#support-options">Request a production-readiness review</a>
        <a class="btn btn-outline-light" href="/getting-started-on-docker/">Deploy Warpgate yourself</a>
    </div>
</section>

## When to reach for Teleport

* You need the full breadth of an identity platform: many database engines, application access, device trust and identity governance.
* You're standardising a **large or heavily regulated** organisation on a single certificate-based identity fabric, and are prepared to run its agent/cluster architecture and pay for the Enterprise features.

## Summary

If you want a comprehensive, agent-based identity platform and the budget and operations team to match, Teleport is built for that. If you want a compact, self-hosted, transparent gateway that works with the clients you already use, gives you replayable recordings for interactive sessions, and doesn't ask you to call sales — that's Warpgate.

Also compare Warpgate with [HashiCorp Boundary](./warpgate-vs-boundary.md) and [StrongDM](./warpgate-vs-strongdm.md).

Ready to try it?

<a class="btn btn-success" href="/getting-started-on-docker">Get started with Docker &rarr;</a>
