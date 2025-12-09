'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ChevronLeft, ChevronRight, TrendingUp, Rocket, RefreshCw, Check, X } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// MONKEY VIDEO STATES - 18 levels
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

const PROFIT_THRESHOLDS = [0, 0, 10000, 20000, 25000, 35000, 50000, 75000, 100000, 150000, 200000, 300000, 450000, 650000, 900000, 1200000, 1500000, 2000000];

function calculateMonkeyState(futureMonthlyProfitUSD: number): number {
  if (!isFinite(futureMonthlyProfitUSD) || isNaN(futureMonthlyProfitUSD) || futureMonthlyProfitUSD < 0) return 1;
  for (let i = PROFIT_THRESHOLDS.length - 1; i >= 0; i--) {
    if (futureMonthlyProfitUSD >= PROFIT_THRESHOLDS[i]) return Math.min(i + 1, 18);
  }
  return 1;
}

// Types
interface CalcInputs {
  aov: number; dailyBudget: number; ltv1m: number; ltv3m: number; ltv6m: number; ltv12m: number;
  processingFees: number; cogs: number; currency: string; acquisitionMode: 'cpa' | 'crcpc';
  cpa: number; conversionRate: number; cpc: number;
}

// Currencies
interface CurrencyInfo { code: string; symbol: string; name: string; flag: string; }
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

const DEFAULT_RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, AUD: 1.53, CAD: 1.36, CHF: 0.88, CNY: 7.24, HKD: 7.82, NZD: 1.65,
  SEK: 10.42, KRW: 1320, SGD: 1.34, NOK: 10.85, MXN: 17.15, INR: 83.12, RUB: 92.5, ZAR: 18.65, TRY: 29.2, BRL: 4.97,
  TWD: 31.5, DKK: 6.87, PLN: 3.98, THB: 35.2, IDR: 15650, HUF: 356, CZK: 22.8, ILS: 3.72, CLP: 885, PHP: 55.8,
};

// Animated Number
function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number; }) {
  const safeValue = isFinite(value) && !isNaN(value) ? value : 0;
  const [displayValue, setDisplayValue] = useState(safeValue);
  const previousValue = useRef(safeValue);
  useEffect(() => {
    const start = previousValue.current, end = safeValue, duration = 500, startTime = performance.now();
    const animate = (t: number) => {
      const p = Math.min((t - startTime) / duration, 1);
      setDisplayValue(start + (end - start) * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(animate); else previousValue.current = end;
    };
    requestAnimationFrame(animate);
  }, [safeValue]);
  return <span>{prefix}{decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue).toLocaleString()}{suffix}</span>;
}

