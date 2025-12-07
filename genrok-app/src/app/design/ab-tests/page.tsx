'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  ExternalLink,
  Lightbulb,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

const abTests = [
  {
    id: 1,
    title: 'Product Reviews vs No Reviews',
    category: 'Social Proof',
    controlCvr: 2.8,
    variantCvr: 3.16,
    lift: 12.7,
    sampleSize: 45000,
    insight: 'Authentic reviews with photos increase trust and reduce hesitation.',
    recommendation: 'Add photo/video reviews to all product pages.',
    recommendedApp: 'Loox Reviews',
    recommendedAppUrl: 'https://loox.io/app/LASERCRO',
  },
  {
    id: 2,
    title: 'GEO-Location Discount Bar',
    category: 'Personalization',
    controlCvr: 2.1,
    variantCvr: 3.51,
    lift: 67,
    sampleSize: 64000,
    insight: 'Personalized discounts based on location create exclusivity and urgency.',
    recommendation: 'Show location-based discounts with local holiday themes.',
    recommendedApp: 'Parity Rocket',
    recommendedAppUrl: 'https://parityrocket.com/',
  },
  {
    id: 3,
    title: 'Wishlist Button vs Buy Now',
    category: 'UX',
    controlCvr: 3.2,
    variantCvr: 3.46,
    lift: 8,
    aovLift: 22,
    sampleSize: 28000,
    insight: 'Wishlist triggers the Endowment Effect - partial ownership increases desire.',
    recommendation: 'Add wishlist functionality to product pages.',
    recommendedApp: 'Vitals',
    recommendedAppUrl: 'https://vitals.app/shopify/12548540',
  },
  {
    id: 4,
    title: 'Sticky Add to Cart (Mobile)',
    category: 'Mobile UX',
    controlCvr: 2.4,
    variantCvr: 2.93,
    lift: 22,
    sampleSize: 52000,
    insight: 'Reducing friction on mobile by keeping CTA always visible.',
    recommendation: 'Add sticky ATC button on mobile product pages.',
    recommendedApp: 'Vitals',
    recommendedAppUrl: 'https://vitals.app/shopify/12548540',
  },
  {
    id: 5,
    title: 'Trust Badges Below CTA',
    category: 'Trust',
    controlCvr: 2.9,
    variantCvr: 3.19,
    lift: 10,
    sampleSize: 35000,
    insight: 'Visual trust signals reduce checkout anxiety.',
    recommendation: 'Add payment icons and security badges near CTA.',
    recommendedApp: 'Essential Trust Badges',
    recommendedAppUrl: 'https://platform.shoffi.app/r/rl_uUHJkiZx',
  },
  {
    id: 6,
    title: 'Free Shipping Progress Bar',
    category: 'AOV',
    controlCvr: 3.1,
    variantCvr: 3.1,
    lift: 0,
    aovLift: 18,
    sampleSize: 41000,
    insight: 'Progress bars motivate customers to add more items to unlock free shipping.',
    recommendation: 'Add dynamic free shipping bar in cart drawer.',
    recommendedApp: 'Essential Free Shipping Bar',
    recommendedAppUrl: 'https://platform.shoffi.app/r/rl_ScO0HCCU',
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

export default function ABTestsPage() {
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
              <h1>A/B Test Results</h1>
              <p>Real results from real tests. See what actually moves the needle for conversion rates and AOV.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-gold-bg)]">
              <BarChart3 size={16} className="text-[var(--accent-gold)]" strokeWidth={1.5} />
              <span className="text-sm font-medium text-[var(--accent-gold)]">Real Data</span>
            </div>
          </div>
        </header>

        {/* Tests Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-6"
        >
          {abTests.map((test) => (
            <motion.div key={test.id} variants={itemVariants}>
              <div className="card card-hover overflow-hidden" style={{ padding: 0 }}>
                {/* Header */}
                <div className="p-6 border-b border-[var(--border-light)]">
                  <span className="badge badge-gold">
                    {test.category}
                  </span>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-3">
                    {test.title}
                  </h3>
                </div>

                {/* Results */}
                <div className="p-6 bg-[var(--bg-secondary)]">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-sm mb-1 text-[var(--text-muted)]">Control</p>
                      <p className="text-2xl font-bold text-[var(--text-primary)]">{test.controlCvr}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm mb-1 text-[var(--text-muted)]">Variant</p>
                      <p className="text-2xl font-bold text-green-600">{test.variantCvr}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm mb-1 text-[var(--text-muted)]">Lift</p>
                      <div className="flex items-center justify-center gap-1">
                        {test.lift > 0 ? (
                          <TrendingUp size={20} className="text-green-600" strokeWidth={1.5} />
                        ) : (
                          <TrendingDown size={20} className="text-[var(--text-muted)]" strokeWidth={1.5} />
                        )}
                        <p className={`text-2xl font-bold ${test.lift > 0 ? 'text-green-600' : 'text-[var(--text-muted)]'}`}>
                          {test.lift > 0 ? '+' : ''}{test.lift}%
                        </p>
                      </div>
                    </div>
                  </div>
                  {test.aovLift && (
                    <div className="text-center p-2 rounded-lg bg-[var(--accent-gold-bg)]">
                      <span className="text-sm font-medium text-[var(--accent-gold)]">
                        +{test.aovLift}% AOV increase
                      </span>
                    </div>
                  )}
                  <p className="text-xs text-center mt-2 text-[var(--text-muted)]">
                    Sample size: {test.sampleSize.toLocaleString()} visitors
                  </p>
                </div>

                {/* Insight */}
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Lightbulb size={20} className="text-[var(--accent-gold)] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <p className="font-medium text-[var(--text-primary)] mb-1">Insight</p>
                      <p className="text-sm text-[var(--text-muted)]">{test.insight}</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--accent-gold-bg)]">
                    <p className="text-sm text-[var(--text-primary)] mb-2">{test.recommendation}</p>
                    <a
                      href={test.recommendedAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-gold)] hover:text-[var(--accent-gold-hover)] transition-colors"
                    >
                      Try {test.recommendedApp}
                      <ExternalLink size={14} strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
