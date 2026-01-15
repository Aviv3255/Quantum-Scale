'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatItem {
  value: string;
  label: string;
  change?: {
    value: string;
    direction: 'up' | 'down';
  };
  highlight?: boolean;
}

interface StatsGridLayoutProps {
  title?: string;
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  accentColor?: string;
}

export function StatsGridLayout({
  title,
  stats,
  columns = 4,
  accentColor = '#88da1c',
}: StatsGridLayoutProps) {
  const gridClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns];

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

        <div className={`grid grid-cols-1 ${gridClass} gap-4`}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`rounded-2xl p-6 text-center ${
                stat.highlight ? 'bg-white/10' : 'bg-white/5'
              }`}
            >
              <div
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: stat.highlight ? accentColor : 'white' }}
              >
                {stat.value}
              </div>

              <div className="text-sm text-white/50 mb-2">{stat.label}</div>

              {stat.change && (
                <div
                  className="inline-flex items-center gap-1 text-xs font-medium"
                  style={{
                    color:
                      stat.change.direction === 'up' ? '#22C55E' : '#EF4444',
                  }}
                >
                  {stat.change.direction === 'up' ? (
                    <TrendingUp size={12} />
                  ) : (
                    <TrendingDown size={12} />
                  )}
                  {stat.change.value}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatsGridLayout;
