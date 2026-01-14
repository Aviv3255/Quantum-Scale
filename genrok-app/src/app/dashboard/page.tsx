'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BookOpen,
  ArrowRight,
  Clock,
  Play,
  ExternalLink,
  Info,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/auth';
import { useLessonProgressStore } from '@/store/lessonProgress';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LessonModal from '@/components/LessonModal';
import { BookmarkButton } from '@/components/BookmarkButton';
import { StatisticsChart } from '@/components/StatisticsChart';
import { getAllCourses } from '@/data/courses';
import { metaAdTemplates } from '@/data/meta-ad-templates';
import {
  aliexpressProducts,
  PRODUCT_CATEGORIES,
  type AffiliateProduct,
} from '@/data/aliexpress-products';
import { lessonMeta, getTotalLessonsCount } from '@/data/lessons';
import { supabase } from '@/lib/supabase';

// Category labels for display
const categoryLabels: Record<string, string> = {
  'home': 'Home Decor',
  'mens-fashion': "Men's Fashion",
  'womens-fashion': "Women's Fashion",
  'kids': 'Kids',
  'electronics': 'Electronics',
  'beauty': 'Beauty',
  'toys': 'Toys & Games',
  'sports': 'Sports & Outdoors',
  'other': 'Other',
};
import { getDefaultChecklist, hasChecklist } from '@/data/course-checklists';

// Timezone-based GIFs - randomly selected from each time period
const timeBasedGifs = {
  // Morning (5:00am - 11:59am)
  morning: [
    'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', // Coffee
    'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.runXIb_HMRUiT0_He_is_streching_his_arms_ha_2d6fbd3c-4b32-49eb-a5f7-c2b0f2d7bbbc_0.mp4', // Stretch
    'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', // Power Pose
  ],
  // Afternoon (12:00pm - 4:59pm)
  afternoon: [
    'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', // Focus
    'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', // Nod
    'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', // Point
  ],
  // Evening (5:00pm - 8:59pm)
  evening: [
    'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_back_in_chair_arms_behind_head_relaxed_850faa8d-67d9-4b68-8cae-277e0f191db1_1.mp4', // Lean Back
    'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Adjusting_glasses_thoughtfully_intellectual_ev_90f03bdd-89f1-4707-98c6-091573624247_2.mp4', // Glasses Adjust
    'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', // Slow Clap
  ],
  // Night (9:00pm - 4:59am)
  night: [
    'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', // Fist Pump
    'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Typing_rapidly_on_invisible_keyboard_completel_e28a1205-4e65-4eb7-908d-4eacbc5c3a49_1.mp4', // Typing
    'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.run4YtlydUb6iQ_He_is_doing_Military_salute_f147476f-7106-4200-bc87-65549ff24b91_2.mp4', // Salute
  ],
};

// Get random GIF based on current time
function getTimeBasedGif(): string {
  const hour = new Date().getHours();
  let gifs: string[];

  if (hour >= 5 && hour < 12) {
    gifs = timeBasedGifs.morning;
  } else if (hour >= 12 && hour < 17) {
    gifs = timeBasedGifs.afternoon;
  } else if (hour >= 17 && hour < 21) {
    gifs = timeBasedGifs.evening;
  } else {
    gifs = timeBasedGifs.night;
  }

  // Random selection from the time period's GIFs
  const randomIndex = Math.floor(Math.random() * gifs.length);
  return gifs[randomIndex];
}

// All available lessons with metadata - generated from real lessons data
const allLessons = Object.entries(lessonMeta).map(([slug, meta]) => ({
  slug,
  title: meta.title,
  description: meta.description,
  category: meta.categories[0] ? meta.categories[0].charAt(0).toUpperCase() + meta.categories[0].slice(1).replace('-', ' ') : 'General',
  totalSlides: 12, // Default slide count
}));

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

