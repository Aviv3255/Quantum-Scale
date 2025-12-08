'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Image URLs
const IMAGES = {
  rocket: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/6a804b2e-57b5-4c04-a83b-cfd999948aa8.png?v=1765207263',
  sphere: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/f7ab440a-4e3c-4465-8a05-26ddb185a112.png?v=1765207348',
  chart: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/e885f87e-aa7f-490f-a312-d7fecd0771c3.png?v=1765207384',
};

// Types
interface Inputs {
  aov: number;
  budget: number;
  cpa: number;
  cogs: number;
}

interface Results {
  customers: number;
  revenue: number;
  profit: number;
  monthly: number;
  margin: number;
  roas: number;
}

// Calculate results
function useCalc(i: Inputs): Results {
  return useMemo(() => {
    const customers = i.budget / i.cpa;
    const revenue = customers * i.aov;
    const costs = revenue * (i.cogs / 100);
    const profit = revenue - costs - i.budget;
    return {
      customers: Math.round(customers * 10) / 10,
      revenue: Math.round(revenue),
      profit: Math.round(profit),
      monthly: Math.round(profit * 30),
      margin: Math.round((profit / revenue) * 1000) / 10,
      roas: Math.round((revenue / i.budget) * 100) / 100,
    };
  }, [i]);
}

// Shared input component
function InputField({ label, value, onChange, prefix, suffix }: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-wider text-[#888] mb-1.5 font-medium">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888] text-sm">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`w-full bg-[#f8f8f8] border-0 rounded-lg py-2.5 text-sm font-semibold text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 transition-shadow ${prefix ? 'pl-7 pr-3' : suffix ? 'pl-3 pr-7' : 'px-3'}`}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] text-sm">{suffix}</span>}
      </div>
    </div>
  );
}

