# Adding a Kubernetes target

<div class="badge font-xs text-bg-warning mb-3">v0.22+</div>

Warpgate allows you to securely access Kubernetes clusters through a unified entry point, providing auditing and session recording for all API requests.

## How it works

When you add a Kubernetes target, Warpgate acts as an authenticating proxy for the Kubernetes API. Users connect to Warpgate using their own credentials (either an API token or a client certificate), and Warpgate then connects to the upstream Kubernetes cluster using the authentication details you've configured.

All requests are recorded and can be audited later.

## Creating a Kubernetes target

1.  In the admin UI, navigate to `Config` > `Targets`.
2.  Click `Add target`.
3.  Select `Kubernetes` as the target type.
4.  Enter the follow connection details:
    *   **Name**: A unique name for this target.
    *   **Cluster URL**: The URL of your Kubernetes API server (e.g., `https://k8s.example.com:6443`).
    *   **TLS Mode**: Choose between `off`, `verify`, or `trust` (skip verification).

### Upstream Authentication

Configure how Warpgate should authenticate with your Kubernetes cluster:

*   **Token**: Provide a ServiceAccount token or any valid Bearer token for the cluster.
*   **Certificate**: Upload a client certificate and private key (mTLS) that has access to the cluster.

## Using the Kubernetes target

Users can connect to the target using `kubectl` or any other Kubernetes client by pointing them to the Warpgate Kubernetes endpoint (default port 8443).

### Authentication to Warpgate

To authenticate your requests to Warpgate, you can use:

1.  **API Tokens**: Create an API token in your user profile and use it as a Bearer token in your client.
2.  **Client Certificates**: Add a client certificate to your user profile. When connecting, your client must present this certificate.

### Configuring kubectl

The easiest way to use `kubectl` with Warpgate is to create a new context in your `kubeconfig`:

```bash
# Set the cluster
kubectl config set-cluster warpgate-k8s \
  --server=https://<your-warpgate-host>:8443/<target-name> \
  --certificate-authority=/path/to/warpgate-ca.pem

# Set the credentials (using a Warpgate API token)
kubectl config set-credentials warpgate-user \
  --token=<your-warpgate-api-token>

# Set the context
kubectl config set-context warpgate \
  --cluster=warpgate-k8s \
  --user=warpgate-user

# Use the context
kubectl config use-context warpgate
```

Now you can run your usual `kubectl` commands:

```bash
kubectl get pods
```

!!! note "Target Name in URL"
    Notice that the target name is part of the URL path: `https://<warpgate-host>:8443/<target-name>`. This allows Warpgate to route your requests to the correct cluster.

## Session Recording

All Kubernetes API requests are logged and can be viewed in the `Recordings` section of the Admin UI. For interactive sessions (like `kubectl exec` or `kubectl attach`), Warpgate provides a recording of the terminal session that can be replayed.
