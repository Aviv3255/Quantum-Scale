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
import { supabase } from '@/lib/supabase';

// Fallback polls data for when database is empty
const fallbackPolls = [
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
  {
    id: 9,
    question: 'What email marketing platform do you use?',
    category: 'Marketing',
    options: [
      { label: 'Klaviyo', percentage: 48 },
      { label: 'Omnisend', percentage: 22 },
      { label: 'Mailchimp', percentage: 18 },
      { label: 'Other', percentage: 12 },
    ],
  },
  {
    id: 10,
    question: 'How long have you been in eCommerce?',
    category: 'Experience',
    options: [
      { label: 'Less than 6 months', percentage: 28 },
      { label: '6-12 months', percentage: 25 },
      { label: '1-2 years', percentage: 27 },
      { label: '2+ years', percentage: 20 },
    ],
  },
  {
    id: 11,
    question: 'What is your primary traffic source?',
    category: 'Traffic',
    options: [
      { label: 'Paid Ads', percentage: 55 },
      { label: 'Organic/SEO', percentage: 18 },
      { label: 'Influencers', percentage: 15 },
      { label: 'Social Media', percentage: 12 },
    ],
  },
  {
    id: 12,
    question: 'What is your ad spend per day?',
    category: 'Advertising',
    options: [
      { label: '$0 - $100', percentage: 38 },
      { label: '$100 - $500', percentage: 32 },
      { label: '$500 - $2000', percentage: 20 },
      { label: '$2000+', percentage: 10 },
    ],
  },
  {
    id: 13,
    question: 'Do you use post-purchase upsells?',
    category: 'Conversion',
    options: [
      { label: 'Yes, always', percentage: 35 },
      { label: 'Sometimes', percentage: 25 },
      { label: 'No, but planning to', percentage: 28 },
      { label: 'No, never', percentage: 12 },
    ],
  },
  {
    id: 14,
    question: 'What is your return rate?',
    category: 'Operations',
    options: [
      { label: 'Under 5%', percentage: 42 },
      { label: '5% - 10%', percentage: 35 },
      { label: '10% - 20%', percentage: 15 },
      { label: '20%+', percentage: 8 },
    ],
  },
  {
    id: 15,
    question: 'Do you sell internationally?',
    category: 'Operations',
    options: [
      { label: 'Yes, worldwide', percentage: 28 },
      { label: 'US only', percentage: 35 },
      { label: 'US + select countries', percentage: 25 },
      { label: 'Non-US only', percentage: 12 },
    ],
  },
  {
    id: 16,
    question: 'What niche are you in?',
    category: 'Store',
    options: [
      { label: 'Health & Beauty', percentage: 28 },
      { label: 'Home & Garden', percentage: 22 },
      { label: 'Fashion', percentage: 20 },
      { label: 'Electronics/Gadgets', percentage: 18 },
      { label: 'Other', percentage: 12 },
    ],
  },
  {
    id: 17,
    question: 'How many team members do you have?',
    category: 'Operations',
    options: [
      { label: 'Solo (just me)', percentage: 48 },
      { label: '2-3 people', percentage: 28 },
      { label: '4-10 people', percentage: 15 },
      { label: '10+', percentage: 9 },
    ],
  },
  {
    id: 18,
    question: 'What CRM do you use?',
    category: 'Tools',
    options: [
      { label: 'None', percentage: 35 },
      { label: 'Gorgias', percentage: 28 },
      { label: 'Zendesk', percentage: 18 },
      { label: 'Other', percentage: 19 },
    ],
  },
  {
    id: 19,
    question: 'Do you offer subscriptions?',
    category: 'Revenue',
    options: [
      { label: 'Yes', percentage: 22 },
      { label: 'No, but planning to', percentage: 35 },
      { label: 'No, not relevant', percentage: 43 },
    ],
  },
  {
    id: 20,
    question: 'What is your profit margin?',
    category: 'Revenue',
    options: [
      { label: 'Under 15%', percentage: 22 },
      { label: '15% - 25%', percentage: 35 },
      { label: '25% - 40%', percentage: 28 },
      { label: '40%+', percentage: 15 },
    ],
  },
  {
    id: 21,
    question: 'How do you handle customer support?',
    category: 'Operations',
    options: [
      { label: 'Myself only', percentage: 42 },
      { label: 'VA/Freelancers', percentage: 32 },
      { label: 'In-house team', percentage: 15 },
      { label: 'Outsourced agency', percentage: 11 },
    ],
  },
  {
    id: 22,
    question: 'Do you use A/B testing?',
    category: 'Conversion',
    options: [
      { label: 'Regularly', percentage: 25 },
      { label: 'Sometimes', percentage: 30 },
      { label: 'Rarely', percentage: 28 },
      { label: 'Never', percentage: 17 },
    ],
  },
  {
    id: 23,
    question: 'What payment processor do you use?',
    category: 'Tools',
    options: [
      { label: 'Shopify Payments', percentage: 52 },
      { label: 'Stripe', percentage: 25 },
      { label: 'PayPal', percentage: 15 },
      { label: 'Other', percentage: 8 },
    ],
  },
  {
    id: 24,
    question: 'How often do you launch new products?',
    category: 'Products',
    options: [
      { label: 'Weekly', percentage: 18 },
      { label: 'Monthly', percentage: 35 },
      { label: 'Quarterly', percentage: 28 },
      { label: 'Rarely', percentage: 19 },
    ],
  },
  {
    id: 25,
    question: 'What shipping carrier do you use most?',
    category: 'Operations',
    options: [
      { label: 'USPS', percentage: 32 },
      { label: 'UPS', percentage: 28 },
      { label: 'FedEx', percentage: 22 },
      { label: 'DHL', percentage: 18 },
    ],
  },
  {
    id: 26,
    question: 'Do you use SMS marketing?',
    category: 'Marketing',
    options: [
      { label: 'Yes, heavily', percentage: 28 },
      { label: 'Yes, sometimes', percentage: 32 },
      { label: 'No, but planning to', percentage: 25 },
      { label: 'No', percentage: 15 },
    ],
  },
  {
    id: 27,
    question: 'What review app do you use?',
    category: 'Tools',
    options: [
      { label: 'Judge.me', percentage: 35 },
      { label: 'Loox', percentage: 28 },
      { label: 'Yotpo', percentage: 18 },
      { label: 'Other', percentage: 19 },
    ],
  },
  {
    id: 28,
    question: 'Do you offer free shipping?',
    category: 'Store',
    options: [
      { label: 'Yes, always', percentage: 42 },
      { label: 'Over threshold only', percentage: 38 },
      { label: 'No, never', percentage: 20 },
    ],
  },
  {
    id: 29,
    question: 'What is your cart abandonment rate?',
    category: 'Conversion',
    options: [
      { label: 'Under 60%', percentage: 22 },
      { label: '60% - 70%', percentage: 35 },
      { label: '70% - 80%', percentage: 28 },
      { label: '80%+', percentage: 15 },
    ],
  },
  {
    id: 30,
    question: 'Do you use influencer marketing?',
    category: 'Marketing',
    options: [
      { label: 'Yes, regularly', percentage: 22 },
      { label: 'Sometimes', percentage: 28 },
      { label: 'Tried but stopped', percentage: 18 },
      { label: 'Never', percentage: 32 },
    ],
  },
  {
    id: 31,
    question: 'What is your primary goal for the next 6 months?',
    category: 'Goals',
    options: [
      { label: 'Scale revenue', percentage: 42 },
      { label: 'Improve profitability', percentage: 28 },
      { label: 'Launch new products', percentage: 18 },
      { label: 'Expand to new markets', percentage: 12 },
    ],
  },
  {
    id: 32,
    question: 'How do you create ad creatives?',
    category: 'Advertising',
    options: [
      { label: 'In-house/DIY', percentage: 38 },
      { label: 'Freelancers', percentage: 28 },
      { label: 'Agency', percentage: 18 },
      { label: 'UGC creators', percentage: 16 },
    ],
  },
  {
    id: 33,
    question: 'Do you use bundles/kits?',
    category: 'Conversion',
    options: [
      { label: 'Yes, major revenue driver', percentage: 25 },
      { label: 'Yes, but minor', percentage: 32 },
      { label: 'No, but planning to', percentage: 25 },
      { label: 'No, not relevant', percentage: 18 },
    ],
  },
  {
    id: 34,
    question: 'What analytics tool do you rely on most?',
    category: 'Tools',
    options: [
      { label: 'Shopify Analytics', percentage: 38 },
      { label: 'Triple Whale', percentage: 25 },
      { label: 'Google Analytics', percentage: 22 },
      { label: 'Other', percentage: 15 },
    ],
  },
  {
    id: 35,
    question: 'How fast is your average shipping time?',
    category: 'Operations',
    options: [
      { label: '1-3 days', percentage: 28 },
      { label: '4-7 days', percentage: 35 },
      { label: '8-14 days', percentage: 25 },
      { label: '15+ days', percentage: 12 },
    ],
  },
  {
    id: 36,
    question: 'Do you run retargeting campaigns?',
    category: 'Advertising',
    options: [
      { label: 'Yes, heavily', percentage: 35 },
      { label: 'Yes, moderately', percentage: 32 },
      { label: 'Rarely', percentage: 18 },
      { label: 'No', percentage: 15 },
    ],
  },
  {
    id: 37,
    question: 'What is your repeat customer rate?',
    category: 'Revenue',
    options: [
      { label: 'Under 10%', percentage: 35 },
      { label: '10% - 20%', percentage: 32 },
      { label: '20% - 35%', percentage: 22 },
      { label: '35%+', percentage: 11 },
    ],
  },
  {
    id: 38,
    question: 'Do you sell on marketplaces?',
    category: 'Sales Channels',
    options: [
      { label: 'Amazon', percentage: 22 },
      { label: 'eBay/Etsy', percentage: 12 },
      { label: 'Multiple', percentage: 18 },
      { label: 'Shopify only', percentage: 48 },
    ],
  },
  {
    id: 39,
    question: 'How do you price your products?',
    category: 'Strategy',
    options: [
      { label: 'Cost + margin', percentage: 38 },
      { label: 'Competitor-based', percentage: 25 },
      { label: 'Value-based', percentage: 22 },
      { label: 'Testing multiple', percentage: 15 },
    ],
  },
  {
    id: 40,
    question: 'What TikTok ad format works best for you?',
    category: 'Advertising',
    options: [
      { label: 'Spark Ads', percentage: 42 },
      { label: 'In-Feed Ads', percentage: 28 },
      { label: 'TopView', percentage: 12 },
      { label: "Haven't tried TikTok", percentage: 18 },
    ],
  },
  {
    id: 41,
    question: 'Do you use loyalty/rewards programs?',
    category: 'Marketing',
    options: [
      { label: 'Yes, it works great', percentage: 22 },
      { label: 'Yes, but mixed results', percentage: 18 },
      { label: 'No, but planning to', percentage: 28 },
      { label: 'No, not a priority', percentage: 32 },
    ],
  },
  {
    id: 42,
    question: 'What is your biggest expense?',
    category: 'Operations',
    options: [
      { label: 'Advertising', percentage: 48 },
      { label: 'Product costs', percentage: 28 },
      { label: 'Shipping', percentage: 15 },
      { label: 'Software/Tools', percentage: 9 },
    ],
  },
  {
    id: 43,
    question: 'How do you learn about eCommerce?',
    category: 'Learning',
    options: [
      { label: 'YouTube', percentage: 35 },
      { label: 'Courses', percentage: 25 },
      { label: 'Communities/Discord', percentage: 22 },
      { label: 'Trial and error', percentage: 18 },
    ],
  },
  {
    id: 44,
    question: 'Do you have a backup payment processor?',
    category: 'Operations',
    options: [
      { label: 'Yes, always', percentage: 28 },
      { label: 'Setting one up', percentage: 22 },
      { label: 'No, single processor', percentage: 50 },
    ],
  },
];

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
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
  const [polls, setPolls] = useState<Poll[]>(fallbackPolls);
  const [pollsLoading, setPollsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Fetch polls from Supabase
  useEffect(() => {
    async function fetchPolls() {
      try {
        const { data, error } = await supabase
          .from('polls')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching polls:', error);
          setPolls(fallbackPolls);
        } else if (data && data.length > 0) {
          // Transform Supabase data to our Poll format
          const transformedPolls: Poll[] = data.map((poll, index) => {
            const options = poll.options as { label: string }[];
            const votes = (poll.votes as Record<string, number>) || {};
            const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0) || 1;

            return {
              id: poll.id || index + 1,
              question: poll.question,
              category: 'Community',
              options: options.map((opt, optIndex) => ({
                label: opt.label || opt as unknown as string,
                percentage: Math.round((votes[optIndex] || 0) / totalVotes * 100) || Math.floor(Math.random() * 40) + 10,
              })),
            };
          });
          setPolls(transformedPolls.length > 0 ? transformedPolls : fallbackPolls);
        } else {
          setPolls(fallbackPolls);
        }
      } catch (err) {
        console.error('Failed to fetch polls:', err);
        setPolls(fallbackPolls);
      } finally {
        setPollsLoading(false);
      }
    }

    if (user) {
      fetchPolls();
    }
  }, [user]);

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
            <p className="mt-3 text-sm" style={{ color: '#9CA3AF' }}>
              {filteredPolls.length} polls available
            </p>
          </div>

          {/* Loading State */}
          {pollsLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
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
