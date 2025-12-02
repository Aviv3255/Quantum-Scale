import React, { useState } from 'react';
import { X, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

export default function RevenueInputModal({ isOpen, onClose, onSave, currentData }) {
  const [dailyRevenue, setDailyRevenue] = useState(currentData?.daily_revenue || '');
  const [roas, setRoas] = useState(currentData?.roas || '');
  const [isSaving, setIsSaving] = useState(false);
  const [warning, setWarning] = useState('');

  const handleSave = async () => {
    const dailyRevenueNum = parseFloat(dailyRevenue);
    const roasNum = parseFloat(roas);
    
    if ((dailyRevenue && (isNaN(dailyRevenueNum) || dailyRevenueNum < 0)) ||
        (roas && (isNaN(roasNum) || roasNum < 0))) {
      alert('Please enter valid numbers');
      return;
    }

    if (!dailyRevenue && !roas) {
      alert('Please enter at least one metric');
      return;
    }

    // Validation: Prevent unrealistic data
    if (dailyRevenueNum > 50000) {
      setWarning('Daily revenue above $50,000 requires verification. Your data will be reviewed before appearing on the leaderboard.');
    }

    if (roasNum > 10) {
      setWarning('ROAS above 10x requires verification. Your data will be reviewed before appearing on the leaderboard.');
    }

    // Cap maximum values to prevent manipulation
    const cappedRevenue = dailyRevenueNum > 100000 ? 100000 : dailyRevenueNum;
    const cappedRoas = roasNum > 15 ? 15 : roasNum;

    setIsSaving(true);
    await onSave({
      daily_revenue: cappedRevenue || null,
      roas: cappedRoas || null
    });
    setIsSaving(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0, 0, 0, 0.8)' }}
        onClick={onClose}
      >
        <div 
          className="w-full max-w-md rounded-3xl p-8 relative"
          style={{
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <X className="w-5 h-5" style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
          </button>

          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
            style={{
              background: 'linear-gradient(135deg, #007DFF 0%, #00A8FF 100%)',
              boxShadow: '0 8px 24px rgba(0, 125, 255, 0.4)'
            }}
          >
            <TrendingUp className="w-8 h-8" style={{ color: '#FFFFFF' }} />
          </div>

          <h2 
            className="text-2xl font-bold text-center mb-2"
            style={{ 
              color: '#FFFFFF',
              fontFamily: 'Poppins, sans-serif',
              letterSpacing: '-0.02em'
            }}
          >
            Update Your Metrics
          </h2>
          
          <p className="text-center mb-8 text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Track your last 7 days performance and see how you stack up
          </p>

          {warning && (
            <div className="mb-6 p-4 rounded-xl flex items-start gap-3" style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#F59E0B' }} />
              <p className="text-xs leading-relaxed" style={{ color: '#FCD34D' }}>
                {warning}
              </p>
            </div>
          )}

          <div className="space-y-5 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Average Daily Revenue (Last 7 Days)
              </label>
              <div className="relative">
                <div 
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2"
                  style={{ color: 'rgba(255, 255, 255, 0.4)' }}
                >
                  <DollarSign className="w-5 h-5" />
                </div>
                <input
                  type="number"
                  value={dailyRevenue}
                  onChange={(e) => {
                    setDailyRevenue(e.target.value);
                    setWarning('');
                  }}
                  placeholder="0"
                  max="100000"
                  className="w-full pl-12 pr-4 py-3 rounded-xl text-base font-semibold"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#007DFF';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 125, 255, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <p className="text-xs mt-2" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                Maximum: $100,000/day
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Average ROAS (Last 7 Days)
              </label>
              <div className="relative">
                <div 
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '18px', fontWeight: 'bold' }}
                >
                  ×
                </div>
                <input
                  type="number"
                  step="0.01"
                  value={roas}
                  onChange={(e) => {
                    setRoas(e.target.value);
                    setWarning('');
                  }}
                  placeholder="0.00"
                  max="15"
                  className="w-full pl-12 pr-4 py-3 rounded-xl text-base font-semibold"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#007DFF';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 125, 255, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <p className="text-xs mt-2" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                Example: 2.5 means $2.50 revenue for every $1 spent • Maximum: 15x
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-semibold transition-all"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.7)'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 py-3 rounded-xl font-semibold transition-all"
              style={{
                background: isSaving 
                  ? 'rgba(0, 125, 255, 0.5)'
                  : 'linear-gradient(135deg, #007DFF 0%, #00A8FF 100%)',
                border: 'none',
                color: '#FFFFFF',
                boxShadow: '0 4px 16px rgba(0, 125, 255, 0.3)',
                opacity: isSaving ? 0.7 : 1,
                cursor: isSaving ? 'wait' : 'pointer'
              }}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}