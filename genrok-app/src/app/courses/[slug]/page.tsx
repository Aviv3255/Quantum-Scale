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
  Star,
  HelpCircle,
  Check,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getCourseBySlug, Course, CourseFAQ } from '@/data/courses';

type TabType = 'content' | 'bonuses' | 'reviews' | 'faq';

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
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!course) {
    return (
      <DashboardLayout>
        <div className="page-wrapper">
          <div className="empty-state">
            <h3>Course not found</h3>
            <p>The course you're looking for doesn't exist.</p>
            <Link href="/courses" className="btn btn-primary mt-4">
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
    { id: 'reviews' as TabType, label: `Reviews (${course.reviews.length})`, icon: Star },
    { id: 'faq' as TabType, label: 'FAQ', icon: HelpCircle },
  ];

  const totalBonusValue = course.bonuses.reduce((sum, b) => sum + b.value, 0);

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Back Button */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-6 transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Courses
        </Link>

        {/* Hero Section */}
        <div className="card mb-8" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Side */}
            <div
              className="flex items-center justify-center p-8 md:p-12"
              style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                minHeight: '300px',
              }}
            >
              <Image
                src={course.image}
                alt={course.title}
                width={300}
                height={240}
                unoptimized
                className="max-w-full h-auto object-contain rounded-lg"
                style={{
                  filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.5))',
                }}
              />
            </div>

            {/* Info Side */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              {course.badge && (
                <div className="badge badge-primary mb-4 w-fit">
                  {course.badge}
                </div>
              )}

              <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">
                {course.title}
              </h1>

              <p className="text-[var(--text-muted)] mb-4">
                {course.subtitle}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mb-6">
                {course.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-xl"
                    style={{ backgroundColor: 'var(--bg-secondary)' }}
                  >
                    <span className="text-lg font-bold text-[var(--text-primary)]">
                      {stat.value}
                    </span>{' '}
                    <span className="text-sm text-[var(--text-muted)]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bonuses Value */}
              <div
                className="flex items-center gap-2 p-4 rounded-xl mb-6"
                style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
              >
                <Gift className="w-5 h-5" style={{ color: '#22c55e' }} />
                <span className="text-sm">
                  <strong style={{ color: '#22c55e' }}>{course.bonuses.length} bonuses</strong>
                  <span className="text-[var(--text-muted)]"> worth ${totalBonusValue} included</span>
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-[var(--text-primary)]">
                  ${course.price}
                </span>
                {course.originalPrice && (
                  <span className="text-lg line-through text-[var(--text-muted)]">
                    ${course.originalPrice}
                  </span>
                )}
                {course.originalPrice && (
                  <span
                    className="text-sm font-semibold px-2 py-1 rounded"
                    style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}
                  >
                    Save ${course.originalPrice - course.price}
                  </span>
                )}
              </div>

              {/* CTA Button */}
              <button
                className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#22c55e' }}
              >
                <ShoppingCart size={20} />
                Get Instant Access
              </button>

              <p className="text-xs text-center text-[var(--text-muted)] mt-3">
                30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="card mb-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            About This Course
          </h2>
          <div className="text-[var(--text-secondary)] whitespace-pre-line">
            {course.longDescription}
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all text-sm font-medium ${
                  isActive
                    ? 'text-white'
                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-light)] hover:bg-[var(--bg-hover)]'
                }`}
                style={isActive ? { backgroundColor: '#22c55e' } : undefined}
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
            <div className="space-y-4">
              {course.modules.map((module, index) => (
                <div key={index} className="card">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                    >
                      <span className="font-bold" style={{ color: '#22c55e' }}>
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                        {module.title}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)]">
                        {module.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'bonuses' && (
            <div className="space-y-4">
              {course.bonuses.map((bonus, index) => (
                <div key={index} className="card">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                      >
                        <Gift size={18} style={{ color: '#22c55e' }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                          {bonus.title}
                        </h3>
                        <p className="text-sm text-[var(--text-muted)]">
                          {bonus.description}
                        </p>
                      </div>
                    </div>
                    <div
                      className="px-3 py-1 rounded-lg text-sm font-semibold flex-shrink-0"
                      style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    >
                      ${bonus.value} value
                    </div>
                  </div>
                </div>
              ))}

              <div
                className="card text-center"
                style={{ backgroundColor: 'rgba(34, 197, 94, 0.05)', borderColor: 'rgba(34, 197, 94, 0.2)' }}
              >
                <p className="text-lg font-semibold" style={{ color: '#22c55e' }}>
                  Total Bonus Value: ${totalBonusValue}
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  All included free with your purchase
                </p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {course.reviews.map((review, index) => (
                <div key={index} className="card">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white"
                      style={{ backgroundColor: '#22c55e' }}
                    >
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--text-primary)]">
                        {review.name}
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < review.rating ? '#f59e0b' : 'none'}
                            stroke={i < review.rating ? '#f59e0b' : 'var(--text-muted)'}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-[var(--text-secondary)]">{review.text}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-3">
              {course.faq.map((item, index) => (
                <div key={index} className="card" style={{ padding: 0 }}>
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-5 flex items-center justify-between text-left"
                  >
                    <span className="font-semibold text-[var(--text-primary)] pr-4">
                      {item.question}
                    </span>
                    {expandedFaq === index ? (
                      <ChevronUp size={20} className="text-[var(--text-muted)] flex-shrink-0" />
                    ) : (
                      <ChevronDown size={20} className="text-[var(--text-muted)] flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5"
                    >
                      <p className="text-[var(--text-secondary)]">{item.answer}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
