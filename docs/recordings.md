---
title: Session recordings
---

# Session recordings

Warpgate can record sessions and replay them from the admin UI:

* Visual terminal replay for SSH and Kubernetes `exec`/`attach`
* Video and input replay for RDP and VNC
* Request and query logs for the HTTP, Kubernetes API, PostgreSQL and MySQL.

Recording is enabled during setup or under `Config` > `Global parameters` > `Session recordings` > `Record sessions`.

## Storage

Recordings are written to the selected `Storage backend`:

* **Local disk** - for a single node or a cluster with a shared filesystem.
* **S3** (v0.27+) - both AWS and compatible providers. On EC2/EKS, Warpgate can authenticate with its IAM role. 

Changing the storage location only affects new recordings and existing files must be copied manually.

### S3 bucket CORS policy

The admin UI loads recording files directly from the bucket using a presigned URL. For this to work correctly, the bucket needs a specific CORS policy:

```json
[
  {
    "AllowedOrigins": ["https://warpgate.example.com"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3000
  }
]
```

On AWS, you can set it up under `Permissions` > `Cross-origin resource sharing`.

MinIO allows every origin by default and doesn't need a policy.
