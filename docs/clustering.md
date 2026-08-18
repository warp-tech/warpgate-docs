# Running a cluster

<div class="badge font-xs text-bg-warning mb-3">v0.27+</div>

Warpgate can run as multiple nodes behind a load balancer to provide both high availability and horizontal scaling.

## Database

A Warpgate needs a shared MySQL or PostgreSQL database. Set `database_url` in every node's config file to point to the same database instance.

## Encryption

<div class="badge font-xs text-bg-warning mb-3">v0.28+</div>

An external database can become an additional attack surface. To avoid storing target credentials in plaintext, set the same `WARPGATE_ENCRYPTION_KEY` environment variable for every node. See [Encrypting credentials at rest](encryption.md) for details.

## Peer addressing

Nodes need to reach each other directly for cross-node proxying. Warpgate determines each node's peer address automatically, but you can override it:

* `WARPGATE_PEER_ADDRESS` — set to `host:port` explicitly if auto-detection picks the wrong interface.
* On a Helm setup, the pod IP env var (`POD_IP`) is used automatically.

The peer port is the node's HTTP listener port, so nodes must be able to reach each other on it.

## Load balancing

Warpgate supports load balancing for all protocol listeners. The TCP balancer should ideally implement the PROXY protocol so that Warpgate can see the real client IP address.

If you enable the PROXY protocol at the LB, you must set `proxy_protocol` for each affected listener in the config file, i.e. `ssh.proxy_protocol` and so on.

## Recordings storage

All nodes must share the same storage for session recordings. Point every node at either the **same S3 bucket** or the **same shared filesystem** under `Config` > `Global parameters` > `Session recordings`.
