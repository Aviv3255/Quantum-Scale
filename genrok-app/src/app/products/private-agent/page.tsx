'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  ExternalLink,
  CheckCircle,
  Truck,
  DollarSign,
  MessageCircle,
  Shield,
  Star,
  TrendingUp,
  Package,
  Clock,
  Users,
  Award,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Links
const MATE_LINK = 'https://erp.matedropshipping.com/login?invite_id=915';
const HYPERSKU_LINK = 'https://www.hypersku.com/campaign/optimize-dropshipping/?ref=nmmwogq';

// Logos from Dream Team page
const MATE_LOGO = 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/COag0vSJxoUDEAE=.png';
const HYPERSKU_LOGO = 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T115639.885.png?v=1760086613';

// Factory images
const FACTORY_IMAGES = [
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/19%20(1).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/21.jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/24.jpg',
];

type TabType = 'overview' | 'comparison' | 'how-it-works' | 'facilities';

export default function PrivateAgentPage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: Package },
    { id: 'comparison' as TabType, label: 'Comparison', icon: TrendingUp },
    { id: 'how-it-works' as TabType, label: 'How It Works', icon: Clock },
    { id: 'facilities' as TabType, label: 'Facilities', icon: Users },
  ];

  return (
    <DashboardLayout>
      <div className="page-wrapper" style={{ maxWidth: '1200px' }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FFB808]/20 to-[#923CE2]/20 text-[var(--text-primary)] text-sm font-medium mb-4">
            <Sparkles size={16} className="text-[#FFB808]" />
            <span>Pro Strategy: Use Two Agents</span>
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-3">
            Private Fulfillment Agents
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Smart operators use two agents. Primary for most orders, backup for edge cases where one has better pricing or stock. Based on 60,000+ orders tested.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-8 overflow-x-auto pb-2"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[var(--primary)] text-white shadow-lg'
                  : 'bg-white border border-[#e5e5e5] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Two Agents Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {/* Mate Card - Primary */}
                <div className="relative bg-white rounded-2xl border-2 border-[#FFB808] overflow-hidden shadow-lg">
                  {/* Recommended Badge */}
                  <div className="absolute top-0 right-0">
                    <div className="bg-[#FFB808] text-black text-xs font-bold px-4 py-1.5 rounded-bl-xl flex items-center gap-1.5">
                      <Star size={12} fill="currentColor" />
                      PRIMARY AGENT
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Header with Logo */}
                    <div className="flex items-center gap-4 mb-6 mt-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-[#e5e5e5] p-1">
                        <Image
                          src={MATE_LOGO}
                          alt="Mate Logo"
                          width={56}
                          height={56}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Mate</h2>
                        <p className="text-sm text-[var(--text-secondary)]">Dropshipping Agent</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-[#FFFBEB]">
                        <div className="flex items-center gap-3">
                          <Truck size={20} className="text-[#B45309]" />
                          <span className="font-medium text-[#78350F]">Shipping Time</span>
                        </div>
                        <span className="text-xl font-bold text-[#B45309]">7 Days</span>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-[#FFFBEB]">
                        <div className="flex items-center gap-3">
                          <DollarSign size={20} className="text-[#B45309]" />
                          <span className="font-medium text-[#78350F]">vs AliExpress</span>
                        </div>
                        <span className="text-xl font-bold text-[#15803D]">4% Cheaper</span>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-[#FFFBEB]">
                        <div className="flex items-center gap-3">
                          <MessageCircle size={20} className="text-[#B45309]" />
                          <span className="font-medium text-[#78350F]">Support</span>
                        </div>
                        <span className="text-xl font-bold text-[#B45309]">18/6 WhatsApp</span>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-2 mb-6">
                      {['Fastest consistent delivery', 'Best pricing vs AliExpress', 'Personal WhatsApp rep', 'Free to connect'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-[#15803D]" />
                          <span className="text-sm text-[var(--text-secondary)]">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* 3D Button */}
                    <a
                      href={MATE_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-3d-mate w-full"
                    >
                      <span>Connect Mate</span>
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                {/* HyperSKU Card - Backup */}
                <div className="relative bg-white rounded-2xl border-2 border-[#923CE2] overflow-hidden shadow-lg">
                  {/* Backup Badge */}
                  <div className="absolute top-0 right-0">
                    <div className="bg-[#923CE2] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl flex items-center gap-1.5">
                      <Shield size={12} />
                      BACKUP AGENT
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Header with Logo */}
                    <div className="flex items-center gap-4 mb-6 mt-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-[#e5e5e5] p-1">
                        <Image
                          src={HYPERSKU_LOGO}
                          alt="HyperSKU Logo"
                          width={56}
                          height={56}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-[var(--text-primary)]">HyperSKU</h2>
                        <p className="text-sm text-[var(--text-secondary)]">Fulfillment Platform</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF5FF]">
                        <div className="flex items-center gap-3">
                          <Truck size={20} className="text-[#7C3AED]" />
                          <span className="font-medium text-[#581C87]">Shipping Time</span>
                        </div>
                        <span className="text-xl font-bold text-[#7C3AED]">9 Days</span>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF5FF]">
                        <div className="flex items-center gap-3">
                          <DollarSign size={20} className="text-[#7C3AED]" />
                          <span className="font-medium text-[#581C87]">vs AliExpress</span>
                        </div>
                        <span className="text-xl font-bold text-[#15803D]">1% Cheaper</span>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF5FF]">
                        <div className="flex items-center gap-3">
                          <MessageCircle size={20} className="text-[#7C3AED]" />
                          <span className="font-medium text-[#581C87]">Support</span>
                        </div>
                        <span className="text-xl font-bold text-[#7C3AED]">18/6 WhatsApp</span>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-2 mb-6">
                      {['Great for edge cases', 'Sometimes cheaper on specific items', 'Solid backup option', 'Free to connect'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-[#15803D]" />
                          <span className="text-sm text-[var(--text-secondary)]">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* 3D Button */}
                    <a
                      href={HYPERSKU_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-3d-hypersku w-full"
                    >
                      <span>Connect HyperSKU</span>
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick CTA */}
              <div className="bg-gradient-to-r from-[#FFFBEB] via-white to-[#FAF5FF] rounded-2xl p-6 text-center border border-[#e5e5e5]">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Ready to Level Up Your Fulfillment?</h3>
                <p className="text-[var(--text-secondary)] mb-4 text-sm">
                  Connect both agents for free. No monthly fees, no minimum orders.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href={MATE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFB808] text-black font-semibold text-sm hover:bg-[#E5A607] transition-colors"
                  >
                    <span>Connect Mate</span>
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href={HYPERSKU_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#923CE2] text-white font-semibold text-sm hover:bg-[#7C3AED] transition-colors"
                  >
                    <span>Connect HyperSKU</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Comparison Tab */}
          {activeTab === 'comparison' && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden shadow-lg">
                <div className="p-6 border-b border-[#e5e5e5] bg-gradient-to-r from-[#fafafa] to-white">
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">Head-to-Head Comparison</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Based on 60,000+ orders tested over 3 months</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#fafafa]">
                        <th className="text-left py-4 px-6 text-sm font-semibold text-[var(--text-primary)]">Feature</th>
                        <th className="text-center py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white border border-[#e5e5e5]">
                              <Image src={MATE_LOGO} alt="Mate" width={32} height={32} className="w-full h-full object-contain" />
                            </div>
                            <span className="font-semibold text-[var(--text-primary)]">Mate</span>
                          </div>
                        </th>
                        <th className="text-center py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white border border-[#e5e5e5]">
                              <Image src={HYPERSKU_LOGO} alt="HyperSKU" width={32} height={32} className="w-full h-full object-contain" />
                            </div>
                            <span className="font-semibold text-[var(--text-primary)]">HyperSKU</span>
                          </div>
                        </th>
                        <th className="text-center py-4 px-6 text-sm font-semibold text-[var(--text-muted)]">AliExpress</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-[#f0f0f0]">
                        <td className="py-4 px-6 font-medium text-[var(--text-primary)]">
                          <div className="flex items-center gap-2">
                            <Truck size={16} className="text-[var(--text-muted)]" />
                            Shipping Time
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#15803D] text-white text-sm font-semibold">
                            <TrendingUp size={14} />
                            7 Days
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex px-3 py-1 rounded-full bg-[#FAF5FF] text-[#7C3AED] text-sm font-semibold">
                            9 Days
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center text-[var(--text-muted)]">14-21 Days</td>
                      </tr>
                      <tr className="border-t border-[#f0f0f0]">
                        <td className="py-4 px-6 font-medium text-[var(--text-primary)]">
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} className="text-[var(--text-muted)]" />
                            Pricing
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#15803D] text-white text-sm font-semibold">
                            <TrendingUp size={14} />
                            4% Cheaper
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex px-3 py-1 rounded-full bg-[#FAF5FF] text-[#7C3AED] text-sm font-semibold">
                            1% Cheaper
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center text-[var(--text-muted)]">Baseline</td>
                      </tr>
                      <tr className="border-t border-[#f0f0f0]">
                        <td className="py-4 px-6 font-medium text-[var(--text-primary)]">
                          <div className="flex items-center gap-2">
                            <MessageCircle size={16} className="text-[var(--text-muted)]" />
                            Support
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex px-3 py-1 rounded-full bg-[#FFFBEB] text-[#B45309] text-sm font-semibold">
                            18/6 WhatsApp
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex px-3 py-1 rounded-full bg-[#FAF5FF] text-[#7C3AED] text-sm font-semibold">
                            18/6 WhatsApp
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center text-[var(--text-muted)]">Tickets Only</td>
                      </tr>
                      <tr className="border-t border-[#f0f0f0]">
                        <td className="py-4 px-6 font-medium text-[var(--text-primary)]">
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} className="text-[var(--text-muted)]" />
                            Monthly Fee
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-sm font-semibold">
                            FREE
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-sm font-semibold">
                            FREE
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center text-[var(--text-muted)]">N/A</td>
                      </tr>
                      <tr className="border-t border-[#f0f0f0]">
                        <td className="py-4 px-6 font-medium text-[var(--text-primary)]">
                          <div className="flex items-center gap-2">
                            <Shield size={16} className="text-[var(--text-muted)]" />
                            Minimum Orders
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-sm font-semibold">
                            NONE
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-sm font-semibold">
                            NONE
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center text-[var(--text-muted)]">N/A</td>
                      </tr>
                      <tr className="border-t border-[#f0f0f0]">
                        <td className="py-4 px-6 font-medium text-[var(--text-primary)]">
                          <div className="flex items-center gap-2">
                            <Package size={16} className="text-[var(--text-muted)]" />
                            Branded Packaging
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-sm font-semibold">
                            YES
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-sm font-semibold">
                            YES
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center text-[var(--text-muted)]">No</td>
                      </tr>
                      <tr className="border-t border-[#f0f0f0]">
                        <td className="py-4 px-6 font-medium text-[var(--text-primary)]">
                          <div className="flex items-center gap-2">
                            <Award size={16} className="text-[var(--text-muted)]" />
                            Quality Control
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-sm font-semibold">
                            YES
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-sm font-semibold">
                            YES
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center text-[var(--text-muted)]">No</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Bottom note */}
                <div className="p-4 bg-[#fafafa] border-t border-[#e5e5e5]">
                  <p className="text-sm text-[var(--text-secondary)] text-center">
                    <strong className="text-[var(--text-primary)]">Pro Tip:</strong> Compare prices on each order. Sometimes Mate wins, sometimes HyperSKU. Always pick the cheaper option.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* How It Works Tab */}
          {activeTab === 'how-it-works' && (
            <motion.div
              key="how-it-works"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl p-8 border border-[#333]">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">How Smart Operators Use Two Agents</h3>
                  <p className="text-[#a3a3a3] max-w-xl mx-auto">
                    When you have an order, both agents show you the price in their Shopify app. Pick the cheaper one for that specific order.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-xl bg-[#FFB808] flex items-center justify-center mb-4">
                      <span className="text-xl font-bold text-black">1</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Connect Both</h4>
                    <p className="text-[#a3a3a3] text-sm leading-relaxed">
                      Install both agent apps on your Shopify store. It&apos;s free, no commitment required.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-xl bg-[#FFB808] flex items-center justify-center mb-4">
                      <span className="text-xl font-bold text-black">2</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Compare Prices</h4>
                    <p className="text-[#a3a3a3] text-sm leading-relaxed">
                      Each order shows pricing from both agents. Sometimes Mate is cheaper, sometimes HyperSKU.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-xl bg-[#FFB808] flex items-center justify-center mb-4">
                      <span className="text-xl font-bold text-black">3</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Pick the Winner</h4>
                    <p className="text-[#a3a3a3] text-sm leading-relaxed">
                      Fulfill each order with the agent that offers the best price. Maximize your margins.
                    </p>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                  {[
                    'Never get stuck when one agent has stock issues',
                    'Always get the best price on every order',
                    'Reduce risk by not depending on one source',
                    'Both agents integrate with Shopify seamlessly',
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-lg p-3 border border-white/5">
                      <CheckCircle size={18} className="text-[#22C55E] flex-shrink-0" />
                      <span className="text-[#e5e5e5] text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a
                    href={MATE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFB808] text-black font-semibold hover:bg-[#E5A607] transition-colors"
                  >
                    <Image src={MATE_LOGO} alt="Mate" width={20} height={20} className="rounded" />
                    <span>Connect Mate</span>
                    <ExternalLink size={16} />
                  </a>
                  <a
                    href={HYPERSKU_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#923CE2] text-white font-semibold hover:bg-[#7C3AED] transition-colors"
                  >
                    <Image src={HYPERSKU_LOGO} alt="HyperSKU" width={20} height={20} className="rounded" />
                    <span>Connect HyperSKU</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Facilities Tab */}
          {activeTab === 'facilities' && (
            <motion.div
              key="facilities"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden shadow-lg">
                <div className="p-6 border-b border-[#e5e5e5]">
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">Our Partner Facilities</h3>
                  <p className="text-sm text-[var(--text-secondary)]">State-of-the-art warehouses ensuring quality and fast shipping</p>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    {FACTORY_IMAGES.map((img, idx) => (
                      <div key={idx} className="relative rounded-xl overflow-hidden aspect-video group">
                        <img
                          src={img}
                          alt={`Facility ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                          <span className="text-xs text-white font-medium">Live Operations</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Facility Features */}
                  <div className="mt-6 grid md:grid-cols-4 gap-4">
                    {[
                      { icon: Package, label: 'Branded Packaging', desc: 'Custom inserts & boxes' },
                      { icon: Shield, label: 'Quality Control', desc: 'Every item inspected' },
                      { icon: Truck, label: 'Fast Shipping', desc: '5-9 day delivery' },
                      { icon: Users, label: 'Dedicated Support', desc: '18/6 WhatsApp' },
                    ].map((feature, idx) => (
                      <div key={idx} className="text-center p-4 rounded-xl bg-[#fafafa]">
                        <feature.icon size={24} className="mx-auto text-[var(--text-primary)] mb-2" />
                        <h4 className="font-semibold text-[var(--text-primary)] text-sm">{feature.label}</h4>
                        <p className="text-xs text-[var(--text-muted)]">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
