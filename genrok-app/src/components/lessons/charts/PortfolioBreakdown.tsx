'use client';

import { motion } from 'framer-motion';

interface PortfolioItem {
  label: string;
  value: number;
  color: string;
}

interface PortfolioBreakdownProps {
  data: PortfolioItem[];
  title?: string;
  centerLabel?: string;
  centerValue?: string;
  variant?: 'dark' | 'light';
}

/**
 * PortfolioBreakdown - Portfolio allocation visualization with donut chart
 * White slide background with dark rounded block
 */
export function PortfolioBreakdown({
  data,
  title,
  centerLabel = 'Total',
  centerValue = '$100K',
  variant = 'dark',
}: PortfolioBreakdownProps) {
  const isDark = variant === 'dark';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = 100;
  const strokeWidth = 32;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  // Calculate stroke dash values for each segment
  let accumulatedOffset = 0;
  const segments = data.map((item) => {
    const percentage = item.value / total;
    const strokeDasharray = `${circumference * percentage} ${circumference * (1 - percentage)}`;
    const strokeDashoffset = -accumulatedOffset;
    accumulatedOffset += circumference * percentage;
    return { ...item, percentage, strokeDasharray, strokeDashoffset };
  });

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

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Donut Chart */}
        <div className="relative">
          <svg width={radius * 2} height={radius * 2} className="-rotate-90">
            {segments.map((segment, index) => (
              <motion.circle
                key={index}
                cx={radius}
                cy={radius}
                r={normalizedRadius}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeDasharray={segment.strokeDasharray}
                strokeDashoffset={segment.strokeDashoffset}
                strokeLinecap="round"
                initial={{ strokeDasharray: `0 ${circumference}` }}
                animate={{ strokeDasharray: segment.strokeDasharray }}
                transition={{
                  duration: 1,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </svg>

          {/* Center Label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <span className={`text-sm ${mutedColor}`}>{centerLabel}</span>
            <span className="text-2xl font-bold" style={{ color: isDark ? '#fff' : '#000' }}>{centerValue}</span>
          </motion.div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3">
          {segments.map((segment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: segment.color }}
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium" style={{ color: isDark ? '#fff' : '#000' }}>
                  {segment.label}
                </span>
                <span className={`text-xs ${mutedColor}`}>
                  {(segment.percentage * 100).toFixed(1)}% (${segment.value.toLocaleString()})
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <div className="flex h-3 rounded-full overflow-hidden">
          {segments.map((segment, index) => (
            <motion.div
              key={index}
              style={{ backgroundColor: segment.color }}
              initial={{ width: 0 }}
              animate={{ width: `${segment.percentage * 100}%` }}
              transition={{
                duration: 0.8,
                delay: 0.9 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
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

export default PortfolioBreakdown;
