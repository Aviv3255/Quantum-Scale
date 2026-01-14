'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface DualChartLayoutProps {
  title?: string;
  leftChart: {
    title: string;
    component: ReactNode;
  };
  rightChart: {
    title: string;
    component: ReactNode;
  };
}

export function DualChartLayout({
  title,
  leftChart,
  rightChart,
}: DualChartLayoutProps) {
  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-10 w-full">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white mb-8 text-center"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {title}
          </motion.h2>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              {leftChart.title}
            </h3>
            {leftChart.component}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              {rightChart.title}
            </h3>
            {rightChart.component}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default DualChartLayout;
