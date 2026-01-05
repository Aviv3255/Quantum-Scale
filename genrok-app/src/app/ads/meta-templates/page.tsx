'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Copy, Check, Users, Lock, Gift, Sparkles, ExternalLink, MessageSquare, Twitter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { supabase, updateUserProfile } from '@/lib/supabase';

// Creative images for the masonry grid
const CREATIVE_IMAGES = [
  'https://ucarecdn.com/6ebc3ab0-7e48-4646-adf8-34033d7f4fb3/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-18%20at%2009.00.13-min.png',
  'https://ucarecdn.com/68b6de60-dd35-47af-ab71-a1e5fa05b958/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-22%20at%2009.51.24-min.png',
  'https://ucarecdn.com/8a41080a-7842-4de2-be1b-033b6d8c63a2/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-21%20at%2009.47.23-min.png',
  'https://ucarecdn.com/943c2faf-a209-4e2f-af47-d9c3eb4b84f7/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-28%20at%2017.18.04-min.png',
  'https://ucarecdn.com/4339afed-6ab2-4675-8002-4ee4c6694c72/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-21%20at%2009.52.10-min.png',
  'https://ucarecdn.com/981f371b-212b-487f-aba7-c71099c915c2/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-21%20at%2014.56.55-min.png',
  'https://ucarecdn.com/3330ae97-aef3-4ea2-a19f-238a8b43cc51/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-21%20at%2012.46.26-min.png',
  'https://ucarecdn.com/cfb0a16f-4bb5-44ad-8784-69cdf07d4c84/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-18%20at%2009.01.34-min.png',
  'https://ucarecdn.com/4e0f9e18-3140-49ad-941b-10303c24d759/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-18%20at%2009.16.07-min.png',
  'https://ucarecdn.com/37dd2dd4-3058-4b2a-b06a-bcb7c184b5e0/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-22%20at%2009.44.07-min.png',
  'https://ucarecdn.com/76d0f70e-848c-4fc2-90ec-67a3aa539dc0/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-21%20at%2012.46.06-min.png',
  'https://ucarecdn.com/a4416bca-64ac-4f57-897f-8262b8a0c860/-/format/auto/-/preview/3000x3000/-/quality/lighter/Screenshot%202024-10-28%20at%2017.15.58-min.png',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(1).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(10).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(11).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(12).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(13).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(14).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(15).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(16).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(2).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(3).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(4).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(5).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(6).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(7).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(8).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/A%20(9).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/1,000%20creatives/S.jpg',
];

// Tutorial steps with videos
const TUTORIAL_STEPS = [
  {
    step: 1,
    title: 'Choose your template',
    description: 'Pick from 1,000 expertly designed static ad templates in Canva.',
    videoUrl: 'https://lumintheme.com/cdn/shop/videos/c/vp/77904b7c03a44df6ad0703da3af7944f/77904b7c03a44df6ad0703da3af7944f.SD-480p-1.5Mbps-51346106.mp4?v=0',
  },
  {
    step: 2,
    title: 'Customize in Canva',
    description: 'Edit your template with your logo, colors, and copy.',
    videoUrl: 'https://lumintheme.com/cdn/shop/videos/c/vp/0cfc5f3ef5744548bbe80d9d60d881bd/0cfc5f3ef5744548bbe80d9d60d881bd.SD-480p-0.9Mbps-51346105.mp4?v=0',
  },
  {
    step: 3,
    title: 'Start testing',
    description: 'Download your ad from Canva and plant this bomb in Ads Manager.',
    videoUrl: 'https://lumintheme.com/cdn/shop/videos/c/vp/c633b4b7cdac492489fec34142560b17/c633b4b7cdac492489fec34142560b17.SD-480p-0.9Mbps-51346104.mp4?v=0',
  },
];

// Template packs with Canva URLs
const TEMPLATE_PACKS = [
  { name: 'Pack 1', url: 'https://www.canva.com/design/DAGtJExZaEg/sbePbWIKEBIV8FGXUpMfJA/view' },
  { name: 'Pack 2', url: 'https://www.canva.com/design/DAGtJMM8qMw/Vb1VNJnIq1mmJ14tVPaJTQ/view' },
  { name: 'Pack 3', url: 'https://www.canva.com/design/DAGtJA5GCQs/x-fH_1-FGSn-Vv6mP-VTpA/view' },
  { name: 'Pack 4', url: 'https://www.canva.com/design/DAGtJGi4-Os/FvJwz3tO8tIYGBpzB-t_Fg/view' },
  { name: 'Pack 5', url: 'https://www.canva.com/design/DAGtJBkppmw/8_rC3X3qYqXdQ3WOvFBXkg/view' },
  { name: 'BFCM Pack', url: 'https://www.canva.com/design/DAGtJBny6nc/oNR6_8O2amLmA_GbTHn5tg/view' },
];

