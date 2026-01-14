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
// CHARTS - BASIC (13)
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
// CHARTS - STATISTICAL (6)
// ============================================
export { ScatterPlot } from './charts/ScatterPlot';
export { BubbleChart } from './charts/BubbleChart';
export { Histogram } from './charts/Histogram';
export { BoxPlot } from './charts/BoxPlot';
export { ViolinPlot } from './charts/ViolinPlot';
export { DensityPlot } from './charts/DensityPlot';

// ============================================
// CHARTS - TIME SERIES (6)
// ============================================
export { CandlestickChart } from './charts/CandlestickChart';
export { OHLCChart } from './charts/OHLCChart';
export { StepChart } from './charts/StepChart';
export { Sparkline } from './charts/Sparkline';
export { ControlChart } from './charts/ControlChart';
export { RunChart } from './charts/RunChart';

// ============================================
// CHARTS - HIERARCHICAL (6)
// ============================================
export { TreeMap } from './charts/TreeMap';
export { SunburstChart } from './charts/SunburstChart';
export { RadialTree } from './charts/RadialTree';
export { Dendrogram } from './charts/Dendrogram';
export { IcicleChart } from './charts/IcicleChart';
export { MindMap } from './charts/MindMap';

// ============================================
// CHARTS - NETWORK/RELATIONS (6)
// ============================================
export { NetworkGraph } from './charts/NetworkGraph';
export { ChordDiagram } from './charts/ChordDiagram';
export { SankeyDiagram } from './charts/SankeyDiagram';
export { VennDiagram } from './charts/VennDiagram';
export { ForceDirectedGraph } from './charts/ForceDirectedGraph';
export { MatrixChart } from './charts/MatrixChart';

// ============================================
// CHARTS - KPI & PROGRESS (6)
// ============================================
export { KPICard } from './charts/KPICard';
export { Scorecard } from './charts/Scorecard';
export { SpeedometerChart } from './charts/SpeedometerChart';
export { CalendarHeatmap } from './charts/CalendarHeatmap';
export { ParetoChart } from './charts/ParetoChart';
export { WordCloud } from './charts/WordCloud';

