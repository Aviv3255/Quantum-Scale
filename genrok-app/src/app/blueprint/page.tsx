'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight, TrendingUp, Users, DollarSign, Target, Eye, Zap } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface Metric {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}

interface Blueprint {
  id: number;
  tier: string;
  goal: string;
  tagline: string;
  featured?: boolean;
  accentClass: string;
  accentBorder: string;
  metrics: Metric[];
  requirements: string[];
}

const blueprints: Blueprint[] = [
  {
    id: 1,
    tier: 'FOUNDATION',
    goal: '$100K',
    tagline: 'Monthly Revenue',
    accentClass: 'from-neutral-700 to-neutral-800',
    accentBorder: 'border-neutral-600/30',
    metrics: [
      { icon: <DollarSign size={16} />, label: 'Daily Revenue', value: '$3,333' },
      { icon: <TrendingUp size={16} />, label: 'Daily Orders', value: '44' },
      { icon: <Target size={16} />, label: 'AOV', value: '$75' },
      { icon: <Zap size={16} />, label: 'CVR', value: '2.5%', highlight: true },
      { icon: <Eye size={16} />, label: 'Daily Visitors', value: '1,760' },
      { icon: <Users size={16} />, label: 'Target CAC', value: '$20' },
      { icon: <TrendingUp size={16} />, label: 'Target LTV', value: '$150' },
    ],
    requirements: [
      'Solid product-market fit',
      'Working ad creative',
      'Basic email flows',
      'Reliable fulfillment',
    ],
  },
  {
    id: 2,
    tier: 'GROWTH',
    goal: '$300K',
    tagline: 'Monthly Revenue',
    accentClass: 'from-slate-700 to-slate-800',
    accentBorder: 'border-slate-500/30',
    metrics: [
      { icon: <DollarSign size={16} />, label: 'Daily Revenue', value: '$10,000' },
      { icon: <TrendingUp size={16} />, label: 'Daily Orders', value: '100' },
      { icon: <Target size={16} />, label: 'AOV', value: '$100' },
      { icon: <Zap size={16} />, label: 'CVR', value: '4%', highlight: true },
      { icon: <Eye size={16} />, label: 'Daily Visitors', value: '2,500' },
      { icon: <Users size={16} />, label: 'Target CAC', value: '$25' },
      { icon: <TrendingUp size={16} />, label: 'Target LTV', value: '$400' },
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
    id: 3,
    tier: 'SCALE',
    goal: '$1M',
    tagline: 'Monthly Revenue',
    featured: true,
    accentClass: 'from-amber-800/80 to-amber-900/80',
    accentBorder: 'border-amber-600/20',
    metrics: [
      { icon: <DollarSign size={16} />, label: 'Daily Revenue', value: '$33,333' },
      { icon: <TrendingUp size={16} />, label: 'Daily Orders', value: '250' },
      { icon: <Target size={16} />, label: 'AOV', value: '$133' },
      { icon: <Zap size={16} />, label: 'CVR', value: '6%', highlight: true },
      { icon: <Eye size={16} />, label: 'Daily Visitors', value: '4,166' },
      { icon: <Users size={16} />, label: 'Target CAC', value: '$30' },
      { icon: <TrendingUp size={16} />, label: 'Target LTV', value: '$1,000' },
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  },
};

export default function BlueprintPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

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
              <div className="w-2 h-2 rounded-full bg-neutral-800" />
              <span className="text-sm font-medium text-neutral-600 tracking-wide">SCALE ROADMAP</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 tracking-tight">
              The Blueprint to Scale
            </h1>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
              Exact metrics and requirements to reach $100K, $300K, and $1M per month. This is your roadmap.
            </p>
          </motion.header>

          {/* Blueprint Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-20"
          >
            {blueprints.map((bp) => (
              <motion.div
                key={bp.id}
                variants={itemVariants}
                className={`relative ${bp.featured ? 'lg:-mt-4 lg:mb-4' : ''}`}
              >
                <div
                  className={`
                    relative overflow-hidden rounded-2xl
                    bg-[#0a0a0a]
                    border ${bp.accentBorder}
                    ${bp.featured ? 'ring-1 ring-amber-700/30' : ''}
                  `}
                  style={{
                    boxShadow: bp.featured
                      ? '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(180,140,80,0.1)'
                      : '0 20px 40px -12px rgba(0,0,0,0.15)',
                  }}
                >
                  {/* Featured Badge */}
                  {bp.featured && (
                    <div className="absolute top-0 left-0 right-0 py-2.5 bg-gradient-to-r from-amber-900/90 to-amber-800/90 text-center z-10 border-b border-amber-700/30">
                      <span className="text-xs font-semibold text-amber-200/90 tracking-widest">THE ULTIMATE GOAL</span>
                    </div>
                  )}

                  {/* Card Header */}
                  <div className={`relative px-8 pt-8 pb-6 ${bp.featured ? 'mt-9' : ''}`}>
                    {/* Subtle gradient accent at top */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${bp.accentClass}`} />

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-semibold text-neutral-500 tracking-[0.2em]">{bp.tier}</span>
                      {bp.featured && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-900/30 border border-amber-700/20">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                          <span className="text-[10px] font-medium text-amber-400/80">RECOMMENDED</span>
                        </div>
                      )}
                    </div>

                    <h2 className="text-5xl font-bold text-white mb-1 tracking-tight">{bp.goal}</h2>
                    <p className="text-sm text-neutral-500">{bp.tagline}</p>
                  </div>

                  {/* Metrics Section */}
                  <div className="px-8 pb-6">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="h-px flex-1 bg-neutral-800" />
                      <span className="text-[10px] font-semibold text-neutral-600 tracking-[0.15em]">REQUIRED METRICS</span>
                      <div className="h-px flex-1 bg-neutral-800" />
                    </div>

                    <div className="space-y-0">
                      {bp.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className={`
                            flex items-center justify-between py-3
                            ${idx !== bp.metrics.length - 1 ? 'border-b border-neutral-800/60' : ''}
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-neutral-600">
                              {metric.icon}
                            </div>
                            <span className="text-sm text-neutral-400">{metric.label}</span>
                          </div>
                          <span className={`
                            text-sm font-semibold
                            ${metric.highlight ? 'text-emerald-400' : 'text-white'}
                          `}>
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements Section */}
                  <div className="px-8 py-6 bg-neutral-900/50 border-t border-neutral-800/60">
                    <h3 className="text-[10px] font-semibold text-neutral-600 tracking-[0.15em] mb-4">REQUIREMENTS</h3>
                    <ul className="space-y-3">
                      {bp.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className={`
                            flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5
                            ${bp.featured
                              ? 'bg-amber-900/40 text-amber-500/80'
                              : 'bg-neutral-800 text-neutral-500'
                            }
                          `}>
                            <Check size={12} strokeWidth={2.5} />
                          </div>
                          <span className="text-sm text-neutral-400 leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Comparison Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-20"
          >
            <div className="rounded-2xl bg-[#0a0a0a] p-8 md:p-10" style={{ boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)' }}>
              <div className="flex items-center gap-2 mb-8">
                <div className="h-px flex-1 bg-neutral-800" />
                <span className="text-[10px] font-semibold text-neutral-600 tracking-[0.15em]">REVENUE COMPARISON</span>
                <div className="h-px flex-1 bg-neutral-800" />
              </div>

              <div className="space-y-6">
                {/* $100K Bar */}
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm font-medium text-neutral-400">$100K</span>
                  <div className="flex-1 h-8 bg-neutral-900 rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '10%' }}
                      transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-neutral-700 to-neutral-600 rounded-lg"
                    />
                  </div>
                  <span className="w-24 text-right text-sm font-semibold text-white">$3,333/day</span>
                </div>

                {/* $300K Bar */}
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm font-medium text-neutral-400">$300K</span>
                  <div className="flex-1 h-8 bg-neutral-900 rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '30%' }}
                      transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg"
                    />
                  </div>
                  <span className="w-24 text-right text-sm font-semibold text-white">$10,000/day</span>
                </div>

                {/* $1M Bar */}
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm font-medium text-amber-500/80">$1M</span>
                  <div className="flex-1 h-8 bg-neutral-900 rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-amber-800/80 to-amber-700/60 rounded-lg"
                    />
                  </div>
                  <span className="w-24 text-right text-sm font-semibold text-amber-400">$33,333/day</span>
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
              className="rounded-2xl bg-[#0a0a0a] p-10 md:p-14 border border-neutral-800/60"
              style={{ boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)' }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                Ready to Build Your $1M Machine?
              </h2>
              <p className="text-neutral-500 mb-8 max-w-lg mx-auto">
                Learn the exact systems and strategies to hit these numbers consistently.
              </p>
              <Link
                href="/learn"
                className="
                  inline-flex items-center gap-2 px-8 py-4
                  bg-white text-neutral-900
                  rounded-xl font-semibold text-sm
                  transition-all duration-200
                  hover:bg-neutral-100 hover:scale-[1.02]
                  active:scale-[0.98]
                "
                style={{ boxShadow: '0 4px 14px rgba(255,255,255,0.1)' }}
              >
                Start Learning
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
            </div>
          </motion.section>

        </div>
      </div>
    </DashboardLayout>
  );
}
