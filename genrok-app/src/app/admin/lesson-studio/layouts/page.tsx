'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Copy,
  Check,
  X,
  Grid3X3,
  Layout,
  Type,
  BarChart3,
  GitCompare,
  ListOrdered,
  Quote,
} from 'lucide-react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  getAllLayouts,
  LAYOUT_TEMPLATES,
  // Hero Layouts
  HeroTitleLayout,
  HeroWithStatsLayout,
  HeroSplitLayout,
  ChapterIntroLayout,
  SectionDividerLayout,
  BigIdeaLayout,
  // Text Layouts
  SinglePointLayout,
  TwoPointLayout,
  ThreePointLayout,
  BulletListLayout,
  NumberedListLayout,
  // Data Layouts
  SingleChartLayout,
  ChartWithInsightLayout,
  DualChartLayout,
  StatsGridLayout,
  MetricHighlightLayout,
  DashboardViewLayout,
  // Comparison Layouts
  BeforeAfterLayout,
  ProConLayout,
  FeatureCompareLayout,
  TwoOptionLayout,
  ScenarioCompareLayout,
  // Process Layouts
  StepByStepLayout,
  TimelineLayout,
  FlowchartLayout,
  JourneyMapLayout,
  // Emphasis Layouts
  QuoteLayout,
  KeyTakeawayLayout,
  FactHighlightLayout,
  CalloutBoxLayout,
} from '@/components/lessons/layouts';

// Category configuration
const CATEGORY_CONFIG = {
  hero: { icon: Layout, color: '#88da1c', label: 'Hero' },
  text: { icon: Type, color: '#3B82F6', label: 'Text' },
  data: { icon: BarChart3, color: '#8B5CF6', label: 'Data' },
  comparison: { icon: GitCompare, color: '#F59E0B', label: 'Comparison' },
  process: { icon: ListOrdered, color: '#EF4444', label: 'Process' },
  emphasis: { icon: Quote, color: '#EC4899', label: 'Emphasis' },
};

