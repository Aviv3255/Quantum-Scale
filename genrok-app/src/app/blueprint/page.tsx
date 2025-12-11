'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, TrendingUp, Lightbulb } from 'lucide-react';
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
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 mb-6">
              <TrendingUp size={16} />
              <Lightbulb size={16} />
              <span className="text-sm font-semibold tracking-wide">YOUR ROADMAP TO 6-7 FIGURES</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              The $100K-$1M Profit Blueprint
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The exact metrics that turn potential into unstoppable scale.
            </p>
          </motion.header>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10"
          >
            {/* Section Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Your Ideal Metrics Table
              </h2>
              <p className="text-gray-500">
                Know your targets. Hit them. Scale relentlessly.
              </p>
            </div>

            {/* Tier Selector */}
            <div className="flex justify-center gap-3 mb-10">
              {tiersData.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`
                    px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-200
                    ${selectedTier === tier.id
                      ? tier.id === '1m'
                        ? 'bg-emerald-500 text-white shadow-lg'
                        : 'bg-blue-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  {tier.title}
                </button>
              ))}
            </div>

            {/* Metrics Table */}
            <div className="mb-8">
              {/* Table Header */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200">
                <span className="text-sm font-semibold text-gray-500 italic">Metric</span>
                <span className="text-sm font-semibold text-gray-500 italic text-right">Minimum Target to Hit Goal</span>
              </div>

              {/* Table Rows */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={selectedTier}
              >
                {currentTier.metrics.map((metric, idx) => (
                  <motion.div
                    key={`${selectedTier}-${idx}`}
                    variants={itemVariants}
                    className={`
                      grid grid-cols-2 gap-4 py-4
                      ${idx !== currentTier.metrics.length - 1 ? 'border-b border-gray-100' : ''}
                      ${idx % 2 === 1 ? 'bg-gray-50/50' : ''}
                    `}
                  >
                    <span className="text-gray-900 font-medium">{metric.name}</span>
                    <div className="text-right">
                      <span className="text-gray-900 font-semibold">{metric.min}</span>
                      <span className="text-emerald-500 ml-2 font-medium">(aim for {metric.aim})</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Budget & Profit Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Daily Budget Card */}
              <div className="rounded-xl bg-amber-50 border-2 border-amber-200 p-6">
                <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
                  YOUR DAILY BUDGET FOR {currentTier.displayTitle} PROFIT
                </div>
                <p className="text-gray-500 text-sm mb-3">Based on realistic benchmarks</p>
                <div className="text-4xl font-black text-gray-900 mb-2">${currentTier.dailyBudget}</div>
                <p className="text-gray-600 text-sm">
                  ~{currentTier.customersPerDay} customers/day • {currentTier.customersPerMonth} customers/month
                </p>
              </div>

              {/* Max Profit Card */}
              <div className="rounded-xl bg-emerald-50 border-2 border-emerald-200 p-6">
                <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
                  IF YOU HIT ALL TARGETS
                </div>
                <p className="text-gray-500 text-sm mb-3">Your potential monthly profit with the same budget</p>
                <div className="text-4xl font-black text-gray-900">{currentTier.maxProfit}</div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Ready to Hit These Numbers?
              </h2>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                Learn the exact systems and strategies to make these metrics your reality.
              </p>

              <Link
                href="/learn"
                className="
                  group inline-flex items-center gap-2 px-8 py-4
                  bg-gray-900 text-white
                  rounded-xl font-semibold
                  transition-all duration-200
                  hover:bg-gray-800 hover:scale-[1.02]
                  active:scale-[0.98]
                "
              >
                Start Learning
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </DashboardLayout>
  );
}
