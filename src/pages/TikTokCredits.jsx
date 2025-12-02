import React from 'react';
import { ExternalLink, TrendingUp, Zap, CheckCircle2, ArrowRight, DollarSign, Target, Users } from 'lucide-react';

export default function TikTokCredits() {
  const benefits = [
    'Scale faster with up to $6,000 in free ad spend',
    'Test multiple campaigns without upfront risk',
    'Access TikTok\'s massive engaged audience',
    'Professional ad account setup included',
    'Priority support from TikTok\'s growth team'
  ];

  const steps = [
    {
      title: 'Click the Button Below',
      description: 'Start your application through our exclusive partnership link'
    },
    {
      title: 'Complete the Form',
      description: 'Fill in your business details and contact information'
    },
    {
      title: 'Get Approved',
      description: 'TikTok reviews your application (usually within 48 hours)'
    },
    {
      title: 'Start Advertising',
      description: 'Launch campaigns with your credit instantly'
    }
  ];

  const creditTiers = [
    {
      spend: '$2,000',
      credit: '$1,000',
      color: '#06B6D4',
      bgColor: '#F0F9FF'
    },
    {
      spend: '$5,000',
      credit: '$3,000',
      color: '#8B5CF6',
      bgColor: '#FAF5FF'
    },
    {
      spend: '$10,000',
      credit: '$6,000',
      color: '#EC4899',
      bgColor: '#FDF2F8',
      featured: true
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-5xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
               style={{ background: '#DCFCE7', border: '1px solid #BBF7D0' }}>
            <span className="text-sm font-semibold" style={{ color: '#16A34A' }}>EXCLUSIVE PARTNERSHIP OFFER</span>
          </div>

          <h1 className="text-5xl font-bold mb-4" style={{ 
            color: '#1E1E1E',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '-0.02em'
          }}>
            Get Up to $6,000 in Free TikTok Ads Credit
          </h1>
          
          <p className="text-xl mb-8" style={{ color: '#6B7280', maxWidth: '700px', margin: '0 auto 32px' }}>
            💡 Scale faster with up to $6,000 in free TikTok ad credits.<br/>
            Unlock your tier, launch instantly, and get priority support from TikTok's internal growth team.
          </p>

          <a
            href="https://getstarted.tiktok.com/quantum-scale-partnership"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all"
            style={{
              background: 'linear-gradient(135deg, #007DFF 0%, #00A8FF 100%)',
              color: '#FFFFFF',
              boxShadow: '0 4px 16px rgba(0, 125, 255, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 125, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 125, 255, 0.3)';
            }}
          >
            <TrendingUp className="w-6 h-6" />
            Claim Your Credit Now
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        {/* Credit Tiers - Clean & Minimal */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-3 text-center" style={{ 
            color: '#1E1E1E', 
            fontFamily: 'Poppins, sans-serif' 
          }}>
            Unlock Your Tier
          </h2>
          <p className="text-center mb-8" style={{ color: '#6B7280' }}>
            The more you invest, the more credit you receive. Choose your path to scale.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {creditTiers.map((tier, idx) => (
              <div
                key={idx}
                className="relative p-8 rounded-2xl transition-all duration-300 cursor-pointer"
                style={{
                  background: tier.bgColor,
                  border: `2px solid ${tier.color}20`,
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                  transform: tier.featured ? 'scale(1.05)' : 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = tier.featured ? 'scale(1.08)' : 'scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = tier.featured ? 'scale(1.05)' : 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.04)';
                }}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                       style={{ background: tier.color, color: '#FFFFFF' }}>
                    MOST POPULAR
                  </div>
                )}
                
                <div className="text-center">
                  <div className="mb-4">
                    <Target className="w-12 h-12 mx-auto" style={{ color: tier.color }} />
                  </div>
                  
                  <div className="text-sm font-semibold mb-2" style={{ color: '#6B7280' }}>
                    Spend
                  </div>
                  <div className="text-4xl font-bold mb-6" style={{ color: tier.color }}>
                    {tier.spend}
                  </div>
                  
                  <div className="text-sm font-semibold mb-2" style={{ color: '#6B7280' }}>
                    Get
                  </div>
                  <div className="text-5xl font-bold mb-2" style={{ color: tier.color }}>
                    {tier.credit}
                  </div>
                  <div className="text-sm" style={{ color: '#6B7280' }}>
                    Free Ad Credit
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div 
            className="p-8 rounded-2xl text-center transition-all duration-300 cursor-pointer"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
            }}
          >
            <DollarSign className="w-10 h-10 mx-auto mb-3" style={{ color: '#3B82F6' }} />
            <div className="text-5xl font-bold mb-2" style={{ color: '#3B82F6' }}>
              $6,000
            </div>
            <div className="text-sm font-medium" style={{ color: '#6B7280' }}>
              Maximum Free Credit
            </div>
          </div>

          <div 
            className="p-8 rounded-2xl text-center transition-all duration-300 cursor-pointer"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
            }}
          >
            <Zap className="w-10 h-10 mx-auto mb-3" style={{ color: '#8B5CF6' }} />
            <div className="text-5xl font-bold mb-2" style={{ color: '#8B5CF6' }}>
              48h
            </div>
            <div className="text-sm font-medium" style={{ color: '#6B7280' }}>
              Fast Approval Time
            </div>
          </div>

          <div 
            className="p-8 rounded-2xl text-center transition-all duration-300 cursor-pointer"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
            }}
          >
            <Users className="w-10 h-10 mx-auto mb-3" style={{ color: '#10B981' }} />
            <div className="text-5xl font-bold mb-2" style={{ color: '#10B981' }}>
              1B+
            </div>
            <div className="text-sm font-medium" style={{ color: '#6B7280' }}>
              Active TikTok Users
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#1E1E1E', fontFamily: 'Poppins, sans-serif' }}>
            Why This Changes Everything
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 p-5 rounded-xl transition-all duration-300"
                   style={{
                     background: '#FFFFFF',
                     border: '1px solid #E5E7EB',
                     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'translateX(4px)';
                     e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'translateX(0)';
                     e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                   }}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                     style={{ background: '#DCFCE7' }}>
                  <CheckCircle2 className="w-4 h-4" style={{ color: '#16A34A' }} />
                </div>
                <span className="font-medium" style={{ color: '#1E1E1E' }}>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: '#1E1E1E', fontFamily: 'Poppins, sans-serif' }}>
            How to Get Started
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="p-6 rounded-2xl text-center h-full transition-all duration-300"
                     style={{
                       background: '#FFFFFF',
                       border: '1px solid #E5E7EB',
                       boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.transform = 'translateY(-4px)';
                       e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.transform = 'translateY(0)';
                       e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                     }}
                >
                  <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold"
                       style={{ background: '#EFF6FF', color: '#3B82F6' }}>
                    {idx + 1}
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: '#1E1E1E' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm" style={{ color: '#6B7280' }}>
                    {step.description}
                  </p>
                </div>
                
                {idx < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10"
                              style={{ color: '#D1D5DB' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA - Clean & Minimal */}
        <div className="p-12 rounded-2xl text-center" style={{
          background: '#00C897',
          boxShadow: '0 4px 20px rgba(0, 200, 151, 0.2)'
        }}>
          <Zap className="w-14 h-14 mx-auto mb-6 text-white" />
          <h2 className="text-4xl font-bold mb-4 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Don't Miss This Opportunity
          </h2>
          <p className="text-lg mb-8 text-white opacity-95" style={{ maxWidth: '600px', margin: '0 auto 32px' }}>
            This exclusive offer won't last forever. Claim your credit tier today and start scaling with TikTok's most powerful audience.
          </p>
          <a
            href="https://getstarted.tiktok.com/quantum-scale-partnership"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg transition-all"
            style={{
              background: '#FFFFFF',
              color: '#00C897',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
          >
            Get Started Now
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}