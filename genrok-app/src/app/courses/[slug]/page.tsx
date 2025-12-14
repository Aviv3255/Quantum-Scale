'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  BookOpen,
  Gift,
  HelpCircle,
  Check,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Zap,
  Target,
  TrendingUp,
  Shield,
  ArrowRight,
  Heart,
  X,
  Lock,
  Clock,
  Users,
  Award,
  Play,
  FileText,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getCourseBySlug, Course } from '@/data/courses';

type TabType = 'content' | 'bonuses' | 'faq';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const slug = params.slug as string;
  const course = getCourseBySlug(slug);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handlePurchase = async () => {
    setIsProcessing(true);
    // Simulate purchase processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowCheckout(false);
    // Here you would redirect to success page or show success message
    alert('Purchase successful! You now have access to this course.');
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
        <div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!course) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
          <div className="text-center">
            <h3 className="text-xl font-medium text-[#111111] mb-2">Course not found</h3>
            <p className="text-[#666666] mb-6">The course you're looking for doesn't exist.</p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(150deg, #000000 0%, #222222 50%, #000000 100%)' }}
            >
              Back to Courses
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const tabs = [
    { id: 'content' as TabType, label: "What's Inside", icon: BookOpen },
    { id: 'bonuses' as TabType, label: `Bonuses (${course.bonuses.length})`, icon: Gift },
    { id: 'faq' as TabType, label: 'FAQ', icon: HelpCircle },
  ];

  const totalBonusValue = course.bonuses.reduce((sum, b) => sum + b.value, 0);

  return (
    <DashboardLayout>
      {/* Amazon-Style Quick Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            onClick={() => !isProcessing && setShowCheckout(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-2xl overflow-hidden"
              style={{ backgroundColor: '#ffffff' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Checkout Header */}
              <div className="p-6 border-b border-[#eeeeee]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#111111]">Quick Checkout</h2>
                  {!isProcessing && (
                    <button
                      onClick={() => setShowCheckout(false)}
                      className="p-2 rounded-full hover:bg-[#f5f5f5] transition-colors"
                    >
                      <X size={20} className="text-[#666666]" />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#666666]">
                  <Lock size={14} />
                  <span>Secure checkout powered by Stripe</span>
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-6 border-b border-[#eeeeee]">
                <div className="flex gap-4">
                  <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0" style={{ backgroundColor: '#f5f5f5' }}>
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={80}
                      height={64}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#111111] text-sm">{course.title}</h3>
                    <p className="text-xs text-[#666666] mt-1">Instant digital access</p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-bold text-[#111111]">${course.price}</span>
                      {course.originalPrice && (
                        <span className="text-xs line-through text-[#999999]">${course.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* User Info (Already logged in) */}
              <div className="p-6 border-b border-[#eeeeee]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white" style={{ backgroundColor: '#111111' }}>
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="font-medium text-[#111111] text-sm">{user?.email}</p>
                    <p className="text-xs text-[#666666]">Course will be added to your account</p>
                  </div>
                </div>
              </div>

              {/* Total & Purchase Button */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#666666]">Total</span>
                  <span className="text-2xl font-bold text-[#111111]">${course.price}</span>
                </div>

                <button
                  onClick={handlePurchase}
                  disabled={isProcessing}
                  className="w-full py-4 rounded-xl font-medium text-white transition-all flex items-center justify-center gap-2"
                  style={{
                    background: isProcessing
                      ? '#666666'
                      : 'linear-gradient(150deg, #000000 0%, #000000 30%, #222222 50%, #000000 70%, #000000 100%)',
                  }}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      Complete Purchase
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-[#888888]">
                  <span>30-day guarantee</span>
                  <span>•</span>
                  <span>Instant access</span>
                  <span>•</span>
                  <span>Lifetime updates</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
        {/* Back Button - Full width container */}
        <div className="w-full px-6 lg:px-10 pt-6">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm text-[#666666] hover:text-[#111111] transition-colors"
          >
            <ChevronLeft size={16} />
            Back to Courses
          </Link>
        </div>

        {/* Hero Section - Full Width */}
        <div className="w-full mt-6">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Side - Full width on left */}
            <div
              className="flex items-center justify-center p-10 lg:p-16"
              style={{
                backgroundColor: '#f8f8f8',
                minHeight: '400px',
              }}
            >
              <Image
                src={course.heroImage || course.image}
                alt={course.title}
                width={400}
                height={320}
                unoptimized
                className="max-w-full max-h-80 w-auto object-contain"
                style={{
                  filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.15))',
                }}
              />
            </div>

            {/* Info Side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center" style={{ backgroundColor: '#ffffff' }}>
              <div className="flex items-start justify-between mb-4">
                {course.badge && (
                  <div
                    className="inline-flex px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: '#111111', color: '#ffffff' }}
                  >
                    {course.badge}
                  </div>
                )}
                {/* Wishlist Button */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-2 rounded-full transition-all hover:bg-[#f5f5f5]"
                  title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart
                    size={22}
                    className={isWishlisted ? 'text-red-500' : 'text-[#cccccc]'}
                    fill={isWishlisted ? 'currentColor' : 'none'}
                  />
                </button>
              </div>

              <h1 className="text-2xl lg:text-4xl font-bold text-[#111111] mb-3">
                {course.title}
              </h1>

              <p className="text-[#666666] mb-6 leading-relaxed text-lg">
                {course.subtitle}
              </p>

              {/* Stats - Updated labels */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="px-4 py-2 rounded-xl" style={{ backgroundColor: '#f5f5f5' }}>
                  <span className="text-lg font-bold text-[#111111]">8</span>{' '}
                  <span className="text-sm text-[#666666]">modules</span>
                </div>
                <div className="px-4 py-2 rounded-xl" style={{ backgroundColor: '#f5f5f5' }}>
                  <span className="text-lg font-bold text-[#111111]">6+</span>{' '}
                  <span className="text-sm text-[#666666]">hours</span>
                </div>
                <div className="px-4 py-2 rounded-xl" style={{ backgroundColor: '#f5f5f5' }}>
                  <span className="text-lg font-bold text-[#111111]">50+</span>{' '}
                  <span className="text-sm text-[#666666]">templates</span>
                </div>
              </div>

              {/* Bonuses Value */}
              <div
                className="flex items-center gap-2 p-4 rounded-xl mb-6"
                style={{ backgroundColor: '#f5f5f5' }}
              >
                <Gift className="w-5 h-5 text-[#666666]" />
                <span className="text-sm">
                  <strong className="text-[#111111]">{course.bonuses.length} bonuses</strong>
                  <span className="text-[#666666]"> worth ${totalBonusValue} included</span>
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-[#111111]">
                  ${course.price}
                </span>
                {course.originalPrice && (
                  <>
                    <span className="text-xl line-through text-[#999999]">
                      ${course.originalPrice}
                    </span>
                    <span
                      className="text-sm font-medium px-3 py-1 rounded-full"
                      style={{ backgroundColor: '#111111', color: '#ffffff' }}
                    >
                      Save {Math.round((1 - course.price / course.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setShowCheckout(true)}
                className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl font-medium text-white transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(150deg, #000000 0%, #000000 30%, #222222 50%, #000000 70%, #000000 100%)',
                }}
              >
                <ShoppingCart size={20} />
                Get Instant Access
              </button>

              <p className="text-xs text-center text-[#888888] mt-3">
                30-day money-back guarantee • Instant access • Lifetime updates
              </p>
            </div>
          </div>
        </div>

        {/* Visual Feature Section - GIFs/Images placeholder */}
        {course.visuals && course.visuals.length > 0 && (
          <div className="w-full py-16 px-6 lg:px-10" style={{ backgroundColor: '#fafafa' }}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-[#111111] text-center mb-10">
                See It In Action
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {course.visuals.map((visual, index) => (
                  <div key={index} className="rounded-xl overflow-hidden" style={{ backgroundColor: '#ffffff', border: '1px solid #eeeeee' }}>
                    <Image
                      src={visual.url}
                      alt={visual.caption || `Feature ${index + 1}`}
                      width={400}
                      height={300}
                      unoptimized
                      className="w-full h-auto"
                    />
                    {visual.caption && (
                      <p className="p-4 text-sm text-[#666666] text-center">{visual.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* What You'll Learn - Full Width */}
        <div className="w-full py-16 px-6 lg:px-10" style={{ backgroundColor: '#ffffff' }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-[#111111] mb-8 text-center">
              What You'll Learn
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(course.highlights || [
                "Master the psychology behind every buying decision",
                "Create irresistible offers that sell themselves",
                "Build trust instantly with proven frameworks",
                "Increase AOV without discounting your brand",
                "Turn one-time buyers into repeat customers",
                "Optimize every touchpoint for maximum conversion"
              ]).map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-5 rounded-xl"
                  style={{ backgroundColor: '#fafafa', border: '1px solid #eeeeee' }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: '#111111' }}
                  >
                    <Check size={14} className="text-white" />
                  </div>
                  <span className="text-[#333333]">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About This Course */}
        <div className="w-full py-16 px-6 lg:px-10" style={{ backgroundColor: '#fafafa' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#111111] mb-6 text-center">
              About This Course
            </h2>
            <div className="text-[#444444] whitespace-pre-line leading-relaxed text-center text-lg">
              {course.longDescription}
            </div>
          </div>
        </div>

        {/* Who This Is For */}
        <div className="w-full py-16 px-6 lg:px-10" style={{ backgroundColor: '#ffffff' }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-[#111111] mb-8 text-center">
              This Course Is Perfect For You If...
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl text-center" style={{ backgroundColor: '#fafafa', border: '1px solid #eeeeee' }}>
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#111111' }}>
                  <Target size={28} className="text-white" />
                </div>
                <h3 className="font-semibold text-[#111111] mb-2">Boost Conversions</h3>
                <p className="text-sm text-[#666666]">You want to increase conversions without spending more on ads</p>
              </div>
              <div className="p-6 rounded-xl text-center" style={{ backgroundColor: '#fafafa', border: '1px solid #eeeeee' }}>
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#111111' }}>
                  <TrendingUp size={28} className="text-white" />
                </div>
                <h3 className="font-semibold text-[#111111] mb-2">Ready to Scale</h3>
                <p className="text-sm text-[#666666]">You're ready to scale but need a proven system to follow</p>
              </div>
              <div className="p-6 rounded-xl text-center" style={{ backgroundColor: '#fafafa', border: '1px solid #eeeeee' }}>
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#111111' }}>
                  <Zap size={28} className="text-white" />
                </div>
                <h3 className="font-semibold text-[#111111] mb-2">Fast Results</h3>
                <p className="text-sm text-[#666666]">You want results fast without years of trial and error</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section - Full Width */}
        <div className="w-full py-16 px-6 lg:px-10" style={{ backgroundColor: '#fafafa' }}>
          <div className="max-w-5xl mx-auto">
            {/* Tabs */}
            <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap transition-all text-sm font-medium ${
                      isActive
                        ? 'text-white'
                        : 'text-[#666666] hover:bg-[#eeeeee]'
                    }`}
                    style={
                      isActive
                        ? { background: 'linear-gradient(150deg, #000000 0%, #222222 50%, #000000 100%)' }
                        : { backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }
                    }
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'content' && (
                <div className="space-y-3">
                  {course.modules.map((module, index) => (
                    <div
                      key={index}
                      className="rounded-xl p-5"
                      style={{ backgroundColor: '#ffffff', border: '1px solid #eeeeee' }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: '#111111' }}
                        >
                          <span className="font-bold text-white">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#111111] mb-1">
                            {module.title}
                          </h3>
                          <p className="text-sm text-[#666666]">
                            {module.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'bonuses' && (
                <div className="space-y-3">
                  {course.bonuses.map((bonus, index) => (
                    <div
                      key={index}
                      className="rounded-xl p-5"
                      style={{ backgroundColor: '#ffffff', border: '1px solid #eeeeee' }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: '#111111' }}
                          >
                            <Gift size={18} className="text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#111111] mb-1">
                              {bonus.title}
                            </h3>
                            <p className="text-sm text-[#666666]">
                              {bonus.description}
                            </p>
                          </div>
                        </div>
                        <div
                          className="px-3 py-1.5 rounded-lg text-sm font-medium flex-shrink-0"
                          style={{ backgroundColor: '#f5f5f5', color: '#111111' }}
                        >
                          ${bonus.value} value
                        </div>
                      </div>
                    </div>
                  ))}

                  <div
                    className="rounded-xl p-6 text-center mt-6"
                    style={{ backgroundColor: '#111111' }}
                  >
                    <p className="text-lg font-semibold text-white mb-1">
                      Total Bonus Value: ${totalBonusValue}
                    </p>
                    <p className="text-sm text-[#aaaaaa]">
                      All included free with your purchase
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-3">
                  {course.faq.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl overflow-hidden"
                      style={{ backgroundColor: '#ffffff', border: '1px solid #eeeeee' }}
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full p-5 flex items-center justify-between text-left"
                      >
                        <span className="font-semibold text-[#111111] pr-4">
                          {item.question}
                        </span>
                        {expandedFaq === index ? (
                          <ChevronUp size={20} className="text-[#666666] flex-shrink-0" />
                        ) : (
                          <ChevronDown size={20} className="text-[#666666] flex-shrink-0" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="px-5 pb-5"
                          >
                            <p className="text-[#555555]">{item.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="w-full py-16 px-6 lg:px-10" style={{ backgroundColor: '#111111' }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Store?
            </h2>
            <p className="text-[#aaaaaa] mb-8 text-lg">
              Get instant access to {course.modules.length} modules, {course.bonuses.length} bonuses worth ${totalBonusValue}, and start implementing today.
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-4xl font-bold text-white">${course.price}</span>
              {course.originalPrice && (
                <span className="text-xl line-through text-[#666666]">${course.originalPrice}</span>
              )}
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-medium transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ backgroundColor: '#ffffff', color: '#111111' }}
            >
              <ShoppingCart size={20} />
              Get Instant Access
              <ArrowRight size={18} />
            </button>
            <p className="text-sm text-[#666666] mt-4">
              30-day money-back guarantee • No questions asked
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="w-full py-10 px-6 lg:px-10" style={{ backgroundColor: '#ffffff' }}>
          <div className="flex flex-wrap items-center justify-center gap-10 text-sm text-[#888888]">
            <div className="flex items-center gap-2">
              <Shield size={20} />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={20} />
              <span>30-Day Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift size={20} />
              <span>Lifetime Updates</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
