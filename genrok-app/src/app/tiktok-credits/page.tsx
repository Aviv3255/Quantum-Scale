'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Check,
  Gift,
  Zap,
  Users,
  TrendingUp,
  Shield,
  Clock,
  DollarSign,
  ChevronRight,
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

const creditTiers = [
  {
    spend: '$2,000',
    credit: '$1,000',
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    textColor: 'text-cyan-700',
  },
  {
    spend: '$5,000',
    credit: '$3,000',
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
    popular: true,
  },
  {
    spend: '$10,000',
    credit: '$6,000',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    textColor: 'text-pink-700',
  },
];

const benefits = [
  {
    icon: Gift,
    title: 'Free Ad Credits',
    description: 'Up to $6,000 in free TikTok ad credits when you spend through our partnership.',
  },
  {
    icon: Zap,
    title: 'Instant Activation',
    description: 'Get started immediately. No waiting period, no complicated approval process.',
  },
  {
    icon: Users,
    title: 'Priority Support',
    description: 'Direct access to TikTok growth team for strategy and optimization help.',
  },
  {
    icon: TrendingUp,
    title: 'Scaling Guidance',
    description: 'Learn proven TikTok ad strategies used by 8-figure eCommerce brands.',
  },
  {
    icon: Shield,
    title: 'Account Protection',
    description: 'Priority account review and protection against unexpected restrictions.',
  },
  {
    icon: Clock,
    title: 'Fast Onboarding',
    description: 'Dedicated onboarding specialist to get your campaigns running quickly.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Apply Below',
    description: 'Fill out the quick application form with your business details.',
  },
  {
    number: '02',
    title: 'Get Approved',
    description: 'Our team reviews your application (usually within 24-48 hours).',
  },
  {
    number: '03',
    title: 'Start Spending',
    description: 'Begin running TikTok ads and automatically unlock credits as you spend.',
  },
  {
    number: '04',
    title: 'Receive Credits',
    description: 'Credits are automatically applied to your account at each tier milestone.',
  },
];

const faqs = [
  {
    question: 'How do the credit tiers work?',
    answer: 'Credits unlock progressively as you reach spend milestones. Spend $2K and get $1K credit, spend $5K and get $3K total credits, spend $10K and get $6K total credits.',
  },
  {
    question: 'How long do I have to use the credits?',
    answer: 'Credits are valid for 30 days from the date they are applied to your account. This gives you plenty of time to use them effectively.',
  },
  {
    question: 'Can existing TikTok advertisers apply?',
    answer: 'Yes! Both new and existing TikTok advertisers can apply. If you have an existing account, we can help you migrate or create a new one for the partnership.',
  },
  {
    question: 'What types of businesses qualify?',
    answer: 'eCommerce businesses selling physical or digital products are eligible. We work with Shopify, WooCommerce, and other major platforms.',
  },
];

export default function TikTokCreditsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200 mb-6">
              <Sparkles className="w-4 h-4 text-pink-600" />
              <span className="text-sm font-semibold text-pink-700">EXCLUSIVE PARTNERSHIP</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Get Up to{' '}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                $6,000
              </span>{' '}
              in Free TikTok Ad Credits
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Scale faster with our exclusive TikTok partnership. Unlock your tier, launch instantly,
              and get priority support from TikTok&apos;s growth team.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#apply"
                className="group inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl hover:shadow-xl hover:shadow-pink-500/25 transition-all"
              >
                Claim Your Credits
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                How It Works
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Credit Tiers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your <span className="gradient-text">Credit Tier</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The more you spend, the more free credits you unlock. It&apos;s that simple.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {creditTiers.map((tier, index) => (
              <StaggerItem key={index}>
                <div
                  className={`relative bg-white rounded-3xl p-8 border-2 ${tier.borderColor} ${
                    tier.popular ? 'ring-4 ring-purple-100 scale-105' : ''
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full">
                      <span className="text-xs font-semibold text-white">MOST POPULAR</span>
                    </div>
                  )}

                  <div className="text-center">
                    <div className={`${tier.bgColor} rounded-2xl p-6 mb-6`}>
                      <p className="text-sm font-medium text-gray-500 mb-1">Spend</p>
                      <p className={`text-3xl font-bold ${tier.textColor}`}>{tier.spend}</p>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-500 mb-1">Get</p>
                      <p
                        className={`text-5xl font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}
                      >
                        {tier.credit}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">in free credits</p>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <DollarSign className="w-5 h-5" />
                      <span className="font-semibold">
                        {Math.round((parseInt(tier.credit.replace(/\D/g, '')) / parseInt(tier.spend.replace(/\D/g, ''))) * 100)}% bonus
                      </span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Use Our <span className="gradient-text">TikTok Partnership</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Beyond free credits, you get exclusive benefits not available anywhere else.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <StaggerItem key={index}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Getting your free TikTok credits is simple. Here&apos;s the process.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <StaggerItem key={index}>
                <div className="relative">
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-pink-500/50 to-transparent" />
                  )}
                  <div className="text-5xl font-bold text-pink-500/20 mb-4">{step.number}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronRight
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      openFaq === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-5"
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="apply" className="py-20 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Scale with Free Ad Credits?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Join thousands of eCommerce brands already using our TikTok partnership to scale profitably.
            </p>
            <a
              href="https://ads.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-10 py-5 text-xl font-bold bg-white text-gray-900 rounded-2xl hover:shadow-2xl transition-all"
            >
              Apply Now — It&apos;s Free
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
