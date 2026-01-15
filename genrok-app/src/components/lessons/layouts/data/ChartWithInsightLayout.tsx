'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ChartWithInsightLayoutProps {
  title: string;
  chart: ReactNode;
  insight: {
    headline: string;
    description: string;
    trend?: 'up' | 'down' | 'neutral';
    value?: string;
  };
  reversed?: boolean;
  accentColor?: string;
}

export function ChartWithInsightLayout({
  title,
  chart,
  insight,
  reversed = false,
  accentColor = '#88da1c',
}: ChartWithInsightLayoutProps) {
  const TrendIcon = insight.trend === 'up'
    ? TrendingUp
    : insight.trend === 'down'
    ? TrendingDown
    : Minus;

  const trendColor = insight.trend === 'up'
    ? '#22C55E'
    : insight.trend === 'down'
    ? '#EF4444'
    : '#888';

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-10 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-white mb-8 text-center"
          style={{ fontFamily: "'General Sans', sans-serif" }}
        >
          {title}
        </motion.h2>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          style={{ direction: reversed ? 'rtl' : 'ltr' }}
        >
          <motion.div
            initial={{ opacity: 0, x: reversed ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            style={{ direction: 'ltr' }}
          >
            {chart}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reversed ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{ direction: 'ltr' }}
            className="bg-white/5 rounded-2xl p-8"
          >
            {insight.value && (
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-4xl font-bold"
                  style={{ color: accentColor }}
                >
                  {insight.value}
                </span>
                {insight.trend && (
                  <TrendIcon size={24} style={{ color: trendColor }} />
                )}
              </div>
            )}

            <h3 className="text-lg font-semibold text-white mb-2">
              {insight.headline}
            </h3>

            <p className="text-white/50 text-sm leading-relaxed">
              {insight.description}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ChartWithInsightLayout;
