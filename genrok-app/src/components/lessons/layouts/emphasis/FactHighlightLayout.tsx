'use client';

import { motion } from 'framer-motion';
import { AlertCircle, TrendingUp, Sparkles } from 'lucide-react';

interface FactHighlightLayoutProps {
  stat: string;
  label: string;
  description?: string;
  source?: string;
  type?: 'fact' | 'stat' | 'insight';
  accentColor?: string;
}

export function FactHighlightLayout({
  stat,
  label,
  description,
  source,
  type = 'stat',
  accentColor = '#88da1c',
}: FactHighlightLayoutProps) {
  const icons = {
    fact: AlertCircle,
    stat: TrendingUp,
    insight: Sparkles,
  };
  const Icon = icons[type];

  const typeLabels = {
    fact: 'Did You Know?',
    stat: 'Key Statistic',
    insight: 'Insight',
  };

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-16 w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{ backgroundColor: `${accentColor}20` }}
          >
            <Icon size={14} style={{ color: accentColor }} />
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: accentColor }}
            >
              {typeLabels[type]}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <span
              className="text-6xl md:text-8xl font-bold tracking-tight"
              style={{ color: accentColor }}
            >
              {stat}
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xl font-semibold text-white mb-4"
          >
            {label}
          </motion.h3>

          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/50 max-w-md mx-auto leading-relaxed mb-6"
            >
              {description}
            </motion.p>
          )}

          {source && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-xs text-white/30"
            >
              Source: {source}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default FactHighlightLayout;
