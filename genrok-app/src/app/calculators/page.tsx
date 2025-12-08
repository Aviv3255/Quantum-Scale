'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

// ═══════════════════════════════════════════════════════════════════════════════
// IMAGES
// ═══════════════════════════════════════════════════════════════════════════════
const IMAGES = {
  rocket: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/6a804b2e-57b5-4c04-a83b-cfd999948aa8.png?v=1765207263',
  sphere: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/f7ab440a-4e3c-4465-8a05-26ddb185a112.png?v=1765207348',
  chart: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/e885f87e-aa7f-490f-a312-d7fecd0771c3.png?v=1765207384',
};

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════
interface CalcInputs {
  // Profit Engine
  aov: number;
  dailyBudget: number;
  cpa: number;
  cogs: number;
  // LTV
  purchaseFreq: number;
  retentionRate: number;
  // Scale
  targetBudget: number;
  currentRoas: number;
  // Break-Even
  fixedCosts: number;
  // Unit Economics
  productCost: number;
  shippingCost: number;
  paymentFees: number;
}

interface AllResults {
  // Profit Engine
  dailyRevenue: number;
  dailyProfit: number;
  monthlyProfit: number;
  margin: number;
  roas: number;
  customersPerDay: number;
  // LTV
  ltv12: number;
  ltv24: number;
  cacLtvRatio: number;
  paybackDays: number;
  // Scale
  projectedRoas: number;
  riskLevel: string;
  recommendedBudget: number;
  efficiencyLoss: number;
  // Break-Even
  breakEvenOrders: number;
  breakEvenRevenue: number;
  minRoas: number;
  safetyMargin: number;
  // Unit Economics
  contributionMargin: number;
  contributionPct: number;
  trueProfit: number;
  healthStatus: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CALCULATOR ENGINE
// ═══════════════════════════════════════════════════════════════════════════════
function useCalculations(i: CalcInputs): AllResults {
  return useMemo(() => {
    // Profit Engine
    const customersPerDay = i.dailyBudget / i.cpa;
    const dailyRevenue = customersPerDay * i.aov;
    const cogsCost = dailyRevenue * (i.cogs / 100);
    const dailyProfit = dailyRevenue - cogsCost - i.dailyBudget;
    const monthlyProfit = dailyProfit * 30;
    const margin = dailyRevenue > 0 ? (dailyProfit / dailyRevenue) * 100 : 0;
    const roas = i.dailyBudget > 0 ? dailyRevenue / i.dailyBudget : 0;

    // LTV Calculations
    const avgOrdersPerYear = i.purchaseFreq;
    const retentionMultiplier = 1 / (1 - i.retentionRate / 100);
    const ltv12 = i.aov * avgOrdersPerYear * (i.retentionRate / 100);
    const ltv24 = ltv12 * (1 + i.retentionRate / 100);
    const cacLtvRatio = i.cpa > 0 ? ltv12 / i.cpa : 0;
    const paybackDays = ltv12 > 0 ? (i.cpa / (ltv12 / 365)) : 999;

    // Scale Simulator
    const scaleFactor = i.targetBudget / i.dailyBudget;
    const efficiencyLoss = Math.min(30, (scaleFactor - 1) * 8);
    const projectedRoas = i.currentRoas * (1 - efficiencyLoss / 100);
    const riskLevel = scaleFactor > 3 ? 'HIGH' : scaleFactor > 1.5 ? 'MEDIUM' : 'LOW';
    const recommendedBudget = i.dailyBudget * Math.min(2, 1 + (1 / scaleFactor));

    // Break-Even
    const profitPerOrder = i.aov * (1 - i.cogs / 100) - i.cpa;
    const breakEvenOrders = profitPerOrder > 0 ? Math.ceil(i.fixedCosts / profitPerOrder) : 9999;
    const breakEvenRevenue = breakEvenOrders * i.aov;
    const minRoas = i.cogs > 0 ? 100 / (100 - i.cogs) : 1;
    const currentOrders = customersPerDay * 30;
    const safetyMargin = breakEvenOrders > 0 ? ((currentOrders - breakEvenOrders) / breakEvenOrders) * 100 : 0;

    // Unit Economics
    const totalCostPerUnit = i.productCost + i.shippingCost + (i.aov * i.paymentFees / 100) + i.cpa;
    const contributionMargin = i.aov - totalCostPerUnit;
    const contributionPct = i.aov > 0 ? (contributionMargin / i.aov) * 100 : 0;
    const trueProfit = contributionMargin;
    const healthStatus = contributionPct >= 30 ? 'EXCELLENT' : contributionPct >= 20 ? 'GOOD' : contributionPct >= 10 ? 'FAIR' : 'CRITICAL';

    return {
      dailyRevenue: Math.round(dailyRevenue),
      dailyProfit: Math.round(dailyProfit),
      monthlyProfit: Math.round(monthlyProfit),
      margin: Math.round(margin * 10) / 10,
      roas: Math.round(roas * 100) / 100,
      customersPerDay: Math.round(customersPerDay * 10) / 10,
      ltv12: Math.round(ltv12),
      ltv24: Math.round(ltv24),
      cacLtvRatio: Math.round(cacLtvRatio * 10) / 10,
      paybackDays: Math.round(paybackDays),
      projectedRoas: Math.round(projectedRoas * 100) / 100,
      riskLevel,
      recommendedBudget: Math.round(recommendedBudget),
      efficiencyLoss: Math.round(efficiencyLoss),
      breakEvenOrders,
      breakEvenRevenue: Math.round(breakEvenRevenue),
      minRoas: Math.round(minRoas * 100) / 100,
      safetyMargin: Math.round(safetyMargin),
      contributionMargin: Math.round(contributionMargin * 100) / 100,
      contributionPct: Math.round(contributionPct * 10) / 10,
      trueProfit: Math.round(trueProfit * 100) / 100,
      healthStatus,
    };
  }, [i]);
}

// ═══════════════════════════════════════════════════════════════════════════════
// STYLE 1: MISSION CONTROL - SpaceX inspired
// ═══════════════════════════════════════════════════════════════════════════════
function StyleMissionControl({ inputs, setInputs, results, activeCalc, setActiveCalc }: StyleProps) {
  return (
    <div className="h-[calc(100vh-140px)] bg-[#0a0a0f] rounded-2xl overflow-hidden relative">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative h-full flex">
        {/* Left: Mini Calculators */}
        <div className="w-[200px] border-r border-white/5 p-4 flex flex-col gap-3">
          <MiniCalcCard
            title="PROFIT"
            value={`$${results.monthlyProfit.toLocaleString()}`}
            subtitle="monthly"
            isActive={activeCalc === 'profit'}
            onClick={() => setActiveCalc('profit')}
            color={results.monthlyProfit >= 0 ? '#00ff88' : '#ff4444'}
          />
          <MiniCalcCard
            title="LTV"
            value={`$${results.ltv12}`}
            subtitle="12-month"
            isActive={activeCalc === 'ltv'}
            onClick={() => setActiveCalc('ltv')}
            color="#00d4ff"
          />
          <MiniCalcCard
            title="SCALE"
            value={`${results.projectedRoas}x`}
            subtitle={results.riskLevel}
            isActive={activeCalc === 'scale'}
            onClick={() => setActiveCalc('scale')}
            color={results.riskLevel === 'LOW' ? '#00ff88' : results.riskLevel === 'MEDIUM' ? '#ffaa00' : '#ff4444'}
          />
          <MiniCalcCard
            title="BREAK-EVEN"
            value={results.breakEvenOrders.toString()}
            subtitle="orders"
            isActive={activeCalc === 'breakeven'}
            onClick={() => setActiveCalc('breakeven')}
            color="#aa88ff"
          />
          <MiniCalcCard
            title="UNIT ECON"
            value={`$${results.contributionMargin}`}
            subtitle={results.healthStatus}
            isActive={activeCalc === 'unit'}
            onClick={() => setActiveCalc('unit')}
            color={results.healthStatus === 'EXCELLENT' ? '#00ff88' : results.healthStatus === 'GOOD' ? '#00d4ff' : '#ffaa00'}
          />
        </div>

        {/* Center: Main Display */}
        <div className="flex-1 p-6 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCalc}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col"
            >
              {activeCalc === 'profit' && <ProfitDisplay inputs={inputs} setInputs={setInputs} results={results} theme="dark" />}
              {activeCalc === 'ltv' && <LTVDisplay inputs={inputs} setInputs={setInputs} results={results} theme="dark" />}
              {activeCalc === 'scale' && <ScaleDisplay inputs={inputs} setInputs={setInputs} results={results} theme="dark" />}
              {activeCalc === 'breakeven' && <BreakEvenDisplay inputs={inputs} setInputs={setInputs} results={results} theme="dark" />}
              {activeCalc === 'unit' && <UnitDisplay inputs={inputs} setInputs={setInputs} results={results} theme="dark" />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Visual */}
        <div className="w-[280px] border-l border-white/5 flex items-center justify-center p-6">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-[60px] scale-150" />
            <Image
              src={IMAGES.sphere}
              alt="Data"
              width={220}
              height={220}
              className="relative z-10 animate-pulse"
              style={{ animationDuration: '4s' }}
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STYLE 2: TESLA COCKPIT - Minimal dark premium
// ═══════════════════════════════════════════════════════════════════════════════
function StyleTeslaCockpit({ inputs, setInputs, results, activeCalc, setActiveCalc }: StyleProps) {
  return (
    <div className="h-[calc(100vh-140px)] bg-black rounded-2xl overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Top: Calculator Tabs */}
        <div className="flex items-center justify-center gap-1 p-4 border-b border-white/10">
          {[
            { id: 'profit', label: 'Profit', value: `$${results.monthlyProfit.toLocaleString()}` },
            { id: 'ltv', label: 'LTV', value: `$${results.ltv12}` },
            { id: 'scale', label: 'Scale', value: `${results.projectedRoas}x` },
            { id: 'breakeven', label: 'Break-Even', value: `${results.breakEvenOrders}` },
            { id: 'unit', label: 'Unit Econ', value: `$${results.contributionMargin}` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCalc(tab.id as CalcType)}
              className={`px-5 py-3 rounded-xl transition-all ${
                activeCalc === tab.id
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider block opacity-60">{tab.label}</span>
              <span className="text-lg font-bold">{tab.value}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCalc}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 p-8"
            >
              {activeCalc === 'profit' && <ProfitDisplay inputs={inputs} setInputs={setInputs} results={results} theme="tesla" />}
              {activeCalc === 'ltv' && <LTVDisplay inputs={inputs} setInputs={setInputs} results={results} theme="tesla" />}
              {activeCalc === 'scale' && <ScaleDisplay inputs={inputs} setInputs={setInputs} results={results} theme="tesla" />}
              {activeCalc === 'breakeven' && <BreakEvenDisplay inputs={inputs} setInputs={setInputs} results={results} theme="tesla" />}
              {activeCalc === 'unit' && <UnitDisplay inputs={inputs} setInputs={setInputs} results={results} theme="tesla" />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Stats Bar */}
        <div className="border-t border-white/10 p-4 flex items-center justify-around">
          <StatPill label="ROAS" value={`${results.roas}x`} />
          <StatPill label="Margin" value={`${results.margin}%`} color={results.margin >= 20 ? '#00ff88' : '#ffaa00'} />
          <StatPill label="CAC:LTV" value={`1:${results.cacLtvRatio}`} />
          <StatPill label="Daily Rev" value={`$${results.dailyRevenue.toLocaleString()}`} />
          <StatPill label="Health" value={results.healthStatus} color={results.healthStatus === 'EXCELLENT' ? '#00ff88' : '#ffaa00'} />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STYLE 3: APPLE STUDIO - White minimalist
// ═══════════════════════════════════════════════════════════════════════════════
function StyleAppleStudio({ inputs, setInputs, results, activeCalc, setActiveCalc }: StyleProps) {
  return (
    <div className="h-[calc(100vh-140px)] bg-[#fafafa] rounded-2xl overflow-hidden">
      <div className="h-full flex">
        {/* Left: Main Display */}
        <div className="flex-1 flex flex-col justify-center px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCalc}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {activeCalc === 'profit' && <ProfitDisplay inputs={inputs} setInputs={setInputs} results={results} theme="apple" />}
              {activeCalc === 'ltv' && <LTVDisplay inputs={inputs} setInputs={setInputs} results={results} theme="apple" />}
              {activeCalc === 'scale' && <ScaleDisplay inputs={inputs} setInputs={setInputs} results={results} theme="apple" />}
              {activeCalc === 'breakeven' && <BreakEvenDisplay inputs={inputs} setInputs={setInputs} results={results} theme="apple" />}
              {activeCalc === 'unit' && <UnitDisplay inputs={inputs} setInputs={setInputs} results={results} theme="apple" />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Navigator */}
        <div className="w-[320px] bg-white border-l border-[#e5e5e5] p-8 flex flex-col justify-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#888] mb-6">Calculators</p>
          <div className="space-y-2">
            {[
              { id: 'profit', name: 'Profit Engine', value: `$${results.monthlyProfit.toLocaleString()}/mo` },
              { id: 'ltv', name: 'LTV Forecaster', value: `$${results.ltv12} lifetime` },
              { id: 'scale', name: 'Scale Simulator', value: `${results.riskLevel} risk` },
              { id: 'breakeven', name: 'Break-Even', value: `${results.breakEvenOrders} orders` },
              { id: 'unit', name: 'Unit Economics', value: results.healthStatus },
            ].map((calc) => (
              <button
                key={calc.id}
                onClick={() => setActiveCalc(calc.id as CalcType)}
                className={`w-full text-left p-4 rounded-xl transition-all ${
                  activeCalc === calc.id
                    ? 'bg-[#1a1a1a] text-white'
                    : 'hover:bg-[#f0f0f0]'
                }`}
              >
                <span className="block font-semibold">{calc.name}</span>
                <span className={`text-sm ${activeCalc === calc.id ? 'text-white/60' : 'text-[#888]'}`}>{calc.value}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STYLE 4: GLASS COCKPIT - Aviation inspired
// ═══════════════════════════════════════════════════════════════════════════════
function StyleGlassCockpit({ inputs, setInputs, results, activeCalc, setActiveCalc }: StyleProps) {
  return (
    <div className="h-[calc(100vh-140px)] bg-gradient-to-b from-[#0f1419] to-[#1a2332] rounded-2xl overflow-hidden p-4">
      <div className="h-full flex gap-4">
        {/* Left Panel: Gauges */}
        <div className="w-[180px] flex flex-col gap-3">
          <GaugeCard
            title="PROFIT"
            value={results.margin}
            max={50}
            unit="%"
            status={results.margin >= 20 ? 'green' : results.margin >= 10 ? 'amber' : 'red'}
            isActive={activeCalc === 'profit'}
            onClick={() => setActiveCalc('profit')}
          />
          <GaugeCard
            title="LTV RATIO"
            value={results.cacLtvRatio}
            max={10}
            unit="x"
            status={results.cacLtvRatio >= 3 ? 'green' : results.cacLtvRatio >= 2 ? 'amber' : 'red'}
            isActive={activeCalc === 'ltv'}
            onClick={() => setActiveCalc('ltv')}
          />
          <GaugeCard
            title="SCALE"
            value={results.projectedRoas}
            max={5}
            unit="x"
            status={results.riskLevel === 'LOW' ? 'green' : results.riskLevel === 'MEDIUM' ? 'amber' : 'red'}
            isActive={activeCalc === 'scale'}
            onClick={() => setActiveCalc('scale')}
          />
        </div>

        {/* Center: Main Display */}
        <div className="flex-1 bg-[#0a0f14]/50 rounded-xl border border-[#2a3a4a] p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCalc}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              {activeCalc === 'profit' && <ProfitDisplay inputs={inputs} setInputs={setInputs} results={results} theme="cockpit" />}
              {activeCalc === 'ltv' && <LTVDisplay inputs={inputs} setInputs={setInputs} results={results} theme="cockpit" />}
              {activeCalc === 'scale' && <ScaleDisplay inputs={inputs} setInputs={setInputs} results={results} theme="cockpit" />}
              {activeCalc === 'breakeven' && <BreakEvenDisplay inputs={inputs} setInputs={setInputs} results={results} theme="cockpit" />}
              {activeCalc === 'unit' && <UnitDisplay inputs={inputs} setInputs={setInputs} results={results} theme="cockpit" />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Panel */}
        <div className="w-[180px] flex flex-col gap-3">
          <GaugeCard
            title="BREAK-EVEN"
            value={Math.min(results.safetyMargin, 100)}
            max={100}
            unit="%"
            status={results.safetyMargin >= 50 ? 'green' : results.safetyMargin >= 20 ? 'amber' : 'red'}
            isActive={activeCalc === 'breakeven'}
            onClick={() => setActiveCalc('breakeven')}
          />
          <GaugeCard
            title="UNIT HEALTH"
            value={results.contributionPct}
            max={50}
            unit="%"
            status={results.healthStatus === 'EXCELLENT' ? 'green' : results.healthStatus === 'GOOD' ? 'green' : 'amber'}
            isActive={activeCalc === 'unit'}
            onClick={() => setActiveCalc('unit')}
          />
          {/* Rocket Visual */}
          <div className="flex-1 flex items-center justify-center">
            <Image
              src={IMAGES.rocket}
              alt="Launch"
              width={120}
              height={120}
              className="opacity-40"
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STYLE 5: EDITORIAL - Typography focused
// ═══════════════════════════════════════════════════════════════════════════════
function StyleEditorial({ inputs, setInputs, results, activeCalc, setActiveCalc }: StyleProps) {
  return (
    <div className="h-[calc(100vh-140px)] bg-white rounded-2xl overflow-hidden">
      <div className="h-full flex">
        {/* Left: Typography Display */}
        <div className="flex-1 flex flex-col justify-center px-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCalc}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {activeCalc === 'profit' && <ProfitDisplay inputs={inputs} setInputs={setInputs} results={results} theme="editorial" />}
              {activeCalc === 'ltv' && <LTVDisplay inputs={inputs} setInputs={setInputs} results={results} theme="editorial" />}
              {activeCalc === 'scale' && <ScaleDisplay inputs={inputs} setInputs={setInputs} results={results} theme="editorial" />}
              {activeCalc === 'breakeven' && <BreakEvenDisplay inputs={inputs} setInputs={setInputs} results={results} theme="editorial" />}
              {activeCalc === 'unit' && <UnitDisplay inputs={inputs} setInputs={setInputs} results={results} theme="editorial" />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Index */}
        <div className="w-[280px] border-l border-[#eee] flex flex-col justify-center px-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#999] mb-8">Index</p>
          {[
            { id: 'profit', num: '01', name: 'Profit Engine' },
            { id: 'ltv', num: '02', name: 'LTV Forecaster' },
            { id: 'scale', num: '03', name: 'Scale Simulator' },
            { id: 'breakeven', num: '04', name: 'Break-Even' },
            { id: 'unit', num: '05', name: 'Unit Economics' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveCalc(item.id as CalcType)}
              className={`flex items-baseline gap-4 py-3 text-left transition-all ${
                activeCalc === item.id ? 'opacity-100' : 'opacity-30 hover:opacity-60'
              }`}
            >
              <span className="text-xs text-[#999] font-mono">{item.num}</span>
              <span className="text-lg font-medium text-[#1a1a1a]">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CALCULATOR DISPLAYS
// ═══════════════════════════════════════════════════════════════════════════════

type Theme = 'dark' | 'tesla' | 'apple' | 'cockpit' | 'editorial';

interface DisplayProps {
  inputs: CalcInputs;
  setInputs: (i: CalcInputs) => void;
  results: AllResults;
  theme: Theme;
}

// Profit Engine Display
function ProfitDisplay({ inputs, setInputs, results, theme }: DisplayProps) {
  const isDark = theme === 'dark' || theme === 'tesla' || theme === 'cockpit';
  const isEditorial = theme === 'editorial';

  return (
    <div className="h-full flex flex-col">
      {/* Title */}
      <div className="mb-6">
        <p className={`text-[10px] uppercase tracking-[0.3em] ${isDark ? 'text-white/40' : 'text-[#999]'} mb-2`}>
          Profit Engine
        </p>
        {!isEditorial && (
          <p className={`text-sm ${isDark ? 'text-white/60' : 'text-[#666]'}`}>
            Daily & monthly profit projection
          </p>
        )}
      </div>

      {/* Main Number */}
      <div className="flex-1 flex items-center">
        <div>
          <h1 className={`font-bold tracking-tight ${
            isEditorial ? 'text-[140px] leading-[0.85]' : 'text-[80px]'
          } ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
            ${results.monthlyProfit.toLocaleString()}
          </h1>
          <p className={`text-lg mt-4 ${isDark ? 'text-white/40' : 'text-[#888]'}`}>
            projected monthly profit
          </p>

          {/* Secondary Stats */}
          <div className={`flex gap-10 mt-8 ${isEditorial ? 'mt-12' : ''}`}>
            <div>
              <p className={`text-4xl font-bold ${results.margin >= 20 ? 'text-[#00d46a]' : 'text-[#ffaa00]'}`}>
                {results.margin}%
              </p>
              <p className={`text-xs uppercase tracking-wider mt-1 ${isDark ? 'text-white/30' : 'text-[#999]'}`}>Margin</p>
            </div>
            <div>
              <p className={`text-4xl font-bold ${isDark ? 'text-[#00b4ff]' : 'text-[#007AFF]'}`}>
                {results.roas}x
              </p>
              <p className={`text-xs uppercase tracking-wider mt-1 ${isDark ? 'text-white/30' : 'text-[#999]'}`}>ROAS</p>
            </div>
            <div>
              <p className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                {results.customersPerDay}
              </p>
              <p className={`text-xs uppercase tracking-wider mt-1 ${isDark ? 'text-white/30' : 'text-[#999]'}`}>Daily Orders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className={`grid grid-cols-4 gap-4 pt-6 border-t ${isDark ? 'border-white/10' : 'border-[#eee]'}`}>
        <CompactInput label="AOV" value={inputs.aov} onChange={(v) => setInputs({ ...inputs, aov: v })} prefix="$" theme={theme} />
        <CompactInput label="Daily Budget" value={inputs.dailyBudget} onChange={(v) => setInputs({ ...inputs, dailyBudget: v })} prefix="$" theme={theme} />
        <CompactInput label="CPA" value={inputs.cpa} onChange={(v) => setInputs({ ...inputs, cpa: v })} prefix="$" theme={theme} />
        <CompactInput label="COGS" value={inputs.cogs} onChange={(v) => setInputs({ ...inputs, cogs: v })} suffix="%" theme={theme} />
      </div>
    </div>
  );
}

// LTV Forecaster Display
function LTVDisplay({ inputs, setInputs, results, theme }: DisplayProps) {
  const isDark = theme === 'dark' || theme === 'tesla' || theme === 'cockpit';
  const isEditorial = theme === 'editorial';

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <p className={`text-[10px] uppercase tracking-[0.3em] ${isDark ? 'text-white/40' : 'text-[#999]'} mb-2`}>
          LTV Forecaster
        </p>
      </div>

      <div className="flex-1 flex items-center">
        <div>
          <h1 className={`font-bold tracking-tight ${
            isEditorial ? 'text-[140px] leading-[0.85]' : 'text-[80px]'
          } ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
            ${results.ltv12}
          </h1>
          <p className={`text-lg mt-4 ${isDark ? 'text-white/40' : 'text-[#888]'}`}>
            12-month customer lifetime value
          </p>

          <div className={`flex gap-10 mt-8`}>
            <div>
              <p className={`text-4xl font-bold ${isDark ? 'text-[#00b4ff]' : 'text-[#007AFF]'}`}>
                ${results.ltv24}
              </p>
              <p className={`text-xs uppercase tracking-wider mt-1 ${isDark ? 'text-white/30' : 'text-[#999]'}`}>24-Month LTV</p>
            </div>
            <div>
              <p className={`text-4xl font-bold ${results.cacLtvRatio >= 3 ? 'text-[#00d46a]' : 'text-[#ffaa00]'}`}>
                1:{results.cacLtvRatio}
              </p>
              <p className={`text-xs uppercase tracking-wider mt-1 ${isDark ? 'text-white/30' : 'text-[#999]'}`}>CAC:LTV Ratio</p>
            </div>
            <div>
              <p className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                {results.paybackDays}d
              </p>
              <p className={`text-xs uppercase tracking-wider mt-1 ${isDark ? 'text-white/30' : 'text-[#999]'}`}>Payback Period</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-4 gap-4 pt-6 border-t ${isDark ? 'border-white/10' : 'border-[#eee]'}`}>
        <CompactInput label="AOV" value={inputs.aov} onChange={(v) => setInputs({ ...inputs, aov: v })} prefix="$" theme={theme} />
        <CompactInput label="Purchases/Year" value={inputs.purchaseFreq} onChange={(v) => setInputs({ ...inputs, purchaseFreq: v })} theme={theme} />
        <CompactInput label="Retention" value={inputs.retentionRate} onChange={(v) => setInputs({ ...inputs, retentionRate: v })} suffix="%" theme={theme} />
        <CompactInput label="CAC" value={inputs.cpa} onChange={(v) => setInputs({ ...inputs, cpa: v })} prefix="$" theme={theme} />
      </div>
    </div>
  );
}

// Scale Simulator Display
function ScaleDisplay({ inputs, setInputs, results, theme }: DisplayProps) {
  const isDark = theme === 'dark' || theme === 'tesla' || theme === 'cockpit';
  const isEditorial = theme === 'editorial';

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <p className={`text-[10px] uppercase tracking-[0.3em] ${isDark ? 'text-white/40' : 'text-[#999]'} mb-2`}>
          Scale Simulator
        </p>
      </div>

      <div className="flex-1 flex items-center">
        <div>
          <h1 className={`font-bold tracking-tight ${
            isEditorial ? 'text-[140px] leading-[0.85]' : 'text-[80px]'
          } ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
            {results.projectedRoas}x
          </h1>
          <p className={`text-lg mt-4 ${isDark ? 'text-white/40' : 'text-[#888]'}`}>
            projected ROAS at scale
          </p>

          <div className={`flex gap-10 mt-8`}>
            <div>
              <p className={`text-4xl font-bold ${
                results.riskLevel === 'LOW' ? 'text-[#00d46a]' :
                results.riskLevel === 'MEDIUM' ? 'text-[#ffaa00]' : 'text-[#ff4444]'
              }`}>
                {results.riskLevel}
              </p>
              <p className={`text-xs uppercase tracking-wider mt-1 ${isDark ? 'text-white/30' : 'text-[#999]'}`}>Risk Level</p>
            </div>
            <div>
              <p className={`text-4xl font-bold ${isDark ? 'text-[#00b4ff]' : 'text-[#007AFF]'}`}>
                ${results.recommendedBudget}
              </p>
              <p className={`text-xs uppercase tracking-wider mt-1 ${isDark ? 'text-white/30' : 'text-[#999]'}`}>Recommended</p>
            </div>
            <div>
              <p className={`text-4xl font-bold text-[#ffaa00]`}>
                -{results.efficiencyLoss}%
              </p>
              <p className={`text-xs uppercase tracking-wider mt-1 ${isDark ? 'text-white/30' : 'text-[#999]'}`}>Efficiency Loss</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-4 gap-4 pt-6 border-t ${isDark ? 'border-white/10' : 'border-[#eee]'}`}>
        <CompactInput label="Current Budget" value={inputs.dailyBudget} onChange={(v) => setInputs({ ...inputs, dailyBudget: v })} prefix="$" theme={theme} />
        <CompactInput label="Current ROAS" value={inputs.currentRoas} onChange={(v) => setInputs({ ...inputs, currentRoas: v })} suffix="x" theme={theme} />
        <CompactInput label="Target Budget" value={inputs.targetBudget} onChange={(v) => setInputs({ ...inputs, targetBudget: v })} prefix="$" theme={theme} />
        <CompactInput label="CPA" value={inputs.cpa} onChange={(v) => setInputs({ ...inputs, cpa: v })} prefix="$" theme={theme} />
      </div>
    </div>
  );
}

// Break-Even Display
function BreakEvenDisplay({ inputs, setInputs, results, theme }: DisplayProps) {
  const isDark = theme === 'dark' || theme === 'tesla' || theme === 'cockpit';
  const isEditorial = theme === 'editorial';

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <p className={`text-[10px] uppercase tracking-[0.3em] ${isDark ? 'text-white/40' : 'text-[#999]'} mb-2`}>
          Break-Even Analyzer
        </p>
      </div>

      <div className="flex-1 flex items-center">
        <div>
          <h1 className={`font-bold tracking-tight ${
            isEditorial ? 'text-[140px] leading-[0.85]' : 'text-[80px]'
          } ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
            {results.breakEvenOrders}
          </h1>
          <p className={`text-lg mt-4 ${isDark ? 'text-white/40' : 'text-[#888]'}`}>
            orders to break even
          </p>

          <div className={`flex gap-10 mt-8`}>
            <div>
              <p className={`text-4xl font-bold ${isDark ? 'text-[#00b4ff]' : 'text-[#007AFF]'}`}>
                ${results.breakEvenRevenue.toLocaleString()}
              </p>
              <p className={`text-xs uppercase tracking-wider mt-1 ${isDark ? 'text-white/30' : 'text-[#999]'}`}>Revenue Needed</p>
            </div>
            <div>
              <p className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                {results.minRoas}x
              </p>
              <p className={`text-xs uppercase tracking-wider mt-1 ${isDark ? 'text-white/30' : 'text-[#999]'}`}>Min ROAS</p>
            </div>
            <div>
              <p className={`text-4xl font-bold ${results.safetyMargin >= 20 ? 'text-[#00d46a]' : 'text-[#ffaa00]'}`}>
                {results.safetyMargin}%
              </p>
              <p className={`text-xs uppercase tracking-wider mt-1 ${isDark ? 'text-white/30' : 'text-[#999]'}`}>Safety Margin</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-4 gap-4 pt-6 border-t ${isDark ? 'border-white/10' : 'border-[#eee]'}`}>
        <CompactInput label="Fixed Costs" value={inputs.fixedCosts} onChange={(v) => setInputs({ ...inputs, fixedCosts: v })} prefix="$" theme={theme} />
        <CompactInput label="AOV" value={inputs.aov} onChange={(v) => setInputs({ ...inputs, aov: v })} prefix="$" theme={theme} />
        <CompactInput label="COGS" value={inputs.cogs} onChange={(v) => setInputs({ ...inputs, cogs: v })} suffix="%" theme={theme} />
        <CompactInput label="CPA" value={inputs.cpa} onChange={(v) => setInputs({ ...inputs, cpa: v })} prefix="$" theme={theme} />
      </div>
    </div>
  );
}

// Unit Economics Display
function UnitDisplay({ inputs, setInputs, results, theme }: DisplayProps) {
  const isDark = theme === 'dark' || theme === 'tesla' || theme === 'cockpit';
  const isEditorial = theme === 'editorial';

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <p className={`text-[10px] uppercase tracking-[0.3em] ${isDark ? 'text-white/40' : 'text-[#999]'} mb-2`}>
          Unit Economics
        </p>
      </div>

      <div className="flex-1 flex items-center">
        <div>
          <h1 className={`font-bold tracking-tight ${
            isEditorial ? 'text-[140px] leading-[0.85]' : 'text-[80px]'
          } ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
            ${results.contributionMargin}
          </h1>
          <p className={`text-lg mt-4 ${isDark ? 'text-white/40' : 'text-[#888]'}`}>
            contribution margin per unit
          </p>

          <div className={`flex gap-10 mt-8`}>
            <div>
              <p className={`text-4xl font-bold ${results.contributionPct >= 30 ? 'text-[#00d46a]' : 'text-[#ffaa00]'}`}>
                {results.contributionPct}%
              </p>
              <p className={`text-xs uppercase tracking-wider mt-1 ${isDark ? 'text-white/30' : 'text-[#999]'}`}>Margin %</p>
            </div>
            <div>
              <p className={`text-4xl font-bold ${
                results.healthStatus === 'EXCELLENT' ? 'text-[#00d46a]' :
                results.healthStatus === 'GOOD' ? 'text-[#00b4ff]' :
                results.healthStatus === 'FAIR' ? 'text-[#ffaa00]' : 'text-[#ff4444]'
              }`}>
                {results.healthStatus}
              </p>
              <p className={`text-xs uppercase tracking-wider mt-1 ${isDark ? 'text-white/30' : 'text-[#999]'}`}>Health Status</p>
            </div>
            <div>
              <p className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                ${results.trueProfit}
              </p>
              <p className={`text-xs uppercase tracking-wider mt-1 ${isDark ? 'text-white/30' : 'text-[#999]'}`}>True Profit</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-5 gap-3 pt-6 border-t ${isDark ? 'border-white/10' : 'border-[#eee]'}`}>
        <CompactInput label="Price" value={inputs.aov} onChange={(v) => setInputs({ ...inputs, aov: v })} prefix="$" theme={theme} />
        <CompactInput label="Product" value={inputs.productCost} onChange={(v) => setInputs({ ...inputs, productCost: v })} prefix="$" theme={theme} />
        <CompactInput label="Shipping" value={inputs.shippingCost} onChange={(v) => setInputs({ ...inputs, shippingCost: v })} prefix="$" theme={theme} />
        <CompactInput label="Fees" value={inputs.paymentFees} onChange={(v) => setInputs({ ...inputs, paymentFees: v })} suffix="%" theme={theme} />
        <CompactInput label="Ad Cost" value={inputs.cpa} onChange={(v) => setInputs({ ...inputs, cpa: v })} prefix="$" theme={theme} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function MiniCalcCard({ title, value, subtitle, isActive, onClick, color }: {
  title: string;
  value: string;
  subtitle: string;
  isActive: boolean;
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-xl transition-all border ${
        isActive
          ? 'bg-white/10 border-white/20'
          : 'bg-white/5 border-transparent hover:bg-white/8 hover:border-white/10'
      }`}
    >
      <p className="text-[9px] uppercase tracking-wider text-white/40 mb-1">{title}</p>
      <p className="text-lg font-bold" style={{ color }}>{value}</p>
      <p className="text-[10px] text-white/30">{subtitle}</p>
    </button>
  );
}

function StatPill({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="text-center">
      <p className="text-[9px] uppercase tracking-wider text-white/30 mb-1">{label}</p>
      <p className="text-sm font-semibold" style={{ color: color || 'white' }}>{value}</p>
    </div>
  );
}

function GaugeCard({ title, value, max, unit, status, isActive, onClick }: {
  title: string;
  value: number;
  max: number;
  unit: string;
  status: 'green' | 'amber' | 'red';
  isActive: boolean;
  onClick: () => void;
}) {
  const percentage = Math.min((value / max) * 100, 100);
  const statusColors = {
    green: '#00ff88',
    amber: '#ffaa00',
    red: '#ff4444',
  };

  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-xl transition-all border ${
        isActive
          ? 'bg-[#1a2a3a] border-[#3a4a5a]'
          : 'bg-[#0f1a24] border-[#2a3a4a] hover:bg-[#1a2a3a]'
      }`}
    >
      <p className="text-[9px] uppercase tracking-wider text-white/40 mb-2">{title}</p>
      {/* Gauge */}
      <div className="relative h-2 bg-[#1a2a3a] rounded-full overflow-hidden mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ backgroundColor: statusColors[status] }}
        />
      </div>
      <p className="text-lg font-bold text-white">
        {value}{unit}
      </p>
    </button>
  );
}

function CompactInput({ label, value, onChange, prefix, suffix, theme }: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  theme: Theme;
}) {
  const isDark = theme === 'dark' || theme === 'tesla' || theme === 'cockpit';

  return (
    <div>
      <label className={`block text-[9px] uppercase tracking-wider mb-1.5 ${isDark ? 'text-white/30' : 'text-[#999]'}`}>
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className={`absolute left-2.5 top-1/2 -translate-y-1/2 text-xs ${isDark ? 'text-white/40' : 'text-[#999]'}`}>
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`w-full rounded-lg py-2 text-sm font-semibold focus:outline-none focus:ring-2 transition-all ${
            isDark
              ? 'bg-white/5 border border-white/10 text-white focus:ring-white/20'
              : 'bg-[#f5f5f5] border-0 text-[#1a1a1a] focus:ring-[#007AFF]/20'
          } ${prefix ? 'pl-6 pr-2' : suffix ? 'pl-2 pr-6' : 'px-2'}`}
        />
        {suffix && (
          <span className={`absolute right-2.5 top-1/2 -translate-y-1/2 text-xs ${isDark ? 'text-white/40' : 'text-[#999]'}`}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES & STYLES CONFIG
// ═══════════════════════════════════════════════════════════════════════════════

type CalcType = 'profit' | 'ltv' | 'scale' | 'breakeven' | 'unit';

interface StyleProps {
  inputs: CalcInputs;
  setInputs: (i: CalcInputs) => void;
  results: AllResults;
  activeCalc: CalcType;
  setActiveCalc: (c: CalcType) => void;
}

const STYLES = [
  { id: 'mission', name: 'Mission Control', component: StyleMissionControl },
  { id: 'tesla', name: 'Tesla', component: StyleTeslaCockpit },
  { id: 'apple', name: 'Studio', component: StyleAppleStudio },
  { id: 'cockpit', name: 'Glass Cockpit', component: StyleGlassCockpit },
  { id: 'editorial', name: 'Editorial', component: StyleEditorial },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function CalculatorsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [activeStyle, setActiveStyle] = useState('mission');
  const [activeCalc, setActiveCalc] = useState<CalcType>('profit');
  const [inputs, setInputs] = useState<CalcInputs>({
    aov: 65,
    dailyBudget: 500,
    cpa: 25,
    cogs: 35,
    purchaseFreq: 2.5,
    retentionRate: 40,
    targetBudget: 1500,
    currentRoas: 2.8,
    fixedCosts: 2000,
    productCost: 15,
    shippingCost: 5,
    paymentFees: 3,
  });

  const results = useCalculations(inputs);

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

  const ActiveStyleComponent = STYLES.find(s => s.id === activeStyle)?.component || StyleMissionControl;

  return (
    <DashboardLayout>
      <div className="h-screen overflow-hidden px-6 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-semibold text-[#1a1a1a]">Command Center</h1>
            <p className="text-xs text-[#888]">5 calculators • Real-time insights</p>
          </div>

          {/* Style Toggle */}
          <div className="flex items-center gap-1 bg-[#f0f0f0] rounded-xl p-1">
            {STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => setActiveStyle(style.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
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
            transition={{ duration: 0.2 }}
          >
            <ActiveStyleComponent
              inputs={inputs}
              setInputs={setInputs}
              results={results}
              activeCalc={activeCalc}
              setActiveCalc={setActiveCalc}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