// Sample data for previews
const SAMPLE_DATA = {
  HeroTitleLayout: {
    title: 'The Psychology of Pricing',
    subtitle: 'Master the art of pricing that converts visitors into buyers',
    iconName: 'DollarSign',
  },
  HeroWithStatsLayout: {
    title: 'Why Pricing Psychology Matters',
    subtitle: 'Transform how customers perceive your products',
    stats: [
      { value: '73%', label: 'Price Sensitivity' },
      { value: '2.4x', label: 'Higher Conversions' },
      { value: '47%', label: 'Revenue Growth' },
      { value: '89%', label: 'Customer Satisfaction' },
    ],
  },
  HeroSplitLayout: {
    title: 'The Power of Price Anchoring',
    description: 'When people see a higher price first, everything after seems like a better deal. This simple technique can increase conversions by up to 30%.',
    visual: (
      <div className="w-full h-64 bg-white/10 rounded-xl flex items-center justify-center">
        <span className="text-white/30">Visual Component Here</span>
      </div>
    ),
  },
  ChapterIntroLayout: {
    chapterNumber: 3,
    title: 'Price Anchoring Strategies',
    description: 'Learn how to set reference points that make your offers irresistible',
  },
  SectionDividerLayout: {
    title: 'Next: Advanced Techniques',
    subtitle: 'Taking your pricing to the next level',
  },
  BigIdeaLayout: {
    statement: 'People don\'t buy products. They buy better versions of themselves.',
    attribution: 'Samuel Hulick, User Onboard',
  },
  SinglePointLayout: {
    title: 'The Decoy Effect',
    description: 'Adding a third option that\'s clearly inferior to one choice but not the other can dramatically shift consumer preferences toward the more expensive option.',
    iconName: 'Target',
  },
  TwoPointLayout: {
    headline: 'Two Key Principles',
    points: [
      {
        title: 'Anchoring',
        description: 'Show higher prices first to make subsequent prices seem more reasonable.',
        iconName: 'Anchor',
      },
      {
        title: 'Framing',
        description: 'Present the same information in different ways to influence perception.',
        iconName: 'Frame',
      },
    ] as [{ title: string; description: string; iconName?: string }, { title: string; description: string; iconName?: string }],
  },
  ThreePointLayout: {
    headline: 'The Three Pillars of Pricing',
    points: [
      {
        title: 'Value',
        description: 'Communicate the real worth of your product',
        iconName: 'Gem',
      },
      {
        title: 'Perception',
        description: 'Shape how customers see your pricing',
        iconName: 'Eye',
      },
      {
        title: 'Psychology',
        description: 'Leverage cognitive biases ethically',
        iconName: 'Brain',
      },
    ] as [{ title: string; description: string; iconName?: string }, { title: string; description: string; iconName?: string }, { title: string; description: string; iconName?: string }],
  },
  BulletListLayout: {
    title: 'Key Pricing Strategies',
    subtitle: 'Implement these techniques for better results',
    items: [
      'Use charm pricing ($9.99 instead of $10)',
      'Offer three pricing tiers',
      'Highlight the most popular option',
      'Show savings in percentages and dollars',
      'Create urgency with limited-time offers',
    ],
  },
  NumberedListLayout: {
    title: 'Steps to Optimize Your Pricing',
    subtitle: 'Follow this proven process',
    items: [
      { title: 'Research competitors', description: 'Understand the market landscape' },
      { title: 'Define value proposition', description: 'What makes you unique?' },
      { title: 'Test different price points', description: 'A/B test with real customers' },
      { title: 'Analyze and iterate', description: 'Use data to improve continuously' },
    ],
  },
  SingleChartLayout: {
    title: 'Revenue Growth After Optimization',
    subtitle: 'Monthly performance metrics',
    chart: (
      <div className="w-full h-48 bg-white/5 rounded-xl flex items-center justify-center">
        <span className="text-white/30">Chart Component Here</span>
      </div>
    ),
    insight: 'Revenue increased 47% after implementing psychological pricing',
  },
  ChartWithInsightLayout: {
    title: 'Conversion Rate Analysis',
    chart: (
      <div className="w-full h-48 bg-white/5 rounded-xl flex items-center justify-center">
        <span className="text-white/30">Chart Component Here</span>
      </div>
    ),
    insight: {
      headline: 'Key Finding',
      description: 'Products priced at $X9.99 converted 24% better than those at round numbers.',
      trend: 'up' as const,
      value: '+24%',
    },
  },
  DualChartLayout: {
    title: 'Before vs After Comparison',
    leftChart: {
      title: 'Before Optimization',
      component: (
        <div className="w-full h-32 bg-white/5 rounded-xl flex items-center justify-center">
          <span className="text-white/30">Chart</span>
        </div>
      ),
    },
    rightChart: {
      title: 'After Optimization',
      component: (
        <div className="w-full h-32 bg-white/5 rounded-xl flex items-center justify-center">
          <span className="text-white/30">Chart</span>
        </div>
      ),
    },
  },
  StatsGridLayout: {
    title: 'Performance Metrics',
    stats: [
      { value: '$124K', label: 'Revenue', change: { value: '+23%', direction: 'up' as const }, highlight: true },
      { value: '2,847', label: 'Conversions', change: { value: '+15%', direction: 'up' as const } },
      { value: '$89.50', label: 'Avg. Order', change: { value: '-3%', direction: 'down' as const } },
      { value: '45.2K', label: 'Visitors', change: { value: '+8%', direction: 'up' as const } },
    ],
  },
  MetricHighlightLayout: {
    metric: {
      value: '73%',
      label: 'of customers choose the middle tier',
      description: 'This validates the effectiveness of the three-tier pricing strategy',
      change: { value: '+12% vs last quarter', direction: 'up' as const },
    },
    context: 'Based on 10,000+ customer transactions',
  },
  DashboardViewLayout: {
    title: 'Revenue Dashboard',
    metrics: [
      { value: '$124K', label: 'Revenue', change: { value: '+23%', direction: 'up' as const }, highlight: true },
      { value: '2,847', label: 'Conversions', change: { value: '+15%', direction: 'up' as const } },
      { value: '$89.50', label: 'Avg. Order' },
      { value: '45.2K', label: 'Visitors' },
    ],
  },
  BeforeAfterLayout: {
    headline: 'Transform Your Pricing Page',
    before: {
      title: 'Generic Approach',
      items: ['Single price point', 'No value comparison', 'Weak CTA'],
    },
    after: {
      title: 'Optimized Strategy',
      items: ['Three-tier structure', 'Clear value props', 'Strong CTA'],
    },
  },
  ProConLayout: {
    headline: 'Psychological Pricing Analysis',
    pros: [
      'Increases perceived value',
      'Higher conversion rates',
      'Better customer segmentation',
      'Competitive advantage',
    ],
    cons: [
      'Requires testing to optimize',
      'May confuse some customers',
      'Needs regular updates',
    ],
  },
  FeatureCompareLayout: {
    headline: 'Plan Comparison',
    optionALabel: 'Pro Plan',
    optionBLabel: 'Basic Plan',
    features: [
      { name: 'Unlimited Users', optionA: true, optionB: false },
      { name: 'Priority Support', optionA: true, optionB: 'partial' as const },
      { name: 'API Access', optionA: true, optionB: false },
      { name: 'Custom Branding', optionA: true, optionB: false },
    ],
  },
  TwoOptionLayout: {
    headline: 'Choose Your Path',
    subtitle: 'Select the option that best fits your needs',
    optionA: {
      title: 'Monthly Plan',
      description: 'Flexible month-to-month billing with no long-term commitment.',
      iconName: 'Calendar',
    },
    optionB: {
      title: 'Annual Plan',
      description: 'Save 20% with annual billing. Best value for committed users.',
      iconName: 'CalendarCheck',
      highlight: true,
    },
  },
  ScenarioCompareLayout: {
    headline: 'Two Approaches to Pricing',
    scenarios: [
      {
        title: 'Cost-Plus Pricing',
        description: 'Calculate costs and add a markup percentage.',
        outcome: 'Predictable margins, but ignores customer value perception.',
      },
      {
        title: 'Value-Based Pricing',
        description: 'Price based on perceived customer value.',
        outcome: 'Higher margins when done right, requires market research.',
        highlighted: true,
      },
    ] as [{ title: string; description: string; outcome: string; highlighted?: boolean }, { title: string; description: string; outcome: string; highlighted?: boolean }],
  },
  StepByStepLayout: {
    headline: 'Customer Journey',
    steps: [
      { title: 'Awareness', description: 'Discover product', iconName: 'Eye' },
      { title: 'Interest', description: 'Learn features', iconName: 'Heart' },
      { title: 'Decision', description: 'Compare options', iconName: 'Scale' },
      { title: 'Action', description: 'Make purchase', iconName: 'CreditCard' },
    ],
    currentStep: 2,
  },
  TimelineLayout: {
    headline: 'Implementation Roadmap',
    items: [
      { title: 'Research Phase', description: 'Analyze competitors', date: 'Week 1', completed: true },
      { title: 'Strategy Design', description: 'Create pricing tiers', date: 'Week 2', completed: true },
      { title: 'A/B Testing', description: 'Test with customers', date: 'Week 3-4', completed: false },
      { title: 'Full Launch', description: 'Roll out new pricing', date: 'Week 5', completed: false },
    ],
  },
  FlowchartLayout: {
    headline: 'Pricing Decision Flow',
    nodes: [
      { id: '1', label: 'Start', type: 'start' as const },
      { id: '2', label: 'Analyze Market', type: 'action' as const },
      { id: '3', label: 'Competitive?', type: 'decision' as const },
      { id: '4', label: 'Set Price', type: 'action' as const },
      { id: '5', label: 'Launch', type: 'end' as const },
    ],
  },
  JourneyMapLayout: {
    headline: 'Customer Purchase Journey',
    subtitle: 'Understanding the emotional path to purchase',
    stages: [
      { title: 'Discovery', description: 'First encounter with brand', iconName: 'Search', emotion: 'neutral' as const },
      { title: 'Evaluation', description: 'Comparing options', iconName: 'Scale', emotion: 'neutral' as const },
      { title: 'Decision', description: 'Choosing to buy', iconName: 'CheckCircle', emotion: 'positive' as const },
      { title: 'Delight', description: 'Post-purchase joy', iconName: 'Sparkles', emotion: 'positive' as const },
    ],
  },
  QuoteLayout: {
    quote: 'Price is what you pay. Value is what you get.',
    author: 'Warren Buffett',
    role: 'CEO, Berkshire Hathaway',
  },
  KeyTakeawayLayout: {
    title: 'Key Takeaway',
    takeaway: 'The best pricing strategy is one that aligns customer value perception with your business goals.',
    description: 'Focus on communicating value, not just lowering prices.',
    iconType: 'lightbulb' as const,
  },
  FactHighlightLayout: {
    stat: '67%',
    label: 'of consumers prefer seeing multiple pricing options',
    description: 'Offering choices increases customer confidence and satisfaction.',
    source: 'Nielsen Consumer Survey 2024',
    type: 'stat' as const,
  },
  CalloutBoxLayout: {
    title: 'Pro Tip',
    content: 'Always test your pricing changes with a small segment before rolling out to your entire customer base. This minimizes risk and provides valuable data.',
    type: 'tip' as const,
  },
};

