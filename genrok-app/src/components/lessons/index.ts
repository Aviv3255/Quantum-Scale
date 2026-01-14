// Lesson Components - Premium Design System v2
// Export all lesson components for use in lessons and admin studio
// Elite design with 60%+ dark backgrounds, no images, pure code animations

// ============================================
// FIXED SLIDE TEMPLATES (same for ALL lessons)
// ============================================
export { WelcomeSlide } from './slides/WelcomeSlide';
export { QuizSlide } from './slides/QuizSlide';
export { CompletionSlide } from './slides/CompletionSlide';

// ============================================
// CONTENT LAYOUT COMPONENTS
// ============================================
export { SplitContent } from './content/SplitContent';
export { FullWidthMedia } from './content/FullWidthMedia';
export { TextBlock } from './content/TextBlock';

// ============================================
// DATA VISUALIZATION - CHARTS
// ============================================
export { LineChart } from './charts/LineChart';
export { BarChart } from './charts/BarChart';
export { AreaChart } from './charts/AreaChart';
export { DonutChart } from './charts/DonutChart';
export { PieChart } from './charts/PieChart';
export { FunnelChart } from './charts/FunnelChart';
export { RadarChart } from './charts/RadarChart';
export { GaugeChart } from './charts/GaugeChart';
export { ProgressRing } from './charts/ProgressRing';
export { Heatmap } from './charts/Heatmap';
export { StackedBarChart } from './charts/StackedBarChart';
export { WaterfallChart } from './charts/WaterfallChart';
export { BulletChart } from './charts/BulletChart';

// ============================================
// DATA VISUALIZATION - STATS
// ============================================
export { StatCard } from './data/StatCard';
export { StatRow } from './data/StatRow';
export { MetricDashboard } from './data/MetricDashboard';

// ============================================
// COMPARISON COMPONENTS
// ============================================
export { BeforeAfter } from './comparison/BeforeAfter';
export { ComparisonBars } from './comparison/ComparisonBars';

// ============================================
// SEQUENTIAL / PROCESS COMPONENTS
// ============================================
export { Timeline } from './sequential/Timeline';
export { ProcessSteps } from './sequential/ProcessSteps';

// ============================================
// EMPHASIS / HIGHLIGHT COMPONENTS
// ============================================
export { QuoteBlock } from './emphasis/QuoteBlock';
export { SocialProof } from './emphasis/SocialProof';
export { IconGrid } from './emphasis/IconGrid';

