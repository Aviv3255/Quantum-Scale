'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Maximize2,
  Minimize2,
  Check,
  X,
  Copy,
  Grid3X3,
} from 'lucide-react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  WelcomeSlide,
  QuizSlide,
  CompletionSlide,
  SplitContent,
  FullWidthMedia,
  TextBlock,
  StatCard,
  StatRow,
  BeforeAfter,
  LineChart,
  BarChart,
  AreaChart,
  DonutChart,
  FunnelChart,
  RadarChart,
  ProgressRing,
  Heatmap,
  MetricDashboard,
  ComparisonBars,
  Timeline,
  ProcessSteps,
  QuoteBlock,
  SocialProof,
  IconGrid,
  getAllComponents,
} from '@/components/lessons';

// Sample data for all component previews
const SAMPLE_DATA = {
  // Fixed Slides
  WelcomeSlide: {
    title: 'The Psychology of Pricing',
    subtitle: 'Master the art of pricing that converts visitors into buyers',
    learningGoals: [
      'Understand anchoring and price perception',
      'Apply charm pricing strategies',
      'Create irresistible pricing tiers',
    ],
    duration: '8 min',
  },
  QuizSlide: {
    question: 'What pricing strategy increases perceived value?',
    options: [
      { text: 'Always use the lowest price', correct: false },
      { text: 'Price anchoring with decoy options', correct: true },
      { text: 'Random pricing changes', correct: false },
      { text: 'Hide the price until checkout', correct: false },
    ],
    feedback: {
      correct: 'Exactly! Anchoring creates a reference point that makes your target price seem more reasonable.',
      incorrect: 'Not quite. Price anchoring with decoy options is the key strategy.',
    },
  },
  CompletionSlide: {
    lessonTitle: 'The Psychology of Pricing',
    keyTakeaways: [
      'Use anchoring to establish value perception',
      'Charm pricing ($9.99) works on emotional purchases',
      'Always offer 3 tiers - most choose the middle',
    ],
    nextLesson: {
      title: 'Scarcity & Urgency Tactics',
      description: 'Learn how limited availability drives action',
      slug: 'scarcity-tactics',
    },
  },

  // Content
  SplitContent: {
    title: 'The Power of Social Proof',
    content: 'When people are uncertain, they look to others for guidance. This psychological principle drives 70% of purchasing decisions.',
    media: {
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600',
      alt: 'Social proof example',
    },
  },
  FullWidthMedia: {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
    type: 'image' as const,
    alt: 'Dashboard analytics',
    caption: 'Real-time analytics showing the impact of pricing changes',
    aspectRatio: '16/9' as const,
  },
  TextBlock: {
    headline: 'The Rule of Three',
    subheadline: 'Pricing Psychology',
    body: 'Our brains are wired to prefer choices presented in threes. When given three options, most people choose the middle one.',
  },

  // Data Stats
  StatCard: {
    value: '73%',
    label: 'of customers choose the middle tier',
    trend: { direction: 'up' as const, value: '+12% this month' },
  },
  StatRow: {
    stats: [
      { value: '2.4x', label: 'Higher conversions', accent: true },
      { value: '47%', label: 'Revenue increase' },
      { value: '89%', label: 'Customer satisfaction' },
      { value: '3.2s', label: 'Decision time' },
    ],
  },
  MetricDashboard: {
    title: 'Performance Overview',
    metrics: [
      { label: 'Revenue', value: '$124,500', change: { value: '+23%', direction: 'up' as const }, highlight: true },
      { label: 'Conversions', value: '2,847', change: { value: '+15%', direction: 'up' as const } },
      { label: 'Avg. Order', value: '$89.50', change: { value: '-3%', direction: 'down' as const } },
      { label: 'Visitors', value: '45.2K', change: { value: '+8%', direction: 'up' as const } },
    ],
  },

  // Comparison
  BeforeAfter: {
    headline: 'Transform Your Pricing Page',
    before: {
      title: 'Generic Approach',
      items: ['Single price point only', 'No value comparison', 'Missing social proof', 'Weak call-to-action'],
    },
    after: {
      title: 'Optimized Strategy',
      items: ['Three-tier pricing structure', 'Clear value differentiation', 'Reviews and testimonials', 'Strong, action-oriented CTA'],
    },
  },
  ComparisonBars: {
    title: 'Revenue Impact',
    itemA: { label: 'Before optimization', value: 12500 },
    itemB: { label: 'After optimization', value: 28750 },
    labelA: 'Before',
    labelB: 'After',
  },

  // Charts
  LineChart: {
    title: 'Monthly Revenue Growth',
    subtitle: 'Last 6 months performance',
    data: [
      { label: 'Jan', value: 4200 },
      { label: 'Feb', value: 5800 },
      { label: 'Mar', value: 5200 },
      { label: 'Apr', value: 7400 },
      { label: 'May', value: 6800 },
      { label: 'Jun', value: 9200 },
    ],
  },
  BarChart: {
    title: 'Sales by Category',
    subtitle: 'Q4 2024 Performance',
    data: [
      { label: 'Electronics', value: 42000 },
      { label: 'Clothing', value: 35000 },
      { label: 'Home', value: 28000 },
      { label: 'Sports', value: 22000 },
      { label: 'Books', value: 15000 },
    ],
    horizontal: true,
  },
  AreaChart: {
    title: 'User Engagement',
    subtitle: 'Daily active users',
    data: [
      { label: 'Mon', value: 1200 },
      { label: 'Tue', value: 1800 },
      { label: 'Wed', value: 2400 },
      { label: 'Thu', value: 2100 },
      { label: 'Fri', value: 3200 },
      { label: 'Sat', value: 2800 },
      { label: 'Sun', value: 1600 },
    ],
  },
  DonutChart: {
    title: 'Traffic Sources',
    centerValue: '45.2K',
    centerLabel: 'Total Visitors',
    data: [
      { label: 'Organic Search', value: 45 },
      { label: 'Direct', value: 25 },
      { label: 'Social', value: 18 },
      { label: 'Referral', value: 12 },
    ],
  },
  FunnelChart: {
    title: 'Conversion Funnel',
    subtitle: 'Customer journey analysis',
    data: [
      { label: 'Visitors', value: 10000 },
      { label: 'Product Views', value: 6500 },
      { label: 'Add to Cart', value: 3200 },
      { label: 'Checkout', value: 1800 },
      { label: 'Purchase', value: 1200 },
    ],
  },
  RadarChart: {
    title: 'Skill Assessment',
    data: [
      { axis: 'Marketing', value: 85 },
      { axis: 'Sales', value: 72 },
      { axis: 'Support', value: 90 },
      { axis: 'Product', value: 68 },
      { axis: 'Analytics', value: 78 },
      { axis: 'Design', value: 82 },
    ],
  },
  ProgressRing: {
    value: 78,
    label: 'Goal Completion',
    sublabel: 'Q4 Revenue Target',
  },
  Heatmap: {
    title: 'Weekly Activity',
    rows: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    cols: ['9AM', '12PM', '3PM', '6PM', '9PM'],
    data: [
      { row: 'Mon', col: '9AM', value: 45 }, { row: 'Mon', col: '12PM', value: 78 }, { row: 'Mon', col: '3PM', value: 65 }, { row: 'Mon', col: '6PM', value: 32 }, { row: 'Mon', col: '9PM', value: 12 },
      { row: 'Tue', col: '9AM', value: 52 }, { row: 'Tue', col: '12PM', value: 85 }, { row: 'Tue', col: '3PM', value: 72 }, { row: 'Tue', col: '6PM', value: 45 }, { row: 'Tue', col: '9PM', value: 18 },
      { row: 'Wed', col: '9AM', value: 68 }, { row: 'Wed', col: '12PM', value: 92 }, { row: 'Wed', col: '3PM', value: 88 }, { row: 'Wed', col: '6PM', value: 55 }, { row: 'Wed', col: '9PM', value: 25 },
      { row: 'Thu', col: '9AM', value: 42 }, { row: 'Thu', col: '12PM', value: 75 }, { row: 'Thu', col: '3PM', value: 62 }, { row: 'Thu', col: '6PM', value: 38 }, { row: 'Thu', col: '9PM', value: 15 },
      { row: 'Fri', col: '9AM', value: 55 }, { row: 'Fri', col: '12PM', value: 80 }, { row: 'Fri', col: '3PM', value: 58 }, { row: 'Fri', col: '6PM', value: 28 }, { row: 'Fri', col: '9PM', value: 8 },
    ],
  },

  // Sequential
  Timeline: {
    title: 'Project Milestones',
    items: [
      { title: 'Project Kickoff', description: 'Initial planning and team formation', date: 'Week 1', completed: true },
      { title: 'Research Phase', description: 'Market analysis and user interviews', date: 'Week 2-3', completed: true },
      { title: 'Design Sprint', description: 'Wireframes and prototyping', date: 'Week 4-5', completed: true },
      { title: 'Development', description: 'Build core features', date: 'Week 6-10', completed: false },
      { title: 'Launch', description: 'Public release and marketing', date: 'Week 12', completed: false },
    ],
  },
  ProcessSteps: {
    title: 'Customer Journey',
    currentStep: 2,
    steps: [
      { title: 'Awareness', description: 'Discover the product' },
      { title: 'Interest', description: 'Learn about features' },
      { title: 'Decision', description: 'Compare options' },
      { title: 'Action', description: 'Make purchase' },
    ],
  },

  // Emphasis
  QuoteBlock: {
    quote: 'The best marketing doesn\'t feel like marketing. It feels like a friend giving you advice.',
    author: 'Tom Fishburne',
    role: 'Founder, Marketoonist',
  },
  SocialProof: {
    stat: '50,000+',
    label: 'Happy Customers',
    description: 'Join thousands of entrepreneurs who have transformed their businesses',
    type: 'users' as const,
  },
  IconGrid: {
    title: 'Why Choose Us',
    items: [
      { iconName: 'zap', label: 'Lightning Fast', description: 'Instant results' },
      { iconName: 'target', label: 'Precise Targeting', description: 'Reach the right audience' },
      { iconName: 'shield', label: 'Secure & Safe', description: 'Enterprise-grade security' },
      { iconName: 'globe', label: 'Global Reach', description: 'Available worldwide' },
      { iconName: 'trending', label: 'Growth Focused', description: 'Scale your business' },
      { iconName: 'award', label: 'Award Winning', description: 'Industry recognized' },
    ],
  },
};

