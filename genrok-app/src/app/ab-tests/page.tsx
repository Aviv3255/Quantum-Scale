'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  ExternalLink,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

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

export default function ABTestsPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 mb-6">
              <BarChart3 className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Real Data</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">A/B Test</span> Results
            </h1>
            <p className="text-xl text-gray-600">
              Real results from real tests. See what actually moves the needle for conversion rates and AOV.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Tests Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {abTests.map((test) => (
              <StaggerItem key={test.id}>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all">
                  {/* Header */}
                  <div className="p-6 border-b border-gray-100">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                      {test.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-3">{test.title}</h3>
                  </div>

                  {/* Results */}
                  <div className="p-6 bg-gray-50">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">Control</p>
                        <p className="text-2xl font-bold text-gray-700">{test.controlCvr}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">Variant</p>
                        <p className="text-2xl font-bold text-green-600">{test.variantCvr}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">Lift</p>
                        <div className="flex items-center justify-center gap-1">
                          {test.lift > 0 ? (
                            <TrendingUp className="w-5 h-5 text-green-500" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-gray-400" />
                          )}
                          <p className={`text-2xl font-bold ${test.lift > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                            {test.lift > 0 ? '+' : ''}{test.lift}%
                          </p>
                        </div>
                      </div>
                    </div>
                    {test.aovLift && (
                      <div className="text-center p-2 bg-purple-50 rounded-lg">
                        <span className="text-sm text-purple-700 font-medium">
                          +{test.aovLift}% AOV increase
                        </span>
                      </div>
                    )}
                    <p className="text-xs text-gray-400 text-center mt-2">
                      Sample size: {test.sampleSize.toLocaleString()} visitors
                    </p>
                  </div>

                  {/* Insight */}
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">Insight</p>
                        <p className="text-sm text-gray-600">{test.insight}</p>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <p className="text-sm text-blue-800 mb-2">{test.recommendation}</p>
                      <a
                        href={test.recommendedAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        Try {test.recommendedApp}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
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
