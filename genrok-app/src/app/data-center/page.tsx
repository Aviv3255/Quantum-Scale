'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Search, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { supabase } from '@/lib/supabase';

// Types matching the original Base44 structure
interface PollOption {
  text: string;
  initialVotes: number;
}

interface PollButton {
  text: string;
  url: string;
}

interface Poll {
  id: number;
  question: string;
  category: string;
  options: PollOption[];
  buttons?: PollButton[];
  created_date: string;
  status: string;
}

interface PollVote {
  id: number;
  poll_id: number;
  user_email: string;
  option_index: number;
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
  const { user, isLoading: authLoading } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [polls, setPolls] = useState<Poll[]>([]);
  const [pollVotes, setPollVotes] = useState<PollVote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Fetch polls from Supabase
  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      try {
        // Fetch polls
        const { data: pollsData, error: pollsError } = await supabase
          .from('polls')
          .select('*')
          .order('created_at', { ascending: false });

        if (pollsError) {
          console.error('Error fetching polls:', pollsError);
        } else if (pollsData) {
          // Transform Supabase data to match original Poll structure
          const transformedPolls: Poll[] = pollsData.map((poll: { id: number; question: string; options: unknown; votes?: unknown; created_at: string }) => {
            const rawOptions = poll.options as Array<{ text?: string; label?: string; initialVotes?: number }>;

            return {
              id: poll.id,
              question: poll.question,
              category: 'Community',
              options: rawOptions.map(opt => ({
                text: opt.text || opt.label || '',
                initialVotes: opt.initialVotes || Math.floor(Math.random() * 200) + 50
              })),
              created_date: poll.created_at,
              status: 'approved'
            };
          });
          setPolls(transformedPolls);
        }
      } catch (err) {
        console.error('Failed to fetch polls:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [user]);

  const handleVote = async (pollId: number, optionIndex: number) => {
    if (!user?.email) return;

    // Check if user already voted
    const existingVote = pollVotes.find(v => v.poll_id === pollId && v.user_email === user.email);

    if (existingVote) {
      // Update vote locally
      setPollVotes(prev => prev.map(v =>
        v.id === existingVote.id ? { ...v, option_index: optionIndex } : v
      ));
    } else {
      // Add new vote locally
      const newVote: PollVote = {
        id: Date.now(),
        poll_id: pollId,
        user_email: user.email,
        option_index: optionIndex
      };
      setPollVotes(prev => [...prev, newVote]);
    }
  };

  const getUserVote = (pollId: number): PollVote | undefined => {
    if (!user?.email) return undefined;
    return pollVotes.find(v => v.poll_id === pollId && v.user_email === user.email);
  };

  if (authLoading || !user) {
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
            {polls.length > 0 && (
              <p className="mt-3 text-sm" style={{ color: '#9CA3AF' }}>
                {filteredPolls.length} polls available
              </p>
            )}
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto"
                   style={{ borderColor: '#007DFF', borderTopColor: 'transparent' }} />
            </div>
          ) : polls.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl mb-4" style={{ color: '#6B7280' }}>
                No polls available yet
              </p>
              <p className="text-base" style={{ color: '#9CA3AF' }}>
                Polls will appear here once added to the database
              </p>
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
                    <PollCard
                      poll={poll}
                      userVote={getUserVote(poll.id)}
                      onVote={handleVote}
                      realVotes={pollVotes}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {filteredPolls.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-xl" style={{ color: '#6B7280' }}>
                    No polls found matching your search
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

// PollCard component matching original Base44 structure
interface PollCardProps {
  poll: Poll;
  userVote?: PollVote;
  onVote: (pollId: number, optionIndex: number) => void;
  realVotes: PollVote[];
}

function PollCard({ poll, userVote, onVote, realVotes }: PollCardProps) {
  const [isVoting, setIsVoting] = useState(false);

  const calculatePercentages = () => {
    const totalInitialVotes = 500;
    const optionRealVotes: Record<number, number> = {};

    realVotes.forEach(vote => {
      if (vote.poll_id === poll.id) {
        optionRealVotes[vote.option_index] = (optionRealVotes[vote.option_index] || 0) + 1;
      }
    });

    const totalRealVotes = Object.values(optionRealVotes).reduce((sum, count) => sum + count, 0);
    const grandTotal = totalInitialVotes + totalRealVotes;

    return poll.options.map((option, index) => {
      const realCount = optionRealVotes[index] || 0;
      const totalCount = option.initialVotes + realCount;
      const percentage = (totalCount / grandTotal) * 100;
      return {
        ...option,
        percentage: percentage.toFixed(1),
        totalVotes: totalCount
      };
    });
  };

  const handleVote = async (optionIndex: number) => {
    if (isVoting) return;
    setIsVoting(true);
    await onVote(poll.id, optionIndex);
    setIsVoting(false);
  };

  const optionsWithPercentages = calculatePercentages();
  const maxPercentage = Math.max(...optionsWithPercentages.map(o => parseFloat(o.percentage)));

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

      <div className="space-y-2.5 mb-4">
        {optionsWithPercentages.map((option, index) => {
          const isUserChoice = userVote?.option_index === index;
          const isTopChoice = parseFloat(option.percentage) === maxPercentage;

          return (
            <button
              key={index}
              onClick={() => handleVote(index)}
              disabled={isVoting}
              className="w-full text-left relative overflow-hidden rounded-lg transition-all"
              style={{
                border: isUserChoice ? '2px solid #007DFF' : '1px solid #E5E7EB',
                background: '#FFFFFF',
                cursor: isVoting ? 'default' : 'pointer',
                opacity: isVoting ? 0.6 : 1
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
                  {isUserChoice ? (
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: '#007DFF',
                        border: '2px solid #007DFF'
                      }}
                    >
                      <CheckCircle className="w-3 h-3" style={{ color: '#FFFFFF' }} />
                    </div>
                  ) : (
                    <div
                      className="w-5 h-5 rounded-full flex-shrink-0"
                      style={{
                        border: '2px solid #D1D5DB'
                      }}
                    />
                  )}
                  <span className="text-sm" style={{
                    color: '#010C31',
                    fontWeight: '400'
                  }}>
                    {option.text}
                  </span>
                </div>
                <span className="font-bold text-sm" style={{
                  color: isTopChoice ? '#007DFF' : '#4B5563'
                }}>
                  {option.percentage}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {poll.buttons && poll.buttons.length > 0 && (
        <div className="flex flex-col gap-2 pt-3 border-t" style={{ borderColor: '#F3F4F6' }}>
          {poll.buttons.map((button, idx) => (
            <a
              key={idx}
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg transition-all text-sm"
              style={{
                background: '#007DFF',
                color: '#FFFFFF',
                textDecoration: 'underline',
                fontWeight: '800'
              }}
            >
              <span>{button.text}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
