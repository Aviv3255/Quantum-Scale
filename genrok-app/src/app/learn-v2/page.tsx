'use client';

import { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Clock,
  Play,
  Bookmark,
  Search,
  PenTool,
  Brain,
  Palette,
  Target,
  Briefcase,
  CheckCircle2,
  X,
  ChevronRight,
} from 'lucide-react';
import { useLessonProgressStore } from '@/store/lessonProgress';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LessonModal from '@/components/LessonModal';
import { getUserProfile, supabase } from '@/lib/supabase';
import { BookmarkButton } from '@/components/BookmarkButton';
import { lessonMeta, LessonCategory, LessonMeta, getLessonCategoryCounts as getSharedLessonCategoryCounts } from '@/data/lessons';

// Lesson categories for tabs
const lessonCategories = [
  { id: 'all', name: 'All Lessons', icon: BookOpen },
  { id: 'copywriting', name: 'Copywriting', icon: PenTool },
  { id: 'psychology', name: 'Psychology', icon: Brain },
  { id: 'branding', name: 'Branding', icon: Palette },
  { id: 'meta-ads', name: 'Meta Ads', icon: Target },
  { id: 'google-ads', name: 'Google Ads', icon: Search },
  { id: 'business', name: 'Business', icon: Briefcase },
] as const;

// Component to handle URL search params
function LessonParamsHandler({
  onLessonOpen
}: {
  onLessonOpen: (slug: string, slide: number | null) => void
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const lessonParam = searchParams.get('lesson');
    const slideParam = searchParams.get('slide');

    if (lessonParam && lessonMeta[lessonParam]) {
      onLessonOpen(lessonParam, slideParam ? parseInt(slideParam, 10) : null);
      router.replace('/learn-v2', { scroll: false });
    }
  }, [searchParams, router, onLessonOpen]);

  return null;
}

