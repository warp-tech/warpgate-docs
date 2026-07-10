---
special: home
---

<div class="homepage mb-5">
    <div class="row mt-5 jumbo-row">
        <div class="col-lg-6 jumbo">
            <h1>The last bastion.</h1>
            <p class="lead title">Secure access / PAM for your internal SSH, HTTPS, MySQL, Postgres and Kubernetes servers with SSO and RBAC.</p>
            <p class="lead subtitle">No client apps.</p>
            <div class="buttons d-flex flex-column align-items-start">

                <a class="btn btn-success d-block" href="/getting-started-on-docker">Get started with Docker &rarr;</a>

                <a class="btn btn-secondary d-block" href="/getting-started">Get started (native) &rarr;</a>
            </div>
        </div>
        <div class="col-lg-6 d-flex align-items-center">
            <div id="animation-container-home"></div>
        </div>
    </div>

    <div class="row home-block">
        <div class="col col-lg-6">
            <img src="./images/home-startpage.png" />
        </div>
        <div class="col col-lg-6">
            <h2>Elevator pitch</h2>
            <p>
                Warpgate is a fully transparent proxy/bastion for your internal infrastructure that lets you skip manual <code>authorized_keys</code> management and both assign and audit access in a single place.
            </p>
            <p>
                It is an alternative to Teleport-style PAMs or a VPN, minus the client apps and connection rituals for your users must learn.
            </p>
            <p>
                Get it running in 15 minutes:
                <ul>
                <li>add your internal targets</li>
                <li>assign them to user groups</li>
                <li>tell your users where to log in.</li>
                </ul> Warpgate gives them a web page with copy-paste connection details and a browser-based terminal – and nothing to install.
            </p>
        </div>
    </div>

    <div class="row home-block">
        <div class="col col-lg-6">
            <img src="./images/home-connection.png" />
        </div>
        <div class="col col-lg-6">
            <h2>No client</h2>
            <p>
                Warpgate directly exposes native protocol listeners.
                <div>Connect your VSCode through it.</div>
                <div>Use it in your <code>DATABASE_URL</code>.</div>
                <div>Connect to your Kubernetes clusters.</div>
                <div>Or just open a terminal in your browser.</div>
            </p>
            <h2>Not a jump host</h2>
            <p>Warpgate handles authentication, and then transparently hands off the connection to the target server, while saving a live session record for audit.</p>
            <p>Built-in 2FA, SSO and brute-force protection keep the front door locked.</p>
        </div>
    </div>

    <div class="row home-block">
        <div class="col col-lg-6">
            <img src="./images/home-web-terminal.png" />
        </div>
        <div class="col col-lg-6">
            <h2>No SaaS bullshit</h2>
            <p>
                Warpgate is a single binary (or a Docker image) that you download and run locally on your own infrastructure.
            </p>
            <h2>No paid plan</h2>
            <p>
                Warpgate is 100% open-source, free and will stay this way forever.
            </p>
            <p>
                It is financed through support contracts, and custom-order feature development.
            </p>
            <p>
                This allows it to escape the otherwise inevitable cycle of enshittification.
            </p>
            <a class="btn btn-success" href="/for-business" target="_blank">Pro Support &rarr;</a>
        </div>
    </div>

</div>

## How is Warpgate different from a jump host / VPN / Teleport?

| Warpgate                                                 | SSH jump host                                                                                     | VPN                                                                | Teleport                                                                            |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| ✅ **Precise 1:1 assignment between users and services** | (Usually) full access to the network behind the jump host                                         | (Usually) full access to the network                               | ✅ **Precise 1:1 assignment between users and services**                            |
| ✅ **No custom client needed**                           | Jump host config needed                                                                           | ✅ **No custom client needed**                                     | Custom client required                                                              |
| ✅ **2FA out of the box**                                | 🟡 2FA possible with additional PAM plugins                                                       | 🟡 Depends on the provider                                         | ✅ **2FA out of the box**                                                           |
| ✅ **SSO out of the box**                                | 🟡 SSO possible with additional PAM plugins                                                       | 🟡 Depends on the provider                                         | Paid                                                                                |
| ✅ **Command-level audit**                               | 🟡 Connection-level audit on the jump host, no secure audit on the target if root access is given | No secure audit on the target if root access is given              | ✅ **Command-level audit**                                                          |
| ✅ **Full session recording**                            | No secure recording possible on the target if root access is given                                | No secure recording possible on the target if root access is given | ✅ **Full session recording**                                                       |
| ✅ **Non-interactive connections**                       | 🟡 Non-interactive connections are possible if the clients supports jump hosts natively           | ✅ **Non-interactive connections**                                 | Non-interactive connections require using an SSH client wrapper or running a tunnel |
| ✅ **Self-hosted, you own the data**                     | ✅ **Self-hosted, you own the data**                                                              | 🟡 Depends on the provider                                         | SaaS                                                                                |

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

    .jumbo-row {
        margin: 10rem 0;
    }

    .jumbo {
        display: flex;
        flex-direction: column;
    }

    .jumbo h1 {
        font-size: 4rem;
    }

    .jumbo .buttons {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    #animation-container-home {
        flex: auto;
        padding: 0 50px;
        /* background: #070c1a;
        border-radius: 20px;
        box-shadow: 0 0 1px 1px #ffffff21 inset, 0 1px 3px 1px black; */
    }

    .lead {
        max-width: 442px;
    }

    .title {
        font-size: 1.5rem;
    }

    .home-block {
        font-size: 1.1rem;
        margin-bottom: 5rem;
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

    table {
        td, th {
            padding: 1rem 1rem;
        }

        margin-bottom: 2rem;
    }
</style>