// Calculator Engine
function useCalculations(inputs: CalcInputs, exchangeRate: number) {
  return useMemo(() => {
    const safe = (n: number) => (isFinite(n) && !isNaN(n)) ? n : 0;
    const { aov, dailyBudget, cogs, processingFees, ltv1m, ltv3m, ltv6m, ltv12m, acquisitionMode, cpa, conversionRate, cpc } = inputs;

    let effectiveCPA = safe(cpa);
    if (acquisitionMode === 'crcpc') {
      const cr = safe(conversionRate);
      effectiveCPA = cr > 0 ? safe(cpc) / (cr / 100) : 0;
    }

    const monthlyAdSpend = safe(dailyBudget) * 30;
    const monthlyOrders = effectiveCPA > 0 ? monthlyAdSpend / effectiveCPA : 0;
    const monthlyRevenue = monthlyOrders * safe(aov);
    const cogsCost = monthlyRevenue * (safe(cogs) / 100);
    const processingCost = monthlyRevenue * (safe(processingFees) / 100);
    const totalCosts = cogsCost + monthlyAdSpend + processingCost;
    const netProfit = monthlyRevenue - totalCosts;
    const profitMargin = monthlyRevenue > 0 ? (netProfit / monthlyRevenue) * 100 : 0;

    const ltvValues = [
      { period: '1M', value: safe(ltv1m), months: 1 },
      { period: '3M', value: safe(ltv3m), months: 3 },
      { period: '6M', value: safe(ltv6m), months: 6 },
      { period: '12M', value: safe(ltv12m), months: 12 },
    ];
    const highestLTV = ltvValues.reduce((max, curr) => curr.value > max.value ? curr : max, ltvValues[0]);
    const futureRevenue = monthlyOrders * highestLTV.value;
    const futureMonthlyProfit = futureRevenue - monthlyAdSpend - futureRevenue * (safe(cogs) / 100) - futureRevenue * (safe(processingFees) / 100);
    const futureMonthlyProfitUSD = exchangeRate > 0 ? futureMonthlyProfit / exchangeRate : futureMonthlyProfit;

    const ltvProjections = ltvValues.map(ltv => {
      const rev = monthlyOrders * ltv.value;
      const costs = rev * (safe(cogs) / 100) + monthlyAdSpend + rev * (safe(processingFees) / 100);
      return { ...ltv, profit: rev - costs, margin: rev > 0 ? ((rev - costs) / rev) * 100 : 0, revenue: rev };
    });

    const healthScore = Math.min(100, Math.round(
      Math.min(Math.max((profitMargin + 20) * 2, 0), 40) +
      (effectiveCPA > 0 ? Math.min((highestLTV.value / effectiveCPA) * 5, 30) : 0) +
      Math.min((100 - safe(cogs)) * 0.3, 30)
    ));

    const scaleReadiness = {
      profitMarginOk: profitMargin >= 15,
      ltvCacOk: effectiveCPA > 0 && highestLTV.value / effectiveCPA >= 3,
      grossMarginOk: (100 - safe(cogs)) >= 50,
      consistentRevenue: monthlyRevenue >= 10000,
    };

    const currencySymbol = CURRENCIES.find(c => c.code === inputs.currency)?.symbol || '$';
    const kpiAnalysis = [
      { name: 'Profit Margin', value: safe(profitMargin), target: 20, direction: 'higher', unit: '%' },
      { name: 'LTV:CAC', value: effectiveCPA > 0 ? safe(highestLTV.value / effectiveCPA) : 0, target: 3, direction: 'higher', unit: 'x' },
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
      daily: { revenue: safe(monthlyRevenue / 30), profit: safe(netProfit / 30), orders: safe(monthlyOrders / 30) },
      monthly: { revenue: safe(monthlyRevenue), profit: safe(netProfit), orders: safe(monthlyOrders), margin: safe(profitMargin), adSpend: safe(monthlyAdSpend) },
      netProfit: safe(netProfit), profitMargin: safe(profitMargin), healthScore, futureMonthlyProfit: safe(futureMonthlyProfit),
      futureMonthlyProfitUSD: safe(futureMonthlyProfitUSD), highestLTV, ltvProjections, scaleReadiness,
      readyToScale: Object.values(scaleReadiness).filter(Boolean).length >= 3, kpiAnalysis, totalCosts: safe(totalCosts),
      breakdown: { cogs: safe(cogsCost), adSpend: safe(monthlyAdSpend), processing: safe(processingCost) }, effectiveCPA: safe(effectiveCPA),
    };
  }, [inputs, exchangeRate]);
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function CalculatorsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentMonkeyState, setCurrentMonkeyState] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(DEFAULT_RATES);
  const [ratesLoading, setRatesLoading] = useState(false);
  const [lastRateUpdate, setLastRateUpdate] = useState<Date | null>(null);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const [inputs, setInputs] = useState<CalcInputs>({
    aov: 60, dailyBudget: 500, ltv1m: 60, ltv3m: 120, ltv6m: 200, ltv12m: 350,
    processingFees: 2.9, cogs: 35, currency: 'USD', acquisitionMode: 'cpa', cpa: 25, conversionRate: 2.5, cpc: 0.5,
  });

  const currentRate = exchangeRates[inputs.currency] || 1;
  const results = useCalculations(inputs, currentRate);
  const currencyInfo = CURRENCIES.find(c => c.code === inputs.currency) || CURRENCIES[0];

  const fmt = useCallback((amount: number) => {
    const safeAmount = isFinite(amount) && !isNaN(amount) ? amount : 0;
    return `${currencyInfo.symbol}${Math.round(safeAmount).toLocaleString()}`;
  }, [currencyInfo.symbol]);

  const handleCurrencyChange = useCallback((newCurrency: string) => {
    const oldRate = exchangeRates[inputs.currency] || 1;
    const newRate = exchangeRates[newCurrency] || 1;
    const factor = newRate / oldRate;
    setInputs(prev => ({
      ...prev, currency: newCurrency,
      aov: Math.round(prev.aov * factor * 100) / 100,
      dailyBudget: Math.round(prev.dailyBudget * factor * 100) / 100,
      cpa: Math.round(prev.cpa * factor * 100) / 100,
      cpc: Math.round(prev.cpc * factor * 1000) / 1000,
      ltv1m: Math.round(prev.ltv1m * factor * 100) / 100,
      ltv3m: Math.round(prev.ltv3m * factor * 100) / 100,
      ltv6m: Math.round(prev.ltv6m * factor * 100) / 100,
      ltv12m: Math.round(prev.ltv12m * factor * 100) / 100,
    }));
  }, [exchangeRates, inputs.currency]);

  const fetchExchangeRates = useCallback(async () => {
    setRatesLoading(true);
    try {
      const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      if (res.ok) { const data = await res.json(); if (data.rates) { setExchangeRates(data.rates); setLastRateUpdate(new Date()); } }
    } catch { /* use defaults */ }
    setRatesLoading(false);
  }, []);

  useEffect(() => { fetchExchangeRates(); }, [fetchExchangeRates]);

  useEffect(() => {
    const newState = calculateMonkeyState(results.futureMonthlyProfitUSD);
    if (newState !== currentMonkeyState) {
      setIsTransitioning(true);
      setTimeout(() => { setCurrentMonkeyState(newState); setIsTransitioning(false); }, 300);
    }
  }, [results.futureMonthlyProfitUSD, currentMonkeyState]);

  useEffect(() => { if (!isLoading && !user) router.push('/login'); }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <div className="h-screen w-screen flex items-center justify-center bg-white"><div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full" /></div>;
  }

  const slides = ['Profit Analysis', 'Future Projection', 'KPI X-Ray', 'Scale Readiness'];
  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const currentMonkey = MONKEY_VIDEOS[currentMonkeyState - 1];
  const readinessScore = Object.values(results.scaleReadiness).filter(Boolean).length;

  const handleInputChange = (key: keyof CalcInputs, value: string | number) => {
    if (key === 'currency') handleCurrencyChange(value as string);
    else setInputs(prev => ({ ...prev, [key]: typeof value === 'string' ? (Number(value) || 0) : value }));
  };

  return (
    <DashboardLayout>
      {/* Full bleed layout - negative margins to cancel main-content padding */}
      <div
        className="profit-intelligence-center flex flex-col bg-white overflow-hidden"
        style={{
          margin: '-40px -48px -40px -48px',
          width: 'calc(100% + 96px)',
          height: 'calc(100vh - 64px)',
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        {/* TOP SECTION - 60% - Video and Metrics */}
        <div className="flex flex-row" style={{ height: '60%' }}>
          {/* Video Section - Natural aspect ratio, full height */}
          <div className="flex-1 relative flex items-center justify-center bg-white">
            <div className="h-full flex items-center justify-center p-3">
              <motion.div
                animate={{ opacity: isTransitioning ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="h-full flex items-center"
              >
                <video
                  ref={videoRef}
                  key={currentMonkey?.url}
                  autoPlay loop muted playsInline
                  className="h-full w-auto object-contain rounded-xl"
                >
                  <source src={currentMonkey?.url} type="video/mp4" />
                </video>
              </motion.div>
            </div>
            {/* Level Badge - Positioned relative to video container */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2" style={{ zIndex: 10 }}>
              <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: currentMonkeyState >= 13 ? '#22c55e' : currentMonkeyState >= 7 ? '#f59e0b' : '#ef4444' }} />
                <span className="text-white text-xs font-medium">{currentMonkey?.name}</span>
                <span className="text-white/50 text-[10px]">Level {currentMonkeyState}/18</span>
              </div>
            </div>
          </div>

          {/* Right - Key Metrics - Shifted more to center */}
          <div className="w-56 xl:w-64 px-6 py-3 flex flex-col justify-center bg-white" style={{ marginRight: '25px' }}>
            <div className="mb-3">
              <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">Net Profit / Month</p>
              <p className="text-2xl xl:text-3xl font-bold" style={{ color: results.netProfit >= 0 ? '#0a0a0a' : '#dc2626' }}>
                <AnimatedNumber value={results.netProfit} prefix={currencyInfo.symbol} />
              </p>
              <p className="text-[10px] text-neutral-400">Based on AOV, immediate profit</p>
            </div>
            <div className="mb-3">
              <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">Profit Margin ({results.highestLTV.period} LTV)</p>
              <p className="text-2xl xl:text-3xl font-bold" style={{ color: (results.ltvProjections.find(l => l.period === results.highestLTV.period)?.margin ?? 0) >= 0 ? '#0a0a0a' : '#dc2626' }}>
                <AnimatedNumber value={results.ltvProjections.find(l => l.period === results.highestLTV.period)?.margin ?? 0} suffix="%" decimals={1} />
              </p>
              <p className="text-[10px] text-neutral-400">Based on highest LTV period</p>
            </div>
            <div className="mb-3">
              <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">Future Monthly Profit</p>
              <p className="text-2xl xl:text-3xl font-bold text-neutral-900">
                <AnimatedNumber value={results.futureMonthlyProfit} prefix={currencyInfo.symbol} />
              </p>
              <p className="text-[10px] text-neutral-400">Based on {results.highestLTV.period} LTV</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">Business Health</p>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl xl:text-3xl font-bold text-neutral-900"><AnimatedNumber value={results.healthScore} /></p>
                <span className="text-sm text-neutral-400">/100</span>
              </div>
              <div className="mt-1 h-1 w-24 bg-neutral-200 rounded-full overflow-hidden">
                <motion.div animate={{ width: `${results.healthScore}%` }} transition={{ duration: 0.5 }} className="h-full rounded-full"
                  style={{ background: results.healthScore >= 70 ? '#22c55e' : results.healthScore >= 40 ? '#f59e0b' : '#ef4444' }} />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION - 40% - Inputs and Results */}
        <div className="flex flex-row border-t border-neutral-200" style={{ height: '40%' }}>
          {/* Left - Data Input Panel - Black background extends to bottom */}
          <div className="w-72 xl:w-80 px-3 py-3 flex flex-col justify-between bg-neutral-950 overflow-hidden">
            {/* Row 1 - Basic Inputs */}
            <div className="grid grid-cols-2 gap-1.5">
              <CompactInput label="AOV" value={inputs.aov} onChange={(v) => handleInputChange('aov', v)} prefix={currencyInfo.symbol} />
              <CompactInput label="Daily Budget" value={inputs.dailyBudget} onChange={(v) => handleInputChange('dailyBudget', v)} prefix={currencyInfo.symbol} />
            </div>
            {/* Row 2 - Acquisition Mode */}
            <div>
              <div className="flex gap-1 mb-0.5">
                <button onClick={() => setInputs(prev => ({ ...prev, acquisitionMode: 'cpa' }))}
                  className={`flex-1 py-1 text-[10px] font-semibold rounded transition-all ${inputs.acquisitionMode === 'cpa' ? 'bg-white text-black' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>CPA Mode</button>
                <button onClick={() => setInputs(prev => ({ ...prev, acquisitionMode: 'crcpc' }))}
                  className={`flex-1 py-1 text-[10px] font-semibold rounded transition-all ${inputs.acquisitionMode === 'crcpc' ? 'bg-white text-black' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>CR + CPC</button>
              </div>
              {inputs.acquisitionMode === 'cpa' ? (
                <CompactInput label="CPA" value={inputs.cpa} onChange={(v) => handleInputChange('cpa', v)} prefix={currencyInfo.symbol} />
              ) : (
                <div className="grid grid-cols-2 gap-1.5">
                  <CompactInput label="Conv. Rate" value={inputs.conversionRate} onChange={(v) => handleInputChange('conversionRate', v)} suffix="%" step={0.1} />
                  <CompactInput label="CPC" value={inputs.cpc} onChange={(v) => handleInputChange('cpc', v)} prefix={currencyInfo.symbol} step={0.01} />
                </div>
              )}
            </div>
            {/* Row 3 - LTV */}
            <div>
              <p className="text-[9px] text-white/70 uppercase font-medium mb-0.5">
                Customer LTV by Period{' '}
                <a href="https://apps.shopify.com/customer-lifetime-value?mref=lsbqcbva" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white/80 underline normal-case transition-colors">(Check your LTV)</a>
              </p>
              <div className="grid grid-cols-4 gap-1">
                {[{ k: 'ltv1m' as const, l: '1M' }, { k: 'ltv3m' as const, l: '3M' }, { k: 'ltv6m' as const, l: '6M' }, { k: 'ltv12m' as const, l: '12M' }].map(({ k, l }) => (
                  <div key={k}>
                    <label className="text-[8px] text-white/50 block text-center">{l}</label>
                    <input type="number" value={inputs[k]} onChange={(e) => handleInputChange(k, e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded px-1 py-1 text-white text-[12px] text-center focus:outline-none focus:border-white/40 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
            {/* Row 4 - Fees */}
            <div className="grid grid-cols-2 gap-1.5">
              <CompactInput label="Processing %" value={inputs.processingFees} onChange={(v) => handleInputChange('processingFees', v)} suffix="%" step={0.1} />
              <CompactInput label="COGS %" value={inputs.cogs} onChange={(v) => handleInputChange('cogs', v)} suffix="%" />
            </div>
            {/* Row 5 - Currency with Custom Dropdown */}
            <div className="relative">
              <div className="flex items-center justify-between">
                <label className="text-[9px] text-white/70 uppercase font-medium">Currency</label>
                <button onClick={fetchExchangeRates} disabled={ratesLoading} className="text-[8px] text-white/50 hover:text-white/80 flex items-center gap-1 transition-colors">
                  <RefreshCw className={`w-2.5 h-2.5 ${ratesLoading ? 'animate-spin' : ''}`} />
                  {lastRateUpdate ? 'Synced' : 'Sync'}
                </button>
              </div>
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[11px] focus:outline-none focus:border-white/40 transition-colors flex items-center gap-2"
              >
                <img src={`https://flagcdn.com/w20/${currencyInfo.flag}.png`} alt="" className="w-4 h-3 object-cover rounded-sm" />
                <span className="font-medium">{currencyInfo.code}</span>
                <span className="text-white/50 text-[10px]">{currencyInfo.name}</span>
                <ChevronRight className={`w-3 h-3 ml-auto text-white/40 transition-transform ${currencyDropdownOpen ? 'rotate-90' : ''}`} />
              </button>
              {currencyDropdownOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-1 bg-neutral-900 border border-white/20 rounded-lg shadow-xl max-h-48 overflow-y-auto z-50">
                  {CURRENCIES.map(c => (
                    <button
                      key={c.code}
                      onClick={() => { handleInputChange('currency', c.code); setCurrencyDropdownOpen(false); }}
                      className={`w-full px-3 py-2 flex items-center gap-2 hover:bg-white/10 transition-colors text-left ${c.code === inputs.currency ? 'bg-white/10' : ''}`}
                    >
                      <img src={`https://flagcdn.com/w20/${c.flag}.png`} alt="" className="w-4 h-3 object-cover rounded-sm" />
                      <span className="text-white text-[11px] font-medium">{c.code}</span>
                      <span className="text-white/50 text-[10px]">{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right - Premium Results Slider */}
          <div className="flex-1 bg-gradient-to-br from-neutral-50 to-white px-6 py-2 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-base font-bold text-neutral-900">{slides[activeSlide]}</h2>
                <p className="text-[10px] text-neutral-500">Real-time business insights</p>
              </div>
              <div className="flex items-center gap-2">
                {slides.map((s, i) => (
                  <button key={i} onClick={() => setActiveSlide(i)}
                    className={`px-2 py-1 rounded text-[9px] font-medium transition-all ${i === activeSlide ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'}`}>
                    {s.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Slides Container */}
            <div className="flex-1 overflow-hidden rounded-xl">
              <div className="flex transition-transform duration-500 ease-out h-full" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                {/* Slide 1: Profit Analysis */}
                <div className="w-full flex-shrink-0 pr-6 flex flex-col">
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <PremiumMetricCard label="Daily Revenue" value={fmt(results.daily.revenue)} />
                    <PremiumMetricCard label="Daily Profit (AOV)" value={fmt(results.daily.profit)} negative={results.daily.profit < 0} />
                    <PremiumMetricCard label={`Daily Profit (${results.highestLTV.period} LTV)`} value={fmt(results.futureMonthlyProfit / 30)} negative={results.futureMonthlyProfit < 0} highlight />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <PremiumMetricCard label="Monthly Revenue" value={fmt(results.monthly.revenue)} />
                    <PremiumMetricCard label="Monthly Profit (AOV)" value={fmt(results.netProfit)} negative={results.netProfit < 0} />
                    <PremiumMetricCard label={`Monthly Profit (${results.highestLTV.period} LTV)`} value={fmt(results.futureMonthlyProfit)} negative={results.futureMonthlyProfit < 0} highlight />
                  </div>
                  <div className="flex-1 bg-white rounded-xl border border-neutral-200 p-3 shadow-sm">
                    <p className="text-xs font-bold text-neutral-800 uppercase tracking-wide mb-1">Cost Breakdown</p>
                    <div className="flex flex-col justify-center gap-1.5 h-[calc(100%-1.5rem)]">
                      {[
                        { label: 'COGS', value: results.breakdown.cogs, color: '#8b6914' },
                        { label: 'Ad Spend', value: results.breakdown.adSpend, color: '#2c1810' },
                        { label: 'Processing', value: results.breakdown.processing, color: '#000' },
                      ].map((item, i) => {
                        const safeValue = isFinite(item.value) ? item.value : 0;
                        const safePct = results.totalCosts > 0 && isFinite(results.totalCosts)
                          ? Math.min(100, Math.max(0, Math.round((safeValue / results.totalCosts) * 100)))
                          : 0;
                        return (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-neutral-700 w-16">{item.label}</span>
                            <div className="flex-1 h-4 bg-neutral-100 rounded-lg overflow-hidden relative">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${safePct}%` }} transition={{ duration: 0.6, ease: 'easeOut' }}
                                className="h-full rounded-lg" style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}dd)` }} />
                              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-neutral-700">{fmt(safeValue)}</span>
                            </div>
                            <span className="text-xs font-bold text-neutral-800 w-10 text-right">{safePct}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Slide 2: Future Projection */}
                <div className="w-full flex-shrink-0 px-6 flex flex-col">
                  <div className="p-3 rounded-xl border border-neutral-200 bg-white shadow-sm mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8b6914, #2c1810)' }}>
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 font-medium">Future Monthly Profit ({results.highestLTV.period} LTV)</p>
                        <p className="text-xl font-bold text-neutral-900">{fmt(results.futureMonthlyProfit)}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-neutral-800 uppercase tracking-wide mb-1">LTV Profit Projection</p>
                  <div className="flex-1 grid grid-cols-4 gap-2 content-center">
                    {results.ltvProjections.map((ltv, i) => {
                      const isHighest = ltv.period === results.highestLTV.period;
                      const safeProfit = isFinite(ltv.profit) ? ltv.profit : 0;
                      const safeMargin = isFinite(ltv.margin) ? ltv.margin : 0;
                      return (
                        <div key={i} className={`p-3 rounded-xl text-center border-2 transition-all ${isHighest ? 'border-neutral-900 bg-neutral-900 shadow-lg scale-105' : 'border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md'}`}>
                          <p className={`text-xs font-bold mb-0.5 ${isHighest ? 'text-white/70' : 'text-neutral-500'}`}>{ltv.period}</p>
                          <p className={`text-lg font-bold ${isHighest ? 'text-white' : safeProfit >= 0 ? 'text-neutral-900' : 'text-red-600'}`}>{fmt(safeProfit)}</p>
                          <p className={`text-[10px] font-medium ${isHighest ? 'text-white/50' : 'text-neutral-400'}`}>{safeMargin.toFixed(1)}% margin</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Slide 3: KPI X-Ray */}
                <div className="w-full flex-shrink-0 px-6">
                  <svg width="0" height="0" style={{ position: 'absolute' }}>
                    <defs>
                      <linearGradient id="kpi-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b6914"/>
                        <stop offset="50%" stopColor="#2c1810"/>
                        <stop offset="100%" stopColor="#000"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="grid grid-cols-3 gap-3 h-full content-center">
                    {results.kpiAnalysis.map((kpi, i) => {
                      const safePct = isFinite(kpi.value) && isFinite(kpi.target) && kpi.target > 0
                        ? Math.min(100, Math.max(0, (kpi.value / (kpi.target * 1.5)) * 100))
                        : 0;
                      const color = kpi.status === 'green' ? 'url(#kpi-grad)' : kpi.status === 'amber' ? '#f59e0b' : '#ef4444';
                      return (
                        <div key={i} className="p-3 rounded-xl border border-neutral-200 bg-white shadow-sm flex flex-col items-center hover:shadow-md transition-shadow">
                          <svg width="44" height="44" className="transform -rotate-90">
                            <circle cx="22" cy="22" r="17" fill="none" stroke="#e5e5e5" strokeWidth="4" />
                            <circle cx="22" cy="22" r="17" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
                              strokeDasharray={107} strokeDashoffset={107 - (safePct / 100) * 107} style={{ transition: 'stroke-dashoffset 0.6s ease-out' }} />
                          </svg>
                          <p className="text-xs font-bold text-neutral-800 mt-1">{kpi.name}</p>
                          <p className="text-base font-bold text-neutral-900">{isFinite(kpi.value) ? kpi.value.toFixed(kpi.unit === '%' || kpi.unit === 'x' ? 1 : 0) : '0'}{kpi.unit}</p>
                          <p className="text-[10px] text-neutral-500">Target: {kpi.direction === 'higher' ? '≥' : '≤'}{kpi.target.toFixed(0)}{kpi.unit}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Slide 4: Scale Readiness - Clean Classic Design */}
                <div className="w-full flex-shrink-0 pl-6 flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-neutral-800">{results.readyToScale ? 'Ready to Scale' : 'Not Ready Yet'}</p>
                      <p className="text-[10px] text-neutral-500">{readinessScore} of 4 criteria met</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4].map(n => (
                        <div key={n} className={`w-2.5 h-2.5 rounded-full ${n <= readinessScore ? 'bg-neutral-900' : 'bg-neutral-200'}`} />
                      ))}
                    </div>
                  </div>
                  {/* Criteria List */}
                  <div className="flex-1 flex flex-col justify-center gap-1">
                    {[
                      { label: 'Profit Margin ≥15%', ok: results.scaleReadiness.profitMarginOk },
                      { label: 'LTV:CAC Ratio ≥3x', ok: results.scaleReadiness.ltvCacOk },
                      { label: 'Gross Margin ≥50%', ok: results.scaleReadiness.grossMarginOk },
                      { label: `Monthly Revenue ≥${currencyInfo.symbol}10K`, ok: results.scaleReadiness.consistentRevenue },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 py-1.5 border-b border-neutral-100 last:border-0">
                        <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${item.ok ? 'bg-neutral-900' : 'bg-neutral-200'}`}>
                          {item.ok ? <Check className="w-2.5 h-2.5 text-white" /> : <X className="w-2.5 h-2.5 text-neutral-500" />}
                        </div>
                        <span className={`text-xs ${item.ok ? 'text-neutral-900 font-medium' : 'text-neutral-400'}`}>{item.label}</span>
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

// Helper Components
function CompactInput({ label, value, onChange, prefix, suffix, step = 1 }: { label: string; value: number; onChange: (v: string) => void; prefix?: string; suffix?: string; step?: number; }) {
  // Dynamic padding based on prefix length (handles C$, HK$, NT$, etc.)
  const prefixPadding = prefix ? (prefix.length > 1 ? 'pl-7' : 'pl-5') : '';
  return (
    <div>
      <label className="text-[9px] text-white/70 uppercase font-medium block">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-white/50">{prefix}</span>}
        <input type="number" step={step} value={value} onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[13px] focus:outline-none focus:border-white/40 transition-colors ${prefixPadding} ${suffix ? 'pr-5' : ''}`} />
        {suffix && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-white/50">{suffix}</span>}
      </div>
    </div>
  );
}

function PremiumMetricCard({ label, value, negative, highlight }: { label: string; value: string; negative?: boolean; highlight?: boolean }) {
  return (
    <div className={`p-3 rounded-xl border shadow-sm hover:shadow-md transition-shadow ${highlight ? 'border-neutral-900 bg-neutral-900' : 'border-neutral-200 bg-white'}`}>
      <p className={`text-[11px] font-semibold uppercase mb-1 ${highlight ? 'text-white/60' : 'text-neutral-500'}`}>{label}</p>
      <p className={`text-base font-bold ${highlight ? (negative ? 'text-red-400' : 'text-white') : (negative ? 'text-red-600' : 'text-neutral-900')}`}>{value}</p>
    </div>
  );
}
