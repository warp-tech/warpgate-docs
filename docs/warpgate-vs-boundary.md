---
title: Warpgate vs. HashiCorp Boundary — an open-source, self-hosted Boundary alternative
description: Looking for a HashiCorp Boundary alternative? Warpgate is a self-hosted, Apache-2.0 bastion with no client app and no controller/worker cluster — SSH, Kubernetes, databases, web apps, RDP/VNC, SSO and session recording, all free.
---

# Warpgate vs. Boundary

Warpgate is an **open-source, self-hosted alternative to HashiCorp Boundary**. Both [Boundary](https://www.boundaryproject.io/) and Warpgate broker audited access to internal infrastructure, but they take very different shapes. Boundary is an identity-based access system built around a controller/worker cluster and a **required client** that tunnels TCP to your targets; Warpgate is a **transparent, protocol-aware bastion** that needs no client and understands each protocol it proxies. If you want audited access to SSH, databases, Kubernetes, web and desktops without standing up a cluster, rolling out a client, and (often) running Vault alongside it, Warpgate is a much lighter path — and it's Apache-2.0, not Business Source Licensed.

!!! note
    Boundary is actively developed and its capabilities and edition boundaries change over time. Treat the details below as a good-faith orientation, **last verified July 2026**, and check the [Boundary documentation](https://developer.hashicorp.com/boundary) for its current feature set.

## At a glance

| | Warpgate | Boundary |
|---|---|---|
| **Footprint** | A single Rust binary + a database (SQLite or PostgreSQL) | Controller(s) + Worker(s) + a database, and often Vault for credentials |
| **Agents on targets** | **None** — nothing is installed on your servers | None on the targets, but a controller/worker plane to operate |
| **Client software** | **None** — users keep their normal `ssh`, `mysql`, `psql`, `kubectl`, browser or RDP/VNC client | The `boundary` CLI, Desktop app, or background Client-Agent is **required** |
| **How you reach a target** | Connect your client straight to Warpgate with a `user:target` selector | The `boundary` client authorises a session and opens a **local proxy port**; you then point your tool at `localhost` |
| **Protocol awareness** | Protocol-aware for SSH, HTTP, MySQL, PostgreSQL, Kubernetes, RDP, VNC | Primarily **TCP tunnelling**; SSH and RDP have deeper, protocol-aware features (e.g. session recording) |
| **Credentials to targets** | Stored per target (or brokered) — built in | Static, or brokered/injected via **Vault** |
| **Authentication** | Password, SSH public key, OTP (TOTP), SSO via OIDC, client certificates, in-browser approval | Password, OIDC, LDAP (MFA delegated to your OIDC provider) |
| **Session recording** | Replay for SSH, Kubernetes, RDP and VNC; query/activity logs for databases and HTTP | SSH and RDP (paid editions); other targets tunnelled at TCP |
| **In-browser access** | SSH, RDP, VNC and HTTP | None — sessions run through the CLI / Desktop / Client-Agent |
| **Self-service / JIT access** | Tickets and self-service **ticket requests** with admin approval | Grant-based; no built-in self-service request/approval workflow |
| **Language** | Rust | Go |
| **Licensing** | **Apache-2.0, fully self-hosted** | Business Source License (BSL, source-available); HCP Boundary is the managed option |

## Philosophy

**Warpgate is a transparent, protocol-aware proxy.** Users connect with the tools they already have; Warpgate authenticates them, applies access control, and records or logs the session. It understands SSH, HTTP, the database wire protocols, the Kubernetes API and the desktop protocols, so it can show you *what happened* — queries, commands, API calls, desktop video — not just that a connection occurred.

**Boundary is an identity-based TCP broker.** A controller authorises sessions and workers proxy the traffic, while a Boundary client on each machine opens the session. It's a solid fit if you're already invested in the HashiCorp stack and want Vault-brokered credentials — but it's a bigger system to run, it relies on a client on every machine, and for most protocols it moves bytes without interpreting them.

## Reaching a target

This is the most visible day-to-day difference:

* **Warpgate** — point `ssh`, `psql`, `kubectl`, a browser or an RDP/VNC client straight at Warpgate, using `user#target` (or the web portal). Nothing to install.
* **Boundary** — authorise a session with the `boundary` client; `boundary connect` opens a `localhost` port you then point your tool at. Boundary's "transparent sessions" smooth this over with a background Client-Agent that intercepts traffic — but that's an Enterprise/HCP feature and still requires the client. Either way, a Boundary client sits in the path.

## Session recording

Warpgate records and replays interactive SSH, Kubernetes exec/attach, RDP and VNC sessions from the Admin UI. MySQL and PostgreSQL produce query logs, while HTTP produces session/activity logs. Boundary records SSH and RDP (in its paid editions); other targets are carried as TCP tunnels.

| Protocol | Warpgate | Boundary |
|---|---|---|
| SSH | ✅ terminal replay (+ per-command audit log) | ✅ session replay |
| RDP | ✅ video | ✅ session replay (added in Boundary 1.0) |
| Kubernetes | ✅ API calls + `exec`/`attach` replay | ❌ (TCP tunnel; on Boundary's roadmap) |
| VNC | ✅ video | ❌ (TCP tunnel) |
| MySQL / PostgreSQL | ✅ query log | ❌ (TCP tunnel; on Boundary's roadmap) |
| HTTP | ✅ session log | ❌ (TCP tunnel; on Boundary's roadmap) |

Boundary can *carry* all of these — it tunnels arbitrary TCP — but only SSH and RDP are recorded as replayable sessions, and only in the paid Enterprise / HCP editions. Warpgate includes interactive session replay and protocol-aware logs in the free build.

## When Warpgate is the better choice

* You want audited access **today**, from a single binary, without a controller/worker cluster or a client on every machine.
* You want to see **what happened inside** each session — queries, commands, API calls, desktop video — across all your protocols, not just SSH and RDP.
* You'd rather not run **Vault** just to hand credentials to targets.
* You value a **small, Apache-2.0 codebase** with every feature in the free build.
* Homelabs, small-to-medium teams, and focused gateways.

<section class="production-review-cta" aria-labelledby="production-review-boundary-title">
    <p class="production-review-eyebrow">Evaluating Warpgate for production?</p>
    <h2 id="production-review-boundary-title">Validate the architecture before rollout</h2>
    <p>Ask Warpgate's maintainers to review your target inventory, identity setup, HA design, recording retention and rollout plan—or deploy it yourself using the public documentation.</p>
    <div class="production-review-actions">
        <a class="btn btn-success" href="/for-business/#support-options">Request a production-readiness review</a>
        <a class="btn btn-outline-light" href="/getting-started-on-docker/">Deploy Warpgate yourself</a>
    </div>
</section>

## When to reach for Boundary

* You're already standardised on **HashiCorp** tooling and want Vault-brokered, dynamic credentials as the centrepiece.
* You mainly need identity-based **TCP access** to many hosts and are comfortable running the controller/worker plane and distributing the client.

## Summary

Boundary is a capable identity-based access broker, especially inside a HashiCorp/Vault estate — at the cost of a cluster, a required client, and per-protocol depth it's still building out. Warpgate is a self-hosted, open-source, transparent gateway that works with the clients you already use and keeps audit data in your infrastructure.

Also compare Warpgate with [Teleport](./warpgate-vs-teleport.md) and [StrongDM](./warpgate-vs-strongdm.md).

Ready to try it?

<a class="btn btn-success" href="/getting-started-on-docker">Get started with Docker &rarr;</a>
