
import React, { useState } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

export default function Blueprint100K() {
  const [selectedGoal, setSelectedGoal] = useState('100k');

  const metricsData = {
    '100k': {
      title: '$100,000',
      dailyBudget: 240,
      metrics: [
        { name: 'CAC (Cost per Customer)', min: '$30', aim: '$20' },
        { name: 'Conversion Rate (Cold Traffic)', min: '5%', aim: '7%+' },
        { name: 'Average Order Value (AOV)', min: '$150', aim: '$200+' },
        { name: '24-months LTV', min: '$700', aim: '$1,000+' },
        { name: 'Product price markup', min: '3x', aim: '3.5x+' }
      ],
      customersPerDay: 8,
      customersPerMonth: 240,
      maxProfit: '$239,000'
    },
    '300k': {
      title: '$300,000',
      dailyBudget: 470,
      metrics: [
        { name: 'CAC (Cost per Customer)', min: '$25', aim: '$18' },
        { name: 'Conversion Rate (Cold Traffic)', min: '6%', aim: '8%+' },
        { name: 'Average Order Value (AOV)', min: '$180', aim: '$230+' },
        { name: '24-months LTV', min: '$850', aim: '$1,200+' },
        { name: 'Product price markup', min: '3.2x', aim: '4x+' }
      ],
      customersPerDay: 19,
      customersPerMonth: 570,
      maxProfit: '$640,000'
    },
    '1m': {
      title: '$1,000,000',
      dailyBudget: 1265,
      metrics: [
        { name: 'CAC (Cost per Customer)', min: '$25', aim: '$18' },
        { name: 'Conversion Rate (Cold Traffic)', min: '7%', aim: '9%+' },
        { name: 'Average Order Value (AOV)', min: '$200', aim: '$260+' },
        { name: '24-months LTV', min: '$1,000', aim: '$1,300+' },
        { name: 'Product price markup', min: '3.5x', aim: '4x+' },
        { name: 'Processing Fees', min: '3%', aim: '3%' }
      ],
      customersPerDay: 51,
      customersPerMonth: 1530,
      maxProfit: '$2,000,000'
    }
  };

  const currentData = metricsData[selectedGoal];

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-5"
               style={{ 
                 background: '#DCFCE7',
                 border: '1px solid #BBF7D0'
               }}>
            <TrendingUp className="w-4 h-4" style={{ color: '#16A34A' }} />
            <span className="font-bold text-sm" style={{ color: '#16A34A' }}>💡 YOUR ROADMAP TO 6-7 FIGURES</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ 
            color: '#1E1E1E',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '-0.02em'
          }}>
            The $100K-$1M Profit Blueprint
          </h1>
          
          <p className="text-lg" style={{ 
            color: '#6B7280',
            maxWidth: '800px', 
            margin: '0 auto'
          }}>
            The exact metrics that turn potential into unstoppable scale.
          </p>
        </div>

        {/* Metrics Table with Goal Selector */}
        <div className="p-8 md:p-10 rounded-2xl mb-12" style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center" style={{ 
            color: '#1E1E1E',
            fontFamily: 'Poppins, sans-serif'
          }}>
            Your Ideal Metrics Table
          </h2>
          <p className="text-center mb-8" style={{ color: '#6B7280' }}>
            Know your targets. Hit them. Scale relentlessly.
          </p>

          {/* Goal Selector Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            {['100k', '300k', '1m'].map((goal) => (
              <button
                key={goal}
                onClick={() => setSelectedGoal(goal)}
                className="px-8 py-4 rounded-xl font-bold text-lg transition-all"
                style={{
                  background: selectedGoal === goal 
                    ? (goal === '100k' ? 'linear-gradient(135deg, #007DFF, #0051CC)' : goal === '300k' ? 'linear-gradient(135deg, #06B6D4, #0891B2)' : 'linear-gradient(135deg, #007DFF, #10B981)')
                    : '#F9FAFB',
                  border: '1px solid ' + (selectedGoal === goal ? 'transparent' : '#E5E7EB'),
                  color: selectedGoal === goal ? '#FFFFFF' : '#6B7280',
                  boxShadow: selectedGoal === goal 
                    ? '0 4px 12px rgba(0, 125, 255, 0.3)' 
                    : 'none',
                  transform: selectedGoal === goal ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                {goal === '100k' && '$100K'}
                {goal === '300k' && '$300K'}
                {goal === '1m' && '$1M'}
              </button>
            ))}
          </div>

          {/* Compact Table - Max 6 Rows */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E7EB' }}>
                  <th className="text-left p-4 font-bold" style={{ color: '#6B7280' }}>Metric</th>
                  <th className="text-left p-4 font-bold" style={{ color: '#6B7280' }}>Minimum Target to Hit Goal</th>
                </tr>
              </thead>
              <tbody>
                {currentData.metrics.map((metric, idx) => (
                  <tr 
                    key={idx} 
                    style={{ 
                      borderBottom: '1px solid #F3F4F6',
                      background: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB'
                    }}
                  >
                    <td className="p-4" style={{ color: '#1E1E1E', fontWeight: 600 }}>
                      {metric.name}
                    </td>
                    <td className="p-4" style={{ color: '#6B7280' }}>
                      {metric.min} <span style={{ color: '#10B981', fontWeight: 600 }}>(aim for {metric.aim})</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Stats - Moved Higher */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl" style={{ background: '#EFF6FF', border: '1px solid #DBEAFE' }}>
              <h3 className="text-xs font-bold mb-2" style={{ color: '#007DFF' }}>YOUR DAILY BUDGET FOR {currentData.title.toUpperCase()} PROFIT</h3>
              <p className="text-xs mb-2" style={{ color: '#6B7280' }}>Based on realistic benchmarks</p>
              <p className="text-4xl font-bold" style={{ color: '#1E1E1E' }}>${currentData.dailyBudget}</p>
              <p className="mt-2 text-sm" style={{ color: '#6B7280' }}>
                ~{currentData.customersPerDay} customers/day • {currentData.customersPerMonth} customers/month
              </p>
            </div>

            <div className="p-6 rounded-xl" style={{ background: '#DCFCE7', border: '1px solid #BBF7D0' }}>
              <h3 className="text-xs font-bold mb-2" style={{ color: '#16A34A' }}>IF YOU HIT ALL TARGETS</h3>
              <p className="text-xs mb-2" style={{ color: '#6B7280' }}>Your potential monthly profit with the same budget</p>
              <p className="text-4xl font-bold" style={{ color: '#1E1E1E' }}>{currentData.maxProfit}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
