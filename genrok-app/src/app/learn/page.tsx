'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Clock,
  ChevronRight,
  Search,
  Sparkles,
  TrendingUp,
  Target,
  Zap,
  Users,
  BarChart3,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LessonModal from '@/components/LessonModal';
import { processedArticles as articles, Article } from '@/data/articles';
import { getUserProfile } from '@/lib/supabase';

// Lesson metadata for modal
const lessonMeta: Record<string, { title: string; description: string }> = {
  'familiar-surprise-secret': { title: 'The Familiar Surprise Secret', description: 'Master the MAYA principle' },
  'red-button-effect': { title: 'The Red Button Effect', description: 'Understanding psychological reactance' },
  'fred-method': { title: 'The F.R.E.D. Method', description: 'A framework for audience psychology' },
  'emotion-decides': { title: 'Emotion Decides, Logic Justifies', description: 'How emotions drive purchases' },
  'gatekeeper-method': { title: 'The Gatekeeper Method', description: 'Bypass the brain\'s attention filter' },
  'three-second-rule': { title: 'The 3-Second Rule', description: 'The critical window to capture attention' },
  'science-of-selling': { title: 'The Science of Selling', description: 'Systematic approach to conversion' },
  'persuasion-blueprint': { title: 'The Persuasion Blueprint', description: 'Master plan for influential copy' },
  'persuasion-stack': { title: 'The Persuasion Stack', description: 'Layered persuasion techniques' },
  'architecture-of-influence': { title: 'Architecture of Influence', description: 'Framework of persuasive communication' },
  'wiifm-principle': { title: 'The WIIFM Principle', description: 'What\'s In It For Me' },
  'three-canons-of-craft': { title: 'The Three Canons of Craft', description: 'Three tests every sentence must pass' },
  'cpppb-proof-loop': { title: 'The CPPPB Proof Loop', description: 'Five-element framework for persuasion' },
  'damaging-admission': { title: 'The Damaging Admission', description: 'Why revealing weakness builds trust' },
  'emotional-precision': { title: 'Emotional Precision', description: 'Target precise emotions that drive action' },
  'blind-spot-effect': { title: 'The Blind Spot Effect', description: 'What prospects can\'t see about themselves' },
  'customer-voice-mining': { title: 'Voice of Customer Mining', description: 'Extract the exact words customers use' },
  'double-bind-of-fear': { title: 'The Double Bind of Fear', description: 'Leverage action and inaction fears' },
  'emotion-spectrum': { title: 'The Emotion Spectrum', description: 'Map the full range of persuasive emotions' },
  'forty-forty-twenty-rule': { title: 'The 40/40/20 Rule', description: 'The marketing success formula' },
  'four-primal-needs': { title: 'The Four Primal Needs', description: 'Deep drivers behind every purchase' },
  'ocpb-formula': { title: 'The OCPB Formula', description: 'Offer, Copy, Proof, Bonus stack' },
  'sales-message-anatomy': { title: 'Sales Message Anatomy', description: 'Dissect what makes copy convert' },
  'self-persuasion-architecture': { title: 'Self-Persuasion Architecture', description: 'Let prospects convince themselves' },
  'structural-tension': { title: 'Structural Tension', description: 'Create irresistible forward momentum' },
  'three-growth-levers': { title: 'The Three Growth Levers', description: 'Customers, frequency, transaction size' },
  'three-levels-of-change': { title: 'The Three Levels of Change', description: 'Transform behavior, beliefs, identity' },
  'trust-architecture': { title: 'The Trust Architecture', description: 'Build unshakeable credibility' },
  'unique-mechanism': { title: 'The Unique Mechanism', description: 'Proprietary reason your solution works' },
  'master-key-framework': { title: 'The Master Key Framework', description: 'First-principles guide to copy' },
  'rule-of-one': { title: 'The Rule of One', description: 'One reader, one idea, one offer, one action' },
  'architecture-of-belief': { title: 'The Architecture of Belief', description: 'Three levels of mastery' },
  'copywriters-codex': { title: 'The Copywriter\'s Codex', description: 'A synthesized playbook from the masters' },
  // Article-based lessons
  'best-private-agent': { title: 'Who Is the Best Private Agent', description: '5-7 day shipping, 18/6 WhatsApp support' },
  'stop-aliexpress': { title: 'Stop Using AliExpress Now', description: 'Why AliExpress destroys your brand' },
  'ltv-cheat-code': { title: 'The LTV Cheat Code', description: 'How 5% of customers generate 95% of revenue' },
  'million-dollar-roadmap': { title: 'The Roadmap to $1M/Month', description: '33 customers per day formula' },
  'geo-announcement-bar': { title: 'GEO-Location Announcement Bar', description: '67% conversion rate increase' },
  'wishlist-effect': { title: 'The Wishlist Effect', description: 'Endowment Effect psychology (+8% CVR)' },
  'email-vs-sms': { title: 'Email vs SMS Revenue', description: 'Which generates more revenue?' },
  'abandoned-cart-recovery': { title: 'Abandoned Cart Recovery', description: 'AI SMS vs Email: 85% vs 60%' },
  'pareto-law-ecommerce': { title: 'The Pareto Law in eCommerce', description: '5% customers = 95% revenue' },
  'whatsapp-support': { title: 'Should You Add WhatsApp Support?', description: 'Why email-only is better' },
  'meta-attribution-test': { title: 'Is Meta Lying About Creatives?', description: 'Meta only tracks 67% of purchases' },
  'post-purchase-surveys': { title: 'Post Purchase Surveys', description: 'Know your customers with data' },
  'fonts-psychology': { title: 'The Truth About Fonts', description: 'How fonts affect trust and conversions' },
  // New article-based lessons (batch 2)
  'brand-search-campaign': { title: 'Brand Search Campaign', description: '18 ROAS on Google with brand search' },
  'swatch-variants': { title: 'Swatch Variants Test', description: '3.4% CVR increase with image swatches' },
  'buy-now-button': { title: 'Buy Now Button Analysis', description: 'Removing it increased REV/VISIT by 15.9%' },
  'rounded-button': { title: 'Rounded Add to Cart Button', description: '28px rounded = highest CVR' },
  'best-shopify-theme': { title: 'Best Shopify Theme', description: 'Shrine vs Impulse: 34.9% CVR difference' },
  'coupon-leaking': { title: 'Coupon Leaking Problem', description: 'Stop losing profit to extensions' },
  'meta-andromeda': { title: 'Meta\'s Andromeda Brain', description: 'How to operate under Meta\'s new AI' },
  'gillette-model': { title: 'The Gillette Model', description: 'Cheap entry, expensive consumables' },
  'best-niches-2026': { title: 'Best Niches for 2026', description: 'Niches with long customer journeys' },
  'two-meta-rules': { title: 'Two Meta Product Rules', description: 'Special enough + not too specific' },
  'pinned-comment-cac': { title: 'Pinned Comment CAC Trick', description: 'Reduce CAC with objection-handling comments' },
  'mastercard-psychology': { title: 'Mastercard Logo Effect', description: 'Payment logos increase willingness to pay' },
  'formula-to-sell': { title: 'The Formula to Sell Anything', description: '4 elements: Dream, Likelihood, Time, Effort' },
  'choose-products': { title: 'How to Choose Products', description: 'Two rules for winning products' },
  'gary-halbert-secret': { title: 'Gary Halbert\'s Secret', description: 'Sell what people already want' },
  'pet-rock-story': { title: 'Pet Rock: $30M from Rocks', description: 'How to sell meaning, not products' },
  'starbucks-ltv': { title: 'Starbucks $14,099 LTV', description: 'How 5% generate 95% of revenue' },
  'killer-headlines': { title: 'Killer Ad Headlines', description: '80% of success is in the headline' },
  'two-dirty-tricks': { title: 'Two Dirty Tricks to Sell', description: 'Dream Outcome + Social Proof' },
  'golden-lookalike': { title: 'Golden Lookalike Audience', description: 'LLA on top 5% spenders = $8-10 CAC' },
  'cbo-vs-abo': { title: 'CBO vs ABO Under Andromeda', description: 'ABO for testing, CBO for scaling' },
  'geo-personalization': { title: 'GEO Personalization Power', description: 'Location-based offers increase CVR' },
  'no-one-cares': { title: 'No One Cares About You', description: 'Self-interest drives all purchases' },
  'creative-volume-2026': { title: 'Creative Volume in 2026', description: '40-70 creatives weekly for Andromeda' },
  // Psychology of Sales lessons
  'autopilot-sale': { title: 'The Autopilot Sale', description: 'How mental shortcuts make customers buy without thinking' },
  'borrowed-trust': { title: 'Borrowed Trust', description: 'Authority and Liking principles that bypass skepticism' },
  'herd-instinct': { title: 'The Herd Instinct', description: 'Social proof and similar others create buying pressure' },
  'gift-that-sells': { title: 'The Gift That Sells', description: 'Reciprocity loops that drive sales' },
  'micro-yes-mastery': { title: 'Micro-Yes Mastery', description: 'Tiny commitments create inevitable conversions' },
  // Additional Psychology lessons
  'authority-over-hope': { title: 'Authority Over Hope', description: 'Stop hoping they buy. Guide them with certainty.' },
  'certainty-transfer': { title: 'Certainty Transfer', description: 'Master the art of transferring conviction' },
  'conviction-architecture': { title: 'Conviction Architecture', description: 'The 3-layer pyramid of influence' },
  'digital-pause-power': { title: 'The Digital Pause', description: 'Confident silence converts better than discounts' },
  'fomo-engineering': { title: 'FOMO Engineering', description: 'Turn passive interest into urgent action' },
  'framing-effect-mastery': { title: 'The Framing Effect', description: 'Same facts. Wildly different decisions.' },
  'identity-marketing': { title: 'Identity Marketing', description: 'Sell to who they WANT to be' },
  'marketers-delusion': { title: "The Marketer's Delusion", description: 'The fatal error killing conversions' },
  'pain-escalation-ladder': { title: 'The Pain Escalation Ladder', description: 'Ethically escalate pain to action' },
  'telescope-flip': { title: 'The Telescope Flip', description: '97% of marketers hold it backwards' },
  'trust-blueprint': { title: 'The Trust Blueprint', description: 'Build instant credibility that converts' },
  'value-perception-lever': { title: 'The Value Perception Lever', description: 'Make price irrelevant' },
  'three-brains-wallet': { title: 'The 3 Brains Controlling Your Customer\'s Wallet', description: 'Which brain controls the wallet' },
  'pre-suasion-hack': { title: 'The Pre-Suasion Hack', description: 'Win before the pitch' },
  'pattern-interrupts': { title: 'Pattern Interrupts', description: 'Hijack their attention' },
  'dopamine-blueprint': { title: 'The Dopamine Blueprint', description: 'Create addictive loops' },
  'anti-sell-mastery': { title: 'The Anti-Sell', description: 'Pull, don\'t push' },
};

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Articles', icon: BookOpen },
  { id: 'ltv', name: 'LTV & Growth', icon: TrendingUp },
  { id: 'conversion', name: 'Conversion', icon: Target },
  { id: 'marketing', name: 'Marketing', icon: Zap },
  { id: 'operations', name: 'Operations', icon: BarChart3 },
  { id: 'psychology', name: 'Psychology', icon: Users },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function LearnPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('Builder');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Fetch user's name for lesson personalization
  useEffect(() => {
    const fetchUserName = async () => {
      if (!user) return;

      // First try user_metadata
      const metaName = user.user_metadata?.full_name;
      if (metaName) {
        setUserName(metaName.split(' ')[0]);
        return;
      }

      // Fallback to profile
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
  }, []);

  // Get lesson info for modal
  const selectedLessonInfo = selectedLesson ? lessonMeta[selectedLesson] : null;

  const filteredArticles = useMemo(() => articles.filter((article) => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [activeCategory, searchQuery]);

  const featuredArticles = useMemo(() => filteredArticles.filter((a) => a.isFeatured), [filteredArticles]);
  const regularArticles = useMemo(() => filteredArticles.filter((a) => !a.isFeatured), [filteredArticles]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Page Header */}
        <header className="page-header">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1>Learning Center</h1>
              <p>38+ in-depth articles on scaling strategies and proven systems</p>
            </div>

            {/* Search */}
            <div className="search-input w-full md:w-72">
              <Search className="search-input-icon" size={18} strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
                style={{ paddingLeft: '44px' }}
              />
            </div>
          </div>
        </header>

        {/* Lesson Modal - opens ON TOP of everything */}
        {selectedLesson && selectedLessonInfo && (
          <LessonModal
            slug={selectedLesson}
            title={selectedLessonInfo.title}
            description={selectedLessonInfo.description}
            userName={userName}
            onClose={closeLesson}
          />
        )}

        {/* Categories Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all text-sm font-medium ${
                  isActive
                    ? 'bg-[var(--primary)]'
                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-light)] hover:bg-[var(--bg-hover)]'
                }`}
                style={isActive ? { color: '#FFFFFF' } : undefined}
              >
                <category.icon size={16} strokeWidth={1.5} style={isActive ? { color: '#FFFFFF' } : undefined} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="section">
            <div className="section-header">
              <Sparkles size={20} className="section-icon" />
              <h2 className="section-title">Featured Articles</h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid-3"
            >
              {featuredArticles.map((article) => (
                <motion.div key={article.id} variants={itemVariants}>
                  <ArticleCard article={article} featured onLessonClick={openLesson} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* All Articles */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              {activeCategory === 'all' ? 'All Articles' : categories.find(c => c.id === activeCategory)?.name}
              <span className="ml-2 font-normal text-[var(--text-muted)]">
                ({filteredArticles.length})
              </span>
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {filteredArticles.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid-3"
              >
                {regularArticles.map((article) => (
                  <motion.div key={article.id} variants={itemVariants}>
                    <ArticleCard article={article} onLessonClick={openLesson} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="empty-state"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-[var(--bg-secondary)]">
                  <Search size={24} className="text-[var(--text-tertiary)]" strokeWidth={1.5} />
                </div>
                <h3>No articles found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </DashboardLayout>
  );
}

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  onLessonClick: (slug: string) => void;
}

function ArticleCard({ article, featured, onLessonClick }: ArticleCardProps) {
  // Check if this is a lesson (has directUrl like /learn/lessons/xxx)
  const isLesson = !!article.directUrl && article.directUrl.includes('/lessons/');

  // Extract slug from directUrl for lessons
  const lessonSlug = isLesson
    ? article.directUrl?.split('/lessons/')[1] || ''
    : '';

  // For lessons: open modal. For articles: navigate to page
  const handleClick = (e: React.MouseEvent) => {
    if (isLesson && lessonSlug) {
      e.preventDefault();
      onLessonClick(lessonSlug);
    }
  };

  // Link href - lessons will be intercepted by onClick, articles navigate normally
  const linkHref = isLesson ? '#' : `/learn/${article.slug}`;

  const CardContent = () => (
    <>
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-secondary)]">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        {featured && (
          <div className="absolute top-4 left-4 badge badge-primary">
            Featured
          </div>
        )}
        {isLesson && (
          <div className="absolute top-4 right-4 badge" style={{ backgroundColor: '#7c3aed', color: 'white' }}>
            Interactive Lesson
          </div>
        )}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 backdrop-blur-md rounded-full bg-white/90 border border-white/50">
          <Clock size={14} className="text-[var(--text-muted)]" strokeWidth={1.5} />
          <span className="text-xs font-medium text-[var(--text-secondary)]">{article.readTime} min read</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="badge badge-gold capitalize">
            {article.category}
          </span>
        </div>

        <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:opacity-70 transition-opacity">
          {article.title}
        </h3>

        <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">
          {article.description}
        </p>

        {/* Stats if available */}
        {article.stats && article.stats.length > 0 && (
          <div className="flex gap-4 mb-4">
            {article.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-[var(--text-primary)]">{stat.value}</span>
                <span className="text-xs text-[var(--text-muted)]">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1 font-medium text-sm text-[var(--text-primary)] group-hover:gap-2 transition-all">
          {isLesson ? 'Start lesson' : 'Read article'}
          <ChevronRight size={16} strokeWidth={1.5} />
        </div>
      </div>
    </>
  );

  // For lessons, use a button/div with onClick. For articles, use Link
  if (isLesson) {
    return (
      <button
        onClick={handleClick}
        className={`card card-hover group block overflow-hidden text-left w-full ${featured ? 'border-[var(--border-strong)]' : ''}`}
        style={{ padding: 0 }}
      >
        <CardContent />
      </button>
    );
  }

  return (
    <Link
      href={linkHref}
      className={`card card-hover group block overflow-hidden ${featured ? 'border-[var(--border-strong)]' : ''}`}
      style={{ padding: 0 }}
    >
      <CardContent />
    </Link>
  );
}