// Props for styles
interface StyleProps {
  inputs: Inputs;
  setInputs: (i: Inputs) => void;
  results: Results;
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLE 1: LAUNCH - Rocket theme, split layout
// ═══════════════════════════════════════════════════════════════════════════
function StyleLaunch({ inputs, setInputs, results }: StyleProps) {
  return (
    <div className="h-[calc(100vh-160px)] flex gap-8">
      {/* Left: Inputs */}
      <div className="w-[280px] flex-shrink-0">
        <div className="bg-white rounded-2xl border border-[#eee] p-6 h-full">
          <h3 className="text-sm font-semibold text-[#1a1a1a] mb-6">Configure</h3>
          <div className="space-y-5">
            <InputField label="Average Order Value" value={inputs.aov} onChange={(v) => setInputs({ ...inputs, aov: v })} prefix="$" />
            <InputField label="Daily Ad Budget" value={inputs.budget} onChange={(v) => setInputs({ ...inputs, budget: v })} prefix="$" />
            <InputField label="Cost Per Acquisition" value={inputs.cpa} onChange={(v) => setInputs({ ...inputs, cpa: v })} prefix="$" />
            <InputField label="COGS" value={inputs.cogs} onChange={(v) => setInputs({ ...inputs, cogs: v })} suffix="%" />
          </div>
        </div>
      </div>

      {/* Right: Visual + Results */}
      <div className="flex-1 flex flex-col gap-5">
        {/* Main Display */}
        <div className="flex-1 bg-gradient-to-br from-[#fafafa] to-[#f0f4f8] rounded-3xl relative overflow-hidden flex">
          {/* Content */}
          <div className="flex-1 p-10 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[#888] mb-3">Monthly Projection</p>
            <p className="text-[72px] font-bold text-[#1a1a1a] leading-none tracking-tight">
              ${results.monthly.toLocaleString()}
            </p>
            <div className="flex items-center gap-6 mt-6">
              <div>
                <span className={`text-3xl font-bold ${results.margin >= 20 ? 'text-[#34C759]' : results.margin >= 10 ? 'text-[#FF9500]' : 'text-[#FF3B30]'}`}>
                  {results.margin}%
                </span>
                <p className="text-xs text-[#888] mt-1">Margin</p>
              </div>
              <div className="w-px h-10 bg-[#e0e0e0]" />
              <div>
                <span className="text-3xl font-bold text-[#007AFF]">{results.roas}x</span>
                <p className="text-xs text-[#888] mt-1">ROAS</p>
              </div>
            </div>
          </div>

          {/* Rocket */}
          <div className="w-[320px] flex items-center justify-center">
            <Image
              src={IMAGES.rocket}
              alt="Rocket"
              width={280}
              height={280}
              className="object-contain drop-shadow-2xl"
              unoptimized
            />
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Daily Revenue', value: `$${results.revenue.toLocaleString()}` },
            { label: 'Daily Profit', value: `$${results.profit.toLocaleString()}`, color: results.profit >= 0 ? '#34C759' : '#FF3B30' },
            { label: 'Customers/Day', value: results.customers.toString() },
            { label: 'Ad Efficiency', value: `${results.roas}x ROAS` },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#eee] px-5 py-4">
              <p className="text-[11px] uppercase tracking-wider text-[#888] mb-1">{s.label}</p>
              <p className="text-xl font-bold" style={{ color: s.color || '#1a1a1a' }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLE 2: ORBIT - Data sphere, dark theme
// ═══════════════════════════════════════════════════════════════════════════
function StyleOrbit({ inputs, setInputs, results }: StyleProps) {
  return (
    <div className="h-[calc(100vh-160px)] bg-[#0a0f1a] rounded-3xl overflow-hidden flex flex-col">
      {/* Top: Inputs */}
      <div className="flex items-center justify-center gap-4 p-6 border-b border-white/5">
        {[
          { label: 'AOV', value: inputs.aov, key: 'aov' },
          { label: 'Budget', value: inputs.budget, key: 'budget' },
          { label: 'CPA', value: inputs.cpa, key: 'cpa' },
          { label: 'COGS', value: inputs.cogs, key: 'cogs' },
        ].map((inp) => (
          <div key={inp.key} className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10">
            <span className="text-[11px] uppercase tracking-wider text-white/40">{inp.label}</span>
            <input
              type="number"
              value={inp.value}
              onChange={(e) => setInputs({ ...inputs, [inp.key]: Number(e.target.value) })}
              className="w-16 bg-transparent text-white text-sm font-semibold text-center focus:outline-none"
            />
          </div>
        ))}
      </div>

      {/* Center: Sphere + Main Result */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Glow effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[400px] h-[400px] bg-[#00a8ff]/10 rounded-full blur-[100px]" />
        </div>

        {/* Sphere */}
        <div className="relative">
          <Image
            src={IMAGES.sphere}
            alt="Data Sphere"
            width={300}
            height={300}
            className="object-contain"
            unoptimized
          />

          {/* Center text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Monthly</p>
            <p className="text-4xl font-bold text-white">${results.monthly.toLocaleString()}</p>
          </div>
        </div>

        {/* Floating stats */}
        {[
          { label: 'Margin', value: `${results.margin}%`, x: -220, y: -80 },
          { label: 'ROAS', value: `${results.roas}x`, x: 220, y: -80 },
          { label: 'Revenue', value: `$${results.revenue}`, x: -220, y: 80 },
          { label: 'Profit', value: `$${results.profit}`, x: 220, y: 80 },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="absolute bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10"
            style={{ left: `calc(50% + ${stat.x}px - 60px)`, top: `calc(50% + ${stat.y}px - 25px)` }}
          >
            <p className="text-[10px] uppercase tracking-wider text-white/40">{stat.label}</p>
            <p className="text-lg font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Bottom: Customers */}
      <div className="p-6 border-t border-white/5 flex justify-center">
        <div className="flex items-center gap-2 text-white/60">
          <span className="text-2xl font-bold text-white">{results.customers}</span>
          <span className="text-sm">customers per day</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLE 3: GROWTH - Bar chart focus
// ═══════════════════════════════════════════════════════════════════════════
function StyleGrowth({ inputs, setInputs, results }: StyleProps) {
  return (
    <div className="h-[calc(100vh-160px)] grid grid-cols-[1fr_340px] gap-6">
      {/* Left: Chart + Results */}
      <div className="bg-white rounded-3xl border border-[#eee] p-8 flex flex-col">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a]">Profit Projection</h2>
            <p className="text-sm text-[#888] mt-1">Based on your current metrics</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-[#1a1a1a]">${results.monthly.toLocaleString()}</p>
            <p className="text-xs uppercase tracking-wider text-[#888] mt-1">Monthly Profit</p>
          </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 flex items-end justify-center pb-8">
          <Image
            src={IMAGES.chart}
            alt="Growth Chart"
            width={400}
            height={280}
            className="object-contain"
            unoptimized
          />
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-4 gap-4 pt-6 border-t border-[#eee]">
          {[
            { label: 'Margin', value: `${results.margin}%`, color: results.margin >= 20 ? '#34C759' : '#FF9500' },
            { label: 'ROAS', value: `${results.roas}x`, color: '#007AFF' },
            { label: 'Daily', value: `$${results.profit}`, color: results.profit >= 0 ? '#34C759' : '#FF3B30' },
            { label: 'Customers', value: results.customers.toString(), color: '#1a1a1a' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[11px] uppercase tracking-wider text-[#888] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Inputs */}
      <div className="bg-[#fafafa] rounded-3xl border border-[#eee] p-8">
        <h3 className="text-lg font-semibold text-[#1a1a1a] mb-8">Parameters</h3>
        <div className="space-y-6">
          <InputField label="Average Order Value" value={inputs.aov} onChange={(v) => setInputs({ ...inputs, aov: v })} prefix="$" />
          <InputField label="Daily Ad Budget" value={inputs.budget} onChange={(v) => setInputs({ ...inputs, budget: v })} prefix="$" />
          <InputField label="Cost Per Acquisition" value={inputs.cpa} onChange={(v) => setInputs({ ...inputs, cpa: v })} prefix="$" />
          <InputField label="Cost of Goods Sold" value={inputs.cogs} onChange={(v) => setInputs({ ...inputs, cogs: v })} suffix="%" />
        </div>

        <div className="mt-10 p-5 bg-white rounded-2xl border border-[#eee]">
          <p className="text-[11px] uppercase tracking-wider text-[#888] mb-2">Daily Revenue</p>
          <p className="text-3xl font-bold text-[#1a1a1a]">${results.revenue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLE 4: EDITORIAL - Typography focused, ultra minimal
// ═══════════════════════════════════════════════════════════════════════════
function StyleEditorial({ inputs, setInputs, results }: StyleProps) {
  return (
    <div className="h-[calc(100vh-160px)] flex">
      {/* Left: Big Typography */}
      <div className="flex-1 flex flex-col justify-center pr-16">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#888] mb-4">Projected Monthly Profit</p>
        <h1 className="text-[120px] font-bold text-[#1a1a1a] leading-[0.9] tracking-tight">
          ${results.monthly.toLocaleString()}
        </h1>

        <div className="flex items-center gap-12 mt-12">
          <div>
            <p className={`text-5xl font-bold ${results.margin >= 20 ? 'text-[#34C759]' : 'text-[#FF9500]'}`}>{results.margin}%</p>
            <p className="text-sm text-[#888] mt-2">Profit Margin</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-[#007AFF]">{results.roas}x</p>
            <p className="text-sm text-[#888] mt-2">Return on Ad Spend</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-[#1a1a1a]">{results.customers}</p>
            <p className="text-sm text-[#888] mt-2">Daily Customers</p>
          </div>
        </div>
      </div>

      {/* Right: Inputs */}
      <div className="w-[300px] flex flex-col justify-center border-l border-[#eee] pl-16">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#888] mb-8">Configure</p>
        <div className="space-y-6">
          {[
            { label: 'AOV', value: inputs.aov, key: 'aov', prefix: '$' },
            { label: 'Daily Budget', value: inputs.budget, key: 'budget', prefix: '$' },
            { label: 'CPA', value: inputs.cpa, key: 'cpa', prefix: '$' },
            { label: 'COGS', value: inputs.cogs, key: 'cogs', suffix: '%' },
          ].map((inp) => (
            <div key={inp.key}>
              <label className="block text-[11px] uppercase tracking-wider text-[#888] mb-2">{inp.label}</label>
              <div className="flex items-center gap-2 border-b border-[#ddd] pb-2">
                {inp.prefix && <span className="text-[#888]">{inp.prefix}</span>}
                <input
                  type="number"
                  value={inp.value}
                  onChange={(e) => setInputs({ ...inputs, [inp.key]: Number(e.target.value) })}
                  className="flex-1 bg-transparent text-2xl font-semibold text-[#1a1a1a] focus:outline-none"
                />
                {inp.suffix && <span className="text-[#888]">{inp.suffix}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLE 5: COMMAND - Premium dark dashboard
// ═══════════════════════════════════════════════════════════════════════════
function StyleCommand({ inputs, setInputs, results }: StyleProps) {
  return (
    <div className="h-[calc(100vh-160px)] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl overflow-hidden grid grid-cols-[280px_1fr] grid-rows-[1fr_auto]">
      {/* Left Panel: Inputs */}
      <div className="row-span-2 border-r border-white/5 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-2 rounded-full bg-[#34C759]" />
          <span className="text-xs uppercase tracking-wider text-white/40">System Active</span>
        </div>

        <div className="space-y-5 flex-1">
          {[
            { label: 'Order Value', value: inputs.aov, key: 'aov' },
            { label: 'Ad Budget', value: inputs.budget, key: 'budget' },
            { label: 'Acq. Cost', value: inputs.cpa, key: 'cpa' },
            { label: 'COGS %', value: inputs.cogs, key: 'cogs' },
          ].map((inp) => (
            <div key={inp.key}>
              <label className="block text-[10px] uppercase tracking-wider text-white/30 mb-2">{inp.label}</label>
              <input
                type="number"
                value={inp.value}
                onChange={(e) => setInputs({ ...inputs, [inp.key]: Number(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm font-medium focus:outline-none focus:border-[#007AFF]/50"
              />
            </div>
          ))}
        </div>

        {/* Rocket accent */}
        <div className="mt-auto pt-6">
          <Image
            src={IMAGES.rocket}
            alt="Rocket"
            width={120}
            height={120}
            className="object-contain opacity-60 mx-auto"
            unoptimized
          />
        </div>
      </div>

      {/* Main Display */}
      <div className="p-10 flex flex-col justify-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">Profit Intelligence</p>
        <p className="text-[80px] font-bold text-white leading-none tracking-tight">
          ${results.monthly.toLocaleString()}
        </p>
        <p className="text-white/40 text-sm mt-3">projected monthly profit</p>

        <div className="flex items-center gap-10 mt-10">
          <div>
            <p className={`text-4xl font-bold ${results.margin >= 20 ? 'text-[#34C759]' : 'text-[#FF9500]'}`}>{results.margin}%</p>
            <p className="text-[10px] uppercase tracking-wider text-white/30 mt-1">Margin</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#5AC8FA]">{results.roas}x</p>
            <p className="text-[10px] uppercase tracking-wider text-white/30 mt-1">ROAS</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white">{results.customers}</p>
            <p className="text-[10px] uppercase tracking-wider text-white/30 mt-1">Customers</p>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="border-t border-white/5 p-4 flex items-center gap-6">
        {[
          { label: 'Daily Revenue', value: `$${results.revenue.toLocaleString()}` },
          { label: 'Daily Profit', value: `$${results.profit.toLocaleString()}`, color: results.profit >= 0 ? '#34C759' : '#FF3B30' },
          { label: 'Break-even', value: results.profit >= 0 ? 'Profitable' : 'Loss', color: results.profit >= 0 ? '#34C759' : '#FF3B30' },
        ].map((s, i) => (
          <div key={i} className="flex-1 text-center">
            <p className="text-[10px] uppercase tracking-wider text-white/30 mb-1">{s.label}</p>
            <p className="text-lg font-semibold" style={{ color: s.color || 'white' }}>{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Style definitions
const STYLES = [
  { id: 'launch', name: 'Launch', component: StyleLaunch },
  { id: 'orbit', name: 'Orbit', component: StyleOrbit },
  { id: 'growth', name: 'Growth', component: StyleGrowth },
  { id: 'editorial', name: 'Editorial', component: StyleEditorial },
  { id: 'command', name: 'Command', component: StyleCommand },
];

// Main Page
export default function CalculatorsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [activeStyle, setActiveStyle] = useState('launch');
  const [inputs, setInputs] = useState<Inputs>({
    aov: 60,
    budget: 500,
    cpa: 25,
    cogs: 35,
  });

  const results = useCalc(inputs);

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

  const ActiveComponent = STYLES.find(s => s.id === activeStyle)?.component || StyleLaunch;

  return (
    <DashboardLayout>
      <div className="h-screen overflow-hidden px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-[#1a1a1a]">Profit Calculator</h1>
            <p className="text-sm text-[#888]">Model your numbers with precision</p>
          </div>

          {/* Style Toggle */}
          <div className="flex items-center gap-1 bg-[#f5f5f5] rounded-xl p-1">
            {STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => setActiveStyle(style.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeStyle === style.id
                    ? 'bg-white text-[#1a1a1a] shadow-sm'
                    : 'text-[#888] hover:text-[#1a1a1a]'
                }`}
              >
                {style.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Style */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <ActiveComponent inputs={inputs} setInputs={setInputs} results={results} />
          </motion.div>
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
