'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ExternalLink, Sparkles, ListChecks } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface Step {
  id: number;
  title: string;
  description: string;
  url: string;
  note: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Install Your Website Policies',
    description:
      'Set up legal and trust policies (Privacy, Terms, Refunds) to protect your business and build customer trust.',
    url: '#',
    note: '',
  },
  {
    id: 2,
    title: 'Register a .com or .co Domain',
    description: 'Secure your professional domain for credibility and better branding.',
    url: 'https://www.godaddy.com',
    note: 'Prefer .com - it performs best globally.',
  },
  {
    id: 3,
    title: 'Create an Email Under Your Domain',
    description:
      'Set up a business email (e.g., support@yourbrand.com) for legitimacy and customer communication.',
    url: 'https://www.godaddy.com',
    note: '',
  },
  {
    id: 4,
    title: 'Install Coupon Blocker App',
    description: 'Prevent coupon extensions from stealing your profit margins.',
    url: 'https://platform.shoffi.app/r/rl_U2L0seLE',
    note: '',
  },
  {
    id: 5,
    title: 'Connect PayPal Payments',
    description: 'Enable customers to pay securely with PayPal - a must-have for global eCommerce.',
    url: '#',
    note: '',
  },
  {
    id: 6,
    title: 'Create a Stripe Account (Credit Card Processing)',
    description: 'Activate Stripe or a credit card processor to expand your payment options.',
    url: 'https://stripe.com',
    note: '',
  },
  {
    id: 7,
    title: 'Install the Shrine Theme',
    description: 'Apply a high-converting Shopify theme built for growth.',
    url: 'https://shrinesolutions.com/?ref=0d9fe741',
    note: 'Use code QUANTUMSCALE to receive 20% OFF.',
  },
  {
    id: 8,
    title: 'Open a Klaviyo Account & Connect It to Shopify',
    description: 'Start email automation and flows to boost lifetime value and repeat sales.',
    url: '#',
    note: '',
  },
  {
    id: 9,
    title: 'Connect a Sourcing Agent to Your Store',
    description: 'Work with an advanced fulfillment partner to automate order processing.',
    url: 'https://www.hypersku.com/campaign/optimize-dropshipping/?ref=nmmwogq',
    note: '',
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

export default function ChecklistPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
      </div>
    );
  }

  const toggleStep = (id: number) => {
    setCompleted((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const progress = (completed.length / steps.length) * 100;

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Page Header */}
        <header className="page-header">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1>Store Setup Checklist</h1>
              <p>
                Follow each step to activate your full earning potential and launch with confidence.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[var(--bg-secondary)] px-4 py-2">
              <Sparkles size={16} className="text-[var(--text-primary)]" strokeWidth={1.5} />
              <span className="text-sm font-medium text-[var(--text-primary)]">Launch Steps</span>
            </div>
          </div>
        </header>

        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="font-semibold text-[var(--text-primary)]">Your Progress</span>
            <span className="text-2xl font-bold text-[var(--text-primary)]">
              {completed.length} / {steps.length}
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          {completed.length === steps.length && (
            <p className="mt-3 text-sm font-medium text-[var(--success)]">
              All done! Your store is ready to scale.
            </p>
          )}
        </motion.div>

        {/* Checklist Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {steps.map((step) => {
            const isComplete = completed.includes(step.id);
            return (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className={`card transition-all ${isComplete ? 'opacity-75' : ''}`}
                style={{
                  borderColor: isComplete ? 'var(--accent-gold)' : undefined,
                }}
              >
                <div className="flex gap-4">
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="mt-1 flex-shrink-0 transition-transform hover:scale-110"
                  >
                    {isComplete ? (
                      <CheckCircle2
                        size={24}
                        className="text-[var(--text-primary)]"
                        strokeWidth={1.5}
                      />
                    ) : (
                      <Circle size={24} className="text-[var(--text-muted)]" strokeWidth={1.5} />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <h3
                        className={`text-lg font-semibold text-[var(--text-primary)] ${isComplete ? 'line-through' : ''}`}
                      >
                        {step.title}
                      </h3>
                      {step.url !== '#' && (
                        <a
                          href={step.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 rounded-lg bg-[var(--bg-secondary)] p-2 transition-all hover:bg-[var(--bg-secondary)]"
                        >
                          <ExternalLink
                            size={18}
                            className="text-[var(--text-primary)]"
                            strokeWidth={1.5}
                          />
                        </a>
                      )}
                    </div>

                    <p className="mb-3 text-[var(--text-muted)]">{step.description}</p>

                    {step.note && (
                      <div className="border-l-3 rounded-xl border-[var(--primary)] bg-[var(--bg-secondary)] p-3 text-sm">
                        <strong className="text-[var(--text-primary)]">Pro tip:</strong>{' '}
                        <span className="text-[var(--text-secondary)]">{step.note}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Completion Card */}
        {completed.length === steps.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card mt-8 bg-[var(--success)] py-12 text-center text-white"
          >
            <div className="mb-4 text-6xl">🎉</div>
            <h2 className="mb-3 text-3xl font-bold">Setup Complete!</h2>
            <p className="mx-auto max-w-md text-lg text-white/80">
              Your store is now fully optimized and ready to scale. Time to drive traffic and make
              sales!
            </p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
