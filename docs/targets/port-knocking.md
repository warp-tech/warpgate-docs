---
title: Port knocking
---

# Port knocking

<div class="badge font-xs text-bg-warning mb-3">v0.31+</div>

Some targets are behind a firewall that only opens the service port after a specific sequence of packets (a *knock*), for example with [knockd](https://github.com/jvinet/knock), MikroTik or OPNsense. Warpgate can send this sequence to the target host right before each connection, so the firewall opens the port for Warpgate's address.

Port knocking is available for [SSH](ssh.md), [MySQL](mysql.md), [PostgreSQL](postgres.md), [RDP](rdp.md) and [VNC](vnc.md) targets.

## How it works

Before every connection to the target, Warpgate:

1. resolves the target host and keeps the first address, so the whole sequence reaches the same machine,
2. sends each knock in order, waiting the *delay between knocks* in between:
    * a **TCP** knock is a connection attempt (a SYN packet) with a short timeout. Whether the port answers or not doesn't matter,
    * a **UDP** knock is a single-byte datagram,
3. waits the *wait before connecting* delay, then connects normally.

Warpgate doesn't need extra privileges for this: it doesn't use raw sockets.

!!! note
    For SSH targets reached through a [jump host](../chaining.md), only the first host of the chain is knocked. Hosts behind the jump host are not reachable from Warpgate directly.

## Configuration

In the Admin UI, open the target and go to the **Network** section. Enable **Knock on ports before connecting**, then:

* add the knocks of the sequence, in order, each with a port and a protocol (TCP or UDP). A sequence has between 1 and 32 knocks,
* set the **delay between knocks** (default: 100 ms, max: 10 s),
* set the **wait before connecting** (default: 500 ms, max: 30 s). Increase it if the firewall takes a moment to apply its rule.

Save the target. The sequence is used for every new connection, including the SSH host key check.

!!! warning
    Anyone who knows the sequence can open the firewall, so Warpgate treats it as a secret: it's not shown to admins who can't edit targets, and it's not stored in session history.

## Example with knockd

With this `/etc/knockd.conf` on the target host:

```ini
[openSSH]
    sequence    = 7000:tcp,8000:udp,9000:tcp
    seq_timeout = 10
    tcpflags    = syn
    command     = /usr/sbin/nft add element inet filter allowed { %IP% }
```

configure the target with these knocks:

| Port | Protocol |
|------|----------|
| 7000 | TCP      |
| 8000 | UDP      |
| 9000 | TCP      |

The knocks are sent from Warpgate's address, so that's the address knockd lets in. In a [cluster](../clustering.md), each node knocks on its own before connecting.

## Troubleshooting

* **The connection times out**: check the firewall logs on the target to see whether the knocks arrive, and in the right order. A NAT or another firewall between Warpgate and the target can drop or rewrite them.
* **It works only sometimes**: increase the *wait before connecting*, or the *delay between knocks* if the knock daemon misses packets that arrive too close together.
* Warpgate logs the knocked ports at `debug` level only.

### Up next

* [User authentication](../auth.md)
