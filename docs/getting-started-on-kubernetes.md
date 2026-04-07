# Getting started on Kubernetes

The [Warpgate Operator](https://github.com/thereisnotime/warpgate-operator) is a community-maintained
Kubernetes operator that manages Warpgate resources declaratively through Custom Resource Definitions (CRDs).

It covers the full surface of the Warpgate Terraform provider: roles, users, targets (SSH, HTTP, MySQL,
PostgreSQL), credentials, tickets, and role/target bindings. It can also deploy and manage Warpgate
instances directly on Kubernetes via a `WarpgateInstance` CRD.

!!! info
    The operator is tested against Warpgate 0.22.0-beta.3. The `WarpgateInstance` controller is under
    active development — it works but expect rough edges.

## Prerequisites

- Kubernetes 1.25+
- [Helm 3](https://helm.sh/docs/intro/install/) (recommended install method)
- [cert-manager](https://cert-manager.io/docs/installation/) installed in the cluster (for webhook TLS)

## Installation

### Helm (recommended)

```bash
helm repo add warpgate-operator https://thereisnotime.github.io/warpgate-operator
helm repo update
helm install warpgate-operator warpgate-operator/warpgate-operator \
  --namespace warpgate-operator-system --create-namespace
```

### Raw manifests

```bash
kubectl apply -f https://github.com/thereisnotime/warpgate-operator/releases/latest/download/install.yaml
```

## Connecting to a Warpgate instance

Create a Kubernetes Secret with your Warpgate API token:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: warpgate-auth
  namespace: default
stringData:
  token: YOUR_WARPGATE_API_TOKEN
```

Then create a `WarpgateConnection` pointing to your instance:

```yaml
apiVersion: warpgate.warpgate.warp.tech/v1alpha1
kind: WarpgateConnection
metadata:
  name: my-warpgate
  namespace: default
spec:
  host: https://warpgate.example.com
  authSecretRef:
    name: warpgate-auth
```

!!! note
    Username/password authentication is also supported as a fallback for instances without OTP/2FA.
    See the [operator docs](https://github.com/thereisnotime/warpgate-operator/tree/main/docs/crds)
    for details.

## Quick start

With a connection in place, you can manage Warpgate resources as Kubernetes manifests:

```yaml
# Create a role
apiVersion: warpgate.warpgate.warp.tech/v1alpha1
kind: WarpgateRole
metadata:
  name: developers
  namespace: default
spec:
  connectionRef: my-warpgate
  name: developers
---
# Create a user (password auto-generated and stored in a Secret)
apiVersion: warpgate.warpgate.warp.tech/v1alpha1
kind: WarpgateUser
metadata:
  name: john-doe
  namespace: default
spec:
  connectionRef: my-warpgate
  username: john.doe
---
# Bind the user to the role
apiVersion: warpgate.warpgate.warp.tech/v1alpha1
kind: WarpgateUserRole
metadata:
  name: john-doe-developers
  namespace: default
spec:
  connectionRef: my-warpgate
  userRef: john-doe
  roleRef: developers
```

## Key features

- **10 CRDs** — instances, connections, roles, users, SSH/HTTP/MySQL/PostgreSQL targets, credentials, tickets, and bindings
- **Drift reconciliation** — desired state is enforced every 5 minutes
- **Secret references** — sensitive fields (tokens, passwords, SSH keys) reference Kubernetes Secrets; nothing sensitive lives in the CRD spec
- **Finalizer-based cleanup** — deleting a CR removes the corresponding Warpgate resource
- **Admission webhooks** — validate and default CRD specs at admission time

## Up next

- [Adding an SSH target](./targets/ssh.md)
- [Adding an HTTP target](./targets/http.md)
- [Access control](./auth-and-roles.md)
