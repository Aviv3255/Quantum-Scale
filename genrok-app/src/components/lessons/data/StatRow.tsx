'use client';

import { motion } from 'framer-motion';

interface StatItem {
  value: string | number;
  label: string;
  accent?: boolean;
}

interface StatRowProps {
  stats: StatItem[];
  darkMode?: boolean;
  layout?: 'equal' | 'highlight-first';
}

/**
 * StatRow - Multiple stats in a horizontal row
 * Premium design with clean separators
 */
export function StatRow({
  stats,
  darkMode = false,
  layout = 'equal',
}: StatRowProps) {
  const bgClass = darkMode ? 'bg-black' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-black';
  const mutedClass = darkMode ? 'text-white/60' : 'text-[#666666]';
  const borderClass = darkMode ? 'border-white/10' : 'border-[#E5E5E5]';

  return (
    <div className={`${bgClass} p-8`}>
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
              index !== stats.length - 1 ? `border-r ${borderClass}` : ''
            }`}
          >
            <div
              className={`text-4xl font-bold tracking-tight mb-2 ${
                layout === 'highlight-first' && index === 0 ? 'text-6xl' : ''
              }`}
              style={{
                fontFamily: "'General Sans', sans-serif",
                color: stat.accent ? '#88da1c' : (darkMode ? '#FFFFFF' : '#000000'),
              }}
            >
              {stat.value}
            </div>
            <p className={`text-sm ${mutedClass}`}>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default StatRow;
