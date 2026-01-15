// Layout Templates - 30 Premium Pre-Built Slide Layouts
// Combine components for consistent, beautiful lesson slides

// ============================================
// HERO / INTRO LAYOUTS (6)
// ============================================
export { HeroTitleLayout } from './hero/HeroTitleLayout';
export { HeroWithStatsLayout } from './hero/HeroWithStatsLayout';
export { HeroSplitLayout } from './hero/HeroSplitLayout';
export { ChapterIntroLayout } from './hero/ChapterIntroLayout';
export { SectionDividerLayout } from './hero/SectionDividerLayout';
export { BigIdeaLayout } from './hero/BigIdeaLayout';

// ============================================
// TEXT-FOCUSED LAYOUTS (5)
// ============================================
export { SinglePointLayout } from './text/SinglePointLayout';
export { TwoPointLayout } from './text/TwoPointLayout';
export { ThreePointLayout } from './text/ThreePointLayout';
export { BulletListLayout } from './text/BulletListLayout';
export { NumberedListLayout } from './text/NumberedListLayout';

// ============================================
// DATA / CHART LAYOUTS (6)
// ============================================
export { SingleChartLayout } from './data/SingleChartLayout';
export { ChartWithInsightLayout } from './data/ChartWithInsightLayout';
export { DualChartLayout } from './data/DualChartLayout';
export { StatsGridLayout } from './data/StatsGridLayout';
export { MetricHighlightLayout } from './data/MetricHighlightLayout';
export { DashboardLayout as DashboardViewLayout } from './data/DashboardLayout';

// ============================================
// COMPARISON LAYOUTS (5)
// ============================================
export { BeforeAfterLayout } from './comparison/BeforeAfterLayout';
export { ProConLayout } from './comparison/ProConLayout';
export { FeatureCompareLayout } from './comparison/FeatureCompareLayout';
export { TwoOptionLayout } from './comparison/TwoOptionLayout';
export { ScenarioCompareLayout } from './comparison/ScenarioCompareLayout';

// ============================================
// PROCESS / SEQUENTIAL LAYOUTS (4)
// ============================================
export { StepByStepLayout } from './process/StepByStepLayout';
export { TimelineLayout } from './process/TimelineLayout';
export { FlowchartLayout } from './process/FlowchartLayout';
export { JourneyMapLayout } from './process/JourneyMapLayout';

// ============================================
// EMPHASIS / QUOTE LAYOUTS (4)
// ============================================
export { QuoteLayout } from './emphasis/QuoteLayout';
export { KeyTakeawayLayout } from './emphasis/KeyTakeawayLayout';
export { FactHighlightLayout } from './emphasis/FactHighlightLayout';
export { CalloutBoxLayout } from './emphasis/CalloutBoxLayout';

