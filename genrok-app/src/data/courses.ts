export interface CourseModule {
  title: string;
  description: string;
}

export interface CourseBonus {
  title: string;
  description: string;
  value: number;
}

export interface CourseReview {
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface CourseStat {
  value: string;
  label: string;
}

export interface Course {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  badge?: string;
  stats: CourseStat[];
  longDescription: string;
  modules: CourseModule[];
  bonuses: CourseBonus[];
  reviews: CourseReview[];
  faq: CourseFAQ[];
}

export const coursesData: Record<string, Course> = {
  "subconscious-trap": {
    slug: "subconscious-trap",
    title: "The Subconscious Trap",
    subtitle: "How to Bypass Buying Resistance Using Subconscious Influence",
    description: "The Subconscious Trap is a psychology-driven framework designed for eCommerce store owners who want to increase conversions, boost average order value (AOV), and drive repeat purchases — without spending more on ads.",
    price: 29,
    originalPrice: 197,
    image: "https://quantum-scale.co/cdn/shop/files/LaserCRO-Coursemockups_41.jpg?v=1757233340",
    badge: "Most Popular",
    stats: [
      { value: "8", label: "modules" },
      { value: "47", label: "lessons" },
      { value: "6h+", label: "content" }
    ],
    longDescription: `The Subconscious Trap is a psychology-driven framework designed for eCommerce store owners who want to increase conversions, boost average order value (AOV), and drive repeat purchases — without spending more on ads.

This course teaches you how to ethically tap into the psychological triggers that influence buying behavior — so your store does the selling for you. From crafting irresistible offers to designing high-converting product pages, every module is built to help you turn visitors into loyal customers.`,
    modules: [
      {
        title: "Module 1: The Psychology of Buying",
        description: "Understand the subconscious triggers that make people buy — and how to ethically apply them to your store."
      },
      {
        title: "Module 2: Offer Engineering",
        description: "Learn how to craft offers that feel irresistible without discounting your brand."
      },
      {
        title: "Module 3: Product Page Mastery",
        description: "Design product pages that convert browsers into buyers using proven psychological frameworks."
      },
      {
        title: "Module 4: Cart & Checkout Optimization",
        description: "Reduce abandonment and increase AOV with strategic cart and checkout improvements."
      },
      {
        title: "Module 5: Trust Architecture",
        description: "Build instant credibility with social proof, guarantees, and trust signals that eliminate buying resistance."
      },
      {
        title: "Module 6: Urgency & Scarcity",
        description: "Implement authentic urgency that drives action without feeling manipulative."
      },
      {
        title: "Module 7: Email Psychology",
        description: "Write emails that get opened, read, and clicked using behavioral psychology principles."
      },
      {
        title: "Module 8: Advanced Persuasion Patterns",
        description: "Master advanced techniques for repeat purchases and customer lifetime value maximization."
      }
    ],
    bonuses: [
      {
        title: "High-Converting Swipe File",
        description: "50+ proven headlines, CTAs, and copy templates you can use immediately.",
        value: 197
      },
      {
        title: "Product Page Audit Checklist",
        description: "The exact 47-point checklist we use to optimize 7-figure stores.",
        value: 97
      },
      {
        title: "Psychology Trigger Cards",
        description: "Quick-reference cards for the 23 most powerful buying triggers.",
        value: 47
      },
      {
        title: "Email Sequence Templates",
        description: "5 complete email sequences for abandoned cart, post-purchase, and win-back.",
        value: 197
      },
      {
        title: "A/B Test Playbook",
        description: "The testing framework that generated $2.3M in additional revenue.",
        value: 147
      },
      {
        title: "Conversion Rate Calculator",
        description: "Spreadsheet tool to track and project your optimization ROI.",
        value: 47
      },
      {
        title: "Private Community Access",
        description: "Join other store owners implementing these strategies.",
        value: 197
      }
    ],
    reviews: [
      {
        name: "Sarah M.",
        rating: 5,
        text: "Implemented the trust architecture module and saw a 34% increase in conversions within 2 weeks. This stuff actually works.",
        date: "2024-12-01"
      },
      {
        name: "James K.",
        rating: 5,
        text: "The psychology triggers completely changed how I think about my product pages. AOV went from $47 to $73.",
        date: "2024-11-28"
      },
      {
        name: "Michelle R.",
        rating: 5,
        text: "Worth every penny. The swipe file alone has saved me countless hours. Already seeing results.",
        date: "2024-11-15"
      }
    ],
    faq: [
      {
        question: "Who is this course for?",
        answer: "This course is designed for eCommerce store owners, marketers, and entrepreneurs who want to increase conversions and sales without spending more on advertising. Whether you're just starting out or running a 7-figure store, these principles apply."
      },
      {
        question: "How long do I have access?",
        answer: "You get lifetime access to all course materials, including any future updates. Once you purchase, it's yours forever."
      },
      {
        question: "Is there a money-back guarantee?",
        answer: "Yes! We offer a 30-day money-back guarantee. If you implement the strategies and don't see results, we'll refund your purchase. No questions asked."
      },
      {
        question: "How is the content delivered?",
        answer: "The course is delivered through our members' area with video lessons, downloadable resources, and templates. You can access everything immediately after purchase."
      },
      {
        question: "Do I need any special tools or software?",
        answer: "No special tools required. The strategies work with any eCommerce platform (Shopify, WooCommerce, etc.). Some bonuses include spreadsheet templates that work with Google Sheets or Excel."
      },
      {
        question: "How quickly can I expect results?",
        answer: "Many students see improvements within the first week of implementation. However, the best results come from systematically applying all modules over 30-60 days."
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
