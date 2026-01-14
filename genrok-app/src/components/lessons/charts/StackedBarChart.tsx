'use client';

import { motion } from 'framer-motion';

interface StackedBarData {
  label: string;
  segments: { value: number; color?: string; label?: string }[];
}

interface StackedBarChartProps {
  data: StackedBarData[];
  title?: string;
  horizontal?: boolean;
  legendLabels?: string[];
  variant?: 'dark' | 'light';
}

/**
 * StackedBarChart - Animated stacked bar chart
 * White slide background with dark rounded block
 */
export function StackedBarChart({
  data,
  title,
  horizontal = true,
  legendLabels = [],
  variant = 'dark',
}: StackedBarChartProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const legendColor = isDark ? 'text-white/70' : 'text-black/70';
  const trackBg = isDark ? 'bg-white/10' : 'bg-black/10';

  const defaultColors = ['#88da1c', '#3B82F6', '#8B5CF6', '#F59E0B'];
  const maxTotal = Math.max(...data.map(d => d.segments.reduce((sum, s) => sum + s.value, 0)));

  const content = (
    <>
      {title && (
        <h3 className={`text-xl font-bold ${textColor} mb-6`}>{title}</h3>
      )}

      {/* Legend */}
      {legendLabels.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-6">
          {legendLabels.map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: defaultColors[i % defaultColors.length] }}
              />
              <span className={`text-sm ${legendColor}`}>{label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Bars */}
      <div className="space-y-4">
        {data.map((item, barIndex) => {
          const total = item.segments.reduce((sum, s) => sum + s.value, 0);

          return (
            <motion.div
              key={barIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: barIndex * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${textColor}`}>{item.label}</span>
                <span className={`text-sm ${mutedColor}`}>{total.toLocaleString()}</span>
              </div>
              <div className={`h-8 ${trackBg} rounded-lg overflow-hidden flex`}>
                {item.segments.map((segment, segIndex) => {
                  const width = (segment.value / maxTotal) * 100;
                  const color = segment.color || defaultColors[segIndex % defaultColors.length];

                  return (
                    <motion.div
                      key={segIndex}
                      className="h-full"
                      style={{ backgroundColor: color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${width}%` }}
                      transition={{
                        duration: 0.8,
                        delay: 0.2 + barIndex * 0.1 + segIndex * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  );
                })}
              </div>
            </motion.div>
          );
        })}
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

export default StackedBarChart;
