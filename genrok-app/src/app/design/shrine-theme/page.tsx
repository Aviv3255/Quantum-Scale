'use client';

import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Target, Zap, TrendingUp, Star, LucideIcon } from 'lucide-react';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface Testimonial {
  image: string;
  alt: string;
}

export default function ShrineTheme() {
  const [copiedCoupon, setCopiedCoupon] = useState<boolean>(false);

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('QUANTUMSCALE');
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2000);
  };

  const benefits: Benefit[] = [
    {
      icon: Zap,
      title: 'Lightning-Fast Performance',
      description: 'Optimized code for instant page loads and superior Core Web Vitals scores',
    },
    {
      icon: TrendingUp,
      title: 'Conversion-First Design',
      description: 'Every section, layout, and interaction engineered to maximize sales',
    },
    {
      icon: Target,
      title: '100+ Premium Sections',
      description: 'Pre-built, conversion-tested sections ready to use out of the box',
    },
    {
      icon: Star,
      title: 'Built-in Apps',
      description: 'Save $50-100/month with integrated upsells, reviews, and more',
    },
  ];

  const testimonials: Testimonial[] = [
    {
      image:
        'https://shrine.io/cdn/shop/files/9a_4554b58e-d3e9-4fda-96af-69dff22b8360.png?v=1739860052&width=1000',
      alt: 'Customer testimonial showing conversion improvement',
    },
    {
      image:
        'https://shrine.io/cdn/shop/files/10a_1a0452ea-1075-44b0-8525-fee0d10fa7a8.png?v=1739860055&width=1000',
      alt: 'Customer testimonial showing revenue growth',
    },
    {
      image: 'https://shrine.io/cdn/shop/files/12a.png?v=1739860067&width=1000',
      alt: 'Customer testimonial showing sales increase',
    },
    {
      image: 'https://shrine.io/cdn/shop/files/2a.png?v=1739860003&width=1000',
      alt: 'Customer success story',
    },
    {
      image:
        'https://shrine.io/cdn/shop/files/6a_f90e9089-8424-42aa-8e38-45338769b37d.png?v=1739860032&width=1000',
      alt: 'Customer testimonial',
    },
    {
      image:
        'https://shrine.io/cdn/shop/files/1a_b633c2b7-cd9d-4870-98e5-269ce12dfadd.png?v=1739859993&width=1000',
      alt: 'Customer feedback',
    },
    {
      image:
        'https://shrine.io/cdn/shop/files/5a_77d4e126-b35d-4e51-8476-ba13d8ddb530.png?v=1760274017&width=1000',
      alt: 'Customer results',
    },
    {
      image:
        'https://shrine.io/cdn/shop/files/11a_4036dc55-ab53-4232-abb0-08e1cd0abffd.png?v=1739860059&width=1000',
      alt: 'Customer testimonial with metrics',
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="mx-auto max-w-7xl p-6">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{ background: '#FEF3C7', border: '1px solid #FDE68A' }}
          >
            <Star className="h-4 w-4" style={{ color: '#F59E0B' }} />
            <span className="text-sm font-semibold" style={{ color: '#D97706' }}>
              EXCLUSIVE PARTNERSHIP
            </span>
          </div>
          <h1
            className="mb-4 text-5xl font-bold"
            style={{
              color: '#1E1E1E',
              fontFamily: 'Poppins, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            Shrine × Quantum Scale
          </h1>
          <p
            className="mb-4 text-xl"
            style={{ color: '#6B7280', maxWidth: '800px', margin: '0 auto 16px' }}
          >
            The world's highest-converting Shopify theme - now with an exclusive 20% discount
          </p>
          <p
            className="mb-10 text-lg"
            style={{ color: '#6B7280', maxWidth: '900px', margin: '0 auto 40px' }}
          >
            We've partnered with Shrine to bring you the most powerful eCommerce theme on the
            market. Trusted by top brands worldwide, Shrine combines blazing speed, conversion
            psychology, and premium design in one elegant package.
          </p>

          {/* Coupon Box */}
          <div
            className="mx-auto mb-8 max-w-2xl rounded-2xl p-6"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            }}
          >
            <h3 className="mb-3 text-xl font-bold" style={{ color: '#1E1E1E' }}>
              Your Exclusive Discount Code
            </h3>
            <p className="mb-4 text-sm" style={{ color: '#6B7280' }}>
              <strong>IMPORTANT:</strong> You must install through our link below to use this coupon
            </p>
            <div className="mb-4 flex items-center justify-center gap-3">
              <div
                className="flex items-center gap-3 rounded-xl px-6 py-3"
                style={{ background: '#EFF6FF', border: '2px solid #3B82F6' }}
              >
                <code className="text-2xl font-bold tracking-wider" style={{ color: '#3B82F6' }}>
                  QUANTUMSCALE
                </code>
                <button
                  onClick={handleCopyCoupon}
                  className="rounded-lg p-2 transition-all"
                  style={{
                    background: copiedCoupon ? '#DCFCE7' : '#FFFFFF',
                    border: '1px solid ' + (copiedCoupon ? '#10B981' : '#E5E7EB'),
                  }}
                >
                  {copiedCoupon ? (
                    <Check className="h-4 w-4" style={{ color: '#10B981' }} />
                  ) : (
                    <Copy className="h-4 w-4" style={{ color: '#3B82F6' }} />
                  )}
                </button>
              </div>
            </div>
            <a
              href="https://shrinesolutions.com/?ref=0d9fe741"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-3 text-base font-bold transition-all hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                color: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              }}
            >
              GET SHRINE WITH 20% OFF <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Benefits Section */}
        <div
          className="mb-16 rounded-2xl p-10"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          }}
        >
          <h2
            className="mb-10 text-center text-3xl font-bold"
            style={{ color: '#1E1E1E', fontFamily: 'Poppins, sans-serif' }}
          >
            Why Shrine is the Best Theme for Scaling
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="rounded-xl p-6 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50"
                style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: '#EFF6FF', border: '1px solid #DBEAFE' }}
                  >
                    <benefit.icon className="h-6 w-6" style={{ color: '#3B82F6' }} />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold" style={{ color: '#1E1E1E' }}>
                      {benefit.title}
                    </h3>
                    <p style={{ color: '#6B7280' }}>{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof Section */}
        <div
          className="mb-16 rounded-2xl p-10"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          }}
        >
          <h2
            className="mb-4 text-center text-3xl font-bold"
            style={{ color: '#1E1E1E', fontFamily: 'Poppins, sans-serif' }}
          >
            Real Results from Shrine Users
          </h2>
          <p className="mb-10 text-center" style={{ color: '#6B7280' }}>
            These are actual screenshots from the Shrine community showing measurable improvements
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.alt}
                  className="h-auto w-full"
                  style={{ display: 'block' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div
            className="mx-auto max-w-3xl rounded-2xl p-10"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            }}
          >
            <h3
              className="mb-4 text-3xl font-bold"
              style={{ color: '#1E1E1E', fontFamily: 'Poppins, sans-serif' }}
            >
              We personally use Shrine for all our eCommerce stores
            </h3>
            <p className="mb-8 text-lg" style={{ color: '#6B7280' }}>
              That's why we secured an exclusive 20% discount for you. Simply install through our
              link and use code <strong style={{ color: '#3B82F6' }}>QUANTUMSCALE</strong> at
              checkout.
            </p>
            <a
              href="https://shrinesolutions.com/?ref=0d9fe741"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl px-10 py-4 text-lg font-bold transition-all hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                color: '#FFFFFF',
                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
              }}
            >
              Install Shrine <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
