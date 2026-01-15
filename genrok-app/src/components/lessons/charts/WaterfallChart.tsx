'use client';

import { motion } from 'framer-motion';

interface WaterfallItem {
  label: string;
  value: number;
  isTotal?: boolean;
}

interface WaterfallChartProps {
  data: WaterfallItem[];
  title?: string;
  valuePrefix?: string;
  variant?: 'dark' | 'light';
}

/**
 * WaterfallChart - Animated waterfall/bridge chart
 * White slide background with dark rounded block
 */
export function WaterfallChart({
  data,
  title,
  valuePrefix = '',
  variant = 'dark',
}: WaterfallChartProps) {
  const isDark = variant === 'dark';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const connectorColor = isDark ? 'bg-white/20' : 'bg-black/20';

  // Calculate running totals
  let runningTotal = 0;
  const processedData = data.map((item, index) => {
    if (index === 0 || item.isTotal) {
      runningTotal = item.value;
      return { ...item, start: 0, end: item.value };
    }
    const start = runningTotal;
    runningTotal += item.value;
    return { ...item, start, end: runningTotal };
  });

  const maxValue = Math.max(...processedData.map(d => Math.max(d.start, d.end)));
  const minValue = Math.min(...processedData.map(d => Math.min(d.start, d.end)), 0);
  const range = maxValue - minValue;
  const barHeight = 280;

  const content = (
    <>
      {title && (
        <h3 className="text-xl font-bold mb-6" style={{ color: isDark ? '#fff' : '#000' }}>{title}</h3>
      )}

      <div className="flex items-end justify-between gap-2" style={{ height: barHeight + 40 }}>
        {processedData.map((item, index) => {
          const y1 = ((maxValue - item.start) / range) * barHeight;
          const y2 = ((maxValue - item.end) / range) * barHeight;
          const top = Math.min(y1, y2);
          const height = Math.abs(y2 - y1);
          const isPositive = item.value >= 0;
          const isFirst = index === 0;

          return (
            <motion.div
              key={index}
              className="flex-1 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Value label */}
              <motion.div
                className={`text-sm font-bold mb-2 ${
                  item.isTotal ? 'text-[#88da1c]' : isPositive ? '' : 'text-red-400'
                }`}
                style={!item.isTotal && isPositive ? { color: isDark ? '#fff' : '#000' } : undefined}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {!isFirst && !item.isTotal && (isPositive ? '+' : '')}
                {valuePrefix}{item.value.toLocaleString()}
              </motion.div>

              {/* Bar container */}
              <div className="relative w-full" style={{ height: barHeight }}>
                {/* Connector line */}
                {index > 0 && !item.isTotal && (
                  <div
                    className={`absolute w-full h-px ${connectorColor}`}
                    style={{ top: y1 }}
                  />
                )}

                {/* Bar */}
                <motion.div
                  className="absolute w-full rounded-sm"
                  style={{
                    top,
                    backgroundColor: item.isTotal ? '#88da1c' : isPositive ? '#3B82F6' : '#EF4444',
                  }}
                  initial={{ height: 0 }}
                  animate={{ height }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>

              {/* Label */}
              <span className={`text-xs ${mutedColor} mt-2 text-center`}>{item.label}</span>
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

export default WaterfallChart;
