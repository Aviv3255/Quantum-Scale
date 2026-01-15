'use client';

import { motion } from 'framer-motion';

interface BenchmarkItem {
  label: string;
  value: number;
  benchmark: number;
  unit?: string;
}

interface BenchmarkChartProps {
  title?: string;
  items: BenchmarkItem[];
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function BenchmarkChart({
  title,
  items,
  accentColor = '#88da1c',
  variant = 'dark',
}: BenchmarkChartProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const mutedColor70 = isDark ? 'text-white/70' : 'text-black/70';
  const bgTrack = isDark ? 'bg-white/10' : 'bg-black/10';
  const borderColor = isDark ? 'border-white/10' : 'border-black/10';

  const maxValue = Math.max(
    ...items.map((item) => Math.max(item.value, item.benchmark))
  );

  const getStatus = (value: number, benchmark: number) => {
    const ratio = value / benchmark;
    if (ratio >= 1) return { label: 'Above', color: '#22C55E' };
    if (ratio >= 0.8) return { label: 'Near', color: '#F59E0B' };
    return { label: 'Below', color: '#EF4444' };
  };

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xl font-bold ${textColor} text-center mb-8`}
          style={{ fontFamily: "'General Sans', sans-serif" }}
        >
          {title}
        </motion.h3>
      )}

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center gap-6 mb-6"
      >
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <span className={`text-sm ${mutedColor70}`}>Your Value</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-500" />
          <span className={`text-sm ${mutedColor70}`}>Industry Average</span>
        </div>
      </motion.div>

      <div className="space-y-6">
        {items.map((item, i) => {
          const valuePercent = (item.value / maxValue) * 100;
          const benchmarkPercent = (item.benchmark / maxValue) * 100;
          const status = getStatus(item.value, item.benchmark);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`${mutedColor70} text-sm`}>{item.label}</span>
                <div className="flex items-center gap-3">
                  <span className={`text-sm ${mutedColor}`}>
                    Avg: {item.benchmark}
                    {item.unit || ''}
                  </span>
                  <span className={`${textColor} font-bold`}>
                    {item.value}
                    {item.unit || ''}
                  </span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${status.color}20`,
                      color: status.color,
                    }}
                  >
                    {status.label}
                  </span>
                </div>
              </div>

              <div className={`relative h-4 ${bgTrack} rounded-full overflow-hidden`}>
                {/* Benchmark marker */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-gray-500 z-10"
                  style={{ left: `${benchmarkPercent}%` }}
                />

                {/* Value bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${valuePercent}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className={`mt-8 pt-6 border-t ${borderColor}`}
      >
        <div className="flex justify-between items-center">
          <span className={`${mutedColor} text-sm`}>Performance vs Benchmark</span>
          <span className="text-2xl font-bold" style={{ color: accentColor }}>
            {Math.round(
              (items.reduce((sum, item) => sum + item.value / item.benchmark, 0) /
                items.length) *
                100
            )}
            %
          </span>
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

export default BenchmarkChart;
