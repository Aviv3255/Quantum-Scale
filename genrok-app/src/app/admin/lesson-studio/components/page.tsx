'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  X,
  Copy,
  Grid3X3,
  Sun,
  Moon,
  Bug,
  Send,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  // Fixed Slides
  WelcomeSlide,
  QuizSlide,
  CompletionSlide,
  // Content
  SplitContent,
  FullWidthMedia,
  TextBlock,
  // Data Stats
  StatCard,
  StatRow,
  MetricDashboard,
  // Comparison
  BeforeAfter,
  ComparisonBars,
  // Sequential
  Timeline,
  ProcessSteps,
  // Emphasis
  QuoteBlock,
  SocialProof,
  IconGrid,
  // Charts - Basic
  LineChart,
  BarChart,
  AreaChart,
  DonutChart,
  PieChart,
  FunnelChart,
  RadarChart,
  GaugeChart,
  ProgressRing,
  Heatmap,
  StackedBarChart,
  WaterfallChart,
  BulletChart,
  // Charts - Statistical
  ScatterPlot,
  BubbleChart,
  Histogram,
  BoxPlot,
  ViolinPlot,
  DensityPlot,
  // Charts - Time Series
  CandlestickChart,
  OHLCChart,
  StepChart,
  Sparkline,
  ControlChart,
  RunChart,
  // Charts - Hierarchical
  TreeMap,
  SunburstChart,
  RadialTree,
  Dendrogram,
  IcicleChart,
  MindMap,
  // Charts - Network
  NetworkGraph,
  ChordDiagram,
  SankeyDiagram,
  VennDiagram,
  ForceDirectedGraph,
  MatrixChart,
  // Charts - KPI
  KPICard,
  Scorecard,
  SpeedometerChart,
  CalendarHeatmap,
  ParetoChart,
  WordCloud,
  // Charts - Specialty
  SpiderChart,
  PolarAreaChart,
  PyramidChart,
  LollipopChart,
  BumpChart,
  SlopeChart,
  StreamGraph,
  RidgelinePlot,
  CircularBarChart,
  DotPlot,
  ParallelCoordinates,
  // Charts - Process/Workflow (Batch 5)
  GanttChart,
  FlowChart,
  KanbanBoard,
  RoadmapDiagram,
  CustomerJourneyMap,
  SwimlaneChart,
  DecisionTree,
  ProcessMap,
  EventSequence,
  // Charts - Advanced Statistical (Batch 6)
  TornadoChart,
  ROCCurve,
  ConfusionMatrix,
  CohortChart,
  RetentionCurve,
  LorenzCurve,
  ErrorBarChart,
  RegressionPlot,
  ForecastChart,
  SensitivityChart,
  // Charts - Distribution/Specialized (Batch 7)
  HexbinPlot,
  SwarmPlot,
  StripPlot,
  MosaicPlot,
  AdjacencyMatrix,
  PhylogeneticTree,
  EulerDiagram,
  IsotypeChart,
  ConceptMap,
  // Charts - UML/Technical (Batch 8)
  SequenceDiagram,
  ActivityDiagram,
  ERDiagram,
  // Charts - Technical Diagrams (Batch 9)
  StateDiagram,
  DataFlowDiagram,
  ArchitectureDiagram,
  NetworkTopology,
  InfrastructureDiagram,
  // Charts - Probabilistic/Causal (Batch 9)
  BayesianNetwork,
  CausalLoopDiagram,
  // Charts - Interactive/Comparison (Batch 9)
  InteractiveTable,
  ComparisonSlider,
  PortfolioBreakdown,
  RevenueWaterfall,
  CountryMap,
  // Charts - Goal/Progress (Batch 9)
  ThermometerChart,
  SegmentedProgress,
  AnnotatedTimeline,
  PredictionBand,
  AnomalyChart,
  TargetChart,
  // Charts - Matrix/Strategy (Batch 9)
  PerformanceMatrix,
  ValueChain,
  SWOT,
  RiskMatrix,
  PriorityMatrix,
  CompetitorMap,
  // Charts - Metrics/OKR (Batch 9)
  SkillRadar,
  OKRTracker,
  QuarterlyTrend,
  BenchmarkChart,
  CapabilityModel,
  // Charts - UX/Product (Batch 9)
  UserFlowDiagram,
  FeatureComparison,
  MetricsDashboard,
  FeedbackLoop,
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

  // Charts - Basic
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
  PieChart: {
    title: 'Market Share',
    data: [
      { label: 'Product A', value: 35 },
      { label: 'Product B', value: 28 },
      { label: 'Product C', value: 22 },
      { label: 'Product D', value: 15 },
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
  GaugeChart: {
    title: 'Performance Score',
    value: 78,
    min: 0,
    max: 100,
    label: 'Current Score',
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
  StackedBarChart: {
    title: 'Revenue by Region',
    data: [
      { label: 'Q1', segments: [{ name: 'North', value: 30 }, { name: 'South', value: 20 }, { name: 'East', value: 25 }] },
      { label: 'Q2', segments: [{ name: 'North', value: 35 }, { name: 'South', value: 25 }, { name: 'East', value: 30 }] },
      { label: 'Q3', segments: [{ name: 'North', value: 40 }, { name: 'South', value: 28 }, { name: 'East', value: 35 }] },
      { label: 'Q4', segments: [{ name: 'North', value: 45 }, { name: 'South', value: 32 }, { name: 'East', value: 40 }] },
    ],
  },
  WaterfallChart: {
    title: 'Revenue Breakdown',
    data: [
      { label: 'Starting', value: 100, type: 'start' as const },
      { label: 'Sales', value: 50, type: 'increase' as const },
      { label: 'Costs', value: -30, type: 'decrease' as const },
      { label: 'Tax', value: -10, type: 'decrease' as const },
      { label: 'Net', value: 110, type: 'total' as const },
    ],
  },
  BulletChart: {
    title: 'Revenue vs Target',
    value: 275,
    target: 300,
    ranges: [100, 200, 300] as [number, number, number],
  },

  // Charts - Statistical
  ScatterPlot: {
    title: 'Price vs Sales Volume',
    data: [
      { x: 10, y: 120 }, { x: 15, y: 95 }, { x: 20, y: 85 },
      { x: 25, y: 72 }, { x: 30, y: 65 }, { x: 35, y: 55 },
      { x: 40, y: 48 }, { x: 45, y: 42 }, { x: 50, y: 38 },
    ],
    xLabel: 'Price ($)',
    yLabel: 'Units Sold',
  },
  BubbleChart: {
    title: 'Market Analysis',
    data: [
      { x: 20, y: 30, size: 40, label: 'Product A' },
      { x: 40, y: 50, size: 60, label: 'Product B' },
      { x: 60, y: 40, size: 30, label: 'Product C' },
      { x: 80, y: 70, size: 50, label: 'Product D' },
    ],
  },
  Histogram: {
    title: 'Order Value Distribution',
    data: [12, 45, 78, 95, 82, 65, 48, 32, 18, 8],
    binLabels: ['$0-10', '$10-20', '$20-30', '$30-40', '$40-50', '$50-60', '$60-70', '$70-80', '$80-90', '$90-100'],
  },
  BoxPlot: {
    title: 'Sales Distribution',
    data: [
      { label: 'Q1', values: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85] },
      { label: 'Q2', values: [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90] },
      { label: 'Q3', values: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95] },
      { label: 'Q4', values: [35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100] },
    ],
  },
  ViolinPlot: {
    title: 'Revenue Distribution',
    data: [
      { label: 'Region A', values: [20, 25, 30, 35, 40, 45, 40, 35, 30, 25] },
      { label: 'Region B', values: [30, 35, 45, 55, 60, 55, 45, 35, 30, 25] },
      { label: 'Region C', values: [40, 50, 60, 70, 75, 70, 60, 50, 40, 35] },
    ],
  },
  DensityPlot: {
    title: 'Customer Age Distribution',
    data: [
      { label: 'Age Group', values: [18, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50, 52, 55] },
    ],
  },

  // Charts - Time Series
  CandlestickChart: {
    title: 'Stock Performance',
    data: [
      { date: 'Mon', open: 100, high: 110, low: 95, close: 105 },
      { date: 'Tue', open: 105, high: 115, low: 102, close: 112 },
      { date: 'Wed', open: 112, high: 118, low: 108, close: 115 },
      { date: 'Thu', open: 115, high: 120, low: 110, close: 108 },
      { date: 'Fri', open: 108, high: 112, low: 100, close: 110 },
    ],
  },
  OHLCChart: {
    title: 'Weekly Trading',
    data: [
      { date: 'W1', open: 100, high: 108, low: 95, close: 104 },
      { date: 'W2', open: 104, high: 112, low: 100, close: 110 },
      { date: 'W3', open: 110, high: 115, low: 105, close: 108 },
      { date: 'W4', open: 108, high: 118, low: 104, close: 115 },
    ],
  },
  StepChart: {
    title: 'Price Changes',
    data: [
      { label: 'Jan', value: 29 },
      { label: 'Feb', value: 29 },
      { label: 'Mar', value: 39 },
      { label: 'Apr', value: 39 },
      { label: 'May', value: 49 },
      { label: 'Jun', value: 49 },
    ],
  },
  Sparkline: {
    data: [12, 18, 15, 22, 19, 25, 28, 24, 30, 27],
    label: 'Trend',
  },
  ControlChart: {
    title: 'Quality Control',
    data: [
      { label: 'D1', value: 48 }, { label: 'D2', value: 52 }, { label: 'D3', value: 49 },
      { label: 'D4', value: 51 }, { label: 'D5', value: 50 }, { label: 'D6', value: 53 },
      { label: 'D7', value: 47 }, { label: 'D8', value: 52 }, { label: 'D9', value: 49 },
      { label: 'D10', value: 51 }, { label: 'D11', value: 48 }, { label: 'D12', value: 54 },
    ],
    ucl: 55,
    lcl: 45,
    target: 50,
  },
  RunChart: {
    title: 'Daily Output',
    data: [
      { label: 'D1', value: 85 }, { label: 'D2', value: 88 }, { label: 'D3', value: 82 },
      { label: 'D4', value: 90 }, { label: 'D5', value: 87 }, { label: 'D6', value: 92 },
      { label: 'D7', value: 88 }, { label: 'D8', value: 95 }, { label: 'D9', value: 91 },
      { label: 'D10', value: 89 },
    ],
  },

  // Charts - Hierarchical
  TreeMap: {
    title: 'Budget Allocation',
    data: [
      { label: 'Marketing', value: 35000 },
      { label: 'Development', value: 45000 },
      { label: 'Operations', value: 25000 },
      { label: 'Sales', value: 30000 },
      { label: 'Support', value: 15000 },
    ],
  },
  SunburstChart: {
    title: 'Organization Structure',
    data: {
      name: 'Company',
      children: [
        { name: 'Engineering', value: 40, children: [{ name: 'Frontend', value: 15 }, { name: 'Backend', value: 25 }] },
        { name: 'Sales', value: 30, children: [{ name: 'Direct', value: 20 }, { name: 'Channel', value: 10 }] },
        { name: 'Marketing', value: 30 },
      ],
    },
  },
  RadialTree: {
    title: 'Product Categories',
    data: {
      name: 'Products',
      children: [
        { name: 'Electronics', children: [{ name: 'Phones' }, { name: 'Laptops' }, { name: 'Tablets' }] },
        { name: 'Clothing', children: [{ name: 'Men' }, { name: 'Women' }, { name: 'Kids' }] },
        { name: 'Home', children: [{ name: 'Furniture' }, { name: 'Decor' }] },
      ],
    },
  },
  Dendrogram: {
    title: 'Customer Segments',
    data: {
      name: 'Customers',
      children: [
        { name: 'High Value', children: [{ name: 'VIP' }, { name: 'Premium' }] },
        { name: 'Regular', children: [{ name: 'Active' }, { name: 'Occasional' }] },
        { name: 'New', children: [{ name: 'Trial' }, { name: 'Prospect' }] },
      ],
    },
  },
  IcicleChart: {
    title: 'File System',
    data: {
      name: 'Root',
      children: [
        { name: 'Documents', value: 30, children: [{ name: 'Work', value: 20 }, { name: 'Personal', value: 10 }] },
        { name: 'Images', value: 25 },
        { name: 'Videos', value: 45 },
      ],
    },
  },
  MindMap: {
    title: 'Project Planning',
    data: {
      label: 'Project',
      children: [
        { label: 'Research', children: [{ label: 'Market' }, { label: 'Users' }] },
        { label: 'Design', children: [{ label: 'UI' }, { label: 'UX' }] },
        { label: 'Development', children: [{ label: 'Frontend' }, { label: 'Backend' }] },
      ],
    },
  },

  // Charts - Network
  NetworkGraph: {
    title: 'Team Collaboration',
    nodes: [
      { id: '1', label: 'Alice' }, { id: '2', label: 'Bob' },
      { id: '3', label: 'Carol' }, { id: '4', label: 'Dave' },
    ],
    edges: [
      { source: '1', target: '2' }, { source: '1', target: '3' },
      { source: '2', target: '4' }, { source: '3', target: '4' },
    ],
  },
  ChordDiagram: {
    title: 'Department Interactions',
    data: {
      labels: ['Sales', 'Marketing', 'Support', 'Product'],
      matrix: [
        [0, 30, 20, 10],
        [30, 0, 15, 25],
        [20, 15, 0, 10],
        [10, 25, 10, 0],
      ],
    },
  },
  SankeyDiagram: {
    title: 'User Flow',
    nodes: [
      { id: 'home', label: 'Home' },
      { id: 'products', label: 'Products' },
      { id: 'cart', label: 'Cart' },
      { id: 'checkout', label: 'Checkout' },
      { id: 'purchase', label: 'Purchase' },
      { id: 'exit', label: 'Exit' },
    ],
    links: [
      { source: 'home', target: 'products', value: 100 },
      { source: 'products', target: 'cart', value: 60 },
      { source: 'products', target: 'exit', value: 40 },
      { source: 'cart', target: 'checkout', value: 40 },
      { source: 'cart', target: 'exit', value: 20 },
      { source: 'checkout', target: 'purchase', value: 35 },
    ],
  },
  VennDiagram: {
    title: 'Customer Overlap',
    sets: [
      { label: 'Email' },
      { label: 'Social' },
      { label: 'Ads' },
    ] as [{ label: string }, { label: string }, { label: string }],
    intersectionLabel: '10%',
  },
  ForceDirectedGraph: {
    title: 'Influence Network',
    nodes: [
      { id: 'A', label: 'Node A' }, { id: 'B', label: 'Node B' }, { id: 'C', label: 'Node C' },
      { id: 'D', label: 'Node D' }, { id: 'E', label: 'Node E' }, { id: 'F', label: 'Node F' },
    ],
    edges: [
      { source: 'A', target: 'B' }, { source: 'A', target: 'C' },
      { source: 'B', target: 'D' }, { source: 'C', target: 'E' },
      { source: 'D', target: 'F' }, { source: 'E', target: 'F' },
    ],
  },
  MatrixChart: {
    title: 'Correlation Matrix',
    rowLabels: ['Sales', 'Marketing', 'Support', 'Product'],
    columnLabels: ['Sales', 'Marketing', 'Support', 'Product'],
    data: [
      [1, 0.8, 0.5, 0.6],
      [0.8, 1, 0.4, 0.7],
      [0.5, 0.4, 1, 0.6],
      [0.6, 0.7, 0.6, 1],
    ],
  },

  // Charts - KPI
  KPICard: {
    value: '$124,500',
    label: 'Monthly Revenue',
    change: 23,
    changeLabel: 'vs last month',
    trend: 'up' as const,
  },
  Scorecard: {
    title: 'Q4 Performance',
    items: [
      { label: 'Revenue', value: 124, maxValue: 150, target: 120 },
      { label: 'Customers', value: 2847, maxValue: 3500, target: 3000 },
      { label: 'NPS', value: 72, maxValue: 100, target: 70 },
    ],
  },
  SpeedometerChart: {
    title: 'Customer Satisfaction',
    value: 78,
    min: 0,
    max: 100,
    zones: [
      { min: 0, max: 40, color: '#EF4444' },
      { min: 40, max: 70, color: '#F59E0B' },
      { min: 70, max: 100, color: '#22C55E' },
    ],
  },
  CalendarHeatmap: {
    title: 'Activity Calendar',
    year: 2024,
    data: Array.from({ length: 365 }, (_, i) => ({
      date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
      value: Math.floor(Math.random() * 10),
    })),
  },
  ParetoChart: {
    title: 'Issue Analysis',
    data: [
      { label: 'Bug A', value: 45 },
      { label: 'Bug B', value: 25 },
      { label: 'Bug C', value: 15 },
      { label: 'Bug D', value: 10 },
      { label: 'Bug E', value: 5 },
    ],
  },
  WordCloud: {
    title: 'Customer Feedback',
    words: [
      { text: 'Quality', weight: 80 }, { text: 'Service', weight: 65 },
      { text: 'Price', weight: 55 }, { text: 'Fast', weight: 50 },
      { text: 'Reliable', weight: 45 }, { text: 'Support', weight: 40 },
      { text: 'Easy', weight: 35 }, { text: 'Great', weight: 30 },
    ],
  },

  // Charts - Specialty
  SpiderChart: {
    title: 'Competitor Analysis',
    data: [
      { label: 'Price', value: 85 }, { label: 'Quality', value: 78 },
      { label: 'Service', value: 90 }, { label: 'Features', value: 72 },
      { label: 'Speed', value: 88 }, { label: 'Support', value: 82 },
    ],
  },
  PolarAreaChart: {
    title: 'Sales by Region',
    data: [
      { label: 'North', value: 45 }, { label: 'South', value: 35 },
      { label: 'East', value: 40 }, { label: 'West', value: 30 },
    ],
  },
  PyramidChart: {
    title: 'Customer Tiers',
    data: [
      { label: 'VIP', value: 5 },
      { label: 'Premium', value: 15 },
      { label: 'Standard', value: 35 },
      { label: 'Basic', value: 45 },
    ],
  },
  LollipopChart: {
    title: 'Team Performance',
    data: [
      { label: 'Alice', value: 92 }, { label: 'Bob', value: 85 },
      { label: 'Carol', value: 78 }, { label: 'Dave', value: 88 },
      { label: 'Eve', value: 95 },
    ],
  },
  BumpChart: {
    title: 'Ranking Over Time',
    periods: ['Q1', 'Q2', 'Q3', 'Q4'],
    data: [
      { label: 'Product A', rankings: [1, 2, 1, 3] },
      { label: 'Product B', rankings: [2, 1, 3, 2] },
      { label: 'Product C', rankings: [3, 3, 2, 1] },
    ],
  },
  SlopeChart: {
    title: 'Year over Year',
    data: [
      { label: 'Product A', start: 45, end: 62 },
      { label: 'Product B', start: 38, end: 55 },
      { label: 'Product C', start: 52, end: 48 },
    ],
    startLabel: '2023',
    endLabel: '2024',
  },
  StreamGraph: {
    title: 'Category Trends',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    data: [
      { label: 'Category A', values: [20, 25, 30, 28, 35] },
      { label: 'Category B', values: [15, 18, 22, 25, 20] },
      { label: 'Category C', values: [10, 12, 15, 18, 22] },
    ],
  },
  RidgelinePlot: {
    title: 'Distribution Over Time',
    data: [
      { label: 'Jan', values: [10, 20, 30, 40, 35, 25, 15] },
      { label: 'Feb', values: [15, 25, 35, 45, 40, 30, 20] },
      { label: 'Mar', values: [20, 30, 45, 50, 45, 35, 25] },
      { label: 'Apr', values: [25, 35, 50, 55, 50, 40, 30] },
    ],
  },
  CircularBarChart: {
    title: 'Monthly Progress',
    data: [
      { label: 'Jan', value: 75 }, { label: 'Feb', value: 82 },
      { label: 'Mar', value: 68 }, { label: 'Apr', value: 90 },
      { label: 'May', value: 85 }, { label: 'Jun', value: 78 },
    ],
  },
  DotPlot: {
    title: 'Score Comparison',
    data: [
      { label: 'Team A', value: 85 }, { label: 'Team B', value: 72 },
      { label: 'Team C', value: 90 }, { label: 'Team D', value: 78 },
    ],
  },
  ParallelCoordinates: {
    title: 'Multi-Metric Comparison',
    dimensions: ['Price', 'Quality', 'Speed', 'Support'],
    data: [
      { label: 'Product A', values: [80, 85, 70, 90] },
      { label: 'Product B', values: [60, 90, 85, 75] },
      { label: 'Product C', values: [90, 70, 80, 85] },
    ],
  },

  // Charts - Process/Workflow (Batch 5)
  GanttChart: {
    title: 'Project Timeline',
    totalDays: 30,
    tasks: [
      { id: '1', name: 'Research', start: 0, duration: 5, progress: 100 },
      { id: '2', name: 'Design', start: 5, duration: 7, progress: 80, dependencies: ['1'] },
      { id: '3', name: 'Development', start: 12, duration: 10, progress: 30, dependencies: ['2'] },
      { id: '4', name: 'Testing', start: 22, duration: 5, progress: 0, dependencies: ['3'] },
      { id: '5', name: 'Launch', start: 27, duration: 3, progress: 0, dependencies: ['4'] },
    ],
  },
  FlowChart: {
    title: 'User Registration Flow',
    nodes: [
      { id: 'start', label: 'Start', type: 'start' as const, x: 300, y: 50 },
      { id: 'input', label: 'Enter Email', type: 'io' as const, x: 300, y: 130 },
      { id: 'validate', label: 'Valid Email?', type: 'decision' as const, x: 300, y: 210 },
      { id: 'create', label: 'Create Account', type: 'process' as const, x: 150, y: 290 },
      { id: 'error', label: 'Show Error', type: 'process' as const, x: 450, y: 290 },
      { id: 'end', label: 'End', type: 'end' as const, x: 300, y: 370 },
    ],
    connections: [
      { from: 'start', to: 'input' },
      { from: 'input', to: 'validate' },
      { from: 'validate', to: 'create', label: 'Yes' },
      { from: 'validate', to: 'error', label: 'No' },
      { from: 'create', to: 'end' },
      { from: 'error', to: 'input' },
    ],
  },
  KanbanBoard: {
    title: 'Sprint Board',
    columns: [
      {
        id: 'backlog',
        title: 'Backlog',
        tasks: [
          { id: 't1', title: 'User authentication', priority: 'high' as const, tags: ['backend'] },
          { id: 't2', title: 'Dashboard redesign', priority: 'medium' as const, tags: ['frontend'] },
        ],
      },
      {
        id: 'inprogress',
        title: 'In Progress',
        tasks: [
          { id: 't3', title: 'API integration', priority: 'high' as const, assignee: 'Alice', tags: ['backend'] },
        ],
      },
      {
        id: 'review',
        title: 'Review',
        tasks: [
          { id: 't4', title: 'Payment gateway', priority: 'medium' as const, assignee: 'Bob' },
        ],
      },
      {
        id: 'done',
        title: 'Done',
        tasks: [
          { id: 't5', title: 'Database setup', priority: 'low' as const, assignee: 'Carol' },
        ],
      },
    ],
  },
  RoadmapDiagram: {
    title: 'Product Roadmap',
    phases: [
      {
        id: 'q1',
        name: 'Q1 2024',
        milestones: [
          { id: 'm1', title: 'MVP Launch', status: 'completed' as const, date: 'Jan 15' },
          { id: 'm2', title: 'Beta Testing', status: 'completed' as const, date: 'Feb 1' },
        ],
      },
      {
        id: 'q2',
        name: 'Q2 2024',
        milestones: [
          { id: 'm3', title: 'Public Launch', status: 'in-progress' as const, date: 'Apr 1' },
          { id: 'm4', title: 'Mobile App', status: 'planned' as const, date: 'May 15' },
        ],
      },
      {
        id: 'q3',
        name: 'Q3 2024',
        milestones: [
          { id: 'm5', title: 'Enterprise Features', status: 'planned' as const, date: 'Jul 1' },
          { id: 'm6', title: 'API v2', status: 'planned' as const, date: 'Aug 15' },
        ],
      },
    ],
  },
  CustomerJourneyMap: {
    title: 'E-Commerce Customer Journey',
    customerName: 'Sarah',
    stages: [
      {
        id: 'awareness',
        name: 'Awareness',
        touchpoints: [
          { id: 'tp1', label: 'Social Ad', emotion: 'neutral' as const },
          { id: 'tp2', label: 'Blog Post', emotion: 'positive' as const },
        ],
      },
      {
        id: 'consideration',
        name: 'Consideration',
        touchpoints: [
          { id: 'tp3', label: 'Product Page', emotion: 'positive' as const },
          { id: 'tp4', label: 'Reviews', emotion: 'positive' as const },
        ],
      },
      {
        id: 'purchase',
        name: 'Purchase',
        touchpoints: [
          { id: 'tp5', label: 'Checkout', emotion: 'negative' as const },
          { id: 'tp6', label: 'Payment', emotion: 'neutral' as const },
        ],
      },
      {
        id: 'retention',
        name: 'Retention',
        touchpoints: [
          { id: 'tp7', label: 'Delivery', emotion: 'positive' as const },
          { id: 'tp8', label: 'Support', emotion: 'positive' as const },
        ],
      },
    ],
  },
  SwimlaneChart: {
    title: 'Order Processing Workflow',
    columns: ['Request', 'Process', 'Approve', 'Complete'],
    lanes: [
      { id: 'customer', name: 'Customer' },
      { id: 'sales', name: 'Sales' },
      { id: 'warehouse', name: 'Warehouse' },
    ],
    tasks: [
      { id: 't1', label: 'Place Order', lane: 'customer', column: 0 },
      { id: 't2', label: 'Review Order', lane: 'sales', column: 1, connectedTo: ['t3'] },
      { id: 't3', label: 'Check Stock', lane: 'warehouse', column: 1, connectedTo: ['t4'] },
      { id: 't4', label: 'Approve', lane: 'sales', column: 2, connectedTo: ['t5'] },
      { id: 't5', label: 'Ship Order', lane: 'warehouse', column: 3 },
    ],
  },
  DecisionTree: {
    title: 'Customer Support Flow',
    rootId: 'start',
    nodes: [
      { id: 'start', label: 'Issue Type?', type: 'decision' as const },
      { id: 'billing', label: 'Billing?', type: 'decision' as const, yes: 'refund', no: 'support' },
      { id: 'technical', label: 'Technical?', type: 'decision' as const, yes: 'debug', no: 'general' },
      { id: 'refund', label: 'Process Refund', type: 'outcome' as const },
      { id: 'support', label: 'Contact Support', type: 'outcome' as const },
      { id: 'debug', label: 'Debug Issue', type: 'outcome' as const },
      { id: 'general', label: 'FAQ', type: 'outcome' as const },
    ],
  },
  ProcessMap: {
    title: 'Order Fulfillment Process',
    steps: [
      { id: 's1', label: 'Order Received', type: 'start' as const },
      { id: 's2', label: 'Validate Order', type: 'process' as const, nextSteps: ['s3'] },
      { id: 's3', label: 'Check Inventory', type: 'decision' as const, nextSteps: ['s4', 's5'] },
      { id: 's4', label: 'Pick Items', type: 'process' as const, duration: '5m', nextSteps: ['s6'] },
      { id: 's5', label: 'Backorder', type: 'subprocess' as const, nextSteps: ['s4'] },
      { id: 's6', label: 'Pack Order', type: 'process' as const, duration: '3m', nextSteps: ['s7'] },
      { id: 's7', label: 'Ship', type: 'end' as const },
    ],
  },
  EventSequence: {
    title: 'User Onboarding Flow',
    orientation: 'horizontal' as const,
    events: [
      { id: 'e1', title: 'Sign Up', time: 'Day 0', icon: 'start' as const },
      { id: 'e2', title: 'Welcome Email', time: 'Day 0', icon: 'process' as const },
      { id: 'e3', title: 'First Login', time: 'Day 1', icon: 'milestone' as const },
      { id: 'e4', title: 'Complete Profile', time: 'Day 2', icon: 'success' as const },
      { id: 'e5', title: 'First Purchase', time: 'Day 7', icon: 'end' as const },
    ],
  },

  // Charts - Advanced Statistical (Batch 6)
  TornadoChart: {
    title: 'Sensitivity Analysis',
    baselineValue: 0,
    xAxisLabel: 'Impact on NPV ($M)',
    items: [
      { id: 'price', label: 'Price', low: -15, high: 20 },
      { id: 'volume', label: 'Volume', low: -12, high: 18 },
      { id: 'costs', label: 'Operating Costs', low: -8, high: 10 },
      { id: 'discount', label: 'Discount Rate', low: -5, high: 6 },
    ],
  },
  ROCCurve: {
    title: 'Model Performance',
    auc: 0.87,
    data: [
      { fpr: 0, tpr: 0 },
      { fpr: 0.1, tpr: 0.5 },
      { fpr: 0.2, tpr: 0.7 },
      { fpr: 0.4, tpr: 0.85 },
      { fpr: 0.6, tpr: 0.92 },
      { fpr: 0.8, tpr: 0.97 },
      { fpr: 1, tpr: 1 },
    ],
  },
  ConfusionMatrix: {
    title: 'Classification Results',
    labels: ['Negative', 'Positive'],
    matrix: [
      [85, 15],
      [10, 90],
    ],
  },
  CohortChart: {
    title: 'User Retention by Cohort',
    periodLabels: ['Week 0', 'Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data: [
      { cohort: 'Jan', periods: [100, 75, 60, 50, 42] },
      { cohort: 'Feb', periods: [100, 72, 58, 48] },
      { cohort: 'Mar', periods: [100, 78, 62] },
      { cohort: 'Apr', periods: [100, 70] },
    ],
  },
  RetentionCurve: {
    title: 'App Retention Over Time',
    data: [
      { day: 0, retention: 100 },
      { day: 1, retention: 65 },
      { day: 7, retention: 32 },
      { day: 14, retention: 25 },
      { day: 30, retention: 18 },
    ],
    benchmarkData: [
      { day: 0, retention: 100 },
      { day: 1, retention: 55 },
      { day: 7, retention: 22 },
      { day: 14, retention: 15 },
      { day: 30, retention: 10 },
    ],
  },
  LorenzCurve: {
    title: 'Income Distribution',
    giniCoefficient: 0.38,
    data: [
      { population: 0, income: 0 },
      { population: 20, income: 5 },
      { population: 40, income: 17 },
      { population: 60, income: 38 },
      { population: 80, income: 68 },
      { population: 100, income: 100 },
    ],
  },
  ErrorBarChart: {
    title: 'Treatment Comparison',
    data: [
      { label: 'Control', value: 45, errorLow: 40, errorHigh: 50 },
      { label: 'Treatment A', value: 62, errorLow: 55, errorHigh: 69 },
      { label: 'Treatment B', value: 58, errorLow: 52, errorHigh: 64 },
      { label: 'Treatment C', value: 72, errorLow: 65, errorHigh: 79 },
    ],
  },
  RegressionPlot: {
    title: 'Price vs Sales Correlation',
    xLabel: 'Price ($)',
    yLabel: 'Units Sold',
    showEquation: true,
    data: [
      { x: 10, y: 25 }, { x: 20, y: 38 }, { x: 30, y: 52 },
      { x: 40, y: 65 }, { x: 50, y: 78 }, { x: 60, y: 88 },
    ],
  },
  ForecastChart: {
    title: 'Revenue Forecast',
    data: [
      { date: 'Jan', value: 42, isActual: true },
      { date: 'Feb', value: 48, isActual: true },
      { date: 'Mar', value: 52, isActual: true },
      { date: 'Apr', value: 58, isActual: true },
      { date: 'May', value: 65, isActual: false, lowerBound: 58, upperBound: 72 },
      { date: 'Jun', value: 75, isActual: false, lowerBound: 65, upperBound: 85 },
    ],
  },
  SensitivityChart: {
    title: 'Profit Sensitivity Analysis',
    baselineOutput: 100,
    data: [
      { parameter: 'Price', lowValue: -20, baseValue: 0, highValue: 20, lowImpact: 35, highImpact: -25 },
      { parameter: 'Volume', lowValue: -15, baseValue: 0, highValue: 15, lowImpact: -28, highImpact: 22 },
      { parameter: 'COGS', lowValue: -10, baseValue: 0, highValue: 10, lowImpact: 18, highImpact: -15 },
    ],
  },

  // Charts - Distribution/Specialized (Batch 7)
  HexbinPlot: {
    title: 'Customer Activity Distribution',
    xLabel: 'Session Duration (min)',
    yLabel: 'Pages Viewed',
    hexRadius: 15,
    data: Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    })),
  },
  SwarmPlot: {
    title: 'Score Distribution by Group',
    valueLabel: 'Score',
    dotRadius: 4,
    data: [
      ...Array.from({ length: 15 }, () => ({ category: 'Group A', value: 40 + Math.random() * 30 })),
      ...Array.from({ length: 15 }, () => ({ category: 'Group B', value: 50 + Math.random() * 25 })),
      ...Array.from({ length: 15 }, () => ({ category: 'Group C', value: 35 + Math.random() * 35 })),
    ],
  },
  StripPlot: {
    title: 'Treatment Response Distribution',
    valueLabel: 'Response Score',
    jitterWidth: 15,
    data: [
      ...Array.from({ length: 12 }, () => ({ category: 'Control', value: 45 + Math.random() * 20 })),
      ...Array.from({ length: 12 }, () => ({ category: 'Treatment A', value: 55 + Math.random() * 25 })),
      ...Array.from({ length: 12 }, () => ({ category: 'Treatment B', value: 60 + Math.random() * 20 })),
    ],
  },
  MosaicPlot: {
    title: 'Age vs Purchase Frequency',
    rowLabel: 'Age Group',
    columnLabel: 'Purchase Frequency',
    data: [
      { row: '18-24', column: 'Rare', value: 15 },
      { row: '18-24', column: 'Occasional', value: 35 },
      { row: '18-24', column: 'Frequent', value: 25 },
      { row: '25-34', column: 'Rare', value: 10 },
      { row: '25-34', column: 'Occasional', value: 40 },
      { row: '25-34', column: 'Frequent', value: 45 },
      { row: '35-44', column: 'Rare', value: 20 },
      { row: '35-44', column: 'Occasional', value: 35 },
      { row: '35-44', column: 'Frequent', value: 30 },
    ],
  },
  AdjacencyMatrix: {
    title: 'Team Communication Network',
    nodes: ['Marketing', 'Sales', 'Product', 'Engineering', 'Design'],
    matrix: [
      [0, 8, 5, 3, 6],
      [8, 0, 7, 4, 3],
      [5, 7, 0, 10, 8],
      [3, 4, 10, 0, 7],
      [6, 3, 8, 7, 0],
    ],
  },
  PhylogeneticTree: {
    title: 'Product Category Evolution',
    showBranchLengths: true,
    data: {
      id: 'root',
      label: '',
      branchLength: 0,
      children: [
        {
          id: 'a1',
          label: '',
          branchLength: 2,
          children: [
            { id: 'p1', label: 'Electronics', branchLength: 3 },
            { id: 'p2', label: 'Gadgets', branchLength: 2.5 },
          ],
        },
        {
          id: 'b1',
          label: '',
          branchLength: 3,
          children: [
            { id: 'p3', label: 'Software', branchLength: 2 },
            { id: 'p4', label: 'Services', branchLength: 1.8 },
          ],
        },
      ],
    },
  },
  EulerDiagram: {
    title: 'Customer Segmentation',
    sets: [
      { id: 'all', label: 'All Customers', size: 100 },
      { id: 'active', label: 'Active Users', size: 70, parent: 'all' },
      { id: 'premium', label: 'Premium', size: 25, parent: 'active' },
      { id: 'enterprise', label: 'Enterprise', size: 8, parent: 'premium' },
    ],
  },
  IsotypeChart: {
    title: 'User Growth Over Time',
    unitValue: 10,
    data: [
      { category: '2021', value: 45, icon: 'person' as const },
      { category: '2022', value: 68, icon: 'person' as const },
      { category: '2023', value: 82, icon: 'person' as const },
      { category: '2024', value: 95, icon: 'person' as const },
    ],
  },
  ConceptMap: {
    title: 'Business Model Concepts',
    nodes: [
      { id: 'business', label: 'Business Model', x: 250, y: 50, type: 'primary' as const },
      { id: 'revenue', label: 'Revenue', x: 100, y: 140, type: 'secondary' as const },
      { id: 'costs', label: 'Costs', x: 400, y: 140, type: 'secondary' as const },
      { id: 'profit', label: 'Profit', x: 250, y: 230, type: 'primary' as const },
    ],
    relations: [
      { source: 'business', target: 'revenue', label: 'generates' },
      { source: 'business', target: 'costs', label: 'incurs' },
      { source: 'revenue', target: 'profit', label: 'contributes to' },
      { source: 'costs', target: 'profit', label: 'reduces' },
    ],
  },

  // Charts - UML/Technical (Batch 8)
  SequenceDiagram: {
    title: 'API Request Flow',
    actors: [
      { id: 'client', name: 'Client' },
      { id: 'api', name: 'API Server' },
      { id: 'db', name: 'Database' },
      { id: 'cache', name: 'Cache' },
    ],
    messages: [
      { from: 'client', to: 'api', label: 'GET /users', type: 'sync' as const },
      { from: 'api', to: 'cache', label: 'Check cache', type: 'sync' as const },
      { from: 'cache', to: 'api', label: 'Cache miss', type: 'return' as const },
      { from: 'api', to: 'db', label: 'Query users', type: 'sync' as const },
      { from: 'db', to: 'api', label: 'User data', type: 'return' as const },
      { from: 'api', to: 'cache', label: 'Store in cache', type: 'async' as const },
      { from: 'api', to: 'client', label: 'Response', type: 'return' as const },
    ],
  },
  ActivityDiagram: {
    title: 'Order Processing Flow',
    nodes: [
      { id: 'start', label: '', type: 'start' as const, x: 300, y: 30 },
      { id: 'receive', label: 'Receive Order', type: 'action' as const, x: 300, y: 100 },
      { id: 'check', label: 'In Stock?', type: 'decision' as const, x: 300, y: 180 },
      { id: 'process', label: 'Process Order', type: 'action' as const, x: 150, y: 260 },
      { id: 'backorder', label: 'Backorder', type: 'action' as const, x: 450, y: 260 },
      { id: 'merge', label: '', type: 'merge' as const, x: 300, y: 340 },
      { id: 'ship', label: 'Ship Order', type: 'action' as const, x: 300, y: 400 },
      { id: 'end', label: '', type: 'end' as const, x: 300, y: 470 },
    ],
    flows: [
      { from: 'start', to: 'receive' },
      { from: 'receive', to: 'check' },
      { from: 'check', to: 'process', condition: 'Yes' },
      { from: 'check', to: 'backorder', condition: 'No' },
      { from: 'process', to: 'merge' },
      { from: 'backorder', to: 'merge' },
      { from: 'merge', to: 'ship' },
      { from: 'ship', to: 'end' },
    ],
  },
  ERDiagram: {
    title: 'E-Commerce Database Schema',
    entities: [
      {
        id: 'users',
        name: 'Users',
        x: 100,
        y: 100,
        attributes: [
          { name: 'id', type: 'INT', isPrimary: true },
          { name: 'email', type: 'VARCHAR' },
          { name: 'name', type: 'VARCHAR' },
        ],
      },
      {
        id: 'orders',
        name: 'Orders',
        x: 350,
        y: 100,
        attributes: [
          { name: 'id', type: 'INT', isPrimary: true },
          { name: 'user_id', type: 'INT', isForeign: true },
          { name: 'total', type: 'DECIMAL' },
          { name: 'status', type: 'VARCHAR' },
        ],
      },
      {
        id: 'products',
        name: 'Products',
        x: 550,
        y: 100,
        attributes: [
          { name: 'id', type: 'INT', isPrimary: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'price', type: 'DECIMAL' },
        ],
      },
    ],
    relationships: [
      { from: 'users', to: 'orders', label: 'places', fromCardinality: '1' as const, toCardinality: 'N' as const },
      { from: 'orders', to: 'products', label: 'contains', fromCardinality: 'N' as const, toCardinality: 'N' as const },
    ],
  },

  // Charts - Technical Diagrams (Batch 9)
  StateDiagram: {
    title: 'Order State Machine',
    states: [
      { id: 'init', name: 'Initial', type: 'initial' as const, x: 100, y: 200 },
      { id: 'pending', name: 'Pending', type: 'normal' as const, x: 250, y: 200 },
      { id: 'processing', name: 'Processing', type: 'normal' as const, x: 400, y: 120 },
      { id: 'shipped', name: 'Shipped', type: 'normal' as const, x: 400, y: 280 },
      { id: 'delivered', name: 'Delivered', type: 'final' as const, x: 550, y: 200 },
    ],
    transitions: [
      { from: 'init', to: 'pending', trigger: 'submit' },
      { from: 'pending', to: 'processing', trigger: 'confirm' },
      { from: 'processing', to: 'shipped', trigger: 'ship' },
      { from: 'shipped', to: 'delivered', trigger: 'deliver' },
    ],
  },
  DataFlowDiagram: {
    title: 'Order Processing System',
    elements: [
      { id: 'customer', name: 'Customer', type: 'external' as const, x: 100, y: 200 },
      { id: 'process', name: 'Process Order', type: 'process' as const, x: 325, y: 200 },
      { id: 'inventory', name: 'Inventory DB', type: 'datastore' as const, x: 325, y: 350 },
      { id: 'supplier', name: 'Supplier', type: 'external' as const, x: 550, y: 200 },
    ],
    flows: [
      { from: 'customer', to: 'process', label: 'Order Request' },
      { from: 'process', to: 'inventory', label: 'Check Stock' },
      { from: 'inventory', to: 'process', label: 'Stock Level' },
      { from: 'process', to: 'supplier', label: 'Purchase Order' },
    ],
  },
  ArchitectureDiagram: {
    title: 'Microservices Architecture',
    components: [
      { id: 'client', name: 'Web Client', type: 'client' as const, x: 100, y: 80 },
      { id: 'lb', name: 'Load Balancer', type: 'loadbalancer' as const, x: 300, y: 80 },
      { id: 'api', name: 'API Gateway', type: 'server' as const, x: 500, y: 80 },
      { id: 'auth', name: 'Auth Service', type: 'service' as const, x: 200, y: 200 },
      { id: 'orders', name: 'Order Service', type: 'service' as const, x: 400, y: 200 },
      { id: 'db', name: 'Database', type: 'database' as const, x: 300, y: 320 },
      { id: 'cache', name: 'Redis Cache', type: 'cache' as const, x: 500, y: 320 },
    ],
    connections: [
      { from: 'client', to: 'lb' },
      { from: 'lb', to: 'api' },
      { from: 'api', to: 'auth', type: 'sync' as const },
      { from: 'api', to: 'orders', type: 'sync' as const },
      { from: 'orders', to: 'db' },
      { from: 'orders', to: 'cache' },
    ],
  },
  NetworkTopology: {
    title: 'Office Network',
    nodes: [
      { id: 'router', name: 'Main Router', type: 'router' as const, x: 325, y: 80 },
      { id: 'firewall', name: 'Firewall', type: 'firewall' as const, x: 325, y: 180 },
      { id: 'switch', name: 'Core Switch', type: 'switch' as const, x: 325, y: 280 },
      { id: 'server1', name: 'Web Server', type: 'server' as const, x: 150, y: 380 },
      { id: 'server2', name: 'DB Server', type: 'server' as const, x: 325, y: 380 },
      { id: 'pc1', name: 'Workstation', type: 'computer' as const, x: 500, y: 380 },
    ],
    links: [
      { from: 'router', to: 'firewall', type: 'wired' as const },
      { from: 'firewall', to: 'switch', type: 'wired' as const },
      { from: 'switch', to: 'server1', type: 'wired' as const },
      { from: 'switch', to: 'server2', type: 'wired' as const },
      { from: 'switch', to: 'pc1', type: 'wired' as const },
    ],
  },
  InfrastructureDiagram: {
    title: 'AWS Cloud Infrastructure',
    provider: 'aws' as const,
    components: [
      { id: 'cf', name: 'CloudFront', type: 'cloudfront' as const, x: 325, y: 50 },
      { id: 'alb', name: 'ALB', type: 'elb' as const, x: 325, y: 150 },
      { id: 'ec2-1', name: 'EC2 Instance', type: 'ec2' as const, x: 200, y: 250 },
      { id: 'ec2-2', name: 'EC2 Instance', type: 'ec2' as const, x: 450, y: 250 },
      { id: 'rds', name: 'RDS MySQL', type: 'rds' as const, x: 325, y: 350 },
      { id: 's3', name: 'S3 Bucket', type: 's3' as const, x: 550, y: 150 },
    ],
    connections: [
      { from: 'cf', to: 'alb', type: 'request' as const },
      { from: 'alb', to: 'ec2-1' },
      { from: 'alb', to: 'ec2-2' },
      { from: 'ec2-1', to: 'rds', type: 'data' as const },
      { from: 'ec2-2', to: 'rds', type: 'data' as const },
      { from: 'cf', to: 's3' },
    ],
  },

  // Charts - Probabilistic/Causal (Batch 9)
  BayesianNetwork: {
    title: 'Customer Purchase Prediction',
    showProbabilities: true,
    nodes: [
      { id: 'income', name: 'High Income', probability: 0.3, x: 100, y: 100 },
      { id: 'age', name: 'Young Adult', probability: 0.4, x: 400, y: 100 },
      { id: 'interest', name: 'Tech Interest', probability: 0.6, x: 250, y: 200 },
      { id: 'purchase', name: 'Will Purchase', probability: 0.45, x: 250, y: 320 },
    ],
    edges: [
      { from: 'income', to: 'interest', strength: 0.7 },
      { from: 'age', to: 'interest', strength: 0.6 },
      { from: 'interest', to: 'purchase', strength: 0.8 },
      { from: 'income', to: 'purchase', strength: 0.5 },
    ],
  },
  CausalLoopDiagram: {
    title: 'Business Growth Dynamics',
    variables: [
      { id: 'sales', name: 'Sales', x: 325, y: 80 },
      { id: 'revenue', name: 'Revenue', x: 500, y: 180 },
      { id: 'investment', name: 'Investment', x: 400, y: 320 },
      { id: 'marketing', name: 'Marketing', x: 150, y: 320 },
      { id: 'customers', name: 'Customers', x: 150, y: 180 },
    ],
    links: [
      { from: 'sales', to: 'revenue', polarity: '+' as const },
      { from: 'revenue', to: 'investment', polarity: '+' as const },
      { from: 'investment', to: 'marketing', polarity: '+' as const },
      { from: 'marketing', to: 'customers', polarity: '+' as const },
      { from: 'customers', to: 'sales', polarity: '+' as const },
    ],
    loops: [
      { id: 'r1', name: 'Growth Loop', type: 'reinforcing' as const, x: 325, y: 220 },
    ],
  },

  // Charts - Interactive/Comparison (Batch 9)
  InteractiveTable: {
    title: 'Sales Performance',
    columns: [
      { key: 'name', label: 'Sales Rep', sortable: true },
      { key: 'deals', label: 'Deals', sortable: true, align: 'right' as const },
      { key: 'revenue', label: 'Revenue', sortable: true, align: 'right' as const },
      { key: 'conversion', label: 'Conv. Rate', sortable: true, align: 'right' as const },
    ],
    rows: [
      { name: 'Alice Johnson', deals: 45, revenue: '$125,000', conversion: '28%' },
      { name: 'Bob Smith', deals: 38, revenue: '$98,000', conversion: '24%' },
      { name: 'Carol White', deals: 52, revenue: '$142,000', conversion: '32%' },
      { name: 'David Brown', deals: 41, revenue: '$115,000', conversion: '26%' },
    ],
  },
  ComparisonSlider: {
    title: 'Conversion Rate Improvement',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeColor: '#EF4444',
    afterColor: '#22C55E',
    beforeValue: '2.1%',
    afterValue: '8.7%',
  },
  PortfolioBreakdown: {
    title: 'Investment Portfolio',
    centerLabel: 'Total',
    centerValue: '$250K',
    data: [
      { label: 'Stocks', value: 100000, color: '#88da1c' },
      { label: 'Bonds', value: 62500, color: '#3B82F6' },
      { label: 'Real Estate', value: 50000, color: '#F59E0B' },
      { label: 'Crypto', value: 25000, color: '#A855F7' },
      { label: 'Cash', value: 12500, color: '#6B7280' },
    ],
  },
  RevenueWaterfall: {
    title: 'Revenue Bridge Analysis',
    valuePrefix: '$',
    data: [
      { label: 'Starting Revenue', value: 100000, type: 'initial' as const },
      { label: 'New Customers', value: 35000, type: 'add' as const },
      { label: 'Upsells', value: 15000, type: 'add' as const },
      { label: 'Churn', value: 12000, type: 'subtract' as const },
      { label: 'Downgrades', value: 8000, type: 'subtract' as const },
      { label: 'Ending Revenue', value: 130000, type: 'total' as const },
    ],
  },
  CountryMap: {
    title: 'Global Customer Distribution',
    highlightColor: '#88da1c',
    highlightedCountries: [
      { code: 'US', name: 'United States', value: 45 },
      { code: 'GB', name: 'United Kingdom', value: 18 },
      { code: 'DE', name: 'Germany', value: 12 },
      { code: 'AU', name: 'Australia', value: 8 },
      { code: 'JP', name: 'Japan', value: 7 },
    ],
  },

  // Charts - Goal/Progress (Batch 9)
  ThermometerChart: {
    title: 'Fundraising Goal',
    value: 78500,
    goal: 100000,
    valuePrefix: '$',
    milestones: [
      { value: 25000, label: 'Phase 1' },
      { value: 50000, label: 'Phase 2' },
      { value: 75000, label: 'Phase 3' },
    ],
  },
  SegmentedProgress: {
    title: 'Project Completion',
    showPercentages: true,
    segments: [
      { label: 'Research', value: 100, max: 100, color: '#22C55E' },
      { label: 'Design', value: 85, max: 100, color: '#88da1c' },
      { label: 'Development', value: 60, max: 100, color: '#3B82F6' },
      { label: 'Testing', value: 25, max: 100, color: '#F59E0B' },
      { label: 'Launch', value: 0, max: 100, color: '#EF4444' },
    ],
  },
  AnnotatedTimeline: {
    title: 'Company History',
    events: [
      { date: '2020', title: 'Founded', description: 'Company established', type: 'milestone' as const },
      { date: '2021', title: 'Seed Round', description: '$2M funding secured', type: 'highlight' as const },
      { date: '2022', title: 'Product Launch', description: 'V1.0 released', type: 'milestone' as const },
      { date: '2023', title: 'Series A', description: '$15M funding', type: 'highlight' as const },
      { date: '2024', title: '100K Users', description: 'Reached milestone', type: 'milestone' as const },
    ],
  },
  PredictionBand: {
    title: 'Revenue Forecast with Confidence',
    yAxisLabel: 'Revenue',
    valuePrefix: '$',
    data: [
      { label: 'Jan', value: 42000 },
      { label: 'Feb', value: 48000 },
      { label: 'Mar', value: 52000 },
      { label: 'Apr', value: 58000 },
      { label: 'May', value: 65000, predicted: true, upperBound: 72000, lowerBound: 58000 },
      { label: 'Jun', value: 75000, predicted: true, upperBound: 85000, lowerBound: 65000 },
    ],
  },
  AnomalyChart: {
    title: 'Traffic Anomaly Detection',
    valuePrefix: '',
    threshold: { upper: 4500, lower: 1500 },
    data: [
      { label: 'Mon', value: 2500 },
      { label: 'Tue', value: 2800 },
      { label: 'Wed', value: 3200 },
      { label: 'Thu', value: 5200, isAnomaly: true, anomalyType: 'high' as const, note: 'Viral post' },
      { label: 'Fri', value: 2900 },
      { label: 'Sat', value: 1200, isAnomaly: true, anomalyType: 'low' as const, note: 'Server issue' },
      { label: 'Sun', value: 2600 },
    ],
  },
  TargetChart: {
    title: 'Quarterly Sales Target',
    actual: 87500,
    target: 100000,
    unit: '$',
    accentColor: '#88da1c',
  },

  // Charts - Matrix/Strategy (Batch 9)
  PerformanceMatrix: {
    title: 'BCG Growth-Share Matrix',
    xAxisLabel: 'Market Share',
    yAxisLabel: 'Growth Rate',
    quadrantLabels: ['Question Marks', 'Stars', 'Dogs', 'Cash Cows'] as [string, string, string, string],
    items: [
      { label: 'Product A', x: 75, y: 80, size: 40 },
      { label: 'Product B', x: 30, y: 70, size: 25 },
      { label: 'Product C', x: 80, y: 25, size: 50 },
      { label: 'Product D', x: 20, y: 30, size: 20 },
    ],
  },
  ValueChain: {
    title: 'Porter Value Chain',
    primaryActivities: [
      { name: 'Inbound Logistics', description: 'Receiving and warehousing' },
      { name: 'Operations', description: 'Manufacturing' },
      { name: 'Outbound Logistics', description: 'Distribution' },
      { name: 'Marketing & Sales', description: 'Promotion' },
      { name: 'Service', description: 'Customer support' },
    ],
    supportActivities: [
      { name: 'Firm Infrastructure', description: 'Management, finance' },
      { name: 'Human Resources', description: 'Recruiting, training' },
      { name: 'Technology', description: 'R&D, IT' },
      { name: 'Procurement', description: 'Purchasing' },
    ],
  },
  SWOT: {
    title: 'Strategic SWOT Analysis',
    strengths: [{ text: 'Strong brand recognition' }, { text: 'Loyal customer base' }, { text: 'Proprietary technology' }],
    weaknesses: [{ text: 'Limited market presence' }, { text: 'High operating costs' }],
    opportunities: [{ text: 'Emerging markets' }, { text: 'Digital transformation' }, { text: 'Strategic partnerships' }],
    threats: [{ text: 'Intense competition' }, { text: 'Economic uncertainty' }, { text: 'Regulatory changes' }],
  },
  RiskMatrix: {
    title: 'Project Risk Assessment',
    risks: [
      { label: 'Data Breach', probability: 2, impact: 5 },
      { label: 'Budget Overrun', probability: 4, impact: 3 },
      { label: 'Timeline Delay', probability: 3, impact: 4 },
      { label: 'Resource Shortage', probability: 3, impact: 2 },
      { label: 'Tech Failure', probability: 2, impact: 4 },
    ],
  },
  PriorityMatrix: {
    title: 'Eisenhower Task Matrix',
    tasks: [
      { label: 'Crisis management', urgent: true, important: true },
      { label: 'Strategic planning', urgent: false, important: true },
      { label: 'Email responses', urgent: true, important: false },
      { label: 'Meeting prep', urgent: false, important: false },
      { label: 'Client call', urgent: true, important: true },
      { label: 'Training', urgent: false, important: true },
    ],
  },
  CompetitorMap: {
    title: 'Competitive Positioning',
    xAxisLabel: 'Price',
    yAxisLabel: 'Quality',
    competitors: [
      { name: 'You', x: 70, y: 85, isYou: true },
      { name: 'Competitor A', x: 40, y: 60, size: 30 },
      { name: 'Competitor B', x: 85, y: 70, size: 45 },
      { name: 'Competitor C', x: 55, y: 45, size: 25 },
    ],
  },

  // Charts - Metrics/OKR (Batch 9)
  SkillRadar: {
    title: 'Team Competency Assessment',
    showTarget: true,
    currentColor: '#88da1c',
    targetColor: '#3B82F6',
    skills: [
      { name: 'Leadership', current: 75, target: 90 },
      { name: 'Technical', current: 85, target: 90 },
      { name: 'Communication', current: 70, target: 85 },
      { name: 'Problem Solving', current: 80, target: 85 },
      { name: 'Innovation', current: 65, target: 80 },
      { name: 'Collaboration', current: 90, target: 95 },
    ],
  },
  OKRTracker: {
    title: 'Q4 Objectives & Key Results',
    objectives: [
      {
        title: 'Increase Market Share',
        keyResults: [
          { title: 'New customer acquisition', current: 850, target: 1000 },
          { title: 'Customer retention rate', current: 92, target: 95, unit: '%' },
          { title: 'Revenue growth', current: 28, target: 30, unit: '%' },
        ],
      },
      {
        title: 'Improve Product Quality',
        keyResults: [
          { title: 'Customer satisfaction', current: 4.3, target: 4.5 },
          { title: 'Bug resolution time', current: 18, target: 24, unit: 'hrs' },
        ],
      },
    ],
  },
  QuarterlyTrend: {
    title: 'Quarterly Revenue Trend',
    unit: '$',
    accentColor: '#88da1c',
    showChange: true,
    data: [
      { quarter: 'Q1 2024', value: 125000, change: 15 },
      { quarter: 'Q2 2024', value: 142000, change: 13.6 },
      { quarter: 'Q3 2024', value: 138000, change: -2.8 },
      { quarter: 'Q4 2024', value: 165000, change: 19.6 },
    ],
  },
  BenchmarkChart: {
    title: 'Industry Benchmark Comparison',
    accentColor: '#88da1c',
    items: [
      { label: 'Customer Satisfaction', value: 4.2, benchmark: 4.0 },
      { label: 'Response Time', value: 2.5, benchmark: 3.0, unit: 'hrs' },
      { label: 'Conversion Rate', value: 3.8, benchmark: 4.5, unit: '%' },
      { label: 'NPS Score', value: 72, benchmark: 65 },
    ],
  },
  CapabilityModel: {
    title: 'Process Maturity Assessment',
    accentColor: '#88da1c',
    areas: [
      { name: 'Project Management', currentLevel: 3, targetLevel: 4 },
      { name: 'Quality Assurance', currentLevel: 4, targetLevel: 5 },
      { name: 'DevOps', currentLevel: 2, targetLevel: 4 },
      { name: 'Security', currentLevel: 3, targetLevel: 4 },
      { name: 'Documentation', currentLevel: 2, targetLevel: 3 },
    ],
  },

  // Charts - UX/Product (Batch 9)
  UserFlowDiagram: {
    title: 'Checkout User Flow',
    accentColor: '#88da1c',
    steps: [
      { id: 'start', label: 'Start', type: 'start' as const },
      { id: 'cart', label: 'View Cart', type: 'page' as const, conversion: 100 },
      { id: 'shipping', label: 'Shipping', type: 'page' as const, dropoff: 15 },
      { id: 'payment', label: 'Payment', type: 'page' as const, dropoff: 10 },
      { id: 'review', label: 'Review', type: 'decision' as const },
      { id: 'confirm', label: 'Confirm', type: 'action' as const },
      { id: 'end', label: 'Complete', type: 'end' as const, conversion: 65 },
    ],
    paths: [
      { from: 'start', to: 'cart' },
      { from: 'cart', to: 'shipping' },
      { from: 'shipping', to: 'payment' },
      { from: 'payment', to: 'review' },
      { from: 'review', to: 'confirm', label: 'Approve' },
      { from: 'review', to: 'cart', label: 'Edit', isAlternate: true },
      { from: 'confirm', to: 'end' },
    ],
  },
  FeatureComparison: {
    title: 'Plan Feature Comparison',
    accentColor: '#88da1c',
    features: [
      { feature: 'Unlimited Users', description: 'Add team members' },
      { feature: 'Custom Integrations', description: 'Connect your tools' },
      { feature: 'Priority Support', description: '24/7 assistance' },
      { feature: 'Advanced Analytics', description: 'Deep insights' },
      { feature: 'API Access', description: 'Build custom solutions' },
    ],
    columns: [
      { name: 'Basic', values: [false, false, false, false, false] },
      { name: 'Pro', values: [true, 'partial' as const, true, false, false], highlight: true },
      { name: 'Enterprise', values: [true, true, true, true, true] },
    ],
  },
  MetricsDashboard: {
    title: 'Key Performance Metrics',
    columns: 3 as const,
    accentColor: '#88da1c',
    metrics: [
      { label: 'Revenue', value: '$125.4K', change: 12.5, trend: 'up' as const, icon: 'revenue' as const, sparkline: [85, 90, 88, 95, 102, 110, 125] },
      { label: 'Users', value: '12,847', change: 8.2, trend: 'up' as const, icon: 'users' as const, sparkline: [10, 11, 10.5, 11.5, 12, 12.5, 12.8] },
      { label: 'Conversion', value: '4.2%', change: -0.3, trend: 'down' as const, icon: 'percent' as const },
      { label: 'Avg. Time', value: '3.2m', change: 15, trend: 'up' as const, icon: 'time' as const },
      { label: 'Satisfaction', value: '4.8', change: 0.2, icon: 'star' as const, target: 5 },
      { label: 'Growth', value: '23%', change: 5, trend: 'up' as const, icon: 'chart' as const },
    ],
  },
  FeedbackLoop: {
    title: 'PDCA Improvement Cycle',
    centerLabel: 'Continuous Improvement',
    accentColor: '#88da1c',
    steps: [
      { id: '1', label: 'Plan', description: 'Define objectives and processes', icon: 'input' as const },
      { id: '2', label: 'Do', description: 'Implement the plan', icon: 'process' as const },
      { id: '3', label: 'Check', description: 'Monitor and measure results', icon: 'measure' as const },
      { id: '4', label: 'Act', description: 'Take corrective actions', icon: 'feedback' as const },
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

// Component renderer with variant support
const ComponentPreview = ({ componentId, variant = 'dark' }: { componentId: string; variant?: 'dark' | 'light' }) => {
  const data = SAMPLE_DATA[componentId as keyof typeof SAMPLE_DATA];
  if (!data) {
    return (
      <div className="p-12 text-center bg-white">
        <div className="bg-black rounded-2xl p-8 text-white/50">
          Component preview not available
        </div>
      </div>
    );
  }

  // Add variant to props for components that support it
  const propsWithVariant = { ...data, variant };

  switch (componentId) {
    // Fixed Slides
    case 'WelcomeSlide': return <WelcomeSlide {...SAMPLE_DATA.WelcomeSlide} />;
    case 'QuizSlide': return <QuizSlide {...SAMPLE_DATA.QuizSlide} />;
    case 'CompletionSlide': return <CompletionSlide {...SAMPLE_DATA.CompletionSlide} />;

    // Content
    case 'SplitContent': return <SplitContent {...SAMPLE_DATA.SplitContent} />;
    case 'FullWidthMedia': return <FullWidthMedia {...SAMPLE_DATA.FullWidthMedia} />;
    case 'TextBlock': return <TextBlock {...SAMPLE_DATA.TextBlock} />;

    // Data Stats
    case 'StatCard': return <StatCard {...propsWithVariant as typeof SAMPLE_DATA.StatCard & { variant: 'dark' | 'light' }} />;
    case 'StatRow': return <StatRow {...propsWithVariant as typeof SAMPLE_DATA.StatRow & { variant: 'dark' | 'light' }} />;
    case 'MetricDashboard': return <MetricDashboard {...propsWithVariant as typeof SAMPLE_DATA.MetricDashboard & { variant: 'dark' | 'light' }} />;

    // Comparison
    case 'BeforeAfter': return <BeforeAfter {...propsWithVariant as typeof SAMPLE_DATA.BeforeAfter & { variant: 'dark' | 'light' }} />;
    case 'ComparisonBars': return <ComparisonBars {...propsWithVariant as typeof SAMPLE_DATA.ComparisonBars & { variant: 'dark' | 'light' }} />;

    // Charts - Basic
    case 'LineChart': return <LineChart {...propsWithVariant as typeof SAMPLE_DATA.LineChart & { variant: 'dark' | 'light' }} />;
    case 'BarChart': return <BarChart {...propsWithVariant as typeof SAMPLE_DATA.BarChart & { variant: 'dark' | 'light' }} />;
    case 'AreaChart': return <AreaChart {...propsWithVariant as typeof SAMPLE_DATA.AreaChart & { variant: 'dark' | 'light' }} />;
    case 'DonutChart': return <DonutChart {...propsWithVariant as typeof SAMPLE_DATA.DonutChart & { variant: 'dark' | 'light' }} />;
    case 'PieChart': return <PieChart {...propsWithVariant as typeof SAMPLE_DATA.PieChart & { variant: 'dark' | 'light' }} />;
    case 'FunnelChart': return <FunnelChart {...propsWithVariant as typeof SAMPLE_DATA.FunnelChart & { variant: 'dark' | 'light' }} />;
    case 'RadarChart': return <RadarChart {...propsWithVariant as typeof SAMPLE_DATA.RadarChart & { variant: 'dark' | 'light' }} />;
    case 'GaugeChart': return <GaugeChart {...propsWithVariant as typeof SAMPLE_DATA.GaugeChart & { variant: 'dark' | 'light' }} />;
    case 'ProgressRing': return <ProgressRing {...propsWithVariant as typeof SAMPLE_DATA.ProgressRing & { variant: 'dark' | 'light' }} />;
    case 'Heatmap': return <Heatmap {...propsWithVariant as typeof SAMPLE_DATA.Heatmap & { variant: 'dark' | 'light' }} />;
    case 'StackedBarChart': return <StackedBarChart {...propsWithVariant as typeof SAMPLE_DATA.StackedBarChart & { variant: 'dark' | 'light' }} />;
    case 'WaterfallChart': return <WaterfallChart {...propsWithVariant as typeof SAMPLE_DATA.WaterfallChart & { variant: 'dark' | 'light' }} />;
    case 'BulletChart': return <BulletChart {...propsWithVariant as typeof SAMPLE_DATA.BulletChart & { variant: 'dark' | 'light' }} />;

    // Charts - Statistical
    case 'ScatterPlot': return <ScatterPlot {...propsWithVariant as typeof SAMPLE_DATA.ScatterPlot & { variant: 'dark' | 'light' }} />;
    case 'BubbleChart': return <BubbleChart {...propsWithVariant as typeof SAMPLE_DATA.BubbleChart & { variant: 'dark' | 'light' }} />;
    case 'Histogram': return <Histogram {...propsWithVariant as typeof SAMPLE_DATA.Histogram & { variant: 'dark' | 'light' }} />;
    case 'BoxPlot': return <BoxPlot {...propsWithVariant as typeof SAMPLE_DATA.BoxPlot & { variant: 'dark' | 'light' }} />;
    case 'ViolinPlot': return <ViolinPlot {...propsWithVariant as typeof SAMPLE_DATA.ViolinPlot & { variant: 'dark' | 'light' }} />;
    case 'DensityPlot': return <DensityPlot {...propsWithVariant as typeof SAMPLE_DATA.DensityPlot & { variant: 'dark' | 'light' }} />;

    // Charts - Time Series
    case 'CandlestickChart': return <CandlestickChart {...propsWithVariant as typeof SAMPLE_DATA.CandlestickChart & { variant: 'dark' | 'light' }} />;
    case 'OHLCChart': return <OHLCChart {...propsWithVariant as typeof SAMPLE_DATA.OHLCChart & { variant: 'dark' | 'light' }} />;
    case 'StepChart': return <StepChart {...propsWithVariant as typeof SAMPLE_DATA.StepChart & { variant: 'dark' | 'light' }} />;
    case 'Sparkline': return <Sparkline {...propsWithVariant as typeof SAMPLE_DATA.Sparkline & { variant: 'dark' | 'light' }} />;
    case 'ControlChart': return <ControlChart {...propsWithVariant as typeof SAMPLE_DATA.ControlChart & { variant: 'dark' | 'light' }} />;
    case 'RunChart': return <RunChart {...propsWithVariant as typeof SAMPLE_DATA.RunChart & { variant: 'dark' | 'light' }} />;

    // Charts - Hierarchical
    case 'TreeMap': return <TreeMap {...propsWithVariant as typeof SAMPLE_DATA.TreeMap & { variant: 'dark' | 'light' }} />;
    case 'SunburstChart': return <SunburstChart {...propsWithVariant as typeof SAMPLE_DATA.SunburstChart & { variant: 'dark' | 'light' }} />;
    case 'RadialTree': return <RadialTree {...propsWithVariant as typeof SAMPLE_DATA.RadialTree & { variant: 'dark' | 'light' }} />;
    case 'Dendrogram': return <Dendrogram {...propsWithVariant as typeof SAMPLE_DATA.Dendrogram & { variant: 'dark' | 'light' }} />;
    case 'IcicleChart': return <IcicleChart {...propsWithVariant as typeof SAMPLE_DATA.IcicleChart & { variant: 'dark' | 'light' }} />;
    case 'MindMap': return <MindMap {...propsWithVariant as typeof SAMPLE_DATA.MindMap & { variant: 'dark' | 'light' }} />;

    // Charts - Network
    case 'NetworkGraph': return <NetworkGraph {...propsWithVariant as typeof SAMPLE_DATA.NetworkGraph & { variant: 'dark' | 'light' }} />;
    case 'ChordDiagram': return <ChordDiagram {...propsWithVariant as typeof SAMPLE_DATA.ChordDiagram & { variant: 'dark' | 'light' }} />;
    case 'SankeyDiagram': return <SankeyDiagram {...propsWithVariant as typeof SAMPLE_DATA.SankeyDiagram & { variant: 'dark' | 'light' }} />;
    case 'VennDiagram': return <VennDiagram {...propsWithVariant as typeof SAMPLE_DATA.VennDiagram & { variant: 'dark' | 'light' }} />;
    case 'ForceDirectedGraph': return <ForceDirectedGraph {...propsWithVariant as typeof SAMPLE_DATA.ForceDirectedGraph & { variant: 'dark' | 'light' }} />;
    case 'MatrixChart': return <MatrixChart {...propsWithVariant as typeof SAMPLE_DATA.MatrixChart & { variant: 'dark' | 'light' }} />;

    // Charts - KPI
    case 'KPICard': return <KPICard {...propsWithVariant as typeof SAMPLE_DATA.KPICard & { variant: 'dark' | 'light' }} />;
    case 'Scorecard': return <Scorecard {...propsWithVariant as typeof SAMPLE_DATA.Scorecard & { variant: 'dark' | 'light' }} />;
    case 'SpeedometerChart': return <SpeedometerChart {...propsWithVariant as typeof SAMPLE_DATA.SpeedometerChart & { variant: 'dark' | 'light' }} />;
    case 'CalendarHeatmap': return <CalendarHeatmap {...propsWithVariant as typeof SAMPLE_DATA.CalendarHeatmap & { variant: 'dark' | 'light' }} />;
    case 'ParetoChart': return <ParetoChart {...propsWithVariant as typeof SAMPLE_DATA.ParetoChart & { variant: 'dark' | 'light' }} />;
    case 'WordCloud': return <WordCloud {...propsWithVariant as typeof SAMPLE_DATA.WordCloud & { variant: 'dark' | 'light' }} />;

    // Charts - Specialty
    case 'SpiderChart': return <SpiderChart {...propsWithVariant as typeof SAMPLE_DATA.SpiderChart & { variant: 'dark' | 'light' }} />;
    case 'PolarAreaChart': return <PolarAreaChart {...propsWithVariant as typeof SAMPLE_DATA.PolarAreaChart & { variant: 'dark' | 'light' }} />;
    case 'PyramidChart': return <PyramidChart {...propsWithVariant as typeof SAMPLE_DATA.PyramidChart & { variant: 'dark' | 'light' }} />;
    case 'LollipopChart': return <LollipopChart {...propsWithVariant as typeof SAMPLE_DATA.LollipopChart & { variant: 'dark' | 'light' }} />;
    case 'BumpChart': return <BumpChart {...propsWithVariant as typeof SAMPLE_DATA.BumpChart & { variant: 'dark' | 'light' }} />;
    case 'SlopeChart': return <SlopeChart {...propsWithVariant as typeof SAMPLE_DATA.SlopeChart & { variant: 'dark' | 'light' }} />;
    case 'StreamGraph': return <StreamGraph {...propsWithVariant as typeof SAMPLE_DATA.StreamGraph & { variant: 'dark' | 'light' }} />;
    case 'RidgelinePlot': return <RidgelinePlot {...propsWithVariant as typeof SAMPLE_DATA.RidgelinePlot & { variant: 'dark' | 'light' }} />;
    case 'CircularBarChart': return <CircularBarChart {...propsWithVariant as typeof SAMPLE_DATA.CircularBarChart & { variant: 'dark' | 'light' }} />;
    case 'DotPlot': return <DotPlot {...propsWithVariant as typeof SAMPLE_DATA.DotPlot & { variant: 'dark' | 'light' }} />;
    case 'ParallelCoordinates': return <ParallelCoordinates {...propsWithVariant as typeof SAMPLE_DATA.ParallelCoordinates & { variant: 'dark' | 'light' }} />;

    // Charts - Process/Workflow (Batch 5)
    case 'GanttChart': return <GanttChart {...propsWithVariant as typeof SAMPLE_DATA.GanttChart & { variant: 'dark' | 'light' }} />;
    case 'FlowChart': return <FlowChart {...propsWithVariant as typeof SAMPLE_DATA.FlowChart & { variant: 'dark' | 'light' }} />;
    case 'KanbanBoard': return <KanbanBoard {...propsWithVariant as typeof SAMPLE_DATA.KanbanBoard & { variant: 'dark' | 'light' }} />;
    case 'RoadmapDiagram': return <RoadmapDiagram {...propsWithVariant as typeof SAMPLE_DATA.RoadmapDiagram & { variant: 'dark' | 'light' }} />;
    case 'CustomerJourneyMap': return <CustomerJourneyMap {...propsWithVariant as typeof SAMPLE_DATA.CustomerJourneyMap & { variant: 'dark' | 'light' }} />;
    case 'SwimlaneChart': return <SwimlaneChart {...propsWithVariant as typeof SAMPLE_DATA.SwimlaneChart & { variant: 'dark' | 'light' }} />;
    case 'DecisionTree': return <DecisionTree {...propsWithVariant as typeof SAMPLE_DATA.DecisionTree & { variant: 'dark' | 'light' }} />;
    case 'ProcessMap': return <ProcessMap {...propsWithVariant as typeof SAMPLE_DATA.ProcessMap & { variant: 'dark' | 'light' }} />;
    case 'EventSequence': return <EventSequence {...propsWithVariant as typeof SAMPLE_DATA.EventSequence & { variant: 'dark' | 'light' }} />;

    // Charts - Advanced Statistical (Batch 6)
    case 'TornadoChart': return <TornadoChart {...propsWithVariant as typeof SAMPLE_DATA.TornadoChart & { variant: 'dark' | 'light' }} />;
    case 'ROCCurve': return <ROCCurve {...propsWithVariant as typeof SAMPLE_DATA.ROCCurve & { variant: 'dark' | 'light' }} />;
    case 'ConfusionMatrix': return <ConfusionMatrix {...propsWithVariant as typeof SAMPLE_DATA.ConfusionMatrix & { variant: 'dark' | 'light' }} />;
    case 'CohortChart': return <CohortChart {...propsWithVariant as typeof SAMPLE_DATA.CohortChart & { variant: 'dark' | 'light' }} />;
    case 'RetentionCurve': return <RetentionCurve {...propsWithVariant as typeof SAMPLE_DATA.RetentionCurve & { variant: 'dark' | 'light' }} />;
    case 'LorenzCurve': return <LorenzCurve {...propsWithVariant as typeof SAMPLE_DATA.LorenzCurve & { variant: 'dark' | 'light' }} />;
    case 'ErrorBarChart': return <ErrorBarChart {...propsWithVariant as typeof SAMPLE_DATA.ErrorBarChart & { variant: 'dark' | 'light' }} />;
    case 'RegressionPlot': return <RegressionPlot {...propsWithVariant as typeof SAMPLE_DATA.RegressionPlot & { variant: 'dark' | 'light' }} />;
    case 'ForecastChart': return <ForecastChart {...propsWithVariant as typeof SAMPLE_DATA.ForecastChart & { variant: 'dark' | 'light' }} />;
    case 'SensitivityChart': return <SensitivityChart {...propsWithVariant as typeof SAMPLE_DATA.SensitivityChart & { variant: 'dark' | 'light' }} />;

    // Charts - Distribution/Specialized (Batch 7)
    case 'HexbinPlot': return <HexbinPlot {...propsWithVariant as typeof SAMPLE_DATA.HexbinPlot & { variant: 'dark' | 'light' }} />;
    case 'SwarmPlot': return <SwarmPlot {...propsWithVariant as typeof SAMPLE_DATA.SwarmPlot & { variant: 'dark' | 'light' }} />;
    case 'StripPlot': return <StripPlot {...propsWithVariant as typeof SAMPLE_DATA.StripPlot & { variant: 'dark' | 'light' }} />;
    case 'MosaicPlot': return <MosaicPlot {...propsWithVariant as typeof SAMPLE_DATA.MosaicPlot & { variant: 'dark' | 'light' }} />;
    case 'AdjacencyMatrix': return <AdjacencyMatrix {...propsWithVariant as typeof SAMPLE_DATA.AdjacencyMatrix & { variant: 'dark' | 'light' }} />;
    case 'PhylogeneticTree': return <PhylogeneticTree {...propsWithVariant as typeof SAMPLE_DATA.PhylogeneticTree & { variant: 'dark' | 'light' }} />;
    case 'EulerDiagram': return <EulerDiagram {...propsWithVariant as typeof SAMPLE_DATA.EulerDiagram & { variant: 'dark' | 'light' }} />;
    case 'IsotypeChart': return <IsotypeChart {...propsWithVariant as typeof SAMPLE_DATA.IsotypeChart & { variant: 'dark' | 'light' }} />;
    case 'ConceptMap': return <ConceptMap {...propsWithVariant as typeof SAMPLE_DATA.ConceptMap & { variant: 'dark' | 'light' }} />;

    // Charts - UML/Technical (Batch 8)
    case 'SequenceDiagram': return <SequenceDiagram {...propsWithVariant as typeof SAMPLE_DATA.SequenceDiagram & { variant: 'dark' | 'light' }} />;
    case 'ActivityDiagram': return <ActivityDiagram {...propsWithVariant as typeof SAMPLE_DATA.ActivityDiagram & { variant: 'dark' | 'light' }} />;
    case 'ERDiagram': return <ERDiagram {...propsWithVariant as typeof SAMPLE_DATA.ERDiagram & { variant: 'dark' | 'light' }} />;

    // Charts - Technical Diagrams (Batch 9)
    case 'StateDiagram': return <StateDiagram {...propsWithVariant as typeof SAMPLE_DATA.StateDiagram & { variant: 'dark' | 'light' }} />;
    case 'DataFlowDiagram': return <DataFlowDiagram {...propsWithVariant as typeof SAMPLE_DATA.DataFlowDiagram & { variant: 'dark' | 'light' }} />;
    case 'ArchitectureDiagram': return <ArchitectureDiagram {...propsWithVariant as typeof SAMPLE_DATA.ArchitectureDiagram & { variant: 'dark' | 'light' }} />;
    case 'NetworkTopology': return <NetworkTopology {...propsWithVariant as typeof SAMPLE_DATA.NetworkTopology & { variant: 'dark' | 'light' }} />;
    case 'InfrastructureDiagram': return <InfrastructureDiagram {...propsWithVariant as typeof SAMPLE_DATA.InfrastructureDiagram & { variant: 'dark' | 'light' }} />;

    // Charts - Probabilistic/Causal (Batch 9)
    case 'BayesianNetwork': return <BayesianNetwork {...propsWithVariant as typeof SAMPLE_DATA.BayesianNetwork & { variant: 'dark' | 'light' }} />;
    case 'CausalLoopDiagram': return <CausalLoopDiagram {...propsWithVariant as typeof SAMPLE_DATA.CausalLoopDiagram & { variant: 'dark' | 'light' }} />;

    // Charts - Interactive/Comparison (Batch 9)
    case 'InteractiveTable': return <InteractiveTable {...propsWithVariant as typeof SAMPLE_DATA.InteractiveTable & { variant: 'dark' | 'light' }} />;
    case 'ComparisonSlider': return <ComparisonSlider {...propsWithVariant as typeof SAMPLE_DATA.ComparisonSlider & { variant: 'dark' | 'light' }} />;
    case 'PortfolioBreakdown': return <PortfolioBreakdown {...propsWithVariant as typeof SAMPLE_DATA.PortfolioBreakdown & { variant: 'dark' | 'light' }} />;
    case 'RevenueWaterfall': return <RevenueWaterfall {...propsWithVariant as typeof SAMPLE_DATA.RevenueWaterfall & { variant: 'dark' | 'light' }} />;
    case 'CountryMap': return <CountryMap {...propsWithVariant as typeof SAMPLE_DATA.CountryMap & { variant: 'dark' | 'light' }} />;

    // Charts - Goal/Progress (Batch 9)
    case 'ThermometerChart': return <ThermometerChart {...propsWithVariant as typeof SAMPLE_DATA.ThermometerChart & { variant: 'dark' | 'light' }} />;
    case 'SegmentedProgress': return <SegmentedProgress {...propsWithVariant as typeof SAMPLE_DATA.SegmentedProgress & { variant: 'dark' | 'light' }} />;
    case 'AnnotatedTimeline': return <AnnotatedTimeline {...propsWithVariant as typeof SAMPLE_DATA.AnnotatedTimeline & { variant: 'dark' | 'light' }} />;
    case 'PredictionBand': return <PredictionBand {...propsWithVariant as typeof SAMPLE_DATA.PredictionBand & { variant: 'dark' | 'light' }} />;
    case 'AnomalyChart': return <AnomalyChart {...propsWithVariant as typeof SAMPLE_DATA.AnomalyChart & { variant: 'dark' | 'light' }} />;
    case 'TargetChart': return <TargetChart {...propsWithVariant as typeof SAMPLE_DATA.TargetChart & { variant: 'dark' | 'light' }} />;

    // Charts - Matrix/Strategy (Batch 9)
    case 'PerformanceMatrix': return <PerformanceMatrix {...propsWithVariant as typeof SAMPLE_DATA.PerformanceMatrix & { variant: 'dark' | 'light' }} />;
    case 'ValueChain': return <ValueChain {...propsWithVariant as typeof SAMPLE_DATA.ValueChain & { variant: 'dark' | 'light' }} />;
    case 'SWOT': return <SWOT {...propsWithVariant as typeof SAMPLE_DATA.SWOT & { variant: 'dark' | 'light' }} />;
    case 'RiskMatrix': return <RiskMatrix {...propsWithVariant as typeof SAMPLE_DATA.RiskMatrix & { variant: 'dark' | 'light' }} />;
    case 'PriorityMatrix': return <PriorityMatrix {...propsWithVariant as typeof SAMPLE_DATA.PriorityMatrix & { variant: 'dark' | 'light' }} />;
    case 'CompetitorMap': return <CompetitorMap {...propsWithVariant as typeof SAMPLE_DATA.CompetitorMap & { variant: 'dark' | 'light' }} />;

    // Charts - Metrics/OKR (Batch 9)
    case 'SkillRadar': return <SkillRadar {...propsWithVariant as typeof SAMPLE_DATA.SkillRadar & { variant: 'dark' | 'light' }} />;
    case 'OKRTracker': return <OKRTracker {...propsWithVariant as typeof SAMPLE_DATA.OKRTracker & { variant: 'dark' | 'light' }} />;
    case 'QuarterlyTrend': return <QuarterlyTrend {...propsWithVariant as typeof SAMPLE_DATA.QuarterlyTrend & { variant: 'dark' | 'light' }} />;
    case 'BenchmarkChart': return <BenchmarkChart {...propsWithVariant as typeof SAMPLE_DATA.BenchmarkChart & { variant: 'dark' | 'light' }} />;
    case 'CapabilityModel': return <CapabilityModel {...propsWithVariant as typeof SAMPLE_DATA.CapabilityModel & { variant: 'dark' | 'light' }} />;

    // Charts - UX/Product (Batch 9)
    case 'UserFlowDiagram': return <UserFlowDiagram {...propsWithVariant as typeof SAMPLE_DATA.UserFlowDiagram & { variant: 'dark' | 'light' }} />;
    case 'FeatureComparison': return <FeatureComparison {...propsWithVariant as typeof SAMPLE_DATA.FeatureComparison & { variant: 'dark' | 'light' }} />;
    case 'MetricsDashboard': return <MetricsDashboard {...propsWithVariant as typeof SAMPLE_DATA.MetricsDashboard & { variant: 'dark' | 'light' }} />;
    case 'FeedbackLoop': return <FeedbackLoop {...propsWithVariant as typeof SAMPLE_DATA.FeedbackLoop & { variant: 'dark' | 'light' }} />;

    // Sequential
    case 'Timeline': return <Timeline {...propsWithVariant as typeof SAMPLE_DATA.Timeline & { variant: 'dark' | 'light' }} />;
    case 'ProcessSteps': return <ProcessSteps {...propsWithVariant as typeof SAMPLE_DATA.ProcessSteps & { variant: 'dark' | 'light' }} />;

    // Emphasis
    case 'QuoteBlock': return <QuoteBlock {...propsWithVariant as typeof SAMPLE_DATA.QuoteBlock & { variant: 'dark' | 'light' }} />;
    case 'SocialProof': return <SocialProof {...propsWithVariant as typeof SAMPLE_DATA.SocialProof & { variant: 'dark' | 'light' }} />;
    case 'IconGrid': return <IconGrid {...propsWithVariant as typeof SAMPLE_DATA.IconGrid & { variant: 'dark' | 'light' }} />;

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
  'Data': '#8B5CF6',
  'Comparison': '#F59E0B',
  'Sequential': '#EC4899',
  'Emphasis': '#06B6D4',
  'Charts - Basic': '#EF4444',
  'Charts - Statistical': '#F97316',
  'Charts - Time Series': '#F59E0B',
  'Charts - Hierarchical': '#84CC16',
  'Charts - Network': '#22C55E',
  'Charts - KPI': '#14B8A6',
  'Charts - Specialty': '#06B6D4',
};

function ComponentBrowserContent() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [variant, setVariant] = useState<'dark' | 'light'>('dark');
  const [showBugReport, setShowBugReport] = useState(false);
  const [bugDescription, setBugDescription] = useState('');
  const [bugSubmitting, setBugSubmitting] = useState(false);
  const [bugSubmitted, setBugSubmitted] = useState(false);

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

  const handleSubmitBug = async () => {
    if (!selectedComponent || !bugDescription.trim()) return;

    setBugSubmitting(true);
    try {
      const componentInfo = allComponents.find(c => c.id === selectedComponent);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from('component_bugs').insert({
        component_id: selectedComponent,
        component_name: componentInfo?.name || selectedComponent,
        component_category: componentInfo?.category || 'unknown',
        description: bugDescription.trim(),
        variant_mode: variant,
        status: 'open',
        created_at: new Date().toISOString(),
      });

      setBugSubmitted(true);
      setBugDescription('');
      setTimeout(() => {
        setShowBugReport(false);
        setBugSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to submit bug report:', error);
    } finally {
      setBugSubmitting(false);
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
          <div className="flex items-center gap-3">
            {/* Variant Toggle */}
            <div className="flex items-center gap-1 px-2 py-1 bg-[var(--bg-secondary)] rounded-xl">
              <button
                onClick={() => setVariant('dark')}
                className={`p-2 rounded-lg transition-colors ${variant === 'dark' ? 'bg-black text-white' : 'text-[var(--text-muted)] hover:text-black'}`}
                title="Dark mode"
              >
                <Moon size={16} />
              </button>
              <button
                onClick={() => setVariant('light')}
                className={`p-2 rounded-lg transition-colors ${variant === 'light' ? 'bg-white text-black shadow' : 'text-[var(--text-muted)] hover:text-black'}`}
                title="Light mode"
              >
                <Sun size={16} />
              </button>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] rounded-xl">
              <Grid3X3 size={16} className="text-[var(--text-muted)]" />
              <span className="text-sm font-medium">Grid View</span>
            </div>
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
                  <ComponentPreview componentId={component.id} variant={variant} />
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
                    {/* Variant Toggle in Modal */}
                    <div className="flex items-center gap-1 px-2 py-1 bg-[var(--bg-secondary)] rounded-lg">
                      <button
                        onClick={() => setVariant('dark')}
                        className={`p-1.5 rounded transition-colors ${variant === 'dark' ? 'bg-black text-white' : 'text-[var(--text-muted)] hover:text-black'}`}
                        title="Dark mode"
                      >
                        <Moon size={14} />
                      </button>
                      <button
                        onClick={() => setVariant('light')}
                        className={`p-1.5 rounded transition-colors ${variant === 'light' ? 'bg-white text-black shadow' : 'text-[var(--text-muted)] hover:text-black'}`}
                        title="Light mode"
                      >
                        <Sun size={14} />
                      </button>
                    </div>
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
                      onClick={() => setShowBugReport(!showBugReport)}
                      className={`p-2 rounded-lg transition-colors ${showBugReport ? 'bg-red-100 text-red-600' : 'bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)]'}`}
                      title="Report a bug"
                    >
                      <Bug size={18} />
                    </button>
                    <button
                      onClick={() => setSelectedComponent(null)}
                      className="p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Bug Report Form */}
                <AnimatePresence>
                  {showBugReport && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-b border-[#E5E5E5] overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-red-50">
                        <div className="flex items-start gap-3">
                          <Bug size={20} className="text-red-500 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-red-700 mb-2">Report an Issue</h4>
                            {bugSubmitted ? (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-green-600"
                              >
                                <Check size={18} />
                                <span className="font-medium">Bug report submitted! Thank you.</span>
                              </motion.div>
                            ) : (
                              <>
                                <textarea
                                  value={bugDescription}
                                  onChange={(e) => setBugDescription(e.target.value)}
                                  placeholder="Describe the issue... (e.g., 'Title text is black instead of white in dark mode')"
                                  className="w-full px-3 py-2 border border-red-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-300 bg-white"
                                  rows={3}
                                />
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xs text-red-400">
                                    Currently viewing: {variant} mode
                                  </span>
                                  <button
                                    onClick={handleSubmitBug}
                                    disabled={!bugDescription.trim() || bugSubmitting}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    {bugSubmitting ? (
                                      <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Submitting...
                                      </>
                                    ) : (
                                      <>
                                        <Send size={14} />
                                        Submit Report
                                      </>
                                    )}
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Modal Content */}
                <div className="overflow-auto max-h-[calc(90vh-80px)]">
                  <ComponentPreview componentId={selectedComponent} variant={variant} />
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
