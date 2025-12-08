'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

const polls = [
  {
    id: 1,
    question: 'What is your current monthly revenue?',
    category: 'Revenue',
    options: [
      { label: '$0 - $10K', percentage: 45 },
      { label: '$10K - $50K', percentage: 28 },
      { label: '$50K - $100K', percentage: 13 },
      { label: '$100K+', percentage: 14 },
    ],
  },
  {
    id: 2,
    question: 'Which advertising platform gives you the best ROAS?',
    category: 'Advertising',
    options: [
      { label: 'Meta (Facebook/Instagram)', percentage: 52 },
      { label: 'TikTok', percentage: 25 },
      { label: 'Google', percentage: 18 },
      { label: 'Other', percentage: 5 },
    ],
  },
  {
    id: 3,
    question: 'What is your biggest challenge right now?',
    category: 'Challenges',
    options: [
      { label: 'Finding winning products', percentage: 35 },
      { label: 'Scaling profitably', percentage: 30 },
      { label: 'Improving conversion rate', percentage: 20 },
      { label: 'Customer retention', percentage: 15 },
    ],
  },
  {
    id: 4,
    question: 'How many products do you have in your store?',
    category: 'Store',
    options: [
      { label: '1-10', percentage: 55 },
      { label: '11-50', percentage: 26 },
      { label: '51-100', percentage: 11 },
      { label: '100+', percentage: 8 },
    ],
  },
  {
    id: 5,
    question: 'What theme are you using?',
    category: 'Store',
    options: [
      { label: 'Shrine', percentage: 42 },
      { label: 'Dawn', percentage: 28 },
      { label: 'Custom', percentage: 18 },
      { label: 'Other Premium', percentage: 12 },
    ],
  },
  {
    id: 6,
    question: 'What is your average order value (AOV)?',
    category: 'Revenue',
    options: [
      { label: 'Under $50', percentage: 32 },
      { label: '$50 - $100', percentage: 38 },
      { label: '$100 - $200', percentage: 20 },
      { label: '$200+', percentage: 10 },
    ],
  },
  {
    id: 7,
    question: 'How do you source products?',
    category: 'Products',
    options: [
      { label: 'AliExpress / CJ', percentage: 45 },
      { label: 'Private Agent', percentage: 30 },
      { label: 'US/EU Suppliers', percentage: 15 },
      { label: 'Own Manufacturing', percentage: 10 },
    ],
  },
  {
    id: 8,
    question: 'What is your conversion rate?',
    category: 'Conversion',
    options: [
      { label: 'Under 1%', percentage: 25 },
      { label: '1% - 2%', percentage: 35 },
      { label: '2% - 4%', percentage: 28 },
      { label: '4%+', percentage: 12 },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function DataCenterPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredPolls = polls.filter(poll =>
    poll.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    poll.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl md:text-5xl font-bold flex-1" style={{
                color: '#000000',
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                letterSpacing: '-0.005em',
                lineHeight: '1.2'
              }}>
                Your questions, answered by<br />the wisdom of the crowd.
              </h1>

              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all text-base flex-shrink-0"
                style={{
                  background: '#F3F4F6',
                  border: '1px solid #D1D5DB',
                  color: '#4B5563',
                  boxShadow: 'none',
                  fontWeight: '800'
                }}
              >
                <Plus className="w-5 h-5" />
                Post a Poll
              </button>
            </div>

            <p className="text-lg leading-relaxed max-w-3xl mb-6" style={{ color: '#6B7280' }}>
              Real insights from real eCommerce operators. Updated live as the community votes.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#9CA3AF' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search polls..."
                className="w-full pl-12 pr-4 py-3 rounded-xl text-base"
                style={{
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB',
                  color: '#010C31',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Polls Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {filteredPolls.map((poll) => (
              <motion.div key={poll.id} variants={itemVariants}>
                <PollCard poll={poll} />
              </motion.div>
            ))}
          </motion.div>

          {filteredPolls.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl" style={{ color: '#6B7280' }}>
                No polls found
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

interface PollOption {
  label: string;
  percentage: number;
}

interface Poll {
  id: number;
  question: string;
  category: string;
  options: PollOption[];
}

function PollCard({ poll }: { poll: Poll }) {
  const maxPercentage = Math.max(...poll.options.map(o => o.percentage));

  return (
    <div
      className="p-5 rounded-2xl transition-all"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
      }}
    >
      <h3 className="text-base font-bold mb-4 leading-tight" style={{
        color: '#010C31',
        fontFamily: 'Poppins, sans-serif'
      }}>
        {poll.question}
      </h3>

      <div className="space-y-2.5">
        {poll.options.map((option, index) => {
          const isTopChoice = option.percentage === maxPercentage;

          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg"
              style={{
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
              }}
            >
              <div
                className="absolute inset-0 transition-all"
                style={{
                  background: 'linear-gradient(90deg, rgba(0, 125, 255, 0.015) 0%, rgba(0, 125, 255, 0.005) 100%)',
                  width: `${option.percentage}%`
                }}
              />

              <div className="relative px-3 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex-shrink-0"
                    style={{
                      border: '2px solid #D1D5DB'
                    }}
                  />
                  <span className="text-sm" style={{
                    color: '#010C31',
                    fontWeight: '400'
                  }}>
                    {option.label}
                  </span>
                </div>
                <span className="font-bold text-sm" style={{
                  color: isTopChoice ? '#007DFF' : '#4B5563'
                }}>
                  {option.percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
