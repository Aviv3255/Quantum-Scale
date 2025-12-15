// Course HTML Blocks - Paste your exact HTML here and it will render as-is

export const courseHTMLBlocks: Record<string, string> = {
  // ==================== THE SOCIAL PROOF ====================
  'the-social-proof': `
<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,800;1,400&display=swap');

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
    width: 86%;
    max-width: 516px;
    height: auto;
    display: block;
    margin: 20px auto;
    border-radius: 15px;
    filter: drop-shadow(0 0 18px rgba(119, 0, 253, 0.6)) drop-shadow(0 0 35px rgba(119, 0, 253, 0.4));
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
  'subconscious-trap': `
    <!-- PASTE YOUR SUBCONSCIOUS TRAP HTML HERE -->
  `,

  // ==================== LTV SYSTEM ====================
  'ltv-system': `
    <!-- PASTE YOUR LTV SYSTEM HTML HERE -->
  `,

  // ==================== A/B TEST RESULTS ====================
  'ab-test-results': `
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
.landing-section {
all: initial;
position: relative !important;
left: 50% !important;
right: 50% !important;
margin-left: -50vw !important;
margin-right: -50vw !important;
width: 100vw !important;
min-width: 100vw !important;
background: #000000 !important;
padding: 25px 5px 28px 5px !important;
text-align: center !important;
font-family: 'Open Sans', sans-serif !important;
box-sizing: border-box !important;
overflow-x: hidden !important;
display: block !important;
}
.landing-section::before,
.landing-section::after {
content: '' !important;
position: absolute !important;
top: 0 !important;
bottom: 0 !important;
width: 100vw !important;
background: #000000 !important;
z-index: -1 !important;
}
.landing-section::before {
left: -100vw !important;
}
.landing-section::after {
right: -100vw !important;
}
.landing-section * {
box-sizing: border-box !important;
}
.content-container {
max-width: 1200px;
margin: 0 auto;
padding: 0 20px;
}
.intro-text {
background: rgba(142, 93, 255, 0.15) !important;
border: 1px solid #8E5DFF !important;
border-radius: 25px !important;
padding: 12px 20px !important;
display: inline-flex !important;
align-items: center !important;
gap: 10px !important;
font-size: 13px !important;
color: #ffffff !important;
font-weight: 500 !important;
margin: 0 0 32px 0 !important;
font-family: 'Open Sans', sans-serif !important;
}
.pulse-dot {
width: 8px !important;
height: 8px !important;
background: #8E5DFF !important;
border-radius: 50% !important;
animation: pulse 2s infinite !important;
box-shadow: 0 0 10px #8E5DFF !important;
display: block !important;
}
@keyframes pulse {
0%, 100% {
opacity: 1;
transform: scale(1);
}
50% {
opacity: 0.6;
transform: scale(0.9);
}
}
.main-headline {
font-family: 'Open Sans', sans-serif !important;
font-size: 58px !important;
font-weight: 800 !important;
color: #ffffff !important;
margin: 0 0 8px 0 !important;
line-height: 1.2 !important;
}
.highlight {
color: #8E5DFF !important;
}
.sub-headline {
font-size: 20px !important;
color: #e8e8e8 !important;
margin: 0 0 35px 0 !important;
font-weight: 400 !important;
font-family: 'Open Sans', sans-serif !important;
}
.screenshot-container {
margin: 0 0 35px 0 !important;
display: flex !important;
justify-content: center !important;
}
.screenshot {
max-width: 100% !important;
height: auto !important;
border-radius: 8px !important;
display: block !important;
box-shadow: 0 0 16px rgba(142, 93, 255, 0.9), 0 0 28px rgba(142, 93, 255, 0.6), 0 0 40px rgba(142, 93, 255, 0.3) !important;
border: 2px solid rgba(142, 93, 255, 0.7) !important;
}
.pricing-section {
margin: 0 0 22px 0 !important;
}
.price-text {
font-size: 33px !important;
font-weight: 700 !important;
color: #ffffff !important;
margin: 0 0 15px 0 !important;
font-family: 'Open Sans', sans-serif !important;
}
.original-price {
color: #888888 !important;
text-decoration: line-through !important;
font-size: 25px !important;
margin-right: 10px !important;
}
.current-price {
color: #8E5DFF !important;
}
.cta-button {
background: radial-gradient(ellipse at bottom, #d4bcff 0%, #b08fff 25%, #8E5DFF 100%) !important;
border: none !important;
border-radius: 35px !important;
padding: 8px 90px !important;
font-size: 22px !important;
font-weight: 700 !important;
color: white !important;
cursor: pointer !important;
transition: all 0.3s ease !important;
text-transform: uppercase !important;
letter-spacing: 1px !important;
position: relative !important;
overflow: hidden !important;
display: inline-block !important;
align-items: center !important;
justify-content: center !important;
text-align: center !important;
margin: 0 auto !important;
width: auto !important;
height: 80px !important;
box-shadow: 0 6px 20px rgba(142, 93, 255, 0.35) !important;
font-family: 'Open Sans', sans-serif !important;
vertical-align: middle !important;
}
.cta-button:hover {
transform: translateY(-2px) !important;
box-shadow: 0 15px 40px rgba(142, 93, 255, 0.5) !important;
}
.cta-button span {
font-weight: 700 !important;
color: white !important;
display: block !important;
font-size: 19.8px !important;
line-height: 1.3 !important;
font-family: 'Open Sans', sans-serif !important;
}
.bundle-wrapper {
text-align: center !important;
margin: 12px 0 0 0 !important;
display: block !important;
}
.bundle-wrapper span {
color: #e8e8e8 !important;
font-size: 14px !important;
font-family: 'Open Sans', sans-serif !important;
}
.bundle-link {
color: #8E5DFF !important;
text-decoration: underline !important;
}
.secure-payment {
display: flex !important;
align-items: center !important;
justify-content: center !important;
gap: 8px !important;
font-size: 13.9px !important;
color: #e8e8e8 !important;
font-weight: 500 !important;
margin-top: 10px !important;
margin-bottom: 8px !important;
font-family: 'Open Sans', sans-serif !important;
}
.secure-payment-icon {
width: 28.31px !important;
height: 28.31px !important;
background-image: url('https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Mastercard-Logo.wine.png?v=1758464867') !important;
background-size: contain !important;
background-repeat: no-repeat !important;
background-position: center !important;
display: block !important;
}
@media (max-width: 768px) {
.landing-section {
padding: 3px 3px 20px 3px !important;
}
.main-headline {
font-size: 31.46px !important;
}
.price-text {
font-size: 28.9px !important;
}
.original-price {
font-size: 22px !important;
}
.sub-headline {
font-size: 17px !important;
}
.cta-button {
font-size: 18px !important;
padding: 18px 60px !important;
height: 90px !important;
}
.cta-button span {
font-size: 18px !important;
}
}
@media (max-width: 480px) {
.landing-section {
padding: 2px 2px 20px 2px !important;
}
.main-headline {
font-size: 26.45px !important;
}
.sub-headline {
font-size: 17px !important;
}
.cta-button {
min-width: 300px !important;
font-size: 16.2px !important;
padding: 16px 40px !important;
height: 85px !important;
}
.cta-button span {
font-size: 16.2px !important;
}
}
@media (min-width: 769px) {
.screenshot {
max-width: 75% !important;
}
.cta-button {
max-width: 850px !important;
border-radius: 35px !important;
height: 120px !important;
padding: 15px 90px !important;
}
.cta-button span {
transform: scale(1.2) !important;
transform-origin: center !important;
}
}

/* Section 2 - Profit Engines */
.profit-engines-mega-section {
position: relative !important;
left: 50% !important;
right: 50% !important;
margin-left: -50vw !important;
margin-right: -50vw !important;
width: 100vw !important;
min-width: 100vw !important;
padding: 50px 0 20px 0 !important;
background: #ffffff !important;
font-family: 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
line-height: 1.6 !important;
overflow-x: hidden !important;
box-sizing: border-box !important;
}
.profit-engines-mega-section * {
box-sizing: border-box !important;
}
.profit-engines-mega-section::before,
.profit-engines-mega-section::after {
content: '' !important;
position: absolute !important;
top: 0 !important;
bottom: 0 !important;
width: 100vw !important;
background: #ffffff !important;
z-index: -2 !important;
}
.profit-engines-mega-section::before {
left: -100vw !important;
}
.profit-engines-mega-section::after {
right: -100vw !important;
}
.profit-engines-mega-section .mega-content-wrapper {
max-width: 850px !important;
margin: 0 auto !important;
padding: 0 25px !important;
position: relative !important;
z-index: 1 !important;
background: transparent !important;
}
.profit-engines-mega-section .ultra-bold-title-block {
margin: 0 0 50px 0 !important;
padding: 0 !important;
text-align: center !important;
background: transparent !important;
}
.profit-engines-mega-section .ultra-bold-line {
font-family: 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
font-size: 35px !important;
font-weight: 900 !important;
font-style: normal !important;
text-align: center !important;
color: #000000 !important;
margin: 0 !important;
padding: 0 !important;
line-height: 1.1 !important;
display: block !important;
}
.profit-engines-mega-section .mega-paragraph {
font-size: 19px !important;
color: #000000 !important;
margin-bottom: 25px !important;
text-align: center !important;
font-family: 'Open Sans', sans-serif !important;
line-height: 1.65 !important;
font-weight: 400 !important;
}
.profit-engines-mega-section .mega-quote {
font-size: 44px !important;
font-weight: 900 !important;
color: #8E5DFF !important;
text-align: center !important;
line-height: 1.15 !important;
margin: 55px 0 !important;
display: block !important;
font-family: 'Open Sans', sans-serif !important;
}
.profit-engines-mega-section .huge-text {
font-size: 30px !important;
font-weight: 900 !important;
line-height: 1.25 !important;
margin: 55px 0 !important;
}
.profit-engines-mega-section .medium-bold {
font-size: 22px !important;
font-weight: 700 !important;
margin: 40px 0 35px 0 !important;
line-height: 1.4 !important;
}
.profit-engines-mega-section .mega-gold-text {
color: #8E5DFF !important;
font-weight: 800 !important;
}
.profit-engines-mega-section .highlight-box {
background: transparent !important;
color: #000000 !important;
padding: 0 !important;
display: inline !important;
font-weight: 800 !important;
}
.profit-engines-mega-section .mega-meme-gif {
max-width: 320px !important;
height: auto !important;
display: block !important;
margin: 50px auto !important;
border-radius: 12px !important;
}
.profit-engines-mega-section .mega-meme-gif-large {
max-width: 420px !important;
}
@media (min-width: 768px) {
.profit-engines-mega-section {
padding: 60px 0 30px 0 !important;
}
.profit-engines-mega-section .ultra-bold-line {
font-size: 38px !important;
}
.profit-engines-mega-section .mega-paragraph {
font-size: 20px !important;
margin-bottom: 28px !important;
}
.profit-engines-mega-section .mega-quote {
font-size: 48px !important;
margin: 60px 0 !important;
}
.profit-engines-mega-section .huge-text {
font-size: 34px !important;
margin: 60px 0 !important;
}
.profit-engines-mega-section .medium-bold {
font-size: 24px !important;
margin: 45px 0 40px 0 !important;
}
.profit-engines-mega-section .mega-meme-gif {
max-width: 350px !important;
margin: 55px auto !important;
}
.profit-engines-mega-section .mega-meme-gif-large {
max-width: 450px !important;
}
}
@media (max-width: 480px) {
.profit-engines-mega-section .ultra-bold-line {
font-size: 28px !important;
}
.profit-engines-mega-section .mega-quote {
font-size: 32px !important;
}
.profit-engines-mega-section .huge-text {
font-size: 24px !important;
}
.profit-engines-mega-section .mega-meme-gif-large {
max-width: 97% !important;
width: 97% !important;
}
}

/* Section 3 - Isolated Dark Section */
.isolated-section {
all: initial;
display: block !important;
position: relative !important;
width: 100% !important;
font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%) !important;
min-height: 100vh !important;
color: #ffffff !important;
}
.isolated-section .inner-wrapper {
display: block !important;
padding: 50px 20px !important;
width: 100% !important;
}
.isolated-section .container {
display: block !important;
max-width: 900px !important;
margin: 0 auto !important;
width: 100% !important;
}
.isolated-section .section-title {
display: block !important;
font-size: 40.8px !important;
font-weight: 900 !important;
text-align: center !important;
color: #ffffff !important;
margin: 0 0 12px 0 !important;
line-height: 1.2 !important;
}
.isolated-section .section-title .highlight {
color: #8E5DFF !important;
}
.isolated-section .subtitle {
display: block !important;
font-size: 17px !important;
color: #e8e8e8 !important;
text-align: center !important;
margin: 0 0 40px 0 !important;
font-weight: 400 !important;
line-height: 1.5 !important;
}
.isolated-section .systems-grid {
display: block !important;
margin: 40px 0 !important;
}
.isolated-section .system-card {
display: block !important;
margin: 0 0 30px 0 !important;
padding: 25px 30px !important;
background: rgba(20, 20, 20, 0.6) !important;
border-radius: 16px !important;
border: 1px solid rgba(142, 93, 255, 0.15) !important;
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
position: relative !important;
}
.isolated-section .system-card:hover {
background: rgba(30, 30, 30, 0.9) !important;
border-color: rgba(142, 93, 255, 0.5) !important;
transform: translateY(-8px) !important;
box-shadow: 0 20px 60px rgba(142, 93, 255, 0.3), 0 8px 20px rgba(0, 0, 0, 0.4) !important;
}
.isolated-section .card-number {
display: block !important;
font-size: 42px !important;
font-weight: 900 !important;
color: #8E5DFF !important;
margin: 0 0 15px 0 !important;
line-height: 0.9 !important;
}
.isolated-section .card-title {
display: block !important;
font-size: 23.8px !important;
font-weight: 800 !important;
color: #ffffff !important;
margin: 0 0 10px 0 !important;
line-height: 1.25 !important;
}
.isolated-section .card-description {
display: block !important;
font-size: 15.3px !important;
color: #e8e8e8 !important;
line-height: 1.55 !important;
font-weight: 400 !important;
margin: 0 !important;
}
.isolated-section .card-description strong {
color: #8E5DFF !important;
font-weight: 700 !important;
}
.isolated-section .transformation-box {
display: block !important;
margin: 50px 0 !important;
padding: 30px !important;
background: rgba(30, 30, 30, 0.5) !important;
border-radius: 20px !important;
border: 2px solid rgba(142, 93, 255, 0.5) !important;
text-align: center !important;
}
.isolated-section .transformation-title {
display: block !important;
font-size: 27.2px !important;
font-weight: 800 !important;
color: #8E5DFF !important;
margin: 0 0 15px 0 !important;
line-height: 1.3 !important;
}
.isolated-section .transformation-text {
display: block !important;
font-size: 16.15px !important;
color: #ffffff !important;
line-height: 1.65 !important;
font-weight: 500 !important;
margin: 0 !important;
}
.isolated-section .final-statement {
display: block !important;
text-align: center !important;
margin: 45px 0 0 0 !important;
}
.isolated-section .final-text {
display: block !important;
font-size: 20.4px !important;
color: #ffffff !important;
line-height: 1.55 !important;
font-weight: 600 !important;
margin: 0 0 15px 0 !important;
}
.isolated-section .final-text strong {
color: #ffffff !important;
font-weight: 800 !important;
}
@media (max-width: 768px) {
.isolated-section .inner-wrapper {
padding: 30px 15px !important;
}
.isolated-section .section-title {
font-size: 30.6px !important;
}
.isolated-section .subtitle {
font-size: 15.3px !important;
}
.isolated-section .system-card {
padding: 18px 24px !important;
}
.isolated-section .card-number {
font-size: 36px !important;
margin-bottom: 12px !important;
}
.isolated-section .card-title {
font-size: 20.4px !important;
margin-bottom: 8px !important;
}
.isolated-section .card-description {
font-size: 14.45px !important;
}
.isolated-section .transformation-box {
padding: 25px 20px !important;
}
.isolated-section .transformation-title {
font-size: 22.1px !important;
}
.isolated-section .transformation-text {
font-size: 14.45px !important;
}
.isolated-section .final-text {
font-size: 17px !important;
}
}

/* Section 4 - Comparison Table */
.section-wrapper-isolated {
all: initial !important;
position: relative !important;
left: 50% !important;
right: 50% !important;
margin-left: -50vw !important;
margin-right: -50vw !important;
width: 100vw !important;
min-width: 100vw !important;
font-family: 'Open Sans', sans-serif !important;
background-color: #ffffff !important;
color: #000000 !important;
display: block !important;
padding: 60px 20px !important;
box-sizing: border-box !important;
}
.section-wrapper-isolated .container-isolated {
max-width: 900px !important;
margin: 0 auto !important;
text-align: center !important;
display: block !important;
}
.section-wrapper-isolated .title-isolated {
font-family: 'Open Sans', sans-serif !important;
font-weight: 800 !important;
font-size: 42px !important;
margin: 0 0 15px 0 !important;
color: #000000 !important;
display: block !important;
line-height: 1.2 !important;
text-align: center !important;
}
.section-wrapper-isolated .title-isolated .highlight-isolated {
color: #8E5DFF !important;
}
.section-wrapper-isolated .subtitle-isolated {
font-size: 18px !important;
margin: 0 0 50px 0 !important;
color: #333333 !important;
display: block !important;
text-align: center !important;
}
.section-wrapper-isolated .comparison-table-isolated {
width: 100% !important;
max-width: 850px !important;
margin: 0 auto 40px auto !important;
border-radius: 12px !important;
overflow: hidden !important;
box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important;
display: table !important;
border-collapse: collapse !important;
}
.section-wrapper-isolated .column-header-isolated {
padding: 25px 20px !important;
font-weight: 700 !important;
font-size: 20px !important;
text-align: center !important;
display: table-cell !important;
border-bottom: 2px solid #e0e0e0 !important;
}
.section-wrapper-isolated .old-way-header-isolated {
background: #f5f5f5 !important;
color: #666666 !important;
}
.section-wrapper-isolated .new-way-header-isolated {
background: #8E5DFF !important;
color: #ffffff !important;
}
.section-wrapper-isolated .comparison-item-isolated {
padding: 20px !important;
border-bottom: 1px solid #e0e0e0 !important;
text-align: center !important;
font-size: 16px !important;
line-height: 1.6 !important;
display: table-cell !important;
}
.section-wrapper-isolated .old-way-item-isolated {
background: #fafafa !important;
color: #666666 !important;
}
.section-wrapper-isolated .new-way-item-isolated {
background: #f8f5ff !important;
color: #000000 !important;
font-weight: 600 !important;
}
.section-wrapper-isolated .cta-button-isolated {
background: radial-gradient(ellipse at bottom, #d4bcff 0%, #b08fff 25%, #8E5DFF 100%) !important;
border: none !important;
border-radius: 35px !important;
padding: 8px 90px !important;
font-size: 22px !important;
font-weight: 700 !important;
color: white !important;
cursor: pointer !important;
transition: all 0.3s ease !important;
text-transform: uppercase !important;
letter-spacing: 1px !important;
display: inline-block !important;
margin: 20px auto 0 auto !important;
height: 80px !important;
box-shadow: 0 6px 20px rgba(142, 93, 255, 0.35) !important;
}
.section-wrapper-isolated .cta-button-isolated:hover {
transform: translateY(-2px) !important;
box-shadow: 0 15px 40px rgba(142, 93, 255, 0.5) !important;
}
.section-wrapper-isolated .cta-button-isolated span {
font-weight: 700 !important;
color: white !important;
display: block !important;
font-size: 19.8px !important;
line-height: 1.3 !important;
}
.section-wrapper-isolated .bundle-price-wrapper-isolated {
margin: 15px 0 0 0 !important;
text-align: center !important;
display: block !important;
}
.section-wrapper-isolated .bundle-link-isolated {
color: #8E5DFF !important;
text-decoration: underline !important;
font-size: 14px !important;
}
@media (max-width: 768px) {
.section-wrapper-isolated .title-isolated {
font-size: 32px !important;
}
.section-wrapper-isolated .column-header-isolated {
font-size: 18px !important;
padding: 15px 10px !important;
}
.section-wrapper-isolated .comparison-item-isolated {
padding: 15px !important;
font-size: 14px !important;
}
.section-wrapper-isolated .cta-button-isolated {
font-size: 18px !important;
padding: 18px 60px !important;
height: 90px !important;
}
.section-wrapper-isolated .cta-button-isolated span {
font-size: 18px !important;
}
}
@media (max-width: 480px) {
.section-wrapper-isolated .cta-button-isolated {
min-width: 300px !important;
font-size: 16.2px !important;
padding: 16px 40px !important;
height: 85px !important;
}
.section-wrapper-isolated .cta-button-isolated span {
font-size: 16.2px !important;
}
}
@media (min-width: 769px) {
.section-wrapper-isolated .cta-button-isolated {
max-width: 850px !important;
height: 120px !important;
padding: 15px 90px !important;
}
.section-wrapper-isolated .cta-button-isolated span {
transform: scale(1.2) !important;
transform-origin: center !important;
}
}

/* Section 5 - FAQ */
.faq-section {
all: initial;
display: block;
width: 100%;
max-width: 900px;
margin: 60px auto;
padding: 20px;
box-sizing: border-box;
font-family: Arial, sans-serif;
background-color: white !important;
}
.faq-section h1 {
font-family: 'Open Sans', sans-serif;
font-weight: 800;
font-size: 2.5rem;
text-align: center;
margin: 0 0 40px 0;
color: black !important;
}
.faq-section .faq-item {
margin-bottom: 15px;
}
.faq-section .question {
background-color: black !important;
border-radius: 12px;
padding: 25px;
color: white !important;
font-weight: bold;
font-size: 18px;
cursor: pointer;
transition: opacity 0.3s ease;
display: flex;
justify-content: space-between;
align-items: center;
}
.faq-section .question:hover {
opacity: 0.9;
}
.faq-section .answer {
background-color: white !important;
border: 1px solid black;
border-radius: 8px;
padding: 20px;
margin-top: 10px;
font-size: 16px;
line-height: 1.7;
color: black !important;
display: none;
}
.faq-section .answer.active {
display: block;
}
.faq-section .answer strong {
font-weight: 700;
color: black !important;
}
@media (max-width: 768px) {
.faq-section .question {
font-size: 17px;
padding: 24px;
}
}

/* Section 6 - Final CTA */
.final-cta-section {
padding: 80px 20px !important;
background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%) !important;
font-family: 'Open Sans', sans-serif !important;
text-align: center !important;
box-sizing: border-box !important;
}
.final-container {
max-width: 800px !important;
margin: 0 auto !important;
}
.final-headline {
font-size: 38px !important;
font-weight: 800 !important;
color: #ffffff !important;
margin: 0 0 25px 0 !important;
line-height: 1.3 !important;
}
.final-subtext {
font-size: 20px !important;
font-weight: 400 !important;
color: #cccccc !important;
margin: 0 0 40px 0 !important;
line-height: 1.6 !important;
}
.highlight-box-final {
background: rgba(119, 0, 253, 0.15) !important;
border: 2px solid #7700fd !important;
border-radius: 15px !important;
padding: 30px !important;
margin: 0 0 40px 0 !important;
}
.highlight-text-final {
font-size: 24px !important;
font-weight: 700 !important;
color: #ffffff !important;
line-height: 1.5 !important;
margin: 0 !important;
}
.price-section-final {
margin: 0 0 25px 0 !important;
}
.price-text-final {
font-size: 42px !important;
font-weight: 800 !important;
color: #ffffff !important;
margin: 0 0 10px 0 !important;
}
.old-price-final {
text-decoration: line-through !important;
color: #999 !important;
}
.new-price-final {
color: #7700fd !important;
}
.bundle-container-final {
margin: 0 0 30px 0 !important;
}
.bundle-text-final {
font-size: 14px !important;
color: #ffffff !important;
}
.bundle-link-final {
color: #ffffff !important;
text-decoration: underline !important;
}
.cta-button-final {
background: linear-gradient(135deg, #7700fd 0%, #9d00ff 100%) !important;
border: none !important;
border-radius: 35px !important;
padding: 21px 35px !important;
font-size: 17.9px !important;
font-weight: 700 !important;
color: white !important;
cursor: pointer !important;
transition: all 0.3s ease !important;
text-transform: uppercase !important;
letter-spacing: 1px !important;
display: flex !important;
align-items: center !important;
justify-content: center !important;
margin: 0 auto !important;
max-width: 480px !important;
min-height: 81px !important;
box-shadow: 0 10px 40px rgba(119, 0, 253, 0.5) !important;
animation: pulse-button-final 2s infinite !important;
}
@keyframes pulse-button-final {
0%, 100% { transform: scale(1); }
50% { transform: scale(1.05); }
}
.cta-button-final:hover {
transform: scale(1.08) !important;
box-shadow: 0 15px 50px rgba(119, 0, 253, 0.8) !important;
background: linear-gradient(135deg, #8800ff 0%, #b000ff 100%) !important;
}
.lock-icon-final {
width: 21px !important;
height: 21px !important;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 1C8.676 1 6 3.676 6 7v3H5c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2h-1V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v3H8V7c0-2.276 1.724-4 4-4z'/%3E%3C/svg%3E") !important;
background-size: contain !important;
background-repeat: no-repeat !important;
margin-right: 12px !important;
flex-shrink: 0 !important;
}
.button-text-final {
display: flex !important;
flex-direction: column !important;
align-items: center !important;
line-height: 1.3 !important;
}
.small-text-final {
font-size: 10.44px !important;
font-weight: 400 !important;
text-transform: none !important;
margin-top: 3px !important;
letter-spacing: 0 !important;
}
.guarantee-text {
font-size: 16px !important;
font-weight: 400 !important;
color: #aaa !important;
margin: 25px 0 0 0 !important;
line-height: 1.6 !important;
}
.ps-final {
font-size: 18px !important;
font-weight: 600 !important;
color: #ffffff !important;
margin: 50px 0 0 0 !important;
line-height: 1.6 !important;
font-style: italic !important;
}
@media (max-width: 768px) {
.final-headline {
font-size: 30px !important;
}
.final-subtext {
font-size: 18px !important;
}
.highlight-text-final {
font-size: 20px !important;
}
.price-text-final {
font-size: 34px !important;
}
.cta-button-final {
max-width: 420px !important;
padding: 21px 30px !important;
font-size: 15.66px !important;
}
.small-text-final {
font-size: 9.1px !important;
}
}
@media (max-width: 480px) {
.final-headline {
font-size: 24px !important;
}
.final-subtext {
font-size: 16px !important;
}
.highlight-text-final {
font-size: 18px !important;
}
.price-text-final {
font-size: 28px !important;
}
.cta-button-final {
max-width: 350px !important;
padding: 21px 25px !important;
font-size: 13.92px !important;
}
.small-text-final {
font-size: 8.1px !important;
}
.ps-final {
font-size: 16px !important;
}
}
</style>

<!-- HERO SECTION -->
<div class="landing-section">
<div class="content-container">
<div class="intro-text">
<div class="pulse-dot"></div>
<span>Data worth millions, accessible in seconds</span>
</div>
<h1 class="main-headline">
37 Proven A/B Test Results - <span class="highlight">Years of Data, Delivered in Hours</span>
</h1>
<p class="sub-headline">
(Skip the guesswork. Apply what already works.)
</p>
<div class="screenshot-container">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff_7.jpg?v=1760524354" alt="A/B Test Results Dashboard" class="screenshot">
</div>
<div class="pricing-section">
<p class="price-text">
<span class="original-price">$70</span> <span class="current-price">Only $29 Today</span>
</p>
<button class="cta-button" data-checkout="true">
<span>Get Instant Access Now</span>
</button>
<div class="bundle-wrapper">
<span>$18.85 If <a href="https://quantum-scale.co/pages/bundle-builder" class="bundle-link">building a bundle</a></span>
</div>
</div>
<div class="secure-payment">
<div class="secure-payment-icon"></div>
<span>Secure 256-bit SSL encrypted payment</span>
</div>
</div>
</div>

<!-- SECTION 2 - DATA PROOF -->
<div class="profit-engines-mega-section">
<div class="mega-content-wrapper">

<div class="ultra-bold-title-block">
<span class="ultra-bold-line" style="font-size: 36.75px !important;">If you're tired of guessing, or wasting money...</span>
</div>

<p class="mega-paragraph" style="font-size: 19px !important; font-weight: 400 !important; margin-bottom: 50px !important;">
Here's the shortcut that will save you months of testing... And thousands of dollars in wasted ad spend.
</p>

<p class="mega-paragraph huge-text" style="font-size: 33px !important;">
<span class="mega-gold-text">Data = Money</span>
</p>

<p class="mega-paragraph medium-bold" style="font-size: 26.136px !important; margin-top: 120px !important;">
And here's the proof...
</p>

<p class="mega-paragraph" style="margin-bottom: 35px !important;">
For years, we've been running <strong>A/B tests across multiple websites</strong> - testing everything from simple button text to complex page structures.
</p>

<p class="mega-paragraph" style="font-weight: 600 !important;">
<strong>Every website we managed had at least one live A/B test at all times.</strong>
</p>

<p class="mega-paragraph" style="margin-bottom: 40px !important;">
Every change - no matter how small - was tested, measured, and optimized.
</p>

<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2.gif?v=1751796400" alt="Testing Data" class="mega-meme-gif">

<p class="mega-quote" style="font-size: 33.12px !important;">
Some tests improved conversions by 6%, others by as much as 44%.
</p>

<p class="mega-paragraph medium-bold" style="margin-bottom: 30px !important;">
Together, they created powerful insights that drove <span class="mega-gold-text">consistent growth</span>.
</p>

<p class="mega-paragraph" style="margin-bottom: 30px !important;">
Each test was run on real websites with <strong>tens of thousands</strong> (sometimes <strong>hundreds of thousands</strong>) of real visitors.
</p>

<p class="mega-paragraph" style="font-size: 21px !important; font-weight: 700 !important; margin-top: 80px !important; margin-bottom: 50px !important;">
This is data that cost millions of dollars and years of testing to obtain.
</p>

<img src="https://media.tenor.com/IQ6Z-aPhr1wAAAAM/date-everywhere-data.gif" alt="Powerful Insights" class="mega-meme-gif mega-meme-gif-large">

<p class="mega-paragraph huge-text" style="font-size: 24px !important; line-height: 1.3 !important; margin-top: 80px !important;">
Now, for the first time, we've compiled the results of 37 proven A/B tests into a clear, actionable XLS file...
</p>

<p class="mega-paragraph medium-bold" style="margin-top: 50px !important;">
What does this mean for you?
</p>

<p class="mega-paragraph" style="margin-bottom: 25px !important;">
Instead of spending <strong>years</strong> testing every possible change...
</p>

<p class="mega-paragraph" style="font-weight: 600 !important; margin-bottom: 25px !important;">
You can <span class="mega-gold-text">skip the guesswork</span> and implement what's already proven to work.
</p>

<p class="mega-paragraph" style="margin-bottom: 25px !important;">
In just a few hours.
</p>

<p class="mega-paragraph" style="font-size: 21px !important; font-weight: 400 !important; margin-top: 105px !important; color: #000000 !important;">
From minor tweaks like <span class="highlight-box">button text</span> to deeper changes in <span class="highlight-box">page structure</span> and <span class="highlight-box">messaging</span>.
</p>

<p class="mega-paragraph huge-text" style="margin-top: 55px !important; margin-bottom: 55px !important;">
These results reveal what <span class="mega-gold-text">actually moves the needle</span> - not what "sounds good."
</p>

<p class="mega-paragraph" style="font-size: 17px !important; font-style: italic !important; color: #666666 !important;">
Backed by pure, indisputable data about how humans actually make decisions.
</p>

</div>
</div>

<!-- SECTION 3 - SYSTEMS/MODULES -->
<div class="isolated-section">
<div class="inner-wrapper">
<div class="container">
<h2 class="section-title">
Each Change in This File Delivered <span class="highlight">6% to 44%</span> Improvement
</h2>
<p class="subtitle">
Every single test increased conversion rates significantly
</p>
<div class="systems-grid">
<div class="system-card">
<div class="card-number">1</div>
<h3 class="card-title">Button Text Changes</h3>
<p class="card-description">
Simple tweaks to button copy delivered <strong>measurable lift</strong> - some as high as 18% improvement in click-through rates.
</p>
</div>
<div class="system-card">
<div class="card-number">2</div>
<h3 class="card-title">Page Structure Optimization</h3>
<p class="card-description">
Rearranging elements and adjusting layouts led to <strong>conversion improvements between 12% and 31%</strong> across different page types.
</p>
</div>
<div class="system-card">
<div class="card-number">3</div>
<h3 class="card-title">Messaging & Copy Tests</h3>
<p class="card-description">
Changes to headlines, value propositions, and messaging <strong>boosted conversions by up to 44%</strong> - the highest result in the collection.
</p>
</div>
</div>
<div class="transformation-box">
<h3 class="transformation-title">
37 Tests. Each One Delivered Results.
</h3>
<p class="transformation-text">
From the smallest 6% improvement to the massive 44% lift - every test in this collection has been validated with <strong>statistical significance</strong> across tens of thousands of visitors.
</p>
</div>
<div class="final-statement">
<p class="final-text">
We've already done the <strong>hard work</strong> - testing, measuring, and validating everything across millions of visitors.
</p>
<p class="final-text">
Now it's your turn to apply what's proven to work and see a <strong>measurable impact starting today</strong>.
</p>
</div>
</div>
</div>
</div>

<!-- SECTION 4 - COMPARISON TABLE -->
<div class="section-wrapper-isolated">
<div class="container-isolated">
<h2 class="title-isolated">
The Old Way vs. <span class="highlight-isolated">The Smart Way</span>
</h2>
<p class="subtitle-isolated">
Stop wasting time and money on blind testing
</p>
<table class="comparison-table-isolated">
<thead>
<tr>
<th class="column-header-isolated old-way-header-isolated">Traditional Testing</th>
<th class="column-header-isolated new-way-header-isolated">With 37 Proven Tests</th>
</tr>
</thead>
<tbody>
<tr>
<td class="comparison-item-isolated old-way-item-isolated">
Spend months or years running tests
</td>
<td class="comparison-item-isolated new-way-item-isolated">
Get proven results in hours
</td>
</tr>
<tr>
<td class="comparison-item-isolated old-way-item-isolated">
Guess what might work
</td>
<td class="comparison-item-isolated new-way-item-isolated">
Know what already works
</td>
</tr>
<tr>
<td class="comparison-item-isolated old-way-item-isolated">
Burn thousands on failed tests
</td>
<td class="comparison-item-isolated new-way-item-isolated">
Avoid costly mistakes entirely
</td>
</tr>
<tr>
<td class="comparison-item-isolated old-way-item-isolated">
Need 100K+ visitors for reliable data
</td>
<td class="comparison-item-isolated new-way-item-isolated">
Leverage data from millions of visitors
</td>
</tr>
<tr>
<td class="comparison-item-isolated old-way-item-isolated">
Hope your tests are statistically significant
</td>
<td class="comparison-item-isolated new-way-item-isolated">
Every test backed by massive sample sizes
</td>
</tr>
<tr>
<td class="comparison-item-isolated old-way-item-isolated">
Test one element at a time
</td>
<td class="comparison-item-isolated new-way-item-isolated">
Apply 37 proven optimizations instantly
</td>
</tr>
</tbody>
</table>
<button class="cta-button-isolated" data-checkout="true">
<span>Get All 37 Tests Now - $29</span>
</button>
<div class="bundle-price-wrapper-isolated">
<span>$18.85 If <a href="https://quantum-scale.co/pages/bundle-builder" class="bundle-link-isolated">building a bundle</a></span>
</div>
</div>
</div>

<!-- SECTION 5 - FAQ -->
<div class="faq-section">
    <h1>Frequently Asked Questions</h1>

    <div class="faq-item">
        <div class="question" onclick="this.nextElementSibling.classList.toggle('active')">
            <span>Will these tests work for my website?</span>
            <span class="arrow">▼</span>
        </div>
        <div class="answer">Yes. These are <strong>37 fundamental tests</strong> relevant to virtually any website. Each one has been proven to increase conversions between 6% and 44%. Whether you're running e-commerce, SaaS, or lead generation - these principles apply universally because they're based on how humans make decisions.</div>
    </div>

    <div class="faq-item">
        <div class="question" onclick="this.nextElementSibling.classList.toggle('active')">
            <span>What if I buy multiple courses - do they overlap?</span>
            <span class="arrow">▼</span>
        </div>
        <div class="answer">Every course is designed to solve a specific part of the conversion equation. They <strong>complement each other without repeating</strong>, so stacking them creates compounding impact.</div>
    </div>

    <div class="faq-item">
        <div class="question" onclick="this.nextElementSibling.classList.toggle('active')">
            <span>Will I get lifetime access?</span>
            <span class="arrow">▼</span>
        </div>
        <div class="answer"><strong>Yes.</strong> One-time payment, lifetime access. No subscriptions. No hidden fees.</div>
    </div>

    <div class="faq-item">
        <div class="question" onclick="this.nextElementSibling.classList.toggle('active')">
            <span>Is this just theory or can I apply it right away?</span>
            <span class="arrow">▼</span>
        </div>
        <div class="answer">This is <strong>100% practical</strong>. You'll get a clear XLS file with real test results and actionable insights that you can implement immediately. No fluff, no theory - just what worked, what didn't, and by how much.</div>
    </div>

    <div class="faq-item">
        <div class="question" onclick="this.nextElementSibling.classList.toggle('active')">
            <span>Do I need a team to apply this?</span>
            <span class="arrow">▼</span>
        </div>
        <div class="answer">Not at all. Every insight was designed for solo operators. You can implement everything with <strong>minimal tech skills</strong> or outsource it easily if you prefer. Most changes take minutes, not hours.</div>
    </div>

    <div class="faq-item">
        <div class="question" onclick="this.nextElementSibling.classList.toggle('active')">
            <span>How is this different from generic "best practices" advice?</span>
            <span class="arrow">▼</span>
        </div>
        <div class="answer">This isn't generic advice. This is <strong>real data from real tests</strong> run on high-traffic websites with tens (sometimes hundreds) of thousands of visitors per test. Every result is backed by statistical significance - not opinion or guesswork.</div>
    </div>

    <div class="faq-item">
        <div class="question" onclick="this.nextElementSibling.classList.toggle('active')">
            <span>What if I'm not satisfied?</span>
            <span class="arrow">▼</span>
        </div>
        <div class="answer">We offer a <strong>full money-back guarantee</strong>. If you don't find value in these insights, just reach out and we'll refund you - no questions asked.</div>
    </div>

    <div class="faq-item">
        <div class="question" onclick="this.nextElementSibling.classList.toggle('active')">
            <span>Can I really see results "starting today"?</span>
            <span class="arrow">▼</span>
        </div>
        <div class="answer">Yes. These are <strong>proven changes you can implement immediately</strong>. Some take minutes to apply. The moment you make the change, you start benefiting from years of testing that's already been done for you.</div>
    </div>
</div>

<!-- SECTION 6 - FINAL CTA -->
<div class="final-cta-section">
    <div class="final-container">
        <h2 class="final-headline">
            The Choice Is Simple
        </h2>

        <p class="final-subtext">
            Keep burning money on ads that rely on luck...<br>
            Or master the psychology that guarantees results.
        </p>

        <div class="highlight-box-final">
            <p class="highlight-text-final">
                Every day you don't use social proof is a day you're leaving thousands on the table.<br><br>
                Your competitors are already using these tactics.<br>
                Don't let them win.
            </p>
        </div>

        <div class="price-section-final">
            <div class="price-text-final">
                <span class="old-price-final">$197</span> <span class="new-price-final">$29</span>
            </div>
        </div>

        <div class="bundle-container-final">
            <div class="bundle-text-final">
                $18.85 if <a href="https://quantum-scale.co/pages/bundle-builder" class="bundle-link-final">building a bundle</a>
            </div>
        </div>

        <button class="cta-button-final" data-checkout="true">
            <div class="lock-icon-final"></div>
            <div class="button-text-final">
                <span>YES, I WANT THE 37 A/B TEST RESULTS</span>
                <span class="small-text-final">(One-time payment - Instant access)</span>
            </div>
        </button>

        <p class="guarantee-text">
            Secure 256-bit SSL encrypted payment<br>
            Instant access after purchase<br>
            Lifetime access, no subscriptions
        </p>

        <p class="ps-final">
            P.S. - Remember: Data = Money. Stop guessing.<br>
            Start applying what's already proven to work.
        </p>
    </div>
</div>
  `,
};

// Helper function to get HTML for a course
export const getCourseHTML = (slug: string): string | null => {
  const html = courseHTMLBlocks[slug];
  if (!html || html.includes('PASTE YOUR') || html.trim().length < 100) {
    return null;
  }
  return html;

  // ==================== PRODUCT MAPPING ====================
  'product-mapping': `
<style>

.landing-section {
all: initial;
position: relative !important;
left: 50% !important;
right: 50% !important;
margin-left: -50vw !important;
margin-right: -50vw !important;
width: 100vw !important;
min-width: 100vw !important;
background: #000000 !important;
padding: 25px 5px 28px 5px !important;
text-align: center !important;
font-family: 'Open Sans', sans-serif !important;
box-sizing: border-box !important;
overflow-x: hidden !important;
display: block !important;
}
.landing-section::before,
.landing-section::after {
content: '' !important;
position: absolute !important;
top: 0 !important;
bottom: 0 !important;
width: 100vw !important;
background: #000000 !important;
z-index: -1 !important;
}
.landing-section::before {
left: -100vw !important;
}
.landing-section::after {
right: -100vw !important;
}
.landing-section * {
box-sizing: border-box !important;
}
.landing-section .content-container {
max-width: 1200px;
margin: 0 auto;
padding: 0 20px;
}
.landing-section .intro-text {
background: rgba(179, 59, 40, 0.15) !important;
border: 1px solid #B33B28 !important;
border-radius: 25px !important;
padding: 12px 20px !important;
display: inline-flex !important;
align-items: center !important;
gap: 10px !important;
font-size: 13px !important;
color: #ffffff !important;
font-weight: 500 !important;
margin: 15px 0 32px 0 !important;
font-family: 'Open Sans', sans-serif !important;
}
.landing-section .pulse-dot {
width: 8px !important;
height: 8px !important;
background: #B33B28 !important;
border-radius: 50% !important;
animation: pulse 2s infinite !important;
box-shadow: 0 0 10px #B33B28 !important;
display: block !important;
}
@keyframes pulse {
0%, 100% {
opacity: 1;
transform: scale(1);
}
50% {
opacity: 0.5;
transform: scale(1.1);
}
}
.landing-section .main-headline {
font-family: 'Open Sans', sans-serif !important;
font-weight: 800 !important;
font-size: 38.89px !important;
line-height: 1.2 !important;
color: #ffffff !important;
margin: 0 0 16px 0 !important;
letter-spacing: -0.5px !important;
}
.landing-section .highlight {
color: #B33B28 !important;
}
.landing-section .sub-headline {
font-family: 'Open Sans', sans-serif !important;
font-size: 18.67px !important;
color: #e8e8e8 !important;
margin: 0 0 32px 0 !important;
font-weight: 400 !important;
}
.landing-section .screenshot-container {
margin: 32px 0 !important;
padding: 0 !important;
}
.landing-section .screenshot {
width: 100% !important;
max-width: 870px !important;
height: auto !important;
border-radius: 16px !important;
display: block !important;
margin: 0 auto !important;
box-shadow: 0 0 30px rgba(179, 59, 40, 0.5), 0 0 60px rgba(179, 59, 40, 0.3) !important;
}
.landing-section .pricing-section {
margin: 28px 0 0 0 !important;
}
.landing-section .price-text {
font-size: 42px !important;
font-weight: 800 !important;
color: #ffffff !important;
margin: 0 0 25px 0 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
}
.landing-section .original-price {
text-decoration: line-through !important;
color: #888888 !important;
font-size: 32px !important;
margin-right: 15px !important;
}
.landing-section .current-price {
color: #B33B28 !important;
text-shadow: 0 0 20px rgba(179, 59, 40, 0.6) !important;
}
.landing-section .cta-button {
background: radial-gradient(ellipse at bottom, #ff9b7a 0%, #e8634d 40%, #B33B28 100%) !important;
border: none !important;
border-radius: 35px !important;
padding: 8px 90px !important;
font-size: 22px !important;
font-weight: 700 !important;
color: white !important;
cursor: pointer !important;
transition: all 0.3s ease !important;
text-transform: uppercase !important;
letter-spacing: 1px !important;
position: relative !important;
overflow: hidden !important;
display: inline-block !important;
align-items: center !important;
justify-content: center !important;
text-align: center !important;
margin: 0 auto !important;
width: auto !important;
height: 80px !important;
box-shadow: 0 6px 20px rgba(179, 59, 40, 0.35) !important;
font-family: 'Open Sans', sans-serif !important;
vertical-align: middle !important;
}
.landing-section .cta-button:hover {
transform: translateY(-2px) !important;
box-shadow: 0 15px 40px rgba(179, 59, 40, 0.6) !important;
}
.landing-section .cta-button:active {
transform: translateY(0px) !important;
box-shadow: 0 5px 15px rgba(179, 59, 40, 0.4) !important;
}
.landing-section .cta-button.loading {
opacity: 0.8;
pointer-events: none;
}
.landing-section .cta-button span {
font-weight: 700 !important;
color: white !important;
display: block !important;
font-size: 19.8px !important;
line-height: 1.3 !important;
font-family: 'Open Sans', sans-serif !important;
}
.landing-section .small-text {
font-size: 12.6px !important;
font-weight: 400 !important;
text-transform: none !important;
letter-spacing: 0 !important;
display: block !important;
margin-top: 3px !important;
font-family: 'Open Sans', sans-serif !important;
}
.landing-section .bundle-wrapper {
text-align: center !important;
margin: 12px 0 0 0 !important;
display: block !important;
}
.landing-section .bundle-wrapper span {
color: #e8e8e8 !important;
font-size: 14px !important;
font-family: 'Open Sans', sans-serif !important;
}
.landing-section .bundle-link {
color: #B33B28 !important;
text-decoration: underline !important;
}
.landing-section .secure-payment {
display: flex !important;
align-items: center !important;
justify-content: center !important;
gap: 8px !important;
font-size: 15.44px !important;
color: #e8e8e8 !important;
font-weight: 500 !important;
margin-top: 10px !important;
margin-bottom: 8px !important;
font-family: 'Open Sans', sans-serif !important;
}
.landing-section .secure-payment-icon {
width: 28.31px !important;
height: 28.31px !important;
background-image: url('https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Mastercard-Logo.wine.png?v=1758464867') !important;
background-size: contain !important;
background-repeat: no-repeat !important;
background-position: center !important;
display: block !important;
}
@media (max-width: 768px) {
.landing-section {
padding: 3px 3px 20px 3px !important;
}
.landing-section .main-headline {
font-size: 31.46px !important;
}
.landing-section .price-text {
font-size: 36px !important;
}
.landing-section .original-price {
font-size: 26px !important;
}
.landing-section .sub-headline {
font-size: 17px !important;
}
.landing-section .cta-button {
font-size: 18px !important;
padding: 18px 60px !important;
height: 90px !important;
}
.landing-section .cta-button span {
font-size: 18px !important;
}
.landing-section .small-text {
font-size: 12.42px !important;
}
}
@media (max-width: 480px) {
.landing-section {
padding: 2px 2px 20px 2px !important;
}
.landing-section .main-headline {
font-size: 26.45px !important;
}
.landing-section .sub-headline {
font-size: 17px !important;
}
.landing-section .price-text {
font-size: 32px !important;
}
.landing-section .original-price {
font-size: 24px !important;
}
.landing-section .cta-button {
min-width: 300px !important;
font-size: 16.2px !important;
padding: 16px 40px !important;
height: 85px !important;
}
.landing-section .cta-button span {
font-size: 16.2px !important;
}
.landing-section .small-text {
font-size: 11.385px !important;
}
}
@media (min-width: 769px) {
.landing-section .screenshot {
max-width: 75% !important;
}
.landing-section .cta-button {
max-width: 850px !important;
border-radius: 35px !important;
height: 120px !important;
padding: 15px 90px !important;
}
.landing-section .cta-button span {
transform: scale(1.2) !important;
transform-origin: center !important;
}
}


@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800;900&display=swap');

/* בידוד מוחלט - שכבת הגנה */
#profit-engines-root-isolator {
all: initial;
display: block !important;
position: relative !important;
width: 100% !important;
max-width: 100% !important;
margin: 0 !important;
padding: 0 !important;
border: none !important;
background: transparent !important;
box-sizing: border-box !important;
contain: layout style paint !important;
isolation: isolate !important;
z-index: auto !important;
}

/* ריסט מוחלט לכל צאצא */
#profit-engines-root-isolator *,
#profit-engines-root-isolator *::before,
#profit-engines-root-isolator *::after {
all: revert;
box-sizing: border-box !important;
}

/* הסגנון האמיתי מתחיל כאן */
#profit-engines-root-isolator .profit-engines-mega-section {
position: relative;
width: 100%;
max-width: 100%;
padding: 40px 0;
background: #ffffff;
font-family: 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
line-height: 1.6;
box-sizing: border-box;
margin: 0;
border: none;
}

#profit-engines-root-isolator .content-wrapper {
max-width: 800px;
margin: 0 auto;
padding: 0 20px;
box-sizing: border-box;
}

