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

<div class="homepage">
    <div class="jumbo">
        <h1>The last bastion</h1>
        <p class="lead title">Secure access to your internal SSH, HTTPS, MySQL and Postgres servers with SSO and RBAC</p>
        <p class="lead subtitle">No client apps needed.</p>
        <div class="buttons">
            <a class="btn btn-success" href="https://github.com/warp-tech/warpgate/releases" target="_blank">&darr; Downloads</a>
            <a class="btn btn-warning" href="/docs">Docs &rarr;</a>
        </div>
    </div>

    <div class="row">
        <div class="feature col-md-6 col-12">
            <h1>No client</h1>
            <p>Warpgate directly exposes native SSH, HTTPS, MySQL and Postgres listeners.
            <div>Use it as a git proxy.</div>
            <div>Connect your gRPC service through it.</div>
            <div>Set it as your <code>DATABASE_URL</code>.</div>
        </div>
        <div class="feature col-md-6 col-12">
            <h1>No jump hosts</h1>
            <p>Warpgate handles authentication, and then transparently forwards the connection to the target server, while making a live recording for auditing.</p>
        </div>
    </div>

    <div class="row">
        <div class="feature col-md-6 col-12">
            <h1>No paid plan</h1>
            <p>
                Warpgate is 100% open-source, free and will stay this way forever.
            </p>
            <p>
                Warpgate is financed through support contracts, and custom-order feature development.
            </p>
            <p>
                This allows it to escape the otherwise inevitable future of stagnation or VC enshittification.
            </p>
            <a class="btn btn-success" href="/support" target="_blank">Pro Support &rarr;</a>
        </div>
        <div class="feature col-md-6 col-12">
            <h1>No SaaS bullshit</h1>
            <p>
                Warpgate is a single binary (or a Docker image) that you download and run locally on your own hardware.
            </p>
        </div>
    </div>
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

    .lead {
        max-width: 412px;
    }

    .title {
        font-size: 1.5rem;
    }

    .feature {
        margin-bottom: 2rem;
    }

    article {
        max-width: 100% !important;
    }
</style>
