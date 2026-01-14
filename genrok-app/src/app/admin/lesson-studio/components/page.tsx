'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
  Check,
  X,
  Copy,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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
  getAllComponents,
} from '@/components/lessons';

// Sample data for previews
const SAMPLE_DATA = {
  WelcomeSlide: {
    title: 'The Psychology of Pricing',
    subtitle: 'Master the art of pricing that converts visitors into buyers',
    learningGoals: [
      'Understand anchoring and price perception',
      'Apply charm pricing strategies',
      'Create irresistible pricing tiers',
    ],
    duration: '8 min',
    heroImage: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500',
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
  SplitContent: {
    title: 'The Power of Social Proof',
    content: 'When people are uncertain, they look to others for guidance. This psychological principle drives 70% of purchasing decisions. By showcasing testimonials, reviews, and user counts, you tap into this powerful force.',
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
    body: 'Our brains are wired to prefer choices presented in threes. When given three options, most people choose the middle one - it feels safe, balanced, and "just right." This is why successful SaaS companies always offer three pricing tiers.',
  },
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
  BeforeAfter: {
    headline: 'Transform Your Pricing Page',
    before: {
      title: 'Generic Approach',
      items: [
        'Single price point only',
        'No value comparison',
        'Missing social proof',
        'Weak call-to-action',
      ],
    },
    after: {
      title: 'Optimized Strategy',
      items: [
        'Three-tier pricing structure',
        'Clear value differentiation',
        'Reviews and testimonials',
        'Strong, action-oriented CTA',
      ],
    },
  },
};

// Component renderer
const ComponentPreview = ({ componentId, darkMode }: { componentId: string; darkMode: boolean }) => {
  const props = { ...SAMPLE_DATA[componentId as keyof typeof SAMPLE_DATA], darkMode };

  switch (componentId) {
    case 'WelcomeSlide':
      return <WelcomeSlide {...props} />;
    case 'QuizSlide':
      return <QuizSlide {...props} />;
    case 'CompletionSlide':
      return <CompletionSlide {...props} />;
    case 'SplitContent':
      return <SplitContent {...props} />;
    case 'FullWidthMedia':
      return <FullWidthMedia {...props} />;
    case 'TextBlock':
      return <TextBlock {...props} />;
    case 'StatCard':
      return (
        <div className={`${darkMode ? 'bg-black' : 'bg-white'} p-12 flex justify-center`}>
          <div className="w-80">
            <StatCard {...props} />
          </div>
        </div>
      );
    case 'StatRow':
      return <StatRow {...props} />;
    case 'BeforeAfter':
      return <BeforeAfter {...props} />;
    default:
      return (
        <div className="p-12 text-center text-[var(--text-muted)]">
          Component preview not available
        </div>
      );
  }
};

function ComponentBrowserContent() {
  const searchParams = useSearchParams();
  const initialView = searchParams.get('view');

  const [selectedComponent, setSelectedComponent] = useState<string | null>(initialView);
  const [darkMode, setDarkMode] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const allComponents = getAllComponents();

  const handleCopyConfig = () => {
    if (!selectedComponent) return;
    const config = SAMPLE_DATA[selectedComponent as keyof typeof SAMPLE_DATA];
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
                Preview and test all lesson components
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-xl transition-all ${
                darkMode
                  ? 'bg-black text-white'
                  : 'bg-white border border-[#E5E5E5] text-black hover:border-black'
              }`}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {selectedComponent && (
              <>
                <button
                  onClick={handleCopyConfig}
                  className="p-3 rounded-xl bg-white border border-[#E5E5E5] hover:border-black transition-all"
                  title="Copy config JSON"
                >
                  {copied ? (
                    <Check size={18} className="text-[#88da1c]" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
                <button
                  onClick={() => setFullscreen(!fullscreen)}
                  className="p-3 rounded-xl bg-white border border-[#E5E5E5] hover:border-black transition-all"
                  title={fullscreen ? 'Exit fullscreen' : 'Fullscreen preview'}
                >
                  {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
              </>
            )}
          </div>
        </motion.header>

        <div className={`grid ${fullscreen ? '' : 'lg:grid-cols-[300px_1fr]'} gap-6`}>
          {/* Sidebar - Component List */}
          {!fullscreen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border border-[#E5E5E5] p-4 h-fit sticky top-4"
            >
              <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4 px-2">
                Components ({allComponents.length})
              </h3>
              <div className="space-y-1">
                {allComponents.map((component) => (
                  <button
                    key={component.id}
                    onClick={() => setSelectedComponent(component.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      selectedComponent === component.id
                        ? 'bg-[#88da1c] text-black font-medium'
                        : 'hover:bg-[var(--bg-secondary)]'
                    }`}
                  >
                    <div className="font-medium">{component.name}</div>
                    <div
                      className={`text-xs ${
                        selectedComponent === component.id
                          ? 'text-black/60'
                          : 'text-[var(--text-muted)]'
                      }`}
                    >
                      {component.category}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Preview Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden ${
              fullscreen ? 'fixed inset-4 z-50' : ''
            }`}
          >
            {selectedComponent ? (
              <>
                {/* Preview Header */}
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
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      darkMode ? 'bg-black text-white' : 'bg-[#F8F9FA] text-black'
                    }`}>
                      {darkMode ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </div>
                </div>

                {/* Preview Content */}
                <div
                  className={`overflow-auto ${fullscreen ? 'h-[calc(100%-80px)]' : 'max-h-[700px]'}`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${selectedComponent}-${darkMode}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ComponentPreview
                        componentId={selectedComponent}
                        darkMode={darkMode}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mb-4">
                  <Maximize2 size={32} className="text-[var(--text-muted)]" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Select a component
                </h3>
                <p className="text-[var(--text-muted)] max-w-md">
                  Choose a component from the list to see a live preview with sample data.
                  Toggle dark mode to see how it looks on different backgrounds.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Fullscreen close button */}
        {fullscreen && (
          <button
            onClick={() => setFullscreen(false)}
            className="fixed top-8 right-8 z-[60] p-3 rounded-xl bg-white shadow-lg border border-[#E5E5E5] hover:border-black transition-all"
          >
            <X size={20} />
          </button>
        )}
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