// ============================================
// LAYOUT REGISTRY FOR ADMIN STUDIO
// ============================================
export const LAYOUT_TEMPLATES = {
  hero: [
    {
      id: 'HeroTitleLayout',
      name: 'Hero Title',
      category: 'Hero',
      description: 'Bold title with subtitle and optional icon accent',
      thumbnail: 'hero-title',
    },
    {
      id: 'HeroWithStatsLayout',
      name: 'Hero with Stats',
      category: 'Hero',
      description: 'Title with supporting statistics row',
      thumbnail: 'hero-stats',
    },
    {
      id: 'HeroSplitLayout',
      name: 'Hero Split',
      category: 'Hero',
      description: '50/50 split with headline and visual element',
      thumbnail: 'hero-split',
    },
    {
      id: 'ChapterIntroLayout',
      name: 'Chapter Intro',
      category: 'Hero',
      description: 'Chapter number with title and description',
      thumbnail: 'chapter-intro',
    },
    {
      id: 'SectionDividerLayout',
      name: 'Section Divider',
      category: 'Hero',
      description: 'Minimalist section transition slide',
      thumbnail: 'section-divider',
    },
    {
      id: 'BigIdeaLayout',
      name: 'Big Idea',
      category: 'Hero',
      description: 'Single powerful statement centered',
      thumbnail: 'big-idea',
    },
  ],
  text: [
    {
      id: 'SinglePointLayout',
      name: 'Single Point',
      category: 'Text',
      description: 'One key concept with supporting detail',
      thumbnail: 'single-point',
    },
    {
      id: 'TwoPointLayout',
      name: 'Two Points',
      category: 'Text',
      description: 'Two side-by-side concepts',
      thumbnail: 'two-point',
    },
    {
      id: 'ThreePointLayout',
      name: 'Three Points',
      category: 'Text',
      description: 'Three concepts in a row',
      thumbnail: 'three-point',
    },
    {
      id: 'BulletListLayout',
      name: 'Bullet List',
      category: 'Text',
      description: 'Title with bullet point list',
      thumbnail: 'bullet-list',
    },
    {
      id: 'NumberedListLayout',
      name: 'Numbered List',
      category: 'Text',
      description: 'Title with numbered steps',
      thumbnail: 'numbered-list',
    },
  ],
  data: [
    {
      id: 'SingleChartLayout',
      name: 'Single Chart',
      category: 'Data',
      description: 'Centered chart with title and context',
      thumbnail: 'single-chart',
    },
    {
      id: 'ChartWithInsightLayout',
      name: 'Chart + Insight',
      category: 'Data',
      description: 'Chart with key insight callout',
      thumbnail: 'chart-insight',
    },
    {
      id: 'DualChartLayout',
      name: 'Dual Charts',
      category: 'Data',
      description: 'Two charts side by side',
      thumbnail: 'dual-chart',
    },
    {
      id: 'StatsGridLayout',
      name: 'Stats Grid',
      category: 'Data',
      description: '2x2 or 3x3 grid of key metrics',
      thumbnail: 'stats-grid',
    },
    {
      id: 'MetricHighlightLayout',
      name: 'Metric Highlight',
      category: 'Data',
      description: 'Single large metric with context',
      thumbnail: 'metric-highlight',
    },
    {
      id: 'DashboardViewLayout',
      name: 'Dashboard View',
      category: 'Data',
      description: 'Multiple KPIs in dashboard style',
      thumbnail: 'dashboard',
    },
  ],
  comparison: [
    {
      id: 'BeforeAfterLayout',
      name: 'Before / After',
      category: 'Comparison',
      description: 'Side-by-side transformation view',
      thumbnail: 'before-after',
    },
    {
      id: 'ProConLayout',
      name: 'Pros & Cons',
      category: 'Comparison',
      description: 'Green pros vs red cons',
      thumbnail: 'pro-con',
    },
    {
      id: 'FeatureCompareLayout',
      name: 'Feature Compare',
      category: 'Comparison',
      description: 'Compare features across options',
      thumbnail: 'feature-compare',
    },
    {
      id: 'TwoOptionLayout',
      name: 'Two Options',
      category: 'Comparison',
      description: 'Option A vs Option B decision',
      thumbnail: 'two-option',
    },
    {
      id: 'ScenarioCompareLayout',
      name: 'Scenario Compare',
      category: 'Comparison',
      description: 'Compare different scenarios',
      thumbnail: 'scenario-compare',
    },
  ],
  process: [
    {
      id: 'StepByStepLayout',
      name: 'Step by Step',
      category: 'Process',
      description: 'Horizontal step progression',
      thumbnail: 'step-by-step',
    },
    {
      id: 'TimelineLayout',
      name: 'Timeline',
      category: 'Process',
      description: 'Vertical timeline with milestones',
      thumbnail: 'timeline',
    },
    {
      id: 'FlowchartLayout',
      name: 'Flowchart',
      category: 'Process',
      description: 'Decision flow visualization',
      thumbnail: 'flowchart',
    },
    {
      id: 'JourneyMapLayout',
      name: 'Journey Map',
      category: 'Process',
      description: 'Customer journey visualization',
      thumbnail: 'journey-map',
    },
  ],
  emphasis: [
    {
      id: 'QuoteLayout',
      name: 'Quote',
      category: 'Emphasis',
      description: 'Large quote with attribution',
      thumbnail: 'quote',
    },
    {
      id: 'KeyTakeawayLayout',
      name: 'Key Takeaway',
      category: 'Emphasis',
      description: 'Important point with icon',
      thumbnail: 'key-takeaway',
    },
    {
      id: 'FactHighlightLayout',
      name: 'Fact Highlight',
      category: 'Emphasis',
      description: 'Surprising fact or statistic',
      thumbnail: 'fact-highlight',
    },
    {
      id: 'CalloutBoxLayout',
      name: 'Callout Box',
      category: 'Emphasis',
      description: 'Info/warning/tip callout',
      thumbnail: 'callout-box',
    },
  ],
};

// Get all layouts as a flat array
export const getAllLayouts = () => {
  return [
    ...LAYOUT_TEMPLATES.hero,
    ...LAYOUT_TEMPLATES.text,
    ...LAYOUT_TEMPLATES.data,
    ...LAYOUT_TEMPLATES.comparison,
    ...LAYOUT_TEMPLATES.process,
    ...LAYOUT_TEMPLATES.emphasis,
  ];
};

// Get layouts by category
export const getLayoutsByCategory = (category: string) => {
  const key = category.toLowerCase() as keyof typeof LAYOUT_TEMPLATES;
  return LAYOUT_TEMPLATES[key] || [];
};

// Get total layout count
export const getLayoutCount = () => getAllLayouts().length;
