'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Calculator,
  TrendingUp,
  Target,
  DollarSign,
  Users,
  ShoppingCart,
  ArrowRight,
  Info,
  Wrench,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Profit Simulation Calculator
function ProfitSimulator() {
  const [inputs, setInputs] = useState({
    monthlyRevenue: 50000,
    cogs: 30,
    shippingCost: 8,
    adSpend: 15000,
    otherCosts: 2000,
  });

  const grossProfit = inputs.monthlyRevenue * (1 - inputs.cogs / 100);
  const shippingTotal = (inputs.monthlyRevenue / 75) * inputs.shippingCost;
  const netProfit = grossProfit - shippingTotal - inputs.adSpend - inputs.otherCosts;
  const profitMargin = (netProfit / inputs.monthlyRevenue) * 100;

  return (
    <div className="card" style={{ padding: 0 }}>
      <div className="p-6 border-b border-[var(--border-light)]">
        <div className="flex items-center gap-3 mb-2">
          <div className="stat-icon">
            <Calculator size={20} strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-semibold text-[var(--text-primary)]">
            Profit Simulation
          </h3>
        </div>
        <p className="text-[var(--text-muted)]">
          Calculate your true profit margins and identify optimization opportunities.
        </p>
      </div>

      <div className="p-6 grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="flex items-center justify-between text-sm font-medium mb-2 text-[var(--text-secondary)]">
              <span>Monthly Revenue</span>
              <span className="text-[var(--text-primary)]">${inputs.monthlyRevenue.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={inputs.monthlyRevenue}
              onChange={(e) => setInputs({ ...inputs, monthlyRevenue: Number(e.target.value) })}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[var(--bg-secondary)]"
              style={{ accentColor: 'var(--primary)' }}
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium mb-2 text-[var(--text-secondary)]">
              <span>COGS (Cost of Goods Sold)</span>
              <span className="text-[var(--text-primary)]">{inputs.cogs}%</span>
            </label>
            <input
              type="range"
              min="10"
              max="60"
              step="1"
              value={inputs.cogs}
              onChange={(e) => setInputs({ ...inputs, cogs: Number(e.target.value) })}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[var(--bg-secondary)]"
              style={{ accentColor: 'var(--primary)' }}
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium mb-2 text-[var(--text-secondary)]">
              <span>Shipping Cost per Order</span>
              <span className="text-[var(--text-primary)]">${inputs.shippingCost}</span>
            </label>
            <input
              type="range"
              min="3"
              max="25"
              step="1"
              value={inputs.shippingCost}
              onChange={(e) => setInputs({ ...inputs, shippingCost: Number(e.target.value) })}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[var(--bg-secondary)]"
              style={{ accentColor: 'var(--primary)' }}
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium mb-2 text-[var(--text-secondary)]">
              <span>Monthly Ad Spend</span>
              <span className="text-[var(--text-primary)]">${inputs.adSpend.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={inputs.adSpend}
              onChange={(e) => setInputs({ ...inputs, adSpend: Number(e.target.value) })}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[var(--bg-secondary)]"
              style={{ accentColor: 'var(--primary)' }}
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium mb-2 text-[var(--text-secondary)]">
              <span>Other Monthly Costs</span>
              <span className="text-[var(--text-primary)]">${inputs.otherCosts.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="500"
              max="20000"
              step="500"
              value={inputs.otherCosts}
              onChange={(e) => setInputs({ ...inputs, otherCosts: Number(e.target.value) })}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[var(--bg-secondary)]"
              style={{ accentColor: 'var(--primary)' }}
            />
          </div>
        </div>

        {/* Results */}
        <div className="rounded-xl p-6 bg-[var(--bg-secondary)]">
          <h4 className="text-base font-semibold mb-6 text-[var(--text-primary)]">
            Results
          </h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-[var(--border-light)]">
              <span className="text-[var(--text-muted)]">Gross Profit</span>
              <span className="text-lg font-semibold text-[var(--text-primary)]">
                ${grossProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[var(--border-light)]">
              <span className="text-[var(--text-muted)]">Total Shipping</span>
              <span className="text-lg font-semibold text-[var(--error)]">
                -${shippingTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[var(--border-light)]">
              <span className="text-[var(--text-muted)]">Ad Spend</span>
              <span className="text-lg font-semibold text-[var(--error)]">
                -${inputs.adSpend.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[var(--border-light)]">
              <span className="text-[var(--text-muted)]">Other Costs</span>
              <span className="text-lg font-semibold text-[var(--error)]">
                -${inputs.otherCosts.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-[var(--primary)] text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Net Profit</span>
              <span className="text-2xl font-bold">
                ${netProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">Profit Margin</span>
              <span className={`font-semibold ${profitMargin >= 20 ? 'text-green-300' : profitMargin >= 10 ? 'text-yellow-300' : 'text-red-300'}`}>
                {profitMargin.toFixed(1)}%
              </span>
            </div>
          </div>

          {profitMargin < 15 && (
            <div className="mt-4 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-medium)]">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--text-primary)]" strokeWidth={1.5} />
                <p className="text-sm text-[var(--text-primary)]">
                  Your profit margin is below 15%. Consider reducing COGS or improving conversion rates to increase profitability.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// KPI X-Ray Calculator
function KPIXRay() {
  const [inputs, setInputs] = useState({
    visitors: 10000,
    conversionRate: 2.5,
    aov: 75,
    cac: 25,
  });

  const orders = Math.floor(inputs.visitors * (inputs.conversionRate / 100));
  const revenue = orders * inputs.aov;
  const adSpend = orders * inputs.cac;
  const roas = revenue / adSpend;
  const revenuePerVisitor = revenue / inputs.visitors;

  const targetCVR = 5;
  const targetAOV = 100;
  const targetCAC = 20;

  return (
    <div className="card" style={{ padding: 0 }}>
      <div className="p-6 border-b border-[var(--border-light)]">
        <div className="flex items-center gap-3 mb-2">
          <div className="stat-icon">
            <Target size={20} strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-semibold text-[var(--text-primary)]">
            KPI X-Ray
          </h3>
        </div>
        <p className="text-[var(--text-muted)]">
          Diagnose your key metrics and see how improvements compound into profits.
        </p>
      </div>

      <div className="p-6 grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="flex items-center justify-between text-sm font-medium mb-2 text-[var(--text-secondary)]">
              <span>Monthly Visitors</span>
              <span className="text-[var(--text-primary)]">{inputs.visitors.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={inputs.visitors}
              onChange={(e) => setInputs({ ...inputs, visitors: Number(e.target.value) })}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[var(--bg-secondary)]"
              style={{ accentColor: 'var(--primary)' }}
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium mb-2 text-[var(--text-secondary)]">
              <span>Conversion Rate</span>
              <span className="text-[var(--text-primary)]">{inputs.conversionRate}%</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.1"
              value={inputs.conversionRate}
              onChange={(e) => setInputs({ ...inputs, conversionRate: Number(e.target.value) })}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[var(--bg-secondary)]"
              style={{ accentColor: 'var(--primary)' }}
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-[var(--text-muted)]">Poor</span>
              <span className="text-xs text-[var(--success)]">Target: {targetCVR}%+</span>
            </div>
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium mb-2 text-[var(--text-secondary)]">
              <span>Average Order Value (AOV)</span>
              <span className="text-[var(--text-primary)]">${inputs.aov}</span>
            </label>
            <input
              type="range"
              min="20"
              max="300"
              step="5"
              value={inputs.aov}
              onChange={(e) => setInputs({ ...inputs, aov: Number(e.target.value) })}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[var(--bg-secondary)]"
              style={{ accentColor: 'var(--primary)' }}
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-[var(--text-muted)]">Low</span>
              <span className="text-xs text-[var(--success)]">Target: ${targetAOV}+</span>
            </div>
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium mb-2 text-[var(--text-secondary)]">
              <span>Customer Acquisition Cost (CAC)</span>
              <span className="text-[var(--text-primary)]">${inputs.cac}</span>
            </label>
            <input
              type="range"
              min="5"
              max="100"
              step="1"
              value={inputs.cac}
              onChange={(e) => setInputs({ ...inputs, cac: Number(e.target.value) })}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[var(--bg-secondary)]"
              style={{ accentColor: 'var(--primary)' }}
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-[var(--error)]">High</span>
              <span className="text-xs text-[var(--success)]">Target: ${targetCAC} or less</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl p-4 text-center bg-[var(--bg-secondary)]">
              <ShoppingCart size={20} className="mx-auto mb-2 text-[var(--text-muted)]" strokeWidth={1.5} />
              <p className="text-2xl font-bold text-[var(--text-primary)]">{orders}</p>
              <p className="text-sm text-[var(--text-muted)]">Orders</p>
            </div>
            <div className="rounded-xl p-4 text-center bg-[var(--bg-secondary)]">
              <DollarSign size={20} className="mx-auto mb-2 text-[var(--text-muted)]" strokeWidth={1.5} />
              <p className="text-2xl font-bold text-[var(--text-primary)]">${revenue.toLocaleString()}</p>
              <p className="text-sm text-[var(--text-muted)]">Revenue</p>
            </div>
            <div className="rounded-xl p-4 text-center bg-[var(--bg-secondary)]">
              <TrendingUp size={20} className="mx-auto mb-2 text-[var(--text-muted)]" strokeWidth={1.5} />
              <p className={`text-2xl font-bold ${roas >= 3 ? 'text-[var(--success)]' : roas >= 2 ? 'text-[var(--warning)]' : 'text-[var(--error)]'}`}>
                {roas.toFixed(2)}x
              </p>
              <p className="text-sm text-[var(--text-muted)]">ROAS</p>
            </div>
            <div className="rounded-xl p-4 text-center bg-[var(--bg-secondary)]">
              <Users size={20} className="mx-auto mb-2 text-[var(--text-muted)]" strokeWidth={1.5} />
              <p className="text-2xl font-bold text-[var(--text-primary)]">${revenuePerVisitor.toFixed(2)}</p>
              <p className="text-sm text-[var(--text-muted)]">Rev/Visitor</p>
            </div>
          </div>

          {/* KPI Health */}
          <div className="rounded-xl p-6 bg-[var(--text-primary)] text-white">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Target size={18} strokeWidth={1.5} />
              KPI Health Score
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>CVR ({inputs.conversionRate}%)</span>
                  <span>{inputs.conversionRate >= targetCVR ? 'Met' : `Target: ${targetCVR}%`}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden bg-white/20">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min((inputs.conversionRate / targetCVR) * 100, 100)}%`,
                      background: inputs.conversionRate >= targetCVR ? 'var(--success)' : 'var(--accent-gold)',
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>AOV (${inputs.aov})</span>
                  <span>{inputs.aov >= targetAOV ? 'Met' : `Target: $${targetAOV}`}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden bg-white/20">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min((inputs.aov / targetAOV) * 100, 100)}%`,
                      background: inputs.aov >= targetAOV ? 'var(--success)' : 'var(--accent-gold)',
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>CAC (${inputs.cac})</span>
                  <span>{inputs.cac <= targetCAC ? 'Met' : `Target: $${targetCAC}`}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden bg-white/20">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min((targetCAC / inputs.cac) * 100, 100)}%`,
                      background: inputs.cac <= targetCAC ? 'var(--success)' : 'var(--error)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CalculatorsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

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
        <header className="page-header">
          <h1>Tools & Calculators</h1>
          <p>Diagnose your business metrics and identify optimization opportunities</p>
        </header>

        {/* Calculators */}
        <div className="page-body">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ProfitSimulator />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <KPIXRay />
          </motion.div>
        </div>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <div className="card text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center">
              <Wrench size={28} className="text-[var(--text-primary)]" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Want to Improve These Numbers?
            </h3>
            <p className="text-[var(--text-muted)] mb-6 max-w-md mx-auto">
              Learn the exact strategies used by 8-figure brands to optimize every KPI.
            </p>
            <Link href="/learn" className="btn btn-primary">
              Explore Learning Center
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
          </div>
        </motion.section>
      </div>
    </DashboardLayout>
  );
}
