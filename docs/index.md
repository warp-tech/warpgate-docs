---
special: home
---

<div id="animation-container-home"></div>

<style>
    #animation-container-home {
        margin: auto;
        max-width: 500px;
    }
</style>

<div class="homepage mb-5">
    <div class="jumbo">
        <h1>The last bastion.</h1>
        <p class="lead title">Secure access / PAM for your internal SSH, HTTPS, MySQL and Postgres servers with SSO and RBAC.</p>
        <p class="lead subtitle">No client apps needed.</p>
        <div class="buttons d-block d-sm-flex">
            <a class="btn btn-warning d-block" href="/docs">Read the docs</a>
            <a class="btn btn-success d-block" href="https://github.com/warp-tech/warpgate/releases" target="_blank">&darr; Download</a>
            <a class="btn btn-primary d-none d-sm-inline-block" href="https://github.com/warp-tech/warpgate" target="_blank">GitHub</a>
        </div>
    </div>

    <div class="row">
        <div class="feature col-lg-6 col-12">
            <h1>No client</h1>
            <p>Warpgate directly exposes native SSH, HTTPS, MySQL and Postgres listeners.
            <div>Use it as a git proxy.</div>
            <div>Connect your gRPC service through it.</div>
            <div>Set it as your <code>DATABASE_URL</code>.</div>
        </div>
        <div class="feature col-lg-6 col-12">
            <h1>No jump hosts</h1>
            <p>Warpgate handles authentication, and then transparently forwards the connection to the target server, while making a live recording for auditing.</p>
        </div>
    </div>

    <div class="row">
        <div class="feature col-lg-6 col-12">
            <h1>No paid plan</h1>
            <p>
                Warpgate is 100% open-source, free and will stay this way forever.
            </p>
            <p>
                Warpgate is financed through support contracts, and custom-order feature development.
            </p>
            <p>
                This allows it to escape the otherwise inevitable cycle of stagnation or VC enshittification.
            </p>
            <a class="btn btn-success" href="/support" target="_blank">Pro Support &rarr;</a>
        </div>
        <div class="feature col-lg-6 col-12">
            <h1>No SaaS bullshit</h1>
            <p>
                Warpgate is a single binary (or a Docker image) that you download and run locally on your own hardware.
            </p>
        </div>
    </div>
</div>

<div class="how-it-be">
    <h1> How does all this work?</h1>
    <p class="mt-5">You download and run a single binary or a Docker container:</p>
    <img src="images/login.png" />

    <p>You add your services:</p>
    <img src="images/adding-ssh.png" />

    <p>
        You add your users and decide who can access what:
        <small class="d-block text-muted">(OIDC SSO supported)</small>
    </p>


    <img src="images/editing-pk.png" />

    <p>Your users get a specially formatted username to connect to targets:</p>

<pre class="text-start">
$ ssh c.wilde:staging-env@warpgate.acme.inc

 Warpgate  Selected target: staging-env
 Warpgate  Host key (ssh-ed25519): AAAAC3[...]

 ✓ Warpgate connected

 root@staging-env ~ $
</pre>

    <p>You get audit and observability:</p>
    <img src="images/ssh-log.png" />

    <p>And they get a web interface with instructions so you don't have to keep explaining it:</p>
    <img src="images/ssh-instructions.png" />

    <p>Sounds good?</p>
    <a class="btn btn-warning" href="/docs">Read the docs</a>
</div>

<style>
    .homepage {
        /* width: 400px; */
    }

    .jumbo {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-bottom: 5rem;
    }

    .jumbo h1 {
        font-size: 4rem;
    }

    .jumbo .buttons {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }

    .jumbo .buttons .btn {
        margin-bottom: 1rem;
    }

    .lead {
        max-width: 442px;
    }

    .title {
        font-size: 1.5rem;
    }

    .feature {
        margin-bottom: 2rem;
        font-size: 1.2rem;

    }

    .feature:first-child {
        padding-right: 2rem;
    }

    article {
        max-width: 100% !important;
    }

    .how-it-be {
        text-align: center;
        margin-top: 3rem;
    }

    .how-it-be p {
        font-size: 1.2rem;
    }

    .how-it-be img,
    .how-it-be pre{
        max-width: calc(min(100%, 500px));
        margin: 0 auto 2rem;
    }


</style>
