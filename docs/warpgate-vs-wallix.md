---
title: Warpgate vs. WALLIX — an open-source, self-hosted WALLIX Bastion alternative
description: Looking for a WALLIX Bastion alternative? Warpgate is a self-hosted, Apache-2.0 bastion with no agents, no client app and no per-asset licence — SSH, Kubernetes, databases, web apps, RDP/VNC, SSO and session recording.
---

# Warpgate vs. WALLIX

Warpgate is an **open-source, self-hosted alternative to WALLIX Bastion**. Of the commercial products Warpgate is usually compared with, [WALLIX](https://www.wallix.com/) is the closest in shape: it is genuinely **agentless**, it lets users connect with the clients they already have, and you can run the whole thing in your own infrastructure. The differences are not architectural religion — they are **scope, protocol coverage and price**. WALLIX is a full commercial PAM suite with a credential vault, endpoint privilege management and national security certifications; Warpgate is a compact, Apache-2.0 access gateway that does the proxying part and gives it away.

!!! note
    WALLIX is an actively developed commercial product and its capabilities change over time. The details below were **verified in August 2026** against the [WALLIX Bastion 12.3.2 Administration Guide](https://pam.wallix.one/documentation/admin-doc/bastion_en_administration_guide.pdf), the [WALLIX PAM datasheet](https://www.wallix.com/wp-content/uploads/2024/09/DATASHEET_2025_WALLIX_PAM_EN.pdf) and the [WALLIX One PAM architecture documentation](https://pam.wallix.one/documentation/deployment/getting-started/architecture.html). Check the [WALLIX documentation](https://pam.wallix.one/documentation/) for its current feature set.

## At a glance

| | Warpgate | WALLIX Bastion |
|---|---|---|
| **Footprint** | A Rust binary plus SQLite, MySQL or PostgreSQL; multiple nodes can share a database for clustering | A Linux appliance (virtual or hardware), cloud image or SaaS; add **Access Manager** for remote/browser access and a Windows **RDS farm** to publish web applications |
| **Agents on targets** | **None** — nothing is installed on your servers | **None** — WALLIX is agentless too |
| **Client software** | **None** — users keep their normal `ssh`, `mysql`, `psql`, `kubectl`, browser or RDP/VNC client | **None** for SSH, RDP, VNC and telnet; the **WAMUT tunnelling client** is required for databases, fat clients and other raw-TCP targets |
| **Selecting a target** | A special username (`user:target`) / the web UI | A special username (`Machine:Service:Username@Bastion`) / the web portal |
| **Protocols** | SSH, HTTP(S), MySQL, PostgreSQL, Kubernetes, RDP, VNC | SSH (incl. SCP/SFTP/X11), RDP, VNC, telnet, RLOGIN, plus **raw TCP** (`RAWTCPIP`) for anything else, including OT/industrial protocols |
| **Kubernetes** | ✅ protocol-aware: RBAC on the API, `exec`/`attach` replay | ❌ not a supported target type |
| **Databases** | ✅ protocol-aware MySQL and PostgreSQL proxy with **query logs** | Reached as a **raw TCP tunnel** via Universal Tunneling; captured as a PCAP file |
| **Web / HTTP targets** | ✅ native — Warpgate *is* an HTTP reverse proxy | **Web Session Manager** drives a real browser (an embedded Chrome engine) on the gateway side |
| **Authentication** | Password, SSH public key, OTP (TOTP), **SSO via OIDC**, client certificates, in-browser approval | Password, SSH keys, Kerberos, LDAP/AD, NLA, RADIUS, PKI (X.509), **SAML 2.0 and OIDC** |
| **Self-service / JIT access** | Tickets and self-service **ticket requests** with admin approval — included | **Approval workflow** with a dedicated approver role and e-mail notification; integrates with ITSM ticketing |
| **Secrets management** | Per-target credentials, stored or brokered | Full **vault** with automated password and SSH-key rotation, plus application-to-application password management |
| **Beyond the gateway** | Gateway only | A **suite**: PEDM endpoint privilege management, IDaaS, identity governance |
| **Security certification** | None | **ANSSI CSPN** and **BSI BSZ** (see [below](#certification-and-compliance)) |
| **Licensing** | **Apache-2.0, fully self-hosted, no paid tier** | Proprietary and commercial — subscription **per asset or per user**; free trial available |

## Philosophy

**Warpgate is a transparent, protocol-aware proxy.** One binary and one database, sitting between your users and your targets. It understands SSH, HTTP, the database wire protocols, the Kubernetes API and the desktop protocols, so it can tell you *what happened* inside a session. Every feature is in the Apache-2.0 build, and there is no licence to count.

**WALLIX Bastion is a certified commercial PAM platform.** It covers the same proxying ground and then keeps going: a credential vault with rotation, application-to-application secrets, endpoint privilege management, identity governance, and the compliance paperwork that regulated buyers ask for. WALLIX Group has been doing this since 2003, is listed on Euronext, and sells into exactly the sectors where a purchase order needs a certificate attached to it.

Notably, WALLIX does **not** ask you to install an agent on your servers or a client on every laptop for its main protocols — so the usual "no agents, no client" argument that separates Warpgate from Teleport, StrongDM and Boundary does *not* separate it from WALLIX. The honest differences are elsewhere.

## Reaching a target

The two products feel remarkably similar day to day:

* **Warpgate** — point `ssh`, `psql`, `kubectl`, a browser or an RDP/VNC client at Warpgate using `user:target`, or use the web portal.
* **WALLIX** — point your SSH or RDP client at the Bastion using `Machine:Service:Username@Bastion`, or use the web portal. WALLIX Access Manager additionally brokers browser-based sessions for remote users.

The exception is anything that isn't SSH, RDP, VNC or telnet. WALLIX carries those over **Universal Tunneling**: raw TCP inside an SSH tunnel, driven by the WAMUT client on the user's workstation. Depending on the mode, the user's application must either be reconfigured to talk to `127.0.0.1`, or a temporary network interface is created on the workstation (which needs local privileges). That is the path a MySQL or PostgreSQL client takes. Warpgate speaks those protocols directly, so the client connects to Warpgate the same way it connects to anything else.

## Session recording

Both products record. The difference is how much of the session each one *understands* — WALLIX interprets its four interactive protocols and captures the rest as packets, while Warpgate additionally interprets the database, Kubernetes and HTTP traffic it proxies.

| Protocol | Warpgate | WALLIX Bastion |
|---|---|---|
| SSH / telnet | ✅ terminal replay (+ per-command audit log, v0.27) | ✅ terminal replay with searchable metadata |
| RDP | ✅ video | ✅ video |
| VNC | ✅ video | ✅ video |
| Kubernetes | ✅ API calls + `exec`/`attach` replay | ❌ not a supported target type |
| MySQL / PostgreSQL | ✅ query log | PCAP capture of the tunnel |
| HTTP / web apps | ✅ session log | ✅ video of the browser session |

WALLIX also offers real-time session monitoring, live session sharing with an invited guest (view-only or shared control), and the ability to terminate a session in progress.

## Scope: a gateway, not a suite

This is the difference that decides most evaluations. WALLIX sells a **PAM programme**; Warpgate is one component of one.

If your requirement is written as "audited, access-controlled connections to our infrastructure", Warpgate covers it. If it is written as "discover privileged accounts, vault and rotate their credentials, remove local admin rights from workstations, broker secrets to applications, and produce a compliance report", that is a suite-shaped requirement and WALLIX is built for it. Warpgate has per-target credentials and access control, not a rotation engine, not endpoint privilege management, and not identity governance.

## Certification and compliance

WALLIX Bastion holds ANSSI's **CSPN** certification (awarded to Bastion 6.0.102) and, in October 2025, WALLIX PAM obtained the German BSI's **BSZ** certification — recognised by ANSSI under the Franco-German mutual-recognition agreement in place since March 2022.

Warpgate has no such certification, and this page will not pretend otherwise. If your procurement requires a nationally certified product — common in French and German public sector, defence, energy and finance — that requirement is not something an Apache-2.0 project can satisfy, and WALLIX is a well-founded answer. What Warpgate offers instead is a small, auditable codebase you can read, build and verify yourself, and deployment entirely inside your own perimeter.

## When Warpgate is the better choice

* You want audited access **today**, from a single binary, without an appliance, an Access Manager, or an RDS farm to publish web apps.
* Your estate is **Kubernetes, databases and web applications** as much as it is SSH and RDP — and you want those proxied and logged protocol-aware, not tunnelled as raw TCP.
* You want **no licence to count** — no per-asset or per-user subscription, no renewal, no true-up when the estate grows.
* You value a **small, auditable, Apache-2.0 codebase** where every feature — SSO, MFA, session recording, ticket requests, clustering — is in the free build.
* Homelabs, small-to-medium teams, and organisations that would rather own the gateway than licence it.

<section class="production-review-cta" aria-labelledby="production-review-wallix-title">
    <p class="production-review-eyebrow">Evaluating Warpgate for production?</p>
    <h2 id="production-review-wallix-title">Validate the architecture before rollout</h2>
    <p>Ask Warpgate's maintainers to review your target inventory, identity setup, HA design, recording retention and rollout plan—or deploy it yourself using the public documentation.</p>
    <div class="production-review-actions">
        <a class="btn btn-success" href="/for-business/#support-options">Request a production-readiness review</a>
        <a class="btn btn-outline-light" href="/getting-started-on-docker/">Deploy Warpgate yourself</a>
    </div>
</section>

## When to reach for WALLIX

* You need a **nationally certified** product — ANSSI CSPN or BSI BSZ — because your sector or your auditor requires one.
* You need the **full PAM suite**: credential vaulting and rotation, application-to-application secrets, endpoint privilege management and identity governance under one contract.
* You have **OT/industrial** targets, or legacy telnet and RLOGIN estates, and want them brokered through the same gateway.
* You want a **commercial vendor** with European support, a partner network and two decades of PAM deployments behind it.

## Summary

WALLIX is the most Warpgate-like of the commercial gateways: agentless, clientless for the common protocols, and yours to host. Choose it when you need the surrounding PAM suite or a certificate from ANSSI or BSI. Choose Warpgate when the gateway *is* the requirement — when you want Kubernetes, databases and web apps proxied with protocol awareness, an auditable Apache-2.0 codebase, and no per-asset licence between you and your own infrastructure.

Also compare Warpgate with [Teleport](./warpgate-vs-teleport.md), [HashiCorp Boundary](./warpgate-vs-boundary.md) and [StrongDM](./warpgate-vs-strongdm.md).

Ready to try it?

<a class="btn btn-success" href="/getting-started-on-docker">Get started with Docker &rarr;</a>
