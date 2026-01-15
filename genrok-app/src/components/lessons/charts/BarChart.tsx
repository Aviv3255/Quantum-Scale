'use client';

import { motion } from 'framer-motion';

interface BarData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarData[];
  title?: string;
  subtitle?: string;
  maxValue?: number;
  showValues?: boolean;
  horizontal?: boolean;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

/**
 * BarChart - Animated vertical/horizontal bar chart
 * Supports dark (black container) and light (pure white) variants
 */
export function BarChart({
  data,
  title,
  subtitle,
  maxValue,
  showValues = true,
  horizontal = false,
  accentColor = '#88da1c',
  variant = 'dark',
}: BarChartProps) {
  const isDark = variant === 'dark';
  const max = maxValue || Math.max(...data.map(d => d.value)) * 1.1;

  // Colors based on variant
  const bgTrack = isDark ? 'bg-white/10' : 'bg-black/10';

  const content = horizontal ? (
    <>
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-8">
          {title && <h3 className="text-xl font-bold mb-1" style={{ color: isDark ? '#fff' : '#000' }}>{title}</h3>}
          {subtitle && <p className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>{subtitle}</p>}
        </div>
      )}

      {/* Horizontal bars */}
      <div className="space-y-5">
        {data.map((item, index) => {
          const percentage = (item.value / max) * 100;
          const barColor = item.color || accentColor;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: isDark ? '#fff' : '#000' }}>{item.label}</span>
                {showValues && (
                  <motion.span
                    className="text-sm font-bold"
                    style={{ color: isDark ? '#fff' : '#000' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {item.value.toLocaleString()}
                  </motion.span>
                )}
              </div>
              <div className={`h-3 ${bgTrack} rounded-full overflow-hidden`}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: barColor }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  ) : (
    <>
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-8">
          {title && <h3 className="text-xl font-bold mb-1" style={{ color: isDark ? '#fff' : '#000' }}>{title}</h3>}
          {subtitle && <p className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>{subtitle}</p>}
        </div>
      )}

      {/* Vertical bars */}
      <div className="flex items-end justify-between gap-4 h-64">
        {data.map((item, index) => {
          const percentage = (item.value / max) * 100;
          const barColor = item.color || accentColor;

          return (
            <motion.div
              key={index}
              className="flex-1 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Value */}
              {showValues && (
                <motion.span
                  className="text-sm font-bold mb-2"
                  style={{ color: isDark ? '#fff' : '#000' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {item.value.toLocaleString()}
                </motion.span>
              )}

              {/* Bar container */}
              <div className={`w-full ${bgTrack} rounded-t-lg flex-1 flex items-end`}>
                <motion.div
                  className="w-full rounded-t-lg"
                  style={{ backgroundColor: barColor }}
                  initial={{ height: 0 }}
                  animate={{ height: `${percentage}%` }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>

              {/* Label */}
              <span className="text-xs mt-3 text-center" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>{item.label}</span>
            </motion.div>
          );
        })}
      </div>
    </>
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

  return (
    <div className="bg-white p-8">
      {content}
    </div>
  );
}

export default BarChart;
