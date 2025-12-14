export interface CourseModule {
  title: string;
  description: string;
}

export interface CourseBonus {
  title: string;
  description: string;
  value: number;
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
}

export const coursesData: Record<string, Course> = {
  "subconscious-trap": {
    slug: "subconscious-trap",
    title: "The Subconscious Trap",
    subtitle: "How to Bypass Buying Resistance Using Subconscious Influence",
    description: "A psychology-driven framework to increase conversions, boost AOV, and drive repeat purchases — without spending more on ads.",
    price: 29,
    originalPrice: 197,
    image: "https://quantum-scale.co/cdn/shop/files/LaserCRO-Coursemockups_41.jpg?v=1757233340",
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
        title: "Module 1: The Psychology of Buying",
        description: "Understand why people really buy. Learn the cognitive biases and emotional triggers that drive purchasing decisions — and how to ethically leverage them."
      },
      {
        title: "Module 2: Offer Architecture",
        description: "Craft offers so compelling they feel like a no-brainer. Learn the psychology of pricing, bundling, and value perception that makes customers say yes."
      },
      {
        title: "Module 3: Product Page Mastery",
        description: "Transform your product pages into conversion machines. Every element optimized using behavioral psychology principles that have been tested on millions of visitors."
      },
      {
        title: "Module 4: Cart & Checkout Psychology",
        description: "Stop losing sales at the finish line. Learn the psychological triggers that reduce abandonment and increase order values at the most critical moment."
      },
      {
        title: "Module 5: Trust Architecture",
        description: "Build instant credibility that eliminates buying resistance. Learn the exact trust signals, social proof placement, and guarantee frameworks that convert skeptics."
      },
      {
        title: "Module 6: Urgency & Scarcity",
        description: "Create authentic urgency that drives immediate action. Learn ethical scarcity tactics that increase conversions without damaging your brand reputation."
      },
      {
        title: "Module 7: Email Psychology",
        description: "Write emails that get opened, read, and clicked. Master the psychological principles behind high-converting email sequences that drive repeat purchases."
      },
      {
        title: "Module 8: Advanced Persuasion Patterns",
        description: "Go beyond basics with advanced techniques used by top 1% stores. Master the subtle patterns that compound into massive revenue gains over time."
      }
    ],
    bonuses: [
      {
        title: "High-Converting Swipe File",
        description: "50+ proven headlines, CTAs, and copy templates from 7-figure stores. Just copy, paste, and customize.",
        value: 197
      },
      {
        title: "Product Page Audit Checklist",
        description: "The exact 47-point checklist we use to audit stores generating $10M+. Find and fix your conversion killers.",
        value: 97
      },
      {
        title: "Psychology Trigger Cards",
        description: "Quick-reference cards for the 23 most powerful buying triggers. Keep them handy when optimizing any page.",
        value: 47
      },
      {
        title: "Email Sequence Templates",
        description: "5 complete email sequences: abandoned cart, post-purchase, win-back, welcome, and VIP. Ready to deploy.",
        value: 197
      },
      {
        title: "A/B Testing Playbook",
        description: "The systematic testing framework that generated $2.3M in additional revenue for our clients. Know exactly what to test and when.",
        value: 147
      },
      {
        title: "Conversion Calculator",
        description: "Spreadsheet tool to project your ROI from implementing these strategies. See your potential gains before you start.",
        value: 47
      },
      {
        title: "Private Community Access",
        description: "Connect with other store owners implementing these strategies. Share wins, get feedback, and stay accountable.",
        value: 197
      }
    ],
    faq: [
      {
        question: "Who is this course for?",
        answer: "This course is for eCommerce store owners, marketers, and entrepreneurs who want to increase conversions and sales without spending more on advertising. Whether you're doing $1K/month or $1M/month, these psychology principles apply at every scale."
      },
      {
        question: "How long do I have access?",
        answer: "Lifetime access. Once you purchase, it's yours forever — including all future updates and additions to the course material."
      },
      {
        question: "Is there a money-back guarantee?",
        answer: "Yes. 30-day money-back guarantee, no questions asked. If you implement the strategies and don't see value, we'll refund your purchase completely."
      },
      {
        question: "How quickly can I expect results?",
        answer: "Many students see measurable improvements within the first week of implementation. However, the best results come from systematically applying all modules over 30-60 days."
      },
      {
        question: "What platform does this work with?",
        answer: "These strategies work with any eCommerce platform — Shopify, WooCommerce, BigCommerce, custom builds, anything. The psychology principles are universal."
      },
      {
        question: "Do I need any special tools?",
        answer: "No special tools required. Everything can be implemented with what you already have. Some bonuses include spreadsheet templates that work with Google Sheets or Excel."
      }
    ]
  },
  "ltv-system": {
    slug: "ltv-system",
    title: "The LTV System",
    subtitle: "The Automatic System That Earns $1,000 Per Customer",
    description: "Transform one-time buyers into lifetime customers with automated systems that maximize customer lifetime value.",
    price: 47,
    originalPrice: 500,
    image: "https://quantum-scale.co/cdn/shop/files/LaserCRO-Coursemockups_58_efa8c3cd-aa72-4542-a933-0f433d8c01a1.jpg?v=1757325732",
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
        title: "Weapon 1: The LTV Engine Blueprint",
        description: "The complete framework for understanding and maximizing customer lifetime value. Map your customer journey and identify every revenue opportunity."
      },
      {
        title: "Weapon 2: Laws of Human Persuasion",
        description: "Master the psychological principles that drive repeat purchases. Learn why customers come back (or don't) and how to engineer loyalty."
      },
      {
        title: "Weapon 3: Automation Loop Protocols",
        description: "Build automated email and SMS sequences that nurture customers from first purchase to brand advocate. Set up once, profit forever."
      },
      {
        title: "Weapon 4: Rebuy Technology System",
        description: "Advanced retargeting and repurchase systems that bring customers back at the perfect moment. Predict and trigger repeat purchases on autopilot."
      },
      {
        title: "Weapon 5: Empire Growth Formula",
        description: "Scale your LTV systems to 7 and 8 figures. Advanced strategies for building a customer-centric brand that compounds growth over time."
      }
    ],
    bonuses: [
      {
        title: "Email Flow Templates Pack",
        description: "15 ready-to-deploy email sequences: welcome series, post-purchase, win-back, VIP, birthday, and more. Just customize and launch.",
        value: 297
      },
      {
        title: "SMS Automation Playbook",
        description: "Complete SMS marketing system with templates, timing strategies, and compliance guidelines. The highest-ROI channel most brands ignore.",
        value: 197
      },
      {
        title: "Customer Segmentation Guide",
        description: "Learn to segment your customers like the top 1% of brands. Target the right message to the right person at the right time.",
        value: 97
      },
      {
        title: "Loyalty Program Blueprint",
        description: "Design and launch a loyalty program that actually drives repeat purchases. Includes point structures, reward tiers, and gamification tactics.",
        value: 147
      },
      {
        title: "LTV Calculator Spreadsheet",
        description: "Track and forecast customer lifetime value with this advanced spreadsheet. Know exactly how much each customer segment is worth.",
        value: 47
      }
    ],
    faq: [
      {
        question: "What makes this different from other marketing courses?",
        answer: "This isn't about getting more traffic — it's about maximizing the customers you already have. While everyone else fights for attention, you'll be building automated systems that generate revenue from your existing customer base 24/7."
      },
      {
        question: "I'm just starting out. Is this for me?",
        answer: "If you have at least some customers, yes. The sooner you implement these systems, the more revenue you'll capture. Every day without proper LTV systems is money left on the table."
      },
      {
        question: "How long until I see results?",
        answer: "Most students see their first automated revenue within 7-14 days of implementing the core email flows. Full system implementation takes 30-60 days, after which you'll have a complete customer retention machine."
      },
      {
        question: "What platforms does this work with?",
        answer: "The strategies work with any eCommerce platform (Shopify, WooCommerce, etc.) and integrate with popular email/SMS tools like Klaviyo, Mailchimp, Postscript, and more."
      },
      {
        question: "Is there ongoing support?",
        answer: "You get lifetime access to the course and all future updates. Plus, bonus community access where you can ask questions and get feedback from other store owners."
      },
      {
        question: "What if it doesn't work for me?",
        answer: "30-day money-back guarantee, no questions asked. If you implement the systems and don't see value, we'll refund your purchase completely."
      }
    ]
  },
  "email-marketing": {
    slug: "email-marketing",
    title: "Email Marketing Revenue Engine",
    subtitle: "Turn Email Marketing Into a Revenue Engine",
    description: "Steal the full billion-dollar email system that generates 20X more revenue than any social platform — without spending another dollar on ads.",
    price: 29,
    originalPrice: 97,
    image: "https://quantum-scale.co/cdn/shop/files/LaserCRO-Coursemockups_40.jpg?v=1757233368",
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
    bonuses: [
      {
        title: "High-Converting Email Templates",
        description: "25+ battle-tested email templates that generated millions in revenue. Welcome sequences, flash sales, abandoned cart, win-back campaigns — all ready to deploy.",
        value: 197
      },
      {
        title: "Automation Flow Blueprints",
        description: "Visual diagrams of the exact automation flows used by 8-figure brands. See exactly how to connect triggers, delays, and conditions for maximum impact.",
        value: 147
      },
      {
        title: "Subject Line Swipe File",
        description: "200+ proven subject lines with open rates above 40%. Organized by category: urgency, curiosity, personal, benefit-driven, and more.",
        value: 97
      },
      {
        title: "Segmentation Masterclass",
        description: "Advanced segmentation strategies that let you send the right message to the right person at the right time. Includes RFM analysis templates.",
        value: 127
      },
      {
        title: "Deliverability Checklist",
        description: "The complete checklist to ensure your emails land in the inbox, not spam. Domain authentication, warm-up strategies, and reputation management.",
        value: 67
      }
    ],
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
    price: 29,
    originalPrice: 97,
    image: "https://quantum-scale.co/cdn/shop/files/LaserCRO-Coursemockups_76.png?v=1757233333",
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
        title: "Email 1: The Instant Reminder",
        description: "Sent within 1 hour of abandonment. Catches customers while your store is still fresh in their mind. Highest open rates of the entire sequence."
      },
      {
        title: "Email 2: The Trust Builder",
        description: "Addresses the #1 reason people abandon — trust concerns. Uses social proof and guarantees to eliminate buying resistance."
      },
      {
        title: "Email 3: The Objection Handler",
        description: "Systematically destroys every common objection. Shipping concerns, product questions, comparison shopping — all handled."
      },
      {
        title: "Email 4: The Scarcity Trigger",
        description: "Creates authentic urgency without being pushy. Strategic timing makes customers feel they might miss out."
      },
      {
        title: "Email 5: The Value Stack",
        description: "Reminds customers of everything they're getting. Re-frames the purchase as an investment, not an expense."
      },
      {
        title: "Email 6: The Personal Touch",
        description: "Feels like a 1-on-1 message from a real person. Builds emotional connection that drives action."
      },
      {
        title: "Email 7: The Final Push",
        description: "Last chance messaging that converts the holdouts. Strategic incentive timing that protects your margins while closing sales."
      }
    ],
    bonuses: [
      {
        title: "Platform Integration Guides",
        description: "Step-by-step setup instructions for Shopify, WooCommerce, BigCommerce, Klaviyo, and all major platforms. Copy-paste implementation.",
        value: 97
      },
      {
        title: "Subject Line Swipe File",
        description: "47 proven subject lines with open rates above 45%. Organized by email position in sequence for maximum impact.",
        value: 67
      },
      {
        title: "Timing Optimization Guide",
        description: "The exact send times that maximize opens and conversions. Based on analysis of millions of abandoned checkout emails.",
        value: 47
      },
      {
        title: "A/B Testing Framework",
        description: "Know exactly what to test and when. Systematic approach to improving your recovery rate over time.",
        value: 77
      }
    ],
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
  }
};

export const getCourseBySlug = (slug: string): Course | undefined => {
  return coursesData[slug];
};

export const getAllCourses = (): Course[] => {
  return Object.values(coursesData);
};