// ============================================
// COMPONENT REGISTRY FOR ADMIN STUDIO
// ============================================
export const LESSON_COMPONENTS = {
  // Fixed Slides (3)
  slides: [
    {
      id: 'WelcomeSlide',
      name: 'Welcome Slide',
      category: 'Fixed Slides',
      description: 'Lesson intro with hero image, title, learning goals, and duration',
      props: ['title', 'subtitle', 'learningGoals', 'duration', 'heroImage', 'darkMode'],
    },
    {
      id: 'QuizSlide',
      name: 'Quiz Slide',
      category: 'Fixed Slides',
      description: 'End-of-lesson quiz with celebration animation',
      props: ['question', 'options', 'feedback'],
    },
    {
      id: 'CompletionSlide',
      name: 'Completion Slide',
      category: 'Fixed Slides',
      description: 'Lesson complete with takeaways and next lesson preview',
      props: ['lessonTitle', 'keyTakeaways', 'nextLesson'],
    },
  ],

  // Content (3)
  content: [
    {
      id: 'SplitContent',
      name: 'Split Content',
      category: 'Content',
      description: '50/50 split layout with text and media',
      props: ['title', 'content', 'media', 'reversed', 'accentColor'],
    },
    {
      id: 'FullWidthMedia',
      name: 'Full Width Media',
      category: 'Content',
      description: 'Large visual spanning full width with caption',
      props: ['src', 'type', 'alt', 'caption', 'aspectRatio'],
    },
    {
      id: 'TextBlock',
      name: 'Text Block',
      category: 'Content',
      description: 'Elegant typography with headline and body',
      props: ['headline', 'subheadline', 'body', 'alignment', 'size', 'accentColor'],
    },
  ],

  // Charts (13)
  charts: [
    {
      id: 'LineChart',
      name: 'Line Chart',
      category: 'Charts',
      description: 'Animated line chart with gradient fill and trend indicator',
      props: ['data', 'title', 'subtitle', 'valuePrefix', 'valueSuffix', 'showTrend', 'accentColor'],
    },
    {
      id: 'BarChart',
      name: 'Bar Chart',
      category: 'Charts',
      description: 'Animated vertical or horizontal bar chart',
      props: ['data', 'title', 'subtitle', 'maxValue', 'showValues', 'horizontal', 'accentColor'],
    },
    {
      id: 'AreaChart',
      name: 'Area Chart',
      category: 'Charts',
      description: 'Smooth area chart with gradient fill',
      props: ['data', 'title', 'subtitle', 'accentColor', 'showGrid'],
    },
    {
      id: 'DonutChart',
      name: 'Donut Chart',
      category: 'Charts',
      description: 'Ring chart with center stat and legend',
      props: ['data', 'centerValue', 'centerLabel', 'title', 'size', 'thickness'],
    },
    {
      id: 'PieChart',
      name: 'Pie Chart',
      category: 'Charts',
      description: 'Animated pie segments with legend',
      props: ['data', 'title', 'size', 'showLabels'],
    },
    {
      id: 'FunnelChart',
      name: 'Funnel Chart',
      category: 'Charts',
      description: 'Conversion funnel with drop-off rates',
      props: ['data', 'title', 'subtitle', 'showConversion'],
    },
    {
      id: 'RadarChart',
      name: 'Radar Chart',
      category: 'Charts',
      description: 'Spider/radar chart for multi-axis comparison',
      props: ['data', 'maxValue', 'title', 'accentColor', 'showLabels'],
    },
    {
      id: 'GaugeChart',
      name: 'Gauge Chart',
      category: 'Charts',
      description: 'Speedometer-style gauge with animated arc',
      props: ['value', 'maxValue', 'title', 'label', 'accentColor'],
    },
    {
      id: 'ProgressRing',
      name: 'Progress Ring',
      category: 'Charts',
      description: 'Circular progress indicator with animation',
      props: ['value', 'maxValue', 'size', 'thickness', 'label', 'sublabel', 'accentColor', 'showPercent'],
    },
    {
      id: 'Heatmap',
      name: 'Heatmap',
      category: 'Charts',
      description: 'Color matrix for data density visualization',
      props: ['data', 'rows', 'cols', 'title', 'minColor', 'maxColor', 'showValues'],
    },
    {
      id: 'StackedBarChart',
      name: 'Stacked Bar Chart',
      category: 'Charts',
      description: 'Horizontal stacked bars with multiple segments',
      props: ['data', 'title', 'horizontal', 'legendLabels'],
    },
    {
      id: 'WaterfallChart',
      name: 'Waterfall Chart',
      category: 'Charts',
      description: 'Bridge chart showing incremental changes',
      props: ['data', 'title', 'valuePrefix'],
    },
    {
      id: 'BulletChart',
      name: 'Bullet Chart',
      category: 'Charts',
      description: 'Performance indicator with target marker',
      props: ['value', 'target', 'ranges', 'title', 'subtitle', 'unit'],
    },
  ],

  // Data Stats (3)
  data: [
    {
      id: 'StatCard',
      name: 'Stat Card',
      category: 'Data',
      description: 'Large stat with label and trend indicator',
      props: ['value', 'label', 'trend', 'size', 'accentValue'],
    },
    {
      id: 'StatRow',
      name: 'Stat Row',
      category: 'Data',
      description: 'Multiple stats in horizontal row',
      props: ['stats', 'layout'],
    },
    {
      id: 'MetricDashboard',
      name: 'Metric Dashboard',
      category: 'Data',
      description: 'Grid of KPI metrics with trends',
      props: ['metrics', 'title', 'columns'],
    },
  ],

  // Comparison (2)
  comparison: [
    {
      id: 'BeforeAfter',
      name: 'Before / After',
      category: 'Comparison',
      description: 'Side-by-side comparison with red/green accents',
      props: ['before', 'after', 'headline'],
    },
    {
      id: 'ComparisonBars',
      name: 'Comparison Bars',
      category: 'Comparison',
      description: 'A/B bar comparison with improvement indicator',
      props: ['itemA', 'itemB', 'title', 'labelA', 'labelB', 'colorA', 'colorB'],
    },
  ],

  // Sequential (2)
  sequential: [
    {
      id: 'Timeline',
      name: 'Timeline',
      category: 'Sequential',
      description: 'Vertical timeline with milestones',
      props: ['items', 'title', 'accentColor'],
    },
    {
      id: 'ProcessSteps',
      name: 'Process Steps',
      category: 'Sequential',
      description: 'Horizontal step indicators',
      props: ['steps', 'title', 'currentStep', 'accentColor'],
    },
  ],

  // Emphasis (3)
  emphasis: [
    {
      id: 'QuoteBlock',
      name: 'Quote Block',
      category: 'Emphasis',
      description: 'Large quote with icon decoration (no images)',
      props: ['quote', 'author', 'role', 'accentColor'],
    },
    {
      id: 'SocialProof',
      name: 'Social Proof',
      category: 'Emphasis',
      description: 'Icon-based crowd illustration with stats',
      props: ['stat', 'label', 'description', 'type', 'crowdSize', 'accentColor'],
    },
    {
      id: 'IconGrid',
      name: 'Icon Grid',
      category: 'Emphasis',
      description: 'Grid of icons with labels for features/benefits',
      props: ['items', 'title', 'columns', 'accentColor'],
    },
  ],
};

// Get all components as a flat array
export const getAllComponents = () => {
  return [
    ...LESSON_COMPONENTS.slides,
    ...LESSON_COMPONENTS.content,
    ...LESSON_COMPONENTS.charts,
    ...LESSON_COMPONENTS.data,
    ...LESSON_COMPONENTS.comparison,
    ...LESSON_COMPONENTS.sequential,
    ...LESSON_COMPONENTS.emphasis,
  ];
};

// Get components by category
export const getComponentsByCategory = (category: string) => {
  const key = category.toLowerCase() as keyof typeof LESSON_COMPONENTS;
  return LESSON_COMPONENTS[key] || [];
};

// Get total component count
export const getComponentCount = () => getAllComponents().length;
