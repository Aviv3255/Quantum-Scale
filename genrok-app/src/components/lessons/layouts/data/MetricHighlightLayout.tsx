'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricHighlightLayoutProps {
  metric: {
    value: string;
    label: string;
    description?: string;
    change?: {
      value: string;
      direction: 'up' | 'down';
    };
  };
  context?: string;
  accentColor?: string;
}

export function MetricHighlightLayout({
  metric,
  context,
  accentColor = '#88da1c',
}: MetricHighlightLayoutProps) {
  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-16 w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span
              className="text-7xl md:text-9xl font-bold tracking-tight"
              style={{ color: accentColor }}
            >
              {metric.value}
            </span>
          </motion.div>

          {metric.change && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              {metric.change.direction === 'up' ? (
                <TrendingUp size={20} className="text-[#22C55E]" />
              ) : (
                <TrendingDown size={20} className="text-[#EF4444]" />
              )}
              <span
                className="text-lg font-medium"
                style={{
                  color:
                    metric.change.direction === 'up' ? '#22C55E' : '#EF4444',
                }}
              >
                {metric.change.value}
              </span>
            </motion.div>
          )}

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-xl font-semibold text-white mb-2"
          >
            {metric.label}
          </motion.h3>

          {metric.description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/50 mb-8"
            >
              {metric.description}
            </motion.p>
          )}

          {context && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-block px-6 py-3 rounded-xl bg-white/5"
            >
              <span className="text-white/60 text-sm">{context}</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default MetricHighlightLayout;
