import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, TrendingUp, Target, Zap, BarChart3, Rocket } from 'lucide-react';

// Monkey video states - 18 levels from struggling to empire
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

// Animated number component for smooth counting
const AnimatedNumber = ({ value, prefix = '', suffix = '', duration = 800, decimals = 0 }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);

  useEffect(() => {
    const startValue = previousValue.current;
    const endValue = value;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
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
  }, [value, duration]);

  const formattedValue = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.round(displayValue).toLocaleString();

  return <span>{prefix}{formattedValue}{suffix}</span>;
};

export default function Calculators() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentMonkeyState, setCurrentMonkeyState] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef(null);
  const slidesContainerRef = useRef(null);

  const [inputs, setInputs] = useState({
    monthlyRevenue: 30000,
    aov: 60,
    cac: 25,
    cvr: 2.5,
    cogs: 35,
    adSpend: 15000,
    processingFees: 2.9,
    ltv1m: 60,
    ltv3m: 120,
    ltv6m: 200,
    ltv12m: 350,
    ltv24m: 500,
    otherCosts: 2000,
    currency: 'USD',
  });

  const [results, setResults] = useState(null);

  const currencies = {
    USD: '$', EUR: '€', GBP: '£', ILS: '₪', AUD: 'A$',
    CAD: 'C$', JPY: '¥', BRL: 'R$', MXN: '$', ZAR: 'R'
  };

  const rates = {
    USD: 1, EUR: 0.85, GBP: 0.73, ILS: 3.25, AUD: 1.35,
    CAD: 1.25, JPY: 110, BRL: 5.2, MXN: 20, ZAR: 14.5
  };

  const fmt = (amount) => {
    const converted = amount * rates[inputs.currency];
    return `${currencies[inputs.currency]}${Math.round(converted).toLocaleString()}`;
  };

  // Calculate all metrics
  const calculate = useCallback(() => {
    const { monthlyRevenue, aov, cac, cogs, adSpend, processingFees, otherCosts, ltv1m, ltv3m, ltv6m, ltv12m, ltv24m } = inputs;

    // Basic calculations
    const monthlyOrders = monthlyRevenue / aov;
    const grossProfit = monthlyRevenue - (monthlyRevenue * (cogs / 100));
    const processingCost = monthlyRevenue * (processingFees / 100);
    const totalCosts = (monthlyRevenue * (cogs / 100)) + adSpend + processingCost + otherCosts;
    const netProfit = monthlyRevenue - totalCosts;
    const profitMargin = monthlyRevenue > 0 ? (netProfit / monthlyRevenue) * 100 : 0;

    // Daily metrics
    const dailyRevenue = monthlyRevenue / 30;
    const dailyProfit = netProfit / 30;
    const dailyOrders = monthlyOrders / 30;

    // Find highest LTV and calculate future profit
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

    // LTV projections
    const ltvProjections = ltvValues.map(ltv => {
      const cohortRevenue = monthlyCustomers * ltv.value;
      const cohortCosts = (cohortRevenue * (cogs / 100)) + adSpend + (cohortRevenue * (processingFees / 100));
      const cohortProfit = cohortRevenue - cohortCosts;
      const margin = cohortRevenue > 0 ? (cohortProfit / cohortRevenue) * 100 : 0;
      return { ...ltv, profit: cohortProfit, margin, revenue: cohortRevenue };
    });

    // Business health score (0-100)
    const healthFactors = {
      profitMargin: Math.min(Math.max((profitMargin + 20) * 2, 0), 40), // -20% to +20% mapped to 0-40
      ltvToCac: Math.min((highestLTV.value / cac) * 5, 30), // LTV:CAC ratio contribution
      grossMargin: Math.min((100 - cogs) * 0.3, 30), // Gross margin contribution
    };
    const healthScore = Math.round(healthFactors.profitMargin + healthFactors.ltvToCac + healthFactors.grossMargin);

    // Scale readiness factors
    const scaleReadiness = {
      profitMarginOk: profitMargin >= 15,
      ltvCacOk: highestLTV.value / cac >= 3,
      grossMarginOk: (100 - cogs) >= 50,
      consistentRevenue: monthlyRevenue >= 10000,
    };
    const readyToScale = Object.values(scaleReadiness).filter(Boolean).length >= 3;

    // KPI Analysis
    const kpiAnalysis = [
      { name: 'Profit Margin', value: profitMargin, target: 20, direction: 'higher', unit: '%' },
      { name: 'LTV:CAC Ratio', value: highestLTV.value / cac, target: 3, direction: 'higher', unit: 'x' },
      { name: 'Gross Margin', value: 100 - cogs, target: 50, direction: 'higher', unit: '%' },
      { name: 'CAC', value: cac, target: aov * 0.3, direction: 'lower', unit: currencies[inputs.currency] },
      { name: 'COGS', value: cogs, target: 33, direction: 'lower', unit: '%' },
      { name: 'Processing Fees', value: processingFees, target: 3, direction: 'lower', unit: '%' },
    ].map(kpi => ({
      ...kpi,
      status: kpi.direction === 'higher'
        ? kpi.value >= kpi.target ? 'green' : kpi.value >= kpi.target * 0.8 ? 'amber' : 'red'
        : kpi.value <= kpi.target ? 'green' : kpi.value <= kpi.target * 1.2 ? 'amber' : 'red'
    }));

    setResults({
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
    });

    // Update monkey state based on profit margin
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
  }, [inputs, currentMonkeyState]);

  // Auto-calculate on input change
  useEffect(() => {
    calculate();
  }, [calculate]);

  // Slide navigation
  const slides = ['Profit Analysis', 'Future Projection', 'KPI X-Ray', 'Scale Readiness'];

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleInputChange = (key, value) => {
    setInputs(prev => ({ ...prev, [key]: Number(value) || 0 }));
  };

  const currentMonkey = MONKEY_VIDEOS[currentMonkeyState];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAFAFA' }}>
      {/* TOP SECTION - 60% viewport with video and metrics */}
      <div className="flex-1 min-h-[60vh] flex flex-col lg:flex-row relative overflow-hidden">
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
          <div className="relative w-full max-w-lg aspect-square">
            {/* Video container with smooth transition */}
            <div
              className={`absolute inset-0 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
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
                      background: results?.profitMargin >= 20 ? '#22c55e' : results?.profitMargin >= 0 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                  <span className="text-white text-sm font-medium">{currentMonkey?.name}</span>
                  <span className="text-white/50 text-xs ml-auto">Level {currentMonkeyState + 1}/18</span>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 blur-2xl" />
          </div>
        </div>

        {/* Right side - Key Metrics */}
        <div className="lg:w-80 xl:w-96 p-4 lg:p-8 flex flex-col justify-center">
          <div className="space-y-4">
            {/* Net Profit */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.05)'
              }}
            >
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Net Profit / Month</p>
              <p
                className="text-3xl xl:text-4xl font-bold transition-colors duration-300"
                style={{ color: results?.netProfit >= 0 ? '#22c55e' : '#ef4444' }}
              >
                {results && <AnimatedNumber value={results.netProfit} prefix={currencies[inputs.currency]} />}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Daily: {results && fmt(results.daily.profit)}
              </p>
            </div>

            {/* Profit Margin */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.05)'
              }}
            >
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Profit Margin</p>
              <p
                className="text-3xl xl:text-4xl font-bold transition-colors duration-300"
                style={{ color: results?.profitMargin >= 20 ? '#22c55e' : results?.profitMargin >= 0 ? '#f59e0b' : '#ef4444' }}
              >
                {results && <AnimatedNumber value={results.profitMargin} suffix="%" decimals={1} />}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Target: 20%+
              </p>
            </div>

            {/* Future Profit */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.05)'
              }}
            >
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Future Monthly Profit</p>
              <p className="text-3xl xl:text-4xl font-bold text-gray-900">
                {results && <AnimatedNumber value={results.futureMonthlyProfit} prefix={currencies[inputs.currency]} />}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Based on {results?.highestLTV?.period} LTV
              </p>
            </div>

            {/* Health Score */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.05)'
              }}
            >
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Business Health</p>
              <div className="flex items-end gap-2">
                <p className="text-3xl xl:text-4xl font-bold text-gray-900">
                  {results && <AnimatedNumber value={results.healthScore} />}
                </p>
                <span className="text-lg text-gray-400 mb-1">/100</span>
              </div>
              <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${results?.healthScore || 0}%`,
                    background: results?.healthScore >= 70 ? 'linear-gradient(90deg, #22c55e, #10b981)' :
                               results?.healthScore >= 40 ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' :
                               'linear-gradient(90deg, #ef4444, #dc2626)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION - 40% viewport with inputs and results slider */}
      <div className="min-h-[40vh] flex flex-col lg:flex-row">
        {/* Left - Data Input Panel (Dark) */}
        <div
          className="lg:w-[400px] xl:w-[450px] p-6 lg:p-8 overflow-y-auto"
          style={{
            background: 'linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)',
          }}
        >
          {/* Section selector */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-white/40 text-sm">Sections</span>
            <div className="flex gap-1 ml-2">
              {['1', '2', '3', '4'].map((num, i) => (
                <button
                  key={num}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${i === 0 ? 'bg-white text-black' : 'bg-white/10 text-white/50 hover:bg-white/20'}`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {/* Revenue & Orders */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider">Revenue & Orders</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-white/50 mb-1.5 block">Monthly Revenue</Label>
                  <Input
                    type="number"
                    value={inputs.monthlyRevenue}
                    onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 h-10"
                  />
                </div>
                <div>
                  <Label className="text-xs text-white/50 mb-1.5 block">AOV</Label>
                  <Input
                    type="number"
                    value={inputs.aov}
                    onChange={(e) => handleInputChange('aov', e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 h-10"
                  />
                </div>
              </div>
            </div>

            {/* Acquisition */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider">Acquisition</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-white/50 mb-1.5 block">CAC</Label>
                  <Input
                    type="number"
                    value={inputs.cac}
                    onChange={(e) => handleInputChange('cac', e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 h-10"
                  />
                </div>
                <div>
                  <Label className="text-xs text-white/50 mb-1.5 block">Ad Spend</Label>
                  <Input
                    type="number"
                    value={inputs.adSpend}
                    onChange={(e) => handleInputChange('adSpend', e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 h-10"
                  />
                </div>
              </div>
            </div>

            {/* Costs */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider">Costs</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-white/50 mb-1.5 block">COGS (%)</Label>
                  <Input
                    type="number"
                    value={inputs.cogs}
                    onChange={(e) => handleInputChange('cogs', e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 h-10"
                  />
                </div>
                <div>
                  <Label className="text-xs text-white/50 mb-1.5 block">Fees (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={inputs.processingFees}
                    onChange={(e) => handleInputChange('processingFees', e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 h-10"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs text-white/50 mb-1.5 block">Other Monthly Costs</Label>
                <Input
                  type="number"
                  value={inputs.otherCosts}
                  onChange={(e) => handleInputChange('otherCosts', e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 h-10"
                />
              </div>
            </div>

            {/* LTV Metrics */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider">LTV Metrics</h3>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { key: 'ltv1m', label: '1M' },
                  { key: 'ltv3m', label: '3M' },
                  { key: 'ltv6m', label: '6M' },
                  { key: 'ltv12m', label: '12M' },
                  { key: 'ltv24m', label: '24M' },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <Label className="text-xs text-white/50 mb-1.5 block text-center">{label}</Label>
                    <Input
                      type="number"
                      value={inputs[key]}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 h-10 text-center text-sm px-1"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Currency */}
            <div>
              <Label className="text-xs text-white/50 mb-1.5 block">Currency</Label>
              <Select value={inputs.currency} onValueChange={(v) => setInputs(prev => ({ ...prev, currency: v }))}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10">
                  {Object.keys(currencies).map(c => (
                    <SelectItem key={c} value={c} className="text-white hover:bg-white/10">{c} ({currencies[c]})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Info card */}
          <div
            className="mt-6 p-4 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            }}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Real-time Analysis</p>
                <p className="text-white/70 text-xs mt-1">Your metrics update instantly as you adjust inputs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Results Slider */}
        <div className="flex-1 bg-white p-6 lg:p-8 overflow-hidden">
          {/* Slider Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {slides[activeSlide]}
            </h2>
            <div className="flex items-center gap-2">
              {/* Navigation dots */}
              <div className="flex gap-1.5 mr-4">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === activeSlide ? 'bg-gray-900 w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
                  />
                ))}
              </div>
              {/* Arrow buttons */}
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Slides Container */}
          <div
            ref={slidesContainerRef}
            className="relative overflow-hidden"
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {/* Slide 1: Profit Analysis */}
              <div className="w-full flex-shrink-0 pr-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Daily Stats */}
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <p className="text-xs font-medium text-gray-400 uppercase mb-1">Daily Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{results && fmt(results.daily.revenue)}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <p className="text-xs font-medium text-gray-400 uppercase mb-1">Daily Profit</p>
                    <p className="text-2xl font-bold" style={{ color: results?.daily.profit >= 0 ? '#22c55e' : '#ef4444' }}>
                      {results && fmt(results.daily.profit)}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <p className="text-xs font-medium text-gray-400 uppercase mb-1">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{results && fmt(results.monthly.revenue)}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <p className="text-xs font-medium text-gray-400 uppercase mb-1">Monthly Profit</p>
                    <p className="text-2xl font-bold" style={{ color: results?.netProfit >= 0 ? '#22c55e' : '#ef4444' }}>
                      {results && fmt(results.netProfit)}
                    </p>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Cost Breakdown</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {results && [
                      { label: 'COGS', value: results.breakdown.cogs, color: '#ef4444' },
                      { label: 'Ad Spend', value: results.breakdown.adSpend, color: '#f59e0b' },
                      { label: 'Processing', value: results.breakdown.processing, color: '#3b82f6' },
                      { label: 'Other', value: results.breakdown.other, color: '#8b5cf6' },
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-xl bg-gray-50">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                          <span className="text-xs text-gray-500">{item.label}</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{fmt(item.value)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Slide 2: Future Projection */}
              <div className="w-full flex-shrink-0 px-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-3">
                    {results?.ltvProjections?.map((ltv, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl text-center transition-all hover:scale-105"
                        style={{
                          background: ltv.period === results.highestLTV.period ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : '#f9fafb',
                          color: ltv.period === results.highestLTV.period ? 'white' : 'inherit'
                        }}
                      >
                        <p className={`text-xs font-semibold mb-2 ${ltv.period === results.highestLTV.period ? 'text-white/80' : 'text-gray-400'}`}>
                          {ltv.period}
                        </p>
                        <p className={`text-lg font-bold mb-1 ${ltv.period === results.highestLTV.period ? 'text-white' : ltv.profit >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                          {fmt(ltv.profit)}
                        </p>
                        <p className={`text-xs ${ltv.period === results.highestLTV.period ? 'text-white/70' : 'text-gray-400'}`}>
                          {ltv.margin.toFixed(1)}% margin
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Future Monthly Profit (based on {results?.highestLTV?.period} LTV)</p>
                        <p className="text-3xl font-bold text-gray-900">{results && fmt(results.futureMonthlyProfit)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide 3: KPI X-Ray */}
              <div className="w-full flex-shrink-0 px-4">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {results?.kpiAnalysis?.map((kpi, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl border"
                      style={{
                        background: kpi.status === 'green' ? '#f0fdf4' : kpi.status === 'amber' ? '#fffbeb' : '#fef2f2',
                        borderColor: kpi.status === 'green' ? '#bbf7d0' : kpi.status === 'amber' ? '#fde68a' : '#fecaca'
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ background: kpi.status === 'green' ? '#22c55e' : kpi.status === 'amber' ? '#f59e0b' : '#ef4444' }}
                        />
                        <span className="text-xs font-medium text-gray-600">{kpi.name}</span>
                      </div>
                      <p
                        className="text-xl font-bold"
                        style={{ color: kpi.status === 'green' ? '#16a34a' : kpi.status === 'amber' ? '#d97706' : '#dc2626' }}
                      >
                        {kpi.value.toFixed(kpi.unit === '%' || kpi.unit === 'x' ? 1 : 0)}{kpi.unit}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Target: {kpi.direction === 'higher' ? '≥' : '≤'} {kpi.target}{kpi.unit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slide 4: Scale Readiness */}
              <div className="w-full flex-shrink-0 pl-4">
                <div
                  className="p-6 rounded-2xl mb-4"
                  style={{
                    background: results?.readyToScale
                      ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
                      : 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
                    border: `1px solid ${results?.readyToScale ? '#bbf7d0' : '#fecaca'}`
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: results?.readyToScale ? '#22c55e' : '#ef4444' }}
                    >
                      <Rocket className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {results?.readyToScale ? 'Ready to Scale!' : 'Not Ready Yet'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {results?.readyToScale
                          ? 'Your metrics show healthy fundamentals for scaling'
                          : 'Improve the factors below before scaling'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {results && [
                    { label: 'Profit Margin ≥15%', ok: results.scaleReadiness.profitMarginOk },
                    { label: 'LTV:CAC ≥3x', ok: results.scaleReadiness.ltvCacOk },
                    { label: 'Gross Margin ≥50%', ok: results.scaleReadiness.grossMarginOk },
                    { label: 'Revenue ≥$10K/mo', ok: results.scaleReadiness.consistentRevenue },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl flex items-center gap-3"
                      style={{
                        background: item.ok ? '#f0fdf4' : '#f9fafb',
                        border: `1px solid ${item.ok ? '#bbf7d0' : '#e5e7eb'}`
                      }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: item.ok ? '#22c55e' : '#d1d5db' }}
                      >
                        {item.ok ? '✓' : '–'}
                      </div>
                      <span className={`text-sm font-medium ${item.ok ? 'text-green-700' : 'text-gray-500'}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