#profit-engines-root-isolator .section-headline {
font-family: 'Open Sans', sans-serif;
font-weight: 800;
font-size: 42px;
line-height: 1.3;
color: #000000;
text-align: center;
margin: 0 0 25px 0;
padding: 0;
display: block;
border: none;
background: none;
}

#profit-engines-root-isolator .section-subheadline {
font-family: 'Open Sans', sans-serif;
font-size: 20px;
line-height: 1.6;
color: #000000;
text-align: center;
margin: 0 0 30px 0;
padding: 0;
font-weight: 400;
display: block;
border: none;
background: none;
}

#profit-engines-root-isolator .paragraph {
font-family: 'Open Sans', sans-serif;
font-size: 18px;
line-height: 1.8;
color: #000000;
text-align: center;
margin: 0 0 16px 0;
padding: 0;
font-weight: 400;
display: block;
border: none;
background: none;
}

#profit-engines-root-isolator .highlight {
font-weight: 700;
color: #000000;
background: none;
}

#profit-engines-root-isolator .image-center {
display: block;
margin: 30px auto;
max-width: 100%;
width: auto;
height: auto;
border-radius: 4px;
border: none;
padding: 0;
}

#profit-engines-root-isolator .medium-text {
font-family: 'Open Sans', sans-serif;
font-size: 28px;
line-height: 1.4;
color: #000000;
text-align: center;
margin: 30px 0;
padding: 0;
font-weight: 700;
display: block;
border: none;
background: none;
}

#profit-engines-root-isolator .small-text {
font-family: 'Open Sans', sans-serif;
font-size: 16px;
line-height: 1.6;
color: #666666;
text-align: center;
margin: 12px 0;
padding: 0;
font-style: italic;
font-weight: 400;
display: block;
border: none;
background: none;
}

#profit-engines-root-isolator .yellow-highlight {
background-color: #fceda9;
padding: 2px 4px;
}

#profit-engines-root-isolator .underlined {
text-decoration: underline;
}

#profit-engines-root-isolator .spacer {
height: 40px;
display: block;
margin: 0;
padding: 0;
border: none;
background: none;
}

#profit-engines-root-isolator span {
display: inline;
margin: 0;
padding: 0;
}

#profit-engines-root-isolator br {
display: inline;
}

#profit-engines-root-isolator img {
border: none;
outline: none;
vertical-align: middle;
}

@media (max-width: 768px) {
#profit-engines-root-isolator .section-headline {
font-size: 32px;
}
#profit-engines-root-isolator .section-subheadline {
font-size: 18px;
}
#profit-engines-root-isolator .paragraph {
font-size: 17px;
}
#profit-engines-root-isolator .medium-text {
font-size: 24px;
}
#profit-engines-root-isolator .image-center {
max-width: 85%;
}
}

@media (max-width: 480px) {
#profit-engines-root-isolator .section-headline {
font-size: 28px;
}
#profit-engines-root-isolator .section-subheadline {
font-size: 16px;
}
#profit-engines-root-isolator .paragraph {
font-size: 16px;
}
#profit-engines-root-isolator .medium-text {
font-size: 22px;
}
#profit-engines-root-isolator .image-center {
max-width: 90%;
}
}


@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800;900&display=swap');

/* בידוד מוחלט - שכבת הגנה */
#origin-story-root-isolator {
all: initial;
display: block !important;
position: relative !important;
width: 100% !important;
max-width: 100% !important;
margin: 0 !important;
padding: 0 !important;
border: none !important;
background: transparent !important;
box-sizing: border-box !important;
contain: layout style paint !important;
isolation: isolate !important;
z-index: auto !important;
}

/* ריסט מוחלט לכל צאצא */
#origin-story-root-isolator *,
#origin-story-root-isolator *::before,
#origin-story-root-isolator *::after {
all: revert;
box-sizing: border-box !important;
}

/* הסגנון האמיתי מתחיל כאן */
#origin-story-root-isolator .origin-story-section {
position: relative;
width: 100%;
max-width: 100%;
padding: 50px 0 30px 0;
background: #ffffff;
font-family: 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
line-height: 1.6;
box-sizing: border-box;
margin: 0;
border: none;
}

#origin-story-root-isolator .content-wrapper {
max-width: 800px;
margin: 0 auto;
padding: 0 20px;
box-sizing: border-box;
}

#origin-story-root-isolator .big-text {
font-family: 'Open Sans', sans-serif;
font-weight: 800;
font-size: 40.66px;
line-height: 1.3;
color: #000000;
text-align: center;
margin: 0 0 30px 0;
padding: 0;
display: block;
border: none;
background: none;
}

#origin-story-root-isolator .big-text-normal {
font-size: 38px;
}

#origin-story-root-isolator .section-headline {
font-family: 'Open Sans', sans-serif;
font-weight: 700;
font-size: 32px;
line-height: 1.3;
color: #000000;
text-align: center;
margin: 40px 0 25px 0;
padding: 0;
display: block;
border: none;
background: none;
}

#origin-story-root-isolator .paragraph {
font-family: 'Open Sans', sans-serif;
font-size: 18px;
line-height: 1.8;
color: #333333;
text-align: center;
margin: 0 0 16px 0;
padding: 0;
font-weight: 400;
display: block;
border: none;
background: none;
}

#origin-story-root-isolator .highlight {
font-weight: 700;
color: #000000;
background: none;
}

#origin-story-root-isolator .medium-text {
font-family: 'Open Sans', sans-serif;
font-size: 23.4px;
line-height: 1.4;
color: #000000;
text-align: center;
margin: 30px 0;
padding: 0;
font-weight: 700;
display: block;
border: none;
background: none;
}

#origin-story-root-isolator .small-text {
font-family: 'Open Sans', sans-serif;
font-size: 16px;
line-height: 1.6;
color: #666666;
text-align: center;
margin: 12px 0;
padding: 0;
font-style: italic;
font-weight: 400;
display: block;
border: none;
background: none;
}

#origin-story-root-isolator .underlined {
text-decoration: underline;
}

#origin-story-root-isolator .spacer {
height: 40px;
display: block;
margin: 0;
padding: 0;
border: none;
background: none;
}

#origin-story-root-isolator .yellow-highlight-2 {
background-color: #ffeb3b;
padding: 2px 4px;
}

#origin-story-root-isolator .enlarged-text {
font-size: 24.27px;
}

#origin-story-root-isolator .smaller-italic {
font-size: 16.2px;
font-style: italic;
font-weight: 400;
}

#origin-story-root-isolator .italic-normal {
font-style: italic;
font-weight: 400;
}

#origin-story-root-isolator .gif-image {
display: block;
max-width: 100%;
height: auto;
margin: 20px auto;
}

#origin-story-root-isolator .brand-images-grid {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 18px;
margin: 30px auto;
max-width: 540px;
padding: 0 20px;
}

#origin-story-root-isolator .brand-image {
width: 100%;
height: auto;
display: block;
border-radius: 8px;
}

#origin-story-root-isolator span {
display: inline;
margin: 0;
padding: 0;
}

#origin-story-root-isolator br {
display: inline;
}

#origin-story-root-isolator h1,
#origin-story-root-isolator h2 {
border: none;
outline: none;
}

@media (max-width: 768px) {
#origin-story-root-isolator .origin-story-section {
padding: 50px 0 25px 0;
}
#origin-story-root-isolator .big-text {
font-size: 34.24px;
}
#origin-story-root-isolator .big-text-normal {
font-size: 32px;
}
#origin-story-root-isolator .section-headline {
font-size: 28px;
}
#origin-story-root-isolator .paragraph {
font-size: 17px;
}
#origin-story-root-isolator .enlarged-text {
font-size: 22.96px;
}
#origin-story-root-isolator .medium-text {
font-size: 21.6px;
}
#origin-story-root-isolator .smaller-italic {
font-size: 15.3px;
}
#origin-story-root-isolator .brand-images-grid {
gap: 14px;
max-width: 440px;
margin: 25px auto;
}
}

@media (max-width: 480px) {
#origin-story-root-isolator .origin-story-section {
padding: 50px 0 20px 0;
}
#origin-story-root-isolator .big-text {
font-size: 29.96px;
}
#origin-story-root-isolator .big-text-normal {
font-size: 28px;
}
#origin-story-root-isolator .section-headline {
font-size: 24px;
}
#origin-story-root-isolator .paragraph {
font-size: 16px;
}
#origin-story-root-isolator .enlarged-text {
font-size: 21.57px;
}
#origin-story-root-isolator .medium-text {
font-size: 19.8px;
}
#origin-story-root-isolator .smaller-italic {
font-size: 14.4px;
}
#origin-story-root-isolator .brand-images-grid {
gap: 12px;
max-width: 360px;
margin: 20px auto;
}
}


@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800;900&display=swap');

.whats-inside-section {
position: relative !important;
left: 50% !important;
right: 50% !important;
margin-left: -50vw !important;
margin-right: -50vw !important;
width: 100vw !important;
min-width: 100vw !important;
padding: 60px 0 !important;
background: #000000 !important;
font-family: 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
line-height: 1.6 !important;
overflow-x: hidden !important;
box-sizing: border-box !important;
}

.whats-inside-section * {
box-sizing: border-box !important;
}

.whats-inside-section::before,
.whats-inside-section::after {
content: '' !important;
position: absolute !important;
top: 0 !important;
bottom: 0 !important;
width: 100vw !important;
background: #000000 !important;
z-index: -2 !important;
}

.whats-inside-section::before {
left: -100vw !important;
}

.whats-inside-section::after {
right: -100vw !important;
}

.content-wrapper {
max-width: 900px !important;
margin: 0 auto !important;
padding: 0 20px !important;
}

.section-title {
font-family: 'Open Sans', sans-serif !important;
font-weight: 800 !important;
font-size: 42px !important;
line-height: 1.3 !important;
color: #ffffff !important;
text-align: center !important;
margin: 0 0 50px 0 !important;
}

.section-subtitle {
font-family: 'Open Sans', sans-serif !important;
font-size: 20px !important;
line-height: 1.6 !important;
color: #e8e8e8 !important;
text-align: center !important;
margin: -30px 0 50px 0 !important;
font-weight: 400 !important;
}

.weapon-item {
position: relative !important;
background: linear-gradient(145deg, #0d0d0d, #050505) !important;
border: 1px solid #1a1a1a !important;
border-left: 5px solid #B33B28 !important;
padding: 30px 35px !important;
margin: 0 0 25px 0 !important;
border-radius: 16px !important;
cursor: pointer !important;
transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
overflow: hidden !important;
box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4) !important;
}

.weapon-item::before {
content: '' !important;
position: absolute !important;
top: -50% !important;
left: -50% !important;
width: 200% !important;
height: 200% !important;
background: radial-gradient(circle, rgba(179, 59, 40, 0.2) 0%, transparent 60%) !important;
opacity: 0 !important;
transition: opacity 0.6s ease, transform 0.6s ease !important;
z-index: 0 !important;
transform: scale(0.5) rotate(0deg) !important;
}

.weapon-item::after {
content: '' !important;
position: absolute !important;
top: 0 !important;
left: -100% !important;
width: 100% !important;
height: 100% !important;
background: linear-gradient(90deg, transparent, rgba(179, 59, 40, 0.15), transparent) !important;
transition: left 0.7s ease !important;
z-index: 1 !important;
}

