# Running behind a reverse proxy
Warpgate doesn't need any specific configuration except in the following case:

* When using **single sign-on**, make sure your reverse proxy supplies the correct `Host` and `X-Forwarded-Proto` headers - this allows Warpgate to construct correct redirect URLs.
* Set `http.trust_x_forwarded_headers` to `true` in the config file.


Example for NGINX:

```
server {
    server_name warpgate.acme.inc;
    listen *:443 http2 ssl;
    ssl_certificate ...;
    ssl_certificate_key ...;

    location /  {
                proxy_pass https://192.168.10.1:8888;
                proxy_set_header Host $http_host;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_http_version 1.1;
    }
}

```
