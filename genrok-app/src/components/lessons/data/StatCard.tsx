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
  size?: 'normal' | 'large';
  accentValue?: boolean;
  variant?: 'dark' | 'light';
}

/**
 * StatCard - Large stat with label and optional trend
 * Dark: White slide background with dark rounded block
 * Light: White background, no dark container
 */
export function StatCard({
  value,
  label,
  trend,
  size = 'normal',
  accentValue = false,
  variant = 'dark',
}: StatCardProps) {
  const isDark = variant === 'dark';
  const valueSize = size === 'large' ? 'text-7xl' : 'text-5xl';
  const labelSize = size === 'large' ? 'text-lg' : 'text-base';

  // Color variables based on variant
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/60' : 'text-black/50';

  const content = (
    <>
      {/* Value */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className={`${valueSize} font-bold tracking-tight mb-3`}
        style={{
          fontFamily: "'General Sans', sans-serif",
          color: accentValue ? '#88da1c' : (isDark ? '#FFFFFF' : '#000000'),
        }}
      >
        {value}
      </motion.div>

      {/* Label */}
      <p className={`${labelSize} ${mutedColor}`}>{label}</p>

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
    </>
  );

  if (isDark) {
    return (
      <div className="bg-white p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)' }}
          transition={{ duration: 0.3 }}
          className="bg-black rounded-2xl p-8 text-center transition-all"
        >
          {content}
        </motion.div>
      </div>
    );
  }

  // Light variant
  return (
    <div className="bg-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-8 text-center"
      >
        {content}
      </motion.div>
    </div>
  );
}

export default StatCard;
