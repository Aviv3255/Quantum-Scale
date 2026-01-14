'use client';

import { motion } from 'framer-motion';
import {
  ExternalLink,
  CheckCircle,
  Truck,
  DollarSign,
  MessageCircle,
  Shield,
  Zap,
  Crown,
  Star,
  TrendingUp,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Links
const MATE_LINK = 'https://erp.matedropshipping.com/login?invite_id=915';
const HYPERSKU_LINK = 'https://www.hypersku.com/campaign/optimize-dropshipping/?ref=nmmwogq';

// Factory images
const FACTORY_IMAGES = [
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/19%20(1).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/21.jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/24.jpg',
];

export default function PrivateAgentPage() {
  return (
    <DashboardLayout>
      <div className="page-wrapper" style={{ maxWidth: '1200px' }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-4">
            <Crown size={16} />
            <span>Pro Strategy: Use Two Agents</span>
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-3">
            Private Fulfillment Agents
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Smart operators use two agents. Primary for most orders, backup for edge cases where one has better pricing or stock. Based on 60,000+ orders tested.
          </p>
        </motion.div>

        {/* Two Agents Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 gap-6 mb-10"
        >
          {/* Mate Card - Primary */}
          <div className="relative bg-white rounded-2xl border-2 border-[#FFB808] overflow-hidden">
            {/* Recommended Badge */}
            <div className="absolute top-0 right-0">
              <div className="bg-[#FFB808] text-black text-xs font-bold px-4 py-1.5 rounded-bl-xl flex items-center gap-1.5">
                <Star size={12} fill="currentColor" />
                PRIMARY AGENT
              </div>
            </div>

            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 mt-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #FFB808 0%, #F59E0B 100%)' }}
                >
                  <Crown size={28} className="text-black" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)]">Mate</h2>
                  <p className="text-sm text-[var(--text-secondary)]">Dropshipping Agent</p>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#FFFBEB]">
                  <div className="flex items-center gap-3">
                    <Truck size={20} className="text-[#B45309]" />
                    <span className="font-medium text-[var(--text-primary)]">Shipping Time</span>
                  </div>
                  <span className="text-xl font-bold text-[#B45309]">7 Days</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-[#FFFBEB]">
                  <div className="flex items-center gap-3">
                    <DollarSign size={20} className="text-[#B45309]" />
                    <span className="font-medium text-[var(--text-primary)]">vs AliExpress</span>
                  </div>
                  <span className="text-xl font-bold text-[#059669]">4% Cheaper</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-[#FFFBEB]">
                  <div className="flex items-center gap-3">
                    <MessageCircle size={20} className="text-[#B45309]" />
                    <span className="font-medium text-[var(--text-primary)]">Support</span>
                  </div>
                  <span className="text-xl font-bold text-[#B45309]">18/6 WhatsApp</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-2 mb-6">
                {['Fastest consistent delivery', 'Best pricing vs AliExpress', 'Personal WhatsApp rep', 'Free to connect'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#059669]" />
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
          <div className="relative bg-white rounded-2xl border-2 border-[#923CE2] overflow-hidden">
            {/* Backup Badge */}
            <div className="absolute top-0 right-0">
              <div className="bg-[#923CE2] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl flex items-center gap-1.5">
                <Shield size={12} />
                BACKUP AGENT
              </div>
            </div>

            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 mt-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #923CE2 0%, #7C3AED 100%)' }}
                >
                  <Zap size={28} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)]">HyperSKU</h2>
                  <p className="text-sm text-[var(--text-secondary)]">Fulfillment Platform</p>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF5FF]">
                  <div className="flex items-center gap-3">
                    <Truck size={20} className="text-[#7C3AED]" />
                    <span className="font-medium text-[var(--text-primary)]">Shipping Time</span>
                  </div>
                  <span className="text-xl font-bold text-[#7C3AED]">9 Days</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF5FF]">
                  <div className="flex items-center gap-3">
                    <DollarSign size={20} className="text-[#7C3AED]" />
                    <span className="font-medium text-[var(--text-primary)]">vs AliExpress</span>
                  </div>
                  <span className="text-xl font-bold text-[#059669]">1% Cheaper</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF5FF]">
                  <div className="flex items-center gap-3">
                    <MessageCircle size={20} className="text-[#7C3AED]" />
                    <span className="font-medium text-[var(--text-primary)]">Support</span>
                  </div>
                  <span className="text-xl font-bold text-[#7C3AED]">18/6 WhatsApp</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-2 mb-6">
                {['Great for edge cases', 'Sometimes cheaper on specific items', 'Solid backup option', 'Free to connect'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#059669]" />
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
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden mb-10"
        >
          <div className="p-6 border-b border-[#e5e5e5]">
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
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#FFB808' }}>
                        <Crown size={16} className="text-black" />
                      </div>
                      <span className="font-semibold text-[var(--text-primary)]">Mate</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#923CE2' }}>
                        <Zap size={16} className="text-white" />
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
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669] text-white text-sm font-semibold">
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
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669] text-white text-sm font-semibold">
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
                    <span className="inline-flex px-3 py-1 rounded-full bg-[#DCFCE7] text-[#059669] text-sm font-semibold">
                      FREE
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex px-3 py-1 rounded-full bg-[#DCFCE7] text-[#059669] text-sm font-semibold">
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
                    <span className="inline-flex px-3 py-1 rounded-full bg-[#DCFCE7] text-[#059669] text-sm font-semibold">
                      NONE
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex px-3 py-1 rounded-full bg-[#DCFCE7] text-[#059669] text-sm font-semibold">
                      NONE
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center text-[var(--text-muted)]">N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black rounded-2xl p-8 mb-10"
        >
          <h3 className="text-2xl font-bold text-white mb-2">How Smart Operators Use Two Agents</h3>
          <p className="text-white/90 mb-8">
            When you have an order, both agents show you the price in their Shopify app. Pick the cheaper one for that specific order.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)] flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-black">1</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Connect Both</h4>
              <p className="text-white/90 text-sm">
                Install both agent apps on your Shopify store. It&apos;s free, no commitment.
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)] flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-black">2</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Compare Prices</h4>
              <p className="text-white/90 text-sm">
                Each order shows pricing from both agents. Sometimes Mate is cheaper, sometimes HyperSKU.
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)] flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-black">3</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Pick the Winner</h4>
              <p className="text-white/90 text-sm">
                Fulfill each order with the agent that offers the best price. Maximize your margins.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Factory Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Our Partner Facilities</h3>
          <div className="grid grid-cols-3 gap-4">
            {FACTORY_IMAGES.map((img, idx) => (
              <div key={idx} className="relative rounded-xl overflow-hidden aspect-video">
                <img
                  src={img}
                  alt={`Facility ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
                  <span className="text-xs text-white font-medium">Live Operations</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-[#FFFBEB] via-white to-[#FAF5FF] rounded-2xl p-8 text-center border border-[#e5e5e5]"
        >
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Ready to Level Up Your Fulfillment?</h3>
          <p className="text-[var(--text-secondary)] mb-6">
            Connect both agents for free. No monthly fees, no minimum orders. Start comparing prices on every order.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={MATE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d-mate"
            >
              <Crown size={18} />
              <span>Connect Mate (Primary)</span>
              <ExternalLink size={16} />
            </a>
            <a
              href={HYPERSKU_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d-hypersku"
            >
              <Zap size={18} />
              <span>Connect HyperSKU (Backup)</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
