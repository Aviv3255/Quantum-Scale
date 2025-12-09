'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ChevronLeft, ChevronRight, TrendingUp, Rocket } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// MONKEY VIDEO STATES - 18 levels (1=worst, 18=best)
// State calculation: Based on profit size + margin health
// ═══════════════════════════════════════════════════════════════════════════════
const MONKEY_VIDEOS = [
  { id: 1, name: 'Homeless', url: 'https://cdn.shopify.com/videos/c/o/v/639e07e9268a4bf2875c7a8665d2a469.mp4' },
  { id: 2, name: 'Struggling', url: 'https://cdn.shopify.com/videos/c/o/v/8e8b8097e0d74e51a133ea885e86924f.mp4' },
  { id: 3, name: 'Surviving', url: 'https://cdn.shopify.com/videos/c/o/v/0d96734e40dd42aaac6647fcd98b9576.mp4' },
  { id: 4, name: 'Getting By', url: 'https://cdn.shopify.com/videos/c/o/v/5e2b0ef6ef74411e8157fd146a17b137.mp4' },
  { id: 5, name: 'Stable', url: 'https://cdn.shopify.com/videos/c/o/v/a7759003dfca4403b8dd663a60304f82.mp4' },
  { id: 6, name: 'Improving', url: 'https://cdn.shopify.com/videos/c/o/v/16787ad04e6b479db6ba97cf9de8cf68.mp4' },
  { id: 7, name: 'Comfortable', url: 'https://cdn.shopify.com/videos/c/o/v/07a6058a491249d5a7f24712de3e9edc.mp4' },
  { id: 8, name: 'Doing Well', url: 'https://cdn.shopify.com/videos/c/o/v/8c1d9a9490a84309ac84ba909ab49e1c.mp4' },
  { id: 9, name: 'Professional', url: 'https://cdn.shopify.com/videos/c/o/v/d9df1a51b53e47b5b5883c6dea45c0ef.mp4' },
  { id: 10, name: 'Established', url: 'https://cdn.shopify.com/videos/c/o/v/463041b48b3a496f85ce1d969dd1c6bb.mp4' },
  { id: 11, name: 'Successful', url: 'https://cdn.shopify.com/videos/c/o/v/234b9710ba904b7b93d02f959c365dff.mp4' },
  { id: 12, name: 'Thriving', url: 'https://cdn.shopify.com/videos/c/o/v/c961d8e551c64e5780efadc19c799eab.mp4' },
  { id: 13, name: 'Wealthy', url: 'https://cdn.shopify.com/videos/c/o/v/c343d8c0801147c990fc89db9dfe91bd.mp4' },
  { id: 14, name: 'Rich', url: 'https://cdn.shopify.com/videos/c/o/v/e7c2f5e913124c4396e00b8ce587aa8a.mp4' },
  { id: 15, name: 'Elite', url: 'https://cdn.shopify.com/videos/c/o/v/6bda13bfa2894e13a407c1f99f7dd742.mp4' },
  { id: 16, name: 'Mogul', url: 'https://cdn.shopify.com/videos/c/o/v/2a47ae17ae184f66972ef1923ec75455.mp4' },
  { id: 17, name: 'Tycoon', url: 'https://cdn.shopify.com/videos/c/o/v/46966eb60df241cf95bc4a5d4f22e7cf.mp4' },
  { id: 18, name: 'Empire', url: 'https://cdn.shopify.com/videos/c/o/v/f19366a8a038416888b2d781b50e67f6.mp4' },
];

