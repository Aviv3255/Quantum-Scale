import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search } from 'lucide-react';
import PollCard from '../components/datacenter/PollCard';
import SubmitPollModal from '../components/datacenter/SubmitPollModal';

export default function DataCenter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => base44.auth.me()
  });

  const { data: polls = [], isLoading: pollsLoading } = useQuery({
    queryKey: ['polls'],
    queryFn: async () => {
      const allPolls = await base44.entities.Poll.filter({ status: 'approved' });
      return allPolls.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }
  });

  const { data: allVotes = [] } = useQuery({
    queryKey: ['pollVotes'],
    queryFn: () => base44.entities.PollVote.list()
  });

  const submitPollMutation = useMutation({
    mutationFn: (pollData) => base44.entities.Poll.create(pollData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['polls'] });
    }
  });

  const voteMutation = useMutation({
    mutationFn: ({ poll_id, option_index }) => 
      base44.entities.PollVote.create({
        poll_id,
        user_email: user.email,
        option_index
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pollVotes'] });
    }
  });

  const changeVoteMutation = useMutation({
    mutationFn: async ({ voteId, poll_id, option_index }) => {
      await base44.entities.PollVote.delete(voteId);
      return base44.entities.PollVote.create({
        poll_id,
        user_email: user.email,
        option_index
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pollVotes'] });
    }
  });

  const handleSubmitPoll = async (pollData) => {
    const totalVotes = 500;
    const numOptions = pollData.options.length;
    const baseVotes = Math.floor(totalVotes / numOptions);
    const remainder = totalVotes % numOptions;

    const optionsWithVotes = pollData.options.map((text, index) => ({
      text,
      initialVotes: baseVotes + (index < remainder ? 1 : 0)
    }));

    await submitPollMutation.mutateAsync({
      ...pollData,
      options: optionsWithVotes
    });
  };

  const handleVote = async (pollId, optionIndex) => {
    if (!user) return;
    const existingVote = allVotes.find(vote => vote.poll_id === pollId && vote.user_email === user.email);
    
    if (existingVote) {
      await changeVoteMutation.mutateAsync({ 
        voteId: existingVote.id, 
        poll_id: pollId, 
        option_index: optionIndex 
      });
    } else {
      await voteMutation.mutateAsync({ poll_id: pollId, option_index: optionIndex });
    }
  };

  const getUserVote = (pollId) => {
    if (!user) return null;
    return allVotes.find(vote => vote.poll_id === pollId && vote.user_email === user.email);
  };
  
  const filteredPolls = polls.filter(poll => 
    poll.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    poll.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
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
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all text-base flex-shrink-0"
                style={{
                  background: '#F3F4F6',
                  border: '1px solid #D1D5DB',
                  color: '#4B5563',
                  boxShadow: 'none',
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: '800'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#E5E7EB';
                  e.currentTarget.style.borderColor = '#9CA3AF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F3F4F6';
                  e.currentTarget.style.borderColor = '#D1D5DB';
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
                onFocus={(e) => {
                  e.target.style.borderColor = '#007DFF';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 125, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Polls Grid */}
          {pollsLoading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto"
                   style={{ borderColor: '#007DFF', borderTopColor: 'transparent' }} />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredPolls.map(poll => (
                <PollCard
                  key={poll.id}
                  poll={poll}
                  userVote={getUserVote(poll.id)}
                  onVote={handleVote}
                  realVotes={allVotes}
                />
              ))}
            </div>
          )}

          {filteredPolls.length === 0 && !pollsLoading && (
            <div className="text-center py-16">
              <p className="text-xl" style={{ color: '#6B7280' }}>
                No polls found
              </p>
            </div>
          )}
        </div>

        <SubmitPollModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitPoll}
        />
      </div>
    </>
  );
}