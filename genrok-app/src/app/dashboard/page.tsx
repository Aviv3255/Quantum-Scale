'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Sun,
  Moon,
  Rocket,
  Sparkles,
  CheckSquare,
  BookOpen,
  TrendingUp,
  ArrowRight,
  Clock,
  Play,
  ExternalLink,
  Info,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getAllCourses } from '@/data/courses';

function getTimeBasedGreeting(userName: string) {
  const hour = new Date().getHours();
  const firstName = userName?.split(' ')[0] || 'there';

  if (hour >= 5 && hour < 12) {
    return {
      greeting: `Good morning, ${firstName}!`,
      subtext: "The empire awaits. Your competitors are sleeping - you're not.",
    };
  } else if (hour >= 12 && hour < 17) {
    return {
      greeting: `Good afternoon, ${firstName}!`,
      subtext: "Peak hours. Every action now compounds into future millions.",
    };
  } else if (hour >= 17 && hour < 21) {
    return {
      greeting: `Good evening, ${firstName}!`,
      subtext: "The grind doesn't stop. Neither do winners.",
    };
  } else {
    return {
      greeting: `Working late, ${firstName}?`,
      subtext: "Night owls build empires. This is where legends are made.",
    };
  }
}

// Sample products for "New Products to Test" based on niche
const sampleProducts: Record<string, Array<{
  id: string;
  name: string;
  image: string;
  aliexpressUrl: string;
  cheaperOn: 'mate' | 'hypersku';
  cheaperUrl: string;
}>> = {
  "men's fashion": [
    { id: '1', name: 'Premium Leather Wallet', image: 'https://ae01.alicdn.com/kf/S1234567890.jpg', aliexpressUrl: 'https://aliexpress.com/item/1', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '2', name: 'Minimalist Watch', image: 'https://ae01.alicdn.com/kf/S1234567891.jpg', aliexpressUrl: 'https://aliexpress.com/item/2', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '3', name: 'Casual Sneakers', image: 'https://ae01.alicdn.com/kf/S1234567892.jpg', aliexpressUrl: 'https://aliexpress.com/item/3', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '4', name: 'Slim Fit Jeans', image: 'https://ae01.alicdn.com/kf/S1234567893.jpg', aliexpressUrl: 'https://aliexpress.com/item/4', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '5', name: 'Cotton T-Shirt Pack', image: 'https://ae01.alicdn.com/kf/S1234567894.jpg', aliexpressUrl: 'https://aliexpress.com/item/5', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '6', name: 'Sunglasses', image: 'https://ae01.alicdn.com/kf/S1234567895.jpg', aliexpressUrl: 'https://aliexpress.com/item/6', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
  ],
  "default": [
    { id: '1', name: 'Trending Product 1', image: '/placeholder.jpg', aliexpressUrl: 'https://aliexpress.com/item/1', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '2', name: 'Trending Product 2', image: '/placeholder.jpg', aliexpressUrl: 'https://aliexpress.com/item/2', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '3', name: 'Trending Product 3', image: '/placeholder.jpg', aliexpressUrl: 'https://aliexpress.com/item/3', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '4', name: 'Trending Product 4', image: '/placeholder.jpg', aliexpressUrl: 'https://aliexpress.com/item/4', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '5', name: 'Trending Product 5', image: '/placeholder.jpg', aliexpressUrl: 'https://aliexpress.com/item/5', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '6', name: 'Trending Product 6', image: '/placeholder.jpg', aliexpressUrl: 'https://aliexpress.com/item/6', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
  ]
};

// Sample course progress data
const courseProgressData = [
  { slug: 'tiktok-shop-mastery', progress: 45, hoursSpent: 3.5 },
  { slug: 'ai-automation-systems', progress: 20, hoursSpent: 1.2 },
  { slug: 'facebook-ads-accelerator', progress: 0, hoursSpent: 0 },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [userNiche, setUserNiche] = useState<string>("men's fashion");
  const courses = getAllCourses();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Get user's niche from metadata (would come from onboarding)
  useEffect(() => {
    if (user?.user_metadata?.niche) {
      setUserNiche(user.user_metadata.niche.toLowerCase());
    }
  }, [user]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const { greeting, subtext } = getTimeBasedGreeting(userName);
  const products = sampleProducts[userNiche] || sampleProducts['default'];

  // Stats for the right sidebar
  const completedCourses = courseProgressData.filter(c => c.progress === 100).length;
  const inProgressCourses = courseProgressData.filter(c => c.progress > 0 && c.progress < 100).length;

  return (
    <DashboardLayout>
      <div className="dashboard-layout">
        {/* Main Content */}
        <div className="dashboard-main">
          {/* Hero Greeting Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="greeting-hero"
          >
            <div className="greeting-content">
              <h1 className="greeting-title">{greeting}</h1>
              <p className="greeting-subtext">{subtext}</p>
            </div>
            <div className="greeting-illustration">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-32 h-32 object-contain"
              >
                <source src="https://cdn.shopify.com/videos/c/o/v/19d3c39f4e5e4d57bc9bbdc8db9d1639.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>

          {/* Checklist Progress Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="checklist-block"
          >
            <div className="checklist-info">
              <h3 className="checklist-title">The Launch Protocol</h3>
              <p className="checklist-desc">250 steps between you and your first million.</p>
              <div className="checklist-progress-row">
                <div className="progress-bar-wrapper">
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: '4.8%' }} />
                  </div>
                </div>
                <span className="progress-text">12/250</span>
              </div>
            </div>
            <Link href="/checklist" className="btn-3d">
              Continue
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Courses Block */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="courses-section"
          >
            <div className="section-header-row">
              <h2 className="section-title-left">Your Courses</h2>
              <Link href="/courses" className="see-all-link">
                See all <ChevronRight size={14} />
              </Link>
            </div>
            <div className="courses-list">
              {courses.slice(0, 4).map((course, index) => {
                const progress = courseProgressData.find(p => p.slug === course.slug);
                return (
                  <div key={course.slug} className="course-row">
                    <div className="course-icon-wrapper">
                      {course.image ? (
                        <Image src={course.image} alt={course.title} width={48} height={48} className="rounded-lg object-cover" />
                      ) : (
                        <div className="course-icon-placeholder">
                          <BookOpen size={20} />
                        </div>
                      )}
                    </div>
                    <div className="course-info">
                      <h4 className="course-name">{course.title}</h4>
                      <div className="course-meta">
                        <span className="course-duration">
                          <Clock size={12} />
                          {course.stats?.find(s => s.label === 'hours')?.value || '2'}h
                        </span>
                        <span className="course-progress-indicator">
                          {progress?.progress || 0}% complete
                        </span>
                      </div>
                    </div>
                    <Link href={`/courses/${course.slug}`} className="btn-course-view">
                      {progress && progress.progress > 0 ? 'Continue' : 'Start'}
                    </Link>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* New Products to Test Block */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="products-section"
          >
            <div className="section-header-row">
              <div>
                <h2 className="section-title-left">New Products to Test</h2>
                <p className="section-subtitle">The product is the core. Here are some winners, based on your niche.</p>
              </div>
              <Link href="/products/sell-these" className="see-all-link">
                See all <ChevronRight size={14} />
              </Link>
            </div>
            <div className="products-scroll-container">
              <div className="products-scroll">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </motion.section>
        </div>

        {/* Right Sidebar - Statistics */}
        <div className="dashboard-sidebar">
          {/* Course Stats */}
          <div className="stats-card">
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-number">{completedCourses}</span>
                <span className="stat-label-small">Courses<br/>completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{inProgressCourses}</span>
                <span className="stat-label-small">Courses<br/>in progress</span>
              </div>
            </div>
          </div>

          {/* Learning Hours Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Your Statistics</h3>
              <div className="chart-tabs">
                <button className="chart-tab active">Learning Hours</button>
                <button className="chart-tab">My Courses</button>
              </div>
            </div>
            <div className="chart-placeholder">
              <div className="mini-chart">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <div key={day} className="chart-bar-wrapper">
                    <div
                      className="chart-bar"
                      style={{ height: `${[30, 45, 60, 40, 80, 50, 35][i]}%` }}
                    />
                    <span className="chart-label">{day.toLowerCase()}</span>
                  </div>
                ))}
              </div>
              <div className="chart-peak">
                <span className="peak-value">2.5h</span>
                <span className="peak-label">Peak on Friday</span>
              </div>
            </div>
          </div>

          {/* Quick Action Card */}
          <div className="promo-card">
            <div className="promo-icon">
              <Sparkles size={24} />
            </div>
            <h4>Unlock Premium</h4>
            <p>Get access to all courses and exclusive tools.</p>
            <Link href="/courses" className="btn-promo">
              Go Premium
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Product Card Component
function ProductCard({ product }: { product: { id: string; name: string; image: string; aliexpressUrl: string; cheaperOn: 'mate' | 'hypersku'; cheaperUrl: string } }) {
  const [showBadge, setShowBadge] = useState(false);

  return (
    <div className="product-card">
      <a
        href={product.aliexpressUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="product-image-wrapper"
      >
        <div className="product-image-placeholder">
          <ExternalLink size={20} className="text-[var(--text-muted)]" />
        </div>
        <button
          className="product-info-btn"
          onClick={(e) => {
            e.preventDefault();
            setShowBadge(!showBadge);
          }}
          onMouseEnter={() => setShowBadge(true)}
          onMouseLeave={() => setShowBadge(false)}
        >
          <Info size={14} />
        </button>
        {showBadge && (
          <a
            href={product.cheaperUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`product-badge ${product.cheaperOn === 'mate' ? 'badge-mate' : 'badge-hypersku'}`}
            onClick={(e) => e.stopPropagation()}
          >
            Cheaper on {product.cheaperOn === 'mate' ? 'Mate' : 'HyperSKU'}
            <ExternalLink size={10} />
          </a>
        )}
      </a>
      <p className="product-name">{product.name}</p>
    </div>
  );
}
