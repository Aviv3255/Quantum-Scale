'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Rocket } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

const blueprints = [
  {
    id: 1,
    goal: '$100K/Month',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    metrics: {
      dailyRevenue: '$3,333',
      dailyOrders: '44',
      aov: '$75',
      cvr: '2.5%',
      dailyVisitors: '1,760',
      cac: '$20',
      ltv: '$150',
    },
    requirements: [
      'Solid product-market fit',
      'Working ad creative',
      'Basic email flows',
      'Reliable fulfillment',
    ],
  },
  {
    id: 2,
    goal: '$300K/Month',
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    metrics: {
      dailyRevenue: '$10,000',
      dailyOrders: '100',
      aov: '$100',
      cvr: '4%',
      dailyVisitors: '2,500',
      cac: '$25',
      ltv: '$400',
    },
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
    goal: '$1M/Month',
    color: 'from-[var(--accent-gold)] to-amber-600',
    bgColor: 'bg-[var(--accent-gold-bg)]',
    borderColor: 'border-[var(--border-gold)]',
    featured: true,
    metrics: {
      dailyRevenue: '$33,333',
      dailyOrders: '250',
      aov: '$133',
      cvr: '6%',
      dailyVisitors: '4,166',
      cac: '$30',
      ltv: '$1,000',
    },
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
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
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
        <div className="animate-spin w-8 h-8 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Page Header */}
        <header className="page-header">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1>The Blueprint to Scale</h1>
              <p>Exact metrics and requirements to reach $100K, $300K, and $1M per month. This is your roadmap.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-gold-bg)]">
              <Rocket size={16} className="text-[var(--accent-gold)]" strokeWidth={1.5} />
              <span className="text-sm font-medium text-[var(--accent-gold)]">Scale Roadmap</span>
            </div>
          </div>
        </header>

        {/* Blueprints */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-3 gap-6 mb-12"
        >
          {blueprints.map((bp) => (
            <motion.div key={bp.id} variants={itemVariants}>
              <div
                className={`relative card overflow-hidden ${bp.featured ? 'ring-2 ring-[var(--accent-gold)] scale-105' : ''}`}
                style={{ padding: 0 }}
              >
                {bp.featured && (
                  <div className="absolute top-0 left-0 right-0 py-2 bg-[var(--accent-gold)] text-center z-10">
                    <span className="text-sm font-semibold text-white">THE ULTIMATE GOAL</span>
                  </div>
                )}

                {/* Header */}
                <div className={`p-8 ${bp.featured ? 'pt-14' : ''} text-center bg-gradient-to-br ${bp.color}`}>
                  <h2 className="text-4xl font-bold text-white mb-2">{bp.goal}</h2>
                  <p className="text-white/80">Monthly Revenue Target</p>
                </div>

                {/* Metrics */}
                <div className="p-6">
                  <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">Required Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-[var(--border-light)]">
                      <span className="text-[var(--text-muted)]">Daily Revenue</span>
                      <span className="font-bold text-[var(--text-primary)]">{bp.metrics.dailyRevenue}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[var(--border-light)]">
                      <span className="text-[var(--text-muted)]">Daily Orders</span>
                      <span className="font-bold text-[var(--text-primary)]">{bp.metrics.dailyOrders}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[var(--border-light)]">
                      <span className="text-[var(--text-muted)]">AOV</span>
                      <span className="font-bold text-[var(--text-primary)]">{bp.metrics.aov}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[var(--border-light)]">
                      <span className="text-[var(--text-muted)]">CVR</span>
                      <span className="font-bold text-green-600">{bp.metrics.cvr}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[var(--border-light)]">
                      <span className="text-[var(--text-muted)]">Daily Visitors</span>
                      <span className="font-bold text-[var(--text-primary)]">{bp.metrics.dailyVisitors}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[var(--border-light)]">
                      <span className="text-[var(--text-muted)]">Target CAC</span>
                      <span className="font-bold text-[var(--text-primary)]">{bp.metrics.cac}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-[var(--text-muted)]">Target LTV</span>
                      <span className="font-bold text-[var(--accent-gold)]">{bp.metrics.ltv}</span>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className={`p-6 ${bp.bgColor}`}>
                  <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">Requirements</h3>
                  <ul className="space-y-2">
                    {bp.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-[var(--text-secondary)]">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <section className="card p-8 text-center bg-[var(--text-primary)]">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Build Your $1M Machine?
          </h2>
          <p className="text-lg text-white/70 mb-8">
            Learn the exact systems and strategies to hit these numbers.
          </p>
          <Link href="/learn" className="btn bg-white text-[var(--text-primary)] hover:bg-gray-100">
            Start Learning
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </section>
      </div>
    </DashboardLayout>
  );
}
