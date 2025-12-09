'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AppWindow,
  Palette,
  Package,
  TrendingUp,
  Mail,
  Zap,
  Server,
  ExternalLink,
  Copy,
  Check,
  Star,
  Gift,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

const categories = [
  { id: 'all', name: 'All Apps', icon: AppWindow },
  { id: 'Theme', name: 'Theme', icon: Palette },
  { id: 'Fulfillment', name: 'Fulfillment', icon: Package },
  { id: 'Conversion', name: 'Conversion', icon: TrendingUp },
  { id: 'Marketing', name: 'Marketing', icon: Mail },
  { id: 'Automation', name: 'Automation', icon: Zap },
  { id: 'Dev & Monitoring', name: 'Dev & Monitoring', icon: Server },
];

const apps = [
  {
    id: 1,
    name: 'Shrine Theme',
    category: 'Theme',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T121029.783.png?v=1760087435',
    description: "Proven as one of the world's highest-converting Shopify themes: ultra-fast load times, precise UX, and conversion-first sections.",
    url: 'https://shrinesolutions.com/?ref=0d9fe741',
    couponCode: 'QUANTUMSCALE',
    discount: '20%',
  },
  {
    id: 2,
    name: 'HyperSKU',
    category: 'Fulfillment',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T115639.885.png?v=1760086613',
    description: 'Private-agent sourcing & fulfillment with 5-day delivery options, branded packaging, and no upfront fees.',
    url: 'https://www.hypersku.com/campaign/optimize-dropshipping/?ref=nmmwogq',
  },
  {
    id: 3,
    name: 'Section Store',
    category: 'Conversion',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T121113.691.png?v=1760087483',
    description: 'The best plug-and-play sections library for Shopify. Ship premium landing pages without code.',
    url: 'https://platform.shoffi.app/r/rl_WvFtTikK',
  },
  {
    id: 4,
    name: 'Vitals',
    category: 'Conversion',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T121155.514.png?v=1760087521',
    description: 'All-in-one conversion suite: reviews, bundles, sticky ATC, urgency, trust, and more.',
    url: 'https://vitals.app/shopify/12548540',
    discount: '40-day free trial',
  },
  {
    id: 5,
    name: 'ABConvert - A/B Testing',
    category: 'Conversion',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T121227.284.png?v=1760087566',
    description: 'The #1 A/B testing tool for Shopify: test prices, headlines, layouts, CTAs, and more.',
    url: 'https://apps.shopify.com/a-b-convert-price-a-b-test?mref=aviv-azriel',
    couponCode: 'LASERCRO',
    discount: '10%',
  },
  {
    id: 6,
    name: 'Loox - Photo & Video Reviews',
    category: 'Conversion',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T121408.753.png?v=1760087656',
    description: 'High-impact photo/video reviews and UGC widgets with manual uploads support.',
    url: 'https://loox.io/app/LASERCRO',
    discount: 'Free trial (exclusive)',
  },
  {
    id: 7,
    name: 'Selleasy - Upsell & Cross Sell',
    category: 'Conversion',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-12T134136.646.png?v=1760265713',
    description: "18+ ways to increase AOV: cart page upsells, thank you page offers, post-purchase one-click upsells.",
    url: 'https://platform.shoffi.app/r/rl_lYJ1Z4Eq',
  },
  {
    id: 8,
    name: 'KeepCart - Stop Coupon Leaks',
    category: 'Conversion',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T122003.978.png?v=1760088020',
    description: 'Stop coupon extensions from auto-injecting discounts and eroding margins.',
    url: 'https://platform.shoffi.app/r/rl_U2L0seLE',
  },
  {
    id: 9,
    name: 'Adwisely',
    category: 'Marketing',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T122135.709.png?v=1760088099',
    description: 'Automated Meta & Google ads: prospecting, retargeting, dynamic product ads.',
    url: 'https://platform.shoffi.app/r/rl_01nNfyRx',
  },
  {
    id: 10,
    name: 'TXTcart - SMS Marketing',
    category: 'Marketing',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-12T140826.947.png?v=1760267314',
    description: 'Powerful SMS marketing automation for eCommerce with high open rates.',
    url: 'https://apps.shopify.com/txtcart-plus',
  },
  {
    id: 11,
    name: 'PayPal Tracking Sync',
    category: 'Automation',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T122054.732.png?v=1760088059',
    description: 'Automatically sync order tracking to PayPal to reduce holds and unlock funds faster.',
    url: 'https://platform.shoffi.app/r/rl_Fn8dZcAb',
  },
  {
    id: 12,
    name: 'SiteAgent',
    category: 'Dev & Monitoring',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T122158.820.png?v=1760088122',
    description: "Real-time site monitoring so you don't lose revenue to silent breaks.",
    url: 'https://platform.shoffi.app/r/rl_X32WvYHr',
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

export default function ShopifyAppsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [activeCategory, setActiveCategory] = useState('all');
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

  const filteredApps = apps.filter(
    (app) => activeCategory === 'all' || app.category === activeCategory
  );

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
              <h1>Discounted Shopify Apps</h1>
              <p>Install via our links to unlock special pricing and extended trials</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-secondary)]">
              <Gift size={16} className="text-[var(--text-primary)]" strokeWidth={1.5} />
              <span className="text-sm font-medium text-[var(--text-primary)]">22 Curated Apps</span>
            </div>
          </div>
        </header>

        {/* Categories Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all text-sm font-medium ${
                  isActive
                    ? 'bg-[var(--primary)]'
                    : 'bg-white text-[var(--text-secondary)] border border-[var(--border-light)] hover:bg-[var(--bg-hover)]'
                }`}
                style={isActive ? { color: '#FFFFFF' } : undefined}
              >
                <category.icon size={16} strokeWidth={1.5} style={isActive ? { color: '#FFFFFF' } : undefined} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Apps Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid-3"
          >
            {filteredApps.map((app) => (
              <motion.div key={app.id} variants={itemVariants} className="h-full">
                <div className="card card-hover overflow-hidden h-full flex flex-col" style={{ padding: 0 }}>
                  {/* Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--bg-secondary)]">
                        <Image
                          src={app.logo}
                          alt={app.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-[var(--text-primary)] truncate">
                          {app.name}
                        </h3>
                        <span className="badge badge-gold mt-1">
                          {app.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description - flex-1 to fill available space */}
                  <div className="px-6 pb-4 flex-1">
                    <p className="text-sm text-[var(--text-muted)] line-clamp-3">
                      {app.description}
                    </p>
                  </div>

                  {/* Fixed height section for badges and coupon */}
                  <div className="px-6 pb-4 min-h-[72px]">
                    {/* Discount Badge */}
                    {app.discount && (
                      <div className="mb-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-gold)]">
                          <Gift size={16} className="text-[var(--text-primary)]" strokeWidth={1.5} />
                          <span className="text-sm font-semibold text-[var(--text-primary)]">
                            {app.discount} OFF
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Coupon Code */}
                    {app.couponCode && (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-dashed border-[var(--border-gold)]">
                          <code className="text-sm font-mono font-semibold text-[var(--text-primary)]">
                            {app.couponCode}
                          </code>
                        </div>
                        <button
                          onClick={() => copyCode(app.couponCode!)}
                          className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                        >
                          {copiedCode === app.couponCode ? (
                            <Check size={20} className="text-green-500" strokeWidth={1.5} />
                          ) : (
                            <Copy size={20} strokeWidth={1.5} />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Action - mt-auto to push to bottom */}
                  <div className="p-6 pt-0 mt-auto">
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
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
