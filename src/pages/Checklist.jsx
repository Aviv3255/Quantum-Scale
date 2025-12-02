import React, { useState } from 'react';
import { CheckCircle2, Circle, ExternalLink, Sparkles } from 'lucide-react';

export default function Checklist() {
  const [completed, setCompleted] = useState([]);

  const steps = [
    {
      id: 1,
      title: 'Install Your Website Policies',
      description: 'Set up legal and trust policies (Privacy, Terms, Refunds) to protect your business and build customer trust.',
      url: '#',
      note: ''
    },
    {
      id: 2,
      title: 'Register a .com or .co Domain',
      description: 'Secure your professional domain for credibility and better branding.',
      url: 'https://www.godaddy.com',
      note: 'Prefer .com - it performs best globally.'
    },
    {
      id: 3,
      title: 'Create an Email Under Your Domain',
      description: 'Set up a business email (e.g., support@yourbrand.com) for legitimacy and customer communication.',
      url: 'https://www.godaddy.com',
      note: ''
    },
    {
      id: 4,
      title: 'Install Coupon Blocker App',
      description: 'Prevent coupon extensions from stealing your profit margins.',
      url: 'https://platform.shoffi.app/r/rl_U2L0seLE',
      note: ''
    },
    {
      id: 5,
      title: 'Connect PayPal Payments',
      description: 'Enable customers to pay securely with PayPal - a must-have for global eCommerce.',
      url: '#',
      note: ''
    },
    {
      id: 6,
      title: 'Create a Stripe Account (Credit Card Processing)',
      description: 'Activate Stripe or a credit card processor to expand your payment options.',
      url: 'https://stripe.com',
      note: ''
    },
    {
      id: 7,
      title: 'Install the Shrine Theme',
      description: 'Apply a high-converting Shopify theme built for growth.',
      url: 'https://shrinesolutions.com/?ref=0d9fe741',
      note: 'Use code QUANTUMSCALE to receive 20% OFF.'
    },
    {
      id: 8,
      title: 'Open a Klaviyo Account & Connect It to Shopify',
      description: 'Start email automation and flows to boost lifetime value and repeat sales.',
      url: '#',
      note: ''
    },
    {
      id: 9,
      title: 'Connect a Sourcing Agent to Your Store',
      description: 'Work with an advanced fulfillment partner to automate order processing.',
      url: 'https://www.hypersku.com/campaign/optimize-dropshipping/?ref=nmmwogq',
      note: ''
    }
  ];

  const toggleStep = (id) => {
    setCompleted(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const progress = (completed.length / steps.length) * 100;

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
               style={{ background: '#FEF3C7', border: '1px solid #FDE68A' }}>
            <Sparkles className="w-4 h-4" style={{ color: '#F59E0B' }} />
            <span className="text-sm font-semibold" style={{ color: '#D97706' }}>Launch Steps to Go Live 🚀</span>
          </div>

          <h1 className="text-4xl font-bold mb-3" style={{ 
            color: '#1E1E1E',
            fontFamily: 'Poppins, sans-serif'
          }}>
            Your Store Setup Checklist
          </h1>
          <p className="text-lg" style={{ color: '#6B7280' }}>
            Follow each step to activate your full earning potential and launch with confidence.
          </p>
        </div>

        {/* Progress Card */}
        <div className="p-6 rounded-2xl mb-8" style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}>
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold" style={{ color: '#1E1E1E' }}>Your Progress</span>
            <span className="text-2xl font-bold" style={{ color: '#3B82F6' }}>
              {completed.length} / {steps.length}
            </span>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: '#F3F4F6' }}>
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #3B82F6 0%, #2563EB 100%)'
              }}
            />
          </div>
          {completed.length === steps.length && (
            <p className="text-sm mt-3 font-medium" style={{ color: '#10B981' }}>
              🎉 All done! Your store is ready to scale.
            </p>
          )}
        </div>

        {/* Checklist Items */}
        <div className="space-y-4">
          {steps.map((step) => {
            const isComplete = completed.includes(step.id);
            return (
              <div
                key={step.id}
                className="p-6 rounded-2xl transition-all"
                style={{
                  background: '#FFFFFF',
                  border: `1px solid ${isComplete ? '#BFDBFE' : '#E5E7EB'}`,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  opacity: isComplete ? 0.75 : 1
                }}
              >
                <div className="flex gap-4">
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="flex-shrink-0 mt-1 transition-transform hover:scale-110"
                  >
                    {isComplete ? (
                      <CheckCircle2 className="w-6 h-6" style={{ color: '#3B82F6' }} />
                    ) : (
                      <Circle className="w-6 h-6" style={{ color: '#D1D5DB' }} />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 
                        className="text-lg font-bold"
                        style={{ 
                          color: '#1E1E1E',
                          textDecoration: isComplete ? 'line-through' : 'none'
                        }}
                      >
                        {step.title}
                      </h3>
                      {step.url !== '#' && (
                        <a
                          href={step.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 p-2 rounded-lg transition-all"
                          style={{ background: '#F9FAFB' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#EFF6FF';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#F9FAFB';
                          }}
                        >
                          <ExternalLink className="w-5 h-5" style={{ color: '#3B82F6' }} />
                        </a>
                      )}
                    </div>
                    
                    <p className="mb-3 text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                      {step.description}
                    </p>
                    
                    {step.note && (
                      <div 
                        className="text-sm p-3 rounded-xl"
                        style={{ 
                          background: '#FEF3C7',
                          borderLeft: '3px solid #F59E0B',
                          color: '#92400E'
                        }}
                      >
                        <strong>Pro tip:</strong> {step.note}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion Card */}
        {completed.length === steps.length && (
          <div 
            className="p-8 rounded-2xl mt-8 text-center"
            style={{ 
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25)'
            }}
          >
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#FFFFFF', fontFamily: 'Poppins, sans-serif' }}>
              Setup Complete!
            </h2>
            <p className="text-lg" style={{ color: '#D1FAE5', maxWidth: '500px', margin: '0 auto' }}>
              Your store is now fully optimized and ready to scale. Time to drive traffic and make sales!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}