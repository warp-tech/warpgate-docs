# Custom root CAs

## Docker

In the official Docker image, custom trusted root certificates can be mounted into `/etc/ssl/certs`.

## Kubernetes

Mount your certificate as a secret in the Warpgate pod:

```yaml
volumes:
  - name: custom-ca-volume
    secret:
      secretName: custom-ca-tls

volume_mounts:
  - name: custom-ca-volume
    mountPath: /etc/ssl/certs/custom-ca.crt
    subPath: ca.crt
    readOnly: true
```

## Native

Warpgate will use the host's trusted root certificates automatically.
