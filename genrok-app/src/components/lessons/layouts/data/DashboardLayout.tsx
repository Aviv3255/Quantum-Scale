'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ReactNode } from 'react';

interface MetricItem {
  value: string;
  label: string;
  change?: {
    value: string;
    direction: 'up' | 'down';
  };
  highlight?: boolean;
}

interface DashboardLayoutProps {
  title: string;
  metrics: MetricItem[];
  chart?: ReactNode;
  accentColor?: string;
}

export function DashboardLayout({
  title,
  metrics,
  chart,
  accentColor = '#88da1c',
}: DashboardLayoutProps) {
  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-8 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-white mb-6"
          style={{ fontFamily: "'General Sans', sans-serif" }}
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`rounded-xl p-4 ${
                metric.highlight ? 'bg-white/10' : 'bg-white/5'
              }`}
            >
              <div className="text-xs text-white/40 uppercase tracking-wider mb-1">
                {metric.label}
              </div>

              <div className="flex items-end gap-2">
                <span
                  className="text-2xl font-bold"
                  style={{ color: metric.highlight ? accentColor : 'white' }}
                >
                  {metric.value}
                </span>

                {metric.change && (
                  <span
                    className="flex items-center gap-0.5 text-xs font-medium pb-1"
                    style={{
                      color:
                        metric.change.direction === 'up'
                          ? '#22C55E'
                          : '#EF4444',
                    }}
                  >
                    {metric.change.direction === 'up' ? (
                      <TrendingUp size={10} />
                    ) : (
                      <TrendingDown size={10} />
                    )}
                    {metric.change.value}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {chart && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 rounded-xl p-4"
          >
            {chart}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default DashboardLayout;