// Component renderer
const ComponentPreview = ({ componentId }: { componentId: string }) => {
  switch (componentId) {
    case 'WelcomeSlide':
      return <WelcomeSlide {...SAMPLE_DATA.WelcomeSlide} />;
    case 'QuizSlide':
      return <QuizSlide {...SAMPLE_DATA.QuizSlide} />;
    case 'CompletionSlide':
      return <CompletionSlide {...SAMPLE_DATA.CompletionSlide} />;
    case 'SplitContent':
      return <SplitContent {...SAMPLE_DATA.SplitContent} />;
    case 'FullWidthMedia':
      return <FullWidthMedia {...SAMPLE_DATA.FullWidthMedia} />;
    case 'TextBlock':
      return <TextBlock {...SAMPLE_DATA.TextBlock} />;
    case 'StatCard':
      return <StatCard {...SAMPLE_DATA.StatCard} />;
    case 'StatRow':
      return <StatRow {...SAMPLE_DATA.StatRow} />;
    case 'MetricDashboard':
      return <MetricDashboard {...SAMPLE_DATA.MetricDashboard} />;
    case 'BeforeAfter':
      return <BeforeAfter {...SAMPLE_DATA.BeforeAfter} />;
    case 'ComparisonBars':
      return <ComparisonBars {...SAMPLE_DATA.ComparisonBars} />;
    case 'LineChart':
      return <LineChart {...SAMPLE_DATA.LineChart} />;
    case 'BarChart':
      return <BarChart {...SAMPLE_DATA.BarChart} />;
    case 'AreaChart':
      return <AreaChart {...SAMPLE_DATA.AreaChart} />;
    case 'DonutChart':
      return <DonutChart {...SAMPLE_DATA.DonutChart} />;
    case 'FunnelChart':
      return <FunnelChart {...SAMPLE_DATA.FunnelChart} />;
    case 'RadarChart':
      return <RadarChart {...SAMPLE_DATA.RadarChart} />;
    case 'ProgressRing':
      return <ProgressRing {...SAMPLE_DATA.ProgressRing} />;
    case 'Heatmap':
      return <Heatmap {...SAMPLE_DATA.Heatmap} />;
    case 'Timeline':
      return <Timeline {...SAMPLE_DATA.Timeline} />;
    case 'ProcessSteps':
      return <ProcessSteps {...SAMPLE_DATA.ProcessSteps} />;
    case 'QuoteBlock':
      return <QuoteBlock {...SAMPLE_DATA.QuoteBlock} />;
    case 'SocialProof':
      return <SocialProof {...SAMPLE_DATA.SocialProof} />;
    case 'IconGrid':
      return <IconGrid {...SAMPLE_DATA.IconGrid} />;
    default:
      return (
        <div className="p-12 text-center bg-white">
          <div className="bg-black rounded-2xl p-8 text-white/50">
            Component preview not available
          </div>
        </div>
      );
  }
};