// Layout renderer
const LayoutPreview = ({ layoutId }: { layoutId: string }) => {
  const props = SAMPLE_DATA[layoutId as keyof typeof SAMPLE_DATA];

  switch (layoutId) {
    case 'HeroTitleLayout':
      return <HeroTitleLayout {...(props as typeof SAMPLE_DATA.HeroTitleLayout)} />;
    case 'HeroWithStatsLayout':
      return <HeroWithStatsLayout {...(props as typeof SAMPLE_DATA.HeroWithStatsLayout)} />;
    case 'HeroSplitLayout':
      return <HeroSplitLayout {...(props as typeof SAMPLE_DATA.HeroSplitLayout)} />;
    case 'ChapterIntroLayout':
      return <ChapterIntroLayout {...(props as typeof SAMPLE_DATA.ChapterIntroLayout)} />;
    case 'SectionDividerLayout':
      return <SectionDividerLayout {...(props as typeof SAMPLE_DATA.SectionDividerLayout)} />;
    case 'BigIdeaLayout':
      return <BigIdeaLayout {...(props as typeof SAMPLE_DATA.BigIdeaLayout)} />;
    case 'SinglePointLayout':
      return <SinglePointLayout {...(props as typeof SAMPLE_DATA.SinglePointLayout)} />;
    case 'TwoPointLayout':
      return <TwoPointLayout {...(props as typeof SAMPLE_DATA.TwoPointLayout)} />;
    case 'ThreePointLayout':
      return <ThreePointLayout {...(props as typeof SAMPLE_DATA.ThreePointLayout)} />;
    case 'BulletListLayout':
      return <BulletListLayout {...(props as typeof SAMPLE_DATA.BulletListLayout)} />;
    case 'NumberedListLayout':
      return <NumberedListLayout {...(props as typeof SAMPLE_DATA.NumberedListLayout)} />;
    case 'SingleChartLayout':
      return <SingleChartLayout {...(props as typeof SAMPLE_DATA.SingleChartLayout)} />;
    case 'ChartWithInsightLayout':
      return <ChartWithInsightLayout {...(props as typeof SAMPLE_DATA.ChartWithInsightLayout)} />;
    case 'DualChartLayout':
      return <DualChartLayout {...(props as typeof SAMPLE_DATA.DualChartLayout)} />;
    case 'StatsGridLayout':
      return <StatsGridLayout {...(props as typeof SAMPLE_DATA.StatsGridLayout)} />;
    case 'MetricHighlightLayout':
      return <MetricHighlightLayout {...(props as typeof SAMPLE_DATA.MetricHighlightLayout)} />;
    case 'DashboardViewLayout':
      return <DashboardViewLayout {...(props as typeof SAMPLE_DATA.DashboardViewLayout)} />;
    case 'BeforeAfterLayout':
      return <BeforeAfterLayout {...(props as typeof SAMPLE_DATA.BeforeAfterLayout)} />;
    case 'ProConLayout':
      return <ProConLayout {...(props as typeof SAMPLE_DATA.ProConLayout)} />;
    case 'FeatureCompareLayout':
      return <FeatureCompareLayout {...(props as typeof SAMPLE_DATA.FeatureCompareLayout)} />;
    case 'TwoOptionLayout':
      return <TwoOptionLayout {...(props as typeof SAMPLE_DATA.TwoOptionLayout)} />;
    case 'ScenarioCompareLayout':
      return <ScenarioCompareLayout {...(props as typeof SAMPLE_DATA.ScenarioCompareLayout)} />;
    case 'StepByStepLayout':
      return <StepByStepLayout {...(props as typeof SAMPLE_DATA.StepByStepLayout)} />;
    case 'TimelineLayout':
      return <TimelineLayout {...(props as typeof SAMPLE_DATA.TimelineLayout)} />;
    case 'FlowchartLayout':
      return <FlowchartLayout {...(props as typeof SAMPLE_DATA.FlowchartLayout)} />;
    case 'JourneyMapLayout':
      return <JourneyMapLayout {...(props as typeof SAMPLE_DATA.JourneyMapLayout)} />;
    case 'QuoteLayout':
      return <QuoteLayout {...(props as typeof SAMPLE_DATA.QuoteLayout)} />;
    case 'KeyTakeawayLayout':
      return <KeyTakeawayLayout {...(props as typeof SAMPLE_DATA.KeyTakeawayLayout)} />;
    case 'FactHighlightLayout':
      return <FactHighlightLayout {...(props as typeof SAMPLE_DATA.FactHighlightLayout)} />;
    case 'CalloutBoxLayout':
      return <CalloutBoxLayout {...(props as typeof SAMPLE_DATA.CalloutBoxLayout)} />;
    default:
      return (
        <div className="bg-white p-8">
          <div className="bg-black rounded-2xl p-12 text-center text-white/50">
            Layout preview not available
          </div>
        </div>
      );
  }
};