// Viral posts for sharing - Reddit/Facebook - VALUE BOMBS from learning center
const REDDIT_POSTS = [
  { topic: 'The "Emotion Decides, Logic Justifies" principle that changed everything', content: `Best piece of marketing advice I ever learned: People dont buy with logic. They buy with emotion, then use logic to justify the purchase after.

Think about it. When was the last time you made a purchase purely based on specs and features? Almost never. You FELT something first - desire, excitement, fear of missing out - and THEN your brain found logical reasons to support that feeling.

This completely changes how you should structure your product pages. Lead with emotion first - the transformation, the feeling, the outcome your product delivers. "Finally sleep through the night" hits completely different than "Memory foam with cooling gel technology."

THEN give them the logical specs so their brain can justify what their heart already decided.

Most stores do this backwards. They lead with features and specs hoping logic will convince people. But logic doesnt convince. It only justifies decisions already made emotionally.

Your product images, headlines, and first few sentences need to create an emotional response. Save the technical details for after youve hooked them emotionally.

[LINK]` },

  { topic: 'The WIIFM principle - the only question your customer is asking', content: `Every single person who lands on your site is asking one question: "Whats In It For Me?"

WIIFM. Write it on a sticky note and put it on your monitor.

Nobody cares about your brand story. Nobody cares about your manufacturing process. Nobody cares about your company values. They care about ONE thing: how does this product make MY life better?

I went through my product descriptions and realized I was talking about the product, not the customer. "Made with premium materials" - who cares? "Designed by experts" - so what?

Changed everything to customer-focused benefits:
- "Never struggle with tangled cords again"
- "Finally a bag that fits under airplane seats"
- "Stop wasting 20 minutes every morning on your hair"

Every feature needs to pass the WIIFM test. If you write "waterproof coating" - ask yourself "so what?" The WIIFM answer is "never worry about getting caught in the rain."

Your customer is selfish (we all are). Write for their selfishness. Answer their WIIFM question in every headline, bullet point, and product description.

[LINK]` },

  { topic: 'The 3-Second Rule: Why your homepage might be killing your sales', content: `Learned something that completely reframed how I think about my website.

You have 3 seconds. Thats it. In those 3 seconds, a visitor decides to stay or bounce. And most ecommerce sites completely fail this test.

In those 3 seconds, three things need to happen:
1. They need to understand WHAT you sell
2. They need to understand WHY it matters to them
3. They need to see a clear NEXT STEP

Go look at your homepage right now. Can a complete stranger understand all three within 3 seconds? Most cant.

The common mistakes:
- Fancy lifestyle images that look nice but say nothing
- Vague headlines like "Welcome to our store"
- No clear call to action above the fold
- Too much information competing for attention

The fix is simple: Clear product image + benefit-focused headline + obvious CTA button. All visible without scrolling.

Confused minds dont buy. Every second someone spends trying to figure out what youre selling is a second closer to them leaving. Your job is to make it instantly clear.

This "3-second rule" concept came from [LINK] - its one of those things that seems obvious once you hear it but most stores still get wrong.` },

  { topic: 'The "Cost of Standing Still" - Stop selling your price, start selling what they lose', content: `Biggest mindset shift in how I write copy: Stop selling the benefits of buying. Start selling the cost of NOT buying.

Most marketers focus on what customers gain. Better approach: focus on what theyre losing every day without your product.

Its not "save money on energy bills" - its "every month you wait is another month of throwing money away on inflated bills."

Its not "get better sleep" - its "another sleepless night means another day of brain fog, irritability, and underperforming at work."

The psychology behind this is solid. People are wired to avoid loss more than pursue gain. Losing $100 hurts more than gaining $100 feels good.

So when youre writing:
- Dont just sell the dream outcome
- Paint a vivid picture of what staying stuck looks like
- Make the status quo feel unacceptable
- Position inaction as the risky choice

Your product isnt a purchase. Its an escape from a painful reality theyre currently tolerating.

Most stores are competing on features and price. You can compete on making the pain of inaction unbearable.

[LINK]` },

  { topic: 'The Gatekeeper Method - 4 moves to get past the brains attention filter', content: `Our brains filter out almost everything. We see thousands of ads daily and ignore nearly all of them. So how do you get through?

Learned about the "Gatekeeper Method" - four specific moves that bypass the brains automatic filtering:

1. NOVELTY - The brain notices whats different. Sameness gets filtered. If your ad looks like every other ad, its invisible.

2. RELEVANCE - Even novel things get ignored if they dont matter to us. You need to speak to something the person already cares about.

3. PATTERN INTERRUPT - Do something unexpected. Say something that doesnt fit the pattern theyve seen a hundred times.

4. EMOTIONAL TRIGGER - Facts dont make it through the filter. Emotions do. Lead with feeling, not information.

Most ads fail at step one. They look exactly like competitors. Same stock photos, same generic claims, same format.

The gatekeeper in your customers brain is looking for reasons to ignore you. Your job is to do something that cant be ignored.

This doesnt mean being weird for the sake of weird. It means being strategically different in ways that serve your message.

[LINK]` },

  { topic: 'The Rule of One - why your marketing is probably trying to do too much', content: `Best piece of marketing advice I keep coming back to: The Rule of One.

One reader.
One idea.
One offer.
One action.

Not "everyone who might be interested." ONE specific person youre talking to.

Not "all the benefits of our product." ONE central idea that matters most.

Not "check out our sale, new arrivals, and sign up for our newsletter." ONE clear offer.

Not "browse, shop, subscribe, follow us." ONE action you want them to take.

Most marketing fails because its trying to do too much at once. Multiple messages competing for attention. Multiple CTAs creating confusion. Multiple audiences being spoken to in vague generalities.

When you write for ONE person, your message gets specific and compelling. When you focus on ONE idea, it has room to land. When you make ONE offer, the choice is clear.

Go look at your homepage, your emails, your ads. How many different messages are competing for attention? How many CTAs? How many different people are you trying to reach?

Simplify ruthlessly. One reader, one idea, one offer, one action.

[LINK]` },

  { topic: 'The 6 Primal Buy Buttons - the only triggers that get the reptile brain to say YES', content: `Learned about the 6 things that trigger immediate action in the oldest part of our brain - the part that makes snap decisions before logic kicks in.

These are the "primal stimuli" that bypass rational thinking:

1. SELF-CENTERED - The brain prioritizes anything about ME. Use "you" language. Make it personal.

2. CONTRAST - The brain notices differences, not absolutes. Before/after. With/without. Now/then.

3. TANGIBLE - Abstract concepts get filtered. Concrete, specific, sensory details get through.

4. BEGINNING AND END - The brain remembers first and last impressions most. Nail your opening and closing.

5. VISUAL - The brain processes images faster than words. Show, dont just tell.

6. EMOTIONAL - Logic informs but emotion decides. Lead with feeling.

Most marketing focuses on rational benefits and features. But the reptile brain - the part that controls fight, flight, and BUY decisions - doesnt respond to logic.

When youre writing copy, ask yourself: Does this trigger any of the 6 primal stimuli? If youre just listing features, youre talking to the wrong part of the brain.

Make it about them. Show contrast. Be concrete. Nail the opening. Use visuals. Trigger emotion.

[LINK] Understanding how the brain actually makes decisions changes everything.` },

  { topic: 'The 3 High-Impact CRO Tests - simple changes that actually move the needle', content: `Most CRO advice is about tiny tweaks that barely matter. Button color tests. Font changes. Endless small stuff.

Learned about three high-impact tests that actually make a meaningful difference:

1. FLOATING ADD-TO-CART BUTTON
When someone scrolls down your product page to read reviews or check details, the buy button disappears. By the time theyre ready to buy, they have to scroll back up. Each scroll is friction. Each moment of searching is a chance for doubt.

A sticky button that follows them eliminates this entirely. Its always there when theyre ready.

2. URGENCY/SCARCITY INDICATORS
Not fake countdown timers. Real information: actual stock levels, actual shipping cutoffs, actual sale end dates.

People procrastinate. Genuine urgency gives them permission to decide now instead of "later" (which usually means never).

3. SOCIAL PROOF NEAR THE CTA
Reviews, testimonials, trust badges - but positioned RIGHT NEXT to the buy button. Not hidden at the bottom of the page. Right where the decision happens.

These arent magic tricks. Theyre just removing friction from the buying process at the moment it matters most.

[LINK]` },

  { topic: 'The Damaging Admission - why revealing weakness makes your strengths believable', content: `Counter-intuitive copywriting principle that took me a while to trust: Admitting a weakness makes your strengths more believable.

Its called the "damaging admission" and it works because:
- Perfect products dont exist and everyone knows it
- When you admit a flaw, you become trustworthy
- That trust transfers to everything else you claim

Classic example: "Our product takes 2 weeks to ship from our small workshop in Italy. But the handcrafted quality is worth the wait."

The slow shipping is the damaging admission. But it reframes as "handcrafted quality" which actually sounds premium.

How to use it:
- Identify a genuine limitation
- Reframe it as connected to a strength
- Lead with the admission, follow with the benefit

"Our prices are higher than Amazon. Because we pay our workers fairly and use sustainable materials."

"This course is long - 47 hours. Because we dont skip the details that actually matter."

The damaging admission builds trust precisely because it feels honest. And honest beats polished every time.

[LINK] Once you start using it, your copy becomes much more believable.` },

  { topic: 'Voice of Customer Mining - how to find the exact words that sell', content: `The best copywriters dont invent clever phrases. They steal the exact words their customers already use.

Its called Voice of Customer (VOC) mining and its the most underrated skill in marketing.

Where to mine:
- Your own reviews (especially 3-4 star ones with specific feedback)
- Competitor reviews (goldmine)
- Reddit threads in your niche
- Amazon reviews for similar products
- Customer support tickets and emails
- Social media comments

What to look for:
- How they describe their problem (their words, not yours)
- The specific outcomes they want
- The objections and fears they mention
- The emotional language they use

When you use their exact language in your copy, something magical happens - they feel understood. "Finally, someone who gets it."

You dont have to guess what resonates. They literally tell you. You just have to listen and echo it back.

[LINK]` },

  { topic: 'The Unique Mechanism - the proprietary reason YOUR solution works', content: `Every successful product has a "unique mechanism" - the specific reason why THIS product works when others dont.

Without a unique mechanism, youre just another commodity. With one, youre the only logical choice.

Examples:
- Not just "weight loss pills" but "the only formula that blocks the fat-storage hormone"
- Not just "project management software" but "the AI that prioritizes your tasks based on energy levels"
- Not just "skincare" but "fermented ingredients that penetrate 3x deeper"

The unique mechanism answers: "Why does this work? And why is it different from everything else?"

Even if your product is similar to competitors, find the angle that makes YOUR approach unique:
- Different ingredient
- Different method
- Different philosophy
- Different target audience

You dont have to invent something new. You have to NAME something that feels new and specific to you.

"We use cold-pressed extraction" sounds more proprietary than "high quality ingredients" even if both are technically true.

The unique mechanism gives skeptical customers a reason to believe THIS TIME will be different.

[LINK]` },

  { topic: 'The Three Canons of Craft - 3 tests every sentence must pass', content: `Found a simple framework for editing copy that immediately made everything I write tighter and more effective.

The Three Canons of Craft - every sentence must pass these tests:

1. IS IT TRUE?
Not technically true. Actually true. Provable. Could you defend this claim if challenged? Remove anything exaggerated or vague.

2. IS IT CLEAR?
Would a 12-year-old understand it? Jargon, complexity, and ambiguity kill clarity. If the reader has to re-read it, rewrite it.

3. IS IT NECESSARY?
Does this sentence move the reader closer to understanding or taking action? If not, delete it. Every word must earn its place.

Most copy fails canon 3. Were so close to our own work that everything feels necessary. Its not.

Try this: Take your product description and cut 30% of the words. Bet the shorter version is better.

The three canons arent about dumbing down your message. Theyre about respecting your readers time and attention.

Truth. Clarity. Necessity. Run every piece of copy through these filters.

[LINK]` },

  { topic: 'The Infinite Money Engine - the one equation that changes everything', content: `Learned about a concept that completely reframed how I think about my ecommerce business.

The Infinite Money Engine: When Lifetime Value exceeds Customer Acquisition Cost by enough margin, you effectively have unlimited money to spend on growth.

Most stores think: "I need to be profitable on the first purchase."

Smart stores think: "I need to be profitable over the customer relationship."

This shift changes everything:
- You can outspend competitors on ads because you know the customer comes back
- You can offer better first-purchase deals to remove friction
- You can play the long game instead of scrambling for immediate ROI

The formula is simple: LTV > CAC

But most people dont actually know their LTV. They guess. They hope. They dont track repeat purchases, email revenue, referral value.

If you know with confidence that each customer is worth $150 over their lifetime, spending $50 to acquire them is easy math. Your competitors spending $20 because theyre only looking at first purchase cant keep up.

Build the engine first. Then growth becomes a math problem, not a guessing game.

[LINK] Changes how you think about every business decision.` },

  { topic: 'The Trust Architecture - how to build credibility systematically', content: `Trust isnt luck. Its architecture. You can systematically build it into every touchpoint.

Learned about a framework called Trust Architecture with different levels:

LEVEL 1: BASIC TRUST
- Professional design (not scammy looking)
- Contact information visible
- SSL certificate
- Basic trust badges

LEVEL 2: SOCIAL PROOF
- Customer reviews (real ones)
- User-generated content
- Number of customers served
- Media mentions if you have them

LEVEL 3: DEMONSTRATED EXPERTISE
- Educational content showing you know your stuff
- Behind-the-scenes of your process
- Detailed product information
- Transparent policies

LEVEL 4: RISK REVERSAL
- Money-back guarantees
- Free returns
- Try before you buy options
- Responsive customer service proof

LEVEL 5: RELATIONSHIP
- Personal connection to founder
- Brand story and values
- Community building
- Two-way communication

Most stores focus only on level 1-2. The ones that dominate build all five levels.

Trust compounds. Each layer makes the next more effective. You cant skip levels.

[LINK]` },

  { topic: 'The Double Bind of Fear - leverage both action AND inaction fears', content: `Powerful persuasion framework: People have two types of fears around any decision - fear of action and fear of inaction.

Fear of ACTION: "What if I buy this and it doesnt work?"
Fear of INACTION: "What if I dont buy this and miss out?"

Most marketing only addresses one. The best marketing addresses both.

For fear of action, offer:
- Money-back guarantees
- Free trials
- Risk reversal
- Social proof from people like them

For fear of inaction, create:
- Urgency (legitimate, not fake)
- Future consequences of staying stuck
- Cost of delay
- FOMO elements

The customer is stuck between two fears. Your job is to make the fear of inaction greater than the fear of action.

"You could try this risk-free for 30 days and finally solve the problem. Or you could spend another month dealing with the same frustration."

Now both fears are working in your favor. The fear of action is minimized (risk-free). The fear of inaction is amplified (another month stuck).

[LINK]` },

  { topic: 'The Four Primal Needs behind every purchase', content: `Every buying decision traces back to one of four primal needs. Once you understand this, you understand why people really buy.

The Four Primal Needs:

1. SURVIVE AND THRIVE
Health, safety, security, financial stability. Products that protect or provide.
"This alarm system keeps your family safe."

2. BELONG AND BE LOVED
Connection, acceptance, relationships, community. Products that help people fit in or connect.
"Join thousands of others who finally found their tribe."

3. ACHIEVE AND DOMINATE
Success, status, winning, being respected. Products that elevate status or demonstrate success.
"The watch worn by leaders who dont follow."

4. EXPERIENCE AND TRANSCEND
Adventure, meaning, purpose, self-actualization. Products that create memories or deeper meaning.
"This isnt a trip. Its the adventure youll tell your grandchildren about."

Your product likely serves multiple needs, but one is dominant. Figure out which one and lead with it.

Selling a meal kit? Could be survive (healthy eating), belong (family dinners), achieve (impressing dinner guests), or experience (culinary adventure). Each angle attracts different customers.

[LINK] Understanding the real motivation behind purchases changes everything.` },

  { topic: 'The F.R.E.D. Method - understanding your audience before you write a word', content: `Before writing any copy, I now run through F.R.E.D. to understand who Im actually talking to.

F - FEARS
What keeps them up at night? What are they afraid will happen if they dont solve this problem? What bad outcomes are they avoiding?

R - RESULTS
What do they actually want to achieve? Not the product features - the end state. What does their life look like after the problem is solved?

E - EXPECTATIONS
What do they expect from a solution like yours? What have they tried before? What experiences shape their assumptions?

D - DESIRES
What do they secretly want but maybe wont admit? The emotional desires beyond the rational ones. Status? Acceptance? Control?

Fill this out before writing anything. Your copy becomes completely different when you understand fears, results, expectations, and desires.

Example for a weight loss product:
- Fears: Health problems, being judged, clothes not fitting
- Results: Energy, confidence, fitting into old jeans
- Expectations: Skeptical because theyve tried everything
- Desires: To feel attractive, to not think about weight anymore

Now you know what to address, what to promise, what objections to handle, and what emotional buttons to push.

[LINK]` },

  { topic: 'The 40/40/20 Rule - the marketing success formula', content: `Simple framework that changed how I prioritize my marketing efforts.

The 40/40/20 Rule:
- 40% of success = WHO you target (audience)
- 40% of success = WHAT you offer (the deal)
- 20% of success = HOW you say it (creative/copy)

Most people obsess over the 20% - tweaking headlines, testing button colors, perfecting ad creative.

But if youre targeting the wrong audience (wrong 40%), no amount of great copy fixes it.

If your offer sucks (wrong 40%), even the perfect audience wont buy.

Practical application:
1. FIRST nail your audience. Who actually wants this? Where are they? What do they already buy?

2. THEN nail your offer. Is it compelling? Is it better than alternatives? Does it feel like a no-brainer?

3. FINALLY optimize your creative. Headlines, images, copy refinement.

This order matters. Ive seen stores obsess over ad copy for months while their fundamental offer was weak. Great copy cant sell a bad offer to the wrong people.

Start with the 40s. The 20 is finishing touches.

[LINK]` },

  { topic: 'The OCPB Formula - the four elements of every high-converting offer', content: `Learned a framework for constructing offers that actually convert.

OCPB = Offer + Copy + Proof + Bonus

OFFER: What are they getting? Make it concrete and valuable.
Not "access to our program" but "the complete 47-video system plus all templates"

COPY: How are you presenting it? Benefits over features, emotional language, clear communication.

PROOF: Why should they believe you? Testimonials, case studies, demonstrations, credentials, social proof.

BONUS: What extra value tips the scale? Strategic bonuses that complement the main offer and add perceived value.

Most weak offers are missing at least one element:
- Great offer with no proof = skepticism
- Great copy with weak offer = no sales
- Great product with no bonus = no urgency to act now

Stack all four and the offer becomes much harder to refuse.

When reviewing any offer, ask: Is the base offer clear and valuable? Is the copy compelling? Is there enough proof? Are there bonuses that add urgency?

[LINK] Use it as a checklist for every offer you create.` },

  { topic: 'The Objection Inversion technique - turn objections into reasons to buy', content: `Counter-intuitive technique: Instead of hiding objections, flip them into selling points.

Objection Inversion takes the exact thing people worry about and reframes it as a benefit.

"Its expensive"
→ "Its an investment that pays for itself in X months"
→ "Premium price reflects premium quality you wont have to replace"
→ "Cheap alternatives cost more in the long run"

"It takes too long"
→ "Good things take time - this isnt a shortcut, its a real solution"
→ "The time invested now saves you years of struggling later"

"I dont have time for this"
→ "Its designed for busy people - only 15 minutes per day"
→ "You dont have time NOT to do this - how much time do you waste on the current problem?"

"What if it doesnt work?"
→ "Thats exactly why we offer a 60-day guarantee - try it risk-free"

The key: Acknowledge the objection directly (dont hide from it), then pivot to why that concern actually supports buying.

This feels more honest than ignoring objections. And honest converts better than evasive.

List your top 5 customer objections. Practice inverting each one. Then weave these inversions into your copy.

[LINK]` },

  { topic: 'The "price anchoring" principle that makes any price feel like a deal', content: `Pricing psychology is fascinating once you understand how it actually works.

Price anchoring: The first number someone sees becomes their reference point for evaluating everything after.

Without an anchor, any price feels arbitrary. Is $49 expensive or cheap? Impossible to say without context.

But when you show "Value: $120" crossed out, then "$49 Today" - suddenly $49 feels like a steal. The $120 anchor gives the brain a comparison point.

Anchoring techniques that work:
- Show competitor prices (if yours is lower)
- Bundle items and show individual prices crossed out
- "Most popular" tier in pricing tables (anchors to higher option)
- "Compare at" pricing from MSRP
- Show the cost of the problem vs cost of your solution

Important caveat: Fake anchors (made up inflated prices) are illegal in many places and destroy trust. Your anchor needs to be defensible - what competitors charge, what the individual items cost separately, what the problem costs over time.

The psychology is simple: People cant evaluate things in isolation. They evaluate relative to reference points. Control the reference point and you control the perception.

[LINK]` },

  { topic: 'The Visual Priming effect - how background images influence buying decisions', content: `Learned about something called visual priming and it completely changed how I think about product photography.

The concept: Background images and environmental cues influence buying decisions before the conscious mind even processes them. People dont realize its happening.

Research shows that wine sells better with a French background vs German background - even when the wine is the same. Cloud imagery behind a product makes people value comfort features more. Wood textures make people value craftsmanship.

The brain is constantly processing visual context and using it to evaluate things.

How to apply this:
- Lifestyle imagery should evoke the emotional state your product creates
- Background textures can signal quality, comfort, adventure, etc.
- Environmental cues prime people for specific benefits
- Consistent visual language creates trust

Most stores treat product photography as "just showing the product." But every visual element is communicating something. The background, lighting, props, colors - all of it shapes perception before the customer reads a single word.

The question to ask: What feeling do you want your customer to have when they see your product? Then design every visual element to evoke that feeling.

[LINK]` },

  { topic: 'The "Rat Brain Hijack" - how to command attention by triggering the subconscious', content: `Learned something fascinating about how the brain processes information that changed my entire approach to marketing.

Theres a part of your brain called the reticular activating system - basically the "gatekeeper" that filters what gets through to conscious awareness. Every second, millions of bits of information compete for attention. The rat brain (subconscious) decides what matters.

Here's the key insight: The rat brain responds to specific triggers:
- YOUR NAME (or anything personalized)
- DANGER signals
- NOVELTY (pattern breaks)
- MOVEMENT
- EMOTION
- SELF-INTEREST

This is why personalization works so well. Your name cuts through noise. Its why "You" is the most powerful word in copywriting - the brain literally perks up when something is about ME.

Practical applications:
- Use personalization wherever possible
- Lead with the customers problem (self-interest)
- Break patterns - dont look like every other ad
- Use movement in ads (video, GIFs)
- Create emotional hooks before logical arguments

Most marketing fails because it never gets past the rat brain gatekeeper. You can have the best offer in the world, but if the subconscious filters it out, the conscious mind never sees it.

[LINK] Once you understand how the brain filters information, you can design marketing that actually gets through.` },

  { topic: 'The "Structural Tension" principle - creating irresistible forward momentum in copy', content: `Learned a concept called structural tension that completely changed how I write landing pages and emails.

The idea: Create a gap between where the reader is and where they want to be. Then maintain that tension until the resolution (your CTA).

Think of it like a movie. The beginning establishes a problem or desire. The middle builds tension. The end resolves it. If you resolve the tension too early, people leave. If you never create tension, people are bored.

In copywriting this means:
- Open a loop early (pose a question, hint at something coming)
- Dont close it immediately
- Keep stacking tension as you go
- Only resolve with your CTA

Bad copy: "Here's our product. It does X. Buy it."

Good copy: "Theres one mistake killing most stores... (keeps reading)... and most people never figure it out because... (keeps reading)... but those who do discover this one change..."

The reader feels tension. They NEED the resolution. Stopping feels uncomfortable.

This is why cliffhangers work. Why people binge Netflix. Why some sales pages feel impossible to leave.

Structural tension creates forward momentum. Without it, people can leave at any point with no consequence.

[LINK]` },

  { topic: 'The "Self-Persuasion Architecture" - let prospects convince themselves to buy', content: `Most marketing tries to convince people. Theres a better approach: Let them convince themselves.

Self-persuasion is significantly more powerful than external persuasion because people dont resist their own conclusions. When I tell you something, you might push back. When you realize it yourself, its your truth.

How to architect self-persuasion:

1. ASK QUESTIONS INSTEAD OF MAKING STATEMENTS
"Have you noticed how tired you feel by 3pm?" works better than "You feel tired by 3pm."
Questions make them think and arrive at the answer themselves.

2. USE QUIZZES AND ASSESSMENTS
When someone takes a quiz and discovers they have a problem, they own that discovery. Theyre not being told - theyre learning about themselves.

3. SHOW, DONT TELL
Demonstrations, before/after comparisons, case studies. Let them draw conclusions from evidence rather than claims.

4. TESTIMONIALS FROM PEOPLE LIKE THEM
When they see someone similar succeed, they think "if they can do it, so can I" - thats self-persuasion.

5. LET THEM OBJECT AND OVERCOME
Address objections by helping them work through it, not by dismissing it. "I thought that too, and then I realized..."

The goal is to be a guide, not a salesperson. Help them reach the conclusion themselves.

[LINK]` },

  { topic: 'The "Digital Velvet Rope Effect" - why password-protected pages create explosive desire', content: `Learned about something called the Digital Velvet Rope Effect and it blew my mind.

The psychology: When something is restricted, exclusive, or hidden, desire for it increases dramatically. This is reactance theory - we want what we cant have.

Examples of this in action:
- Supreme drops that sell out instantly (artificial scarcity + exclusivity)
- Members-only sections of websites
- Password-protected product pages
- Invite-only access
- Hidden menus at restaurants

The velvet rope signals: "This is valuable. Not everyone can have it."

How to apply it ethically:

1. VIP ACCESS
Early access to new products for email subscribers or repeat customers. Creates real exclusivity.

2. UNLOCKABLE CONTENT
Product pages that require some action to view - sign up, answer a quiz, complete a challenge.

3. MEMBER BENEFITS
Things only your paying customers or subscribers can access.

4. LIMITED EDITIONS
Products that genuinely go away and dont come back.

The key is that the exclusivity must be REAL. Fake velvet ropes (everyone gets in anyway) destroy the effect. But genuine exclusivity creates powerful desire.

[LINK]` },

  { topic: 'The "Familiar Surprise Secret" - the MAYA principle for products that sell', content: `Learned about something called the MAYA principle that explains why some products take off and others flop.

MAYA = Most Advanced Yet Acceptable

The idea: People are drawn to things that are novel enough to be interesting but familiar enough to feel safe. Too familiar = boring. Too novel = scary. The sweet spot is in between.

This explains so much:
- Why the iPod succeeded when other MP3 players didnt (familiar "1000 songs" concept, novel design)
- Why Uber worked (familiar taxi concept, novel app interface)
- Why some products feel "ahead of their time" and fail

The psychology is simple: We want novelty (its exciting) but we also want safety (its comfortable). Products that nail both feel "surprisingly familiar" or "familiarly surprising."

How to apply it:

1. ANCHOR TO SOMETHING KNOWN
"Its like Airbnb for X" works because you anchor to familiar, then add novelty.

2. FAMILIAR FORMAT, NOVEL CONTENT
Use patterns people recognize (product pages, checkout flows) but make the product/offer unique.

3. NOVEL FORMAT, FAMILIAR PROMISE
New delivery method for an old desire works well.

4. REFERENCE THE FAMILIAR THEN TWIST
"You know how most skincare does X? This does the opposite."

[LINK] Understanding this balance between novelty and familiarity is incredibly valuable for positioning products.` },

  { topic: 'The "Red Button Effect" - why forbidden things create irresistible desire', content: `There's a psychological phenomenon that explains why "forbidden" products sell so well.

Its called psychological reactance. When you tell someone they CANT have something, they want it MORE. Its the "dont push the red button" effect.

Think about it:
- Prohibition made alcohol more desirable
- Banned books become bestsellers
- "Members only" creates desire in non-members
- "Limited to 100 units" triggers buying

The psychology: We value our freedom of choice. When that freedom is threatened (you cant have this), we react by wanting it MORE to restore our sense of autonomy.

How to use this ethically:

1. LIMITED ACCESS
"Only available to subscribers" or "Must be logged in to view"

2. RESTRICTED QUANTITIES
Real limits, not fake ones. When genuinely limited, desire increases.

3. EXCLUSIVE INFORMATION
"What the industry doesnt want you to know"

4. QUALIFICATION
"This isnt for everyone - only people who X should apply"

5. ANTI-SELLING
"Please dont buy this unless you're serious" paradoxically increases desire.

The key is authenticity. Real restrictions work. Fake ones backfire when discovered.

[LINK]` },

  { topic: 'The "Forbidden Coffee Hook" - storytelling that makes products irresistible', content: `Learned a storytelling framework that transforms boring products into must-have items.

The concept: Instead of describing WHAT your product is, tell the story of WHERE it comes from or WHO its for. Create a narrative that makes the product feel special.

Example transformation:
BORING: "Brazilian coffee blend, medium roast, smooth flavor"
COMPELLING: "For centuries, Amazonian warriors brewed this forbidden bean before battle. The Portuguese tried to ban it. The church called it the devils drink. Now you can have it delivered to your door."

Same coffee. Completely different desire level.

This works because:
- Stories bypass the analytical brain
- Origin creates perceived value
- "Forbidden" or "secret" triggers curiosity
- Connection to history or culture adds meaning

Framework for creating product stories:

1. FIND THE ORIGIN
Where does it come from? Whats the history?

2. WHO USED IT FIRST?
Warriors? Royalty? Monks? A small village?

3. WHAT MADE IT SPECIAL?
Banned? Secret? Rare? Mysterious?

4. WHY CAN THEY GET IT NOW?
What changed that makes this accessible?

You can apply this to almost any product. The exercise forces you to find the story, and every product has one if you dig deep enough.

[LINK] This transforms how you write about products.` },

  { topic: 'The "Blind Spot Effect" - what your prospects cant see about themselves', content: `Learned about a psychological principle that changed how I write copy forever.

The Blind Spot Effect: People often cant see their own problems clearly. They know something is wrong, but they cant articulate exactly what. Or they misattribute the cause.

For example:
- Someone thinks theyre tired because of coffee withdrawal
- Actually theyre dehydrated
- They buy more coffee
- Problem gets worse

Your job in copywriting is to DIAGNOSE for them. Show them what they cant see about their own situation.

This is incredibly powerful because when you accurately describe someones problem better than they can describe it themselves, two things happen:

1. They feel understood ("finally someone gets it")
2. They trust you have the solution (you clearly understand the problem)

How to do this:

1. RESEARCH DEEPLY
Talk to customers. Read reviews. Understand the problem at a level they dont.

2. DESCRIBE THEIR BLIND SPOT
"You think the problem is X, but actually the real issue is Y"

3. CONNECT THE DOTS
Show them the cause and effect they havent seen.

4. PRESENT YOUR SOLUTION
Now that they understand the real problem, your solution makes sense.

This is why the best marketing feels like a revelation. Youre showing people something true about themselves that they couldnt see.

[LINK] Master this and your copy becomes incredibly persuasive.` },

  { topic: 'The "Unity Principle" - one word change that turns customers into partners', content: `Learned about something called the Unity Principle that completely changed how I think about customer relationships.

The concept: People are dramatically more likely to say yes to people they consider "one of us" - same tribe, same group, same identity.

Heres the shift: Instead of talking to customers like theyre outsiders, talk to them like theyre part of your tribe.

The magic word is "WE."

"We all know what its like to..." vs "You know what its like to..."

"As fellow entrepreneurs, we understand..." vs "Our customers understand..."

"Were in this together" vs "Were here to help you"

Why it works:
- Creates in-group feeling
- Reduces psychological distance
- Builds trust through shared identity
- Makes the relationship feel collaborative, not transactional

Examples in practice:
- Harley Davidson riders are a tribe ("were riders")
- Apple users feel like members of a movement
- CrossFit created an entire identity around the practice

You dont need to be Harley Davidson. You just need to identify the shared identity you have with your customers and speak to that.

What do you and your customers have in common? What struggle do you share? What values? What enemy?

Lead with that shared identity and everything changes.

[LINK] This subtle shift transforms customer relationships.` },

  { topic: 'The "Emotion Spectrum" - mapping the full range of persuasive emotions', content: `Most marketers think of emotions as "positive" or "negative." But theres a much more useful way to think about it.

The Emotion Spectrum maps emotions across two dimensions:
1. ACTIVATION (high energy vs low energy)
2. VALENCE (positive vs negative)

This gives you four quadrants:

HIGH ACTIVATION + POSITIVE
Excitement, enthusiasm, eagerness
Best for: Launches, limited offers, new products

HIGH ACTIVATION + NEGATIVE
Anger, fear, urgency
Best for: Problem agitation, scarcity, FOMO

LOW ACTIVATION + POSITIVE
Contentment, trust, comfort
Best for: Testimonials, reassurance, brand building

LOW ACTIVATION + NEGATIVE
Sadness, disappointment, regret
Best for: Cost of inaction, missed opportunities

The insight: Match your emotional trigger to your goal. If you want immediate action, you need high activation emotions. If you want trust-building, you need low activation emotions.

Most marketing gets this wrong:
- They try to create urgency (high activation) while also building trust (low activation) - doesnt work
- They use fear to sell (high activation negative) then wonder why customers feel buyers remorse

Understand the emotion spectrum and you can deliberately engineer emotional journeys.

[LINK]` },

  { topic: 'The "Persuasion Stack" - layered techniques that build upon each other', content: `Learned about something called the Persuasion Stack that completely changed how I structure marketing.

The concept: Persuasion elements arent standalone. They build upon each other in a specific order, like layers in a pyramid. Each layer makes the next more effective.

The Stack (bottom to top):

FOUNDATION: ATTENTION
Without attention, nothing else matters. You need pattern interrupts, novelty, relevance.

LAYER 1: TRUST
Once you have attention, establish credibility. Social proof, authority, consistency.

LAYER 2: EMOTION
Trust opens them to emotional connection. Now you can create desire, fear, hope.

LAYER 3: LOGIC
Emotion decides, logic justifies. Provide the rational reasons to support the emotional decision.

LAYER 4: ACTION
All previous layers lead here. Clear CTA, urgency, friction removal.

The mistake most people make: They jump straight to Layer 4 (BUY NOW!) without building the foundation. Or they focus on logic (features, specs) without creating emotional connection first.

When marketing fails, the problem is usually a weak lower layer:
- No attention = nothing else matters
- No trust = emotions feel manipulative
- No emotion = logic alone doesnt convert
- No logic = buyers remorse and returns

Build the stack in order. Each layer supports the next.

[LINK] This framework becomes a diagnostic tool for fixing underperforming marketing.` },

  { topic: 'The "Three Levels of Change" - transform behavior, beliefs, and identity', content: `Learned a framework about customer transformation that goes beyond surface-level marketing.

There are three levels of change a product can create:

LEVEL 1: BEHAVIOR CHANGE
"Do this differently"
Example: Use our app to track your spending
Shallowest level. Easy to adopt but easy to abandon.

LEVEL 2: BELIEF CHANGE
"Think about this differently"
Example: Budgeting isnt about restriction - its about freedom
Deeper. Changes how they see the problem.

LEVEL 3: IDENTITY CHANGE
"Become someone different"
Example: Become the kind of person who is financially free
Deepest. They see themselves differently.

The insight: Products that only address Level 1 have the most churn. Products that reach Level 3 create evangelists.

How to apply this:

Dont just sell the behavior ("use our product")
Sell the belief shift ("the old way doesnt work because...")
Sell the identity transformation ("become the kind of person who...")

Nike doesnt sell shoes. They sell the identity of being an athlete.
Apple doesnt sell computers. They sell the identity of being a creative rebel.

Your product enables something. But WHO does your customer become after using it?

Lead with identity transformation and behavior change follows naturally.

[LINK] This shifts everything about how you position products.` },

  { topic: 'The "CPPPB Proof Loop" - five elements for bulletproof persuasion', content: `Learned a framework for building unshakeable proof into your marketing that most people completely miss.

CPPPB stands for:

C - CREDIBILITY
Establish your expertise. Why should they listen to you? Credentials, experience, track record.

P - PROOF
Evidence that your claims are true. Data, case studies, before/after, demonstrations.

P - PRECISION
Specific details that make claims believable. "Lost 23 pounds" beats "lost weight." Specificity implies truth.

P - PROCEDURAL
Show HOW it works. The mechanism. People trust what they understand. Black boxes create suspicion.

B - BELIEVABILITY
Does it pass the "too good to be true" test? Outrageous claims without proof trigger skepticism.

The Loop: Each element reinforces the others. Credibility makes proof believable. Precision makes claims credible. Procedure makes results understandable.

Most marketing fails because it makes big claims with no proof. Or shows proof without explaining the procedure. Or is precise about results but vague about how.

Check your marketing against CPPPB:
- Where is your credibility established?
- What proof supports each claim?
- Are you specific enough?
- Do you explain how it works?
- Would a skeptical person believe this?

Fill the gaps. Watch persuasion improve.

[LINK] This becomes a checklist for evaluating any marketing piece.` },

  { topic: 'The "Emotional Precision" principle - targeting the exact emotions that drive action', content: `Learned about emotional precision and realized most marketing is far too vague with emotional targeting.

The concept: Different emotions drive different actions. Generic "positive" or "negative" isnt precise enough. You need to target SPECIFIC emotions that align with your desired outcome.

Examples:

FEAR drives avoidance and urgent action
ANGER drives taking a stand and fighting back
CURIOSITY drives exploration and clicking
HOPE drives taking a chance
PRIDE drives sharing and displaying
GUILT drives compensating behavior
BELONGING drives joining and participating

Most marketing tries to create generic "excitement." But excitement about what? Toward what action?

The precision framework:

1. IDENTIFY THE DESIRED ACTION
What do you want them to do? Click? Buy? Share? Comment?

2. WHAT EMOTION DRIVES THAT ACTION?
Different actions require different emotional states.

3. WHAT STIMULUS CREATES THAT EMOTION?
What words, images, scenarios trigger that specific feeling?

4. VALIDATE IT ACTUALLY WORKS
Does your target audience respond the way you expect?

Examples of precision:
- Want shares? Trigger pride or anger
- Want clicks? Trigger curiosity
- Want immediate purchase? Trigger fear of loss
- Want long-term loyalty? Trigger belonging

Vague emotional appeals create vague results. Precise emotional targeting creates predictable outcomes.

[LINK]` },

  { topic: 'The "Architecture of Belief" - three levels of mastery in persuasion', content: `Learned a framework that explains why some marketing is forgettable and other marketing is transformative.

The Architecture of Belief has three levels:

LEVEL 1: THE HOOK (Surface)
This is where most marketing lives. Headlines, attention-grabbers, clever angles.
Important, but insufficient on its own. Hooks create curiosity, not conviction.

LEVEL 2: THE STRATEGY (Structure)
The logical flow of your argument. Problem → Solution → Proof → Action.
This is where you build the case. But logic alone doesnt convert.

LEVEL 3: THE PSYCHOLOGY (Foundation)
Understanding WHY people believe, what blocks belief, and how to facilitate genuine conviction.
This is where lasting influence happens.

The insight: Most marketers operate only at Level 1 and 2. They have good hooks and logical arguments. But they dont understand the psychological foundations of belief.

Level 3 questions:
- What would they need to believe for this to make sense?
- What beliefs currently block them?
- How do people actually change their minds?
- What makes something feel true vs just logically sound?

When you master Level 3, Levels 1 and 2 become much easier. You understand the deeper game.

Example: Someone selling weight loss doesnt just need a good headline (L1) and logical benefits (L2). They need to understand the identity beliefs around weight, the shame, the fear of failure, the desire for hope vs fear of disappointment (L3).

[LINK] This elevates marketing from tactics to genuine understanding.` },

  { topic: 'The "Sales Message Anatomy" - dissecting what makes copy actually convert', content: `Learned to look at sales copy like a surgeon looks at anatomy. Every element has a purpose.

The anatomy of a high-converting sales message:

HEAD (Headline + Subheadline)
Purpose: Stop the scroll, identify the reader, promise a benefit
Without it: Nobody reads further

HEART (Opening + Problem)
Purpose: Create emotional connection, show you understand their pain
Without it: Reader feels like a transaction, not understood

SPINE (Solution + Mechanism)
Purpose: Present your answer and explain WHY it works
Without it: Claims feel hollow, skepticism rises

MUSCLES (Benefits + Proof)
Purpose: Stack value and provide evidence
Without it: Desire fades, objections win

HANDS (Offer + CTA)
Purpose: Tell them exactly what to do and what they get
Without it: Confusion, no action

Each part serves a specific function. Miss one and the message fails.

Diagnostic questions:
- HEAD: Would my ideal customer feel called out by this headline?
- HEART: Am I describing their problem better than they can?
- SPINE: Is the mechanism believable and clear?
- MUSCLES: Is there enough proof for each benefit claimed?
- HANDS: Is the next step crystal clear?

When copy underperforms, the problem is usually an anatomical gap. Find it, fix it.

[LINK]` },

  { topic: 'The "Master Key Framework" - first-principles guide to copy that converts', content: `Learned a first-principles framework for copywriting that strips away all the complexity.

The Master Key: Every piece of persuasive copy answers ONE question in ONE way for ONE person.

ONE QUESTION
What is the single most important question in your readers mind right now?
Not all their questions. THE question. The one that, if answered, unlocks everything else.

ONE WAY
What is the single most compelling answer to that question?
Not all the benefits. THE answer. The one that makes everything else obvious.

ONE PERSON
Who is the single person youre writing this for?
Not your whole audience. ONE person. Name them. Know their exact situation.

The framework in practice:

Step 1: Define your ONE PERSON in extreme detail
Step 2: Identify THE question keeping them stuck
Step 3: Craft THE answer that changes everything

Example:
- ONE PERSON: Sarah, 32, struggling to get first 10 customers
- ONE QUESTION: "Am I wasting time on something that wont work?"
- ONE WAY: "Heres how to validate before you build"

When you nail all three, copy almost writes itself. When you try to serve multiple people, answer multiple questions, or offer multiple solutions - everything gets muddy.

Simplify ruthlessly. [LINK] This is the foundation everything else builds on.` },

  { topic: 'The "Copywriters Codex" - a synthesized playbook from the masters', content: `Spent months studying the classic copywriters - Ogilvy, Hopkins, Halbert, Schwartz. Found patterns that kept repeating.

The Copywriters Codex - the distilled principles they all agreed on:

1. RESEARCH FIRST, WRITE SECOND
Know your customer better than they know themselves. The best copy comes from deep understanding, not clever wordplay.

2. ONE BIG IDEA
Every great campaign is built on a single powerful idea. Not multiple good ideas. One big one.

3. SPECIFICITY BEATS GENERALITY
"Lost 23 pounds in 47 days" beats "lose weight fast." Details create believability.

4. ENTER THE CONVERSATION ALREADY IN THEIR HEAD
Dont introduce new topics. Join the existing mental dialogue about their problem.

5. BENEFITS, NOT FEATURES
What does it DO for them? Not what IS it.

6. PROOF EVERY CLAIM
The more outrageous the claim, the more proof required. Build a court case.

7. MAKE IT EASY TO SAY YES
Remove friction, reverse risk, simplify the path.

8. WRITE LIKE YOU TALK
Formal writing creates distance. Conversational writing creates connection.

These principles havent changed in 100+ years. Tactics change. Platforms change. Human psychology doesnt.

Every piece of copy I write now gets checked against the Codex. Where am I missing a principle?

[LINK] Standing on the shoulders of giants beats reinventing the wheel.` },

  { topic: 'The "Science of Selling" - the systematic approach to conversion', content: `Learned about treating selling as a science rather than an art. Changed everything.

The science of selling has three core principles:

1. SYSTEMATIC TESTING
Dont guess what works. Test. Create hypotheses, run experiments, measure results.
A/B test headlines, offers, creative. Let data decide.

2. UNDERSTANDING CAUSE AND EFFECT
When something works, understand WHY. When it fails, understand WHY.
Correlation isnt causation. Dig deeper than surface metrics.

3. REPLICATION
Can the result be replicated? If you found something that works, can you do it again?
One-off wins might be luck. Repeatable wins are science.

The scientific method for marketing:
- OBSERVE: What are customers doing? Where are they dropping off?
- HYPOTHESIZE: Why might this be happening? What might fix it?
- TEST: Run an experiment with one variable changed
- ANALYZE: Did it work? Why or why not?
- ITERATE: Apply learnings, form new hypothesis

Most marketers treat marketing like gambling. They try random things and hope something sticks. Scientific marketers build systems for consistent improvement.

The difference: Gamblers have hot streaks and cold streaks. Scientists compound gains over time.

[LINK] This makes marketing feel less like guessing and more like engineering.` },

  { topic: 'The "Persuasion Blueprint" - the master architectural plan for influential copy', content: `Learned about structuring persuasion like an architect structures a building. Every element has a purpose and position.

The Persuasion Blueprint:

FOUNDATION (Before they read)
- Who am I talking to? (Audience clarity)
- What do they already believe? (Starting point)
- What do I want them to do? (End goal)

ENTRANCE (First impression)
- Pattern interrupt to stop the scroll
- Headline that identifies and qualifies
- Promise that creates curiosity

MAIN HALL (The journey)
- Problem amplification (make the pain vivid)
- Dream outcome (make the desire vivid)
- Solution introduction (bridge the gap)
- Mechanism explanation (why this works)
- Proof stacking (evidence it works)

CLOSING (The decision point)
- Offer presentation (what they get)
- Objection handling (remove barriers)
- Call to action (clear next step)
- Risk reversal (remove fear)

The insight: Most marketing fails because of architectural problems, not copy problems. Great sentences in a bad structure wont convert. Average sentences in a great structure will.

Before writing anything, I now sketch the blueprint:
- Where does each element go?
- What purpose does it serve?
- How does each piece connect to the next?

[LINK] Structure first, then words.` },

  { topic: 'Why "The Highest CPA Wins" in Google Ads - counterintuitive truth', content: `Learned something about Google Ads that completely flipped my thinking.

The highest CPA wins.

Wait, isnt the goal to get the LOWEST cost per acquisition? Technically yes. But heres the counterintuitive truth:

If your LTV is higher than competitors, you can AFFORD a higher CPA. And if you can afford a higher CPA, you can bid more aggressively. And if you bid more aggressively, you win more auctions and get more customers.

The math:
- Competitor LTV: $80, can afford $25 CPA
- Your LTV: $150, can afford $50 CPA
- You can outbid them on every auction
- They literally cannot compete

The implication: The battle isnt won in ad accounts. Its won in business model design.

Focus on:
- Increasing LTV through retention
- Backend offers that increase value per customer
- Reducing refunds
- Creating repeat purchase incentives

When your unit economics are better, advertising becomes easier. You can win auctions others cant afford.

Most people try to optimize their way to lower CPA. Smart operators build businesses that can afford higher CPA.

[LINK] It reframes the entire game of paid advertising.` },

  { topic: '"Your Product Feed IS Your Ad" - the hidden weapon for Google Shopping', content: `Learned something about Google Shopping that most people completely miss.

Your product feed isnt just administrative data. Its your ad.

Google Shopping doesnt show your ad creative. It shows your product feed data:
- Product title
- Product image
- Description
- Price

This means feed optimization is creative optimization.

The framework for feed optimization:

TITLES
Front-load keywords. Be specific. Include attributes people search for.
Bad: "Comfortable Running Shoe"
Good: "Nike Air Zoom Running Shoes - Men's Black Size 10 Lightweight"

IMAGES
White background, high quality, show the full product.
Mobile-first (most shopping happens on mobile).

DESCRIPTIONS
Include keywords naturally. Describe benefits not just features.

PRICE
Be competitive. Google compares you to everyone else.

Additional feed attributes that matter:
- GTINs (global trade numbers)
- Product categories
- Custom labels for segmentation

Most advertisers focus on bid strategy and audience targeting. But if your feed is weak, no amount of optimization helps. Garbage in, garbage out.

Think of feed optimization as ad creative optimization. Same importance.

[LINK] Completely changed how I approach Shopping campaigns.` },

  { topic: 'The "PMax Asset Group Blueprint" - stop forcing Google AI to guess', content: `Learned about structuring Performance Max campaigns in a way that actually helps the algorithm instead of confusing it.

Most people throw everything into PMax and hope Google figures it out. The Asset Group Blueprint gives structure.

The concept: Each asset group should represent ONE clear intent or audience segment.

BAD STRUCTURE:
- One asset group with all products
- Mixed audiences and intents
- Google AI has to guess who wants what

GOOD STRUCTURE:
- Asset group 1: Best sellers for cold traffic
- Asset group 2: Sale items for deal seekers
- Asset group 3: New arrivals for existing customers
- Each with tailored creative and signals

For each asset group:

AUDIENCE SIGNALS
Give Google hints about who this is for. Custom segments, remarketing lists, demographics.
Theyre signals, not hard targeting - but they help AI learn faster.

CREATIVE ASSETS
Match the creative to the intent. Deal seekers see sale messaging. New customers see social proof.
15+ images, 5+ headlines, 5+ descriptions minimum.

PRODUCT FEED
Use custom labels to control which products show in which asset group.
Segment by margin, popularity, category.

The insight: PMax isnt a black box if you structure it well. You can guide the AI without fighting it.

[LINK] This made my campaigns actually make sense.` },

  { topic: 'The "Negative Keyword Colander" - filter out waste, keep only profitable clicks', content: `Learned a framework for negative keywords that completely changed how I think about Google Ads.

Think of your campaign like a colander filtering pasta. Water goes through (wasted ad spend). Pasta stays (profitable clicks).

The Negative Keyword Colander has three layers:

LAYER 1: UNIVERSAL BLOCKERS
Keywords that almost never convert for anyone:
- free, cheap, DIY, reddit, how to make
- Jobs, careers, employment
- Reviews, comparison, vs (research intent)
- Scam, legit, problems

LAYER 2: INDUSTRY-SPECIFIC BLOCKERS
Keywords irrelevant to YOUR business:
- Wrong geographies
- Wrong product types
- Wrong customer segments
- Wrong price points

LAYER 3: DATA-DRIVEN BLOCKERS
Keywords that SEEMED good but dont convert for YOU:
- Search terms that get clicks but no sales
- Keywords with high impression share but low CTR
- Anything with spend but zero conversions

How to build your colander:

1. Start with universal blockers (prevents early waste)
2. Add industry blockers (prevents irrelevant traffic)
3. Review search terms weekly
4. Add any term that spends without converting

The goal: Every click that makes it through your colander should be a potential customer.

[LINK] This should be the first thing you set up in any search campaign.` },

  { topic: '"Better Data In, Better AI Out" - the quality edge in Google Ads 2026', content: `Realized something about Google Ads AI that most people miss: The algorithm is only as good as the data you feed it.

Better Data In = Better AI Out

Most advertisers focus on optimizing the algorithm settings. Smart advertisers focus on optimizing the data inputs.

Data quality areas that matter:

1. CONVERSION TRACKING
Are you tracking the RIGHT conversions? Purchase only, or also add-to-cart? Phone calls? Store visits?
The algorithm optimizes for what you tell it. Tell it the wrong things, get wrong results.

2. CONVERSION VALUE
Are you sending accurate value data? Dynamic values based on actual order amounts?
The algorithm can optimize for profit margin if you give it profit data.

3. ATTRIBUTION MODEL
Which attribution model feeds your data? First-click, last-click, data-driven?
This shapes how the algorithm understands customer journeys.

4. AUDIENCE SIGNALS
Are you giving the algorithm quality audience data to learn from?
Customer lists, website visitors, converters - all help AI learn faster.

5. OFFLINE CONVERSION IMPORT
Do you import real business outcomes back into Google?
Return rates, actual LTV, lead quality scores.

The insight: Your competitors can use the same bidding strategies. They cant use your data.

Data quality is a moat. Better data = better performance = more efficient spend = winning.

[LINK] Its the competitive advantage most advertisers ignore.` },

  { topic: 'The "Velocity Advantage" - why speed is the biggest unfair advantage', content: `Learned about something called the Velocity Advantage that changed how I prioritize.

The concept: Speed compounds. Faster iteration means more learning cycles. More learning cycles means better decisions. Better decisions means better outcomes.

Two entrepreneurs start with the same idea:
- Entrepreneur A launches in 2 weeks, iterates weekly
- Entrepreneur B "prepares" for 3 months, launches "perfect"

After 3 months:
- A has gone through 12 iteration cycles
- B is just starting their first

A has learned what works, what doesnt, what customers actually want. B has theories and assumptions.

The Velocity Advantage applies everywhere:
- Product testing (more tests = faster learning)
- Creative testing (more variations = faster winners)
- Pricing experiments (more tests = better optimization)
- Customer feedback (faster collection = faster improvement)

Most people optimize for quality. Smart people optimize for velocity, knowing that quality emerges from iteration.

The key insight: Good today beats perfect next month. Ship fast, learn fast, improve fast.

Perfectionism is velocity's enemy. Analysis paralysis is velocity's enemy. Waiting until you're "ready" is velocity's enemy.

Move fast. Break things. Fix them. Move faster.

[LINK] Speed might be the most underrated competitive advantage.` },

  { topic: 'The "3x Threshold" - the equation that separates struggling stores from profitable ones', content: `Learned about something called the 3x Threshold that finally made sense of why some stores print money while others struggle.

The concept: Your Lifetime Value needs to be at least 3x your Customer Acquisition Cost.

LTV ≥ 3x CAC

Why 3x specifically?

- 1x CAC: You break even. No profit, no growth money.
- 2x CAC: You have thin margins. One bad month breaks you.
- 3x CAC: You have room for profit AND reinvestment.
- 4x+ CAC: You can scale aggressively.

This single equation determines whether you can afford to grow.

Below 3x:
- Every ad campaign feels risky
- Cash flow is tight
- Growth means stress

Above 3x:
- Ad campaigns are math problems, not gambles
- Cash flow compounds
- Growth feels safe

How to improve your ratio:

INCREASE LTV:
- Email marketing (repeat purchases)
- Subscriptions
- Upsells and cross-sells
- Higher prices with better positioning
- Reducing refunds

DECREASE CAC:
- Better targeting
- Better creative
- Better landing pages
- Organic traffic
- Referrals

The 3x Threshold is the first thing to check when something isnt working. Usually its a ratio problem, not a tactics problem.

[LINK]` },

  { topic: 'The "Leverage Equation" - stop working harder, start working smarter', content: `Learned about something called the Leverage Equation that completely changed how I think about effort vs results.

The concept: Effort × Leverage = Results

Most people try to improve results by increasing effort. Work harder, work longer, do more.

Smart people improve results by increasing leverage. Same effort, bigger results.

Types of leverage:

1. CAPITAL LEVERAGE
Money working for you. Ads that bring in customers while you sleep.

2. CODE/TECHNOLOGY LEVERAGE
Software doing work thousands of times. One automation saves hours daily.

3. PEOPLE LEVERAGE
Other humans multiplying your effort. Each team member is a multiplier.

4. MEDIA LEVERAGE
Content that works forever. One video watched by thousands. One post seen by millions.

The math:
- 10 hours × 1x leverage = 10 units of output
- 10 hours × 10x leverage = 100 units of output
- Same effort. 10x results.

How to increase leverage:

1. Document and delegate (people leverage)
2. Automate repetitive tasks (code leverage)
3. Create content that compounds (media leverage)
4. Invest profit into ads (capital leverage)

The trap is thinking you need to work harder. Usually you need more leverage.

Every hour spent increasing leverage is worth ten hours of direct work.

[LINK] This framework forces you to think about multipliers, not just effort.` },

  { topic: 'The "Counter-Position Strategy" - create a battlefield where giants cant win', content: `Learned about something called the Counter-Position Strategy that explains how small brands beat massive competitors.

The concept: Instead of competing where big players are strong, create a battlefield where their strengths become weaknesses.

Classic example: Dollar Shave Club vs Gillette

Gillette's strengths:
- Massive distribution network
- Brand recognition
- Premium positioning

DSC's counter-position:
- Direct-to-consumer (distribution network worthless)
- Anti-establishment brand (mainstream recognition is actually a liability)
- Value positioning (premium pricing is a weakness)

Gillette COULDNT respond without undermining their existing business. Thats a true counter-position.

How to find your counter-position:

1. IDENTIFY INCUMBENT STRENGTHS
What are they best at? Where do they dominate?

2. FLIP EACH STRENGTH
How could that strength become a weakness?
- Scale → bureaucracy
- Premium → out of touch
- Mainstream → generic
- Distribution → middle-man cost

3. BUILD AROUND THE FLIP
Make your business dependent on the opposite of their strength.

If you compete directly against giants, you lose. If you counter-position, they literally cannot respond without destroying what made them successful.

[LINK] This is how underdogs win.` },

  { topic: 'The "Market Awareness Sweet Spot" - where to find the best opportunities', content: `Learned about something called the Market Awareness Sweet Spot that helps identify the best business opportunities.

The concept: Markets exist on a spectrum from "unaware" to "most aware." Different spots on the spectrum require completely different marketing approaches.

THE SPECTRUM:

1. UNAWARE
Dont know they have a problem.
Very hard to reach. Expensive education required.

2. PROBLEM AWARE
Know they have a problem, dont know solutions exist.
Great opportunity - you introduce the solution category.

3. SOLUTION AWARE
Know solutions exist, dont know your specific product.
Competitive but clear value proposition wins.

4. PRODUCT AWARE
Know your product, havent purchased yet.
Focus on conversion, objection handling.

5. MOST AWARE
Customers who know and trust you.
Easiest to sell - focus on offers and upsells.

THE SWEET SPOT: Problem Aware

Why? They:
- Feel the pain (motivated)
- Dont know solutions exist (not comparing you to competitors)
- Are grateful when you show them the way (instant trust)

How to find problem-aware markets:
- Look for people complaining about problems without mentioning solutions
- Find gaps where problems are discussed but products arent recommended
- Create content that names the problem clearly

[LINK] Understanding where your market sits on this spectrum changes your entire approach.` },

  { topic: 'The "Barbell Strategy" - 5% big swings, 95% small wins', content: `Learned about something called the Barbell Strategy that changed how I allocate time and money in business.

The concept: Avoid the middle. Put most of your resources (95%) into safe, reliable activities. Put a small portion (5%) into high-risk, high-reward bets.

Why the middle is dangerous:
- Medium-risk activities have medium returns
- You take on significant risk without transformative upside
- You end up "okay" at everything but great at nothing

The barbell approach:

95% SAFE SIDE:
- Proven products that sell
- Ad campaigns that work
- Processes that are reliable
- Cash reserves
- Core business operations

5% AGGRESSIVE SIDE:
- Wild product experiments
- Crazy marketing ideas
- New market tests
- Big creative bets
- Potential game-changers

If your 5% fails: You lose 5%. Survivable.
If your 5% succeeds: Could 10x your business.

If you risk 50% on medium-risk medium-reward things and they fail, you're crippled. The middle is the danger zone.

Practical application:
- Most of your ad budget goes to winners
- Small portion tests weird new things
- Most of your time goes to proven activities
- Small portion tries breakthrough experiments

[LINK] This changed how I think about risk allocation.` },

  { topic: 'The "One-Pager Blueprint" - kill shiny object syndrome with 4 questions', content: `Learned about something called the One-Pager Blueprint that finally cured my shiny object syndrome.

The concept: Answer 4 questions on one page. This becomes your North Star. Every decision gets measured against it.

THE 4 QUESTIONS:

1. WHO IS YOUR CUSTOMER?
Be specific. Not "people who want to lose weight."
"35-45 year old moms who have tried diets but failed because they dont have time to cook separate meals for themselves."

2. WHAT IS THEIR BIGGEST PROBLEM?
The ONE problem you solve. Not multiple problems. The core issue that drives everything else.

3. WHAT IS YOUR UNIQUE SOLUTION?
How do YOU solve it differently? Not just "my product does X" but why YOUR approach is different from alternatives.

4. WHAT DOES SUCCESS LOOK LIKE?
Specific, measurable outcomes. What transformation do they experience?

Once you have this one-pager:
- New product idea? Does it serve THIS customer?
- New marketing channel? Does it reach THIS customer?
- New feature request? Does it solve THIS problem?
- Shiny object temptation? Does it support THIS mission?

If the answer is no, skip it. If the answer is yes, pursue it.

The one-pager becomes your filter. Everything passes through it. Shiny objects get caught. Aligned opportunities get through.

[LINK] This single exercise saved me from countless distractions.` },

  { topic: 'The "Infinite Money Loop" - the 6-step flywheel that turns ads into profit', content: `Learned about something called the Infinite Money Loop that finally made paid advertising make sense.

The concept: A properly designed business creates a flywheel where ad spend generates profit that funds more ad spend that generates more profit.

THE 6 STEPS:

1. ACQUIRE CUSTOMER (Ads)
Spend money to get customer attention.

2. CONVERT (Offer)
Turn attention into first purchase.

3. DELIVER VALUE (Product/Service)
Actually solve their problem well.

4. RETAIN (Email/Loyalty)
Bring them back for repeat purchases.

5. EXPAND (Upsells/Cross-sells)
Increase their lifetime value.

6. REINVEST (Profit → Ads)
Put profit back into step 1.

This is a LOOP. Output from step 6 feeds step 1. The flywheel spins faster over time.

Why most businesses dont achieve this:

- They lose money at step 2 (bad offer)
- They dont retain at step 4 (no email strategy)
- They dont expand at step 5 (no upsells)
- They dont reinvest at step 6 (take all profit)

Each broken step stops the flywheel.

The businesses that win have all 6 steps working. Money goes in one end and more money comes out the other. Then that money goes back in.

[LINK] Diagnose which step is broken in your business.` },

  { topic: '"Youre Not a Brand, Youre a Marketing Company" - the identity shift', content: `Learned about an identity shift that separates successful ecommerce operators from struggling ones.

Most people think: "Im a clothing brand" or "Im a skincare brand."

Better mindset: "Im a marketing company that happens to sell clothes/skincare."

Why this matters:

BRAND MINDSET:
- Focuses on product
- Thinks marketing is promotion
- Reactive to whats working
- Product-led decisions

MARKETING COMPANY MINDSET:
- Focuses on customer acquisition and retention
- Thinks marketing IS the business
- Proactive about testing and learning
- Data-led decisions

The insight: Your product can be copied. Your brand can be imitated. But your marketing machine - your systems for acquiring customers profitably - thats your actual asset.

Implications:

1. Invest more in marketing skills than product knowledge
2. Build systems, not just campaigns
3. Test relentlessly
4. Track everything
5. View every sale as a learning opportunity

The best ecommerce operators think of products as vehicles for marketing experiments. Each product is a hypothesis. Each campaign is a test. Each customer is data.

When you adopt this mindset, you stop being emotionally attached to products that dont work. You just find what the market wants and deliver it.

[LINK]` },

  { topic: '"Creative is the New Targeting" - the system for winning in 2026', content: `Learned about a framework that explains why some brands dominate paid advertising while others struggle.

The concept: In the age of algorithmic optimization, creative IS your targeting. The algorithm shows your ad to people who respond to it. Different creatives attract different audiences.

VOLUME + DIVERSITY + MEASUREMENT

VOLUME:
You need lots of creative variations. Not 3 ads. More like 15-30 actively testing at any time. The algorithm needs options to learn from.

DIVERSITY:
Different formats (static, video, carousel), different angles (problem-focused, benefit-focused, testimonial), different hooks (question, statement, story).
Diversity lets the algorithm find audiences you didnt think to target.

MEASUREMENT:
Track which creatives work for which segments. Some creative resonates with certain demographics. Let data tell you what works.

Why this matters:

OLD TARGETING:
"I want to reach 25-34 year old women interested in fitness"

NEW TARGETING:
"I'll make creative that resonates with 25-34 year old women interested in fitness, and the algorithm will find them"

The creative does the targeting. The algorithm optimizes delivery. Your job is to feed the machine with enough diverse creative to let it work.

Brands struggling with ads usually have a creative volume problem, not a targeting problem.

[LINK]` },

  { topic: 'The "$0 CAC Engine" - get customers for free before you ever spend on ads', content: `Learned about something called the $0 CAC Engine that completely changed how I think about customer acquisition.

The concept: Before spending money on paid ads, build organic acquisition channels that generate customers for free.

THE ENGINE:

1. CONTENT MARKETING
Create genuinely helpful content that attracts your target audience. Blog posts, videos, social posts that solve real problems.

2. SEO
Optimize for searches your customers are already making. Once ranked, traffic is essentially free.

3. COMMUNITY BUILDING
Build a community around your niche. Facebook groups, Discord, forums. Be helpful, not salesy.

4. REFERRAL PROGRAMS
Turn customers into acquisition channels. Each happy customer brings more customers.

5. PARTNERSHIPS
Cross-promote with complementary businesses. Their audience becomes your leads.

Why this matters:

With $0 CAC channels established:
- Paid ads become gravy, not necessity
- Cash flow is healthier (not dependent on ad spend)
- You can survive algorithm changes and ad cost increases
- Your business has multiple growth engines

Most people start with paid ads because they want fast results. Smart operators build organic engines first, then add paid as an accelerant.

The $0 CAC Engine takes longer to build but creates a much more stable foundation.

[LINK]` },

  // Personal experience posts with highlighted promos
  { topic: 'What I wish I knew before spending $50k on ads', content: `Just hit my first $100k month. But man, the journey to get here was BRUTAL.

I wasted so much money in the beginning because I didnt understand the fundamentals. I was literally throwing money at Facebook hoping something would stick.

The turning point? I stopped focusing on tactics and started learning the psychology behind why people buy.

Turns out, there are specific triggers that make the reptile brain say YES before the logical brain even kicks in. Once I understood these triggers, my ads started converting like crazy.

My biggest tip: Before you spend another dollar on ads, make sure you understand buyer psychology. The tactics mean nothing if you dont understand WHY they work.

Learned this at [LINK]

Seriously, I wish I had this when I started. Would have saved me at least $30k in wasted ad spend.` },

  { topic: 'The headline tweak that 3x my conversion rate overnight', content: `Was stuck at 1.2% conversion rate for MONTHS. Tried everything. New images. Different offers. Nothing worked.

Then I made ONE change to my headline and conversions jumped to 3.8% the next day.

What was the change? I stopped talking about my product and started talking about their problem.

Old headline: "Premium Bamboo Cutting Board - Made in USA"
New headline: "Stop Ruining Your Knives on Cheap Plastic Boards"

Same product. Same price. Same everything else. Just changed the headline to focus on THEIR pain instead of MY product.

This is what they call the "WIIFM principle" - Whats In It For Me. Your customer is asking this with every word they read.

Found all this at [LINK]

Game changer. My whole approach to writing product descriptions changed after this.` },

  { topic: 'Why I stopped trying to lower my CPA (and doubled my profits)', content: `Hot take: Trying to lower your CPA is often the wrong goal.

I spent 6 months obsessing over getting my CPA down from $25 to $20. Tested hundreds of ads. Drove myself crazy.

Then I learned something that completely flipped my thinking: The winner in advertising isnt who has the lowest CPA. Its who can AFFORD the highest CPA.

Think about it:
- If your customer is worth $50 lifetime, you need CPA under $25 to be profitable
- If your customer is worth $200 lifetime, you can afford $80 CPA and still crush it

I stopped trying to lower my CPA and started focusing on increasing customer lifetime value. Now I can bid more aggressively than competitors and still be more profitable.

Source: [LINK]

Free resource that explains this way better than I can. Highly recommend.` },

  { topic: 'The email sequence that turned one-time buyers into repeat customers', content: `Was so focused on getting new customers that I completely ignored my existing ones. Classic mistake.

Then I set up a simple post-purchase email sequence and my repeat purchase rate went from 8% to 34% in 60 days.

The sequence isnt complicated:
- Day 1: Thank you + how to use the product
- Day 3: Check in + ask for feedback
- Day 7: Related products they might like
- Day 14: Educational content about the niche
- Day 30: Special offer for repeat purchase

The key insight: Most of your customers WANT to buy from you again. You just have to make it easy and remind them you exist.

[LINK]` },

  { topic: 'How I find winning products without using any spy tools', content: `Everyone asks what spy tools I use. The answer? None.

Spy tools show you what worked YESTERDAY. By the time you copy it, the market is saturated.

Instead, I use what I call "upstream research" - finding products before they blow up.

My process:
1. Browse Kickstarter/Indiegogo for trending campaigns
2. Check Amazon Movers & Shakers daily
3. Watch TikTok organic trends (not ads)
4. Join niche Facebook groups and see what people complain about

The best products solve problems people are actively discussing. Not products that other dropshippers are already running.

[LINK]` },

  { topic: 'My product page checklist (use this before launching anything)', content: `After launching 50+ products, Ive developed a checklist I run through before anything goes live.

The "Above the Fold" checklist:
✓ Benefit-focused headline (not product name)
✓ Social proof within first scroll
✓ Clear CTA button visible without scrolling
✓ Main product image shows the product in USE
✓ Price anchoring (show original price crossed out)

Most product pages fail because they bury the good stuff below the fold. People dont scroll if you havent hooked them in 3 seconds.

Credit to [LINK] for this

Completely free. Print out the checklist and use it for every product.` },

  { topic: 'The pricing psychology trick that increased my AOV by 40%', content: `Was selling a product for $39. Added a "Premium Bundle" for $59. Nothing else changed.

AOV went from $39 to $54 within a week.

Heres the psychology: People cant evaluate prices in isolation. They need something to compare against.

When $39 was the only option, people debated whether to buy at all. When $59 existed, suddenly $39 felt like a deal, and some people chose $59 because "premium must be better."

This is called price anchoring. Works in almost every niche Ive tested.

Check out [LINK] if curious

Free resource. The pricing psychology section alone is worth bookmarking.` },

  { topic: 'Why your Facebook ads stop working after 2 weeks (and how to fix it)', content: `Every dropshipper knows this pain: You find a winning ad, it crushes for 10-14 days, then performance tanks.

Used to think it was "ad fatigue." Tried making more creative variations. Didnt help much.

The real issue? Your audience gets saturated faster than you think. Facebook shows your ad to the most likely buyers first. Once theyre exhausted, performance drops.

The fix isnt more creative variations (though that helps). Its building a creative SYSTEM that produces volume.

Now I launch 5-10 new creatives every week. Not because each one is perfect, but because I need the machine constantly fed with fresh content.

btw learned this from [LINK]

Free breakdown of how to build a creative system. Actually actionable, not just theory.` },

  { topic: 'The copywriting mistake that cost me $10k in lost sales', content: `For months, I was writing product descriptions that listed features. Thought I was being helpful and thorough.

My conversion rate was stuck at 0.8%.

Then I rewrote everything using a simple formula: [Feature] so you can [Benefit] which means [Emotional outcome]

Old: "Made with organic cotton"
New: "Made with organic cotton so you can sleep guilt-free knowing your baby isnt touching chemicals, which means you can finally relax during bedtime"

Same feature. But now it connects to what they actually CARE about.

[LINK] explains it better than I can

Free resource that I reference literally every time I write copy. Bookmark it.` },

  { topic: 'How I validate products in 48 hours without spending money', content: `Before I ever buy inventory or run ads, I validate demand with a simple 48-hour test.

The process:
1. Create a basic landing page (just headline, image, price, email capture)
2. Run $20-30 of Facebook traffic to it
3. See how many people click "Buy Now" (I use a sold out message)
4. If more than 3-5% click, its worth testing properly

This has saved me thousands on products that wouldnt have sold.

The key insight: You dont need a perfect page to test demand. You just need enough to see if people WANT the product.

Picked this up from [LINK]

Completely free. Wish I had this before wasting money on products nobody wanted.` },

  { topic: 'The retargeting strategy that recovers 30% of abandoned carts', content: `Most people set up retargeting and call it a day. I was getting maybe 5% recovery rate.

Then I learned about sequenced retargeting and everything changed.

Day 1-3: Remind them what they left behind (simple reminder)
Day 4-7: Address objections (add testimonials, guarantees)
Day 8-14: Create urgency (limited stock, price increase warning)
Day 15+: Offer a small discount (last resort)

The sequence matters because different people need different pushes. Some just forgot. Others have objections you need to address. Others need a deal.

More details at [LINK]

Free resource. The email + ad combo strategy alone is worth your time.` },

  { topic: 'What nobody tells you about scaling past $10k/month', content: `Hit $10k/month and thought I was set. Then tried to scale to $30k and everything broke.

Heres what I didnt understand: The strategies that get you to $10k are different from what gets you to $50k.

At $10k:
- One winning product is enough
- Manual management works
- Cash flow is manageable

At $50k+:
- Need multiple products or insane LTV
- Systems and automation are mandatory
- Cash flow can kill you (especially with suppliers)

The biggest shift is mindset. Stop thinking like a seller. Start thinking like a business owner.

Found this at [LINK] - free btw

Free resource that actually addresses the different challenges at each level. Super helpful.` },

  { topic: 'My morning routine for managing a 6-figure store (only 2 hours)', content: `People ask how I manage everything. The truth? I only work 2-3 hours most days now.

My daily routine:
- 8am: Check metrics dashboard (10 min)
- 8:15am: Review ad performance, kill losers, scale winners (30 min)
- 8:45am: Check customer service queue (20 min)
- 9:05am: Review new creatives from team (15 min)
- 9:20am: Strategic thinking/planning (30 min)

Thats it. The rest runs on systems.

The key is building SOPs for everything repetitive. Took 3 months to set up properly, but now my business runs without me being in it constantly.

Learned this at [LINK]

Free resource with templates you can actually implement. Game changer for time freedom.` },

  { topic: 'The supplier negotiation that saved me $8k last year', content: `Most people accept whatever price their supplier quotes. I used to do the same.

Then I learned that EVERYTHING is negotiable if you approach it right.

My negotiation framework:
1. Always get quotes from 3+ suppliers
2. Show them competitor pricing (even if you have to bluff a little)
3. Commit to volume in exchange for better rates
4. Ask about payment terms (Net 30 is huge for cash flow)
5. Request free samples for quality control

One conversation saved me $0.80/unit. On 10,000 units, thats $8k straight to my bottom line.

Found all this at [LINK]

Free resource with negotiation scripts you can copy. Actually works.` },

  { topic: 'Why I stopped chasing viral products (and what I do instead)', content: `Used to spend hours looking for the next "viral" product. Occasionally Id hit one. But then competition would flood in within weeks and margins would collapse.

Now I focus on what I call "boring profitable" products.

Characteristics of boring profitable products:
- Solve a real problem (not just novelty)
- Have repeat purchase potential
- Barrier to entry (not easy to source)
- Not sexy enough for every dropshipper to chase

My best performing store sells cleaning supplies. Boring? Yes. Profitable? Insanely.

Source: [LINK]

Free resource that changed how I think about product selection. Less exciting, way more money.` },

  { topic: 'The customer service response that turned a 1-star into a 5-star review', content: `Got a brutal 1-star review. Customer was furious. Product arrived damaged.

Old me would have refunded and moved on. New me saw an opportunity.

My response:
1. Apologize genuinely (not defensively)
2. Take full responsibility (no excuses)
3. Offer MORE than they expected (full refund + free replacement + discount on next order)
4. Follow up personally after resolution

The customer was so impressed they deleted the 1-star and posted a 5-star instead, specifically praising our customer service.

Every complaint is a chance to create a superfan.

[LINK]` },

  { topic: 'How I finally stopped working IN my business and started working ON it', content: `For two years, I was a glorified employee in my own business. Working 12 hour days. Couldnt take a vacation without everything falling apart.

The shift happened when I started documenting EVERYTHING I did repeatedly.

Every time I did a task more than twice, I recorded a Loom video of myself doing it. Created a Google Doc with steps. Then hired a VA to take it over.

Within 6 months, I had removed myself from:
- Customer service
- Order fulfillment
- Basic ad management
- Content creation
- Supplier communication

Now I focus only on strategy and high-level decisions.

[LINK]` },

  { topic: 'The upsell that adds $12 to every order (took 5 minutes to set up)', content: `Was leaving so much money on the table with single-product orders.

Added a simple post-purchase upsell: "Add [Related Product] for 30% off - one click, no re-entering payment info"

Average order value went from $47 to $59 almost overnight.

The psychology: Theyre already in buying mode. The decision to buy is the hard part. Once thats done, adding more is easy.

Key learnings:
- Offer something RELATED (not random)
- Price it below main product
- Make it one-click (no friction)
- Create urgency (limited time offer)

Credit to [LINK] for this

Free resource with specific upsell frameworks. The post-purchase section alone added thousands to my monthly revenue.` },

  { topic: 'Why I track these 5 metrics (and ignore everything else)', content: `Used to drown in data. Checked 20+ metrics daily. Made me anxious and confused.

Now I track only 5 metrics:
1. Revenue (obvious)
2. Customer Acquisition Cost (CAC)
3. Average Order Value (AOV)
4. Customer Lifetime Value (LTV)
5. Return on Ad Spend (ROAS)

Everything else is noise or can be derived from these 5.

The magic happens when you understand the RATIOS:
- LTV:CAC should be 3:1 or better
- If AOV is low, you need volume or upsells
- If ROAS drops, check creative fatigue first

Check out [LINK] if curious

Free resource that cut through all the noise. My dashboard is so much cleaner now.` },

  { topic: 'The image swap that doubled my click-through rate', content: `Same product. Same ad copy. Changed only the main image. CTR went from 0.8% to 1.9%.

Old image: Product on white background (standard supplier photo)
New image: Product being USED by a real person in natural setting

People dont buy products. They buy themselves using products. Your image should show the transformation, not the thing.

Other image lessons:
- Lifestyle shots beat product shots almost every time
- UGC-style images outperform polished ones
- Video thumbnails with humans get more clicks
- Avoid cluttered backgrounds

btw learned this from [LINK]

Free resource with specific frameworks for images that convert. My creative process is completely different now.` },

  { topic: 'How I built a $5k/month store while working full-time', content: `Started my store while working a 9-5. Had maybe 2 hours a day to work on it.

The key wasnt working more hours. It was ruthless prioritization.

My schedule:
- Morning (6-7am): Research and strategy
- Lunch break (30 min): Customer service
- Evening (8-10pm): Ad management and optimization

I ignored everything that wasnt directly making money. No fancy branding. No perfect website. Just products, ads, and fulfillment.

Took 8 months to match my salary. Then I quit.

The lesson: You dont need to quit your job to start. But you do need to treat whatever time you have as precious.

[LINK] explains it better than I can

Free resource specifically for people building alongside other commitments.` },

  { topic: 'The trust element that reduced my refund rate by 60%', content: `Refund rate was killing me. Around 12% of orders were requesting refunds. Thought it was product quality.

Turns out, most refunds came from buyers remorse - people second-guessing their purchase after ordering.

Added one thing to my thank you page and confirmation email: A personal video from me explaining exactly what theyd receive and when.

Refund rate dropped to under 5%.

Why it works: Video builds trust and connection. When theres a face behind the brand, people feel more comfortable. They also feel bad asking for refunds from a "real person" vs an anonymous company.

Picked this up from [LINK]

Free resource with specific tactics for reducing refunds and building customer confidence.` },

  { topic: 'My honest review after 3 years of dropshipping', content: `3 years in. Heres what I wish someone told me at the start:

The good:
- Its real. I make a full-time income now.
- The flexibility is amazing
- Skills transfer to any business

The bad:
- Its not passive. Requires constant attention
- Cash flow stress is real
- Supplier issues will drive you crazy

The ugly:
- First 6 months were brutal (made basically nothing)
- Lost money before making money
- Had to unlearn a lot of bad advice

Worth it? 100%. But go in with realistic expectations.

More details at [LINK]

Free and actually practical. Not guru nonsense. Real frameworks you can implement.` },

  { topic: 'The ad structure that cut my testing costs in half', content: `Used to test ads one at a time. Expensive and slow.

Now I use a structured testing framework that tests multiple variables at once:

Campaign: CBO budget
- Ad Set 1: Broad audience
  - Ad 1: Hook A + Visual A
  - Ad 2: Hook A + Visual B
  - Ad 3: Hook B + Visual A
  - Ad 4: Hook B + Visual B

Let it run for 3-4 days. The data tells you:
- Best hook (compare A vs B across both visuals)
- Best visual (compare A vs B across both hooks)
- Best combination (winner)

Way more efficient than testing one thing at a time.

Found this at [LINK] - free btw

Free resource with specific setups you can copy. My testing is so much faster now.` },

  { topic: 'Why I stopped selling to everyone (and tripled my conversion rate)', content: `Biggest mistake I made: Trying to appeal to everyone.

My product descriptions were generic. Ads were broad. Nothing resonated deeply with anyone.

Then I picked ONE specific customer avatar and wrote everything for them.

Example:
Old: "Great for anyone who wants healthier skin"
New: "For busy moms who dont have time for a 10-step skincare routine but still want to look like they slept 8 hours"

Same product. But now it feels like Im talking directly to someone specific.

The paradox: The more specific you get, the more people respond. Because specific feels personal.

Learned this at [LINK]

Free resource that walks you through creating your ideal customer profile. Changed my entire marketing approach.` },

  { topic: 'The checkout page tweak that recovered $3k in lost sales last month', content: `Was losing people at checkout. Could see it in the funnel data. Made it to cart, then disappeared.

Added three things:
1. Trust badges right above the checkout button
2. "100% Money Back Guarantee" text next to the button
3. Mini FAQ addressing common concerns (shipping time, returns, etc.)

Checkout conversion rate went from 35% to 52%.

People get nervous right before buying. Your job is to calm those nerves at the exact moment they appear.

Found all this at [LINK]

Free resource with specific elements to add to your checkout. The trust badge placement guide is especially helpful.` },

  { topic: 'How I handle negative comments on my ads (and turn them into sales)', content: `Negative comments used to terrify me. Id hide them immediately.

Now I see them as opportunities.

When someone comments something negative:
1. Respond quickly (within a few hours)
2. Be genuinely helpful (not defensive)
3. Address the specific concern
4. Offer to help via DM

Often the hater becomes a customer. And everyone watching sees how you handle criticism.

Also: Engagement is engagement. Facebook doesnt care if comments are positive or negative. More comments = more reach.

Source: [LINK]

Free resource with actual scripts for handling different types of negative comments. Super practical.` },

  { topic: 'The profit margin lesson I learned the hard way', content: `Made my first "big" month - $30k revenue. Was so excited.

Then calculated actual profit: $1,800. A 6% margin. On $30k in sales.

Problem was I never did proper cost accounting before scaling. Had no idea my true COGS until I sat down and added everything up.

Hidden costs people forget:
- Transaction fees (2.9% + $0.30 per order)
- Shipping discrepancies
- Returns and exchanges
- Chargebacks
- Software subscriptions
- VA costs

Now I calculate true margin BEFORE scaling anything. If margin isnt at least 20% after ALL costs, I dont scale.

[LINK]` },

  { topic: 'Why most dropshipping advice is outdated (and what to do instead)', content: `90% of dropshipping content online is recycled advice from 2019-2021.

Back then:
- FB ads were cheaper
- Competition was lower
- Tactics alone could win

Now:
- Ad costs are 2-3x higher
- Every niche is crowded
- You need actual strategy, not just tactics

The game has evolved. The playbook needs to evolve too.

What works now:
- Brand building (not just product pushing)
- LTV focus (not just first purchase)
- Creative volume (not just one winning ad)
- Systems thinking (not just hustle)

[LINK]` },

  { topic: 'The landing page element that increased trust by 200%', content: `Was struggling with trust. Visitors werent buying because they didnt believe my store was legit.

Added one section: "Real customer photos" - a grid of UGC images from actual buyers using the product.

Conversion rate jumped and trust indicators (like time on page) improved dramatically.

Why it works:
- Social proof is more believable than anything you say
- User photos feel authentic (polished shots feel like marketing)
- Potential buyers see themselves in current customers

Now I actively collect customer photos for every product. Offer a small discount in exchange for a photo review.

Credit to [LINK] for this

Free resource with specific tactics for building credibility. The UGC collection templates are especially helpful.` },

  { topic: 'My honest thoughts after taking 10+ ecommerce courses', content: `Spent probably $5k on courses over the years. Heres my honest take:

Most courses:
- Teach the same basic stuff
- Lots of fluff to justify the price
- Outdated by the time you watch them
- Better for motivation than education

The few good ones:
- Focus on principles, not just tactics
- Get updated regularly
- Have active communities

My biggest regret: Not finding free resources first. The best information Ive found wasnt behind a paywall.

Check out [LINK] if curious

Seriously. Before you spend hundreds on a course, check out whats available for free. You might be surprised.` },

  { topic: 'How I automated 80% of my customer service', content: `Customer service was eating 2+ hours of my day. Every day. Couldnt scale without drowning.

Now it takes 20 minutes. Heres how:

1. Created FAQ page addressing top 20 questions
2. Set up automated email responses for common inquiries (order status, shipping times, return policy)
3. Added chatbot for instant answers to basic questions
4. Created templates for every recurring situation
5. Hired VA for anything that needed human touch

The insight: 80% of customer questions are the same 10 questions. Automate those, and you only deal with the 20% that need real attention.

btw learned this from [LINK]

Free resource with templates and workflows you can implement today. Saved my sanity.` },

  { topic: 'The psychology behind why people really buy', content: `Spent a lot of time studying buyer psychology. Biggest insight: People buy for emotional reasons and justify with logic.

Nobody needs a new watch. They need to feel successful.
Nobody needs skincare. They need to feel confident.
Nobody needs a gadget. They need to feel smart/cutting-edge.

When you understand this, your entire marketing approach changes.

Stop: "Our watch is made with premium materials"
Start: "Feel like the most successful person in the room"

The product is just the vehicle for the feeling they want.

[LINK] explains it better than I can

Free resource that goes way deeper into this. The "emotional triggers" section is especially good. Changed how I write all my copy.` },

  { topic: 'The split test that surprised me most', content: `Tested hundreds of things. This result shocked me most:

Long-form product description vs Short-form (bullet points only)

Expected short to win. Mobile users, short attention spans, etc.

Long-form won by 34%.

Why? Long copy isnt about making everyone read everything. Its about giving people ENOUGH information to feel comfortable buying. Skimmers skim. Readers read. But having the information available builds confidence.

The lesson: Test your assumptions. My gut was wrong.

Picked this up from [LINK]

Free resource with counter-intuitive findings like this. Saved me from many wrong assumptions.` },

  { topic: 'What I would do differently if starting from zero today', content: `If I had to start over with no money, no audience, no experience, heres exactly what Id do:

Month 1-2: Learn fundamentals obsessively
- Understand psychology of buying
- Study what makes ads convert
- Learn basic copywriting

Month 3-4: Validate products before spending
- Test 5-10 products with minimal investment
- Use organic methods to test demand
- Find one that shows promise

Month 5-6: Double down on winner
- Reinvest everything into whats working
- Build systems for scale
- Start building email list

The biggest change from what I actually did: Id spend way more time learning before doing. The mistakes I made early cost me way more than the time it would have taken to learn properly.

More details at [LINK]

Free, comprehensive, and actually actionable. Would have saved me a year of struggling.` },

  { topic: 'Why I focus on LTV obsessively (and you should too)', content: `Most dropshippers focus on getting new customers. I focus on keeping them.

My numbers:
- Cost to get new customer: ~$25
- Cost to get existing customer to buy again: ~$3

If you dont have a retention strategy, youre leaving massive money on the table.

My retention stack:
1. Post-purchase email sequence
2. Loyalty program with points
3. Personalized recommendations
4. Exclusive deals for repeat customers
5. Birthday/anniversary emails

Repeat customers are 9x more profitable than new ones. Treat them that way.

Found this at [LINK] - free btw

Free resource focused specifically on customer lifetime value. The email sequences alone are worth bookmarking.` },

  { topic: 'The ad copy framework I use for every product', content: `Struggled with ad copy for ages. Then found a framework that works for almost anything.

P.A.S. - Problem, Agitate, Solve

Problem: "Tired of waking up with back pain every morning?"
Agitate: "Youve tried everything - new mattresses, stretches, painkillers. Nothing works. And its affecting your whole day."
Solve: "Our orthopedic pillow aligns your spine while you sleep. Wake up feeling 10 years younger."

Simple but effective. The agitation is key - you need to make the problem feel urgent before presenting the solution.

Learned this at [LINK]

Free resource with templates for different product types. I reference it constantly when writing ads.` },

  { topic: 'How I find my most profitable customers', content: `Not all customers are equal. Some buy once and disappear. Others buy repeatedly and refer friends.

I use a simple analysis:
1. Export all customers
2. Sort by total spent
3. Look at top 20%
4. Find what they have in common

For my store, high-value customers:
- Found us through organic content (not ads)
- Were between 35-55 years old
- Bought specific product categories first

Now I target more of these people specifically. Same ad spend, way better results.

Found all this at [LINK]

Free resource with step-by-step analysis methods. Finding your best customers is a game changer.` },

  { topic: 'The simple system that keeps my store organized', content: `Used to be chaos. Orders getting lost. Inventory wrong. Suppliers confused.

Now everything runs on simple systems:

Daily: Check orders, respond to urgent messages
Weekly: Review metrics, adjust ad spend, check inventory
Monthly: Supplier review, financial check, strategy session

Each task has a checklist. Each checklist is timed.

The magic is in the consistency. When you do the same things at the same times, nothing falls through cracks.

Source: [LINK]

Free resource with actual checklists you can implement. Turned my mess into a real business.` },

  { topic: 'Why I quit TikTok organic (and went back to paid)', content: `Spent 6 months trying to grow organically on TikTok. Made tons of videos. Some went semi-viral.

Results? Almost no sales. Views didnt convert to customers.

Problem: TikTok organic attracts viewers, not buyers. Different psychology.

Went back to paid advertising where I can target purchase intent. Way more predictable.

Organic still has value:
- Brand building
- Content repurposing for ads
- Social proof

But as a primary customer acquisition channel? Not for me.

[LINK]` },

  { topic: 'The supplier red flags I now watch for', content: `Got burned by bad suppliers early on. Now I have a checklist of red flags:

Immediate red flags:
- Wont send samples (even if you pay)
- Communication takes more than 48 hours
- Inconsistent pricing/MOQ answers
- No clear return/refund policy

Yellow flags:
- Only accepts Western Union/direct transfer
- No verifiable company registration
- Cant provide references
- Too good to be true pricing

Found my best suppliers by starting small, testing quality, then scaling the relationship.

[LINK]` },
];

