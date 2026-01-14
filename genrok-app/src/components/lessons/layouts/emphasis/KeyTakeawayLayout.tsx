'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Star, Zap, Target } from 'lucide-react';

interface KeyTakeawayLayoutProps {
  title?: string;
  takeaway: string;
  description?: string;
  iconType?: 'lightbulb' | 'star' | 'zap' | 'target';
  accentColor?: string;
}

export function KeyTakeawayLayout({
  title = 'Key Takeaway',
  takeaway,
  description,
  iconType = 'lightbulb',
  accentColor = '#88da1c',
}: KeyTakeawayLayoutProps) {
  const icons = {
    lightbulb: Lightbulb,
    star: Star,
    zap: Zap,
    target: Target,
  };
  const Icon = icons[iconType];

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-12 w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8"
            style={{ backgroundColor: `${accentColor}20` }}
          >
            <Icon size={40} style={{ color: accentColor }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: accentColor }}
          >
            {title}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {takeaway}
          </motion.h2>

          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/50 max-w-xl mx-auto leading-relaxed"
            >
              {description}
            </motion.p>
          )}

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3 }}
            className="w-16 h-1 rounded-full mx-auto mt-8"
            style={{ backgroundColor: accentColor }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default KeyTakeawayLayout;
