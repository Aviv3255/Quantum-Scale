'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Users,
  TrendingUp,
  PieChart,
  Vote,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

const polls = [
  {
    id: 1,
    question: 'What is your current monthly revenue?',
    options: [
      { label: '$0 - $10K', votes: 342, percentage: 45 },
      { label: '$10K - $50K', votes: 215, percentage: 28 },
      { label: '$50K - $100K', votes: 98, percentage: 13 },
      { label: '$100K+', votes: 105, percentage: 14 },
    ],
    totalVotes: 760,
  },
  {
    id: 2,
    question: 'Which advertising platform gives you the best ROAS?',
    options: [
      { label: 'Meta (Facebook/Instagram)', votes: 412, percentage: 52 },
      { label: 'TikTok', votes: 198, percentage: 25 },
      { label: 'Google', votes: 142, percentage: 18 },
      { label: 'Other', votes: 40, percentage: 5 },
    ],
    totalVotes: 792,
  },
  {
    id: 3,
    question: 'What is your biggest challenge right now?',
    options: [
      { label: 'Finding winning products', votes: 289, percentage: 35 },
      { label: 'Scaling profitably', votes: 247, percentage: 30 },
      { label: 'Improving conversion rate', votes: 165, percentage: 20 },
      { label: 'Customer retention', votes: 124, percentage: 15 },
    ],
    totalVotes: 825,
  },
  {
    id: 4,
    question: 'How many products do you have in your store?',
    options: [
      { label: '1-10', votes: 456, percentage: 55 },
      { label: '11-50', votes: 215, percentage: 26 },
      { label: '51-100', votes: 89, percentage: 11 },
      { label: '100+', votes: 66, percentage: 8 },
    ],
    totalVotes: 826,
  },
];

const stats = [
  { label: 'Community Members', value: '10,000+', icon: Users },
  { label: 'Total Poll Responses', value: '3,200+', icon: Vote },
  { label: 'Average CVR Reported', value: '3.2%', icon: TrendingUp },
  { label: 'Average AOV', value: '$87', icon: BarChart3 },
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

export default function DataCenterPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
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
              <h1>Data Center</h1>
              <p>See how other eCommerce entrepreneurs are performing. Anonymous community polls and benchmarks.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-secondary)]">
              <PieChart size={16} className="text-[var(--text-primary)]" strokeWidth={1.5} />
              <span className="text-sm font-medium text-[var(--text-primary)]">Community Data</span>
            </div>
          </div>
        </header>

        {/* Stats */}
        <section className="stats-grid mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="stat-card"
            >
              <div className="stat-icon">
                <stat.icon size={22} strokeWidth={1.5} />
              </div>
              <div>
                <span className="stat-label">{stat.label}</span>
                <span className="stat-value">{stat.value}</span>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Polls */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Community Polls</h2>
            <p className="text-[var(--text-muted)]">See how you compare to other store owners</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 max-w-3xl mx-auto"
          >
            {polls.map((poll) => (
              <motion.div key={poll.id} variants={itemVariants}>
                <div className="card overflow-hidden" style={{ padding: 0 }}>
                  <div className="p-6 border-b border-[var(--border-light)]">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">{poll.question}</h3>
                    <p className="text-sm text-[var(--text-muted)] mt-1">{poll.totalVotes.toLocaleString()} responses</p>
                  </div>
                  <div className="p-6 space-y-4">
                    {poll.options.map((option, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-[var(--text-secondary)]">{option.label}</span>
                          <span className="font-medium text-[var(--text-primary)]">{option.percentage}%</span>
                        </div>
                        <div className="h-3 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${option.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="h-full rounded-full bg-[var(--primary)]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </DashboardLayout>
  );
}
