'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ElementType } from 'react';

interface KPICardProps {
  value: string | number;
  label: string;
  change?: number;
  changeLabel?: string;
  iconName?: string;
  trend?: 'up' | 'down' | 'neutral';
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function KPICard({
  value,
  label,
  change,
  changeLabel,
  iconName,
  trend,
  accentColor = '#88da1c',
  variant = 'dark',
}: KPICardProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const mutedColor40 = isDark ? 'text-white/40' : 'text-black/40';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = iconName
    ? ((LucideIcons as any)[iconName] as ElementType)
    : null;

  const trendColor = trend === 'up' ? '#22C55E' : trend === 'down' ? '#EF4444' : '#F59E0B';
  const effectiveTrend = trend || (change !== undefined ? (change >= 0 ? 'up' : 'down') : 'neutral');

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`${mutedColor} text-sm mb-2`}
          >
            {label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-4xl font-bold ${textColor}`}
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {value}
          </motion.h2>
        </div>
        {Icon && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}20` }}
          >
            <Icon size={24} style={{ color: accentColor }} />
          </motion.div>
        )}
      </div>

      {(change !== undefined || changeLabel) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2"
        >
          {change !== undefined && (
            <span
              className="text-sm font-semibold flex items-center gap-1"
              style={{ color: trendColor }}
            >
              {effectiveTrend === 'up' ? '↑' : effectiveTrend === 'down' ? '↓' : '→'}
              {Math.abs(change)}%
            </span>
          )}
          {changeLabel && (
            <span className={`${mutedColor40} text-sm`}>{changeLabel}</span>
          )}
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      {isDark ? (
        <div className="bg-black rounded-2xl p-8 w-full max-w-sm">
          {content}
        </div>
      ) : (
        content
      )}
    </div>
  );
}

export default KPICard;
