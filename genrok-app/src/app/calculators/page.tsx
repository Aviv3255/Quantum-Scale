'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ChevronLeft, ChevronRight, TrendingUp, Rocket, RefreshCw, Check, X } from 'lucide-react';

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
const PROFIT_THRESHOLDS = [
  0, 0, 10000, 20000, 25000, 35000, 50000, 75000, 100000,
  150000, 200000, 300000, 450000, 650000, 900000, 1200000, 1500000, 2000000,
];

function calculateMonkeyState(futureMonthlyProfitUSD: number): number {
  if (!isFinite(futureMonthlyProfitUSD) || isNaN(futureMonthlyProfitUSD)) return 1;
  if (futureMonthlyProfitUSD < 0) return 1;
  for (let i = PROFIT_THRESHOLDS.length - 1; i >= 0; i--) {
    if (futureMonthlyProfitUSD >= PROFIT_THRESHOLDS[i]) return Math.min(i + 1, 18);
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
  flag: string;
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
  value: number; prefix?: string; suffix?: string; decimals?: number;
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
      setDisplayValue(startValue + (endValue - startValue) * easeOutQuart);
      if (progress < 1) requestAnimationFrame(animate);
      else previousValue.current = endValue;
    };
    requestAnimationFrame(animate);
  }, [safeValue]);

  const formattedValue = decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue).toLocaleString();
  return <span>{prefix}{formattedValue}{suffix}</span>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PREMIUM VISUALIZATION COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// Progress Ring for KPIs
function ProgressRing({ value, max, size = 48, status }: { value: number; max: number; size?: number; status: string }) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percent = Math.min(Math.max(value / max, 0), 1);
  const offset = circumference - percent * circumference;

  const getGradientId = () => `ring-gradient-${Math.random().toString(36).substr(2, 9)}`;
  const gradientId = getGradientId();

  const statusColor = status === 'green' ? '#22c55e' : status === 'amber' ? '#f59e0b' : '#ef4444';

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b6914" />
          <stop offset="50%" stopColor="#2c1810" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
      </defs>
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#e5e5e5" strokeWidth={strokeWidth} />
      <circle
        cx={size/2} cy={size/2} r={radius} fill="none"
        stroke={status === 'green' ? `url(#${gradientId})` : statusColor}
        strokeWidth={strokeWidth} strokeLinecap="round"
        strokeDasharray={circumference} strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
    </svg>
  );
}

// Bar Chart for Cost Breakdown
function CostBarChart({ data, fmt }: { data: Array<{ label: string; value: number; pct: number }>; fmt: (n: number) => string }) {
  const maxPct = Math.max(...data.map(d => d.pct), 1);
  return (
    <div className="space-y-2">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-neutral-700 w-16">{item.label}</span>
          <div className="flex-1 h-5 bg-neutral-100 rounded overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.pct / maxPct) * 100}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="h-full rounded"
              style={{ background: 'linear-gradient(90deg, #8b6914 0%, #2c1810 60%, #000000 100%)' }}
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-semibold text-neutral-700">
              {fmt(item.value)}
            </span>
          </div>
          <span className="text-[9px] text-neutral-500 w-8 text-right">{item.pct}%</span>
        </div>
      ))}
    </div>
  );
}

