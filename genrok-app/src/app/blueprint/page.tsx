'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, TrendingUp, Zap, Target, Sparkles } from 'lucide-react';
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
  displayTitle: string;
  dailyBudget: number;
  customersPerDay: number;
  customersPerMonth: number;
  maxProfit: string;
  metrics: MetricRow[];
}

const tiersData: TierData[] = [
  {
    id: '100k',
    title: '$100K',
    displayTitle: '$100,000',
    dailyBudget: 240,
    customersPerDay: 8,
    customersPerMonth: 240,
    maxProfit: '$239,000',
    metrics: [
      { name: 'CAC (Cost per Customer)', min: '$30', aim: '$20' },
      { name: 'Conversion Rate (Cold Traffic)', min: '5%', aim: '7%+' },
      { name: 'Average Order Value (AOV)', min: '$150', aim: '$200+' },
      { name: '24-months LTV', min: '$700', aim: '$1,000+' },
      { name: 'Product price markup', min: '3x', aim: '3.5x+' },
    ],
  },
  {
    id: '300k',
    title: '$300K',
    displayTitle: '$300,000',
    dailyBudget: 470,
    customersPerDay: 19,
    customersPerMonth: 570,
    maxProfit: '$640,000',
    metrics: [
      { name: 'CAC (Cost per Customer)', min: '$25', aim: '$18' },
      { name: 'Conversion Rate (Cold Traffic)', min: '6%', aim: '8%+' },
      { name: 'Average Order Value (AOV)', min: '$180', aim: '$230+' },
      { name: '24-months LTV', min: '$850', aim: '$1,200+' },
      { name: 'Product price markup', min: '3.2x', aim: '4x+' },
    ],
  },
  {
    id: '1m',
    title: '$1M',
    displayTitle: '$1,000,000',
    dailyBudget: 1265,
    customersPerDay: 51,
    customersPerMonth: 1530,
    maxProfit: '$2,000,000',
    metrics: [
      { name: 'CAC (Cost per Customer)', min: '$25', aim: '$18' },
      { name: 'Conversion Rate (Cold Traffic)', min: '7%', aim: '9%+' },
      { name: 'Average Order Value (AOV)', min: '$200', aim: '$260+' },
      { name: '24-months LTV', min: '$1,000', aim: '$1,300+' },
      { name: 'Product price markup', min: '3.5x', aim: '4x+' },
      { name: 'Processing Fees', min: '3%', aim: '3%' },
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
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
        <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white mb-8 shadow-lg shadow-emerald-500/25">
              <TrendingUp size={16} />
              <Sparkles size={16} />
              <span className="text-sm font-bold tracking-wide">YOUR ROADMAP TO 6-7 FIGURES</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-5 tracking-tight">
              The $100K-$1M Profit Blueprint
            </h1>

            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              The exact metrics that turn potential into unstoppable scale.
            </p>
          </motion.header>

          {/* Main Dark Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative rounded-3xl bg-[#0a0a0a] p-8 md:p-12 overflow-hidden"
            style={{
              boxShadow: '0 25px 80px -20px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)'
            }}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5 pointer-events-none" />

            {/* Glow effect */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Section Title */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Target size={20} className="text-emerald-400" />
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Your Ideal Metrics Table
                  </h2>
                </div>
                <p className="text-gray-400 text-lg">
                  Know your targets. Hit them. Scale relentlessly.
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
                        ? tier.id === '1m'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 scale-105'
                          : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30 scale-105'
                        : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white'
                      }
                    `}
                  >
                    {tier.title}
                  </button>
                ))}
              </div>

              {/* Metrics Table */}
              <div className="mb-10 rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden backdrop-blur-sm">
                {/* Table Header */}
                <div className="grid grid-cols-2 gap-4 px-6 py-4 bg-white/[0.03] border-b border-white/10">
                  <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Metric</span>
                  <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider text-right">Minimum Target to Hit Goal</span>
                </div>

                {/* Table Rows */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  key={selectedTier}
                  className="divide-y divide-white/5"
                >
                  {currentTier.metrics.map((metric, idx) => (
                    <motion.div
                      key={`${selectedTier}-${idx}`}
                      variants={itemVariants}
                      className="grid grid-cols-2 gap-4 px-6 py-5 hover:bg-white/[0.02] transition-colors"
                    >
                      <span className="text-white font-medium">{metric.name}</span>
                      <div className="text-right">
                        <span className="text-white font-bold text-lg">{metric.min}</span>
                        <span className="text-emerald-400 ml-2 font-semibold">(aim for {metric.aim})</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Budget & Profit Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Daily Budget Card */}
                <div className="relative rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 p-8 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap size={16} className="text-amber-400" />
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        YOUR DAILY BUDGET FOR {currentTier.displayTitle} PROFIT
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Based on realistic benchmarks</p>
                    <div className="text-5xl font-black text-white mb-3">${currentTier.dailyBudget}</div>
                    <p className="text-gray-300">
                      <span className="text-white font-semibold">~{currentTier.customersPerDay}</span> customers/day •{' '}
                      <span className="text-white font-semibold">{currentTier.customersPerMonth}</span> customers/month
                    </p>
                  </div>
                </div>

                {/* Max Profit Card */}
                <div className="relative rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 p-8 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp size={16} className="text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        IF YOU HIT ALL TARGETS
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Your potential monthly profit with the same budget</p>
                    <div className="text-5xl font-black text-white">{currentTier.maxProfit}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visual Comparison Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 rounded-3xl bg-[#0a0a0a] p-8 md:p-10 overflow-hidden"
            style={{
              boxShadow: '0 25px 80px -20px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)'
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="text-sm font-bold text-gray-400 tracking-wider">PROFIT POTENTIAL</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <div className="space-y-5">
              {tiersData.map((tier, idx) => {
                const widths = { '100k': '12%', '300k': '32%', '1m': '100%' };
                const colors = {
                  '100k': 'from-gray-600 to-gray-500',
                  '300k': 'from-blue-600 to-indigo-500',
                  '1m': 'from-emerald-500 to-teal-400'
                };
                return (
                  <div key={tier.id} className="flex items-center gap-4">
                    <span className={`w-16 text-sm font-bold ${tier.id === '1m' ? 'text-emerald-400' : 'text-gray-300'}`}>
                      {tier.title}
                    </span>
                    <div className="flex-1 h-10 bg-white/5 rounded-xl overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: widths[tier.id as keyof typeof widths] }}
                        transition={{ delay: 0.6 + idx * 0.15, duration: 0.8 }}
                        className={`h-full bg-gradient-to-r ${colors[tier.id as keyof typeof colors]} rounded-xl relative`}
                      >
                        {tier.id === '1m' && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                        )}
                      </motion.div>
                    </div>
                    <span className={`w-28 text-right text-sm font-bold ${tier.id === '1m' ? 'text-emerald-400' : 'text-white'}`}>
                      {tier.maxProfit}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <div
              className="rounded-3xl bg-[#0a0a0a] p-12 md:p-16 overflow-hidden relative"
              style={{
                boxShadow: '0 25px 80px -20px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)'
              }}
            >
              {/* Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Hit These Numbers?
                </h2>
                <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                  Learn the exact systems and strategies to make these metrics your reality.
                </p>

                <Link
                  href="/learn"
                  className="
                    group relative inline-flex items-center gap-3 px-10 py-5
                    bg-gradient-to-r from-emerald-500 to-teal-500
                    text-white font-bold text-lg
                    rounded-2xl
                    transition-all duration-300
                    hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30
                    active:scale-100
                    overflow-hidden
                  "
                >
                  {/* Shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Start Learning</span>
                  <ArrowRight size={20} className="relative group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </DashboardLayout>
  );
}
