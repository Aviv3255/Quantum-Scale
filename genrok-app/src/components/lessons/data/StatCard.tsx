'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  value: string | number;
  label: string;
  trend?: {
    direction: 'up' | 'down';
    value: string;
  };
  darkMode?: boolean;
  size?: 'normal' | 'large';
  accentValue?: boolean;
}

/**
 * StatCard - Large stat with label and optional trend
 * Premium design with clean typography, supports dark/light mode
 */
export function StatCard({
  value,
  label,
  trend,
  darkMode = false,
  size = 'normal',
  accentValue = false,
}: StatCardProps) {
  const bgClass = darkMode ? 'bg-black border-white/10' : 'bg-white border-[#E5E5E5]';
  const textClass = darkMode ? 'text-white' : 'text-black';
  const mutedClass = darkMode ? 'text-white/60' : 'text-[#666666]';
  const valueSize = size === 'large' ? 'text-7xl' : 'text-5xl';
  const labelSize = size === 'large' ? 'text-lg' : 'text-base';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.3 }}
      className={`${bgClass} border rounded-2xl p-8 text-center transition-all`}
    >
      {/* Value */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className={`${valueSize} font-bold tracking-tight mb-3`}
        style={{
          fontFamily: "'General Sans', sans-serif",
          color: accentValue ? '#88da1c' : (darkMode ? '#FFFFFF' : '#000000'),
        }}
      >
        {value}
      </motion.div>

      {/* Label */}
      <p className={`${labelSize} ${mutedClass}`}>{label}</p>

      {/* Trend */}
      {trend && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`flex items-center justify-center gap-1 mt-4 text-sm font-medium ${
            trend.direction === 'up' ? 'text-[#88da1c]' : 'text-[#EF4444]'
          }`}
        >
          {trend.direction === 'up' ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}
          <span>{trend.value}</span>
        </motion.div>
      )}
    </motion.div>
  );
}

export default StatCard;
