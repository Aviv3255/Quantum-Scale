'use client';

import { motion } from 'framer-motion';
import { Layers, CheckCircle2, Shield, Star, Users, Zap, ArrowRight, ShoppingCart, Award, Clock } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

const sectionTypes = [
  {
    id: 1,
    name: 'Hero Section',
    category: 'Above the Fold',
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
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
    color: 'from-green-500 to-emerald-500',
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
    color: 'from-yellow-500 to-orange-500',
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
    color: 'from-blue-500 to-cyan-500',
    description: 'Highlight key product benefits in an easy-to-scan format. Focus on benefits, not features.',
    tips: [
      'Lead with benefits, not specs',
      'Use icons for visual interest',
      '3-6 features is optimal',
      'Keep descriptions short',
    ],
    features: [
      { icon: 'Zap', title: 'Fast Shipping', desc: '2-day delivery' },
      { icon: 'Shield', title: 'Guaranteed', desc: '30-day returns' },
      { icon: 'Star', title: 'Top Rated', desc: '4.9/5 stars' },
    ],
  },
  {
    id: 5,
    name: 'Comparison Table',
    category: 'Product Info',
    icon: Award,
    color: 'from-indigo-500 to-purple-500',
    description: 'Show why your product is better than alternatives. Use checkmarks and X marks for clarity.',
    tips: [
      'Compare to known alternatives',
      'Highlight your advantages',
      'Keep it honest and fair',
      'Include price comparison',
    ],
    comparison: {
      yours: ['Premium Materials', 'Free Shipping', '30-Day Trial', 'Lifetime Warranty'],
      theirs: ['Basic Materials', 'Paid Shipping', 'No Trial', '1-Year Warranty'],
    },
  },
  {
    id: 6,
    name: 'Urgency Bar',
    category: 'Conversion',
    icon: Clock,
    color: 'from-red-500 to-pink-500',
    description: 'Create FOMO with limited-time offers or low stock warnings. Use sparingly and honestly.',
    tips: [
      'Use real scarcity only',
      'Show countdown timers',
      'Display stock levels',
      'Offer flash sales',
    ],
    urgencyText: 'Only 3 left in stock - Order within 2:34:56 for same-day shipping',
  },
  {
    id: 7,
    name: 'FAQ Accordion',
    category: 'Objection Handling',
    icon: Users,
    color: 'from-teal-500 to-cyan-500',
    description: 'Address common objections before they become barriers. Place near the add-to-cart button.',
    tips: [
      'Answer real customer questions',
      'Address shipping and returns',
      'Include sizing/fit info',
      'Cover payment options',
    ],
    faqs: [
      'How long does shipping take?',
      'What is your return policy?',
      'Is this product right for me?',
    ],
  },
  {
    id: 8,
    name: 'Add to Cart Section',
    category: 'Conversion',
    icon: ShoppingCart,
    color: 'from-green-500 to-teal-500',
    description: 'The most critical section. Make buying effortless with clear pricing and prominent buttons.',
    tips: [
      'Show clear pricing',
      'Display payment options',
      'Add quantity selector',
      'Include trust elements nearby',
    ],
    elements: ['Price Display', 'Variant Selector', 'Quantity Picker', 'Add to Cart Button', 'Payment Icons'],
  },
];

export default function SectionsPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <Layers className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Section Designs</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">High-Converting</span> Sections
            </h1>
            <p className="text-xl text-gray-600">
              Every section on your product page has a job. Learn which sections drive conversions
              and how to optimize them for maximum impact.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {sectionTypes.map((section) => (
              <StaggerItem key={section.id}>
                <div className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all overflow-hidden h-full">
                  {/* Header */}
                  <div className={`p-6 bg-gradient-to-br ${section.color}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <section.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{section.name}</h3>
                        <span className="text-white/80 text-sm">{section.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-6">{section.description}</p>

                    {/* Tips */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Best Practices:</h4>
                      <ul className="space-y-2">
                        {section.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Example Preview */}
                    {section.example && (
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <p className="text-xs text-gray-500 mb-2">Example:</p>
                        <p className="font-bold text-gray-900">{section.example.headline}</p>
                        <p className="text-sm text-gray-600 mt-1">{section.example.subheadline}</p>
                        <button className="mt-3 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg">
                          {section.example.cta}
                        </button>
                      </div>
                    )}

                    {section.badges && (
                      <div className="flex flex-wrap gap-2">
                        {section.badges.map((badge, i) => (
                          <span key={i} className="text-xs font-medium px-3 py-1.5 bg-green-50 text-green-700 rounded-full flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}

                    {section.testimonial && (
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="flex gap-1 mb-2">
                          {[...Array(section.testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-700 italic text-sm">"{section.testimonial.quote}"</p>
                        <p className="text-gray-900 font-medium mt-2 text-sm">{section.testimonial.author}</p>
                        <p className="text-gray-500 text-xs">{section.testimonial.title}</p>
                      </div>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Product Page?</h2>
            <p className="text-gray-600 mb-8">
              Implement these sections in the right order and watch your conversion rate climb.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/ab-tests"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                See A/B Test Results
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/learn"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-gray-200 text-gray-900 font-semibold rounded-xl hover:bg-gray-50 transition-all"
              >
                Read CRO Guides
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
