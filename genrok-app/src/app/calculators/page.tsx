'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Calculator,
  TrendingUp,
  Target,
  DollarSign,
  Users,
  Zap,
  ArrowRight,
  Activity,
  Gauge,
  ChevronRight,
  Check,
  AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Circular Gauge Component - Tesla style
function CircularGauge({
  value,
  max,
  label,
  suffix = '',
  color = 'var(--primary)',
  size = 120
}: {
  value: number;
  max: number;
  label: string;
  suffix?: string;
  color?: string;
  size?: number;
}) {
  const percentage = Math.min((value / max) * 100, 100);
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--border-light)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-[var(--text-primary)]">
            {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </span>
        </div>
      </div>
      <span className="mt-2 text-xs text-[var(--text-muted)] text-center">{label}</span>
    </div>
  );
}

// Metric Card Component
function MetricCard({
  label,
  value,
  prefix = '',
  suffix = '',
  trend,
  color = 'var(--text-primary)'
}: {
  label: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}) {
  return (
    <div className="rounded-xl p-4 bg-[var(--bg-secondary)] border border-[var(--border-light)]">
      <p className="text-xs text-[var(--text-muted)] mb-1">{label}</p>
      <p className="text-xl font-bold" style={{ color }}>
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </p>
    </div>
  );
}

// Section Label Component
function SectionLabel({ children, color = 'var(--primary)' }: { children: React.ReactNode; color?: string }) {
  return (
    <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color }}>
      {children}
    </h4>
  );
}

