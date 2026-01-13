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
import { getAllCourses } from '@/data/courses';
import { metaAdTemplates } from '@/data/meta-ad-templates';
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

// All available lessons with metadata
const allLessons = [
  { slug: 'familiar-surprise-secret', title: 'The Familiar Surprise Secret', description: 'Master the MAYA principle', category: 'Copywriting', totalSlides: 12 },
  { slug: 'red-button-effect', title: 'The Red Button Effect', description: 'Understanding psychological reactance', category: 'Psychology', totalSlides: 10 },
  { slug: 'fred-method', title: 'The F.R.E.D. Method', description: 'A framework for audience psychology', category: 'Copywriting', totalSlides: 15 },
  { slug: 'emotion-decides', title: 'Emotion Decides, Logic Justifies', description: 'How emotions drive purchases', category: 'Psychology', totalSlides: 11 },
  { slug: 'gatekeeper-method', title: 'The Gatekeeper Method', description: "Bypass the brain's attention filter", category: 'Copywriting', totalSlides: 9 },
  { slug: 'three-second-rule', title: 'The 3-Second Rule', description: 'The critical window to capture attention', category: 'Copywriting', totalSlides: 8 },
  { slug: 'autopilot-sale', title: 'The Autopilot Sale', description: 'How mental shortcuts make customers buy', category: 'Psychology', totalSlides: 14 },
  { slug: 'borrowed-trust', title: 'Borrowed Trust', description: 'Authority principles that bypass skepticism', category: 'Psychology', totalSlides: 10 },
  { slug: 'herd-instinct', title: 'The Herd Instinct', description: 'Social proof creates buying pressure', category: 'Psychology', totalSlides: 12 },
  { slug: 'anchor-moments', title: 'Anchor Moments', description: 'Create memorable brand touchpoints', category: 'Marketing', totalSlides: 11 },
  { slug: 'anti-sell-mastery', title: 'Anti-Sell Mastery', description: 'Sell without being salesy', category: 'Copywriting', totalSlides: 13 },
  { slug: 'architecture-of-belief', title: 'Architecture of Belief', description: 'Build trust through storytelling', category: 'Psychology', totalSlides: 16 },
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

// Get daily randomized products from metaAdTemplates
function getDailyProducts(count: number = 20) {
  // Use date as seed for consistent daily rotation
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  // Simple seeded shuffle
  const templates = [...metaAdTemplates];
  for (let i = templates.length - 1; i > 0; i--) {
    const j = Math.floor((Math.sin(seed + i) * 10000 + seed) % (i + 1));
    [templates[i], templates[j]] = [templates[j], templates[i]];
  }

  return templates.slice(0, count).map((template, idx) => ({
    id: String(template.id),
    name: template.name,
    image: template.coverImage || '/images/placeholder.png',
    canvaLink: template.canvaLink,
    cheaperOn: idx % 2 === 0 ? 'mate' as const : 'hypersku' as const,
    cheaperUrl: idx % 2 === 0
      ? 'https://erp.matedropshipping.com/login?invite_id=915'
      : 'https://www.hypersku.com/campaign/optimize-dropshipping/?ref=nmmwogq',
  }));
}

// Helper to get checklist progress from localStorage (synced with Courses page)
function getChecklistProgressForCourse(userId: string, courseSlug: string): number {
  if (typeof window === 'undefined') return 0;
  try {
    const storageKey = `checklist-${courseSlug}-${userId}`;
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
function getCompletedCoursesFromChecklists(userId: string, courseSlugs: string[]): number {
  if (typeof window === 'undefined') return 0;
  return courseSlugs.filter(slug => {
    const progress = getChecklistProgressForCourse(userId, slug);
    return progress >= 100;
  }).length;
}

type ContentTab = 'courses' | 'lessons' | 'creatives';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const lessonProgressStore = useLessonProgressStore();
  const [activeTab, setActiveTab] = useState<ContentTab>('courses');
  const [checklistProgressMap, setChecklistProgressMap] = useState<Record<string, number>>({});
  const [currentGif, setCurrentGif] = useState<string>('');
  const courses = getAllCourses();

  // Get daily randomized products (memoized to prevent re-shuffling on every render)
  const dailyProducts = useMemo(() => getDailyProducts(20), []);

  // Set timezone-based GIF on mount (random selection from time period)
  useEffect(() => {
    setCurrentGif(getTimeBasedGif());
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Load checklist progress for all courses (synced with Courses page)
  useEffect(() => {
    if (user?.id) {
      const progressMap: Record<string, number> = {};
      courses.forEach(course => {
        progressMap[course.slug] = getChecklistProgressForCourse(user.id, course.slug);
      });
      setChecklistProgressMap(progressMap);
    }
  }, [user?.id, courses]);

  // Sort lessons: in-progress first, then not started
  const sortedLessons = useMemo(() => {
    const withProgress = allLessons.map((lesson) => {
      const progress = lessonProgressStore.getProgress(lesson.slug);
      const percentage = lessonProgressStore.getProgressPercentage(lesson.slug);
      const isCompleted = lessonProgressStore.isLessonCompleted(lesson.slug);
      return {
        ...lesson,
        progress: percentage,
        isCompleted,
        isStarted: (progress?.completedSlides?.length || 0) > 0,
      };
    });

    // Sort: in-progress (started but not completed) first, then not started, completed last
    return withProgress.sort((a, b) => {
      if (a.isCompleted && !b.isCompleted) return 1;
      if (!a.isCompleted && b.isCompleted) return -1;
      if (a.isStarted && !a.isCompleted && (!b.isStarted || b.isCompleted)) return -1;
      if (b.isStarted && !b.isCompleted && (!a.isStarted || a.isCompleted)) return 1;
      return 0;
    });
  }, [lessonProgressStore]);

  // Stats for the sidebar - using real data from stores (must be before early return)
  const completedLessons = lessonProgressStore.getCompletedLessonsCount();
  const totalLessons = allLessons.length;

  // Completed courses from checklist data (synced with Courses page)
  // MUST be called before early return to maintain consistent hook order
  const completedCourses = useMemo(() => {
    if (!user?.id) return 0;
    return getCompletedCoursesFromChecklists(user.id, courses.map(c => c.slug));
  }, [user?.id, courses, checklistProgressMap]);

  // Weekly progress data for chart - based on actual lesson progress
  // MUST be called before early return to maintain consistent hook order
  const weeklyData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const totalSlidesCompleted = lessonProgressStore.getTotalSlidesCompleted();
    const lessonsInProgress = lessonProgressStore.getLessonsInProgress().length;

    // Calculate total activity score based on real progress
    const activityScore = totalSlidesCompleted + (lessonsInProgress * 5) + (completedLessons * 10);

    // If no activity yet, show empty chart with message
    if (activityScore === 0) {
      return days.map((day) => ({ day, value: 0 }));
    }

    // Distribute actual progress across week with natural variation
    const basePerDay = Math.min(100, activityScore / 7);
    return days.map((day, i) => {
      const variation = Math.sin(i * 0.8 + Date.now() / 86400000) * 0.3 + 0.7;
      return { day, value: Math.min(100, Math.round(basePerDay * variation)) };
    });
  }, [lessonProgressStore, completedLessons]);

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
              </div>
              <Link
                href={activeTab === 'courses' ? '/courses' : activeTab === 'lessons' ? '/learn' : '/ads/meta-templates'}
                className="see-all-link"
              >
                See all <ChevronRight size={14} />
              </Link>
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

            {/* Lessons Tab - 3x3 Grid with progress */}
            {activeTab === 'lessons' && (
              <div className="lessons-grid">
                {sortedLessons.slice(0, 9).map((lesson) => (
                  <Link
                    key={lesson.slug}
                    href={`/learn?lesson=${lesson.slug}`}
                    className={`lesson-card-mini ${lesson.isCompleted ? 'completed' : ''}`}
                  >
                    <div className="lesson-card-thumbnail">
                      <div className="lesson-thumb-icon">
                        {lesson.isCompleted ? (
                          <CheckCircle2 size={24} className="text-[var(--primary)]" />
                        ) : (
                          <BookOpen size={24} />
                        )}
                      </div>
                      {/* Progress indicator */}
                      {lesson.isStarted && !lesson.isCompleted && (
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
                        {lesson.isStarted && !lesson.isCompleted && (
                          <span className="lesson-progress-badge">{lesson.progress}%</span>
                        )}
                        {lesson.isCompleted && (
                          <span className="lesson-completed-badge">Done</span>
                        )}
                      </div>
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
                <p className="section-subtitle">Fresh templates daily. Edit in Canva to create winning ads.</p>
              </div>
              <Link href="/products/sell-these" className="see-all-link">
                See all <ChevronRight size={14} />
              </Link>
            </div>
            <div className="products-scroll-container">
              <div className="products-scroll">
                {dailyProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
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
                <span className="stat-number">{completedLessons}</span>
                <span className="stat-label-small">Lessons<br/>Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{completedCourses}</span>
                <span className="stat-label-small">Courses<br/>Completed</span>
              </div>
            </div>
          </div>

          {/* Learning Progress Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Your Statistics</h3>
            </div>
            <div className="chart-placeholder">
              <div className="mini-chart">
                {weeklyData.map(({ day, value }) => (
                  <div key={day} className="chart-bar-wrapper">
                    <div
                      className="chart-bar"
                      style={{ height: `${Math.max(10, value)}%` }}
                    />
                    <span className="chart-label">{day.toLowerCase()}</span>
                  </div>
                ))}
              </div>
              <div className="chart-peak">
                <span className="peak-value">{completedLessons}/{totalLessons}</span>
                <span className="peak-label">Lessons Progress</span>
              </div>
            </div>
          </div>

          {/* Monkey Assistant - Private Agent Connection */}
          <PrivateAgentAssistant userName={userName?.split(' ')[0] || 'there'} />

        </div>
      </div>
    </DashboardLayout>
  );
}

// Product Card Component - Using metaAdTemplates
function ProductCard({ product }: { product: { id: string; name: string; image: string; canvaLink: string; cheaperOn: 'mate' | 'hypersku'; cheaperUrl: string } }) {
  const [showBadge, setShowBadge] = useState(false);

  return (
    <div className="product-card">
      <a
        href={product.canvaLink}
        target="_blank"
        rel="noopener noreferrer"
        className="product-image-wrapper"
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
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
