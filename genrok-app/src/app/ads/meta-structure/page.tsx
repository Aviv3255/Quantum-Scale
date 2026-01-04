'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, Target, Image as ImageIcon, Sparkles, TrendingUp, Crown, Star, Globe, Crosshair } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

const DATADREW_LINK = 'https://apps.shopify.com/customer-lifetime-value?mref=lsbqcbva';

type Phase = 'testing' | 'scaling';

export default function MetaStructurePage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const [activePhase, setActivePhase] = useState<Phase>('testing');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div
        className="relative overflow-hidden"
        style={{
          margin: '-40px -48px',
          padding: '48px 48px 64px',
          minHeight: 'calc(100vh - 64px)',
          background: '#FFFFFF'
        }}
      >
        {/* Minimal Header */}
        <div className="relative max-w-6xl mx-auto mb-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-3 tracking-tight"
          >
            The Testing & Scaling Structure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-base text-[var(--text-muted)] max-w-lg mx-auto"
          >
            Test with volume, scale with precision. The proven framework for Meta Ads success.
          </motion.p>
        </div>

        {/* Premium Glass Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative flex justify-center mb-12"
        >
          <div
            className="relative inline-flex p-2 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(245,245,245,0.95) 100%)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(0,0,0,0.05)',
              border: '1px solid rgba(255, 255, 255, 0.8)'
            }}
          >
            {/* Animated background pill - smooth fluid transition */}
            <motion.div
              className="absolute top-2 bottom-2 rounded-full"
              initial={false}
              animate={{
                left: activePhase === 'testing' ? '8px' : 'calc(50% + 2px)',
                width: 'calc(50% - 10px)',
                scaleX: 1
              }}
              transition={{
                left: { type: 'spring', stiffness: 180, damping: 22, mass: 1.2 },
                width: { type: 'spring', stiffness: 180, damping: 22, mass: 1.2 },
                scaleX: { type: 'spring', stiffness: 300, damping: 25 }
              }}
              style={{
                background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0,0,0,0.2)'
              }}
            />
            <button
              onClick={() => setActivePhase('testing')}
              className="relative z-10 px-12 py-4 rounded-full text-sm font-semibold transition-colors duration-300"
              style={{ color: activePhase === 'testing' ? '#FFFFFF' : 'var(--text-secondary)' }}
            >
              Testing
            </button>
            <button
              onClick={() => setActivePhase('scaling')}
              className="relative z-10 px-12 py-4 rounded-full text-sm font-semibold transition-colors duration-300"
              style={{ color: activePhase === 'scaling' ? '#FFFFFF' : 'var(--text-secondary)' }}
            >
              Scaling
            </button>
          </div>
        </motion.div>

        {/* Canvas Area */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activePhase === 'testing' ? (
              <TestingStructure key="testing" />
            ) : (
              <ScalingStructure key="scaling" />
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-5xl mx-auto mt-16 text-center"
        >
          <p className="text-sm text-[var(--text-muted)]">
            Based on Meta's Andromeda algorithm recommendations for 2026
          </p>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

// Card dimensions for consistency
// Ad Set cards: all same size (10% bigger), accommodates button
const ADSET_CARD_WIDTH = 176;
const ADSET_CARD_HEIGHT = 182;
// Creative/Ad cards: same width as ad set, 4:3 wide format
const CREATIVE_CARD_WIDTH = 176;
const CREATIVE_CARD_HEIGHT = 132;

// Testing Structure Component
function TestingStructure() {
  const adSets = [1, 2, 3, 4, 5, 6];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Campaign Level */}
      <div className="flex justify-center mb-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="relative px-8 py-5 rounded-2xl text-center"
          style={{
            background: 'linear-gradient(145deg, #0a0a0a 0%, #1f1f1f 50%, #0a0a0a 100%)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          <div className="absolute -inset-1 rounded-2xl opacity-20 blur-xl" style={{ background: 'linear-gradient(135deg, #333 0%, #000 100%)' }} />
          <div className="relative flex items-center justify-center gap-2.5 mb-1">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
              <Layers className="text-white" size={16} />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">ABO Campaign</span>
          </div>
          <p className="text-white/50 text-xs font-medium">Testing Phase</p>
        </motion.div>
      </div>

      {/* Connector from Campaign to Ad Sets */}
      <div className="flex justify-center">
        <svg width="1000" height="50" className="overflow-visible">
          <defs>
            <linearGradient id="testLine" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.12)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.04)" />
            </linearGradient>
          </defs>
          {/* Main trunk */}
          <line x1="500" y1="0" x2="500" y2="20" stroke="url(#testLine)" strokeWidth="2" strokeLinecap="round" />
          {/* Horizontal line */}
          <line x1="96" y1="20" x2="904" y2="20" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Vertical drops to each ad set */}
          {adSets.map((_, idx) => {
            const x = 96 + idx * 162;
            return (
              <line key={idx} x1={x} y1="20" x2={x} y2="50" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" strokeLinecap="round" />
            );
          })}
        </svg>
      </div>

      {/* Ad Sets Level */}
      <div className="flex justify-center gap-4">
        {adSets.map((num, idx) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2 + idx * 0.05, duration: 0.3 }}
            className="flex flex-col items-center"
            style={{ width: ADSET_CARD_WIDTH }}
          >
            {/* Ad Set Card - Clean Premium (5:4 ratio) */}
            <div
              className="w-full rounded-xl text-center"
              style={{
                height: ADSET_CARD_HEIGHT,
                background: '#FFFFFF',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.08)'
              }}
            >
              <div className="p-3 h-full flex flex-col justify-center">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2"
                  style={{ background: 'rgba(0,0,0,0.04)' }}
                >
                  <Target size={16} className="text-[var(--text-primary)]" />
                </div>
                <h4 className="font-semibold text-xs text-[var(--text-primary)] mb-0.5">Ad Set {num}</h4>
                <p className="text-[10px] text-[var(--text-muted)] leading-tight">Interest Based</p>
              </div>
            </div>

            {/* Connector to Creative */}
            <div className="w-px h-4 bg-gradient-to-b from-black/12 to-transparent" />

            {/* Creative Card - Clean Premium (5:4 wide ratio) */}
            <div
              className="rounded-xl flex flex-col items-center justify-center"
              style={{
                width: CREATIVE_CARD_WIDTH,
                height: CREATIVE_CARD_HEIGHT,
                background: '#FFFFFF',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.08)'
              }}
            >
              <ImageIcon size={20} className="text-[var(--text-muted)] mb-1" />
              <span className="text-[10px] font-semibold text-[var(--text-primary)]">Ad {num}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pro Tip Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-10 p-5 rounded-2xl max-w-3xl mx-auto"
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.04) 0%, rgba(139, 92, 246, 0.04) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.1)'
        }}
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h4 className="font-bold text-[var(--text-primary)] mb-2">Testing Strategy</h4>
            <ul className="text-sm text-[var(--text-secondary)] space-y-1.5 leading-relaxed">
              <li><span className="font-semibold text-[var(--text-primary)]">Budget:</span> Start with $20-$50/day per ad set</li>
              <li><span className="font-semibold text-[var(--text-primary)]">Diversify:</span> UGC, Infographics, Visuals, Social Proof</li>
              <li><span className="font-semibold text-[var(--text-primary)]">Winner:</span> CAC lower than average with 10+ purchases</li>
              <li><span className="font-semibold text-[var(--text-primary)]">Kill rule:</span> Turn off if spent 1.5× CAC without purchase</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Scaling Structure Component
