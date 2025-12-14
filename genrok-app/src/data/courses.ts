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
  }
};

export const getCourseBySlug = (slug: string): Course | undefined => {
  return coursesData[slug];
};

export const getAllCourses = (): Course[] => {
  return Object.values(coursesData);
};
