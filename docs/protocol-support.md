---
title: Protocol support
---

# Protocol support

## SSH

* Ciphers: `chacha20-poly1305`, AES256-GCM, AES256-CTR, AES192-CTR, AES128-CTR.
* Key exchanges: Curve25519, DH GEX SHA-256, DH groups 14-18.
* Keys: `ssh-ed25519`, `ssh-rsa`, `rsa-sha2-512`, `rsa-sha2-256`
* MACs: HMAC-SHA-1/256/512 with optional ETM.
* Compression: Zlib.
* ✅ Tickets
* ✅ 2FA

## MySQL

* MySQL text protocol only (prepared statements are not supported)
* As server:
    * Identifies itself as MySQL 8.0.3 (configurable; means you can use the MySQL Workbench even if the target is a MariaDB)
    * ✅ TLS (forced)
    * `mysql_clear_password` auth over TLS
* As client:
    * ✅ TLS (optional)
    * ✅ `mysql_native_password` auth
    * ✅ `sha256_password` auth
    * ✅ `caching_sha2_password` auth (incl. MySQL 8.4) <div class="badge font-xs text-bg-warning">v0.27+</div>
    * ✅ AWS RDS IAM auth <div class="badge font-xs text-bg-warning">v0.27+</div>
* ✅ Tickets
* ❌ 2FA
* ❌ MariaDB protocol extensions (such as query progress bars)

## PostgreSQL

* As server:
    * ✅ TLS (forced)
    * `password` cleartext auth over TLS
* As client:
    * ✅ TLS (optional)
    * ✅ `password` auth
    * ✅ `md5` auth
    * ✅ `sha256-scram` auth
* ✅ Tickets
* ✅ 2FA <div class="badge font-xs text-bg-warning">v0.14+</div>

## HTTP

* ✅ HTTP/1.1
* ✅ HTTP/2
* ✅ TLS (as server: forced)
* ✅ Websockets
* ✅ Tickets
* ✅ 2FA

## Kubernetes

<div class="badge font-xs text-bg-warning mb-3">v0.22+</div>

* ✅ API proxy
* ✅ `kubectl` support
* ✅ TLS (forced)
* ✅ Client certificate authentication
* ✅ Bearer token authentication
* ✅ SSO / OIDC authentication via `kubelogin` <div class="badge font-xs text-bg-warning">v0.27+</div>
* ✅ AWS EKS IAM authentication <div class="badge font-xs text-bg-warning">v0.27+</div>
* ✅ Session recording (including `kubectl exec`)
* ✅ 2FA
* ✅ WebSocket streaming (`exec` / `attach` / `logs`)
* ✅ `port-forward` (SPDY and WebSocket) <div class="badge font-xs text-bg-warning">v0.27+</div>
* ❌ Protobuf transfer encoding

## RDP

<div class="badge font-xs text-bg-warning mb-3">v0.27+</div>

* ✅ In-browser desktop client
* ✅ Native RDP clients (mstsc, FreeRDP, Remmina, …)
* ✅ TLS + CredSSP/NLA (both to the target and from the viewer)
* ✅ Session recording
* ✅ Tickets
* ✅ 2FA (collected on an in-session holding screen)
* ❌ Legacy Standard RDP Security

## VNC

<div class="badge font-xs text-bg-warning mb-3">v0.27+</div>

* ✅ In-browser desktop client
* ✅ Native VNC viewers supporting VeNCrypt X509Plain (e.g. TigerVNC)
* ✅ TLS from the viewer (VeNCrypt); optional Apple-DH / ARD (no TLS)
* ✅ Session recording
* ✅ Tickets
* ✅ 2FA (collected on an in-session holding screen)
* ❌ Plain `None` / legacy `VncAuth` to the viewer
* ❌ macOS built-in Screen Sharing client
