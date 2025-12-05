'use client';

import { motion } from 'framer-motion';
import {
  Target,
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Rocket,
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import Link from 'next/link';

const blueprints = [
  {
    id: 1,
    goal: '$100K/Month',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    metrics: {
      dailyRevenue: '$3,333',
      dailyOrders: '44',
      aov: '$75',
      cvr: '2.5%',
      dailyVisitors: '1,760',
      cac: '$20',
      ltv: '$150',
    },
    requirements: [
      'Solid product-market fit',
      'Working ad creative',
      'Basic email flows',
      'Reliable fulfillment',
    ],
  },
  {
    id: 2,
    goal: '$300K/Month',
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    metrics: {
      dailyRevenue: '$10,000',
      dailyOrders: '100',
      aov: '$100',
      cvr: '4%',
      dailyVisitors: '2,500',
      cac: '$25',
      ltv: '$400',
    },
    requirements: [
      'Multiple winning creatives',
      'SMS + Email automation',
      'Post-purchase upsells',
      'Private agent shipping',
      'Customer support team',
    ],
  },
  {
    id: 3,
    goal: '$1M/Month',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    featured: true,
    metrics: {
      dailyRevenue: '$33,333',
      dailyOrders: '250',
      aov: '$133',
      cvr: '6%',
      dailyVisitors: '4,166',
      cac: '$30',
      ltv: '$1,000',
    },
    requirements: [
      '$1,000+ LTV system',
      'Multi-channel ads (Meta + TikTok + Google)',
      'Full retention marketing',
      'A/B testing culture',
      '5-7 day shipping worldwide',
      'Dedicated support team',
      'UGC content machine',
    ],
  },
];

export default function BlueprintPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 mb-6">
              <Rocket className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Scale Roadmap</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The <span className="gradient-text">Blueprint</span> to Scale
            </h1>
            <p className="text-xl text-gray-600">
              Exact metrics and requirements to reach $100K, $300K, and $1M per month.
              This is your roadmap.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Blueprints */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid lg:grid-cols-3 gap-8">
            {blueprints.map((bp) => (
              <StaggerItem key={bp.id}>
                <div className={`relative bg-white rounded-3xl border-2 ${bp.borderColor} overflow-hidden ${bp.featured ? 'ring-4 ring-pink-100 scale-105' : ''}`}>
                  {bp.featured && (
                    <div className="absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-center">
                      <span className="text-sm font-semibold text-white">THE ULTIMATE GOAL</span>
                    </div>
                  )}

                  {/* Header */}
                  <div className={`p-8 ${bp.featured ? 'pt-14' : ''} text-center bg-gradient-to-br ${bp.color}`}>
                    <h2 className="text-4xl font-bold text-white mb-2">{bp.goal}</h2>
                    <p className="text-white/80">Monthly Revenue Target</p>
                  </div>

                  {/* Metrics */}
                  <div className="p-6">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Required Metrics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Daily Revenue</span>
                        <span className="font-bold text-gray-900">{bp.metrics.dailyRevenue}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Daily Orders</span>
                        <span className="font-bold text-gray-900">{bp.metrics.dailyOrders}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">AOV</span>
                        <span className="font-bold text-gray-900">{bp.metrics.aov}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">CVR</span>
                        <span className="font-bold text-green-600">{bp.metrics.cvr}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Daily Visitors</span>
                        <span className="font-bold text-gray-900">{bp.metrics.dailyVisitors}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Target CAC</span>
                        <span className="font-bold text-gray-900">{bp.metrics.cac}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Target LTV</span>
                        <span className="font-bold text-purple-600">{bp.metrics.ltv}</span>
                      </div>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className={`p-6 ${bp.bgColor}`}>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Requirements</h3>
                    <ul className="space-y-2">
                      {bp.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Your $1M Machine?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Learn the exact systems and strategies to hit these numbers.
            </p>
            <Link
              href="/learn"
              className="group inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-gray-900 bg-white rounded-xl hover:shadow-xl transition-all"
            >
              Start Learning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