function ScalingStructure() {
  const adSets = [
    {
      name: 'RFM 10% LLA',
      subtitle: 'Champion, Loyal, Promising',
      icon: Crown,
      hasDataDrew: true
    },
    {
      name: 'Top 10% Spenders',
      subtitle: 'Lookalike',
      icon: TrendingUp,
      hasDataDrew: true
    },
    {
      name: 'Top 25% Spenders',
      subtitle: 'Lookalike',
      icon: TrendingUp,
      hasDataDrew: true
    },
    {
      name: 'Top 5% Purchases',
      subtitle: 'Lookalike',
      icon: Star,
      hasDataDrew: true
    },
    {
      name: 'Open Targeting',
      subtitle: 'Broad',
      icon: Globe,
      hasDataDrew: false
    },
    {
      name: 'Interests Based',
      subtitle: 'Targeted',
      icon: Crosshair,
      hasDataDrew: false
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Campaign Level */}
      <div className="flex justify-center mb-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="relative px-8 py-5 rounded-2xl text-center"
          style={{
            background: 'linear-gradient(145deg, #0a0a0a 0%, #1f1f1f 50%, #0a0a0a 100%)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          <div className="absolute -inset-1 rounded-2xl opacity-20 blur-xl" style={{ background: 'linear-gradient(135deg, #333 0%, #000 100%)' }} />
          <div className="relative flex items-center justify-center gap-2.5 mb-1">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
              <Layers className="text-white" size={16} />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">CBO Campaign</span>
          </div>
          <p className="text-white/50 text-xs font-medium">Scaling Winners</p>
        </motion.div>
      </div>

      {/* Connector from Campaign to Ad Sets */}
      <div className="flex justify-center">
        <svg width="1100" height="50" className="overflow-visible">
          <defs>
            <linearGradient id="scaleLine" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.12)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.04)" />
            </linearGradient>
          </defs>
          {/* Main trunk */}
          <line x1="550" y1="0" x2="550" y2="20" stroke="url(#scaleLine)" strokeWidth="2" strokeLinecap="round" />
          {/* Horizontal line */}
          <line x1="96" y1="20" x2="1004" y2="20" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Vertical drops to each ad set */}
          {adSets.map((_, idx) => {
            const x = 96 + idx * 182;
            return (
              <line key={idx} x1={x} y1="20" x2={x} y2="50" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" strokeLinecap="round" />
            );
          })}
        </svg>
      </div>

      {/* Ad Sets Level */}
      <div className="flex justify-center gap-4">
        {adSets.map((adSet, idx) => {
          const Icon = adSet.icon;
          return (
            <motion.div
              key={adSet.name}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.05, duration: 0.3 }}
              className="flex flex-col items-center"
              style={{ width: ADSET_CARD_WIDTH }}
            >
              {/* Ad Set Card - Clean Premium with Button Inside */}
              <div
                className="w-full rounded-xl text-center flex flex-col"
                style={{
                  height: ADSET_CARD_HEIGHT,
                  background: '#FFFFFF',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
                  border: '1px solid rgba(0,0,0,0.08)'
                }}
              >
                <div className="p-3 flex-1 flex flex-col justify-center">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-1.5"
                    style={{ background: 'rgba(0,0,0,0.04)' }}
                  >
                    <Icon size={14} className="text-[var(--text-primary)]" />
                  </div>
                  <h4 className="font-semibold text-[10px] text-[var(--text-primary)] mb-0.5 leading-tight">{adSet.name}</h4>
                  <p className="text-[9px] text-[var(--text-muted)] leading-tight">{adSet.subtitle}</p>
                </div>
                {/* Create Audience Button - Inside Card */}
                {adSet.hasDataDrew && (
                  <div className="px-2 pb-2.5">
                    <a
                      href={DATADREW_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[10px] font-semibold transition-all hover:bg-gray-800"
                      style={{
                        background: '#000000',
                        color: '#FFFFFF'
                      }}
                    >
                      <span>Create Audience</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                )}
              </div>

              {/* Connector to Creative */}
              <div className="w-px h-3 bg-gradient-to-b from-black/10 to-transparent" />

              {/* Creative Card - Clean Premium (5:4 wide ratio) */}
              <div
                className="rounded-xl flex flex-col items-center justify-center"
                style={{
                  width: CREATIVE_CARD_WIDTH,
                  height: CREATIVE_CARD_HEIGHT,
                  background: '#FFFFFF',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
                  border: '1px solid rgba(0,0,0,0.08)'
                }}
              >
                <div className="flex -space-x-0.5 mb-1">
                  <ImageIcon size={16} className="text-[var(--text-muted)]" />
                  <ImageIcon size={16} className="text-[var(--text-muted)]" />
                  <ImageIcon size={16} className="text-[var(--text-muted)]" />
                </div>
                <span className="text-[10px] font-semibold text-[var(--text-primary)] text-center leading-tight">All Winners</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-10 p-5 rounded-2xl max-w-3xl mx-auto"
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.04) 0%, rgba(59, 130, 246, 0.04) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.1)'
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
            }}
          >
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h4 className="font-bold text-[var(--text-primary)] mb-2">
              Why LTV-based audiences win
            </h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Your top 10% spenders generate 50-70% of revenue. Creating lookalike audiences
              from these customers tells Meta to find more people just like them.
              <span className="font-semibold text-[var(--text-primary)]"> Result: $8-12 CAC instead of $25-40.</span>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
