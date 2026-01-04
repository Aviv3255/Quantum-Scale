'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, Target, Image as ImageIcon, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';
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
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)'
        }}
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Minimal Header */}
        <div className="relative max-w-6xl mx-auto mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.05) 100%)',
              border: '1px solid rgba(0,0,0,0.06)'
            }}
          >
            <Zap size={14} className="text-[var(--text-muted)]" />
            <span className="text-xs font-semibold tracking-widest text-[var(--text-muted)] uppercase">
              Meta Ads 2025
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4 tracking-tight"
          >
            The 1-1-X Structure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-[var(--text-muted)] max-w-md mx-auto"
          >
            One campaign. Minimal ad sets. Maximum creative volume.
          </motion.p>
        </div>

        {/* Premium Glass Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative flex justify-center mb-16"
        >
          <div
            className="relative inline-flex p-1.5 rounded-full"
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
              border: '1px solid rgba(0, 0, 0, 0.08)'
            }}
          >
            {/* Animated background pill */}
            <motion.div
              className="absolute top-1.5 bottom-1.5 rounded-full"
              initial={false}
              animate={{
                left: activePhase === 'testing' ? '6px' : 'calc(50% + 2px)',
                width: 'calc(50% - 8px)'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
            />
            <button
              onClick={() => setActivePhase('testing')}
              className={`relative z-10 px-10 py-3.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
                activePhase === 'testing'
                  ? 'text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Testing
            </button>
            <button
              onClick={() => setActivePhase('scaling')}
              className={`relative z-10 px-10 py-3.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
                activePhase === 'scaling'
                  ? 'text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Scaling
            </button>
          </div>
        </motion.div>

        {/* Canvas Area */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {activePhase === 'testing' ? (
              <TestingStructure key="testing" />
            ) : (
              <ScalingStructure key="scaling" />
            )}
          </AnimatePresence>
        </div>

        {/* Footer tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-5xl mx-auto mt-16 text-center"
        >
          <p className="text-sm text-[var(--text-muted)]">
            Based on Meta's Andromeda algorithm recommendations for 2025
          </p>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

// Testing Structure Component
function TestingStructure() {
  const creatives = [1, 2, 3, 4, 5];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Campaign Level */}
      <div className="flex justify-center mb-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="relative px-10 py-6 rounded-3xl text-center"
          style={{
            background: 'linear-gradient(145deg, #0a0a0a 0%, #1f1f1f 50%, #0a0a0a 100%)',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.2), 0 10px 30px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 rounded-3xl opacity-20 blur-xl" style={{ background: 'linear-gradient(135deg, #333 0%, #000 100%)' }} />
          <div className="relative flex items-center justify-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Layers className="text-white" size={18} />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Campaign</span>
          </div>
          <p className="text-white/50 text-sm font-medium">ASC+ or Conversions</p>
        </motion.div>
      </div>

      {/* Curved connector to Ad Set */}
      <div className="flex justify-center">
        <svg width="4" height="60" className="overflow-visible">
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.15)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
            </linearGradient>
          </defs>
          <line x1="2" y1="0" x2="2" y2="60" stroke="url(#lineGradient1)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Ad Set Level */}
      <div className="flex justify-center mb-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="relative px-10 py-6 rounded-3xl text-center"
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(0,0,0,0.06)'
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center">
              <Target className="text-[var(--text-primary)]" size={18} />
            </div>
            <span className="font-bold text-[var(--text-primary)] text-lg">1 Ad Set</span>
          </div>
          <p className="text-[var(--text-muted)] text-sm mb-3">Broad Targeting (Open)</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              color: '#3B82F6'
            }}
          >
            <Sparkles size={14} />
            Let Meta's AI find buyers
          </div>
        </motion.div>
      </div>

      {/* Curved connectors to Creatives */}
      <div className="flex justify-center">
        <svg width="500" height="60" className="overflow-visible">
          <defs>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.1)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.03)" />
            </linearGradient>
          </defs>
          {/* Main trunk */}
          <line x1="250" y1="0" x2="250" y2="25" stroke="url(#lineGradient2)" strokeWidth="2" strokeLinecap="round" />
          {/* Curved branches */}
          {creatives.map((_, idx) => {
            const xPos = 50 + idx * 80;
            return (
              <path
                key={idx}
                d={`M 250 25 Q 250 40, ${xPos} 55`}
                fill="none"
                stroke="rgba(0,0,0,0.08)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            );
          })}
          {/* Dashed line for X ads */}
          <path
            d="M 250 25 Q 250 40, 450 55"
            fill="none"
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      {/* Creatives Level */}
      <div className="flex justify-center gap-3 mt-2">
        {creatives.map((num, idx) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.35 + idx * 0.05, duration: 0.3 }}
            className="w-[72px] h-[88px] rounded-2xl flex flex-col items-center justify-center group cursor-pointer"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.02)',
              border: '1px solid rgba(0,0,0,0.04)'
            }}
          >
            <div className="w-9 h-9 rounded-xl bg-black/[0.03] flex items-center justify-center mb-2 group-hover:bg-black/[0.06] transition-colors">
              <ImageIcon size={18} className="text-[var(--text-muted)]" />
            </div>
            <span className="text-xs font-medium text-[var(--text-muted)]">Ad {num}</span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="w-[72px] h-[88px] rounded-2xl flex flex-col items-center justify-center"
          style={{
            border: '2px dashed rgba(0,0,0,0.08)',
            background: 'transparent'
          }}
        >
          <span className="text-xl font-light text-[var(--text-muted)] mb-1">+X</span>
          <span className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wide">more</span>
        </motion.div>
      </div>

      {/* Tip Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="mt-14 p-6 rounded-2xl text-center max-w-lg mx-auto"
        style={{
          background: 'rgba(0,0,0,0.02)',
          border: '1px solid rgba(0,0,0,0.04)'
        }}
      >
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          <span className="font-bold text-[var(--text-primary)]">Pro tip:</span> Start with 10-20 creatives.
          Test different hooks, angles, and formats. Kill losers fast, scale winners.
        </p>
      </motion.div>
    </motion.div>
  );
}

// Scaling Structure Component
function ScalingStructure() {
  const adSets = [
    {
      name: 'Top 10% Spenders',
      subtitle: 'LLA',
      description: 'Lookalike of highest-value customers',
      icon: TrendingUp,
      hasDataDrew: true,
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
    },
    {
      name: 'Top 25% Spenders',
      subtitle: 'LLA',
      description: 'Broader high-value lookalike',
      icon: TrendingUp,
      hasDataDrew: true,
      color: '#3B82F6',
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
    },
    {
      name: 'RFM Segments',
      subtitle: '',
      description: 'Recency, Frequency, Monetary',
      icon: Users,
      hasDataDrew: true,
      color: '#8B5CF6',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
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
      <div className="flex justify-center mb-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="relative px-10 py-6 rounded-3xl text-center"
          style={{
            background: 'linear-gradient(145deg, #0a0a0a 0%, #1f1f1f 50%, #0a0a0a 100%)',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.2), 0 10px 30px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          <div className="absolute -inset-1 rounded-3xl opacity-20 blur-xl" style={{ background: 'linear-gradient(135deg, #333 0%, #000 100%)' }} />
          <div className="relative flex items-center justify-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Layers className="text-white" size={18} />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Campaign</span>
          </div>
          <p className="text-white/50 text-sm font-medium">Scaling Winners</p>
        </motion.div>
      </div>

      {/* Curved connectors to Ad Sets */}
      <div className="flex justify-center">
        <svg width="700" height="70" className="overflow-visible">
          <defs>
            <linearGradient id="lineGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.12)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.04)" />
            </linearGradient>
          </defs>
          {/* Main trunk */}
          <line x1="350" y1="0" x2="350" y2="30" stroke="url(#lineGradient3)" strokeWidth="2" strokeLinecap="round" />
          {/* Curved branches to 3 ad sets */}
          <path d="M 350 30 Q 350 50, 117 65" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 350 30 Q 350 50, 350 65" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 350 30 Q 350 50, 583 65" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Ad Sets Level */}
      <div className="flex justify-center gap-5">
        {adSets.map((adSet, idx) => {
          const Icon = adSet.icon;
          return (
            <motion.div
              key={adSet.name}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.25 + idx * 0.1, duration: 0.4 }}
              className="relative w-[220px]"
            >
              <div
                className="relative p-6 rounded-3xl text-center overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(0,0,0,0.05)'
                }}
              >
                {/* Subtle colored top border */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{ background: adSet.gradient }}
                />

                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${adSet.color}10` }}
                >
                  <Icon size={22} style={{ color: adSet.color }} />
                </div>
                <h3 className="font-bold text-[var(--text-primary)] text-base mb-0.5">
                  {adSet.name}
                </h3>
                {adSet.subtitle && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full mb-2 inline-block" style={{ background: `${adSet.color}15`, color: adSet.color }}>
                    {adSet.subtitle}
                  </span>
                )}
                <p className="text-xs text-[var(--text-muted)] mb-4 mt-1">
                  {adSet.description}
                </p>

                {adSet.hasDataDrew && (
                  <a
                    href={DATADREW_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      background: adSet.gradient,
                      color: 'white',
                      boxShadow: `0 4px 14px ${adSet.color}40`
                    }}
                  >
                    <span>Get with DataDrew</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>

              {/* Creative indicators below */}
              <div className="flex justify-center gap-1.5 mt-4">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="w-8 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)',
                      border: '1px solid rgba(0,0,0,0.04)',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                    }}
                  >
                    <ImageIcon size={12} className="text-[var(--text-muted)]" />
                  </div>
                ))}
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
        className="mt-14 p-6 rounded-2xl max-w-2xl mx-auto"
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.04) 0%, rgba(59, 130, 246, 0.04) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.08)'
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
            }}
          >
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h4 className="font-bold text-[var(--text-primary)] mb-1.5">
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
