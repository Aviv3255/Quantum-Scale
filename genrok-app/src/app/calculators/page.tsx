'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Calculator inputs state
interface CalculatorInputs {
  aov: number;
  dailyBudget: number;
  cpa: number;
  cogs: number;
  ltv3m: number;
  conversionRate: number;
}

// Calculated results
interface CalculatorResults {
  dailyCustomers: number;
  dailyRevenue: number;
  dailyProfit: number;
  monthlyProfit: number;
  margin: number;
  roas: number;
  ltvToCac: number;
}

function useCalculator(inputs: CalculatorInputs): CalculatorResults {
  return useMemo(() => {
    const dailyCustomers = inputs.dailyBudget / inputs.cpa;
    const dailyRevenue = dailyCustomers * inputs.aov;
    const dailyCosts = dailyRevenue * (inputs.cogs / 100);
    const dailyProfit = dailyRevenue - dailyCosts - inputs.dailyBudget;
    const monthlyProfit = dailyProfit * 30;
    const margin = (dailyProfit / dailyRevenue) * 100;
    const roas = dailyRevenue / inputs.dailyBudget;
    const ltvToCac = inputs.ltv3m / inputs.cpa;

    return {
      dailyCustomers: Math.round(dailyCustomers * 10) / 10,
      dailyRevenue: Math.round(dailyRevenue),
      dailyProfit: Math.round(dailyProfit),
      monthlyProfit: Math.round(monthlyProfit),
      margin: Math.round(margin * 10) / 10,
      roas: Math.round(roas * 100) / 100,
      ltvToCac: Math.round(ltvToCac * 10) / 10,
    };
  }, [inputs]);
}

