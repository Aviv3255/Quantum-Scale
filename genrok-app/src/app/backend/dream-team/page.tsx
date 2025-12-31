'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  ExternalLink,
  ChevronDown,
  Info,
  CheckCircle,
  Store,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Tool data structure
interface Tool {
  id: number;
  name: string;
  role: string;
  shortDescription: string;
  fullDescription?: string;
  installUrl: string;
  logo?: string;
  hasExpandableInfo: boolean;
  infoContent?: {
    paragraphs?: string[];
    bullets?: string[];
    exampleQuestions?: { question: string; options: string[] }[];
  };
  warehouseImages?: string[];
  isFree?: boolean;
  specialBadge?: string;
}

const dreamTeamTools: Tool[] = [
  {
    id: 1,
    name: 'DataDrew',
    role: 'Advanced Data Analytics',
    shortDescription: 'A completely free app. Advanced data monitoring including LTV across all time periods, Re-purchase rate, and more. Unstoppable power in ads with Top Spenders audiences and RFM Segments that can be exported directly from the app.',
    installUrl: 'https://apps.shopify.com/customer-lifetime-value?mref=lsbqcbva',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Satoshi_3.jpg?v=1761567329',
    hasExpandableInfo: false,
    isFree: true,
  },
  {
    id: 2,
    name: 'TxtCart',
    role: 'Abandoned Cart Recovery Machine',
    shortDescription: 'Automatic abandoned cart recovery with AI - a merciless conversion machine. Sends a highly personalized SMS to customers after cart abandonment, engages in personal conversation as a customer service rep, and offers coupon codes. A sales agent trained on over 50 million conversations converting at insane rates - all with AI, 2-minute setup, free plan available.',
    installUrl: 'https://txtcartapp.com/affiliate/?mref=lsbqcbva',
    hasExpandableInfo: false,
  },
  {
    id: 3,
    name: 'Mate',
    role: 'Primary Private Agent / Fulfillment',
    shortDescription: 'Private agent/fulfillment company for dropshippers, one of the world\'s leading companies. Worldwide shipping in 5-7 days, home delivery or pickup point options, quality control, package consolidation, branding, no monthly fees, no commitment, and no minimum orders. Personal WhatsApp support when registering through our link.',
    installUrl: 'https://erp.matedropshipping.com/login?invite_id=915',
    logo: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/COag0vSJxoUDEAE=.png',
    hasExpandableInfo: true,
    infoContent: {
      paragraphs: [
        'One of the main obstacles preventing eCommerce stores from scaling is their dependence on AliExpress: inconsistent shipping times, long delivery windows, poor support, damaged products, no home delivery, and multiple separate packages when customers order items from different suppliers.',
        'End customers do not have the patience to wait weeks for delivery, and professional brands cannot maintain real control over packaging quality, delivery speed, or the overall customer experience.',
        'Private Agent changes the game entirely: By partnering with one of the largest fulfillment companies in the world (serving over 220,000 clients), this private logistics service allows you to ship globally within an average of 5 days, with advanced options such as home delivery, order consolidation into a single package, branded packaging, and highly competitive pricing.',
        'Everything is handled through a dedicated personal agent - with no monthly fees, no minimum order quantity, and no upfront payments.',
        'Once an order is placed, the entire process is automated: The order appears automatically in their Shopify-connected dashboard, showing the product and shipping cost. You pay for the order, and your assigned agent uses those funds to purchase the items, transfer them to the company\'s logistics warehouse, perform a quality check, pack everything into a single parcel (or your custom-branded packaging), and ship it - either directly to the customer\'s home or to a nearby pickup point.',
        'From a business standpoint, this is one of the most critical steps for anyone aiming to operate internationally. Such a service creates a competitive advantage that is extremely hard to replicate.',
        'Registering through our link grants you direct access to a personal WhatsApp support representative and exclusive partnership terms available only through our collaboration.',
      ],
    },
    warehouseImages: [
      'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/19%20(1).jpg',
      'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/21.jpg',
      'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/24.jpg',
    ],
  },
  {
    id: 4,
    name: 'HyperSKU',
    role: 'Backup Private Agent',
    shortDescription: 'Backup agent (same principles as Mate). Always connect this one to your store as well as a backup agent in case the primary agent doesn\'t have a specific product (rare but can happen), and to compare prices on certain orders and choose the agent offering the same product/order at a lower price.',
    installUrl: 'https://www.hypersku.com/campaign/optimize-dropshipping/?ref=nmmwogq',
    hasExpandableInfo: true,
    infoContent: {
      paragraphs: [
        'One of the main obstacles preventing eCommerce stores from scaling is their dependence on AliExpress: inconsistent shipping times, long delivery windows, poor support, damaged products, no home delivery, and multiple separate packages when customers order items from different suppliers.',
        'End customers do not have the patience to wait weeks for delivery, and professional brands cannot maintain real control over packaging quality, delivery speed, or the overall customer experience.',
        'Private Agent changes the game entirely: By partnering with one of the largest fulfillment companies in the world (serving over 220,000 clients), this private logistics service allows you to ship globally within an average of 5 days, with advanced options such as home delivery, order consolidation into a single package, branded packaging, and highly competitive pricing.',
        'Everything is handled through a dedicated personal agent - with no monthly fees, no minimum order quantity, and no upfront payments.',
        'Once an order is placed, the entire process is automated: The order appears automatically in their Shopify-connected dashboard, showing the product and shipping cost. You pay for the order, and your assigned agent uses those funds to purchase the items, transfer them to the company\'s logistics warehouse, perform a quality check, pack everything into a single parcel (or your custom-branded packaging), and ship it - either directly to the customer\'s home or to a nearby pickup point.',
        'From a business standpoint, this is one of the most critical steps for anyone aiming to operate internationally. Such a service creates a competitive advantage that is extremely hard to replicate.',
        'Registering through our link grants you direct access to a personal WhatsApp support representative and exclusive partnership terms available only through our collaboration.',
      ],
    },
    warehouseImages: [
      'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/19%20(1).jpg',
      'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/21.jpg',
      'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/24.jpg',
    ],
  },
  {
    id: 5,
    name: 'Klaviyo',
    role: 'Email Marketing Powerhouse',
    shortDescription: 'The world\'s most advanced email marketing tool with integrations for all eCommerce platforms, thousands of Shopify apps, and the most advanced BI and AI capabilities.',
    installUrl: 'https://www.klaviyo.com/partner/signup?utm_source=001Nu00000NY5EeIAL&utm_medium=partner',
    hasExpandableInfo: false,
  },
  {
    id: 6,
    name: 'KeepCart',
    role: 'Coupon Code Blocker',
    shortDescription: 'Blocks 125+ coupon code browser extensions from your site. This is literally money on the floor - you create a 20% discount code for customers who abandoned their cart a month ago, then a new customer who never abandoned a cart enters your site and one of these extensions pops up the code. Boom - you just lost 20% on someone who would have bought anyway.',
    installUrl: 'https://platform.shoffi.app/r/rl_U2L0seLE',
    hasExpandableInfo: false,
  },
  {
    id: 7,
    name: 'Cart Upsell',
    role: 'AOV Booster',
    shortDescription: 'Half backend, half frontend, but a very simple and essential step that increases AOV by $5-8 on average. Add 20 lightweight products priced up to $50.',
    installUrl: 'https://platform.shoffi.app/r/rl_cm697iNI',
    hasExpandableInfo: false,
    specialBadge: '+$5-8 AOV',
  },
  {
    id: 8,
    name: 'Grapevine Surveys',
    role: 'Customer Intelligence',
    shortDescription: 'Who is your customer? What does he like? When he made a purchase, what drove him to buy - and what almost stopped him? What is the single most important factor for 90% of your customers when deciding whether to purchase or not?',
    fullDescription: 'Guess-based decisions are one of the main reasons most stores struggle to improve their conversion rates over time. Grapevine Surveys puts an end to the guessing game. The app displays short, focused post-purchase surveys immediately after checkout. The responses provide a goldmine of behavioral data: what triggered the purchase, what almost prevented it, how the customer discovered your brand, and more.',
    installUrl: 'https://apps.shopify.com/grapevine?mref=lsbqcbva',
    hasExpandableInfo: true,
    infoContent: {
      paragraphs: [
        'Almost no one stops to ask the simplest, most important question: What does the customer really think?',
        'This data is worth its weight in gold. It tells you exactly what to change in order to double or even triple your conversion rate.',
        'When we analyze major brands, this is one of the very first actions we take. The surveys consistently reveal shocking gaps between what the brand believes drives purchases and what actually happens inside the customer\'s mind.',
        'In many cases, a single change based on survey insights results in a 50-100% increase in conversions - not because of a new design, but simply because we looked at the real answers.',
      ],
      exampleQuestions: [
        {
          question: 'How did you first hear about us?',
          options: ['Saw an ad on Facebook/Instagram', 'Found you on Google', 'Through a friend or recommendation', 'From a video or influencer', 'Other'],
        },
        {
          question: 'How many times did you see our brand before placing your order?',
          options: ['This was my first time', '2-3 times', 'I\'ve seen you several times', 'Not sure/don\'t remember'],
        },
        {
          question: 'What made you decide to buy right now?',
          options: ['A sale or discount', 'I finally wanted to try it', 'I saw reviews or a convincing video', 'Someone mentioned you', 'Other'],
        },
        {
          question: 'Was there anything that made you hesitate before ordering?',
          options: ['No, I decided right away', 'I wasn\'t sure about the product', 'I wasn\'t sure the site was trustworthy', 'I was worried about returns or customer service', 'Other'],
        },
      ],
    },
  },
  {
    id: 9,
    name: 'Triple Whale',
    role: '100% Attribution Accuracy',
    shortDescription: 'Meta is lying to you - and it\'s costing you money. Since Apple\'s iOS 14 update, advertising platforms like Meta and Google have been showing only a partial picture of reality. Only about 70% of purchases are actually tracked, and many of those are attributed to the wrong creatives.',
    fullDescription: 'Triple Whale solves this problem at the root. It is a leading analytics platform that uses advanced tracking technology to bypass data restrictions and deliver 100% accurate attribution. It tracks every visitor and purchase with absolute precision, showing you exactly where each sale came from - down to the platform, campaign, ad set, and creative.',
    installUrl: 'https://triplewhale.com/',
    hasExpandableInfo: false,
    isFree: true,
    specialBadge: 'FREE Plan',
  },
  {
    id: 10,
    name: 'Geo Convert',
    role: 'Location-Based Conversion Bomber',
    shortDescription: 'Half backend, half frontend. Location-based announcement bar for your site with a custom discount percentage based on visitor\'s purchasing power + adapted to local holidays or sale events - this is our Bomber. Increases conversion rate by 60-70% on average and surprisingly also increases AOV.',
    installUrl: 'https://geo-convert.com/',
    logo: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Geo%20Convert.jpg',
    hasExpandableInfo: false,
    specialBadge: '60-70% Lift',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function DreamTeamPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const storeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  const toggleExpand = (cardId: number) => {
    setExpandedCardId(expandedCardId === cardId ? null : cardId);
  };

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Page Header */}
        <header className="page-header">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center">
                  <Zap size={20} className="text-white" strokeWidth={2} />
                </div>
                <h1>The Dream Team</h1>
              </div>
              <p className="text-[var(--text-muted)] max-w-2xl">
                A powerful force of 10 essential tools that together form the ultimate backend infrastructure.
                Each tool serves a critical role in scaling your eCommerce business.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-light)]">
              <CheckCircle size={16} className="text-[var(--success)]" strokeWidth={2} />
              <span className="text-sm font-medium text-[var(--text-primary)]">10 Essential Tools</span>
            </div>
          </div>
        </header>

        {/* Tools Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
        >
          {dreamTeamTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              variants={itemVariants}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="group"
            >
              <div className="card card-hover h-full flex flex-col relative overflow-hidden">
                {/* Badges */}
                {tool.isFree && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-green-50 text-green-700 border border-green-200 z-10">
                    FREE
                  </span>
                )}
                {tool.specialBadge && !tool.isFree && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[var(--accent-gold-light)] text-[var(--accent-gold)] border border-[var(--border-gold)] z-10">
                    {tool.specialBadge}
                  </span>
                )}

                {/* Logo */}
                <div className="mb-4">
                  {tool.logo ? (
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[var(--bg-secondary)] shadow-sm">
                      <Image
                        src={tool.logo}
                        alt={tool.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center">
                      <span className="text-xl font-bold text-[var(--text-muted)]">
                        {tool.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Title & Role */}
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">
                  {tool.name}
                </h3>
                <span className="text-[11px] font-medium uppercase tracking-wide text-[var(--text-muted)] mb-3">
                  {tool.role}
                </span>

                {/* Description */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1 line-clamp-4">
                  {tool.shortDescription}
                </p>

                {/* Expandable INFO */}
                {tool.hasExpandableInfo && (
                  <div className="mb-4">
                    <button
                      onClick={() => toggleExpand(tool.id)}
                      className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <Info size={14} strokeWidth={2} />
                      <span className="text-xs font-medium uppercase tracking-wide">
                        {expandedCardId === tool.id ? 'Hide Info' : 'More Info'}
                      </span>
                      <motion.div
                        animate={{ rotate: expandedCardId === tool.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={14} strokeWidth={2} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedCardId === tool.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-[var(--border-light)]">
                            {/* Paragraphs */}
                            {tool.infoContent?.paragraphs?.map((p, idx) => (
                              <p key={idx} className="text-xs text-[var(--text-muted)] mb-3 leading-relaxed">
                                {p}
                              </p>
                            ))}

                            {/* Example Questions (Grapevine) */}
                            {tool.infoContent?.exampleQuestions && (
                              <div className="mt-4">
                                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-3 font-semibold">
                                  Example Survey Questions:
                                </p>
                                <div className="space-y-3">
                                  {tool.infoContent.exampleQuestions.map((q, idx) => (
                                    <div key={idx} className="p-3 bg-[var(--bg-secondary)] rounded-lg">
                                      <p className="text-xs font-medium text-[var(--text-secondary)] mb-2">
                                        {q.question}
                                      </p>
                                      <div className="flex flex-wrap gap-1">
                                        {q.options.slice(0, 3).map((opt, optIdx) => (
                                          <span key={optIdx} className="text-[10px] px-2 py-1 bg-white rounded-full text-[var(--text-muted)] border border-[var(--border-light)]">
                                            {opt}
                                          </span>
                                        ))}
                                        {q.options.length > 3 && (
                                          <span className="text-[10px] px-2 py-1 text-[var(--text-muted)]">
                                            +{q.options.length - 3} more
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Warehouse Images */}
                            {tool.warehouseImages && (
                              <div className="mt-4">
                                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-3 font-semibold">
                                  Fulfillment Centers:
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                  {tool.warehouseImages.map((img, idx) => (
                                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden">
                                      <Image
                                        src={img}
                                        alt={`${tool.name} warehouse ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Install Button */}
                <a
                  href={tool.installUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full justify-center text-sm"
                >
                  Install
                  <ExternalLink size={14} strokeWidth={2} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Connection Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 relative"
        >
          {/* Decorative Lines */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[var(--border-light)] to-[var(--border-medium)]" />

          {/* Connection Label */}
          <div className="flex justify-center mb-8 pt-20">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-light)]">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-[var(--primary)] border-2 border-white flex items-center justify-center"
                    style={{ zIndex: 5 - i }}
                  >
                    <span className="text-[8px] text-white font-bold">{i + 1}</span>
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                All tools connect to
              </span>
            </div>
          </div>

          {/* Your Store */}
          <div ref={storeRef} className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="w-20 h-20 rounded-2xl bg-[#95BF47] flex items-center justify-center shadow-lg mb-4"
            >
              <Store size={40} className="text-white" strokeWidth={1.5} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="text-lg font-semibold text-[var(--text-primary)]"
            >
              Your Store
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
              className="text-sm text-[var(--text-muted)] mt-1"
            >
              Powered by the Dream Team
            </motion.p>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
