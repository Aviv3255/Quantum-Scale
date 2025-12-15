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
};