export default function LearnV2Page() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [initialSlide, setInitialSlide] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>('Builder');
  const [activeLessonCategory, setActiveLessonCategory] = useState<string>('all');
  const [customThumbnails, setCustomThumbnails] = useState<Record<string, string>>({});
  const [hoveredLesson, setHoveredLesson] = useState<string | null>(null);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  // Progress tracking
  const getProgressPercentage = useLessonProgressStore((s) => s.getProgressPercentage);
  const isLessonCompleted = useLessonProgressStore((s) => s.isLessonCompleted);
  const getCompletedLessonsCount = useLessonProgressStore((s) => s.getCompletedLessonsCount);

  const totalLessons = Object.keys(lessonMeta).length;
  const completedLessons = getCompletedLessonsCount();

  // Fetch custom thumbnails
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

  // Callback for URL params handler
  const handleLessonFromUrl = useCallback((slug: string, slide: number | null) => {
    setSelectedLesson(slug);
    setInitialSlide(slide);
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Fetch user's name
  useEffect(() => {
    const fetchUserName = async () => {
      if (!user) return;
      const metaName = user.user_metadata?.full_name;
      if (metaName) {
        setUserName(metaName.split(' ')[0]);
        return;
      }
      const { data: profile } = await getUserProfile(user.id);
      if (profile?.full_name) {
        setUserName(profile.full_name.split(' ')[0]);
      }
    };
    fetchUserName();
  }, [user]);

  // Handle opening a lesson
  const openLesson = useCallback((slug: string) => {
    setSelectedLesson(slug);
  }, []);

  // Handle closing a lesson
  const closeLesson = useCallback(() => {
    setSelectedLesson(null);
    setInitialSlide(null);
    setExpandedLesson(null);
  }, []);

  // Handle clicking a lesson card (expand it in hero)
  const handleLessonCardClick = useCallback((slug: string) => {
    setExpandedLesson(slug);
  }, []);

  // Close expanded lesson
  const closeExpandedLesson = useCallback(() => {
    setExpandedLesson(null);
  }, []);

  // Get lesson info for modal
  const selectedLessonInfo = selectedLesson ? lessonMeta[selectedLesson] : null;
  const expandedLessonInfo = expandedLesson ? lessonMeta[expandedLesson] : null;

  // Calculate category counts
  const lessonCategoryCounts = useMemo(() => {
    const allLessonSlugs = Object.keys(lessonMeta);
    const counts: Record<string, number> = { all: allLessonSlugs.length };

    lessonCategories.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = Object.values(lessonMeta).filter((m) =>
          m.categories.includes(cat.id as LessonCategory)
        ).length;
      }
    });

    return counts;
  }, []);

  // Filter lessons by category and search
  const filteredLessons = useMemo(() => {
    return Object.entries(lessonMeta).filter((entry) => {
      const meta = entry[1];
      const matchesCategory = activeLessonCategory === 'all' ||
        meta.categories.includes(activeLessonCategory as LessonCategory);
      const matchesSearch = !searchQuery ||
        meta.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meta.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeLessonCategory, searchQuery]);

  // Group lessons by category for display
  const lessonsByCategory = useMemo(() => {
    const grouped: Record<string, Array<[string, typeof lessonMeta[string]]>> = {};

    if (activeLessonCategory === 'all') {
      // Group by first category of each lesson
      filteredLessons.forEach(([slug, meta]) => {
        const primaryCategory = meta.categories[0];
        if (!grouped[primaryCategory]) {
          grouped[primaryCategory] = [];
        }
        grouped[primaryCategory].push([slug, meta]);
      });
    } else {
      // Single category view
      grouped[activeLessonCategory] = filteredLessons;
    }

    return grouped;
  }, [filteredLessons, activeLessonCategory]);

  // Category labels
  const categoryLabels: Record<string, string> = {
    'copywriting': 'Copywriting',
    'psychology': 'Psychology',
    'branding': 'Branding',
    'meta-ads': 'Meta Ads',
    'google-ads': 'Google Ads',
    'business': 'Business',
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  // Hero GIF and background - black theme only
  const heroGifUrl = 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.rune5QZBsAMPH0_Hes_Sitting_in_an_armchair__88cd26df-2e06-4ccd-9444-4fc742120d5f_3.mp4';
  const heroBackgroundColor = '#000000';

  return (
    <DashboardLayout hideHeader>
      <Suspense fallback={null}>
        <LessonParamsHandler onLessonOpen={handleLessonFromUrl} />
      </Suspense>

      {/* Main Content with FAFAFA background - no horizontal scroll */}
      <div
        className="min-h-screen"
        style={{
          background: '#FAFAFA',
          marginTop: '-40px',
          overflowX: 'clip'
        }}
      >

        {/* Hero Section - extends to left edge */}
        <AnimatePresence mode="wait">
          {expandedLesson && expandedLessonInfo ? (
            // Expanded Lesson Hero - 75% viewport height, flush with sidebar
            <motion.div
              key="expanded-hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative overflow-hidden"
              style={{
                height: '75vh',
                marginLeft: '-48px',
                marginRight: '-48px',
                width: 'calc(100% + 96px)'
              }}
            >
              {/* Background Image - show full top, minimal cut */}
              <div className="absolute inset-0">
                <Image
                  src={customThumbnails[expandedLesson] || `/images/lessons/${expandedLesson}.png`}
                  alt={expandedLessonInfo.title}
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center top' }}
                  sizes="100vw"
                  quality={95}
                  priority
                />
                {/* Subtle gradient overlay at bottom only */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, #FAFAFA 0%, rgba(250, 250, 250, 0.9) 5%, rgba(250, 250, 250, 0.4) 12%, transparent 20%)'
                  }}
                />
              </div>

              {/* Close button */}
              <button
                onClick={closeExpandedLesson}
                className="absolute top-6 right-6 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <X size={24} className="text-white" />
              </button>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-12 z-10">
                <div className="max-w-4xl">
                  {/* Categories */}
                  <div className="flex gap-2 mb-4">
                    {expandedLessonInfo.categories.map((cat) => (
                      <span
                        key={cat}
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: 'var(--accent-primary)', color: '#000' }}
                      >
                        {categoryLabels[cat]}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl font-bold text-[#1a1a1a] mb-3">
                    {expandedLessonInfo.title}
                  </h1>

                  {/* Description */}
                  <p className="text-lg text-[#4a4a4a] mb-6 max-w-2xl">
                    {expandedLessonInfo.description}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center gap-6 mb-6 text-[#6a6a6a]">
                    <div className="flex items-center gap-2">
                      <Clock size={18} />
                      <span className="font-medium">{expandedLessonInfo.duration || '5 min'}</span>
                    </div>
                    {isLessonCompleted(expandedLesson) && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle2 size={18} />
                        <span className="font-medium">Completed</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4">
                    {/* Start Lesson - 3D Green Gradient Button */}
                    <button
                      onClick={() => openLesson(expandedLesson)}
                      className="btn-3d-premium flex items-center gap-3 px-8 py-4 text-lg"
                    >
                      <Play size={22} fill="currentColor" />
                      Start Lesson
                    </button>

                    {/* Bookmark Button */}
                    <BookmarkButton
                      itemType="lesson"
                      itemId={expandedLesson}
                      title={expandedLessonInfo.title}
                      sourceUrl={`/learn-v2?lesson=${expandedLesson}`}
                      description={expandedLessonInfo.description}
                      thumbnailUrl={customThumbnails[expandedLesson] || `/images/lessons/${expandedLesson}.png`}
                      size="lg"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            // Default Hero - The Billionaire's Theater, black background, flush with sidebar
            <motion.div
              key="default-hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative overflow-hidden"
              style={{
                height: '420px',
                backgroundColor: '#000000',
                marginLeft: '-48px',
                marginRight: '-48px',
                width: 'calc(100% + 96px)'
              }}
            >
              {/* Character GIF - Right Side (bigger and more centered) */}
              <div className="absolute right-[8%] bottom-0 h-[95%] aspect-square">
                <video
                  src={heroGifUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-auto object-contain object-bottom"
                />
              </div>

              {/* Content - Left Side */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-center pl-12 pr-4 max-w-2xl">
                {/* Heading with fancy font - BIGGER and WHITE */}
                <h1
                  className="text-7xl font-bold mb-5"
                  style={{
                    fontFamily: "'Playfair Display', 'Georgia', serif",
                    letterSpacing: '-0.02em',
                    textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                    color: '#FFFFFF'
                  }}
                >
                  The Billionaire&apos;s Theater
                </h1>

                {/* Subheading */}
                <p className="text-xl mb-8" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  {userName}, unlock the secrets that built empires.
                </p>

                {/* Progress Bar */}
                <div className="w-full max-w-md">
                  <div className="flex justify-between items-center mb-2">
                    <span style={{ color: 'rgba(255,255,255,0.6)' }} className="text-sm font-medium">Your Progress</span>
                    <span style={{ color: '#FFFFFF' }} className="font-semibold">
                      {completedLessons}/{totalLessons} Lessons
                    </span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(completedLessons / totalLessons) * 100}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: 'var(--accent-primary)' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="px-12 py-10">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide">
            {lessonCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeLessonCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveLessonCategory(cat.id)}
                  className={`
                    flex items-center gap-2 px-5 py-3 rounded-xl
                    transition-all whitespace-nowrap font-medium
                    ${isActive
                      ? 'bg-black shadow-lg'
                      : 'bg-white border border-gray-200 hover:bg-gray-50'
                    }
                  `}
                  style={{ color: isActive ? '#88da1c' : '#6b7280' }}
                >
                  <Icon size={18} strokeWidth={1.5} />
                  <span>{cat.name}</span>
                  <span className={`text-xs ${isActive ? 'opacity-70' : 'opacity-50'}`}>
                    ({lessonCategoryCounts[cat.id]})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Lessons Grid by Category */}
          <AnimatePresence mode="wait">
            {Object.keys(lessonsByCategory).length > 0 ? (
              <motion.div
                key={activeLessonCategory + searchQuery}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {Object.entries(lessonsByCategory).map(([category, lessons]) => (
                  <div key={category} className="mb-12">
                    {/* Category Header */}
                    {activeLessonCategory === 'all' && (
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        {categoryLabels[category]}
                        <span className="text-sm font-normal text-gray-400">
                          ({lessons.length})
                        </span>
                      </h2>
                    )}

                    {/* Lessons Grid - 4 per row max */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                      {lessons.map(([slug, meta]) => (
                        <LessonCard
                          key={slug}
                          slug={slug}
                          title={meta.title}
                          description={meta.description}
                          duration={meta.duration || '5 min'}
                          categories={meta.categories}
                          customThumbnail={customThumbnails[slug]}
                          onClick={() => handleLessonCardClick(slug)}
                          isHovered={hoveredLesson === slug}
                          onHover={() => setHoveredLesson(slug)}
                          onLeave={() => setHoveredLesson(null)}
                          progress={getProgressPercentage(slug)}
                          isCompleted={isLessonCompleted(slug)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No lessons found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Lesson Modal */}
      {selectedLesson && selectedLessonInfo && (
        <LessonModal
          slug={selectedLesson}
          title={selectedLessonInfo.title}
          description={selectedLessonInfo.description}
          userName={userName}
          onClose={closeLesson}
          initialSlide={initialSlide}
        />
      )}
    </DashboardLayout>
  );
}

// Lesson Card Component - Netflix Style
interface LessonCardProps {
  slug: string;
  title: string;
  description: string;
  duration: string;
  categories: LessonCategory[];
  customThumbnail?: string;
  onClick: () => void;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  progress: number;
  isCompleted: boolean;
}

function LessonCard({
  slug,
  title,
  description,
  duration,
  categories,
  customThumbnail,
  onClick,
  isHovered,
  onHover,
  onLeave,
  progress,
  isCompleted,
}: LessonCardProps) {
  const thumbnailSrc = customThumbnail || `/images/lessons/${slug}.png`;

  const categoryLabels: Record<LessonCategory, string> = {
    'copywriting': 'Copywriting',
    'psychology': 'Psychology',
    'branding': 'Branding',
    'meta-ads': 'Meta Ads',
    'google-ads': 'Google Ads',
    'business': 'Business',
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group relative text-left w-full"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      {/* Card with white background */}
      <div
        className="rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        {/* Thumbnail - high quality */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={thumbnailSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            quality={85}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />

          {/* Progress bar at bottom */}
          {progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  backgroundColor: 'var(--accent-primary)'
                }}
              />
            </div>
          )}

          {/* Completed badge */}
          {isCompleted && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
              <CheckCircle2 size={12} />
              Done
            </div>
          )}

          {/* Progress badge (if not completed) */}
          {progress > 0 && !isCompleted && (
            <div
              className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold text-black"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            >
              {progress}%
            </div>
          )}

          {/* Hover overlay with play button */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            >
              <Play size={24} className="text-black ml-1" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Duration */}
          <div className="flex items-center gap-1.5 text-gray-500 mb-2">
            <Clock size={14} />
            <span className="text-xs font-medium">{duration}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-black transition-colors">
            {title}
          </h3>
        </div>
      </div>
    </motion.button>
  );
}
