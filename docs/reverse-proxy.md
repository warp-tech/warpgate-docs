---
title: Running behind a reverse proxy
---

# Running behind a reverse proxy
Warpgate doesn't need any specific configuration except in the following case:

* When using **single sign-on**, make sure your reverse proxy supplies the correct `Host` (or `X-Forwarded-Host`) and `X-Forwarded-Proto` headers - this allows Warpgate to construct correct redirect URLs.
* Set `http.trust_x_forwarded_headers` to `true` in the config file.


Example for NGINX:

```toml
server {
    server_name warpgate.acme.inc;
    listen *:443 http2 ssl;
    ssl_certificate ...;
    ssl_certificate_key ...;

    location /  {
        proxy_pass https://192.168.10.1:8888;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $http_connection;
        proxy_read_timeout 3600s;
        proxy_http_version 1.1;
    }
}

```

## TCP PROXY protocol

<div class="badge font-xs text-bg-warning mb-3">v0.27+</div>

When Warpgate sits behind a TCP (layer-4) load balancer such as HAProxy or an AWS Network Load Balancer, the client's real IP address would otherwise be lost. Warpgate can read it from a HAProxy **PROXY protocol** (v1/v2) header on any listener. Enable it per listener with `proxy_protocol: true`:

```diff
  ssh:
    listen: '[::]:2222'
+   proxy_protocol: true
```

Only enable this when the upstream load balancer actually prepends a PROXY header.