// Viral posts for X/Twitter - Value bombs from learning center
const X_POSTS = [
  { topic: 'the marketing principle that changed everything', content: `best marketing advice: people buy with emotion, then use logic to justify

this means your product page order matters MORE than the content

lead with transformation, not features

[LINK]` },

  { topic: 'the only question customers ask', content: `every person on your site is asking: "whats in it for ME?"

WIIFM. write it on a sticky note.

nobody cares about your brand story. they care about their problem being solved.

[LINK]` },

  { topic: 'the 3 second rule that saves conversions', content: `you have 3 seconds when someone lands on your page

in those 3 seconds they need to understand:
- what you sell
- why it matters to them
- what to do next

[LINK]` },

  { topic: 'stop selling benefits, sell this instead', content: `better than selling benefits: sell what they LOSE by not buying

"save money on energy" = meh
"every month you wait is another month throwing money away" = action

[LINK]` },

  { topic: 'the gatekeeper method', content: `4 moves to bypass the brains attention filter:

1. novelty (pattern break)
2. relevance (about them)
3. pattern interrupt (unexpected)
4. emotion (feeling first)

[LINK]` },

  { topic: 'rule of one', content: `marketing framework that simplifies everything:

ONE reader
ONE idea
ONE offer
ONE action

most marketing fails because its trying to do too much at once

[LINK]` },

  { topic: 'the 6 primal buy buttons', content: `6 triggers that get the reptile brain to say YES:

- self-centered (about ME)
- contrast (before/after)
- tangible (specific)
- beginning and end (first/last impression)
- visual (show dont tell)
- emotional

[LINK]` },

  { topic: 'damaging admission secret', content: `counter-intuitive: admitting weakness makes strengths more believable

"our product takes 2 weeks to ship... because its handcrafted in Italy"

the admission builds trust. [LINK]` },

  { topic: 'voice of customer mining', content: `best copywriters dont write clever phrases. they STEAL exact words customers use.

where to mine:
- reviews (especially 3-4 star)
- competitor reviews
- reddit threads
- amazon reviews

[LINK]` },

  { topic: 'unique mechanism explained', content: `every successful product has a "unique mechanism"

not "weight loss pills"
→ "the only formula that blocks the fat-storage hormone"

the mechanism answers: [LINK]` },

  { topic: 'three canons of craft', content: `every sentence in your copy must pass 3 tests:

1. is it TRUE? (actually true)
2. is it CLEAR? (12yo understands)
3. is it NECESSARY? (earns its place)

[LINK]` },

  { topic: 'the infinite money engine', content: `the equation that changes everything:

LTV > CAC

when lifetime value exceeds acquisition cost by enough margin, you have unlimited money for growth

[LINK]` },

  { topic: 'double bind of fear', content: `people have 2 fears around any decision:
- fear of action (what if it doesnt work?)
- fear of inaction (what if i miss out?)

best marketing addresses BOTH. most only addresses one [LINK]` },

  { topic: '40/40/20 rule', content: `marketing success formula:

40% = WHO you target (audience)
40% = WHAT you offer (the deal)
20% = HOW you say it (creative)

most obsess over the 20%. [LINK]` },

  { topic: 'the 3x threshold', content: `the equation that separates struggling stores from profitable ones:

LTV needs to be 3x CAC

below 3x: every campaign feels risky
above 3x: growth becomes math

[LINK]` },

  { topic: 'velocity advantage', content: `speed is the biggest unfair advantage:

faster iteration = more learning cycles
more learning cycles = better decisions
better decisions = better outcomes

[LINK]` },

  { topic: 'leverage equation', content: `stop working harder. start working smarter:

Effort × Leverage = Results

same effort with 10x leverage = 10x results

build systems, automate, delegate [LINK]` },

  { topic: 'counter position strategy', content: `how small brands beat giants:

dont compete where theyre strong. create a battlefield where their strengths become weaknesses.

[LINK]` },

  { topic: 'highest CPA wins', content: `counterintuitive Google Ads truth:

if your LTV is higher than competitors, you can afford higher CPA, bid more aggressively, and win more customers

the battle is won in business model, not ad account [LINK]` },

  { topic: 'creative is the new targeting', content: `in 2026 ads:

creative IS your targeting. the algorithm shows your ad to people who respond to it.

volume + diversity + measurement

[LINK]` },
];