// Category colors
const CATEGORY_COLORS: Record<string, string> = {
  'Fixed Slides': '#88da1c',
  'Content': '#3B82F6',
  'Data Stats': '#8B5CF6',
  'Comparison': '#F59E0B',
  'Charts': '#EF4444',
  'Sequential': '#EC4899',
  'Emphasis': '#06B6D4',
};

function ComponentBrowserContent() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const allComponents = getAllComponents();

  const handleCopyConfig = () => {
    if (!selectedComponent) return;
    const config = SAMPLE_DATA[selectedComponent as keyof typeof SAMPLE_DATA];
    if (config) {
      navigator.clipboard.writeText(JSON.stringify(config, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Link
              href="/admin/lesson-studio"
              className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center hover:bg-[var(--bg-hover)] transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-black">Component Browser</h1>
              <p className="text-[var(--text-muted)]">
                {allComponents.length} premium components • Click to preview
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] rounded-xl">
            <Grid3X3 size={16} className="text-[var(--text-muted)]" />
            <span className="text-sm font-medium">Grid View</span>
          </div>
        </motion.header>

        {/* 4-Column Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {allComponents.map((component, index) => (
            <motion.button
              key={component.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              onClick={() => setSelectedComponent(component.id)}
              className="group relative bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden hover:border-[#88da1c] hover:shadow-lg transition-all text-left"
            >
              {/* Preview Thumbnail */}
              <div className="h-40 bg-[#FAFAFA] overflow-hidden relative">
                <div className="transform scale-[0.35] origin-top-left w-[285%] h-[285%] pointer-events-none">
                  <ComponentPreview componentId={component.id} />
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="px-4 py-2 bg-black rounded-full text-white text-sm font-medium">
                    Click to Preview
                  </div>
                </div>
              </div>

              {/* Component Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-black text-sm">{component.name}</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5 line-clamp-1">
                      {component.description}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <span
                    className="inline-block px-2 py-1 rounded-md text-xs font-medium text-white"
                    style={{ backgroundColor: CATEGORY_COLORS[component.category] || '#666' }}
                  >
                    {component.category}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Full Preview Modal */}
        <AnimatePresence>
          {selectedComponent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedComponent(null)}
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
                      {allComponents.find(c => c.id === selectedComponent)?.name}
                    </h2>
                    <p className="text-sm text-[var(--text-muted)]">
                      {allComponents.find(c => c.id === selectedComponent)?.description}
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
                      onClick={() => setSelectedComponent(null)}
                      className="p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="overflow-auto max-h-[calc(90vh-80px)]">
                  <ComponentPreview componentId={selectedComponent} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}

export default function ComponentBrowserPage() {
  return (
    <Suspense fallback={
      <DashboardLayout>
        <div className="page-wrapper">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-96" />
          </div>
        </div>
      </DashboardLayout>
    }>
      <ComponentBrowserContent />
    </Suspense>
  );
}