// ============================================
// CHARTS - SPECIALTY (11)
// ============================================
export { SpiderChart } from './charts/SpiderChart';
export { PolarAreaChart } from './charts/PolarAreaChart';
export { PyramidChart } from './charts/PyramidChart';
export { LollipopChart } from './charts/LollipopChart';
export { BumpChart } from './charts/BumpChart';
export { SlopeChart } from './charts/SlopeChart';
export { StreamGraph } from './charts/StreamGraph';
export { RidgelinePlot } from './charts/RidgelinePlot';
export { CircularBarChart } from './charts/CircularBarChart';
export { DotPlot } from './charts/DotPlot';
export { ParallelCoordinates } from './charts/ParallelCoordinates';

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
    { id: 'WelcomeSlide', name: 'Welcome Slide', category: 'Fixed Slides', description: 'Lesson intro with hero image, title, learning goals, and duration' },
    { id: 'QuizSlide', name: 'Quiz Slide', category: 'Fixed Slides', description: 'End-of-lesson quiz with celebration animation' },
    { id: 'CompletionSlide', name: 'Completion Slide', category: 'Fixed Slides', description: 'Lesson complete with takeaways and next lesson preview' },
  ],

  // Content (3)
  content: [
    { id: 'SplitContent', name: 'Split Content', category: 'Content', description: '50/50 split layout with text and media' },
    { id: 'FullWidthMedia', name: 'Full Width Media', category: 'Content', description: 'Large visual spanning full width with caption' },
    { id: 'TextBlock', name: 'Text Block', category: 'Content', description: 'Elegant typography with headline and body' },
  ],

  // Charts - Basic (13)
  chartsBasic: [
    { id: 'LineChart', name: 'Line Chart', category: 'Charts - Basic', description: 'Animated line chart with gradient fill' },
    { id: 'BarChart', name: 'Bar Chart', category: 'Charts - Basic', description: 'Vertical or horizontal bar chart' },
    { id: 'AreaChart', name: 'Area Chart', category: 'Charts - Basic', description: 'Smooth area chart with gradient' },
    { id: 'DonutChart', name: 'Donut Chart', category: 'Charts - Basic', description: 'Ring chart with center stat' },
    { id: 'PieChart', name: 'Pie Chart', category: 'Charts - Basic', description: 'Animated pie segments' },
    { id: 'FunnelChart', name: 'Funnel Chart', category: 'Charts - Basic', description: 'Conversion funnel visualization' },
    { id: 'RadarChart', name: 'Radar Chart', category: 'Charts - Basic', description: 'Spider chart for multi-axis comparison' },
    { id: 'GaugeChart', name: 'Gauge Chart', category: 'Charts - Basic', description: 'Speedometer-style gauge' },
    { id: 'ProgressRing', name: 'Progress Ring', category: 'Charts - Basic', description: 'Circular progress indicator' },
    { id: 'Heatmap', name: 'Heatmap', category: 'Charts - Basic', description: 'Color matrix visualization' },
    { id: 'StackedBarChart', name: 'Stacked Bar Chart', category: 'Charts - Basic', description: 'Multi-segment stacked bars' },
    { id: 'WaterfallChart', name: 'Waterfall Chart', category: 'Charts - Basic', description: 'Bridge chart for incremental changes' },
    { id: 'BulletChart', name: 'Bullet Chart', category: 'Charts - Basic', description: 'Performance indicator with target' },
  ],

  // Charts - Statistical (6)
  chartsStatistical: [
    { id: 'ScatterPlot', name: 'Scatter Plot', category: 'Charts - Statistical', description: 'XY correlation plot with optional trend line' },
    { id: 'BubbleChart', name: 'Bubble Chart', category: 'Charts - Statistical', description: '3D data points with size dimension' },
    { id: 'Histogram', name: 'Histogram', category: 'Charts - Statistical', description: 'Frequency distribution visualization' },
    { id: 'BoxPlot', name: 'Box Plot', category: 'Charts - Statistical', description: 'Quartile distribution with outliers' },
    { id: 'ViolinPlot', name: 'Violin Plot', category: 'Charts - Statistical', description: 'Probability density visualization' },
    { id: 'DensityPlot', name: 'Density Plot', category: 'Charts - Statistical', description: 'Kernel density estimation chart' },
  ],

  // Charts - Time Series (6)
  chartsTimeSeries: [
    { id: 'CandlestickChart', name: 'Candlestick Chart', category: 'Charts - Time Series', description: 'OHLC candlestick for financial data' },
    { id: 'OHLCChart', name: 'OHLC Chart', category: 'Charts - Time Series', description: 'Open-High-Low-Close bars' },
    { id: 'StepChart', name: 'Step Chart', category: 'Charts - Time Series', description: 'Discrete step transitions' },
    { id: 'Sparkline', name: 'Sparkline', category: 'Charts - Time Series', description: 'Compact inline trend chart' },
    { id: 'ControlChart', name: 'Control Chart', category: 'Charts - Time Series', description: 'Process control with UCL/LCL' },
    { id: 'RunChart', name: 'Run Chart', category: 'Charts - Time Series', description: 'Time series with median analysis' },
  ],

  // Charts - Hierarchical (6)
  chartsHierarchical: [
    { id: 'TreeMap', name: 'Tree Map', category: 'Charts - Hierarchical', description: 'Nested rectangles for hierarchical data' },
    { id: 'SunburstChart', name: 'Sunburst Chart', category: 'Charts - Hierarchical', description: 'Radial hierarchy visualization' },
    { id: 'RadialTree', name: 'Radial Tree', category: 'Charts - Hierarchical', description: 'Circular tree structure' },
    { id: 'Dendrogram', name: 'Dendrogram', category: 'Charts - Hierarchical', description: 'Tree diagram for clustering' },
    { id: 'IcicleChart', name: 'Icicle Chart', category: 'Charts - Hierarchical', description: 'Horizontal/vertical partition layout' },
    { id: 'MindMap', name: 'Mind Map', category: 'Charts - Hierarchical', description: 'Radial concept map with branches' },
  ],

  // Charts - Network (6)
  chartsNetwork: [
    { id: 'NetworkGraph', name: 'Network Graph', category: 'Charts - Network', description: 'Node-link diagram' },
    { id: 'ChordDiagram', name: 'Chord Diagram', category: 'Charts - Network', description: 'Circular flow relationships' },
    { id: 'SankeyDiagram', name: 'Sankey Diagram', category: 'Charts - Network', description: 'Flow diagram with weighted links' },
    { id: 'VennDiagram', name: 'Venn Diagram', category: 'Charts - Network', description: 'Overlapping sets visualization' },
    { id: 'ForceDirectedGraph', name: 'Force Directed Graph', category: 'Charts - Network', description: 'Physics-based node layout' },
    { id: 'MatrixChart', name: 'Matrix Chart', category: 'Charts - Network', description: 'Grid heatmap for relationships' },
  ],

  // Charts - KPI (6)
  chartsKPI: [
    { id: 'KPICard', name: 'KPI Card', category: 'Charts - KPI', description: 'Single metric with trend indicator' },
    { id: 'Scorecard', name: 'Scorecard', category: 'Charts - KPI', description: 'Multiple metrics with targets' },
    { id: 'SpeedometerChart', name: 'Speedometer Chart', category: 'Charts - KPI', description: 'Semi-circular gauge with zones' },
    { id: 'CalendarHeatmap', name: 'Calendar Heatmap', category: 'Charts - KPI', description: 'Activity over time calendar' },
    { id: 'ParetoChart', name: 'Pareto Chart', category: 'Charts - KPI', description: '80/20 rule visualization' },
    { id: 'WordCloud', name: 'Word Cloud', category: 'Charts - KPI', description: 'Weighted text visualization' },
  ],

  // Charts - Specialty (11)
  chartsSpecialty: [
    { id: 'SpiderChart', name: 'Spider Chart', category: 'Charts - Specialty', description: 'Polygon radar with grid' },
    { id: 'PolarAreaChart', name: 'Polar Area Chart', category: 'Charts - Specialty', description: 'Rose/coxcomb chart' },
    { id: 'PyramidChart', name: 'Pyramid Chart', category: 'Charts - Specialty', description: 'Hierarchical funnel shape' },
    { id: 'LollipopChart', name: 'Lollipop Chart', category: 'Charts - Specialty', description: 'Bar alternative with dots' },
    { id: 'BumpChart', name: 'Bump Chart', category: 'Charts - Specialty', description: 'Ranking changes over time' },
    { id: 'SlopeChart', name: 'Slope Chart', category: 'Charts - Specialty', description: 'Before/after line comparison' },
    { id: 'StreamGraph', name: 'Stream Graph', category: 'Charts - Specialty', description: 'Stacked area around baseline' },
    { id: 'RidgelinePlot', name: 'Ridgeline Plot', category: 'Charts - Specialty', description: 'Overlapping density curves' },
    { id: 'CircularBarChart', name: 'Circular Bar Chart', category: 'Charts - Specialty', description: 'Radial bar segments' },
    { id: 'DotPlot', name: 'Dot Plot', category: 'Charts - Specialty', description: 'Cleveland dot plot comparison' },
    { id: 'ParallelCoordinates', name: 'Parallel Coordinates', category: 'Charts - Specialty', description: 'Multi-dimensional comparison' },
  ],

  // Data Stats (3)
  data: [
    { id: 'StatCard', name: 'Stat Card', category: 'Data', description: 'Large stat with label and trend' },
    { id: 'StatRow', name: 'Stat Row', category: 'Data', description: 'Multiple stats in horizontal row' },
    { id: 'MetricDashboard', name: 'Metric Dashboard', category: 'Data', description: 'Grid of KPI metrics' },
  ],

  // Comparison (2)
  comparison: [
    { id: 'BeforeAfter', name: 'Before / After', category: 'Comparison', description: 'Side-by-side comparison' },
    { id: 'ComparisonBars', name: 'Comparison Bars', category: 'Comparison', description: 'A/B bar comparison' },
  ],

  // Sequential (2)
  sequential: [
    { id: 'Timeline', name: 'Timeline', category: 'Sequential', description: 'Vertical timeline with milestones' },
    { id: 'ProcessSteps', name: 'Process Steps', category: 'Sequential', description: 'Horizontal step indicators' },
  ],

  // Emphasis (3)
  emphasis: [
    { id: 'QuoteBlock', name: 'Quote Block', category: 'Emphasis', description: 'Large quote with decoration' },
    { id: 'SocialProof', name: 'Social Proof', category: 'Emphasis', description: 'Icon-based crowd illustration' },
    { id: 'IconGrid', name: 'Icon Grid', category: 'Emphasis', description: 'Grid of icons with labels' },
  ],
};