// Subreddits for posting viral content
const SUBREDDITS = [
  { name: 'r/dropship', url: 'https://reddit.com/r/dropship', members: '180k+', description: 'Main dropshipping community' },
  { name: 'r/ecommerce', url: 'https://reddit.com/r/ecommerce', members: '150k+', description: 'General ecommerce discussion' },
  { name: 'r/shopify', url: 'https://reddit.com/r/shopify', members: '120k+', description: 'Shopify store owners' },
  { name: 'r/Entrepreneur', url: 'https://reddit.com/r/Entrepreneur', members: '2M+', description: 'General entrepreneurship' },
  { name: 'r/smallbusiness', url: 'https://reddit.com/r/smallbusiness', members: '1.5M+', description: 'Small business owners' },
  { name: 'r/juststart', url: 'https://reddit.com/r/juststart', members: '100k+', description: 'Starting online businesses' },
  { name: 'r/SideProject', url: 'https://reddit.com/r/SideProject', members: '200k+', description: 'Side projects and startups' },
  { name: 'r/EntrepreneurRideAlong', url: 'https://reddit.com/r/EntrepreneurRideAlong', members: '180k+', description: 'Building businesses together' },
  { name: 'r/sweatystartup', url: 'https://reddit.com/r/sweatystartup', members: '150k+', description: 'Service-based businesses' },
  { name: 'r/digital_marketing', url: 'https://reddit.com/r/digital_marketing', members: '100k+', description: 'Digital marketing strategies' },
  { name: 'r/PPC', url: 'https://reddit.com/r/PPC', members: '80k+', description: 'Pay-per-click advertising' },
  { name: 'r/FacebookAds', url: 'https://reddit.com/r/FacebookAds', members: '50k+', description: 'Meta/Facebook advertising' },
  { name: 'r/AmazonFBA', url: 'https://reddit.com/r/AmazonFBA', members: '100k+', description: 'Amazon sellers' },
  { name: 'r/FulfillmentByAmazon', url: 'https://reddit.com/r/FulfillmentByAmazon', members: '120k+', description: 'FBA sellers community' },
  { name: 'r/WorkOnline', url: 'https://reddit.com/r/WorkOnline', members: '800k+', description: 'Online income opportunities' },
];

