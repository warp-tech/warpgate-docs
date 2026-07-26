---
special: business
---

<div class="business">
    <div class="jumbo">
        <h1>Warpgate for Business</h1>
        <p class="lead title">Warpgate is already 100% free and open-source. <br/>These plans are for when you're on call.</p>
        <p class="lead subtitle">No paid tiers, no locked features, no per-seat billing — the whole product ships under Apache-2.0. What you can buy is a direct line to the people who build it.</p>
    </div>

    <div class="row pricing justify-content-center">
        <div class="col-lg-5 col-12">
            <div class="card plan h-100">
                <div class="card-body d-flex flex-column">
                    <h2 class="plan-name">Professional Support</h2>
                    <div class="price">650€<span class="period">/ month</span></div>
                    <ul class="features">
                        <li><strong>2 hours of e-mail support</strong> per month (1 business day response time)</li>
                        <li>A meet-and-greet Zoom call with your ops team</li>
                        <li>Prioritized GitHub feature request handling</li>
                        <li>Access to <strong>custom feature development</strong> (billed separately on a per-project basis)</li>
                        <li>Knowing the software your company relies on for core security has a stable future</li>
                    </ul>
                    <a class="btn btn-success mt-auto" href="https://buy.stripe.com/14A14m2Lm2YeeOW3ri6J200" target="_blank" data-track="stripe_buy_click">
                        Buy now &rarr;
                    </a>
                </div>
            </div>
        </div>

        <div class="col-lg-5 col-12">
            <div class="card plan h-100">
                <div class="card-body d-flex flex-column">
                    <h2 class="plan-name">Custom</h2>
                    <div class="price">Pricing on request</div>
                    <ul class="features">
                        <li>Everything in <strong>Professional Support</strong></li>
                        <li>Faster <strong>1 hour response time</strong> SLA</li>
                        <li>Tailored support hours to fit your team's schedule</li>
                        <li>Priority access to custom feature development</li>
                    </ul>
                    <a class="btn btn-info mt-auto" href="mailto:business@null.page?subject=Custom%20Support%20Plan&body=[Please include your company details and requirements]" target="_blank" data-track="get_in_touch_click">
                        Get in touch &rarr;
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="row why justify-content-center">
        <div class="col-lg-4 col-12">
            <h3>Stay on the roadmap</h3>
            <p>Your feature requests get prioritised on GitHub, and you can commission custom development when you need something the project doesn't cover yet.</p>
        </div>
        <div class="col-lg-4 col-12">
            <h3>Talk to the maintainers</h3>
            <p>Support comes straight from the developers who write the code — not a first-line queue reading a script. Questions about deployment, upgrades, SSO or protocol quirks land right at the source.</p>
        </div>
        <div class="col-lg-4 col-12">
            <h3>Fund a stable future</h3>
            <p>Warpgate guards access to your infrastructure. A support subscription keeps the project healthy and well-maintained, so the software you depend on stays that way.</p>
        </div>
    </div>

    <div class="row faq justify-content-center">
        <div class="col-lg-8 col-12">
            <h2>Questions</h2>

            <h3>Do I need a plan to use Warpgate?</h3>
            <p>No. Warpgate is fully free and open-source under Apache-2.0, with every feature in the box. These plans only add support and prioritised development.</p>

            <h3>Are there features locked behind a paid tier?</h3>
            <p>Never. There is no enterprise edition and no feature paywall - SSO, MFA, session recording, clustering and everything else are in the free build.</p>

            <h3>What counts as "custom feature development"?</h3>
            <p>Anything specific to your environment - a new protocol quirk, an integration, a workflow tweak. It's scoped and billed per project, and Professional Support gets you access to it; Custom gets you priority.</p>
        </div>
    </div>
</div>

<style>
    article {
        max-width: 100% !important;
    }

    .business .jumbo {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin: 2rem 4rem;
    }

    .business .jumbo h1 {
        font-size: 3.5rem;
        margin: 2rem 0;
    }

    .business .lead {
        max-width: 600px;
    }

    .business .title {
        font-size: 1.5rem;
        color: rgba(var(--bs-body-color-rgb), 50%);
    }

    .business .subtitle {
        color: var(--bs-secondary-color, #888);
    }

    .business .pricing {
        gap: 1.5rem 0;
    }

    .business .plan {
        border-radius: 1rem;
    }

    .business .plan .plan-name {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }

    .business .plan .price {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
    }

    .business .plan .price .period {
        font-size: 1rem;
        font-weight: 400;
        opacity: 0.6;
        margin-left: 0.4rem;
    }

    .business .plan .features {
        list-style: none;
        padding-left: 0;
        margin-bottom: 2rem;
    }

    .business .plan .features li {
        padding: 0.5rem 0 0.5rem 1.75rem;
        position: relative;
    }

    .business .plan .features li::before {
        content: "✓";
        color: var(--bs-success, #28a745);
        position: absolute;
        left: 0;
        font-weight: 700;
    }

    .business .why {
        margin-top: 4rem;
        gap: 2rem 0;
        text-align: center;
    }

    .business .why h3 {
        font-size: 1.25rem;
        margin-bottom: 0.75rem;
    }

    .business .why p {
        color: rgba(var(--bs-body-color-rgb), 70%);
    }

    .business .faq {
        margin-top: 4rem;
    }

    .business .faq h2 {
        text-align: center;
        margin-bottom: 2rem;
    }

    .business .faq h3 {
        font-size: 1.15rem;
        margin-top: 1.75rem;
        margin-bottom: 0.4rem;
    }

    .business .faq p {
        color: rgba(var(--bs-body-color-rgb), 70%);
    }
</style>
