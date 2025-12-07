'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

const creditTiers = [
  { spend: '$2,000', credit: '$1,000' },
  { spend: '$5,000', credit: '$3,000', popular: true },
  { spend: '$10,000', credit: '$6,000' },
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
  { number: '01', title: 'Apply Below', description: 'Fill out the quick application form with your business details.' },
  { number: '02', title: 'Get Approved', description: 'Our team reviews your application (usually within 24-48 hours).' },
  { number: '03', title: 'Start Spending', description: 'Begin running TikTok ads and automatically unlock credits as you spend.' },
  { number: '04', title: 'Receive Credits', description: 'Credits are automatically applied to your account at each tier milestone.' },
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function TikTokCreditsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Page Header */}
        <header className="page-header">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1>Get Up to $6,000 in Free TikTok Ad Credits</h1>
              <p>Scale faster with our exclusive TikTok partnership. Unlock your tier, launch instantly, and get priority support.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-gold-bg)]">
              <Sparkles size={16} className="text-[var(--accent-gold)]" strokeWidth={1.5} />
              <span className="text-sm font-medium text-[var(--accent-gold)]">Exclusive Partnership</span>
            </div>
          </div>
        </header>

        {/* Credit Tiers */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Choose Your Credit Tier</h2>
            <p className="text-[var(--text-muted)]">The more you spend, the more free credits you unlock.</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {creditTiers.map((tier, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div
                  className={`relative card text-center ${tier.popular ? 'ring-2 ring-[var(--accent-gold)] scale-105' : ''}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--accent-gold)]">
                      <span className="text-xs font-semibold text-white">MOST POPULAR</span>
                    </div>
                  )}

                  <div className="rounded-xl p-6 mb-6 bg-[var(--accent-gold-bg)]">
                    <p className="text-sm font-medium mb-1 text-[var(--text-muted)]">Spend</p>
                    <p className="text-3xl font-bold text-[var(--accent-gold)]">{tier.spend}</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-medium mb-1 text-[var(--text-muted)]">Get</p>
                    <p className="text-5xl font-bold text-[var(--text-primary)]">{tier.credit}</p>
                    <p className="text-sm mt-1 text-[var(--text-muted)]">in free credits</p>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <DollarSign size={20} strokeWidth={1.5} />
                    <span className="font-semibold">
                      {Math.round((parseInt(tier.credit.replace(/\D/g, '')) / parseInt(tier.spend.replace(/\D/g, ''))) * 100)}% bonus
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Why Use Our TikTok Partnership</h2>
            <p className="text-[var(--text-muted)]">Beyond free credits, you get exclusive benefits not available anywhere else.</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="card card-hover h-full">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[var(--accent-gold-bg)]">
                    <benefit.icon size={24} className="text-[var(--accent-gold)]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{benefit.title}</h3>
                  <p className="text-[var(--text-muted)]">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* How It Works */}
        <section className="mb-12 card p-8 bg-[var(--text-primary)]">
          <div className="text-center mb-10">
            <h2 className="text-xl font-semibold text-white mb-2">How It Works</h2>
            <p className="text-white/70">Getting your free TikTok credits is simple.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-[var(--accent-gold)]/30" />
                )}
                <div className="text-5xl font-bold mb-4 text-[var(--accent-gold)]/30">{step.number}</div>
                <h3 className="text-lg font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-white/60">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card overflow-hidden" style={{ padding: 0 }}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-[var(--text-primary)]">{faq.question}</span>
                  <ChevronRight
                    size={20}
                    className={`text-[var(--accent-gold)] transition-transform ${openFaq === index ? 'rotate-90' : ''}`}
                    strokeWidth={1.5}
                  />
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-6 pb-5"
                  >
                    <p className="text-[var(--text-muted)]">{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="card p-8 text-center bg-[var(--accent-gold)]">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Scale with Free Ad Credits?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Join thousands of eCommerce brands already using our TikTok partnership to scale profitably.
          </p>
          <a
            href="https://ads.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-white text-[var(--text-primary)] hover:bg-gray-100"
          >
            Apply Now - It&apos;s Free
            <ArrowRight size={16} strokeWidth={1.5} />
          </a>
        </section>
      </div>
    </DashboardLayout>
  );
}
