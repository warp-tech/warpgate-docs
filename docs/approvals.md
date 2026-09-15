---
title: Session approvals
---

# Session approvals

<div class="badge font-xs text-bg-warning mb-3">v0.29+</div>

Also known as Just-In-Time Access/Approvals, this function allows you to set up a target to require a real-time administrator approval before a user can access it.

_Note_: this is separate from [user approvals](auth.md#in-browser-approval-out-of-band-authentication), where the *user themselves* confirms a login from their web session.

## Requiring approval for a target

On the target's configuration page, tick `Access control` > `Require administrator approval for each connection`.

Sessions to this target will be placed on hold after authentication until an administrator approves them. 

The exact behavior depends on the protocol:

* **SSH, RDP and VNC** show a "waiting" message to the user until the decision is made.
* **HTTP and Kubernetes** requests are refused immediately with a retryable response until then.
* **MySQL and PostgreSQL** connections simply wait.

## Approving requests

Pending requests show up under `Status` > `Requests` in the admin UI, and additionally as a notification icon at the top of the UI.

Approving requires the `Sessions` > `Approve` [admin role](roles.md#admin-roles) permission.

When approving, admins can choose the scope:

* **Approve for this target**: approves this session and remembers the approval for the same user, target and source IP combination.
* **Approve for all targets**: additionally covers the user's future connections to other targets from the same IP.

Approvals are remembered for the `Admin approval cache period` (under `Config` > `Global parameters` > `Session approvals`). With no cache period set, every connection requires separate approval.

### Up next

* [Access tickets](./tickets.md)
