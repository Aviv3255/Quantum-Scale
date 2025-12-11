'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface MetricRow {
  name: string;
  min: string;
  aim: string;
}

interface TierData {
  id: string;
  title: string;
  tier: string;
  dailyBudget: number;
  customersPerDay: number;
  customersPerMonth: number;
  maxProfit: string;
  metrics: MetricRow[];
  requirements: string[];
  featured?: boolean;
  accentColor: string;
  accentBg: string;
}

const tiersData: TierData[] = [
  {
    id: '100k',
    title: '$100,000',
    tier: 'FOUNDATION',
    dailyBudget: 240,
    customersPerDay: 8,
    customersPerMonth: 240,
    maxProfit: '$239,000',
    accentColor: 'text-neutral-300',
    accentBg: 'from-neutral-600 to-neutral-700',
    metrics: [
      { name: 'CAC (Cost per Customer)', min: '$30', aim: '$20' },
      { name: 'Conversion Rate (Cold Traffic)', min: '5%', aim: '7%+' },
      { name: 'Average Order Value (AOV)', min: '$150', aim: '$200+' },
      { name: '24-months LTV', min: '$700', aim: '$1,000+' },
      { name: 'Product price markup', min: '3x', aim: '3.5x+' },
    ],
    requirements: [
      'Solid product-market fit',
      'Working ad creative',
      'Basic email flows',
      'Reliable fulfillment',
    ],
  },
  {
    id: '300k',
    title: '$300,000',
    tier: 'GROWTH',
    dailyBudget: 470,
    customersPerDay: 19,
    customersPerMonth: 570,
    maxProfit: '$640,000',
    accentColor: 'text-slate-300',
    accentBg: 'from-slate-600 to-slate-700',
    metrics: [
      { name: 'CAC (Cost per Customer)', min: '$25', aim: '$18' },
      { name: 'Conversion Rate (Cold Traffic)', min: '6%', aim: '8%+' },
      { name: 'Average Order Value (AOV)', min: '$180', aim: '$230+' },
      { name: '24-months LTV', min: '$850', aim: '$1,200+' },
      { name: 'Product price markup', min: '3.2x', aim: '4x+' },
    ],
    requirements: [
      'Multiple winning creatives',
      'SMS + Email automation',
      'Post-purchase upsells',
      'Private agent shipping',
      'Customer support team',
    ],
  },
  {
    id: '1m',
    title: '$1,000,000',
    tier: 'SCALE',
    dailyBudget: 1265,
    customersPerDay: 51,
    customersPerMonth: 1530,
    maxProfit: '$2,000,000',
    featured: true,
    accentColor: 'text-amber-300',
    accentBg: 'from-amber-700 to-amber-800',
    metrics: [
      { name: 'CAC (Cost per Customer)', min: '$25', aim: '$18' },
      { name: 'Conversion Rate (Cold Traffic)', min: '7%', aim: '9%+' },
      { name: 'Average Order Value (AOV)', min: '$200', aim: '$260+' },
      { name: '24-months LTV', min: '$1,000', aim: '$1,300+' },
      { name: 'Product price markup', min: '3.5x', aim: '4x+' },
      { name: 'Processing Fees', min: '3%', aim: '3%' },
    ],
    requirements: [
      '$1,000+ LTV system',
      'Multi-channel ads (Meta + TikTok + Google)',
      'Full retention marketing',
      'A/B testing culture',
      '5-7 day shipping worldwide',
      'Dedicated support team',
      'UGC content machine',
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  },
};

export default function BlueprintPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [selectedTier, setSelectedTier] = useState<string>('100k');

  const currentTier = tiersData.find(t => t.id === selectedTier) || tiersData[0];

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-neutral-800 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Header Section */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 mb-6">
              <Sparkles size={14} className="text-neutral-700" />
              <span className="text-sm font-medium text-neutral-700 tracking-wide">PROFIT BLUEPRINT</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 tracking-tight">
              The $100K-$1M Blueprint
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              The exact metrics that turn potential into unstoppable scale.
            </p>
          </motion.header>

          {/* Metrics Table Card */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-16"
          >
            <div
              className="rounded-2xl bg-[#0f0f0f] p-8 md:p-10 border border-neutral-800/50"
              style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
            >
              {/* Card Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Your Ideal Metrics Table</h2>
                <p className="text-neutral-400">Know your targets. Hit them. Scale relentlessly.</p>
              </div>

              {/* Tier Selector */}
              <div className="flex justify-center gap-2 mb-10">
                {tiersData.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`
                      px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                      ${selectedTier === tier.id
                        ? tier.featured
                          ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-900/30'
                          : 'bg-white text-neutral-900 shadow-lg'
                        : 'bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700/50 hover:text-white'
                      }
                    `}
                  >
                    {tier.id === '100k' ? '$100K' : tier.id === '300k' ? '$300K' : '$1M'}
                  </button>
                ))}
              </div>

              {/* Metrics Table */}
              <div className="mb-8">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-neutral-700/50 mb-4">
                  <span className="text-sm font-semibold text-neutral-300 uppercase tracking-wider">Metric</span>
                  <span className="text-sm font-semibold text-neutral-300 uppercase tracking-wider text-right">Minimum Target to Hit Goal</span>
                </div>

                <div className="space-y-0">
                  {currentTier.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className={`
                        grid grid-cols-2 gap-4 py-4
                        ${idx !== currentTier.metrics.length - 1 ? 'border-b border-neutral-800/50' : ''}
                      `}
                    >
                      <span className="text-white font-medium">{metric.name}</span>
                      <div className="text-right">
                        <span className="text-white font-semibold">{metric.min}</span>
                        <span className="text-emerald-400 ml-2 font-medium">(aim for {metric.aim})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget & Profit Cards */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Daily Budget Card */}
                <div className="rounded-xl bg-neutral-800/40 border border-neutral-700/30 p-6">
                  <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                    YOUR DAILY BUDGET FOR {currentTier.title} PROFIT
                  </div>
                  <p className="text-neutral-400 text-sm mb-3">Based on realistic benchmarks</p>
                  <div className="text-4xl font-bold text-white mb-2">${currentTier.dailyBudget}</div>
                  <p className="text-neutral-400 text-sm">
                    ~{currentTier.customersPerDay} customers/day • {currentTier.customersPerMonth} customers/month
                  </p>
                </div>

                {/* Max Profit Card */}
                <div className="rounded-xl bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border border-emerald-700/30 p-6">
                  <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                    IF YOU HIT ALL TARGETS
                  </div>
                  <p className="text-neutral-400 text-sm mb-3">Your potential monthly profit with the same budget</p>
                  <div className="text-4xl font-bold text-white">{currentTier.maxProfit}</div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Blueprint Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-20"
          >
            {tiersData.map((tier) => (
              <motion.div
                key={tier.id}
                variants={itemVariants}
                className={`relative ${tier.featured ? 'lg:-mt-4 lg:mb-4' : ''}`}
              >
                <div
                  className={`
                    relative overflow-hidden rounded-2xl
                    bg-[#0f0f0f]
                    border border-neutral-800/50
                    ${tier.featured ? 'ring-1 ring-amber-600/40' : ''}
                  `}
                  style={{
                    boxShadow: tier.featured
                      ? '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 30px rgba(180,140,80,0.1)'
                      : '0 20px 40px -12px rgba(0,0,0,0.2)',
                  }}
                >
                  {/* Featured Badge */}
                  {tier.featured && (
                    <div className="absolute top-0 left-0 right-0 py-2.5 bg-gradient-to-r from-amber-800 to-amber-700 text-center z-10">
                      <span className="text-xs font-bold text-amber-100 tracking-widest">THE ULTIMATE GOAL</span>
                    </div>
                  )}

                  {/* Card Header */}
                  <div className={`relative px-8 pt-8 pb-6 ${tier.featured ? 'mt-9' : ''}`}>
                    {/* Accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tier.accentBg}`} />

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-neutral-400 tracking-[0.2em]">{tier.tier}</span>
                      {tier.featured && (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-800/40 border border-amber-600/30">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span className="text-[10px] font-bold text-amber-300">RECOMMENDED</span>
                        </div>
                      )}
                    </div>

                    <h2 className="text-4xl font-bold text-white mb-1 tracking-tight">{tier.title}</h2>
                    <p className="text-sm text-neutral-400">Monthly Profit Target</p>
                  </div>

                  {/* Key Stats */}
                  <div className="px-8 pb-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="rounded-lg bg-neutral-800/40 p-4">
                        <div className="text-xs text-neutral-400 mb-1">Daily Budget</div>
                        <div className="text-xl font-bold text-white">${tier.dailyBudget}</div>
                      </div>
                      <div className="rounded-lg bg-neutral-800/40 p-4">
                        <div className="text-xs text-neutral-400 mb-1">Max Profit</div>
                        <div className={`text-xl font-bold ${tier.featured ? 'text-amber-300' : 'text-emerald-400'}`}>{tier.maxProfit}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-px flex-1 bg-neutral-700/50" />
                      <span className="text-[10px] font-bold text-neutral-500 tracking-[0.15em]">REQUIREMENTS</span>
                      <div className="h-px flex-1 bg-neutral-700/50" />
                    </div>

                    <ul className="space-y-3">
                      {tier.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className={`
                            flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5
                            ${tier.featured
                              ? 'bg-amber-800/50 text-amber-400'
                              : 'bg-neutral-700/50 text-neutral-400'
                            }
                          `}>
                            <Check size={12} strokeWidth={2.5} />
                          </div>
                          <span className="text-sm text-neutral-300 leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Revenue Comparison */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-20"
          >
            <div
              className="rounded-2xl bg-[#0f0f0f] p-8 md:p-10 border border-neutral-800/50"
              style={{ boxShadow: '0 20px 40px -12px rgba(0,0,0,0.2)' }}
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="h-px flex-1 bg-neutral-700/50" />
                <span className="text-xs font-bold text-neutral-400 tracking-[0.15em]">PROFIT COMPARISON</span>
                <div className="h-px flex-1 bg-neutral-700/50" />
              </div>

              <div className="space-y-6">
                {/* $100K Bar */}
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm font-semibold text-neutral-300">$100K</span>
                  <div className="flex-1 h-10 bg-neutral-800/50 rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '12%' }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-neutral-600 to-neutral-500 rounded-lg"
                    />
                  </div>
                  <span className="w-28 text-right text-sm font-bold text-white">$239K/mo</span>
                </div>

                {/* $300K Bar */}
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm font-semibold text-neutral-300">$300K</span>
                  <div className="flex-1 h-10 bg-neutral-800/50 rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '32%' }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-slate-600 to-slate-500 rounded-lg"
                    />
                  </div>
                  <span className="w-28 text-right text-sm font-bold text-white">$640K/mo</span>
                </div>

                {/* $1M Bar */}
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm font-semibold text-amber-300">$1M</span>
                  <div className="flex-1 h-10 bg-neutral-800/50 rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-amber-700 to-amber-600 rounded-lg"
                    />
                  </div>
                  <span className="w-28 text-right text-sm font-bold text-amber-300">$2M/mo</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center"
          >
            <div
              className="rounded-2xl bg-[#0f0f0f] p-10 md:p-14 border border-neutral-800/50"
              style={{ boxShadow: '0 20px 40px -12px rgba(0,0,0,0.2)' }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                Ready to Build Your $1M Machine?
              </h2>
              <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
                Learn the exact systems and strategies to hit these numbers consistently.
              </p>
              <Link
                href="/learn"
                className="
                  group relative inline-flex items-center gap-2 px-8 py-4
                  bg-white text-neutral-900
                  rounded-xl font-semibold text-sm
                  transition-all duration-300
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  overflow-hidden
                "
                style={{
                  boxShadow: '0 4px 20px rgba(255,255,255,0.15), 0 0 40px rgba(255,255,255,0.05)'
                }}
              >
                {/* Shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Start Learning</span>
                <ArrowRight size={16} strokeWidth={2} className="relative" />
              </Link>
            </div>
          </motion.section>

        </div>
      </div>
    </DashboardLayout>
  );
}
