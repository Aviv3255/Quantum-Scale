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

// Lesson category types
type LessonCategory = 'copywriting' | 'psychology' | 'branding' | 'meta-ads' | 'google-ads' | 'business';

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

// Import lesson metadata (simplified version - same data structure as learn page)
const lessonMeta: Record<string, { title: string; description: string; categories: LessonCategory[]; duration?: string }> = {
  'familiar-surprise-secret': { title: 'The Familiar Surprise Secret', description: 'Master the MAYA principle - the key to creating products that feel both fresh and familiar.', categories: ['copywriting'], duration: '8 min' },
  'red-button-effect': { title: 'The Red Button Effect', description: 'Understanding psychological reactance and how to use restriction to increase desire.', categories: ['copywriting', 'psychology'], duration: '6 min' },
  'fred-method': { title: 'The F.R.E.D. Method', description: 'A powerful framework for understanding your audience psychology and what truly motivates them.', categories: ['copywriting'], duration: '10 min' },
  'emotion-decides': { title: 'Emotion Decides, Logic Justifies', description: 'Discover how emotions drive every purchase decision and logic merely justifies it afterward.', categories: ['copywriting', 'psychology'], duration: '7 min' },
  'gatekeeper-method': { title: 'The Gatekeeper Method', description: 'Learn to bypass the brain\'s attention filter and get your message through.', categories: ['copywriting'], duration: '9 min' },
  'three-second-rule': { title: 'The 3-Second Rule', description: 'The critical window to capture attention before your prospect scrolls away forever.', categories: ['copywriting'], duration: '5 min' },
  'science-of-selling': { title: 'The Science of Selling', description: 'A systematic approach to conversion that removes guesswork from your sales process.', categories: ['copywriting'], duration: '12 min' },
  'persuasion-blueprint': { title: 'The Persuasion Blueprint', description: 'The master plan for creating influential copy that moves people to action.', categories: ['copywriting'], duration: '11 min' },
  'persuasion-stack': { title: 'The Persuasion Stack', description: 'Layer persuasion techniques for maximum impact on your audience.', categories: ['copywriting'], duration: '8 min' },
  'architecture-of-influence': { title: 'Architecture of Influence', description: 'Build a framework of persuasive communication that consistently converts.', categories: ['copywriting'], duration: '10 min' },
  'autopilot-sale': { title: 'The Autopilot Sale', description: 'How mental shortcuts make customers buy without thinking - and how to trigger them.', categories: ['psychology'], duration: '7 min' },
  'borrowed-trust': { title: 'Borrowed Trust', description: 'Authority and Liking principles that bypass skepticism and build instant credibility.', categories: ['psychology'], duration: '6 min' },
  'herd-instinct': { title: 'The Herd Instinct', description: 'Social proof and similar others create irresistible buying pressure.', categories: ['psychology'], duration: '8 min' },
  'gift-that-sells': { title: 'The Gift That Sells', description: 'Reciprocity loops that drive sales and create loyal customers.', categories: ['psychology'], duration: '5 min' },
  'micro-yes-mastery': { title: 'Micro-Yes Mastery', description: 'Tiny commitments that lead to inevitable conversions.', categories: ['psychology'], duration: '9 min' },
  'authority-over-hope': { title: 'Authority Over Hope', description: 'Stop hoping they buy. Guide them with certainty and confidence.', categories: ['psychology'], duration: '7 min' },
  'certainty-transfer': { title: 'Certainty Transfer', description: 'Master the art of transferring your conviction to your prospects.', categories: ['psychology'], duration: '6 min' },
  'fomo-engineering': { title: 'FOMO Engineering', description: 'Turn passive interest into urgent action with strategic scarcity.', categories: ['psychology'], duration: '8 min' },
  'framing-effect-mastery': { title: 'The Framing Effect', description: 'Same facts, wildly different decisions. Control the frame, control the sale.', categories: ['psychology'], duration: '10 min' },
  'identity-marketing': { title: 'Identity Marketing', description: 'Sell to who they WANT to be, not who they are today.', categories: ['psychology', 'branding'], duration: '9 min' },
  'hero-mechanism': { title: 'The $4,225 Question', description: 'Why Oura Ring costs $399 vs $12 knockoff - and how to apply this to your brand.', categories: ['branding'], duration: '8 min' },
  'us-vs-them': { title: 'The David vs Goliath Play', description: 'Create tribal identity through enemies and build a movement.', categories: ['branding'], duration: '7 min' },
  'brand-universe': { title: 'Build a World, Not Just a Store', description: 'Create universes that customers want to belong to.', categories: ['branding'], duration: '11 min' },
  'product-to-identity': { title: 'From Product to Identity Purchase', description: 'Transform commodities into identity purchases.', categories: ['branding'], duration: '9 min' },
  'commodity-escape': { title: 'The Commodity Trap', description: 'How Starbucks charges $6 for $0.50 coffee - escape the commodity trap.', categories: ['branding'], duration: '10 min' },
  'meta-andromeda': { title: 'Meta\'s Andromeda Brain', description: 'How to operate under Meta\'s new AI algorithm for maximum results.', categories: ['meta-ads'], duration: '12 min' },
  'meta-three-second-hook': { title: 'The 3-Second Hook Rule', description: 'Meta judges your creative in the first 3 seconds - make them count.', categories: ['meta-ads'], duration: '6 min' },
  'meta-70-20-10-rule': { title: 'The 70/20/10 Creative Rule', description: '70% proven, 20% iteration, 10% wild experiments for optimal results.', categories: ['meta-ads'], duration: '8 min' },
  'meta-auction-formula': { title: 'The Meta Auction Formula', description: 'Total Value = Bid × EAR × Quality - master the algorithm.', categories: ['meta-ads'], duration: '10 min' },
  'golden-lookalike': { title: 'Golden Lookalike Audience', description: 'LLA on top 5% spenders = $8-10 CAC consistently.', categories: ['meta-ads'], duration: '7 min' },
  'google-highest-cpa-wins': { title: 'Why The Highest CPA Wins', description: 'The counterintuitive truth about Google Ads dominance.', categories: ['google-ads'], duration: '9 min' },
  'google-product-feed-mastery': { title: 'Your Product Feed IS Your Ad', description: 'The hidden weapon for Shopping & PMax success.', categories: ['google-ads'], duration: '11 min' },
  'google-pmax-blueprint': { title: 'The PMax Asset Group Blueprint', description: 'Stop forcing Google AI to guess - give it what it needs.', categories: ['google-ads'], duration: '10 min' },
  'google-brand-moat': { title: 'Brand is the Ultimate Moat', description: 'The barrier competitors can\'t copy with a bigger budget.', categories: ['google-ads', 'branding'], duration: '8 min' },
  'biz-infinite-money-engine': { title: 'The Infinite Money Engine', description: 'The single equation that transforms eCommerce into a video game with unlimited money.', categories: ['business'], duration: '15 min' },
  'biz-leverage-equation': { title: 'The Leverage Equation', description: 'Stop working harder. Start working smarter with the equation that changes everything.', categories: ['business'], duration: '10 min' },
  'biz-3x-threshold': { title: 'The 3x Threshold', description: 'The single equation that separates struggling stores from money-printing machines.', categories: ['business'], duration: '8 min' },
  'biz-hamster-wheel': { title: 'The Hamster Wheel Trap', description: 'The Matrix-level prison keeping 99% of eCommerce stores broke—and how to escape.', categories: ['business'], duration: '12 min' },
  'biz-rfm-secret': { title: 'The RFM Secret', description: 'How to identify your best customers and make more money from fewer people.', categories: ['business'], duration: '9 min' },
};

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

  // Theme toggle for hero background testing
  const [darkHeroTheme, setDarkHeroTheme] = useState<'teal' | 'black'>('teal');

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

  // GIF URLs based on theme
  const heroGifUrl = darkHeroTheme === 'teal'
    ? 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.runo_qvuMBi9F8_Hes_Sitting_in_an_armchair__f7ab94d4-3768-4020-8cf1-cf9f8a0b3f97_3.mp4'
    : 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.rune5QZBsAMPH0_Hes_Sitting_in_an_armchair__88cd26df-2e06-4ccd-9444-4fc742120d5f_3.mp4';

  const heroBackgroundColor = darkHeroTheme === 'teal' ? '#0f2f2c' : '#000000';

  return (
    <DashboardLayout>
      <Suspense fallback={null}>
        <LessonParamsHandler onLessonOpen={handleLessonFromUrl} />
      </Suspense>

      {/* Main Content with FAFAFA background */}
      <div className="min-h-screen" style={{ background: '#FAFAFA', margin: '-40px -48px', padding: '0' }}>

        {/* Hero Section */}
        <AnimatePresence mode="wait">
          {expandedLesson && expandedLessonInfo ? (
            // Expanded Lesson Hero
            <motion.div
              key="expanded-hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full overflow-hidden"
              style={{ height: '480px' }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={customThumbnails[expandedLesson] || `/images/lessons/${expandedLesson}.png`}
                  alt={expandedLessonInfo.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* White gradient overlay at bottom */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, #FAFAFA 0%, rgba(250, 250, 250, 0.9) 20%, rgba(250, 250, 250, 0.4) 50%, transparent 100%)'
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
            // Default Hero - The Billionaire's Theater
            <motion.div
              key="default-hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full overflow-hidden"
              style={{ height: '400px', backgroundColor: heroBackgroundColor }}
            >
              {/* Theme Toggle - Top Right */}
              <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
                <span className="text-white/60 text-sm">Theme:</span>
                <button
                  onClick={() => setDarkHeroTheme(darkHeroTheme === 'teal' ? 'black' : 'teal')}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{
                    backgroundColor: darkHeroTheme === 'teal' ? '#0f2f2c' : '#000',
                    color: 'var(--accent-primary)',
                    border: '1px solid var(--accent-primary)'
                  }}
                >
                  {darkHeroTheme === 'teal' ? 'Teal' : 'Black'}
                </button>
              </div>

              {/* Character GIF - Right Side */}
              <div className="absolute right-0 bottom-0 h-[80%] aspect-square">
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
                {/* Heading with fancy font */}
                <h1
                  className="text-5xl font-bold text-white mb-4"
                  style={{
                    fontFamily: "'Playfair Display', 'Georgia', serif",
                    letterSpacing: '-0.02em'
                  }}
                >
                  The Billionaire&apos;s Theater
                </h1>

                {/* Subheading */}
                <p className="text-xl text-white/80 mb-8">
                  {userName}, unlock the secrets that built empires.
                </p>

                {/* Progress Bar */}
                <div className="w-full max-w-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/60 text-sm font-medium">Your Progress</span>
                    <span className="text-white font-semibold">
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
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }
                  `}
                  style={isActive ? { color: 'var(--accent-primary)' } : undefined}
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

                    {/* Lessons Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
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
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={thumbnailSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
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
