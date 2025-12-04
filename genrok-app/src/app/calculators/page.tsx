'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  TrendingUp,
  Target,
  DollarSign,
  Percent,
  Users,
  ShoppingCart,
  ArrowRight,
  Info,
  RefreshCw,
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

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
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
      <div className="p-8 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold">Profit Simulation</h3>
        </div>
        <p className="text-gray-600">
          Calculate your true profit margins and identify optimization opportunities.
        </p>
      </div>

      <div className="p-8 grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Monthly Revenue</span>
              <span className="text-violet-600">${inputs.monthlyRevenue.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={inputs.monthlyRevenue}
              onChange={(e) => setInputs({ ...inputs, monthlyRevenue: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
              <span>COGS (Cost of Goods Sold)</span>
              <span className="text-violet-600">{inputs.cogs}%</span>
            </label>
            <input
              type="range"
              min="10"
              max="60"
              step="1"
              value={inputs.cogs}
              onChange={(e) => setInputs({ ...inputs, cogs: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Shipping Cost per Order</span>
              <span className="text-violet-600">${inputs.shippingCost}</span>
            </label>
            <input
              type="range"
              min="3"
              max="25"
              step="1"
              value={inputs.shippingCost}
              onChange={(e) => setInputs({ ...inputs, shippingCost: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Monthly Ad Spend</span>
              <span className="text-violet-600">${inputs.adSpend.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={inputs.adSpend}
              onChange={(e) => setInputs({ ...inputs, adSpend: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Other Monthly Costs</span>
              <span className="text-violet-600">${inputs.otherCosts.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="500"
              max="20000"
              step="500"
              value={inputs.otherCosts}
              onChange={(e) => setInputs({ ...inputs, otherCosts: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
            />
          </div>
        </div>

        {/* Results */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h4 className="text-lg font-semibold mb-6">Results</h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Gross Profit</span>
              <span className="text-lg font-semibold">${grossProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Total Shipping</span>
              <span className="text-lg font-semibold text-red-500">-${shippingTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Ad Spend</span>
              <span className="text-lg font-semibold text-red-500">-${inputs.adSpend.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Other Costs</span>
              <span className="text-lg font-semibold text-red-500">-${inputs.otherCosts.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 text-white">
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
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-700">
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
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
      <div className="p-8 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold">KPI X-Ray</h3>
        </div>
        <p className="text-gray-600">
          Diagnose your key metrics and see how improvements compound into profits.
        </p>
      </div>

      <div className="p-8 grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Monthly Visitors</span>
              <span className="text-cyan-600">{inputs.visitors.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={inputs.visitors}
              onChange={(e) => setInputs({ ...inputs, visitors: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Conversion Rate</span>
              <span className="text-cyan-600">{inputs.conversionRate}%</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.1"
              value={inputs.conversionRate}
              onChange={(e) => setInputs({ ...inputs, conversionRate: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-400">Poor</span>
              <span className="text-xs text-green-500">Target: {targetCVR}%+</span>
            </div>
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Average Order Value (AOV)</span>
              <span className="text-cyan-600">${inputs.aov}</span>
            </label>
            <input
              type="range"
              min="20"
              max="300"
              step="5"
              value={inputs.aov}
              onChange={(e) => setInputs({ ...inputs, aov: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-400">Low</span>
              <span className="text-xs text-green-500">Target: ${targetAOV}+</span>
            </div>
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Customer Acquisition Cost (CAC)</span>
              <span className="text-cyan-600">${inputs.cac}</span>
            </label>
            <input
              type="range"
              min="5"
              max="100"
              step="1"
              value={inputs.cac}
              onChange={(e) => setInputs({ ...inputs, cac: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-red-500">High</span>
              <span className="text-xs text-green-500">Target: ${targetCAC} or less</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <ShoppingCart className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <p className="text-2xl font-bold text-gray-900">{orders}</p>
              <p className="text-sm text-gray-500">Orders</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <p className="text-2xl font-bold text-gray-900">${revenue.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Revenue</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <p className={`text-2xl font-bold ${roas >= 3 ? 'text-green-600' : roas >= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                {roas.toFixed(2)}x
              </p>
              <p className="text-sm text-gray-500">ROAS</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <p className="text-2xl font-bold text-gray-900">${revenuePerVisitor.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Rev/Visitor</p>
            </div>
          </div>

          {/* KPI Health */}
          <div className="bg-gray-900 rounded-2xl p-6 text-white">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              KPI Health Score
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>CVR ({inputs.conversionRate}%)</span>
                  <span>{inputs.conversionRate >= targetCVR ? '✓' : `Target: ${targetCVR}%`}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${inputs.conversionRate >= targetCVR ? 'bg-green-500' : 'bg-yellow-500'}`}
                    style={{ width: `${Math.min((inputs.conversionRate / targetCVR) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>AOV (${inputs.aov})</span>
                  <span>{inputs.aov >= targetAOV ? '✓' : `Target: $${targetAOV}`}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${inputs.aov >= targetAOV ? 'bg-green-500' : 'bg-yellow-500'}`}
                    style={{ width: `${Math.min((inputs.aov / targetAOV) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>CAC (${inputs.cac})</span>
                  <span>{inputs.cac <= targetCAC ? '✓' : `Target: $${targetCAC}`}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${inputs.cac <= targetCAC ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min((targetCAC / inputs.cac) * 100, 100)}%` }}
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
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 mb-6">
              <Calculator className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-violet-700">Advanced Tools</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              eCommerce <span className="gradient-text">Calculators</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want to Improve These Numbers?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Learn the exact strategies used by 8-figure brands to optimize every KPI.
            </p>
            <a
              href="/learn"
              className="group inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all"
            >
              Explore Learning Center
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