// Generate unique referral code from user ID
function generateReferralCode(userId: string): string {
  // Take first 8 chars of user ID and add a random suffix
  const base = userId.replace(/-/g, '').substring(0, 8);
  return `QS${base.toUpperCase()}`;
}

export default function MetaTemplatesPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const [referralCount, setReferralCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [postPlatform, setPostPlatform] = useState<'reddit' | 'x'>('reddit');
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [copiedPostId, setCopiedPostId] = useState<number | null>(null);
  const [showSubreddits, setShowSubreddits] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const REQUIRED_REFERRALS = 3;
  const referralsNeeded = Math.max(0, REQUIRED_REFERRALS - referralCount);

  // Compute referral code from user ID
  const referralCode = useMemo(() => {
    return user?.id ? generateReferralCode(user.id) : '';
  }, [user]);

  // Generate referral link
  const referralLink = typeof window !== 'undefined'
    ? `${window.location.origin}/signup?ref=${referralCode}`
    : '';

  // TEMPORARILY DISABLED FOR VISUAL QA
  // useEffect(() => {
  //   if (!authLoading && !user) {
  //     router.push('/login');
  //   }
  // }, [user, authLoading, router]);

  // Load referral data and save referral code to profile
  useEffect(() => {
    if (!user?.id || !referralCode) return;

    const loadReferralCount = async () => {
      try {
        const { data, error } = await supabase
          .from('referrals' as never)
          .select('id')
          .eq('referrer_id', user.id)
          .eq('is_valid', true);

        if (!error && data) {
          const count = (data as unknown[]).length;
          setReferralCount(count);
          setIsUnlocked(count >= REQUIRED_REFERRALS);
        }
      } catch {
        // Table might not exist yet, use localStorage fallback
        const stored = localStorage.getItem(`referrals_${user.id}`);
        if (stored) {
          const count = parseInt(stored, 10);
          setReferralCount(count);
          setIsUnlocked(count >= REQUIRED_REFERRALS);
        }
      }
    };

    const saveReferralCode = async () => {
      try {
        await updateUserProfile(user.id, { referral_code: referralCode } as never);
      } catch {
        // Silently fail - code will be saved on next visit
      }
    };

    loadReferralCount();
    saveReferralCode();
  }, [user, referralCode]);

  // Auto-scroll effect - infinite smooth scroll
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let isPaused = false;
    const scrollSpeed = 1; // pixels per frame

    const animate = () => {
      if (!isPaused && scrollContainer) {
        // Increment scroll position
        scrollContainer.scrollTop += scrollSpeed;

        // When we've scrolled past the first set of images (halfway point),
        // instantly jump back to start for seamless infinite loop
        const halfwayPoint = scrollContainer.scrollHeight / 2;
        if (scrollContainer.scrollTop >= halfwayPoint) {
          scrollContainer.scrollTop = 0;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    // Start after images have had time to load
    const startTimeout = setTimeout(() => {
      // Force scroll to start
      scrollContainer.scrollTop = 0;
      animationId = requestAnimationFrame(animate);
    }, 1000);

    // Pause on hover
    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(startTimeout);
      if (animationId) cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = referralLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyPost = async (content: string, postId: number) => {
    try {
      // Replace [LINK] placeholder with user's actual referral link
      const contentWithLink = content.replace(/\[LINK\]/g, referralLink);
      await navigator.clipboard.writeText(contentWithLink);
      setCopiedPostId(postId);
      setTimeout(() => setCopiedPostId(null), 2000);
    } catch {
      const contentWithLink = content.replace(/\[LINK\]/g, referralLink);
      const textArea = document.createElement('textarea');
      textArea.value = contentWithLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedPostId(postId);
      setTimeout(() => setCopiedPostId(null), 2000);
    }
  };

  // TEMPORARILY DISABLED FOR VISUAL QA
  // if (authLoading || !user) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
  //       <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
  //     </div>
  //   );
  // }

  // Duplicate images for seamless scrolling
  const duplicatedImages = [...CREATIVE_IMAGES, ...CREATIVE_IMAGES];

  return (
    <DashboardLayout>
      <div className="min-h-screen" style={{ background: '#FFFFFF', margin: '-40px -48px', padding: '48px' }}>
        {/* Section 1: Hero with Referral + Scrolling Gallery */}
        <section className="max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Referral Info */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 text-sm text-[var(--text-muted)] mb-4">
                  <Gift size={14} />
                  <span>100% Free Access</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-4">
                  1,000 Meta Ad Templates
                </h1>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  Drag-and-drop Canva templates from the world&apos;s biggest brands.
                  Completely free. No catch.
                </p>
              </motion.div>

              {/* Unlock Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-6 rounded-2xl border border-black/10"
                style={{ background: 'linear-gradient(135deg, #FAFAFA 0%, #F5F5F7 100%)' }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                    {isUnlocked ? (
                      <Check size={24} className="text-white" />
                    ) : (
                      <Lock size={20} className="text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[var(--text-primary)] mb-1">
                      {isUnlocked ? 'Access Unlocked!' : 'Unlock Full Access'}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">
                      {isUnlocked
                        ? 'You now have lifetime access to all 1,000 templates.'
                        : 'Refer 3 friends to get lifetime access to all templates.'}
                    </p>
                  </div>
                </div>

                {!isUnlocked && (
                  <>
                    {/* Progress */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[var(--text-secondary)]">Your progress</span>
                        <span className="text-sm font-bold text-[var(--text-primary)]">{referralCount}/{REQUIRED_REFERRALS}</span>
                      </div>
                      <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-black rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(referralCount / REQUIRED_REFERRALS) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <p className="mt-2 text-sm text-[var(--text-muted)]">
                        You still need to refer <span className="font-bold text-[var(--text-primary)]">{referralsNeeded}</span> more {referralsNeeded === 1 ? 'person' : 'people'}.
                      </p>
                    </div>

                    {/* Referral Link */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">Your unique referral link</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={referralLink}
                          readOnly
                          className="flex-1 px-4 py-3 rounded-xl bg-white border border-black/10 text-sm text-[var(--text-primary)] font-mono"
                        />
                        <button
                          onClick={copyToClipboard}
                          className="px-5 py-3 rounded-xl bg-black text-white font-medium text-sm flex items-center gap-2 hover:bg-gray-800 transition-colors"
                        >
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    {/* Requirements Notice */}
                    <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
                      <p className="text-xs text-amber-800">
                        <strong>Important:</strong> Each referral must be from a different IP address and email.
                        The platform is free, so share it with friends who will actually use it!
                      </p>
                    </div>

                    {/* Social Proof */}
                    <div className="mt-6 pt-6 border-t border-black/10">
                      <div className="flex items-center gap-3">
                        <Users size={18} className="text-[var(--text-muted)]" />
                        <p className="text-sm text-[var(--text-muted)]">
                          Usually from a simple Reddit or X post, <span className="font-semibold text-[var(--text-primary)]">50-70 new users</span> sign up.
                          The platform is completely free, so the conversion rate is insane.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            {/* Right Side - Auto-scrolling Masonry Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[600px] overflow-hidden rounded-2xl"
            >
              {/* Top fade */}
              <div
                className="absolute top-0 left-0 right-0 h-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, white, transparent)' }}
              />

              {/* Bottom fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to top, white, transparent)' }}
              />

              {/* Scrolling container */}
              <div
                ref={scrollRef}
                className="h-full"
                style={{ overflowY: 'scroll', scrollBehavior: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', padding: '4px' }}>
                  {duplicatedImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg overflow-hidden"
                      style={{ aspectRatio: '1/1' }}
                    >
                      <Image
                        src={img}
                        alt={`Template ${idx + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 2: How It Works */}
        <section className="max-w-5xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">
              How It Works
            </h2>
            <p className="text-[var(--text-muted)] max-w-lg mx-auto">
              1,000 ads from huge brands. Simply use the templates and within 20 seconds
              you have the same genius ad for your brand.
            </p>
          </motion.div>

          <div className="space-y-16">
            {TUTORIAL_STEPS.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                className={`flex items-center gap-12 ${idx % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                {/* Video */}
                <div className="flex-1">
                  <div className="rounded-2xl overflow-hidden shadow-lg bg-black">
                    <video
                      src={step.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white font-bold text-lg">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                    {step.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 3: Blurred Preview / CTA */}
        <section className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Blurred Grid Background */}
            <div
              className="absolute inset-0 opacity-60"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '4px',
                padding: '4px',
                filter: 'blur(2px)'
              }}
            >
              {CREATIVE_IMAGES.slice(0, 30).map((img, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden" style={{ aspectRatio: '1/1' }}>
                  <Image
                    src={img}
                    alt=""
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>

            {/* Overlay */}
            <div
              className="relative z-10 py-20 px-8 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)' }}
            >
              <div className="max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center mx-auto mb-6">
                  <Sparkles size={28} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                  {isUnlocked
                    ? 'You Have Full Access!'
                    : `Refer ${referralsNeeded} More ${referralsNeeded === 1 ? 'Friend' : 'Friends'}`}
                </h2>
                <p className="text-[var(--text-muted)] mb-8">
                  {isUnlocked
                    ? 'Enjoy lifetime access to all 1,000 Canva templates. Start creating winning ads today.'
                    : 'Get lifetime access to all 1,000 Canva templates. Professional ad designs from the world\'s biggest brands.'}
                </p>
                {isUnlocked ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-lg mx-auto">
                    {TEMPLATE_PACKS.map((pack) => (
                      <a
                        key={pack.name}
                        href={pack.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition-colors text-sm"
                      >
                        {pack.name}
                        <ExternalLink size={14} />
                      </a>
                    ))}
                  </div>
                ) : (
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? 'Link Copied!' : 'Copy Your Referral Link'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section 4: Viral Posts - Premium Luxurious Design */}
        <section className="mt-32 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Section Header */}
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest text-[var(--text-muted)] uppercase mb-4">
                Growth Toolkit
              </span>
              <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
                Ready-to-Post Content
              </h2>
              <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto">
                Share valuable knowledge on social media. Each post teaches a real marketing concept.
              </p>
            </div>

            {/* Platform Toggle - Premium Design */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex gap-3 p-2 bg-white rounded-2xl shadow-sm border border-black/5">
                <button
                  onClick={() => setPostPlatform('reddit')}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                    postPlatform === 'reddit'
                      ? 'bg-black text-white shadow-lg'
                      : 'text-[var(--text-muted)] hover:text-black hover:bg-black/5'
                  }`}
                >
                  <MessageSquare size={18} />
                  Reddit / Facebook
                </button>
                <button
                  onClick={() => setPostPlatform('x')}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                    postPlatform === 'x'
                      ? 'bg-black text-white shadow-lg'
                      : 'text-[var(--text-muted)] hover:text-black hover:bg-black/5'
                  }`}
                >
                  <Twitter size={18} />
                  X / Twitter
                </button>
              </div>
            </div>

            {/* Subreddit Link - More visible */}
            {postPlatform === 'reddit' && (
              <div className="text-center mb-8">
                <button
                  onClick={() => setShowSubreddits(true)}
                  className="inline-flex items-center gap-2 text-sm text-black font-medium hover:underline transition-colors"
                >
                  <ExternalLink size={14} />
                  Where to post? View recommended subreddits
                </button>
              </div>
            )}

            {/* Posts Grid - Luxurious Card Layout */}
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(postPlatform === 'reddit' ? REDDIT_POSTS : X_POSTS).map((post, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.03 }}
                    className={`group bg-white rounded-2xl border border-black/5 overflow-hidden transition-all duration-300 ${
                      expandedPost === idx ? 'ring-2 ring-black/10 shadow-xl' : 'hover:shadow-lg hover:border-black/10'
                    }`}
                  >
                    {/* Card Header */}
                    <div
                      className="p-6 cursor-pointer"
                      onClick={() => setExpandedPost(expandedPost === idx ? null : idx)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-xs font-bold text-[var(--text-muted)]">
                              {idx + 1}
                            </span>
                            <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                              {postPlatform === 'reddit' ? 'Long-form Post' : 'Tweet'}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-[var(--text-primary)] leading-snug line-clamp-2 group-hover:text-black transition-colors">
                            {post.topic}
                          </h3>
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyPost(post.content, idx);
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                              copiedPostId === idx
                                ? 'bg-green-500'
                                : 'bg-black hover:bg-gray-800'
                            }`}
                            style={{ color: '#ffffff' }}
                          >
                            {copiedPostId === idx ? (
                              <>
                                <Check size={14} />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy size={14} />
                                Copy
                              </>
                            )}
                          </button>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            expandedPost === idx ? 'bg-black text-white' : 'bg-black/5 text-[var(--text-muted)]'
                          }`}>
                            {expandedPost === idx ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content - Clean & Readable */}
                    {expandedPost === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-black/5"
                      >
                        <div className="p-6 pt-5 bg-[#FAFAFA]">
                          <div className="bg-white rounded-xl p-5 border border-black/5">
                            <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed" style={{ color: '#1a1a1a' }}>
                              {post.content.replace(/\[LINK\]/g, referralLink)}
                            </pre>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-xs text-[var(--text-muted)]">
                              {post.content.split(' ').length} words
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyPost(post.content, idx);
                              }}
                              className="text-xs font-medium text-black hover:underline"
                            >
                              Copy to clipboard
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tips Section - Premium Design */}
            <div className="max-w-2xl mx-auto mt-16">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-black to-gray-800 text-white">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Sparkles size={18} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2" style={{ color: '#ffffff' }}>Pro Tips for Maximum Reach</h4>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>Personalize each post with your own experiences for authenticity</li>
                      <li>Post during peak hours: 9-11am or 7-9pm in your timezone</li>
                      <li>Engage with comments to boost visibility in the algorithm</li>
                      <li>Your referral link is automatically inserted when you copy!</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Subreddit Modal */}
        {showSubreddits && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowSubreddits(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
                <h3 className="font-bold text-lg text-[var(--text-primary)]">Recommended Subreddits</h3>
                <button
                  onClick={() => setShowSubreddits(false)}
                  className="p-1 rounded-lg hover:bg-black/5 transition-colors"
                >
                  <X size={20} className="text-[var(--text-muted)]" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  Post your referral content in these communities. Read each subreddit&apos;s rules before posting.
                </p>
                <div className="space-y-2">
                  {SUBREDDITS.map((sub) => (
                    <a
                      key={sub.name}
                      href={sub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-black/[0.02] border border-transparent hover:border-black/10 transition-all group"
                    >
                      <div>
                        <span className="font-medium text-sm text-[var(--text-primary)] group-hover:text-black">
                          {sub.name}
                        </span>
                        <p className="text-xs text-[var(--text-muted)]">{sub.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--text-muted)] bg-black/5 px-2 py-0.5 rounded">
                          {sub.members}
                        </span>
                        <ExternalLink size={14} className="text-[var(--text-muted)] group-hover:text-black" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-black/10 bg-black/[0.02]">
                <p className="text-xs text-[var(--text-muted)] text-center">
                  Always provide value first. Avoid spammy behavior to prevent bans.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
