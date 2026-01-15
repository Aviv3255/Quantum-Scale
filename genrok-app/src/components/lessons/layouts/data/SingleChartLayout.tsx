'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SingleChartLayoutProps {
  title: string;
  subtitle?: string;
  chart: ReactNode;
  insight?: string;
  accentColor?: string;
}

export function SingleChartLayout({
  title,
  subtitle,
  chart,
  insight,
  accentColor = '#88da1c',
}: SingleChartLayoutProps) {
  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-10 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2
            className="text-2xl font-bold text-white mb-2"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-white/50 text-sm">{subtitle}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          {chart}
        </motion.div>

        {insight && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 justify-center"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className="text-white/60 text-sm">{insight}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default SingleChartLayout;
