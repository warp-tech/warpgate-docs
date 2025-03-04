Sometimes exposing a host on the network to the outside is not an option. In this case you can opt to forward connections from one Warpgate to another.

Note: this is transparent to the client (except for the double "warpgate connected" message in interactive sessions) - there are no SSH "jump hosts" involved in this setup.

# Copy outer Warpgate's public key

* Run `warpgate client-keys` and copy the Ed25519 public key:

```
➜  ~ warpgate client-keys
16:55:10  INFO Using config: "/etc/warpgate.yaml" (users: 1, targets: 6, roles: 1)
Warpgate SSH client keys:
(add these to your target's authorized_hosts file)

ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAxxxx+3RBsT5  # <-- this line
rsa-sha2-256 AAAADHJzYS1zaGEyLTI1Ngxxxx
```

# Set up inner Warpgate

* Add your targets as usual (in this example: `inner-server`).
* Add a "jump user" (here we'll be using `wg-jump` as a username) and add the outer Warpgate's public key as a credential.
* Check connection to the target with `warpgate test-target inner-server`

# Set up outer Warpgate

* Add the targets on the inner network again, using the inner Warpgate's address and port, as well as the Warpgate-style username:

* Host: `<inner Warpgate's IP>`
* Port: `<inner Warpgate's SSH port>`
* Username: `wg-jump:inner-server`
* Check your config with `warpgate check`.
* Check connection to the target _through the inner Warpgate_ on the outer Warpgate with `warpgate test-target inner-server`

# Connect

You can now grab the connection command from the landing page (or the admin UI) as usual and test it on a client:

```
ssh <username>:inner-server@<outer-warpgate> -p <outer-wg-port>
```

