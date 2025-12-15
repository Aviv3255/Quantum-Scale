'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Palette, Globe, Layers, Image as ImageIcon, ArrowRight, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

const categories = [
  {
    title: 'Web UI Inspiration',
    description:
      'Award-winning eCommerce designs from the best brands worldwide. Get inspired by layouts, navigation, and user experience patterns.',
    icon: Globe,
    href: '/design/web',
    examples: ['Product Pages', 'Homepages', 'Checkout Flows', 'Navigation'],
  },
  {
    title: 'High-Converting Sections',
    description:
      'Ready-to-use section designs that drive conversions. Trust badges, testimonials, feature highlights, and more.',
    icon: Layers,
    href: '/design/sections',
    examples: ['Hero Sections', 'Trust Badges', 'Testimonials', 'CTAs'],
  },
  {
    title: 'Brand Imagery',
    description:
      'Curated product photography, lifestyle shots, and visual inspiration for building a premium brand aesthetic.',
    icon: ImageIcon,
    href: '/design/images',
    examples: ['Product Photos', 'Lifestyle Shots', 'Brand Aesthetics', 'Color Palettes'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const tips = [
  {
    title: 'Less is More',
    description: 'Clean, minimal designs convert better. Remove clutter and focus on your product.',
  },
  {
    title: 'Mobile First',
    description: '80%+ of traffic is mobile. Design for mobile first, then adapt to desktop.',
  },
  {
    title: 'Trust Elements',
    description: 'Add reviews, badges, and guarantees above the fold to build instant credibility.',
  },
  {
    title: 'High-Quality Images',
    description: 'Professional product photos are the #1 factor in purchase decisions.',
  },
];

export default function DesignPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Page Header */}
        <header className="page-header">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1>Design That Converts</h1>
              <p>Curated design inspiration from the world&apos;s best eCommerce brands</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[var(--bg-secondary)] px-4 py-2">
              <Palette size={16} className="text-[var(--text-primary)]" strokeWidth={1.5} />
              <span className="text-sm font-medium text-[var(--text-primary)]">
                Design Inspiration
              </span>
            </div>
          </div>
        </header>

        {/* Categories */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid-3 mb-12"
        >
          {categories.map((category) => (
            <motion.div key={category.title} variants={itemVariants}>
              <Link href={category.href}>
                <div className="card card-hover h-full overflow-hidden" style={{ padding: 0 }}>
                  {/* Header */}
                  <div className="bg-[var(--bg-secondary)] p-8">
                    <div className="bg-[var(--accent-gold)]/20 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl">
                      <category.icon
                        size={32}
                        className="text-[var(--text-primary)]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                      {category.title}
                    </h2>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="mb-6 text-[var(--text-muted)]">{category.description}</p>

                    <div className="mb-6 flex flex-wrap gap-2">
                      {category.examples.map((example, i) => (
                        <span key={i} className="badge badge-gold">
                          {example}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 font-semibold text-[var(--text-primary)] transition-all group-hover:gap-3">
                      Explore
                      <ArrowRight size={16} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.section>

        {/* Tips */}
        <section className="card p-8">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-xl font-semibold text-[var(--text-primary)]">
              Design Tips for Higher Conversions
            </h2>
            <p className="text-[var(--text-muted)]">Apply these principles to your store</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {tips.map((tip) => (
              <div key={tip.title} className="rounded-xl bg-[var(--bg-secondary)] p-4">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg-secondary)]">
                  <Sparkles size={20} className="text-[var(--text-primary)]" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 font-semibold text-[var(--text-primary)]">{tip.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
