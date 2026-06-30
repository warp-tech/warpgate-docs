---
special: business
---

<div class="business">
    <div class="jumbo">
        <h1>Warpgate for Business</h1>
        <p class="lead title">Warpgate is already 100% free and open-source. <br/>These plans are for when you're on call.</p>
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
                    <a class="btn btn-success mt-auto mb-3" href="mailto:business@null.page?subject=Professional%20Support%20Plan&body=[Please include your company details and requirements]" target="_blank">
                        Get in touch &rarr;
                    </a>
                    <a class="btn btn-info mt-auto" href="https://github.com/sponsors/Eugeny/sponsorships?sponsor=Eugeny&tier_id=471037" target="_blank">
                        Order via GitHub Sponsors &rarr;
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
                    <a class="btn btn-success mt-auto" href="mailto:business@null.page?subject=Custom%20Support%20Plan&body=[Please include your company details and requirements]" target="_blank">
                        Get in touch &rarr;
                    </a>
                </div>
            </div>
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
</style>
