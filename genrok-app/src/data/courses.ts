export interface CourseModule {
  title: string;
  description: string;
}

export interface CourseBonus {
  title: string;
  description: string;
  value: number;
  image?: string;
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface CourseStat {
  value: string;
  label: string;
}

export interface CourseVisual {
  url: string;
  caption?: string;
}

export interface Course {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  heroImage?: string;
  badge?: string;
  stats: CourseStat[];
  longDescription: string;
  highlights?: string[];
  visuals?: CourseVisual[];
  modules: CourseModule[];
  bonuses: CourseBonus[];
  faq: CourseFAQ[];
  hidden?: boolean;
}

export const coursesData: Record<string, Course> = {
  "subconscious-trap": {
    slug: "subconscious-trap",
    title: "The Subconscious Trap",
    subtitle: "How to Bypass Buying Resistance Using Subconscious Influence",
    description: "A psychology-driven framework to increase conversions, boost AOV, and drive repeat purchases — without spending more on ads.",
    price: 10,
    originalPrice: 197,
    image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_41.jpg?v=1757233340",
    heroImage: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff.jpg?v=1760351539",
    badge: "Most Popular",
    stats: [
      { value: "8", label: "modules" },
      { value: "6+", label: "hours" },
      { value: "50+", label: "templates" }
    ],
    highlights: [
      "Master the psychology behind every buying decision",
      "Create irresistible offers that sell themselves",
      "Build trust instantly with proven frameworks",
      "Increase AOV without discounting your brand",
      "Turn one-time buyers into repeat customers",
      "Optimize every touchpoint for maximum conversion"
    ],
    visuals: [
      { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/facepalm-stress.gif?v=1760351539", caption: "Stop losing money on ineffective strategies" },
      { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/HOW_TO.gif?v=1760351539", caption: "Learn proven psychological triggers" },
      { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2.gif?v=1760351539", caption: "Watch your conversions skyrocket" }
    ],
    longDescription: `Your customers don't buy logically. They buy emotionally — then justify it later.

The Subconscious Trap is a psychology-driven framework designed for eCommerce store owners who want to increase conversions, boost average order value (AOV), and drive repeat purchases — without spending more on ads.

This isn't about manipulative tactics. It's about understanding how the human brain actually makes purchasing decisions, then ethically aligning your store to work with those natural patterns.

Every element of your store — from your headline to your checkout button — either builds buying momentum or kills it. Most stores are unknowingly sabotaging themselves at every step.

In this course, you'll learn exactly how to identify and fix these conversion killers, then install proven psychological triggers that turn browsers into buyers, and buyers into loyal customers.

The same frameworks in this course have been used to optimize 7-figure stores and generate millions in additional revenue. Now they're yours.`,
    modules: [
      {
        title: "The Brain, Unlocked",
        description: "What triggers the brain to buy and how to activate those triggers on demand."
      },
      {
        title: "The Copywriting Secrets",
        description: "The exact button text that boosted our conversions by 39%."
      },
      {
        title: "The Power of Fonts",
        description: "Which fonts increase trust and perceived brand value."
      },
      {
        title: "Winning Layouts",
        description: "Data-backed page structures that psychologically convert."
      },
      {
        title: "Code-Based Conversion Hacks",
        description: "CSS tweaks that increased our purchase rate by 21%."
      },
      {
        title: "Color Manipulations",
        description: "The exact color tactics that knock out the subconscious."
      },
      {
        title: "Psychological Positioning",
        description: "How to charge double your competitors and still convert at 6%+."
      },
      {
        title: "The Subconscious Switch",
        description: "70+ step-by-step implementation tasks."
      }
    ],
    bonuses: [
      {
        title: "The Intelligence Agent",
        description: "For months, we trained an AI agent to legally mimic the exact tactics used by billion-dollar brands - pixel by pixel, word by word. for FREE.",
        value: 97,
        image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/16.jpg?v=1752150697"
      },
      {
        title: "Einstein on Steroids",
        description: "And here it is - one of the most essential tools. To give you the ultimate edge, we trained Einstein on Steroids for you. An AI brain powered by 180 IQ logic and timeless business wisdom. At the push of a button, it thinks what others can't - and together with you, will take your store to levels you never imagined.",
        value: 97,
        image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/17.jpg?v=1752151300"
      },
      {
        title: "Your Personal Conversion Map",
        description: "Time to stop watching courses and hoping for change without truly implementing anything. The Personal Conversion Map gives you a guided tracking system that takes you step by step - all the way to success (6%+).",
        value: 147,
        image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/18.jpg?v=1752151730"
      }
    ],
    faq: [
      {
        question: "Will this really work if my site already looks professional?",
        answer: "Absolutely. \"Looking professional\" and \"converting visitors\" are two completely different things. Your site might look like a million-dollar brand, but if it's not using psychological triggers, you're leaving massive money on the table. This framework shows you exactly what's missing - the subconscious manipulations that drive purchases."
      },
      {
        question: "I'm already converting at 3%. Is this still worth it?",
        answer: "Let me put it this way: if you're converting 3% now, this framework could take you to 5-6%+. That means nearly DOUBLING your revenue from the exact same traffic. Same ad spend, double the sales. How much is that worth to you?"
      },
      {
        question: "Do I need to know how to code?",
        answer: "Not at all. The framework includes simple copy-paste instructions for every element. If you can use Shopify's theme editor, you can implement this. We've made it accessible for complete beginners while keeping it powerful enough for advanced users."
      },
      {
        question: "Will this work for my specific product/niche?",
        answer: "Yes. These are universal psychological principles that work on the human brain - regardless of what you're selling. Whether it's fashion, electronics, home goods, or anything else, the subconscious responds the same way to these triggers."
      },
      {
        question: "What if I implement everything and it doesn't work?",
        answer: "Simple: we refund you 100%. No questions, no hassle. We're that confident because this framework is built on thousands of A/B tests with proven results. But if somehow it doesn't increase your conversions, just let us know and we'll give you every penny back."
      },
      {
        question: "Why is it only $29?",
        answer: "Honest answer? We could easily charge $997+ for this. But we want every serious eCommerce entrepreneur to have access to it - not just the ones with big budgets. The framework itself (plus 3 bonuses worth $341) is available for just $10. One-time payment, lifetime access. Important: This price won't last forever. We reserve the right to increase it at any time. If you're seeing $10 now, consider yourself lucky - this discount is temporary."
      }
    ]
  },
  "ltv-system": {
    slug: "ltv-system",
    title: "The LTV System",
    subtitle: "The Automatic System That Earns $1,000 Per Customer",
    description: "Transform one-time buyers into lifetime customers with automated systems that maximize customer lifetime value.",
    price: 10,
    originalPrice: 97,
    image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_58_efa8c3cd-aa72-4542-a933-0f433d8c01a1.jpg?v=1757325732",
    heroImage: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/43.jpg",
    badge: "New",
    stats: [
      { value: "5", label: "weapons" },
      { value: "4+", label: "hours" },
      { value: "30+", label: "automations" }
    ],
    highlights: [
      "Build automated email flows that generate revenue 24/7",
      "Master the psychology of repeat purchases",
      "Create loyalty systems that customers love",
      "Increase customer lifetime value by 3-5x",
      "Set up 'set and forget' automation sequences",
      "Turn every customer into a brand advocate"
    ],
    visuals: [
      { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff_5__gm_optimized.gif", caption: "High-AOV orders flowing in automatically" },
      { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/HOW_TO.gif", caption: "The system working in real-time" }
    ],
    longDescription: `Most eCommerce brands are leaving 80% of their revenue on the table.

They spend thousands on ads to acquire customers, make one sale, and then... nothing. The customer disappears forever.

The LTV System changes everything.

This is the exact framework used by 8-figure brands to transform one-time buyers into lifetime customers who spend 5-10x their initial purchase — automatically.

You'll learn how to build "set and forget" systems that nurture, engage, and re-activate customers without you lifting a finger. Email flows that generate revenue at 3AM. SMS sequences that feel personal but run on autopilot. Loyalty programs that actually work.

The difference between a struggling store and a thriving brand isn't more traffic — it's maximizing the value of every customer you already have.

Inside, you'll get the exact blueprints, templates, and automation recipes that took us years to perfect. Install them once, profit forever.`,
    modules: [
      {
        title: "The LTV Engine Blueprint",
        description: "Discover the psychological and technical system that makes every customer worth $1,000+. A backend architecture built to multiply profits automatically."
      },
      {
        title: "The Laws of Human Persuasion",
        description: "Harness the secret laws of human psychology that steer attention, trigger craving, and make customers load massive carts - again and again."
      },
      {
        title: "The Automation Loop Protocols",
        description: "Build the self-sustaining system that runs your business 24/7 — loyalty, upsells, emails, all working together to generate infinite LTV."
      },
      {
        title: "The Rebuy Technology System",
        description: "Master the brain loops that trigger automatic repeat purchases and oversized carts - used by luxury brands to multiply LTV effortlessly."
      },
      {
        title: "The Empire Growth Formula",
        description: "The scaling logic that lets you outspend competitors fearlessly - using psychology, math, and automation instead of luck."
      }
    ],
    bonuses: [],
    faq: [
      {
        question: "Is this really possible? Can I actually get $1,000 from each customer?",
        answer: "Yes, absolutely. This isn't theory - it's a proven system we use in our own stores and have taught to thousands of students. The screenshots and results you see are real. When you build a proper LTV system with the right psychology triggers, email sequences, and product ecosystem, customers naturally spend $1,000+ over their lifetime. And with our system, around $600 of that is pure profit going into your pocket."
      },
      {
        question: "Don't I need a huge brand or massive inventory to do this?",
        answer: "Not at all. This is one of the biggest myths. The LTV system is built on psychology and automation, not on having 10,000 SKUs. You can start with as few as 10-20 products and build a money-printing machine. The key is understanding how to make customers come back automatically, which has nothing to do with inventory size and everything to do with the right triggers and sequences."
      },
      {
        question: "What if I have no prior experience, and my website is not live yet?",
        answer: "Perfect. Do not begin before joining us. Most entrepreneurs with prior experience quickly realize that they must rebuild everything from the ground up, and in the right way. Joining us will save you a great deal of time and money, even as a beginner. We'll show you exactly how to set up your entire system correctly from day one."
      },
      {
        question: "Will this work in my niche or market?",
        answer: "Yes, absolutely. The system is designed for every niche and every market. Whether you're selling in a small town or globally, whether you're offering beauty products, home goods, fitness equipment, or anything else - the psychology of high LTV works universally. We have students succeeding in dozens of different niches."
      },
      {
        question: "How long until I see results?",
        answer: "LTV is a long-term game, but you'll start seeing the foundation working within 30-60 days. The beauty of this system is that once it's set up, it compounds. Month 1 might bring in $500 per customer, month 3 might be $700, and by month 12 you're hitting $1,000+ per customer. This isn't a \"get rich quick\" scheme - it's a \"get rich for sure\" system."
      },
      {
        question: "Why $47?",
        answer: "An excellent question. This course contains the exact system we use to generate $180,000+ in monthly net profit. The information inside is worth tens of thousands of dollars in real-world value. When creating the course, we could have easily priced it at $2,000 or more - and it would still be worth it. However, we want this to be accessible to serious entrepreneurs who are ready to invest in a proven system. At $47, you're getting a complete blueprint that will transform every customer into a $1,000 money tree. This is a one-time payment with lifetime access and no hidden fees. Important: The price of $47 is already heavily discounted from the original $500. Quantum Scale reserves the right to increase the price at any time."
      }
    ]
  },
  "email-marketing": {
    slug: "email-marketing",
    title: "Email Marketing Revenue Engine",
    subtitle: "Turn Email Marketing Into a Revenue Engine",
    description: "Steal the full billion-dollar email system that generates 20X more revenue than any social platform — without spending another dollar on ads.",
    price: 10,
    originalPrice: 97,
    image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_40.jpg?v=1757233368",
    heroImage: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff_3.jpg?v=1760516155",
    badge: "Bestseller",
    stats: [
      { value: "3", label: "systems" },
      { value: "5+", label: "hours" },
      { value: "25+", label: "templates" }
    ],
    highlights: [
      "Build an email list that generates 20X more than social media",
      "Set up predictive BI systems that know when customers are ready to buy",
      "Create AI-powered personalization that runs on autopilot",
      "Write emails that strike exact psychological triggers",
      "Own the only digital asset Zuckerberg can't take from you",
      "Generate revenue 24/7 without spending on ads"
    ],
    visuals: [
      { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Satoshi_5.jpg?v=1762111646", caption: "Email generates 20X more than social platforms" },
      { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/crazy.png?v=1762107479", caption: "Stop fighting the algorithm" }
    ],
    longDescription: `In a world where millions of brands fight for attention on social networks to "stay relevant" and get crumbs of views because "the algorithm went crazy again"…

Top brands generate $1M-$10M every year (for 5+ consecutive years) through their email list.

According to research published in January 2025: An email list generates 20X more money than any social platform.

It happened in March 2020… COVID hit. The ground beneath our feet shook.

We had an eCommerce store doing $200,000-$300,000 monthly. Then Zuckerberg panicked. Like a villain, he shut down ad accounts, closed Facebook and Instagram pages and struck terror into helpless marketers.

Without warning, on a bright day with no advance notice, Zuckerberg stepped on the oxygen tube of our business and shut down all our ad accounts.

So we wrote an email to our list. A few minutes after the email was sent, the first sale came in. Within an hour, 1 sale became 30 sales. When the campaign ended… we had 764 sales total.

That one email campaign generated $92,462! Without spending a single dollar on ads.

An email list is like an ATM, emails are like a black card with unlimited credit. Not Facebook that can shut you down, not Instagram that can get hacked, not WhatsApp that can ban you, not YouTube that can close your channel…

An email list is the only digital asset you truly own.

Inside this course, you'll get the exact systems that billion-dollar brands use — predictive intelligence, AI personalization, and precision-engineered copy that turns readers into buyers.`,
    modules: [
      {
        title: "System 1: Business Intelligence + World-Class Setup",
        description: "The most advanced BI configuration on the planet — optimizing send times, frequency, and content delivery on a per-customer basis. No more batch-and-blast. Every email hits when that specific person is most likely to convert."
      },
      {
        title: "System 2: Smart Automation Powered by AI + Data",
        description: "Automated systems that send hyper-personalized messages based on a fusion of massive behavioral data and AI-driven predictions. Each customer gets a tailored experience that feels handcrafted — but runs 100% on autopilot."
      },
      {
        title: "System 3: Precision-Engineered Email Copy",
        description: "Emails designed to strike the exact psychological trigger in each customer's mind — at the perfect moment — to convert them individually. No generic templates. Just proven frameworks that turn readers into buyers."
      }
    ],
    bonuses: [],
    faq: [
      {
        question: "I already know email marketing. Why do I need this?",
        answer: "You might know the basics — but this isn't about basics. This is about highly advanced tactics that take email marketing from 'nice to have' to 'impossible to compete with.' These are the systems that give billion-dollar brands a 10-step technological advantage over everyone else. If you're not using predictive BI, AI-powered personalization, and strategic automation, you're leaving 30X more value on the table."
      },
      {
        question: "I don't think I need email marketing for my business.",
        answer: "Here's the reality: a properly built email automation system places you in an entirely different game. You'll harness technology correctly and deliver a ruthless, data-driven knockout to your competitors — without them even understanding why. Email isn't optional when you're competing against brands that generate billions. It's the most profitable channel most stores completely underutilize."
      },
      {
        question: "What if I buy multiple courses - do they overlap?",
        answer: "Every course is designed to solve a specific part of the conversion equation. They complement each other without repeating content, so stacking them creates compounding impact."
      },
      {
        question: "Will I get lifetime access?",
        answer: "Yes. One-time payment, lifetime access. No subscriptions. No hidden fees."
      },
      {
        question: "Is this just theory or can I apply it right away?",
        answer: "This is 100% practical. You'll get a clear framework + real examples + plug-and-play templates that you can implement immediately."
      },
      {
        question: "Do I need a team to apply this?",
        answer: "Not at all. Every tactic was designed for solo operators. You can implement everything with minimal tech skills or outsource it easily if you prefer."
      },
      {
        question: "What if this doesn't work for my business?",
        answer: "These systems are being used by businesses across every major industry — eCommerce, SaaS, services, digital products. If you have customers and email addresses, this works. And if for any reason you're not satisfied, you're protected by our 30-day money-back guarantee."
      },
      {
        question: "How is this different from other email marketing courses?",
        answer: "Most courses teach you how to write emails and set up basic automations. This teaches you the enterprise-level systems that billion-dollar brands use — predictive intelligence, AI personalization, advanced segmentation, and behavioral triggers. It's not about doing more email marketing. It's about doing it at a world-class level."
      }
    ]
  },
  "abandoned-checkout": {
    slug: "abandoned-checkout",
    title: "Abandoned Checkout Finisher",
    subtitle: "How to Convert 82% of Your Lost Customers",
    description: "The system that recovers 82% of abandoned checkouts — automatically. Stop losing 75% of your potential revenue.",
    price: 10,
    originalPrice: 97,
    image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_76.png?v=1757233333",
    heroImage: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff_1.jpg?v=1760514814",
    badge: "Revenue Saver",
    stats: [
      { value: "7", label: "emails" },
      { value: "82%", label: "recovery" },
      { value: "2hrs", label: "setup" }
    ],
    highlights: [
      "Recover up to 82% of abandoned checkouts automatically",
      "7-email sequence ready to deploy in under 2 hours",
      "Battle-tested templates from 100,000+ successful sends",
      "Works with Shopify, WooCommerce, and all major platforms",
      "Generate extra $7,800+/month from existing traffic",
      "Strategic timing that hits when customers are ready to buy"
    ],
    visuals: [
      { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff_1.jpg?v=1760514814", caption: "Revenue recovery dashboard" }
    ],
    longDescription: `Your Store Is Bleeding Money...

Every day, stores lose sales. They don't even know it's happening. The problem isn't your ads. It's not your product. It's not your website.

It's the checkout.

Here's the truth: For every 10 people who buy from you, 7 more start checkout. They add items. They enter their card details. Then they leave.

That's 41% of people who were ready to buy. They just didn't finish.

Let's do the math: 6,800 monthly visitors → 3.4% reach checkout = 231 people enter payment details → 136 complete purchase + 95 abandon with details entered.

Without a recovery system, those 95 people are lost. They wanted to buy. They entered their card details. Then they left.

With a 7-email sequence, you can get 78 of them back. That's 82% recovery rate.

If your average order is $100, you gain $7,800 per month. That's $93,600 per year. All from fixing what's already broken.

That's a 58% Revenue Increase — extra $7,800 per month starting immediately.

Most stores chase more traffic. But if checkout is broken, you'll keep losing sales. No matter how much you spend on ads.

This system stops the leak. It brings money back into your store. Every day. On autopilot.`,
    modules: [
      {
        title: "Strategic Timing",
        description: "Each email goes out at the exact right time. When people are most likely to come back and buy."
      },
      {
        title: "Proven Psychology",
        description: "These emails were tested on hundreds of thousands of sends. Every word handles objections. Every line rebuilds trust. Every message pushes people to act."
      },
      {
        title: "Ready to Deploy",
        description: "The full 7-email sequence is ready. Copy, paste, done. No testing. No guessing. Just proven templates."
      }
    ],
    bonuses: [],
    faq: [
      {
        question: "Will this work for my platform (Shopify, WooCommerce, etc.)?",
        answer: "Yes. The email sequence and strategy work universally across all e-commerce platforms. We provide specific integration guides for Shopify, WooCommerce, BigCommerce, and other major platforms to ensure seamless setup regardless of your tech stack."
      },
      {
        question: "Will I get lifetime access?",
        answer: "Yes. One-time payment, lifetime access. No subscriptions. No hidden fees."
      },
      {
        question: "Is this just theory or can I apply it right away?",
        answer: "This is 100% practical. You'll get a clear framework + real examples + plug & play templates that you can implement immediately."
      },
      {
        question: "Do I need a team to apply this?",
        answer: "Not at all. Every tactic was designed for solo operators. You can implement everything with minimal tech skills or outsource it easily if you prefer."
      },
      {
        question: "I don't have many abandoned checkouts. Will this still work?",
        answer: "If you're getting any traffic and making sales, you have abandoned checkouts — the data shows that for every completed purchase, there's typically at least one abandoned checkout. Even recovering just a few can significantly boost your profit margins. Plus, as you scale, this system becomes even more valuable."
      },
      {
        question: "Can't I just build this myself?",
        answer: "You could try, but this system is built from analyzing hundreds of thousands of email sends and years of testing different approaches, timings, and messaging. The templates are proven to work. Building from scratch means months of testing, countless variations, and lost revenue while you figure it out. This gives you the shortcut to what already works."
      },
      {
        question: "How quickly will I see results?",
        answer: "Once deployed, the system starts working immediately. You'll begin seeing recovered sales within 24-48 hours of your first abandoned checkout. The full impact compounds over time as the sequence continues running automatically for every abandoned cart."
      },
      {
        question: "Why is this priced so low?",
        answer: "We've seen too many store owners struggle with abandoned checkouts simply because they don't have access to proven systems. Our mission is to make this accessible to every serious e-commerce entrepreneur, regardless of budget. The low price removes all barriers to implementation — and honestly, this system can pay for itself with just one recovered sale."
      }
    ]
  },
  "the-social-proof": {
    slug: "the-social-proof",
    title: "The Social Proof",
    subtitle: "How to Force Anyone to Buy From You Using One Psychological Law",
    description: "Turn every visitor into a buyer by triggering the most powerful force in human psychology — the Social Proof Effect.",
    price: 10,
    originalPrice: 197,
    image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_43.jpg?v=1757233352",
    heroImage: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff_5.jpg?v=1760517983",
    badge: "Psychology",
    stats: [
      { value: "5", label: "modules" },
      { value: "4+", label: "hours" },
      { value: "1,500%", label: "ROI boost" }
    ],
    highlights: [
      "Master the hidden laws of human psychology that drive purchases",
      "Build authentic social proof from day one without waiting months",
      "Engineer psychological proof directly into every ad and funnel",
      "Trigger the 'everyone's buying this' response that bypasses logic",
      "Own a skill that works regardless of platform or algorithm",
      "Turn every ad into a money-printing machine with social proof"
    ],
    visuals: [
      { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Whatever_it_takes_We_got_you_5.png?v=1742904328", caption: "Before: ROAS 3.16 (Feb 2024)" },
      { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Whatever_it_takes_We_got_you_6.png?v=1742904467", caption: "After: ROAS 27.13 (Mar 2024)" }
    ],
    longDescription: `In a world where algorithms change overnight...

We turn every ad into a money-printing machine (for 3 years straight) using The Social Proof Tactic.

If you're in eCommerce, selling a service or product... The page you're about to read is worth more than any video you've seen in the past year.

Straight to the point: Social Proof = Money

And here's the proof... On 27.02.2024, we started using the Social Proof Tactic on one of our brands. Before that, we had a lame ROAS of 3.16...

And just a few days later... the ROAS skyrocketed to 27.13.

"Ads give you exposure, social proof makes sure they pull out their credit card."

Pay attention... No reliance on Facebook algorithms. No endless product testing. No product page reviews. No creatives that competitors can copy.

Creating social proof is a skill that can print you money in every ad, every hour — without relying on Zuckerberg's mercy.

Properly built social proof can turn every ad into a money-printing machine at scale, with no limit and without the need for endless testing.

Over the course of 3 years, we applied the social proof tactic in over 300 ads. We studied and mastered the most powerful triggers found in psychology influence books.

Until we reached a point where every time... the method reduces advertising costs by up to 1,500% (CTR, CPM, CPC, CPA).

But the most important thing we've gained... Business Security.

It doesn't matter if Facebook is messing with your ad account. It doesn't matter if competitors are copying your creatives.

As long as you have the ability to generate social proof from scratch — the control is in your hands and no one can take it away from you.

We promise you: In a few days you will send us a message that you have no way of thanking us, and that we have changed your life.`,
    modules: [
      {
        title: "The Hidden Laws of Human Psychology",
        description: "You'll be exposed to every hidden psychological law that makes a random stranger buy simply because someone else did. Understand exactly how the brain works and what drives the subconscious to make a purchasing decision behind the scenes."
      },
      {
        title: "The Social Perception Engine",
        description: "The complete system for controlling the human brain's perception of your potential customer. Together, from zero, we'll build an entire framework that causes the customer to purchase in an impossible way, devoid of any ability to resist, due to the magical power called The Social Proof Effect."
      },
      {
        title: "The Subconscious Conversion Machine",
        description: "Discover how to transform doubt into belief, and belief into emotion. Learn how to trigger emotional responses in the customer that bypass logic — excitement so powerful it leads them to buy without thinking twice."
      },
      {
        title: "The Psychology of Certainty",
        description: "Here you learn how to make the customer's brain perceive reality exactly as you want. How to make them see your brand as the leader, your product as the only solution, and their purchase as the smartest decision they've ever made."
      },
      {
        title: "The Complete Dark Proof Protocol",
        description: "This is no longer persuasion — it's consciousness programming. Understand how to change the customer's deep beliefs about what 'works,' who's 'worthy,' and why you automatically become their safe and preferred choice again and again."
      }
    ],
    bonuses: [],
    faq: [
      {
        question: "I already use reviews on my product pages. Isn't that enough?",
        answer: "Product page reviews are just the tip of the iceberg. This is a comprehensive psychological system that makes customers believe everything you say — across your ads, landing pages, emails, and entire funnel. It goes far beyond simple testimonials. You'll learn how to engineer belief at the subconscious level."
      },
      {
        question: "This probably doesn't apply to my niche/business.",
        answer: "Wrong. This is relevant to everyone. Social proof is the fundamental law of human psychology. Any business applying it can skyrocket conversion rates overnight. Billion-dollar brands have built empires on this principle alone. If you're selling to humans, this applies to you."
      },
      {
        question: "What if I buy multiple courses — do they overlap?",
        answer: "Every course is designed to solve a specific part of the conversion equation. They complement each other without repeating, so stacking them creates compounding impact."
      },
      {
        question: "Will I get lifetime access?",
        answer: "Yes. One-time payment, lifetime access. No subscriptions. No hidden fees."
      },
      {
        question: "Is this just theory or can I apply it right away?",
        answer: "This is 100% practical. You'll get a clear framework + real examples + plug and play templates that you can implement immediately."
      },
      {
        question: "Do I need a team to apply this?",
        answer: "Not at all. Every tactic was designed for solo operators. You can implement everything with minimal tech skills or outsource it easily if you prefer."
      },
      {
        question: "How long does it take to see results?",
        answer: "Most people see an immediate impact on their ad performance within 24-72 hours of implementation. Social proof works instantly because it taps into hardwired human psychology."
      },
      {
        question: "What if Facebook shuts down my ad account?",
        answer: "That's exactly why you need this. Social proof is a skill that transcends platforms. Whether you're on Facebook, TikTok, Google, or selling in person — human psychology doesn't change. You'll own a skill that can't be taken away."
      }
    ]
  },
  "product-mapping": {
    slug: "product-mapping",
    title: "Product Mapping Manipulation",
    subtitle: "The Data-Driven System That Creates Money-Printing Product Pages",
    description: "Master the strategic product mapping framework used by billion-dollar brands to turn every product page into a high-converting sales machine.",
    price: 10,
    originalPrice: 197,
    image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_44.jpg",
    heroImage: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff_6.jpg",
    badge: "Strategy",
    stats: [
      { value: "5", label: "weapons" },
      { value: "4+", label: "hours" },
      { value: "∞", label: "ROI potential" }
    ],
    highlights: [
      "Master the billion-dollar mapping system used by top brands",
      "Create strategic product ecosystems that maximize AOV",
      "Use the anchor product effect to boost perceived value",
      "Build hidden funnels that convert visitors automatically",
      "Apply the law of multiple options to increase sales",
      "Turn every product page into a money-printing machine"
    ],
    visuals: [],
    longDescription: `The Biggest Brands Are Investing Billions Into Understanding How You Think...

They're not just selling products — they're engineering decisions.

It All Started Four Years Ago...

We discovered that the most successful eCommerce brands weren't winning because of better products or bigger ad budgets. They were winning because they understood something most store owners completely miss:

Strategic Product Mapping.

The way you position, present, and connect your products determines whether visitors buy — or bounce.

While most stores throw products on a page and hope for the best, billion-dollar brands use precise psychological frameworks to guide customers toward purchasing decisions they feel good about.

This isn't manipulation. It's strategic alignment between what customers want and how you present your solutions.

Inside this course, you'll discover the exact data-driven system that transforms chaotic product catalogs into strategic sales machines. You'll learn how to map your products in ways that naturally increase average order value, boost conversion rates, and create customers who buy more — without feeling sold to.

The same framework inside has been used to optimize stores generating 7-8 figures. Now it's yours.`,
    modules: [
      {
        title: "The Law of Multiple Options",
        description: "Discover why giving customers the right number of choices dramatically increases conversions — and how to structure your offerings for maximum psychological impact."
      },
      {
        title: "The Billion-Dollar Mapping System",
        description: "The exact framework used by world-class brands to position products strategically. Learn how to create product ecosystems that naturally guide customers toward higher-value purchases."
      },
      {
        title: "The Strategic Product Mapping Framework",
        description: "A step-by-step system for analyzing, organizing, and presenting your products in ways that maximize perceived value and minimize decision friction."
      },
      {
        title: "The Anchor Product Effect",
        description: "Master the psychology of anchoring to make your core offerings feel like incredible deals — without discounting or cheapening your brand."
      },
      {
        title: "The Hidden Funnel Strategy",
        description: "Build invisible conversion paths that guide customers from browse to buy without aggressive selling. Turn your product catalog into an automated sales machine."
      }
    ],
    bonuses: [],
    faq: [
      {
        question: "Will this work if I only have a few products?",
        answer: "Absolutely. The strategic mapping framework works whether you have 5 products or 500. In fact, smaller catalogs often see even bigger improvements because each product placement decision has more impact. You'll learn how to maximize every position in your store."
      },
      {
        question: "I'm already getting sales. Do I really need this?",
        answer: "If you're getting sales without strategic product mapping, imagine what happens when you add it. Most stores see 30-50% increases in average order value alone. You're leaving significant money on the table if your products aren't strategically positioned."
      },
      {
        question: "Is this different from just organizing my store?",
        answer: "Completely different. Organization is about making products easy to find. Strategic mapping is about engineering purchase decisions. It's the difference between a grocery store and Apple's product lineup — both sell things, but one prints money."
      },
      {
        question: "What if I buy multiple courses — do they overlap?",
        answer: "Every course is designed to solve a specific part of the conversion equation. They complement each other without repeating content, so stacking them creates compounding impact."
      },
      {
        question: "Will I get lifetime access?",
        answer: "Yes. One-time payment, lifetime access. No subscriptions. No hidden fees."
      },
      {
        question: "Is this just theory or can I apply it right away?",
        answer: "This is 100% practical. You'll get a clear framework + real examples + plug-and-play templates that you can implement immediately."
      },
      {
        question: "Do I need a team to apply this?",
        answer: "Not at all. Every tactic was designed for solo operators. You can implement everything with minimal tech skills or outsource it easily if you prefer."
      },
      {
        question: "Why is this only $39?",
        answer: "We want every serious eCommerce entrepreneur to have access to billion-dollar strategies — not just those with big budgets. At $39, this pays for itself with a single additional sale. Important: This price won't last forever. We reserve the right to increase it at any time."
      }
    ]
  },
  "ab-test-results": {
    slug: "ab-test-results",
    hidden: true,
    title: "37 Proven A/B Test Results",
    subtitle: "Years of Data, Delivered in Hours",
    description: "Skip the guesswork. Apply what already works. Get instant access to 37 proven A/B tests that delivered 6% to 44% conversion improvements.",
    price: 10,
    originalPrice: 97,
    image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_42_9dbe83ef-43df-40d5-88eb-3cd7f29d394a.jpg?v=1757233262",
    heroImage: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff_7.jpg?v=1760524354",
    badge: "Data-Driven",
    stats: [
      { value: "37", label: "tests" },
      { value: "6-44%", label: "improvement" },
      { value: "XLS", label: "format" }
    ],
    highlights: [
      "Get 37 proven A/B test results in one actionable XLS file",
      "Skip months of testing and thousands in wasted ad spend",
      "Each test delivered 6% to 44% conversion improvement",
      "Data from millions of real visitors with statistical significance",
      "Apply proven changes to your site in hours, not years",
      "Stop guessing — implement what already works"
    ],
    visuals: [
      { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2.gif?v=1751796400", caption: "Years of testing data" },
      { url: "https://media.tenor.com/IQ6Z-aPhr1wAAAAM/date-everywhere-data.gif", caption: "Data worth millions" }
    ],
    longDescription: `If you're tired of guessing, or wasting money... Here's the shortcut that will save you months of testing and thousands of dollars in wasted ad spend.

Data = Money. And here's the proof...

For years, we've been running A/B tests across multiple websites - testing everything from simple button text to complex page structures. Every website we managed had at least one live A/B test at all times. Every change - no matter how small - was tested, measured, and optimized.

Some tests improved conversions by 6%, others by as much as 44%. Together, they created powerful insights that drove consistent growth.

Each test was run on real websites with tens of thousands (sometimes hundreds of thousands) of real visitors. This is data that cost millions of dollars and years of testing to obtain.

Now, for the first time, we've compiled the results of 37 proven A/B tests into a clear, actionable XLS file...

Instead of spending years testing every possible change... You can skip the guesswork and implement what's already proven to work. In just a few hours.

From minor tweaks like button text to deeper changes in page structure and messaging. These results reveal what actually moves the needle - not what "sounds good."

Backed by pure, indisputable data about how humans actually make decisions.`,
    modules: [
      {
        title: "Button Text Changes",
        description: "Simple tweaks to button copy delivered measurable lift — some as high as 18% improvement in click-through rates."
      },
      {
        title: "Page Structure Optimization",
        description: "Rearranging elements and adjusting layouts led to conversion improvements between 12% and 31% across different page types."
      },
      {
        title: "Messaging & Copy Tests",
        description: "Changes to headlines, value propositions, and messaging boosted conversions by up to 44% — the highest result in the collection."
      }
    ],
    bonuses: [],
    faq: [
      {
        question: "Will these tests work for my website?",
        answer: "Yes. These are 37 fundamental tests relevant to virtually any website. Each one has been proven to increase conversions between 6% and 44%. Whether you're running e-commerce, SaaS, or lead generation — these principles apply universally because they're based on how humans make decisions."
      },
      {
        question: "What if I buy multiple courses — do they overlap?",
        answer: "Every course is designed to solve a specific part of the conversion equation. They complement each other without repeating, so stacking them creates compounding impact."
      },
      {
        question: "Will I get lifetime access?",
        answer: "Yes. One-time payment, lifetime access. No subscriptions. No hidden fees."
      },
      {
        question: "Is this just theory or can I apply it right away?",
        answer: "This is 100% practical. You'll get a clear XLS file with real test results and actionable insights that you can implement immediately. No fluff, no theory — just what worked, what didn't, and by how much."
      },
      {
        question: "Do I need a team to apply this?",
        answer: "Not at all. Every insight was designed for solo operators. You can implement everything with minimal tech skills or outsource it easily if you prefer. Most changes take minutes, not hours."
      },
      {
        question: "How is this different from generic 'best practices' advice?",
        answer: "This isn't generic advice. This is real data from real tests run on high-traffic websites with tens (sometimes hundreds) of thousands of visitors per test. Every result is backed by statistical significance — not opinion or guesswork."
      },
      {
        question: "What if I'm not satisfied?",
        answer: "We offer a full money-back guarantee. If you don't find value in these insights, just reach out and we'll refund you — no questions asked."
      },
      {
        question: "Can I really see results 'starting today'?",
        answer: "Yes. These are proven changes you can implement immediately. Some take minutes to apply. The moment you make the change, you start benefiting from years of testing that's already been done for you."
      }
    ]
  },
  "quiz-tactic": {
    slug: "quiz-tactic",
    title: "The Quiz Tactic",
    subtitle: "The Secret Weapon That Took Brands From 3% to 10% Conversion",
    description: "Steal the billion-dollar tactic that makes visitors 10X more likely to buy. Build conversion machines that generate 8-10% conversion rates consistently.",
    price: 10,
    originalPrice: 197,
    image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_46.jpg?v=1757233317",
    heroImage: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff_8.jpg?v=1760529285",
    badge: "Conversion",
    stats: [
      { value: "6", label: "modules" },
      { value: "8-10%", label: "conversion" },
      { value: "300-400%", label: "lift" }
    ],
    highlights: [
      "Build conversion machines that generate 8-10% conversion rates",
      "Bypass logical resistance and tap into emotional decision-making",
      "Get plug-and-play templates for any eCommerce niche",
      "Master personalization that makes visitors feel understood",
      "Collect valuable customer data while delivering massive value",
      "Turn browsers into buyers with psychological precision"
    ],
    visuals: [
      { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/9708718a5263943a338e9072eec122d5.gif?v=1742999762", caption: "Stop the frustration of low conversions" },
      { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/3be5a1c2fd9a8bd284bfabb6506ed8ce.gif?v=1742999766", caption: "Watch your conversion rate go to the moon" }
    ],
    longDescription: `In a world where Zuck rules us... Millions of eCom store owners believe their creative is what sets them apart, blindly testing creatives hoping to find a "winner" and barely hitting 1% conversion rate. And they think it's called 'strategy'...

We build a conversion machine for every brand that keeps generating for us over 2 years 8–10% conversion Rate. That's a "Cha-ching!" for every 10-12 visitors.

It all started two years ago... when a friendly guy sitting with me at the office complex, turned out to be the lead developer at one of the biggest skincare companies in the world...

"What's your conversion rate?" I asked him. And he gave an answer I didn't believe was real… "8%–12%, depends on the period"

From that moment – everything inside me changed completely. Like a good source of truth, he just spilled everything… The entire method that took them from losing money to a company generating hundreds of millions a year.

The Quiz tactic is like a money machine. Put in $1 – get back $10.

A properly built quiz tactic changes the game forever. We're not talking about tweaks – but about jumps of 300–400% in conversion rate that actually happen when done right.`,
    modules: [
      {
        title: "The Psychology Framework",
        description: "Discover why quizzes bypass logical resistance and tap directly into the buyer's emotional decision-making process. Learn the exact psychological triggers that make visitors 10X more likely to purchase."
      },
      {
        title: "Quiz Architecture Blueprint",
        description: "Get the proven question structure that elite brands use. Learn which questions to ask, in what order, and why each one builds unstoppable momentum toward the purchase."
      },
      {
        title: "Personalization Engine",
        description: "Master the art of making every visitor feel like you're speaking directly to them. Learn how to segment and recommend products with laser precision, dramatically increasing perceived value."
      },
      {
        title: "Implementation Templates",
        description: "No need to start from scratch. Get plug-and-play templates for fashion, beauty, supplements, and general eCommerce. Simply customize for your brand and deploy within hours."
      },
      {
        title: "Data Collection Strategy",
        description: "Learn how to ethically collect valuable customer data while delivering massive value. This data becomes pure gold for your email marketing, retargeting, and product development."
      },
      {
        title: "Conversion Optimization Secrets",
        description: "Discover the micro-optimizations that separate 3% conversion rates from 10%+ conversion rates. Every button placement, color choice, and word matters — and you'll know exactly what works."
      }
    ],
    bonuses: [],
    faq: [
      {
        question: "I don't need this. Why should I care about quiz tactics?",
        answer: "You think you don't need it only because you haven't known it yet. There's a reason why the world's leading brands invest billions in this tactic. They don't do it for fun — they do it because it multiplies revenue. While you're stuck at 1-3% conversion, they're cruising at 8-12%. The gap isn't talent or budget — it's knowing what they know."
      },
      {
        question: "Will this work for my specific type of eCommerce store?",
        answer: "The Quiz Tactic works for any eCommerce brand that sells to humans. Fashion, beauty, supplements, home goods, electronics — it doesn't matter. The psychology is universal. We've seen it transform conversion rates across dozens of niches."
      },
      {
        question: "What if I buy multiple courses — do they overlap?",
        answer: "Every course is designed to solve a specific part of the conversion equation. They complement each other without repeating, so stacking them creates compounding impact."
      },
      {
        question: "Will I get lifetime access?",
        answer: "Yes. One-time payment, lifetime access. No subscriptions. No hidden fees. You buy it once and own it forever, including all future updates."
      },
      {
        question: "Is this just theory or can I apply it right away?",
        answer: "This is 100% practical. You'll get a clear framework + real examples + plug & play templates that you can implement immediately. No fluff, no filler — just actionable strategies."
      },
      {
        question: "Do I need a team to apply this?",
        answer: "Not at all. Every tactic was designed for solo operators. You can implement everything with minimal tech skills or outsource it easily if you prefer. No developers required."
      },
      {
        question: "How long will it take to see results?",
        answer: "Most brands see measurable improvements within days of implementing the Quiz Tactic. The case study in this page? That brand saw results in less than a week. This isn't a slow-burn strategy — it's a rapid transformation tool."
      },
      {
        question: "What if I'm not tech-savvy?",
        answer: "The templates are designed to be plug-and-play. If you can copy and paste, you can implement this. We've removed all technical barriers so you can focus on results, not code."
      }
    ]
  },
  "laser-targeting": {
    slug: "laser-targeting",
    title: "Laser Targeting",
    subtitle: "Reach Only The 0.001% Ready to Buy",
    description: "Inject steroids into Meta's AI and reach only people who match your product 100%. Stop burning money on audiences that will never buy.",
    price: 10,
    originalPrice: 197,
    image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_45.jpg?v=1757233284",
    heroImage: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-03-26T183609.222.png?v=1743008742",
    badge: "Meta Ads",
    stats: [
      { value: "14.84", label: "ROAS" },
      { value: "23M+", label: "impressions" },
      { value: "52K", label: "data points" }
    ],
    highlights: [
      "Target the 0.001% who will crave your product the second they see the ad",
      "Train Meta's AI to work like a bloodhound hunting your perfect customer",
      "Leverage 52,000 data points Meta collects on every user",
      "Build remarketing sequences that generate 30-50% of your revenue",
      "Master the Avatar Mapping Protocol for subconscious targeting",
      "Achieve 10+ ROAS consistently with surgical precision"
    ],
    visuals: [
      { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/rambo-shooting.gif?v=1743008740", caption: "Precision targeting that hits every time" },
      { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-03-26T183609.222.png?v=1743008742", caption: "Real results: 14.84 ROAS over 5 months" }
    ],
    longDescription: `While Everyone's Playing Russian Roulette With Their Ad Budget...

Cold audiences... Warm audiences... Interest-based targeting... Lookalikes... All of them acting like it's the Wild West, relying on Zuckerberg and praying the algorithm will bless them...

You're burning $50, $100, $500 a day on Meta ads. That's 5,000 to 50,000 impressions daily. Enough audience to turn you into a millionaire if everyone bought.

But 99.7% of your audience isn't relevant. Only 1 in 3,000 to 7,000 people will actually buy.

The problem isn't your product. The problem isn't your creative. The problem is who's seeing it.

Meta Collects 52,000 Data Points On Every Single User. 80% of your screen time belongs to Meta. That means Facebook knows exactly what you want, what you love, what you're struggling with... What you'll buy – and exactly when you're most likely to buy it.

While everyone's spraying bullets hoping to hit something... We target like a laser and reach only the 0.001% who are ready to pull out the credit card.

Train Meta's AI To Work Like a Bloodhound — hunting down only the people who match your product 100%.

14.84 ROAS Over 5 Months With 23+ Million Impressions. Real results. Not cold traffic gambling. Not algorithm prayers. Surgical precision targeting that prints money.`,
    modules: [
      {
        title: "The 0.001% Targeting Method",
        description: "Learn how to identify and reach the tiny fraction of people who will crave your product the second they see the ad. Stop wasting money on irrelevant impressions."
      },
      {
        title: "Meta AI Injection System",
        description: "Discover the exact data inputs that make Meta's algorithm obsessed with finding your perfect buyer. Train the AI to work for you 24/7."
      },
      {
        title: "Multi-Angle Attack Strategy",
        description: "Learn how to attack your audience from so many angles, it's nearly impossible for them to ignore you. Combine AI to pay less for better traffic."
      },
      {
        title: "The Avatar Mapping Protocol",
        description: "Target not by demographics, but by subconscious fears and desires. Go beyond surface-level targeting to psychological precision."
      },
      {
        title: "Remarketing Mastery",
        description: "Build remarketing sequences that feel like psychological compulsion. Generate 30-50% of your revenue from people who already showed interest."
      },
      {
        title: "The Bloodhound System",
        description: "Make Meta's AI work 24/7 like a bloodhound, hunting down ready-to-buy customers while you sleep. Set it and let it print money."
      }
    ],
    bonuses: [],
    faq: [
      {
        question: "I already know all the targeting secrets...",
        answer: "No, you don't. What you know is the 3% that everyone teaches — the surface-level tactics. What we're revealing are secret, precise methods that tap into the remaining 97% of Meta's AI capabilities. If you already knew them, you'd already be running 10+ ROAS consistently."
      },
      {
        question: "What if I buy multiple courses — do they overlap?",
        answer: "Every course is designed to solve a specific part of the conversion equation. They complement each other without repeating content, so stacking them creates compounding impact. Laser Targeting focuses exclusively on reaching the right audience with surgical precision."
      },
      {
        question: "Will I get lifetime access?",
        answer: "Yes. One-time payment, lifetime access. No subscriptions. No hidden fees. Access it whenever you want, as many times as you want."
      },
      {
        question: "Is this just theory or can I apply it right away?",
        answer: "This is 100% practical. You'll get a clear framework + real examples + plug & play templates that you can implement immediately. No fluff, no theory for theory's sake."
      },
      {
        question: "Do I need a team to apply this?",
        answer: "Not at all. Every tactic was designed for solo operators. You can implement everything with minimal tech skills or outsource it easily if you prefer."
      },
      {
        question: "What if this doesn't work for my product/niche?",
        answer: "Every product has an audience. There are 8 billion people on this planet. Even if your product is 'weird' or 'niche,' there are thousands who want it. The Laser Targeting method works for any product because it's about finding YOUR specific buyers."
      },
      {
        question: "How long does it take to see results?",
        answer: "Most people see improvements within the first week of implementation. Some see dramatic results within 48-72 hours. The tactics are designed for fast implementation and quick wins."
      }
    ]
  },
  "ai-photographer": {
    slug: "ai-photographer",
    title: "The $10,000 AI Photographer",
    subtitle: "Create Billion-Dollar Brand Images in Seconds",
    description: "Stop paying $10,000 for product photography. Generate studio-grade model shots, product images, and lifestyle visuals that outperform real human photo shoots — completely free with AI.",
    price: 10,
    originalPrice: 97,
    image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_54.jpg",
    heroImage: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/7c40abec-7cfc-4805-9c1d-5290a3fd3afa.png",
    badge: "AI Tool",
    stats: [
      { value: "$10K", label: "saved per shoot" },
      { value: "10 sec", label: "per image" },
      { value: "∞", label: "possibilities" }
    ],
    highlights: [
      "Generate studio-quality product photos without a camera",
      "Create lifestyle shots with AI models that convert better than real photos",
      "Replace $10,000 photography budgets with free AI tools",
      "Get consistent brand imagery across all products",
      "Create unlimited variations for A/B testing",
      "No photography skills or equipment needed"
    ],
    visuals: [
      { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/7c40abec-7cfc-4805-9c1d-5290a3fd3afa.png", caption: "AI-generated product photography" }
    ],
    longDescription: `The Old Way of Product Photography Is Dead.

Hiring a photographer: $2,000-$10,000 per shoot. Models: $500-$2,000 per day. Studio rental: $200-$500 per hour. Props and styling: $500+. Post-production editing: $50-$200 per image.

Total cost for one product line? $5,000-$15,000. Time to get final images? 2-4 weeks.

The New Way Takes 10 Seconds.

We spent months fine-tuning AI capabilities to generate studio-grade model shots, product images, and lifestyle visuals that outperform real human photo shoots — and it's completely FREE.

The images you'll create will make people think you spent $10,000 on a professional shoot. Billion-dollar brands are already using this exact method.

You'll learn exactly how to:
• Generate photorealistic product images that convert
• Create model shots without hiring models
• Build lifestyle scenes that tell your brand story
• Produce consistent imagery across your entire catalog
• A/B test unlimited creative variations

The same AI photography techniques in this course are being used by brands generating 8-figures. Now they're yours.`,
    modules: [
      {
        title: "AI Photography Fundamentals",
        description: "Master the core concepts of AI image generation. Learn which tools to use, how to write prompts that produce professional results, and the secrets to consistent brand imagery."
      },
      {
        title: "Product Photography Mastery",
        description: "Generate stunning product shots on any background. Learn lighting techniques, composition rules, and post-processing workflows that make AI images indistinguishable from professional photography."
      },
      {
        title: "Model & Lifestyle Shots",
        description: "Create photorealistic model shots and lifestyle scenes without hiring anyone. Master the art of generating humans, poses, and environments that sell your products."
      },
      {
        title: "Brand Consistency System",
        description: "Build a system for producing consistent imagery across your entire product catalog. Create style guides, prompt templates, and workflows that scale."
      }
    ],
    bonuses: [],
    faq: [
      {
        question: "Do I need any design or photography experience?",
        answer: "Not at all. This course is designed for complete beginners. If you can type, you can create professional product images. We provide exact prompts and step-by-step instructions that anyone can follow."
      },
      {
        question: "What AI tools do I need?",
        answer: "We show you how to use free AI tools that produce professional results. No expensive software subscriptions required. Everything you need is either free or has a free tier that's more than enough for most stores."
      },
      {
        question: "Will AI images look fake or obvious?",
        answer: "When done correctly, AI images are indistinguishable from professional photography. In fact, many AI-generated images now outperform real photos in conversion tests. We teach you the techniques that make images look 100% real."
      },
      {
        question: "Can I use these images commercially?",
        answer: "Yes. The images you generate are yours to use however you want — on your website, in ads, on social media, anywhere. We also cover the legal aspects and best practices for commercial AI image use."
      },
      {
        question: "How long does it take to create an image?",
        answer: "Once you know the techniques, you can generate a professional product image in under 10 seconds. Creating a full product line with multiple angles and lifestyle shots takes minutes, not days."
      },
      {
        question: "Will this work for my specific product type?",
        answer: "Yes. Whether you're selling fashion, electronics, home goods, beauty products, or anything else — the AI techniques work universally. We include examples and prompts for all major product categories."
      },
      {
        question: "What if I buy multiple courses — do they overlap?",
        answer: "Every course is designed to solve a specific part of the eCommerce equation. They complement each other without repeating content, so combining them creates compounding results."
      },
      {
        question: "Will I get lifetime access?",
        answer: "Yes. One-time payment, lifetime access. No subscriptions. No hidden fees. Plus you'll receive all future updates as AI technology evolves."
      },
      {
        question: "What if I'm not satisfied?",
        answer: "We offer a full money-back guarantee. If you don't find value in this course, just reach out and we'll refund you — no questions asked."
      }
    ]
  },
  "meta-ad-templates": {
    slug: "meta-ad-templates",
    title: "1,000+ Meta Ad Templates",
    subtitle: "Generate Winning Ad Creatives In 10 Seconds",
    description: "Stop wasting 6 hours to find one winning creative. Get instant access to 1,000+ proven Meta ad templates that are battle-tested on massive budgets.",
    price: 10,
    originalPrice: 97,
    image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_59.jpg?v=1757325725",
    heroImage: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/6574469f-6304-4b63-a8a5-9d260fc2739a.png?v=1760535779",
    badge: "Templates",
    stats: [
      { value: "1,000+", label: "templates" },
      { value: "10 sec", label: "to generate" },
      { value: "$0.02", label: "per template" }
    ],
    highlights: [
      "No more creative block - every template ready to customize in seconds",
      "30 seconds from choosing to downloading your ad creative",
      "Zero financial investment - works with Canva's free version",
      "Battle-tested on massive ad budgets in Meta ads",
      "Instant creative variety - test multiple angles without designing from scratch",
      "Scale faster than competitors while they waste time in design tools"
    ],
    visuals: [
      { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/canvagif1.webp?v=1752485872", caption: "Step 1: Choose your template" },
      { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/canvagif2.gif?v=1752485913", caption: "Step 2: Customize in Canva" },
      { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/canvagif3.gif?v=1752485958", caption: "Step 3: Launch & Scale" }
    ],
    longDescription: `Why struggle for hours thinking... Staring at a blank screen. Wondering what creative will work. Trying to come up with something "different"...

When you can generate a proven creative in 10 seconds?

On average, it takes a marketer about 35 minutes to create a single creative. That's 15 minutes brainstorming + 20 minutes actually creating it. And to find a winning creative? You need to test about 10 different variations.

Which means it takes you almost 6 HOURS to create just ONE winning creative!

And even after all that time... You're still not sure if it will work. You're burning money on tests. You're losing time. Your competitors are scaling while you're stuck in Canva...

There's a better way.

In one simple file, over 1,000 Canva templates for Meta ads that are proven to work! No thinking required. No design skills needed. Just pick, customize, and launch.`,
    modules: [
      {
        title: "Choose Your Template",
        description: "Pick from 1,000+ expertly designed static ad templates in Canva. Every template is battle-tested and proven to convert."
      },
      {
        title: "Customize in Canva",
        description: "Edit your template in seconds with your logo, colors, and copy. Simple drag-and-drop. No design experience needed."
      },
      {
        title: "Launch & Scale",
        description: "Download your ad from Canva and launch it in Ads Manager. Watch your ROAS climb while your competitors struggle with creative testing."
      }
    ],
    bonuses: [],
    faq: [
      {
        question: "Do I need design skills to use these templates?",
        answer: "Absolutely not. Every template is designed for drag-and-drop editing in Canva. If you can click and type, you can create stunning ad creatives. No design experience required."
      },
      {
        question: "Will these templates work for my niche/product?",
        answer: "Yes. The templates cover a wide variety of styles, layouts, and formats that work across virtually every niche. From fashion to electronics, supplements to home goods - you'll find templates that fit your brand."
      },
      {
        question: "Do I need to pay for Canva Pro?",
        answer: "No. All templates work perfectly with Canva's free version. Zero additional software costs. You can start using them immediately without any subscriptions."
      },
      {
        question: "How are these different from free templates online?",
        answer: "These templates are battle-tested on real ad campaigns with massive budgets. They're not generic designs - they're proven winners that have generated real results. Free templates online are untested guesses. These are data-backed performers."
      },
      {
        question: "What if I buy multiple courses - do they overlap?",
        answer: "Every course and tool is designed to solve a specific part of the advertising equation. They complement each other without repeating content, so combining them creates compounding results."
      },
      {
        question: "Will I get lifetime access?",
        answer: "Yes. One-time payment, lifetime access. No subscriptions. No hidden fees. Plus you'll receive any future template additions at no extra cost."
      },
      {
        question: "How quickly can I start using the templates?",
        answer: "Instantly. After purchase, you'll get immediate access to the entire library. You can have your first ad creative ready in under 60 seconds."
      },
      {
        question: "What if I'm not satisfied?",
        answer: "We offer a full money-back guarantee. If you don't find value in these templates, just reach out and we'll refund you — no questions asked."
      }
    ]
  },
  "ad-copy-templates": {
    slug: "ad-copy-templates",
    title: "50+ Ad Copy Templates",
    subtitle: "From The World's Greatest Copywriters",
    description: "Steal the exact ad copy frameworks from copywriters who charge $50,000 per sales letter. Templates tested on over $10 million in ad spend.",
    price: 10,
    originalPrice: 97,
    image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_47.jpg",
    heroImage: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff_9.jpg",
    badge: "Copy Templates",
    stats: [
      { value: "50+", label: "templates" },
      { value: "$10M+", label: "ad spend tested" },
      { value: "$50K", label: "copywriter rate" }
    ],
    highlights: [
      "Copy frameworks from Stefan Georgi ($50K per sales letter)",
      "Templates inspired by Gary Halbert ($15K per page)",
      "Battle-tested on over $10 million in Meta ad spend",
      "Plug-and-play headlines, hooks, and CTAs",
      "Works for any niche or product type",
      "No copywriting experience needed"
    ],
    visuals: [
      { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff_9.jpg", caption: "Ad copy that converts" }
    ],
    longDescription: `The World's Greatest Copywriters Charge $15,000-$50,000 Per Letter...

Stefan Georgi charges $50,000 for a single sales letter. Gary Halbert charged $15,000 per page. David Ogilvy's campaigns generated billions. Eugene Schwartz wrote ads that ran profitably for decades.

What do they know that you don't?

They've spent lifetimes discovering the exact psychological triggers, headline formulas, and story structures that make people pull out their credit cards.

Now You Can Steal Their Secrets.

We've compiled 50+ ad copy templates directly inspired by the frameworks these legendary copywriters used. Every headline formula. Every hook structure. Every call-to-action that converts.

These aren't generic templates you find online. These are battle-tested frameworks proven on over $10 million in real ad spend.

You'll get:
• Headline formulas that stop the scroll instantly
• Opening hooks that create irresistible curiosity
• Story structures that build emotional connection
• Objection handlers that eliminate doubt
• CTAs that compel immediate action

Simply fill in the blanks with your product details and launch. No copywriting experience required.`,
    modules: [
      {
        title: "Headline Formulas",
        description: "15+ proven headline templates that stop the scroll. Each formula is designed to trigger curiosity and demand attention in a crowded newsfeed."
      },
      {
        title: "Hook Structures",
        description: "Opening lines that grab attention in the first 3 seconds. These hooks are engineered to make people stop scrolling and start reading."
      },
      {
        title: "Story Frameworks",
        description: "Narrative structures that build emotional connection and desire. Turn features into feelings that drive purchases."
      },
      {
        title: "CTA Templates",
        description: "Call-to-action formulas that compel immediate action. Remove friction and make clicking feel like the obvious next step."
      }
    ],
    bonuses: [],
    faq: [
      {
        question: "Do I need copywriting experience to use these?",
        answer: "Not at all. Every template is fill-in-the-blank simple. Just insert your product details, benefits, and brand voice. The psychological structure is already built in — you just add your specifics."
      },
      {
        question: "Will these work for my specific product/niche?",
        answer: "Yes. These are universal frameworks based on human psychology — not niche-specific tricks. Whether you sell fashion, supplements, electronics, or services, these templates work because they tap into fundamental buying triggers."
      },
      {
        question: "How are these different from free templates online?",
        answer: "Free templates online are generic and untested. These templates are directly inspired by copywriters who charge $15,000-$50,000 per letter and have been tested on over $10 million in real ad spend. The difference shows in your results."
      },
      {
        question: "Can I use these for Facebook, Instagram, and TikTok ads?",
        answer: "Absolutely. These copy frameworks work across all platforms. We include variations optimized for different placements — feed ads, stories, reels, and more."
      },
      {
        question: "What if I buy multiple courses — do they overlap?",
        answer: "Every course is designed to solve a specific part of the advertising equation. They complement each other without repeating content, so combining them creates compounding results."
      },
      {
        question: "Will I get lifetime access?",
        answer: "Yes. One-time payment, lifetime access. No subscriptions. No hidden fees. Plus you'll receive any future template additions at no extra cost."
      },
      {
        question: "How quickly can I start using these templates?",
        answer: "Immediately. After purchase, you get instant access to all 50+ templates. You can have your first ad copy ready in minutes."
      },
      {
        question: "What if I'm not satisfied?",
        answer: "We offer a full money-back guarantee. If you don't find value in these templates, just reach out and we'll refund you — no questions asked."
      }
    ]
  }
,

  "meta-headlines": {
    slug: "meta-headlines",
    title: "85 Meta Ad Headlines & Hooks",
    subtitle: "Proven Headlines That Stop The Scroll",
    description: "Get 85 battle-tested headlines and hooks that have generated millions in ad revenue. Copy, paste, and watch your CTR skyrocket.",
    price: 10,
    originalPrice: 97,
    image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_48.jpg?v=1757233247",
    stats: [
      { value: "5", label: "modules" },
      { value: "2+", label: "hours" },
      { value: "20+", label: "templates" }
    ],
    longDescription: `Get 85 battle-tested headlines and hooks that have generated millions in ad revenue. Copy, paste, and watch your CTR skyrocket.

This course gives you everything you need to start seeing results immediately. No fluff, no theory - just actionable strategies that work.`,
    modules: [
      {
        title: "Core Framework",
        description: "Learn the foundational principles that make this system work."
      },
      {
        title: "Implementation Guide",
        description: "Step-by-step instructions to apply what you've learned."
      },
      {
        title: "Advanced Strategies",
        description: "Take your results to the next level with advanced techniques."
      }
    ],
    bonuses: [],
    faq: [
      {
        question: "How quickly can I start using this?",
        answer: "Immediately. After purchase, you get instant access to everything. You can start implementing within minutes."
      },
      {
        question: "Will this work for my niche?",
        answer: "Yes. These are universal frameworks based on proven principles that work across all niches and markets."
      },
      {
        question: "What if I'm not satisfied?",
        answer: "We offer a full money-back guarantee. If you don't find value, just reach out and we'll refund you - no questions asked."
      }
    ]
  },

  "offer-workshop": {
    slug: "offer-workshop",
    title: "Offer Workshop: Irresistible Ecom Offer",
    subtitle: "Create Offers Your Customers Cannot Refuse",
    description: "Learn the exact framework to craft irresistible eCommerce offers that convert browsers into buyers and maximize your average order value.",
    price: 10,
    originalPrice: 197,
    image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_50.jpg?v=1757233399",
    stats: [
      { value: "5", label: "modules" },
      { value: "2+", label: "hours" },
      { value: "20+", label: "templates" }
    ],
    longDescription: `Learn the exact framework to craft irresistible eCommerce offers that convert browsers into buyers and maximize your average order value.

This course gives you everything you need to start seeing results immediately. No fluff, no theory - just actionable strategies that work.`,
    modules: [
      {
        title: "Core Framework",
        description: "Learn the foundational principles that make this system work."
      },
      {
        title: "Implementation Guide",
        description: "Step-by-step instructions to apply what you've learned."
      },
      {
        title: "Advanced Strategies",
        description: "Take your results to the next level with advanced techniques."
      }
    ],
    bonuses: [],
    faq: [
      {
        question: "How quickly can I start using this?",
        answer: "Immediately. After purchase, you get instant access to everything. You can start implementing within minutes."
      },
      {
        question: "Will this work for my niche?",
        answer: "Yes. These are universal frameworks based on proven principles that work across all niches and markets."
      },
      {
        question: "What if I'm not satisfied?",
        answer: "We offer a full money-back guarantee. If you don't find value, just reach out and we'll refund you - no questions asked."
      }
    ]
  },

  "20-laws": {
    slug: "20-laws",
    title: "The 20 Laws to Sell Anything to Anyone",
    subtitle: "Timeless Principles of Persuasion",
    description: "Master the 20 fundamental laws of selling that have stood the test of time. Apply these principles to any product, any market, any audience.",
    price: 10,
    originalPrice: 197,
    image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_64.jpg?v=1760881483",
    stats: [
      { value: "5", label: "modules" },
      { value: "2+", label: "hours" },
      { value: "20+", label: "templates" }
    ],
    longDescription: `Master the 20 fundamental laws of selling that have stood the test of time. Apply these principles to any product, any market, any audience.

This course gives you everything you need to start seeing results immediately. No fluff, no theory - just actionable strategies that work.`,
    modules: [
      {
        title: "Core Framework",
        description: "Learn the foundational principles that make this system work."
      },
      {
        title: "Implementation Guide",
        description: "Step-by-step instructions to apply what you've learned."
      },
      {
        title: "Advanced Strategies",
        description: "Take your results to the next level with advanced techniques."
      }
    ],
    bonuses: [],
    faq: [
      {
        question: "How quickly can I start using this?",
        answer: "Immediately. After purchase, you get instant access to everything. You can start implementing within minutes."
      },
      {
        question: "Will this work for my niche?",
        answer: "Yes. These are universal frameworks based on proven principles that work across all niches and markets."
      },
      {
        question: "What if I'm not satisfied?",
        answer: "We offer a full money-back guarantee. If you don't find value, just reach out and we'll refund you - no questions asked."
      }
    ]
  },

  "ugly-ads": {
    slug: "ugly-ads",
    title: "How to Build Simple & Ugly Meta Ads That Work",
    subtitle: "Stop Overthinking, Start Converting",
    description: "Discover why simple, 'ugly' ads often outperform polished creatives. Learn to create high-converting Meta ads in minutes, not hours.",
    price: 10,
    originalPrice: 97,
    image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_51.jpg?v=1757233270",
    stats: [
      { value: "5", label: "modules" },
      { value: "2+", label: "hours" },
      { value: "20+", label: "templates" }
    ],
    longDescription: `Discover why simple, 'ugly' ads often outperform polished creatives. Learn to create high-converting Meta ads in minutes, not hours.

This course gives you everything you need to start seeing results immediately. No fluff, no theory - just actionable strategies that work.`,
    modules: [
      {
        title: "Core Framework",
        description: "Learn the foundational principles that make this system work."
      },
      {
        title: "Implementation Guide",
        description: "Step-by-step instructions to apply what you've learned."
      },
      {
        title: "Advanced Strategies",
        description: "Take your results to the next level with advanced techniques."
      }
    ],
    bonuses: [],
    faq: [
      {
        question: "How quickly can I start using this?",
        answer: "Immediately. After purchase, you get instant access to everything. You can start implementing within minutes."
      },
      {
        question: "Will this work for my niche?",
        answer: "Yes. These are universal frameworks based on proven principles that work across all niches and markets."
      },
      {
        question: "What if I'm not satisfied?",
        answer: "We offer a full money-back guarantee. If you don't find value, just reach out and we'll refund you - no questions asked."
      }
    ]
  }};

export const getCourseBySlug = (slug: string): Course | undefined => {
  // Direct lookup first
  if (coursesData[slug]) {
    return coursesData[slug];
  }

  // Try to find by matching slug property
  const bySlugProp = Object.values(coursesData).find((c) => c.slug === slug);
  if (bySlugProp) return bySlugProp;

  // Normalize slug: remove prefixes, convert to lowercase
  const normalizeSlug = (s: string) => s.toLowerCase()
    .replace(/^the-/, '')
    .replace(/-course$/, '')
    .replace(/-system$/, '');

  const normalizedSlug = normalizeSlug(slug);

  // Try normalized lookup
  if (coursesData[normalizedSlug]) {
    return coursesData[normalizedSlug];
  }

  // Try adding common suffixes back
  const withSystem = `${normalizedSlug}-system`;
  if (coursesData[withSystem]) {
    return coursesData[withSystem];
  }

  // Common slug mappings for edge cases
  const slugMappings: Record<string, string> = {
    'subconscious': 'subconscious-trap',
    'trap': 'subconscious-trap',
    'ltv': 'ltv-system',
    'email': 'email-marketing',
    'checkout': 'abandoned-checkout',
    'finisher': 'abandoned-checkout',
    'abandoned': 'abandoned-checkout',
    'social': 'the-social-proof',
    'proof': 'the-social-proof',
    'mapping': 'product-mapping',
    'product': 'product-mapping',
    'photographer': 'ai-photographer',
    'copy': 'ad-copy-templates',
    'templates': 'meta-ad-templates',
    'creative': 'meta-ad-templates',
    'headlines': 'meta-headlines',
    'targeting': 'laser-targeting',
    'laser': 'laser-targeting',
    'quiz': 'quiz-tactic',
    'offer': 'offer-workshop',
    'laws': '20-laws',
    'ugly': 'ugly-ads',
    'ab-test': 'ab-test-results',
    'ab': 'ab-test-results',
  };

  // Check mappings
  for (const [key, mappedSlug] of Object.entries(slugMappings)) {
    if (normalizedSlug.includes(key) && coursesData[mappedSlug]) {
      return coursesData[mappedSlug];
    }
  }

  // Try to find by partial match
  const byPartialMatch = Object.values(coursesData).find(
    (c) =>
      c.slug.includes(normalizedSlug) ||
      normalizedSlug.includes(c.slug) ||
      normalizeSlug(c.slug).includes(normalizedSlug) ||
      normalizedSlug.includes(normalizeSlug(c.slug)) ||
      c.title.toLowerCase().replace(/\s+/g, '-').includes(normalizedSlug)
  );

  return byPartialMatch;
};

export const getAllCourses = (): Course[] => {
  return Object.values(coursesData).filter(course => !course.hidden);
};

export const getAllCoursesIncludingHidden = (): Course[] => {
  return Object.values(coursesData);
};