// Get all components as a flat array
export const getAllComponents = () => {
  return [
    ...LESSON_COMPONENTS.slides,
    ...LESSON_COMPONENTS.content,
    ...LESSON_COMPONENTS.chartsBasic,
    ...LESSON_COMPONENTS.chartsStatistical,
    ...LESSON_COMPONENTS.chartsTimeSeries,
    ...LESSON_COMPONENTS.chartsHierarchical,
    ...LESSON_COMPONENTS.chartsNetwork,
    ...LESSON_COMPONENTS.chartsKPI,
    ...LESSON_COMPONENTS.chartsSpecialty,
    ...LESSON_COMPONENTS.data,
    ...LESSON_COMPONENTS.comparison,
    ...LESSON_COMPONENTS.sequential,
    ...LESSON_COMPONENTS.emphasis,
  ];
};

// Get all chart components
export const getAllCharts = () => {
  return [
    ...LESSON_COMPONENTS.chartsBasic,
    ...LESSON_COMPONENTS.chartsStatistical,
    ...LESSON_COMPONENTS.chartsTimeSeries,
    ...LESSON_COMPONENTS.chartsHierarchical,
    ...LESSON_COMPONENTS.chartsNetwork,
    ...LESSON_COMPONENTS.chartsKPI,
    ...LESSON_COMPONENTS.chartsSpecialty,
  ];
};

// Get components by category
export const getComponentsByCategory = (category: string) => {
  const key = category.toLowerCase().replace(/\s+/g, '').replace(/-/g, '') as keyof typeof LESSON_COMPONENTS;
  return LESSON_COMPONENTS[key] || [];
};

// Get total component count
export const getComponentCount = () => getAllComponents().length;

// Get chart count
export const getChartCount = () => getAllCharts().length;
