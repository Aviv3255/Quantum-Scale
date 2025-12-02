import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { ArrowRight, Package, TrendingUp, DollarSign } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState('');
  const [fulfillmentMethod, setFulfillmentMethod] = useState('');
  const [monthlyRevenue, setMonthlyRevenue] = useState('');

  const handleNext = () => {
    if (step === 1 && businessType) {
      if (businessType === 'dropshipping') {
        setStep(2);
      } else {
        setStep(3);
      }
    } else if (step === 2 && fulfillmentMethod) {
      setStep(3);
    }
  };

  const handleComplete = async () => {
    if (!monthlyRevenue) return;

    try {
      const profiles = await base44.entities.UserProfile.list();
      const userProfile = profiles[0];

      if (userProfile) {
        await base44.entities.UserProfile.update(userProfile.id, {
          business_type: businessType,
          fulfillment_method: businessType === 'dropshipping' ? fulfillmentMethod : null,
          monthly_revenue: monthlyRevenue,
          onboarding_completed: true
        });
      }

      localStorage.setItem('quantum_onboarding_completed', 'true');
      navigate(createPageUrl('ScaleChecklist'));
    } catch (err) {
      console.error('Onboarding error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#F9FBFF' }}>
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 125, 255, 0.08), rgba(0, 196, 180, 0.05), transparent 70%)',
          filter: 'blur(60px)'
        }}
      />

      <div className="w-full max-w-2xl relative z-10">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium" style={{ color: '#6B7280' }}>
              Step {step} of 3
            </span>
            <span className="text-sm font-bold" style={{ color: '#007DFF' }}>
              {Math.round((step / 3) * 100)}%
            </span>
          </div>
          <div className="h-2 rounded-full" style={{ background: '#E5E7EB' }}>
            <div 
              className="h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${(step / 3) * 100}%`,
                background: 'linear-gradient(135deg, #007DFF 0%, #00A8FF 100%)'
              }}
            />
          </div>
        </div>

        <div className="p-8 rounded-3xl"
              style={{
                background: '#FFFFFF',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 125, 255, 0.1)'
              }}>
          
          {step === 1 && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                     style={{ background: 'rgba(0, 125, 255, 0.1)' }}>
                  <Package className="w-6 h-6" style={{ color: '#007DFF' }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#010C31', fontFamily: 'Poppins, sans-serif' }}>
                    What's your business model?
                  </h2>
                  <p className="text-sm" style={{ color: '#6B7280' }}>
                    This helps us customize your experience
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { value: 'branded_inventory', label: 'Branded Store with Inventory', desc: 'I hold my own inventory' },
                  { value: 'dropshipping', label: 'Dropshipping', desc: 'Products ship directly from suppliers' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setBusinessType(option.value)}
                    className="w-full p-5 rounded-xl text-left transition-all"
                    style={{
                      background: businessType === option.value ? 'rgba(0, 125, 255, 0.1)' : '#F9FBFF',
                      border: `2px solid ${businessType === option.value ? '#007DFF' : '#E5E7EB'}`,
                      cursor: 'pointer'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-base mb-1" style={{ color: '#010C31' }}>{option.label}</p>
                        <p className="text-sm" style={{ color: '#6B7280' }}>{option.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${businessType === option.value ? 'border-[#007DFF]' : 'border-gray-300'}`}>
                        {businessType === option.value && (
                          <div className="w-3 h-3 rounded-full" style={{ background: '#007DFF' }} />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={!businessType}
                className="w-full mt-6 py-3.5 rounded-xl font-semibold transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: businessType ? 'linear-gradient(135deg, #007DFF 0%, #00A8FF 100%)' : '#E5E7EB',
                  color: '#FFFFFF',
                  border: 'none',
                  boxShadow: businessType ? '0 4px 16px rgba(0, 125, 255, 0.3)' : 'none'
                }}
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                     style={{ background: 'rgba(0, 125, 255, 0.1)' }}>
                  <TrendingUp className="w-6 h-6" style={{ color: '#007DFF' }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#010C31', fontFamily: 'Poppins, sans-serif' }}>
                    How do you fulfill orders?
                  </h2>
                  <p className="text-sm" style={{ color: '#6B7280' }}>
                    Where do your products ship from?
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { value: 'aliexpress', label: 'AliExpress', desc: 'Direct fulfillment from AliExpress' },
                  { value: 'private_agent', label: 'Private Agent', desc: 'Working with a fulfillment agent' },
                  { value: 'other', label: 'Other', desc: 'Different fulfillment method' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFulfillmentMethod(option.value)}
                    className="w-full p-5 rounded-xl text-left transition-all"
                    style={{
                      background: fulfillmentMethod === option.value ? 'rgba(0, 125, 255, 0.1)' : '#F9FBFF',
                      border: `2px solid ${fulfillmentMethod === option.value ? '#007DFF' : '#E5E7EB'}`,
                      cursor: 'pointer'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-base mb-1" style={{ color: '#010C31' }}>{option.label}</p>
                        <p className="text-sm" style={{ color: '#6B7280' }}>{option.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${fulfillmentMethod === option.value ? 'border-[#007DFF]' : 'border-gray-300'}`}>
                        {fulfillmentMethod === option.value && (
                          <div className="w-3 h-3 rounded-full" style={{ background: '#007DFF' }} />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={!fulfillmentMethod}
                className="w-full mt-6 py-3.5 rounded-xl font-semibold transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: fulfillmentMethod ? 'linear-gradient(135deg, #007DFF 0%, #00A8FF 100%)' : '#E5E7EB',
                  color: '#FFFFFF',
                  border: 'none',
                  boxShadow: fulfillmentMethod ? '0 4px 16px rgba(0, 125, 255, 0.3)' : 'none'
                }}
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                     style={{ background: 'rgba(0, 125, 255, 0.1)' }}>
                  <DollarSign className="w-6 h-6" style={{ color: '#007DFF' }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#010C31', fontFamily: 'Poppins, sans-serif' }}>
                    What's your current monthly revenue?
                  </h2>
                  <p className="text-sm" style={{ color: '#6B7280' }}>
                    Help us tailor guidance to your scale
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { value: '0-5000', label: '$0 - $5,000', desc: 'Just getting started' },
                  { value: '5000-10000', label: '$5,000 - $10,000', desc: 'Building momentum' },
                  { value: '10000-25000', label: '$10,000 - $25,000', desc: 'Growing steadily' },
                  { value: '25000-100000', label: '$25,000 - $100,000', desc: 'Scaling up' },
                  { value: '100000+', label: '$100,000+', desc: 'High performer' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setMonthlyRevenue(option.value)}
                    className="w-full p-5 rounded-xl text-left transition-all"
                    style={{
                      background: monthlyRevenue === option.value ? 'rgba(0, 125, 255, 0.1)' : '#F9FBFF',
                      border: `2px solid ${monthlyRevenue === option.value ? '#007DFF' : '#E5E7EB'}`,
                      cursor: 'pointer'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-base mb-1" style={{ color: '#010C31' }}>{option.label}</p>
                        <p className="text-sm" style={{ color: '#6B7280' }}>{option.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${monthlyRevenue === option.value ? 'border-[#007DFF]' : 'border-gray-300'}`}>
                        {monthlyRevenue === option.value && (
                          <div className="w-3 h-3 rounded-full" style={{ background: '#007DFF' }} />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleComplete}
                disabled={!monthlyRevenue}
                className="w-full mt-6 py-3.5 rounded-xl font-semibold transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: monthlyRevenue ? 'linear-gradient(135deg, #007DFF 0%, #00A8FF 100%)' : '#E5E7EB',
                  color: '#FFFFFF',
                  border: 'none',
                  boxShadow: monthlyRevenue ? '0 4px 16px rgba(0, 125, 255, 0.3)' : 'none'
                }}
              >
                Complete Setup
                <ArrowRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}