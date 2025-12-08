'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface PollOption {
  text: string;
  votes: number;
}

interface Poll {
  id: number;
  question: string;
  category: string;
  options: PollOption[];
  totalVotes: number;
}

const polls: Poll[] = [
  {
    id: 1,
    question: 'What is your current monthly revenue?',
    category: 'Revenue',
    options: [
      { text: '$0 - $10K', votes: 342 },
      { text: '$10K - $50K', votes: 215 },
      { text: '$50K - $100K', votes: 98 },
      { text: '$100K+', votes: 105 },
    ],
    totalVotes: 760,
  },
  {
    id: 2,
    question: 'Which advertising platform gives you the best ROAS?',
    category: 'Advertising',
    options: [
      { text: 'Meta (Facebook/Instagram)', votes: 412 },
      { text: 'TikTok', votes: 198 },
      { text: 'Google', votes: 142 },
      { text: 'Other', votes: 40 },
    ],
    totalVotes: 792,
  },
  {
    id: 3,
    question: 'What is your biggest challenge right now?',
    category: 'Challenges',
    options: [
      { text: 'Finding winning products', votes: 289 },
      { text: 'Scaling profitably', votes: 247 },
      { text: 'Improving conversion rate', votes: 165 },
      { text: 'Customer retention', votes: 124 },
    ],
    totalVotes: 825,
  },
  {
    id: 4,
    question: 'How many products do you have in your store?',
    category: 'Products',
    options: [
      { text: '1-10', votes: 456 },
      { text: '11-50', votes: 215 },
      { text: '51-100', votes: 89 },
      { text: '100+', votes: 66 },
    ],
    totalVotes: 826,
  },
  {
    id: 5,
    question: 'What is your average order value (AOV)?',
    category: 'Revenue',
    options: [
      { text: 'Under $30', votes: 189 },
      { text: '$30 - $60', votes: 312 },
      { text: '$60 - $100', votes: 245 },
      { text: 'Over $100', votes: 178 },
    ],
    totalVotes: 924,
  },
  {
    id: 6,
    question: 'How long did it take you to reach $10K/month?',
    category: 'Growth',
    options: [
      { text: 'Less than 3 months', votes: 87 },
      { text: '3-6 months', votes: 234 },
      { text: '6-12 months', votes: 345 },
      { text: 'Over a year', votes: 198 },
    ],
    totalVotes: 864,
  },
  {
    id: 7,
    question: 'What type of products do you sell?',
    category: 'Products',
    options: [
      { text: 'Fashion & Apparel', votes: 312 },
      { text: 'Beauty & Health', votes: 267 },
      { text: 'Home & Garden', votes: 189 },
      { text: 'Electronics & Gadgets', votes: 156 },
    ],
    totalVotes: 924,
  },
  {
    id: 8,
    question: 'What is your main traffic source?',
    category: 'Marketing',
    options: [
      { text: 'Paid Social (Meta, TikTok)', votes: 445 },
      { text: 'Organic/SEO', votes: 178 },
      { text: 'Influencers', votes: 134 },
      { text: 'Email Marketing', votes: 89 },
    ],
    totalVotes: 846,
  },
];

function PollCard({ poll }: { poll: Poll }) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (optionIndex: number) => {
    if (!hasVoted) {
      setSelectedOption(optionIndex);
      setHasVoted(true);
    }
  };

  const getPercentage = (votes: number) => {
    return Math.round((votes / poll.totalVotes) * 100);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* Category Badge */}
      <div className="px-5 pt-5">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
          style={{ background: '#FEF3C7', color: '#D97706' }}
        >
          {poll.category}
        </span>
      </div>

      {/* Question */}
      <div className="p-5 pt-3">
        <h3 className="font-bold text-base mb-4" style={{ color: '#1E1E1E' }}>
          {poll.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {poll.options.map((option, idx) => {
            const percentage = getPercentage(option.votes);
            const isSelected = selectedOption === idx;

            return (
              <button
                key={idx}
                onClick={() => handleVote(idx)}
                className="w-full text-left transition-all rounded-xl overflow-hidden"
                style={{
                  background: isSelected ? '#EFF6FF' : '#F9FAFB',
                  border: isSelected ? '2px solid #3B82F6' : '1px solid #E5E7EB',
                }}
              >
                <div className="relative p-3">
                  {/* Progress bar background */}
                  {hasVoted && (
                    <div
                      className="absolute inset-0 transition-all duration-500"
                      style={{
                        background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'rgba(209, 213, 219, 0.3)',
                        width: `${percentage}%`,
                      }}
                    />
                  )}

                  <div className="relative flex justify-between items-center">
                    <span
                      className="text-sm font-medium"
                      style={{ color: isSelected ? '#3B82F6' : '#4B5563' }}
                    >
                      {option.text}
                    </span>
                    {hasVoted && (
                      <span
                        className="text-sm font-bold"
                        style={{ color: isSelected ? '#3B82F6' : '#6B7280' }}
                      >
                        {percentage}%
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Total votes */}
        <p className="mt-4 text-xs" style={{ color: '#9CA3AF' }}>
          {poll.totalVotes.toLocaleString()} votes
        </p>
      </div>
    </div>
  );
}

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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full" />
      </div>
    );
  }

  const filteredPolls = polls.filter(poll =>
    poll.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    poll.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&display=swap');
      `}</style>

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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all text-base flex-shrink-0 hover:bg-gray-200"
                style={{
                  background: '#F3F4F6',
                  border: '1px solid #D1D5DB',
                  color: '#4B5563',
                  boxShadow: 'none',
                  fontFamily: "'Open Sans', sans-serif",
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
                className="w-full pl-12 pr-4 py-3 rounded-xl text-base transition-all"
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredPolls.map(poll => (
              <PollCard key={poll.id} poll={poll} />
            ))}
          </div>

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
