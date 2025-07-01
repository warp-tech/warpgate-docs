# HTTP domain binding

<div class="badge font-xs text-bg-warning mb-3">v0.5+</div>

Instead of using `?warpgate-target=` in the URL, you can use multiple domains/hostnames and link each to a specific target.

Accessing Warpgate over HTTP on a specific domain will then automatically select the corresponding target.

For optimal results, you want to host Warpgate on a common higher-level domain (e.g. `wg.acme.inc`, as set by the `external_host` config option), with target-specific domains as subdomains of this one (e.g. `gitlab.wg.acme.inc`) - this will prevent users from having to log in again when switching between domains (Warpgate will set its session cookie for all subdomains).

If you have separate certificates for your domains, set up [SNI](sni.md).

## Linking a target to a domain

Set the `Bind to a domain` property in the target config.