// Growth Path Chart
function GrowthPathChart({ data }: { data: { month: string; value: number; percentage: number }[] }) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="relative h-48 flex items-end justify-between gap-2 px-4">
      {/* Grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="border-t border-[var(--border-light)]" />
        ))}
      </div>

      {/* Data points with connecting line */}
      <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--error)" />
            <stop offset="50%" stopColor="var(--warning)" />
            <stop offset="100%" stopColor="var(--success)" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = 100 - (d.value / maxValue) * 80;
            return `${x}%,${y}%`;
          }).join(' ')}
        />
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = 100 - (d.value / maxValue) * 80;
          const color = d.value < 0 ? 'var(--error)' : d.value < maxValue * 0.5 ? 'var(--warning)' : 'var(--success)';
          return (
            <g key={i}>
              <circle
                cx={`${x}%`}
                cy={`${y}%`}
                r="8"
                fill={color}
                className="drop-shadow-lg"
              />
              <text
                x={`${x}%`}
                y={`${y - 8}%`}
                textAnchor="middle"
                fill={color}
                fontSize="11"
                fontWeight="bold"
              >
                ${d.value > 0 ? d.value.toLocaleString() : d.value.toLocaleString()}
              </text>
            </g>
          );
        })}
      </svg>

      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 transform translate-y-6">
        {data.map((d, i) => (
          <div key={i} className="text-center">
            <span className="text-xs text-[var(--text-muted)]">{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Status Indicator
function StatusIndicator({ status, label }: { status: 'ready' | 'warning' | 'critical'; label: string }) {
  const colors = {
    ready: { bg: 'var(--success)', text: 'Ready to Scale' },
    warning: { bg: 'var(--warning)', text: 'Almost There' },
    critical: { bg: 'var(--error)', text: 'Needs Attention' },
  };

  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-secondary)]">
      <div
        className="w-4 h-4 rounded-full animate-pulse"
        style={{ backgroundColor: colors[status].bg }}
      />
      <div>
        <p className="font-semibold text-[var(--text-primary)]">{colors[status].text}</p>
        <p className="text-xs text-[var(--text-muted)]">{label}</p>
      </div>
    </div>
  );
}

// Profit Simulation Calculator - Cockpit Style
function ProfitSimulator() {
  const [inputs, setInputs] = useState({
    aov: 60,
    dailyAdBudget: 500,
    ltv1m: 25,
    ltv3m: 75,
    ltv6m: 150,
    ltv12m: 300,
    acquisitionMethod: 'cpa' as 'cpa' | 'cr_cpc',
    cpa: 25,
    conversionRate: 2.5,
    cpc: 1.5,
    processingFees: 2.9,
    cogs: 35,
    currency: 'USD',
  });

  const [calculated, setCalculated] = useState(false);

  // Calculations
  const results = useMemo(() => {
    const effectiveCPA = inputs.acquisitionMethod === 'cpa'
      ? inputs.cpa
      : inputs.cpc / (inputs.conversionRate / 100);

    const dailyCustomers = inputs.dailyAdBudget / effectiveCPA;
    const dailyRevenue = dailyCustomers * inputs.aov;
    const dailyCOGS = dailyRevenue * (inputs.cogs / 100);
    const dailyFees = dailyRevenue * (inputs.processingFees / 100);
    const dailyNetProfit = dailyRevenue - dailyCOGS - dailyFees - inputs.dailyAdBudget;
    const dailyMargin = (dailyNetProfit / dailyRevenue) * 100;

    const monthlyCustomers = dailyCustomers * 30;
    const monthlyRevenue = dailyRevenue * 30;
    const monthlyNetProfit = dailyNetProfit * 30;

    // LTV projections (per cohort of monthly customers)
    const profit1m = (monthlyCustomers * inputs.ltv1m) - (inputs.dailyAdBudget * 30) - (monthlyCustomers * inputs.ltv1m * (inputs.cogs + inputs.processingFees) / 100);
    const profit3m = (monthlyCustomers * inputs.ltv3m) - (inputs.dailyAdBudget * 30) - (monthlyCustomers * inputs.ltv3m * (inputs.cogs + inputs.processingFees) / 100);
    const profit6m = (monthlyCustomers * inputs.ltv6m) - (inputs.dailyAdBudget * 30) - (monthlyCustomers * inputs.ltv6m * (inputs.cogs + inputs.processingFees) / 100);
    const profit12m = (monthlyCustomers * inputs.ltv12m) - (inputs.dailyAdBudget * 30) - (monthlyCustomers * inputs.ltv12m * (inputs.cogs + inputs.processingFees) / 100);

    // Daily future profit (based on 12m LTV)
    const dailyFutureProfit = profit12m / 30;

    // Scale readiness
    const margin = dailyMargin;
    const ltvToCac = inputs.ltv12m / effectiveCPA;
    const isReady = margin > 15 && ltvToCac > 3;

    return {
      dailyCustomers: Math.round(dailyCustomers * 10) / 10,
      dailyRevenue: Math.round(dailyRevenue),
      dailyNetProfit: Math.round(dailyNetProfit),
      dailyMargin: Math.round(dailyMargin * 10) / 10,
      monthlyCustomers: Math.round(monthlyCustomers * 10) / 10,
      monthlyRevenue: Math.round(monthlyRevenue),
      monthlyNetProfit: Math.round(monthlyNetProfit),
      profit1m: Math.round(profit1m),
      profit3m: Math.round(profit3m),
      profit6m: Math.round(profit6m),
      profit12m: Math.round(profit12m),
      dailyFutureProfit: Math.round(dailyFutureProfit),
      monthlyFutureProfit: Math.round(profit12m),
      effectiveCPA,
      ltvToCac,
      isReady,
    };
  }, [inputs]);

  const growthData = [
    { month: '1M', value: results.profit1m, percentage: -37.9 },
    { month: '3M', value: results.profit3m, percentage: 28.8 },
    { month: '6M', value: results.profit6m, percentage: 45.4 },
    { month: '12M', value: results.profit12m, percentage: 53.8 },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left Panel - Inputs */}
      <div className="card" style={{ padding: 0 }}>
        <div className="p-6 border-b border-[var(--border-light)]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
              <Calculator size={20} className="text-[var(--primary)]" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                Profit Simulation
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                Adjust your inputs - see how every decision impacts your profit
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Core Inputs */}
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
            <SectionLabel color="var(--primary)">Core Inputs</SectionLabel>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">Average Order Value</label>
                <input
                  type="number"
                  value={inputs.aov}
                  onChange={(e) => setInputs({ ...inputs, aov: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">Daily Ad Budget</label>
                <input
                  type="number"
                  value={inputs.dailyAdBudget}
                  onChange={(e) => setInputs({ ...inputs, dailyAdBudget: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Customer LTV */}
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
            <SectionLabel color="var(--success)">Customer LTV (Per Customer)</SectionLabel>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">1 Month</label>
                <input
                  type="number"
                  value={inputs.ltv1m}
                  onChange={(e) => setInputs({ ...inputs, ltv1m: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">3 Months</label>
                <input
                  type="number"
                  value={inputs.ltv3m}
                  onChange={(e) => setInputs({ ...inputs, ltv3m: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">6 Months</label>
                <input
                  type="number"
                  value={inputs.ltv6m}
                  onChange={(e) => setInputs({ ...inputs, ltv6m: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">12 Months</label>
                <input
                  type="number"
                  value={inputs.ltv12m}
                  onChange={(e) => setInputs({ ...inputs, ltv12m: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Acquisition Method */}
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
            <SectionLabel color="var(--info)">Acquisition Method</SectionLabel>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="acquisitionMethod"
                  checked={inputs.acquisitionMethod === 'cpa'}
                  onChange={() => setInputs({ ...inputs, acquisitionMethod: 'cpa' })}
                  className="w-4 h-4 text-[var(--primary)]"
                />
                <span className="text-sm text-[var(--text-primary)]">CPA</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="acquisitionMethod"
                  checked={inputs.acquisitionMethod === 'cr_cpc'}
                  onChange={() => setInputs({ ...inputs, acquisitionMethod: 'cr_cpc' })}
                  className="w-4 h-4 text-[var(--primary)]"
                />
                <span className="text-sm text-[var(--text-primary)]">CR + CPC</span>
              </label>
            </div>
            {inputs.acquisitionMethod === 'cpa' ? (
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">Cost Per Acquisition (CPA)</label>
                <input
                  type="number"
                  value={inputs.cpa}
                  onChange={(e) => setInputs({ ...inputs, cpa: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[var(--text-muted)] mb-1 block">Conversion Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.conversionRate}
                    onChange={(e) => setInputs({ ...inputs, conversionRate: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-[var(--text-muted)] mb-1 block">Cost Per Click (CPC)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.cpc}
                    onChange={(e) => setInputs({ ...inputs, cpc: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Business Costs */}
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
            <SectionLabel color="var(--error)">Business Costs</SectionLabel>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">Processing Fees (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.processingFees}
                  onChange={(e) => setInputs({ ...inputs, processingFees: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">COGS (% of revenue)</label>
                <input
                  type="number"
                  value={inputs.cogs}
                  onChange={(e) => setInputs({ ...inputs, cogs: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Currency */}
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
            <label className="text-xs text-[var(--text-muted)] mb-1 block">Currency</label>
            <select
              value={inputs.currency}
              onChange={(e) => setInputs({ ...inputs, currency: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="ILS">ILS</option>
            </select>
          </div>

          <button
            onClick={() => setCalculated(true)}
            className="btn btn-primary w-full justify-center py-3"
          >
            CALCULATE PROFITS
          </button>
        </div>
      </div>

      {/* Right Panel - Results Dashboard */}
      <div className="space-y-6">
        {/* Growth Path Visualization */}
        <div className="card">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
            Visualize Your Growth Path
          </h3>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            Short term to long term profit projection
          </p>
          <GrowthPathChart data={growthData} />
        </div>

        {/* Profit Analysis */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={18} className="text-[var(--primary)]" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              Profit Analysis
            </h3>
          </div>
          <p className="text-xs text-[var(--text-muted)] mb-4">
            Your daily/monthly profit based on AOV (immediate, short-term profit)
          </p>

          {/* Daily Performance */}
          <p className="text-sm font-medium text-[var(--primary)] mb-3">Daily Performance</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <MetricCard label="Customers" value={results.dailyCustomers} />
            <MetricCard label="Revenue" value={results.dailyRevenue} prefix="$" />
            <MetricCard
              label="Net Profit"
              value={results.dailyNetProfit}
              prefix="$"
              color={results.dailyNetProfit >= 0 ? 'var(--success)' : 'var(--error)'}
            />
            <MetricCard
              label="Margin"
              value={results.dailyMargin}
              suffix="%"
              color={results.dailyMargin >= 20 ? 'var(--success)' : results.dailyMargin >= 10 ? 'var(--warning)' : 'var(--error)'}
            />
          </div>

          {/* Monthly Performance */}
          <p className="text-sm font-medium text-[var(--primary)] mb-3">Monthly (30 days)</p>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard label="Customers" value={results.monthlyCustomers} />
            <MetricCard label="Revenue" value={results.monthlyRevenue} prefix="$" />
            <MetricCard
              label="Net Profit"
              value={results.monthlyNetProfit}
              prefix="$"
              color={results.monthlyNetProfit >= 0 ? 'var(--success)' : 'var(--error)'}
            />
            <MetricCard
              label="Margin"
              value={results.dailyMargin}
              suffix="%"
              color={results.dailyMargin >= 20 ? 'var(--success)' : results.dailyMargin >= 10 ? 'var(--warning)' : 'var(--error)'}
            />
          </div>
        </div>

        {/* Long-term Profit with LTV */}
        <div className="card">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
            Long-term Profit with LTV (per acquired cohort)
          </h3>
          <p className="text-xs text-[var(--text-muted)] mb-4">
            Projected total profit generated by one month's new customers over time.
          </p>

          <div className="grid grid-cols-4 gap-3 mb-6">
            {growthData.map((item) => (
              <div key={item.month} className="text-center p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
                <p className="text-xs text-[var(--text-muted)] mb-1">{item.month}</p>
                <p className={`text-lg font-bold ${item.value >= 0 ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
                  ${item.value.toLocaleString()}
                </p>
                <p className="text-xs text-[var(--text-muted)]">{item.percentage}%</p>
              </div>
            ))}
          </div>

          {/* Future Profit Cards */}
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-[var(--success)]/10 border border-[var(--success)]/20">
              <p className="text-2xl font-bold text-[var(--success)]">
                ${results.dailyFutureProfit.toLocaleString()}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                Future profit (based on 12-month LTV of a cohort) you generate daily
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20">
              <p className="text-2xl font-bold text-[var(--primary)]">
                ${results.monthlyFutureProfit.toLocaleString()}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                Future profit (based on 12-month LTV of a cohort) you generate monthly
              </p>
            </div>
          </div>
        </div>

        {/* Scale Readiness X-RAY */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--info)]/10 flex items-center justify-center">
              <Target size={20} className="text-[var(--info)]" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              Scale Readiness X-RAY
            </h3>
          </div>

          <StatusIndicator
            status={results.isReady ? 'ready' : results.dailyMargin > 10 ? 'warning' : 'critical'}
            label="Business health status"
          />

          <div className="mt-4">
            <p className="text-sm font-medium text-[var(--primary)] flex items-center gap-1 mb-3">
              <Zap size={14} /> Recommended Actions
            </p>
            <div className="space-y-2">
              {[
                { text: 'Improve profit margins', show: results.dailyMargin < 20 },
                { text: 'Increase customer LTV', show: results.ltvToCac < 4 },
                { text: 'Optimize acquisition channels', show: results.effectiveCPA > 30 },
              ].filter(a => a.show).map((action, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
                  <span className="text-sm text-[var(--text-primary)]">{action.text}</span>
                  <Link href="/learn" className="btn btn-primary text-xs py-1 px-3">
                    View Resources <ChevronRight size={12} />
                  </Link>
                </div>
              ))}
              {results.isReady && results.dailyMargin >= 20 && results.ltvToCac >= 4 && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[var(--success)]/10 border border-[var(--success)]/20">
                  <Check size={16} className="text-[var(--success)]" />
                  <span className="text-sm text-[var(--success)]">Your metrics look great! Ready to scale.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// KPI X-Ray Calculator - Cockpit Style
function KPIXRay() {
  const [inputs, setInputs] = useState({
    conversionRate: 2.5,
    aov: 60,
    ltv1m: 55,
    ltv3m: 300,
    ltv6m: 5,
    ltv12m: 1000,
    transactionFees: 2,
    cogs: 35,
  });

  // Targets
  const targets = {
    ltv1m: 200,
    ltv3m: 400,
    ltv6m: 500,
    ltv12m: 800,
    fees: 3,
  };

  // Gap analysis
  const gaps = [
    { name: 'Ltv1m', current: inputs.ltv1m, target: targets.ltv1m, met: inputs.ltv1m >= targets.ltv1m },
    { name: 'Ltv6m', current: inputs.ltv6m, target: targets.ltv6m, met: inputs.ltv6m >= targets.ltv6m },
    { name: 'Fees', current: inputs.transactionFees, target: targets.fees, met: inputs.transactionFees <= targets.fees, isLower: true },
  ];

  const unmetCount = gaps.filter(g => !g.met).length;
  const overallStatus = unmetCount === 0 ? 'ready' : unmetCount <= 1 ? 'warning' : 'critical';

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left Panel - Inputs */}
      <div className="card" style={{ padding: 0 }}>
        <div className="p-6 border-b border-[var(--border-light)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
            KPI X-Ray
          </h3>
          <p className="text-sm text-[var(--text-muted)]">
            Spot weaknesses. Strengthen your foundations. Build data confidence.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Business Metrics */}
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
            <SectionLabel color="var(--primary)">Business Metrics</SectionLabel>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">Conversion Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.conversionRate}
                  onChange={(e) => setInputs({ ...inputs, conversionRate: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">AOV ($)</label>
                <input
                  type="number"
                  value={inputs.aov}
                  onChange={(e) => setInputs({ ...inputs, aov: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* LTV Metrics */}
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
            <SectionLabel color="var(--success)">LTV Metrics</SectionLabel>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">1 Month LTV</label>
                <input
                  type="number"
                  value={inputs.ltv1m}
                  onChange={(e) => setInputs({ ...inputs, ltv1m: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">3 Month LTV</label>
                <input
                  type="number"
                  value={inputs.ltv3m}
                  onChange={(e) => setInputs({ ...inputs, ltv3m: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">6 Month LTV</label>
                <input
                  type="number"
                  value={inputs.ltv6m}
                  onChange={(e) => setInputs({ ...inputs, ltv6m: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">12 Month LTV</label>
                <input
                  type="number"
                  value={inputs.ltv12m}
                  onChange={(e) => setInputs({ ...inputs, ltv12m: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Cost Structure */}
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
            <SectionLabel color="var(--error)">Cost Structure</SectionLabel>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">All Transaction Fees (% of revenue)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.transactionFees}
                  onChange={(e) => setInputs({ ...inputs, transactionFees: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">COGS (% of revenue)</label>
                <input
                  type="number"
                  value={inputs.cogs}
                  onChange={(e) => setInputs({ ...inputs, cogs: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border-light)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button className="btn btn-primary w-full justify-center py-3">
            DIAGNOSE
          </button>
        </div>
      </div>

      {/* Right Panel - Results */}
      <div className="space-y-6">
        {/* Alert Banner */}
        {unmetCount > 0 && (
          <div className="p-4 rounded-xl bg-[var(--warning)]/10 border border-[var(--warning)]/30">
            <p className="text-sm text-[var(--warning)] font-medium">
              {unmetCount} metric{unmetCount > 1 ? 's' : ''} need attention - fix them to unlock scale readiness
            </p>
          </div>
        )}

        {/* Overall Readiness */}
        <div className="card">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Overall Readiness
          </h3>
          <div className={`flex items-center gap-3 p-4 rounded-xl ${
            overallStatus === 'ready' ? 'bg-[var(--success)]/10' :
            overallStatus === 'warning' ? 'bg-[var(--warning)]/10' : 'bg-[var(--error)]/10'
          }`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              overallStatus === 'ready' ? 'bg-[var(--success)]' :
              overallStatus === 'warning' ? 'bg-[var(--warning)]' : 'bg-[var(--error)]'
            }`}>
              {overallStatus === 'ready' ? (
                <Check size={24} className="text-white" />
              ) : (
                <AlertCircle size={24} className="text-white" />
              )}
            </div>
            <div>
              <p className="font-semibold text-[var(--text-primary)]">
                {overallStatus === 'ready' ? 'Ready to Scale' :
                 overallStatus === 'warning' ? 'Almost There' : 'Needs Work'}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                {unmetCount} KPI{unmetCount !== 1 ? 's' : ''} need attention
              </p>
            </div>
          </div>
        </div>

        {/* Gap Analysis */}
        <div className="card">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Gap Analysis
          </h3>
          <div className="space-y-3">
            {gaps.map((gap, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${gap.met ? 'bg-[var(--success)]' : 'bg-[var(--error)]'}`} />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{gap.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">
                      Target: {gap.isLower ? '≤' : '≥'} {gap.target}
                    </p>
                  </div>
                </div>
                <p className={`text-lg font-bold ${gap.met ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
                  {gap.current}{gap.name === 'Fees' ? '%' : '$'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="card">
          <p className="text-sm font-medium text-[var(--primary)] flex items-center gap-1 mb-4">
            <Zap size={14} /> Recommended Actions
          </p>
          <div className="space-y-3">
            {gaps.filter(g => !g.met).map((gap, i) => (
              <div key={i} className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
                <p className="text-sm font-medium text-[var(--primary)] mb-1">
                  Improve {gap.name}
                </p>
                <p className="text-xs text-[var(--text-muted)] mb-3">
                  Current: {gap.current} | Target: {gap.isLower ? '≤' : '≥'} {gap.target}
                </p>
                <Link href="/learn" className="btn btn-secondary text-xs py-1.5 px-3">
                  View Resources <ChevronRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CalculatorsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'profit' | 'kpi'>('profit');

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

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
            Profit Intelligence Center
          </h1>
          <p className="text-[var(--text-muted)]">
            Model your numbers. Predict your growth. Scale with precision.
          </p>
        </header>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('profit')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
              activeTab === 'profit'
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            Profit Simulation
          </button>
          <button
            onClick={() => setActiveTab('kpi')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
              activeTab === 'kpi'
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            KPI X-Ray
          </button>
        </div>

        {/* Calculator Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'profit' ? <ProfitSimulator /> : <KPIXRay />}
          </motion.div>
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
