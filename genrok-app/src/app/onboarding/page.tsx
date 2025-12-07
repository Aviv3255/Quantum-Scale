'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Loader2, Globe } from 'lucide-react';
import { getCurrentUser, getUserProfile, createUserProfile, updateUserProfile } from '@/lib/supabase';

// Question definitions with genius copy
const QUESTIONS = [
  {
    id: 'full_name',
    type: 'text',
    title: "First things first...",
    subtitle: "What should we call you?",
    placeholder: "Your name",
    field: 'full_name',
  },
  {
    id: 'age',
    type: 'select',
    title: (name: string) => `Nice to meet you, ${name}!`,
    subtitle: "How many trips around the sun?",
    options: [
      { value: '18-24', label: '18-24' },
      { value: '25-34', label: '25-34' },
      { value: '35-44', label: '35-44' },
      { value: '45-54', label: '45-54' },
      { value: '55+', label: '55+' },
    ],
    field: 'age',
    typing: true,
  },
  {
    id: 'country',
    type: 'select',
    title: "Where in the world are you building from?",
    subtitle: "Your empire's headquarters",
    options: [
      { value: 'US', label: '🇺🇸 United States' },
      { value: 'UK', label: '🇬🇧 United Kingdom' },
      { value: 'CA', label: '🇨🇦 Canada' },
      { value: 'AU', label: '🇦🇺 Australia' },
      { value: 'DE', label: '🇩🇪 Germany' },
      { value: 'FR', label: '🇫🇷 France' },
      { value: 'IL', label: '🇮🇱 Israel' },
      { value: 'NL', label: '🇳🇱 Netherlands' },
      { value: 'ES', label: '🇪🇸 Spain' },
      { value: 'IT', label: '🇮🇹 Italy' },
      { value: 'BR', label: '🇧🇷 Brazil' },
      { value: 'IN', label: '🇮🇳 India' },
      { value: 'OTHER', label: '🌍 Other' },
    ],
    field: 'country',
  },
  {
    id: 'occupation',
    type: 'select',
    title: "What's your day-to-day?",
    subtitle: "No judgment, we've all got bills to pay",
    options: [
      { value: 'entrepreneur', label: 'Full-time Entrepreneur' },
      { value: 'side_hustle', label: 'Side Hustler (9-5 + dreams)' },
      { value: 'freelancer', label: 'Freelancer / Consultant' },
      { value: 'student', label: 'Student' },
      { value: 'employed', label: 'Employed (looking to escape)' },
      { value: 'other', label: 'Something else entirely' },
    ],
    field: 'occupation',
  },
  {
    id: 'niche',
    type: 'select',
    title: "What's your poison?",
    subtitle: "Pick your niche (or the closest match)",
    options: [
      { value: 'fashion', label: '👗 Fashion & Apparel' },
      { value: 'beauty', label: '💄 Beauty & Cosmetics' },
      { value: 'health', label: '💪 Health & Fitness' },
      { value: 'home', label: '🏠 Home & Garden' },
      { value: 'electronics', label: '📱 Electronics & Gadgets' },
      { value: 'pets', label: '🐕 Pets' },
      { value: 'kids', label: '👶 Baby & Kids' },
      { value: 'jewelry', label: '💎 Jewelry & Accessories' },
      { value: 'sports', label: '⚽ Sports & Outdoors' },
      { value: 'food', label: '🍕 Food & Beverage' },
      { value: 'other', label: '🎯 Other' },
    ],
    field: 'niche',
  },
  {
    id: 'platform',
    type: 'select',
    title: "Where do you sell your magic?",
    subtitle: "Your digital storefront",
    options: [
      { value: 'shopify', label: 'Shopify' },
      { value: 'woocommerce', label: 'WooCommerce' },
      { value: 'amazon', label: 'Amazon' },
      { value: 'etsy', label: 'Etsy' },
      { value: 'ebay', label: 'eBay' },
      { value: 'custom', label: 'Custom Website' },
      { value: 'none', label: "Don't have one yet" },
      { value: 'other', label: 'Other Platform' },
    ],
    field: 'platform',
  },
  {
    id: 'monthly_revenue',
    type: 'select',
    title: "Let's talk numbers 💰",
    subtitle: "Monthly revenue (be honest, it stays between us)",
    options: [
      { value: '0', label: '$0 - Just getting started' },
      { value: '1-1000', label: '$1 - $1,000' },
      { value: '1000-5000', label: '$1,000 - $5,000' },
      { value: '5000-10000', label: '$5,000 - $10,000' },
      { value: '10000-50000', label: '$10,000 - $50,000' },
      { value: '50000-100000', label: '$50,000 - $100,000' },
      { value: '100000+', label: '$100,000+' },
    ],
    field: 'monthly_revenue',
  },
  {
    id: 'time_in_field',
    type: 'select',
    title: "How long have you been in the game?",
    subtitle: "Time flies when you're building empires",
    options: [
      { value: 'new', label: 'Just starting out' },
      { value: '0-6months', label: 'Less than 6 months' },
      { value: '6-12months', label: '6-12 months' },
      { value: '1-2years', label: '1-2 years' },
      { value: '2-5years', label: '2-5 years' },
      { value: '5+years', label: '5+ years (OG status)' },
    ],
    field: 'time_in_field',
  },
  {
    id: 'main_traffic_source',
    type: 'select',
    title: "Where do your customers come from?",
    subtitle: "Your traffic goldmine",
    options: [
      { value: 'facebook', label: '📘 Facebook Ads' },
      { value: 'instagram', label: '📸 Instagram' },
      { value: 'tiktok', label: '🎵 TikTok' },
      { value: 'google', label: '🔍 Google Ads' },
      { value: 'seo', label: '📈 SEO / Organic' },
      { value: 'influencers', label: '⭐ Influencers' },
      { value: 'email', label: '📧 Email Marketing' },
      { value: 'none', label: "🤷 Haven't figured it out yet" },
    ],
    field: 'main_traffic_source',
  },
  {
    id: 'monthly_ad_budget',
    type: 'select',
    title: "What's your monthly ad spend?",
    subtitle: "Fuel for the fire",
    options: [
      { value: '0', label: '$0 - Organic only' },
      { value: '1-500', label: '$1 - $500' },
      { value: '500-1000', label: '$500 - $1,000' },
      { value: '1000-5000', label: '$1,000 - $5,000' },
      { value: '5000-10000', label: '$5,000 - $10,000' },
      { value: '10000+', label: '$10,000+' },
    ],
    field: 'monthly_ad_budget',
  },
  {
    id: 'store_link',
    type: 'text',
    title: "Almost done! Got a store link?",
    subtitle: "Drop it here (totally optional)",
    placeholder: "https://your-store.com",
    field: 'store_link',
    optional: true,
  },
];

