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
};

// Helper function to get HTML for a course
export const getCourseHTML = (slug: string): string | null => {
  const html = courseHTMLBlocks[slug];
  if (!html || html.includes('PASTE YOUR') || html.trim().length < 100) {
    return null;
  }
  return html;
};
