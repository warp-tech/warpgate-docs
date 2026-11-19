---
title: GitOps
description: Keep Warpgate targets, target groups, roles and SSH client keys in YAML files synced with git or a local directory.
---

# GitOps

<div class="badge font-xs text-bg-warning mb-3">v0.31+</div>

Warpgate can read its targets, target groups, access roles and SSH client keys from YAML files and keep the database in sync with them. The files can be loaded from a git repository, a directory on the Warpgate host, or be submitted by a CI pipeline through the admin API.

Other resource types are currently not covered by GitOps.

GitOps configuration is under `Config` > `GitOps`. Sync status and history, manual sync and dry run controls are under `Status` > `GitOps`.

## Resource files

Each YAML document describes one resource. A file can hold several documents separated by `---`. Warpgate reads every `*.yaml` and `*.yml` file under the source path, excluding hidden files and directories.

You can browse the full current schema in your Warpgate admin UI under `Config` > `GitOps` > `Config file schema`

* A good starting point is using the `Config` > `GitOps` > `Export unmanaged` button to download a file containing configuration for all existing resources and using it as a starting point. The file will also include a JSON schema reference for your editor autocompletions.
* Resources refer to each other **by name**: for example the target's `group`, `roles`, its SSH `jump_host` and the `key_id` of public key authentication. 
* Names can point both at a resource in the files or at existing unmanaged resources in Warpgate.
* Names are unique per resource kind. 
* A target's protocol cannot change. 
* Passwords, tokens and private keys can be either written inline in plaintext or as a [secret backend](secret-backends.md) reference (`secret://backend/mount/path#field`). 

## Ownership

A resource created by the GitOps engine is marked **managed**. It is read-only in the admin UI and API, and can be only changed by a later sync, deleted by an admin, or _released_ from GitOps by an admin. Unmanaged resources can freely reference managed resources, e.g. you can grant managed access roles to users.

GitOps sync never touches existing unmanaged resources unless the matching GitOps resource is marked with `adopt_existing`:

```yaml
metadata:
  name: prod-db
  adopt_existing: true
```

To release a managed resource for manual editing, use `Managed by GitOps` > `Release` on its admin page. 

### Moving an existing setup into GitOps

`Export unmanaged` under `Config` > `GitOps` creates a YAML file that describes all existing resources on this instance with `adopt_existing` already set. Using this file as a sync source will preserve your existing setup, making all resources managed without recreating them.  

!!! warning
    The export contains inline target credentials in plain text. The built-in admin role is not exported.

## Sources

* **Git repository** - an `https://` URL with an optional username and password or token. The password can be a secret reference. The reference can be a branch, a tag or a commit. Only HTTPS transport is not supported.
* **Local directory** - a path on the Warpgate host (mount if in a container or a mounted ConfigMap in Kubernetes). In a [cluster](clustering.md), all nodes must see the same files.
* **None** - do not fetch configuration automatically. You submit the GitOps config via the API (see [Syncing from CI](#syncing-from-ci)).

## Deleting resources

By default, managed resources that disappear from the config are not deleted. Enable `Delete objects that are no longer present in the config` to let the sync process delete them.

* Deleting a target closes its open sessions.
* A resource that another target still refers to is not deleted, and the sync fails.
* If a sync would delete more than half of the managed resources, or all of them, it applies nothing. This usually means a wrong branch or path. Confirm it by running `Sync now` manually.

## Syncing from CI

A CI pipeline can submit the complete set of files instead of having Warpgate fetch them. Send them as one YAML document stream in the `yaml` field of `POST /@warpgate/admin/api/gitops/sync`, authenticated with an admin API token. The request waits for the sync and returns its outcome as JSON. `POST /@warpgate/admin/api/gitops/dry-run` takes the same body and returns the change plan.

The submitted files are the full desired state, not a patch: with deletion enabled, managed resources missing from the request are deleted.

The calling user needs admin permissions to edit the configuration, targets and access roles.

## Checking files offline

The `warpgate config` command works locally:

* `warpgate config validate <path>` checks local config files for syntax and reference validity without touching the database. You can use it in CI checks.
* `warpgate config plan <path>` shows a diff against current configuration. It needs a valid Warpgate config file and database access. The exit code is 3 when there are pending changes.
* `warpgate config apply <path>` applies the files directly. It never deletes resources.