// Typing effect component
function TypingText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <span>
      {displayText}
      {!isComplete && <span className="typing-cursor">|</span>}
    </span>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [, setTypingComplete] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { user } = await getCurrentUser();
      if (!user) {
        router.push('/login');
        return;
      }

      setUserId(user.id);

      // Check if profile exists
      const { data: profile, error } = await getUserProfile(user.id);

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        await createUserProfile(user.id);
      } else if (profile) {
        // Profile exists, check if onboarding is complete
        if (profile.onboarding_completed) {
          router.push('/dashboard');
          return;
        }
        // Always start from the beginning if not completed
        setCurrentStep(0);
      }

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const currentQuestion = QUESTIONS[currentStep];
  const isLastStep = currentStep === QUESTIONS.length - 1;
  const canProceed = currentQuestion?.optional || answers[currentQuestion?.field || ''];

  const getTitle = () => {
    const q = currentQuestion;
    if (typeof q.title === 'function') {
      return q.title(answers.full_name || 'friend');
    }
    return q.title;
  };

  const handleNext = useCallback(async () => {
    if (!userId || !canProceed) return;

    setSaving(true);

    // Save current answer to database
    await updateUserProfile(userId, {
      [currentQuestion.field]: answers[currentQuestion.field] || null,
      onboarding_step: currentStep + 1,
    });

    if (isLastStep) {
      // Complete onboarding
      await updateUserProfile(userId, {
        onboarding_completed: true,
      });
      router.push('/dashboard');
    } else {
      setCurrentStep(prev => prev + 1);
      setTypingComplete(false);
    }

    setSaving(false);
  }, [userId, canProceed, currentQuestion, answers, currentStep, isLastStep, router]);

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setTypingComplete(false);
    }
  };

  const handleSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.field]: value }));
  };

  const handleTextChange = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.field]: value }));
  };

  if (loading) {
    return (
      <div className="onboarding-container">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  return (
    <div className="onboarding-container">
      {/* Progress bar */}
      <div className="onboarding-progress">
        <div
          className="onboarding-progress-bar"
          style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="onboarding-content"
        >
          {/* Question header */}
          <div className="onboarding-header">
            {currentQuestion.typing && currentStep > 0 ? (
              <h1 className="onboarding-title">
                <TypingText
                  text={getTitle()}
                  onComplete={() => setTypingComplete(true)}
                />
              </h1>
            ) : (
              <h1 className="onboarding-title">{getTitle()}</h1>
            )}
            <p className="onboarding-subtitle">{currentQuestion.subtitle}</p>
          </div>

          {/* Question content */}
          <div className="onboarding-question">
            {currentQuestion.type === 'text' ? (
              <div className="onboarding-text-input">
                {currentQuestion.id === 'store_link' && (
                  <Globe className="onboarding-input-icon" size={20} />
                )}
                <input
                  type={currentQuestion.id === 'store_link' ? 'url' : 'text'}
                  value={answers[currentQuestion.field] || ''}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="onboarding-input"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && canProceed) {
                      handleNext();
                    }
                  }}
                />
              </div>
            ) : (
              <div className="onboarding-options">
                {currentQuestion.options?.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`onboarding-option ${
                      answers[currentQuestion.field] === option.value ? 'selected' : ''
                    }`}
                  >
                    <span>{option.label}</span>
                    {answers[currentQuestion.field] === option.value && (
                      <Check size={18} strokeWidth={2.5} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="onboarding-nav">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="onboarding-back"
              >
                <ArrowLeft size={18} />
                Back
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed || saving}
              className="onboarding-next"
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isLastStep ? (
                <>
                  Let&apos;s Go!
                  <ArrowRight size={18} />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>

          {/* Skip for optional */}
          {currentQuestion.optional && !answers[currentQuestion.field] && (
            <button
              type="button"
              onClick={handleNext}
              className="onboarding-skip"
            >
              Skip for now
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
