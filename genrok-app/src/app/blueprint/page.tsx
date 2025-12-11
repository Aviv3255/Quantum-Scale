'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Check, ArrowRight, Zap, Target, TrendingUp, Crown } from 'lucide-react';
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
  tagline: string;
  dailyBudget: number;
  customersPerDay: number;
  customersPerMonth: number;
  maxProfit: string;
  metrics: MetricRow[];
  requirements: string[];
  featured?: boolean;
}

const tiersData: TierData[] = [
  {
    id: '100k',
    title: '$100K',
    tier: 'LAUNCHPAD',
    tagline: 'Your first six figures',
    dailyBudget: 240,
    customersPerDay: 8,
    customersPerMonth: 240,
    maxProfit: '$239K',
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
    title: '$300K',
    tier: 'MOMENTUM',
    tagline: 'Scale with confidence',
    dailyBudget: 470,
    customersPerDay: 19,
    customersPerMonth: 570,
    maxProfit: '$640K',
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
    title: '$1M',
    tier: 'EMPIRE',
    tagline: 'Join the 1% club',
    dailyBudget: 1265,
    customersPerDay: 51,
    customersPerMonth: 1530,
    maxProfit: '$2M',
    featured: true,
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
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
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
      <div className="min-h-screen flex items-center justify-center bg-[#030303]">
        <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#030303]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* Hero Header */}
          <motion.header
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8"
            >
              <Zap size={16} className="text-amber-400" />
              <span className="text-sm font-semibold text-amber-400 tracking-wide">THE PROFIT BLUEPRINT</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              Stop Guessing.<br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                Start Printing.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              The exact numbers that separate <span className="text-white font-semibold">struggling stores</span> from{' '}
              <span className="text-amber-400 font-semibold">money-printing machines</span>.
              <br className="hidden md:block" />
              No fluff. No theory. Just the metrics that matter.
            </p>
          </motion.header>

          {/* Metrics Table Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-24"
          >
            <div
              className="rounded-3xl bg-gradient-to-b from-neutral-900 to-neutral-950 p-8 md:p-12 border border-neutral-800"
              style={{ boxShadow: '0 0 80px rgba(251,191,36,0.08)' }}
            >
              {/* Section Header */}
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Target size={24} className="text-amber-400" />
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Your Target Numbers</h2>
                </div>
                <p className="text-lg text-neutral-300">
                  Hit these metrics consistently, and watch your bank account explode.
                </p>
              </div>

              {/* Tier Selector */}
              <div className="flex justify-center gap-3 mb-12">
                {tiersData.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`
                      relative px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300
                      ${selectedTier === tier.id
                        ? tier.featured
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/30 scale-105'
                          : 'bg-white text-black shadow-lg shadow-white/20 scale-105'
                        : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700 hover:text-white'
                      }
                    `}
                  >
                    {tier.title}
                    {tier.featured && selectedTier === tier.id && (
                      <Crown size={14} className="absolute -top-2 -right-2 text-amber-300" />
                    )}
                  </button>
                ))}
              </div>

              {/* Metrics Table */}
              <div className="mb-10 overflow-hidden rounded-2xl border border-neutral-700/50">
                <div className="grid grid-cols-2 gap-4 p-5 bg-neutral-800/50 border-b border-neutral-700/50">
                  <span className="text-sm font-bold text-neutral-200 uppercase tracking-wider">Metric</span>
                  <span className="text-sm font-bold text-neutral-200 uppercase tracking-wider text-right">Target to Hit Goal</span>
                </div>

                <div className="divide-y divide-neutral-800/50">
                  {currentTier.metrics.map((metric, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="grid grid-cols-2 gap-4 p-5 hover:bg-neutral-800/30 transition-colors"
                    >
                      <span className="text-white font-medium">{metric.name}</span>
                      <div className="text-right">
                        <span className="text-white font-bold text-lg">{metric.min}</span>
                        <span className="text-emerald-400 ml-2 font-semibold">(aim for {metric.aim})</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Budget & Profit Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Daily Budget Card */}
                <div className="rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700/50 p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={18} className="text-amber-400" />
                    <span className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                      Daily Ad Spend for {currentTier.title}
                    </span>
                  </div>
                  <p className="text-neutral-400 text-sm mb-4">Based on realistic benchmarks</p>
                  <div className="text-5xl font-black text-white mb-3">${currentTier.dailyBudget}</div>
                  <p className="text-neutral-300">
                    <span className="text-white font-semibold">~{currentTier.customersPerDay}</span> customers/day •{' '}
                    <span className="text-white font-semibold">{currentTier.customersPerMonth}</span> customers/month
                  </p>
                </div>

                {/* Max Profit Card */}
                <div className="rounded-2xl bg-gradient-to-br from-emerald-900/40 to-emerald-950/40 border border-emerald-500/30 p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={18} className="text-emerald-400" />
                    <span className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                      When You Hit All Targets
                    </span>
                  </div>
                  <p className="text-neutral-400 text-sm mb-4">Your potential monthly profit</p>
                  <div className="text-5xl font-black text-white mb-3">{currentTier.maxProfit}</div>
                  <p className="text-emerald-300 font-medium">
                    Same budget. Different results. That&apos;s optimization.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Blueprint Cards Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-24"
          >
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Choose Your <span className="text-amber-400">Destination</span>
              </h2>
              <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
                Every empire starts somewhere. Pick your first milestone and reverse-engineer your way there.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid lg:grid-cols-3 gap-6"
            >
              {tiersData.map((tier) => (
                <motion.div
                  key={tier.id}
                  variants={itemVariants}
                  className="h-full"
                >
                  <div
                    className={`
                      relative h-full flex flex-col rounded-3xl
                      bg-gradient-to-b from-neutral-900 to-neutral-950
                      border ${tier.featured ? 'border-amber-500/50' : 'border-neutral-800'}
                      overflow-hidden
                    `}
                    style={{
                      boxShadow: tier.featured
                        ? '0 0 60px rgba(251,191,36,0.15)'
                        : '0 20px 40px rgba(0,0,0,0.3)',
                    }}
                  >
                    {/* Featured Badge */}
                    {tier.featured && (
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-center">
                        <span className="text-sm font-black text-black tracking-wider">THE ULTIMATE GOAL</span>
                      </div>
                    )}

                    {/* Card Header */}
                    <div className={`px-8 pt-8 pb-6 ${!tier.featured ? 'border-t-4 border-neutral-700' : ''}`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-neutral-400 tracking-[0.25em]">{tier.tier}</span>
                        {tier.featured && (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30">
                            <Crown size={12} className="text-amber-400" />
                            <span className="text-[10px] font-bold text-amber-300 tracking-wide">TOP 1%</span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-5xl font-black text-white mb-2">{tier.title}</h3>
                      <p className="text-neutral-400 font-medium">{tier.tagline}</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="px-8 pb-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl bg-neutral-800/50 p-4">
                          <div className="text-xs text-neutral-400 mb-1 font-medium">Daily Budget</div>
                          <div className="text-2xl font-bold text-white">${tier.dailyBudget}</div>
                        </div>
                        <div className="rounded-xl bg-neutral-800/50 p-4">
                          <div className="text-xs text-neutral-400 mb-1 font-medium">Max Profit</div>
                          <div className={`text-2xl font-bold ${tier.featured ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {tier.maxProfit}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="flex-1 px-8 pb-8">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="h-px flex-1 bg-neutral-800" />
                        <span className="text-[10px] font-bold text-neutral-500 tracking-[0.2em]">WHAT YOU NEED</span>
                        <div className="h-px flex-1 bg-neutral-800" />
                      </div>

                      <ul className="space-y-3">
                        {tier.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className={`
                              flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5
                              ${tier.featured
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-neutral-800 text-emerald-400'
                              }
                            `}>
                              <Check size={12} strokeWidth={3} />
                            </div>
                            <span className="text-sm text-neutral-200 leading-relaxed">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Profit Comparison */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mb-24"
          >
            <div
              className="rounded-3xl bg-gradient-to-b from-neutral-900 to-neutral-950 p-8 md:p-12 border border-neutral-800"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  See The <span className="text-amber-400">Gap</span>
                </h2>
                <p className="text-lg text-neutral-300">
                  Same effort. Different systems. Massive difference in results.
                </p>
              </div>

              <div className="space-y-6">
                {tiersData.map((tier, idx) => (
                  <div key={tier.id} className="flex items-center gap-4 md:gap-6">
                    <span className={`w-20 md:w-24 text-base font-bold ${tier.featured ? 'text-amber-400' : 'text-neutral-200'}`}>
                      {tier.title}
                    </span>
                    <div className="flex-1 h-12 bg-neutral-800/50 rounded-xl overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: tier.id === '100k' ? '12%' : tier.id === '300k' ? '32%' : '100%' }}
                        transition={{ delay: 0.9 + idx * 0.2, duration: 0.8 }}
                        className={`h-full rounded-xl ${
                          tier.featured
                            ? 'bg-gradient-to-r from-amber-600 to-orange-500'
                            : tier.id === '300k'
                              ? 'bg-gradient-to-r from-slate-600 to-slate-500'
                              : 'bg-gradient-to-r from-neutral-600 to-neutral-500'
                        }`}
                      />
                    </div>
                    <span className={`w-24 md:w-32 text-right text-base font-bold ${tier.featured ? 'text-amber-400' : 'text-white'}`}>
                      {tier.maxProfit}/mo
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="text-center"
          >
            <div
              className="rounded-3xl bg-gradient-to-b from-neutral-900 to-neutral-950 p-12 md:p-16 border border-neutral-800"
              style={{ boxShadow: '0 0 100px rgba(251,191,36,0.1)' }}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1 }}
              >
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                  These Numbers Don&apos;t Lie.<br />
                  <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    Neither Should Your Strategy.
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
                  Every $1M brand started by mastering these fundamentals. The difference?
                  <span className="text-white font-semibold"> They stopped winging it.</span>
                </p>

                <Link
                  href="/learn"
                  className="
                    group relative inline-flex items-center gap-3 px-10 py-5
                    bg-gradient-to-r from-amber-500 to-orange-500
                    text-black font-bold text-lg
                    rounded-2xl
                    transition-all duration-300
                    hover:scale-105 hover:shadow-xl hover:shadow-amber-500/30
                    active:scale-100
                    overflow-hidden
                  "
                >
                  {/* Shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Start Building Your Machine</span>
                  <ArrowRight size={20} strokeWidth={2.5} className="relative group-hover:translate-x-1 transition-transform" />
                </Link>

                <p className="mt-6 text-sm text-neutral-500">
                  Join 2,847+ founders who stopped hoping and started scaling.
                </p>
              </motion.div>
            </div>
          </motion.section>

        </div>
      </div>
    </DashboardLayout>
  );
}
