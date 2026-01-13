'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Sun,
  Moon,
  Rocket,
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
import { metaAdTemplates } from '@/data/meta-ad-templates';

// Sample incomplete lessons (lessons user hasn't finished)
const incompleteLessons = [
  { slug: 'familiar-surprise-secret', title: 'The Familiar Surprise Secret', description: 'Master the MAYA principle', category: 'Copywriting' },
  { slug: 'red-button-effect', title: 'The Red Button Effect', description: 'Understanding psychological reactance', category: 'Psychology' },
  { slug: 'fred-method', title: 'The F.R.E.D. Method', description: 'A framework for audience psychology', category: 'Copywriting' },
  { slug: 'emotion-decides', title: 'Emotion Decides, Logic Justifies', description: 'How emotions drive purchases', category: 'Psychology' },
  { slug: 'gatekeeper-method', title: 'The Gatekeeper Method', description: "Bypass the brain's attention filter", category: 'Copywriting' },
  { slug: 'three-second-rule', title: 'The 3-Second Rule', description: 'The critical window to capture attention', category: 'Copywriting' },
  { slug: 'autopilot-sale', title: 'The Autopilot Sale', description: 'How mental shortcuts make customers buy', category: 'Psychology' },
  { slug: 'borrowed-trust', title: 'Borrowed Trust', description: 'Authority principles that bypass skepticism', category: 'Psychology' },
  { slug: 'herd-instinct', title: 'The Herd Instinct', description: 'Social proof creates buying pressure', category: 'Psychology' },
];

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

