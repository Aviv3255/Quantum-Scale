'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { BookmarkButton } from '@/components/BookmarkButton';

const apps = [
  {
    id: 1,
    name: 'ABConvert',
    category: 'A/B Testing',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T121227.284.png?v=1760087566',
    shortDesc: 'A single test increased conversions by 220%. If you\'re not testing, you\'re leaving money on the floor.',
    description: 'The world\'s best A/B Testing app that allows you to automatically test between different versions - product pages, sections, themes, product prices, shipping prices, etc.',
    url: 'https://apps.shopify.com/a-b-convert-price-a-b-test?mref=aviv-azriel',
    couponCode: 'LASERCRO',
    discount: '10%',
  },
  {
    id: 2,
    name: 'KeepCart',
    category: 'Coupon Protection',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T122003.978.png?v=1760088020',
    shortDesc: 'Stop Honey and coupon extensions from stealing your profits. Block unauthorized discounts instantly.',
    description: 'Blocks coupon extensions like Honey from leaking your discount codes to the public, protecting your margins.',
    url: 'https://platform.shoffi.app/r/rl_U2L0seLE',
  },
  {
    id: 3,
    name: 'Post-Purchase Survey',
    category: 'Customer Intelligence',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T121408.753.png?v=1760087656',
    shortDesc: 'Know exactly what makes customers buy. This data is pure gold for scaling your store.',
    description: 'Data is power. The more you know about your customers, the more you can triple your conversion rate and sell to each customer again and again.',
    url: 'https://apps.shopify.com/grapevine?mref=lsbqcbva',
  },
  {
    id: 4,
    name: 'ReConvert',
    category: 'Post-Purchase Upsells',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Satoshi_9.png?v=1761567186',
    shortDesc: 'Free money. Adds $7.4 pure profit per order. 1:46 ROI. Absolute must-have.',
    description: 'This app on average adds $7.4 pure profit to each order. The average ROI on Post Purchase upsell apps is 1:46.',
    url: 'https://apps.shopify.com/reconvert-upsell-cross-sell?mref=lsbqcbva',
    stats: { avgProfit: '$7.4', roi: '1:46' },
  },
  {
    id: 5,
    name: 'Cart Drawer Upsell',
    category: 'Cart Optimization',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Satoshi_2.jpg?v=1761567244',
    shortDesc: 'The Starbucks checkout trick. Add impulse buys at cart - pure profit on every order.',
    description: 'Put 8-10 general upsells in the cart that many will want for $20-$50, simply money on the floor.',
    url: 'https://platform.shoffi.app/r/rl_cm697iNI',
  },
  {
    id: 6,
    name: 'DataDrew',
    category: 'Analytics',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Satoshi_3.jpg?v=1761567329',
    shortDesc: 'Know your numbers. LTV, repeat rate, top customers - all the metrics that matter. Free.',
    description: 'You must know how much each customer is worth to you, what your Re-purchase rate is, and every possible metric.',
    url: 'https://apps.shopify.com/customer-lifetime-value?mref=lsbqcbva',
    isFree: true,
  },
  {
    id: 7,
    name: 'Parity Rocket',
    category: 'Geo-Targeting',
    logo: 'https://parityrocket.com/wp-content/uploads/2025/04/logo-lander.png',
    shortDesc: 'Easy cheat code: 45-70% conversion lift. Geo-targeted discounts that print money.',
    description: 'Creates a banner with a coupon code according to the country the visitor enters from and the purchasing power of that country.',
    url: 'https://parityrocket.com/',
    conversionLift: '45-70%',
  },
  {
    id: 8,
    name: 'Triple Whale',
    category: 'Attribution',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-09T234106.192.png?v=1760042538',
    shortDesc: '100% accurate attribution. Stop making decisions blindfolded. Free under $250K revenue.',
    description: 'Uses advanced technology to overcome iOS14 limitations with 100% accuracy. See exactly where each sale came from.',
    url: 'https://www.triplewhale.com/',
    isFree: true,
    freeUpTo: '$250K annual revenue',
  },
  {
    id: 9,
    name: 'PayPal Tracking Sync',
    category: 'Payment Protection',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T122054.732.png?v=1760088059',
    shortDesc: 'Don\'t get $60K locked for 180 days. Auto-sync tracking to PayPal instantly.',
    description: 'Automatically updates order status in PayPal + tracking number directly, preventing account holds and fund locks.',
    url: 'https://platform.shoffi.app/r/rl_Fn8dZcAb',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SecretAppsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full" />
      </div>
    );
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Page Header */}
        <header className="page-header">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1>The Secret Apps Checklist</h1>
              <p>The right apps can transform your business 180 degrees. This is your must-install checklist.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-secondary)]">
              <Sparkles size={16} className="text-[var(--text-primary)]" strokeWidth={1.5} />
              <span className="text-sm font-medium text-[var(--text-primary)]">Must-Have Apps</span>
            </div>
          </div>
        </header>

        {/* Apps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid-3"
        >
          {apps.map((app) => (
            <motion.div key={app.id} variants={itemVariants}>
              <div className="card card-hover h-full flex flex-col overflow-hidden relative" style={{ padding: 0 }}>
                {/* Bookmark Button */}
                <div className="absolute top-3 right-3 z-10">
                  <BookmarkButton
                    itemType="secret_app"
                    itemId={String(app.id)}
                    title={app.name}
                    sourceUrl={app.url}
                    description={app.shortDesc}
                    thumbnailUrl={app.logo}
                    size="sm"
                  />
                </div>

                {/* Header with Logo */}
                <div className="p-6 pb-4">
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--bg-secondary)]">
                      <Image
                        src={app.logo}
                        alt={app.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0 pr-8">
                      <h3 className="font-semibold text-lg text-[var(--text-primary)] truncate">
                        {app.name}
                      </h3>
                      <span className="badge badge-gold mt-1">
                        {app.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-[var(--text-primary)] font-medium mb-3">{app.shortDesc}</p>
                  <p className="text-sm text-[var(--text-muted)] mb-4 flex-1">{app.description}</p>

                  {/* Stats */}
                  {app.stats && (
                    <div className="flex gap-4 mb-4 p-3 bg-green-50 rounded-xl">
                      <div>
                        <span className="text-lg font-bold text-green-700">{app.stats.avgProfit}</span>
                        <span className="text-xs text-green-600 block">per order</span>
                      </div>
                      <div>
                        <span className="text-lg font-bold text-green-700">{app.stats.roi}</span>
                        <span className="text-xs text-green-600 block">ROI</span>
                      </div>
                    </div>
                  )}

                  {app.conversionLift && (
                    <div className="mb-4 p-3 bg-[var(--bg-secondary)] rounded-xl">
                      <span className="text-lg font-bold text-[var(--text-primary)]">{app.conversionLift}</span>
                      <span className="text-sm text-[var(--accent-gold-hover)] ml-2">conversion lift</span>
                    </div>
                  )}

                  {app.isFree && (
                    <div className="mb-4 px-3 py-2 bg-blue-50 rounded-lg inline-flex items-center gap-2">
                      <span className="text-sm font-semibold text-blue-700">FREE</span>
                      {app.freeUpTo && <span className="text-xs text-blue-600">up to {app.freeUpTo}</span>}
                    </div>
                  )}

                  {/* Coupon */}
                  {app.couponCode && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 px-3 py-2 bg-[var(--bg-secondary)] rounded-lg border border-dashed border-[var(--border-light)]">
                          <code className="text-sm font-mono font-semibold text-[var(--text-secondary)]">
                            {app.couponCode}
                          </code>
                          <span className="text-xs text-[var(--text-muted)] ml-2">({app.discount} OFF)</span>
                        </div>
                        <button
                          onClick={() => copyCode(app.couponCode!)}
                          className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                        >
                          {copiedCode === app.couponCode ? (
                            <Check size={20} className="text-green-600" strokeWidth={1.5} />
                          ) : (
                            <Copy size={20} strokeWidth={1.5} />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action */}
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full justify-center"
                  >
                    Install App
                    <ExternalLink size={16} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