// Calculate monkey state (1-18) based on profit and margin
function calculateMonkeyState(monthlyProfit: number, profitMargin: number): number {
  // Scoring: 60% weight on profit, 40% on margin
  // Profit score: -10k or less = 0, 50k+ = 100
  const profitScore = Math.min(100, Math.max(0, (monthlyProfit + 10000) / 600));

  // Margin score: <0% = 0, 40%+ = 100
  const marginScore = Math.min(100, Math.max(0, profitMargin * 2.5));

  // Combined score (0-100)
  const combinedScore = (profitScore * 0.6) + (marginScore * 0.4);

  // Map to state 1-18
  const state = Math.max(1, Math.min(18, Math.ceil(combinedScore / 100 * 18)));
  return state;
}

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
    const duration = 600;
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

  // Update monkey state based on profit + margin (1=worst, 18=best)
  useEffect(() => {
    const newState = calculateMonkeyState(results.netProfit, results.profitMargin);
    if (newState !== currentMonkeyState) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentMonkeyState(newState);
        setIsTransitioning(false);
      }, 300);
    }
  }, [results.netProfit, results.profitMargin, currentMonkeyState]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-[#1a1a1a] border-t-transparent rounded-full" />
      </div>
    );
  }

  const slides = ['Profit Analysis', 'Future Projection', 'KPI X-Ray', 'Scale Readiness'];
  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const currentMonkey = MONKEY_VIDEOS[currentMonkeyState - 1]; // -1 because array is 0-indexed

  const handleInputChange = (key: keyof CalcInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [key]: typeof value === 'string' ? (Number(value) || 0) : value }));
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-60px)] flex flex-col bg-white">
        {/* TOP SECTION - 60% - Video and Metrics */}
        <div className="flex flex-row" style={{ flex: '0 0 60%' }}>
          {/* Center - Monkey Video (Full Size, No Shadows) */}
          <div className="flex-1 flex items-center justify-center bg-white p-4">
            <div className="relative w-full h-full max-w-xl flex items-center justify-center">
              <motion.div
                animate={{ opacity: isTransitioning ? 0 : 1 }}
                transition={{ duration: 0.4 }}
                className="w-full aspect-square rounded-2xl overflow-hidden"
              >
                <video
                  ref={videoRef}
                  key={currentMonkey?.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-2xl"
                >
                  <source src={currentMonkey?.url} type="video/mp4" />
                </video>

                {/* Minimal status badge */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: currentMonkeyState >= 13 ? '#22c55e' : currentMonkeyState >= 7 ? '#f59e0b' : '#ef4444'
                      }}
                    />
                    <span className="text-white text-xs font-medium">{currentMonkey?.name}</span>
                    <span className="text-white/40 text-[10px] ml-auto">Level {currentMonkeyState}/18</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right - Key Metrics (No Cards, Just Numbers) */}
          <div className="w-72 xl:w-80 p-6 flex flex-col justify-center bg-white">
            {/* Net Profit */}
            <div className="mb-6">
              <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest mb-1">Net Profit / Month</p>
              <p className="text-3xl xl:text-4xl font-semibold tracking-tight" style={{ color: results.netProfit >= 0 ? '#1a1a1a' : '#dc2626' }}>
                <AnimatedNumber value={results.netProfit} prefix={CURRENCIES[inputs.currency]} />
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">Daily: {fmt(results.daily.profit)}</p>
            </div>

            {/* Profit Margin */}
            <div className="mb-6">
              <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest mb-1">Profit Margin</p>
              <p className="text-3xl xl:text-4xl font-semibold tracking-tight" style={{ color: results.profitMargin >= 20 ? '#1a1a1a' : results.profitMargin >= 0 ? '#1a1a1a' : '#dc2626' }}>
                <AnimatedNumber value={results.profitMargin} suffix="%" decimals={1} />
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">Target: 20%+</p>
            </div>

            {/* Future Profit */}
            <div className="mb-6">
              <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest mb-1">Future Monthly Profit</p>
              <p className="text-3xl xl:text-4xl font-semibold tracking-tight text-neutral-900">
                <AnimatedNumber value={results.futureMonthlyProfit} prefix={CURRENCIES[inputs.currency]} />
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">Based on {results.highestLTV.period} LTV</p>
            </div>

            {/* Health Score */}
            <div>
              <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest mb-1">Business Health</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl xl:text-4xl font-semibold tracking-tight text-neutral-900">
                  <AnimatedNumber value={results.healthScore} />
                </p>
                <span className="text-sm text-neutral-300">/100</span>
              </div>
              <div className="mt-2 h-1 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${results.healthScore}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: results.healthScore >= 70 ? '#22c55e' : results.healthScore >= 40 ? '#f59e0b' : '#ef4444'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION - 40% - Inputs and Results */}
        <div className="flex flex-row" style={{ flex: '0 0 40%' }}>
          {/* Left - Data Input Panel (Pure Black, No Scroll) */}
          <div className="w-80 xl:w-96 p-4 xl:p-5 flex flex-col" style={{ background: '#000000' }}>
            <div className="flex-1 flex flex-col gap-3">
              {/* Row 1: Revenue & AOV */}
              <div className="grid grid-cols-2 gap-2">
                <InputField label="Monthly Revenue" value={inputs.monthlyRevenue} onChange={(v) => handleInputChange('monthlyRevenue', v)} prefix="$" />
                <InputField label="AOV" value={inputs.aov} onChange={(v) => handleInputChange('aov', v)} prefix="$" />
              </div>

              {/* Row 2: CAC & Ad Spend */}
              <div className="grid grid-cols-2 gap-2">
                <InputField label="CAC" value={inputs.cac} onChange={(v) => handleInputChange('cac', v)} prefix="$" />
                <InputField label="Ad Spend" value={inputs.adSpend} onChange={(v) => handleInputChange('adSpend', v)} prefix="$" />
              </div>

              {/* Row 3: COGS, Fees, Other */}
              <div className="grid grid-cols-3 gap-2">
                <InputField label="COGS %" value={inputs.cogs} onChange={(v) => handleInputChange('cogs', v)} />
                <InputField label="Fees %" value={inputs.processingFees} onChange={(v) => handleInputChange('processingFees', v)} step={0.1} />
                <InputField label="Other" value={inputs.otherCosts} onChange={(v) => handleInputChange('otherCosts', v)} prefix="$" />
              </div>

              {/* Row 4: LTV Values */}
              <div>
                <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1.5">LTV by Period</p>
                <div className="grid grid-cols-5 gap-1.5">
                  {[
                    { key: 'ltv1m' as const, label: '1M' },
                    { key: 'ltv3m' as const, label: '3M' },
                    { key: 'ltv6m' as const, label: '6M' },
                    { key: 'ltv12m' as const, label: '12M' },
                    { key: 'ltv24m' as const, label: '24M' },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="text-[8px] text-white/50 mb-0.5 block text-center">{label}</label>
                      <input
                        type="number"
                        value={inputs[key]}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded py-1.5 text-white text-[11px] text-center focus:outline-none focus:border-white/40"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 5: Currency */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] text-white/50 mb-1 block">Currency</label>
                  <select
                    value={inputs.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded py-1.5 text-white text-[11px] focus:outline-none focus:border-white/40"
                  >
                    {Object.keys(CURRENCIES).map(c => (
                      <option key={c} value={c} className="bg-black text-white">{c}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <div className="w-full py-1.5 px-2 rounded bg-white/5 border border-white/10">
                    <p className="text-[9px] text-white/40">Orders/mo</p>
                    <p className="text-white text-sm font-medium">{Math.round(results.monthly.orders)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Results Slider (Premium Design) */}
          <div className="flex-1 bg-white p-5 flex flex-col border-l border-neutral-100">
            {/* Slider Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-neutral-900 tracking-tight">{slides[activeSlide]}</h2>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 mr-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className={`h-1 rounded-full transition-all duration-300 ${i === activeSlide ? 'bg-neutral-900 w-4' : 'bg-neutral-200 w-1 hover:bg-neutral-300'}`}
                    />
                  ))}
                </div>
                <button onClick={prevSlide} className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center hover:border-neutral-300 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-neutral-500" />
                </button>
                <button onClick={nextSlide} className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-800 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>

            {/* Slides Container */}
            <div className="flex-1 overflow-hidden">
              <div className="flex transition-transform duration-500 ease-out h-full" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                {/* Slide 1: Profit Analysis */}
                <div className="w-full flex-shrink-0 pr-4">
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <PremiumMetricCard label="Daily Revenue" value={fmt(results.daily.revenue)} />
                    <PremiumMetricCard label="Daily Profit" value={fmt(results.daily.profit)} highlight={results.daily.profit >= 0 ? 'positive' : 'negative'} />
                    <PremiumMetricCard label="Monthly Revenue" value={fmt(results.monthly.revenue)} />
                    <PremiumMetricCard label="Monthly Profit" value={fmt(results.netProfit)} highlight={results.netProfit >= 0 ? 'positive' : 'negative'} />
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wider mb-2">Cost Breakdown</p>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: 'COGS', value: results.breakdown.cogs, pct: Math.round((results.breakdown.cogs / results.totalCosts) * 100) },
                        { label: 'Ad Spend', value: results.breakdown.adSpend, pct: Math.round((results.breakdown.adSpend / results.totalCosts) * 100) },
                        { label: 'Processing', value: results.breakdown.processing, pct: Math.round((results.breakdown.processing / results.totalCosts) * 100) },
                        { label: 'Other', value: results.breakdown.other, pct: Math.round((results.breakdown.other / results.totalCosts) * 100) },
                      ].map((item, i) => (
                        <div key={i} className="p-2.5 rounded-lg border border-neutral-100 bg-neutral-50/50">
                          <p className="text-[9px] text-neutral-400 mb-1">{item.label}</p>
                          <p className="text-sm font-medium text-neutral-900">{fmt(item.value)}</p>
                          <p className="text-[9px] text-neutral-300">{item.pct || 0}% of costs</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Slide 2: Future Projection */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {results.ltvProjections.map((ltv, i) => {
                      const isHighest = ltv.period === results.highestLTV.period;
                      return (
                        <div
                          key={i}
                          className={`p-3 rounded-lg text-center border transition-all ${isHighest ? 'border-neutral-900 bg-neutral-900' : 'border-neutral-100 bg-white hover:border-neutral-200'}`}
                        >
                          <p className={`text-[9px] font-medium mb-1 ${isHighest ? 'text-white/60' : 'text-neutral-400'}`}>{ltv.period}</p>
                          <p className={`text-sm font-semibold ${isHighest ? 'text-white' : ltv.profit >= 0 ? 'text-neutral-900' : 'text-red-600'}`}>
                            {fmt(ltv.profit)}
                          </p>
                          <p className={`text-[9px] ${isHighest ? 'text-white/40' : 'text-neutral-300'}`}>{ltv.margin.toFixed(1)}%</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-4 rounded-lg border border-neutral-100 bg-neutral-50/30">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] text-neutral-400">Future Monthly Profit ({results.highestLTV.period} LTV)</p>
                        <p className="text-xl font-semibold text-neutral-900">{fmt(results.futureMonthlyProfit)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide 3: KPI X-Ray */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="grid grid-cols-3 gap-2">
                    {results.kpiAnalysis.map((kpi, i) => (
                      <div key={i} className="p-3 rounded-lg border border-neutral-100 bg-white">
                        <div className="flex items-center gap-1.5 mb-2">
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: kpi.status === 'green' ? '#22c55e' : kpi.status === 'amber' ? '#f59e0b' : '#ef4444' }}
                          />
                          <span className="text-[10px] text-neutral-500">{kpi.name}</span>
                        </div>
                        <p className="text-lg font-semibold text-neutral-900">
                          {kpi.value.toFixed(kpi.unit === '%' || kpi.unit === 'x' ? 1 : 0)}{kpi.unit}
                        </p>
                        <p className="text-[9px] text-neutral-300 mt-1">
                          Target: {kpi.direction === 'higher' ? '≥' : '≤'} {kpi.target}{kpi.unit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slide 4: Scale Readiness */}
                <div className="w-full flex-shrink-0 pl-4">
                  <div className={`p-4 rounded-lg border mb-3 ${results.readyToScale ? 'border-green-200 bg-green-50/50' : 'border-neutral-200 bg-neutral-50/50'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${results.readyToScale ? 'bg-green-500' : 'bg-neutral-300'}`}>
                        <Rocket className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-neutral-900">{results.readyToScale ? 'Ready to Scale' : 'Not Ready Yet'}</p>
                        <p className="text-[11px] text-neutral-400">{results.readyToScale ? 'Healthy fundamentals for scaling' : 'Improve the metrics below first'}</p>
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
                      <div key={i} className={`p-2.5 rounded-lg border flex items-center gap-2 ${item.ok ? 'border-green-200 bg-green-50/30' : 'border-neutral-100 bg-white'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${item.ok ? 'bg-green-500 text-white' : 'bg-neutral-200 text-neutral-400'}`}>
                          {item.ok ? '✓' : '–'}
                        </div>
                        <span className={`text-[11px] ${item.ok ? 'text-green-700' : 'text-neutral-400'}`}>{item.label}</span>
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
      <label className="text-[9px] text-white/60 mb-1 block">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-white/40">{prefix}</span>}
        <input
          type="number"
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-white/10 border border-white/20 rounded py-1.5 text-white text-[11px] focus:outline-none focus:border-white/40 ${prefix ? 'pl-4 pr-2' : suffix ? 'pl-2 pr-4' : 'px-2'}`}
        />
        {suffix && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-white/40">{suffix}</span>}
      </div>
    </div>
  );
}

function PremiumMetricCard({ label, value, highlight }: { label: string; value: string; highlight?: 'positive' | 'negative' }) {
  return (
    <div className="p-3 rounded-lg border border-neutral-100 bg-white">
      <p className="text-[9px] text-neutral-400 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-base font-semibold ${highlight === 'negative' ? 'text-red-600' : 'text-neutral-900'}`}>{value}</p>
    </div>
  );
}