// Sample products for "New Products to Test" based on niche (20 products for scroll)
const sampleProducts: Record<string, Array<{
  id: string;
  name: string;
  image: string;
  aliexpressUrl: string;
  cheaperOn: 'mate' | 'hypersku';
  cheaperUrl: string;
}>> = {
  "men's fashion": [
    { id: '1', name: 'Premium Leather Wallet', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/1', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '2', name: 'Minimalist Watch', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/2', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '3', name: 'Casual Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/3', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '4', name: 'Slim Fit Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/4', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '5', name: 'Cotton T-Shirt', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/5', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '6', name: 'Aviator Sunglasses', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/6', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '7', name: 'Leather Belt', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/7', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '8', name: 'Canvas Backpack', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a45?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/8', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '9', name: 'Wool Beanie', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/9', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '10', name: 'Silver Chain', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/10', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '11', name: 'Bomber Jacket', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/11', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '12', name: 'Dress Shoes', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/12', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '13', name: 'Polo Shirt', image: 'https://images.unsplash.com/photo-1625910513413-5fc45e99e2a5?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/13', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '14', name: 'Cargo Pants', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/14', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '15', name: 'Swim Shorts', image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/15', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '16', name: 'Flannel Shirt', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/16', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '17', name: 'Chino Shorts', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/17', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '18', name: 'Hoodie', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/18', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '19', name: 'Denim Jacket', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/19', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '20', name: 'Sports Cap', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/20', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
  ],
  "default": [
    { id: '1', name: 'Smart Watch', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/1', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '2', name: 'Wireless Earbuds', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/2', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '3', name: 'Phone Case', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/3', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '4', name: 'LED Light Strip', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/4', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '5', name: 'Portable Charger', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/5', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '6', name: 'Mini Projector', image: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/6', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '7', name: 'Ring Light', image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/7', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '8', name: 'Desk Organizer', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/8', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '9', name: 'Plant Pot', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/9', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '10', name: 'Wall Clock', image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/10', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '11', name: 'Throw Blanket', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/11', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '12', name: 'Candle Set', image: 'https://images.unsplash.com/photo-1602607702679-ecd0c8594e24?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/12', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '13', name: 'Yoga Mat', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/13', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '14', name: 'Water Bottle', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/14', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '15', name: 'Makeup Mirror', image: 'https://images.unsplash.com/photo-1522338242042-2d1c917f8161?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/15', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '16', name: 'Air Purifier', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/16', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '17', name: 'Book Stand', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/17', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '18', name: 'Desk Lamp', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/18', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
    { id: '19', name: 'Coffee Mug', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/19', cheaperOn: 'mate', cheaperUrl: 'https://mate.com' },
    { id: '20', name: 'Mouse Pad', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop', aliexpressUrl: 'https://aliexpress.com/item/20', cheaperOn: 'hypersku', cheaperUrl: 'https://hypersku.com' },
  ]
};

// Sample course progress data
const courseProgressData = [
  { slug: 'tiktok-shop-mastery', progress: 45, hoursSpent: 3.5 },
  { slug: 'ai-automation-systems', progress: 20, hoursSpent: 1.2 },
  { slug: 'facebook-ads-accelerator', progress: 0, hoursSpent: 0 },
];

type ContentTab = 'courses' | 'lessons' | 'creatives';
type AccentColor = 'lime' | 'mint' | 'forest' | 'sage' | 'neon' | 'gold' | 'blue' | 'purple' | 'coral' | 'teal';

// Green variants (row 1)
const greenVariants: { id: AccentColor; name: string }[] = [
  { id: 'lime', name: 'Lime' },
  { id: 'mint', name: 'Mint' },
  { id: 'forest', name: 'Forest' },
  { id: 'sage', name: 'Sage' },
  { id: 'neon', name: 'Neon' },
];

// Other accent colors (row 2)
const otherColors: { id: AccentColor; name: string }[] = [
  { id: 'gold', name: 'Gold' },
  { id: 'blue', name: 'Ocean' },
  { id: 'purple', name: 'Royal' },
  { id: 'coral', name: 'Sunset' },
  { id: 'teal', name: 'Teal' },
];

const allColors = [...greenVariants, ...otherColors];

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [userNiche, setUserNiche] = useState<string>("men's fashion");
  const [activeTab, setActiveTab] = useState<ContentTab>('courses');
  const [accentColor, setAccentColor] = useState<AccentColor>('lime');
  const courses = getAllCourses();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Load accent color from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('accent-color') as AccentColor | null;
    if (saved && allColors.some(c => c.id === saved)) {
      setAccentColor(saved);
      document.documentElement.setAttribute('data-accent', saved);
    }
  }, []);

  // Handle accent color change
  const handleAccentChange = (color: AccentColor) => {
    setAccentColor(color);
    document.documentElement.setAttribute('data-accent', color);
    localStorage.setItem('accent-color', color);
  };

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
              >
                <source src="https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>

          {/* $100M Checklist Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="checklist-block"
          >
            <div className="checklist-info">
              <h3 className="checklist-title">The $100M Checklist</h3>
              <p className="checklist-desc">There are 238 steps left to become a $100M entrepreneur.</p>
              <div className="checklist-progress-row">
                <div className="progress-bar-wrapper">
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: '4.8%' }} />
                  </div>
                </div>
                <span className="progress-text">12/250</span>
              </div>
            </div>
            <Link href="/checklist" className="btn-3d-premium">
              Continue
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Courses/Lessons/Creatives Block with Tabs */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="courses-section"
          >
            <div className="section-header-row">
              <div className="content-tabs">
                <button
                  className={`content-tab ${activeTab === 'courses' ? 'active' : ''}`}
                  onClick={() => setActiveTab('courses')}
                >
                  Courses
                </button>
                <button
                  className={`content-tab ${activeTab === 'lessons' ? 'active' : ''}`}
                  onClick={() => setActiveTab('lessons')}
                >
                  Lessons
                </button>
                <button
                  className={`content-tab ${activeTab === 'creatives' ? 'active' : ''}`}
                  onClick={() => setActiveTab('creatives')}
                >
                  Creatives
                </button>
              </div>
              <Link
                href={activeTab === 'courses' ? '/courses' : activeTab === 'lessons' ? '/learn' : '/ads/meta-templates'}
                className="see-all-link"
              >
                See all <ChevronRight size={14} />
              </Link>
            </div>

            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div className="courses-list">
                {courses.slice(0, 4).map((course) => {
                  const progress = courseProgressData.find(p => p.slug === course.slug);
                  const progressValue = progress?.progress || 0;
                  const circumference = 2 * Math.PI * 18;
                  const strokeDashoffset = circumference - (progressValue / 100) * circumference;
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
                        </div>
                      </div>
                      <div className="course-progress-circle">
                        <svg width="44" height="44" viewBox="0 0 44 44">
                          <circle className="progress-bg" cx="22" cy="22" r="18" />
                          <circle
                            className="progress-fill"
                            cx="22"
                            cy="22"
                            r="18"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                          />
                        </svg>
                        <span className="course-progress-text">{progressValue}%</span>
                      </div>
                      <Link href={`/courses/${course.slug}`} className="btn-course-view">
                        {progressValue > 0 ? 'Continue' : 'Start'}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Lessons Tab - 3x3 Grid */}
            {activeTab === 'lessons' && (
              <div className="lessons-grid">
                {incompleteLessons.slice(0, 9).map((lesson) => (
                  <Link
                    key={lesson.slug}
                    href={`/learn?lesson=${lesson.slug}`}
                    className="lesson-card-mini"
                  >
                    <div className="lesson-card-thumbnail">
                      <div className="lesson-thumb-icon">
                        <BookOpen size={24} />
                      </div>
                    </div>
                    <div className="lesson-card-content">
                      <span className="lesson-card-category">{lesson.category}</span>
                      <h4 className="lesson-card-title">{lesson.title}</h4>
                      <p className="lesson-card-desc">{lesson.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Creatives Tab - 3x3 Grid */}
            {activeTab === 'creatives' && (
              <div className="creatives-grid">
                {metaAdTemplates.slice(0, 9).map((template) => (
                  <a
                    key={template.id}
                    href={template.canvaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="creative-card"
                  >
                    <div className="creative-card-image">
                      <div className="creative-placeholder">
                        <Play size={24} />
                      </div>
                      <div className="creative-overlay">
                        <span className="creative-btn">
                          <ExternalLink size={14} />
                          Edit in Canva
                        </span>
                      </div>
                    </div>
                    <span className="creative-badge">#{template.id}</span>
                  </a>
                ))}
              </div>
            )}
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

          {/* Accent Color Picker */}
          <div className="accent-picker">
            <span className="accent-picker-label">Accent Color</span>

            {/* Green Variants Row */}
            <span className="accent-row-label">Greens</span>
            <div className="accent-picker-grid">
              {greenVariants.map((color) => (
                <button
                  key={color.id}
                  className={`accent-swatch ${accentColor === color.id ? 'active' : ''}`}
                  data-color={color.id}
                  onClick={() => handleAccentChange(color.id)}
                  title={color.name}
                />
              ))}
            </div>
            <div className="accent-picker-names">
              {greenVariants.map((color) => (
                <span key={color.id} className="accent-name">{color.name}</span>
              ))}
            </div>

            {/* Other Colors Row */}
            <span className="accent-row-label" style={{ marginTop: '12px' }}>Others</span>
            <div className="accent-picker-grid">
              {otherColors.map((color) => (
                <button
                  key={color.id}
                  className={`accent-swatch ${accentColor === color.id ? 'active' : ''}`}
                  data-color={color.id}
                  onClick={() => handleAccentChange(color.id)}
                  title={color.name}
                />
              ))}
            </div>
            <div className="accent-picker-names">
              {otherColors.map((color) => (
                <span key={color.id} className="accent-name">{color.name}</span>
              ))}
            </div>
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
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        {/* Info button and badge container */}
        <div
          className="product-info-container"
          onMouseEnter={() => setShowBadge(true)}
          onMouseLeave={() => setShowBadge(false)}
        >
          <button
            className="product-info-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowBadge(!showBadge);
            }}
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
        </div>
      </a>
      <p className="product-name">{product.name}</p>
    </div>
  );
}
