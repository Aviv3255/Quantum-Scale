import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { ArrowRight } from 'lucide-react';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessType: '',
    fulfillmentMethod: '',
    monthlyRevenue: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const hasChecked = useRef(false);

  useEffect(() => {
    // Only check once to prevent multiple API calls
    if (hasChecked.current) return;
    hasChecked.current = true;
    
    const checkExisting = async () => {
      try {
        const profiles = await base44.entities.UserProfile.list();
        if (profiles.length > 0 && profiles[0].onboarding_completed) {
          window.location.href = '/';
        }
      } catch (err) {
        console.error('Error checking profile:', err);
      }
    };
    checkExisting();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.firstName || !formData.lastName) {
        setError('Please fill in all fields');
        return;
      }
      setStep(2);
      setError('');
    } else if (step === 2) {
      if (!formData.businessType) {
        setError('Please select your business type');
        return;
      }
      if (formData.businessType === 'branded_inventory') {
        setStep(4);
      } else {
        setStep(3);
      }
      setError('');
    } else if (step === 3) {
      if (!formData.fulfillmentMethod) {
        setError('Please select your fulfillment method');
        return;
      }
      setStep(4);
      setError('');
    } else if (step === 4) {
      if (!formData.monthlyRevenue) {
        setError('Please select your monthly revenue');
        return;
      }
      
      setIsLoading(true);
      try {
        await base44.entities.UserProfile.create({
          first_name: formData.firstName,
          last_name: formData.lastName,
          business_type: formData.businessType,
          fulfillment_method: formData.fulfillmentMethod || null,
          monthly_revenue: formData.monthlyRevenue,
          onboarding_completed: true
        });
        
        localStorage.setItem('quantum_onboarding_completed', 'true');
        window.location.href = '/';
      } catch (err) {
        console.error('Error creating profile:', err);
        setError('Something went wrong. Please try again.');
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: #FFFFFF !important;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
      `}</style>

      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#FFFFFF' }}>
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(0, 125, 255, 0.08), rgba(0, 196, 180, 0.05), transparent 70%)',
            filter: 'blur(60px)'
          }}
        />

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center overflow-hidden"
                 style={{
                   background: '#FFFFFF',
                   boxShadow: '0 8px 24px rgba(0, 125, 255, 0.15)'
                 }}>
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e8dc64d4947e1a757921a8/72c207bdd_QuantumScalelogo13.png"
                alt="Quantum Scale"
                className="w-16 h-16 object-contain"
              />
            </div>
            
            <h1 className="text-2xl font-bold mb-1" style={{ 
              color: '#010C31',
              fontFamily: 'Poppins, sans-serif'
            }}>
              Welcome to Quantum Scale
            </h1>
            <p className="text-sm" style={{ color: '#7B7B7B' }}>Let's personalize your experience</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 rounded-3xl relative"
                style={{
                  background: '#FFFFFF',
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(0, 125, 255, 0.1)'
                }}>
            
            {/* Step Indicator */}
            <div className="flex justify-between mb-8">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className="flex-1 mx-1">
                  <div 
                    className="h-2 rounded-full transition-all"
                    style={{ 
                      background: s <= step ? 'linear-gradient(135deg, #007DFF, #00A8FF)' : '#E5E7EB'
                    }}
                  />
                </div>
              ))}
            </div>

            {step === 1 && (
              <>
                <h2 className="text-xl font-bold mb-6 text-center" style={{ color: '#010C31' }}>
                  What's your name?
                </h2>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    placeholder="First Name"
                    className="w-full px-4 py-3 rounded-xl transition-all"
                    style={{
                      background: '#F9FBFF',
                      border: '1px solid #E5E7EB',
                      color: '#010C31',
                      outline: 'none'
                    }}
                    autoFocus
                  />
                  
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    placeholder="Last Name"
                    className="w-full px-4 py-3 rounded-xl transition-all"
                    style={{
                      background: '#F9FBFF',
                      border: '1px solid #E5E7EB',
                      color: '#010C31',
                      outline: 'none'
                    }}
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-bold mb-6 text-center" style={{ color: '#010C31' }}>
                  What type of business do you run?
                </h2>
                
                <div className="space-y-3">
                  {[
                    { value: 'branded_inventory', label: 'Branded Store with Inventory' },
                    { value: 'dropshipping', label: 'Dropshipping Store' }
                  ].map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({...formData, businessType: option.value})}
                      className="w-full px-6 py-4 rounded-xl transition-all text-left font-medium"
                      style={{
                        background: formData.businessType === option.value ? 'rgba(0, 125, 255, 0.1)' : '#F9FBFF',
                        border: `2px solid ${formData.businessType === option.value ? '#007DFF' : '#E5E7EB'}`,
                        color: '#010C31'
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-xl font-bold mb-6 text-center" style={{ color: '#010C31' }}>
                  How do you fulfill your orders?
                </h2>
                
                <div className="space-y-3">
                  {[
                    { value: 'aliexpress', label: 'AliExpress' },
                    { value: 'private_agent', label: 'Private Agent' },
                    { value: 'other', label: 'Other' }
                  ].map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({...formData, fulfillmentMethod: option.value})}
                      className="w-full px-6 py-4 rounded-xl transition-all text-left font-medium"
                      style={{
                        background: formData.fulfillmentMethod === option.value ? 'rgba(0, 125, 255, 0.1)' : '#F9FBFF',
                        border: `2px solid ${formData.fulfillmentMethod === option.value ? '#007DFF' : '#E5E7EB'}`,
                        color: '#010C31'
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="text-xl font-bold mb-6 text-center" style={{ color: '#010C31' }}>
                  What's your current monthly revenue?
                </h2>
                
                <div className="space-y-3">
                  {[
                    { value: '0-5000', label: '$0 - $5,000' },
                    { value: '5000-10000', label: '$5,000 - $10,000' },
                    { value: '10000-25000', label: '$10,000 - $25,000' },
                    { value: '25000-100000', label: '$25,000 - $100,000' },
                    { value: '100000+', label: '$100,000+' }
                  ].map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({...formData, monthlyRevenue: option.value})}
                      className="w-full px-6 py-4 rounded-xl transition-all text-left font-medium"
                      style={{
                        background: formData.monthlyRevenue === option.value ? 'rgba(0, 125, 255, 0.1)' : '#F9FBFF',
                        border: `2px solid ${formData.monthlyRevenue === option.value ? '#007DFF' : '#E5E7EB'}`,
                        color: '#010C31'
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}

            {error && (
              <p className="text-sm mt-4" style={{ color: '#EF4444' }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-semibold transition-all mt-6 flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #007DFF 0%, #00A8FF 100%)',
                color: '#FFFFFF',
                border: 'none',
                boxShadow: '0 4px 16px rgba(0, 125, 255, 0.3)',
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 24px rgba(0, 125, 255, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 16px rgba(0, 125, 255, 0.3)';
              }}
            >
              {isLoading ? 'Loading...' : step === 4 ? 'Complete Setup' : 'Continue'}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>

            {step > 1 && !isLoading && (
              <button
                type="button"
                onClick={() => {
                  if (step === 4 && formData.businessType === 'branded_inventory') {
                    setStep(2);
                  } else {
                    setStep(step - 1);
                  }
                }}
                className="w-full py-3 rounded-xl font-medium transition-all mt-3"
                style={{
                  background: 'transparent',
                  color: '#6B7280',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Back
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}