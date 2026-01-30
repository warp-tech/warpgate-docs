# Getting started on Helm

<div class="badge font-xs text-bg-warning mb-3">The Helm chart is community-maintained</div>

## TL;DR

* Official Helm chart: [warp-tech/warpgate/helm/warpgate](https://github.com/warp-tech/warpgate/tree/main/helm/warpgate)
* Image name: `ghcr.io/warp-tech/warpgate`
* Image in the GHCR: [https://github.com/warp-tech/warpgate/pkgs/container/warpgate](https://github.com/warp-tech/warpgate/pkgs/container/warpgate)
* Persistent volume required: `/data` (when using SQLite)
* Ports: `2222` (SSH), `8888` (HTTP), `33306` (MySQL), `55432` (PostgreSQL)
* Tags: `latest` (stable), `vX.Y`, `vX.Y.Z`

## Prerequisites

* Kubernetes cluster (1.19+)
* Helm 3.x installed
* kubectl configured to access your cluster

## Quick Start

### Install from Official Chart

The official Helm chart is available in the Warpgate repository. Clone the repository and install from the local chart:

```bash
git clone https://github.com/warp-tech/warpgate.git
cd warpgate/helm/warpgate
helm install warpgate . \
  --namespace warpgate \
  --create-namespace
```

### Automatic Setup

The Helm chart includes automatic setup via a Kubernetes Job (recommended) or initContainer. Create a secret with the admin password:

```bash
kubectl create secret generic warpgate-secret \
  --from-literal=adminPassword='your-secure-password' \
  --namespace warpgate
```

Then install with setup enabled:

```bash
cd warpgate/helm/warpgate
helm install warpgate . \
  --namespace warpgate \
  --create-namespace \
  --set setup.enabled=true \
  --set data.pvc.enabled=true \
  --set setup.envFromSecret.WARPGATE_ADMIN_PASSWORD=warpgate-secret/adminPassword
```

## Configuration

For the complete list of available configuration options, see the [full Helm values file](https://github.com/warp-tech/warpgate/blob/main/helm/warpgate/values.yaml).

### Basic Values

Create a `values.yaml` file to customize your deployment:

```yaml
image:
  repository: ghcr.io/warp-tech/warpgate
  tag: "0.16.0"
  pullPolicy: IfNotPresent

# Automatic setup configuration
setup:
  enabled: true
  type: "job"  # or "podinit"
  envFromSecret:
    WARPGATE_ADMIN_PASSWORD: "warpgate-secret/adminPassword"

  # Ports to expose
  ssh: 2222
  http: 8888
  mysql: 33306
  pgsql: 55432

  # Optional: External database
  # databaseUrl: "postgres://user:password@postgres-service:5432/warpgate"

# Persistent storage
data:
  pvc:
    enabled: true
    template:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 10Gi

# Service configuration
service:
  type: ClusterIP
  ports:
    ssh: 2222
    http: 8888
    mysql: 33306
    pgsql: 55432

# Resource limits
resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

Install with custom values:

```bash
cd warpgate/helm/warpgate
helm install warpgate . \
  --namespace warpgate \
  --create-namespace \
  --values values.yaml
```

### Persistent Storage

Warpgate requires persistent storage when using the built-in SQLite database. The chart supports both PersistentVolumeClaim and emptyDir:

```yaml
data:
  pvc:
    enabled: true  # Use PVC for persistence
    claimName: ""  # Use existing PVC (optional)
    template:
      accessModes: ["ReadWriteOnce"]
      storageClassName: "fast-ssd"
      resources:
        requests:
          storage: 10Gi
```

!!! WARNING "SQLite and Replicas"
    Do NOT increase `replicaCount` above 1 when using SQLite as the database. For high availability, use an external PostgreSQL database.

### External Database

To use an external PostgreSQL or MySQL database:

```yaml
setup:
  enabled: true
  databaseUrl: "postgres://user:password@postgres-service:5432/warpgate"

data:
  pvc:
    enabled: false  # Can use emptyDir with external DB
```

### Service Configuration

For production deployments, configure the service type and ports:

```yaml
service:
  type: LoadBalancer  # or NodePort, ClusterIP
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: "nlb"
  ports:
    ssh: 2222
    http: 8888
    mysql: 33306
    pgsql: 55432
```

### Ingress Configuration

Enable Ingress for HTTP access:

```yaml
ingress:
  enabled: true
  className: "nginx"
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: warpgate.example.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: warpgate-tls
      hosts:
        - warpgate.example.com
```

### SSH Keys and TLS Certificates

Provide SSH keys and TLS certificates via Kubernetes secrets:

```bash
# Create secret with SSH keys
kubectl create secret generic warpgate-ssh-keys \
  --from-file=host-ed25519=./host-ed25519 \
  --from-file=host-rsa=./host-rsa \
  --from-file=client-ed25519=./client-ed25519 \
  --from-file=client-rsa=./client-rsa \
  --namespace warpgate

# Create secret with TLS certificate
kubectl create secret tls warpgate-tls \
  --cert=./tls.crt \
  --key=./tls.key \
  --namespace warpgate
```

Reference in values.yaml:

```yaml
ssh_keys_secret: "warpgate-ssh-keys"
tls_cert_secret: "warpgate-tls"
```

### Custom Configuration

To provide a full custom Warpgate configuration:

```yaml
overrides_config: |
  # Your complete warpgate.yaml configuration here
  # Ensure ports match the service configuration
```

## Upgrading

To upgrade Warpgate to a new version, pull the latest chart and upgrade:

```bash
cd warpgate/helm/warpgate
git pull origin main
helm upgrade warpgate . \
  --namespace warpgate \
  --set image.tag=0.17.0
```

## Uninstalling

To remove Warpgate:

```bash
helm uninstall warpgate --namespace warpgate
```

!!! WARNING "Data Persistence"
    Uninstalling with Helm will remove the deployment, but persistent volume claims (PVCs) are retained by default. To remove all data:

    ```bash
    kubectl delete pvc -l app.kubernetes.io/name=warpgate -n warpgate
    ```

## Troubleshooting

### Check Pod Status

```bash
kubectl get pods -n warpgate
kubectl describe pod <pod-name> -n warpgate
kubectl logs <pod-name> -n warpgate
```

### Check Setup Job

If using automatic setup with Job mode:

```bash
kubectl get jobs -n warpgate
kubectl logs job/warpgate-setup -n warpgate
```

### Access Warpgate Admin UI

Get the service endpoint:

```bash
kubectl get svc -n warpgate
```

If using LoadBalancer or NodePort, access the HTTP port (default 8888) in your browser.

For ClusterIP, use port-forwarding:

```bash
kubectl port-forward svc/warpgate 8888:8888 -n warpgate
```

Then access `http://localhost:8888` in your browser.

### Verify Persistent Volume

```bash
kubectl get pvc -n warpgate
kubectl describe pvc <pvc-name> -n warpgate
```

### View Configuration

Check the generated configuration:

```bash
kubectl exec -it deployment/warpgate -n warpgate -- cat /data/warpgate.yaml
```

## Up next

* [Adding an SSH target](./targets/ssh.md)
* [Adding an HTTP target](./targets/http.md)
* [Access control](./auth-and-roles.md)
