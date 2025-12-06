'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Users,
  TrendingUp,
  PieChart,
  Vote,
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

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

export default function DataCenterPage() {
  const [selectedPoll, setSelectedPoll] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
              <PieChart className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">Community Data</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Data Center</span>
            </h1>
            <p className="text-xl text-gray-600">
              See how other eCommerce entrepreneurs are performing. Anonymous community polls and benchmarks.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center border border-gray-100"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-indigo-600" />
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Polls */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Community Polls</h2>
            <p className="text-gray-600">See how you compare to other store owners</p>
          </FadeIn>

          <StaggerContainer className="space-y-8">
            {polls.map((poll) => (
              <StaggerItem key={poll.id}>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">{poll.question}</h3>
                    <p className="text-sm text-gray-500 mt-1">{poll.totalVotes.toLocaleString()} responses</p>
                  </div>
                  <div className="p-6 space-y-4">
                    {poll.options.map((option, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{option.label}</span>
                          <span className="font-medium text-gray-900">{option.percentage}%</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${option.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
