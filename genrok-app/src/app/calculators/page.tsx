'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ChevronLeft, ChevronRight, TrendingUp, Target, Zap, Rocket, BarChart3 } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// MONKEY VIDEO STATES - 18 levels from struggling to empire
// ═══════════════════════════════════════════════════════════════════════════════
const MONKEY_VIDEOS = [
  { id: 1, name: 'Homeless', url: 'https://cdn.shopify.com/videos/c/o/v/639e07e9268a4bf2875c7a8665d2a469.mp4', minMargin: -Infinity, maxMargin: -50 },
  { id: 2, name: 'Struggling', url: 'https://cdn.shopify.com/videos/c/o/v/8e8b8097e0d74e51a133ea885e86924f.mp4', minMargin: -50, maxMargin: -30 },
  { id: 3, name: 'Surviving', url: 'https://cdn.shopify.com/videos/c/o/v/0d96734e40dd42aaac6647fcd98b9576.mp4', minMargin: -30, maxMargin: -15 },
  { id: 4, name: 'Getting By', url: 'https://cdn.shopify.com/videos/c/o/v/5e2b0ef6ef74411e8157fd146a17b137.mp4', minMargin: -15, maxMargin: -5 },
  { id: 5, name: 'Stable', url: 'https://cdn.shopify.com/videos/c/o/v/a7759003dfca4403b8dd663a60304f82.mp4', minMargin: -5, maxMargin: 5 },
  { id: 6, name: 'Improving', url: 'https://cdn.shopify.com/videos/c/o/v/16787ad04e6b479db6ba97cf9de8cf68.mp4', minMargin: 5, maxMargin: 10 },
  { id: 7, name: 'Comfortable', url: 'https://cdn.shopify.com/videos/c/o/v/07a6058a491249d5a7f24712de3e9edc.mp4', minMargin: 10, maxMargin: 15 },
  { id: 8, name: 'Doing Well', url: 'https://cdn.shopify.com/videos/c/o/v/8c1d9a9490a84309ac84ba909ab49e1c.mp4', minMargin: 15, maxMargin: 20 },
  { id: 9, name: 'Professional', url: 'https://cdn.shopify.com/videos/c/o/v/d9df1a51b53e47b5b5883c6dea45c0ef.mp4', minMargin: 20, maxMargin: 25 },
  { id: 10, name: 'Established', url: 'https://cdn.shopify.com/videos/c/o/v/463041b48b3a496f85ce1d969dd1c6bb.mp4', minMargin: 25, maxMargin: 30 },
  { id: 11, name: 'Successful', url: 'https://cdn.shopify.com/videos/c/o/v/234b9710ba904b7b93d02f959c365dff.mp4', minMargin: 30, maxMargin: 35 },
  { id: 12, name: 'Thriving', url: 'https://cdn.shopify.com/videos/c/o/v/c961d8e551c64e5780efadc19c799eab.mp4', minMargin: 35, maxMargin: 40 },
  { id: 13, name: 'Wealthy', url: 'https://cdn.shopify.com/videos/c/o/v/c343d8c0801147c990fc89db9dfe91bd.mp4', minMargin: 40, maxMargin: 45 },
  { id: 14, name: 'Rich', url: 'https://cdn.shopify.com/videos/c/o/v/e7c2f5e913124c4396e00b8ce587aa8a.mp4', minMargin: 45, maxMargin: 50 },
  { id: 15, name: 'Elite', url: 'https://cdn.shopify.com/videos/c/o/v/6bda13bfa2894e13a407c1f99f7dd742.mp4', minMargin: 50, maxMargin: 55 },
  { id: 16, name: 'Mogul', url: 'https://cdn.shopify.com/videos/c/o/v/2a47ae17ae184f66972ef1923ec75455.mp4', minMargin: 55, maxMargin: 60 },
  { id: 17, name: 'Tycoon', url: 'https://cdn.shopify.com/videos/c/o/v/46966eb60df241cf95bc4a5d4f22e7cf.mp4', minMargin: 60, maxMargin: 70 },
  { id: 18, name: 'Empire', url: 'https://cdn.shopify.com/videos/c/o/v/f19366a8a038416888b2d781b50e67f6.mp4', minMargin: 70, maxMargin: Infinity },
];

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════
interface CalcInputs {
  monthlyRevenue: number;
  aov: number;
  cac: number;
  cogs: number;
  adSpend: number;
  processingFees: number;
  otherCosts: number;
  ltv1m: number;
  ltv3m: number;
  ltv6m: number;
  ltv12m: number;
  ltv24m: number;
  currency: string;
}