// Get daily randomized products from AliExpress products data (filtered by category)
function getDailyProducts(count: number = 20, userCategory?: string): AffiliateProduct[] {
  // Use date as seed for consistent daily rotation
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  // Filter by category if provided, otherwise use all products
  let productPool = userCategory
    ? aliexpressProducts.filter(p => p.category === userCategory)
    : aliexpressProducts;

  // If not enough products in category, add some from other categories
  if (productPool.length < count) {
    const otherProducts = aliexpressProducts.filter(p => p.category !== userCategory);
    productPool = [...productPool, ...otherProducts];
  }

  // Simple seeded shuffle
  const shuffled = [...productPool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor((Math.sin(seed + i) * 10000 + seed) % (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

// Helper to get checklist progress from localStorage (must match useChecklist hook key)
const CHECKLIST_STORAGE_PREFIX = 'course_checklist_progress_';

function getChecklistProgressForCourse(courseSlug: string): number {
  if (typeof window === 'undefined') return 0;
  try {
    // Use same key format as useChecklist hook: course_checklist_progress_${courseSlug}
    const storageKey = `${CHECKLIST_STORAGE_PREFIX}${courseSlug}`;
    const stored = localStorage.getItem(storageKey);
    if (!stored) return 0;
    const completedItems = JSON.parse(stored) as string[];
    const checklistItems = getDefaultChecklist(courseSlug);
    const taskItems = checklistItems.filter(item => !item.isCategory);
    if (taskItems.length === 0) return 0;
    return Math.round((completedItems.length / taskItems.length) * 100);
  } catch {
    return 0;
  }
}

// Calculate total completed courses from checklist data
function getCompletedCoursesFromChecklists(courseSlugs: string[]): number {
  if (typeof window === 'undefined') return 0;
  return courseSlugs.filter(slug => {
    const progress = getChecklistProgressForCourse(slug);
    return progress >= 100;
  }).length;
}

type ContentTab = 'courses' | 'lessons' | 'creatives' | 'cheatcodes';

// Free Cheat Codes - Essential tools that are completely free
const freeCheatCodes = [
  {
    id: 'mate',
    name: 'Mate',
    category: 'Private Agent',
    logo: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/COag0vSJxoUDEAE=.png',
    description: 'Your primary fulfillment weapon. 5-7 day worldwide shipping that crushes AliExpress. Cheaper prices, personal WhatsApp support, quality-checked products.',
    url: 'https://erp.matedropshipping.com/login?invite_id=915',
  },
  {
    id: 'hypersku',
    name: 'HyperSKU',
    category: 'Backup Agent',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T115639.885.png?v=1760086613',
    description: 'Smart sellers never rely on one source. 5-8 day shipping, WhatsApp support, quality inspection. Compare prices per order—always pick the winner.',
    url: 'https://www.hypersku.com/campaign/optimize-dropshipping/?ref=nmmwogq',
  },
  {
    id: 'keepcart',
    name: 'KeepCart',
    category: 'Profit Protection',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T122003.978.png?v=1760088020',
    description: 'Blocks 150+ coupon extensions like Honey from stealing your margins. Stops leaked discount codes dead. Saves 12% coupon abuse + 10-15% extra revenue.',
    url: 'https://apps.shopify.com/keepcart?mref=lsbqcbva',
  },
  {
    id: 'datadrew',
    name: 'DataDrew',
    category: 'Customer Intelligence',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Satoshi_3.jpg?v=1761567329',
    description: 'Know your customer LTV instantly. Target your top 10% spenders who drop $500+. Find the golden nuggets hiding in your ad data. Pure analytics power.',
    url: 'https://apps.shopify.com/customer-lifetime-value?mref=lsbqcbva',
  },
  {
    id: 'txtcart',
    name: 'TxtCart',
    category: 'Cart Recovery',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-12T140826.947.png?v=1760267314',
    description: 'AI SMS agent that feels human. Recovers 82% of abandoned carts through conversational texts. Trained on 50M+ conversations. Money-back guarantee.',
    url: 'https://txtcartapp.com/affiliate/?mref=lsbqcbva',
  },
  {
    id: 'geoconvert',
    name: 'Geo Convert',
    category: 'Geo Targeting',
    logo: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Geo%20Convert.jpg',
    description: 'Location-based purchasing power discounts. Proven 60-70% conversion lift. The easiest conversion cheat code that actually works.',
    url: 'https://geo-convert.com/',
    badge: 'Paid',
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  // Subscribe to the progress object directly for proper hydration reactivity
  const lessonProgress = useLessonProgressStore((state) => state.progress);
  const getProgress = useLessonProgressStore((state) => state.getProgress);
  const getProgressPercentage = useLessonProgressStore((state) => state.getProgressPercentage);
  const isLessonCompleted = useLessonProgressStore((state) => state.isLessonCompleted);
  const getCompletedLessonsCount = useLessonProgressStore((state) => state.getCompletedLessonsCount);
  const getLessonsCompletedByDay = useLessonProgressStore((state) => state.getLessonsCompletedByDay);
  const [activeTab, setActiveTab] = useState<ContentTab>('courses');
  const [checklistProgressMap, setChecklistProgressMap] = useState<Record<string, number>>({});
  const [currentGif, setCurrentGif] = useState<string>('');
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [customThumbnails, setCustomThumbnails] = useState<Record<string, string>>({});
  const courses = useMemo(() => getAllCourses(), []);

  // User's niche - default to mens-fashion (can be extended to fetch from profile)
  const userCategory = 'mens-fashion';

  // Get daily randomized products based on user's category
  const dailyProducts = useMemo(() => getDailyProducts(20, userCategory), [userCategory]);

  // Set timezone-based GIF on mount (random selection from time period)
  useEffect(() => {
    setCurrentGif(getTimeBasedGif());
  }, []);

  // Fetch custom thumbnails from Supabase for lessons tab
  useEffect(() => {
    async function fetchThumbnails() {
      try {
        const { data } = await (supabase
          .from('lesson_thumbnails') as ReturnType<typeof supabase.from>)
          .select('slug, thumbnail_url');

        if (data && Array.isArray(data)) {
          const thumbnailMap: Record<string, string> = {};
          data.forEach((item: { slug: string; thumbnail_url: string | null }) => {
            if (item.thumbnail_url) {
              thumbnailMap[item.slug] = item.thumbnail_url;
            }
          });
          setCustomThumbnails(thumbnailMap);
        }
      } catch (error) {
        console.error('Failed to fetch custom thumbnails:', error);
      }
    }
    fetchThumbnails();
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Load checklist progress for all courses (synced with useChecklist hook localStorage key)
  useEffect(() => {
    const progressMap: Record<string, number> = {};
    courses.forEach(course => {
      progressMap[course.slug] = getChecklistProgressForCourse(course.slug);
    });
    setChecklistProgressMap(progressMap);
  }, [courses]);

  // Sort lessons: in-progress first, then not started - EXCLUDE completed lessons
  const sortedLessons = useMemo(() => {
    const withProgress = allLessons.map((lesson) => {
      const progress = getProgress(lesson.slug);
      const percentage = getProgressPercentage(lesson.slug);
      const completed = isLessonCompleted(lesson.slug);
      return {
        ...lesson,
        progress: percentage,
        isCompleted: completed,
        isStarted: (progress?.completedSlides?.length || 0) > 0,
      };
    });

    // Filter out completed lessons (100% progress) - they don't show on dashboard
    const incomplete = withProgress.filter((lesson) => !lesson.isCompleted);

    // Sort: in-progress (started but not completed) first, then not started
    return incomplete.sort((a, b) => {
      if (a.isStarted && !b.isStarted) return -1;
      if (!a.isStarted && b.isStarted) return 1;
      return 0;
    });
  }, [lessonProgress, getProgress, getProgressPercentage, isLessonCompleted]);

  // Stats for the sidebar - using real data from stores (must be before early return)
  // Depends on lessonProgress for reactivity after hydration
  const completedLessonsCount = useMemo(() => {
    return getCompletedLessonsCount();
  }, [lessonProgress, getCompletedLessonsCount]);
  const totalLessons = allLessons.length;

  // Completed courses from checklist data (synced with useChecklist hook)
  // MUST be called before early return to maintain consistent hook order
  const completedCourses = useMemo(() => {
    return getCompletedCoursesFromChecklists(courses.map(c => c.slug));
  }, [courses, checklistProgressMap]);

  // Weekly progress data for chart - shows cumulative lessons completed over past 7 days
  // MUST be called before early return to maintain consistent hook order
  const weeklyData = useMemo(() => {
    const dailyProgress = getLessonsCompletedByDay(7);
    // Find max cumulative value for scaling the chart bars
    const maxValue = Math.max(...dailyProgress.map((d) => d.cumulative), 1);
    return dailyProgress.map((d) => ({
      day: d.day,
      value: d.cumulative,
      // Scale bar height as percentage of max value (min 15% for visibility)
      heightPercent: d.cumulative > 0 ? Math.max(15, (d.cumulative / maxValue) * 100) : 5,
    }));
  }, [lessonProgress, getLessonsCompletedByDay]);

  // Early return for loading state - AFTER all hooks
  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const { greeting, subtext } = getTimeBasedGreeting(userName);

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
              {currentGif && (
                <video
                  key={currentGif}
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={currentGif} type="video/mp4" />
                </video>
              )}
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
                <button
                  className={`content-tab ${activeTab === 'cheatcodes' ? 'active' : ''}`}
                  onClick={() => setActiveTab('cheatcodes')}
                >
                  Free Cheat Codes
                </button>
              </div>
              {activeTab !== 'cheatcodes' && (
                <Link
                  href={activeTab === 'courses' ? '/courses' : activeTab === 'lessons' ? '/learn' : '/ads/meta-templates'}
                  className="see-all-link"
                >
                  See all <ChevronRight size={14} />
                </Link>
              )}
            </div>

            {/* Courses Tab - synced with Courses page checklist progress */}
            {activeTab === 'courses' && (
              <div className="courses-list">
                {courses.slice(0, 4).map((course) => {
                  // Use checklist progress (same as Courses page)
                  const progressValue = checklistProgressMap[course.slug] || 0;
                  const circumference = 2 * Math.PI * 18;
                  const strokeDashoffset = circumference - (progressValue / 100) * circumference;
                  const courseHasChecklist = hasChecklist(course.slug);
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
                      {courseHasChecklist && (
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
                      )}
                      <Link href={`/courses/${course.slug}`} className="btn-course-view">
                        {progressValue > 0 ? 'Continue' : 'Start'}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Lessons Tab - 3x3 Grid with progress (completed lessons filtered out) */}
            {activeTab === 'lessons' && (
              <div className="lessons-grid">
                {sortedLessons.slice(0, 9).map((lesson) => {
                  // Use Supabase thumbnail if available, otherwise fallback to local
                  const thumbnailUrl = customThumbnails[lesson.slug] || `/images/lessons/${lesson.slug}.png`;
                  return (
                  <div
                    key={lesson.slug}
                    className="lesson-card-mini cursor-pointer"
                    onClick={() => setSelectedLesson(lesson.slug)}
                  >
                    <div className="lesson-card-thumbnail">
                      <Image
                        src={thumbnailUrl}
                        alt={lesson.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      {/* Bookmark button */}
                      <div className="absolute top-2 right-2 z-10">
                        <BookmarkButton
                          itemType="lesson"
                          itemId={lesson.slug}
                          title={lesson.title}
                          sourceUrl={`/learn?lesson=${lesson.slug}`}
                          description={lesson.description}
                          thumbnailUrl={thumbnailUrl}
                          size="sm"
                        />
                      </div>
                      {/* Progress bar at bottom for in-progress lessons */}
                      {lesson.isStarted && (
                        <div className="lesson-progress-bar">
                          <div
                            className="lesson-progress-fill"
                            style={{ width: `${lesson.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="lesson-card-content">
                      <div className="lesson-card-header">
                        <span className="lesson-card-category">{lesson.category}</span>
                        {lesson.isStarted && (
                          <span className="lesson-progress-badge">{lesson.progress}%</span>
                        )}
                      </div>
                      <h4 className="lesson-card-title">{lesson.title}</h4>
                      <p className="lesson-card-desc">{lesson.description}</p>
                    </div>
                  </div>
                  );
                })}
              </div>
            )}

            {/* Creatives Tab - 3x3 Grid */}
            {activeTab === 'creatives' && (
              <div className="creatives-grid">
                {/* Specific curated templates: 25, 28, 30, 49, 54, 67, 76, 84, 106 */}
                {metaAdTemplates
                  .filter((t) => [25, 28, 30, 49, 54, 67, 76, 84, 106].includes(t.id))
                  .map((template) => (
                  <a
                    key={template.id}
                    href={template.canvaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="creative-card"
                  >
                    <div className="creative-card-image">
                      {template.coverImage ? (
                        <img
                          src={template.coverImage}
                          alt={template.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            const placeholder = (e.target as HTMLImageElement).nextElementSibling;
                            if (placeholder) placeholder.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`creative-placeholder ${template.coverImage ? 'hidden' : ''}`}>
                        <Play size={24} />
                      </div>
                      <div className="creative-overlay">
                        <span className="creative-btn">
                          <ExternalLink size={14} />
                          Edit in Canva
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* Free Cheat Codes Tab */}
            {activeTab === 'cheatcodes' && (
              <div className="cheatcodes-grid">
                {freeCheatCodes.map((cheat) => (
                  <a
                    key={cheat.id}
                    href={cheat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cheatcode-card"
                  >
                    <div className="cheatcode-logo-wrapper">
                      <img
                        src={cheat.logo}
                        alt={cheat.name}
                        className="cheatcode-logo"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      {/* Badge - FREE or Paid */}
                      <div className={`cheatcode-free-badge ${cheat.badge === 'Paid' ? 'paid' : ''}`}>
                        {cheat.badge || 'FREE'}
                      </div>
                    </div>
                    <div className="cheatcode-content">
                      <div className="cheatcode-header">
                        <h4 className="cheatcode-name">{cheat.name}</h4>
                        <span className="cheatcode-category">{cheat.category}</span>
                      </div>
                      <p className="cheatcode-desc">{cheat.description}</p>
                      <div className="cheatcode-cta">
                        <span>Get Started</span>
                        <ExternalLink size={14} />
                      </div>
                    </div>
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
                <h2 className="section-title-left">Products to Test Today</h2>
                <p className="section-subtitle">Curated for your niche. High profit margins, proven sellers.</p>
              </div>
              <Link href="/products/sell-these" className="see-all-link">
                See all <ChevronRight size={14} />
              </Link>
            </div>
            <div className="products-scroll-container">
              <div className="products-scroll">
                {dailyProducts.map((product) => (
                  <DashboardProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </motion.section>
        </div>

        {/* Right Sidebar - Statistics */}
        <div className="dashboard-sidebar">
          {/* Lesson Stats */}
          <div className="stats-card">
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-number">{completedLessonsCount}</span>
                <span className="stat-label-small">Lessons<br/>Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{completedCourses}</span>
                <span className="stat-label-small">Courses<br/>Completed</span>
              </div>
            </div>
          </div>

          {/* Learning Progress Chart */}
          <StatisticsChart
            getDataByDays={getLessonsCompletedByDay}
            totalCompleted={completedLessonsCount}
            totalLessons={totalLessons}
          />

          {/* Monkey Assistant - Private Agent Connection */}
          <PrivateAgentAssistant userName={userName?.split(' ')[0] || 'there'} />

        </div>
      </div>

      {/* Lesson Modal */}
      {selectedLesson && lessonMeta[selectedLesson] && (
        <LessonModal
          slug={selectedLesson}
          title={lessonMeta[selectedLesson].title}
          description={lessonMeta[selectedLesson].description}
          userName={userName}
          onClose={() => setSelectedLesson(null)}
          thumbnailUrl={customThumbnails[selectedLesson] || `/images/lessons/${selectedLesson}.png`}
        />
      )}
    </DashboardLayout>
  );
}

// Dashboard Product Card Component - Using AliExpress products data
function DashboardProductCard({ product }: { product: AffiliateProduct }) {
  const [imageError, setImageError] = useState(false);

  // Get partner badge info
  const partnerBadge = {
    mate: { color: 'bg-blue-500', text: 'Mate' },
    hypersku: { color: 'bg-purple-500', text: 'HyperSKU' },
    aliexpress: { color: 'bg-orange-500', text: 'AliExpress' },
  };
  const badge = partnerBadge[product.partner] || partnerBadge.aliexpress;

  return (
    <div className="product-card">
      <a
        href={product.affiliate_link}
        target="_blank"
        rel="noopener noreferrer"
        className="product-image-wrapper"
      >
        {!imageError ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="product-image"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="product-image product-placeholder">
            <span className="product-placeholder-text">{product.name.charAt(0)}</span>
          </div>
        )}
        {/* Partner badge */}
        <div className={`product-trending-badge ${badge.color}`}>
          {badge.text}
        </div>
      </a>
      <p className="product-name">{product.name}</p>
      <p className="product-niche">{categoryLabels[product.category] || product.category}</p>
    </div>
  );
}

// Private Agent Assistant Component - with monkey GIF
function PrivateAgentAssistant({ userName }: { userName: string }) {
  const [isConnected, setIsConnected] = useState(false);

  // Check localStorage for connected state
  useEffect(() => {
    const connected = localStorage.getItem('private-agent-connected');
    if (connected === 'true') setIsConnected(true);
  }, []);

  const handleConnected = () => {
    setIsConnected(true);
    localStorage.setItem('private-agent-connected', 'true');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="private-agent-assistant"
    >
      {/* Monkey Video - Full, uncropped */}
      <div className="assistant-video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="assistant-video"
        >
          <source src="https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.runs2s9JHgJNwU_Hes_Waving._Transparnt_back_d371cb21-5266-4407-a7d3-bfe409098498_2.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Speech Bubble */}
      <div className="assistant-bubble">
        {isConnected ? (
          <p className="assistant-message success">
            Awesome! You&apos;re all set up!
          </p>
        ) : (
          <>
            <p className="assistant-message">
              Hey <strong>{userName}</strong>! Have you connected a Private Agent yet?
            </p>
            <div className="assistant-buttons">
              <a
                href="https://erp.matedropshipping.com/login?invite_id=915"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d-premium assistant-btn"
              >
                Connect main Agent
                <ArrowRight size={16} />
              </a>
              <a
                href="https://www.hypersku.com/campaign/optimize-dropshipping/?ref=nmmwogq"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d-premium assistant-btn"
              >
                Connect backup agent
                <ArrowRight size={16} />
              </a>
              <button
                onClick={handleConnected}
                className="assistant-btn-text"
              >
                I&apos;ve already connected
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