// ============================================================================
// STYLE 1: SPLIT DASHBOARD (Like shipment tracking)
// ============================================================================
function Style1({ inputs, setInputs, results }: StyleProps) {
  const calculators = [
    { id: 'profit', name: 'Profit Sim', active: true },
    { id: 'kpi', name: 'KPI X-Ray', active: false },
    { id: 'ltv', name: 'LTV Calc', active: false },
    { id: 'scale', name: 'Scale Ready', active: false },
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex gap-4">
      {/* Left Panel - Calculator Selection */}
      <div className="w-64 flex flex-col gap-2">
        {calculators.map((calc) => (
          <button
            key={calc.id}
            className={`p-4 rounded-2xl text-left transition-all ${
              calc.active
                ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20'
                : 'bg-white border border-[var(--border-light)] hover:border-[var(--primary)]/30'
            }`}
          >
            <span className="font-medium">{calc.name}</span>
          </button>
        ))}

        {/* Compact Inputs */}
        <div className="mt-4 p-4 bg-white rounded-2xl border border-[var(--border-light)] flex-1">
          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Inputs</p>
          <div className="space-y-3">
            {[
              { label: 'AOV', value: inputs.aov, key: 'aov', prefix: '$' },
              { label: 'Daily Budget', value: inputs.dailyBudget, key: 'dailyBudget', prefix: '$' },
              { label: 'CPA', value: inputs.cpa, key: 'cpa', prefix: '$' },
              { label: 'COGS %', value: inputs.cogs, key: 'cogs', suffix: '%' },
            ].map((input) => (
              <div key={input.key} className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)]">{input.label}</span>
                <input
                  type="number"
                  value={input.value}
                  onChange={(e) => setInputs({ ...inputs, [input.key]: Number(e.target.value) })}
                  className="w-20 text-right text-sm font-medium bg-[var(--bg-secondary)] rounded-lg px-2 py-1 border-0 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Visual Results */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Main Visual Area */}
        <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[var(--primary)]/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500/5 to-transparent rounded-full blur-2xl" />

          <div className="relative z-10 h-full flex flex-col">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Profit Analysis</h2>
            <p className="text-sm text-[var(--text-muted)] mb-8">Real-time calculation based on your inputs</p>

            {/* Big Numbers */}
            <div className="flex-1 flex items-center justify-center gap-16">
              <div className="text-center">
                <p className="text-6xl font-bold bg-gradient-to-r from-[var(--primary)] to-blue-600 bg-clip-text text-transparent">
                  ${results.monthlyProfit.toLocaleString()}
                </p>
                <p className="text-sm text-[var(--text-muted)] mt-2">Monthly Profit</p>
              </div>
              <div className="w-px h-24 bg-gradient-to-b from-transparent via-[var(--border-light)] to-transparent" />
              <div className="text-center">
                <p className={`text-5xl font-bold ${results.margin >= 20 ? 'text-emerald-500' : results.margin >= 10 ? 'text-amber-500' : 'text-rose-500'}`}>
                  {results.margin}%
                </p>
                <p className="text-sm text-[var(--text-muted)] mt-2">Profit Margin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="h-20 bg-white rounded-2xl border border-[var(--border-light)] flex items-center px-6 gap-8">
          {[
            { label: 'Daily Revenue', value: `$${results.dailyRevenue.toLocaleString()}` },
            { label: 'Daily Profit', value: `$${results.dailyProfit.toLocaleString()}`, color: results.dailyProfit >= 0 ? 'text-emerald-500' : 'text-rose-500' },
            { label: 'ROAS', value: `${results.roas}x` },
            { label: 'Customers/Day', value: results.dailyCustomers },
          ].map((stat, i) => (
            <div key={i} className="flex-1">
              <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
              <p className={`text-lg font-semibold ${stat.color || 'text-[var(--text-primary)]'}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// STYLE 2: CENTERED FOCUS (Big visual in center)
// ============================================================================
function Style2({ inputs, setInputs, results }: StyleProps) {
  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      {/* Top Bar - Inputs */}
      <div className="flex items-center justify-center gap-6 mb-6">
        {[
          { label: 'AOV', value: inputs.aov, key: 'aov' },
          { label: 'Budget', value: inputs.dailyBudget, key: 'dailyBudget' },
          { label: 'CPA', value: inputs.cpa, key: 'cpa' },
          { label: 'COGS', value: inputs.cogs, key: 'cogs' },
        ].map((input, i) => (
          <div key={input.key} className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-[var(--border-light)]">
            <span className="text-xs text-[var(--text-muted)]">{input.label}</span>
            <input
              type="number"
              value={input.value}
              onChange={(e) => setInputs({ ...inputs, [input.key]: Number(e.target.value) })}
              className="w-16 text-center text-sm font-semibold bg-transparent border-0 focus:outline-none"
            />
          </div>
        ))}
      </div>

      {/* Main Visual - Circular Display */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Background Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[var(--primary)]/10 via-purple-500/5 to-transparent blur-3xl" />
        </div>

        {/* Central Circle */}
        <div className="relative">
          <div className="w-80 h-80 rounded-full bg-gradient-to-br from-white to-slate-50 shadow-2xl shadow-slate-200/50 flex items-center justify-center border border-white/50">
            <div className="text-center">
              <p className="text-sm text-[var(--text-muted)] mb-2">Monthly Profit</p>
              <p className="text-5xl font-bold text-[var(--text-primary)]">
                ${results.monthlyProfit.toLocaleString()}
              </p>
              <p className={`text-xl font-semibold mt-2 ${results.margin >= 20 ? 'text-emerald-500' : 'text-amber-500'}`}>
                {results.margin}% margin
              </p>
            </div>
          </div>

          {/* Floating Stats */}
          {[
            { label: 'ROAS', value: `${results.roas}x`, angle: -45, distance: 200 },
            { label: 'Daily', value: `$${results.dailyProfit}`, angle: 45, distance: 200 },
            { label: 'Customers', value: results.dailyCustomers, angle: 135, distance: 200 },
            { label: 'Revenue', value: `$${results.dailyRevenue}`, angle: 225, distance: 200 },
          ].map((stat, i) => {
            const x = Math.cos((stat.angle * Math.PI) / 180) * stat.distance;
            const y = Math.sin((stat.angle * Math.PI) / 180) * stat.distance;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="absolute bg-white rounded-2xl px-4 py-3 shadow-lg border border-[var(--border-light)]"
                style={{ left: `calc(50% + ${x}px - 50px)`, top: `calc(50% + ${y}px - 30px)` }}
              >
                <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
                <p className="text-lg font-bold text-[var(--text-primary)]">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// STYLE 3: DARK COCKPIT (Dark theme with glowing elements)
// ============================================================================
function Style3({ inputs, setInputs, results }: StyleProps) {
  return (
    <div className="h-[calc(100vh-140px)] bg-slate-900 rounded-3xl p-6 flex gap-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full" />

      <div className="relative z-10 flex gap-6 w-full">
        {/* Left - Inputs Panel */}
        <div className="w-72 bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
          <h3 className="text-white font-semibold mb-4">Control Panel</h3>
          <div className="space-y-4">
            {[
              { label: 'Average Order Value', value: inputs.aov, key: 'aov' },
              { label: 'Daily Ad Budget', value: inputs.dailyBudget, key: 'dailyBudget' },
              { label: 'Cost Per Acquisition', value: inputs.cpa, key: 'cpa' },
              { label: 'COGS Percentage', value: inputs.cogs, key: 'cogs' },
            ].map((input) => (
              <div key={input.key}>
                <label className="text-xs text-slate-400 block mb-1">{input.label}</label>
                <input
                  type="number"
                  value={input.value}
                  onChange={(e) => setInputs({ ...inputs, [input.key]: Number(e.target.value) })}
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right - Visual Display */}
        <div className="flex-1 flex flex-col">
          {/* Main Display */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-slate-400 text-sm uppercase tracking-widest mb-4">Projected Monthly Profit</p>
              <p className="text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                ${results.monthlyProfit.toLocaleString()}
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className={`inline-block w-3 h-3 rounded-full ${results.margin >= 20 ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
                <span className="text-slate-300">{results.margin}% Profit Margin</span>
              </div>
            </div>
          </div>

          {/* Bottom Gauges */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'ROAS', value: results.roas, suffix: 'x', max: 5 },
              { label: 'Daily Profit', value: results.dailyProfit, prefix: '$', max: 1000 },
              { label: 'Customers', value: results.dailyCustomers, max: 50 },
              { label: 'Revenue', value: results.dailyRevenue, prefix: '$', max: 5000 },
            ].map((gauge, i) => (
              <div key={i} className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10">
                <p className="text-xs text-slate-500 mb-2">{gauge.label}</p>
                <p className="text-xl font-bold text-white">{gauge.prefix}{gauge.value.toLocaleString()}{gauge.suffix}</p>
                <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
                    style={{ width: `${Math.min((gauge.value / gauge.max) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// STYLE 4: GLASS MORPHISM (Frosted glass with depth)
// ============================================================================
function Style4({ inputs, setInputs, results }: StyleProps) {
  return (
    <div className="h-[calc(100vh-140px)] relative overflow-hidden rounded-3xl">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-rose-50 to-amber-50" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-violet-400/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-300/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 h-full p-8 flex gap-8">
        {/* Left Panel */}
        <div className="w-80">
          <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-xl">
            <h3 className="font-semibold text-[var(--text-primary)] mb-6">Profit Calculator</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'AOV', value: inputs.aov, key: 'aov' },
                { label: 'Budget', value: inputs.dailyBudget, key: 'dailyBudget' },
                { label: 'CPA', value: inputs.cpa, key: 'cpa' },
                { label: 'COGS %', value: inputs.cogs, key: 'cogs' },
              ].map((input) => (
                <div key={input.key} className="bg-white/50 rounded-2xl p-3">
                  <label className="text-xs text-[var(--text-muted)] block mb-1">{input.label}</label>
                  <input
                    type="number"
                    value={input.value}
                    onChange={(e) => setInputs({ ...inputs, [input.key]: Number(e.target.value) })}
                    className="w-full bg-transparent text-lg font-semibold text-[var(--text-primary)] focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Main Card */}
          <div className="flex-1 bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider mb-2">Monthly Projection</p>
              <p className="text-6xl font-bold text-[var(--text-primary)]">
                ${results.monthlyProfit.toLocaleString()}
              </p>
              <div className="flex items-center justify-center gap-6 mt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-violet-600">{results.margin}%</p>
                  <p className="text-xs text-[var(--text-muted)]">Margin</p>
                </div>
                <div className="w-px h-12 bg-[var(--border-light)]" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-rose-500">{results.roas}x</p>
                  <p className="text-xs text-[var(--text-muted)]">ROAS</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Daily Revenue', value: `$${results.dailyRevenue.toLocaleString()}`, color: 'from-violet-500 to-purple-500' },
              { label: 'Daily Profit', value: `$${results.dailyProfit.toLocaleString()}`, color: 'from-rose-500 to-pink-500' },
              { label: 'Customers/Day', value: results.dailyCustomers, color: 'from-amber-500 to-orange-500' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/40 backdrop-blur rounded-2xl p-4 border border-white/50">
                <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// STYLE 5: MINIMAL GRID (Ultra clean with grid layout)
// ============================================================================
function Style5({ inputs, setInputs, results }: StyleProps) {
  return (
    <div className="h-[calc(100vh-140px)] grid grid-cols-3 grid-rows-2 gap-4">
      {/* Top Left - Inputs */}
      <div className="bg-white rounded-2xl border border-[var(--border-light)] p-6">
        <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">Inputs</p>
        <div className="space-y-3">
          {[
            { label: 'AOV', value: inputs.aov, key: 'aov' },
            { label: 'Daily Budget', value: inputs.dailyBudget, key: 'dailyBudget' },
            { label: 'CPA', value: inputs.cpa, key: 'cpa' },
            { label: 'COGS %', value: inputs.cogs, key: 'cogs' },
          ].map((input) => (
            <div key={input.key} className="flex items-center justify-between">
              <span className="text-sm text-[var(--text-muted)]">{input.label}</span>
              <input
                type="number"
                value={input.value}
                onChange={(e) => setInputs({ ...inputs, [input.key]: Number(e.target.value) })}
                className="w-24 text-right font-semibold bg-[var(--bg-secondary)] rounded-lg px-3 py-1.5 border-0 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Top Center & Right - Main Result */}
      <div className="col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm mb-2">Monthly Profit</p>
          <p className="text-5xl font-bold text-white">${results.monthlyProfit.toLocaleString()}</p>
        </div>
        <div className="flex gap-8">
          <div className="text-right">
            <p className="text-4xl font-bold text-emerald-400">{results.margin}%</p>
            <p className="text-slate-400 text-sm">Margin</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-cyan-400">{results.roas}x</p>
            <p className="text-slate-400 text-sm">ROAS</p>
          </div>
        </div>
      </div>

      {/* Bottom Row - Stats Grid */}
      {[
        { label: 'Daily Revenue', value: `$${results.dailyRevenue.toLocaleString()}`, sub: 'Based on AOV × Customers' },
        { label: 'Daily Profit', value: `$${results.dailyProfit.toLocaleString()}`, sub: 'Revenue - Costs - Ad Spend', highlight: results.dailyProfit >= 0 },
        { label: 'Customers/Day', value: results.dailyCustomers, sub: 'Budget ÷ CPA' },
      ].map((stat, i) => (
        <div key={i} className={`rounded-2xl p-6 ${stat.highlight === false ? 'bg-rose-50 border border-rose-100' : stat.highlight ? 'bg-emerald-50 border border-emerald-100' : 'bg-white border border-[var(--border-light)]'}`}>
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{stat.label}</p>
          <p className={`text-3xl font-bold mt-2 ${stat.highlight === false ? 'text-rose-600' : stat.highlight ? 'text-emerald-600' : 'text-[var(--text-primary)]'}`}>{stat.value}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">{stat.sub}</p>
        </div>
      ))}
    </div>
  );
}

// Style Props Interface
interface StyleProps {
  inputs: CalculatorInputs;
  setInputs: (inputs: CalculatorInputs) => void;
  results: CalculatorResults;
}

// Style names for toggle
const STYLES = [
  { id: 1, name: 'Dashboard', icon: '▦' },
  { id: 2, name: 'Focus', icon: '◉' },
  { id: 3, name: 'Cockpit', icon: '◈' },
  { id: 4, name: 'Glass', icon: '◇' },
  { id: 5, name: 'Grid', icon: '▤' },
];

export default function CalculatorsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [activeStyle, setActiveStyle] = useState(1);
  const [inputs, setInputs] = useState<CalculatorInputs>({
    aov: 60,
    dailyBudget: 500,
    cpa: 25,
    cogs: 35,
    ltv3m: 150,
    conversionRate: 2.5,
  });

  const results = useCalculator(inputs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  const styleProps = { inputs, setInputs, results };

  return (
    <DashboardLayout>
      <div className="h-screen overflow-hidden p-6">
        {/* Header with Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Profit Intelligence</h1>
            <p className="text-sm text-[var(--text-muted)]">Model your numbers. Scale with precision.</p>
          </div>

          {/* Style Toggle */}
          <div className="flex items-center gap-1 bg-[var(--bg-secondary)] rounded-2xl p-1">
            {STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => setActiveStyle(style.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  activeStyle === style.id
                    ? 'bg-white text-[var(--text-primary)] shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                <span>{style.icon}</span>
                <span className="hidden md:inline">{style.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Style Component */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStyle}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeStyle === 1 && <Style1 {...styleProps} />}
            {activeStyle === 2 && <Style2 {...styleProps} />}
            {activeStyle === 3 && <Style3 {...styleProps} />}
            {activeStyle === 4 && <Style4 {...styleProps} />}
            {activeStyle === 5 && <Style5 {...styleProps} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
