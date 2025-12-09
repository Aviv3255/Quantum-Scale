'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ChevronLeft, ChevronRight, TrendingUp, Rocket, RefreshCw } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// MONKEY VIDEO STATES - 18 levels (1=worst, 18=best)
// Based on Future Monthly Profit thresholds
// Level 1: < $0, Level 5: ~$30K, Level 18: $2M+
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

// Video level thresholds based on Future Monthly Profit (in USD)
// Level 1: < $0, Level 5: $30K, Level 18: $2M+
const PROFIT_THRESHOLDS = [
  0,        // Level 1: < $0
  0,        // Level 2: $0+
  10000,    // Level 3: $10K+
  20000,    // Level 4: $20K+
  25000,    // Level 5: $25K+ (~$30K midpoint)
  35000,    // Level 6: $35K+
  50000,    // Level 7: $50K+
  75000,    // Level 8: $75K+
  100000,   // Level 9: $100K+
  150000,   // Level 10: $150K+
  200000,   // Level 11: $200K+
  300000,   // Level 12: $300K+
  450000,   // Level 13: $450K+
  650000,   // Level 14: $650K+
  900000,   // Level 15: $900K+
  1200000,  // Level 16: $1.2M+
  1500000,  // Level 17: $1.5M+
  2000000,  // Level 18: $2M+
];

