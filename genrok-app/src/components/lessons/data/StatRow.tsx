'use client';

import { motion } from 'framer-motion';

interface StatItem {
  value: string | number;
  label: string;
  accent?: boolean;
}

interface StatRowProps {
  stats: StatItem[];
  layout?: 'equal' | 'highlight-first';
}

/**
 * StatRow - Multiple stats in a horizontal row
 * White slide background with dark rounded block
 */
export function StatRow({
  stats,
  layout = 'equal',
}: StatRowProps) {
  return (
    <div className="bg-white p-8">
      <div className="bg-black rounded-2xl p-8">
        <div
          className={`grid gap-0 ${
            layout === 'highlight-first'
              ? 'grid-cols-1 md:grid-cols-4'
              : `grid-cols-${stats.length}`
          }`}
          style={{
            gridTemplateColumns: layout === 'equal'
              ? `repeat(${stats.length}, 1fr)`
              : '2fr 1fr 1fr 1fr',
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`text-center py-6 px-4 ${
                index !== stats.length - 1 ? 'border-r border-white/10' : ''
              }`}
            >
              <div
                className={`text-4xl font-bold tracking-tight mb-2 ${
                  layout === 'highlight-first' && index === 0 ? 'text-6xl' : ''
                }`}
                style={{
                  fontFamily: "'General Sans', sans-serif",
                  color: stat.accent ? '#88da1c' : '#FFFFFF',
                }}
              >
                {stat.value}
              </div>
              <p className="text-sm text-white/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatRow;
