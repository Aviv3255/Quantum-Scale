'use client';

import { motion } from 'framer-motion';

interface TargetChartProps {
  actual: number;
  target: number;
  title?: string;
  unit?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

/**
 * TargetChart - Target/goal visualization with actual vs target
 * Shows progress toward a goal with animated rings
 */
export function TargetChart({
  actual,
  target,
  title,
  unit = '',
  accentColor = '#88da1c',
  variant = 'dark',
}: TargetChartProps) {
  const isDark = variant === 'dark';
  const trackColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const targetLineColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';

  const size = 280;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(actual / target, 1.5);
  const strokeDashoffset = circumference - (percentage * circumference);
  const isOverTarget = actual >= target;

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-center mb-6"
          style={{ color: isDark ? '#fff' : '#000' }}
        >
          {title}
        </motion.h3>
      )}

      <div className="flex justify-center">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="overflow-visible -rotate-90">
            {/* Background track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={trackColor}
              strokeWidth={strokeWidth}
            />

            {/* Target marker (100% position) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={targetLineColor}
              strokeWidth={strokeWidth}
              strokeDasharray={`4 ${circumference - 4}`}
              strokeLinecap="round"
            />

            {/* Progress arc */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={isOverTarget ? '#34C759' : accentColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: Math.max(0, strokeDashoffset) }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ filter: `drop-shadow(0 0 10px ${isOverTarget ? '#34C759' : accentColor}50)` }}
            />
          </svg>

          {/* Center content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-4xl font-bold" style={{ color: isDark ? '#fff' : '#000' }}>
              {actual}{unit}
            </div>
            <div className="text-sm mt-1" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
              of {target}{unit} target
            </div>
            <div className="text-lg font-semibold mt-2" style={{ color: isOverTarget ? '#34C759' : (isDark ? '#fff' : '#000') }}>
              {Math.round((actual / target) * 100)}%
            </div>
          </motion.div>
        </div>
      </div>

      {/* Status indicator */}
      <motion.div
        className="mt-6 flex justify-center gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: isOverTarget ? '#34C759' : accentColor }}
          />
          <span className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Actual</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: targetLineColor }}
          />
          <span className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Target</span>
        </div>
      </motion.div>
    </>
  );

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      {isDark ? (
        <div className="bg-black rounded-2xl p-8 w-full max-w-2xl">{content}</div>
      ) : (
        <div className="w-full max-w-2xl">{content}</div>
      )}
    </div>
  );
}

export default TargetChart;