.weapon-item:hover {
transform: translateY(-12px) scale(1.02) !important;
border: 1px solid #B33B28 !important;
border-left: 5px solid #d94a35 !important;
box-shadow: 
0 20px 60px rgba(179, 59, 40, 0.4),
0 10px 30px rgba(179, 59, 40, 0.3),
0 5px 15px rgba(0, 0, 0, 0.5),
inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
background: linear-gradient(145deg, #1a0f0d, #0a0505) !important;
}

.weapon-item:hover::before {
opacity: 1 !important;
transform: scale(1) rotate(45deg) !important;
}

.weapon-item:hover::after {
left: 100% !important;
}

.weapon-item:active {
transform: translateY(-10px) scale(1.01) !important;
}

.weapon-title {
position: relative !important;
z-index: 1 !important;
font-family: 'Open Sans', sans-serif !important;
font-weight: 800 !important;
font-size: 24px !important;
line-height: 1.3 !important;
color: #ffffff !important;
margin: 0 0 15px 0 !important;
transition: color 0.3s ease, transform 0.3s ease !important;
}

.weapon-item:hover .weapon-title {
color: #ffffff !important;
transform: translateX(3px) !important;
}

.weapon-description {
position: relative !important;
z-index: 1 !important;
font-family: 'Open Sans', sans-serif !important;
font-size: 17px !important;
line-height: 1.7 !important;
color: #b8b8b8 !important;
margin: 0 !important;
font-weight: 400 !important;
transition: color 0.3s ease !important;
}

.weapon-item:hover .weapon-description {
color: #e0e0e0 !important;
}

.highlight-color {
color: #B33B28 !important;
transition: all 0.3s ease !important;
display: inline-block !important;
}

.weapon-item:hover .highlight-color {
color: #d94a35 !important;
text-shadow: 0 0 20px rgba(179, 59, 40, 0.5) !important;
}

@media (max-width: 768px) {
.section-title {
font-size: 34px !important;
}
.section-subtitle {
font-size: 18px !important;
}
.weapon-title {
font-size: 22px !important;
}
.weapon-description {
font-size: 16px !important;
}
.weapon-item {
padding: 25px 25px !important;
}
}

@media (max-width: 480px) {
.section-title {
font-size: 30px !important;
}
.section-subtitle {
font-size: 17px !important;
}
.weapon-title {
font-size: 20px !important;
}
.weapon-description {
font-size: 15px !important;
}
.weapon-item {
padding: 20px 20px !important;
}
.weapon-item:hover {
transform: translateY(-3px) scale(1.005) !important;
}
}

@media (hover: none) {
.weapon-item:hover {
transform: none !important;
}
}


@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800;900&display=swap');
.section-wrapper-isolated {
all: initial !important;
display: block !important;
position: relative !important;
left: 50% !important;
right: 50% !important;
margin-left: -50vw !important;
margin-right: -50vw !important;
width: 100vw !important;
max-width: 100vw !important;
font-family: 'Open Sans', sans-serif !important;
background-color: #ffffff !important;
color: #000000 !important;
padding: 60px 20px !important;
box-sizing: border-box !important;
line-height: 1.6 !important;
overflow-x: hidden !important;
font-size: 16px !important;
font-weight: 400 !important;
text-align: left !important;
border: none !important;
outline: none !important;
box-shadow: none !important;
}
.section-wrapper-isolated::before,
.section-wrapper-isolated::after {
content: '' !important;
position: absolute !important;
top: 0 !important;
bottom: 0 !important;
width: 100vw !important;
background: #ffffff !important;
z-index: -1 !important;
}
.section-wrapper-isolated::before {
left: -100vw !important;
}
.section-wrapper-isolated::after {
right: -100vw !important;
}
.section-wrapper-isolated *,
.section-wrapper-isolated *::before,
.section-wrapper-isolated *::after {
all: unset !important;
box-sizing: border-box !important;
}
.section-wrapper-isolated table {
border-collapse: collapse !important;
display: table !important;
}
.section-wrapper-isolated thead {
display: table-header-group !important;
}
.section-wrapper-isolated tbody {
display: table-row-group !important;
}
.section-wrapper-isolated tr {
display: table-row !important;
}
.section-wrapper-isolated th,
.section-wrapper-isolated td {
display: table-cell !important;
}
.section-wrapper-isolated .container-isolated {
max-width: 800px !important;
margin: 0 auto !important;
text-align: center !important;
position: relative !important;
z-index: 1 !important;
display: block !important;
}
.section-wrapper-isolated .title-isolated {
font-family: 'Open Sans', sans-serif !important;
font-weight: 800 !important;
font-size: 42px !important;
margin: 0 0 15px 0 !important;
color: #000000 !important;
display: block !important;
line-height: 1.2 !important;
text-align: center !important;
}
.section-wrapper-isolated .title-isolated .highlight-isolated {
color: #B33B28 !important;
font-family: inherit !important;
font-weight: inherit !important;
font-size: inherit !important;
}
.section-wrapper-isolated .subtitle-isolated {
font-size: 18px !important;
margin: 0 0 40px 0 !important;
color: #333333 !important;
font-family: 'Open Sans', sans-serif !important;
font-weight: 400 !important;
display: block !important;
line-height: 1.6 !important;
text-align: center !important;
}
.section-wrapper-isolated .comparison-table-isolated {
width: 100% !important;
max-width: 700px !important;
margin: 0 auto 40px auto !important;
border-radius: 8px !important;
overflow: hidden !important;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
font-family: 'Open Sans', sans-serif !important;
background: #ffffff !important;
display: table !important;
border-collapse: collapse !important;
}
.section-wrapper-isolated .comparison-row-isolated {
display: table-row !important;
}
.section-wrapper-isolated .column-header-isolated {
font-weight: 800 !important;
font-size: 20px !important;
padding: 20px 15px !important;
text-align: center !important;
font-family: 'Open Sans', sans-serif !important;
border-bottom: 2px solid #e0e0e0 !important;
display: table-cell !important;
vertical-align: middle !important;
}
.section-wrapper-isolated .column-header-isolated.without-isolated {
background-color: #ffffff !important;
color: #666666 !important;
border: 1px solid #e0e0e0 !important;
}
.section-wrapper-isolated .column-header-isolated.with-isolated {
background-color: #B33B28 !important;
color: #ffffff !important;
}
.section-wrapper-isolated .comparison-item-isolated {
padding: 20px !important;
border-bottom: 1px solid #e0e0e0 !important;
font-size: 16px !important;
font-family: 'Open Sans', sans-serif !important;
font-weight: 400 !important;
text-align: center !important;
display: table-cell !important;
vertical-align: middle !important;
line-height: 1.6 !important;
}
.section-wrapper-isolated .comparison-item-isolated.label-isolated {
background-color: #ffffff !important;
font-weight: 600 !important;
text-align: left !important;
padding-left: 25px !important;
color: #000000 !important;
border: 1px solid #e0e0e0 !important;
}
.section-wrapper-isolated .comparison-item-isolated.without-value-isolated {
color: #999999 !important;
background-color: #ffffff !important;
border: 1px solid #e0e0e0 !important;
}
.section-wrapper-isolated .comparison-item-isolated.with-value-isolated {
color: #B33B28 !important;
font-weight: 700 !important;
background-color: #ffffff !important;
border: 1px solid #e0e0e0 !important;
}
.section-wrapper-isolated .cta-button-isolated {
background: radial-gradient(ellipse at bottom, #B33B28 0%, #8B2A1F 40%) !important;
border: none !important;
border-radius: 35px !important;
padding: 21px 76px !important;
font-size: 16px !important;
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
gap: 15px !important;
margin: 0 auto 10px auto !important;
width: auto !important;
min-width: 380px !important;
height: 81px !important;
font-family: 'Open Sans', sans-serif !important;
}
.section-wrapper-isolated .cta-button-isolated:hover {
transform: translateY(-2px) !important;
}
.section-wrapper-isolated .cta-button-isolated.loading {
opacity: 0.8;
pointer-events: none;
}
.section-wrapper-isolated .cta-button-isolated span {
position: relative !important;
z-index: 999 !important;
font-size: 16px !important;
font-weight: 700 !important;
color: white !important;
display: block !important;
font-family: 'Open Sans', sans-serif !important;
line-height: 1.3 !important;
}
.section-wrapper-isolated .cta-button-isolated .small-text-isolated {
font-size: 10.7px !important;
display: block !important;
font-weight: 400 !important;
text-transform: none !important;
letter-spacing: 0.5px !important;
margin-top: 3px !important;
}
.section-wrapper-isolated .bundle-price-wrapper-isolated {
margin: 15px 0 0 0 !important;
text-align: center !important;
display: block !important;
font-family: 'Open Sans', sans-serif !important;
}
.section-wrapper-isolated .bundle-link-isolated {
color: #B33B28 !important;
text-decoration: underline !important;
font-size: 14px !important;
transition: all 0.3s ease !important;
cursor: pointer !important;
font-family: 'Open Sans', sans-serif !important;
}
.section-wrapper-isolated .bundle-link-isolated:hover {
color: #8B2A1F !important;
text-decoration: none !important;
}
@media (max-width: 768px) {
.section-wrapper-isolated .title-isolated {
font-size: 32px !important;
}
.section-wrapper-isolated .comparison-table-isolated {
font-size: 14px !important;
}
.section-wrapper-isolated .column-header-isolated {
font-size: 18px !important;
padding: 15px 10px !important;
}
.section-wrapper-isolated .comparison-item-isolated {
padding: 15px !important;
font-size: 14px !important;
}
.section-wrapper-isolated .cta-button-isolated {
font-size: 15px !important;
padding: 18px 35px !important;
min-width: 320px !important;
}
.section-wrapper-isolated .cta-button-isolated span {
font-size: 15px !important;
}
}
@media (max-width: 480px) {
.section-wrapper-isolated .title-isolated {
font-size: 28px !important;
}
.section-wrapper-isolated .subtitle-isolated {
font-size: 16px !important;
}
.section-wrapper-isolated .comparison-table-isolated {
font-size: 13px !important;
}
.section-wrapper-isolated .column-header-isolated {
font-size: 16px !important;
padding: 12px 8px !important;
}
.section-wrapper-isolated .comparison-item-isolated {
padding: 12px !important;
font-size: 13px !important;
}
.section-wrapper-isolated .cta-button-isolated {
font-size: 14px !important;
padding: 16px 30px !important;
min-width: 300px !important;
}
}


.faq-section {
all: initial;
display: block;
width: 100%;
max-width: 900px;
margin: 60px auto;
padding: 20px;
box-sizing: border-box;
font-family: Arial, sans-serif;
isolation: isolate;
}
.faq-section *,
.faq-section *::before,
.faq-section *::after {
box-sizing: border-box;
}
.faq-section h1 {
font-family: 'Open Sans', sans-serif;
font-weight: 800;
font-size: 2.5rem;
text-align: center;
margin: 0 0 40px 0;
color: black;
display: block;
box-sizing: border-box;
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
.faq-section .answer strong {
color: black;
font-weight: 700;
}
@media (max-width: 768px) {
.faq-section .question {
font-size: 17px;
padding: 24px;
}
}

</style>

<div class="landing-section">
<div class="content-container">
<div class="intro-text">
<div class="pulse-dot"></div>
<span>The billion-dollar mapping system no competitor uses</span>
</div>
<h1 class="main-headline">
Wire Your Store With a <span class="highlight">Data-Driven System</span> That Forces High Conversions
</h1>
<p class="sub-headline">
(The same framework billion-dollar brands invest in - now accessible to you)
</p>
<div class="screenshot-container">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff_13.jpg?v=1762175110" alt="Product Mapping System" class="screenshot">
</div>
<div class="pricing-section">
<p class="price-text">
<span class="original-price">$197</span> <span class="current-price">Only $39</span>
</p>
<button class="cta-button" id="product-mapping-add-to-cart-btn" data-variant-id="43208454176861">
<span>UNLOCK THE SYSTEM NOW!<br><small class="small-text">one time payment of $39, lifetime access.</small></span>
</button>
<div class="bundle-wrapper">
<span>$25.35 If <a href="https://quantum-scale.co/pages/bundle-builder" class="bundle-link">building a bundle</a></span>
</div>
<div class="secure-payment">
<div class="secure-payment-icon"></div>
<span>Secure 256-bit SSL encrypted payment</span>
</div>
</div>
</div>
</div>




<div id="profit-engines-root-isolator">
<div class="profit-engines-mega-section">
<div class="content-wrapper">
<h2 class="section-headline">The Biggest Brands Are Investing Billions in This...</h2>
<p class="paragraph" style="margin-bottom: 8px;">While you're busy testing creatives,</p>
<p class="paragraph" style="margin-bottom: 8px;">Hunting for that one "winning product,"</p>
<p class="paragraph" style="margin-bottom: 8px;">Burning budget on endless split tests...</p>
<p class="paragraph">They're playing a <span class="highlight">completely different game.</span></p>
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/mad-scream.gif?v=1743322510" alt="Frustrated marketer" class="image-center" style="max-width: 650px; width: 99%; border-radius: 12px;">
<div class="spacer"></div>
<div class="spacer"></div>
<h2 class="section-subheadline" style="font-weight: 800; font-size: 24px; margin-bottom: 25px;">If you're in eCommerce...</h2>
<p class="paragraph">You've probably tried <span class="highlight">countless ways</span> to boost your conversion rate...</p>
<p class="paragraph">A new product, new design, new creatives, different pricing...</p>
<p class="paragraph">But all of these require constant effort and maintenance.</p>
<div class="spacer"></div>
<div class="spacer"></div>
<p class="paragraph" style="font-size: 19.8px;">What if, <span class="highlight">just once...</span></p>
<p class="paragraph">you could wire your store with an advanced psychological system - turning it into a fully-optimized conversion machine?</p>
<div class="spacer"></div>
<div class="spacer"></div>
<p class="paragraph underlined"><span class="highlight">Straight to the point:</span></p>
<h2 class="medium-text"><span class="highlight">Strategic Product Mapping = Explosive Conversion Rate</span></h2>
<p class="paragraph">And yes - this is one of the core tactics we implement in every brand we work on to generate results like this...</p>
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-03-30T114333.853.png?v=1743324252" alt="Results screenshot" class="image-center" style="max-width: 424px; width: 99%; border-radius: 12px; margin-bottom: 15px;">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-03-30T114351.180.png?v=1743324274" alt="Results screenshot" class="image-center" style="max-width: 412px; width: 99%; border-radius: 12px; margin-bottom: 15px;">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-03-30T114401.713.png?v=1743324299" alt="Results screenshot" class="image-center" style="max-width: 412px; width: 99%; border-radius: 12px;">
<div class="spacer"></div>
<h2 class="section-subheadline">With advanced tools, we ensure there's <span class="highlight">no chance</span> a visitor sees less than <span class="highlight">60%</span> of your products without falling in love - <span class="highlight">at a purchase-ready level</span>.</h2>
<img src="https://media.tenor.com/PnsShgYowW8AAAAM/shopping-spree.gif" alt="Shopping spree" class="image-center" style="max-width: 400px; width: 99%; margin-top: 25px; border-radius: 12px;">
<div class="spacer"></div>
<div class="spacer"></div>
<div class="spacer"></div>
<p style="font-weight: 900; font-size: 28px; margin-bottom: 25px; line-height: 1.3; color: #000000; text-align: center; font-family: 'Open Sans', sans-serif; display: block;">Pay attention...</p>
<p class="paragraph" style="margin-bottom: 12px;">Not a single product shown randomly,</p>
<p class="paragraph" style="margin-bottom: 12px;">No guessing...</p>
<p class="paragraph" style="margin-bottom: 25px;">And not products you <span class="highlight">think</span> are good...</p>
<div class="spacer"></div>
<div class="spacer"></div>
<h2 style="font-weight: 900; font-size: 28px; margin-bottom: 35px; line-height: 1.25; color: #000000; text-align: center; font-family: 'Open Sans', sans-serif; display: block;">Here's The Psychology That Changes Everything...</h2>
<p class="paragraph" style="margin-bottom: 18px;">Think about it for a second...</p>
<p class="paragraph" style="margin-bottom: 18px;">If you browse a store and see <span class="highlight">3 products you like,</span></p>
<p class="paragraph" style="margin-bottom: 30px;">The question in your mind is: <span class="highlight">"Should I buy or not?"</span></p>
<div class="spacer"></div>
<p class="paragraph" style="margin-bottom: 18px;">But what if, within <span class="highlight">3 minutes of scrolling,</span></p>
<p class="paragraph" style="margin-bottom: 30px;">You see <span class="highlight">78 products you absolutely love?</span></p>
<div class="spacer"></div>
<p class="medium-text" style="margin-bottom: 40px; font-size: 20.93px; font-weight: 400;">You're no longer asking "should I buy?"<br>You're asking <span class="highlight">"WHAT should I buy?"</span></p>
<div class="spacer"></div>
<div class="spacer"></div>
<p class="paragraph" style="margin-bottom: 15px;">Your internal dialogue shifts instantly:</p>
<p class="paragraph" style="margin-bottom: 12px;">"Okay, I can't go <span class="highlight">completely</span> crazy with my budget...</p>
<p class="paragraph" style="margin-bottom: 18px;">Let me add a bunch of items and then narrow it down..."</p>
<div class="spacer"></div>
<div class="spacer"></div>
<p class="paragraph" style="margin-bottom: 12px;">So you add <span class="highlight">20 items</span> to your cart,</p>
<p class="paragraph" style="margin-bottom: 12px;">Filter it down to <span class="highlight">8 products,</span></p>
<p class="paragraph" style="margin-bottom: 8px; font-size: 31.46px; font-weight: 700;">BOOM!</p>
<p class="paragraph" style="margin-bottom: 25px;">you just spent $600 without even realizing it.</p>
<p class="small-text" style="margin-top: 8px; margin-bottom: 20px;">(Even though literally one minute before clicking the ad, you were complaining about how tight money is and that you need to start saving.)</p>
<img src="https://media.tenor.com/w_pxI6Z22a0AAAAM/budget-accounting.gif" alt="Budget accounting" class="image-center" style="max-width: 400px; width: 99%; border-radius: 12px;">
<div class="spacer"></div>
<p class="medium-text">One-time strategic Product Mapping (based on data) can skyrocket your conversion rate by <span class="highlight">200-400% FOREVER.</span></p>
<p class="small-text">(No need to test endlessly)</p>
</div>
</div>
</div>


<div id="origin-story-root-isolator">
<div class="origin-story-section">
<div class="content-wrapper">
<h1 class="big-text">It All Started Four Years Ago...</h1>
<p class="paragraph">We stumbled upon a <span class="highlight">brutal strategy</span> used by a Dominican businessman who owns over 20 retail brands.</p>
<div class="spacer"></div>
<p class="paragraph">Let's just say this...</p>
<p class="paragraph">Every brand he acquires sees a 40-80% increase in sales within 3 months - and we're talking hundreds of millions in revenue...</p>
<div class="spacer"></div>
<p class="paragraph">This guy is ruthless.</p>
<p class="paragraph">He doesn't "see with his eyes" - he sees with data, psychology, and <span class="highlight">cold calculation.</span></p>
<p class="paragraph">He plays the business game <span class="highlight">without mercy.</span></p>
<img src="https://y.yarn.co/71c323fa-47af-4c63-bf63-47b195e2daf8_text.gif" alt="Game of Thrones" class="gif-image">
<div class="spacer"></div>
<p class="paragraph"><span class="highlight">Instead of getting mad at the monopoly,<br><span class="underlined">We decided to copy it.</span></span></p>
<div class="spacer"></div>
<h2 class="big-text big-text-normal">And It Works. Every. Single. Time.</h2>
<div class="spacer"></div>

<div class="brand-images-grid">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/IMG_7268.png?v=1749204475" alt="Brand 1" class="brand-image">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/IMG_7271.png?v=1749204475" alt="Brand 2" class="brand-image">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/IMG_7267.png?v=1749204475" alt="Brand 3" class="brand-image">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/IMG_7265.png?v=1749204475" alt="Brand 4" class="brand-image">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/IMG_7273.png?v=1749204475" alt="Brand 5" class="brand-image">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/IMG_7272.png?v=1749204475" alt="Brand 6" class="brand-image">
</div>

<p class="paragraph">We studied the entire system inside-out... how it works, why it works, and how to apply it to any niche imaginable.</p>
<div class="spacer"></div>
<h2 class="section-headline"><span class="highlight">It's the complete opposite of everything you've been taught.</span></h2>
<p class="small-text">(Which is probably exactly why most brands crash within two months.)</p>
<div class="spacer"></div>
<div class="spacer"></div>
<div class="spacer"></div>
<p class="paragraph">We basically stole from him...</p>
<h2 class="big-text big-text-normal">Security</h2>
<p class="paragraph">This entrepreneur applies the same system across every single company he owns.</p>
<div class="spacer"></div>
<div class="spacer"></div>
<p class="paragraph">It doesn't matter if it's in fashion...</p>
<p class="paragraph">or luxury goods...</p>
<p class="paragraph">or even kids' bath products...</p>
<div class="spacer"></div>
<p class="paragraph">Once you have this knowledge,<br>you can apply it to any <span class="highlight">brand</span> and start seeing measurable results <span class="highlight">(starting today).</span></p>
<div class="spacer"></div>
<div class="spacer"></div>
<p class="paragraph">It doesn't matter what product you're selling...</p>
<p class="paragraph enlarged-text"><span class="highlight">Every other brand doing under $100M/year isn't doing this. Not one. <span class="yellow-highlight-2">And you will.</span></span></p>
<div class="spacer"></div>
<div class="spacer"></div>
<div class="spacer"></div>
<p class="paragraph smaller-italic">And this is exactly what it's going to give you...</p>
<h2 class="big-text big-text-normal">An Unfair Advantage</h2>
<p class="paragraph">You'll learn how to wire your site in an advanced, data-driven way</p>
<p class="paragraph">that skyrockets its conversions into orbit.</p>
<div class="spacer"></div>
<p class="medium-text"><span class="highlight">Because if a visitor <span class="italic-normal">(personally matched)</span> loves 25-70% of the products they see on your site,<br>it's obvious they'll end up buying <span class="underlined">at least four</span>.</span></p>
<div class="spacer"></div>
<p class="paragraph">So here too - we've decided to reveal all the knowledge we've gathered,<br>To turn your store from "nice" - into a money-printing machine.</p>
<p class="medium-text"><span class="highlight">You're going to thank us.</span></p>
</div>
</div>
</div>


<div class="whats-inside-section">
<div class="content-wrapper">
<h2 class="section-title">What's Inside:</h2>
<p class="section-subtitle">5 Advanced Frameworks That Multiply Conversions</p>

<div class="weapon-item">
<h3 class="weapon-title"><span class="highlight-color">WEAPON 1:</span> The Law of Multiple Options</h3>
<p class="weapon-description">Discover the psychological principle that multiplies both conversion rates and average cart values. Learn how to transform your store into a place customers find it nearly impossible to leave without filling their cart to the maximum.</p>
</div>

<div class="weapon-item">
<h3 class="weapon-title"><span class="highlight-color">WEAPON 2:</span> The Billion-Dollar Mapping System</h3>
<p class="weapon-description">Master how to segment your audience into distinct avatars, and understand exactly how they think and what they desire — based exclusively on data, not guesswork.</p>
</div>

<div class="weapon-item">
<h3 class="weapon-title"><span class="highlight-color">WEAPON 3:</span> The Strategic Product Mapping Framework</h3>
<p class="weapon-description">Copy the exact product mapping architecture that mega-brands use to turn every product on their site into a high-performer. Understand how to arrange products so the customer's brain is compelled to choose something — and choose a lot.</p>
</div>

<div class="weapon-item">
<h3 class="weapon-title"><span class="highlight-color">WEAPON 4:</span> The Anchor Product Effect</h3>
<p class="weapon-description">Learn how to select one product that makes everything else appear impossible to ignore. The magnet that pulls customers into a deep (and extended) buying state that ends with a massive cart.</p>
</div>

<div class="weapon-item">
<h3 class="weapon-title"><span class="highlight-color">WEAPON 5:</span> The Hidden Funnel Strategy</h3>
<p class="weapon-description">The logic behind the invisible system that guides customers to conversion without them noticing. From completely cold (not planning to buy), to walking out within minutes with a $400+ cart and forgetting their bank account balance.</p>
</div>
</div>
</div>


<div class="section-wrapper-isolated">
<div class="container-isolated">
<h2 class="title-isolated">
Before vs. After <span class="highlight-isolated">Product Mapping</span>
</h2>
<p class="subtitle-isolated">
See the transformation when you implement the billion-dollar system
</p>
<table class="comparison-table-isolated">
<thead>
<tr class="comparison-row-isolated">
<th class="column-header-isolated" style="width: 40%; background: transparent !important; border: none !important;"></th>
<th class="column-header-isolated without-isolated" style="width: 30%;">Without Product Mapping</th>
<th class="column-header-isolated with-isolated" style="width: 30%;">With Product Mapping</th>
</tr>
</thead>
<tbody>
<tr class="comparison-row-isolated">
<td class="comparison-item-isolated label-isolated">Conversion Rate</td>
<td class="comparison-item-isolated without-value-isolated">1.2% - 2.5%</td>
<td class="comparison-item-isolated with-value-isolated">4% - 8%+</td>
</tr>
<tr class="comparison-row-isolated">
<td class="comparison-item-isolated label-isolated">Average Order Value</td>
<td class="comparison-item-isolated without-value-isolated">$45 - $80</td>
<td class="comparison-item-isolated with-value-isolated">$120 - $280+</td>
</tr>
<tr class="comparison-row-isolated">
<td class="comparison-item-isolated label-isolated">Product Discovery</td>
<td class="comparison-item-isolated without-value-isolated">Random & Guesswork</td>
<td class="comparison-item-isolated with-value-isolated">Strategic & Data-Driven</td>
</tr>
<tr class="comparison-row-isolated">
<td class="comparison-item-isolated label-isolated">Customer Match Rate</td>
<td class="comparison-item-isolated without-value-isolated">10% - 15%</td>
<td class="comparison-item-isolated with-value-isolated">25% - 70%</td>
</tr>
<tr class="comparison-row-isolated">
<td class="comparison-item-isolated label-isolated">Maintenance Required</td>
<td class="comparison-item-isolated without-value-isolated">Constant Testing</td>
<td class="comparison-item-isolated with-value-isolated">One-Time Setup</td>
</tr>
</tbody>
</table>
<button class="cta-button-isolated" id="product-mapping-comparison-btn" data-variant-id="43208454176861">
<span>GET INSTANT ACCESS NOW<br><small class="small-text-isolated">one time payment of $39, lifetime access.</small></span>
</button>
<div class="bundle-price-wrapper-isolated">
<span style="color: #666666; font-size: 14px;">$25.35 If <a href="https://quantum-scale.co/pages/bundle-builder" class="bundle-link-isolated">building a bundle</a></span>
</div>
</div>
</div>




<div class="faq-section">
<h1>Common Questions</h1>
<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>Why haven't I heard about this before?</span>
<span class="arrow">▼</span>
</div>
<div class="answer">Because <strong>billion-dollar brands don't share their competitive advantages.</strong> They invest millions in teams and systems to implement this, keeping it far from public knowledge. We've reverse-engineered it and made it accessible to you - but your competitors? They have no idea it exists.</div>
</div>
<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>I don't think I need this.</span>
<span class="arrow">▼</span>
</div>
<div class="answer">That's <strong>exactly</strong> what we thought before discovering it. The only reason you think you don't need it is because you haven't experienced it yet. There's a reason the world's most successful brands invest billions in this system - it's not optional at their level. It's foundational.</div>
</div>
<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>What if I buy multiple courses - do they overlap?</span>
<span class="arrow">▼</span>
</div>
<div class="answer">Every course is designed to solve a <strong>specific part of the conversion equation</strong>. They complement each other without repeating content, so stacking them creates <strong>compounding impact</strong>.</div>
</div>
<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>Will I get lifetime access?</span>
<span class="arrow">▼</span>
</div>
<div class="answer">Yes. <strong>One-time payment, lifetime access.</strong> No subscriptions. No hidden fees.</div>
</div>
<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>Is this just theory or can I apply it right away?</span>
<span class="arrow">▼</span>
</div>
<div class="answer">This is <strong>100% practical</strong>. You'll get a clear framework + real examples + plug-and-play templates that you can implement <strong>immediately</strong>.</div>
</div>
<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>Do I need a team to apply this?</span>
<span class="arrow">▼</span>
</div>
<div class="answer">Not at all. Every tactic was designed for <strong>solo operators</strong>. You can implement everything with minimal tech skills or outsource it easily if you prefer.</div>
</div>
<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>Will this work for my specific niche?</span>
<span class="arrow">▼</span>
</div>
<div class="answer">Yes. This system has been proven across <strong>fashion, luxury goods, kids products, and dozens of other niches</strong>. The psychological principles are universal - they work regardless of what you sell.</div>
</div>
<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>How long until I see results?</span>
<span class="arrow">▼</span>
</div>
<div class="answer">Most brands see <strong>measurable improvements within days</strong> of implementing the core framework. Full optimization typically takes 2-4 weeks, but the impact is <strong>permanent</strong> - this is a one-time setup that continues working 24/7.</div>
</div>
</div>
  `,

  // ==================== QUIZ TACTIC ====================
  'quiz-tactic': `
<style>

        body {
            margin: 0;
            padding: 0;
            background: #ffffff;
        }

        .landing-section {
            all: initial;
            position: relative !important;
            left: 50% !important;
            right: 50% !important;
            margin-left: -50vw !important;
            margin-right: -50vw !important;
            width: 100vw !important;
            min-width: 100vw !important;
            background: #000000 !important;
            padding: 25px 5px 28px 5px !important;
            text-align: center !important;
            font-family: 'Open Sans', sans-serif !important;
            box-sizing: border-box !important;
            overflow-x: hidden !important;
            display: block !important;
        }

        .landing-section::before,
        .landing-section::after {
            content: '' !important;
            position: absolute !important;
            top: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            background: #000000 !important;
            z-index: -1 !important;
        }

        .landing-section::before {
            left: -100vw !important;
        }

        .landing-section::after {
            right: -100vw !important;
        }

        .landing-section * {
            box-sizing: border-box !important;
        }

        .content-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .intro-text {
            background: rgba(0, 207, 255, 0.15) !important;
            border: 1px solid #00CFFF !important;
            border-radius: 25px !important;
            padding: 12px 20px !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 10px !important;
            font-size: 11.83px !important;
            color: #ffffff !important;
            font-weight: 500 !important;
            margin: 0 0 32px 0 !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .pulse-dot {
            width: 8px !important;
            height: 8px !important;
            background: #00CFFF !important;
            border-radius: 50% !important;
            animation: pulse 2s infinite !important;
            box-shadow: 0 0 10px #00CFFF !important;
            display: block !important;
        }

        @keyframes pulse {
            0%, 100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.5;
                transform: scale(1.1);
            }
        }

        .main-headline {
            font-size: 48.52px !important;
            font-weight: 800 !important;
            color: #ffffff !important;
            line-height: 1.2 !important;
            margin: 0 0 22px 0 !important;
            font-family: 'Open Sans', sans-serif !important;
            display: block !important;
        }

        .highlight {
            color: #00CFFF !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            font-size: inherit !important;
        }

        .sub-headline {
            font-size: 17px !important;
            color: #e8e8e8 !important;
            margin: 0 0 44px 0 !important;
            font-weight: 400 !important;
            font-family: 'Open Sans', sans-serif !important;
            display: block !important;
        }

        .screenshot-container {
            margin: 0 0 34px 0 !important;
            display: block !important;
        }

        .screenshot {
            max-width: 100% !important;
            height: auto !important;
            border-radius: 8px !important;
            box-shadow: 0 10px 40px rgba(0, 207, 255, 0.3) !important;
            display: block !important;
            margin: 0 auto !important;
        }

        .pricing-section {
            margin: 34px 0 0 0 !important;
            display: block !important;
        }

        .price-text {
            font-size: 36.16px !important;
            color: #ffffff !important;
            font-weight: 700 !important;
            margin: 0 0 28px 0 !important;
            font-family: 'Open Sans', sans-serif !important;
            display: block !important;
        }

        .original-price {
            color: #999999 !important;
            text-decoration: line-through !important;
            font-size: 27.71px !important;
            margin-right: 14.48px !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .current-price {
            color: #00CFFF !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .cta-button {
            all: unset !important;
            display: inline-block !important;
            background: radial-gradient(ellipse at bottom, #7DF5FF 0%, #00CFFF 40%) !important;
            color: #ffffff !important;
            padding: 16px 24px !important;
            font-size: 14.88px !important;
            font-weight: 600 !important;
            border-radius: 12px !important;
            cursor: pointer !important;
            transition: transform 0.2s ease !important;
            text-decoration: none !important;
            min-width: 280px !important;
            font-family: 'Open Sans', sans-serif !important;
            position: relative !important;
            overflow: hidden !important;
            text-align: center !important;
            box-sizing: border-box !important;
            box-shadow: 0 6px 16px rgba(0, 207, 255, 0.4) !important;
            border: none !important;
            margin: 12px auto !important;
            line-height: 1.4 !important;
        }

        .cta-button:hover {
            transform: translateY(-2px) !important;
        }

        .cta-button.loading {
            opacity: 0.8 !important;
            pointer-events: none !important;
        }

        .cta-button span {
            font-size: 14.88px !important;
            font-weight: 600 !important;
            font-family: 'Open Sans', sans-serif !important;
            color: #ffffff !important;
            position: relative !important;
            z-index: 999 !important;
            display: inline-block !important;
            line-height: 1.4 !important;
        }

        .cta-button * {
            font-size: 14.88px !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .secure-payment {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
            font-size: 15.44px !important;
            color: #e8e8e8 !important;
            font-weight: 500 !important;
            margin-top: 10px !important;
            margin-bottom: 8px !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .secure-payment-icon {
            width: 28.31px !important;
            height: 28.31px !important;
            background-image: url('https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Mastercard-Logo.wine.png?v=1758464867') !important;
            background-size: contain !important;
            background-repeat: no-repeat !important;
            background-position: center !important;
            display: block !important;
        }

        .bundle-wrapper {
            text-align: center !important;
            margin: 12px 0 0 0 !important;
            display: block !important;
        }

        .bundle-wrapper span {
            color: #e8e8e8 !important;
            font-size: 14px !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .bundle-link {
            color: #00CFFF !important;
            text-decoration: underline !important;
        }

        @media (max-width: 768px) {
            .landing-section {
                padding: 3px 3px 20px 3px !important;
            }

            .intro-text {
                font-size: 10.92px !important;
            }

            .main-headline {
                font-size: 31.46px !important;
            }

            .sub-headline {
                font-size: 17px !important;
            }

            .screenshot {
                max-width: 85% !important;
            }

            .cta-button {
                min-width: 280px !important;
                font-size: 14.88px !important;
                padding: 16px 24px !important;
            }

            .cta-button span {
                font-size: 14.88px !important;
            }

            .price-text {
                font-size: 28.9px !important;
            }

            .original-price {
                font-size: 22px !important;
            }

            .secure-payment {
                font-size: 14.2px !important;
            }

            .secure-payment-icon {
                width: 26.04px !important;
                height: 26.04px !important;
            }
        }

        @media (max-width: 480px) {
            .landing-section {
                padding: 2px 2px 20px 2px !important;
            }

            .intro-text {
                font-size: 10.92px !important;
            }

            .main-headline {
                font-size: 26.45px !important;
            }

            .sub-headline {
                font-size: 17px !important;
            }

            .screenshot {
                max-width: 80% !important;
            }

            .cta-button {
                min-width: 280px !important;
                font-size: 16px !important;
                padding: 16px 24px !important;
            }

            .cta-button span {
                font-size: 16px !important;
            }

            .secure-payment {
                font-size: 14.2px !important;
            }

            .secure-payment-icon {
                width: 26.04px !important;
                height: 26.04px !important;
            }
        }

        @media only screen and (min-width: 769px) {
            .cta-button {
                width: 600px !important;
                margin: 12px auto !important;
            }
        }
    

        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800;900&display=swap');

        .story-mega-section {
            position: relative !important;
            left: 50% !important;
            right: 50% !important;
            margin-left: -50vw !important;
            margin-right: -50vw !important;
            width: 100vw !important;
            min-width: 100vw !important;
            padding: 40px 0 !important;
            background: #ffffff !important;
            font-family: 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
            line-height: 1.6 !important;
            overflow-x: hidden !important;
            box-sizing: border-box !important;
        }

        .story-mega-section * {
            box-sizing: border-box !important;
            color: #000000 !important;
        }

        .story-mega-section::before,
        .story-mega-section::after {
            content: '' !important;
            position: absolute !important;
            top: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            background: #ffffff !important;
            z-index: -2 !important;
        }

        .story-mega-section::before {
            left: -100vw !important;
        }

        .story-mega-section::after {
            right: -100vw !important;
        }

        .container {
            max-width: 800px !important;
            margin: 0 auto !important;
            padding: 0 20px !important;
            text-align: center !important;
        }

        .section-title {
            font-size: 42px !important;
            font-weight: 800 !important;
            color: #000000 !important;
            margin: 0 0 20px 0 !important;
            line-height: 1.2 !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .section-subtitle {
            font-size: 22px !important;
            color: #000000 !important;
            margin: 0 0 30px 0 !important;
            font-weight: 400 !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .highlight-text {
            background-color: #fceda9 !important;
            padding: 2px 6px !important;
            display: inline !important;
            box-decoration-break: clone !important;
            -webkit-box-decoration-break: clone !important;
            color: #000000 !important;
        }

        .story-text {
            font-size: 18px !important;
            color: #000000 !important;
            line-height: 1.8 !important;
            margin: 20px 0 !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .story-text strong {
            font-weight: 700 !important;
            color: #000000 !important;
        }

        .gif-container {
            margin: 30px 0 !important;
            text-align: center !important;
        }

        .gif-container img {
            max-width: 100% !important;
            height: auto !important;
            display: inline-block !important;
        }

        .proof-image {
            max-width: 100% !important;
            height: auto !important;
            margin: 20px 0 !important;
            display: inline-block !important;
        }

        .big-claim {
            font-size: 34px !important;
            font-weight: 800 !important;
            color: #000000 !important;
            margin: 40px 0 30px 0 !important;
            line-height: 1.2 !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .emphasis-text {
            font-size: 30px !important;
            font-weight: 700 !important;
            color: #000000 !important;
            margin: 30px 0 !important;
            line-height: 1.3 !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .list-text {
            font-size: 17px !important;
            color: #000000 !important;
            line-height: 1.8 !important;
            margin: 10px 0 !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        /* Smaller highlighted section */
        .conversion-highlight {
            font-size: 29px !important;
            font-weight: 800 !important;
            color: #000000 !important;
            margin: 50px 0 10px 0 !important;
            line-height: 1.45 !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        @media (max-width: 768px) {
            .section-title {
                font-size: 32px !important;
            }

            .big-claim {
                font-size: 28px !important;
            }

            .emphasis-text {
                font-size: 24px !important;
            }

            .story-text {
                font-size: 16px !important;
            }

            .conversion-highlight {
                font-size: 22px !important;
            }
        }
    

        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800;900&display=swap');

        .origin-mega-section {
            position: relative !important;
            left: 50% !important;
            right: 50% !important;
            margin-left: -50vw !important;
            margin-right: -50vw !important;
            width: 100vw !important;
            min-width: 100vw !important;
            padding: 60px 0 !important;
            background: #f9f9f9 !important;
            font-family: 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
            line-height: 1.6 !important;
            overflow-x: hidden !important;
            box-sizing: border-box !important;
        }

        .origin-mega-section * {
            box-sizing: border-box !important;
        }

        .origin-mega-section::before,
        .origin-mega-section::after {
            content: '' !important;
            position: absolute !important;
            top: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            background: #f9f9f9 !important;
            z-index: -2 !important;
        }

        .origin-mega-section::before {
            left: -100vw !important;
        }

        .origin-mega-section::after {
            right: -100vw !important;
        }

        .container {
            max-width: 800px !important;
            margin: 0 auto !important;
            padding: 0 20px !important;
            text-align: center !important;
        }

        .section-title {
            font-size: 42px !important;
            font-weight: 800 !important;
            color: #000000 !important;
            margin: 0 0 30px 0 !important;
            line-height: 1.2 !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .story-text {
            font-size: 18px !important;
            color: #333333 !important;
            line-height: 1.8 !important;
            margin: 20px 0 !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .story-text strong {
            font-weight: 700 !important;
        }

        .quote-text {
            font-size: 30px !important;
            font-weight: 700 !important;
            color: #000000 !important;
            margin: 40px 0 30px 0 !important;
            line-height: 1.3 !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .big-number {
            font-size: 34px !important;
            font-weight: 800 !important;
            color: #000000 !important;
            margin: 30px 0 !important;
            line-height: 1.2 !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .gif-container {
            margin: 30px 0 !important;
            text-align: center !important;
        }

        .gif-container img {
            max-width: 100% !important;
            height: auto !important;
            display: inline-block !important;
        }

        .proof-image {
            max-width: 100% !important;
            height: auto !important;
            margin: 30px auto !important;
            display: block !important;
        }

        .emphasis-text {
            font-size: 30px !important;
            font-weight: 700 !important;
            color: #000000 !important;
            margin: 40px 0 !important;
            line-height: 1.3 !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .benefit-text {
            font-size: 18px !important;
            color: #333333 !important;
            line-height: 1.8 !important;
            margin: 20px 0 !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .power-word {
            font-size: 36px !important;
            font-weight: 800 !important;
            color: #00CFFF !important;
            margin: 40px 0 20px 0 !important;
            line-height: 1.2 !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .testimonial-container {
            margin: 50px 0 !important;
            text-align: center !important;
        }

        .testimonial-image {
            max-width: 100% !important;
            height: auto !important;
            margin: 20px auto !important;
            display: block !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
        }

        .note-text {
            font-size: 14px !important;
            font-style: italic !important;
            color: #666666 !important;
            margin: 30px 0 !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        @media (max-width: 768px) {
            .section-title {
                font-size: 32px !important;
            }

            .big-number {
                font-size: 28px !important;
            }

            .emphasis-text {
                font-size: 24px !important;
            }

            .quote-text {
                font-size: 24px !important;
            }

            .story-text {
                font-size: 16px !important;
            }

            .gif-container img {
                max-width: 98% !important;
                width: 98% !important;
            }
        }
    

        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800;900&display=swap');

        .features-mega-section-wrapper {
            all: initial !important;
            display: block !important;
        }

        .features-mega-section {
            all: initial !important;
            display: block !important;
            position: relative !important;
            left: 50% !important;
            right: 50% !important;
            margin-left: -50vw !important;
            margin-right: -50vw !important;
            width: 100vw !important;
            min-width: 100vw !important;
            padding: 60px 0 !important;
            background: #000000 !important;
            font-family: 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
            line-height: 1.6 !important;
            overflow-x: hidden !important;
            box-sizing: border-box !important;
        }

        .features-mega-section *:not(style):not(script) {
            all: unset !important;
            display: revert !important;
            box-sizing: border-box !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .features-mega-section::before,
        .features-mega-section::after {
            content: '' !important;
            position: absolute !important;
            top: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            background: #000000 !important;
            z-index: -2 !important;
            all: unset !important;
            display: block !important;
        }

        .features-mega-section::before {
            left: -100vw !important;
            content: '' !important;
            position: absolute !important;
            top: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            background: #000000 !important;
            z-index: -2 !important;
        }

        .features-mega-section::after {
            right: -100vw !important;
            content: '' !important;
            position: absolute !important;
            top: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            background: #000000 !important;
            z-index: -2 !important;
        }

        .features-mega-section .container {
            display: block !important;
            max-width: 900px !important;
            margin: 0 auto !important;
            padding: 0 20px !important;
        }

        .features-mega-section .section-title {
            display: block !important;
            font-size: 42px !important;
            font-weight: 800 !important;
            color: #ffffff !important;
            margin: 0 0 15px 0 !important;
            line-height: 1.2 !important;
            font-family: 'Open Sans', sans-serif !important;
            text-align: center !important;
        }

        .features-mega-section .section-subtitle {
            display: block !important;
            font-size: 18px !important;
            color: #b0b0b0 !important;
            margin: 0 0 50px 0 !important;
            font-weight: 400 !important;
            font-family: 'Open Sans', sans-serif !important;
            text-align: center !important;
        }

        .features-mega-section .features-grid {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 30px !important;
            margin: 40px 0 !important;
        }

        .features-mega-section .feature-card {
            display: block !important;
            background: rgba(255, 255, 255, 0.02) !important;
            padding: 35px !important;
            border-radius: 20px !important;
            border: 1px solid rgba(255, 255, 255, 0.08) !important;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
            backdrop-filter: blur(20px) saturate(180%) !important;
            -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
            position: relative !important;
            overflow: hidden !important;
        }

        .features-mega-section .feature-card::before {
            content: '' !important;
            position: absolute !important;
            top: -2px !important;
            left: -2px !important;
            right: -2px !important;
            bottom: -2px !important;
            background: linear-gradient(135deg, rgba(0, 207, 255, 0) 0%, rgba(0, 207, 255, 0.1) 50%, rgba(0, 207, 255, 0) 100%) !important;
            opacity: 0 !important;
            transition: opacity 0.5s ease !important;
            pointer-events: none !important;
            border-radius: 20px !important;
            z-index: -1 !important;
            display: block !important;
        }

        .features-mega-section .feature-card::after {
            content: '' !important;
            position: absolute !important;
            top: 0 !important;
            left: -100% !important;
            width: 100% !important;
            height: 100% !important;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.03), transparent) !important;
            transition: left 0.6s ease !important;
            display: block !important;
        }

        .features-mega-section .feature-card:hover {
            background: rgba(255, 255, 255, 0.05) !important;
            border-color: rgba(0, 207, 255, 0.3) !important;
            transform: translateY(-8px) !important;
            box-shadow: 0 25px 70px rgba(0, 207, 255, 0.15), 
                        0 10px 40px rgba(0, 207, 255, 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.15),
                        inset 0 -1px 0 rgba(0, 0, 0, 0.2) !important;
        }

        .features-mega-section .feature-card:hover::before {
            opacity: 1 !important;
        }

        .features-mega-section .feature-card:hover::after {
            left: 100% !important;
        }

        .features-mega-section .feature-number {
            display: block !important;
            font-size: 48px !important;
            font-weight: 800 !important;
            background: linear-gradient(135deg, #00CFFF 0%, #00A3CC 100%) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
            margin: 0 0 15px 0 !important;
            font-family: 'Open Sans', sans-serif !important;
            transition: filter 0.3s ease !important;
        }

        .features-mega-section .feature-card:hover .feature-number {
            filter: drop-shadow(0 0 25px rgba(0, 207, 255, 0.6)) !important;
        }

        .features-mega-section .feature-title {
            display: block !important;
            font-size: 24px !important;
            font-weight: 700 !important;
            color: #ffffff !important;
            margin: 0 0 15px 0 !important;
            font-family: 'Open Sans', sans-serif !important;
            transition: color 0.3s ease !important;
        }

        .features-mega-section .feature-card:hover .feature-title {
            color: #00CFFF !important;
        }

        .features-mega-section .feature-description {
            display: block !important;
            font-size: 16px !important;
            color: #b0b0b0 !important;
            line-height: 1.8 !important;
            margin: 0 !important;
            font-family: 'Open Sans', sans-serif !important;
            transition: color 0.3s ease !important;
        }

        .features-mega-section .feature-card:hover .feature-description {
            color: #d0d0d0 !important;
        }

        .features-mega-section .feature-description strong {
            display: inline !important;
            color: #00CFFF !important;
            font-weight: 700 !important;
        }

        .features-mega-section .highlight-box {
            display: block !important;
            background: linear-gradient(135deg, rgba(252, 237, 169, 0.12) 0%, rgba(252, 237, 169, 0.04) 100%) !important;
            padding: 35px !important;
            border-radius: 20px !important;
            margin: 50px 0 !important;
            text-align: center !important;
            border: 1px solid rgba(252, 237, 169, 0.25) !important;
            backdrop-filter: blur(20px) saturate(180%) !important;
            -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
            box-shadow: 0 10px 40px rgba(252, 237, 169, 0.08),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
        }

        .features-mega-section .highlight-text {
            display: block !important;
            font-size: 24px !important;
            font-weight: 700 !important;
            color: #ffffff !important;
            margin: 0 !important;
            line-height: 1.4 !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .features-mega-section .highlight-text strong {
            display: inline !important;
            color: #fceda9 !important;
        }

        .features-mega-section div {
            display: block !important;
        }

        .features-mega-section h2,
        .features-mega-section h3 {
            display: block !important;
        }

        .features-mega-section p {
            display: block !important;
        }

        @media (max-width: 768px) {
            .features-mega-section .section-title {
                font-size: 32px !important;
            }

            .features-mega-section .feature-number {
                font-size: 36px !important;
            }

            .features-mega-section .feature-title {
                font-size: 20px !important;
            }

            .features-mega-section .highlight-text {
                font-size: 20px !important;
            }
        }
    

        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800;900&display=swap');

        .section-wrapper-isolated {
            all: initial !important;
            font-family: 'Open Sans', sans-serif !important;
            background-color: #ffffff !important;
            color: #000000 !important;
            display: block !important;
            padding: 60px 20px !important;
            box-sizing: border-box !important;
            line-height: 1.6 !important;
            font-size: 16px !important;
            font-weight: 400 !important;
            text-align: left !important;
            border: none !important;
            outline: none !important;
            box-shadow: none !important;
        }

        .section-wrapper-isolated *,
        .section-wrapper-isolated *::before,
        .section-wrapper-isolated *::after {
            all: unset !important;
            box-sizing: border-box !important;
        }

        .section-wrapper-isolated table {
            border-collapse: collapse !important;
            display: table !important;
        }

        .section-wrapper-isolated thead {
            display: table-header-group !important;
        }

        .section-wrapper-isolated tbody {
            display: table-row-group !important;
        }

        .section-wrapper-isolated tr {
            display: table-row !important;
        }

        .section-wrapper-isolated th,
        .section-wrapper-isolated td {
            display: table-cell !important;
        }

        .section-wrapper-isolated .container-isolated {
            max-width: 800px !important;
            margin: 0 auto !important;
            text-align: center !important;
            position: relative !important;
            z-index: 1 !important;
            display: block !important;
        }

        .section-wrapper-isolated .title-isolated {
            font-family: 'Open Sans', sans-serif !important;
            font-weight: 800 !important;
            font-size: 42px !important;
            margin: 0 0 15px 0 !important;
            color: #000000 !important;
            display: block !important;
            line-height: 1.2 !important;
            text-align: center !important;
        }

        .section-wrapper-isolated .title-isolated .highlight-isolated {
            color: #00CFFF !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            font-size: inherit !important;
        }

        .section-wrapper-isolated .subtitle-isolated {
            font-size: 18px !important;
            margin: 0 0 40px 0 !important;
            color: #000000 !important;
            font-weight: 400 !important;
            font-family: 'Open Sans', sans-serif !important;
            display: block !important;
            text-align: center !important;
        }

        .section-wrapper-isolated .comparison-table-isolated {
            width: 100% !important;
            margin: 50px 0 !important;
            border-collapse: collapse !important;
            background: #ffffff !important;
            border-radius: 12px !important;
            overflow: hidden !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
            display: table !important;
        }

        .section-wrapper-isolated .column-header-isolated {
            padding: 20px !important;
            font-size: 20px !important;
            font-weight: 700 !important;
            font-family: 'Open Sans', sans-serif !important;
            display: table-cell !important;
            text-align: center !important;
            vertical-align: middle !important;
        }

        .section-wrapper-isolated .left-column-isolated {
            background: #f5f5f5 !important;
            color: #666666 !important;
            width: 50% !important;
        }

        .section-wrapper-isolated .right-column-isolated {
            background: #00CFFF !important;
            color: #000000 !important;
            width: 50% !important;
        }

        .section-wrapper-isolated .comparison-item-isolated {
            padding: 20px !important;
            font-size: 16px !important;
            font-family: 'Open Sans', sans-serif !important;
            border-top: 1px solid #e8e8e8 !important;
            display: table-cell !important;
            text-align: left !important;
            vertical-align: top !important;
        }

        .section-wrapper-isolated .left-item-isolated {
            background: #ffffff !important;
            color: #333333 !important;
        }

        .section-wrapper-isolated .right-item-isolated {
            background: #ffffff !important;
            color: #000000 !important;
            font-weight: 600 !important;
        }

        .section-wrapper-isolated .checkmark-isolated {
            color: #00CFFF !important;
            font-weight: 700 !important;
            margin-right: 8px !important;
            font-size: 18px !important;
        }

        .section-wrapper-isolated .crossmark-isolated {
            color: #999999 !important;
            font-weight: 700 !important;
            margin-right: 8px !important;
            font-size: 18px !important;
        }

        .section-wrapper-isolated .price-box-isolated {
            background: #000000 !important;
            padding: 30px 40px !important;
            border-radius: 12px !important;
            margin: 50px 0 !important;
            display: block !important;
        }

        .section-wrapper-isolated .price-text-isolated {
            font-size: 48px !important;
            font-weight: 800 !important;
            color: #ffffff !important;
            margin: 0 0 20px 0 !important;
            font-family: 'Open Sans', sans-serif !important;
            display: block !important;
            text-align: center !important;
        }

        .section-wrapper-isolated .original-price-isolated {
            color: #999999 !important;
            text-decoration: line-through !important;
            font-size: 32px !important;
            margin-right: 15px !important;
        }

        .section-wrapper-isolated .current-price-isolated {
            color: #00CFFF !important;
            font-size: 44.16px !important;
        }

        .section-wrapper-isolated .cta-button-isolated {
            background: radial-gradient(ellipse at bottom, #7DF5FF 0%, #00CFFF 40%) !important;
            color: #ffffff !important;
            border: none !important;
            padding: 24px 60px !important;
            font-size: 20.88px !important;
            font-weight: 700 !important;
            border-radius: 35px !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            display: inline-block !important;
            text-decoration: none !important;
            max-width: 90% !important;
            width: 400px !important;
            font-family: 'Open Sans', sans-serif !important;
            margin: 20px 0 !important;
            position: relative !important;
            overflow: hidden !important;
        }

        .section-wrapper-isolated .cta-button-isolated:hover {
            transform: translateY(-3px) !important;
        }

        .section-wrapper-isolated .cta-button-isolated.loading {
            opacity: 0.8;
            pointer-events: none;
        }

        .section-wrapper-isolated .cta-button-isolated span {
            font-size: 20.88px !important;
            font-weight: 700 !important;
            font-family: 'Open Sans', sans-serif !important;
            color: #ffffff !important;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
            position: relative !important;
            z-index: 999 !important;
        }

        .section-wrapper-isolated .bundle-price-wrapper-isolated {
            margin: 15px 0 0 0 !important;
            text-align: center !important;
            display: block !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .section-wrapper-isolated .bundle-price-text-isolated {
            color: #ffffff !important;
            font-size: 14px !important;
        }

        .section-wrapper-isolated .bundle-link-isolated {
            color: #00CFFF !important;
            text-decoration: underline !important;
            font-size: 14px !important;
            transition: all 0.3s ease !important;
            cursor: pointer !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .section-wrapper-isolated .bundle-link-isolated:hover {
            color: #00b8e6 !important;
            text-decoration: none !important;
        }

        .section-wrapper-isolated .guarantee-text-isolated {
            font-size: 14px !important;
            color: #ffffff !important;
            margin: 15px 0 0 0 !important;
            font-family: 'Open Sans', sans-serif !important;
            display: block !important;
            text-align: center !important;
        }

        @media (max-width: 768px) {
            .section-wrapper-isolated .title-isolated {
                font-size: 32px !important;
            }

            .section-wrapper-isolated .comparison-table-isolated {
                font-size: 14px !important;
            }

            .section-wrapper-isolated .column-header-isolated {
                font-size: 18px !important;
                padding: 15px 10px !important;
            }

            .section-wrapper-isolated .comparison-item-isolated {
                padding: 15px !important;
                font-size: 14px !important;
            }

            .section-wrapper-isolated .cta-button-isolated {
                font-size: 15.66px !important;
                padding: 18px 35px !important;
                width: 100% !important;
                max-width: 320px !important;
            }

            .section-wrapper-isolated .cta-button-isolated span {
                font-size: 15.66px !important;
            }

            .section-wrapper-isolated .price-box-isolated {
                padding: 25px 20px !important;
            }
        }
    

.faq-section {
all: initial !important;
display: block !important;
position: relative !important;
left: 50% !important;
right: 50% !important;
margin-left: -50vw !important;
margin-right: -50vw !important;
width: 100vw !important;
min-width: 100vw !important;
background: #ffffff !important;
padding: 60px 0 !important;
box-sizing: border-box !important;
font-family: Arial, sans-serif !important;
isolation: isolate !important;
overflow-x: hidden !important;
}

.faq-section::before,
.faq-section::after {
content: '' !important;
position: absolute !important;
top: 0 !important;
bottom: 0 !important;
width: 100vw !important;
background: #ffffff !important;
z-index: -1 !important;
display: block !important;
}

.faq-section::before {
left: -100vw !important;
}

.faq-section::after {
right: -100vw !important;
}

.faq-section *,
.faq-section *::before,
.faq-section *::after {
all: unset !important;
display: revert !important;
box-sizing: border-box !important;
}

.faq-section h1 {
font-family: 'Open Sans', sans-serif !important;
font-weight: 800 !important;
font-size: 2.5rem !important;
text-align: center !important;
margin: 0 0 40px 0 !important;
padding: 0 !important;
color: black !important;
display: block !important;
}

.faq-container {
max-width: 900px !important;
margin: 0 auto !important;
padding: 0 20px !important;
display: block !important;
}

.faq-section .faq-item {
margin-bottom: 15px !important;
display: block !important;
}

.faq-section .question {
background-color: black !important;
border-radius: 12px !important;
padding: 25px !important;
color: white !important;
font-weight: bold !important;
font-size: 18px !important;
cursor: pointer !important;
transition: opacity 0.3s ease !important;
user-select: none !important;
margin: 0 !important;
box-sizing: border-box !important;
display: flex !important;
justify-content: space-between !important;
align-items: center !important;
font-family: 'Open Sans', sans-serif !important;
}

.faq-section .question:hover {
opacity: 0.9 !important;
}

.faq-section .question .arrow {
font-size: 14px !important;
transition: transform 0.3s ease !important;
margin-left: 15px !important;
flex-shrink: 0 !important;
display: inline-block !important;
}

.faq-section .question.active .arrow {
transform: rotate(180deg) !important;
}

.faq-section .answer {
background-color: white !important;
border: 1px solid black !important;
border-radius: 8px !important;
padding: 20px !important;
margin-top: 10px !important;
font-size: 16px !important;
line-height: 1.7 !important;
color: black !important;
display: none !important;
box-sizing: border-box !important;
font-family: Arial, sans-serif !important;
}

.faq-section .answer.active {
display: block !important;
}

.faq-section .answer strong {
color: black !important;
font-weight: 700 !important;
}

@media (max-width: 768px) {
.faq-section .question {
font-size: 17px !important;
padding: 24px !important;
}

.faq-section h1 {
font-size: 2rem !important;
}
}


        body {
            margin: 0;
            padding: 0;
            background: #ffffff;
        }

        .final-cta-section {
            all: initial;
            position: relative !important;
            left: 50% !important;
            right: 50% !important;
            margin-left: -50vw !important;
            margin-right: -50vw !important;
            width: 100vw !important;
            min-width: 100vw !important;
            background: #000000 !important;
            padding: 60px 20px !important;
            text-align: center !important;
            font-family: 'Open Sans', sans-serif !important;
            box-sizing: border-box !important;
            overflow-x: hidden !important;
            display: block !important;
        }

        .final-cta-section::before,
        .final-cta-section::after {
            content: '' !important;
            position: absolute !important;
            top: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            background: #000000 !important;
            z-index: -1 !important;
        }

        .final-cta-section::before {
            left: -100vw !important;
        }

        .final-cta-section::after {
            right: -100vw !important;
        }

        .final-cta-section * {
            box-sizing: border-box !important;
        }

        .content-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .final-headline {
            font-size: 48px !important;
            font-weight: 800 !important;
            color: #ffffff !important;
            line-height: 1.2 !important;
            margin: 0 0 20px 0 !important;
            font-family: 'Open Sans', sans-serif !important;
            display: block !important;
        }

        .highlight {
            color: #00CFFF !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            font-size: inherit !important;
        }

        .final-subheadline {
            font-size: 20px !important;
            color: #e8e8e8 !important;
            margin: 0 0 40px 0 !important;
            font-weight: 400 !important;
            font-family: 'Open Sans', sans-serif !important;
            display: block !important;
            line-height: 1.6 !important;
        }

        .choice-text {
            font-size: 24px !important;
            color: #ffffff !important;
            margin: 40px 0 30px 0 !important;
            font-weight: 400 !important;
            font-family: 'Open Sans', sans-serif !important;
            line-height: 1.6 !important;
        }

        .or-divider {
            font-size: 28px !important;
            color: #00CFFF !important;
            margin: 30px 0 !important;
            font-weight: 700 !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .pricing-section {
            margin: 50px 0 0 0 !important;
            display: block !important;
        }

        .price-text {
            font-size: 42px !important;
            color: #ffffff !important;
            font-weight: 700 !important;
            margin: 0 0 30px 0 !important;
            font-family: 'Open Sans', sans-serif !important;
            display: block !important;
        }

        .original-price {
            color: #999999 !important;
            text-decoration: line-through !important;
            font-size: 32px !important;
            margin-right: 15px !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .current-price {
            color: #00CFFF !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .cta-button {
            background: radial-gradient(ellipse at bottom, #00CFFF 0%, #00A8CC 100%) !important;
            color: #ffffff !important;
            border: none !important;
            padding: 24px 40px !important;
            font-size: 23.19px !important;
            font-weight: 800 !important;
            border-radius: 35px !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            display: block !important;
            text-decoration: none !important;
            max-width: calc(100% - 40px) !important;
            width: 447px !important;
            font-family: 'Open Sans', sans-serif !important;
            position: relative !important;
            overflow: hidden !important;
            margin: 0 auto !important;
        }

        .cta-button:hover {
            transform: translateY(-3px) !important;
            background: radial-gradient(ellipse at bottom, #1AD9FF 0%, #00CFFF 100%) !important;
        }

        .cta-button.loading {
            opacity: 0.8;
            pointer-events: none;
        }

        .cta-button span {
            font-size: 23.19px !important;
            font-weight: 800 !important;
            font-family: 'Open Sans', sans-serif !important;
            color: #ffffff !important;
            text-shadow: none !important;
            position: relative !important;
            z-index: 999 !important;
        }

        .bundle-wrapper {
            text-align: center !important;
            margin: 15px 0 0 0 !important;
            display: block !important;
        }

        .bundle-wrapper span {
            color: #e8e8e8 !important;
            font-size: 14px !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        .bundle-link {
            color: #00CFFF !important;
            text-decoration: underline !important;
        }

        .guarantee-text {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
            font-size: 15px !important;
            color: #e8e8e8 !important;
            font-weight: 500 !important;
            margin-top: 20px !important;
            font-family: 'Open Sans', sans-serif !important;
        }

        @media (max-width: 768px) {
            .final-headline {
                font-size: 32px !important;
            }

            .final-subheadline {
                font-size: 18px !important;
            }

            .choice-text {
                font-size: 20px !important;
            }

            .cta-button {
                width: calc(100% - 40px) !important;
                max-width: 340px !important;
                font-size: 19px !important;
                padding: 18px 30px !important;
            }

            .cta-button span {
                font-size: 19px !important;
            }

            .price-text {
                font-size: 32px !important;
            }

            .original-price {
                font-size: 24px !important;
            }
        }
    
</style>

<div class="landing-section">
        <div class="content-container">
            <div class="intro-text">
                <div class="pulse-dot"></div>
                <span>The billion-dollar tactic elite brands hide from you</span>
            </div>

            <h1 class="main-headline">
                Steal The <span class="highlight">Quiz Tactic</span> That Took Brands From 3% to 10% Conversion
            </h1>

            <p class="sub-headline">
                (The secret weapon billion-dollar companies use to make visitors <strong>10X more likely to buy</strong>)
            </p>

            <div class="screenshot-container">
                <img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff_8.jpg?v=1760529285" alt="Quiz Tactic Results" class="screenshot">
            </div>

            <div class="pricing-section">
                <p class="price-text">
                    <span class="original-price">$197</span>
                    <span class="current-price">Only $39 </span>
                </p>

                <button class="cta-button" id="quiz-add-to-cart-btn" data-variant-id="43188055277661">
                    <span>Access The Quiz Tactic</span>
                </button>

                <div class="bundle-wrapper">
                    <span>$25.35 If <a href="https://quantum-scale.co/pages/bundle-builder" class="bundle-link">building a bundle</a></span>
                </div>

                <div class="secure-payment">
                    <div class="secure-payment-icon"></div>
                    <span>Secure 256-bit SSL encrypted payment</span>
                </div>
            </div>
        </div>
    </div>

    


    <div class="story-mega-section">
        <div class="container">
            <h2 class="section-title">In a world where Zuck rules us...</h2>
            
            <p class="story-text">
                Millions of eCom store owners believe their creative is what sets them apart,<br>
                blindly testing creatives hoping to find a "winner" and barely hitting <strong>1% conversion rate</strong>.
            </p>

            <p class="story-text" style="font-weight: 700; margin-top: 25px; color: #000000;">
                And they think it's called 'strategy'...
            </p>

            <div class="gif-container">
                <img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/9708718a5263943a338e9072eec122d5.gif?v=1742999762" alt="Frustration GIF" width="266" height="305">
            </div>

            <h2 class="conversion-highlight">
                <span class="highlight-text">We build a conversion machine for every brand</span><br>
                <span class="highlight-text">that keeps generating for us over 2 years</span><br>
                <span class="highlight-text">8–10% conversion Rate</span>
            </h2>

            <p class="story-text" style="font-size: 16px; font-weight: 400; color: #000000;">
                (That's a "Cha-ching!" for every 10-12 visitors)
            </p>

            <div style="height: 60px;"></div>

            <p class="story-text" style="font-weight: 700; font-size: 20px; color: #000000; margin: 0;">
                So, If you're in eCommerce...
            </p>

            <p class="story-text" style="color: #000000;">
                What you're about to read on this short page is going to make you <strong>more money than every tip any 'guru'</strong> has ever given you…
            </p>

            <div style="height: 60px;"></div>

            <p class="story-text" style="text-decoration: underline; font-weight: 700; color: #000000; margin: 0;">
                Straight to the point:
            </p>

            <h2 class="big-claim" style="font-size: 41.1px; color: #000000;">We stole a billion-dollar tactic.</h2>

            <br>

            <div style="height: 40px;"></div>

            <h3 class="section-subtitle" style="font-size: 26px; font-weight: 700; color: #000000; margin: 0 0 30px 0;">
                And here's the proof...
            </h3>

            <p class="story-text" style="color: #000000;">
                On 23.01.2025, we started working with a new fashion brand that mainly operates in the UK. The first thing we did was implement the Quiz tactic… Before that, <strong>their conversion rate was 3.03%</strong>... Steady, right?
            </p>

            <img class="proof-image" src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/f8dc6699dbd6bbaf07f2ec5dfa97326e.jpg?v=1762278162" alt="Before Results" width="486" height="211">

            <p class="story-text" style="margin-top: 30px; color: #000000;">
                And just a few days later… everything took off...
            </p>

            <img class="proof-image" src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/1.jpg?v=1762278237" alt="After Results" width="475" height="215">

            <p class="emphasis-text" style="margin-top: 50px; color: #000000;">
                "The Quiz tactic is like a money machine,<br><strong>Put in $1 – get back $10."</strong>
            </p>

            <br><br>

            <p class="story-text" style="font-weight: 700; font-size: 18px; color: #000000;">
                Pay attention...
            </p>

            <p class="list-text" style="color: #000000;">
                Not a "winning product" (cheap gimmick),<br>
                Not endless streams of creatives…<br>
                Not "winning" copywriting,<br>
                Not products that competitors can steal from you…
            </p>

            <p class="story-text" style="font-size: 26px; font-weight: 400; margin-top: 50px; color: #000000;">
                The quiz tactic is one of the <span class="highlight-text"><strong>3 tactics</strong></span> that can take your brand's conversion rate <strong>above 8%</strong>
            </p>

            <p class="story-text" style="font-size: 12.88px; font-weight: 400; margin: 10px 0; font-style: italic; color: #000000;">
                (Laser targeting tactic, social proof tactic, quiz tactic)
            </p>

            <br><br>

            <p class="story-text" style="font-size: 18px; margin-top: 40px; color: #000000;">
                And if you combine them together, Good luck…
            </p>

            <h2 class="section-title" style="font-size: 26px; margin-top: 20px; color: #000000;">
                Your conversion rate will go to the MOON
            </h2>

            <div class="gif-container">
                <img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/3be5a1c2fd9a8bd284bfabb6506ed8ce.gif?v=1742999766" alt="Moon GIF">
            </div>

            <p class="story-text" style="font-size: 16px; max-width: 600px; margin: 40px auto; color: #000000;">
                A properly built quiz tactic changes the game forever. We're not talking about tweaks – but about jumps of <strong>300–400%</strong> in conversion rate that actually happen <strong><span style="text-decoration: underline;">when done right.</span></strong>
            </p>
        </div>
    </div>


    <div class="origin-mega-section">
        <div class="container">
            <h1 class="section-title">It all started two years ago...</h1>

            <p class="story-text">
                when a friendly guy sitting with me at the office complex,<br>
                turned out to be the lead developer at one of the <strong>biggest skincare companies in the world...</strong>
            </p>

            <div style="height: 40px;"></div>

            <p class="story-text">
                And then, during a regular lunch break,<br>
                <strong>I asked him...</strong>
            </p>

            <p class="quote-text">
                "What's your conversion rate?"
            </p>

            <div style="height: 40px;"></div>

            <p class="story-text">
                And he gave an answer I didn't believe was real…
            </p>

            <h2 class="big-number">
                "8%–12%, depends on the period"
            </h2>

            <div class="gif-container">
                <img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/what-why.gif?v=1743003262" alt="What Why GIF" width="243" height="243">
            </div>

            <p class="story-text">
                From that moment – everything inside me changed completely.
            </p>

            <div style="height: 40px;"></div>

            <p class="story-text">
                Like a good source of truth, he just <strong>spilled everything…</strong>
            </p>

            <p class="story-text">
                The entire method that took them from losing money to a company generating <strong>hundreds of millions a year.</strong>
            </p>

            <p class="story-text">
                So I <strong>copied everything</strong> from the company and implemented it...
            </p>

            <img class="proof-image" src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/8_1.png?v=1742999762" alt="Implementation Results" width="284" height="374">

            <p class="emphasis-text">
                I was speechless, this was next-level genius.
            </p>

            <p class="story-text">
                At that time, I had a kids' shoes brand, so I quickly decided to implement everything there…
            </p>

            <p class="emphasis-text">
                And here's the result...
            </p>

            <img class="proof-image" src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-03-26T172124.280.png?v=1743002520" alt="Kids Shoes Results" width="396" height="200">

            <div style="height: 50px;"></div>

            <p class="story-text" style="font-size: 18px;">
                But even more than that, we got…
            </p>

            <h2 class="power-word">Power</h2>

            <p class="benefit-text">
                You don't need a crazy creative…
            </p>

            <p class="benefit-text">
                It doesn't matter if competitors are stealing your products…
            </p>

            <p class="benefit-text">
                You now have the power to stick to a strategy that works on deep levels,<br>
                master it, and repeat it again and again… <strong>and no one can stop you.</strong>
            </p>

            <div style="height: 80px;"></div>

            <p class="benefit-text">
                When you have the knowledge, add more advanced tactics together,<br>
                and <strong>amplify</strong> it across every brand you ever launch to make…
            </p>

            <h2 class="power-word">Money</h2>

            <p class="story-text">
                So here too - we've decided to pass on all the knowledge we've gained with this tactic.
            </p>

            <p class="story-text" style="font-size: 22px; font-weight: 700;">
                You'll be left speechless… and with deeper pockets. Promise.
            </p>

            <p class="story-text" style="font-size: 24px; text-align: left;">
                Within <strong>days</strong>, you'll witness this beast in action - just like they did....
            </p>

            <div class="testimonial-container">
                <img class="testimonial-image" src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Hurdeep.png?v=1745236417" alt="Testimonial 1" width="538" height="358">
                
                <img class="testimonial-image" src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Hurdeep_2.png?v=1745236442" alt="Testimonial 2" width="548" height="365">
                
                <img class="testimonial-image" src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Hurdeep_1.png?v=1745236439" alt="Testimonial 3">
            </div>

            <p class="note-text">
                *We recommend combining it with tools from the site to strengthen your overall foundation.
            </p>
        </div>
    </div>


    <div class="features-mega-section-wrapper">
        <div class="features-mega-section">
            <div class="container">
                <h2 class="section-title">What's Inside The Quiz Tactic</h2>
                <p class="section-subtitle">
                    The exact framework billion-dollar brands use to turn browsers into buyers
                </p>

                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-number">01</div>
                        <h3 class="feature-title">The Psychology Framework</h3>
                        <p class="feature-description">
                            Discover why quizzes bypass logical resistance and tap directly into the buyer's emotional decision-making process. You'll learn the exact psychological triggers that make visitors <strong>10X more likely to purchase</strong> after completing a quiz.
                        </p>
                    </div>

                    <div class="feature-card">
                        <div class="feature-number">02</div>
                        <h3 class="feature-title">Quiz Architecture Blueprint</h3>
                        <p class="feature-description">
                            Get the proven question structure that elite brands use. Learn which questions to ask, in what order, and why each one builds unstoppable momentum toward the purchase. This isn't guesswork - it's <strong>battle-tested science</strong>.
                        </p>
                    </div>

                    <div class="feature-card">
                        <div class="feature-number">03</div>
                        <h3 class="feature-title">Personalization Engine</h3>
                        <p class="feature-description">
                            Master the art of making every visitor feel like you're speaking directly to them. You'll learn how to segment and recommend products with <strong>laser precision</strong>, dramatically increasing perceived value and purchase intent.
                        </p>
                    </div>

                    <div class="feature-card">
                        <div class="feature-number">04</div>
                        <h3 class="feature-title">Implementation Templates</h3>
                        <p class="feature-description">
                            No need to start from scratch. You get <strong>plug-and-play templates</strong> for fashion, beauty, supplements, and general eCommerce. Simply customize for your brand and deploy within hours - not weeks.
                        </p>
                    </div>

                    <div class="feature-card">
                        <div class="feature-number">05</div>
                        <h3 class="feature-title">Data Collection Strategy</h3>
                        <p class="feature-description">
                            Learn how to ethically collect valuable customer data while delivering massive value. This data becomes <strong>pure gold</strong> for your email marketing, retargeting, and product development.
                        </p>
                    </div>

                    <div class="feature-card">
                        <div class="feature-number">06</div>
                        <h3 class="feature-title">Conversion Optimization Secrets</h3>
                        <p class="feature-description">
                            Discover the micro-optimizations that separate 3% conversion rates from 10%+ conversion rates. Every button placement, color choice, and word matters - and you'll know exactly <strong>what works and why</strong>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="section-wrapper-isolated">
        <div class="container-isolated">
            <h2 class="title-isolated">
                Choose Your Path: <span class="highlight-isolated">Struggle or Succeed</span>
            </h2>
            <p class="subtitle-isolated">
                Here's what separates the 1% conversion brands from the 10%+ conversion brands
            </p>

            <table class="comparison-table-isolated">
                <thead>
                    <tr>
                        <th class="column-header-isolated left-column-isolated">Without The Quiz Tactic</th>
                        <th class="column-header-isolated right-column-isolated">With The Quiz Tactic</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="comparison-item-isolated left-item-isolated">
                            <span class="crossmark-isolated">✗</span>Endless creative testing with no clear winner
                        </td>
                        <td class="comparison-item-isolated right-item-isolated">
                            <span class="checkmark-isolated">✓</span>Systematic conversion machine that works 24/7
                        </td>
                    </tr>
                    <tr>
                        <td class="comparison-item-isolated left-item-isolated">
                            <span class="crossmark-isolated">✗</span>1-3% conversion rate (industry average)
                        </td>
                        <td class="comparison-item-isolated right-item-isolated">
                            <span class="checkmark-isolated">✓</span>6-10% conversion rate consistently
                        </td>
                    </tr>
                    <tr>
                        <td class="comparison-item-isolated left-item-isolated">
                            <span class="crossmark-isolated">✗</span>Competitors easily copy your products
                        </td>
                        <td class="comparison-item-isolated right-item-isolated">
                            <span class="checkmark-isolated">✓</span>Uncopiable psychological framework
                        </td>
                    </tr>
                    <tr>
                        <td class="comparison-item-isolated left-item-isolated">
                            <span class="crossmark-isolated">✗</span>Burning ad budget with minimal returns
                        </td>
                        <td class="comparison-item-isolated right-item-isolated">
                            <span class="checkmark-isolated">✓</span>Every $1 spent returns $10+ consistently
                        </td>
                    </tr>
                    <tr>
                        <td class="comparison-item-isolated left-item-isolated">
                            <span class="crossmark-isolated">✗</span>Guessing what customers want
                        </td>
                        <td class="comparison-item-isolated right-item-isolated">
                            <span class="checkmark-isolated">✓</span>Data-driven personalization that converts
                        </td>
                    </tr>
                    <tr>
                        <td class="comparison-item-isolated left-item-isolated">
                            <span class="crossmark-isolated">✗</span>Constantly fighting to stay relevant
                        </td>
                        <td class="comparison-item-isolated right-item-isolated">
                            <span class="checkmark-isolated">✓</span>Long-term competitive advantage
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="price-box-isolated">
                <p class="price-text-isolated">
                    <span class="original-price-isolated">$197</span>
                    <span class="current-price-isolated">$39</span>
                </p>

                <button class="cta-button-isolated" id="quiz-section5-add-to-cart-btn" data-variant-id="43188055277661">
                    <span>Get The Quiz Tactic Now</span>
                </button>

                <div class="bundle-price-wrapper-isolated">
                    <span class="bundle-price-text-isolated">$25.35 If <a href="https://quantum-scale.co/pages/bundle-builder" class="bundle-link-isolated">building a bundle</a></span>
                </div>

                <p class="guarantee-text-isolated">
                    ✓ Instant Access • ✓ Lifetime Updates • ✓ 100% Satisfaction Guaranteed
                </p>
            </div>
        </div>
    </div>

    


<div class="faq-section">
<div class="faq-container">
<h1>Common Questions</h1>

<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>I don't need this. Why should I care about quiz tactics?</span>
<span class="arrow">▼</span>
</div>
<div class="answer">You think you don't need it only because you haven't known it yet. There's a reason why the world's leading brands invest <strong>billions</strong> in this tactic. They don't do it for fun - they do it because it <strong>multiplies revenue</strong>. While you're stuck at 1-3% conversion, they're cruising at 8-12%. The gap isn't talent or budget - it's <strong>knowing what they know</strong>.</div>
</div>

<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>Will this work for my specific type of eCommerce store?</span>
<span class="arrow">▼</span>
</div>
<div class="answer">The Quiz Tactic works for <strong>any eCommerce brand</strong> that sells to humans. Fashion, beauty, supplements, home goods, electronics - it doesn't matter. The psychology is universal. We've seen it transform conversion rates across <strong>dozens of niches</strong>. If you have products and customers who need help choosing, this works.</div>
</div>

<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>What if I buy multiple courses - do they overlap?</span>
<span class="arrow">▼</span>
</div>
<div class="answer">Every course is designed to solve a <strong>specific part of the conversion equation</strong>. They complement each other without repeating, so stacking them creates <strong>compounding impact</strong>. Think of it like building blocks - each one adds a new layer of power to your store.</div>
</div>

<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>Will I get lifetime access?</span>
<span class="arrow">▼</span>
</div>
<div class="answer">Yes. <strong>One-time payment, lifetime access.</strong> No subscriptions. No hidden fees. You buy it once and own it forever, including all future updates.</div>
</div>

<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>Is this just theory or can I apply it right away?</span>
<span class="arrow">▼</span>
</div>
<div class="answer">This is <strong>100% practical</strong>. You'll get a clear framework + real examples + plug & play templates that you can implement <strong>immediately</strong>. No fluff, no filler - just actionable strategies that start working from day one.</div>
</div>

<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>Do I need a team to apply this?</span>
<span class="arrow">▼</span>
</div>
<div class="answer">Not at all. Every tactic was designed for <strong>solo operators</strong>. You can implement everything with minimal tech skills or outsource it easily if you prefer. No developers required—just you and the templates.</div>
</div>

<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>How long will it take to see results?</span>
<span class="arrow">▼</span>
</div>
<div class="answer">Most brands see measurable improvements <strong>within days</strong> of implementing the Quiz Tactic. The case study in this page? That brand saw results in <strong>less than a week</strong>. This isn't a slow-burn strategy—it's a rapid transformation tool.</div>
</div>

<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>What if I'm not tech-savvy?</span>
<span class="arrow">▼</span>
</div>
<div class="answer">The templates are designed to be <strong>plug-and-play</strong>. If you can copy and paste, you can implement this. We've removed all technical barriers so you can focus on results, not code.</div>
</div>

</div>
</div>


    <div class="final-cta-section">
        <div class="content-container">
            <h2 class="final-headline">
                Every Day You Wait, You're <span class="highlight">Losing Money</span>
            </h2>

            <p class="final-subheadline">
                While you're stuck at 1-3% conversion, your competitors are implementing systems like this and dominating your market.
            </p>

            <p class="choice-text" style="margin-top: 40px; font-size: 20px;">
                <strong>Choice #1:</strong> Keep burning ad budget, testing endless creatives, watching visitors leave without buying.
            </p>

            <p class="or-divider">OR</p>

            <p class="choice-text" style="font-size: 20px;">
                <strong>Choice #2:</strong> Implement the billion-dollar tactic, multiply your conversion rate by 3-4X, and build the profitable store you deserve.
            </p>

            <div class="pricing-section">
                <p class="price-text">
                    <span class="original-price">$197</span>
                    <span class="current-price">Only $39</span>
                </p>

                <button class="cta-button" id="quiz-final-add-to-cart-btn" data-variant-id="43188055277661">
                    <span>Yes, I Want The Quiz Tactic</span>
                </button>

                <div class="bundle-wrapper">
                    <span>$25.35 If <a href="https://quantum-scale.co/pages/bundle-builder" class="bundle-link">building a bundle</a></span>
                </div>

                <div class="guarantee-text">
                    <span>✓ Instant Access • ✓ Lifetime Updates</span>
                </div>
            </div>
        </div>
    </div>
  `,

  // ==================== LASER TARGETING ====================
  'laser-targeting': `
<style>

body {
margin: 0;
padding: 0;
background: #ffffff;
}

.landing-section {
all: initial;
position: relative !important;
left: 50% !important;
right: 50% !important;
margin-left: -50vw !important;
margin-right: -50vw !important;
width: 100vw !important;
min-width: 100vw !important;
background: #000000 !important;
padding: 25px 5px 28px 5px !important;
text-align: center !important;
font-family: 'Open Sans', sans-serif !important;
box-sizing: border-box !important;
overflow-x: hidden !important;
display: block !important;
isolation: isolate !important;
z-index: 1 !important;
}

.landing-section::before,
.landing-section::after {
content: '' !important;
position: absolute !important;
top: 0 !important;
bottom: 0 !important;
width: 100vw !important;
background: #000000 !important;
z-index: -1 !important;
}

.landing-section::before {
left: -100vw !important;
}

.landing-section::after {
right: -100vw !important;
}

.landing-section * {
box-sizing: border-box !important;
}

.content-container {
max-width: 1200px;
margin: 0 auto;
padding: 0 20px;
}

.intro-text {
background: rgba(255, 0, 23, 0.15) !important;
border: 1px solid #ff0017 !important;
border-radius: 25px !important;
padding: 12px 20px !important;
display: inline-flex !important;
align-items: center !important;
gap: 10px !important;
font-size: 13px !important;
color: #ffffff !important;
font-weight: 500 !important;
margin: 0 0 32px 0 !important;
font-family: 'Open Sans', sans-serif !important;
}

.pulse-dot {
width: 8px !important;
height: 8px !important;
background: #ff0017 !important;
border-radius: 50% !important;
animation: pulse 2s infinite !important;
box-shadow: 0 0 10px #ff0017 !important;
display: block !important;
}

@keyframes pulse {
0%, 100% {
opacity: 1;
transform: scale(1);
}
50% {
opacity: 0.5;
transform: scale(1.1);
}
}

.main-headline {
font-size: 49.94px;
font-weight: 900;
color: #ffffff;
margin: 0 0 13px 0;
line-height: 1.2;
font-family: 'Open Sans', sans-serif;
}

.highlight {
color: #ff0017;
}

.sub-headline {
font-size: 21.75px;
color: #e8e8e8;
margin: 0 0 40px 0;
font-weight: 400;
line-height: 1.4;
font-family: 'Open Sans', sans-serif;
}

.screenshot-container {
margin: 0 0 32px 0;
display: flex;
justify-content: center;
align-items: center;
}

.screenshot {
max-width: 100%;
height: auto;
border-radius: 8px;
box-shadow: 0 10px 30px rgba(255, 0, 23, 0.3);
display: block;
}

.pricing-section {
margin: 0 0 20px 0;
}

.price-text {
font-size: 36.25px;
color: #ffffff;
font-weight: 700;
margin: 0 0 8px 0;
font-family: 'Open Sans', sans-serif;
}

.original-price {
color: #999999;
text-decoration: line-through;
font-size: 27.56px;
margin-right: 10px;
}

.current-price {
color: #ff0017;
}

.cta-button {
all: unset !important;
display: inline-flex !important;
background: radial-gradient(ellipse at bottom, #FF9999 0%, #FF0000 50%) !important;
color: #ffffff !important;
border-radius: 35px !important;
font-size: 17.38px !important;
font-weight: 700 !important;
padding: 21px 76px !important;
cursor: pointer !important;
transition: all 0.3s ease !important;
align-items: center !important;
justify-content: center !important;
text-decoration: none !important;
min-width: 421px !important;
font-family: 'Open Sans', sans-serif !important;
box-shadow: 0 10px 30px rgba(255, 0, 23, 0.4) !important;
text-transform: uppercase !important;
letter-spacing: 1px !important;
height: 81px !important;
position: relative !important;
border: none !important;
overflow: hidden !important;
box-sizing: border-box !important;
text-align: center !important;
}

.cta-button:hover {
transform: translateY(-2px) !important;
box-shadow: 0 15px 40px rgba(255, 0, 23, 0.6) !important;
}

.cta-button.loading {
opacity: 0.8 !important;
pointer-events: none !important;
}

.cta-button span {
font-size: 17.38px !important;
font-weight: 600 !important;
color: #ffffff !important;
font-family: 'Open Sans', sans-serif !important;
position: relative !important;
z-index: 999 !important;
display: inline-block !important;
line-height: 1.4 !important;
}

.bundle-wrapper {
text-align: center !important;
margin: 12px 0 0 0 !important;
display: block !important;
}

.bundle-wrapper span {
color: #e8e8e8 !important;
font-size: 14px !important;
font-family: 'Open Sans', sans-serif !important;
}

.bundle-link {
color: #ff0017 !important;
text-decoration: underline !important;
}

.secure-payment {
display: flex !important;
align-items: center !important;
justify-content: center !important;
gap: 8px !important;
font-size: 15.44px !important;
color: #e8e8e8 !important;
font-weight: 500 !important;
margin-top: 10px !important;
margin-bottom: 8px !important;
font-family: 'Open Sans', sans-serif !important;
}

.secure-payment-icon {
width: 28.31px !important;
height: 28.31px !important;
background-image: url('https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Mastercard-Logo.wine.png?v=1758464867') !important;
background-size: contain !important;
background-repeat: no-repeat !important;
background-position: center !important;
display: block !important;
}

.bonus-section {
display: flex !important;
align-items: center !important;
justify-content: center !important;
gap: 20px !important;
margin-top: 28px !important;
padding: 0 20px !important;
}

.bonus-image {
width: 162px !important;
height: 162px !important;
background-image: url('https://cdn.shopify.com/s/files/1/0682/3202/0061/files/The_New_Way_-_Sales_Page.png?v=1758114605') !important;
background-size: contain !important;
background-repeat: no-repeat !important;
background-position: center !important;
flex-shrink: 0 !important;
display: block !important;
}

.bonus-text {
font-size: 21.75px !important;
font-weight: 700 !important;
color: #ff0017 !important;
text-align: right !important;
line-height: 1.3 !important;
margin-right: -3px !important;
max-width: 180px !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
}

.divider {
width: 2px !important;
height: 100px !important;
background: linear-gradient(to bottom, transparent, #ff0017, transparent) !important;
display: block !important;
}

@media (max-width: 768px) {
.landing-section {
padding: 3px 3px 20px 3px !important;
}

.main-headline {
font-size: 31.46px !important;
}

.price-text {
font-size: 28.9px !important;
}

.original-price {
font-size: 22px !important;
}

.sub-headline {
font-size: 17px !important;
}

.cta-button {
min-width: 340px !important;
font-size: 16px !important;
padding: 16px 30px !important;
}

.cta-button span {
font-size: 16px !important;
}

.secure-payment {
font-size: 14.2px !important;
}

.secure-payment-icon {
width: 26.05px !important;
height: 26.05px !important;
}
}

@media (max-width: 480px) {
.landing-section {
padding: 2px 2px 20px 2px !important;
}

.main-headline {
font-size: 26.45px !important;
}

.sub-headline {
font-size: 17px !important;
}

.cta-button {
min-width: 340px !important;
font-size: 19px !important;
padding: 16px 30px !important;
}

.cta-button span {
font-size: 19px !important;
}
}


@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800;900&display=swap');
.profit-engines-mega-section {
position: relative !important;
left: 50% !important;
right: 50% !important;
margin-left: -50vw !important;
margin-right: -50vw !important;
width: 100vw !important;
min-width: 100vw !important;
padding: 60px 0 !important;
background: #ffffff !important;
font-family: 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
line-height: 1.6 !important;
overflow-x: hidden !important;
box-sizing: border-box !important;
}
.profit-engines-mega-section * {
box-sizing: border-box !important;
}
.profit-engines-mega-section::before,
.profit-engines-mega-section::after {
content: '' !important;
position: absolute !important;
top: 0 !important;
bottom: 0 !important;
width: 100vw !important;
background: #ffffff !important;
z-index: -2 !important;
}
.profit-engines-mega-section::before {
left: -100vw !important;
}
.profit-engines-mega-section::after {
right: -100vw !important;
}
.content-wrapper {
max-width: 800px !important;
margin: 0 auto !important;
padding: 0 20px !important;
text-align: center !important;
}
.section-title {
font-size: 42px !important;
font-weight: 800 !important;
color: #000000 !important;
margin: 0 0 25px 0 !important;
line-height: 1.2 !important;
font-family: 'Open Sans', sans-serif !important;
}
.section-title .highlight-red {
color: #ff0017 !important;
}
.problem-text {
font-size: 20px !important;
color: #333333 !important;
margin: 0 0 18px 0 !important;
line-height: 1.7 !important;
font-weight: 400 !important;
font-family: 'Open Sans', sans-serif !important;
}
.problem-text strong {
font-weight: 700 !important;
color: #ff0017 !important;
}
.emphasized-text {
font-size: 24px !important;
font-weight: 700 !important;
color: #000000 !important;
margin: 40px 0 25px 0 !important;
line-height: 1.4 !important;
font-family: 'Open Sans', sans-serif !important;
}
.emphasized-text .highlight-red {
color: #ff0017 !important;
}

.emphasized-text-large {
font-size: 25.68px !important;
font-weight: 700 !important;
color: #000000 !important;
margin: 40px 0 25px 0 !important;
line-height: 1.4 !important;
font-family: 'Open Sans', sans-serif !important;
}
.emphasized-text-large .highlight-red {
color: #ff0017 !important;
}

.spacer-large {
height: 60px !important;
display: block !important;
}

@media (max-width: 768px) {
.profit-engines-mega-section {
padding: 40px 0 !important;
}
.section-title {
font-size: 32px !important;
}
.problem-text {
font-size: 18px !important;
}
.emphasized-text {
font-size: 20px !important;
}
.emphasized-text-large {
font-size: 23px !important;
}
.spacer-large {
height: 80px !important;
}
}


@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800;900&display=swap');
.profit-engines-mega-section {
position: relative !important;
left: 50% !important;
right: 50% !important;
margin-left: -50vw !important;
margin-right: -50vw !important;
width: 100vw !important;
min-width: 100vw !important;
padding: 60px 0 !important;
background: #ffffff !important;
font-family: 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
line-height: 1.6 !important;
overflow-x: hidden !important;
box-sizing: border-box !important;
}
.profit-engines-mega-section * {
box-sizing: border-box !important;
}
.profit-engines-mega-section::before,
.profit-engines-mega-section::after {
content: '' !important;
position: absolute !important;
top: 0 !important;
bottom: 0 !important;
width: 100vw !important;
background: #ffffff !important;
z-index: -2 !important;
}
.profit-engines-mega-section::before {
left: -100vw !important;
}
.profit-engines-mega-section::after {
right: -100vw !important;
}
.content-wrapper {
max-width: 800px !important;
margin: 0 auto !important;
padding: 0 20px !important;
text-align: center !important;
}
.section-title {
font-size: 42px !important;
font-weight: 800 !important;
color: #000000 !important;
margin: 0 0 25px 0 !important;
line-height: 1.2 !important;
font-family: 'Open Sans', sans-serif !important;
}
.section-title .highlight-red {
color: #ff0017 !important;
}
.problem-text {
font-size: 20px !important;
color: #333333 !important;
margin: 0 0 18px 0 !important;
line-height: 1.7 !important;
font-weight: 400 !important;
font-family: 'Open Sans', sans-serif !important;
}
.problem-text strong {
font-weight: 700 !important;
color: #ff0017 !important;
}
.emphasized-text {
font-size: 24px !important;
font-weight: 700 !important;
color: #000000 !important;
margin: 40px 0 25px 0 !important;
line-height: 1.4 !important;
font-family: 'Open Sans', sans-serif !important;
}
.emphasized-text .highlight-red {
color: #ff0017 !important;
}

.emphasized-text-large {
font-size: 25.68px !important;
font-weight: 700 !important;
color: #000000 !important;
margin: 40px 0 25px 0 !important;
line-height: 1.4 !important;
font-family: 'Open Sans', sans-serif !important;
}
.emphasized-text-large .highlight-red {
color: #ff0017 !important;
}

.spacer-large {
height: 60px !important;
display: block !important;
}

@media (max-width: 768px) {
.profit-engines-mega-section {
padding: 40px 0 !important;
}
.section-title {
font-size: 32px !important;
}
.problem-text {
font-size: 18px !important;
}
.emphasized-text {
font-size: 20px !important;
}
.emphasized-text-large {
font-size: 23px !important;
}
.spacer-large {
height: 80px !important;
}
}


@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800;900&display=swap');

.solution-section-wrapper-isolated {
all: initial !important;
position: relative !important;
left: 50% !important;
right: 50% !important;
margin-left: -50vw !important;
margin-right: -50vw !important;
width: 100vw !important;
min-width: 100vw !important;
max-width: 100vw !important;
font-family: 'Open Sans', sans-serif !important;
background-color: #ffffff !important;
color: #000000 !important;
display: block !important;
padding: 70px 20px !important;
box-sizing: border-box !important;
line-height: 1.6 !important;
overflow-x: hidden !important;
font-size: 16px !important;
font-weight: 400 !important;
text-align: left !important;
border: none !important;
outline: none !important;
box-shadow: none !important;
}

.solution-section-wrapper-isolated::before,
.solution-section-wrapper-isolated::after {
content: '' !important;
position: absolute !important;
top: 0 !important;
bottom: 0 !important;
width: 100vw !important;
background: #ffffff !important;
z-index: -1 !important;
}

.solution-section-wrapper-isolated::before {
left: -100vw !important;
}

.solution-section-wrapper-isolated::after {
right: -100vw !important;
}

.solution-section-wrapper-isolated *,
.solution-section-wrapper-isolated *::before,
.solution-section-wrapper-isolated *::after {
all: unset !important;
box-sizing: border-box !important;
}

.solution-section-wrapper-isolated .content-wrapper-isolated {
max-width: 900px !important;
margin: 0 auto !important;
padding: 0 20px !important;
text-align: center !important;
position: relative !important;
z-index: 1 !important;
display: block !important;
}

.solution-section-wrapper-isolated .pre-headline-isolated {
font-size: 16px !important;
color: #ff0017 !important;
font-weight: 700 !important;
text-transform: uppercase !important;
letter-spacing: 1.5px !important;
margin: 0 0 25px 0 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
}

.solution-section-wrapper-isolated .main-headline-isolated {
font-size: 48px !important;
font-weight: 900 !important;
color: #000000 !important;
margin: 0 0 30px 0 !important;
line-height: 1.2 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
text-align: center !important;
}

.solution-section-wrapper-isolated .main-headline-isolated .highlight-red-isolated {
color: #ff0017 !important;
}

.solution-section-wrapper-isolated .body-text-isolated {
font-size: 20px !important;
color: #333333 !important;
margin: 0 0 25px 0 !important;
line-height: 1.7 !important;
font-weight: 400 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
text-align: center !important;
}

.solution-section-wrapper-isolated .body-text-isolated strong {
font-weight: 700 !important;
color: #000000 !important;
}

.solution-section-wrapper-isolated .quote-box-isolated {
background: linear-gradient(135deg, #fafafa 0%, #f8f8f8 100%) !important;
border: 2px solid #e8e8e8 !important;
border-left: 6px solid #ff0017 !important;
padding: 45px 55px !important;
margin: 60px auto !important;
max-width: 850px !important;
box-shadow: 0 15px 40px rgba(0, 0, 0, 0.06) !important;
text-align: left !important;
display: block !important;
border-radius: 8px !important;
position: relative !important;
}

.solution-section-wrapper-isolated .quote-box-isolated::before {
content: '"' !important;
position: absolute !important;
top: 15px !important;
left: 25px !important;
font-size: 80px !important;
color: rgba(255, 0, 23, 0.1) !important;
font-family: Georgia, serif !important;
line-height: 1 !important;
}

.solution-section-wrapper-isolated .quote-text-isolated {
font-size: 24px !important;
font-style: italic !important;
color: #222222 !important;
line-height: 1.7 !important;
margin: 0 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
position: relative !important;
z-index: 1 !important;
}

.solution-section-wrapper-isolated .quote-text-isolated .highlight-red-isolated {
color: #ff0017 !important;
font-weight: 700 !important;
font-style: normal !important;
}

.solution-section-wrapper-isolated .quote-text-isolated br {
display: block !important;
content: '' !important;
margin: 0.5em 0 !important;
}

.solution-section-wrapper-isolated .results-showcase-isolated {
background: #000000 !important;
border-radius: 12px !important;
padding: 50px 40px !important;
margin: 60px 0 !important;
display: block !important;
}

.solution-section-wrapper-isolated .results-pre-text-isolated {
font-size: 18px !important;
color: #ff0017 !important;
font-weight: 600 !important;
margin: 0 0 20px 0 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
text-align: center !important;
}

.solution-section-wrapper-isolated .results-headline-isolated {
font-size: 36px !important;
font-weight: 900 !important;
color: #ffffff !important;
margin: 0 0 35px 0 !important;
line-height: 1.3 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
text-align: center !important;
}

.solution-section-wrapper-isolated .results-headline-isolated br {
display: block !important;
content: '' !important;
margin: 0.5em 0 !important;
}

.solution-section-wrapper-isolated .results-image-container-isolated {
margin: 30px 0 !important;
display: block !important;
text-align: center !important;
}

.solution-section-wrapper-isolated .results-image-isolated {
max-width: 100% !important;
height: auto !important;
border-radius: 8px !important;
box-shadow: 0 10px 40px rgba(255, 0, 23, 0.4) !important;
display: inline-block !important;
}

.solution-section-wrapper-isolated .results-caption-isolated {
font-size: 16px !important;
color: #cccccc !important;
margin: 20px 0 0 0 !important;
font-style: italic !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
text-align: center !important;
}

.solution-section-wrapper-isolated .results-caption-isolated strong {
color: #ff0017 !important;
font-weight: 700 !important;
}

.solution-section-wrapper-isolated .results-caption-isolated br {
display: block !important;
content: '' !important;
margin: 0.5em 0 !important;
}

.solution-section-wrapper-isolated .method-description-isolated {
text-align: left !important;
max-width: 800px !important;
margin: 50px auto !important;
display: block !important;
}

.solution-section-wrapper-isolated .method-text-isolated {
font-size: 19px !important;
color: #333333 !important;
margin: 0 0 22px 0 !important;
line-height: 1.8 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
}

.solution-section-wrapper-isolated .method-text-isolated strong {
font-weight: 700 !important;
color: #000000 !important;
}

.solution-section-wrapper-isolated .method-text-isolated .highlight-red-isolated {
color: #ff0017 !important;
font-weight: 700 !important;
}

.solution-section-wrapper-isolated .method-text-isolated em {
font-style: italic !important;
}

.solution-section-wrapper-isolated .method-text-isolated br {
display: block !important;
content: '' !important;
margin: 0.5em 0 !important;
}

.solution-section-wrapper-isolated .cta-wrapper-isolated {
margin: 60px 0 40px 0 !important;
display: block !important;
text-align: center !important;
}

.solution-section-wrapper-isolated .cta-button-isolated {
all: unset !important;
display: inline-block !important;
background: radial-gradient(ellipse at bottom, #FA7D7D 0%, #FA1717 40%) !important;
color: #ffffff !important;
border-radius: 35px !important;
font-size: 20px !important;
font-weight: 700 !important;
padding: 22px 50px !important;
cursor: pointer !important;
transition: all 0.3s ease !important;
text-decoration: none !important;
font-family: 'Open Sans', sans-serif !important;
box-shadow: 0 6px 20px rgba(255, 0, 23, 0.4) !important;
text-transform: uppercase !important;
letter-spacing: 1px !important;
position: relative !important;
border: none !important;
overflow: hidden !important;
box-sizing: border-box !important;
text-align: center !important;
}

.solution-section-wrapper-isolated .cta-button-isolated:hover {
transform: translateY(-2px) !important;
box-shadow: 0 8px 25px rgba(255, 0, 23, 0.5) !important;
}

.solution-section-wrapper-isolated .cta-button-isolated.loading {
opacity: 0.8 !important;
pointer-events: none !important;
}

.solution-section-wrapper-isolated .bundle-text-isolated {
font-size: 14px !important;
color: #666666 !important;
margin: 15px 0 0 0 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
}

.solution-section-wrapper-isolated .bundle-text-isolated a {
color: #ff0017 !important;
text-decoration: underline !important;
}

@media (max-width: 768px) {
.solution-section-wrapper-isolated {
padding: 50px 20px !important;
}

.solution-section-wrapper-isolated .main-headline-isolated {
font-size: 34px !important;
}

.solution-section-wrapper-isolated .body-text-isolated {
font-size: 18px !important;
}

.solution-section-wrapper-isolated .quote-box-isolated {
padding: 35px 30px !important;
}

.solution-section-wrapper-isolated .quote-text-isolated {
font-size: 20px !important;
}

.solution-section-wrapper-isolated .results-showcase-isolated {
padding: 35px 25px !important;
}

.solution-section-wrapper-isolated .results-headline-isolated {
font-size: 28px !important;
}

.solution-section-wrapper-isolated .method-text-isolated {
font-size: 17px !important;
}
}


@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800;900&display=swap');

.solution-section-wrapper-isolated {
all: initial !important;
position: relative !important;
left: 50% !important;
right: 50% !important;
margin-left: -50vw !important;
margin-right: -50vw !important;
width: 100vw !important;
min-width: 100vw !important;
max-width: 100vw !important;
font-family: 'Open Sans', sans-serif !important;
background-color: #ffffff !important;
color: #000000 !important;
display: block !important;
padding: 70px 20px !important;
box-sizing: border-box !important;
line-height: 1.6 !important;
overflow-x: hidden !important;
font-size: 16px !important;
font-weight: 400 !important;
text-align: left !important;
border: none !important;
outline: none !important;
box-shadow: none !important;
}

.solution-section-wrapper-isolated::before,
.solution-section-wrapper-isolated::after {
content: '' !important;
position: absolute !important;
top: 0 !important;
bottom: 0 !important;
width: 100vw !important;
background: #ffffff !important;
z-index: -1 !important;
}

.solution-section-wrapper-isolated::before {
left: -100vw !important;
}

.solution-section-wrapper-isolated::after {
right: -100vw !important;
}

.solution-section-wrapper-isolated *,
.solution-section-wrapper-isolated *::before,
.solution-section-wrapper-isolated *::after {
all: unset !important;
box-sizing: border-box !important;
}

.solution-section-wrapper-isolated .content-wrapper-isolated {
max-width: 900px !important;
margin: 0 auto !important;
padding: 0 20px !important;
text-align: center !important;
position: relative !important;
z-index: 1 !important;
display: block !important;
}

.solution-section-wrapper-isolated .pre-headline-isolated {
font-size: 16px !important;
color: #ff0017 !important;
font-weight: 700 !important;
text-transform: uppercase !important;
letter-spacing: 1.5px !important;
margin: 0 0 25px 0 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
}

.solution-section-wrapper-isolated .main-headline-isolated {
font-size: 48px !important;
font-weight: 900 !important;
color: #000000 !important;
margin: 0 0 30px 0 !important;
line-height: 1.2 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
text-align: center !important;
}

.solution-section-wrapper-isolated .main-headline-isolated .highlight-red-isolated {
color: #ff0017 !important;
}

.solution-section-wrapper-isolated .body-text-isolated {
font-size: 20px !important;
color: #333333 !important;
margin: 0 0 25px 0 !important;
line-height: 1.7 !important;
font-weight: 400 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
text-align: center !important;
}

.solution-section-wrapper-isolated .body-text-isolated strong {
font-weight: 700 !important;
color: #000000 !important;
}

.solution-section-wrapper-isolated .quote-box-isolated {
background: linear-gradient(135deg, #fafafa 0%, #f8f8f8 100%) !important;
border: 2px solid #e8e8e8 !important;
border-left: 6px solid #ff0017 !important;
padding: 45px 55px !important;
margin: 60px auto !important;
max-width: 850px !important;
box-shadow: 0 15px 40px rgba(0, 0, 0, 0.06) !important;
text-align: left !important;
display: block !important;
border-radius: 8px !important;
position: relative !important;
}

.solution-section-wrapper-isolated .quote-box-isolated::before {
content: '"' !important;
position: absolute !important;
top: 15px !important;
left: 25px !important;
font-size: 80px !important;
color: rgba(255, 0, 23, 0.1) !important;
font-family: Georgia, serif !important;
line-height: 1 !important;
}

.solution-section-wrapper-isolated .quote-text-isolated {
font-size: 24px !important;
font-style: italic !important;
color: #222222 !important;
line-height: 1.7 !important;
margin: 0 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
position: relative !important;
z-index: 1 !important;
}

.solution-section-wrapper-isolated .quote-text-isolated .highlight-red-isolated {
color: #ff0017 !important;
font-weight: 700 !important;
font-style: normal !important;
}

.solution-section-wrapper-isolated .quote-text-isolated br {
display: block !important;
content: '' !important;
margin: 0.5em 0 !important;
}

.solution-section-wrapper-isolated .results-showcase-isolated {
background: #000000 !important;
border-radius: 12px !important;
padding: 50px 40px !important;
margin: 60px 0 !important;
display: block !important;
}

.solution-section-wrapper-isolated .results-pre-text-isolated {
font-size: 18px !important;
color: #ff0017 !important;
font-weight: 600 !important;
margin: 0 0 20px 0 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
text-align: center !important;
}

.solution-section-wrapper-isolated .results-headline-isolated {
font-size: 36px !important;
font-weight: 900 !important;
color: #ffffff !important;
margin: 0 0 35px 0 !important;
line-height: 1.3 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
text-align: center !important;
}

.solution-section-wrapper-isolated .results-headline-isolated br {
display: block !important;
content: '' !important;
margin: 0.5em 0 !important;
}

.solution-section-wrapper-isolated .results-image-container-isolated {
margin: 30px 0 !important;
display: block !important;
text-align: center !important;
}

.solution-section-wrapper-isolated .results-image-isolated {
max-width: 100% !important;
height: auto !important;
border-radius: 8px !important;
box-shadow: 0 10px 40px rgba(255, 0, 23, 0.4) !important;
display: inline-block !important;
}

.solution-section-wrapper-isolated .results-caption-isolated {
font-size: 16px !important;
color: #cccccc !important;
margin: 20px 0 0 0 !important;
font-style: italic !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
text-align: center !important;
}

.solution-section-wrapper-isolated .results-caption-isolated strong {
color: #ff0017 !important;
font-weight: 700 !important;
}

.solution-section-wrapper-isolated .results-caption-isolated br {
display: block !important;
content: '' !important;
margin: 0.5em 0 !important;
}

.solution-section-wrapper-isolated .method-description-isolated {
text-align: left !important;
max-width: 800px !important;
margin: 50px auto !important;
display: block !important;
}

.solution-section-wrapper-isolated .method-text-isolated {
font-size: 19px !important;
color: #333333 !important;
margin: 0 0 22px 0 !important;
line-height: 1.8 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
}

.solution-section-wrapper-isolated .method-text-isolated strong {
font-weight: 700 !important;
color: #000000 !important;
}

.solution-section-wrapper-isolated .method-text-isolated .highlight-red-isolated {
color: #ff0017 !important;
font-weight: 700 !important;
}

.solution-section-wrapper-isolated .method-text-isolated em {
font-style: italic !important;
}

.solution-section-wrapper-isolated .method-text-isolated br {
display: block !important;
content: '' !important;
margin: 0.5em 0 !important;
}

.solution-section-wrapper-isolated .cta-wrapper-isolated {
margin: 60px 0 40px 0 !important;
display: block !important;
text-align: center !important;
}

.solution-section-wrapper-isolated .cta-button-isolated {
all: unset !important;
display: inline-block !important;
background: radial-gradient(ellipse at bottom, #FA7D7D 0%, #FA1717 40%) !important;
color: #ffffff !important;
border-radius: 35px !important;
font-size: 20px !important;
font-weight: 700 !important;
padding: 22px 50px !important;
cursor: pointer !important;
transition: all 0.3s ease !important;
text-decoration: none !important;
font-family: 'Open Sans', sans-serif !important;
box-shadow: 0 6px 20px rgba(255, 0, 23, 0.4) !important;
text-transform: uppercase !important;
letter-spacing: 1px !important;
position: relative !important;
border: none !important;
overflow: hidden !important;
box-sizing: border-box !important;
text-align: center !important;
}

.solution-section-wrapper-isolated .cta-button-isolated:hover {
transform: translateY(-2px) !important;
box-shadow: 0 8px 25px rgba(255, 0, 23, 0.5) !important;
}

.solution-section-wrapper-isolated .cta-button-isolated.loading {
opacity: 0.8 !important;
pointer-events: none !important;
}

.solution-section-wrapper-isolated .bundle-text-isolated {
font-size: 14px !important;
color: #666666 !important;
margin: 15px 0 0 0 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
}

.solution-section-wrapper-isolated .bundle-text-isolated a {
color: #ff0017 !important;
text-decoration: underline !important;
}

@media (max-width: 768px) {
.solution-section-wrapper-isolated {
padding: 50px 20px !important;
}

.solution-section-wrapper-isolated .main-headline-isolated {
font-size: 34px !important;
}

.solution-section-wrapper-isolated .body-text-isolated {
font-size: 18px !important;
}

.solution-section-wrapper-isolated .quote-box-isolated {
padding: 35px 30px !important;
}

.solution-section-wrapper-isolated .quote-text-isolated {
font-size: 20px !important;
}

.solution-section-wrapper-isolated .results-showcase-isolated {
padding: 35px 25px !important;
}

.solution-section-wrapper-isolated .results-headline-isolated {
font-size: 28px !important;
}

.solution-section-wrapper-isolated .method-text-isolated {
font-size: 17px !important;
}
}


.faq-section {
all: initial !important;
display: block !important;
position: relative !important;
left: 50% !important;
right: 50% !important;
margin-left: -50vw !important;
margin-right: -50vw !important;
width: 100vw !important;
min-width: 100vw !important;
background: #ffffff !important;
padding: 60px 0 !important;
box-sizing: border-box !important;
font-family: Arial, sans-serif !important;
isolation: isolate !important;
overflow-x: hidden !important;
}

.faq-section::before,
.faq-section::after {
content: '' !important;
position: absolute !important;
top: 0 !important;
bottom: 0 !important;
width: 100vw !important;
background: #ffffff !important;
z-index: -1 !important;
display: block !important;
}

.faq-section::before {
left: -100vw !important;
}

.faq-section::after {
right: -100vw !important;
}

.faq-section *,
.faq-section *::before,
.faq-section *::after {
all: unset !important;
display: revert !important;
box-sizing: border-box !important;
}

.faq-section h1 {
font-family: 'Open Sans', sans-serif !important;
font-weight: 800 !important;
font-size: 2.5rem !important;
text-align: center !important;
margin: 0 0 40px 0 !important;
padding: 0 !important;
color: black !important;
display: block !important;
}

.faq-container {
max-width: 900px !important;
margin: 0 auto !important;
padding: 0 20px !important;
display: block !important;
}

.faq-section .faq-item {
margin-bottom: 15px !important;
display: block !important;
}

.faq-section .question {
background-color: black !important;
border-radius: 12px !important;
padding: 25px !important;
color: white !important;
font-weight: bold !important;
font-size: 18px !important;
cursor: pointer !important;
transition: opacity 0.3s ease !important;
user-select: none !important;
margin: 0 !important;
box-sizing: border-box !important;
display: flex !important;
justify-content: space-between !important;
align-items: center !important;
font-family: 'Open Sans', sans-serif !important;
}

.faq-section .question:hover {
opacity: 0.9 !important;
}

.faq-section .question .arrow {
font-size: 14px !important;
transition: transform 0.3s ease !important;
margin-left: 15px !important;
flex-shrink: 0 !important;
display: inline-block !important;
}

.faq-section .question.active .arrow {
transform: rotate(180deg) !important;
}

.faq-section .answer {
background-color: white !important;
border: 1px solid black !important;
border-radius: 8px !important;
padding: 20px !important;
margin-top: 10px !important;
font-size: 16px !important;
line-height: 1.7 !important;
color: black !important;
display: none !important;
box-sizing: border-box !important;
font-family: Arial, sans-serif !important;
}

.faq-section .answer.active {
display: block !important;
}

.faq-section .answer strong {
color: black !important;
font-weight: 700 !important;
}

@media (max-width: 768px) {
.faq-section .question {
font-size: 17px !important;
padding: 24px !important;
}

.faq-section h1 {
font-size: 2rem !important;
}
}


@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800;900&display=swap');

.section-9-wrapper-isolated {
all: initial !important;
position: relative !important;
left: 50% !important;
right: 50% !important;
margin-left: -50vw !important;
margin-right: -50vw !important;
margin-top: 0 !important;
margin-bottom: 0 !important;
width: 100vw !important;
min-width: 100vw !important;
max-width: 100vw !important;
font-family: 'Open Sans', sans-serif !important;
background-color: #000000 !important;
color: #ffffff !important;
display: block !important;
padding: 80px 0 80px 0 !important;
box-sizing: border-box !important;
line-height: 1.6 !important;
overflow-x: hidden !important;
font-size: 16px !important;
font-weight: 400 !important;
text-align: left !important;
border: none !important;
outline: none !important;
box-shadow: none !important;
}

.section-9-wrapper-isolated::before,
.section-9-wrapper-isolated::after {
content: '' !important;
position: absolute !important;
top: 0 !important;
bottom: 0 !important;
width: 100vw !important;
background: #000000 !important;
z-index: -1 !important;
}

.section-9-wrapper-isolated::before {
left: -100vw !important;
}

.section-9-wrapper-isolated::after {
right: -100vw !important;
}

.section-9-wrapper-isolated .content-wrapper-isolated {
all: initial !important;
max-width: 800px !important;
margin: 0 auto !important;
padding: 0 20px !important;
text-align: center !important;
position: relative !important;
z-index: 1 !important;
display: block !important;
box-sizing: border-box !important;
font-family: 'Open Sans', sans-serif !important;
}

.section-9-wrapper-isolated .final-message-isolated {
all: initial !important;
margin: 0 0 50px 0 !important;
display: block !important;
font-family: 'Open Sans', sans-serif !important;
}

.section-9-wrapper-isolated .final-text-isolated {
all: initial !important;
font-size: 18.9px !important;
color: #e8e8e8 !important;
line-height: 1.7 !important;
margin: 0 0 25px 0 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
text-align: center !important;
}

.section-9-wrapper-isolated .final-text-isolated strong {
all: initial !important;
font-weight: 700 !important;
color: #ffffff !important;
font-family: 'Open Sans', sans-serif !important;
}

.section-9-wrapper-isolated .final-headline-isolated {
all: initial !important;
font-size: 52px !important;
font-weight: 900 !important;
color: #ffffff !important;
margin: 40px 0 30px 0 !important;
line-height: 1.2 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
text-align: center !important;
}

.section-9-wrapper-isolated .final-headline-isolated .highlight-red-isolated {
all: initial !important;
color: #ff0017 !important;
font-family: 'Open Sans', sans-serif !important;
font-size: inherit !important;
font-weight: inherit !important;
}

.section-9-wrapper-isolated .final-subtext-isolated {
all: initial !important;
font-size: 22px !important;
color: #cccccc !important;
line-height: 1.6 !important;
margin: 0 0 50px 0 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
text-align: center !important;
}

.section-9-wrapper-isolated .final-subtext-isolated .highlight-red-isolated {
all: initial !important;
color: #ff0017 !important;
font-weight: 700 !important;
font-family: 'Open Sans', sans-serif !important;
font-size: inherit !important;
}

.section-9-wrapper-isolated .final-subtext-isolated br {
display: block !important;
content: '' !important;
margin: 0.5em 0 !important;
}

.section-9-wrapper-isolated .pricing-box-isolated {
all: initial !important;
background: rgba(255, 255, 255, 0.05) !important;
border: 2px solid #ff0017 !important;
border-radius: 12px !important;
padding: 40px !important;
margin: 0 0 40px 0 !important;
display: block !important;
font-family: 'Open Sans', sans-serif !important;
box-sizing: border-box !important;
}

.section-9-wrapper-isolated .original-price-isolated {
all: initial !important;
font-size: 32px !important;
color: #999999 !important;
text-decoration: line-through !important;
margin: 0 0 10px 0 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
text-align: center !important;
}

.section-9-wrapper-isolated .current-price-isolated {
all: initial !important;
font-size: 56px !important;
font-weight: 900 !important;
color: #ff0017 !important;
margin: 0 0 15px 0 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
text-align: center !important;
}

.section-9-wrapper-isolated .price-subtext-isolated {
all: initial !important;
font-size: 17px !important;
color: #cccccc !important;
margin: 0 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
text-align: center !important;
}

.section-9-wrapper-isolated .cta-button-isolated {
all: unset !important;
display: block !important;
background: radial-gradient(ellipse at bottom, #ff4444 0%, #ff0017 40%) !important;
color: #ffffff !important;
border-radius: 35px !important;
font-size: 24px !important;
font-weight: 700 !important;
padding: 26px 70px !important;
cursor: pointer !important;
transition: all 0.3s ease !important;
text-decoration: none !important;
font-family: 'Open Sans', sans-serif !important;
box-shadow: 0 8px 25px rgba(255, 0, 23, 0.5) !important;
margin: 0 auto 20px auto !important;
text-transform: uppercase !important;
letter-spacing: 1px !important;
max-width: fit-content !important;
text-align: center !important;
box-sizing: border-box !important;
position: relative !important;
border: none !important;
overflow: hidden !important;
}

.section-9-wrapper-isolated .cta-button-isolated:hover {
transform: translateY(-3px) !important;
box-shadow: 0 12px 35px rgba(255, 0, 23, 0.6) !important;
}

.section-9-wrapper-isolated .cta-button-isolated.loading {
opacity: 0.8 !important;
pointer-events: none !important;
}

.section-9-wrapper-isolated .bundle-text-isolated {
all: initial !important;
font-size: 14px !important;
color: #cccccc !important;
margin: 15px 0 0 0 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
text-align: center !important;
}

.section-9-wrapper-isolated .bundle-text-isolated a {
all: initial !important;
color: #ff0017 !important;
text-decoration: underline !important;
font-family: 'Open Sans', sans-serif !important;
cursor: pointer !important;
font-size: inherit !important;
}

.section-9-wrapper-isolated .guarantee-box-isolated {
all: initial !important;
margin: 40px 0 0 0 !important;
padding: 30px !important;
border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
display: block !important;
background: rgba(255, 255, 255, 0.03) !important;
border-radius: 8px !important;
font-family: 'Open Sans', sans-serif !important;
box-sizing: border-box !important;
}

.section-9-wrapper-isolated .guarantee-text-isolated {
all: initial !important;
font-size: 13.6px !important;
color: #999999 !important;
line-height: 1.6 !important;
margin: 0 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
text-align: center !important;
}

.section-9-wrapper-isolated .guarantee-text-isolated br {
display: block !important;
content: '' !important;
margin: 0.5em 0 !important;
}

.section-9-wrapper-isolated .closing-message-isolated {
all: initial !important;
margin: 50px 0 0 0 !important;
padding-bottom: 0 !important;
display: block !important;
font-family: 'Open Sans', sans-serif !important;
}

.section-9-wrapper-isolated .closing-text-isolated {
all: initial !important;
font-size: 19px !important;
color: #e8e8e8 !important;
line-height: 1.7 !important;
margin: 0 !important;
font-family: 'Open Sans', sans-serif !important;
font-style: italic !important;
display: block !important;
text-align: center !important;
}

.section-9-wrapper-isolated .closing-text-isolated .highlight-red-isolated {
all: initial !important;
color: #ff0017 !important;
font-weight: 700 !important;
font-style: normal !important;
font-family: 'Open Sans', sans-serif !important;
font-size: inherit !important;
}

.section-9-wrapper-isolated .closing-text-isolated br {
display: block !important;
content: '' !important;
margin: 0.5em 0 !important;
}

@media (max-width: 768px) {
.section-9-wrapper-isolated {
padding: 60px 20px !important;
}

.section-9-wrapper-isolated .final-headline-isolated {
font-size: 36px !important;
}

.section-9-wrapper-isolated .final-text-isolated {
font-size: 16.2px !important;
}

.section-9-wrapper-isolated .final-subtext-isolated {
font-size: 19px !important;
}

.section-9-wrapper-isolated .pricing-box-isolated {
padding: 30px 25px !important;
}

.section-9-wrapper-isolated .original-price-isolated {
font-size: 26px !important;
}

.section-9-wrapper-isolated .current-price-isolated {
font-size: 44px !important;
}

.section-9-wrapper-isolated .cta-button-isolated {
font-size: 20px !important;
padding: 22px 45px !important;
}

.section-9-wrapper-isolated .closing-text-isolated {
font-size: 17px !important;
}

.section-9-wrapper-isolated .guarantee-text-isolated {
font-size: 12.24px !important;
}
}

</style>

<div class="landing-section">
<div class="content-container">
<div class="intro-text">
<div class="pulse-dot"></div>
<span>While everyone's chasing the algorithm...</span>
</div>

<h1 class="main-headline">
Target Like a <span class="highlight">Laser</span> and Reach Only The 0.001% Ready to Buy
</h1>

<p class="sub-headline">
(Inject steroids into Meta's AI and reach only people who match your product 100%)
</p>

<div class="screenshot-container">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-03-26T183609.222.png?v=1743008742" alt="14.84 ROAS Results" class="screenshot">
</div>

<div class="pricing-section">
<p class="price-text">
<span class="original-price">$197</span> <span class="current-price">Only $39 Today</span>
</p>

<button class="cta-button" id="laser-add-to-cart-btn" data-variant-id="43187825901661">
<span>YES! I Want Laser Targeting</span>
</button>

<div class="bundle-wrapper">
<span>$25.35 If <a href="https://quantum-scale.co/pages/bundle-builder" class="bundle-link">building a bundle</a></span>
</div>

<div class="secure-payment">
<div class="secure-payment-icon"></div>
<span>Secure 256-bit SSL encrypted payment</span>
</div>
</div>
</div>
</div>




<div class="profit-engines-mega-section">
<div class="content-wrapper">
<h2 class="section-title">
While Everyone's Playing <span class="highlight-red">Russian Roulette</span> With Their Ad Budget...
</h2>
<p class="problem-text">
Cold audiences...
</p>
<p class="problem-text">
Warm audiences...
</p>
<p class="problem-text">
Interest-based targeting...
</p>
<p class="problem-text">
Lookalikes...
</p>
<p class="problem-text" style="margin-top: 35px;">
All of them acting like it's the Wild West,<br>
relying on Zuckerberg and praying the algorithm will bless them...
</p>
<p class="emphasized-text" style="margin-top: 50px;">
You're burning <strong>$50, $100, $500 a day</strong> on Meta ads.
</p>
<p class="problem-text">
That's 5,000 to 50,000 impressions daily.
</p>
<p class="problem-text">
Enough audience to turn you into a millionaire if everyone bought.
</p>
<p class="emphasized-text-large" style="margin-top: 40px;">
But <span class="highlight-red">99.7%</span> of your audience isn't relevant.
</p>
<p class="problem-text" style="margin-top: 25px;">
Only 1 in 3,000 to 7,000 people will actually buy.
</p>

<div class="spacer-large"></div>

<p class="emphasized-text">
The problem isn't your product.<br>
The problem isn't your creative.<br>
The problem is <span class="highlight-red">who's seeing it.</span>
</p>
</div>
</div>


<div class="profit-engines-mega-section">
<div class="content-wrapper">
<h2 class="section-title">
While Everyone's Playing <span class="highlight-red">Russian Roulette</span> With Their Ad Budget...
</h2>
<p class="problem-text">
Cold audiences...
</p>
<p class="problem-text">
Warm audiences...
</p>
<p class="problem-text">
Interest-based targeting...
</p>
<p class="problem-text">
Lookalikes...
</p>
<p class="problem-text" style="margin-top: 35px;">
All of them acting like it's the Wild West,<br>
relying on Zuckerberg and praying the algorithm will bless them...
</p>
<p class="emphasized-text" style="margin-top: 50px;">
You're burning <strong>$50, $100, $500 a day</strong> on Meta ads.
</p>
<p class="problem-text">
That's 5,000 to 50,000 impressions daily.
</p>
<p class="problem-text">
Enough audience to turn you into a millionaire if everyone bought.
</p>
<p class="emphasized-text-large" style="margin-top: 40px;">
But <span class="highlight-red">99.7%</span> of your audience isn't relevant.
</p>
<p class="problem-text" style="margin-top: 25px;">
Only 1 in 3,000 to 7,000 people will actually buy.
</p>

<div class="spacer-large"></div>

<p class="emphasized-text">
The problem isn't your product.<br>
The problem isn't your creative.<br>
The problem is <span class="highlight-red">who's seeing it.</span>
</p>
</div>
</div>


<div class="solution-section-wrapper-isolated">
<div class="content-wrapper-isolated">
<p class="pre-headline-isolated">The Breakthrough Method</p>

<h2 class="main-headline-isolated">
Train Meta's AI To Work Like a <span class="highlight-red-isolated">Bloodhound</span>
</h2>

<p class="body-text-isolated">
Hunting down <strong>only</strong> the people who match your product 100%.
</p>

<div class="quote-box-isolated">
<p class="quote-text-isolated">
"In marketing, all you need to do is match <span class="highlight-red-isolated">the right product to the right person.</span>
<br><br>
You're either chasing a product that fits everyone - or you're finding the people that match your product.
<br><br>
The first option leaves you broke.<br>
<span class="highlight-red-isolated">The second one makes you rich.</span>"
</p>
</div>

<div class="results-showcase-isolated">
<p class="results-pre-text-isolated">AND HERE'S THE RESULT...</p>

<h3 class="results-headline-isolated">
14.84 ROAS Over 5 Months<br>
With 23+ Million Impressions
</h3>

<div class="results-image-container-isolated">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-03-26T183609.222.png?v=1743008742" alt="14.84 ROAS Results" class="results-image-isolated">
</div>

<p class="results-caption-isolated">
<strong>Real results.</strong> Not cold traffic gambling. Not algorithm prayers.<br>
Surgical precision targeting that prints money.
</p>
</div>

<div class="method-description-isolated">
<p class="method-text-isolated">
<strong>Pay attention...</strong>
</p>

<p class="method-text-isolated">
You're about to discover methods that <span class="highlight-red-isolated">sharpen Meta's AI</span>, inject steroids into the algorithm...
</p>

<p class="method-text-isolated">
So it works <em>for you</em>...
</p>

<p class="method-text-isolated">
And finds the <strong>right person</strong>, for the <strong>right product</strong>...
</p>

<p class="method-text-isolated">
At the <span class="highlight-red-isolated">exact moment</span> they're ready to buy.
</p>

<p class="method-text-isolated" style="margin-top: 35px !important;">
For years, we've refined this tactic to leave others behind.
</p>

<p class="method-text-isolated">
We've reached a point where <strong>we only target the right people</strong> - and only them.
</p>

<p class="method-text-isolated">
No more wasted impressions. No more hoping.<br>
Just <span class="highlight-red-isolated">laser-focused precision.</span>
</p>
</div>

<div class="cta-wrapper-isolated">
<button class="cta-button-isolated" id="laser-section5-btn" data-variant-id="43187825901661">
Get Laser Targeting Now - $39
</button>
<p class="bundle-text-isolated">
$25.35 If <a href="https://quantum-scale.co/pages/bundle-builder">building a bundle</a>
</p>
</div>
</div>
</div>




<div class="solution-section-wrapper-isolated">
<div class="content-wrapper-isolated">
<p class="pre-headline-isolated">The Breakthrough Method</p>

<h2 class="main-headline-isolated">
Train Meta's AI To Work Like a <span class="highlight-red-isolated">Bloodhound</span>
</h2>

<p class="body-text-isolated">
Hunting down <strong>only</strong> the people who match your product 100%.
</p>

<div class="quote-box-isolated">
<p class="quote-text-isolated">
"In marketing, all you need to do is match <span class="highlight-red-isolated">the right product to the right person.</span>
<br><br>
You're either chasing a product that fits everyone - or you're finding the people that match your product.
<br><br>
The first option leaves you broke.<br>
<span class="highlight-red-isolated">The second one makes you rich.</span>"
</p>
</div>

<div class="results-showcase-isolated">
<p class="results-pre-text-isolated">AND HERE'S THE RESULT...</p>

<h3 class="results-headline-isolated">
14.84 ROAS Over 5 Months<br>
With 23+ Million Impressions
</h3>

<div class="results-image-container-isolated">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-03-26T183609.222.png?v=1743008742" alt="14.84 ROAS Results" class="results-image-isolated">
</div>

<p class="results-caption-isolated">
<strong>Real results.</strong> Not cold traffic gambling. Not algorithm prayers.<br>
Surgical precision targeting that prints money.
</p>
</div>

<div class="method-description-isolated">
<p class="method-text-isolated">
<strong>Pay attention...</strong>
</p>

<p class="method-text-isolated">
You're about to discover methods that <span class="highlight-red-isolated">sharpen Meta's AI</span>, inject steroids into the algorithm...
</p>

<p class="method-text-isolated">
So it works <em>for you</em>...
</p>

<p class="method-text-isolated">
And finds the <strong>right person</strong>, for the <strong>right product</strong>...
</p>

<p class="method-text-isolated">
At the <span class="highlight-red-isolated">exact moment</span> they're ready to buy.
</p>

<p class="method-text-isolated" style="margin-top: 35px !important;">
For years, we've refined this tactic to leave others behind.
</p>

<p class="method-text-isolated">
We've reached a point where <strong>we only target the right people</strong> - and only them.
</p>

<p class="method-text-isolated">
No more wasted impressions. No more hoping.<br>
Just <span class="highlight-red-isolated">laser-focused precision.</span>
</p>
</div>

<div class="cta-wrapper-isolated">
<button class="cta-button-isolated" id="laser-section5-btn" data-variant-id="43187825901661">
Get Laser Targeting Now - $39
</button>
<p class="bundle-text-isolated">
$25.35 If <a href="https://quantum-scale.co/pages/bundle-builder">building a bundle</a>
</p>
</div>
</div>
</div>




<div class="faq-section">
<div class="faq-container">
<h1>Common Questions</h1>

<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>"I already know all the targeting secrets..."</span>
<span class="arrow">▼</span>
</div>
<div class="answer"><strong>No, you don't.</strong> What you know is the 3% that everyone teaches - the surface-level tactics. What we're revealing are secret, precise methods that tap into the remaining 97% of Meta's AI capabilities. These are strategies developed from years of testing and millions in ad spend. If you already knew them, you'd already be running 10+ ROAS consistently.</div>
</div>

<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>What if I buy multiple courses - do they overlap?</span>
<span class="arrow">▼</span>
</div>
<div class="answer">Every course is designed to solve a <strong>specific part of the conversion equation.</strong> They complement each other without repeating content, so stacking them creates compounding impact. Laser Targeting focuses exclusively on reaching the right audience with surgical precision - it doesn't overlap with other tactics.</div>
</div>

<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>Will I get lifetime access?</span>
<span class="arrow">▼</span>
</div>
<div class="answer"><strong>Yes.</strong> One-time payment, lifetime access. No subscriptions. No hidden fees. Access it whenever you want, as many times as you want.</div>
</div>

<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>Is this just theory or can I apply it right away?</span>
<span class="arrow">▼</span>
</div>
<div class="answer">This is <strong>100% practical.</strong> You'll get a clear framework + real examples + plug & play templates that you can implement immediately. No fluff, no theory for theory's sake - just actionable strategies that work.</div>
</div>

<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>Do I need a team to apply this?</span>
<span class="arrow">▼</span>
</div>
<div class="answer"><strong>Not at all.</strong> Every tactic was designed for solo operators. You can implement everything with minimal tech skills or outsource it easily if you prefer. No team required.</div>
</div>

<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>What if this doesn't work for my product/niche?</span>
<span class="arrow">▼</span>
</div>
<div class="answer">Here's the thing: <strong>every product has an audience.</strong> There are 8 billion people on this planet. Even if your product is "weird" or "niche," there are thousands who want it. The Laser Targeting method works for any product in any niche because it's about finding YOUR specific buyers - not trying to appeal to everyone.</div>
</div>

<div class="faq-item">
<div class="question" onclick="toggleAnswer(this)">
<span>How long does it take to see results?</span>
<span class="arrow">▼</span>
</div>
<div class="answer">Most people see improvements <strong>within the first week</strong> of implementation. Some see dramatic results within 48-72 hours. It depends on your current setup, but the tactics are designed for fast implementation and quick wins.</div>
</div>
</div>
</div>


<div class="section-9-wrapper-isolated">
<div class="content-wrapper-isolated">
<div class="final-message-isolated">
<p class="final-text-isolated">
So say goodbye to shots in the dark...
</p>

<p class="final-text-isolated">
Say goodbye to praying the algorithm blesses you...
</p>

<p class="final-text-isolated">
Say goodbye to burning money on audiences that will <strong>never buy...</strong>
</p>

<h2 class="final-headline-isolated">
From Now On, You <span class="highlight-red-isolated">Target Like a Laser</span>
</h2>

<p class="final-subtext-isolated">
You're not just throwing stuff out there.<br>
Not guessing the product. Not guessing the audience.<br>
<br>
<span class="highlight-red-isolated">You'll reach only the people who match your product 100%</span><br>
(Based on 52,000 data points from Meta)
</p>
</div>

<div class="pricing-box-isolated">
<div class="original-price-isolated">$197</div>
<div class="current-price-isolated">Only $39</div>
<p class="price-subtext-isolated">One-Time Payment • Lifetime Access • All 5 Weapons Included</p>
</div>

<button class="cta-button-isolated" id="laser-section9-btn" data-variant-id="43187825901661">
Get Laser Targeting Now
</button>

<p class="bundle-text-isolated">
$25.35 If <a href="https://quantum-scale.co/pages/bundle-builder">building a bundle</a>
</p>

<div class="guarantee-box-isolated">
<p class="guarantee-text-isolated">
🔒 Secure Payment • Instant Access • No Subscriptions<br>
Every day you wait is another day of wasted ad spend.<br>
Every campaign you run without this is money left on the table.
</p>
</div>

<div class="closing-message-isolated">
<p class="closing-text-isolated">
<span class="highlight-red-isolated">So if you've decided to join and learn the Laser Targeting Tactic today,</span><br>
we wish you success – you won't regret it.
</p>
</div>
</div>
</div>
  `,

  // ==================== AI PHOTOGRAPHER ====================
  'ai-photographer': `
<style>

body {
margin: 0;
padding: 0;
background: #ffffff;
}

.ai-photographer-hero-section {
all: initial !important;
display: block !important;
position: relative !important;
left: 50% !important;
right: 50% !important;
margin-left: -50vw !important;
margin-right: -50vw !important;
width: 100vw !important;
min-width: 100vw !important;
max-width: 100vw !important;
background: #000000 !important;
padding: 25px 5px 28px 5px !important;
text-align: center !important;
font-family: 'Open Sans', sans-serif !important;
box-sizing: border-box !important;
overflow-x: hidden !important;
overflow-y: visible !important;
isolation: isolate !important;
z-index: 1 !important;
}

.ai-photographer-hero-section::before,
.ai-photographer-hero-section::after {
content: '' !important;
position: absolute !important;
top: 0 !important;
bottom: 0 !important;
width: 100vw !important;
background: #000000 !important;
z-index: -1 !important;
pointer-events: none !important;
}

.ai-photographer-hero-section::before {
left: -100vw !important;
}

.ai-photographer-hero-section::after {
right: -100vw !important;
}

.ai-photographer-hero-section,
.ai-photographer-hero-section * {
box-sizing: border-box !important;
}

.ai-photographer-hero-section * {
all: unset !important;
font-family: 'Open Sans', sans-serif !important;
display: revert !important;
box-sizing: border-box !important;
}

.hero-content-container {
max-width: 1200px !important;
margin: 0 auto !important;
padding: 0 20px !important;
display: block !important;
}

.hero-intro-text {
background: rgba(155, 164, 166, 0.15) !important;
border: 1px solid #9ba4a6 !important;
border-radius: 25px !important;
padding: 12px 20px !important;
display: inline-flex !important;
align-items: center !important;
gap: 10px !important;
font-size: 13px !important;
color: #ffffff !important;
font-weight: 500 !important;
margin: 0 0 32px 0 !important;
font-family: 'Open Sans', sans-serif !important;
}

.hero-pulse-dot {
width: 8px !important;
height: 8px !important;
background: #9ba4a6 !important;
border-radius: 50% !important;
animation: hero-pulse 2s infinite !important;
box-shadow: 0 0 10px #9ba4a6 !important;
display: block !important;
flex-shrink: 0 !important;
}

@keyframes hero-pulse {
0%, 100% {
opacity: 1;
transform: scale(1);
}
50% {
opacity: 0.5;
transform: scale(1.1);
}
}

.hero-main-headline {
font-size: 47px !important;
font-weight: 900 !important;
color: #ffffff !important;
margin: 0 0 25px 0 !important;
line-height: 1.15 !important;
letter-spacing: -0.5px !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
}

.hero-main-headline .hero-highlight {
color: #9ba4a6 !important;
text-shadow: 0 0 30px rgba(155, 164, 166, 0.6) !important;
font-family: inherit !important;
font-weight: inherit !important;
font-size: inherit !important;
display: inline !important;
}

.hero-sub-headline {
font-size: 24px !important;
font-weight: 400 !important;
color: #e8e8e8 !important;
margin: 0 0 40px 0 !important;
font-family: 'Open Sans', sans-serif !important;
line-height: 1.4 !important;
display: block !important;
}

.hero-screenshot-container {
margin: 40px auto !important;
width: 100% !important;
max-width: 540px !important;
display: block !important;
border-radius: 15px !important;
overflow: hidden !important;
box-shadow: 0 20px 60px rgba(155, 164, 166, 0.55) !important;
}

.hero-screenshot-container img {
width: 100% !important;
height: auto !important;
display: block !important;
border-radius: 15px !important;
}

.hero-pricing-section {
margin: 35px 0 0 0 !important;
display: block !important;
}

.hero-price-text {
font-size: 42px !important;
font-weight: 800 !important;
color: #ffffff !important;
margin: 0 0 25px 0 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
}

.hero-original-price {
text-decoration: line-through !important;
color: #888888 !important;
font-size: 32px !important;
margin-right: 15px !important;
display: inline !important;
}

.hero-price-text .hero-current-price {
color: #9ba4a6 !important;
text-shadow: 0 0 20px rgba(155, 164, 166, 0.6) !important;
display: inline !important;
}

.hero-cta-button {
all: unset !important;
display: inline-flex !important;
background: radial-gradient(ellipse at bottom, #c0c8ca 0%, #9ba4a6 40%) !important;
color: white !important;
border-radius: 35px !important;
font-size: 16px !important;
font-weight: 700 !important;
padding: 21px 76px !important;
cursor: pointer !important;
transition: all 0.3s ease !important;
align-items: center !important;
justify-content: center !important;
text-decoration: none !important;
min-width: 550px !important;
font-family: 'Open Sans', sans-serif !important;
box-shadow: 0 10px 30px rgba(155, 164, 166, 0.4) !important;
text-transform: uppercase !important;
letter-spacing: 1px !important;
height: 81px !important;
position: relative !important;
border: none !important;
overflow: hidden !important;
box-sizing: border-box !important;
text-align: center !important;
margin: 0 auto 10px auto !important;
gap: 15px !important;
}

.hero-cta-button:hover {
transform: translateY(-2px) !important;
box-shadow: 0 15px 40px rgba(155, 164, 166, 0.6) !important;
}

.hero-cta-button.loading {
opacity: 0.8 !important;
pointer-events: none !important;
}

.hero-cta-button span {
position: relative !important;
z-index: 999 !important;
font-size: 15.04px !important;
font-weight: 700 !important;
color: white !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
line-height: 1.3 !important;
}

.hero-cta-text {
font-size: 15.04px !important;
}

.hero-small-text {
font-size: 10.07px !important;
display: block !important;
font-weight: 400 !important;
text-transform: none !important;
letter-spacing: 0.5px !important;
margin-top: 3px !important;
}

.hero-lock-icon {
width: 38px !important;
height: 38px !important;
background-image: url('https://cdn.shopify.com/s/files/1/0682/3202/0061/files/The_New_Way_-_Sales_Page.png?v=1758114605') !important;
background-size: contain !important;
background-repeat: no-repeat !important;
background-position: center !important;
flex-shrink: 0 !important;
display: block !important;
}

.hero-bundle-wrapper {
text-align: center !important;
margin: 12px 0 0 0 !important;
display: block !important;
}

.hero-bundle-wrapper span {
color: #e8e8e8 !important;
font-size: 11.9px !important;
font-family: 'Open Sans', sans-serif !important;
display: inline !important;
}

.hero-bundle-link {
color: #9ba4a6 !important;
text-decoration: underline !important;
display: inline !important;
cursor: pointer !important;
}

.hero-secure-payment {
display: flex !important;
align-items: center !important;
justify-content: center !important;
gap: 8px !important;
font-size: 15.44px !important;
color: #e8e8e8 !important;
font-weight: 500 !important;
margin-top: 10px !important;
margin-bottom: 8px !important;
font-family: 'Open Sans', sans-serif !important;
}

.hero-secure-payment span {
display: inline !important;
}

.hero-secure-payment-icon {
width: 28.31px !important;
height: 28.31px !important;
background-image: url('https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Mastercard-Logo.wine.png?v=1758464867') !important;
background-size: contain !important;
background-repeat: no-repeat !important;
background-position: center !important;
display: block !important;
flex-shrink: 0 !important;
}

@media (max-width: 768px) {
.ai-photographer-hero-section {
padding: 3px 3px 20px 3px !important;
}

.hero-main-headline {
font-size: 31.46px !important;
}

.hero-screenshot-container {
max-width: 380px !important;
}

.hero-price-text {
font-size: 28.9px !important;
}

.hero-original-price {
font-size: 22px !important;
}

.hero-cta-button {
font-size: 21px !important;
padding: 18px 35px !important;
min-width: 400px !important;
letter-spacing: 0px !important;
}

.hero-cta-text {
font-size: 14.14px !important;
}

.hero-small-text {
font-size: 12.98px !important;
}

.hero-sub-headline {
font-size: 20px !important;
}

.hero-intro-text {
font-size: 12px !important;
padding: 10px 15px !important;
max-width: 320px !important;
}

.hero-secure-payment {
font-size: 13.24px !important;
}

.hero-secure-payment-icon {
width: 23.59px !important;
height: 23.59px !important;
}
}

@media (max-width: 480px) {
.ai-photographer-hero-section {
padding: 2px 2px 20px 2px !important;
}

.hero-main-headline {
font-size: 26.45px !important;
}

.hero-screenshot-container {
max-width: 300px !important;
}

.hero-sub-headline {
font-size: 17px !important;
}

.hero-cta-button {
min-width: 340px !important;
font-size: 19px !important;
padding: 16px 30px !important;
}

.hero-cta-button > span {
font-size: 14.14px !important;
}

.hero-cta-button > span * {
font-size: 14.14px !important;
}
}


.ai-results-mega-section {
all: initial !important;
display: block !important;
position: relative !important;
left: 50% !important;
right: 50% !important;
margin-left: -50vw !important;
margin-right: -50vw !important;
width: 100vw !important;
min-width: 100vw !important;
max-width: 100vw !important;
padding: 50px 0 !important;
background: #ffffff !important;
font-family: 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
line-height: 1.6 !important;
overflow-x: hidden !important;
overflow-y: visible !important;
box-sizing: border-box !important;
isolation: isolate !important;
z-index: auto !important;
}

.ai-results-mega-section,
.ai-results-mega-section * {
box-sizing: border-box !important;
}

.ai-results-mega-section * {
all: revert !important;
font-family: 'Open Sans', sans-serif !important;
}

.ai-results-mega-section::before,
.ai-results-mega-section::after {
content: '' !important;
position: absolute !important;
top: 0 !important;
bottom: 0 !important;
width: 100vw !important;
background: #ffffff !important;
z-index: -2 !important;
pointer-events: none !important;
}

.ai-results-mega-section::before {
left: -100vw !important;
}

.ai-results-mega-section::after {
right: -100vw !important;
}

.results-container {
max-width: 900px !important;
margin: 0 auto !important;
padding: 0 20px !important;
text-align: center !important;
}

.results-main-headline {
font-family: 'Open Sans', Arial, sans-serif !important;
font-weight: 800 !important;
-webkit-text-stroke: 0.3px black !important;
text-align: center !important;
font-size: calc(1.177em + 3.531px) !important;
margin: 20px auto 30px auto !important;
max-width: 800px !important;
color: #000000 !important;
line-height: 1.3 !important;
display: block !important;
}

.results-paragraph {
margin: 20px auto !important;
max-width: 800px !important;
padding: 0 15px !important;
color: #333333 !important;
font-size: 16px !important;
line-height: 1.65 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
}

.results-slider-section {
margin-bottom: 50px !important;
}

.results-before-after-container {
position: relative !important;
width: 100% !important;
max-width: 600px !important;
margin: 30px auto !important;
border-radius: 10px !important;
box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important;
background: #f0f0f0 !important;
user-select: none !important;
-webkit-user-select: none !important;
-moz-user-select: none !important;
-ms-user-select: none !important;
}

.results-before-after-container img {
width: 100% !important;
height: auto !important;
display: block !important;
border-radius: 10px !important;
pointer-events: none !important;
}

.results-before-image {
position: relative !important;
z-index: 1 !important;
}

.results-after-image {
position: absolute !important;
top: 0 !important;
left: 0 !important;
width: 100% !important;
height: 100% !important;
clip-path: inset(0 50% 0 0) !important;
z-index: 2 !important;
}

.results-slider-handle {
position: absolute !important;
top: 0 !important;
left: 50% !important;
width: 4px !important;
height: 100% !important;
background: #fff !important;
cursor: ew-resize !important;
transform: translateX(-50%) !important;
z-index: 10 !important;
}

.results-slider-handle::before {
content: '' !important;
position: absolute !important;
top: 50% !important;
left: 50% !important;
width: 40px !important;
height: 40px !important;
background: #fff !important;
border: 3px solid #333 !important;
border-radius: 50% !important;
transform: translate(-50%, -50%) !important;
}

.results-slider-handle::after {
content: '↔' !important;
position: absolute !important;
top: 50% !important;
left: 50% !important;
transform: translate(-50%, -50%) !important;
font-size: 18px !important;
font-weight: bold !important;
color: #333 !important;
pointer-events: none !important;
}

.results-before-label, 
.results-after-label {
position: absolute !important;
top: 50% !important;
transform: translateY(-50%) !important;
padding: 2px 6px !important;
background: rgba(255,255,255,0.9) !important;
color: #333 !important;
font-weight: 500 !important;
border-radius: 2px !important;
font-size: 10px !important;
pointer-events: none !important;
border: 1px solid rgba(0,0,0,0.1) !important;
font-family: 'Open Sans', sans-serif !important;
}

.results-before-label {
right: 5px !important;
}

.results-after-label {
left: 5px !important;
}

.extra-spacing {
height: 50px !important;
}

@media (max-width: 768px) {
.ai-results-mega-section {
padding: 30px 0 !important;
}

.results-before-after-container {
margin: 20px auto !important;
}

.results-slider-handle::before {
width: 35px !important;
height: 35px !important;
}

.results-slider-handle::after {
font-size: 16px !important;
}

.results-main-headline {
font-size: calc(0.963em + 3.21px) !important;
}
}

@media (max-width: 480px) {
.results-slider-handle::before {
width: 30px !important;
height: 30px !important;
}

.results-slider-handle::after {
font-size: 14px !important;
}

.results-main-headline {
font-size: calc(0.9095em + 3.21px) !important;
}
}


.comparison-section-wrapper-isolated {
all: initial !important;
display: block !important;
position: relative !important;
left: 50% !important;
right: 50% !important;
margin-left: -50vw !important;
margin-right: -50vw !important;
width: 100vw !important;
min-width: 100vw !important;
max-width: 100vw !important;
padding: 60px 0 !important;
background: #ffffff !important;
font-family: 'Open Sans', system-ui, -apple-system, sans-serif !important;
line-height: 1.6 !important;
overflow-x: hidden !important;
overflow-y: visible !important;
box-sizing: border-box !important;
isolation: isolate !important;
z-index: auto !important;
}

.comparison-section-wrapper-isolated,
.comparison-section-wrapper-isolated * {
box-sizing: border-box !important;
}

.comparison-section-wrapper-isolated * {
all: revert !important;
font-family: 'Open Sans', sans-serif !important;
}

.comparison-section-wrapper-isolated::before,
.comparison-section-wrapper-isolated::after {
content: '' !important;
position: absolute !important;
top: 0 !important;
bottom: 0 !important;
width: 100vw !important;
background: #ffffff !important;
z-index: -2 !important;
pointer-events: none !important;
}

.comparison-section-wrapper-isolated::before {
left: -100vw !important;
}

.comparison-section-wrapper-isolated::after {
right: -100vw !important;
}

.comparison-section-wrapper-isolated table {
display: table !important;
}

.comparison-section-wrapper-isolated thead {
display: table-header-group !important;
}

.comparison-section-wrapper-isolated tbody {
display: table-row-group !important;
}

.comparison-section-wrapper-isolated tr {
display: table-row !important;
}

.comparison-section-wrapper-isolated th,
.comparison-section-wrapper-isolated td {
display: table-cell !important;
}

.comparison-container-isolated {
max-width: 800px !important;
margin: 0 auto !important;
text-align: center !important;
position: relative !important;
z-index: 1 !important;
display: block !important;
padding: 0 20px !important;
}

.comparison-title-isolated {
font-family: 'Open Sans', sans-serif !important;
font-weight: 800 !important;
font-size: 42px !important;
margin: 0 0 15px 0 !important;
color: #000000 !important;
display: block !important;
line-height: 1.2 !important;
text-align: center !important;
}

.comparison-title-isolated .comparison-highlight-isolated {
color: #9ba4a6 !important;
font-family: inherit !important;
font-weight: inherit !important;
font-size: inherit !important;
}

.comparison-subtitle-isolated {
font-size: 18px !important;
margin: 0 0 40px 0 !important;
color: #333333 !important;
font-weight: 400 !important;
display: block !important;
font-family: 'Open Sans', sans-serif !important;
text-align: center !important;
line-height: 1.6 !important;
}

.comparison-options-text-isolated {
font-size: 16px !important;
margin: 0 0 30px 0 !important;
color: #000000 !important;
font-weight: 600 !important;
display: block !important;
font-family: 'Open Sans', sans-serif !important;
text-align: center !important;
line-height: 1.6 !important;
}

.comparison-table-isolated {
border-collapse: collapse !important;
width: 100% !important;
max-width: 100% !important;
margin: 40px auto 0 auto !important;
border: 1px solid #ccc !important;
table-layout: fixed !important;
display: table !important;
font-family: 'Open Sans', sans-serif !important;
}

.comparison-column-header-isolated {
font-size: 22px !important;
font-weight: 800 !important;
text-align: center !important;
padding: 20px !important;
color: #000000 !important;
background-color: #d0d0d0 !important;
border: 1px solid #ccc !important;
width: 50% !important;
display: table-cell !important;
font-family: 'Open Sans', sans-serif !important;
line-height: 1.4 !important;
vertical-align: middle !important;
}

.comparison-column-header-isolated.comparison-highlight-col-isolated {
background: linear-gradient(135deg, rgba(155, 164, 166, 0.2), rgba(155, 164, 166, 0.3)) !important;
color: #000000 !important;
}

.comparison-row-isolated {
display: table-row !important;
}

.comparison-item-isolated {
display: table-cell !important;
padding: 20px !important;
font-size: 16px !important;
color: #000000 !important;
font-weight: 400 !important;
background-color: #f8f8f8 !important;
border: 1px solid #ccc !important;
vertical-align: top !important;
width: 50% !important;
line-height: 1.7 !important;
font-family: 'Open Sans', sans-serif !important;
text-align: left !important;
}

.comparison-item-isolated.comparison-highlight-col-isolated {
background: linear-gradient(135deg, rgba(155, 164, 166, 0.05), rgba(155, 164, 166, 0.08)) !important;
font-weight: 500 !important;
}

.comparison-ps-note-isolated {
font-size: 15px !important;
color: #000000 !important;
font-style: italic !important;
margin: 40px 0 !important;
text-align: left !important;
display: block !important;
line-height: 1.6 !important;
font-family: 'Open Sans', sans-serif !important;
}

.comparison-ps-note-isolated strong {
font-weight: 700 !important;
font-style: normal !important;
}

.comparison-cta-button-isolated {
all: unset !important;
display: inline-flex !important;
background: linear-gradient(135deg, #9ba4a6 0%, #7d8586 50%, #9ba4a6 100%) !important;
background-size: 200% 200% !important;
animation: comparison-gradient-shift-isolated 3s ease infinite !important;
color: white !important;
border-radius: 35px !important;
font-size: 17.9px !important;
font-weight: 700 !important;
padding: 21px 76px !important;
cursor: pointer !important;
transition: all 0.3s ease !important;
align-items: center !important;
justify-content: center !important;
text-decoration: none !important;
min-width: 380px !important;
font-family: 'Open Sans', sans-serif !important;
box-shadow: 0 10px 30px rgba(155, 164, 166, 0.4) !important;
text-transform: uppercase !important;
letter-spacing: 1px !important;
height: 81px !important;
position: relative !important;
border: none !important;
overflow: hidden !important;
box-sizing: border-box !important;
text-align: center !important;
margin: 50px auto 0 auto !important;
}

@keyframes comparison-gradient-shift-isolated {
0% { background-position: 0% 50%; }
50% { background-position: 100% 50%; }
100% { background-position: 0% 50%; }
}

.comparison-cta-button-isolated:hover {
transform: translateY(-3px) !important;
box-shadow: 0 15px 40px rgba(155, 164, 166, 0.6) !important;
}

.comparison-cta-button-isolated.loading {
opacity: 0.8 !important;
pointer-events: none !important;
}

.comparison-cta-button-isolated span {
position: relative !important;
z-index: 999 !important;
font-size: 17.9px !important;
font-weight: 700 !important;
color: white !important;
text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
display: block !important;
font-family: 'Open Sans', sans-serif !important;
line-height: 1.4 !important;
}

.comparison-lock-icon-isolated {
width: 38px !important;
height: 38px !important;
background-image: url('https://cdn.shopify.com/s/files/1/0682/3202/0061/files/The_New_Way_-_Sales_Page.png?v=1758114605') !important;
background-size: contain !important;
background-repeat: no-repeat !important;
background-position: center !important;
flex-shrink: 0 !important;
display: block !important;
margin-right: 15px !important;
}

.comparison-secure-payment-isolated {
display: flex !important;
align-items: center !important;
justify-content: center !important;
gap: 8px !important;
font-size: 15.44px !important;
color: #333333 !important;
font-weight: 500 !important;
margin-top: 15px !important;
font-family: 'Open Sans', sans-serif !important;
}

.comparison-secure-payment-icon-isolated {
width: 28.31px !important;
height: 28.31px !important;
background-image: url('https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Mastercard-Logo.wine.png?v=1758464867') !important;
background-size: contain !important;
background-repeat: no-repeat !important;
background-position: center !important;
display: block !important;
}

.comparison-bundle-price-wrapper-isolated {
margin: 15px 0 0 0 !important;
text-align: center !important;
display: block !important;
font-family: 'Open Sans', sans-serif !important;
}

.comparison-bundle-link-isolated {
color: #9ba4a6 !important;
text-decoration: underline !important;
font-size: 11.9px !important;
transition: all 0.3s ease !important;
cursor: pointer !important;
font-family: 'Open Sans', sans-serif !important;
}

.comparison-bundle-link-isolated:hover {
color: #7d8586 !important;
text-decoration: none !important;
}

@media (max-width: 768px) {
.comparison-title-isolated {
font-size: 32px !important;
}

.comparison-table-isolated {
font-size: 14px !important;
}

.comparison-column-header-isolated {
font-size: 18px !important;
padding: 15px 10px !important;
}

.comparison-item-isolated {
padding: 15px !important;
font-size: 14px !important;
}

.comparison-cta-button-isolated {
font-size: 15.66px !important;
padding: 18px 35px !important;
min-width: 320px !important;
}

.comparison-cta-button-isolated span {
font-size: 15.66px !important;
}
}

@media (max-width: 480px) {
.comparison-title-isolated {
font-size: 28px !important;
}

.comparison-subtitle-isolated {
font-size: 16px !important;
}
}


.faq-section-ai-photo {
all: initial !important;
display: block !important;
position: relative !important;
left: 50% !important;
right: 50% !important;
margin-left: -50vw !important;
margin-right: -50vw !important;
width: 100vw !important;
min-width: 100vw !important;
max-width: 100vw !important;
padding: 60px 20px !important;
background: #f8f8f8 !important;
font-family: 'Open Sans', system-ui, -apple-system, sans-serif !important;
overflow-x: hidden !important;
overflow-y: visible !important;
box-sizing: border-box !important;
isolation: isolate !important;
z-index: auto !important;
}

.faq-section-ai-photo,
.faq-section-ai-photo * {
box-sizing: border-box !important;
}

.faq-section-ai-photo * {
all: revert !important;
font-family: 'Open Sans', sans-serif !important;
}

.faq-section-ai-photo::before,
.faq-section-ai-photo::after {
content: '' !important;
position: absolute !important;
top: 0 !important;
bottom: 0 !important;
width: 100vw !important;
background: #f8f8f8 !important;
z-index: -2 !important;
pointer-events: none !important;
}

.faq-section-ai-photo::before {
left: -100vw !important;
}

.faq-section-ai-photo::after {
right: -100vw !important;
}

.faq-section-ai-photo h1 {
font-family: 'Open Sans', sans-serif !important;
font-size: 42px !important;
font-weight: 800 !important;
text-align: center !important;
margin: 0 0 50px 0 !important;
color: #000000 !important;
display: block !important;
line-height: 1.2 !important;
}

.faq-container-ai-photo {
max-width: 800px !important;
margin: 0 auto !important;
display: block !important;
}

.faq-item-ai-photo {
background: white !important;
margin-bottom: 15px !important;
border-radius: 8px !important;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
overflow: hidden !important;
display: block !important;
}

.faq-question-ai-photo {
width: 100% !important;
padding: 28px !important;
text-align: left !important;
background: white !important;
border: none !important;
cursor: pointer !important;
display: flex !important;
justify-content: space-between !important;
align-items: center !important;
font-size: 19px !important;
font-weight: 600 !important;
color: #000000 !important;
transition: background 0.3s ease !important;
font-family: 'Open Sans', sans-serif !important;
box-sizing: border-box !important;
outline: none !important;
}

.faq-question-ai-photo:hover {
background: #f9f9f9 !important;
}

.faq-question-ai-photo span:first-child {
flex: 1 !important;
text-align: left !important;
padding-right: 20px !important;
}

.faq-arrow-ai-photo {
font-size: 20px !important;
transition: transform 0.3s ease !important;
color: #9ba4a6 !important;
font-weight: bold !important;
display: inline-block !important;
flex-shrink: 0 !important;
}

.faq-question-ai-photo.active-ai-photo .faq-arrow-ai-photo {
transform: rotate(180deg) !important;
}

.faq-answer-ai-photo {
padding: 0 28px !important;
max-height: 0 !important;
overflow: hidden !important;
transition: max-height 0.3s ease, padding 0.3s ease !important;
font-size: 16px !important;
line-height: 1.7 !important;
color: #333333 !important;
font-family: 'Open Sans', sans-serif !important;
box-sizing: border-box !important;
display: block !important;
background: white !important;
}

.faq-answer-ai-photo.active-ai-photo {
padding: 0 28px 28px 28px !important;
max-height: 1000px !important;
}

.faq-answer-ai-photo strong {
color: #000000 !important;
font-weight: 700 !important;
}

@media (max-width: 768px) {
.faq-section-ai-photo h1 {
font-size: 32px !important;
}

.faq-question-ai-photo {
font-size: 17px !important;
padding: 24px !important;
}

.faq-answer-ai-photo {
font-size: 15px !important;
}

.faq-answer-ai-photo.active-ai-photo {
padding: 0 24px 24px 24px !important;
}
}

@media (max-width: 480px) {
.faq-section-ai-photo {
padding: 40px 15px !important;
}

.faq-section-ai-photo h1 {
font-size: 28px !important;
margin-bottom: 35px !important;
}

.faq-question-ai-photo {
font-size: 16px !important;
padding: 20px !important;
}
}


.final-cta-isolated-section {
all: initial !important;
display: block !important;
position: relative !important;
left: 50% !important;
right: 50% !important;
margin-left: -50vw !important;
margin-right: -50vw !important;
width: 100vw !important;
min-width: 100vw !important;
max-width: 100vw !important;
background: #000000 !important;
padding: 60px 20px !important;
text-align: center !important;
font-family: 'Open Sans', sans-serif !important;
box-sizing: border-box !important;
overflow-x: hidden !important;
overflow-y: visible !important;
isolation: isolate !important;
z-index: auto !important;
}

.final-cta-isolated-section,
.final-cta-isolated-section * {
box-sizing: border-box !important;
}

.final-cta-isolated-section * {
all: revert !important;
font-family: 'Open Sans', sans-serif !important;
}

.final-cta-isolated-section::before,
.final-cta-isolated-section::after {
content: '' !important;
position: absolute !important;
top: 0 !important;
bottom: 0 !important;
width: 100vw !important;
background: #000000 !important;
z-index: -1 !important;
pointer-events: none !important;
}

.final-cta-isolated-section::before {
left: -100vw !important;
}

.final-cta-isolated-section::after {
right: -100vw !important;
}

.final-cta-container {
max-width: 900px !important;
margin: 0 auto !important;
display: block !important;
}

.final-cta-headline {
font-size: 46px !important;
font-weight: 900 !important;
color: #ffffff !important;
margin: 0 0 30px 0 !important;
line-height: 1.2 !important;
letter-spacing: -0.5px !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
}

.final-cta-highlight {
color: #9ba4a6 !important;
text-shadow: 0 0 30px rgba(155, 164, 166, 0.6) !important;
font-family: inherit !important;
font-weight: inherit !important;
font-size: inherit !important;
display: inline !important;
}

.final-cta-description {
font-size: 20px !important;
font-weight: 400 !important;
color: #e8e8e8 !important;
margin: 0 0 25px 0 !important;
font-family: 'Open Sans', sans-serif !important;
line-height: 1.6 !important;
display: block !important;
max-width: 800px !important;
margin-left: auto !important;
margin-right: auto !important;
}

.final-cta-benefits-box {
background: rgba(155, 164, 166, 0.1) !important;
border: 2px solid rgba(155, 164, 166, 0.3) !important;
border-radius: 15px !important;
padding: 35px 30px !important;
margin: 40px auto !important;
max-width: 750px !important;
text-align: left !important;
display: block !important;
}

.final-cta-benefits-title {
font-size: 24px !important;
font-weight: 800 !important;
color: #9ba4a6 !important;
margin: 0 0 25px 0 !important;
text-align: center !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
}

.final-cta-benefit-item {
display: flex !important;
align-items: flex-start !important;
margin-bottom: 18px !important;
font-size: 17px !important;
color: #e8e8e8 !important;
line-height: 1.6 !important;
font-family: 'Open Sans', sans-serif !important;
}

.final-cta-benefit-item:last-child {
margin-bottom: 0 !important;
}

.final-cta-checkmark {
color: #9ba4a6 !important;
font-weight: 900 !important;
font-size: 20px !important;
margin-right: 12px !important;
flex-shrink: 0 !important;
margin-top: 2px !important;
}

.final-cta-button-wrapper {
margin: 45px 0 0 0 !important;
display: block !important;
}

.final-cta-price {
font-size: 38px !important;
font-weight: 800 !important;
color: #ffffff !important;
margin: 0 0 20px 0 !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
}

.final-cta-original-price {
text-decoration: line-through !important;
color: #888888 !important;
font-size: 28px !important;
margin-right: 12px !important;
}

.final-cta-current-price {
color: #9ba4a6 !important;
text-shadow: 0 0 20px rgba(155, 164, 166, 0.6) !important;
}

.final-main-button {
all: unset !important;
display: inline-flex !important;
background: radial-gradient(ellipse at bottom, #c0c8ca 0%, #9ba4a6 40%) !important;
color: white !important;
border-radius: 35px !important;
font-size: 16.2px !important;
font-weight: 700 !important;
padding: 21px 76px !important;
cursor: pointer !important;
transition: all 0.3s ease !important;
align-items: center !important;
justify-content: center !important;
text-decoration: none !important;
min-width: 520px !important;
font-family: 'Open Sans', sans-serif !important;
box-shadow: 0 10px 30px rgba(155, 164, 166, 0.5) !important;
text-transform: uppercase !important;
letter-spacing: 1px !important;
height: 81px !important;
position: relative !important;
border: none !important;
overflow: hidden !important;
box-sizing: border-box !important;
text-align: center !important;
margin: 0 auto 12px auto !important;
gap: 15px !important;
}

.final-main-button:hover {
transform: translateY(-2px) !important;
box-shadow: 0 15px 40px rgba(155, 164, 166, 0.7) !important;
}

.final-main-button.loading {
opacity: 0.8 !important;
pointer-events: none !important;
}

.final-main-button span {
position: relative !important;
z-index: 999 !important;
font-size: 16.2px !important;
font-weight: 700 !important;
color: white !important;
display: block !important;
line-height: 1.3 !important;
font-family: 'Open Sans', sans-serif !important;
}

.final-button-small-text {
font-size: 9.9px !important;
display: block !important;
font-weight: 400 !important;
text-transform: none !important;
letter-spacing: 0.5px !important;
margin-top: 3px !important;
}

.final-lock-icon {
width: 38px !important;
height: 38px !important;
background-image: url('https://cdn.shopify.com/s/files/1/0682/3202/0061/files/The_New_Way_-_Sales_Page.png?v=1758114605') !important;
background-size: contain !important;
background-repeat: no-repeat !important;
background-position: center !important;
flex-shrink: 0 !important;
display: block !important;
}

.final-bundle-wrapper {
text-align: center !important;
margin: 12px 0 0 0 !important;
display: block !important;
}

.final-bundle-wrapper span {
color: #e8e8e8 !important;
font-size: 11.9px !important;
font-family: 'Open Sans', sans-serif !important;
}

.final-bundle-link {
color: #9ba4a6 !important;
text-decoration: underline !important;
}

.final-secure-payment {
display: flex !important;
align-items: center !important;
justify-content: center !important;
gap: 8px !important;
font-size: 15.44px !important;
color: #e8e8e8 !important;
font-weight: 500 !important;
margin-top: 15px !important;
font-family: 'Open Sans', sans-serif !important;
}

.final-secure-icon {
width: 28.31px !important;
height: 28.31px !important;
background-image: url('https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Mastercard-Logo.wine.png?v=1758464867') !important;
background-size: contain !important;
background-repeat: no-repeat !important;
background-position: center !important;
display: block !important;
}

.final-guarantee-text {
font-size: 15px !important;
color: #9ba4a6 !important;
font-style: italic !important;
margin-top: 30px !important;
font-family: 'Open Sans', sans-serif !important;
display: block !important;
}

.final-summary-isolated {
all: initial !important;
display: block !important;
margin-top: 30px !important;
padding: 0 20px !important;
text-align: center !important;
font-family: 'Open Sans', sans-serif !important;
box-sizing: border-box !important;
}

.final-summary-isolated strong,
.final-summary-isolated * {
all: initial !important;
font-family: 'Open Sans', sans-serif !important;
}

.final-summary-text-small {
all: initial !important;
display: block !important;
font-size: 12.71px !important;
font-weight: 400 !important;
color: #e8e8e8 !important;
font-family: 'Open Sans', sans-serif !important;
line-height: 1.7 !important;
text-align: center !important;
max-width: 800px !important;
margin: 0 auto !important;
padding: 0 !important;
box-sizing: border-box !important;
}

.final-summary-text-small strong {
all: initial !important;
font-weight: 700 !important;
color: #e8e8e8 !important;
font-family: 'Open Sans', sans-serif !important;
font-size: 12.71px !important;
display: inline !important;
}

@media (max-width: 768px) {
.final-cta-headline {
font-size: 34px !important;
}

.final-cta-description {
font-size: 18px !important;
}

.final-cta-benefits-box {
padding: 25px 20px !important;
}

.final-cta-benefit-item {
font-size: 16px !important;
}

.final-main-button {
min-width: 400px !important;
padding: 18px 35px !important;
font-size: 17px !important;
}

.final-main-button span {
font-size: 17px !important;
}
}

@media (max-width: 480px) {
.final-cta-isolated-section {
padding: 40px 15px !important;
}

.final-cta-headline {
font-size: 28px !important;
}

.final-cta-description {
font-size: 16px !important;
}

.final-main-button {
min-width: 340px !important;
font-size: 16px !important;
padding: 16px 30px !important;
}

.final-main-button span {
font-size: 16px !important;
}
}

</style>

<div class="ai-photographer-hero-section">
<div class="hero-content-container">
<div class="hero-intro-text">
<div class="hero-pulse-dot"></div>
<span>The $10,000 photographer is now obsolete</span>
</div>

<h1 class="hero-main-headline">
Stop Paying $10,000 for <span class="hero-highlight">Product Photography</span>
</h1>

<p class="hero-sub-headline">
(When AI can create billion-dollar brand images in seconds)
</p>

<div class="hero-screenshot-container">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/7c40abec-7cfc-4805-9c1d-5290a3fd3afa.png?v=1760542403" alt="AI Photography Results" class="hero-screenshot">
</div>

<div class="hero-pricing-section">
<p class="hero-price-text">
<span class="hero-original-price">$49</span> <span class="hero-current-price">Only $19</span>
</p>

<button class="hero-cta-button" id="ai-photographer-add-to-cart-btn" data-variant-id="43624249032797">
<div class="hero-lock-icon"></div>
<span class="hero-cta-text">
GET THE AI PHOTOGRAPHER!<br>
<small style="font-size: 10.07px !important; font-weight: 400 !important; display: block !important; margin-top: 3px !important; text-transform: none !important;">one time payment of $19, lifetime access.</small>
</span>
</button>

<div class="hero-bundle-wrapper">
<span style="color: white;">
$12.35 If <a href="https://quantum-scale.co/pages/bundle-builder" class="hero-bundle-link">building a bundle</a>
</span>
</div>

<div class="hero-secure-payment">
<div class="hero-secure-payment-icon"></div>
<span>Secure 256-bit SSL encrypted payment</span>
</div>
</div>
</div>
</div>




<div class="ai-results-mega-section">
<div class="results-container">
<p class="results-main-headline">
<strong>In 2025, you no longer need to pay $10,000 to a professional photographer for images that will turn your brand into a billion-dollar brand…</strong>
</p>

<p class="results-paragraph">If done right, AI can create everything. Studio photos and lifestyle photos for any possible product.</p>

<p class="results-paragraph">With this Tool, you'll get the complete list of prompts + a full file of AI models, that with one click will create for you in ChatGPT and completely free - images that will turn your ecommerce brand into a conversion machine with the appearance of a billion-dollar brand….</p>

<div style="height: 30px;"></div>

<div class="extra-spacing"></div>

<p class="results-main-headline">
<strong>Here's a glimpse of 1% of the results you can achieve with the prompts and models you'll receive..</strong>
</p>

<div class="results-slider-section">
<div class="results-before-after-container" data-container="results-1">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/31.jpg?v=1756830086" alt="After" class="results-before-image">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T192050.456.png?v=1756830058" alt="Before" class="results-after-image">
<div class="results-slider-handle"></div>
<div class="results-before-label">AFTER</div>
<div class="results-after-label">BEFORE</div>
</div>
</div>

<div class="results-slider-section">
<div class="results-before-after-container" data-container="results-2">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T192202.722.png?v=1756830140" alt="After" class="results-before-image">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T192152.447.png?v=1756830119" alt="Before" class="results-after-image">
<div class="results-slider-handle"></div>
<div class="results-before-label">AFTER</div>
<div class="results-after-label">BEFORE</div>
</div>
</div>

<div class="results-slider-section">
<div class="results-before-after-container" data-container="results-3">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/33.jpg?v=1756830184" alt="After" class="results-before-image">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/32.jpg?v=1756830168" alt="Before" class="results-after-image">
<div class="results-slider-handle"></div>
<div class="results-before-label">AFTER</div>
<div class="results-after-label">BEFORE</div>
</div>
</div>

<div class="results-slider-section">
<div class="results-before-after-container" data-container="results-4">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T192619.581.png?v=1756830386" alt="After" class="results-before-image">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T192603.190.png?v=1756830371" alt="Before" class="results-after-image">
<div class="results-slider-handle"></div>
<div class="results-before-label">AFTER</div>
<div class="results-after-label">BEFORE</div>
</div>
</div>

<div class="results-slider-section">
<div class="results-before-after-container" data-container="results-5">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T193820.014.png?v=1756831118" alt="After" class="results-before-image">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/34.jpg?v=1756831083" alt="Before" class="results-after-image">
<div class="results-slider-handle"></div>
<div class="results-before-label">AFTER</div>
<div class="results-after-label">BEFORE</div>
</div>
</div>

<div class="results-slider-section">
<div class="results-before-after-container" data-container="results-6">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/35.jpg?v=1756831192" alt="After" class="results-before-image">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T193918.015.png?v=1756831165" alt="Before" class="results-after-image">
<div class="results-slider-handle"></div>
<div class="results-before-label">AFTER</div>
<div class="results-after-label">BEFORE</div>
</div>
</div>

<div class="results-slider-section">
<div class="results-before-after-container" data-container="results-7">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T194025.303.png?v=1756831233" alt="After" class="results-before-image">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T194017.196.png?v=1756831225" alt="Before" class="results-after-image">
<div class="results-slider-handle"></div>
<div class="results-before-label">AFTER</div>
<div class="results-after-label">BEFORE</div>
</div>
</div>

<div class="results-slider-section">
<div class="results-before-after-container" data-container="results-8">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T194107.241.png?v=1756831278" alt="After" class="results-before-image">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T194057.893.png?v=1756831276" alt="Before" class="results-after-image">
<div class="results-slider-handle"></div>
<div class="results-before-label">AFTER</div>
<div class="results-after-label">BEFORE</div>
</div>
</div>

<div class="results-slider-section">
<div class="results-before-after-container" data-container="results-9">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T194154.154.png?v=1756831322" alt="After" class="results-before-image">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T194141.878.png?v=1756831320" alt="Before" class="results-after-image">
<div class="results-slider-handle"></div>
<div class="results-before-label">AFTER</div>
<div class="results-after-label">BEFORE</div>
</div>
</div>

<div class="results-slider-section">
<div class="results-before-after-container" data-container="results-10">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T194238.151.png?v=1756831367" alt="After" class="results-before-image">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T194225.898.png?v=1756831365" alt="Before" class="results-after-image">
<div class="results-slider-handle"></div>
<div class="results-before-label">AFTER</div>
<div class="results-after-label">BEFORE</div>
</div>
</div>

<div class="results-slider-section">
<div class="results-before-after-container" data-container="results-11">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T194334.177.png?v=1756831427" alt="After" class="results-before-image">
<img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T194328.748.png?v=1756831425" alt="Before" class="results-after-image">
<div class="results-slider-handle"></div>
<div class="results-before-label">AFTER</div>
<div class="results-after-label">BEFORE</div>
</div>
</div>
</div>
</div>




<div class="comparison-section-wrapper-isolated">
<div class="comparison-container-isolated">
<h1 class="comparison-title-isolated">
Why This Is <span class="comparison-highlight-isolated">Completely Different</span>
</h1>

<p class="comparison-subtitle-isolated">
Most brands still throw money at expensive photographers. This gives you the power of billion-dollar brands for pennies.
</p>

<p class="comparison-options-text-isolated">You have two paths:</p>

<table class="comparison-table-isolated">
<thead>
<tr>
<th class="comparison-column-header-isolated">The Old Way</th>
<th class="comparison-column-header-isolated comparison-highlight-col-isolated">The AI Way</th>
</tr>
</thead>
<tbody>
<tr class="comparison-row-isolated">
<td class="comparison-item-isolated">
Paying $10,000+ to professional photographers for a single product shoot - and waiting weeks for results
</td>
<td class="comparison-item-isolated comparison-highlight-col-isolated">
Creating unlimited studio-quality and lifestyle photos in minutes using AI - for the price of a coffee
</td>
</tr>
<tr class="comparison-row-isolated">
<td class="comparison-item-isolated">
Being stuck with generic product photos that look exactly like every other brand in your niche
</td>
<td class="comparison-item-isolated comparison-highlight-col-isolated">
Generating completely unique, brand-specific imagery that makes your products stand out and convert like crazy
</td>
</tr>
<tr class="comparison-row-isolated">
<td class="comparison-item-isolated">
Spending thousands on reshoots every time you need different angles, backgrounds, or lifestyle settings
</td>
<td class="comparison-item-isolated comparison-highlight-col-isolated">
Instantly creating any variation you need with a single click - different scenes, angles, moods, all from one simple prompt
</td>
</tr>
<tr class="comparison-row-isolated">
<td class="comparison-item-isolated">
Settling for amateur photos because professional photography is out of your budget - making your brand look cheap
</td>
<td class="comparison-item-isolated comparison-highlight-col-isolated">
Getting billion-dollar brand quality that makes customers trust you instantly and pay premium prices
</td>
</tr>
<tr class="comparison-row-isolated">
<td class="comparison-item-isolated">
Wasting weeks coordinating shoots, models, locations, and props - delaying your product launches
</td>
<td class="comparison-item-isolated comparison-highlight-col-isolated">
Launching products immediately with perfect marketing images ready to convert - no delays, no hassle, no waiting
</td>
</tr>
</tbody>
</table>

<p class="comparison-ps-note-isolated">
<strong>P.S.</strong> - The brands dominating ecommerce aren't spending more on photography. They're using AI to create images that convert better than traditional photography ever could - at a fraction of the cost.
</p>

<button class="comparison-cta-button-isolated" id="comparison-ai-photographer-btn" data-variant-id="43624249032797">
<div class="comparison-lock-icon-isolated"></div>
<span>YES, I WANT THE AI PHOTOGRAPHER!</span>
</button>

<div class="comparison-bundle-price-wrapper-isolated">
<span style="color: #333; font-size: 11.9px;">
$12.35 If <a href="https://quantum-scale.co/pages/bundle-builder" class="comparison-bundle-link-isolated">building a bundle</a>
</span>
</div>

<div class="comparison-secure-payment-isolated">
<div class="comparison-secure-payment-icon-isolated"></div>
<span>Secure 256-bit SSL encrypted payment</span>
</div>
</div>
</div>




<div class="faq-section-ai-photo">
<h1>Common Questions</h1>

<div class="faq-container-ai-photo">
<div class="faq-item-ai-photo">
<div class="faq-question-ai-photo" onclick="toggleAIPhotoAnswer(this)">
<span>"Will I get lifetime access?"</span>
<span class="faq-arrow-ai-photo">▼</span>
</div>
<div class="faq-answer-ai-photo">
Yes. <strong>One-time payment, lifetime access.</strong> No subscriptions. No hidden fees. Pay once, use forever. This is the complete system with all prompts and AI models - yours to keep and use for as long as you want.
</div>
</div>

<div class="faq-item-ai-photo">
<div class="faq-question-ai-photo" onclick="toggleAIPhotoAnswer(this)">
<span>"Do I need a team to apply this?"</span>
<span class="faq-arrow-ai-photo">▼</span>
</div>
<div class="faq-answer-ai-photo">
Not at all. <strong>Every tactic was designed for solo operators.</strong> You can implement everything with minimal tech skills or outsource it easily if you prefer. Just copy the prompts, paste them into ChatGPT (which is free), and watch as professional-quality images appear in seconds. If you can copy and paste, you can do this.
</div>
</div>

<div class="faq-item-ai-photo">
<div class="faq-question-ai-photo" onclick="toggleAIPhotoAnswer(this)">
<span>"I'm not tech-savvy. Is this complicated?"</span>
<span class="faq-arrow-ai-photo">▼</span>
</div>
<div class="faq-answer-ai-photo">
This is as simple as it gets. You get <strong>ready-to-use prompts</strong> and pre-configured AI models. Just copy, paste into ChatGPT, and you're done. No technical knowledge required. If you've ever sent an email, you can use this. We've done all the complex work for you - you just plug in and generate images.
</div>
</div>

<div class="faq-item-ai-photo">
<div class="faq-question-ai-photo" onclick="toggleAIPhotoAnswer(this)">
<span>"Don't I need to pay for expensive AI tools?"</span>
<span class="faq-arrow-ai-photo">▼</span>
</div>
<div class="faq-answer-ai-photo">
Nope. Everything works with <strong>ChatGPT's free version.</strong> You don't need expensive subscriptions or premium AI tools. The prompts and models we provide are optimized to work perfectly with free tools, so your only investment is this one-time $19 payment. That's it.
</div>
</div>

<div class="faq-item-ai-photo">
<div class="faq-question-ai-photo" onclick="toggleAIPhotoAnswer(this)">
<span>"How is this different from just asking ChatGPT to make images?"</span>
<span class="faq-arrow-ai-photo">▼</span>
</div>
<div class="faq-answer-ai-photo">
Anyone can type random prompts into ChatGPT and get mediocre results. What you're getting here are <strong>professionally engineered prompts and AI models</strong> that have been tested and optimized to create <strong>billion-dollar brand quality images.</strong> These are the exact formulas that produce the stunning before/after results you saw above. Without these specific prompts, you'll waste hours trying to figure out what works - with them, you get perfect results in seconds.
</div>
</div>

<div class="faq-item-ai-photo">
<div class="faq-question-ai-photo" onclick="toggleAIPhotoAnswer(this)">
<span>"What if the AI images don't look good for my specific product?"</span>
<span class="faq-arrow-ai-photo">▼</span>
</div>
<div class="faq-answer-ai-photo">
The prompt library covers <strong>every possible product type</strong> - physical products, digital products, clothing, accessories, home goods, electronics, beauty products, food items, and more. Each prompt is designed to be customizable for your specific brand and product. Plus, you get variations for different styles: studio shots, lifestyle images, close-ups, packaging shots, and more. If one version doesn't work perfectly, you have dozens of alternatives to try instantly.
</div>
</div>

<div class="faq-item-ai-photo">
<div class="faq-question-ai-photo" onclick="toggleAIPhotoAnswer(this)">
<span>"Why is this so cheap if it replaces $10,000 photography?"</span>
<span class="faq-arrow-ai-photo">▼</span>
</div>
<div class="faq-answer-ai-photo">
Simple: we want to make this accessible to <strong>every ecommerce brand owner</strong>, not just the ones with massive budgets. Traditional photography is expensive because of equipment, studios, photographers, models, and time. AI eliminates all those costs. We're passing the savings directly to you. This is the same quality that big brands pay thousands for - but you're getting it for <strong>less than the price of a single coffee meeting.</strong> It's a no-brainer investment that pays for itself with your very first product.
</div>
</div>

<div class="faq-item-ai-photo">
<div class="faq-question-ai-photo" onclick="toggleAIPhotoAnswer(this)">
<span>"What if I have questions or need help?"</span>
<span class="faq-arrow-ai-photo">▼</span>
</div>
<div class="faq-answer-ai-photo">
Every purchase includes <strong>complete instructions</strong> and step-by-step guidance. The prompts are plug-and-play, so you shouldn't need help - but if you do, our support team is here. This is designed to be foolproof, so you can start generating images within minutes of getting access.
</div>
</div>

<div class="faq-item-ai-photo">
<div class="faq-question-ai-photo" onclick="toggleAIPhotoAnswer(this)">
<span>"Can I really create unlimited images?"</span>
<span class="faq-arrow-ai-photo">▼</span>
</div>
<div class="faq-answer-ai-photo">
Yes. Once you have the prompts and models, you can generate <strong>as many images as you want</strong>, whenever you want, for as many products as you want. There are no limits. Create hundreds of product photos for a single $19 investment. Compare that to paying $10,000 for just one photoshoot - the value is insane.
</div>
</div>
</div>
</div>




<div class="final-cta-isolated-section">
<div class="final-cta-container">
<h1 class="final-cta-headline">
Here's What You Get <span class="final-cta-highlight">Right Now</span>
</h1>

<p class="final-cta-description">
In the next 60 seconds, you'll have instant access to everything you need to create unlimited billion-dollar brand images - without ever paying a photographer again.
</p>

<div class="final-cta-benefits-box">
<div class="final-cta-benefits-title">Inside The $10,000 AI Photographer:</div>

<div class="final-cta-benefit-item">
<span class="final-cta-checkmark">✓</span>
<span><strong>Complete Prompt Library</strong> - Every prompt you need for studio shots, lifestyle images, product photography, and more - all optimized for ChatGPT</span>
</div>

<div class="final-cta-benefit-item">
<span class="final-cta-checkmark">✓</span>
<span><strong>Pre-Configured AI Models</strong> - Ready-to-use models that create billion-dollar quality images with one click - no technical knowledge required</span>
</div>

<div class="final-cta-benefit-item">
<span class="final-cta-checkmark">✓</span>
<span><strong>Step-by-Step Instructions</strong> - Simple guide that walks you through creating your first image in under 5 minutes</span>
</div>

<div class="final-cta-benefit-item">
<span class="final-cta-checkmark">✓</span>
<span><strong>Unlimited Image Generation</strong> - Create as many images as you want, for as many products as you want, forever</span>
</div>

<div class="final-cta-benefit-item">
<span class="final-cta-checkmark">✓</span>
<span><strong>Works With Free Tools</strong> - Everything runs on ChatGPT's free version - no expensive subscriptions needed</span>
</div>

<div class="final-cta-benefit-item">
<span class="final-cta-checkmark">✓</span>
<span><strong>Lifetime Access</strong> - Pay once, use forever. No recurring fees, no hidden costs, no surprises</span>
</div>
</div>

<div class="final-cta-button-wrapper">
<p class="final-cta-price">
<span class="final-cta-original-price">$49</span> <span class="final-cta-current-price">Only $19</span>
</p>

<button class="final-main-button" id="final-ai-photographer-btn" data-variant-id="43624249032797">
<div class="final-lock-icon"></div>
<span style="font-size: 16.2px !important;">
GET INSTANT ACCESS NOW!<br>
<small style="font-size: 9.9px !important; font-weight: 400 !important; display: block !important; margin-top: 3px !important; text-transform: none !important;">one time payment of $19, lifetime access.</small>
</span>
</button>

<div class="final-bundle-wrapper">
<span style="color: white;">
$12.35 If <a href="https://quantum-scale.co/pages/bundle-builder" class="final-bundle-link">building a bundle</a>
</span>
</div>

<div class="final-secure-payment">
<div class="final-secure-icon"></div>
<span>Secure 256-bit SSL encrypted payment</span>
</div>
</div>

<div style="height: 30px;"></div>

<div class="final-summary-isolated">
<div class="final-summary-text-small">
<strong>To Summarize:</strong> You're getting the exact system to create unlimited professional product photography using AI - the same quality billion-dollar brands pay $10,000+ for - without any photography skills, without expensive equipment, and without paying photographers ever again.
</div>
</div>

</div>
</div>
  `,
};
