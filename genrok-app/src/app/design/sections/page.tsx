'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Layers, CheckCircle2, Shield, Star, Users, Zap, ArrowRight, ShoppingCart, Award, Clock } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

const sectionTypes = [
  {
    id: 1,
    name: 'Hero Section',
    category: 'Above the Fold',
    icon: Zap,
    description: 'The first thing visitors see. Make it compelling with a clear value proposition and strong CTA.',
    tips: [
      'Keep headline under 10 words',
      'Show product in use, not just the product',
      'Single, clear call-to-action',
      'Add urgency or scarcity elements',
    ],
    example: {
      headline: 'Sleep Better Tonight',
      subheadline: 'Our award-winning mattress adapts to your body for the perfect night\'s sleep.',
      cta: 'Shop Now - Free Shipping',
    },
  },
  {
    id: 2,
    name: 'Trust Badges',
    category: 'Social Proof',
    icon: Shield,
    description: 'Build instant credibility with trust indicators. Place them prominently above the fold.',
    tips: [
      'Include money-back guarantee',
      'Show secure payment icons',
      'Display customer count or reviews',
      'Add any press mentions',
    ],
    badges: ['100% Satisfaction Guarantee', 'Free Returns', 'Secure Checkout', '10,000+ Happy Customers'],
  },
  {
    id: 3,
    name: 'Testimonials',
    category: 'Social Proof',
    icon: Star,
    description: 'Real customer stories that resonate with potential buyers. Video testimonials work 3x better.',
    tips: [
      'Use real photos and names',
      'Include specific results',
      'Show variety of customers',
      'Add verification badges',
    ],
    testimonial: {
      quote: 'This product literally changed my life. I went from struggling to sleep to getting 8 hours every night.',
      author: 'Sarah J.',
      title: 'Verified Buyer',
      rating: 5,
    },
  },
  {
    id: 4,
    name: 'Features Grid',
    category: 'Product Info',
    icon: CheckCircle2,
    description: 'Highlight key product benefits in an easy-to-scan format. Focus on benefits, not features.',
    tips: [
      'Lead with benefits, not specs',
      'Use icons for visual interest',
      '3-6 features is optimal',
      'Keep descriptions short',
    ],
  },
  {
    id: 5,
    name: 'Comparison Table',
    category: 'Product Info',
    icon: Award,
    description: 'Show why your product is better than alternatives. Use checkmarks and X marks for clarity.',
    tips: [
      'Compare to known alternatives',
      'Highlight your advantages',
      'Keep it honest and fair',
      'Include price comparison',
    ],
  },
  {
    id: 6,
    name: 'Urgency Bar',
    category: 'Conversion',
    icon: Clock,
    description: 'Create FOMO with limited-time offers or low stock warnings. Use sparingly and honestly.',
    tips: [
      'Use real scarcity only',
      'Show countdown timers',
      'Display stock levels',
      'Offer flash sales',
    ],
  },
  {
    id: 7,
    name: 'FAQ Accordion',
    category: 'Objection Handling',
    icon: Users,
    description: 'Address common objections before they become barriers. Place near the add-to-cart button.',
    tips: [
      'Answer real customer questions',
      'Address shipping and returns',
      'Include sizing/fit info',
      'Cover payment options',
    ],
  },
  {
    id: 8,
    name: 'Add to Cart Section',
    category: 'Conversion',
    icon: ShoppingCart,
    description: 'The most critical section. Make buying effortless with clear pricing and prominent buttons.',
    tips: [
      'Show clear pricing',
      'Display payment options',
      'Add quantity selector',
      'Include trust elements nearby',
    ],
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

export default function SectionsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

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
              <h1>High-Converting Sections</h1>
              <p>Every section on your product page has a job. Learn which sections drive conversions.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-gold-bg)]">
              <Layers size={16} className="text-[var(--accent-gold)]" strokeWidth={1.5} />
              <span className="text-sm font-medium text-[var(--accent-gold)]">Section Designs</span>
            </div>
          </div>
        </header>

        {/* Sections Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {sectionTypes.map((section) => (
            <motion.div key={section.id} variants={itemVariants}>
              <div className="card card-hover h-full overflow-hidden" style={{ padding: 0 }}>
                {/* Header */}
                <div className="p-6 bg-[var(--accent-gold-bg)]">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[var(--accent-gold)]/20 flex items-center justify-center">
                      <section.icon size={28} className="text-[var(--accent-gold)]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)]">{section.name}</h3>
                      <span className="text-sm text-[var(--accent-gold)]">{section.category}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-[var(--text-muted)] mb-6">{section.description}</p>

                  {/* Tips */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-[var(--text-primary)] mb-3">Best Practices:</h4>
                    <ul className="space-y-2">
                      {section.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                          <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Example Preview */}
                  {section.example && (
                    <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
                      <p className="text-xs text-[var(--text-muted)] mb-2">Example:</p>
                      <p className="font-bold text-[var(--text-primary)]">{section.example.headline}</p>
                      <p className="text-sm text-[var(--text-muted)] mt-1">{section.example.subheadline}</p>
                      <button className="mt-3 px-4 py-2 bg-[var(--accent-gold)] text-white text-sm font-medium rounded-lg">
                        {section.example.cta}
                      </button>
                    </div>
                  )}

                  {section.badges && (
                    <div className="flex flex-wrap gap-2">
                      {section.badges.map((badge, i) => (
                        <span key={i} className="text-xs font-medium px-3 py-1.5 bg-green-50 text-green-700 rounded-full flex items-center gap-1">
                          <Shield size={12} strokeWidth={1.5} />
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  {section.testimonial && (
                    <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
                      <div className="flex gap-1 mb-2">
                        {[...Array(section.testimonial.rating)].map((_, i) => (
                          <Star key={i} size={16} className="fill-[var(--accent-gold)] text-[var(--accent-gold)]" />
                        ))}
                      </div>
                      <p className="text-[var(--text-secondary)] italic text-sm">&quot;{section.testimonial.quote}&quot;</p>
                      <p className="text-[var(--text-primary)] font-medium mt-2 text-sm">{section.testimonial.author}</p>
                      <p className="text-[var(--text-muted)] text-xs">{section.testimonial.title}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <section className="card p-8 text-center">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Ready to Optimize Your Product Page?</h2>
          <p className="text-[var(--text-muted)] mb-8">
            Implement these sections in the right order and watch your conversion rate climb.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ab-tests" className="btn btn-primary">
              See A/B Test Results
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
            <Link href="/learn" className="btn btn-secondary">
              Read CRO Guides
            </Link>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