interface AllResults {
  daily: { revenue: number; profit: number; orders: number };
  monthly: { revenue: number; profit: number; orders: number; margin: number };
  grossProfit: number;
  netProfit: number;
  profitMargin: number;
  healthScore: number;
  futureMonthlyProfit: number;
  highestLTV: { period: string; value: number; months: number };
  ltvProjections: Array<{ period: string; value: number; months: number; profit: number; margin: number; revenue: number }>;
  scaleReadiness: { profitMarginOk: boolean; ltvCacOk: boolean; grossMarginOk: boolean; consistentRevenue: boolean };
  readyToScale: boolean;
  kpiAnalysis: Array<{ name: string; value: number; target: number; direction: string; unit: string; status: string }>;
  totalCosts: number;
  breakdown: { cogs: number; adSpend: number; processing: number; other: number };
}

// ═══════════════════════════════════════════════════════════════════════════════
// CURRENCIES
// ═══════════════════════════════════════════════════════════════════════════════
const CURRENCIES: Record<string, string> = {
  USD: '$', EUR: '€', GBP: '£', ILS: '₪', AUD: 'A$',
  CAD: 'C$', JPY: '¥', BRL: 'R$', MXN: '$', ZAR: 'R'
};

const RATES: Record<string, number> = {
  USD: 1, EUR: 0.85, GBP: 0.73, ILS: 3.25, AUD: 1.35,
  CAD: 1.25, JPY: 110, BRL: 5.2, MXN: 20, ZAR: 14.5
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED NUMBER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0 }: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);

  useEffect(() => {
    const startValue = previousValue.current;
    const endValue = value;
    const duration = 800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (endValue - startValue) * easeOutQuart;
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        previousValue.current = endValue;
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  const formattedValue = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.round(displayValue).toLocaleString();

  return <span>{prefix}{formattedValue}{suffix}</span>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CALCULATOR ENGINE
// ═══════════════════════════════════════════════════════════════════════════════
function useCalculations(inputs: CalcInputs): AllResults {
  return useMemo(() => {
    const { monthlyRevenue, aov, cac, cogs, adSpend, processingFees, otherCosts, ltv1m, ltv3m, ltv6m, ltv12m, ltv24m } = inputs;

    const monthlyOrders = aov > 0 ? monthlyRevenue / aov : 0;
    const grossProfit = monthlyRevenue - (monthlyRevenue * (cogs / 100));
    const processingCost = monthlyRevenue * (processingFees / 100);
    const totalCosts = (monthlyRevenue * (cogs / 100)) + adSpend + processingCost + otherCosts;
    const netProfit = monthlyRevenue - totalCosts;
    const profitMargin = monthlyRevenue > 0 ? (netProfit / monthlyRevenue) * 100 : 0;

    const dailyRevenue = monthlyRevenue / 30;
    const dailyProfit = netProfit / 30;
    const dailyOrders = monthlyOrders / 30;

    const ltvValues = [
      { period: '1M', value: ltv1m, months: 1 },
      { period: '3M', value: ltv3m, months: 3 },
      { period: '6M', value: ltv6m, months: 6 },
      { period: '12M', value: ltv12m, months: 12 },
      { period: '24M', value: ltv24m, months: 24 },
    ];

    const highestLTV = ltvValues.reduce((max, curr) => curr.value > max.value ? curr : max, ltvValues[0]);
    const monthlyCustomers = monthlyOrders;
    const futureMonthlyProfit = (monthlyCustomers * highestLTV.value) - adSpend - (monthlyCustomers * highestLTV.value * (cogs / 100)) - (monthlyCustomers * highestLTV.value * (processingFees / 100)) - otherCosts;

    const ltvProjections = ltvValues.map(ltv => {
      const cohortRevenue = monthlyCustomers * ltv.value;
      const cohortCosts = (cohortRevenue * (cogs / 100)) + adSpend + (cohortRevenue * (processingFees / 100));
      const cohortProfit = cohortRevenue - cohortCosts;
      const margin = cohortRevenue > 0 ? (cohortProfit / cohortRevenue) * 100 : 0;
      return { ...ltv, profit: cohortProfit, margin, revenue: cohortRevenue };
    });

    const healthFactors = {
      profitMargin: Math.min(Math.max((profitMargin + 20) * 2, 0), 40),
      ltvToCac: cac > 0 ? Math.min((highestLTV.value / cac) * 5, 30) : 0,
      grossMargin: Math.min((100 - cogs) * 0.3, 30),
    };
    const healthScore = Math.round(healthFactors.profitMargin + healthFactors.ltvToCac + healthFactors.grossMargin);

    const scaleReadiness = {
      profitMarginOk: profitMargin >= 15,
      ltvCacOk: cac > 0 && highestLTV.value / cac >= 3,
      grossMarginOk: (100 - cogs) >= 50,
      consistentRevenue: monthlyRevenue >= 10000,
    };
    const readyToScale = Object.values(scaleReadiness).filter(Boolean).length >= 3;

    const kpiAnalysis = [
      { name: 'Profit Margin', value: profitMargin, target: 20, direction: 'higher', unit: '%' },
      { name: 'LTV:CAC Ratio', value: cac > 0 ? highestLTV.value / cac : 0, target: 3, direction: 'higher', unit: 'x' },
      { name: 'Gross Margin', value: 100 - cogs, target: 50, direction: 'higher', unit: '%' },
      { name: 'CAC', value: cac, target: aov * 0.3, direction: 'lower', unit: CURRENCIES[inputs.currency] },
      { name: 'COGS', value: cogs, target: 33, direction: 'lower', unit: '%' },
      { name: 'Processing Fees', value: processingFees, target: 3, direction: 'lower', unit: '%' },
    ].map(kpi => ({
      ...kpi,
      status: kpi.direction === 'higher'
        ? kpi.value >= kpi.target ? 'green' : kpi.value >= kpi.target * 0.8 ? 'amber' : 'red'
        : kpi.value <= kpi.target ? 'green' : kpi.value <= kpi.target * 1.2 ? 'amber' : 'red'
    }));

    return {
      daily: { revenue: dailyRevenue, profit: dailyProfit, orders: dailyOrders },
      monthly: { revenue: monthlyRevenue, profit: netProfit, orders: monthlyOrders, margin: profitMargin },
      grossProfit,
      netProfit,
      profitMargin,
      healthScore: Math.min(healthScore, 100),
      futureMonthlyProfit,
      highestLTV,
      ltvProjections,
      scaleReadiness,
      readyToScale,
      kpiAnalysis,
      totalCosts,
      breakdown: {
        cogs: monthlyRevenue * (cogs / 100),
        adSpend,
        processing: processingCost,
        other: otherCosts,
      }
    };
  }, [inputs]);
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function CalculatorsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentMonkeyState, setCurrentMonkeyState] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [inputs, setInputs] = useState<CalcInputs>({
    monthlyRevenue: 30000,
    aov: 60,
    cac: 25,
    cogs: 35,
    adSpend: 15000,
    processingFees: 2.9,
    otherCosts: 2000,
    ltv1m: 60,
    ltv3m: 120,
    ltv6m: 200,
    ltv12m: 350,
    ltv24m: 500,
    currency: 'USD',
  });

  const results = useCalculations(inputs);

  const fmt = useCallback((amount: number) => {
    const converted = amount * RATES[inputs.currency];
    return `${CURRENCIES[inputs.currency]}${Math.round(converted).toLocaleString()}`;
  }, [inputs.currency]);

  // Update monkey state based on profit margin
  useEffect(() => {
    const profitMargin = results.profitMargin;
    const newMonkeyState = MONKEY_VIDEOS.findIndex(
      m => profitMargin >= m.minMargin && profitMargin < m.maxMargin
    );
    if (newMonkeyState !== -1 && newMonkeyState !== currentMonkeyState) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentMonkeyState(newMonkeyState);
        setIsTransitioning(false);
      }, 300);
    }
  }, [results.profitMargin, currentMonkeyState]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-[#007AFF] border-t-transparent rounded-full" />
      </div>
    );
  }

  const slides = ['Profit Analysis', 'Future Projection', 'KPI X-Ray', 'Scale Readiness'];
  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const currentMonkey = MONKEY_VIDEOS[currentMonkeyState];

  const handleInputChange = (key: keyof CalcInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [key]: typeof value === 'string' ? (Number(value) || 0) : value }));
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-60px)] flex flex-col" style={{ background: '#FAFAFA' }}>
        {/* TOP SECTION - 60% viewport with video and metrics */}
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row relative overflow-hidden" style={{ flex: '0 0 60%' }}>
          {/* Left side icons */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-3">
            <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5 text-gray-600" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
              <Target className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Center - Monkey Video */}
          <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
            <div className="relative w-full max-w-md aspect-square">
              <motion.div
                animate={{ opacity: isTransitioning ? 0 : 1, scale: isTransitioning ? 0.95 : 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  background: 'linear-gradient(145deg, #1a1a1a, #0a0a0a)',
                  boxShadow: '0 25px 80px rgba(0,0,0,0.3), 0 10px 30px rgba(0,0,0,0.2)'
                }}
              >
                <video
                  ref={videoRef}
                  key={currentMonkey?.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  style={{ borderRadius: '24px' }}
                >
                  <source src={currentMonkey?.url} type="video/mp4" />
                </video>

                {/* Status badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div
                    className="px-4 py-2 rounded-xl backdrop-blur-md flex items-center gap-2"
                    style={{
                      background: 'rgba(0,0,0,0.6)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{
                        background: results.profitMargin >= 20 ? '#22c55e' : results.profitMargin >= 0 ? '#f59e0b' : '#ef4444'
                      }}
                    />
                    <span className="text-white text-sm font-medium">{currentMonkey?.name}</span>
                    <span className="text-white/50 text-xs ml-auto">Level {currentMonkeyState + 1}/18</span>
                  </div>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 blur-2xl" />
            </div>
          </div>

          {/* Right side - Key Metrics */}
          <div className="lg:w-80 xl:w-96 p-4 lg:p-6 flex flex-col justify-center gap-3">
            {/* Net Profit */}
            <div className="p-4 rounded-2xl bg-white" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.05)' }}>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Net Profit / Month</p>
              <p className="text-2xl xl:text-3xl font-bold transition-colors duration-300" style={{ color: results.netProfit >= 0 ? '#22c55e' : '#ef4444' }}>
                <AnimatedNumber value={results.netProfit} prefix={CURRENCIES[inputs.currency]} />
              </p>
              <p className="text-[10px] text-gray-400 mt-1">Daily: {fmt(results.daily.profit)}</p>
            </div>

            {/* Profit Margin */}
            <div className="p-4 rounded-2xl bg-white" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.05)' }}>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Profit Margin</p>
              <p className="text-2xl xl:text-3xl font-bold transition-colors duration-300" style={{ color: results.profitMargin >= 20 ? '#22c55e' : results.profitMargin >= 0 ? '#f59e0b' : '#ef4444' }}>
                <AnimatedNumber value={results.profitMargin} suffix="%" decimals={1} />
              </p>
              <p className="text-[10px] text-gray-400 mt-1">Target: 20%+</p>
            </div>

            {/* Future Profit */}
            <div className="p-4 rounded-2xl bg-white" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.05)' }}>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Future Monthly Profit</p>
              <p className="text-2xl xl:text-3xl font-bold text-gray-900">
                <AnimatedNumber value={results.futureMonthlyProfit} prefix={CURRENCIES[inputs.currency]} />
              </p>
              <p className="text-[10px] text-gray-400 mt-1">Based on {results.highestLTV.period} LTV</p>
            </div>

            {/* Health Score */}
            <div className="p-4 rounded-2xl bg-white" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.05)' }}>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Business Health</p>
              <div className="flex items-end gap-2">
                <p className="text-2xl xl:text-3xl font-bold text-gray-900">
                  <AnimatedNumber value={results.healthScore} />
                </p>
                <span className="text-sm text-gray-400 mb-1">/100</span>
              </div>
              <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${results.healthScore}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: results.healthScore >= 70 ? 'linear-gradient(90deg, #22c55e, #10b981)' :
                               results.healthScore >= 40 ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' :
                               'linear-gradient(90deg, #ef4444, #dc2626)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION - 40% viewport with inputs and results slider */}
        <div className="flex flex-col lg:flex-row" style={{ flex: '0 0 40%', minHeight: 0 }}>
          {/* Left - Data Input Panel (Dark) */}
          <div className="lg:w-[380px] xl:w-[420px] p-5 overflow-y-auto" style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)' }}>
            {/* Section selector */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-white/40 text-xs">Sections</span>
              <div className="flex gap-1 ml-2">
                {['1', '2', '3', '4'].map((num, i) => (
                  <button
                    key={num}
                    className={`w-7 h-7 rounded-lg text-[10px] font-medium transition-all ${i === 0 ? 'bg-white text-black' : 'bg-white/10 text-white/50 hover:bg-white/20'}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* Revenue & Orders */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">Revenue & Orders</h3>
                <div className="grid grid-cols-2 gap-2">
                  <InputField label="Monthly Revenue" value={inputs.monthlyRevenue} onChange={(v) => handleInputChange('monthlyRevenue', v)} prefix="$" />
                  <InputField label="AOV" value={inputs.aov} onChange={(v) => handleInputChange('aov', v)} prefix="$" />
                </div>
              </div>

              {/* Acquisition */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">Acquisition</h3>
                <div className="grid grid-cols-2 gap-2">
                  <InputField label="CAC" value={inputs.cac} onChange={(v) => handleInputChange('cac', v)} prefix="$" />
                  <InputField label="Ad Spend" value={inputs.adSpend} onChange={(v) => handleInputChange('adSpend', v)} prefix="$" />
                </div>
              </div>

              {/* Costs */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">Costs</h3>
                <div className="grid grid-cols-2 gap-2">
                  <InputField label="COGS (%)" value={inputs.cogs} onChange={(v) => handleInputChange('cogs', v)} suffix="%" />
                  <InputField label="Fees (%)" value={inputs.processingFees} onChange={(v) => handleInputChange('processingFees', v)} suffix="%" step={0.1} />
                </div>
                <InputField label="Other Monthly Costs" value={inputs.otherCosts} onChange={(v) => handleInputChange('otherCosts', v)} prefix="$" />
              </div>

              {/* LTV Metrics */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">LTV Metrics</h3>
                <div className="grid grid-cols-5 gap-1.5">
                  {[
                    { key: 'ltv1m' as const, label: '1M' },
                    { key: 'ltv3m' as const, label: '3M' },
                    { key: 'ltv6m' as const, label: '6M' },
                    { key: 'ltv12m' as const, label: '12M' },
                    { key: 'ltv24m' as const, label: '24M' },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="text-[9px] text-white/50 mb-1 block text-center">{label}</label>
                      <input
                        type="number"
                        value={inputs[key]}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-1.5 text-white text-xs text-center focus:outline-none focus:border-white/30"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Currency */}
              <div>
                <label className="text-[10px] text-white/50 mb-1.5 block">Currency</label>
                <select
                  value={inputs.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 text-white text-sm focus:outline-none focus:border-white/30"
                >
                  {Object.keys(CURRENCIES).map(c => (
                    <option key={c} value={c} className="bg-[#1a1a1a]">{c} ({CURRENCIES[c]})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Info card */}
            <div className="mt-5 p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-xs">Real-time Analysis</p>
                  <p className="text-white/70 text-[10px] mt-0.5">Metrics update instantly as you adjust</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Results Slider */}
          <div className="flex-1 bg-white p-5 overflow-hidden flex flex-col">
            {/* Slider Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">{slides[activeSlide]}</h2>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 mr-3">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className={`h-1.5 rounded-full transition-all ${i === activeSlide ? 'bg-gray-900 w-5' : 'bg-gray-300 w-1.5 hover:bg-gray-400'}`}
                    />
                  ))}
                </div>
                <button onClick={prevSlide} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button onClick={nextSlide} className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Slides Container */}
            <div className="flex-1 overflow-hidden">
              <div className="flex transition-transform duration-500 ease-out h-full" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                {/* Slide 1: Profit Analysis */}
                <div className="w-full flex-shrink-0 pr-4">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <MetricCard label="Daily Revenue" value={fmt(results.daily.revenue)} />
                    <MetricCard label="Daily Profit" value={fmt(results.daily.profit)} color={results.daily.profit >= 0 ? '#22c55e' : '#ef4444'} />
                    <MetricCard label="Monthly Revenue" value={fmt(results.monthly.revenue)} />
                    <MetricCard label="Monthly Profit" value={fmt(results.netProfit)} color={results.netProfit >= 0 ? '#22c55e' : '#ef4444'} />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xs font-semibold text-gray-900 mb-2">Cost Breakdown</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: 'COGS', value: results.breakdown.cogs, color: '#ef4444' },
                        { label: 'Ad Spend', value: results.breakdown.adSpend, color: '#f59e0b' },
                        { label: 'Processing', value: results.breakdown.processing, color: '#3b82f6' },
                        { label: 'Other', value: results.breakdown.other, color: '#8b5cf6' },
                      ].map((item, i) => (
                        <div key={i} className="p-2 rounded-lg bg-gray-50">
                          <div className="flex items-center gap-1.5 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                            <span className="text-[10px] text-gray-500">{item.label}</span>
                          </div>
                          <p className="text-sm font-bold text-gray-900">{fmt(item.value)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Slide 2: Future Projection */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="grid grid-cols-5 gap-2">
                    {results.ltvProjections.map((ltv, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl text-center transition-all hover:scale-105"
                        style={{
                          background: ltv.period === results.highestLTV.period ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : '#f9fafb',
                          color: ltv.period === results.highestLTV.period ? 'white' : 'inherit'
                        }}
                      >
                        <p className={`text-[10px] font-semibold mb-1 ${ltv.period === results.highestLTV.period ? 'text-white/80' : 'text-gray-400'}`}>{ltv.period}</p>
                        <p className={`text-sm font-bold mb-0.5 ${ltv.period === results.highestLTV.period ? 'text-white' : ltv.profit >= 0 ? 'text-green-600' : 'text-red-500'}`}>{fmt(ltv.profit)}</p>
                        <p className={`text-[9px] ${ltv.period === results.highestLTV.period ? 'text-white/70' : 'text-gray-400'}`}>{ltv.margin.toFixed(1)}%</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Future Monthly Profit ({results.highestLTV.period} LTV)</p>
                        <p className="text-2xl font-bold text-gray-900">{fmt(results.futureMonthlyProfit)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide 3: KPI X-Ray */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="grid grid-cols-3 gap-2">
                    {results.kpiAnalysis.map((kpi, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl border"
                        style={{
                          background: kpi.status === 'green' ? '#f0fdf4' : kpi.status === 'amber' ? '#fffbeb' : '#fef2f2',
                          borderColor: kpi.status === 'green' ? '#bbf7d0' : kpi.status === 'amber' ? '#fde68a' : '#fecaca'
                        }}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: kpi.status === 'green' ? '#22c55e' : kpi.status === 'amber' ? '#f59e0b' : '#ef4444' }} />
                          <span className="text-[10px] font-medium text-gray-600">{kpi.name}</span>
                        </div>
                        <p className="text-lg font-bold" style={{ color: kpi.status === 'green' ? '#16a34a' : kpi.status === 'amber' ? '#d97706' : '#dc2626' }}>
                          {kpi.value.toFixed(kpi.unit === '%' || kpi.unit === 'x' ? 1 : 0)}{kpi.unit}
                        </p>
                        <p className="text-[9px] text-gray-400">Target: {kpi.direction === 'higher' ? '≥' : '≤'} {kpi.target}{kpi.unit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slide 4: Scale Readiness */}
                <div className="w-full flex-shrink-0 pl-4">
                  <div
                    className="p-4 rounded-xl mb-3"
                    style={{
                      background: results.readyToScale ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' : 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
                      border: `1px solid ${results.readyToScale ? '#bbf7d0' : '#fecaca'}`
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: results.readyToScale ? '#22c55e' : '#ef4444' }}>
                        <Rocket className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-gray-900">{results.readyToScale ? 'Ready to Scale!' : 'Not Ready Yet'}</p>
                        <p className="text-xs text-gray-500">{results.readyToScale ? 'Healthy fundamentals for scaling' : 'Improve factors below first'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Profit Margin ≥15%', ok: results.scaleReadiness.profitMarginOk },
                      { label: 'LTV:CAC ≥3x', ok: results.scaleReadiness.ltvCacOk },
                      { label: 'Gross Margin ≥50%', ok: results.scaleReadiness.grossMarginOk },
                      { label: 'Revenue ≥$10K/mo', ok: results.scaleReadiness.consistentRevenue },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg flex items-center gap-2"
                        style={{ background: item.ok ? '#f0fdf4' : '#f9fafb', border: `1px solid ${item.ok ? '#bbf7d0' : '#e5e7eb'}` }}
                      >
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: item.ok ? '#22c55e' : '#d1d5db' }}>
                          {item.ok ? '✓' : '–'}
                        </div>
                        <span className={`text-xs font-medium ${item.ok ? 'text-green-700' : 'text-gray-500'}`}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════
function InputField({ label, value, onChange, prefix, suffix, step = 1 }: {
  label: string;
  value: number;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
}) {
  return (
    <div>
      <label className="text-[10px] text-white/50 mb-1 block">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-white/40">{prefix}</span>}
        <input
          type="number"
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-white/5 border border-white/10 rounded-lg py-1.5 text-white text-sm focus:outline-none focus:border-white/30 ${prefix ? 'pl-5 pr-2' : suffix ? 'pl-2 pr-5' : 'px-2'}`}
        />
        {suffix && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-white/40">{suffix}</span>}
      </div>
    </div>
  );
}

function MetricCard({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
      <p className="text-[10px] font-medium text-gray-400 uppercase mb-0.5">{label}</p>
      <p className="text-lg font-bold" style={{ color: color || '#1a1a1a' }}>{value}</p>
    </div>
  );
}
