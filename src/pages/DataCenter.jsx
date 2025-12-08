import React, { useState } from 'react';
import { BarChart3, Users, TrendingUp, PieChart, Vote, Sparkles, Search } from 'lucide-react';

export default function DataCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userVotes, setUserVotes] = useState({});

  const stats = [
    { label: 'Community Members', value: '10,000+', icon: Users },
    { label: 'Total Poll Responses', value: '3,200+', icon: Vote },
    { label: 'Average CVR Reported', value: '3.2%', icon: TrendingUp },
    { label: 'Average AOV', value: '$87', icon: BarChart3 },
  ];

  const polls = [
    {
      id: 1,
      question: 'What is your current monthly revenue?',
      category: 'Revenue',
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
      category: 'Advertising',
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
      category: 'Challenges',
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
      category: 'Store Setup',
      options: [
        { label: '1-10', votes: 456, percentage: 55 },
        { label: '11-50', votes: 215, percentage: 26 },
        { label: '51-100', votes: 89, percentage: 11 },
        { label: '100+', votes: 66, percentage: 8 },
      ],
      totalVotes: 826,
    },
    {
      id: 5,
      question: 'What is your primary product sourcing method?',
      category: 'Operations',
      options: [
        { label: 'AliExpress', votes: 312, percentage: 38 },
        { label: 'Private Agent', votes: 287, percentage: 35 },
        { label: 'Local Suppliers', votes: 156, percentage: 19 },
        { label: 'Print on Demand', votes: 67, percentage: 8 },
      ],
      totalVotes: 822,
    },
    {
      id: 6,
      question: 'How long have you been in eCommerce?',
      category: 'Experience',
      options: [
        { label: 'Less than 6 months', votes: 298, percentage: 37 },
        { label: '6 months - 1 year', votes: 215, percentage: 27 },
        { label: '1-2 years', votes: 178, percentage: 22 },
        { label: '2+ years', votes: 112, percentage: 14 },
      ],
      totalVotes: 803,
    },
    {
      id: 7,
      question: 'What Shopify theme do you use?',
      category: 'Store Setup',
      options: [
        { label: 'Dawn (Free)', votes: 287, percentage: 35 },
        { label: 'Shrine', votes: 234, percentage: 28 },
        { label: 'Debutify', votes: 178, percentage: 22 },
        { label: 'Other Premium', votes: 123, percentage: 15 },
      ],
      totalVotes: 822,
    },
    {
      id: 8,
      question: 'What is your average order value?',
      category: 'Revenue',
      options: [
        { label: 'Under $30', votes: 198, percentage: 24 },
        { label: '$30 - $60', votes: 289, percentage: 35 },
        { label: '$60 - $100', votes: 215, percentage: 26 },
        { label: 'Over $100', votes: 123, percentage: 15 },
      ],
      totalVotes: 825,
    },
  ];

  const handleVote = (pollId, optionIndex) => {
    setUserVotes(prev => ({
      ...prev,
      [pollId]: optionIndex
    }));
  };

  const filteredPolls = polls.filter(poll =>
    poll.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    poll.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
               style={{ background: '#EFF6FF', border: '1px solid #DBEAFE' }}>
            <PieChart className="w-4 h-4" style={{ color: '#3B82F6' }} />
            <span className="text-sm font-semibold" style={{ color: '#3B82F6' }}>COMMUNITY DATA</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{
            color: '#1E1E1E',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '-0.02em'
          }}>
            Data Center
          </h1>
          <p className="text-lg" style={{ color: '#6B7280', maxWidth: '700px' }}>
            See how other eCommerce entrepreneurs are performing. Anonymous community polls and benchmarks
            to help you understand where you stand.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl transition-all duration-300"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                       style={{ background: '#EFF6FF' }}>
                    <Icon className="w-5 h-5" style={{ color: '#3B82F6' }} />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1" style={{ color: '#1E1E1E' }}>{stat.value}</p>
                <p className="text-sm" style={{ color: '#6B7280' }}>{stat.label}</p>
              </div>
            );
          })}
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
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                color: '#1E1E1E',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3B82F6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E5E7EB';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1E1E1E' }}>Community Polls</h2>
          <p style={{ color: '#6B7280' }}>See how you compare to other store owners</p>
        </div>

        {/* Polls Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPolls.map(poll => (
            <div
              key={poll.id}
              className="rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
              }}
            >
              {/* Poll Header */}
              <div className="p-5 border-b" style={{ borderColor: '#E5E7EB' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-2 py-1 rounded-full"
                        style={{ background: '#EFF6FF', color: '#3B82F6' }}>
                    {poll.category}
                  </span>
                </div>
                <h3 className="font-semibold text-base leading-tight" style={{ color: '#1E1E1E' }}>
                  {poll.question}
                </h3>
                <p className="text-xs mt-2" style={{ color: '#9CA3AF' }}>
                  {poll.totalVotes.toLocaleString()} responses
                </p>
              </div>

              {/* Poll Options */}
              <div className="p-5 space-y-3">
                {poll.options.map((option, i) => {
                  const isSelected = userVotes[poll.id] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => handleVote(poll.id, i)}
                      className="w-full text-left transition-all"
                    >
                      <div className="flex justify-between text-sm mb-1.5">
                        <span style={{
                          color: isSelected ? '#3B82F6' : '#4B5563',
                          fontWeight: isSelected ? '600' : '400'
                        }}>
                          {option.label}
                        </span>
                        <span className="font-medium" style={{ color: '#1E1E1E' }}>
                          {option.percentage}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: '#F3F4F6' }}>
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${option.percentage}%`,
                            background: isSelected
                              ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
                              : '#D1D5DB'
                          }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {filteredPolls.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl" style={{ color: '#6B7280' }}>
              No polls found matching your search
            </p>
          </div>
        )}

        {/* Bottom Info Section */}
        <div className="mt-12 p-6 rounded-2xl text-center" style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB'
        }}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5" style={{ color: '#F59E0B' }} />
            <h3 className="font-semibold" style={{ color: '#1E1E1E' }}>About This Data</h3>
          </div>
          <p className="text-sm" style={{ color: '#6B7280', maxWidth: '600px', margin: '0 auto' }}>
            All data is collected anonymously from our community of eCommerce entrepreneurs.
            Results are updated in real-time as members participate in polls.
          </p>
        </div>
      </div>
    </div>
  );
}
