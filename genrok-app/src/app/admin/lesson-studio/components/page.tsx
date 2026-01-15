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
} from 'lucide-react';
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
                      onClick={() => setSelectedComponent(null)}
                      className="p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

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
