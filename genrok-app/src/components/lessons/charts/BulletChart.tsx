'use client';

import { motion } from 'framer-motion';

interface BulletChartProps {
  value: number;
  target: number;
  ranges: [number, number, number]; // Poor, satisfactory, good thresholds
  title: string;
  subtitle?: string;
  unit?: string;
  variant?: 'dark' | 'light';
}

/**
 * BulletChart - Animated bullet/performance chart
 * White slide background with dark rounded block
 */
export function BulletChart({
  value,
  target,
  ranges,
  title,
  subtitle,
  unit = '',
  variant = 'dark',
}: BulletChartProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const legendColor = isDark ? 'text-white/70' : 'text-black/70';
  const targetBarBg = isDark ? 'bg-white' : 'bg-black';
  const targetLineBg = isDark ? 'bg-white' : 'bg-black';
  const rangeBg1 = isDark ? 'bg-white/5' : 'bg-black/5';
  const rangeBg2 = isDark ? 'bg-white/10' : 'bg-black/10';
  const rangeBg3 = isDark ? 'bg-white/15' : 'bg-black/15';

  const maxValue = Math.max(ranges[2], value, target) * 1.1;

  const content = (
    <>
      <div className="mb-4">
        <h3 className={`text-lg font-bold ${textColor}`}>{title}</h3>
        {subtitle && <p className={`text-sm ${mutedColor}`}>{subtitle}</p>}
      </div>

      <div className="relative h-12 rounded-lg overflow-hidden">
        {/* Background ranges */}
        <div className="absolute inset-0 flex">
          <div
            className={`h-full ${rangeBg1}`}
            style={{ width: `${(ranges[0] / maxValue) * 100}%` }}
          />
          <div
            className={`h-full ${rangeBg2}`}
            style={{ width: `${((ranges[1] - ranges[0]) / maxValue) * 100}%` }}
          />
          <div
            className={`h-full ${rangeBg3}`}
            style={{ width: `${((ranges[2] - ranges[1]) / maxValue) * 100}%` }}
          />
        </div>

        {/* Value bar */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-6 bg-[#88da1c] rounded-sm"
          style={{ left: 0 }}
          initial={{ width: 0 }}
          animate={{ width: `${(value / maxValue) * 100}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Target marker */}
        <motion.div
          className={`absolute top-0 bottom-0 w-1 ${targetBarBg}`}
          style={{ left: `${(target / maxValue) * 100}%` }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 0.8 }}
        />
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#88da1c]" />
            <span className={`text-sm ${legendColor}`}>Actual: {value}{unit}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-1 ${targetLineBg}`} />
            <span className={`text-sm ${legendColor}`}>Target: {target}{unit}</span>
          </div>
        </div>
        <span className={`text-sm font-bold ${value >= target ? 'text-[#88da1c]' : 'text-amber-400'}`}>
          {value >= target ? 'On Track' : 'Below Target'}
        </span>
      </div>
    </>
  );

  return (
    <div className="bg-white p-8">
      {isDark ? (
        <div className="bg-black rounded-2xl p-8">
          {content}
        </div>
      ) : (
        content
      )}
    </div>
  );
}

export default BulletChart;
