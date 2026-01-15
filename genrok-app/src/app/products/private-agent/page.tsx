'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  MessageCircle,
  Package,
  Home,
  CheckCircle,
  Shield,
  Box,
  ExternalLink,
  ChevronDown,
  Zap,
  RefreshCw,
  Heart,
  UserPlus,
  Link2,
  ArrowRight,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Agent data
const agents = [
  {
    id: 'mate',
    name: 'Mate',
    logo: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/COag0vSJxoUDEAE=.png',
    link: 'https://erp.matedropshipping.com/login?invite_id=915',
    badge: 'Primary Agent',
  },
  {
    id: 'hypersku',
    name: 'HyperSKU',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T115639.885.png?v=1760086613',
    link: 'https://www.hypersku.com/campaign/optimize-dropshipping/?ref=nmmwogq',
    badge: 'Backup Agent',
  },
];

const sharedBenefits = [
  'Worldwide shipping 5-7 days',
  'WhatsApp personal support',
  'Package consolidation',
  'Home delivery option',
  'Quality control inspection',
  'Branded packaging available',
  'No monthly fees',
  'No minimum orders',
  'No commitment required',
];

const flowSteps = [
  { icon: UserPlus, title: 'Register Free', description: 'Click our link, sign up in 30 seconds' },
  { icon: Link2, title: 'Connect Shopify', description: 'Install the agent\'s Shopify app' },
  { icon: RefreshCw, title: 'Auto Sync', description: 'Orders appear automatically' },
  { icon: Truck, title: 'Agent Ships', description: '5-7 day delivery with tracking' },
  { icon: Heart, title: 'Customers Happy', description: 'Fast shipping = great reviews' },
];

const benefits = [
  { icon: Truck, title: '5-7 Day Worldwide Shipping', description: 'Fast delivery to most countries' },
  { icon: MessageCircle, title: 'WhatsApp Personal Support', description: 'Direct line to your agent' },
  { icon: Package, title: 'Package Consolidation', description: 'All items in one package' },
  { icon: CheckCircle, title: 'Quality Control', description: 'Every item inspected before shipping' },
  { icon: Box, title: 'Branded Packaging', description: 'Your logo, your brand experience' },
  { icon: Home, title: 'Home Delivery', description: 'Door-to-door shipping option' },
];

const faqs = [
  { q: 'Does it cost money to sign up?', a: 'No, opening an account is completely free. No subscription fees, no commitment. You only pay for orders placed.' },
  { q: 'Why should I connect BOTH agents?', a: 'Two reasons: backup availability (rare cases when one may not have a product) and price comparison (choose the cheaper option for each order).' },
  { q: 'How do I communicate with the agent?', a: 'Directly on WhatsApp. After registering through our link, a personal representative will contact you.' },
  { q: 'Can I brand my packages?', a: 'Absolutely. Add your logo, branded packaging, personal notes, and create a full premium customer experience.' },
  { q: 'What about shipping times?', a: '5-7 days to most countries (US, Europe). Much faster than AliExpress\'s typical 15-45 days.' },
];

