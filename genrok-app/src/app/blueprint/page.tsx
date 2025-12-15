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
    transition: { duration: 0.3 },
  },
};

export default function BlueprintPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [selectedTier, setSelectedTier] = useState<string>('100k');

  const currentTier = tiersData.find((t) => t.id === selectedTier) || tiersData[0];

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div
        className="min-h-screen bg-white"
        style={{
          margin: '-40px -48px -40px -48px',
          width: 'calc(100% + 96px)',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <div className="w-full px-6 py-8 lg:px-12">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <h1 className="mb-5 text-5xl font-black tracking-tight text-gray-900 md:text-6xl">
              The $100K-$1M Profit Blueprint
            </h1>

            <p className="mx-auto max-w-2xl text-xl text-gray-500">
              The exact metrics that turn potential into unstoppable scale.
            </p>
          </motion.header>

          {/* Main Dark Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] p-8 md:p-12"
            style={{
              boxShadow: '0 25px 80px -20px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
            }}
          >
            {/* Subtle gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5" />

            {/* Glow effect */}
            <div className="pointer-events-none absolute -right-40 -top-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative z-10">
              {/* Section Title */}
              <div className="mb-10 text-center">
                <div className="mb-4 inline-flex items-center gap-2">
                  <Target size={20} className="text-emerald-400" />
                  <h2 className="text-3xl font-bold md:text-4xl" style={{ color: '#ffffff' }}>
                    Your Ideal Metrics Table
                  </h2>
                </div>
                <p className="text-lg text-gray-400">
                  Know your targets. Hit them. Scale relentlessly.
                </p>
              </div>

              {/* Tier Selector */}
              <div className="mb-12 flex justify-center gap-3">
                {tiersData.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`
                      relative rounded-2xl px-8 py-4 text-base font-bold transition-all duration-300
                      ${
                        selectedTier === tier.id
                          ? tier.id === '1m'
                            ? 'scale-105 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                            : 'scale-105 bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30'
                          : 'border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                      }
                    `}
                  >
                    {tier.title}
                  </button>
                ))}
              </div>

              {/* Metrics Table */}
              <div className="mb-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
                {/* Table Header */}
                <div className="grid grid-cols-2 gap-4 border-b border-white/10 bg-white/[0.03] px-6 py-4">
                  <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Metric
                  </span>
                  <span className="text-right text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Minimum Target to Hit Goal
                  </span>
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
                      className="grid grid-cols-2 gap-4 px-6 py-5 transition-colors hover:bg-white/[0.02]"
                    >
                      <span className="font-medium text-white">{metric.name}</span>
                      <div className="text-right">
                        <span className="text-lg font-bold text-white">{metric.min}</span>
                        <span className="ml-2 font-semibold text-emerald-400">
                          (aim for {metric.aim})
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Budget & Profit Cards */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Daily Budget Card */}
                <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-8">
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl" />
                  <div className="relative">
                    <div className="mb-2 flex items-center gap-2">
                      <Zap size={16} className="text-amber-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        YOUR DAILY BUDGET FOR {currentTier.displayTitle} PROFIT
                      </span>
                    </div>
                    <p className="mb-4 text-sm text-gray-400">Based on realistic benchmarks</p>
                    <div className="mb-3 text-5xl font-black text-white">
                      ${currentTier.dailyBudget}
                    </div>
                    <p className="text-gray-300">
                      <span className="font-semibold text-white">
                        ~{currentTier.customersPerDay}
                      </span>{' '}
                      customers/day •{' '}
                      <span className="font-semibold text-white">
                        {currentTier.customersPerMonth}
                      </span>{' '}
                      customers/month
                    </p>
                  </div>
                </div>

                {/* Max Profit Card */}
                <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-8">
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl" />
                  <div className="relative">
                    <div className="mb-2 flex items-center gap-2">
                      <TrendingUp size={16} className="text-emerald-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                        IF YOU HIT ALL TARGETS
                      </span>
                    </div>
                    <p className="mb-4 text-sm text-gray-400">
                      Your potential monthly profit with the same budget
                    </p>
                    <div className="text-5xl font-black text-white">{currentTier.maxProfit}</div>
                  </div>
                </div>
              </div>
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
              className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] p-12 md:p-16"
              style={{
                boxShadow: '0 25px 80px -20px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
              }}
            >
              {/* Glow */}
              <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-96 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />

              <div className="relative">
                <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ color: '#ffffff' }}>
                  Ready to Hit These Numbers?
                </h2>
                <p className="mx-auto mb-10 max-w-xl text-lg text-gray-400">
                  Learn the exact systems and strategies to make these metrics your reality.
                </p>

                <Link
                  href="/learn"
                  className="
                    group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl
                    bg-gradient-to-r from-emerald-500 to-teal-500
                    px-10 py-5 text-lg
                    font-bold
                    text-white transition-all
                    duration-300 hover:scale-105 hover:shadow-xl
                    hover:shadow-emerald-500/30
                    active:scale-100
                  "
                >
                  {/* Shine effect */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">Start Learning</span>
                  <ArrowRight
                    size={20}
                    className="relative transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
