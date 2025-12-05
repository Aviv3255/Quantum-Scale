'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
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
  },
  {
    spend: '$5,000',
    credit: '$3,000',
    popular: true,
  },
  {
    spend: '$10,000',
    credit: '$6,000',
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
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 105, 20, 0.1) 0%, rgba(139, 105, 20, 0.02) 50%, transparent 70%)',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-4xl mx-auto">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(139, 105, 20, 0.08)', border: '1px solid rgba(139, 105, 20, 0.15)' }}
            >
              <Sparkles className="w-4 h-4" style={{ color: '#8b6914' }} strokeWidth={1.5} />
              <span className="text-sm font-semibold" style={{ color: '#8b6914' }}>EXCLUSIVE PARTNERSHIP</span>
            </div>

            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
            >
              Get Up to{' '}
              <span style={{ color: '#8b6914' }}>$6,000</span>{' '}
              in Free TikTok Ad Credits
            </h1>

            <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
              Scale faster with our exclusive TikTok partnership. Unlock your tier, launch instantly,
              and get priority support from TikTok&apos;s growth team.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#apply"
                className="group inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white rounded-xl transition-all"
                style={{ background: '#8b6914', boxShadow: '0 4px 14px rgba(139, 105, 20, 0.25)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2c1810';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#8b6914';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Claim Your Credits
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl transition-all"
                style={{ background: '#fdf6e3', color: '#2c1810' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 105, 20, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fdf6e3';
                }}
              >
                How It Works
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Credit Tiers */}
      <section className="py-20" style={{ background: '#fdf6e3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
            >
              Choose Your <span style={{ color: '#8b6914' }}>Credit Tier</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
              The more you spend, the more free credits you unlock. It&apos;s that simple.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {creditTiers.map((tier, index) => (
              <StaggerItem key={index}>
                <div
                  className="relative bg-white rounded-3xl p-8 transition-all"
                  style={{
                    border: tier.popular ? '2px solid #8b6914' : '1px solid rgba(0, 0, 0, 0.06)',
                    transform: tier.popular ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {tier.popular && (
                    <div
                      className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full"
                      style={{ background: '#8b6914' }}
                    >
                      <span className="text-xs font-semibold text-white">MOST POPULAR</span>
                    </div>
                  )}

                  <div className="text-center">
                    <div
                      className="rounded-2xl p-6 mb-6"
                      style={{ background: 'rgba(139, 105, 20, 0.08)' }}
                    >
                      <p className="text-sm font-medium mb-1" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>Spend</p>
                      <p className="text-3xl font-bold" style={{ color: '#8b6914' }}>{tier.spend}</p>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm font-medium mb-1" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>Get</p>
                      <p className="text-5xl font-bold" style={{ color: '#2c1810' }}>
                        {tier.credit}
                      </p>
                      <p className="text-sm mt-1" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>in free credits</p>
                    </div>

                    <div className="flex items-center justify-center gap-2" style={{ color: '#22c55e' }}>
                      <DollarSign className="w-5 h-5" strokeWidth={1.5} />
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
            >
              Why Use Our <span style={{ color: '#8b6914' }}>TikTok Partnership</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
              Beyond free credits, you get exclusive benefits not available anywhere else.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <StaggerItem key={index}>
                <div
                  className="bg-white rounded-2xl p-6 transition-all"
                  style={{ border: '1px solid rgba(0, 0, 0, 0.06)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(139, 105, 20, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.06)';
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(139, 105, 20, 0.1)' }}
                  >
                    <benefit.icon className="w-6 h-6" style={{ color: '#8b6914' }} strokeWidth={1.5} />
                  </div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
                  >
                    {benefit.title}
                  </h3>
                  <p style={{ color: 'rgba(44, 24, 16, 0.6)' }}>{benefit.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20" style={{ background: '#2c1810' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#fdf6e3' }}
            >
              How It Works
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'rgba(253, 246, 227, 0.6)' }}>
              Getting your free TikTok credits is simple. Here&apos;s the process.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <StaggerItem key={index}>
                <div className="relative">
                  {index < steps.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-8 left-full w-full h-0.5"
                      style={{ background: 'linear-gradient(to right, rgba(139, 105, 20, 0.5), transparent)' }}
                    />
                  )}
                  <div
                    className="text-5xl font-bold mb-4"
                    style={{ color: 'rgba(139, 105, 20, 0.3)' }}
                  >
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#fdf6e3' }}>{step.title}</h3>
                  <p style={{ color: 'rgba(253, 246, 227, 0.6)' }}>{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
            >
              Frequently Asked <span style={{ color: '#8b6914' }}>Questions</span>
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
                className="bg-white rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(0, 0, 0, 0.06)' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span
                    className="font-semibold"
                    style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
                  >
                    {faq.question}
                  </span>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${openFaq === index ? 'rotate-90' : ''}`}
                    style={{ color: '#8b6914' }}
                    strokeWidth={1.5}
                  />
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-5"
                  >
                    <p style={{ color: 'rgba(44, 24, 16, 0.6)' }}>{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="apply" className="py-20" style={{ background: '#8b6914' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="mb-6">
              <span className="text-6xl">🐵</span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#fdf6e3' }}
            >
              Ready to Scale with Free Ad Credits?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(253, 246, 227, 0.8)' }}>
              Join thousands of eCommerce brands already using our TikTok partnership to scale profitably.
            </p>
            <a
              href="https://ads.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-10 py-5 text-xl font-bold rounded-2xl transition-all"
              style={{ background: '#fdf6e3', color: '#2c1810' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fdf6e3';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Apply Now — It&apos;s Free
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
