'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ExternalLink, TrendingUp, Info } from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  link?: string;
}

export default function ScaleChecklist() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const checklistItems: ChecklistItem[] = [
    {
      id: 'domain',
      title: 'Purchase Domain (.com/.co)',
      description: 'Get your professional domain name.',
    },
    {
      id: 'professional_email',
      title: 'Setup Professional Email',
      description: 'Create a business email under your domain.',
    },
    {
      id: 'email_to_shopify',
      title: 'Connect Email to Shopify',
      description: 'Link your professional email in Shopify settings.',
    },
    {
      id: 'footer_policies',
      title: 'Add Footer Policies',
      description: 'Add Shipping Policy, Terms of Service, Privacy Policy, and Refund Policy.',
    },
    {
      id: 'logo_transparent',
      title: 'Add Transparent Logo',
      description: 'Upload a professional logo with transparent background.',
    },
    { id: 'paypal', title: 'Connect PayPal', description: 'Enable PayPal payments.' },
    {
      id: 'credit_card',
      title: 'Connect Credit Card Processing',
      description: 'Enable credit card payments including Google Pay and Apple Pay.',
    },
    {
      id: 'test_purchase',
      title: 'Complete Test Purchase',
      description: 'Make a test order to ensure checkout works.',
    },
    {
      id: 'private_agent',
      title: 'Connect Private Agent',
      description: 'Get cheaper prices, branding options, 5-7 day shipping.',
      link: 'https://www.hypersku.com/campaign/optimize-dropshipping/?ref=nmmwogq',
    },
    {
      id: 'meta_verified',
      title: 'Enable Meta Verified',
      description: 'Get the blue verification badge on Facebook.',
    },
    {
      id: 'premium_theme',
      title: 'Install Premium Theme (Shrine)',
      description: 'Use code QUANTUMSCALE for 15% off.',
      link: 'https://shrinesolutions.com/?ref=0d9fe741',
    },
    {
      id: 'meta_pixel',
      title: 'Install Meta Pixel',
      description: 'Track conversions and optimize ads.',
    },
    {
      id: 'product_catalog',
      title: 'Build Quality Product Catalog',
      description: 'Add a wide, high-quality product selection.',
    },
    {
      id: 'klaviyo',
      title: 'Connect Klaviyo',
      description: 'Email marketing automation.',
      link: 'https://www.klaviyo.com/',
    },
    {
      id: 'coupon_blocker',
      title: 'Install Coupon Code Leak Blocker',
      description: 'Prevent unauthorized coupon sites.',
      link: 'https://platform.shoffi.app/r/rl_U2L0seLE',
    },
    {
      id: 'paypal_tracking',
      title: 'Auto PayPal Tracking Sync',
      description: 'Upload tracking numbers to PayPal.',
      link: 'https://platform.shoffi.app/r/rl_Fn8dZcAb',
    },
    {
      id: 'data_app',
      title: 'Install Data Monitoring App',
      description: 'Track customer segmentation and LTV.',
      link: 'https://apps.shopify.com/customer-lifetime-value?mref=lsbqcbva',
    },
    {
      id: 'triple_whale',
      title: 'Connect Triple Whale',
      description: 'Track 100% of conversions accurately.',
      link: 'https://triplewhale.com/',
    },
    {
      id: 'google_analytics',
      title: 'Install Google Analytics',
      description: 'Track traffic and user behavior.',
    },
    {
      id: 'post_purchase_survey',
      title: 'Install Post Purchase Survey',
      description: 'Understand where customers come from.',
      link: 'https://apps.shopify.com/grapevine?mref=lsbqcbva',
    },
    {
      id: 'abandoned_checkout_flow',
      title: 'Build 70%+ Abandoned Checkout Recovery Flow',
      description: 'Convert abandoned checkouts.',
    },
    {
      id: 'customer_1000_system',
      title: 'Install System That Turns Every Customer Into $1,000',
      description: 'Boost lifetime value.',
    },
    {
      id: 'sell_these_products',
      title: 'Upload Wide & Proven Product Catalog',
      description: 'Add proven winning products.',
    },
    {
      id: 'facebook_posts',
      title: 'Post 3-5 Times on Facebook Business Page',
      description: 'Fill your page with engaging content.',
    },
    {
      id: 'psychological_design',
      title: 'Design Your Store With Design That Forces The Brain to Buy',
      description: 'Use psychological design principles.',
    },
    {
      id: 'cart_upsells',
      title: 'Install Cart Upsells',
      description: 'Add 8-12 general products priced at $20-50.',
      link: 'https://platform.shoffi.app/r/rl_cm697iNI',
    },
    {
      id: 'extreme_social_proof',
      title: 'Implement Extreme Social Proof',
      description: 'Master herd mentality.',
    },
    {
      id: 'product_order',
      title: 'Organize Products in The Right Order',
      description: 'Strategic product placement.',
    },
    {
      id: 'quiz_tactic',
      title: 'Implement The Quiz Tactic',
      description: 'Convert visitors on autopilot.',
    },
    {
      id: 'parity_rocket',
      title: 'Add Parity Rocket',
      description: 'Smart discount bar that auto-adjusts.',
      link: 'https://parityrocket.com/',
    },
    {
      id: 'ai_chatbot',
      title: 'Add AI Chatbot',
      description: 'Answer questions 24/7.',
      link: 'https://affiliate.tidio.com/d41qmpi2a46g',
    },
  ];

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('scale-checklist-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompleted(parsed);
      } catch (e) {
        console.error('Failed to load checklist progress:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever completed changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('scale-checklist-progress', JSON.stringify(completed));
    }
  }, [completed, isLoaded]);

  const toggleItem = (id: string) => {
    setCompleted((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const progress = (completed.length / checklistItems.length) * 100;

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="mx-auto max-w-4xl p-6">
        {/* Header */}
        <div className="mb-8">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{ background: '#DBEAFE', border: '1px solid #BFDBFE' }}
          >
            <TrendingUp className="h-4 w-4" style={{ color: '#3B82F6' }} />
            <span className="text-sm font-semibold" style={{ color: '#1E40AF' }}>
              Scale Your Business
            </span>
          </div>

          <h1
            className="mb-3 text-4xl font-bold"
            style={{
              color: '#1E1E1E',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Scale Checklist
          </h1>
          <p className="text-lg" style={{ color: '#6B7280' }}>
            Complete these 30 essential steps to scale your eCommerce business to new heights.
          </p>
        </div>

        {/* Progress Card */}
        <div
          className="mb-8 rounded-2xl p-6"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="font-semibold" style={{ color: '#1E1E1E' }}>
              Your Progress
            </span>
            <span className="text-2xl font-bold" style={{ color: '#3B82F6' }}>
              {completed.length} / {checklistItems.length}
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full" style={{ background: '#F3F4F6' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #3B82F6 0%, #2563EB 100%)',
              }}
            />
          </div>
          {completed.length === checklistItems.length && (
            <p className="mt-3 text-sm font-medium" style={{ color: '#10B981' }}>
              🎉 Congratulations! You've completed all scaling steps.
            </p>
          )}
        </div>

        {/* Checklist Items */}
        <div className="space-y-4">
          {checklistItems.map((item) => {
            const isComplete = completed.includes(item.id);
            return (
              <div
                key={item.id}
                className="rounded-2xl p-6 transition-all"
                style={{
                  background: '#FFFFFF',
                  border: `1px solid ${isComplete ? '#BFDBFE' : '#E5E7EB'}`,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  opacity: isComplete ? 0.75 : 1,
                }}
              >
                <div className="flex gap-4">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="mt-1 flex-shrink-0 transition-transform hover:scale-110"
                    aria-label={isComplete ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="h-6 w-6" style={{ color: '#3B82F6' }} />
                    ) : (
                      <Circle className="h-6 w-6" style={{ color: '#D1D5DB' }} />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <h3
                        className="text-lg font-bold"
                        style={{
                          color: '#1E1E1E',
                          textDecoration: isComplete ? 'line-through' : 'none',
                        }}
                      >
                        {item.title}
                      </h3>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 rounded-lg p-2 transition-all hover:bg-blue-50"
                          style={{ background: '#F9FAFB' }}
                          aria-label={`Visit ${item.title} link`}
                        >
                          <ExternalLink className="h-5 w-5" style={{ color: '#3B82F6' }} />
                        </a>
                      )}
                    </div>

                    <div className="flex items-start gap-2">
                      <Info className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: '#9CA3AF' }} />
                      <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion Card */}
        {completed.length === checklistItems.length && (
          <div
            className="mt-8 rounded-2xl p-8 text-center"
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
              boxShadow: '0 8px 24px rgba(59, 130, 246, 0.25)',
            }}
          >
            <div className="mb-4 text-6xl">🚀</div>
            <h2
              className="mb-3 text-3xl font-bold"
              style={{ color: '#FFFFFF', fontFamily: 'Poppins, sans-serif' }}
            >
              Ready to Scale!
            </h2>
            <p
              className="text-lg"
              style={{ color: '#DBEAFE', maxWidth: '500px', margin: '0 auto' }}
            >
              You've completed all the essential steps. Your business is now ready to scale to the
              next level!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
