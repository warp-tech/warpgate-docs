# Protocol support

## SSH

* Ciphers: `chacha20-poly1305`, `aes256-gcm@openssh.com`
* Key exchange: `curve25519-sha256@libssh.org`
* Keys: `ssh-ed25519`, `ssh-rsa`, `rsa-sha2-512`, `rsa-sha2-256`
* Compression: `zlib`, `zlib@openssh.com`
* Tickets ✅
* 2FA ✅

## MySQL

* MySQL text protocol only (prepared statements are not supported)
* No MariaDB protocol extensions (such as query progressbars).
* As server:
  * Identifies itself as MySQL 8.0
    * (meaning you can use MySQL Workbench even if the target is a MariaDB)
  * TLS ✅ (forced)
  * `mysql_clear_password` auth over TLS
* As client:
  * TLS ✅ (optional)
  * `mysql_native_password` auth ✅
* Tickets ✅
* 2FA ❌

## PostgreSQL

* As server:
  * TLS ✅ (forced)
  * `password` cleartext auth over TLS
  * `sha256-scram` auth ❌
* As client:
  * TLS ✅ (optional)
  * `password` auth ✅
  * `md5` auth ✅
  * `sha256-scram` auth ✅
* Tickets ✅
* 2FA ❌

## HTTP

* HTTP/1.1 ✅
* HTTP/2 ✅
* TLS ✅ (as server: forced)
* Websockets ✅
* SSE ❌
* Tickets ✅ <div class="badge font-xs text-bg-warning">v0.5+</div>
* 2FA ✅
