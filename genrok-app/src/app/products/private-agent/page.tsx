'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  CheckCircle,
  Truck,
  Package,
  DollarSign,
  MessageCircle,
  Globe,
  Zap,
  ShoppingBag,
  CreditCard,
  Box,
  TrendingUp,
  ChevronDown,
  Clock,
  Shield,
  Users,
  BarChart3,
  Sparkles,
} from 'lucide-react';

// Factory images
const FACTORY_IMAGES = [
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/19%20(1).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/21.jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/24.jpg',
];

const HYPERSKU_LINK = 'https://www.hypersku.com/campaign/optimize-dropshipping/?ref=nmmwogq';

export default function PrivateAgentPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'comparison' | 'how-it-works'>('overview');

  const stats = [
    { label: 'Delivery Time', value: '5-7', unit: 'days', sublabel: 'Worldwide', icon: Truck },
    { label: 'Daily Capacity', value: '50K', unit: 'orders', sublabel: 'Scalable', icon: BarChart3 },
    { label: 'Support', value: '24/7', unit: '', sublabel: 'WhatsApp', icon: MessageCircle },
    { label: 'Quality Check', value: '100%', unit: '', sublabel: 'Inspected', icon: Shield },
  ];

  const benefits = [
    { icon: Truck, title: '5-7 Day Worldwide Shipping', desc: 'Fast delivery to any country' },
    { icon: Package, title: 'Custom Branding', desc: 'Your logo on every package' },
    { icon: DollarSign, title: 'Lower Costs', desc: 'Better margins than AliExpress' },
    { icon: ShoppingBag, title: 'Order Consolidation', desc: 'Multiple items, one package' },
    { icon: Box, title: 'Private Inventory', desc: 'Stock your bestsellers' },
    { icon: MessageCircle, title: 'Personal Support', desc: 'Dedicated WhatsApp rep' },
  ];

  const comparisonData = [
    { criterion: 'Shipping Time', agent: '5-7 days worldwide', aliexpress: '15-45 days', winner: 'agent' },
    { criterion: 'Quality Control', agent: 'Manual inspection', aliexpress: 'No oversight', winner: 'agent' },
    { criterion: 'Customer Service', agent: 'Personal WhatsApp 24/7', aliexpress: 'Limited support', winner: 'agent' },
    { criterion: 'Branding', agent: 'Full customization', aliexpress: 'Generic packaging', winner: 'agent' },
    { criterion: 'Pricing', agent: 'Usually cheaper', aliexpress: '15-40% more', winner: 'agent' },
    { criterion: 'Scalability', agent: 'Up to 50K orders/day', aliexpress: 'Crashes under load', winner: 'agent' },
  ];

  const steps = [
    { num: 1, title: 'Install App', desc: 'Connect your Shopify store with HyperSKU', icon: ShoppingBag },
    { num: 2, title: 'Auto-Sync Orders', desc: 'Every order appears instantly', icon: Zap },
    { num: 3, title: 'Get Pricing', desc: 'Real-time sourcing quotes in 2 hours', icon: DollarSign },
    { num: 4, title: 'Select Shipping', desc: 'Choose method with full tracking', icon: Truck },
    { num: 5, title: 'Pay Securely', desc: 'Credit card or PayPal', icon: CreditCard },
    { num: 6, title: 'Fulfillment', desc: 'Inspect, brand, and ship', icon: Package },
  ];

  const faqs = [
    { q: 'Is there a signup cost?', a: 'No. Opening an account is completely free. No subscription fees, no commitment. You only pay for orders placed.' },
    { q: 'What are the shipping times?', a: 'Most countries receive shipments within 5-7 days, including USA, Europe, Australia, and more.' },
    { q: 'How do I communicate?', a: 'Directly on WhatsApp. After registering, a personal representative will contact you.' },
    { q: 'Can I brand my products?', a: 'Yes! Add your logo, custom packaging, thank you cards, and create a premium unboxing experience.' },
    { q: 'Is it better than AliExpress?', a: 'Significantly. Lower prices, faster shipping, quality control, and dedicated support mean happier customers and better margins.' },
  ];

  return (
    <div className="main-content">
      <div className="page-wrapper" style={{ maxWidth: '1400px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">Private Fulfillment Agent</h1>
              <p className="text-sm text-[var(--text-muted)]">Premium worldwide fulfillment partner</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 border border-[#e5e5e5]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#f5f5f5] flex items-center justify-center">
                  <stat.icon size={20} className="text-[var(--text-secondary)]" />
                </div>
                <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">
                  {stat.sublabel}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-[var(--text-primary)]">{stat.value}</span>
                <span className="text-lg text-[var(--text-muted)]">{stat.unit}</span>
              </div>
              <p className="text-sm text-[var(--text-muted)] mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Factory Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl border border-[#e5e5e5] overflow-hidden">
              <div className="p-4 border-b border-[#e5e5e5]">
                <h3 className="font-semibold text-[var(--text-primary)]">Our Facility</h3>
                <p className="text-xs text-[var(--text-muted)]">State-of-the-art fulfillment center</p>
              </div>
              <div className="p-4 space-y-3">
                {FACTORY_IMAGES.map((img, idx) => (
                  <div key={idx} className="relative rounded-lg overflow-hidden aspect-video">
                    <img
                      src={img}
                      alt={`Facility ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs text-white font-medium">Live Operations</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Tabs Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            {/* Tab Navigation */}
            <div className="flex gap-2 mb-4">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'comparison', label: 'vs AliExpress' },
                { id: 'how-it-works', label: 'How It Works' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-black text-white'
                      : 'bg-white border border-[#e5e5e5] text-[var(--text-secondary)] hover:border-black'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl border border-[#e5e5e5] overflow-hidden">
              {activeTab === 'overview' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Key Benefits</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-lg bg-[#fafafa] border border-[#f0f0f0]"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white border border-[#e5e5e5] flex items-center justify-center flex-shrink-0">
                          <benefit.icon size={18} className="text-[var(--primary)]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[var(--text-primary)] text-sm">{benefit.title}</h4>
                          <p className="text-xs text-[var(--text-muted)]">{benefit.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#f8f8f8] to-[#f0f0f0] border border-[#e5e5e5]">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)]">Ready to upgrade your fulfillment?</h4>
                        <p className="text-sm text-[var(--text-muted)]">Free to sign up, personal WhatsApp support included</p>
                      </div>
                      <a
                        href={HYPERSKU_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary flex items-center gap-2"
                      >
                        Connect Agent
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'comparison' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Private Agent vs AliExpress</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#e5e5e5]">
                          <th className="text-left py-3 px-4 text-sm font-medium text-[var(--text-muted)]">Feature</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-green-600">Private Agent</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[var(--text-muted)]">AliExpress</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonData.map((row, idx) => (
                          <tr key={idx} className="border-b border-[#f5f5f5]">
                            <td className="py-3 px-4 text-sm font-medium text-[var(--text-primary)]">{row.criterion}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span className="text-sm text-green-600 font-medium">{row.agent}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-[var(--text-muted)]">{row.aliexpress}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'how-it-works' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">How It Works</h3>
                  <div className="space-y-4">
                    {steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 p-4 rounded-lg bg-[#fafafa] border border-[#f0f0f0]"
                      >
                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {step.num}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <step.icon size={16} className="text-[var(--primary)]" />
                            <h4 className="font-medium text-[var(--text-primary)]">{step.title}</h4>
                          </div>
                          <p className="text-sm text-[var(--text-muted)]">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-[#e5e5e5] overflow-hidden mb-8"
        >
          <div className="p-4 border-b border-[#e5e5e5]">
            <h3 className="font-semibold text-[var(--text-primary)]">Frequently Asked Questions</h3>
          </div>
          <div className="divide-y divide-[#f5f5f5]">
            {faqs.map((faq, idx) => (
              <div key={idx}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-[#fafafa] transition-colors"
                >
                  <span className="font-medium text-[var(--text-primary)] text-sm">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[var(--text-muted)] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-[var(--text-muted)]">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <a
            href={HYPERSKU_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-colors"
          >
            Connect Your Private Agent
            <ExternalLink size={18} />
          </a>
          <p className="text-sm text-[var(--text-muted)] mt-3">
            Free registration • Personal WhatsApp support included
          </p>
        </motion.div>
      </div>
    </div>
  );
}
