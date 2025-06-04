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
    * Identifies itself as MySQL 8.0 (meaning you can use the MySQL Workbench even if the target is a MariaDB)
    * ✅ TLS (forced)
    * `mysql_clear_password` auth over TLS
* As client:
    * ✅ TLS (optional)
    * ✅`mysql_native_password` auth
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
* ✅ Tickets <div class="badge font-xs text-bg-warning">v0.5+</div>
* ✅ 2FA
