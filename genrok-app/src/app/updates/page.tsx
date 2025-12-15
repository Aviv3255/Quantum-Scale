'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bell, Calendar } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface Update {
  date: string;
  title: string;
  description: string;
  category: string;
}

const updates: Update[] = [
  {
    date: '2025-01-10',
    title: 'New Secret Apps Added',
    description:
      'Added 3 new must-have Shopify apps with exclusive discounts for Quantum Scale members.',
    category: 'Apps',
  },
  {
    date: '2025-01-08',
    title: 'A/B Test Results Updated',
    description: 'Fresh test results showing 28.9% CVR improvement from UGC video reviews.',
    category: 'Testing',
  },
  {
    date: '2025-01-05',
    title: 'TikTok Ads Credit Extended',
    description: 'The $6,000 TikTok advertising credit program has been extended through Q1 2025.',
    category: 'Advertising',
  },
  {
    date: '2024-12-20',
    title: 'Shrine Theme Partnership',
    description: 'Exclusive 20% discount code QUANTUMSCALE now available for all members.',
    category: 'Theme',
  },
  {
    date: '2024-12-15',
    title: 'Design Inspiration Library Expanded',
    description: 'Added 500+ new high-converting design examples across all categories.',
    category: 'Design',
  },
];

const categoryColors: Record<string, { bg: string; text: string }> = {
  Apps: { bg: 'bg-blue-50', text: 'text-blue-600' },
  Testing: { bg: 'bg-purple-50', text: 'text-purple-600' },
  Advertising: { bg: 'bg-green-50', text: 'text-green-600' },
  Theme: { bg: 'bg-[var(--bg-secondary)]', text: 'text-[var(--text-primary)]' },
  Design: { bg: 'bg-pink-50', text: 'text-pink-600' },
};

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

export default function UpdatesPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent-gold)] border-t-transparent" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Page Header */}
        <header className="page-header">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1>What&apos;s New</h1>
              <p>
                Stay updated with the latest features, partnerships, and resources added to your
                dashboard.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2">
              <Bell size={16} className="text-blue-600" strokeWidth={1.5} />
              <span className="text-sm font-medium text-blue-600">Latest Updates</span>
            </div>
          </div>
        </header>

        {/* Updates List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {updates.map((update, idx) => {
            const colors = categoryColors[update.category] || {
              bg: 'bg-gray-50',
              text: 'text-gray-600',
            };
            return (
              <motion.div key={idx} variants={itemVariants} className="card card-hover">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${colors.bg} ${colors.text}`}
                  >
                    {update.category}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                    <Calendar size={14} strokeWidth={1.5} />
                    {new Date(update.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>

                <h3 className="mb-2 text-xl font-semibold text-[var(--text-primary)]">
                  {update.title}
                </h3>
                <p className="text-[var(--text-muted)]">{update.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
