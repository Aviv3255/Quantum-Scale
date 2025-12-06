'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  TrendingUp,
  Shield,
  BarChart3,
  ShoppingCart,
  Eye,
  CreditCard,
  Target,
  Zap,
  DollarSign,
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

const apps = [
  {
    id: 1,
    name: 'ABConvert',
    category: 'A/B Testing',
    icon: Target,
    color: 'from-purple-500 to-violet-500',
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
    icon: Shield,
    color: 'from-red-500 to-pink-500',
    shortDesc: 'Stop Honey and coupon extensions from stealing your profits. Block unauthorized discounts instantly.',
    description: 'Blocks coupon extensions like Honey from leaking your discount codes to the public, protecting your margins.',
    url: 'https://platform.shoffi.app/r/rl_U2L0seLE',
  },
  {
    id: 3,
    name: 'Post-Purchase Survey',
    category: 'Customer Intelligence',
    icon: Eye,
    color: 'from-blue-500 to-cyan-500',
    shortDesc: 'Know exactly what makes customers buy. This data is pure gold for scaling your store.',
    description: 'Data is power. The more you know about your customers, the more you can triple your conversion rate and sell to each customer again and again.',
    url: 'https://apps.shopify.com/grapevine?mref=lsbqcbva',
  },
  {
    id: 4,
    name: 'ReConvert',
    category: 'Post-Purchase Upsells',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-500',
    shortDesc: 'Free money. Adds $7.4 pure profit per order. 1:46 ROI. Absolute must-have.',
    description: 'This app on average adds $7.4 pure profit to each order. The average ROI on Post Purchase upsell apps is 1:46.',
    url: 'https://apps.shopify.com/reconvert-upsell-cross-sell?mref=lsbqcbva',
    stats: { avgProfit: '$7.4', roi: '1:46' },
  },
  {
    id: 5,
    name: 'Cart Drawer Upsell',
    category: 'Cart Optimization',
    icon: ShoppingCart,
    color: 'from-orange-500 to-amber-500',
    shortDesc: 'The Starbucks checkout trick. Add impulse buys at cart - pure profit on every order.',
    description: 'Put 8-10 general upsells in the cart that many will want for $20-$50, simply money on the floor.',
    url: 'https://platform.shoffi.app/r/rl_cm697iNI',
  },
  {
    id: 6,
    name: 'DataDrew',
    category: 'Analytics',
    icon: BarChart3,
    color: 'from-indigo-500 to-blue-500',
    shortDesc: 'Know your numbers. LTV, repeat rate, top customers - all the metrics that matter. Free.',
    description: 'You must know how much each customer is worth to you, what your Re-purchase rate is, and every possible metric.',
    url: 'https://apps.shopify.com/customer-lifetime-value?mref=lsbqcbva',
    isFree: true,
  },
  {
    id: 7,
    name: 'Parity Rocket',
    category: 'Geo-Targeting',
    icon: Zap,
    color: 'from-pink-500 to-rose-500',
    shortDesc: 'Easy cheat code: 45-70% conversion lift. Geo-targeted discounts that print money.',
    description: 'Creates a banner with a coupon code according to the country the visitor enters from and the purchasing power of that country.',
    url: 'https://parityrocket.com/',
    conversionLift: '45-70%',
  },
  {
    id: 8,
    name: 'Triple Whale',
    category: 'Attribution',
    icon: TrendingUp,
    color: 'from-cyan-500 to-teal-500',
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
    icon: CreditCard,
    color: 'from-blue-600 to-indigo-600',
    shortDesc: 'Don\'t get $60K locked for 180 days. Auto-sync tracking to PayPal instantly.',
    description: 'Automatically updates order status in PayPal + tracking number directly, preventing account holds and fund locks.',
    url: 'https://platform.shoffi.app/r/rl_Fn8dZcAb',
  },
];

export default function SecretAppsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Must-Have Apps</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The <span className="gradient-text">Secret Apps</span> Checklist
            </h1>
            <p className="text-xl text-gray-600">
              The right apps can transform your business 180 degrees. Each app does something small and critical -
              together they create massive change. This is your must-install checklist for success.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => (
              <StaggerItem key={app.id}>
                <div className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all overflow-hidden h-full flex flex-col">
                  {/* Header */}
                  <div className={`p-6 bg-gradient-to-br ${app.color}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <app.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{app.name}</h3>
                        <span className="text-white/80 text-sm">{app.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-gray-900 font-medium mb-3">{app.shortDesc}</p>
                    <p className="text-gray-600 text-sm mb-4 flex-1">{app.description}</p>

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
                      <div className="mb-4 p-3 bg-pink-50 rounded-xl">
                        <span className="text-lg font-bold text-pink-700">{app.conversionLift}</span>
                        <span className="text-sm text-pink-600 ml-2">conversion lift</span>
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
                          <div className="flex-1 px-3 py-2 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <code className="text-sm font-mono font-semibold text-gray-700">
                              {app.couponCode}
                            </code>
                            <span className="text-xs text-gray-500 ml-2">({app.discount} OFF)</span>
                          </div>
                          <button
                            onClick={() => copyCode(app.couponCode!)}
                            className="p-2 text-gray-500 hover:text-purple-600 transition-colors"
                          >
                            {copiedCode === app.couponCode ? (
                              <Check className="w-5 h-5 text-green-600" />
                            ) : (
                              <Copy className="w-5 h-5" />
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
                      className={`flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r ${app.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all`}
                    >
                      Install App
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
