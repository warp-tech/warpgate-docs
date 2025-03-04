# Log forwarding

<div class="badge font-xs text-bg-warning mb-3">v0.2+</div>

By default, Warpgate logs into its `stdout`, relying on `systemd`/`journald` for log management. However, you can configure it to forward logs to a local log collector through a UNIX Datagram ("UDP") socket, e.g. [Vector](https://vector.dev).

## Format

Warpgate will send log records into the socket as separate datagrams, formatted as JSON.

## Example

This example uses [Vector](https://vector.dev) as a log collector.

### Set up a listener socket

In Vector config, add a socket source:

```toml
[sources.warpgate]
type = "socket"
path = "/var/run/vector-warpgate.sock"
mode = "unix_datagram"
```

<blockquote>

If you just want to try Vector out, here's a full config file that you can run with `vector -c file.toml` that will dump all received log entries to console:

```toml
data_dir = "/var/lib/vector/"

[sources.source0]
path = "/var/run/vector-warpgate.sock"
mode = "unix_datagram"
type = "socket"

[transforms.transform0]
inputs = ["source0"]
drop_field = true
drop_invalid = false
type = "json_parser"

[sinks.sink0]
inputs = ["transform0"]
target = "stdout"
type = "console"

[sinks.sink0.encoding]
codec = "json"

[sinks.sink0.healthcheck]
enabled = true

[sinks.sink0.buffer]
type = "memory"
max_events = 500
when_full = "block"
```
</blockquote>


### Set up forwarding

In the Warpgate config, set `log.send_to`:

```diff
+ log:
+   send_to: /var/run/vector-warpgate.sock
```

and restart Warpgate.