function LayoutBrowserContent() {
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const allLayouts = getAllLayouts();

  const filteredLayouts = filter === 'all'
    ? allLayouts
    : Object.entries(LAYOUT_TEMPLATES)
        .filter(([key]) => key === filter)
        .flatMap(([, layouts]) => layouts);

  const handleCopyConfig = () => {
    if (!selectedLayout) return;
    const config = SAMPLE_DATA[selectedLayout as keyof typeof SAMPLE_DATA];
    if (config) {
      navigator.clipboard.writeText(JSON.stringify(config, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Get category for a layout
  const getLayoutCategory = (layoutId: string) => {
    const entry = Object.entries(LAYOUT_TEMPLATES).find(
      ([, layouts]) => layouts.some(l => l.id === layoutId)
    );
    return entry ? entry[0] : 'hero';
  };

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-4">
            <Link
              href="/admin/lesson-studio"
              className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center hover:bg-[var(--bg-hover)] transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-black">Layout Templates</h1>
              <p className="text-[var(--text-muted)]">
                {allLayouts.length} pre-built slide layouts • Click to preview
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] rounded-xl">
            <Grid3X3 size={16} className="text-[var(--text-muted)]" />
            <span className="text-sm font-medium">Grid View</span>
          </div>
        </motion.header>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-black text-white'
                : 'bg-white border border-[#E5E5E5] hover:border-black'
            }`}
          >
            All ({allLayouts.length})
          </button>
          {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
            const Icon = config.icon;
            const count = LAYOUT_TEMPLATES[key as keyof typeof LAYOUT_TEMPLATES]?.length || 0;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === key
                    ? 'text-white'
                    : 'bg-white border border-[#E5E5E5] hover:border-black'
                }`}
                style={{
                  backgroundColor: filter === key ? config.color : undefined,
                }}
              >
                <Icon size={14} />
                {config.label} ({count})
              </button>
            );
          })}
        </motion.div>

        {/* 4-Column Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filteredLayouts.map((layout, index) => {
            const categoryKey = getLayoutCategory(layout.id);
            const config = CATEGORY_CONFIG[categoryKey as keyof typeof CATEGORY_CONFIG];

            return (
              <motion.button
                key={layout.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                onClick={() => setSelectedLayout(layout.id)}
                className="group relative bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden hover:border-[#88da1c] hover:shadow-lg transition-all text-left"
              >
                {/* Preview Thumbnail */}
                <div className="h-40 bg-[#FAFAFA] overflow-hidden relative">
                  <div className="transform scale-[0.35] origin-top-left w-[285%] h-[285%] pointer-events-none">
                    <LayoutPreview layoutId={layout.id} />
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="px-4 py-2 bg-black rounded-full text-white text-sm font-medium">
                      Click to Preview
                    </div>
                  </div>
                </div>

                {/* Layout Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-black text-sm">{layout.name}</h3>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5 line-clamp-1">
                        {layout.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span
                      className="inline-block px-2 py-1 rounded-md text-xs font-medium text-white"
                      style={{ backgroundColor: config.color }}
                    >
                      {config.label}
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Full Preview Modal */}
        <AnimatePresence>
          {selectedLayout && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedLayout(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
                  <div>
                    <h2 className="text-lg font-bold text-black">
                      {allLayouts.find(l => l.id === selectedLayout)?.name}
                    </h2>
                    <p className="text-sm text-[var(--text-muted)]">
                      {allLayouts.find(l => l.id === selectedLayout)?.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyConfig}
                      className="p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
                      title="Copy config JSON"
                    >
                      {copied ? (
                        <Check size={18} className="text-[#88da1c]" />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                    <button
                      onClick={() => setSelectedLayout(null)}
                      className="p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="overflow-auto max-h-[calc(90vh-80px)]">
                  <LayoutPreview layoutId={selectedLayout} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}

export default function LayoutBrowserPage() {
  return (
    <Suspense
      fallback={
        <DashboardLayout>
          <div className="page-wrapper">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-96" />
            </div>
          </div>
        </DashboardLayout>
      }
    >
      <LayoutBrowserContent />
    </Suspense>
  );
}