// Area Chart for LTV Projection
function LTVAreaChart({ data, fmt }: { data: Array<{ period: string; profit: number; months: number }>; fmt: (n: number) => string }) {
  const maxProfit = Math.max(...data.map(d => Math.abs(d.profit)), 1);
  const minProfit = Math.min(...data.map(d => d.profit), 0);
  const range = maxProfit - minProfit;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((d.profit - minProfit) / range) * 80 - 10;
    return { x, y, ...d };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L 100 100 L 0 100 Z`;

  return (
    <div className="relative h-24">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b6914" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b6914" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b6914" />
            <stop offset="50%" stopColor="#2c1810" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#area-gradient)" />
        <path d={pathD} fill="none" stroke="url(#line-gradient)" strokeWidth="2" strokeLinecap="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="#2c1810" stroke="#fff" strokeWidth="1.5" />
        ))}
      </svg>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
        {data.map((d, i) => (
          <div key={i} className="text-center">
            <p className="text-[9px] font-semibold text-neutral-800">{d.period}</p>
            <p className="text-[8px] text-neutral-500">{fmt(d.profit)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Readiness Gauge
function ReadinessGauge({ score, ready }: { score: number; ready: boolean }) {
  const angle = (score / 4) * 180 - 90;
  return (
    <div className="relative w-28 h-16 mx-auto">
      <svg viewBox="0 0 100 60" className="w-full h-full">
        <defs>
          <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        <path d="M 10 55 A 40 40 0 0 1 90 55" fill="none" stroke="#e5e5e5" strokeWidth="8" strokeLinecap="round" />
        <path d="M 10 55 A 40 40 0 0 1 90 55" fill="none" stroke="url(#gauge-gradient)" strokeWidth="8" strokeLinecap="round"
          strokeDasharray="126" strokeDashoffset={126 - (score / 4) * 126} style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
        <circle cx="50" cy="55" r="4" fill={ready ? '#22c55e' : '#2c1810'} />
        <line x1="50" y1="55" x2={50 + Math.cos(angle * Math.PI / 180) * 30} y2={55 + Math.sin(angle * Math.PI / 180) * 30}
          stroke="#2c1810" strokeWidth="2" strokeLinecap="round" style={{ transition: 'all 0.6s ease' }} />
      </svg>
      <p className="text-center text-[10px] font-semibold text-neutral-800 -mt-1">{score}/4 Criteria Met</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CALCULATOR ENGINE
// ═══════════════════════════════════════════════════════════════════════════════
function useCalculations(inputs: CalcInputs, exchangeRate: number): AllResults {
  return useMemo(() => {
    const { aov, dailyBudget, cogs, processingFees, ltv1m, ltv3m, ltv6m, ltv12m, acquisitionMode, cpa, conversionRate, cpc } = inputs;
    const safe = (n: number) => (isFinite(n) && !isNaN(n)) ? n : 0;

    let effectiveCPA = safe(cpa);
    if (acquisitionMode === 'crcpc') {
      const cr = safe(conversionRate);
      effectiveCPA = cr > 0 ? safe(cpc) / (cr / 100) : 0;
    }

    const monthlyAdSpend = safe(dailyBudget) * 30;
    const monthlyOrders = effectiveCPA > 0 ? monthlyAdSpend / effectiveCPA : 0;
    const monthlyRevenue = safe(monthlyOrders) * safe(aov);
    const cogsCost = monthlyRevenue * (safe(cogs) / 100);
    const processingCost = monthlyRevenue * (safe(processingFees) / 100);
    const totalCosts = cogsCost + monthlyAdSpend + processingCost;
    const grossProfit = monthlyRevenue - cogsCost;
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
      const cohortRevenue = monthlyOrders * ltv.value;
      const cohortCosts = cohortRevenue * (safe(cogs) / 100) + monthlyAdSpend + cohortRevenue * (safe(processingFees) / 100);
      const cohortProfit = cohortRevenue - cohortCosts;
      return { ...ltv, profit: cohortProfit, margin: cohortRevenue > 0 ? (cohortProfit / cohortRevenue) * 100 : 0, revenue: cohortRevenue };
    });

    const healthScore = Math.round(
      Math.min(Math.max((profitMargin + 20) * 2, 0), 40) +
      (effectiveCPA > 0 ? Math.min((highestLTV.value / effectiveCPA) * 5, 30) : 0) +
      Math.min((100 - safe(cogs)) * 0.3, 30)
    );

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
      daily: { revenue: safe(monthlyRevenue / 30), profit: safe(netProfit / 30), orders: safe(monthlyOrders / 30), adSpend: safe(dailyBudget) },
      monthly: { revenue: safe(monthlyRevenue), profit: safe(netProfit), orders: safe(monthlyOrders), margin: safe(profitMargin), adSpend: safe(monthlyAdSpend) },
      grossProfit: safe(grossProfit), netProfit: safe(netProfit), profitMargin: safe(profitMargin),
      healthScore: Math.min(safe(healthScore), 100),
      futureMonthlyProfit: safe(futureMonthlyProfit), futureMonthlyProfitUSD: safe(futureMonthlyProfitUSD),
      highestLTV, ltvProjections, scaleReadiness, readyToScale: Object.values(scaleReadiness).filter(Boolean).length >= 3,
      kpiAnalysis, totalCosts: safe(totalCosts),
      breakdown: { cogs: safe(cogsCost), adSpend: safe(monthlyAdSpend), processing: safe(processingCost) },
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

  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(DEFAULT_RATES);
  const [ratesLoading, setRatesLoading] = useState(false);
  const [lastRateUpdate, setLastRateUpdate] = useState<Date | null>(null);
  const prevCurrencyRef = useRef('USD');

  const [inputs, setInputs] = useState<CalcInputs>({
    aov: 60, dailyBudget: 500, ltv1m: 60, ltv3m: 120, ltv6m: 200, ltv12m: 350,
    processingFees: 2.9, cogs: 35, currency: 'USD',
    acquisitionMode: 'cpa', cpa: 25, conversionRate: 2.5, cpc: 0.5,
  });

  const currentRate = exchangeRates[inputs.currency] || 1;
  const results = useCalculations(inputs, currentRate);
  const currencyInfo = CURRENCIES.find(c => c.code === inputs.currency) || CURRENCIES[0];

  // Currency conversion function - converts and displays in selected currency
  const fmt = useCallback((amount: number) => {
    const safeAmount = isFinite(amount) && !isNaN(amount) ? amount : 0;
    return `${currencyInfo.symbol}${Math.round(safeAmount).toLocaleString()}`;
  }, [currencyInfo.symbol]);

  // Handle currency change - convert all monetary inputs
  const handleCurrencyChange = useCallback((newCurrency: string) => {
    const oldRate = exchangeRates[inputs.currency] || 1;
    const newRate = exchangeRates[newCurrency] || 1;
    const conversionFactor = newRate / oldRate;

    setInputs(prev => ({
      ...prev,
      currency: newCurrency,
      aov: Math.round(prev.aov * conversionFactor * 100) / 100,
      dailyBudget: Math.round(prev.dailyBudget * conversionFactor * 100) / 100,
      cpa: Math.round(prev.cpa * conversionFactor * 100) / 100,
      cpc: Math.round(prev.cpc * conversionFactor * 1000) / 1000,
      ltv1m: Math.round(prev.ltv1m * conversionFactor * 100) / 100,
      ltv3m: Math.round(prev.ltv3m * conversionFactor * 100) / 100,
      ltv6m: Math.round(prev.ltv6m * conversionFactor * 100) / 100,
      ltv12m: Math.round(prev.ltv12m * conversionFactor * 100) / 100,
    }));
    prevCurrencyRef.current = newCurrency;
  }, [exchangeRates, inputs.currency]);

  const fetchExchangeRates = useCallback(async () => {
    setRatesLoading(true);
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      if (response.ok) {
        const data = await response.json();
        if (data.rates) { setExchangeRates(data.rates); setLastRateUpdate(new Date()); }
      }
    } catch { console.warn('Failed to fetch exchange rates'); }
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

  useEffect(() => {
    if (!isLoading && !user) router.push('/login');
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
    if (key === 'currency') {
      handleCurrencyChange(value as string);
    } else {
      setInputs(prev => ({ ...prev, [key]: typeof value === 'string' ? (Number(value) || 0) : value }));
    }
  };

  const readinessScore = Object.values(results.scaleReadiness).filter(Boolean).length;

  return (
    <DashboardLayout>
      {/* Full width wrapper - negative margin to counter any layout padding */}
      <div className="h-[calc(100vh-60px)] w-full flex flex-col bg-white overflow-hidden -m-0">
        {/* TOP SECTION - 58% - Video and Metrics */}
        <div className="flex flex-row" style={{ flex: '0 0 58%' }}>
          {/* Center - Monkey Video */}
          <div className="flex-1 flex items-center justify-center bg-white p-2">
            <div className="relative h-full max-h-[95%] aspect-square flex items-center justify-center">
              <motion.div animate={{ opacity: isTransitioning ? 0 : 1 }} transition={{ duration: 0.4 }} className="w-full h-full rounded-xl overflow-hidden">
                <video ref={videoRef} key={currentMonkey?.url} autoPlay loop muted playsInline className="w-full h-full object-cover rounded-xl">
                  <source src={currentMonkey?.url} type="video/mp4" />
                </video>
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: currentMonkeyState >= 13 ? '#22c55e' : currentMonkeyState >= 7 ? '#f59e0b' : '#ef4444' }} />
                    <span className="text-white text-[10px] font-medium">{currentMonkey?.name}</span>
                    <span className="text-white/50 text-[9px] ml-auto">Level {currentMonkeyState}/18</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right - Key Metrics */}
          <div className="w-64 xl:w-72 p-3 flex flex-col justify-center bg-white">
            {/* Net Profit */}
            <div className="mb-4">
              <p className="text-[9px] font-semibold text-neutral-500 uppercase tracking-wider mb-0.5">Net Profit / Month</p>
              <p className="text-xl xl:text-2xl font-bold tracking-tight" style={{ color: results.netProfit >= 0 ? '#171717' : '#dc2626' }}>
                <AnimatedNumber value={results.netProfit} prefix={currencyInfo.symbol} />
              </p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Based on AOV, immediate profit</p>
            </div>

            {/* Profit Margin */}
            <div className="mb-4">
              <p className="text-[9px] font-semibold text-neutral-500 uppercase tracking-wider mb-0.5">Profit Margin</p>
              <p className="text-xl xl:text-2xl font-bold tracking-tight" style={{ color: results.profitMargin >= 0 ? '#171717' : '#dc2626' }}>
                <AnimatedNumber value={results.profitMargin} suffix="%" decimals={1} />
              </p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Target: 20%+</p>
            </div>

            {/* Future Profit */}
            <div className="mb-4">
              <p className="text-[9px] font-semibold text-neutral-500 uppercase tracking-wider mb-0.5">Future Monthly Profit</p>
              <p className="text-xl xl:text-2xl font-bold tracking-tight text-neutral-900">
                <AnimatedNumber value={results.futureMonthlyProfit} prefix={currencyInfo.symbol} />
              </p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Based on {results.highestLTV.period} LTV</p>
            </div>

            {/* Health Score */}
            <div>
              <p className="text-[9px] font-semibold text-neutral-500 uppercase tracking-wider mb-0.5">Business Health</p>
              <div className="flex items-baseline gap-1">
                <p className="text-xl xl:text-2xl font-bold tracking-tight text-neutral-900"><AnimatedNumber value={results.healthScore} /></p>
                <span className="text-xs text-neutral-400">/100</span>
              </div>
              <div className="mt-1.5 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <motion.div animate={{ width: `${results.healthScore}%` }} transition={{ duration: 0.5 }} className="h-full rounded-full"
                  style={{ background: results.healthScore >= 70 ? '#22c55e' : results.healthScore >= 40 ? '#f59e0b' : '#ef4444' }} />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION - 42% - Inputs and Results */}
        <div className="flex flex-row" style={{ flex: '0 0 42%' }}>
          {/* Left - Compact Data Input Panel */}
          <div className="w-72 xl:w-80 p-2 xl:p-3 flex flex-col justify-between" style={{ background: '#000000' }}>
            {/* Row 1: AOV & Daily Budget */}
            <div className="grid grid-cols-2 gap-1.5">
              <CompactInput label="AOV" value={inputs.aov} onChange={(v) => handleInputChange('aov', v)} prefix={currencyInfo.symbol} />
              <CompactInput label="Daily Budget" value={inputs.dailyBudget} onChange={(v) => handleInputChange('dailyBudget', v)} prefix={currencyInfo.symbol} />
            </div>

            {/* Row 2: CPA Toggle */}
            <div>
              <div className="flex gap-1 mb-1">
                <button onClick={() => setInputs(prev => ({ ...prev, acquisitionMode: 'cpa' }))}
                  className={`flex-1 py-0.5 text-[8px] font-medium rounded ${inputs.acquisitionMode === 'cpa' ? 'bg-white text-black' : 'bg-white/10 text-white/60'}`}>
                  CPA
                </button>
                <button onClick={() => setInputs(prev => ({ ...prev, acquisitionMode: 'crcpc' }))}
                  className={`flex-1 py-0.5 text-[8px] font-medium rounded ${inputs.acquisitionMode === 'crcpc' ? 'bg-white text-black' : 'bg-white/10 text-white/60'}`}>
                  CR+CPC
                </button>
              </div>
              {inputs.acquisitionMode === 'cpa' ? (
                <CompactInput label="CPA" value={inputs.cpa} onChange={(v) => handleInputChange('cpa', v)} prefix={currencyInfo.symbol} />
              ) : (
                <div className="grid grid-cols-2 gap-1.5">
                  <CompactInput label="CR%" value={inputs.conversionRate} onChange={(v) => handleInputChange('conversionRate', v)} suffix="%" step={0.1} />
                  <CompactInput label="CPC" value={inputs.cpc} onChange={(v) => handleInputChange('cpc', v)} prefix={currencyInfo.symbol} step={0.01} />
                </div>
              )}
            </div>

            {/* Row 3: LTV */}
            <div>
              <p className="text-[8px] text-white/50 uppercase mb-0.5">LTV by Period</p>
              <div className="grid grid-cols-4 gap-1">
                {[{ key: 'ltv1m' as const, label: '1M' }, { key: 'ltv3m' as const, label: '3M' }, { key: 'ltv6m' as const, label: '6M' }, { key: 'ltv12m' as const, label: '12M' }].map(({ key, label }) => (
                  <div key={key}>
                    <label className="text-[7px] text-white/40 block text-center">{label}</label>
                    <input type="number" value={inputs[key]} onChange={(e) => handleInputChange(key, e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded py-0.5 text-white text-[9px] text-center focus:outline-none focus:border-white/40" />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 4: Fees */}
            <div className="grid grid-cols-2 gap-1.5">
              <CompactInput label="Processing %" value={inputs.processingFees} onChange={(v) => handleInputChange('processingFees', v)} suffix="%" step={0.1} />
              <CompactInput label="COGS %" value={inputs.cogs} onChange={(v) => handleInputChange('cogs', v)} suffix="%" />
            </div>

            {/* Row 5: Currency */}
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <label className="text-[8px] text-white/50">Currency</label>
                <button onClick={fetchExchangeRates} disabled={ratesLoading} className="text-[7px] text-white/40 hover:text-white/60 flex items-center gap-0.5">
                  <RefreshCw className={`w-2 h-2 ${ratesLoading ? 'animate-spin' : ''}`} />
                  {lastRateUpdate ? 'Synced' : 'Sync'}
                </button>
              </div>
              <div className="relative">
                <select value={inputs.currency} onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded py-1 pl-6 pr-2 text-white text-[9px] focus:outline-none appearance-none cursor-pointer">
                  {CURRENCIES.map(c => <option key={c.code} value={c.code} className="bg-black text-white">{c.code} - {c.name}</option>)}
                </select>
                <img src={`https://flagcdn.com/w20/${currencyInfo.flag}.png`} alt={currencyInfo.code}
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 w-3.5 h-2.5 object-cover rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Right - Results Slider with Premium Visualizations */}
          <div className="flex-1 bg-white p-3 flex flex-col overflow-hidden">
            {/* Slider Header */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold text-neutral-900">{slides[activeSlide]}</h2>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5 mr-1">
                  {slides.map((_, i) => (
                    <button key={i} onClick={() => setActiveSlide(i)}
                      className={`h-1 rounded-full transition-all ${i === activeSlide ? 'bg-neutral-900 w-3' : 'bg-neutral-300 w-1'}`} />
                  ))}
                </div>
                <button onClick={prevSlide} className="w-5 h-5 rounded-full border border-neutral-300 flex items-center justify-center hover:border-neutral-400">
                  <ChevronLeft className="w-3 h-3 text-neutral-600" />
                </button>
                <button onClick={nextSlide} className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-800">
                  <ChevronRight className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>

            {/* Slides */}
            <div className="flex-1 overflow-hidden">
              <div className="flex transition-transform duration-500 ease-out h-full" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                {/* Slide 1: Profit Analysis with Bar Chart */}
                <div className="w-full flex-shrink-0 pr-3">
                  <div className="grid grid-cols-4 gap-1.5 mb-2">
                    <MetricCard label="Daily Revenue" value={fmt(results.daily.revenue)} />
                    <MetricCard label="Daily Profit" value={fmt(results.daily.profit)} highlight={results.daily.profit >= 0 ? 'positive' : 'negative'} />
                    <MetricCard label="Monthly Revenue" value={fmt(results.monthly.revenue)} />
                    <MetricCard label="Monthly Profit" value={fmt(results.netProfit)} highlight={results.netProfit >= 0 ? 'positive' : 'negative'} />
                  </div>
                  <p className="text-[9px] font-semibold text-neutral-700 uppercase mb-1.5">Cost Breakdown</p>
                  <CostBarChart data={[
                    { label: 'COGS', value: results.breakdown.cogs, pct: results.totalCosts > 0 ? Math.round((results.breakdown.cogs / results.totalCosts) * 100) : 0 },
                    { label: 'Ad Spend', value: results.breakdown.adSpend, pct: results.totalCosts > 0 ? Math.round((results.breakdown.adSpend / results.totalCosts) * 100) : 0 },
                    { label: 'Processing', value: results.breakdown.processing, pct: results.totalCosts > 0 ? Math.round((results.breakdown.processing / results.totalCosts) * 100) : 0 },
                  ]} fmt={fmt} />
                </div>

                {/* Slide 2: Future Projection with Area Chart */}
                <div className="w-full flex-shrink-0 px-3">
                  <div className="mb-2 p-2 rounded-lg border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8b6914 0%, #2c1810 100%)' }}>
                        <TrendingUp className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <p className="text-[9px] text-neutral-600">Future Monthly Profit ({results.highestLTV.period} LTV)</p>
                        <p className="text-base font-bold text-neutral-900">{fmt(results.futureMonthlyProfit)}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-[9px] font-semibold text-neutral-700 uppercase mb-1">LTV Profit Trajectory</p>
                  <LTVAreaChart data={results.ltvProjections} fmt={fmt} />
                </div>

                {/* Slide 3: KPI X-Ray with Progress Rings */}
                <div className="w-full flex-shrink-0 px-3">
                  <div className="grid grid-cols-3 gap-2">
                    {results.kpiAnalysis.map((kpi, i) => (
                      <div key={i} className="p-2 rounded-lg border border-neutral-200 bg-white flex flex-col items-center">
                        <ProgressRing value={kpi.value} max={kpi.target * 1.5} size={40} status={kpi.status} />
                        <p className="text-[9px] font-semibold text-neutral-800 mt-1">{kpi.name}</p>
                        <p className="text-sm font-bold text-neutral-900">{kpi.value.toFixed(kpi.unit === '%' || kpi.unit === 'x' ? 1 : 0)}{kpi.unit}</p>
                        <p className="text-[8px] text-neutral-500">Target: {kpi.direction === 'higher' ? '≥' : '≤'}{kpi.target.toFixed(0)}{kpi.unit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slide 4: Scale Readiness with Gauge */}
                <div className="w-full flex-shrink-0 pl-3">
                  <div className={`p-3 rounded-lg border mb-2 ${results.readyToScale ? 'border-green-300 bg-green-50' : 'border-neutral-200 bg-neutral-50'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${results.readyToScale ? 'bg-green-500' : 'bg-neutral-400'}`}>
                        <Rocket className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-neutral-900">{results.readyToScale ? 'Ready to Scale!' : 'Not Ready Yet'}</p>
                        <p className="text-[10px] text-neutral-600">{results.readyToScale ? 'Your metrics look healthy' : 'Improve metrics below'}</p>
                      </div>
                    </div>
                  </div>
                  <ReadinessGauge score={readinessScore} ready={results.readyToScale} />
                  <div className="grid grid-cols-2 gap-1.5 mt-2">
                    {[
                      { label: 'Profit Margin ≥15%', ok: results.scaleReadiness.profitMarginOk },
                      { label: 'LTV:CAC ≥3x', ok: results.scaleReadiness.ltvCacOk },
                      { label: 'Gross Margin ≥50%', ok: results.scaleReadiness.grossMarginOk },
                      { label: `Revenue ≥${currencyInfo.symbol}10K`, ok: results.scaleReadiness.consistentRevenue },
                    ].map((item, i) => (
                      <div key={i} className={`p-1.5 rounded border flex items-center gap-1.5 ${item.ok ? 'border-green-300 bg-green-50' : 'border-neutral-200 bg-white'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${item.ok ? 'bg-green-500' : 'bg-neutral-300'}`}>
                          {item.ok ? <Check className="w-2.5 h-2.5 text-white" /> : <X className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span className={`text-[9px] font-medium ${item.ok ? 'text-green-700' : 'text-neutral-500'}`}>{item.label}</span>
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
function CompactInput({ label, value, onChange, prefix, suffix, step = 1 }: {
  label: string; value: number; onChange: (v: string) => void; prefix?: string; suffix?: string; step?: number;
}) {
  return (
    <div>
      <label className="text-[8px] text-white/60 mb-0.5 block">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[9px] text-white/50">{prefix}</span>}
        <input type="number" step={step} value={value} onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-white/10 border border-white/20 rounded py-1 text-white text-[10px] focus:outline-none focus:border-white/40 ${prefix ? 'pl-4 pr-1.5' : suffix ? 'pl-1.5 pr-4' : 'px-1.5'}`} />
        {suffix && <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] text-white/50">{suffix}</span>}
      </div>
    </div>
  );
}

function MetricCard({ label, value, highlight }: { label: string; value: string; highlight?: 'positive' | 'negative' }) {
  return (
    <div className="p-1.5 rounded border border-neutral-200 bg-white">
      <p className="text-[8px] font-medium text-neutral-600 uppercase mb-0.5">{label}</p>
      <p className={`text-xs font-bold ${highlight === 'negative' ? 'text-red-600' : 'text-neutral-900'}`}>{value}</p>
    </div>
  );
}
