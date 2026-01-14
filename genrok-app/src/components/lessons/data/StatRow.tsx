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
  variant?: 'dark' | 'light';
}

/**
 * StatRow - Multiple stats in a horizontal row
 * Dark: White slide background with dark rounded block
 * Light: White background, no dark container
 */
export function StatRow({
  stats,
  layout = 'equal',
  variant = 'dark',
}: StatRowProps) {
  const isDark = variant === 'dark';

  // Color variables based on variant
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const mutedColor = isDark ? 'text-white/60' : 'text-black/50';
  const borderColor = isDark ? 'border-white/10' : 'border-black/10';

  const content = (
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
            index !== stats.length - 1 ? `border-r ${borderColor}` : ''
          }`}
        >
          <div
            className={`text-4xl font-bold tracking-tight mb-2 ${
              layout === 'highlight-first' && index === 0 ? 'text-6xl' : ''
            }`}
            style={{
              fontFamily: "'General Sans', sans-serif",
              color: stat.accent ? '#88da1c' : textColor,
            }}
          >
            {stat.value}
          </div>
          <p className={`text-sm ${mutedColor}`}>{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );

  if (isDark) {
    return (
      <div className="bg-white p-8">
        <div className="bg-black rounded-2xl p-8">
          {content}
        </div>
      </div>
    );
  }

  // Light variant
  return (
    <div className="bg-white p-8">
      <div className="p-8">
        {content}
      </div>
    </div>
  );
}

export default StatRow;
