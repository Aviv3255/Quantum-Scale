'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  Percent,
  Target,
  Zap,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Sparkles,
  Calculator,
  LineChart,
  Activity
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// MONKEY VIDEO STATES (18 levels based on business health)
// ═══════════════════════════════════════════════════════════════════════════════
const MONKEY_VIDEOS = [
  { state: 1, name: 'Homeless', url: 'https://cdn.shopify.com/videos/c/o/v/639e07e9268a4bf2875c7a8665d2a469.mp4' },
  { state: 2, name: 'Struggling', url: 'https://cdn.shopify.com/videos/c/o/v/8e8b8097e0d74e51a133ea885e86924f.mp4' },
  { state: 3, name: 'Surviving', url: 'https://cdn.shopify.com/videos/c/o/v/0d96734e40dd42aaac6647fcd98b9576.mp4' },
  { state: 4, name: 'Getting By', url: 'https://cdn.shopify.com/videos/c/o/v/5e2b0ef6ef74411e8157fd146a17b137.mp4' },
  { state: 5, name: 'Stable', url: 'https://cdn.shopify.com/videos/c/o/v/a7759003dfca4403b8dd663a60304f82.mp4' },
  { state: 6, name: 'Improving', url: 'https://cdn.shopify.com/videos/c/o/v/16787ad04e6b479db6ba97cf9de8cf68.mp4' },
  { state: 7, name: 'Comfortable', url: 'https://cdn.shopify.com/videos/c/o/v/07a6058a491249d5a7f24712de3e9edc.mp4' },
  { state: 8, name: 'Doing Well', url: 'https://cdn.shopify.com/videos/c/o/v/8c1d9a9490a84309ac84ba909ab49e1c.mp4' },
  { state: 9, name: 'Professional', url: 'https://cdn.shopify.com/videos/c/o/v/d9df1a51b53e47b5b5883c6dea45c0ef.mp4' },
  { state: 10, name: 'Established', url: 'https://cdn.shopify.com/videos/c/o/v/463041b48b3a496f85ce1d969dd1c6bb.mp4' },
  { state: 11, name: 'Successful', url: 'https://cdn.shopify.com/videos/c/o/v/234b9710ba904b7b93d02f959c365dff.mp4' },
  { state: 12, name: 'Thriving', url: 'https://cdn.shopify.com/videos/c/o/v/c961d8e551c64e5780efadc19c799eab.mp4' },
  { state: 13, name: 'Wealthy', url: 'https://cdn.shopify.com/videos/c/o/v/c343d8c0801147c990fc89db9dfe91bd.mp4' },
  { state: 14, name: 'Rich', url: 'https://cdn.shopify.com/videos/c/o/v/e7c2f5e913124c4396e00b8ce587aa8a.mp4' },
  { state: 15, name: 'Elite', url: 'https://cdn.shopify.com/videos/c/o/v/6bda13bfa2894e13a407c1f99f7dd742.mp4' },
  { state: 16, name: 'Mogul', url: 'https://cdn.shopify.com/videos/c/o/v/2a47ae17ae184f66972ef1923ec75455.mp4' },
  { state: 17, name: 'Tycoon', url: 'https://cdn.shopify.com/videos/c/o/v/46966eb60df241cf95bc4a5d4f22e7cf.mp4' },
  { state: 18, name: 'Empire', url: 'https://cdn.shopify.com/videos/c/o/v/f19366a8a038416888b2d781b50e67f6.mp4' }
];

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED NUMBER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  colored = false
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  colored?: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);

  useEffect(() => {
    const startValue = previousValue.current;
    const endValue = value;
    const duration = 800;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOut;

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        previousValue.current = endValue;
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  const formattedValue = displayValue.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });

  const color = colored
    ? value >= 0 ? '#22c55e' : '#ef4444'
    : 'inherit';

  return (
    <span className={className} style={{ color }}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════
interface Inputs {
  monthlyRevenue: number;
  aov: number;
  cac: number;
  cvr: number;
  cogs: number;
  adSpend: number;
  processingFees: number;
  ltv1m: number;
  ltv3m: number;
  ltv6m: number;
  ltv12m: number;
  ltv24m: number;
  otherCosts: number;
  currency: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CALCULATIONS HOOK
// ═══════════════════════════════════════════════════════════════════════════════
function useCalculations(inputs: Inputs) {
  return useMemo(() => {
    const monthlyRevenue = Number(inputs.monthlyRevenue) || 0;
    const aov = Number(inputs.aov) || 1;
    const cac = Number(inputs.cac) || 1;
    const cvr = Number(inputs.cvr) || 1;
    const cogsPercent = Number(inputs.cogs) || 0;
    const adSpend = Number(inputs.adSpend) || 0;
    const processingFeesPercent = Number(inputs.processingFees) || 0;
    const otherCosts = Number(inputs.otherCosts) || 0;

    // Basic calculations
    const monthlyOrders = monthlyRevenue / aov;
    const dailyRevenue = monthlyRevenue / 30;
    const dailyOrders = monthlyOrders / 30;

    // Cost calculations
    const grossProfit = monthlyRevenue * (1 - cogsPercent / 100);
    const processingFees = monthlyRevenue * (processingFeesPercent / 100);
    const totalCosts = (monthlyRevenue * cogsPercent / 100) + processingFees + adSpend + otherCosts;
    const netProfit = monthlyRevenue - totalCosts;
    const profitMargin = monthlyRevenue > 0 ? (netProfit / monthlyRevenue) * 100 : 0;

    // Daily metrics
    const dailyNetProfit = netProfit / 30;

    // LTV-based projections
    const ltvPeriods = [
      { period: '1M', value: Number(inputs.ltv1m) || 0, months: 1 },
      { period: '3M', value: Number(inputs.ltv3m) || 0, months: 3 },
      { period: '6M', value: Number(inputs.ltv6m) || 0, months: 6 },
      { period: '12M', value: Number(inputs.ltv12m) || 0, months: 12 },
      { period: '24M', value: Number(inputs.ltv24m) || 0, months: 24 }
    ];

    const highestLTV = ltvPeriods.reduce((max, curr) =>
      curr.value > max.value ? curr : max, ltvPeriods[0]);

    // Future profit calculations
    const customersAcquired = adSpend / cac;
    const futureRevenue = customersAcquired * highestLTV.value;
    const futureCosts = futureRevenue * (cogsPercent / 100) + futureRevenue * (processingFeesPercent / 100);
    const futureProfit = futureRevenue - futureCosts - adSpend;
    const futureProfitMargin = futureRevenue > 0 ? (futureProfit / futureRevenue) * 100 : 0;

    // LTV projections
    const ltvProjections = ltvPeriods.map(({ period, value }) => {
      if (value <= 0) return { period, profit: 0, margin: 0, revenue: 0 };
      const projRevenue = customersAcquired * value;
      const projCosts = projRevenue * (cogsPercent / 100) + projRevenue * (processingFeesPercent / 100);
      const projProfit = projRevenue - projCosts - adSpend;
      const projMargin = projRevenue > 0 ? (projProfit / projRevenue) * 100 : 0;
      return { period, profit: projProfit, margin: projMargin, revenue: projRevenue };
    });

    // Health Score (0-100)
    const profitScore = Math.min(Math.max((profitMargin + 20) * 2, 0), 40);
    const ltvCacRatio = highestLTV.value / cac;
    const ltvScore = Math.min(ltvCacRatio * 5, 30);
    const cvrScore = Math.min(cvr * 5, 15);
    const cogsScore = Math.min((50 - cogsPercent), 15);
    const healthScore = Math.round(profitScore + ltvScore + cvrScore + cogsScore);

    // Break-even
    const breakEvenRevenue = totalCosts / (1 - cogsPercent / 100 - processingFeesPercent / 100);
    const breakEvenOrders = breakEvenRevenue / aov;

    // KPI Analysis
    const kpiAnalysis = {
      cvr: {
        value: cvr,
        target: 3,
        status: cvr >= 3 ? 'green' : cvr >= 2 ? 'amber' : 'red',
        label: 'Conversion Rate'
      },
      profitMargin: {
        value: profitMargin,
        target: 20,
        status: profitMargin >= 20 ? 'green' : profitMargin >= 10 ? 'amber' : 'red',
        label: 'Profit Margin'
      },
      ltvCac: {
        value: ltvCacRatio,
        target: 3,
        status: ltvCacRatio >= 3 ? 'green' : ltvCacRatio >= 2 ? 'amber' : 'red',
        label: 'LTV:CAC Ratio'
      },
      cogs: {
        value: cogsPercent,
        target: 33,
        status: cogsPercent <= 33 ? 'green' : cogsPercent <= 40 ? 'amber' : 'red',
        label: 'COGS %',
        inverse: true
      },
      processingFees: {
        value: processingFeesPercent,
        target: 3,
        status: processingFeesPercent <= 3 ? 'green' : processingFeesPercent <= 4 ? 'amber' : 'red',
        label: 'Processing Fees',
        inverse: true
      }
    };

    const greenKpis = Object.values(kpiAnalysis).filter(k => k.status === 'green').length;
    const scaleReadiness = greenKpis >= 4 ? 'ready' : greenKpis >= 2 ? 'almost' : 'not-ready';

    return {
      monthlyRevenue,
      dailyRevenue,
      monthlyOrders,
      dailyOrders,
      grossProfit,
      netProfit,
      dailyNetProfit,
      profitMargin,
      totalCosts,
      processingFees,
      adSpend,
      customersAcquired,
      futureProfit,
      futureProfitMargin,
      futureRevenue,
      highestLTV,
      ltvProjections,
      healthScore,
      breakEvenRevenue,
      breakEvenOrders,
      kpiAnalysis,
      scaleReadiness,
      ltvCacRatio,
      cogsPercent,
      processingFeesPercent,
      otherCosts
    };
  }, [inputs]);
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function CalculatorsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  const [inputs, setInputs] = useState<Inputs>({
    monthlyRevenue: 50000,
    aov: 65,
    cac: 28,
    cvr: 2.8,
    cogs: 32,
    adSpend: 12000,
    processingFees: 2.9,
    ltv1m: 65,
    ltv3m: 120,
    ltv6m: 180,
    ltv12m: 280,
    ltv24m: 420,
    otherCosts: 3000,
    currency: 'USD'
  });

  const [activePanel, setActivePanel] = useState(0);
  const [monkeyState, setMonkeyState] = useState(5);
  const [isVideoTransitioning, setIsVideoTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currencies: Record<string, string> = {
    USD: '$', EUR: '€', GBP: '£', ILS: '₪', AUD: 'A$',
    CAD: 'C$', JPY: '¥', BRL: 'R$', MXN: '$', ZAR: 'R'
  };

  const panelNames = ['Profit Analysis', 'Future Projection', 'KPI X-Ray', 'Scale Readiness'];
  const calculations = useCalculations(inputs);

  // Calculate monkey state based on profit margin
  useEffect(() => {
    const { profitMargin, healthScore } = calculations;
    let newState = 1;

    if (profitMargin < -50) newState = 1;
    else if (profitMargin < -30) newState = 2;
    else if (profitMargin < -15) newState = 3;
    else if (profitMargin < -5) newState = 4;
    else if (profitMargin < 5) newState = 5;
    else if (profitMargin < 10) newState = 6;
    else if (profitMargin < 15) newState = 7;
    else if (profitMargin < 20) newState = 8;
    else if (profitMargin < 25) newState = 9;
    else if (profitMargin < 30) newState = 10;
    else if (profitMargin < 35) newState = 11;
    else if (profitMargin < 40) newState = 12;
    else if (profitMargin < 45) newState = 13;
    else if (profitMargin < 50) newState = 14;
    else if (profitMargin < 55) newState = 15;
    else if (profitMargin < 60) newState = 16;
    else if (profitMargin < 70) newState = 17;
    else newState = 18;

    if (healthScore > 80 && newState < 15) newState = Math.min(newState + 2, 18);
    else if (healthScore > 60 && newState < 12) newState = Math.min(newState + 1, 18);

    if (newState !== monkeyState) {
      setIsVideoTransitioning(true);
      setTimeout(() => {
        setMonkeyState(newState);
        setIsVideoTransitioning(false);
      }, 300);
    }
  }, [calculations, monkeyState]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full" />
      </div>
    );
  }

  const currentMonkey = MONKEY_VIDEOS[monkeyState - 1];
  const formatCurrency = (amount: number) => `${currencies[inputs.currency]}${Math.round(amount).toLocaleString()}`;
  const handleInputChange = (key: keyof Inputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };
  const nextPanel = () => setActivePanel(prev => (prev + 1) % 4);
  const prevPanel = () => setActivePanel(prev => (prev - 1 + 4) % 4);

  const getStatusIcon = (status: string) => {
    if (status === 'green') return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    if (status === 'amber') return <AlertCircle className="w-4 h-4 text-amber-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'green') return '#22c55e';
    if (status === 'amber') return '#f59e0b';
    return '#ef4444';
  };

  return (
    <DashboardLayout>
      <div className="h-screen flex flex-col bg-white overflow-hidden">

        {/* ═══════════════ TOP SECTION - 60% ═══════════════ */}
        <div className="flex-[6] flex flex-col lg:flex-row p-4 md:p-6 gap-6 lg:gap-8 overflow-hidden">

          {/* Mobile Title */}
          <div className="lg:hidden">
            <h1 className="text-2xl font-bold text-[#1a1a1a]">Profit Intelligence Center</h1>
            <p className="text-sm text-gray-500">Real-time business health monitoring</p>
          </div>

          {/* Center - Monkey Video */}
          <div className="flex-1 flex items-center justify-center min-h-0">
            <div className="relative w-full max-w-md aspect-square">
              {/* Background glow */}
              <div
                className="absolute inset-0 rounded-3xl blur-3xl opacity-20 transition-all duration-1000"
                style={{
                  background: monkeyState <= 4
                    ? 'radial-gradient(circle, #ef4444 0%, transparent 70%)'
                    : monkeyState <= 8
                      ? 'radial-gradient(circle, #f59e0b 0%, transparent 70%)'
                      : monkeyState <= 12
                        ? 'radial-gradient(circle, #22c55e 0%, transparent 70%)'
                        : 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)'
                }}
              />

              {/* Video Container */}
              <motion.div
                className="relative w-full h-full rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0,0,0,0.05)'
                }}
                animate={{ opacity: isVideoTransitioning ? 0.5 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <video
                  ref={videoRef}
                  key={currentMonkey.url}
                  src={currentMonkey.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-3xl"
                />

                {/* Status Badge */}
                <div
                  className="absolute bottom-4 left-4 right-4 py-3 px-4 rounded-2xl backdrop-blur-xl"
                  style={{
                    background: 'rgba(255,255,255,0.9)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Business Status</p>
                      <p className="text-lg font-bold text-[#1a1a1a]">{currentMonkey.name}</p>
                    </div>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-lg"
                      style={{
                        background: monkeyState <= 4
                          ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                          : monkeyState <= 8
                            ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                            : monkeyState <= 12
                              ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                              : 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                      }}
                    >
                      {monkeyState}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side - Key Metrics */}
          <div className="flex-1 flex flex-col justify-center gap-4 lg:pr-4 min-h-0 overflow-y-auto">
            {/* Desktop Title */}
            <div className="hidden lg:block mb-2">
              <h1 className="text-3xl font-bold text-[#1a1a1a]">Profit Intelligence Center</h1>
              <p className="text-gray-500">Real-time business health monitoring</p>
            </div>

            {/* Net Profit Card */}
            <div
              className="p-4 rounded-2xl"
              style={{
                background: calculations.netProfit >= 0
                  ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
                  : 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                border: `1px solid ${calculations.netProfit >= 0 ? '#bbf7d0' : '#fecaca'}`
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                {calculations.netProfit >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
                <span className="text-sm font-medium text-gray-600">Monthly Net Profit</span>
              </div>
              <AnimatedNumber
                value={calculations.netProfit}
                prefix={currencies[inputs.currency]}
                className="text-3xl font-bold"
                colored
              />
              <p className="text-sm text-gray-500 mt-1">
                Daily: <AnimatedNumber value={calculations.dailyNetProfit} prefix={currencies[inputs.currency]} colored />
              </p>
            </div>

            {/* Profit Margin & Health Score */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="flex items-center gap-2 mb-1">
                  <Percent className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-medium text-gray-500">Profit Margin</span>
                </div>
                <AnimatedNumber
                  value={calculations.profitMargin}
                  suffix="%"
                  decimals={1}
                  className="text-xl font-bold"
                  colored
                />
              </div>

              <div className="p-3 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-medium text-gray-500">Health Score</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold text-[#1a1a1a]">{calculations.healthScore}</span>
                  <span className="text-sm text-gray-400">/100</span>
                </div>
              </div>
            </div>

            {/* Future Profit Card */}
            <div
              className="p-4 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                border: '1px solid #bfdbfe'
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">
                  Future Profit ({calculations.highestLTV.period} LTV)
                </span>
              </div>
              <AnimatedNumber
                value={calculations.futureProfit}
                prefix={currencies[inputs.currency]}
                className="text-3xl font-bold"
                colored
              />
              <p className="text-sm text-gray-500 mt-1">
                Based on {Math.round(calculations.customersAcquired)} customers/month
              </p>
            </div>

            {/* LTV:CAC Ratio */}
            <div className="p-3 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: calculations.ltvCacRatio >= 3
                      ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                      : calculations.ltvCacRatio >= 2
                        ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                        : 'linear-gradient(135deg, #ef4444, #dc2626)'
                  }}
                >
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">LTV:CAC Ratio</p>
                  <p className="text-lg font-bold text-[#1a1a1a]">{calculations.ltvCacRatio.toFixed(1)}:1</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Target: 3:1+</p>
                <span className={`text-xs font-medium ${calculations.ltvCacRatio >= 3 ? 'text-green-600' : calculations.ltvCacRatio >= 2 ? 'text-amber-600' : 'text-red-600'}`}>
                  {calculations.ltvCacRatio >= 3 ? 'Excellent' : calculations.ltvCacRatio >= 2 ? 'Good' : 'Needs Work'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════ BOTTOM SECTION - 40% ═══════════════ */}
        <div className="flex-[4] flex flex-col lg:flex-row border-t border-[#e5e7eb] min-h-0">

          {/* Left - Data Input Panel (Dark) */}
          <div
            className="lg:w-[380px] p-4 lg:p-5 overflow-y-auto"
            style={{
              background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
              borderRight: '1px solid #2a2a2a'
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500">
                <Calculator className="w-4 h-4 text-black" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Data Input</h2>
                <p className="text-xs text-gray-400">Enter your metrics</p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Revenue */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-[10px] font-semibold text-yellow-500 uppercase tracking-wider mb-2">Revenue</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-gray-400 mb-1 block">Monthly Revenue</label>
                    <input
                      type="number"
                      value={inputs.monthlyRevenue}
                      onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
                      className="w-full bg-black/50 border border-gray-700 text-white text-sm rounded-lg px-2 py-1.5 focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 mb-1 block">AOV</label>
                    <input
                      type="number"
                      value={inputs.aov}
                      onChange={(e) => handleInputChange('aov', e.target.value)}
                      className="w-full bg-black/50 border border-gray-700 text-white text-sm rounded-lg px-2 py-1.5 focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>
              </div>

              {/* Acquisition */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-[10px] font-semibold text-yellow-500 uppercase tracking-wider mb-2">Acquisition</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-gray-400 mb-1 block">CAC ($)</label>
                    <input
                      type="number"
                      value={inputs.cac}
                      onChange={(e) => handleInputChange('cac', e.target.value)}
                      className="w-full bg-black/50 border border-gray-700 text-white text-sm rounded-lg px-2 py-1.5 focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 mb-1 block">CVR (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.cvr}
                      onChange={(e) => handleInputChange('cvr', e.target.value)}
                      className="w-full bg-black/50 border border-gray-700 text-white text-sm rounded-lg px-2 py-1.5 focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 mb-1 block">Ad Spend</label>
                    <input
                      type="number"
                      value={inputs.adSpend}
                      onChange={(e) => handleInputChange('adSpend', e.target.value)}
                      className="w-full bg-black/50 border border-gray-700 text-white text-sm rounded-lg px-2 py-1.5 focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>
              </div>

              {/* Costs */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-[10px] font-semibold text-yellow-500 uppercase tracking-wider mb-2">Costs</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-gray-400 mb-1 block">COGS (%)</label>
                    <input
                      type="number"
                      value={inputs.cogs}
                      onChange={(e) => handleInputChange('cogs', e.target.value)}
                      className="w-full bg-black/50 border border-gray-700 text-white text-sm rounded-lg px-2 py-1.5 focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 mb-1 block">Fees (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.processingFees}
                      onChange={(e) => handleInputChange('processingFees', e.target.value)}
                      className="w-full bg-black/50 border border-gray-700 text-white text-sm rounded-lg px-2 py-1.5 focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 mb-1 block">Other</label>
                    <input
                      type="number"
                      value={inputs.otherCosts}
                      onChange={(e) => handleInputChange('otherCosts', e.target.value)}
                      className="w-full bg-black/50 border border-gray-700 text-white text-sm rounded-lg px-2 py-1.5 focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>
              </div>

              {/* LTV */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-[10px] font-semibold text-yellow-500 uppercase tracking-wider mb-2">Customer LTV</h3>
                <div className="grid grid-cols-5 gap-1">
                  {[
                    { key: 'ltv1m', label: '1M' },
                    { key: 'ltv3m', label: '3M' },
                    { key: 'ltv6m', label: '6M' },
                    { key: 'ltv12m', label: '12M' },
                    { key: 'ltv24m', label: '24M' }
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="text-[10px] text-gray-400 mb-1 block">{label}</label>
                      <input
                        type="number"
                        value={inputs[key as keyof Inputs]}
                        onChange={(e) => handleInputChange(key as keyof Inputs, e.target.value)}
                        className="w-full bg-black/50 border border-gray-700 text-white text-sm rounded-lg px-1.5 py-1.5 focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Currency */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <label className="text-[10px] text-gray-400 mb-1 block">Currency</label>
                <select
                  value={inputs.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="w-full bg-black/50 border border-gray-700 text-white text-sm rounded-lg px-2 py-1.5 focus:outline-none focus:border-yellow-500"
                >
                  {Object.keys(currencies).map(c => (
                    <option key={c} value={c}>{c} ({currencies[c]})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right - Results Slider */}
          <div className="flex-1 flex flex-col bg-gray-50 min-h-0">
            {/* Panel Navigation */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#e5e7eb] flex-shrink-0">
              <div className="flex items-center gap-1 overflow-x-auto">
                {panelNames.map((name, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePanel(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                      activePanel === idx
                        ? 'bg-black text-white'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={prevPanel}
                  className="w-7 h-7 rounded-lg flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-50"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={nextPanel}
                  className="w-7 h-7 rounded-lg flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-50"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-hidden relative min-h-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePanel}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="absolute inset-0 p-4 overflow-y-auto"
                >
                  {/* Panel 0: Profit Analysis */}
                  {activePanel === 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <BarChart3 className="w-5 h-5 text-gray-600" />
                        <h3 className="text-base font-bold text-gray-900">Profit Breakdown</h3>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                        <div className="p-3 rounded-xl bg-white border border-gray-200">
                          <p className="text-[10px] text-gray-500 mb-1">Monthly Revenue</p>
                          <p className="text-lg font-bold text-gray-900">{formatCurrency(calculations.monthlyRevenue)}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-gray-200">
                          <p className="text-[10px] text-gray-500 mb-1">Gross Profit</p>
                          <p className="text-lg font-bold text-gray-900">{formatCurrency(calculations.grossProfit)}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-gray-200">
                          <p className="text-[10px] text-gray-500 mb-1">Total Costs</p>
                          <p className="text-lg font-bold text-red-600">{formatCurrency(calculations.totalCosts)}</p>
                        </div>
                        <div className="p-3 rounded-xl" style={{ background: calculations.netProfit >= 0 ? '#f0fdf4' : '#fef2f2', border: `1px solid ${calculations.netProfit >= 0 ? '#bbf7d0' : '#fecaca'}` }}>
                          <p className="text-[10px] text-gray-500 mb-1">Net Profit</p>
                          <p className={`text-lg font-bold ${calculations.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(calculations.netProfit)}
                          </p>
                        </div>
                      </div>

                      {/* Cost Breakdown */}
                      <div className="p-3 rounded-xl bg-white border border-gray-200">
                        <h4 className="text-xs font-semibold text-gray-700 mb-2">Cost Breakdown</h4>
                        <div className="space-y-1.5">
                          {[
                            { label: 'COGS', value: calculations.monthlyRevenue * calculations.cogsPercent / 100, percent: calculations.cogsPercent },
                            { label: 'Ad Spend', value: calculations.adSpend, percent: (calculations.adSpend / calculations.monthlyRevenue * 100) },
                            { label: 'Processing', value: calculations.processingFees, percent: calculations.processingFeesPercent },
                            { label: 'Other', value: calculations.otherCosts, percent: (calculations.otherCosts / calculations.monthlyRevenue * 100) }
                          ].map(({ label, value, percent }) => (
                            <div key={label} className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">{label}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400">{percent.toFixed(1)}%</span>
                                <span className="font-medium text-gray-900 w-20 text-right">{formatCurrency(value)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Daily Stats */}
                      <div className="grid grid-cols-4 gap-2">
                        <div className="p-3 rounded-xl bg-white border border-gray-200">
                          <p className="text-[10px] text-gray-500 mb-1">Daily Revenue</p>
                          <p className="text-base font-bold text-gray-900">{formatCurrency(calculations.dailyRevenue)}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-gray-200">
                          <p className="text-[10px] text-gray-500 mb-1">Daily Profit</p>
                          <p className={`text-base font-bold ${calculations.dailyNetProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(calculations.dailyNetProfit)}
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-gray-200">
                          <p className="text-[10px] text-gray-500 mb-1">Daily Orders</p>
                          <p className="text-base font-bold text-gray-900">{Math.round(calculations.dailyOrders)}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-gray-200">
                          <p className="text-[10px] text-gray-500 mb-1">Margin</p>
                          <p className={`text-base font-bold ${calculations.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {calculations.profitMargin.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Panel 1: Future Projection */}
                  {activePanel === 1 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <LineChart className="w-5 h-5 text-gray-600" />
                        <h3 className="text-base font-bold text-gray-900">LTV Projections</h3>
                      </div>

                      <div className="grid grid-cols-5 gap-2">
                        {calculations.ltvProjections.map((proj, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-xl text-center transition-all ${
                              proj.period === calculations.highestLTV.period
                                ? 'bg-blue-50 border-2 border-blue-300'
                                : 'bg-white border border-gray-200'
                            }`}
                          >
                            <p className={`text-xs font-semibold mb-1 ${proj.period === calculations.highestLTV.period ? 'text-blue-600' : 'text-gray-500'}`}>
                              {proj.period}
                            </p>
                            <p className={`text-base font-bold ${proj.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatCurrency(proj.profit)}
                            </p>
                            <p className="text-[10px] text-gray-400">{proj.margin.toFixed(1)}%</p>
                          </div>
                        ))}
                      </div>

                      {/* Best Scenario */}
                      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-blue-600" />
                          <h4 className="font-semibold text-gray-900">Best LTV Scenario ({calculations.highestLTV.period})</h4>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                          <div>
                            <p className="text-[10px] text-gray-500 mb-1">Customers</p>
                            <p className="text-lg font-bold text-gray-900">{Math.round(calculations.customersAcquired)}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-500 mb-1">Future Revenue</p>
                            <p className="text-lg font-bold text-gray-900">{formatCurrency(calculations.futureRevenue)}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-500 mb-1">Future Profit</p>
                            <p className={`text-lg font-bold ${calculations.futureProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatCurrency(calculations.futureProfit)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-500 mb-1">Margin</p>
                            <p className={`text-lg font-bold ${calculations.futureProfitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {calculations.futureProfitMargin.toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Break-even */}
                      <div className="p-3 rounded-xl bg-white border border-gray-200">
                        <h4 className="text-xs font-semibold text-gray-700 mb-2">Break-even Analysis</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-[10px] text-gray-500 mb-1">Break-even Revenue</p>
                            <p className="text-base font-bold text-gray-900">{formatCurrency(calculations.breakEvenRevenue)}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-500 mb-1">Break-even Orders</p>
                            <p className="text-base font-bold text-gray-900">{Math.round(calculations.breakEvenOrders)}/mo</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Panel 2: KPI X-Ray */}
                  {activePanel === 2 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <PieChart className="w-5 h-5 text-gray-600" />
                        <h3 className="text-base font-bold text-gray-900">KPI Health Check</h3>
                      </div>

                      <div className="space-y-2">
                        {Object.entries(calculations.kpiAnalysis).map(([key, kpi]) => (
                          <div
                            key={key}
                            className="p-3 rounded-xl bg-white border border-gray-200 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              {getStatusIcon(kpi.status)}
                              <div>
                                <p className="font-medium text-gray-900 text-sm">{kpi.label}</p>
                                <p className="text-[10px] text-gray-500">
                                  Target: {kpi.inverse ? '≤' : '≥'} {kpi.target}{key === 'ltvCac' ? ':1' : '%'}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold" style={{ color: getStatusColor(kpi.status) }}>
                                {kpi.value.toFixed(1)}{key === 'ltvCac' ? ':1' : '%'}
                              </p>
                              <p className="text-[10px]" style={{ color: getStatusColor(kpi.status) }}>
                                {kpi.status === 'green' ? 'On Target' : kpi.status === 'amber' ? 'Close' : 'Needs Work'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Quick Wins */}
                      <div className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-amber-600" />
                          <h4 className="font-semibold text-gray-900 text-sm">Quick Wins</h4>
                        </div>
                        <ul className="space-y-1">
                          {calculations.kpiAnalysis.cvr.status !== 'green' && (
                            <li className="text-xs text-gray-700 flex items-start gap-1">
                              <ArrowUpRight className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>Improve CVR by {(3 - calculations.kpiAnalysis.cvr.value).toFixed(1)}%</span>
                            </li>
                          )}
                          {calculations.kpiAnalysis.cogs.status !== 'green' && (
                            <li className="text-xs text-gray-700 flex items-start gap-1">
                              <ArrowDownRight className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>Reduce COGS by {(calculations.kpiAnalysis.cogs.value - 33).toFixed(1)}%</span>
                            </li>
                          )}
                          {calculations.kpiAnalysis.ltvCac.status !== 'green' && (
                            <li className="text-xs text-gray-700 flex items-start gap-1">
                              <ArrowUpRight className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>Improve LTV:CAC ratio to 3:1</span>
                            </li>
                          )}
                          {Object.values(calculations.kpiAnalysis).every(k => k.status === 'green') && (
                            <li className="text-xs text-green-700 flex items-start gap-1">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>All KPIs on target! Focus on scaling.</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Panel 3: Scale Readiness */}
                  {activePanel === 3 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-5 h-5 text-gray-600" />
                        <h3 className="text-base font-bold text-gray-900">Scale Readiness</h3>
                      </div>

                      {/* Main Status */}
                      <div
                        className="p-5 rounded-2xl text-center"
                        style={{
                          background: calculations.scaleReadiness === 'ready'
                            ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)'
                            : calculations.scaleReadiness === 'almost'
                              ? 'linear-gradient(135deg, #fffbeb, #fef3c7)'
                              : 'linear-gradient(135deg, #fef2f2, #fee2e2)',
                          border: `2px solid ${
                            calculations.scaleReadiness === 'ready' ? '#22c55e'
                            : calculations.scaleReadiness === 'almost' ? '#f59e0b'
                            : '#ef4444'
                          }`
                        }}
                      >
                        <div
                          className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                          style={{
                            background: calculations.scaleReadiness === 'ready'
                              ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                              : calculations.scaleReadiness === 'almost'
                                ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                                : 'linear-gradient(135deg, #ef4444, #dc2626)'
                          }}
                        >
                          {calculations.scaleReadiness === 'ready' ? (
                            <CheckCircle2 className="w-7 h-7 text-white" />
                          ) : calculations.scaleReadiness === 'almost' ? (
                            <AlertCircle className="w-7 h-7 text-white" />
                          ) : (
                            <XCircle className="w-7 h-7 text-white" />
                          )}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">
                          {calculations.scaleReadiness === 'ready'
                            ? 'Ready to Scale!'
                            : calculations.scaleReadiness === 'almost'
                              ? 'Almost Ready'
                              : 'Not Ready Yet'}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {calculations.scaleReadiness === 'ready'
                            ? 'Increase ad spend with confidence.'
                            : calculations.scaleReadiness === 'almost'
                              ? 'A few optimizations needed.'
                              : 'Improve metrics before scaling.'}
                        </p>
                      </div>

                      {/* Checklist */}
                      <div className="p-3 rounded-xl bg-white border border-gray-200">
                        <h4 className="text-xs font-semibold text-gray-700 mb-2">Scale Checklist</h4>
                        <div className="space-y-1.5">
                          {[
                            { label: 'Profit Margin > 20%', met: calculations.profitMargin >= 20 },
                            { label: 'LTV:CAC > 3:1', met: calculations.ltvCacRatio >= 3 },
                            { label: 'CVR > 3%', met: Number(inputs.cvr) >= 3 },
                            { label: 'COGS < 33%', met: Number(inputs.cogs) <= 33 },
                            { label: 'Fees < 3%', met: Number(inputs.processingFees) <= 3 },
                            { label: 'Positive Profit', met: calculations.netProfit > 0 }
                          ].map(({ label, met }, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${met ? 'bg-green-100' : 'bg-red-100'}`}>
                                {met ? (
                                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                                ) : (
                                  <XCircle className="w-3 h-3 text-red-600" />
                                )}
                              </div>
                              <span className={`text-xs ${met ? 'text-gray-700' : 'text-gray-400'}`}>{label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Priority Actions */}
                      {calculations.scaleReadiness !== 'ready' && (
                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-purple-600" />
                            <h4 className="font-semibold text-gray-900 text-sm">Priority Actions</h4>
                          </div>
                          <ul className="space-y-1">
                            {calculations.profitMargin < 20 && (
                              <li className="text-xs text-gray-700">• Increase prices or reduce costs</li>
                            )}
                            {calculations.ltvCacRatio < 3 && (
                              <li className="text-xs text-gray-700">• Focus on retention to boost LTV</li>
                            )}
                            {Number(inputs.cvr) < 3 && (
                              <li className="text-xs text-gray-700">• Optimize landing pages for CVR</li>
                            )}
                            {Number(inputs.cogs) > 33 && (
                              <li className="text-xs text-gray-700">• Negotiate with suppliers</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
