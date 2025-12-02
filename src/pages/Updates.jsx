import React from 'react';
import { Bell, Calendar } from 'lucide-react';

export default function Updates() {
  const updates = [
    {
      date: '2025-01-10',
      title: 'New Secret Apps Added',
      description: 'Added 3 new must-have Shopify apps with exclusive discounts for Quantum Scale members.',
      category: 'Apps'
    },
    {
      date: '2025-01-08',
      title: 'A/B Test Results Updated',
      description: 'Fresh test results showing 28.9% CVR improvement from UGC video reviews.',
      category: 'Testing'
    },
    {
      date: '2025-01-05',
      title: 'TikTok Ads Credit Extended',
      description: 'The $6,000 TikTok advertising credit program has been extended through Q1 2025.',
      category: 'Advertising'
    },
    {
      date: '2024-12-20',
      title: 'Shrine Theme Partnership',
      description: 'Exclusive 20% discount code QUANTUMSCALE now available for all members.',
      category: 'Theme'
    },
    {
      date: '2024-12-15',
      title: 'Design Inspiration Library Expanded',
      description: 'Added 500+ new high-converting design examples across all categories.',
      category: 'Design'
    }
  ];

  const categoryColors = {
    'Apps': { bg: '#EFF6FF', border: '#DBEAFE', text: '#3B82F6' },
    'Testing': { bg: '#F3E8FF', border: '#E9D5FF', text: '#8B5CF6' },
    'Advertising': { bg: '#DCFCE7', border: '#BBF7D0', text: '#16A34A' },
    'Theme': { bg: '#FEF3C7', border: '#FDE68A', text: '#F59E0B' },
    'Design': { bg: '#FCE7F3', border: '#FBCFE8', text: '#EC4899' }
  };

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
               style={{ background: '#EFF6FF', border: '1px solid #DBEAFE' }}>
            <Bell className="w-4 h-4" style={{ color: '#3B82F6' }} />
            <span className="text-sm font-semibold" style={{ color: '#3B82F6' }}>LATEST UPDATES</span>
          </div>

          <h1 className="text-4xl font-bold mb-4" style={{ 
            color: '#1E1E1E',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '-0.02em'
          }}>
            What's New
          </h1>
          <p style={{ color: '#6B7280' }}>
            Stay updated with the latest features, partnerships, and resources added to your dashboard
          </p>
        </div>

        <div className="space-y-4">
          {updates.map((update, idx) => {
            const colors = categoryColors[update.category];
            return (
              <div
                key={idx}
                className="p-6 rounded-xl transition-all"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(4px)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full"
                          style={{ 
                            background: colors.bg,
                            border: `1px solid ${colors.border}`,
                            color: colors.text
                          }}>
                      {update.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#6B7280' }}>
                    <Calendar className="w-4 h-4" />
                    {new Date(update.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2" style={{ color: '#1E1E1E' }}>
                  {update.title}
                </h3>
                <p style={{ color: '#6B7280' }}>
                  {update.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}