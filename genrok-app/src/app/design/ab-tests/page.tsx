'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface App {
  name: string;
  url: string;
}

interface Test {
  title: string;
  versionA: string;
  versionB: string;
  result: string;
  insight: string;
  apps: App[];
  image: string | null;
  niche: string;
}

const tests: Test[] = [
  {
    title: 'Product Page - Sticky "Add to Cart" on Mobile',
    versionA: 'No sticky button',
    versionB: 'Sticky "Add to Cart" button remains visible at bottom of screen',
    result: '+5.2% CVR',
    insight: 'Customers don\'t need to "scroll back to find the button". Constant availability maintains emotional momentum during scrolling.',
    apps: [
      { name: 'ABConvert', url: 'https://apps.shopify.com/a-b-convert-price-a-b-test?mref=aviv-azriel' },
      { name: 'Vitals', url: 'https://vitals.app/shopify/12548540' }
    ],
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/677ff53e14b1cae22104f133_sticky_atc.avif?v=1760274015',
    niche: 'Fashion & Apparel'
  },
  {
    title: 'Product Page - Adding "Best Seller" Tag',
    versionA: 'No tag',
    versionB: '"Best Seller" tag above product name',
    result: '+5.8% CVR',
    insight: 'Authority labeling acts as immediate social proof, increasing trust and the feeling of "I\'m choosing right".',
    apps: [
      { name: 'ABConvert', url: 'https://apps.shopify.com/a-b-convert-price-a-b-test?mref=aviv-azriel' },
      { name: 'Section Store', url: 'https://platform.shoffi.app/r/rl_WvFtTikK' }
    ],
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Screenshot_2025-10-12_160307.png?v=1760274209',
    niche: 'Beauty & Cosmetics'
  },
  {
    title: 'Product Page - Adding UGC Video Reviews',
    versionA: 'Text reviews only',
    versionB: 'Added short UGC videos (15-20 seconds)',
    result: '+28.9% CVR',
    insight: 'The brain believes eyes more than words. Authentic video = subconscious truth.',
    apps: [
      { name: 'ABConvert', url: 'https://apps.shopify.com/a-b-convert-price-a-b-test?mref=aviv-azriel' },
      { name: 'Section Store', url: 'https://platform.shoffi.app/r/rl_WvFtTikK' }
    ],
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/l5idxghcfemk0tlt1hp0phiqdsby_1.png?v=1760274329',
    niche: 'Electronics & Gadgets'
  },
  {
    title: 'Urgency Block - Countdown Timer on Homepage',
    versionA: 'No timer, text said "Until end of sale"',
    versionB: 'Timer showing "Offer ends in 02:59:00"',
    result: '+21.9% CVR',
    insight: 'A small difference that illustrates pressure and fear. FOMO is one of the strongest tools you can use.',
    apps: [
      { name: 'ABConvert', url: 'https://apps.shopify.com/a-b-convert-price-a-b-test?mref=aviv-azriel' },
      { name: 'Essential Countdown Timer', url: 'https://platform.shoffi.app/r/rl_6EEzhlj9' }
    ],
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-12_at_16.06.56_d3fbd0c5.jpg?v=1760274438',
    niche: 'Home & Living'
  },
  {
    title: 'Checkout Page - "Place Order" vs. "Complete Order"',
    versionA: 'Complete Order',
    versionB: 'Place Order',
    result: '+4.9% CVR',
    insight: 'Words affect decision processing. "Complete" sounds committing, "Place" feels light and pleasant.',
    apps: [
      { name: 'ABConvert', url: 'https://apps.shopify.com/a-b-convert-price-a-b-test?mref=aviv-azriel' }
    ],
    image: null,
    niche: 'Multi-Category'
  },
  {
    title: 'Homepage - Adding "Trusted by 10,000+ Customers"',
    versionA: 'No text',
    versionB: 'Text added above the Hero',
    result: '+4.3% CVR',
    insight: 'Social trust is psychological fuel. A simple sentence creates the feeling of "I\'m part of a successful community".',
    apps: [
      { name: 'ABConvert', url: 'https://apps.shopify.com/a-b-convert-price-a-b-test?mref=aviv-azriel' },
      { name: 'Section Store', url: 'https://platform.shoffi.app/r/rl_WvFtTikK' }
    ],
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/social-proof_1.jpg?v=1760274530',
    niche: 'Health & Wellness'
  },
  {
    title: 'Product Page - Adding Delivery Time Estimate Below "Buy Now"',
    versionA: 'No delivery time information',
    versionB: 'Added text "Estimated Delivery: 3-5 Business Days" below button',
    result: '+4.4% CVR',
    insight: 'The brain calms down when it knows "when it will arrive". Uncertainty is a psychological sales barrier – simple information removes fear and increases trust.',
    apps: [
      { name: 'ABConvert', url: 'https://apps.shopify.com/a-b-convert-price-a-b-test?mref=aviv-azriel' },
      { name: 'Section Store', url: 'https://platform.shoffi.app/r/rl_WvFtTikK' }
    ],
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/lx0yjsynussrs5rjk0gw2lco4joc.png?v=1760274580',
    niche: 'Sports & Fitness'
  },
  {
    title: 'Checkout Page - Adding Mastercard Logo',
    versionA: 'No credit card logos',
    versionB: 'Added Mastercard logo next to PayPal and Visa',
    result: '+6.74% Checkout Completion',
    insight: 'The brain seeks external confirmation for security. Displaying a familiar logo triggers the feeling of "known and safe" – like buying from a brand you know.',
    apps: [
      { name: 'ABConvert', url: 'https://apps.shopify.com/a-b-convert-price-a-b-test?mref=aviv-azriel' },
      { name: 'Essential Trust Badges', url: 'https://platform.shoffi.app/r/rl_uUHJkiZx' }
    ],
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Screenshot_2025-10-12_161029.png?v=1760274656',
    niche: 'Fashion & Accessories'
  },
  {
    title: 'Cart Page - Adding "Free Shipping Progress Bar"',
    versionA: 'No indication',
    versionB: 'Bar showing "You\'re $12 away from Free Shipping!"',
    result: '+8.3% Average Order Value',
    insight: 'When the customer sees a clear goal — they want to "beat the system". A psychological bar that drives additional purchase.',
    apps: [
      { name: 'ABConvert', url: 'https://apps.shopify.com/a-b-convert-price-a-b-test?mref=aviv-azriel' },
      { name: 'Essential Free Shipping Bar', url: 'https://platform.shoffi.app/r/rl_ScO0HCCU' }
    ],
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Screenshot_2025-10-12_161222.png?v=1760274770',
    niche: 'Pet Supplies'
  }
];

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
      <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                 style={{ background: '#F3E8FF', border: '1px solid #E9D5FF' }}>
              <Sparkles className="w-4 h-4" style={{ color: '#8B5CF6' }} />
              <span className="text-sm font-semibold" style={{ color: '#8B5CF6' }}>REAL DATA FROM REAL TESTS</span>
            </div>

            <h1 className="text-5xl font-bold mb-4" style={{
              color: '#1E1E1E',
              fontFamily: 'Poppins, sans-serif',
              letterSpacing: '-0.02em'
            }}>
              A/B Test Results - Real Data
            </h1>

            <p className="text-lg mb-6" style={{ color: '#6B7280', maxWidth: '900px' }}>
              These are actual results from A/B tests we&apos;ve run across our brands.
              We perform all A/B tests using ABConvert.
            </p>

            <div className="p-6 rounded-xl mb-4" style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}>
              <p className="mb-3" style={{ color: '#1E1E1E' }}>
                <strong>Want to run your own tests?</strong> Use code <strong style={{ color: '#3B82F6' }}>LASERCRO</strong> for 10% OFF ABConvert
              </p>
              <a
                href="https://apps.shopify.com/a-b-convert-price-a-b-test?mref=aviv-azriel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all text-sm hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}
              >
                Get ABConvert with 10% OFF
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="p-4 rounded-xl" style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}>
              <p style={{ color: '#6B7280' }}>
                We reveal all the secrets of psychological design that triggers impulse purchases in our course{' '}
                <a
                  href="https://quantum-scale.co/products/the-subconscious-switch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                  style={{ color: '#3B82F6' }}
                >
                  The Subconscious Trap
                </a>
              </p>
            </div>
          </div>

          {/* Test Results */}
          <div className="space-y-8">
            {tests.map((test, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden" style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}>
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Content Column */}
                  <div className="p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3" style={{ color: '#1E1E1E' }}>
                          {test.title}
                        </h3>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
                             style={{
                               background: '#DCFCE7',
                               border: '1px solid #BBF7D0',
                               color: '#16A34A'
                             }}>
                          <TrendingUp className="w-4 h-4" />
                          {test.result}
                        </div>
                      </div>
                      <span className="text-xs font-medium px-3 py-1.5 rounded-full ml-4"
                            style={{
                              background: '#EFF6FF',
                              color: '#3B82F6',
                              border: '1px solid #DBEAFE',
                              whiteSpace: 'nowrap'
                            }}>
                        {test.niche}
                      </span>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm" style={{ color: '#6B7280' }}>
                          VERSION A (Control)
                        </h4>
                        <p style={{ color: '#1E1E1E', lineHeight: '1.6' }}>{test.versionA}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-sm flex items-center gap-2" style={{ color: '#16A34A' }}>
                          <ArrowRight className="w-4 h-4" />
                          VERSION B (Winner)
                        </h4>
                        <p style={{ color: '#1E1E1E', lineHeight: '1.6' }}>{test.versionB}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-sm" style={{ color: '#3B82F6' }}>
                          PSYCHOLOGICAL INSIGHT
                        </h4>
                        <p className="italic" style={{ color: '#6B7280', lineHeight: '1.6' }}>&quot;{test.insight}&quot;</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-sm" style={{ color: '#3B82F6' }}>
                          APPS USED
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {test.apps.map((app, i) => (
                            <a
                              key={i}
                              href={app.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                              style={{
                                background: '#EFF6FF',
                                border: '1px solid #DBEAFE',
                                color: '#3B82F6'
                              }}
                            >
                              {app.name}
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image Column */}
                  {test.image && (
                    <div className="relative flex items-center justify-center p-4" style={{ background: '#F9FAFB' }}>
                      <img
                        src={test.image}
                        alt={test.title}
                        className="w-full h-auto object-contain"
                        style={{ maxHeight: '600px', borderRadius: '12px' }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center p-8 rounded-2xl" style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}>
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#1E1E1E' }}>
              Want to Master Conversion Psychology?
            </h3>
            <p className="mb-6" style={{ color: '#6B7280' }}>
              Learn the psychological triggers that turn visitors into buyers
            </p>
            <a
              href="https://quantum-scale.co/products/the-subconscious-switch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                color: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
            >
              GET THE SUBCONSCIOUS TRAP COURSE
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
