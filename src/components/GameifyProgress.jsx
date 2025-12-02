import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Star, Trophy, Flame, Target } from 'lucide-react';

export default function GameifyProgress({ completionPercentage, completedItems, totalItems, onLevelUp }) {
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [streak, setStreak] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    // Calculate level based on completion
    const newLevel = Math.floor(completionPercentage / 10) + 1;
    if (newLevel > currentLevel) {
      setCurrentLevel(newLevel);
      setShowLevelUp(true);
      setShowConfetti(true);
      if (onLevelUp) onLevelUp(newLevel);
      
      setTimeout(() => {
        setShowLevelUp(false);
      }, 3000);
      
      setTimeout(() => {
        setShowConfetti(false);
      }, 4000);
    }
    
    // XP calculation
    setXp(completedItems * 100);
  }, [completionPercentage, completedItems, currentLevel, onLevelUp]);

  const getLevelTitle = (level) => {
    const titles = {
      1: 'Beginner Merchant',
      2: 'Aspiring Seller',
      3: 'Store Builder',
      4: 'Growth Hacker',
      5: 'Revenue Generator',
      6: 'Scale Master',
      7: 'Profit Engineer',
      8: 'Six-Figure Seller',
      9: 'Empire Builder',
      10: 'Quantum Legend'
    };
    return titles[level] || 'Ultimate Master';
  };

  const getNextMilestone = () => {
    const milestones = [
      { at: 20, title: 'Foundation Complete', reward: '+500 XP' },
      { at: 40, title: 'System Activated', reward: '+1000 XP' },
      { at: 60, title: 'Scale Ready', reward: '+2000 XP' },
      { at: 80, title: 'Profit Machine', reward: '+5000 XP' },
      { at: 100, title: 'Full Mastery', reward: '+10000 XP' }
    ];
    
    return milestones.find(m => m.at > completionPercentage) || milestones[milestones.length - 1];
  };

  const nextMilestone = getNextMilestone();

  return (
    <>
      {/* Level Up Animation */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -100 }}
            className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
          >
            <div 
              className="p-12 rounded-3xl text-center"
              style={{
                background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
                border: '2px solid #10B981',
                boxShadow: '0 0 80px rgba(16, 185, 129, 0.6), 0 0 40px rgba(16, 185, 129, 0.4)',
                animation: 'pulse 1.5s ease-in-out infinite'
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  boxShadow: '0 8px 32px rgba(16, 185, 129, 0.5)'
                }}
              >
                <Trophy className="w-12 h-12" style={{ color: '#FFFFFF' }} />
              </motion.div>
              
              <h2 className="text-5xl font-bold mb-3" style={{ 
                color: '#10B981',
                fontFamily: 'Poppins, sans-serif',
                textShadow: '0 0 20px rgba(16, 185, 129, 0.8)'
              }}>
                LEVEL {currentLevel}
              </h2>
              
              <p className="text-2xl font-semibold mb-2" style={{ color: '#FFFFFF' }}>
                {getLevelTitle(currentLevel)}
              </p>
              
              <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                🎉 You're crushing it! Keep going!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 z-[199] pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  rotate: 0,
                  opacity: 1
                }}
                animate={{ 
                  y: window.innerHeight + 20,
                  rotate: Math.random() * 360,
                  opacity: 0
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2,
                  ease: "linear"
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: ['#10B981', '#3B82F6', '#F59E0B', '#EC4899', '#8B5CF6'][i % 5],
                  left: 0,
                  top: 0
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Compact Game Stats Bar */}
      <div 
        className="mb-6 p-4 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #0F0F0F 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Level */}
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
              }}
            >
              <Star className="w-6 h-6" style={{ color: '#FFFFFF' }} />
            </div>
            <div>
              <div className="text-xs font-semibold" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Level
              </div>
              <div className="text-2xl font-bold" style={{ color: '#3B82F6' }}>
                {currentLevel}
              </div>
            </div>
          </div>

          {/* XP */}
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)'
              }}
            >
              <Zap className="w-6 h-6" style={{ color: '#FFFFFF' }} />
            </div>
            <div>
              <div className="text-xs font-semibold" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                XP
              </div>
              <div className="text-2xl font-bold" style={{ color: '#8B5CF6' }}>
                {xp.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Completion */}
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
              }}
            >
              <Target className="w-6 h-6" style={{ color: '#FFFFFF' }} />
            </div>
            <div>
              <div className="text-xs font-semibold" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Progress
              </div>
              <div className="text-2xl font-bold" style={{ color: '#10B981' }}>
                {completionPercentage}%
              </div>
            </div>
          </div>

          {/* Next Milestone */}
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)'
              }}
            >
              <Trophy className="w-6 h-6" style={{ color: '#FFFFFF' }} />
            </div>
            <div>
              <div className="text-xs font-semibold" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Next Goal
              </div>
              <div className="text-lg font-bold" style={{ color: '#F59E0B' }}>
                {nextMilestone.at}%
              </div>
            </div>
          </div>
        </div>

        {/* Progress to Next Milestone */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {nextMilestone.title}
            </span>
            <span className="text-xs font-bold" style={{ color: '#F59E0B' }}>
              {nextMilestone.reward}
            </span>
          </div>
          <div 
            className="h-2.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completionPercentage / nextMilestone.at) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)',
                boxShadow: '0 0 10px rgba(245, 158, 11, 0.6)'
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </>
  );
}