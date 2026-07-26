# Running a cluster

<div class="badge font-xs text-bg-warning mb-3">v0.27+</div>

Warpgate can run as multiple nodes behind a load balancer for high availability and horizontal scaling.

## Setup

1. Point every node at the **same database** by setting the same `database_url` in the config files.
2. Point every node at the **same S3 bucket** or the **same shared filesystem** for session recordings under `Config` > `Global parameters` > `Session recordings`.
3. Put the nodes behind a TCP and HTTP load balancer. The HTTP balancer should have sticky sessions enabled, and the TCP balancer should ideally support the PROXY protocol so that Warpgate can see the real client IP address.

That's all - nodes discover each other through the shared database.

## Peer addressing

Nodes need to reach each other directly for cross-node proxying. Warpgate determines each node's peer address automatically, but you can override it:

* `WARPGATE_PEER_ADDRESS` — set to `host:port` explicitly if auto-detection picks the wrong interface.
* On Kubernetes, the pod IP (`POD_IP`) is used automatically.

The peer port is the node's HTTP listener port, so nodes must be able to reach each other on it.
