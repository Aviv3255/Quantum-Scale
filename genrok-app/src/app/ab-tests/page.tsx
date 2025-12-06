'use client';

import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  ExternalLink,
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
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 105, 20, 0.08) 0%, rgba(139, 105, 20, 0.02) 50%, transparent 70%)',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(139, 105, 20, 0.08)', border: '1px solid rgba(139, 105, 20, 0.15)' }}
            >
              <BarChart3 className="w-4 h-4" style={{ color: '#8b6914' }} strokeWidth={1.5} />
              <span className="text-sm font-medium" style={{ color: '#8b6914' }}>Real Data</span>
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
            >
              <span style={{ color: '#8b6914' }}>A/B Test</span> Results
            </h1>
            <p className="text-xl" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
              Real results from real tests. See what actually moves the needle for conversion rates and AOV.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Tests Grid */}
      <section className="py-16" style={{ background: '#fdf6e3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {abTests.map((test) => (
              <StaggerItem key={test.id}>
                <div
                  className="bg-white rounded-2xl overflow-hidden transition-all"
                  style={{ border: '1px solid rgba(0, 0, 0, 0.06)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Header */}
                  <div className="p-6" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(139, 105, 20, 0.1)', color: '#8b6914' }}
                    >
                      {test.category}
                    </span>
                    <h3
                      className="text-xl font-bold mt-3"
                      style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
                    >
                      {test.title}
                    </h3>
                  </div>

                  {/* Results */}
                  <div className="p-6" style={{ background: 'rgba(253, 246, 227, 0.5)' }}>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-sm mb-1" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>Control</p>
                        <p className="text-2xl font-bold" style={{ color: '#2c1810' }}>{test.controlCvr}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm mb-1" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>Variant</p>
                        <p className="text-2xl font-bold" style={{ color: '#22c55e' }}>{test.variantCvr}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm mb-1" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>Lift</p>
                        <div className="flex items-center justify-center gap-1">
                          {test.lift > 0 ? (
                            <TrendingUp className="w-5 h-5" style={{ color: '#22c55e' }} strokeWidth={1.5} />
                          ) : (
                            <TrendingDown className="w-5 h-5" style={{ color: 'rgba(44, 24, 16, 0.4)' }} strokeWidth={1.5} />
                          )}
                          <p
                            className="text-2xl font-bold"
                            style={{ color: test.lift > 0 ? '#22c55e' : 'rgba(44, 24, 16, 0.5)' }}
                          >
                            {test.lift > 0 ? '+' : ''}{test.lift}%
                          </p>
                        </div>
                      </div>
                    </div>
                    {test.aovLift && (
                      <div
                        className="text-center p-2 rounded-lg"
                        style={{ background: 'rgba(139, 105, 20, 0.1)' }}
                      >
                        <span className="text-sm font-medium" style={{ color: '#8b6914' }}>
                          +{test.aovLift}% AOV increase
                        </span>
                      </div>
                    )}
                    <p className="text-xs text-center mt-2" style={{ color: 'rgba(44, 24, 16, 0.4)' }}>
                      Sample size: {test.sampleSize.toLocaleString()} visitors
                    </p>
                  </div>

                  {/* Insight */}
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8b6914' }} strokeWidth={1.5} />
                      <div>
                        <p
                          className="text-sm font-medium mb-1"
                          style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
                        >
                          Insight
                        </p>
                        <p className="text-sm" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>{test.insight}</p>
                      </div>
                    </div>
                    <div
                      className="p-3 rounded-xl"
                      style={{ background: 'rgba(139, 105, 20, 0.08)' }}
                    >
                      <p className="text-sm mb-2" style={{ color: '#2c1810' }}>{test.recommendation}</p>
                      <a
                        href={test.recommendedAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium transition-colors"
                        style={{ color: '#8b6914' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#2c1810';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#8b6914';
                        }}
                      >
                        Try {test.recommendedApp}
                        <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
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
