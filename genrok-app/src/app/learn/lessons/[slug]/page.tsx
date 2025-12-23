'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Maximize2, Minimize2 } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getUserProfile } from '@/lib/supabase';

// Lesson metadata for all interactive lessons
const lessonMeta: Record<string, { title: string; description: string }> = {
  'familiar-surprise-secret': {
    title: 'The Familiar Surprise Secret',
    description: 'Master the MAYA principle - Most Advanced Yet Acceptable',
  },
  'red-button-effect': {
    title: 'The Red Button Effect',
    description: 'Understanding psychological reactance and forbidden desire',
  },
  'fred-method': {
    title: 'The F.R.E.D. Method',
    description: 'A framework for understanding audience psychology',
  },
  'emotion-decides': {
    title: 'Emotion Decides, Logic Justifies',
    description: 'How emotions drive purchasing decisions',
  },
  'gatekeeper-method': {
    title: 'The Gatekeeper Method',
    description: 'Four moves to bypass the brain\'s attention filter',
  },
  'three-second-rule': {
    title: 'The 3-Second Rule',
    description: 'The critical window to capture attention before they scroll',
  },
  'science-of-selling': {
    title: 'The Science of Selling',
    description: 'The systematic, scientific approach to conversion',
  },
  'persuasion-blueprint': {
    title: 'The Persuasion Blueprint',
    description: 'The master architectural plan for influential copy',
  },
  'persuasion-stack': {
    title: 'The Persuasion Stack',
    description: 'Layered persuasion techniques building upon each other',
  },
  'architecture-of-influence': {
    title: 'Architecture of Influence',
    description: 'The structural framework of persuasive communication',
  },
  'wiifm-principle': {
    title: 'The WIIFM Principle',
    description: 'What\'s In It For Me - The only question your reader is asking',
  },
  'three-canons-of-craft': {
    title: 'The Three Canons of Craft',
    description: 'Three tests every sentence must pass',
  },
  'cpppb-proof-loop': {
    title: 'The CPPPB Proof Loop',
    description: 'Five-element framework for bulletproof persuasion',
  },
  'damaging-admission': {
    title: 'The Damaging Admission',
    description: 'Why revealing weakness makes strengths believable',
  },
  'emotional-precision': {
    title: 'Emotional Precision',
    description: 'Target precise emotions that drive action',
  },
  'blind-spot-effect': {
    title: 'The Blind Spot Effect',
    description: 'What your prospects can\'t see about themselves',
  },
  'customer-voice-mining': {
    title: 'Voice of Customer Mining',
    description: 'Extract the exact words your customers use',
  },
  'double-bind-of-fear': {
    title: 'The Double Bind of Fear',
    description: 'Leverage both action and inaction fears',
  },
  'emotion-spectrum': {
    title: 'The Emotion Spectrum',
    description: 'Map the full range of persuasive emotions',
  },
  'forty-forty-twenty-rule': {
    title: 'The 40/40/20 Rule',
    description: 'The marketing success formula that never fails',
  },
  'four-primal-needs': {
    title: 'The Four Primal Needs',
    description: 'The deep drivers behind every purchase',
  },
  'ocpb-formula': {
    title: 'The OCPB Formula',
    description: 'Offer, Copy, Proof, Bonus - the conversion stack',
  },
  'sales-message-anatomy': {
    title: 'Sales Message Anatomy',
    description: 'Dissect what makes sales copy convert',
  },
  'self-persuasion-architecture': {
    title: 'Self-Persuasion Architecture',
    description: 'Let prospects convince themselves to buy',
  },
  'structural-tension': {
    title: 'Structural Tension',
    description: 'Create irresistible forward momentum in copy',
  },
  'three-growth-levers': {
    title: 'The Three Growth Levers',
    description: 'Customers, frequency, transaction size - pull all three',
  },
  'three-levels-of-change': {
    title: 'The Three Levels of Change',
    description: 'Transform behavior, beliefs, and identity',
  },
  'trust-architecture': {
    title: 'The Trust Architecture',
    description: 'Build unshakeable credibility systematically',
  },
  'unique-mechanism': {
    title: 'The Unique Mechanism',
    description: 'The proprietary reason your solution works',
  },
  'master-key-framework': {
    title: 'The Master Key Framework',
    description: 'First-principles guide to copy that converts',
  },
  'rule-of-one': {
    title: 'The Rule of One',
    description: 'One reader, one idea, one offer, one action',
  },
  'architecture-of-belief': {
    title: 'The Architecture of Belief',
    description: 'Three levels of mastery: hook, strategy, psychology',
  },
  'copywriters-codex': {
    title: 'The Copywriter\'s Codex',
    description: 'A synthesized playbook from the masters',
  },
  'cost-of-standing-still': {
    title: 'The Cost of Standing Still',
    description: 'Stop selling your price. Start selling what customers LOSE without you.',
  },
  'unity-principle': {
    title: 'The Unity Principle',
    description: 'One word change turns customers into partners.',
  },
  'visual-priming': {
    title: 'The Invisible Influencer',
    description: 'How background images decide what customers buy - without them knowing.',
  },
  'objection-inversion': {
    title: 'The Objection Judo Trick',
    description: 'Turn objections into the exact reasons to buy.',
  },
  'primal-stimuli': {
    title: 'The 6 Primal Buy Buttons',
    description: 'The only 6 triggers that get the reptile brain to say YES.',
  },
  'three-cro-tests': {
    title: 'The Three High-Impact CRO Tests',
    description: 'The Oodie made $2.83M with these 3 simple changes.',
  },
  'digital-velvet-rope': {
    title: 'The Digital Velvet Rope Effect',
    description: 'Password-protected pages create explosive desire.',
  },
  'hidden-menu-psychology': {
    title: 'The Hidden Menu Psychology',
    description: 'Rolex has watches you can\'t see anywhere—for $1M+ spenders only.',
  },
  'celebrity-gifting-flywheel': {
    title: 'The Celebrity Gifting Flywheel',
    description: 'Drake has 140+ Rolexes. He didn\'t buy most of them.',
  },
  'forbidden-coffee-hook': {
    title: 'The Forbidden Coffee Hook',
    description: 'It\'s not "Brazilian Blend"—it\'s forbidden coffee for Amazonian warriors.',
  },
  // Google Ads 2026 lessons
  'google-highest-cpa-wins': {
    title: 'Why The Highest CPA Wins',
    description: 'The counterintuitive truth about Google Ads dominance',
  },
  'google-product-feed-mastery': {
    title: 'Your Product Feed IS Your Ad',
    description: 'The hidden weapon for Shopping & PMax success',
  },
  'google-pmax-blueprint': {
    title: 'The PMax Asset Group Blueprint',
    description: 'Stop forcing Google AI to guess',
  },
  'google-data-quality-edge': {
    title: 'Better Data In, Better AI Out',
    description: 'The quality edge that wins in 2026',
  },
  'google-competitor-conquest': {
    title: 'Competitor Conquest',
    description: 'Steal market share legally with Google Ads',
  },
  // Google Shopping Blueprint lessons
  'google-shopping-intent': {
    title: 'Active Intent: Why Google Shopping Wins',
    description: 'Capture users who are actively searching to buy',
  },
  'google-store-trust-checklist': {
    title: 'Earn Google\'s Trust First',
    description: 'The store readiness checklist to avoid suspension',
  },
  'google-hero-product-funnel': {
    title: 'Find Your Hero Products',
    description: 'From clicks to winners - buying data not profit',
  },
  'google-click-fraud-shield': {
    title: 'Shield Your Budget from Click Fraud',
    description: 'Protect your data from bots and competitors',
  },
  'google-ai-max-decision': {
    title: 'AI Max: Power vs Control',
    description: 'The decision framework for Google\'s AI automation',
  },
  // Google Growth Engine lessons
  'google-negative-keyword-colander': {
    title: 'The Negative Keyword Colander',
    description: 'Filter out waste - only profitable clicks get through',
  },
  'google-optimization-cadence': {
    title: 'The Optimization Rhythm',
    description: 'Stop random tinkering - follow a disciplined cadence',
  },
  'google-ad-assets-arsenal': {
    title: 'Free Real Estate: Ad Assets',
    description: 'Make your ads bigger and more clickable - for free',
  },
  'google-landing-page-bridge': {
    title: 'The Click is Only Half the Battle',
    description: 'What happens AFTER the click determines success',
  },
  'google-ai-overviews-opportunity': {
    title: 'Ads in AI Overviews',
    description: 'Capture users in Google\'s new AI-powered search results',
  },
  // Google Ads Advanced lessons
  'google-brand-moat': {
    title: 'Brand is the Ultimate Moat',
    description: 'The barrier competitors can\'t copy with a bigger budget',
  },
  'google-budget-reallocation': {
    title: 'Feed Your Winners',
    description: 'How to go from 2.8x to 5.1x ROAS by reallocating budget',
  },
  'google-focus-firepower': {
    title: 'Focus Your Firepower',
    description: 'Stop spreading thin - consolidate budget on bestsellers',
  },
  'google-influencer-creative': {
    title: 'Outsource Your Creative Genius',
    description: 'The scaling hack: hire influencers for ad content',
  },
  // Business Fundamentals lessons
  'biz-infinite-money-engine': {
    title: 'The Infinite Money Engine',
    description: 'The single equation that transforms eCommerce into a video game with unlimited money',
  },
  'biz-rat-brain-hijack': {
    title: 'The Rat Brain Hijack',
    description: 'How to command attention by triggering the subconscious mind',
  },
  'biz-velocity-advantage': {
    title: 'The Velocity Advantage',
    description: 'Why speed is the biggest unfair advantage in business',
  },
  'biz-remarkable-product': {
    title: 'Build Something Remarkable',
    description: 'Why good enough products fight the laws of the matrix forever',
  },
  'biz-asset-not-job': {
    title: 'Build an Asset, Not a Job',
    description: 'The $3 million difference between earning income and building wealth',
  },
  // Business Leverage Playbook lessons
  'biz-leverage-equation': {
    title: 'The Leverage Equation',
    description: 'Stop working harder. Start working smarter with the equation that changes everything.',
  },
  'biz-counter-position': {
    title: 'The Counter-Position Strategy',
    description: 'Create a battlefield where the giants\' money is worthless.',
  },
  'biz-awareness-sweet-spot': {
    title: 'The Market Awareness Sweet Spot',
    description: 'Enter markets where customers feel the pain but don\'t know the solution exists.',
  },
  'biz-barbell-strategy': {
    title: 'The Barbell Strategy',
    description: '5% big swings. 95% small wins. Avoid the dangerous middle.',
  },
  'biz-one-pager-blueprint': {
    title: 'The One-Pager Blueprint',
    description: 'Kill shiny object syndrome with the 4 questions that become your North Star.',
  },
  // E-commerce Cheat Code Business Lessons
  'biz-infinite-money-loop': {
    title: 'The Infinite Money Loop',
    description: 'The 6-step flywheel that turns paid advertising into infinite profit',
  },
  'biz-marketing-company': {
    title: "You're Not a Brand",
    description: 'The identity shift that separates winners from wannabes',
  },
  'biz-product-expansion': {
    title: 'The Ridge Playbook',
    description: 'How Ridge solved their LTV problem with product expansion',
  },
  'biz-zero-cac-engine': {
    title: 'The $0 CAC Engine',
    description: 'Get customers for free before you ever spend on ads',
  },
  'biz-creative-targeting': {
    title: 'Creative is the New Targeting',
    description: 'Volume + Diversity + Measurement: The system for winning',
  },
  // The Infinite Money Equation lessons
  'biz-3x-threshold': {
    title: 'The 3x Threshold',
    description: 'The single equation that separates struggling stores from money-printing machines',
  },
  'biz-asymmetric-monopoly': {
    title: 'The Asymmetric Monopoly',
    description: 'How a 1400:1 ratio creates a legal monopoly nobody can compete with',
  },
  'biz-authenticity-anchor': {
    title: 'The Authenticity Anchor',
    description: 'How Nike stayed cool for 40 years while competitors chased trends and died',
  },
  'biz-brand-ltv-engine': {
    title: 'The Brand LTV Engine',
    description: 'How Ralph Lauren, LEGO, and Le Creuset engineer endless reasons to return',
  },
  'biz-brand-temple': {
    title: 'The Brand Temple Strategy',
    description: 'How Ralph Lauren, LEGO, and Le Creuset built billion-dollar empires through loyalty',
  },
  'biz-cash-conversion': {
    title: 'The Negative Cash Conversion Cycle',
    description: 'How Davie Fogarty bootstrapped The Oodie to nearly $1B using customer money',
  },
  'biz-closer-framework': {
    title: 'The CLOSER Framework',
    description: 'Alex Hormozi\'s battle-tested 6-step sales system that converts without being pushy',
  },
  'biz-courage-variable': {
    title: 'The Courage Variable',
    description: 'The hidden code behind every empire: 7,000 failures, £2 profit, and betting it all',
  },
  'biz-empathy-engine': {
    title: 'The Empathy Engine',
    description: 'The invisible difference between good service and service that creates lifelong customers',
  },
  'biz-four-pillars': {
    title: 'The Four Pillars Protocol',
    description: 'The complete framework to escape the wheel and build a business that prints money',
  },
  'biz-hamster-wheel': {
    title: 'The Hamster Wheel Trap',
    description: 'The Matrix-level prison keeping 99% of eCommerce stores broke—and how to escape',
  },
  'biz-infinite-flywheel': {
    title: 'The Infinite Money Flywheel',
    description: 'How $100 ad spend becomes a predictable, scalable money machine',
  },
  'biz-leaders-burden': {
    title: 'The Leader\'s Burden',
    description: 'If the system fails, the leader failed. The ultimate accountability framework',
  },
  'biz-lifetime-gross-profit': {
    title: 'Lifetime Gross Profit',
    description: 'The number everyone calculates wrong—and why it kills businesses',
  },
  'biz-logic-trap': {
    title: 'The Logic Trap',
    description: 'Why the smartest marketing decision can destroy your sales overnight',
  },
  'biz-ltv-cac-dashboard': {
    title: 'The Operator\'s Dashboard',
    description: 'The LTV:CAC ratios that separate struggling businesses from unstoppable ones',
  },
  'biz-ltv-levers': {
    title: 'The LTV Control Panel',
    description: '7 levers to increase customer lifetime value and maximize profitability',
  },
  'biz-model-vs-method': {
    title: 'Model vs Method',
    description: 'Why the best model beats the best tactics every single time',
  },
  'biz-objection-dance': {
    title: 'The Objection Dance',
    description: 'Handling objections is a dance, not a fight. 4 techniques that disarm resistance',
  },
  'biz-operator-mindset': {
    title: 'The Operator\'s Mindset',
    description: 'How Ben Francis built Gymshark to $1.5B by putting the model above his ego',
  },
  'biz-purchase-cycle-engine': {
    title: 'The Purchase Cycle Engineer',
    description: 'How Le Creuset turned a once-a-decade purchase into an annual buying event',
  },
  'biz-replication-protocol': {
    title: 'The Replication Protocol',
    description: 'Alex Hormozi\'s secret: Simple scales, fancy fails. Why systems beat talent',
  },
  'biz-rfm-secret': {
    title: 'The RFM Secret',
    description: 'How to identify your best customers and make more money from fewer people',
  },
  'biz-rule-of-100': {
    title: 'The Rule of 100',
    description: 'The volume strategy that separates dreamers from millionaires',
  },
  'biz-valley-protocol': {
    title: 'The Valley of Despair Protocol',
    description: 'Why 97% of entrepreneurs quit at the exact moment they should push harder',
  },
};

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const { user, isLoading } = useAuthStore();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [userName, setUserName] = useState<string>('Builder');

  // Derive lesson data from slug - no need for state
  const lesson = useMemo(() => lessonMeta[slug], [slug]);
  const lessonExists = Boolean(lesson);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Fetch user's name from profile or user metadata
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

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!lessonExists) {
    return (
      <DashboardLayout>
        <div className="page-wrapper">
          <div className="empty-state">
            <h3>Lesson not found</h3>
            <p>The lesson you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/learn" className="btn btn-primary mt-4">
              Back to Learning Center
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Pass user's first name to the lesson via URL param
  const lessonUrl = `/lessons/${slug}/lesson.html?userName=${encodeURIComponent(userName)}`;

  return (
    <DashboardLayout>
      <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'page-wrapper'}`}>
        {/* Header */}
        <header className={`flex items-center justify-between gap-4 ${isFullscreen ? 'p-4 border-b border-[var(--border-light)]' : 'mb-6'}`}>
          <div className="flex items-center gap-4">
            <Link
              href="/learn"
              className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Learning Center
            </Link>
            <span className="text-[var(--text-tertiary)]">/</span>
            <div>
              <h1 className="text-lg font-semibold text-[var(--text-primary)]">{lesson.title}</h1>
              <p className="text-sm text-[var(--text-muted)]">{lesson.description}</p>
            </div>
          </div>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
          >
            {isFullscreen ? (
              <>
                <Minimize2 size={16} />
                Exit Fullscreen
              </>
            ) : (
              <>
                <Maximize2 size={16} />
                Fullscreen
              </>
            )}
          </button>
        </header>

        {/* Lesson Content */}
        <div
          className={`rounded-xl overflow-hidden border border-[var(--border-light)] bg-white ${
            isFullscreen ? 'h-[calc(100vh-80px)]' : 'h-[calc(100vh-200px)]'
          }`}
        >
          <iframe
            src={lessonUrl}
            className="w-full h-full border-0"
            title={lesson.title}
            allow="fullscreen"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