// Calculate monkey state (1-18) based on Future Monthly Profit
function calculateMonkeyState(futureMonthlyProfitUSD: number): number {
  if (!isFinite(futureMonthlyProfitUSD) || isNaN(futureMonthlyProfitUSD)) return 1;
  if (futureMonthlyProfitUSD < 0) return 1;

  for (let i = PROFIT_THRESHOLDS.length - 1; i >= 0; i--) {
    if (futureMonthlyProfitUSD >= PROFIT_THRESHOLDS[i]) {
      return Math.min(i + 1, 18);
    }
  }
  return 1;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════
interface CalcInputs {
  aov: number;
  dailyBudget: number;
  ltv1m: number;
  ltv3m: number;
  ltv6m: number;
  ltv12m: number;
  processingFees: number;
  cogs: number;
  currency: string;
  // CPA mode vs CR+CPC mode
  acquisitionMode: 'cpa' | 'crcpc';
  cpa: number;
  conversionRate: number;
  cpc: number;
}

interface AllResults {
  daily: { revenue: number; profit: number; orders: number; adSpend: number };
  monthly: { revenue: number; profit: number; orders: number; margin: number; adSpend: number };
  grossProfit: number;
  netProfit: number;
  profitMargin: number;
  healthScore: number;
  futureMonthlyProfit: number;
  futureMonthlyProfitUSD: number;
  highestLTV: { period: string; value: number; months: number };
  ltvProjections: Array<{ period: string; value: number; months: number; profit: number; margin: number; revenue: number }>;
  scaleReadiness: { profitMarginOk: boolean; ltvCacOk: boolean; grossMarginOk: boolean; consistentRevenue: boolean };
  readyToScale: boolean;
  kpiAnalysis: Array<{ name: string; value: number; target: number; direction: string; unit: string; status: string }>;
  totalCosts: number;
  breakdown: { cogs: number; adSpend: number; processing: number };
  effectiveCPA: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 30 CURRENCIES WITH FLAGS
// ═══════════════════════════════════════════════════════════════════════════════
interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  flag: string; // Country code for flagcdn.com
}

const CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: 'us' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: 'eu' },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: 'gb' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: 'jp' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: 'au' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: 'ca' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc', flag: 'ch' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', flag: 'cn' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', flag: 'hk' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', flag: 'nz' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', flag: 'se' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', flag: 'kr' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: 'sg' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', flag: 'no' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso', flag: 'mx' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: 'in' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble', flag: 'ru' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', flag: 'za' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', flag: 'tr' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', flag: 'br' },
  { code: 'TWD', symbol: 'NT$', name: 'Taiwan Dollar', flag: 'tw' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone', flag: 'dk' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', flag: 'pl' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', flag: 'th' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', flag: 'id' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', flag: 'hu' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', flag: 'cz' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel', flag: 'il' },
  { code: 'CLP', symbol: '$', name: 'Chilean Peso', flag: 'cl' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', flag: 'ph' },
];

// Default rates (fallback if API fails)
const DEFAULT_RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, AUD: 1.53, CAD: 1.36, CHF: 0.88,
  CNY: 7.24, HKD: 7.82, NZD: 1.65, SEK: 10.42, KRW: 1320, SGD: 1.34, NOK: 10.85,
  MXN: 17.15, INR: 83.12, RUB: 92.5, ZAR: 18.65, TRY: 29.2, BRL: 4.97,
  TWD: 31.5, DKK: 6.87, PLN: 3.98, THB: 35.2, IDR: 15650, HUF: 356, CZK: 22.8,
  ILS: 3.72, CLP: 885, PHP: 55.8,
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
  const safeValue = isFinite(value) && !isNaN(value) ? value : 0;
  const [displayValue, setDisplayValue] = useState(safeValue);
  const previousValue = useRef(safeValue);

  useEffect(() => {
    const startValue = previousValue.current;
    const endValue = safeValue;
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
  }, [safeValue]);

  const formattedValue = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.round(displayValue).toLocaleString();

  return <span>{prefix}{formattedValue}{suffix}</span>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CALCULATOR ENGINE
// ═══════════════════════════════════════════════════════════════════════════════
function useCalculations(inputs: CalcInputs, exchangeRate: number): AllResults {
  return useMemo(() => {
    const { aov, dailyBudget, cogs, processingFees, ltv1m, ltv3m, ltv6m, ltv12m, acquisitionMode, cpa, conversionRate, cpc } = inputs;

    // Safe number helper
    const safe = (n: number) => (isFinite(n) && !isNaN(n)) ? n : 0;

    // Calculate effective CPA based on mode
    let effectiveCPA = safe(cpa);
    if (acquisitionMode === 'crcpc') {
      // CPA = CPC / (CR / 100)
      const cr = safe(conversionRate);
      const costPerClick = safe(cpc);
      effectiveCPA = cr > 0 ? costPerClick / (cr / 100) : 0;
    }

    // Monthly ad spend = daily budget * 30
    const monthlyAdSpend = safe(dailyBudget) * 30;

    // Monthly orders = monthly ad spend / CPA
    const monthlyOrders = effectiveCPA > 0 ? monthlyAdSpend / effectiveCPA : 0;

    // Monthly revenue = orders * AOV
    const monthlyRevenue = safe(monthlyOrders) * safe(aov);

    // Costs
    const cogsCost = monthlyRevenue * (safe(cogs) / 100);
    const processingCost = monthlyRevenue * (safe(processingFees) / 100);
    const totalCosts = cogsCost + monthlyAdSpend + processingCost;

    // Profits
    const grossProfit = monthlyRevenue - cogsCost;
    const netProfit = monthlyRevenue - totalCosts;
    const profitMargin = monthlyRevenue > 0 ? (netProfit / monthlyRevenue) * 100 : 0;

    // Daily metrics
    const dailyRevenue = monthlyRevenue / 30;
    const dailyProfit = netProfit / 30;
    const dailyOrders = monthlyOrders / 30;

    // LTV projections
    const ltvValues = [
      { period: '1M', value: safe(ltv1m), months: 1 },
      { period: '3M', value: safe(ltv3m), months: 3 },
      { period: '6M', value: safe(ltv6m), months: 6 },
      { period: '12M', value: safe(ltv12m), months: 12 },
    ];

    const highestLTV = ltvValues.reduce((max, curr) => curr.value > max.value ? curr : max, ltvValues[0]);

    // Future Monthly Profit = (Monthly Customers × Highest LTV) - Ad Spend - COGS% - Processing%
    const futureRevenue = monthlyOrders * highestLTV.value;
    const futureCOGS = futureRevenue * (safe(cogs) / 100);
    const futureProcessing = futureRevenue * (safe(processingFees) / 100);
    const futureMonthlyProfit = futureRevenue - monthlyAdSpend - futureCOGS - futureProcessing;

    // Convert to USD for video level calculation
    const futureMonthlyProfitUSD = exchangeRate > 0 ? futureMonthlyProfit / exchangeRate : futureMonthlyProfit;

    const ltvProjections = ltvValues.map(ltv => {
      const cohortRevenue = monthlyOrders * ltv.value;
      const cohortCOGS = cohortRevenue * (safe(cogs) / 100);
      const cohortProcessing = cohortRevenue * (safe(processingFees) / 100);
      const cohortCosts = cohortCOGS + monthlyAdSpend + cohortProcessing;
      const cohortProfit = cohortRevenue - cohortCosts;
      const margin = cohortRevenue > 0 ? (cohortProfit / cohortRevenue) * 100 : 0;
      return { ...ltv, profit: cohortProfit, margin, revenue: cohortRevenue };
    });

    // Health score
    const healthFactors = {
      profitMargin: Math.min(Math.max((profitMargin + 20) * 2, 0), 40),
      ltvToCac: effectiveCPA > 0 ? Math.min((highestLTV.value / effectiveCPA) * 5, 30) : 0,
      grossMargin: Math.min((100 - safe(cogs)) * 0.3, 30),
    };
    const healthScore = Math.round(healthFactors.profitMargin + healthFactors.ltvToCac + healthFactors.grossMargin);

    // Scale readiness
    const scaleReadiness = {
      profitMarginOk: profitMargin >= 15,
      ltvCacOk: effectiveCPA > 0 && highestLTV.value / effectiveCPA >= 3,
      grossMarginOk: (100 - safe(cogs)) >= 50,
      consistentRevenue: monthlyRevenue >= 10000,
    };
    const readyToScale = Object.values(scaleReadiness).filter(Boolean).length >= 3;

    // KPI Analysis
    const currencySymbol = CURRENCIES.find(c => c.code === inputs.currency)?.symbol || '$';
    const kpiAnalysis = [
      { name: 'Profit Margin', value: safe(profitMargin), target: 20, direction: 'higher', unit: '%' },
      { name: 'LTV:CAC Ratio', value: effectiveCPA > 0 ? safe(highestLTV.value / effectiveCPA) : 0, target: 3, direction: 'higher', unit: 'x' },
      { name: 'Gross Margin', value: 100 - safe(cogs), target: 50, direction: 'higher', unit: '%' },
      { name: 'CPA', value: safe(effectiveCPA), target: safe(aov) * 0.3, direction: 'lower', unit: currencySymbol },
      { name: 'COGS', value: safe(cogs), target: 33, direction: 'lower', unit: '%' },
      { name: 'Processing', value: safe(processingFees), target: 3, direction: 'lower', unit: '%' },
    ].map(kpi => ({
      ...kpi,
      status: kpi.direction === 'higher'
        ? kpi.value >= kpi.target ? 'green' : kpi.value >= kpi.target * 0.8 ? 'amber' : 'red'
        : kpi.value <= kpi.target ? 'green' : kpi.value <= kpi.target * 1.2 ? 'amber' : 'red'
    }));

    return {
      daily: { revenue: safe(dailyRevenue), profit: safe(dailyProfit), orders: safe(dailyOrders), adSpend: safe(dailyBudget) },
      monthly: { revenue: safe(monthlyRevenue), profit: safe(netProfit), orders: safe(monthlyOrders), margin: safe(profitMargin), adSpend: safe(monthlyAdSpend) },
      grossProfit: safe(grossProfit),
      netProfit: safe(netProfit),
      profitMargin: safe(profitMargin),
      healthScore: Math.min(safe(healthScore), 100),
      futureMonthlyProfit: safe(futureMonthlyProfit),
      futureMonthlyProfitUSD: safe(futureMonthlyProfitUSD),
      highestLTV,
      ltvProjections,
      scaleReadiness,
      readyToScale,
      kpiAnalysis,
      totalCosts: safe(totalCosts),
      breakdown: {
        cogs: safe(cogsCost),
        adSpend: safe(monthlyAdSpend),
        processing: safe(processingCost),
      },
      effectiveCPA: safe(effectiveCPA),
    };
  }, [inputs, exchangeRate]);
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

  // Exchange rates
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(DEFAULT_RATES);
  const [ratesLoading, setRatesLoading] = useState(false);
  const [lastRateUpdate, setLastRateUpdate] = useState<Date | null>(null);

  const [inputs, setInputs] = useState<CalcInputs>({
    aov: 60,
    dailyBudget: 500,
    ltv1m: 60,
    ltv3m: 120,
    ltv6m: 200,
    ltv12m: 350,
    processingFees: 2.9,
    cogs: 35,
    currency: 'USD',
    acquisitionMode: 'cpa',
    cpa: 25,
    conversionRate: 2.5,
    cpc: 0.5,
  });

  const currentRate = exchangeRates[inputs.currency] || 1;
  const results = useCalculations(inputs, currentRate);
  const currencyInfo = CURRENCIES.find(c => c.code === inputs.currency) || CURRENCIES[0];

  // Format currency with correct symbol
  const fmt = useCallback((amount: number) => {
    const safeAmount = isFinite(amount) && !isNaN(amount) ? amount : 0;
    return `${currencyInfo.symbol}${Math.round(safeAmount).toLocaleString()}`;
  }, [currencyInfo.symbol]);

  // Fetch exchange rates
  const fetchExchangeRates = useCallback(async () => {
    setRatesLoading(true);
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      if (response.ok) {
        const data = await response.json();
        if (data.rates) {
          setExchangeRates(data.rates);
          setLastRateUpdate(new Date());
        }
      }
    } catch (error) {
      console.warn('Failed to fetch exchange rates, using defaults');
    }
    setRatesLoading(false);
  }, []);

  // Fetch rates on mount
  useEffect(() => {
    fetchExchangeRates();
  }, [fetchExchangeRates]);

  // Update monkey state based on Future Monthly Profit
  useEffect(() => {
    const newState = calculateMonkeyState(results.futureMonthlyProfitUSD);
    if (newState !== currentMonkeyState) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentMonkeyState(newState);
        setIsTransitioning(false);
      }, 300);
    }
  }, [results.futureMonthlyProfitUSD, currentMonkeyState]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-[#1a1a1a] border-t-transparent rounded-full" />
      </div>
    );
  }

  const slides = ['Profit Analysis', 'Future Projection', 'KPI X-Ray', 'Scale Readiness'];
  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const currentMonkey = MONKEY_VIDEOS[currentMonkeyState - 1];

  const handleInputChange = (key: keyof CalcInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [key]: typeof value === 'string' ? (Number(value) || 0) : value }));
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-60px)] w-full flex flex-col bg-white overflow-hidden">
        {/* TOP SECTION - 60% - Video and Metrics */}
        <div className="flex flex-row flex-1" style={{ flex: '0 0 60%' }}>
          {/* Center - Monkey Video (Full Size, No Shadows) */}
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="relative h-full max-h-[90%] aspect-square flex items-center justify-center">
              <motion.div
                animate={{ opacity: isTransitioning ? 0 : 1 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-2xl overflow-hidden"
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

                {/* Level indicator badge */}
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

          {/* Right - Key Metrics */}
          <div className="w-72 xl:w-80 p-4 xl:p-6 flex flex-col justify-center bg-white">
            {/* Net Profit */}
            <div className="mb-5">
              <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest mb-1">Net Profit / Month</p>
              <p className="text-2xl xl:text-3xl font-semibold tracking-tight" style={{ color: results.netProfit >= 0 ? '#1a1a1a' : '#dc2626' }}>
                <AnimatedNumber value={results.netProfit} prefix={currencyInfo.symbol} />
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">Daily: {fmt(results.daily.profit)}</p>
            </div>

            {/* Profit Margin */}
            <div className="mb-5">
              <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest mb-1">Profit Margin</p>
              <p className="text-2xl xl:text-3xl font-semibold tracking-tight" style={{ color: results.profitMargin >= 20 ? '#1a1a1a' : results.profitMargin >= 0 ? '#1a1a1a' : '#dc2626' }}>
                <AnimatedNumber value={results.profitMargin} suffix="%" decimals={1} />
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">Target: 20%+</p>
            </div>

            {/* Future Profit */}
            <div className="mb-5">
              <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest mb-1">Future Monthly Profit</p>
              <p className="text-2xl xl:text-3xl font-semibold tracking-tight text-neutral-900">
                <AnimatedNumber value={results.futureMonthlyProfit} prefix={currencyInfo.symbol} />
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">Based on {results.highestLTV.period} LTV</p>
            </div>

            {/* Health Score */}
            <div>
              <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest mb-1">Business Health</p>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl xl:text-3xl font-semibold tracking-tight text-neutral-900">
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
          {/* Left - Data Input Panel (Pure Black) */}
          <div className="w-80 xl:w-[340px] p-3 xl:p-4 flex flex-col" style={{ background: '#000000' }}>
            {/* Row 1: AOV & Daily Budget */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <InputField label="AOV" value={inputs.aov} onChange={(v) => handleInputChange('aov', v)} prefix={currencyInfo.symbol} />
              <InputField label="Daily Ad Budget" value={inputs.dailyBudget} onChange={(v) => handleInputChange('dailyBudget', v)} prefix={currencyInfo.symbol} />
            </div>

            {/* Row 2: CPA / CR+CPC Toggle */}
            <div className="mb-2">
              <div className="flex gap-1 mb-1.5">
                <button
                  onClick={() => setInputs(prev => ({ ...prev, acquisitionMode: 'cpa' }))}
                  className={`flex-1 py-1 text-[9px] font-medium rounded transition-all ${
                    inputs.acquisitionMode === 'cpa'
                      ? 'bg-white text-black'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  CPA Mode
                </button>
                <button
                  onClick={() => setInputs(prev => ({ ...prev, acquisitionMode: 'crcpc' }))}
                  className={`flex-1 py-1 text-[9px] font-medium rounded transition-all ${
                    inputs.acquisitionMode === 'crcpc'
                      ? 'bg-white text-black'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  CR + CPC Mode
                </button>
              </div>
              {inputs.acquisitionMode === 'cpa' ? (
                <InputField label="CPA (Cost Per Acquisition)" value={inputs.cpa} onChange={(v) => handleInputChange('cpa', v)} prefix={currencyInfo.symbol} />
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <InputField label="CR %" value={inputs.conversionRate} onChange={(v) => handleInputChange('conversionRate', v)} suffix="%" step={0.1} />
                  <InputField label="CPC" value={inputs.cpc} onChange={(v) => handleInputChange('cpc', v)} prefix={currencyInfo.symbol} step={0.01} />
                </div>
              )}
            </div>

            {/* Row 3: LTV Values */}
            <div className="mb-2">
              <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">LTV by Period</p>
              <div className="grid grid-cols-4 gap-1">
                {[
                  { key: 'ltv1m' as const, label: '1M' },
                  { key: 'ltv3m' as const, label: '3M' },
                  { key: 'ltv6m' as const, label: '6M' },
                  { key: 'ltv12m' as const, label: '12M' },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="text-[8px] text-white/50 mb-0.5 block text-center">{label}</label>
                    <input
                      type="number"
                      value={inputs[key]}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded py-1 text-white text-[10px] text-center focus:outline-none focus:border-white/40"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 4: Processing & COGS */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <InputField label="Processing Fees %" value={inputs.processingFees} onChange={(v) => handleInputChange('processingFees', v)} suffix="%" step={0.1} />
              <InputField label="COGS %" value={inputs.cogs} onChange={(v) => handleInputChange('cogs', v)} suffix="%" />
            </div>

            {/* Row 5: Currency Selector */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[9px] text-white/50">Currency</label>
                <button
                  onClick={fetchExchangeRates}
                  disabled={ratesLoading}
                  className="text-[8px] text-white/40 hover:text-white/60 flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className={`w-2.5 h-2.5 ${ratesLoading ? 'animate-spin' : ''}`} />
                  {lastRateUpdate ? `Updated ${lastRateUpdate.toLocaleTimeString()}` : 'Sync rates'}
                </button>
              </div>
              <div className="relative">
                <select
                  value={inputs.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded py-1.5 pl-8 pr-2 text-white text-[11px] focus:outline-none focus:border-white/40 appearance-none cursor-pointer"
                >
                  {CURRENCIES.map(c => (
                    <option key={c.code} value={c.code} className="bg-black text-white">
                      {c.code} - {c.name}
                    </option>
                  ))}
                </select>
                {/* Flag image */}
                <img
                  src={`https://flagcdn.com/w20/${currencyInfo.flag}.png`}
                  srcSet={`https://flagcdn.com/w40/${currencyInfo.flag}.png 2x`}
                  alt={currencyInfo.code}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-3 object-cover rounded-[2px]"
                />
              </div>
            </div>
          </div>

          {/* Right - Results Slider */}
          <div className="flex-1 bg-white p-4 flex flex-col border-l border-neutral-100 overflow-hidden">
            {/* Slider Header */}
            <div className="flex items-center justify-between mb-3">
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
                <button onClick={prevSlide} className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center hover:border-neutral-300 transition-colors">
                  <ChevronLeft className="w-3 h-3 text-neutral-500" />
                </button>
                <button onClick={nextSlide} className="w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-800 transition-colors">
                  <ChevronRight className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>

            {/* Slides Container */}
            <div className="flex-1 overflow-hidden">
              <div className="flex transition-transform duration-500 ease-out h-full" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                {/* Slide 1: Profit Analysis */}
                <div className="w-full flex-shrink-0 pr-4">
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    <PremiumMetricCard label="Daily Revenue" value={fmt(results.daily.revenue)} />
                    <PremiumMetricCard label="Daily Profit" value={fmt(results.daily.profit)} highlight={results.daily.profit >= 0 ? 'positive' : 'negative'} />
                    <PremiumMetricCard label="Monthly Revenue" value={fmt(results.monthly.revenue)} />
                    <PremiumMetricCard label="Monthly Profit" value={fmt(results.netProfit)} highlight={results.netProfit >= 0 ? 'positive' : 'negative'} />
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wider mb-2">Cost Breakdown</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'COGS', value: results.breakdown.cogs, pct: results.totalCosts > 0 ? Math.round((results.breakdown.cogs / results.totalCosts) * 100) : 0 },
                        { label: 'Ad Spend', value: results.breakdown.adSpend, pct: results.totalCosts > 0 ? Math.round((results.breakdown.adSpend / results.totalCosts) * 100) : 0 },
                        { label: 'Processing', value: results.breakdown.processing, pct: results.totalCosts > 0 ? Math.round((results.breakdown.processing / results.totalCosts) * 100) : 0 },
                      ].map((item, i) => (
                        <div key={i} className="p-2 rounded-lg border border-neutral-100 bg-neutral-50/50">
                          <p className="text-[9px] text-neutral-400 mb-1">{item.label}</p>
                          <p className="text-sm font-medium text-neutral-900">{fmt(item.value)}</p>
                          <p className="text-[9px] text-neutral-300">{item.pct}% of costs</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Slide 2: Future Projection */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {results.ltvProjections.map((ltv, i) => {
                      const isHighest = ltv.period === results.highestLTV.period;
                      return (
                        <div
                          key={i}
                          className={`p-2 rounded-lg text-center border transition-all ${isHighest ? 'border-neutral-900 bg-neutral-900' : 'border-neutral-100 bg-white hover:border-neutral-200'}`}
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
                  <div className="p-3 rounded-lg border border-neutral-100 bg-neutral-50/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] text-neutral-400">Future Monthly Profit ({results.highestLTV.period} LTV)</p>
                        <p className="text-lg font-semibold text-neutral-900">{fmt(results.futureMonthlyProfit)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide 3: KPI X-Ray */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="grid grid-cols-3 gap-2">
                    {results.kpiAnalysis.map((kpi, i) => (
                      <div key={i} className="p-2 rounded-lg border border-neutral-100 bg-white">
                        <div className="flex items-center gap-1.5 mb-1">
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: kpi.status === 'green' ? '#22c55e' : kpi.status === 'amber' ? '#f59e0b' : '#ef4444' }}
                          />
                          <span className="text-[9px] text-neutral-500">{kpi.name}</span>
                        </div>
                        <p className="text-base font-semibold text-neutral-900">
                          {kpi.value.toFixed(kpi.unit === '%' || kpi.unit === 'x' ? 1 : 0)}{kpi.unit}
                        </p>
                        <p className="text-[9px] text-neutral-300 mt-0.5">
                          Target: {kpi.direction === 'higher' ? '≥' : '≤'} {kpi.target.toFixed(kpi.unit === '%' || kpi.unit === 'x' ? 0 : 0)}{kpi.unit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slide 4: Scale Readiness */}
                <div className="w-full flex-shrink-0 pl-4">
                  <div className={`p-3 rounded-lg border mb-3 ${results.readyToScale ? 'border-green-200 bg-green-50/50' : 'border-neutral-200 bg-neutral-50/50'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${results.readyToScale ? 'bg-green-500' : 'bg-neutral-300'}`}>
                        <Rocket className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">{results.readyToScale ? 'Ready to Scale' : 'Not Ready Yet'}</p>
                        <p className="text-[10px] text-neutral-400">{results.readyToScale ? 'Healthy fundamentals for scaling' : 'Improve the metrics below first'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Profit Margin ≥15%', ok: results.scaleReadiness.profitMarginOk },
                      { label: 'LTV:CAC ≥3x', ok: results.scaleReadiness.ltvCacOk },
                      { label: 'Gross Margin ≥50%', ok: results.scaleReadiness.grossMarginOk },
                      { label: `Revenue ≥${currencyInfo.symbol}10K/mo`, ok: results.scaleReadiness.consistentRevenue },
                    ].map((item, i) => (
                      <div key={i} className={`p-2 rounded-lg border flex items-center gap-2 ${item.ok ? 'border-green-200 bg-green-50/30' : 'border-neutral-100 bg-white'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${item.ok ? 'bg-green-500 text-white' : 'bg-neutral-200 text-neutral-400'}`}>
                          {item.ok ? '✓' : '–'}
                        </div>
                        <span className={`text-[10px] ${item.ok ? 'text-green-700' : 'text-neutral-400'}`}>{item.label}</span>
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
          className={`w-full bg-white/10 border border-white/20 rounded py-1.5 text-white text-[11px] focus:outline-none focus:border-white/40 ${prefix ? 'pl-5 pr-2' : suffix ? 'pl-2 pr-5' : 'px-2'}`}
        />
        {suffix && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-white/40">{suffix}</span>}
      </div>
    </div>
  );
}

function PremiumMetricCard({ label, value, highlight }: { label: string; value: string; highlight?: 'positive' | 'negative' }) {
  return (
    <div className="p-2 rounded-lg border border-neutral-100 bg-white">
      <p className="text-[9px] text-neutral-400 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-sm font-semibold ${highlight === 'negative' ? 'text-red-600' : 'text-neutral-900'}`}>{value}</p>
    </div>
  );
}
