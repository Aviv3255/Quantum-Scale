'use client';

import { motion } from 'framer-motion';

interface QuarterData {
  quarter: string; // e.g., "Q1 2024"
  value: number;
  change?: number; // percentage change from previous quarter
}

interface QuarterlyTrendProps {
  data: QuarterData[];
  title?: string;
  unit?: string;
  accentColor?: string;
  showChange?: boolean;
  variant?: 'dark' | 'light';
}

/**
 * QuarterlyTrend - Quarter-over-quarter trend chart
 * Shows quarterly data with trend line and change indicators
 */
export function QuarterlyTrend({
  data = [
    { quarter: 'Q1 2024', value: 45000, change: 12 },
    { quarter: 'Q2 2024', value: 52000, change: 15.5 },
    { quarter: 'Q3 2024', value: 48000, change: -7.7 },
    { quarter: 'Q4 2024', value: 61000, change: 27.1 },
  ],
  title,
  unit = '$',
  accentColor = '#88da1c',
  showChange = true,
  variant = 'dark',
}: QuarterlyTrendProps) {
  const isDark = variant === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  const width = 400;
  const height = 200;
  const padding = { top: 30, right: 30, bottom: 50, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const valueRange = maxValue - minValue || 1;
  const yPadding = valueRange * 0.2;

  const formatValue = (value: number) => {
    if (unit === '$') {
      if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
      return `$${value}`;
    }
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - ((d.value - minValue + yPadding) / (valueRange + yPadding * 2)) * chartHeight;
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = linePath + ` L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${padding.left} ${padding.top + chartHeight} Z`;

  // Calculate overall trend
  const overallChange = data.length >= 2
    ? ((data[data.length - 1].value - data[0].value) / data[0].value * 100)
    : 0;
  const isPositiveTrend = overallChange >= 0;

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
        <svg width={width} height={height} className="overflow-visible">
          <defs>
            <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
            </linearGradient>
            <filter id="trendGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
            <motion.line
              key={i}
              x1={padding.left}
              y1={padding.top + chartHeight * pct}
              x2={padding.left + chartWidth}
              y2={padding.top + chartHeight * pct}
              stroke={gridColor}
              strokeWidth={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
            />
          ))}

          {/* Y-axis labels */}
          {[0, 0.5, 1].map((pct, i) => {
            const value = minValue - yPadding + (valueRange + yPadding * 2) * (1 - pct);
            return (
              <motion.text
                key={i}
                x={padding.left - 10}
                y={padding.top + chartHeight * pct}
                textAnchor="end"
                dominantBaseline="middle"
                className="text-xs"
                style={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                {formatValue(Math.round(value))}
              </motion.text>
            );
          })}

          {/* Area fill */}
          <motion.path
            d={areaPath}
            fill="url(#trendGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />

          {/* Line */}
          <motion.path
            d={linePath}
            fill="none"
            stroke={accentColor}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#trendGlow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Data points */}
          {points.map((point, i) => (
            <motion.g key={i}>
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={8}
                fill={accentColor}
                stroke={isDark ? '#000' : '#fff'}
                strokeWidth={3}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 200 }}
              />

              {/* Value label */}
              <motion.text
                x={point.x}
                y={point.y - 18}
                textAnchor="middle"
                className="text-xs font-bold"
                style={{ fill: isDark ? '#fff' : '#000' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                {formatValue(point.value)}
              </motion.text>

              {/* Quarter label */}
              <motion.text
                x={point.x}
                y={height - 15}
                textAnchor="middle"
                className="text-xs"
                style={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
              >
                {point.quarter}
              </motion.text>

              {/* Change indicator */}
              {showChange && point.change !== undefined && i > 0 && (
                <motion.text
                  x={point.x}
                  y={point.y + 22}
                  textAnchor="middle"
                  className="text-xs font-medium"
                  style={{ fill: point.change >= 0 ? '#22c55e' : '#ef4444' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  {point.change >= 0 ? '+' : ''}{point.change.toFixed(1)}%
                </motion.text>
              )}
            </motion.g>
          ))}
        </svg>
      </div>

      {/* Summary */}
      <motion.div
        className={`mt-6 flex justify-center gap-8`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: isDark ? '#fff' : '#000' }}>
            {formatValue(data[data.length - 1]?.value || 0)}
          </div>
          <div className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Latest Quarter</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: isPositiveTrend ? '#22c55e' : '#ef4444' }}>
            {isPositiveTrend ? '+' : ''}{overallChange.toFixed(1)}%
          </div>
          <div className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Overall Change</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: isDark ? '#fff' : '#000' }}>
            {formatValue(Math.round(data.reduce((acc, d) => acc + d.value, 0) / data.length))}
          </div>
          <div className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Average</div>
        </div>
      </motion.div>

      {/* Trend indicator */}
      <motion.div
        className="mt-4 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: isPositiveTrend ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)' }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className={isPositiveTrend ? '' : 'rotate-180'}
            style={{ color: isPositiveTrend ? '#22c55e' : '#ef4444' }}
          >
            <path
              d="M8 3L14 11H2L8 3Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-sm font-medium" style={{ color: isPositiveTrend ? '#22c55e' : '#ef4444' }}>
            {isPositiveTrend ? 'Upward Trend' : 'Downward Trend'}
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

export default QuarterlyTrend;
