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
    { icon: Zap, title: 'Lightning-Fast Performance', description: 'Optimized code for instant page loads and superior Core Web Vitals scores' },
    { icon: TrendingUp, title: 'Conversion-First Design', description: 'Every section, layout, and interaction engineered to maximize sales' },
    { icon: Target, title: '100+ Premium Sections', description: 'Pre-built, conversion-tested sections ready to use out of the box' },
    { icon: Star, title: 'Built-in Apps', description: 'Save $50-100/month with integrated upsells, reviews, and more' }
  ];

  const testimonials: Testimonial[] = [
    { image: 'https://shrine.io/cdn/shop/files/9a_4554b58e-d3e9-4fda-96af-69dff22b8360.png?v=1739860052&width=1000', alt: 'Customer testimonial showing conversion improvement' },
    { image: 'https://shrine.io/cdn/shop/files/10a_1a0452ea-1075-44b0-8525-fee0d10fa7a8.png?v=1739860055&width=1000', alt: 'Customer testimonial showing revenue growth' },
    { image: 'https://shrine.io/cdn/shop/files/12a.png?v=1739860067&width=1000', alt: 'Customer testimonial showing sales increase' },
    { image: 'https://shrine.io/cdn/shop/files/2a.png?v=1739860003&width=1000', alt: 'Customer success story' },
    { image: 'https://shrine.io/cdn/shop/files/6a_f90e9089-8424-42aa-8e38-45338769b37d.png?v=1739860032&width=1000', alt: 'Customer testimonial' },
    { image: 'https://shrine.io/cdn/shop/files/1a_b633c2b7-cd9d-4870-98e5-269ce12dfadd.png?v=1739859993&width=1000', alt: 'Customer feedback' },
    { image: 'https://shrine.io/cdn/shop/files/5a_77d4e126-b35d-4e51-8476-ba13d8ddb530.png?v=1760274017&width=1000', alt: 'Customer results' },
    { image: 'https://shrine.io/cdn/shop/files/11a_4036dc55-ab53-4232-abb0-08e1cd0abffd.png?v=1739860059&width=1000', alt: 'Customer testimonial with metrics' }
  ];

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: '#FEF3C7', border: '1px solid #FDE68A' }}>
            <Star className="w-4 h-4" style={{ color: '#F59E0B' }} />
            <span className="text-sm font-semibold" style={{ color: '#D97706' }}>EXCLUSIVE PARTNERSHIP</span>
          </div>
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#1E1E1E', fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.02em' }}>Shrine × Quantum Scale</h1>
          <p className="text-xl mb-4" style={{ color: '#6B7280', maxWidth: '800px', margin: '0 auto 16px' }}>The world's highest-converting Shopify theme - now with an exclusive 20% discount</p>
          <p className="text-lg mb-10" style={{ color: '#6B7280', maxWidth: '900px', margin: '0 auto 40px' }}>We've partnered with Shrine to bring you the most powerful eCommerce theme on the market. Trusted by top brands worldwide, Shrine combines blazing speed, conversion psychology, and premium design in one elegant package.</p>

          {/* Coupon Box */}
          <div className="p-6 rounded-2xl mb-8 max-w-2xl mx-auto" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#1E1E1E' }}>Your Exclusive Discount Code</h3>
            <p className="mb-4 text-sm" style={{ color: '#6B7280' }}><strong>IMPORTANT:</strong> You must install through our link below to use this coupon</p>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="px-6 py-3 rounded-xl flex items-center gap-3" style={{ background: '#EFF6FF', border: '2px solid #3B82F6' }}>
                <code className="text-2xl font-bold tracking-wider" style={{ color: '#3B82F6' }}>QUANTUMSCALE</code>
                <button onClick={handleCopyCoupon} className="p-2 rounded-lg transition-all" style={{ background: copiedCoupon ? '#DCFCE7' : '#FFFFFF', border: '1px solid ' + (copiedCoupon ? '#10B981' : '#E5E7EB') }}>
                  {copiedCoupon ? <Check className="w-4 h-4" style={{ color: '#10B981' }} /> : <Copy className="w-4 h-4" style={{ color: '#3B82F6' }} />}
                </button>
              </div>
            </div>
            <a href="https://shrinesolutions.com/?ref=0d9fe741" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 text-base font-bold rounded-xl transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', color: '#FFFFFF', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}>
              GET SHRINE WITH 20% OFF <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="p-10 rounded-2xl mb-16" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: '#1E1E1E', fontFamily: 'Poppins, sans-serif' }}>Why Shrine is the Best Theme for Scaling</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="p-6 rounded-xl transition-all duration-300 hover:bg-blue-50 hover:border-blue-500" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#EFF6FF', border: '1px solid #DBEAFE' }}>
                    <benefit.icon className="w-6 h-6" style={{ color: '#3B82F6' }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2" style={{ color: '#1E1E1E' }}>{benefit.title}</h3>
                    <p style={{ color: '#6B7280' }}>{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="p-10 rounded-2xl mb-16" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <h2 className="text-3xl font-bold mb-4 text-center" style={{ color: '#1E1E1E', fontFamily: 'Poppins, sans-serif' }}>Real Results from Shrine Users</h2>
          <p className="text-center mb-10" style={{ color: '#6B7280' }}>These are actual screenshots from the Shrine community showing measurable improvements</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
                <img src={testimonial.image} alt={testimonial.alt} className="w-full h-auto" style={{ display: 'block' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="p-10 rounded-2xl max-w-3xl mx-auto" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
            <h3 className="text-3xl font-bold mb-4" style={{ color: '#1E1E1E', fontFamily: 'Poppins, sans-serif' }}>We personally use Shrine for all our eCommerce stores</h3>
            <p className="mb-8 text-lg" style={{ color: '#6B7280' }}>That's why we secured an exclusive 20% discount for you. Simply install through our link and use code <strong style={{ color: '#3B82F6' }}>QUANTUMSCALE</strong> at checkout.</p>
            <a href="https://shrinesolutions.com/?ref=0d9fe741" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-4 text-lg font-bold rounded-xl transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', color: '#FFFFFF', boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)' }}>
              Install Shrine <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
