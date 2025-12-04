'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

const categories = [
  { id: 'all', name: 'All Apps', icon: AppWindow },
  { id: 'Theme', name: 'Theme', icon: Palette },
  { id: 'Fulfillment', name: 'Fulfillment', icon: Package },
  { id: 'Conversion', name: 'Conversion', icon: TrendingUp },
  { id: 'Marketing', name: 'Marketing', icon: Mail },
  { id: 'Automation', name: 'Automation', icon: Zap },
  { id: 'Dev & Monitoring', name: 'Dev & Monitoring', icon: Server },
];

// Sample apps data (will be replaced with Supabase data)
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

export default function ShopifyAppsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredApps = apps.filter(
    (app) => activeCategory === 'all' || app.category === activeCategory
  );

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
              <Gift className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">Exclusive Discounts</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discounted <span className="gradient-text">Shopify Apps</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Install via our links to unlock special pricing, extended trials, and premium features
              not available elsewhere.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>22 curated apps</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full" />
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-emerald-500" />
                <span>Exclusive deals</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-y border-gray-100 bg-gray-50/50 sticky top-16 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map((app) => (
                <StaggerItem key={app.id}>
                  <div className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all overflow-hidden">
                    {/* Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-start gap-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={app.logo}
                            alt={app.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-lg truncate">
                            {app.name}
                          </h3>
                          <span className="inline-block mt-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            {app.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {app.description}
                      </p>
                    </div>

                    {/* Discount Badge */}
                    {app.discount && (
                      <div className="px-6 pb-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg">
                          <Gift className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm font-semibold text-emerald-700">
                            {app.discount} OFF
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Coupon Code */}
                    {app.couponCode && (
                      <div className="px-6 pb-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 px-3 py-2 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <code className="text-sm font-mono font-semibold text-gray-700">
                              {app.couponCode}
                            </code>
                          </div>
                          <button
                            onClick={() => copyCode(app.couponCode!)}
                            className="p-2 text-gray-500 hover:text-emerald-600 transition-colors"
                          >
                            {copiedCode === app.couponCode ? (
                              <Check className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Copy className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Action */}
                    <div className="p-6 pt-0">
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
                      >
                        Install App
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
