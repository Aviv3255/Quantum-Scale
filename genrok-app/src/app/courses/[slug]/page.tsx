'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
  Play,
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

  const slug = params.slug as string;
  const course = getCourseBySlug(slug);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

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
      <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Back Button */}
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm text-[#666666] hover:text-[#111111] mb-8 transition-colors"
          >
            <ChevronLeft size={16} />
            Back to Courses
          </Link>

          {/* Hero Section */}
          <div
            className="rounded-2xl overflow-hidden mb-10"
            style={{ border: '1px solid #e5e5e5' }}
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Side */}
              <div
                className="flex items-center justify-center p-10 md:p-14"
                style={{
                  backgroundColor: '#f8f8f8',
                  minHeight: '320px',
                }}
              >
                <Image
                  src={course.image}
                  alt={course.title}
                  width={280}
                  height={220}
                  unoptimized
                  className="max-w-full h-auto object-contain"
                  style={{
                    filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.12))',
                  }}
                />
              </div>

              {/* Info Side */}
              <div className="p-8 md:p-10 flex flex-col justify-center" style={{ backgroundColor: '#ffffff' }}>
                {course.badge && (
                  <div
                    className="inline-flex px-3 py-1.5 rounded-full text-xs font-medium mb-4 w-fit"
                    style={{ backgroundColor: '#111111', color: '#ffffff' }}
                  >
                    {course.badge}
                  </div>
                )}

                <h1 className="text-2xl md:text-3xl font-bold text-[#111111] mb-3">
                  {course.title}
                </h1>

                <p className="text-[#666666] mb-5 leading-relaxed">
                  {course.subtitle}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {course.stats.map((stat, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 rounded-xl"
                      style={{ backgroundColor: '#f5f5f5' }}
                    >
                      <span className="text-lg font-bold text-[#111111]">
                        {stat.value}
                      </span>{' '}
                      <span className="text-sm text-[#666666]">
                        {stat.label}
                      </span>
                    </div>
                  ))}
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
                  <span className="text-3xl font-bold text-[#111111]">
                    ${course.price}
                  </span>
                  {course.originalPrice && (
                    <>
                      <span className="text-lg line-through text-[#999999]">
                        ${course.originalPrice}
                      </span>
                      <span
                        className="text-sm font-medium px-2 py-1 rounded"
                        style={{ backgroundColor: '#f0f0f0', color: '#111111' }}
                      >
                        Save ${course.originalPrice - course.price}
                      </span>
                    </>
                  )}
                </div>

                {/* CTA Button - Premium Black */}
                <button
                  className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl font-medium text-white transition-all hover:opacity-90"
                  style={{
                    background: 'linear-gradient(150deg, #000000 0%, #000000 30%, #222222 50%, #000000 70%, #000000 100%)',
                  }}
                >
                  <ShoppingCart size={20} />
                  Get Instant Access
                </button>

                <p className="text-xs text-center text-[#888888] mt-3">
                  30-day money-back guarantee • Instant access
                </p>
              </div>
            </div>
          </div>

          {/* Value Proposition Section */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#111111] mb-6 text-center">
              What You'll Learn
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {course.highlights?.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl"
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
              )) || (
                <>
                  <div className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: '#fafafa', border: '1px solid #eeeeee' }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#111111' }}>
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="text-[#333333]">Master the psychology behind every buying decision</span>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: '#fafafa', border: '1px solid #eeeeee' }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#111111' }}>
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="text-[#333333]">Create irresistible offers that sell themselves</span>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: '#fafafa', border: '1px solid #eeeeee' }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#111111' }}>
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="text-[#333333]">Build trust instantly with proven frameworks</span>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: '#fafafa', border: '1px solid #eeeeee' }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#111111' }}>
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="text-[#333333]">Increase AOV without discounting your brand</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* About This Course */}
          <div
            className="rounded-2xl p-8 mb-10"
            style={{ backgroundColor: '#fafafa', border: '1px solid #eeeeee' }}
          >
            <h2 className="text-xl font-bold text-[#111111] mb-4">
              About This Course
            </h2>
            <div className="text-[#444444] whitespace-pre-line leading-relaxed">
              {course.longDescription}
            </div>
          </div>

          {/* Who This Is For */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#111111] mb-6">
              This Course Is Perfect For You If...
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl text-center" style={{ backgroundColor: '#fafafa', border: '1px solid #eeeeee' }}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#111111' }}>
                  <Target size={24} className="text-white" />
                </div>
                <p className="text-sm text-[#444444]">You want to increase conversions without spending more on ads</p>
              </div>
              <div className="p-5 rounded-xl text-center" style={{ backgroundColor: '#fafafa', border: '1px solid #eeeeee' }}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#111111' }}>
                  <TrendingUp size={24} className="text-white" />
                </div>
                <p className="text-sm text-[#444444]">You're ready to scale but need a proven system to follow</p>
              </div>
              <div className="p-5 rounded-xl text-center" style={{ backgroundColor: '#fafafa', border: '1px solid #eeeeee' }}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#111111' }}>
                  <Zap size={24} className="text-white" />
                </div>
                <p className="text-sm text-[#444444]">You want results fast without years of trial and error</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl whitespace-nowrap transition-all text-sm font-medium ${
                    isActive
                      ? 'text-white'
                      : 'text-[#666666] hover:bg-[#f5f5f5]'
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
                    style={{ backgroundColor: '#fafafa', border: '1px solid #eeeeee' }}
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
                    style={{ backgroundColor: '#fafafa', border: '1px solid #eeeeee' }}
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
                        style={{ backgroundColor: '#eeeeee', color: '#111111' }}
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
                    style={{ backgroundColor: '#fafafa', border: '1px solid #eeeeee' }}
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
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 pb-5"
                      >
                        <p className="text-[#555555]">{item.answer}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Final CTA Section */}
          <div
            className="rounded-2xl p-8 md:p-10 mt-12 text-center"
            style={{ backgroundColor: '#111111' }}
          >
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to Transform Your Store?
            </h2>
            <p className="text-[#aaaaaa] mb-6 max-w-xl mx-auto">
              Get instant access to {course.modules.length} modules, {course.bonuses.length} bonuses worth ${totalBonusValue}, and start implementing today.
            </p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-3xl font-bold text-white">${course.price}</span>
              {course.originalPrice && (
                <span className="text-lg line-through text-[#666666]">${course.originalPrice}</span>
              )}
            </div>
            <button
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: '#ffffff', color: '#111111' }}
            >
              <ShoppingCart size={20} />
              Get Instant Access
              <ArrowRight size={18} />
            </button>
            <p className="text-xs text-[#666666] mt-4">
              30-day money-back guarantee • No questions asked
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-10 text-sm text-[#888888]">
            <div className="flex items-center gap-2">
              <Shield size={18} />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={18} />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift size={18} />
              <span>Lifetime Updates</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
