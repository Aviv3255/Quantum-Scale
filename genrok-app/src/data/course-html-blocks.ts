// Course HTML Blocks - Paste your exact HTML here and it will render as-is

export const courseHTMLBlocks: Record<string, string> = {
  // ==================== THE SOCIAL PROOF ====================
  'the-social-proof': `
<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,800;1,400&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

img {
    width: auto !important;
    height: auto !important;
    max-width: 100% !important;
    display: inline-block !important;
}

.sp-landing-section {
    background: #000;
    padding: 0;
    margin: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 16px;
    padding-bottom: 20px;
    box-sizing: border-box;
    overflow: hidden;
    color: white;
}

.sp-intro-text {
    background: #252525;
    border-radius: 25px;
    padding: 12px 30px;
    font-size: 14px;
    line-height: 1.4;
    margin: 18px auto 2px auto;
    max-width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.sp-main-headline {
    font-family: 'Open Sans', sans-serif;
    font-weight: 800;
    font-size: 41.16px;
    line-height: 1.3;
    margin: 10px 16px 0 16px;
    padding: 0;
    color: white;
    text-align: center;
}

.sp-above-image-text {
    font-size: 16px;
    line-height: 1.4;
    margin: 0 16px 10px 16px;
    padding: 0;
    font-weight: 400;
    color: white;
    text-align: center;
}

.sp-hero-image {
    width: 86% !important;
    max-width: 516px !important;
    height: auto !important;
    display: block !important;
    margin: 20px auto !important;
    border-radius: 15px !important;
    filter: drop-shadow(0 0 18px rgba(119, 0, 253, 0.6)) drop-shadow(0 0 35px rgba(119, 0, 253, 0.4)) !important;
}

.sp-price-section {
    margin: 30px auto 0 auto;
    text-align: center;
}

.sp-price-text {
    font-family: 'Open Sans', sans-serif;
    font-weight: 800;
    font-size: 46.256px;
    color: white;
    margin: 0 0 8px 0;
}

.sp-old-price {
    text-decoration: line-through;
    color: #999;
}

.sp-new-price {
    color: #7700fd;
}

.sp-cta-button {
    background: radial-gradient(ellipse at bottom, #b87dfe 0%, #7700fd 40%) !important;
    border: none;
    border-radius: 35px;
    padding: 21px 76px;
    font-size: 19.55px;
    font-weight: 700;
    color: white !important;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 25px auto 0 auto;
    width: auto;
    min-width: 380px;
    height: 81px;
    font-family: 'Open Sans', sans-serif;
    box-shadow: 0 10px 40px rgba(119, 0, 253, 0.5);
}

.sp-cta-button:hover {
    transform: scale(1.08) !important;
    box-shadow: 0 15px 50px rgba(119, 0, 253, 0.7);
    background: linear-gradient(135deg, #8800ff 0%, #b000ff 100%) !important;
}

.sp-cta-button .button-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.3;
}

.sp-cta-button .small-text {
    font-size: 12px !important;
    font-weight: 400 !important;
    text-transform: none !important;
    margin-top: 3px;
    letter-spacing: 0;
    color: #ffffff !important;
}

.sp-secure-payment {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin: 16px auto 0 auto;
    font-size: 13.24px;
    color: #aaa;
}

.sp-secure-payment-icon {
    width: 40px;
    height: 25px;
    background-image: url('https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Mastercard-Logo.wine.png?v=1758464867');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

/* Story Section */
.sp-story-section {
    background: #fff;
    padding: 60px 20px;
    text-align: center;
}

.sp-story-section h1 {
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
    font-size: 26px;
    color: #000;
    margin: 0.67em 0;
}

.sp-story-section p {
    color: #000;
    font-size: 16px;
    line-height: 1.6;
}

.sp-highlight-box {
    background-color: rgb(252, 237, 169);
    font-weight: bold;
    display: inline-block;
    padding: 5px 10px;
}

.sp-purple-text {
    color: #7e42f4;
}

/* What's Included Section */
.sp-whats-included {
    background-color: #000000;
    padding: 60px 20px;
}

.sp-section-title {
    font-family: 'Open Sans', sans-serif;
    font-size: 42px;
    font-weight: 800;
    color: #ffffff;
    text-align: center;
    margin: 0 0 50px 0;
    line-height: 1.3;
}

.sp-bonus-card {
    background: #1a1a1a;
    border-radius: 20px;
    padding: 40px;
    margin: 0 auto 30px auto;
    max-width: 900px;
    border: 2px solid #333;
}

.sp-check-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #00ff88 0%, #00cc66 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 25px auto;
}

.sp-bonus-title {
    font-family: 'Open Sans', sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: #ffffff;
    margin: 0 0 15px 0;
    line-height: 1.3;
    text-align: center;
}

.sp-bonus-description {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: #cccccc;
    line-height: 1.6;
    margin: 0;
    text-align: center;
}

/* Comparison Section */
.sp-comparison-section {
    background-color: #ffffff;
    padding: 60px 20px;
}

.sp-comparison-title {
    font-family: 'Open Sans', sans-serif;
    font-weight: 800;
    font-size: 49.92px;
    margin: 0 0 20px 0;
    color: #000000;
    text-align: center;
}

.sp-comparison-table {
    border-collapse: collapse;
    width: 100%;
    max-width: 800px;
    margin: 40px auto 0 auto;
    border: 1px solid #ccc;
}

.sp-comparison-table th {
    font-size: 24px;
    font-weight: 800;
    text-align: center;
    padding: 20px;
    color: #000000;
    background-color: #d0d0d0;
    border: 1px solid #ccc;
    width: 50%;
}

.sp-comparison-table td {
    padding: 20px;
    font-size: 16px;
    color: #000000;
    background-color: #f8f8f8;
    border: 1px solid #ccc;
    vertical-align: top;
}

/* FAQ Section */
.sp-faq-section {
    background: #fff;
    padding: 60px 20px;
    max-width: 900px;
    margin: 0 auto;
}

.sp-faq-title {
    font-family: 'Open Sans', sans-serif;
    font-weight: 800;
    font-size: 2.5rem;
    text-align: center;
    margin: 0 0 40px 0;
    color: black;
}

.sp-faq-item {
    margin-bottom: 15px;
}

.sp-question {
    background-color: black;
    border-radius: 12px;
    padding: 25px;
    color: white;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    transition: opacity 0.3s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sp-question:hover {
    opacity: 0.9;
}

.sp-answer {
    background-color: white;
    border: 1px solid black;
    border-radius: 8px;
    padding: 20px;
    margin-top: 10px;
    font-size: 16px;
    line-height: 1.7;
    color: black;
    display: none;
}

.sp-answer.active {
    display: block;
}

/* Final CTA Section */
.sp-final-cta-section {
    padding: 80px 20px;
    background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
    text-align: center;
}

.sp-final-headline {
    font-size: 38px;
    font-weight: 800;
    color: #ffffff;
    margin: 0 0 25px 0;
    line-height: 1.3;
}

.sp-final-subtext {
    font-size: 20px;
    color: #cccccc;
    margin: 0 0 40px 0;
    line-height: 1.6;
}

.sp-highlight-box-purple {
    background: rgba(119, 0, 253, 0.15);
    border: 2px solid #7700fd;
    border-radius: 15px;
    padding: 30px;
    margin: 0 auto 40px auto;
    max-width: 800px;
}

.sp-highlight-text {
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.5;
    margin: 0;
}

.sp-urgency-text {
    font-size: 18px;
    font-weight: 700;
    color: #ff6b6b;
    margin: 0 0 30px 0;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.sp-guarantee-text {
    font-size: 16px;
    color: #aaa;
    margin: 25px 0 0 0;
    line-height: 1.6;
}

.sp-ps-final {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    margin: 50px 0 0 0;
    line-height: 1.6;
    font-style: italic;
}

@media (max-width: 768px) {
    .sp-main-headline {
        font-size: 28.7232px;
    }
    .sp-price-text {
        font-size: 32.368px;
    }
    .sp-cta-button {
        font-size: 21px;
        padding: 18px 35px;
        min-width: 90%;
    }
    .sp-comparison-title {
        font-size: 36px;
    }
    .sp-comparison-table th {
        font-size: 18px;
        padding: 15px 10px;
    }
    .sp-comparison-table td {
        font-size: 14px;
        padding: 15px 10px;
    }
}
</style>

<!-- HERO SECTION -->
<div class="sp-landing-section">
    <div class="sp-intro-text">
        In a world where algorithms change overnight...
    </div>

    <h1 class="sp-main-headline">
        How to Force Anyone to Buy From You Using One Psychological Law
    </h1>

    <div class="sp-above-image-text">
        (Turn every visitor into a buyer by triggering the most powerful force in human psychology)
    </div>

    <img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff_5.jpg?v=1760517983" alt="Social Proof Power" class="sp-hero-image">

    <div class="sp-price-section">
        <div class="sp-price-text">
            <span class="sp-old-price">$197</span> <span class="sp-new-price">$10</span>
        </div>
    </div>

    <button class="sp-cta-button" data-checkout="true">
        <div class="button-text">
            <span>ADD TO MY SYSTEM!</span>
            <span class="small-text">(One-time payment • Instant access)</span>
        </div>
    </button>

    <div class="sp-secure-payment">
        <div class="sp-secure-payment-icon"></div>
        <span>Secure 256-bit SSL encrypted payment</span>
    </div>
</div>

<!-- STORY SECTION -->
<div class="sp-story-section">
    <h1>In a world of Chaos...</h1>
    <p>Millions of marketers are fighting to break the creative that sinks money, just to be profitable - and finally see some sales...</p>
    <p><strong>Because their algorithm 'went crazy'...</strong></p>
    <p><img height="365" width="310" alt="" src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-03-25T135606.829.png?v=1742903802"></p>

    <h1>
        <span class="sp-highlight-box">We turn every ad into a money-printing machine</span><br>
        <span class="sp-highlight-box">(For 3 years straight)</span><br>
        <span class="sp-highlight-box">using The Social Proof Tactic</span>
    </h1>

    <p style="margin-top: 40px;"><strong>If you're in eCommerce, selling a service or product...</strong></p>
    <p>The page you're about to read until the end<br>is <strong>worth more than any video</strong> you've seen in the past year</p>

    <p style="margin-top: 40px;"><u><strong>Straight to the point:</strong></u></p>
    <h1 class="sp-purple-text" style="font-size: 36px; margin: 40px 0;">Social Proof = Money</h1>

    <h2 style="font-size: 26px;"><strong>And here's the proof...</strong></h2>
    <p>On 27.02.2024, we started using the Social Proof Tactic on one of our brands, Before that, we had a <strong>lame ROAS of 3.16</strong>...</p>
    <p><img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Whatever_it_takes_We_got_you_5.png?v=1742904328" alt="" style="max-width: 100%;"></p>
    <p style="margin-top: 40px;">And just a few days later... the <strong>ROAS skyrocketed to 27.13...</strong></p>
    <p><img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Whatever_it_takes_We_got_you_6.png?v=1742904467" alt="" style="max-width: 100%;"></p>

    <h1 style="font-size: 28px; margin-top: 40px;"><strong>"Ads give you exposure, social proof makes sure they pull out their <u>credit card</u>."</strong></h1>
    <p style="font-size: 14px; font-style: italic;">(and make them buy impulsively and extremely)</p>
    <p style="margin-bottom: 60px;"><img src="https://media.tenor.com/m-eTuvb1LOgAAAAM/fifth-brother-star-wars.gif" alt="" style="max-width: 80%; border-radius: 15px;"></p>

    <p style="font-size: 1.1em; line-height: 2; margin-bottom: 60px;"><strong>Pay attention...</strong><br>No reliance on Facebook algorithms,<br>No endless product testing...<br>No product page reviews,<br>No creatives that competitors can copy...</p>

    <div style="font-size: 26px; margin: 60px 0;">Creating social proof is a skill that can <span style="font-weight: bold;">print you money</span> In every ad, every hour</div>
    <div style="font-size: 14px; color: #555; font-style: italic;">(Without relying on Zuckerberg's mercy)</div>
    <div><img alt="" src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Zuckerberg-1.gif?v=1742904888" style="max-width: 100%;"></div>

    <p style="margin-top: 20px;">Properly built social proof can turn every ad into a money-printing machine In scale, with no limit and without the need for endless testings.</p>

    <p style="margin-top: 100px; font-size: 24.86px; font-weight: bold;">It all started 3 years ago, when we discovered the power of social proof...</p>
    <p style="margin-top: 20px;">At that moment...</p>
    <p style="font-weight: bold;">Our lives changed.</p>

    <p style="font-style: italic; margin-top: 80px;">We implemented the tactic in every ad...</p>
    <p style="font-size: 23.8px; margin-top: 40px;">Over the course of 3 years, we applied the social proof tactic in <strong>over 300 ads</strong>.</p>

    <p style="margin-top: 80px;">We studied and mastered the most powerful triggers found in psychology influence books</p>
    <p>Until we reached a point where every time…</p>

    <h1 style="font-size: 26px; line-height: 1.1; margin-bottom: 5px;"><span class="sp-highlight-box">the method reduces advertising costs by up</span></h1>
    <h1 style="font-size: 26px; line-height: 1.1; margin-top: 5px; margin-bottom: 5px;"><span class="sp-highlight-box">to 1,500%</span></h1>
    <h2 style="font-size: 23.4px; line-height: 1.1; margin-top: 5px; margin-bottom: 30px;"><span style="font-style: italic;">(CTR, CPM, CPC, CPA)</span></h2>

    <p style="margin-bottom: 40px;"><img src="https://media.tenor.com/tpOdbDAIhokAAAAM/cat-buy-more-roy.gif" alt="" style="max-width: 80%; border-radius: 15px;"></p>

    <p style="margin-top: 160px;"><em>But the most important thing we've gained...</em></p>
    <p style="font-size: 28px; font-weight: bold; margin-top: 70px; margin-bottom: 60px;">Business Security</p>
    <p style="margin-top: 40px;">It can change everything.</p>
    <p>It doesn't matter if Facebook is messing with your ad account...</p>
    <p>It doesn't matter if competitors are copying your creatives...</p>
    <p style="margin-top: 40px;">As long as you have the ability to generate social proof from scratch – the control is in your hands and <strong><span style="background-color: rgb(255, 239, 166);">no one can take it away from you</span>…</strong></p>

    <p style="margin-top: 80px;">Once you have this knowledge,<br>replicate it on every possible ad to get…</p>
    <p style="font-size: 28px; font-weight: bold; margin-top: 30px; margin-bottom: 20px;">Money in the Bank</p>
    <p>So here... We've decided to share all the knowledge we've gained,</p>
    <p>So you can turn ads into social proof machines, One that prints money on autopilot</p>

    <h3 style="margin-top: 60px;"><u><strong>We promise you:</strong></u></h3>
    <p><strong>I</strong>n a few days you will send us a message that you have no way of thanking us, and that we have changed your life.</p>
</div>

<!-- WHAT'S INCLUDED SECTION -->
<div class="sp-whats-included">
    <h2 class="sp-section-title">What's Included:</h2>

    <div class="sp-bonus-card">
        <div class="sp-check-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="#000" stroke-width="3" fill="none">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
        <h1 class="sp-bonus-title">The Hidden Laws of Human Psychology</h1>
        <p class="sp-bonus-description">You'll be exposed to every hidden psychological law that makes a random stranger buy simply because someone else did. Understand exactly how the brain works and what drives the subconscious to make a purchasing decision behind the scenes.</p>
    </div>

    <div class="sp-bonus-card">
        <div class="sp-check-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="#000" stroke-width="3" fill="none">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
        <h1 class="sp-bonus-title">The Social Perception Engine</h1>
        <p class="sp-bonus-description">The complete system for controlling the human brain's perception of your potential customer. Together, from zero, we'll build an entire framework that causes the customer to purchase in an impossible way, devoid of any ability to resist, due to the magical power called The Social Proof Effect.</p>
    </div>

    <div class="sp-bonus-card">
        <div class="sp-check-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="#000" stroke-width="3" fill="none">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
        <h1 class="sp-bonus-title">The Subconscious Conversion Machine</h1>
        <p class="sp-bonus-description">Discover how to transform doubt into belief, and belief into emotion. Learn how to trigger emotional responses in the customer that bypass logic – excitement so powerful it leads them to buy without thinking twice.</p>
    </div>

    <div class="sp-bonus-card">
        <div class="sp-check-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="#000" stroke-width="3" fill="none">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
        <h1 class="sp-bonus-title">The Psychology of Certainty</h1>
        <p class="sp-bonus-description">Here you learn how to make the customer's brain perceive reality exactly as you want. How to make them see your brand as the leader, your product as the only solution, and their purchase as the smartest decision they've ever made.</p>
    </div>

    <div class="sp-bonus-card">
        <div class="sp-check-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="#000" stroke-width="3" fill="none">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
        <h1 class="sp-bonus-title">The Complete Dark Proof Protocol</h1>
        <p class="sp-bonus-description">This is no longer persuasion – it's consciousness programming. Understand how to change the customer's deep beliefs about what "works," who's "worthy," and why you automatically become their safe and preferred choice again and again.</p>
    </div>
</div>

<!-- COMPARISON SECTION -->
<div class="sp-comparison-section">
    <h1 class="sp-comparison-title">We Do it Different</h1>
    <p style="font-size: 18px; color: #000; text-align: center;">Most people think they understand social proof.<br>They're wrong.</p>
    <p style="font-size: 16px; color: #000; text-align: center; margin-top: 20px;">Here's what separates us from everyone else:</p>

    <table class="sp-comparison-table">
        <thead>
            <tr>
                <th>❌ THEM<br>(Traditional Approach)</th>
                <th>✅ US<br>(The Social Proof System)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Add some reviews to the product page and hope people buy</td>
                <td>Engineer psychological proof directly into every ad, landing page, and funnel – creating an unstoppable buying environment</td>
            </tr>
            <tr>
                <td>Wait months to collect real customer testimonials</td>
                <td>Build authentic-looking social proof from day one using proven psychological frameworks</td>
            </tr>
            <tr>
                <td>Rely on expensive products, perfect creatives, and algorithm luck</td>
                <td>Use human psychology to sell any product, in any niche, regardless of creative quality</td>
            </tr>
            <tr>
                <td>Focus on features, benefits, and logical selling</td>
                <td>Trigger the subconscious "everyone's buying this" response that bypasses logic entirely</td>
            </tr>
            <tr>
                <td>Pray the algorithm doesn't kill your account</td>
                <td>Own a skill that works regardless of platform, algorithm, or market conditions</td>
            </tr>
        </tbody>
    </table>

    <p style="font-size: 14px; color: #000; font-style: italic; margin-top: 30px; text-align: left; max-width: 800px; margin-left: auto; margin-right: auto;">
        P.S. – This isn't about adding a few star ratings. This is about understanding the deep psychological mechanisms that make people incapable of saying no when they see others have already said yes.
    </p>

    <button class="sp-cta-button" data-checkout="true" style="margin-top: 50px;">
        <div class="button-text">
            <span>🔒 GIVE ME THE SOCIAL PROOF SYSTEM</span>
            <span class="small-text">(One-time payment • Instant access)</span>
        </div>
    </button>
</div>

<!-- FAQ SECTION -->
<div class="sp-faq-section">
    <h1 class="sp-faq-title">Frequently Asked Questions</h1>

    <div class="sp-faq-item">
        <div class="sp-question" onclick="this.nextElementSibling.classList.toggle('active')">
            <span>Q: "I already use reviews on my product pages. Isn't that enough?"</span>
            <span>▼</span>
        </div>
        <div class="sp-answer"><strong>A:</strong> Product page reviews are just the tip of the iceberg. This is a comprehensive psychological system that makes customers believe everything you say - across your ads, landing pages, emails, and entire funnel. It goes far beyond simple testimonials. You'll learn how to engineer belief at the subconscious level.</div>
    </div>

    <div class="sp-faq-item">
        <div class="sp-question" onclick="this.nextElementSibling.classList.toggle('active')">
            <span>Q: "This probably doesn't apply to my niche/business."</span>
            <span>▼</span>
        </div>
        <div class="sp-answer"><strong>A:</strong> Wrong. This is relevant to everyone. Social proof is the fundamental law of human psychology. Any business applying it can skyrocket conversion rates overnight. Billion-dollar brands have built empires on this principle alone. If you're selling to humans, this applies to you.</div>
    </div>

    <div class="sp-faq-item">
        <div class="sp-question" onclick="this.nextElementSibling.classList.toggle('active')">
            <span>Q: What if I buy multiple courses - do they overlap?</span>
            <span>▼</span>
        </div>
        <div class="sp-answer"><strong>A:</strong> Every course is designed to solve a specific part of the conversion equation. They complement each other without repeating, so stacking them creates compounding impact.</div>
    </div>

    <div class="sp-faq-item">
        <div class="sp-question" onclick="this.nextElementSibling.classList.toggle('active')">
            <span>Q: Will I get lifetime access?</span>
            <span>▼</span>
        </div>
        <div class="sp-answer"><strong>A:</strong> Yes. One-time payment, lifetime access. No subscriptions. No hidden fees.</div>
    </div>

    <div class="sp-faq-item">
        <div class="sp-question" onclick="this.nextElementSibling.classList.toggle('active')">
            <span>Q: Is this just theory or can I apply it right away?</span>
            <span>▼</span>
        </div>
        <div class="sp-answer"><strong>A:</strong> This is 100% practical. You'll get a clear framework + real examples + plug and play templates that you can implement immediately.</div>
    </div>

    <div class="sp-faq-item">
        <div class="sp-question" onclick="this.nextElementSibling.classList.toggle('active')">
            <span>Q: Do I need a team to apply this?</span>
            <span>▼</span>
        </div>
        <div class="sp-answer"><strong>A:</strong> Not at all. Every tactic was designed for solo operators. You can implement everything with minimal tech skills or outsource it easily if you prefer.</div>
    </div>

    <div class="sp-faq-item">
        <div class="sp-question" onclick="this.nextElementSibling.classList.toggle('active')">
            <span>Q: "How long does it take to see results?"</span>
            <span>▼</span>
        </div>
        <div class="sp-answer"><strong>A:</strong> Most people see an immediate impact on their ad performance within 24-72 hours of implementation. Social proof works instantly because it taps into hardwired human psychology.</div>
    </div>

    <div class="sp-faq-item">
        <div class="sp-question" onclick="this.nextElementSibling.classList.toggle('active')">
            <span>Q: "What if Facebook shuts down my ad account?"</span>
            <span>▼</span>
        </div>
        <div class="sp-answer"><strong>A:</strong> That's exactly why you need this. Social proof is a skill that transcends platforms. Whether you're on Facebook, TikTok, Google, or selling in person - human psychology doesn't change. You'll own a skill that can't be taken away.</div>
    </div>

    <div style="text-align: center; margin-top: 50px;">
        <button class="sp-cta-button" data-checkout="true" style="min-width: 650px; min-height: 120px; font-size: 30px;">
            <div class="button-text">
                <span>ADD TO MY SYSTEM!</span>
                <span class="small-text" style="font-size: 16.74px;">(One-time payment • Instant access)</span>
            </div>
        </button>
    </div>
</div>

<!-- FINAL CTA SECTION -->
<div class="sp-final-cta-section">
    <h2 class="sp-final-headline">The Choice Is Simple</h2>
    <p class="sp-final-subtext">Keep burning money on ads that rely on luck...<br>Or master the psychology that guarantees results.</p>

    <div class="sp-highlight-box-purple">
        <p class="sp-highlight-text">
            Every day you don't use social proof is a day you're leaving thousands on the table.<br><br>
            Your competitors are already using these tactics.<br>
            Don't let them win.
        </p>
    </div>

    <p class="sp-urgency-text">Limited Time Offer</p>

    <div class="sp-price-section">
        <div class="sp-price-text">
            <span class="sp-old-price">$197</span> <span class="sp-new-price">$10</span>
        </div>
    </div>

    <button class="sp-cta-button" data-checkout="true" style="max-width: 480px; background: linear-gradient(135deg, #7700fd 0%, #9d00ff 100%) !important;">
        <div class="button-text">
            <span>🔒 YES, I WANT THE SOCIAL PROOF SYSTEM</span>
            <span class="small-text">(One-time payment • Instant access)</span>
        </div>
    </button>

    <p class="sp-guarantee-text">
        🔒 Secure 256-bit SSL encrypted payment<br>
        ✓ Instant access after purchase<br>
        ✓ Lifetime access, no subscriptions
    </p>

    <p class="sp-ps-final">
        P.S. – Remember: Ads get you exposure. Social proof gets you the sale.<br>
        Stop gambling with your ad budget. Start engineering conversions.
    </p>
</div>
  `,

  // ==================== SUBCONSCIOUS TRAP ====================
  'subconscious-trap': `<!DOCTYPE html>

<html lang="en" dir="ltr"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>The Subconscious Trap</title> <style> @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;0,800;0,900;1,400&display=swap');
/* COMPLETE ISOLATION - No inheritance from page */
.landing-section-isolated {
all: initial;
display: block;
background: #000;
padding: 40px 20px;
text-align: center;
color: white;
width: 100%;
max-width: 100%;
overflow-x: hidden;
font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
font-size: 16px;
line-height: 1.5;
position: relative;
z-index: 1;
box-sizing: border-box;
}

/* Reset all children to prevent any external styling */
.landing-section-isolated * {
all: unset;
display: revert;
box-sizing: border-box;
font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.landing-section-isolated .intro-text {
background: #252525;
border-radius: 25px;
padding: 12px 30px;
font-size: 14px;
line-height: 1.4;
margin: 0 auto 20px auto;
max-width: 600px;
display: inline-flex;
align-items: center;
justify-content: center;
gap: 10px;
color: white;
}

.landing-section-isolated .pulse-dot {
width: 12px;
height: 12px;
background: #ff4f03;
border-radius: 50%;
animation: pulse-animation 1.6s infinite;
flex-shrink: 0;
display: block;
}

@keyframes pulse-animation {
0% {
transform: scale(0.95);
box-shadow: 0 0 0 0 rgba(255, 79, 3, 0.7);
}
70% {
transform: scale(1);
box-shadow: 0 0 0 10px rgba(255, 79, 3, 0);
}
100% {
transform: scale(0.95);
box-shadow: 0 0 0 0 rgba(255, 79, 3, 0);
}
}

.landing-section-isolated .main-headline {
font-size: 46.2px;
font-weight: 900;
line-height: 1.2;
margin: 20px auto;
max-width: 900px;
color: white;
text-align: center;
padding: 0 20px;
display: block;
}

.landing-section-isolated .main-headline .highlight {
color: #ff4f03;
font-weight: 900;
}

.landing-section-isolated .sub-headline {
font-size: 22px;
font-style: italic;
margin: 0 auto 30px auto;
opacity: 0.8;
color: white;
text-align: center;
max-width: 800px;
display: block;
}

.landing-section-isolated .screenshot-container {
margin: 30px auto;
text-align: center;
max-width: 900px;
display: block;
}

.landing-section-isolated .screenshot {
max-width: 90%;
height: auto;
border-radius: 8px;
box-shadow: 0 0 16px rgba(255, 79, 3, 0.9), 0 0 28px rgba(255, 79, 3, 0.6), 0 0 40px rgba(255, 79, 3, 0.3);
border: 2px solid rgba(255, 79, 3, 0.7);
display: block;
margin: 0 auto;
}

.landing-section-isolated .pricing-section {
margin: 30px auto 0;
text-align: center;
max-width: 600px;
display: block;
}

.landing-section-isolated .price-text {
font-size: 26px;
font-weight: 600;
margin-bottom: 20px;
color: white;
display: block;
}

.landing-section-isolated .original-price {
text-decoration: line-through;
opacity: 0.6;
margin-right: 15px;
}

.landing-section-isolated .cta-button {
background: radial-gradient(ellipse at bottom, #FFB380 0%, #FF4F03 40%) !important;
border: none !important;
border-radius: 50px !important;
padding: 20px 40px !important;
font-size: 17.3052px !important;
font-weight: 700 !important;
color: white !important;
cursor: pointer !important;
transition: all 0.3s ease !important;
text-transform: uppercase !important;
letter-spacing: 1px !important;
display: inline-block !important;
margin: 20px auto !important;
text-align: center !important;
font-family: 'Open Sans', sans-serif !important;
line-height: 1.3 !important;
width: 90% !important;
max-width: 810px !important;
box-sizing: border-box !important;
box-shadow: 0 6px 16px rgba(255, 79, 3, 0.4) !important;
}

.landing-section-isolated .cta-button:hover {
transform: translateY(-2px);
box-shadow: 0 15px 40px rgba(255, 79, 3, 0.6);
}

.landing-section-isolated .cta-button:active {
transform: translateY(0px);
box-shadow: 0 5px 15px rgba(255, 79, 3, 0.4);
}

.landing-section-isolated .cta-button.loading {
opacity: 0.8;
pointer-events: none;
}

.landing-section-isolated .cta-button small {
font-size: 11.04px;
font-weight: 400;
text-transform: none;
letter-spacing: 0;
display: block;
margin-top: 5px;
}

.landing-section-isolated .secure-payment {
display: flex;
align-items: center;
justify-content: center;
gap: 8px;
font-size: 14px;
color: #e8e8e8;
font-weight: 500;
margin: 15px auto 0;
}

.landing-section-isolated .secure-payment-icon {
width: 32px;
height: 20px;
background-image: url('https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Mastercard-Logo.wine.png');
background-size: contain;
background-repeat: no-repeat;
background-position: center;
display: block;
}

.landing-section-isolated .lock-icon {
width: 22px;
height: 22px;
background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"/></svg>');
background-size: contain;
background-repeat: no-repeat;
background-position: center;
display: inline-block;
vertical-align: middle;
margin-right: 10px;
}

.landing-section-isolated .bundle-info {
font-size: 13px;
color: #e8e8e8;
margin-top: 12px;
display: block;
}

.landing-section-isolated .bundle-link {
color: #ff4f03 !important;
text-decoration: underline !important;
font-weight: 600 !important;
cursor: pointer !important;
border-bottom: 1px solid #ff4f03 !important;
}

.landing-section-isolated .bundle-link:hover {
text-decoration: underline !important;
opacity: 0.8;
border-bottom: 1px solid #ff4f03 !important;
}

.landing-section-isolated .bonus-section {
margin-top: 40px;
text-align: center;
max-width: 800px;
margin-left: auto;
margin-right: auto;
display: block;
}

.landing-section-isolated .bonus-text {
font-size: 15.3px;
font-weight: 400;
text-align: center;
line-height: 1.6;
color: white;
display: block;
}

/* Responsive Design */
@media (max-width: 768px) {
.landing-section-isolated {
padding: 30px 15px;
}
.landing-section-isolated .main-headline {
font-size: 29.4px;
}
.landing-section-isolated .cta-button {
font-size: 18px;
padding: 18px 40px;
}
.landing-section-isolated .sub-headline {
font-size: 18px;
}
.landing-section-isolated .intro-text {
font-size: 12px;
padding: 10px 20px;
}
.landing-section-isolated .bonus-text {
font-size: 13.77px;
}
}

@media (max-width: 480px) {
.landing-section-isolated {
padding: 20px 10px;
}
.landing-section-isolated .main-headline {
font-size: 25.2px;
}
.landing-section-isolated .cta-button {
font-size: 16px;
padding: 16px 30px;
}
.landing-section-isolated .bonus-text {
font-size: 12.24px;
}
}
</style>

</head> <body style="margin: 0; padding: 0; background: #000; overflow-x: hidden;"> <div class="landing-section-isolated"> <div class="intro-text"> <div class="pulse-dot"></div> <span>For the first time ever, in a step-by-step framework</span> </div> <h1 class="main-headline"> How to <span class="highlight">Convert 4-6%+</span> of Your eCommerce Store Visitors Using Extreme Design Manipulations </h1> <p class="sub-headline"> (Even if your site is already beautiful at a billion-dollar brand level…) </p> <div class="screenshot-container"> <img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff.jpg?v=1760351539" alt="Results Dashboard" class="screenshot"> </div> <div class="pricing-section"> <p class="price-text"> <span class="original-price">$197</span> Only $29 Today </p> <button class="cta-button" id="subconscious-add-to-cart-btn" data-variant-id="43187754205277"> <span class="lock-icon"></span>ADD THE PACKAGE FOR $29!<br><small>one time payment, lifetime access</small> </button> <div class="secure-payment"> <div class="secure-payment-icon"></div> <span>Secure 256-bit SSL encrypted payment</span> </div> <div class="bundle-info"> $18.85 If <a href="https://quantum-scale.co/pages/bundle-builder" class="bundle-link">building a bundle</a> </div> </div> <div class="bonus-section"> <div class="bonus-text"> * You will also get 7 Bonuses<br> Worth $929 for FREE </div> </div> </div> <script> (function() { 'use strict'; // ============================================ // CONFIGURATION // ============================================ const CONFIG = { VARIANT_ID: '43187754205277', DEBUG: true, RETRY_ATTEMPTS: 3, RETRY_DELAY: 500 }; // ============================================ // LOGGING UTILITIES // ============================================ const log = { info: (msg, data) => CONFIG.DEBUG && console.log(\`[Subconscious Trap] ℹ️ \${msg}\`, data || ''), success: (msg, data) => CONFIG.DEBUG && console.log(\`[Subconscious Trap] ✅ \${msg}\`, data || ''), error: (msg, data) => console.error(\`[Subconscious Trap] ❌ \${msg}\`, data || ''), warn: (msg, data) => console.warn(\`[Subconscious Trap] ⚠️ \${msg}\`, data || '') }; // ============================================ // CLEANUP INTERFERING ELEMENTS // ============================================ function removeInterferingElements() { log.info('Removing interfering popups and overlays...'); const interferingSelectors = [ '[class*="rewards"]', '[class*="Rewards"]', '[id*="rewards"]', '[id*="Rewards"]', '.smile-launcher-frame', 'iframe[title*="Smile.io"]', '[class*="smile-"]', '.loyalty-modal', '.rewards-launcher', '.modal-backdrop', '.popup-overlay' ]; let removed = 0; interferingSelectors.forEach(selector => { try { const elements = document.querySelectorAll(selector); elements.forEach(el => { el.style.display = 'none'; el.style.visibility = 'hidden'; el.style.opacity = '0'; el.style.pointerEvents = 'none'; if (el.remove) el.remove(); removed++; }); } catch (e) { // Ignore selector errors } }); if (removed > 0) { log.success(\`Removed \${removed} interfering elements\`); } } // ============================================ // ADD TO CART - METHOD 1: SHOPIFY AJAX API // ============================================ async function addToCartAjaxAPI(variantId) { log.info('Attempting Method 1: Shopify Ajax API...'); const response = await fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ items: [{ id: parseInt(variantId), quantity: 1 }] }) }); if (!response.ok) { throw new Error(\`Ajax API failed: \${response.status} \${response.statusText}\`); } return await response.json(); } // ============================================ // ADD TO CART - METHOD 2: FORM DATA // ============================================ async function addToCartFormData(variantId) { log.info('Attempting Method 2: FormData...'); const formData = new FormData(); formData.append('id', variantId); formData.append('quantity', '1'); const response = await fetch('/cart/add.js', { method: 'POST', body: formData }); if (!response.ok) { throw new Error(\`FormData failed: \${response.status} \${response.statusText}\`); } return await response.json(); } // ============================================ // ADD TO CART - METHOD 3: SIMPLE JSON // ============================================ async function addToCartSimpleJSON(variantId) { log.info('Attempting Method 3: Simple JSON...'); const response = await fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: variantId, quantity: 1 }) }); if (!response.ok) { throw new Error(\`Simple JSON failed: \${response.status} \${response.statusText}\`); } return await response.json(); } // ============================================ // ADD TO CART - METHOD 4: FALLBACK FORM SUBMIT // ============================================ function addToCartFormSubmit(variantId) { log.info('Attempting Method 4: Form Submit (fallback)...'); const form = document.createElement('form'); form.method = 'POST'; form.action = '/cart/add'; const idInput = document.createElement('input'); idInput.type = 'hidden'; idInput.name = 'id'; idInput.value = variantId; const qtyInput = document.createElement('input'); qtyInput.type = 'hidden'; qtyInput.name = 'quantity'; qtyInput.value = '1'; form.appendChild(idInput); form.appendChild(qtyInput); document.body.appendChild(form); form.submit(); return new Promise(resolve => { setTimeout(() => resolve({ method: 'form_submit', status: 'submitted' }), 1000); }); } // ============================================ // MAIN ADD TO CART FUNCTION WITH FALLBACKS // ============================================ async function addToCart(variantId) { log.info(\`Starting add to cart process for variant: \${variantId}\`); const methods = [ { name: 'Ajax API', fn: addToCartAjaxAPI }, { name: 'FormData', fn: addToCartFormData }, { name: 'Simple JSON', fn: addToCartSimpleJSON }, { name: 'Form Submit', fn: addToCartFormSubmit } ]; for (const method of methods) { try { log.info(\`Trying: \${method.name}\`); const result = await method.fn(variantId); log.success(\`\${method.name} succeeded!\`, result); return result; } catch (error) { log.warn(\`\${method.name} failed:\`, error.message); // Continue to next method } } throw new Error('All add-to-cart methods failed'); } // ============================================ // REFRESH CART UI // ============================================ async function refreshCart() { log.info('Refreshing cart...'); try { const response = await fetch('/cart.js'); const cart = await response.json(); log.success(\`Cart updated: \${cart.item_count} items, Total: \${cart.total_price}\`); // Update cart count elements const cartCountSelectors = [ '.cart-count', '.cart-count-bubble', '[data-cart-count]', '.cart__count', '#cart-icon-bubble' ]; cartCountSelectors.forEach(selector => { const elements = document.querySelectorAll(selector); elements.forEach(el => { el.textContent = cart.item_count; el.setAttribute('data-cart-count', cart.item_count); }); }); // Trigger Shopify events document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', { bubbles: true, detail: { cart } })); if (window.Shopify && window.Shopify.theme) { document.documentElement.dispatchEvent(new CustomEvent('cart:updated', { bubbles: true, detail: { cart } })); } // Try to open cart drawer setTimeout(() => { openCartDrawer(); }, 300); return cart; } catch (error) { log.error('Failed to refresh cart:', error); } } // ============================================ // OPEN CART DRAWER // ============================================ function openCartDrawer() { log.info('Attempting to open cart drawer...'); // Method 1: Look for cart drawer trigger const cartTriggers = [ '[href="/cart"]', '.cart-link', '.cart-icon', '.header__icon--cart', '[data-cart-drawer]', '#cart-icon-bubble' ]; for (const selector of cartTriggers) { const element = document.querySelector(selector); if (element) { log.info(\`Found cart trigger: \${selector}\`); element.click(); return true; } } // Method 2: Trigger theme-specific events const events = ['theme:cart:open', 'cart:open', 'drawer:open']; events.forEach(eventName => { document.documentElement.dispatchEvent(new CustomEvent(eventName, { bubbles: true })); }); log.warn('Could not find cart drawer trigger'); return false; } // ============================================ // BUTTON CLICK HANDLER // ============================================ async function handleButtonClick(event) { event.preventDefault(); event.stopPropagation(); log.info('Button clicked!'); // Remove interfering elements removeInterferingElements(); const button = event.currentTarget; const originalContent = button.innerHTML; const variantId = button.getAttribute('data-variant-id') || CONFIG.VARIANT_ID; // Disable button button.disabled = true; button.classList.add('loading'); button.style.cursor = 'wait'; button.innerHTML = '<span style="font-size: 18px; color: white; font-weight: 700;">⏳ ADDING TO CART...</span>'; try { // Add to cart with retries const result = await addToCart(variantId); log.success('Successfully added to cart!', result); // Show success button.style.background = 'radial-gradient(ellipse at bottom, #FFB380 0%, #FF6F33 40%)'; button.innerHTML = '<span style="font-size: 18px; color: white; font-weight: 700;">✓ ADDED SUCCESSFULLY!</span>'; // Refresh cart await refreshCart(); // Reset button after 2 seconds setTimeout(() => { button.innerHTML = originalContent; button.disabled = false; button.classList.remove('loading'); button.style.cursor = 'pointer'; button.style.background = ''; }, 2000); } catch (error) { log.error('Failed to add to cart:', error); // Show error button.style.background = '#d32f2f'; button.innerHTML = '<span style="font-size: 16px; color: white; font-weight: 700;">❌ ERROR - PLEASE TRY AGAIN</span>'; // Reset button after 3 seconds setTimeout(() => { button.innerHTML = originalContent; button.disabled = false; button.classList.remove('loading'); button.style.cursor = 'pointer'; button.style.background = ''; }, 3000); } } // ============================================ // INITIALIZATION // ============================================ function init() { log.info('Initializing Subconscious Trap System...'); const button = document.getElementById('subconscious-add-to-cart-btn'); if (!button) { log.error('Button not found! Retrying...'); setTimeout(init, 500); return; } log.success('Button found!'); // Remove old event listeners const newButton = button.cloneNode(true); button.parentNode.replaceChild(newButton, button); // Add click handler newButton.addEventListener('click', handleButtonClick); // Ensure button is on top newButton.style.position = 'relative'; newButton.style.zIndex = '999999'; log.success('Subconscious Trap System ready! 🚀'); } // ============================================ // START THE SYSTEM // ============================================ // Remove interfering elements immediately removeInterferingElements(); // Continue removing them periodically [1000, 2000, 3000, 5000].forEach(delay => { setTimeout(removeInterferingElements, delay); }); // Initialize when ready if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); } // Backup initialization setTimeout(init, 500); setTimeout(init, 1500); // ============================================ // MANUAL TESTING FUNCTION // ============================================ window.testSubconsciousSystem = function() { log.info('=== MANUAL TEST TRIGGERED ==='); const button = document.getElementById('subconscious-add-to-cart-btn'); if (button) { button.click(); } else { log.error('Button not found for manual test!'); } }; // ============================================ // DIAGNOSTICS FUNCTION // ============================================ window.diagnoseSubconsciousSystem = function() { console.log('=== SUBCONSCIOUS TRAP DIAGNOSTICS ==='); console.log('Button:', document.getElementById('subconscious-add-to-cart-btn')); console.log('Variant ID:', CONFIG.VARIANT_ID); console.log('Shopify available:', typeof Shopify !== 'undefined'); console.log('Cart API:', '/cart/add.js'); console.log('=========================='); }; log.info('Subconscious Trap System script loaded successfully! 🎉'); log.info('Test manually with: testSubconsciousSystem()'); log.info('Run diagnostics with: diagnoseSubconsciousSystem()'); })(); </script> </body> </html> <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>The Story Behind Subconscious Design</title> <style> @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800;900&display=swap');
/* CRITICAL ISOLATION */
.profit-engines-mega-section {
all: initial;
display: block;
}

.profit-engines-mega-section * {
all: unset;
display: revert;
box-sizing: border-box;
}

.profit-engines-mega-section {
position: relative !important;
margin: 0 !important;
padding: 40px 0 !important;
background: #ffffff !important;
font-family: 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
line-height: 1.6 !important;
overflow-x: hidden !important;
box-sizing: border-box !important;
width: 100% !important;
clear: both !important;
}

body {
background: #ffffff !important;
margin: 0 !important;
padding: 0 !important;
}

html {
background: #ffffff !important;
}
.profit-engines-mega-section .mega-content-wrapper {
max-width: 800px !important;
margin: 0 auto !important;
padding: 0 20px !important;
position: relative !important;
z-index: 1 !important;
background: transparent !important;
}
.profit-engines-mega-section .ultra-bold-title-block {
margin: 0 0 25px 0 !important;
padding: 0 !important;
text-align: center !important;
background: transparent !important;
}
.profit-engines-mega-section .ultra-bold-line {
font-family: 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
font-size: 24.288px !important;
font-weight: 900 !important;
font-style: normal !important;
text-align: center !important;
color: #000000 !important;
margin: 0 !important;
padding: 0 !important;
line-height: 0.95 !important;
display: block !important;
text-rendering: optimizeLegibility !important;
-webkit-font-smoothing: antialiased !important;
-moz-osx-font-smoothing: grayscale !important;
font-stretch: normal !important;
letter-spacing: -0.02em !important;
}
.profit-engines-mega-section .ultra-bold-line:first-child {
margin-bottom: 8px !important;
}
.profit-engines-mega-section .mega-subtitle {
font-size: 23px !important;
font-weight: 700 !important;
text-align: center !important;
margin: 40px 0 !important;
color: #000000 !important;
font-family: 'Open Sans', sans-serif !important;
}
.profit-engines-mega-section .mega-red-text {
color: #ff4f03 !important;
font-weight: 700 !important;
}
.profit-engines-mega-section .mega-paragraph {
font-size: 18px !important;
color: #000000 !important;
margin-bottom: 20px !important;
text-align: left !important;
font-family: 'Open Sans', sans-serif !important;
line-height: 1.6 !important;
}
.profit-engines-mega-section .mega-center-text {
text-align: center !important;
}
.profit-engines-mega-section .mega-meme-container {
text-align: center !important;
margin: 40px 0 !important;
padding: 0 !important;
}
.profit-engines-mega-section .mega-meme-gif {
max-width: 90% !important;
height: auto !important;
border-radius: 12px !important;
display: block !important;
margin: 0 auto !important;
}
@media (min-width: 768px) {
.profit-engines-mega-section .mega-meme-gif {
max-width: 600px !important;
width: 600px !important;
}
.profit-engines-mega-section .ultra-bold-line {
font-size: 26.7168px !important;
}
.profit-engines-mega-section .ultra-bold-line[style*="font-size: 28.704px"] {
font-size: 31.5744px !important;
}
.profit-engines-mega-section .mega-subtitle {
font-size: 25.3px !important;
}
.profit-engines-mega-section .mega-paragraph {
font-size: 19.8px !important;
margin-bottom: 22px !important;
}
.profit-engines-mega-section .mega-quote {
font-size: 35.2px !important;
}
.profit-engines-mega-section .mega-paragraph[style*="font-size: 24px"] {
font-size: 26.4px !important;
}
.profit-engines-mega-section .mega-paragraph[style*="margin-bottom: 76px"] {
margin-bottom: 83.6px !important;
}
.profit-engines-mega-section .mega-paragraph[style*="margin-bottom: 26px"] {
margin-bottom: 28.6px !important;
}
.profit-engines-mega-section .mega-paragraph[style*="margin-bottom: 52px"] {
margin-bottom: 57.2px !important;
}
.profit-engines-mega-section .mega-meme-container {
margin: 44px 0 !important;
}
.profit-engines-mega-section .mega-quote {
margin: 44px 0 !important;
}
.profit-engines-mega-section h2 {
font-size: 35.2px !important;
margin: 0 0 22px 0 !important;
}
}
.profit-engines-mega-section .mega-quote {
font-size: 32px !important;
color: #ff4f03 !important;
font-weight: 700 !important;
text-align: center !important;
margin: 40px 0 !important;
font-family: 'Open Sans', sans-serif !important;
}
.profit-engines-mega-section .ultra-bold-line {
font-display: block !important;
}
.profit-engines-mega-section .mega-meme-gif.smaller-centered {
max-width: 500px !important;
width: 90% !important;
}
@media (min-width: 768px) {
.profit-engines-mega-section .mega-meme-gif.smaller-centered {
max-width: 500px !important;
width: 500px !important;
}
}
.profit-engines-mega-section .mega-meme-gif.larger-image {
max-width: 100% !important;
width: 100% !important;
transform: scale(1.05) !important;
border-radius: 12px !important;
}
@media (min-width: 768px) {
.profit-engines-mega-section .mega-meme-gif.larger-image {
max-width: 770px !important;
width: 770px !important;
}
}
</style>

<link rel="preload" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@900&display=swap" as="style"> <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"> </head> <body> <div class="profit-engines-mega-section"> <div class="mega-content-wrapper"> <div class="ultra-bold-title-block"> <div class="ultra-bold-line" style="font-size: 28.704px !important;"><strong>While 30 Million+ eCommerce Stores Are Stuck at 2% Conversions...</strong></div> </div> <p class="mega-paragraph" style="margin-bottom: 52px !important; text-align: center; font-size: 20px !important;">chasing products, testing endless creatives, and praying to the algorithm gods for mercy...</p> <div class="mega-meme-container"> <img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/facepalm-stress.gif?v=1747737705" alt="Facepalm stress" class="mega-meme-gif larger-image"> </div> <p class="mega-paragraph" style="font-size: 24px !important; margin-bottom: 40px !important; text-align: center; font-weight: bold;">A small group discovered something else entirely.</p> <p class="mega-paragraph" style="font-size: 20px !important; text-align: center; margin: 60px auto !important; font-style: italic; max-width: 700px; line-height: 1.5;">"Subconscious design is like a <strong>passcode to the customer's brain</strong> - change the code, change the decision, and multiply the revenue."</p> <p class="mega-paragraph" style="margin-bottom: 52px !important; text-align: center;">The short page you're about to read is <span style="background-color: #fceda9;">worth more than every YouTube video</span> you watched this past year.</p> <br> <p class="mega-paragraph" style="margin-bottom: 26px !important; font-weight: bold; font-size: 20px !important;">Pay attention…</p> <p class="mega-paragraph" style="margin-bottom: 20px !important;">No more "nice design"...</p> <p class="mega-paragraph" style="margin-bottom: 20px !important;">No more Shopify templates…</p> <p class="mega-paragraph" style="margin-bottom: 20px !important;">No more lookalike websites to your competitors…</p> <p class="mega-paragraph" style="margin-bottom: 40px !important;">No more burning money on ads…</p> <br> <br> <p class="mega-paragraph" style="font-size: 21px !important; text-align: center;">Our framework bypasses the customer's logic and <strong>sells directly to their subconscious</strong> - through pure impulse.</p> <p class="mega-paragraph" style="font-size: 15px !important; text-align: center; font-style: italic;">(Yes, with micro-design elements, <strong>we make people buy.</strong>)</p> <div class="mega-meme-container"> <img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/HOW_TO.gif?v=1753716540" alt="How it works" class="mega-meme-gif"> </div> <br> <p class="mega-paragraph" style="font-size: 25.3px !important; font-weight: bold !important; margin: 60px 0 30px 0 !important; text-align: center;">It all started in 2019…</p> <p class="mega-paragraph" style="font-size: 13px !important; color: gray; text-align: center; margin-bottom: 30px !important;">(20/01/2019 – The A/B test that changed everything we thought about design)</p> <p class="mega-paragraph" style="margin-bottom: 26px !important;">We had a struggling fashion store, <strong>barely breaking even</strong> - fully dependent on Meta's algorithm.</p> <p class="mega-paragraph" style="margin-bottom: 26px !important;">Every day felt like a gamble. Profitability was pure luck.</p> <div class="mega-meme-container"> <img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-07-23T120253.204.png?v=1753261389" alt="Struggling store" class="mega-meme-gif smaller-centered"> </div> <br> <p class="mega-paragraph" style="font-size: 20px !important; font-weight: bold !important; margin: 40px 0 20px 0 !important;">But then...</p> <p class="mega-paragraph" style="margin-bottom: 26px !important;">We decided to run, for the first time ever, <strong>an A/B test on the "ADD TO CART" button color...</strong></p> <p class="mega-paragraph" style="font-size: 14px !important; font-style: italic; margin-bottom: 40px !important;">(In short - you launch two versions of the product page: one with the change, one without. You split the traffic 50/50 and measure the numbers on each version.)</p> <br> <p class="mega-paragraph" style="margin-bottom: 26px !important;">We let the test run for a few solid days…</p> <p class="mega-paragraph" style="font-size: 24px !important; font-weight: bold !important; text-align: center; margin: 40px 0 !important;">And here's what happened...</p> <div class="mega-meme-container"> <img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Hurdeep_6.png?v=1747745602" alt="A/B Test Results" class="mega-meme-gif"> </div> <p class="mega-paragraph" style="font-size: 22px !important; font-weight: bold !important; text-align: center; margin: 40px 0 !important;">Conversion rate increased by <span style="color: #ff4f03;">44%</span>,<br>from a single small design change!</p> <p class="mega-paragraph" style="margin-bottom: 60px !important; text-align: center;">And the truth?<br>We actually thought the new version would perform worse… <strong>We were wrong.</strong></p> <br> <h2 style="font-size: 28px !important; font-weight: 900 !important; text-align: center; text-decoration: underline; margin: 80px 0 40px 0 !important;">That was the moment we realized...</h2> <p class="mega-paragraph" style="font-size: 20px !important; text-align: center; margin-bottom: 30px !important;">The brain doesn't buy through reason. It buys through manipulated perception.</p> <p class="mega-paragraph" style="font-size: 20px !important; text-align: center; margin-bottom: 30px !important;">And if we could control what it sees, feels, and expects...</p> <p class="mega-paragraph" style="font-size: 20px !important; font-weight: bold; text-align: center; margin-bottom: 60px !important;">We could also control the <span style="color: #ff4f03;">wallet</span>.</p> <div class="mega-meme-container"> <img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-11-02_at_09.16.46_e6ae7b68.jpg?v=1762067876" alt="Wallet control" class="mega-meme-gif larger-image"> </div> <p class="mega-paragraph" style="font-size: 14px !important; font-style: italic; text-align: center; margin-bottom: 60px !important;">*Subconscious design is the use of strategic manipulations - layouts, copywriting, and color combinations - that convert customers without any logical reason.</p> <br> <p class="mega-paragraph" style="font-size: 22px !important; font-weight: bold !important; text-align: center; margin: 80px 0 40px 0 !important;">So, We ran A/B tests on every possible element…</p> <p class="mega-paragraph" style="margin-bottom: 40px !important; text-align: center;">We tested every possible element - every color, every word, every pixel.</p> <div class="mega-meme-container"> <img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2.gif?v=1751796400" alt="Testing process" class="mega-meme-gif"> </div> <p class="mega-paragraph" style="font-size: 19px !important; margin: 60px 0 !important; text-align: center;">Until we created a step-by-step psychological design protocol that influences the subconscious and makes the customer activate <strong>impulse buying triggers.</strong></p> <p class="mega-paragraph" style="font-size: 19px !important; margin: 60px 0 !important; text-align: center;">And now, we decided to distill everything into one single Framework that within 24 hours will transform your site <strong>into a sales machine</strong>.</p> <div class="mega-meme-container"> <img src="https://media.tenor.com/xZF5yaaqT7kAAAAM/jul-juld.gif" alt="Sales machine" class="mega-meme-gif larger-image"> </div> <p class="mega-paragraph" style="font-size: 13px !important; font-style: italic; text-align: center; margin-bottom: 60px !important;">*Yes - even if you're dropshipping from AliExpress and have no ability to shoot studio-grade photos.</p> <p class="mega-paragraph" style="font-size: 21px !important; font-weight: bold !important; text-align: center; margin: 60px 0 30px 0 !important;">All laid out step by step,<br>with full implementation <span style="color: #ff4f03;">in just 24 hours</span>.</p> <p class="mega-paragraph" style="text-align: center; margin-bottom: 20px !important;">*And yes - everything is backed by proof. It doesn't matter who you are, or how beautiful your site looks, <strong>we guarantee…</strong></p> <p class="mega-paragraph" style="font-size: 19px !important; font-weight: bold !important; text-align: center; margin-bottom: 80px !important;">If you implement everything - your conversion rate will climb.</p> </div> </div> </body> </html> <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>The Subconscious Trap Course</title> <style> @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800;900&display=swap');
/* CRITICAL ISOLATION */
.course-mega-section {
all: initial;
display: block;
}

.course-mega-section * {
all: unset;
display: revert;
box-sizing: border-box;
}

.course-mega-section {
position: relative !important;
margin: 0 !important;
padding: 0 !important;
background: #ffffff !important;
font-family: 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
line-height: 1.6 !important;
overflow-x: hidden !important;
box-sizing: border-box !important;
width: 100% !important;
clear: both !important;
}
.course-mega-section .mega-content-wrapper {
max-width: 800px !important;
margin: 0 auto !important;
padding: 0 20px !important;
position: relative !important;
z-index: 1 !important;
background: #ffffff !important;
}
.course-mega-section .mega-paragraph {
font-size: 18px !important;
color: #000000 !important;
margin-bottom: 20px !important;
text-align: left !important;
font-family: 'Open Sans', sans-serif !important;
line-height: 1.6 !important;
}
.course-mega-section .testimonial-images {
text-align: center !important;
margin: 40px 0 !important;
}
.course-mega-section .testimonial-images img {
max-width: 100% !important;
height: auto !important;
display: block !important;
margin: 0 auto 1px auto !important;
border-radius: 8px !important;
}
.course-mega-section .free-text {
font-size: 22px !important;
font-weight: 400 !important;
margin-bottom: 40px !important;
text-align: left !important;
color: #000000 !important;
font-family: 'Open Sans', sans-serif !important;
background: transparent !important;
background-color: transparent !important;
}
.course-mega-section .free-text .underline {
text-decoration: underline !important;
font-weight: 400 !important;
background: transparent !important;
background-color: transparent !important;
}

.course-mega-section .main-title {
font-size: 26px !important;
font-weight: 900 !important;
color: #1a1a1a !important;
margin: 15px 0 30px 0 !important;
font-family: 'Open Sans', sans-serif !important;
text-align: center !important;
}

body {
background: #ffffff !important;
margin: 0 !important;
padding: 0 !important;
}
</style>

<link rel="preload" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@900&display=swap" as="style"> <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"> </head> <body> <script> function animateCounter() { const counter = document.getElementById('price-counter'); const target = 929; const duration = 2000; const startTime = performance.now(); function updateCounter(currentTime) { const elapsed = currentTime - startTime; const progress = Math.min(elapsed / duration, 1); const easeOutQuart = 1 - Math.pow(1 - progress, 4); const currentValue = Math.floor(easeOutQuart * target); counter.textContent = '$' + currentValue; if (progress < 1) { requestAnimationFrame(updateCounter); } else { counter.textContent = '$' + target; } } requestAnimationFrame(updateCounter); } document.addEventListener('DOMContentLoaded', function() { const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { animateCounter(); observer.unobserve(entry.target); } }); }, { threshold: 0.5 }); const priceCounter = document.getElementById('price-counter'); if (priceCounter) { observer.observe(priceCounter); } }); </script> <div class="course-mega-section"> <div class="mega-content-wrapper"> <h2 style="color: #888888 !important; font-weight: 400 !important; letter-spacing: 0.45em !important; font-size: 16.2px !important; margin: 20px 0 15px 0 !important; font-family: 'Open Sans', sans-serif !important; text-align: center !important;">INTRODUCING</h2> <h1 class="main-title">THE SUBCONSCIOUS TRAP</h1> <p class="mega-paragraph" style="margin-bottom: 20px !important; font-size: 19px !important;">In this framework, you're about to discover the <strong>exact step-by-step system to convert 4-6%+</strong> of your store visitors using extreme design manipulations that bypass logic and trigger impulse purchases.</p> <p class="mega-paragraph" style="font-style: italic !important; font-size: 15.2px !important; margin-bottom: 40px !important;">(Some of our students consistently reach 8-10%+ conversion rates)</p> <div class="testimonial-images"> <img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Comments_1.jpg?v=1752231195" alt="Testimonial 1"> <img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Comments.jpg?v=1752231158" alt="Testimonial 2"> </div> <h2 style="font-size: 28px !important; font-weight: 900 !important; color: #000000 !important; margin: 120px 0 40px 0 !important; font-family: 'Open Sans', sans-serif !important;">You're about to unlock 4-6%+ conversion rates...</h2> <p class="mega-paragraph" style="margin-bottom: 26px !important;">This is a <strong>battle-tested framework</strong> built on thousands of A/B tests - NOT guesswork or theory.</p> <br /> <p class="mega-paragraph" style="margin-bottom: 60px !important;">This isn't about one lucky campaign or temporary results. This framework ensures your conversion rate stays consistently high, month after month.</p> <br /> <br /> <p class="mega-paragraph" style="font-style: italic !important; margin-bottom: 26px !important; font-size: 19px !important;">Imagine this...</p> <p class="mega-paragraph" style="margin-bottom: 40px !important; font-size: 19px !important;">What if you had a <strong>proven design system</strong> that automatically converts 4-6% of every visitor who lands on your store?</p> <br /> <p class="mega-paragraph" style="margin-bottom: 20px !important; font-size: 19px !important;">A system that works <strong>24/7, automatically...</strong></p> <p class="mega-paragraph" style="font-style: italic !important; margin-bottom: 40px !important; font-size: 15px !important; margin-top: -10px !important;">(No matter what time zone, no matter what device!)</p> <br /> <p class="mega-paragraph" style="margin-bottom: 26px !important;">A system you can replicate on any store, any product, any niche?</p> <p class="mega-paragraph" style="margin-bottom: 35px !important; margin-top: 10px !important;">How would your business look?</p> <br /> <p class="mega-paragraph" style="text-align: center !important; font-size: 27px !important; margin-bottom: 90px !important; font-weight: bold;"><span style="color: #ff4f03;">This is your reality starting today.</span></p> <br /> <p class="mega-paragraph" style="margin-bottom: 26px !important; font-size: 19px !important;">Listen...</p> <p class="mega-paragraph" style="margin-bottom: 26px !important;">I know how frustrating it is to see traffic come in but no sales.</p> <br /> <p class="mega-paragraph" style="margin-bottom: 26px !important;">I know the pain of spending money on ads with barely any ROI...</p> <br /> <p class="mega-paragraph" style="margin-bottom: 80px !important;">But I also know <strong>you're 100% capable of reaching 4-6%+ conversions</strong> - starting right now.</p> <br /> <br /> <p class="mega-paragraph" style="margin-bottom: 5px !important; font-size: 25.2px !important; font-weight: bold;">Here's our personal guarantee...</p> <p class="mega-paragraph" style="margin-bottom: 46px !important; font-size: 18px !important;">If you implement this framework step by step, <strong>your conversion rate WILL increase</strong>. Period.</p> <br /> <p class="mega-paragraph" style="margin-bottom: 46px !important; font-size: 18px !important;">I'm excited for you... because you're minutes away from discovering what truly drives conversions.</p> <p class="mega-paragraph" style="margin-bottom: 60px !important; font-size: 18px !important;">And if you're serious about maximizing every visitor... if you want to stop leaving money on the table... <strong>then from this moment on, you're on the path to 4-6%+ conversions.</strong></p> <h2 style="font-size: 26px !important; font-weight: 700 !important; color: #000000 !important; margin: 120px 0 30px 0 !important; font-family: 'Open Sans', sans-serif !important;">A glimpse at what's inside...</h2> <p class="mega-paragraph" style="margin-bottom: 15px !important; font-size: 16.1px !important;">🎯 <strong>The Brain, Unlocked</strong> - What triggers the brain to buy and how to activate those triggers on demand</p> <p class="mega-paragraph" style="margin-bottom: 15px !important; font-size: 16.1px !important;">🎯 <strong>The Copywriting Secrets</strong> - The exact button text that boosted our conversions by 39%</p> <p class="mega-paragraph" style="margin-bottom: 15px !important; font-size: 16.1px !important;">🎯 <strong>The Power of Fonts</strong> - Which fonts increase trust and perceived brand value</p> <p class="mega-paragraph" style="margin-bottom: 15px !important; font-size: 16.1px !important;">🎯 <strong>Winning Layouts</strong> - Data-backed page structures that psychologically convert</p> <p class="mega-paragraph" style="margin-bottom: 15px !important; font-size: 16.1px !important;">🎯 <strong>Code-Based Conversion Hacks</strong> - CSS tweaks that increased our purchase rate by 21%</p> <p class="mega-paragraph" style="margin-bottom: 15px !important; font-size: 16.1px !important;">🎯 <strong>Color Manipulations</strong> - The exact color tactics that knock out the subconscious</p> <p class="mega-paragraph" style="margin-bottom: 15px !important; font-size: 16.1px !important;">🎯 <strong>Psychological Positioning</strong> - How to charge double your competitors and still convert at 6%+</p> <p class="mega-paragraph" style="margin-bottom: 60px !important; font-size: 16.1px !important;">🎯 <strong>The Subconscious Switch</strong> - 70+ step-by-step implementation tasks</p> <p class="mega-paragraph" style="font-style: italic !important; margin-bottom: 26px !important; margin-top: 120px !important;">And that's just the framework itself...</p> <p class="mega-paragraph" style="margin-bottom: 26px !important; font-size: 19px !important;">We're also giving you <strong>7 exclusive bonuses worth</strong>…</p> <div style="text-align: left !important; margin: 40px 0 !important;"> <div id="price-counter" style="font-size: 72px !important; font-weight: 900 !important; color: #000000 !important; font-family: 'Open Sans', sans-serif !important; margin-bottom: 20px !important;">\$0</div> </div> <div class="free-text">absolutely <span class="underline">FREE</span> when you get the framework today!</div> </div> </div> </body> </html> <!DOCTYPE html> <html lang="en" dir="ltr"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Bonus Section</title> <style> /* CRITICAL ISOLATION */ .bonus-main-container { all: initial; display: block; }
.bonus-main-container * {
all: unset;
display: revert;
box-sizing: border-box;
}

.bonus-main-container * {
margin: 0 !important;
padding: 0 !important;
box-sizing: border-box !important;
}

body {
margin: 0 !important;
padding: 0 !important;
overflow-x: hidden !important;
}

.bonus-main-container {
max-width: 1200px !important;
margin: 60px auto !important;
display: flex !important;
flex-direction: column !important;
gap: 30px !important;
font-family: Arial, sans-serif !important;
background-color: transparent !important;
padding: 20px !important;
width: 100% !important;
clear: both !important;
overflow-x: hidden !important;
}
.bonus-card {
background: white !important;
border-radius: 15px !important;
padding: 30px 40px !important;
text-align: center !important;
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1) !important;
position: relative !important;
display: flex !important;
flex-direction: column !important;
align-items: center !important;
margin: 0 !important;
transform: translateY(0) !important;
transition: all 0.3s ease !important;
width: 100% !important;
max-width: 100% !important;
overflow: hidden !important;
}
.bonus-card:hover {
transform: translateY(-5px) !important;
box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2), 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}
.bonus-badge {
background: #000 !important;
color: white !important;
padding: 8px 20px !important;
border-radius: 20px !important;
font-size: 14px !important;
font-weight: bold !important;
display: inline-block !important;
margin-bottom: 20px !important;
align-self: center !important;
font-family: Arial, sans-serif !important;
}
.bonus-badge::before {
content: "⭐ " !important;
}
.card-content {
display: flex !important;
align-items: flex-start !important;
gap: 30px !important;
width: 100% !important;
max-width: 1000px !important;
flex-direction: row-reverse !important;
min-height: 250px !important;
}
.product-container {
flex: 0 0 350px !important;
display: flex !important;
justify-content: center !important;
align-items: flex-start !important;
padding-top: 20px !important;
}
.bonus-product-image {
width: 100% !important;
max-width: 350px !important;
height: auto !important;
border-radius: 10px !important;
display: block !important;
}
.content-container {
flex: 1 !important;
text-align: left !important;
display: flex !important;
flex-direction: column !important;
gap: 20px !important;
}
.bonus-title {
font-size: 35.2px !important;
font-weight: 900 !important;
color: #ff4f03 !important;
margin: 0 !important;
text-transform: none !important;
letter-spacing: 1px !important;
line-height: 1.2 !important;
font-family: Arial, sans-serif !important;
min-height: auto !important;
word-break: keep-all !important;
overflow-wrap: break-word !important;
hyphens: none !important;
}
.bonus-description {
font-size: 15.3px !important;
color: #333 !important;
line-height: 1.6 !important;
margin: 0 !important;
text-align: left !important;
font-family: Arial, sans-serif !important;
word-break: keep-all !important;
overflow-wrap: break-word !important;
hyphens: none !important;
}
.value-section {
background: #000 !important;
border-radius: 25px !important;
padding: 12px 20px !important;
display: inline-flex !important;
justify-content: space-between !important;
align-items: center !important;
gap: 15px !important;
min-width: 300px !important;
margin-left: 0 !important;
}
.value-text {
color: white !important;
font-size: 18px !important;
font-weight: bold !important;
font-family: Arial, sans-serif !important;
white-space: nowrap !important;
}
.value-text span {
text-decoration: line-through !important;
opacity: 0.8 !important;
}
.free-text {
background: #ff4f03 !important;
color: white !important;
padding: 8px 20px !important;
border-radius: 20px !important;
font-weight: bold !important;
font-size: 16px !important;
font-family: Arial, sans-serif !important;
white-space: nowrap !important;
}
@media (max-width: 1024px) {
.card-content {
flex-direction: column !important;
gap: 20px !important;
text-align: center !important;
}
.content-container {
text-align: center !important;
}
.bonus-description {
text-align: center !important;
}
.value-section {
margin: 0 auto !important;
}
.product-container {
flex: none !important;
display: flex !important;
justify-content: center !important;
align-items: center !important;
width: 100% !important;
}
}
@media (max-width: 768px) {
.bonus-main-container {
padding: 15px !important;
margin: 30px auto !important;
width: 90% !important;
max-width: 90% !important;
}
.bonus-card {
padding: 20px 15px !important;
width: 100% !important;
}
.bonus-title {
font-size: 26.4px !important;
padding: 0 !important;
}
.bonus-description {
font-size: 15.3px !important;
padding: 0 !important;
}
.value-section {
display: flex !important;
flex-direction: column !important;
gap: 8px !important;
text-align: center !important;
padding: 10px 15px !important;
min-width: auto !important;
max-width: 100% !important;
width: auto !important;
margin: 0 auto !important;
}
.value-text {
font-size: 18px !important;
}
.free-text {
font-size: 16px !important;
padding: 6px 15px !important;
}
.product-container {
flex: none !important;
display: flex !important;
justify-content: center !important;
align-items: center !important;
width: 100% !important;
padding: 0 !important;
}
.bonus-product-image {
max-width: 100% !important;
width: 100% !important;
height: auto !important;
}
}
@media (max-width: 480px) {
.bonus-main-container {
padding: 10px !important;
margin: 20px auto !important;
width: 85% !important;
max-width: 85% !important;
gap: 20px !important;
}
.bonus-card {
padding: 15px 10px !important;
border-radius: 10px !important;
margin: 0 !important;
}
.bonus-badge {
padding: 6px 15px !important;
font-size: 12px !important;
margin-bottom: 15px !important;
}
.bonus-title {
font-size: 26.4px !important;
padding: 0 !important;
}
.bonus-description {
font-size: 15.3px !important;
padding: 0 !important;
line-height: 1.6 !important;
}
.value-section {
flex-direction: column !important;
gap: 6px !important;
padding: 8px 12px !important;
min-width: auto !important;
width: auto !important;
max-width: 100% !important;
}
.value-text {
font-size: 18px !important;
}
.free-text {
font-size: 16px !important;
padding: 5px 12px !important;
}
.card-content {
gap: 15px !important;
min-height: auto !important;
}
}
</style>

</head> <body> <div class="bonus-main-container"> <div class="bonus-card"> <div class="bonus-badge">BONUS 1</div> <div class="card-content"> <div class="product-container"> <img class="bonus-product-image" alt="AI Photography Examples" src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/12.jpg?v=1752143261"> </div> <div class="content-container"> <h1 class="bonus-title">The \$10,000 AI Photographer</h1> <p class="bonus-description">We spent months fine-tuning AI capabilities to generate studio-grade model shots, product images, and lifestyle visuals that outperform real human photo shoots - and for FREE. You'll get full access to the complete course that teaches you how to create jaw-dropping product photos using AI.</p> <div class="value-section"> <div class="value-text">Value <span>\$297</span></div> <div class="free-text">FREE for You!</div> </div> </div> </div> </div> <div class="bonus-card"> <div class="bonus-badge">BONUS 2</div> <div class="card-content"> <div class="product-container"> <img class="bonus-product-image" alt="Secret Tools Vault" src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/14.jpg?v=1752149570"> </div> <div class="content-container"> <h1 class="bonus-title">Secret Tools Vault</h1> <p class="bonus-description">We've already done the heavy lifting for you. We've assembled a secret vault of tools that give you a decisive, brutal advantage over your competitors. Frankly, we don't know how anyone builds a million-dollar brand without them.</p> <div class="value-section"> <div class="value-text">Value <span>\$97</span></div> <div class="free-text">FREE for You!</div> </div> </div> </div> </div> <div class="bonus-card"> <div class="bonus-badge">BONUS 3</div> <div class="card-content"> <div class="product-container"> <img class="bonus-product-image" alt="Lifetime Discount Vault" src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/15.jpg?v=1752150375"> </div> <div class="content-container"> <h1 class="bonus-title">Lifetime Discount Vault</h1> <p class="bonus-description">And we didn't stop there... We partnered with dozens of eCommerce tools and top Shopify apps - the ones you already use - to give you MASSIVE lifetime discounts. On average, you'll <strong>save \$40-\$60/month</strong> on active subscriptions. Yes, really.</p> <div class="value-section"> <div class="value-text">Value <span>\$97</span></div> <div class="free-text">FREE for You!</div> </div> </div> </div> </div> <div class="bonus-card"> <div class="bonus-badge">BONUS 4</div> <div class="card-content"> <div class="product-container"> <img class="bonus-product-image" alt="The Intelligence Agent" src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/16.jpg?v=1752150697"> </div> <div class="content-container"> <h1 class="bonus-title">The Intelligence Agent</h1> <p class="bonus-description">For months, we trained an AI agent to legally mimic the exact tactics used by billion-dollar brands - pixel by pixel, word by word. for FREE.</p> <div class="value-section"> <div class="value-text">Value <span>\$97</span></div> <div class="free-text">FREE for You!</div> </div> </div> </div> </div> <div class="bonus-card"> <div class="bonus-badge">BONUS 5</div> <div class="card-content"> <div class="product-container"> <img class="bonus-product-image" alt="Einstein on Steroids" src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/17.jpg?v=1752151300"> </div> <div class="content-container"> <h1 class="bonus-title">Einstein on Steroids</h1> <p class="bonus-description">And here it is - one of the most essential tools. To give you the ultimate edge, we trained *Einstein on Steroids* for you. An AI brain powered by 180 IQ logic and timeless business wisdom. At the push of a button, it thinks what others can't - and together with you, will take your store to levels you never imagined.</p> <div class="value-section"> <div class="value-text">Value <span>\$97</span></div> <div class="free-text">FREE for You!</div> </div> </div> </div> </div> <div class="bonus-card"> <div class="bonus-badge">BONUS 6</div> <div class="card-content"> <div class="product-container"> <img class="bonus-product-image" alt="Your Personal Conversion Map" src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/18.jpg?v=1752151730"> </div> <div class="content-container"> <h1 class="bonus-title">Your Personal Conversion Map</h1> <p class="bonus-description">Time to stop watching courses and hoping for change without truly implementing anything. The Personal Conversion Map gives you a guided tracking system that takes you step by step - all the way to success (6%+).</p> <div class="value-section"> <div class="value-text">Value <span>\$147</span></div> <div class="free-text">FREE for You!</div> </div> </div> </div> </div> <div class="bonus-card"> <div class="bonus-badge">BONUS 7</div> <div class="card-content"> <div class="product-container"> <img class="bonus-product-image" alt="Access to Our Secret Newsletter" src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/19.jpg?v=1752152015"> </div> <div class="content-container"> <h1 class="bonus-title">Access to Our Secret Newsletter</h1> <p class="bonus-description">Unreleased insights, private test results, and weekly breakdowns from 7-8 figure brands. Delivered directly to you.</p> <div class="value-section"> <div class="value-text">Value <span>\$97</span></div> <div class="free-text">FREE for You!</div> </div> </div> </div> </div> </div> </body> </html> <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>We Do it Different</title> <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;800&display=swap" rel="stylesheet"> <style> /* ULTRA ISOLATION - בידוד מוחלט שלא ניתן לדרוס */ .quantum-section-wrapper-2024 { all: initial !important; display: block !important; font-family: 'Open Sans', sans-serif !important; background-color: #ffffff !important; color: #000000 !important; width: 100% !important; max-width: 800px !important; margin: 60px auto !important; padding: 60px 20px !important; box-sizing: border-box !important; line-height: 1.6 !important; position: relative !important; isolation: isolate !important; z-index: 1 !important; }
.quantum-section-wrapper-2024 *:not(script) {
all: unset !important;
display: revert !important;
box-sizing: border-box !important;
font-family: 'Open Sans', sans-serif !important;
}

.quantum-section-wrapper-2024 table {
border-collapse: collapse !important;
width: 100% !important;
}

.quantum-section-wrapper-2024 th,
.quantum-section-wrapper-2024 td {
display: table-cell !important;
}

.quantum-section-wrapper-2024 tr {
display: table-row !important;
}

.quantum-section-wrapper-2024 thead {
display: table-header-group !important;
}

.quantum-section-wrapper-2024 tbody {
display: table-row-group !important;
}

.quantum-section-wrapper-2024 .quantum-container-2024 {
max-width: 100% !important;
margin: 0 !important;
text-align: center !important;
position: relative !important;
z-index: 1 !important;
display: block !important;
}

.quantum-section-wrapper-2024 .quantum-title-2024 {
font-family: 'Open Sans', sans-serif !important;
font-weight: 800 !important;
font-size: 42.34015px !important;
margin: 0 0 20px 0 !important;
color: #000000 !important;
display: block !important;
text-align: center !important;
}

.quantum-section-wrapper-2024 .quantum-subtitle-2024 {
font-size: 18px !important;
margin: 0 0 40px 0 !important;
color: #000000 !important;
font-weight: 400 !important;
display: block !important;
text-align: center !important;
}

.quantum-section-wrapper-2024 .quantum-options-text-2024 {
font-size: 16px !important;
margin: 0 0 40px 0 !important;
color: #000000 !important;
font-weight: 400 !important;
display: block !important;
text-align: center !important;
}

.quantum-section-wrapper-2024 .quantum-comparison-table-2024 {
border-collapse: collapse !important;
width: 100% !important;
max-width: 100% !important;
margin: 40px auto 0 auto !important;
border: 1px solid #ccc !important;
table-layout: fixed !important;
display: table !important;
}

.quantum-section-wrapper-2024 .quantum-column-header-2024 {
font-size: 24px !important;
font-weight: 800 !important;
text-align: center !important;
padding: 20px !important;
color: #000000 !important;
background-color: #d0d0d0 !important;
border: 1px solid #ccc !important;
width: 50% !important;
display: table-cell !important;
vertical-align: middle !important;
}

.quantum-section-wrapper-2024 .quantum-comparison-item-2024 {
display: table-cell !important;
padding: 20px !important;
font-size: 16px !important;
color: #000000 !important;
font-weight: 400 !important;
background-color: #f8f8f8 !important;
border: 1px solid #ccc !important;
vertical-align: top !important;
width: 50% !important;
text-align: center !important;
}

.quantum-section-wrapper-2024 .quantum-ps-note-2024 {
font-size: 14px !important;
color: #000000 !important;
font-style: italic !important;
margin: 30px 0 40px 0 !important;
text-align: left !important;
display: block !important;
}

.quantum-section-wrapper-2024 .quantum-cta-button-2024 {
background: radial-gradient(ellipse at bottom, #FFB380 0%, #FF4F03 40%) !important;
border: none !important;
border-radius: 35px !important;
padding: 0 !important;
font-size: 19.551px !important;
font-weight: 700 !important;
color: white !important;
cursor: pointer !important;
transition: all 0.3s ease !important;
text-transform: uppercase !important;
letter-spacing: 1px !important;
position: relative !important;
overflow: hidden !important;
display: flex !important;
align-items: center !important;
justify-content: center !important;
text-align: center !important;
margin: 50px auto 0 auto !important;
width: fit-content !important;
min-width: 380px !important;
max-width: 95% !important;
height: 81px !important;
font-family: 'Open Sans', sans-serif !important;
animation: quantum-pulse-2024 2s infinite !important;
box-shadow: 0 6px 16px rgba(255, 79, 3, 0.4) !important;
white-space: nowrap !important;
}

/* הסתרה של כל אלמנטים נוספים שעלולים להופיע בכפתור */
.quantum-section-wrapper-2024 .quantum-cta-button-2024 > *:not(:first-child) {
display: none !important;
visibility: hidden !important;
opacity: 0 !important;
position: absolute !important;
width: 0 !important;
height: 0 !important;
overflow: hidden !important;
}

.quantum-section-wrapper-2024 .quantum-cta-button-2024::after,
.quantum-section-wrapper-2024 .quantum-cta-button-2024::before {
display: none !important;
content: none !important;
}

@keyframes quantum-pulse-2024 {
0% {
transform: scale(1);
box-shadow: 0 6px 16px rgba(255, 79, 3, 0.4);
}
50% {
transform: scale(1.05);
box-shadow: 0 12px 35px rgba(255, 79, 3, 0.6);
}
100% {
transform: scale(1);
box-shadow: 0 6px 16px rgba(255, 79, 3, 0.4);
}
}

.quantum-section-wrapper-2024 .quantum-cta-button-2024:hover {
transform: translateY(-2px) !important;
box-shadow: 0 15px 40px rgba(255, 79, 3, 0.6) !important;
}

.quantum-section-wrapper-2024 .quantum-cta-button-2024:active {
transform: translateY(0px) !important;
box-shadow: 0 5px 15px rgba(255, 79, 3, 0.4) !important;
}

.quantum-section-wrapper-2024 .quantum-cta-button-2024.loading {
opacity: 0.8 !important;
pointer-events: none !important;
}

@media (max-width: 768px) {
.quantum-section-wrapper-2024 .quantum-title-2024 {
font-size: 28.58372px !important;
}

.quantum-section-wrapper-2024 .quantum-subtitle-2024 {
font-size: 16.2px !important;
}

.quantum-section-wrapper-2024 .quantum-options-text-2024 {
font-size: 14.4px !important;
}

.quantum-section-wrapper-2024 .quantum-column-header-2024 {
font-size: 18.52px !important;
padding: 15px 10px !important;
}

.quantum-section-wrapper-2024 .quantum-comparison-item-2024 {
font-size: 14.4px !important;
padding: 15px 10px !important;
}

.quantum-section-wrapper-2024 .quantum-cta-button-2024 {
font-size: 14.63px !important;
min-width: 300px !important;
height: 69px !important;
}
}
</style>

</head> <body> <div class="quantum-section-wrapper-2024"> <div class="quantum-container-2024"> <h1 class="quantum-title-2024">Two Paths. One Choice.</h1> <p class="quantum-subtitle-2024"> For less than the cost of lunch, you're looking at a framework that could multiply your revenue. Or... you can keep doing what you're doing and hope something changes. </p> <p class="quantum-options-text-2024"> Which path makes more sense to you? </p> <table class="quantum-comparison-table-2024"> <thead> <tr> <th class="quantum-column-header-2024">❌ Keep Guessing</th> <th class="quantum-column-header-2024">✅ Use Proven Psychology</th> </tr> </thead> <tbody> <tr> <td class="quantum-comparison-item-2024">Pretty design with 2-3% conversions</td> <td class="quantum-comparison-item-2024">Psychological framework driving 4-6%+ conversions</td> </tr> <tr> <td class="quantum-comparison-item-2024">Hoping visitors will buy</td> <td class="quantum-comparison-item-2024">Triggering subconscious impulse purchases</td> </tr> <tr> <td class="quantum-comparison-item-2024">Wasting 97% of your traffic</td> <td class="quantum-comparison-item-2024">Converting double or triple the visitors</td> </tr> <tr> <td class="quantum-comparison-item-2024">Copying competitor templates</td> <td class="quantum-comparison-item-2024">Using A/B tested manipulations that actually work</td> </tr> </tbody> </table> <p class="quantum-ps-note-2024">* Your \$29 investment is 100% tax-deductible as a business expense. Plus, if it doesn't increase your conversions, you get every penny back.</p> <button class="quantum-cta-button-2024" id="quantum-add-to-cart-btn" data-variant-id="43187754205277">ADD THIS TO MY SYSTEM!</button> </div> </div> <script> (function() { 'use strict'; // ============================================ // CONFIGURATION // ============================================ const CONFIG = { VARIANT_ID: '43187754205277', DEBUG: true, RETRY_ATTEMPTS: 3, RETRY_DELAY: 500 }; // ============================================ // LOGGING UTILITIES // ============================================ const log = { info: (msg, data) => CONFIG.DEBUG && console.log(\`[Quantum System] ℹ️ \${msg}\`, data || ''), success: (msg, data) => CONFIG.DEBUG && console.log(\`[Quantum System] ✅ \${msg}\`, data || ''), error: (msg, data) => console.error(\`[Quantum System] ❌ \${msg}\`, data || ''), warn: (msg, data) => console.warn(\`[Quantum System] ⚠️ \${msg}\`, data || '') }; // ============================================ // CLEANUP INTERFERING ELEMENTS // ============================================ function removeInterferingElements() { log.info('Removing interfering popups and overlays...'); const interferingSelectors = [ '[class*="rewards"]', '[class*="Rewards"]', '[id*="rewards"]', '[id*="Rewards"]', '.smile-launcher-frame', 'iframe[title*="Smile.io"]', '[class*="smile-"]', '.loyalty-modal', '.rewards-launcher', '.modal-backdrop', '.popup-overlay' ]; let removed = 0; interferingSelectors.forEach(selector => { try { const elements = document.querySelectorAll(selector); elements.forEach(el => { el.style.display = 'none'; el.style.visibility = 'hidden'; el.style.opacity = '0'; el.style.pointerEvents = 'none'; if (el.remove) el.remove(); removed++; }); } catch (e) { // Ignore selector errors } }); if (removed > 0) { log.success(\`Removed \${removed} interfering elements\`); } } // ============================================ // BUTTON CLEANUP // ============================================ function cleanButton() { const button = document.getElementById('quantum-add-to-cart-btn'); if (button) { while (button.firstChild) { button.removeChild(button.firstChild); } button.textContent = 'ADD THIS TO MY SYSTEM!'; } } // ============================================ // ADD TO CART - METHOD 1: SHOPIFY AJAX API // ============================================ async function addToCartAjaxAPI(variantId) { log.info('Attempting Method 1: Shopify Ajax API...'); const response = await fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ items: [{ id: parseInt(variantId), quantity: 1 }] }) }); if (!response.ok) { throw new Error(\`Ajax API failed: \${response.status} \${response.statusText}\`); } return await response.json(); } // ============================================ // ADD TO CART - METHOD 2: FORM DATA // ============================================ async function addToCartFormData(variantId) { log.info('Attempting Method 2: FormData...'); const formData = new FormData(); formData.append('id', variantId); formData.append('quantity', '1'); const response = await fetch('/cart/add.js', { method: 'POST', body: formData }); if (!response.ok) { throw new Error(\`FormData failed: \${response.status} \${response.statusText}\`); } return await response.json(); } // ============================================ // ADD TO CART - METHOD 3: SIMPLE JSON // ============================================ async function addToCartSimpleJSON(variantId) { log.info('Attempting Method 3: Simple JSON...'); const response = await fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: variantId, quantity: 1 }) }); if (!response.ok) { throw new Error(\`Simple JSON failed: \${response.status} \${response.statusText}\`); } return await response.json(); } // ============================================ // ADD TO CART - METHOD 4: FALLBACK FORM SUBMIT // ============================================ function addToCartFormSubmit(variantId) { log.info('Attempting Method 4: Form Submit (fallback)...'); const form = document.createElement('form'); form.method = 'POST'; form.action = '/cart/add'; const idInput = document.createElement('input'); idInput.type = 'hidden'; idInput.name = 'id'; idInput.value = variantId; const qtyInput = document.createElement('input'); qtyInput.type = 'hidden'; qtyInput.name = 'quantity'; qtyInput.value = '1'; form.appendChild(idInput); form.appendChild(qtyInput); document.body.appendChild(form); form.submit(); return new Promise(resolve => { setTimeout(() => resolve({ method: 'form_submit', status: 'submitted' }), 1000); }); } // ============================================ // MAIN ADD TO CART FUNCTION WITH FALLBACKS // ============================================ async function addToCart(variantId) { log.info(\`Starting add to cart process for variant: \${variantId}\`); const methods = [ { name: 'Ajax API', fn: addToCartAjaxAPI }, { name: 'FormData', fn: addToCartFormData }, { name: 'Simple JSON', fn: addToCartSimpleJSON }, { name: 'Form Submit', fn: addToCartFormSubmit } ]; for (const method of methods) { try { log.info(\`Trying: \${method.name}\`); const result = await method.fn(variantId); log.success(\`\${method.name} succeeded!\`, result); return result; } catch (error) { log.warn(\`\${method.name} failed:\`, error.message); // Continue to next method } } throw new Error('All add-to-cart methods failed'); } // ============================================ // REFRESH CART UI // ============================================ async function refreshCart() { log.info('Refreshing cart...'); try { const response = await fetch('/cart.js'); const cart = await response.json(); log.success(\`Cart updated: \${cart.item_count} items, Total: \${cart.total_price}\`); // Update cart count elements const cartCountSelectors = [ '.cart-count', '.cart-count-bubble', '[data-cart-count]', '.cart__count', '#cart-icon-bubble' ]; cartCountSelectors.forEach(selector => { const elements = document.querySelectorAll(selector); elements.forEach(el => { el.textContent = cart.item_count; el.setAttribute('data-cart-count', cart.item_count); }); }); // Trigger Shopify events document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', { bubbles: true, detail: { cart } })); if (window.Shopify && window.Shopify.theme) { document.documentElement.dispatchEvent(new CustomEvent('cart:updated', { bubbles: true, detail: { cart } })); } // Try to open cart drawer setTimeout(() => { openCartDrawer(); }, 300); return cart; } catch (error) { log.error('Failed to refresh cart:', error); } } // ============================================ // OPEN CART DRAWER // ============================================ function openCartDrawer() { log.info('Attempting to open cart drawer...'); // Method 1: Look for cart drawer trigger const cartTriggers = [ '[href="/cart"]', '.cart-link', '.cart-icon', '.header__icon--cart', '[data-cart-drawer]', '#cart-icon-bubble' ]; for (const selector of cartTriggers) { const element = document.querySelector(selector); if (element) { log.info(\`Found cart trigger: \${selector}\`); element.click(); return true; } } // Method 2: Trigger theme-specific events const events = ['theme:cart:open', 'cart:open', 'drawer:open']; events.forEach(eventName => { document.documentElement.dispatchEvent(new CustomEvent(eventName, { bubbles: true })); }); log.warn('Could not find cart drawer trigger'); return false; } // ============================================ // BUTTON CLICK HANDLER // ============================================ async function handleButtonClick(event) { event.preventDefault(); event.stopPropagation(); log.info('Button clicked!'); // Remove interfering elements removeInterferingElements(); const button = event.currentTarget; const variantId = button.getAttribute('data-variant-id') || CONFIG.VARIANT_ID; // Disable button button.disabled = true; button.classList.add('loading'); button.style.cursor = 'wait'; // Clean and update button while (button.firstChild) { button.removeChild(button.firstChild); } button.textContent = 'PROCESSING...'; try { // Add to cart with retries const result = await addToCart(variantId); log.success('Successfully added to cart!', result); // Show success button.style.background = 'radial-gradient(ellipse at bottom, #FFB380 0%, #FF6F33 40%)'; button.textContent = '✓ ADDED SUCCESSFULLY!'; // Refresh cart await refreshCart(); // Reset button after 2 seconds setTimeout(() => { cleanButton(); button.disabled = false; button.classList.remove('loading'); button.style.cursor = 'pointer'; button.style.background = ''; }, 2000); } catch (error) { log.error('Failed to add to cart:', error); // Show error button.style.background = '#d32f2f'; button.textContent = '❌ ERROR - PLEASE TRY AGAIN'; // Reset button after 3 seconds setTimeout(() => { cleanButton(); button.disabled = false; button.classList.remove('loading'); button.style.cursor = 'pointer'; button.style.background = ''; }, 3000); } } // ============================================ // INITIALIZATION // ============================================ function init() { log.info('Initializing Quantum System...'); cleanButton(); const button = document.getElementById('quantum-add-to-cart-btn'); if (!button) { log.error('Button not found! Retrying...'); setTimeout(init, 500); return; } log.success('Button found!'); // Remove old event listeners const newButton = button.cloneNode(true); button.parentNode.replaceChild(newButton, button); // Add click handler newButton.addEventListener('click', handleButtonClick); // Ensure button is on top newButton.style.position = 'relative'; newButton.style.zIndex = '999999'; log.success('Quantum System ready! 🚀'); } // ============================================ // START THE SYSTEM // ============================================ // Remove interfering elements immediately removeInterferingElements(); // Continue removing them periodically [1000, 2000, 3000, 5000].forEach(delay => { setTimeout(removeInterferingElements, delay); }); // Clean button periodically setInterval(cleanButton, 1000); // Initialize when ready if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); } // Backup initialization setTimeout(init, 500); setTimeout(init, 1500); log.info('Quantum System script loaded successfully! 🎉'); })(); </script> </body> </html> <!DOCTYPE html> <html lang="en" dir="ltr"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Frequently Asked Questions</title> <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&display=swap" rel="stylesheet"> <style> /* CRITICAL ISOLATION */ .faq-section { all: initial; display: block; }
.faq-section * {
all: unset;
display: revert;
box-sizing: border-box;
}

.faq-section {
width: 100%;
max-width: 800px;
margin: 60px auto;
padding: 20px 20px 40px 20px;
box-sizing: border-box;
font-family: Arial, sans-serif;
clear: both;
}
.faq-section h1 {
font-family: 'Open Sans', sans-serif;
font-weight: 800;
font-size: 1.9rem;
text-align: center;
margin: 0 0 40px 0;
padding: 0;
color: black;
display: block;
position: relative;
z-index: 1;
}
.faq-section .faq-item {
margin-bottom: 15px;
}
.faq-section .question {
background-color: black;
border-radius: 12px;
padding: 25px;
color: white;
font-weight: bold;
font-size: 18px;
cursor: pointer;
transition: opacity 0.3s ease;
user-select: none;
margin: 0;
box-sizing: border-box;
display: flex;
justify-content: space-between;
align-items: center;
}
.faq-section .question:hover {
opacity: 0.9;
}
.faq-section .question .arrow {
font-size: 14px;
transition: transform 0.3s ease;
margin-left: 15px;
flex-shrink: 0;
}
.faq-section .question.active .arrow {
transform: rotate(180deg);
}
.faq-section .answer {
background-color: white;
border: 1px solid black;
border-radius: 8px;
padding: 20px;
margin-top: 10px;
font-size: 16px;
line-height: 1.7;
color: black;
display: none;
box-sizing: border-box;
}
.faq-section .answer.active {
display: block;
}
.faq-section .cta-section {
text-align: center;
margin: 50px auto 30px auto;
padding: 20px 0;
max-width: 100%;
}
.faq-section .cta-button {
background: radial-gradient(ellipse at bottom, #FFB380 0%, #FF4F03 40%);
border: none;
border-radius: 35px;
padding: 15px 40px;
font-size: 24px;
font-weight: 700;
color: white !important;
cursor: pointer;
transition: all 0.3s ease;
text-transform: uppercase;
letter-spacing: 1px;
position: relative;
overflow: hidden;
display: flex;
align-items: center;
justify-content: center;
gap: 15px;
margin: 0 auto 12px auto;
width: auto;
min-width: 500px;
max-width: 90%;
height: auto;
min-height: 75px;
box-shadow: 0 6px 16px rgba(255, 79, 3, 0.4);
}
.faq-section .cta-button span .small-text {
font-size: 15px;
font-weight: 400;
text-transform: none;
letter-spacing: 0;
display: block;
margin-top: 3px;
}
.faq-section .cta-button span {
font-weight: 700 !important;
line-height: 1.3;
}
.faq-section .cta-button:hover {
transform: translateY(-2px);
box-shadow: 0 15px 40px rgba(255, 79, 3, 0.6);
}
.faq-section .cta-button:active {
transform: translateY(0px);
box-shadow: 0 5px 15px rgba(255, 79, 3, 0.4);
}
.faq-section .cta-button.loading {
opacity: 0.8;
pointer-events: none;
}
.faq-section .cta-button.loading span {
text-decoration: none !important;
background: none !important;
background-image: none !important;
border: none !important;
outline: none !important;
box-shadow: none !important;
position: relative;
z-index: 999;
font-size: 24px !important;
font-weight: 700 !important;
color: white !important;
text-shadow: 0 2px 4px rgba(0,0,0,0.5) !important;
}
.faq-section .cta-button.loading span::before,
.faq-section .cta-button.loading span::after {
display: none !important;
}
.faq-section .secure-payment {
display: flex;
align-items: center;
justify-content: center;
gap: 8px;
font-size: 15.44px;
color: #666;
margin-top: 10px;
margin-bottom: 8px;
}
.faq-section .secure-payment-icon {
width: 28.31px;
height: 28.31px;
background-image: url('https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Mastercard-Logo.wine.png?v=1758464867');
background-size: contain;
background-repeat: no-repeat;
background-position: center;
}
.faq-section .bundle-price {
font-size: 13px;
color: #666;
margin-top: 8px;
}
.faq-section .bundle-link {
color: #666;
text-decoration: underline;
}
.faq-section .bundle-link:hover {
text-decoration: none;
}
@media (max-width: 768px) {
.faq-section .question {
font-size: 17px;
padding: 24px;
}
.faq-section .cta-button {
font-size: 19px;
padding: 14px 30px;
min-width: 350px;
}
.faq-section .cta-button .small-text {
font-size: 13px !important;
}
.faq-section .secure-payment {
font-size: 13.24px;
}
.faq-section .secure-payment-icon {
width: 23.59px;
height: 23.59px;
}
}
@media (max-width: 480px) {
.faq-section .cta-button {
min-width: 280px;
font-size: 16px;
padding: 12px 25px;
}
.faq-section .cta-button .small-text {
font-size: 11px !important;
}
.faq-section .secure-payment {
font-size: 12.14px;
}
.faq-section .secure-payment-icon {
width: 21.23px;
height: 21.23px;
}
}
</style>

</head> <body> <div class="faq-section"> <h1>Frequently Asked Questions</h1> <div class="faq-item"> <div class="question" onclick="toggleAnswer(this)"> <span>Will this really work if my site already looks professional?</span> <span class="arrow">▼</span> </div> <div class="answer">Absolutely. "Looking professional" and "converting visitors" are two completely different things. Your site might look like a million-dollar brand, but if it's not using psychological triggers, you're leaving massive money on the table. This framework shows you exactly what's missing - the subconscious manipulations that drive purchases.</div> </div> <div class="faq-item"> <div class="question" onclick="toggleAnswer(this)"> <span>I'm already converting at 3%. Is this still worth it?</span> <span class="arrow">▼</span> </div> <div class="answer">Let me put it this way: if you're converting 3% now, this framework could take you to 5-6%+. That means nearly DOUBLING your revenue from the exact same traffic. Same ad spend, double the sales. How much is that worth to you?</div> </div> <div class="faq-item"> <div class="question" onclick="toggleAnswer(this)"> <span>Do I need to know how to code?</span> <span class="arrow">▼</span> </div> <div class="answer">Not at all. The framework includes simple copy-paste instructions for every element. If you can use Shopify's theme editor, you can implement this. We've made it accessible for complete beginners while keeping it powerful enough for advanced users.</div> </div> <div class="faq-item"> <div class="question" onclick="toggleAnswer(this)"> <span>Will this work for my specific product/niche?</span> <span class="arrow">▼</span> </div> <div class="answer">Yes. These are universal psychological principles that work on the human brain - regardless of what you're selling. Whether it's fashion, electronics, home goods, or anything else, the subconscious responds the same way to these triggers.</div> </div> <div class="faq-item"> <div class="question" onclick="toggleAnswer(this)"> <span>What if I implement everything and it doesn't work?</span> <span class="arrow">▼</span> </div> <div class="answer">Simple: we refund you 100%. No questions, no hassle. We're that confident because this framework is built on thousands of A/B tests with proven results. But if somehow it doesn't increase your conversions, just let us know and we'll give you every penny back.</div> </div> <div class="faq-item"> <div class="question" onclick="toggleAnswer(this)"> <span>Why is it only \$29?</span> <span class="arrow">▼</span> </div> <div class="answer">Honest answer? We could easily charge \$997+ for this. But we want every serious eCommerce entrepreneur to have access to it - not just the ones with big budgets.<br><br>The framework itself (plus 7 bonuses worth \$929) is available for just \$29. One-time payment, lifetime access.<br><br><strong>⚠️ Important:</strong> This price won't last forever. We reserve the right to increase it at any time. If you're seeing \$29 now, consider yourself lucky - this discount is temporary.</div> </div> <div class="cta-section"> <button class="cta-button" id="faq-add-to-cart-btn" data-variant-id="43187754205277"> <span>Add This to my System!<br><small class="small-text">Delivered to your email in under 30 seconds</small></span> </button> <div class="secure-payment"> <div class="secure-payment-icon"></div> <span>Secure 256-bit SSL encrypted payment</span> </div> <div class="bundle-price"> \$18.85 If <a href="https://quantum-scale.co/pages/bundle-builder" class="bundle-link">building a bundle</a> </div> </div> </div> <script> function toggleAnswer(questionElement) { const answer = questionElement.nextElementSibling; const isActive = answer.classList.contains('active'); document.querySelectorAll('.faq-section .answer').forEach(ans => { ans.classList.remove('active'); }); document.querySelectorAll('.faq-section .question').forEach(q => { q.classList.remove('active'); }); if (!isActive) { answer.classList.add('active'); questionElement.classList.add('active'); } }
(function() {
'use strict';

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    VARIANT_ID: '43187754205277',
    DEBUG: true,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 500
};

// ============================================
// LOGGING UTILITIES
// ============================================
const log = {
    info: (msg, data) => CONFIG.DEBUG && console.log(\`[FAQ System] ℹ️ \${msg}\`, data || ''),
    success: (msg, data) => CONFIG.DEBUG && console.log(\`[FAQ System] ✅ \${msg}\`, data || ''),
    error: (msg, data) => console.error(\`[FAQ System] ❌ \${msg}\`, data || ''),
    warn: (msg, data) => console.warn(\`[FAQ System] ⚠️ \${msg}\`, data || '')
};

// ============================================
// CLEANUP INTERFERING ELEMENTS
// ============================================
function removeInterferingElements() {
    log.info('Removing interfering popups and overlays...');

    const interferingSelectors = [
        '[class*="rewards"]', '[class*="Rewards"]',
        '[id*="rewards"]', '[id*="Rewards"]',
        '.smile-launcher-frame', 'iframe[title*="Smile.io"]',
        '[class*="smile-"]', '.loyalty-modal', '.rewards-launcher',
        '.modal-backdrop', '.popup-overlay'
    ];

    let removed = 0;
    interferingSelectors.forEach(selector => {
        try {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.display = 'none';
                el.style.visibility = 'hidden';
                el.style.opacity = '0';
                el.style.pointerEvents = 'none';
                if (el.remove) el.remove();
                removed++;
            });
        } catch (e) {
            // Ignore selector errors
        }
    });

    if (removed > 0) {
        log.success(\`Removed \${removed} interfering elements\`);
    }
}

// ============================================
// ADD TO CART - METHOD 1: SHOPIFY AJAX API
// ============================================
async function addToCartAjaxAPI(variantId) {
    log.info('Attempting Method 1: Shopify Ajax API...');

    const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            items: [{
                id: parseInt(variantId),
                quantity: 1
            }]
        })
    });

    if (!response.ok) {
        throw new Error(\`Ajax API failed: \${response.status} \${response.statusText}\`);
    }

    return await response.json();
}

// ============================================
// ADD TO CART - METHOD 2: FORM DATA
// ============================================
async function addToCartFormData(variantId) {
    log.info('Attempting Method 2: FormData...');

    const formData = new FormData();
    formData.append('id', variantId);
    formData.append('quantity', '1');

    const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error(\`FormData failed: \${response.status} \${response.statusText}\`);
    }

    return await response.json();
}

// ============================================
// ADD TO CART - METHOD 3: SIMPLE JSON
// ============================================
async function addToCartSimpleJSON(variantId) {
    log.info('Attempting Method 3: Simple JSON...');

    const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: variantId,
            quantity: 1
        })
    });

    if (!response.ok) {
        throw new Error(\`Simple JSON failed: \${response.status} \${response.statusText}\`);
    }

    return await response.json();
}

// ============================================
// ADD TO CART - METHOD 4: FALLBACK FORM SUBMIT
// ============================================
function addToCartFormSubmit(variantId) {
    log.info('Attempting Method 4: Form Submit (fallback)...');

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/cart/add';

    const idInput = document.createElement('input');
    idInput.type = 'hidden';
    idInput.name = 'id';
    idInput.value = variantId;

    const qtyInput = document.createElement('input');
    qtyInput.type = 'hidden';
    qtyInput.name = 'quantity';
    qtyInput.value = '1';

    form.appendChild(idInput);
    form.appendChild(qtyInput);
    document.body.appendChild(form);
    form.submit();

    return new Promise(resolve => {
        setTimeout(() => resolve({ method: 'form_submit', status: 'submitted' }), 1000);
    });
}

// ============================================
// MAIN ADD TO CART FUNCTION WITH FALLBACKS
// ============================================
async function addToCart(variantId) {
    log.info(\`Starting add to cart process for variant: \${variantId}\`);

    const methods = [
        { name: 'Ajax API', fn: addToCartAjaxAPI },
        { name: 'FormData', fn: addToCartFormData },
        { name: 'Simple JSON', fn: addToCartSimpleJSON },
        { name: 'Form Submit', fn: addToCartFormSubmit }
    ];

    for (const method of methods) {
        try {
            log.info(\`Trying: \${method.name}\`);
            const result = await method.fn(variantId);
            log.success(\`\${method.name} succeeded!\`, result);
            return result;
        } catch (error) {
            log.warn(\`\${method.name} failed:\`, error.message);
            // Continue to next method
        }
    }

    throw new Error('All add-to-cart methods failed');
}

// ============================================
// REFRESH CART UI
// ============================================
async function refreshCart() {
    log.info('Refreshing cart...');

    try {
        const response = await fetch('/cart.js');
        const cart = await response.json();

        log.success(\`Cart updated: \${cart.item_count} items, Total: \${cart.total_price}\`);

        // Update cart count elements
        const cartCountSelectors = [
            '.cart-count', '.cart-count-bubble', '[data-cart-count]',
            '.cart__count', '#cart-icon-bubble'
        ];

        cartCountSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.textContent = cart.item_count;
                el.setAttribute('data-cart-count', cart.item_count);
            });
        });

        // Trigger Shopify events
        document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
            bubbles: true,
            detail: { cart }
        }));

        if (window.Shopify && window.Shopify.theme) {
            document.documentElement.dispatchEvent(new CustomEvent('cart:updated', {
                bubbles: true,
                detail: { cart }
            }));
        }

        // Try to open cart drawer
        setTimeout(() => {
            openCartDrawer();
        }, 300);

        return cart;

    } catch (error) {
        log.error('Failed to refresh cart:', error);
    }
}

// ============================================
// OPEN CART DRAWER
// ============================================
function openCartDrawer() {
    log.info('Attempting to open cart drawer...');

    // Method 1: Look for cart drawer trigger
    const cartTriggers = [
        '[href="/cart"]',
        '.cart-link',
        '.cart-icon',
        '.header__icon--cart',
        '[data-cart-drawer]',
        '#cart-icon-bubble'
    ];

    for (const selector of cartTriggers) {
        const element = document.querySelector(selector);
        if (element) {
            log.info(\`Found cart trigger: \${selector}\`);
            element.click();
            return true;
        }
    }

    // Method 2: Trigger theme-specific events
    const events = ['theme:cart:open', 'cart:open', 'drawer:open'];
    events.forEach(eventName => {
        document.documentElement.dispatchEvent(new CustomEvent(eventName, {
            bubbles: true
        }));
    });

    log.warn('Could not find cart drawer trigger');
    return false;
}

// ============================================
// BUTTON CLICK HANDLER
// ============================================
async function handleButtonClick(event) {
    event.preventDefault();
    event.stopPropagation();

    log.info('Button clicked!');

    // Remove interfering elements
    removeInterferingElements();

    const button = event.currentTarget;
    const originalContent = button.innerHTML;
    const variantId = button.getAttribute('data-variant-id') || CONFIG.VARIANT_ID;

    // Disable button
    button.disabled = true;
    button.classList.add('loading');
    button.style.cursor = 'wait';
    button.innerHTML = '<div style="text-decoration: none !important; background: none !important; border: none !important; text-shadow: 0 2px 4px rgba(0,0,0,0.5); font-size: 22px; font-weight: 700; color: white !important; display: block; position: relative; z-index: 1000;">PROCESSING...</div>';

    try {
        // Add to cart with retries
        const result = await addToCart(variantId);

        log.success('Successfully added to cart!', result);

        // Show success
        button.style.background = 'radial-gradient(ellipse at bottom, #FFB380 0%, #FF6F33 40%)';
        button.innerHTML = '<div style="text-decoration: none !important; background: none !important; border: none !important; text-shadow: 0 2px 4px rgba(0,0,0,0.5); font-size: 22px; font-weight: 700; color: white !important; display: block; position: relative; z-index: 1000;">✓ ADDED SUCCESSFULLY!</div>';

        // Refresh cart
        await refreshCart();

        // Reset button after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.disabled = false;
            button.classList.remove('loading');
            button.style.cursor = 'pointer';
            button.style.background = '';
        }, 2000);

    } catch (error) {
        log.error('Failed to add to cart:', error);

        // Show error
        button.style.background = '#d32f2f';
        button.innerHTML = '<div style="text-decoration: none !important; background: none !important; border: none !important; text-shadow: 0 2px 4px rgba(0,0,0,0.5); font-size: 18px; font-weight: 700; color: white !important; display: block; position: relative; z-index: 1000;">❌ ERROR - PLEASE TRY AGAIN</div>';

        // Reset button after 3 seconds
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.disabled = false;
            button.classList.remove('loading');
            button.style.cursor = 'pointer';
            button.style.background = '';
        }, 3000);
    }
}

// ============================================
// INITIALIZATION
// ============================================
function init() {
    log.info('Initializing FAQ System...');

    const button = document.getElementById('faq-add-to-cart-btn');

    if (!button) {
        log.error('Button not found! Retrying...');
        setTimeout(init, 500);
        return;
    }

    log.success('Button found!');

    // Remove old event listeners
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);

    // Add click handler
    newButton.addEventListener('click', handleButtonClick);

    // Ensure button is on top
    newButton.style.position = 'relative';
    newButton.style.zIndex = '999999';

    log.success('FAQ System ready! 🚀');
}

// ============================================
// START THE SYSTEM
// ============================================

// Remove interfering elements immediately
removeInterferingElements();

// Continue removing them periodically
[1000, 2000, 3000, 5000].forEach(delay => {
    setTimeout(removeInterferingElements, delay);
});

// Initialize when ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Backup initialization
setTimeout(init, 500);
setTimeout(init, 1500);

log.info('FAQ System script loaded successfully! 🎉');

})();
</script>

</body> </html>
`,

  // ==================== LTV SYSTEM ====================
  'ltv-system': `
    <!-- PASTE YOUR LTV SYSTEM HTML HERE -->
  `,
};

// Helper function to get HTML for a course
export const getCourseHTML = (slug: string): string | null => {
  const html = courseHTMLBlocks[slug];
  if (!html || html.includes('PASTE YOUR') || html.trim().length < 100) {
    return null;
  }
  return html;
};