const warehouseImages = [
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/19%20(1).jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/21.jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/24.jpg',
  'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/22%20(1).jpg',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PrivateAgentPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Auth check
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-6">
            <Shield size={16} className="text-green-600" />
            <span className="text-sm font-semibold text-green-700">100% FREE - NO COMMITMENT</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4" style={{ letterSpacing: '-0.02em' }}>
            Your Private Fulfillment Team
          </h1>
          <p className="text-xl text-[var(--text-muted)] mb-3 max-w-2xl mx-auto">
            5-7 Day Delivery Worldwide. No Monthly Fees. No Minimums.
          </p>
          <p className="text-base text-[var(--text-muted)] mb-8 max-w-3xl mx-auto">
            Connect both agents to your store for backup availability and price comparison on every order.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            {agents.map((agent) => (
              <a
                key={agent.id}
                href={agent.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                Connect {agent.name}
                <ExternalLink size={18} />
              </a>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--text-muted)]">
            <span className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              No Credit Card
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              No Monthly Fees
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              Cancel Anytime
            </span>
          </div>
        </motion.section>

        {/* Why Both Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              Smart Dropshippers Use Both
            </h2>
            <p className="text-[var(--text-muted)]">Three compelling reasons to connect both agents</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Backup Availability',
                description: 'Rare cases when one agent doesn\'t have your product - the other one will.',
                icon: Shield,
                color: '#3B82F6',
              },
              {
                title: 'Price Comparison',
                description: 'Compare quotes and choose the cheaper option for each order.',
                icon: Zap,
                color: '#10B981',
              },
              {
                title: 'Personal Support',
                description: 'Register through us and get direct WhatsApp access to your rep.',
                icon: MessageCircle,
                color: '#8B5CF6',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="card text-center"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                >
                  <item.icon size={24} style={{ color: item.color }} />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Side-by-Side Agent Cards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              Your Two Agents
            </h2>
            <p className="text-[var(--text-muted)]">Both are free to connect. Choose where to fulfill each order.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {agents.map((agent) => (
              <motion.div
                key={agent.id}
                variants={itemVariants}
                className="card card-hover"
              >
                {/* Agent Header */}
                <div className="flex items-center gap-4 mb-6">
                  {agent.logo ? (
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[var(--bg-secondary)]">
                      <Image src={agent.logo} alt={agent.name} fill className="object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center">
                      <span className="text-2xl font-bold text-[var(--text-muted)]">{agent.name.charAt(0)}</span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">{agent.name}</h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700 border border-green-200 mt-1">
                      <CheckCircle size={12} />
                      {agent.badge}
                    </span>
                  </div>
                </div>

                {/* Benefits Checklist */}
                <ul className="space-y-3 mb-6">
                  {sharedBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                      <span className="text-sm text-[var(--text-secondary)]">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={agent.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full justify-center"
                >
                  Connect {agent.name}
                  <ExternalLink size={16} />
                </a>
                <p className="text-xs text-center text-[var(--text-muted)] mt-3">
                  Free signup - takes 30 seconds
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              How It Works
            </h2>
            <p className="text-[var(--text-muted)]">From signup to happy customer in 5 simple steps</p>
          </div>

          {/* Desktop Flow */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[var(--border-light)] via-[var(--primary)] to-[var(--border-light)]" />

              <div className="flex justify-between relative z-10">
                {flowSteps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="flex flex-col items-center text-center w-40"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-[var(--primary)] flex items-center justify-center mb-4 shadow-lg">
                      <step.icon size={32} className="text-white" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                      Step {idx + 1}
                    </span>
                    <h4 className="font-semibold text-[var(--text-primary)] mb-1">{step.title}</h4>
                    <p className="text-xs text-[var(--text-muted)]">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Flow */}
          <div className="md:hidden space-y-4">
            {flowSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-center gap-4 card"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)] flex items-center justify-center flex-shrink-0">
                  <step.icon size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[var(--text-primary)]">{step.title}</h4>
                  <p className="text-sm text-[var(--text-muted)]">{step.description}</p>
                </div>
                <span className="text-2xl font-bold text-[var(--text-muted)] opacity-30">{idx + 1}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-secondary)] text-sm text-[var(--text-muted)]">
              <Zap size={16} className="text-[var(--accent-gold)]" />
              Total setup time: 5 minutes
            </span>
          </div>
        </motion.section>

        {/* Benefits Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              Why Private Agents?
            </h2>
            <p className="text-[var(--text-muted)]">Everything you need for professional fulfillment</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {benefits.map((benefit, idx) => (
              <motion.div key={idx} variants={itemVariants} className="card card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center flex-shrink-0">
                    <benefit.icon size={24} className="text-[var(--text-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">{benefit.title}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Warehouse Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              World-Class Fulfillment Centers
            </h2>
            <p className="text-[var(--text-muted)]">Our partner warehouses fulfill thousands of orders daily</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {warehouseImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
                className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={img}
                  alt={`Fulfillment center ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-[var(--text-muted)]">Everything you need to know</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="card overflow-hidden"
                style={{ padding: 0 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-[var(--bg-hover)] transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={16} className="text-[var(--primary)]" />
                    </div>
                    <h3 className="font-semibold text-[var(--text-primary)]">{faq.q}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={20} className="text-[var(--text-muted)]" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0">
                        <p className="pl-11 text-[var(--text-muted)]">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="rounded-2xl p-8 md:p-12 text-center"
          style={{ background: 'var(--primary)' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'white' }}>
            Ready to Scale Your Shipping?
          </h2>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Connect both agents for free. No credit card, no commitment, no monthly fees.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            {agents.map((agent) => (
              <a
                key={agent.id}
                href={agent.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-[var(--primary)] bg-white hover:bg-white/90 transition-colors shadow-lg"
              >
                Connect {agent.name}
                <ArrowRight size={18} />
              </a>
            ))}
          </div>

          <p className="text-sm flex items-center justify-center gap-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
            <MessageCircle size={16} />
            Register through our link for direct WhatsApp support
          </p>
        </motion.section>
      </div>
    </DashboardLayout>
  );
}
