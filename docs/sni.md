# TLS SNI

<div class="badge font-xs text-bg-warning mb-3">v0.15+</div>

## Intro

[SNI](https://en.wikipedia.org/wiki/Server_Name_Indication) allows Warpgate to automatically pick the correct certificate for each domain when serving HTTPS.

## Configuration

In the config file, add the `http.sni_certificates` list:

```diff
http:
  certificate: ...
  key: ...
+ sni_certificates:
+ - certificate: other_cert.pem
+   key: other_key.pem
+ - certificate: yet_another_cert.pem
+   key: yet_another_key.pem
```

The "main" certificate will remain active as a fallback for any requests that do not match domain names known from the SNI certificate list.
