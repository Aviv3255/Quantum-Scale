'use client';

import { motion } from 'framer-motion';

interface RevenueItem {
  label: string;
  value: number;
  type: 'initial' | 'add' | 'subtract' | 'total';
}

interface RevenueWaterfallProps {
  data: RevenueItem[];
  title?: string;
  valuePrefix?: string;
  variant?: 'dark' | 'light';
}

/**
 * RevenueWaterfall - Revenue breakdown waterfall visualization
 * White slide background with dark rounded block
 */
export function RevenueWaterfall({
  data,
  title,
  valuePrefix = '$',
  variant = 'dark',
}: RevenueWaterfallProps) {
  const isDark = variant === 'dark';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const connectorColor = isDark ? 'bg-white/20' : 'bg-black/20';

  // Calculate running totals
  let runningTotal = 0;
  const processedData = data.map((item, index) => {
    if (item.type === 'initial' || item.type === 'total') {
      runningTotal = item.value;
      return { ...item, start: 0, end: item.value };
    }
    const start = runningTotal;
    if (item.type === 'add') {
      runningTotal += item.value;
    } else {
      runningTotal -= Math.abs(item.value);
    }
    return { ...item, start, end: runningTotal };
  });

  const allValues = processedData.flatMap(d => [d.start, d.end]);
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues, 0);
  const range = maxValue - minValue || 1;
  const chartHeight = 280;

  const getBarColor = (type: string) => {
    switch (type) {
      case 'initial': return '#3B82F6';
      case 'add': return '#22C55E';
      case 'subtract': return '#EF4444';
      case 'total': return '#88da1c';
      default: return '#6B7280';
    }
  };

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

      <div className="flex items-end justify-between gap-2" style={{ height: chartHeight + 60 }}>
        {processedData.map((item, index) => {
          const y1 = ((maxValue - item.start) / range) * chartHeight;
          const y2 = ((maxValue - item.end) / range) * chartHeight;
          const top = Math.min(y1, y2);
          const height = Math.max(Math.abs(y2 - y1), 4);
          const barColor = getBarColor(item.type);
          const displayValue = item.type === 'subtract' ? -Math.abs(item.value) : item.value;

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
                className="text-sm font-bold mb-2"
                style={{
                  color: item.type === 'total'
                    ? '#88da1c'
                    : item.type === 'subtract'
                    ? '#f87171'
                    : isDark ? '#fff' : '#000'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {item.type !== 'initial' && item.type !== 'total' && (displayValue >= 0 ? '+' : '')}
                {valuePrefix}{Math.abs(item.value).toLocaleString()}
              </motion.div>

              {/* Bar container */}
              <div className="relative w-full" style={{ height: chartHeight }}>
                {/* Connector line from previous bar */}
                {index > 0 && item.type !== 'total' && (
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
                    backgroundColor: barColor,
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
              <span className={`text-xs ${mutedColor} mt-2 text-center leading-tight`}>
                {item.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center gap-6 mt-6"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#22C55E]" />
          <span className={`text-xs ${mutedColor}`}>Increase</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#EF4444]" />
          <span className={`text-xs ${mutedColor}`}>Decrease</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#88da1c]" />
          <span className={`text-xs ${mutedColor}`}>Total</span>
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

export default RevenueWaterfall;
