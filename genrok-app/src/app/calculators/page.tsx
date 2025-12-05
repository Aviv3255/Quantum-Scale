'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  TrendingUp,
  Target,
  DollarSign,
  Users,
  ShoppingCart,
  ArrowRight,
  Info,
} from 'lucide-react';
import { FadeIn } from '@/components/animations';

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
  const shippingTotal = (inputs.monthlyRevenue / 75) * inputs.shippingCost; // Assuming $75 AOV
  const netProfit = grossProfit - shippingTotal - inputs.adSpend - inputs.otherCosts;
  const profitMargin = (netProfit / inputs.monthlyRevenue) * 100;

  return (
    <div className="bg-white rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(0, 0, 0, 0.06)' }}>
      <div className="p-8" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(139, 105, 20, 0.1)' }}
          >
            <Calculator className="w-5 h-5" style={{ color: '#8b6914' }} strokeWidth={1.5} />
          </div>
          <h3
            className="text-2xl font-bold"
            style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
          >
            Profit Simulation
          </h3>
        </div>
        <p style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
          Calculate your true profit margins and identify optimization opportunities.
        </p>
      </div>

      <div className="p-8 grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="flex items-center justify-between text-sm font-medium mb-2" style={{ color: '#2c1810' }}>
              <span>Monthly Revenue</span>
              <span style={{ color: '#8b6914' }}>${inputs.monthlyRevenue.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={inputs.monthlyRevenue}
              onChange={(e) => setInputs({ ...inputs, monthlyRevenue: Number(e.target.value) })}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ background: 'rgba(139, 105, 20, 0.2)', accentColor: '#8b6914' }}
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium mb-2" style={{ color: '#2c1810' }}>
              <span>COGS (Cost of Goods Sold)</span>
              <span style={{ color: '#8b6914' }}>{inputs.cogs}%</span>
            </label>
            <input
              type="range"
              min="10"
              max="60"
              step="1"
              value={inputs.cogs}
              onChange={(e) => setInputs({ ...inputs, cogs: Number(e.target.value) })}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ background: 'rgba(139, 105, 20, 0.2)', accentColor: '#8b6914' }}
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium mb-2" style={{ color: '#2c1810' }}>
              <span>Shipping Cost per Order</span>
              <span style={{ color: '#8b6914' }}>${inputs.shippingCost}</span>
            </label>
            <input
              type="range"
              min="3"
              max="25"
              step="1"
              value={inputs.shippingCost}
              onChange={(e) => setInputs({ ...inputs, shippingCost: Number(e.target.value) })}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ background: 'rgba(139, 105, 20, 0.2)', accentColor: '#8b6914' }}
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium mb-2" style={{ color: '#2c1810' }}>
              <span>Monthly Ad Spend</span>
              <span style={{ color: '#8b6914' }}>${inputs.adSpend.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={inputs.adSpend}
              onChange={(e) => setInputs({ ...inputs, adSpend: Number(e.target.value) })}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ background: 'rgba(139, 105, 20, 0.2)', accentColor: '#8b6914' }}
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium mb-2" style={{ color: '#2c1810' }}>
              <span>Other Monthly Costs</span>
              <span style={{ color: '#8b6914' }}>${inputs.otherCosts.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="500"
              max="20000"
              step="500"
              value={inputs.otherCosts}
              onChange={(e) => setInputs({ ...inputs, otherCosts: Number(e.target.value) })}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ background: 'rgba(139, 105, 20, 0.2)', accentColor: '#8b6914' }}
            />
          </div>
        </div>

        {/* Results */}
        <div className="rounded-2xl p-6" style={{ background: '#fdf6e3' }}>
          <h4
            className="text-lg font-semibold mb-6"
            style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
          >
            Results
          </h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid rgba(139, 105, 20, 0.15)' }}>
              <span style={{ color: 'rgba(44, 24, 16, 0.6)' }}>Gross Profit</span>
              <span className="text-lg font-semibold" style={{ color: '#2c1810' }}>
                ${grossProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid rgba(139, 105, 20, 0.15)' }}>
              <span style={{ color: 'rgba(44, 24, 16, 0.6)' }}>Total Shipping</span>
              <span className="text-lg font-semibold" style={{ color: '#ef4444' }}>
                -${shippingTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid rgba(139, 105, 20, 0.15)' }}>
              <span style={{ color: 'rgba(44, 24, 16, 0.6)' }}>Ad Spend</span>
              <span className="text-lg font-semibold" style={{ color: '#ef4444' }}>
                -${inputs.adSpend.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid rgba(139, 105, 20, 0.15)' }}>
              <span style={{ color: 'rgba(44, 24, 16, 0.6)' }}>Other Costs</span>
              <span className="text-lg font-semibold" style={{ color: '#ef4444' }}>
                -${inputs.otherCosts.toLocaleString()}
              </span>
            </div>
          </div>

          <div
            className="mt-6 p-4 rounded-xl text-white"
            style={{ background: '#8b6914' }}
          >
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
            <div
              className="mt-4 p-4 rounded-xl"
              style={{ background: 'rgba(139, 105, 20, 0.1)', border: '1px solid rgba(139, 105, 20, 0.2)' }}
            >
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8b6914' }} strokeWidth={1.5} />
                <p className="text-sm" style={{ color: '#8b6914' }}>
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

  const targetCVR = 5; // Target 5% CVR
  const targetAOV = 100; // Target $100 AOV
  const targetCAC = 20; // Target $20 CAC

  return (
    <div className="bg-white rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(0, 0, 0, 0.06)' }}>
      <div className="p-8" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(139, 105, 20, 0.1)' }}
          >
            <Target className="w-5 h-5" style={{ color: '#8b6914' }} strokeWidth={1.5} />
          </div>
          <h3
            className="text-2xl font-bold"
            style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
          >
            KPI X-Ray
          </h3>
        </div>
        <p style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
          Diagnose your key metrics and see how improvements compound into profits.
        </p>
      </div>

      <div className="p-8 grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="flex items-center justify-between text-sm font-medium mb-2" style={{ color: '#2c1810' }}>
              <span>Monthly Visitors</span>
              <span style={{ color: '#8b6914' }}>{inputs.visitors.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={inputs.visitors}
              onChange={(e) => setInputs({ ...inputs, visitors: Number(e.target.value) })}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ background: 'rgba(139, 105, 20, 0.2)', accentColor: '#8b6914' }}
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium mb-2" style={{ color: '#2c1810' }}>
              <span>Conversion Rate</span>
              <span style={{ color: '#8b6914' }}>{inputs.conversionRate}%</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.1"
              value={inputs.conversionRate}
              onChange={(e) => setInputs({ ...inputs, conversionRate: Number(e.target.value) })}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ background: 'rgba(139, 105, 20, 0.2)', accentColor: '#8b6914' }}
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs" style={{ color: 'rgba(44, 24, 16, 0.4)' }}>Poor</span>
              <span className="text-xs" style={{ color: '#22c55e' }}>Target: {targetCVR}%+</span>
            </div>
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium mb-2" style={{ color: '#2c1810' }}>
              <span>Average Order Value (AOV)</span>
              <span style={{ color: '#8b6914' }}>${inputs.aov}</span>
            </label>
            <input
              type="range"
              min="20"
              max="300"
              step="5"
              value={inputs.aov}
              onChange={(e) => setInputs({ ...inputs, aov: Number(e.target.value) })}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ background: 'rgba(139, 105, 20, 0.2)', accentColor: '#8b6914' }}
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs" style={{ color: 'rgba(44, 24, 16, 0.4)' }}>Low</span>
              <span className="text-xs" style={{ color: '#22c55e' }}>Target: ${targetAOV}+</span>
            </div>
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium mb-2" style={{ color: '#2c1810' }}>
              <span>Customer Acquisition Cost (CAC)</span>
              <span style={{ color: '#8b6914' }}>${inputs.cac}</span>
            </label>
            <input
              type="range"
              min="5"
              max="100"
              step="1"
              value={inputs.cac}
              onChange={(e) => setInputs({ ...inputs, cac: Number(e.target.value) })}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ background: 'rgba(139, 105, 20, 0.2)', accentColor: '#8b6914' }}
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs" style={{ color: '#ef4444' }}>High</span>
              <span className="text-xs" style={{ color: '#22c55e' }}>Target: ${targetCAC} or less</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl p-4 text-center" style={{ background: '#fdf6e3' }}>
              <ShoppingCart className="w-6 h-6 mx-auto mb-2" style={{ color: 'rgba(44, 24, 16, 0.4)' }} strokeWidth={1.5} />
              <p className="text-2xl font-bold" style={{ color: '#2c1810' }}>{orders}</p>
              <p className="text-sm" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>Orders</p>
            </div>
            <div className="rounded-2xl p-4 text-center" style={{ background: '#fdf6e3' }}>
              <DollarSign className="w-6 h-6 mx-auto mb-2" style={{ color: 'rgba(44, 24, 16, 0.4)' }} strokeWidth={1.5} />
              <p className="text-2xl font-bold" style={{ color: '#2c1810' }}>${revenue.toLocaleString()}</p>
              <p className="text-sm" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>Revenue</p>
            </div>
            <div className="rounded-2xl p-4 text-center" style={{ background: '#fdf6e3' }}>
              <TrendingUp className="w-6 h-6 mx-auto mb-2" style={{ color: 'rgba(44, 24, 16, 0.4)' }} strokeWidth={1.5} />
              <p
                className="text-2xl font-bold"
                style={{ color: roas >= 3 ? '#22c55e' : roas >= 2 ? '#eab308' : '#ef4444' }}
              >
                {roas.toFixed(2)}x
              </p>
              <p className="text-sm" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>ROAS</p>
            </div>
            <div className="rounded-2xl p-4 text-center" style={{ background: '#fdf6e3' }}>
              <Users className="w-6 h-6 mx-auto mb-2" style={{ color: 'rgba(44, 24, 16, 0.4)' }} strokeWidth={1.5} />
              <p className="text-2xl font-bold" style={{ color: '#2c1810' }}>${revenuePerVisitor.toFixed(2)}</p>
              <p className="text-sm" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>Rev/Visitor</p>
            </div>
          </div>

          {/* KPI Health */}
          <div className="rounded-2xl p-6 text-white" style={{ background: '#2c1810' }}>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" strokeWidth={1.5} />
              KPI Health Score
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>CVR ({inputs.conversionRate}%)</span>
                  <span>{inputs.conversionRate >= targetCVR ? '✓' : `Target: ${targetCVR}%`}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(253, 246, 227, 0.2)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min((inputs.conversionRate / targetCVR) * 100, 100)}%`,
                      background: inputs.conversionRate >= targetCVR ? '#22c55e' : '#8b6914',
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>AOV (${inputs.aov})</span>
                  <span>{inputs.aov >= targetAOV ? '✓' : `Target: $${targetAOV}`}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(253, 246, 227, 0.2)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min((inputs.aov / targetAOV) * 100, 100)}%`,
                      background: inputs.aov >= targetAOV ? '#22c55e' : '#8b6914',
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>CAC (${inputs.cac})</span>
                  <span>{inputs.cac <= targetCAC ? '✓' : `Target: $${targetCAC}`}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(253, 246, 227, 0.2)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min((targetCAC / inputs.cac) * 100, 100)}%`,
                      background: inputs.cac <= targetCAC ? '#22c55e' : '#ef4444',
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
  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 105, 20, 0.08) 0%, rgba(139, 105, 20, 0.02) 50%, transparent 70%)',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(139, 105, 20, 0.08)', border: '1px solid rgba(139, 105, 20, 0.15)' }}
            >
              <Calculator className="w-4 h-4" style={{ color: '#8b6914' }} strokeWidth={1.5} />
              <span className="text-sm font-medium" style={{ color: '#8b6914' }}>Advanced Tools</span>
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
            >
              eCommerce <span style={{ color: '#8b6914' }}>Calculators</span>
            </h1>
            <p className="text-xl mb-8" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
              Diagnose your business metrics, simulate scenarios, and identify the exact levers
              to pull for maximum profit.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Calculators */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeIn>
            <ProfitSimulator />
          </FadeIn>
          <FadeIn delay={0.2}>
            <KPIXRay />
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: '#fdf6e3' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="mb-6">
              <span className="text-5xl">🐵</span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
            >
              Want to Improve These Numbers?
            </h2>
            <p className="text-xl mb-10" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
              Learn the exact strategies used by 8-figure brands to optimize every KPI.
            </p>
            <Link
              href="/learn"
              className="group inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white rounded-xl transition-all"
              style={{ background: '#8b6914', boxShadow: '0 4px 14px rgba(139, 105, 20, 0.25)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2c1810';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#8b6914';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Explore Learning Center
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
