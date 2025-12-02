
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp, AlertCircle, CheckCircle2, ArrowRight, Zap, Target, ExternalLink, X } from 'lucide-react';

export default function Calculators() {
  const [activeTab, setActiveTab] = useState('ltv');
  const [mode, setMode] = useState('cpa');
  const [inputs, setInputs] = useState({
    aov: 60,
    budget: 500,
    cpa: 25,
    cr: 2.5,
    cpc: 0.6,
    ltv1: 25,
    ltv3: 75,
    ltv6: 150,
    ltv12: 300,
    fee: 2.9,
    cogs: 35,
    currency: 'USD',
    conversionRate: '',
    aov_x: '', // This input is not used in diagnoseKPI or targets, but keep for state consistency
    ltv1m: '',
    ltv3m: '',
    ltv6m: '',
    ltv12m: '',
    fees: '',
    cogs_x: ''
  });

  const [results, setResults] = useState(null);
  const [kpiResults, setKpiResults] = useState(null);
  const canvasRef = useRef(null);
  
  const [showCoursesModal, setShowCoursesModal] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const currencies = {
    USD: '$', EUR: '€', GBP: '£', ILS: '₪', AUD: 'A$', 
    CAD: 'C$', JPY: '¥', BRL: 'R$', MXN: '$', ZAR: 'R'
  };

  const rates = {
    USD: 1, EUR: 0.85, GBP: 0.73, ILS: 3.25, AUD: 1.35,
    CAD: 1.25, JPY: 110, BRL: 5.2, MXN: 20, ZAR: 14.5
  };

  const targets = {
    conversionRate: { value: 5, direction: 'higher' },
    ltv1m: { value: 200, direction: 'higher' },
    ltv3m: { value: 300, direction: 'higher' },
    ltv6m: { value: 500, direction: 'higher' },
    ltv12m: { value: 1000, direction: 'higher' },
    fees: { value: 3, direction: 'lower' },
    cogs: { value: 33, direction: 'lower' }
  };

  const getStatus = (value, target, direction) => {
    if (!value && value !== 0) return null; // Handle 0 as a valid input
    if (direction === 'higher') {
      if (value >= target) return 'green';
      if (value >= target * 0.9) return 'amber';
      return 'red';
    } else { // 'lower'
      if (value <= target) return 'green';
      if (value <= target * 1.1) return 'amber';
      return 'red';
    }
  };

  const diagnoseKPI = () => {
    const kpiData = {
      conversionRate: inputs.conversionRate ? Number(inputs.conversionRate) : null,
      ltv1m: inputs.ltv1m ? Number(inputs.ltv1m) : null,
      ltv3m: inputs.ltv3m ? Number(inputs.ltv3m) : null,
      ltv6m: inputs.ltv6m ? Number(inputs.ltv6m) : null,
      ltv12m: inputs.ltv12m ? Number(inputs.ltv12m) : null,
      fees: inputs.fees ? Number(inputs.fees) : null,
      cogs_x: inputs.cogs_x ? Number(inputs.cogs_x) : null // Use cogs_x for input, map to 'cogs' target
    };

    const validKpis = Object.entries(kpiData).filter(([_, v]) => v !== null);
    
    if (validKpis.length === 0) {
      alert('Please enter at least one KPI value to perform the diagnosis.');
      return;
    }

    const analysis = validKpis.map(([key, value]) => {
      const targetKey = key === 'cogs_x' ? 'cogs' : key; // Map cogs_x input to cogs target
      const target = targets[targetKey];
      const status = getStatus(value, target.value, target.direction);
      
      return {
        name: key.replace('_x', '').replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        value,
        target: target.value,
        direction: target.direction,
        status,
        key: targetKey // Added for course recommendations
      };
    });

    const failing = analysis.filter(a => a.status === 'red' || a.status === 'amber');
    const overallStatus = failing.length === 0 ? 'green' : failing.length <= 2 ? 'amber' : 'red';

    setKpiResults({ analysis, overallStatus, failing });
  };

  const calculate = () => {
    const cpa = mode === 'cpa' ? Number(inputs.cpa) : 
                inputs.cr > 0 ? Number(inputs.cpc) / (Number(inputs.cr) / 100) : 25;
    
    const dailyCustomers = inputs.budget / cpa;
    const dailyRevenue = dailyCustomers * inputs.aov;
    const dailyCosts = dailyRevenue * ((inputs.fee + inputs.cogs) / 100);
    const dailyProfit = dailyRevenue - dailyCosts - inputs.budget;
    const dailyMargin = dailyRevenue > 0 ? (dailyProfit / dailyRevenue) * 100 : 0;

    const monthlyCustomers = dailyCustomers * 30;
    const monthlyRevenue = dailyRevenue * 30;
    const monthlyBudget = inputs.budget * 30;
    const monthlyCosts = monthlyRevenue * ((inputs.fee + inputs.cogs) / 100);
    const monthlyProfit = monthlyRevenue - monthlyCosts - monthlyBudget;
    const monthlyMargin = monthlyRevenue > 0 ? (monthlyProfit / monthlyRevenue) * 100 : 0;

    const ltvScenarios = [
      { period: '1M', ltv: inputs.ltv1 },
      { period: '3M', ltv: inputs.ltv3 },
      { period: '6M', ltv: inputs.ltv6 },
      { period: '12M', ltv: inputs.ltv12 }
    ].map(({ period, ltv }) => {
      // Calculate profit for the cohort of customers acquired in one month, over their LTV period.
      const cohortGrossRevenue = monthlyCustomers * ltv;
      const cohortOperationalCosts = cohortGrossRevenue * ((inputs.fee + inputs.cogs) / 100);
      // The monthlyBudget is the cost to acquire *these* monthly customers.
      const cohortProfit = cohortGrossRevenue - cohortOperationalCosts - monthlyBudget;
      const margin = cohortGrossRevenue > 0 ? (cohortProfit / cohortGrossRevenue) * 100 : 0;
      return { period, profit: cohortProfit, margin };
    });

    const bestScenario = ltvScenarios.reduce((best, curr) => 
      Math.abs(curr.profit) > Math.abs(best.profit) ? curr : best
    );

    setResults({
      daily: { customers: dailyCustomers, revenue: dailyRevenue, profit: dailyProfit, margin: dailyMargin },
      monthly: { customers: monthlyCustomers, revenue: monthlyRevenue, profit: monthlyProfit, margin: monthlyMargin },
      ltvScenarios,
      bestScenario
    });

    setTimeout(() => drawChart(ltvScenarios), 100);
  };

  const drawChart = (scenarios) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    const width = rect.width;
    const height = rect.height;
    const padding = 60;
    
    ctx.clearRect(0, 0, width, height);
    
    const profits = scenarios.map(s => s.profit);
    const maxProfit = Math.max(...profits, 0);
    const minProfit = Math.min(...profits, 0);
    const range = maxProfit - minProfit || 1;
    
    // Function to get color based on profit
    const getColorForProfit = (profit) => {
      // Adjusted for a lighter theme, can use the same colors as before or slightly softer ones.
      // Keeping the existing vibrant colors for impact on a light background.
      if (profit < 0) return { r: 239, g: 68, b: 68 }; // Red
      if (profit < 5000) return { r: 245, g: 158, b: 11 }; // Yellow/Orange
      return { r: 34, g: 197, b: 94 }; // Green
    };

    // Calculate points
    const points = [];
    scenarios.forEach((s, i) => {
      const x = padding + (width - 2 * padding) * (i / (scenarios.length - 1));
      const y = padding + (height - 2 * padding) * (1 - (s.profit - minProfit) / range);
      points.push({ x, y, value: s.profit });
    });
    
    // Draw FILLED GRADIENT AREA with dynamic colors
    const areaGradient = ctx.createLinearGradient(padding, 0, width - padding, 0);
    scenarios.forEach((s, i) => {
      const color = getColorForProfit(s.profit);
      const position = i / (scenarios.length - 1);
      areaGradient.addColorStop(position, `rgba(${color.r}, ${color.g}, ${color.b}, 0.08)`); // Lighter fill
    });
    
    ctx.fillStyle = areaGradient;
    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding);
    points.forEach(point => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(points[points.length - 1].x, height - padding);
    ctx.closePath();
    ctx.fill();
    
    // Draw gradient line with dynamic colors
    const lineGradient = ctx.createLinearGradient(padding, 0, width - padding, 0);
    scenarios.forEach((s, i) => {
      const color = getColorForProfit(s.profit);
      const position = i / (scenarios.length - 1);
      lineGradient.addColorStop(position, `rgb(${color.r}, ${color.g}, ${color.b})`);
    });
    
    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = 3;
    ctx.shadowColor = 'rgba(0,0,0,0.15)'; // Lighter shadow for white theme
    ctx.shadowBlur = 10; // Slightly less blur
    ctx.beginPath();
    points.forEach((point, i) => {
      if (i === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
    
    // Draw glowing points with labels
    points.forEach((point, idx) => {
      const scenario = scenarios[idx];
      const color = getColorForProfit(scenario.profit);
      
      ctx.shadowBlur = 0;
      
      // Main point
      ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
      ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`; // Lighter shadow
      ctx.shadowBlur = 6; // Less blur
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.shadowBlur = 0;
      
      // Draw profit value above point
      ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
      ctx.font = '700 11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(fmt(scenario.profit), point.x, point.y - 20);
    });
    
    ctx.shadowBlur = 0;
    
    // Draw X-axis labels
    ctx.fillStyle = '#6B7280'; // Darker gray for labels
    ctx.font = '700 14px Inter';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'transparent'; // Remove shadow for X-axis labels
    ctx.shadowBlur = 0;
    scenarios.forEach((s, i) => {
      const x = padding + (width - 2 * padding) * (i / (scenarios.length - 1));
      ctx.fillText(s.period, x, height - 25);
    });
  };

  useEffect(() => {
    if (results && activeTab === 'ltv') {
      const timer = setTimeout(() => drawChart(results.ltvScenarios), 100);
      const handleResize = () => {
        if (results) drawChart(results.ltvScenarios);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [results, activeTab]);

  const fmt = (amount) => {
    const converted = amount * rates[inputs.currency];
    return `${currencies[inputs.currency]}${Math.round(converted).toLocaleString()}`;
  };

  const courseLinks = {
    conversionRate: [
      { name: 'The Subconscious Trap', url: 'https://quantum-scale.co/products/the-subconscious-switch', img: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_41.jpg?v=1757233340' },
      { name: 'The Social Proof', url: 'https://quantum-scale.co/products/the-social-proof', img: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_43.jpg?v=1757233352' },
      { name: 'Product Mapping', url: 'https://quantum-scale.co/products/test', img: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_44.jpg?v=1757233375' }
    ],
    ltv: [
      { name: 'The Automatic System', url: 'https://quantum-scale.co/products/the-automatic-system-that-earn-1-000-per-customer', img: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_58_efa8c3cd-aa72-4542-a933-0f433d8c01a1.jpg?v=1757325732' },
      { name: 'Email Marketing', url: 'https://quantum-scale.co/products/email-marketing', img: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_40.jpg?v=1757233368' }
    ]
  };

  const openCoursesModal = (courses) => {
    setSelectedCourses(courses);
    setShowCoursesModal(true);
  };

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: '#F9FAFB' }}>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-3" style={{ 
            color: '#1E1E1E',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '-0.02em'
          }}>
            Profit Intelligence Center
          </h1>
          <p className="text-base md:text-lg" style={{ 
            color: '#6B7280'
          }}>
            Model your numbers. Predict your growth. Scale with precision.
          </p>
        </div>

        {/* Clean Toggle Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-10">
          <button
            onClick={() => setActiveTab('ltv')}
            className={`px-6 md:px-8 py-3 md:py-4 font-semibold text-base md:text-lg rounded-xl transition-all ${
              activeTab === 'ltv' 
                ? 'shadow-lg' 
                : ''
            }`}
            style={{
              background: activeTab === 'ltv' ? 'linear-gradient(135deg, #007DFF 0%, #0051CC 100%)' : '#FFFFFF',
              color: activeTab === 'ltv' ? '#FFFFFF' : '#6B7280',
              border: '1px solid' + (activeTab === 'ltv' ? '#007DFF' : '#E5E7EB')
            }}
          >
            Profit Simulation
          </button>
          <button
            onClick={() => setActiveTab('kpi')}
            className={`px-6 md:px-8 py-3 md:py-4 font-semibold text-base md:text-lg rounded-xl transition-all ${
              activeTab === 'kpi' 
                ? 'shadow-lg' 
                : ''
            }`}
            style={{
              background: activeTab === 'kpi' ? 'linear-gradient(135deg, #007DFF 0%, #0051CC 100%)' : '#FFFFFF',
              color: activeTab === 'kpi' ? '#FFFFFF' : '#6B7280',
              border: '1px solid' + (activeTab === 'kpi' ? '#007DFF' : '#E5E7EB')
            }}
          >
            KPI X-Ray
          </button>
        </div>

        {activeTab === 'ltv' ? (
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Input Card - Clean Style */}
            <div className="p-6 md:p-8 relative rounded-2xl"
                 style={{
                   background: '#FFFFFF',
                   border: '1px solid #E5E7EB',
                   boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                 }}>
              
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center"
                     style={{ 
                       background: 'rgba(0,125,255,0.1)', // new blue
                       border: '1px solid rgba(0,125,255,0.2)'
                     }}>
                  <Calculator className="w-6 h-6 md:w-7 md:h-7 text-[#007DFF]" /> {/* new blue */}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#1E1E1E' }}>
                    Profit Simulation
                  </h2>
                  <p className="text-xs md:text-sm" style={{ color: '#6B7280' }}>Adjust your inputs - see how every decision impacts your profit</p>
                </div>
              </div>

              <div className="space-y-5 md:space-y-6">
                {/* Core Inputs */}
                <div className="p-4 md:p-5 rounded-xl" style={{
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB'
                }}>
                  <h3 className="font-semibold mb-3 md:mb-4 text-xs md:text-sm uppercase tracking-wide" style={{ color: '#007DFF' }}> {/* new blue */}
                    Core Inputs
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <Label className="text-xs font-medium mb-2 block" style={{ color: '#6B7280' }}>
                        Average Order Value
                      </Label>
                      <Input
                        type="number"
                        value={inputs.aov}
                        onChange={(e) => setInputs({...inputs, aov: Number(e.target.value)})}
                        className="bg-white border-gray-300 text-gray-800 focus:border-[#007DFF] focus:ring-1 focus:ring-[#E5F0FF]" // new blue
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium mb-2 block" style={{ color: '#6B7280' }}>
                        Daily Ad Budget
                      </Label>
                      <Input
                        type="number"
                        value={inputs.budget}
                        onChange={(e) => setInputs({...inputs, budget: Number(e.target.value)})}
                        className="bg-white border-gray-300 text-gray-800 focus:border-[#007DFF] focus:ring-1 focus:ring-[#E5F0FF]" // new blue
                      />
                    </div>
                  </div>
                </div>

                {/* Customer LTV */}
                <div className="p-4 md:p-5 rounded-xl" style={{
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB'
                }}>
                  <h3 className="font-semibold mb-3 md:mb-4 text-xs md:text-sm uppercase tracking-wide" style={{ color: '#007DFF' }}> {/* new blue */}
                    Customer LTV (per customer)
                  </h3>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {[
                      { label: '1 Month', key: 'ltv1' },
                      { label: '3 Months', key: 'ltv3' },
                      { label: '6 Months', key: 'ltv6' },
                      { label: '12 Months', key: 'ltv12' }
                    ].map(({ label, key }) => (
                      <div key={key}>
                        <Label className="text-xs font-medium mb-2 block" style={{ color: '#6B7280' }}>
                          {label}
                        </Label>
                        <Input
                          type="number"
                          value={inputs[key]}
                          onChange={(e) => setInputs({...inputs, [key]: Number(e.target.value)})}
                          className="bg-white border-gray-300 text-gray-800 focus:border-[#007DFF] focus:ring-1 focus:ring-[#E5F0FF]" // new blue
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Acquisition Method */}
                <div className="p-4 md:p-5 rounded-xl" style={{
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB'
                }}>
                  <h3 className="font-semibold mb-3 md:mb-4 text-xs md:text-sm uppercase tracking-wide" style={{ color: '#007DFF' }}> {/* new blue */}
                    Acquisition Method
                  </h3>
                  <div className="flex flex-wrap gap-4 md:gap-6 mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={mode === 'cpa'}
                        onChange={() => setMode('cpa')}
                        className="w-4 h-4 text-[#007DFF] bg-white border-gray-300 focus:ring-[#E5F0FF]" // new blue
                      />
                      <span style={{ color: '#6B7280' }}>CPA</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={mode === 'conv'}
                        onChange={() => setMode('conv')}
                        className="w-4 h-4 text-[#007DFF] bg-white border-gray-300 focus:ring-[#E5F0FF]" // new blue
                      />
                      <span style={{ color: '#6B7280' }}>CR + CPC</span>
                    </label>
                  </div>
                  {mode === 'cpa' ? (
                    <Input
                      type="number"
                      placeholder="Cost Per Acquisition"
                      value={inputs.cpa}
                      onChange={(e) => setInputs({...inputs, cpa: Number(e.target.value)})}
                      className="bg-white border-gray-300 text-gray-800 focus:border-[#007DFF] focus:ring-1 focus:ring-[#E5F0FF]" // new blue
                    />
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <Input
                        type="number"
                        placeholder="Conversion Rate %"
                        value={inputs.cr}
                        onChange={(e) => setInputs({...inputs, cr: Number(e.target.value)})}
                        className="bg-white border-gray-300 text-gray-800 focus:border-[#007DFF] focus:ring-1 focus:ring-[#E5F0FF]" // new blue
                      />
                      <Input
                        type="number"
                        placeholder="Cost Per Click $"
                        value={inputs.cpc}
                        onChange={(e) => setInputs({...inputs, cpc: Number(e.target.value)})}
                        className="bg-white border-gray-300 text-gray-800 focus:border-[#007DFF] focus:ring-1 focus:ring-[#E5F0FF]" // new blue
                      />
                    </div>
                  )}
                </div>

                {/* Business Costs */}
                <div className="p-4 md:p-5 rounded-xl" style={{
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB'
                }}>
                  <h3 className="font-semibold mb-3 md:mb-4 text-xs md:text-sm uppercase tracking-wide" style={{ color: '#007DFF' }}> {/* new blue */}
                    Business Costs
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <Label className="text-xs font-medium mb-2 block" style={{ color: '#6B7280' }}>
                        Processing Fees (%)
                      </Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={inputs.fee}
                        onChange={(e) => setInputs({...inputs, fee: Number(e.target.value)})}
                        className="bg-white border-gray-300 text-gray-800 focus:border-[#007DFF] focus:ring-1 focus:ring-[#E5F0FF]" // new blue
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium mb-2 block" style={{ color: '#6B7280' }}>
                        COGS (% of revenue)
                      </Label>
                      <Input
                        type="number"
                        value={inputs.cogs}
                        onChange={(e) => setInputs({...inputs, cogs: Number(e.target.value)})}
                        className="bg-white border-gray-300 text-gray-800 focus:border-[#007DFF] focus:ring-1 focus:ring-[#E5F0FF]" // new blue
                      />
                    </div>
                  </div>
                </div>

                {/* Currency */}
                <div className="p-4 md:p-5 rounded-xl" style={{
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB'
                }}>
                  <Label className="text-xs font-medium mb-2 block" style={{ color: '#6B7280' }}>
                    Currency
                  </Label>
                  <Select value={inputs.currency} onValueChange={(v) => setInputs({...inputs, currency: v})}>
                    <SelectTrigger className="bg-white border-gray-300 text-gray-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300 text-gray-800">
                      {Object.keys(currencies).map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clean Calculate Button */}
                <button
                  onClick={calculate}
                  className="w-full py-4 md:py-5 text-base md:text-lg font-bold rounded-xl transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #007DFF 0%, #0051CC 100%)', // new blue gradient
                    color: '#FFFFFF',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,125,255,0.3)' // new blue shadow
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(0,125,255,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,125,255,0.3)';
                  }}
                >
                  CALCULATE PROFITS
                </button>
              </div>
            </div>

            {/* Results Column */}
            <div className="space-y-5 md:space-y-6">
              {results && (
                <>
                  {/* Chart Card - Clean */}
                  <div className="p-6 md:p-8 rounded-2xl" style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}>
                    <h3 className="font-bold text-xl md:text-2xl mb-4 md:mb-6" style={{ color: '#1E1E1E' }}>
                      Visualize Your Growth Path
                    </h3>
                    <p className="text-sm mb-4" style={{ color: '#6B7280' }}>Short term to long term profit projection</p>
                    <canvas ref={canvasRef} style={{ width: '100%', height: '280px' }} className="md:h-[320px]" />
                  </div>

                  {/* Profit Analysis - Clean */}
                  <div className="p-5 md:p-6 rounded-2xl" style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}>
                    <h3 className="font-bold text-base md:text-lg mb-2 flex items-center gap-2" style={{ color: '#1E1E1E' }}>
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-[#007DFF]" /> {/* new blue */}
                      Profit Analysis
                    </h3>
                    <p className="text-xs mb-4 md:mb-5" style={{ color: '#6B7280' }}>
                      Your daily/monthly profit based on AOV (immediate, short-term profit)
                    </p>
                    
                    <div className="mb-4 md:mb-5">
                      <h4 className="font-semibold text-sm mb-3" style={{ color: '#007DFF' }}>Daily Performance</h4> {/* new blue */}
                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        {[
                          { label: 'Customers', value: results.daily.customers.toFixed(1) },
                          { label: 'Revenue', value: fmt(results.daily.revenue) },
                          { label: 'Net Profit', value: fmt(results.daily.profit), colored: true },
                          { label: 'Margin', value: `${results.daily.margin.toFixed(1)}%`, colored: true }
                        ].map(({ label, value, colored }) => (
                          <div key={label} className="p-3 md:p-4 rounded-xl" style={{
                            background: '#F9FAFB',
                            border: '1px solid #E5E7EB'
                          }}>
                            <p className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>{label}</p>
                            <p className="text-xl md:text-2xl font-bold" style={{ 
                              color: colored ? (results.daily.profit >= 0 ? '#22c55e' : '#ef4444') : '#1E1E1E'
                            }}>
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-3" style={{ color: '#007DFF' }}>Monthly (30 days)</h4> {/* new blue */}
                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        {[
                          { label: 'Customers', value: results.monthly.customers.toFixed(1) },
                          { label: 'Revenue', value: fmt(results.monthly.revenue) },
                          { label: 'Net Profit', value: fmt(results.monthly.profit), colored: true },
                          { label: 'Margin', value: `${results.monthly.margin.toFixed(1)}%`, colored: true }
                        ].map(({ label, value, colored }) => (
                          <div key={label} className="p-3 md:p-4 rounded-xl" style={{
                            background: '#F9FAFB',
                            border: '1px solid #E5E7EB'
                          }}>
                            <p className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>{label}</p>
                            <p className="text-xl md:text-2xl font-bold" style={{ 
                              color: colored ? (results.monthly.profit >= 0 ? '#22c55e' : '#ef4444') : '#1E1E1E'
                            }}>
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Long-term Profit */}
                  <div className="p-5 md:p-6 rounded-2xl" style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}>
                    <h3 className="font-bold text-base md:text-lg mb-2" style={{ color: '#1E1E1E' }}>
                      Long-term Profit with LTV (per acquired cohort)
                    </h3>
                    <p className="text-xs mb-3 md:mb-4" style={{ color: '#6B7280' }}>
                      Projected total profit generated by one month's new customers over time.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
                      {results.ltvScenarios.map((scenario, idx) => (
                        <div key={idx} className="p-3 rounded-xl text-center" style={{
                          background: '#F9FAFB',
                          border: '1px solid #E5E7EB'
                        }}>
                          <p className="text-xs font-semibold mb-2" style={{ color: '#007DFF' }}> {/* new blue */}
                            {scenario.period}
                          </p>
                          <p className="text-base md:text-lg font-bold mb-1" style={{ 
                            color: scenario.profit >= 0 ? '#22c55e' : '#ef4444'
                          }}>
                            {fmt(scenario.profit)}
                          </p>
                          <p className="text-xs" style={{ color: '#6B7280' }}>
                            {scenario.margin.toFixed(1)}%
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary Cards */}
                  <div className="space-y-3 md:space-y-4">
                    {results.ltvScenarios.find(s => s.period === '12M') && (
                      <>
                        <div className="p-4 md:p-5 rounded-xl text-center" style={{
                          background: '#F0FDF4', // Light green background
                          border: '1px solid #D1FAE5' // Light green border
                        }}>
                          <p className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#22c55e' }}>
                            {fmt(results.ltvScenarios.find(s => s.period === '12M').profit / 30)}
                          </p>
                          <p className="text-xs md:text-sm" style={{ color: '#6B7280' }}>
                            Future profit (based on 12-month LTV of a cohort) you generate daily
                          </p>
                        </div>

                        <div className="p-4 md:p-5 rounded-xl text-center" style={{
                          background: '#EFF6FF', // Light blue background
                          border: '1px solid #DBEAFE' // Light blue border
                        }}>
                          <p className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#007DFF' }}> {/* new blue */}
                            {fmt(results.ltvScenarios.find(s => s.period === '12M').profit)}
                          </p>
                          <p className="text-xs md:text-sm" style={{ color: '#6B7280' }}>
                            Future profit (based on 12-month LTV of a cohort) you generate monthly
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Scale Readiness X-RAY - Clean */}
                  <div className="p-5 md:p-7 rounded-2xl" style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 mb-6 md:mb-8">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                           style={{ 
                             background: 'rgba(0,125,255,0.1)', // new blue
                             border: '1px solid rgba(0,125,255,0.2)'
                           }}>
                        <Target className="w-6 h-6 md:w-7 md:h-7 text-[#007DFF]" /> {/* new blue */}
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold" style={{ color: '#1E1E1E' }}>
                          Scale Readiness X-RAY
                        </h3>
                      </div>
                    </div>
                    
                    {/* Status Indicator - Clean */}
                    <div className="mb-5 md:mb-6 p-4 md:p-5 rounded-xl" style={{ 
                      background: results.monthly.profit >= 5000 
                        ? '#F0FDF4' // green-50
                        : results.monthly.profit >= 2000 
                          ? '#FFFBEB' // yellow-50
                          : '#FEF2F2', // red-50
                      border: '1px solid ' + (results.monthly.profit >= 5000 
                        ? '#D1FAE5' // green-200
                        : results.monthly.profit >= 2000 
                          ? '#FDE68A' // yellow-200
                          : '#FECDCD') // red-200
                    }}>
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-5 h-5 rounded-full" style={{ 
                          background: results.monthly.profit >= 5000 
                            ? '#22c55e' 
                            : results.monthly.profit >= 2000 
                              ? '#f59e0b' 
                              : '#ef4444'
                        }} />
                        <div>
                          <span className="font-bold text-xl md:text-2xl block" style={{ color: '#1E1E1E' }}>
                            {results.monthly.profit >= 5000 
                              ? 'Ready to Scale' 
                              : results.monthly.profit >= 2000 
                                ? 'Almost Ready' 
                                : 'Not Ready Yet'}
                          </span>
                          <span className="text-xs md:text-sm" style={{ color: '#6B7280' }}>
                            Business health status
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Items - Clean */}
                    <div className="space-y-2 md:space-y-3">
                      <p className="text-xs md:text-sm font-bold mb-3 md:mb-4 flex items-center gap-2 text-[#007DFF]"> {/* new blue */}
                        <Zap className="w-4 h-4" />
                        Recommended Actions
                      </p>
                      {[
                        { text: 'Improve profit margins', type: 'conversion' },
                        { text: 'Increase customer LTV', type: 'ltv' },
                        { text: 'Optimize acquisition channels', type: 'ltv' }
                      ].map((action, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 md:p-4 rounded-xl" style={{
                          background: '#F9FAFB',
                          border: '1px solid #E5E7EB'
                        }}>
                          <span className="text-sm font-medium" style={{ color: '#1E1E1E' }}>{action.text}</span>
                          <button
                            onClick={() => openCoursesModal(action.type === 'conversion' ? courseLinks.conversionRate : courseLinks.ltv)}
                            className="px-4 md:px-5 py-2 rounded-lg text-xs font-bold w-full sm:w-auto transition-all"
                            style={{
                              background: 'rgba(0,125,255,0.1)', // new blue
                              border: '1px solid rgba(0,125,255,0.2)', // new blue
                              color: '#007DFF' // new blue
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = 'rgba(0,125,255,0.2)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'rgba(0,125,255,0.1)';
                            }}
                          >
                            View Resources <ArrowRight className="w-3 h-3 inline ml-1" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* KPI Input Card */}
            <div className="p-6 md:p-8 relative rounded-2xl"
                 style={{
                   background: '#FFFFFF',
                   border: '1px solid #E5E7EB',
                   boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                 }}>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#1E1E1E', fontFamily: 'Poppins, sans-serif' }}>
                KPI X-Ray
              </h2>
              <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
                Spot weaknesses. Strengthen your foundations. Build data confidence.
              </p>
              
              <div className="space-y-5 md:space-y-6 relative z-10">
                <div className="p-4 md:p-5 rounded-2xl" style={{
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB'
                }}>
                  <h3 className="font-semibold mb-3 md:mb-4 text-xs md:text-sm uppercase tracking-wide" style={{ color: '#007DFF' }}> {/* new blue */}
                    Business Metrics
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <Label className="text-xs font-medium mb-2 block" style={{ color: '#6B7280' }}>
                        Conversion Rate (%)
                      </Label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="2.5"
                        value={inputs.conversionRate}
                        onChange={(e) => setInputs({...inputs, conversionRate: e.target.value})}
                        className="bg-white border-gray-300 text-gray-800 focus:border-[#007DFF] focus:ring-1 focus:ring-[#E5F0FF]" // new blue
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium mb-2 block" style={{ color: '#6B7280' }}>
                        AOV ($)
                      </Label>
                      <Input
                        type="number"
                        placeholder="60"
                        value={inputs.aov_x}
                        onChange={(e) => setInputs({...inputs, aov_x: e.target.value})}
                        className="bg-white border-gray-300 text-gray-800 focus:border-[#007DFF] focus:ring-1 focus:ring-[#E5F0FF]" // new blue
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-5 rounded-2xl" style={{
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB'
                }}>
                  <h3 className="font-semibold mb-3 md:mb-4 text-xs md:text-sm uppercase tracking-wide" style={{ color: '#007DFF' }}> {/* new blue */}
                    LTV Metrics
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {[
                      { label: '1 Month LTV', key: 'ltv1m', placeholder: '200' },
                      { label: '3 Month LTV', key: 'ltv3m', placeholder: '300' },
                      { label: '6 Month LTV', key: 'ltv6m', placeholder: '500' },
                      { label: '12 Month LTV', key: 'ltv12m', placeholder: '1000' }
                    ].map(({ label, key, placeholder }) => (
                      <div key={key}>
                        <Label className="text-xs font-medium mb-2 block" style={{ color: '#6B7280' }}>
                          {label}
                        </Label>
                        <Input
                          type="number"
                          placeholder={placeholder}
                          value={inputs[key]}
                          onChange={(e) => setInputs({...inputs, [key]: e.target.value})}
                          className="bg-white border-gray-300 text-gray-800 focus:border-[#007DFF] focus:ring-1 focus:ring-[#E5F0FF]" // new blue
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 md:p-5 rounded-2xl" style={{
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB'
                }}>
                  <h3 className="font-semibold mb-3 md:mb-4 text-xs md:text-sm uppercase tracking-wide" style={{ color: '#007DFF' }}> {/* new blue */}
                    Cost Structure
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <Label className="text-xs font-medium mb-2 block" style={{ color: '#6B7280' }}>
                        All Transaction Fees (% of revenue)
                      </Label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="2.9"
                        value={inputs.fees}
                        onChange={(e) => setInputs({...inputs, fees: e.target.value})}
                        className="bg-white border-gray-300 text-gray-800 focus:border-[#007DFF] focus:ring-1 focus:ring-[#E5F0FF]" // new blue
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium mb-2 block" style={{ color: '#6B7280' }}>
                        COGS (% of revenue)
                      </Label>
                      <Input
                        type="number"
                        placeholder="35"
                        value={inputs.cogs_x}
                        onChange={(e) => setInputs({...inputs, cogs_x: e.target.value})}
                        className="bg-white border-gray-300 text-gray-800 focus:border-[#007DFF] focus:ring-1 focus:ring-[#E5F0FF]" // new blue
                      />
                    </div>
                  </div>
                </div>

                {/* VOL-Style Premium Diagnose Button */}
                <button
                  onClick={diagnoseKPI}
                  className="w-full py-4 md:py-5 text-base md:text-lg font-bold rounded-2xl transition-all relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, #007DFF 0%, #0051CC 100%)', // new blue gradient
                    color: '#FFFFFF',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,125,255,0.3)' // new blue shadow
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(0,125,255,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,125,255,0.3)';
                  }}
                >
                  <span className="relative z-10 tracking-wide">DIAGNOSE</span>
                </button>
              </div>
            </div>

            {/* KPI Results */}
            <div className="space-y-5 md:space-y-6">
              {kpiResults && (
                <>
                  {kpiResults.overallStatus === 'amber' && (
                    <div className="p-4 rounded-xl" style={{
                      background: '#FFFBEB',
                      border: '1px solid #FDE68A'
                    }}>
                      <p className="text-xs font-medium" style={{ color: '#92400E' }}>
                        Two metrics need attention - fix them to unlock scale readiness
                      </p>
                    </div>
                  )}
                  <div className="p-6 md:p-8 relative overflow-hidden rounded-2xl"
                     style={{
                       background: '#FFFFFF',
                       border: '1px solid #E5E7EB',
                       boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                     }}>
                    
                    <h3 className="font-bold text-lg md:text-xl mb-4 md:mb-6 relative z-10" style={{ color: '#1E1E1E' }}>
                      Overall Readiness
                    </h3>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-5 p-4 md:p-6 rounded-2xl relative z-10" style={{ 
                      background: kpiResults.overallStatus === 'green' 
                        ? 'linear-gradient(135deg, #ECFDF5, #D1FAE5)' // green-50 to green-200
                        : kpiResults.overallStatus === 'amber' 
                          ? 'linear-gradient(135deg, #FFFBEB, #FDE68A)' // yellow-50 to yellow-200
                          : 'linear-gradient(135deg, #FEF2F2, #FECDCD)', // red-50 to red-200
                      border: '1px solid ' + (kpiResults.overallStatus === 'green' 
                        ? '#A7F3D0' // green-300
                        : kpiResults.overallStatus === 'amber' 
                          ? '#FCD34D' // yellow-300
                          : '#FCA5A5'), // red-300
                      boxShadow: kpiResults.overallStatus === 'green' 
                        ? '0 0 15px rgba(34,197,94,0.1), inset 0 1px 2px rgba(0,0,0,0.05)' 
                        : kpiResults.overallStatus === 'amber' 
                          ? '0 0 15px rgba(245,158,11,0.1), inset 0 1px 2px rgba(0,0,0,0.05)' 
                          : '0 0 15px rgba(239,68,68,0.1), inset 0 1px 2px rgba(0,0,0,0.05)'
                    }}>
                      <div className="relative flex-shrink-0">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center relative z-10" style={{
                          background: kpiResults.overallStatus === 'green' 
                            ? 'linear-gradient(135deg, #22c55e, #10b981)' 
                            : kpiResults.overallStatus === 'amber' 
                              ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' 
                              : 'linear-gradient(135deg, #ef4444, #dc2626)',
                          boxShadow: kpiResults.overallStatus === 'green' 
                            ? '0 0 12px rgba(34,197,94,0.5), 0 0 24px rgba(34,197,94,0.2)' 
                            : kpiResults.overallStatus === 'amber' 
                              ? '0 0 12px rgba(245,158,11,0.5), 0 0 24px rgba(245,158,11,0.2)' 
                              : '0 0 12px rgba(239,68,68,0.5), 0 0 24px rgba(239,68,68,0.2)'
                        }}>
                          {kpiResults.overallStatus === 'green' ? (
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                          ) : (
                            <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                          )}
                        </div>
                        <div className="absolute inset-0 rounded-full animate-ping opacity-75" style={{
                          background: kpiResults.overallStatus === 'green' 
                            ? 'rgba(34,197,94,0.3)' 
                            : kpiResults.overallStatus === 'amber' 
                              ? 'rgba(245,158,11,0.3)' 
                              : 'rgba(239,68,68,0.3)'
                        }} />
                      </div>
                      <div>
                        <p className="font-bold text-lg md:text-xl mb-1" style={{ color: '#1E1E1E' }}>
                          {kpiResults.overallStatus === 'green' 
                            ? 'All KPIs Meeting Targets!' 
                            : kpiResults.overallStatus === 'amber' 
                              ? 'Almost There' 
                              : 'Needs Improvement'}
                        </p>
                        <p className="text-xs md:text-sm" style={{ color: '#6B7280' }}>
                          {kpiResults.overallStatus === 'green' 
                            ? 'Your business is ready to scale.' 
                            : `${kpiResults.failing.length} KPI(s) need attention.`}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 md:p-6 rounded-2xl"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}>
                    <h3 className="font-bold text-base md:text-lg mb-4 md:mb-5" style={{ color: '#1E1E1E' }}>
                      Gap Analysis
                    </h3>
                    <div className="space-y-2 md:space-y-3">
                      {kpiResults.analysis.map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 md:p-4 rounded-xl"
                          style={{
                            background: '#F9FAFB',
                            border: '1px solid #E5E7EB'
                          }}>
                          <div className="flex items-center gap-4 relative z-10">
                            <div className="relative">
                              <div className="w-3 h-3 rounded-full relative z-10" style={{ 
                                background: item.status === 'green' 
                                  ? 'linear-gradient(135deg, #22c55e, #10b981)' 
                                  : item.status === 'amber' 
                                    ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' 
                                    : 'linear-gradient(135deg, #ef4444, #dc2626)',
                                boxShadow: item.status === 'green' 
                                  ? '0 0 8px rgba(34,197,94,0.4)' 
                                  : item.status === 'amber' 
                                    ? '0 0 8px rgba(245,158,11,0.4)' 
                                    : '0 0 8px rgba(239,68,68,0.4)'
                              }} />
                              <div className="absolute inset-0 w-3 h-3 rounded-full animate-ping opacity-75" style={{
                                background: item.status === 'green' 
                                  ? 'rgba(34,197,94,0.2)' 
                                  : item.status === 'amber' 
                                    ? 'rgba(245,158,11,0.2)' 
                                    : 'rgba(239,68,68,0.2)'
                              }} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold" style={{ color: '#1E1E1E' }}>{item.name}</p>
                              <p className="text-xs" style={{ color: '#6B7280' }}>
                                Target: {item.direction === 'higher' ? '≥' : '≤'} {item.target}
                              </p>
                            </div>
                          </div>
                          <span className="font-bold text-lg relative z-10" style={{ 
                            color: item.status === 'green' ? '#22c55e' : item.status === 'amber' ? '#f59e0b' : '#ef4444',
                            textShadow: 'none' // Remove text shadow for light theme
                          }}>
                            {item.value}{item.name.toLowerCase().includes('ltv') ? '$' : '%'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {kpiResults.failing.length > 0 && (
                    <>
                      <div className="p-5 md:p-6 relative overflow-hidden rounded-2xl"
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                        }}>
                        
                        <h3 className="font-bold text-base md:text-lg mb-4 md:mb-5 relative z-10 flex items-center gap-2" style={{ color: '#1E1E1E' }}>
                          <Zap className="w-4 h-4 md:w-5 md:h-5 text-[#007DFF]" /> {/* new blue */}
                          Recommended Actions
                        </h3>
                        <div className="space-y-3 md:space-y-4 relative z-10">
                          {kpiResults.failing.slice(0, 3).map((item, idx) => {
                            const isConversion = item.name.toLowerCase().includes('conversion');
                            
                            return (
                              <div key={idx} className="p-4 md:p-5 rounded-2xl relative overflow-hidden" 
                                   style={{ 
                                     background: '#F9FAFB',
                                     border: '1px solid #E5E7EB',
                                     boxShadow: 'none' // Removed glowing box-shadow from dark theme
                                   }}>
                                <p className="font-bold mb-2 text-base md:text-lg relative z-10" style={{ 
                                  color: '#007DFF', // new blue
                                  textShadow: 'none' // Removed text shadow
                                }}>
                                  Improve {item.name}
                                </p>
                                <p className="text-xs md:text-sm mb-3 md:mb-4 relative z-10" style={{ color: '#6B7280' }}>
                                  Current: <span className="font-semibold" style={{ color: '#1E1E1E' }}>{item.value}</span> | 
                                  Target: <span className="font-semibold" style={{ color: '#1E1E1E' }}>{item.direction === 'higher' ? '≥' : '≤'} {item.target}</span>
                                </p>
                                <button
                                  onClick={() => openCoursesModal(isConversion ? courseLinks.conversionRate : courseLinks.ltv)}
                                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold w-full justify-center sm:w-auto"
                                  style={{
                                    background: 'rgba(0,125,255,0.1)', // new blue light background
                                    border: '1px solid rgba(0,125,255,0.2)', // new blue light border
                                    color: '#007DFF', // new blue text
                                    transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                    boxShadow: 'none'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.background = 'rgba(0,125,255,0.2)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.background = 'rgba(0,125,255,0.1)';
                                  }}
                                >
                                  <span className="relative z-10">View Resources</span>
                                  <ArrowRight className="w-4 h-4 relative z-10" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Recommended Courses Section */}
                      <div className="p-5 md:p-6 relative overflow-hidden rounded-2xl"
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                        }}>
                        
                        <h3 className="font-bold text-lg md:text-xl mb-4 md:mb-6 text-center relative z-10" style={{ color: '#1E1E1E' }}>
                          Recommended Courses
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 relative z-10">
                          {/* Show relevant courses based on failing KPIs */}
                          {kpiResults.failing.some(f => f.key === 'conversionRate') && 
                            courseLinks.conversionRate.map((course, idx) => (
                              <a
                                key={idx}
                                href={course.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group rounded-xl overflow-hidden transition-all duration-300"
                                style={{
                                  background: '#F9FAFB', // Light gray background
                                  border: '1px solid #E5E7EB', // Light gray border
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                                }}
                              >
                                <div style={{ aspectRatio: '1000/1200', overflow: 'hidden' }}>
                                  <img 
                                    src={course.img}
                                    alt={course.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                </div>
                                <div className="p-3 md:p-4">
                                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold mb-2"
                                       style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' }}>
                                    <ArrowRight className="w-3 h-3" style={{ transform: 'rotate(-45deg)' }} />
                                    Higher Conversion
                                  </div>
                                  <h4 className="font-bold text-sm mb-1 uppercase tracking-wide" style={{ color: '#1E1E1E' }}>
                                    {course.name}
                                  </h4>
                                  <div className="flex items-center justify-between px-2 py-1 rounded-lg text-xs font-semibold mt-3"
                                       style={{ background: 'rgba(0,125,255,0.1)', color: '#007DFF' }}> {/* new blue */}
                                    <span>Learn More</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </div>
                                </div>
                              </a>
                            ))
                          }

                          {kpiResults.failing.some(f => f.key.includes('ltv')) && 
                            courseLinks.ltv.map((course, idx) => (
                              <a
                                key={idx}
                                href={course.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group rounded-xl overflow-hidden transition-all duration-300"
                                style={{
                                  background: '#F9FAFB', // Light gray background
                                  border: '1px solid #E5E7EB', // Light gray border
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                                }}
                              >
                                <div style={{ aspectRatio: '1000/1200', overflow: 'hidden' }}>
                                  <img 
                                    src={course.img}
                                    alt={course.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                </div>
                                <div className="p-3 md:p-4">
                                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold mb-2"
                                       style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' }}>
                                    <ArrowRight className="w-3 h-3" style={{ transform: 'rotate(-45deg)' }} />
                                    Higher LTV
                                  </div>
                                  <h4 className="font-bold text-sm mb-1 uppercase tracking-wide" style={{ color: '#1E1E1E' }}>
                                    {course.name}
                                  </h4>
                                  <div className="flex items-center justify-between px-2 py-1 rounded-lg text-xs font-semibold mt-3"
                                       style={{ background: 'rgba(0,125,255,0.1)', color: '#007DFF' }}> {/* new blue */}
                                    <span>Learn More</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </div>
                                </div>
                              </a>
                            ))
                          }
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* FIXED: Courses Modal - Clean & Organized */}
      {showCoursesModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} // Lighter overlay
          onClick={() => setShowCoursesModal(false)}
        >
          <div 
            className="max-w-4xl w-full p-6 md:p-8 max-h-[85vh] overflow-y-auto rounded-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              background: '#FFFFFF', // White background
              border: '1px solid #E5E7EB', // Light border
              boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
            }}
          >
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#1E1E1E' }}>
                Recommended Courses
              </h2>
              <button
                onClick={() => setShowCoursesModal(false)}
                className="p-2 rounded-full transition-all"
                style={{ background: '#F3F4F6' }} // Light gray background
              >
                <X className="w-5 h-5 text-gray-600" /> {/* Darker icon color */}
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {selectedCourses.map((course, idx) => (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
                  style={{
                    background: '#F9FAFB', // Light gray background
                    border: '1px solid #E5E7EB' // Light gray border
                  }}
                >
                  {/* Course Image - Fixed aspect ratio */}
                  <div style={{ aspectRatio: '1000/1200', overflow: 'hidden', background: '#E5E7EB' }}>
                    <img 
                      src={course.img}
                      alt={course.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Course Info */}
                  <div className="p-4">
                    <h4 className="font-bold text-base mb-3" style={{ color: '#1E1E1E' }}>
                      {course.name}
                    </h4>
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
                      style={{
                        background: 'rgba(0,125,255,0.1)', // new blue light background
                        border: '1px solid rgba(0,125,255,0.2)', // new blue light border
                        color: '#007DFF' // new blue text
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(0,125,255,0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(0,125,255,0.1)';
                      }}
                    >
                      View Course
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Removed all custom CSS classes and background glows as per white theme redesign. */}
      <style>{`
      `}</style>
    </div>
  );
}
