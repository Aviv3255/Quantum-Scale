'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  title?: string;
  subtitle?: string;
  valuePrefix?: string;
  valueSuffix?: string;
  showTrend?: boolean;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

/**
 * LineChart - Animated line chart with gradient fill
 * Supports dark (black container) and light (pure white) variants
 */
export function LineChart({
  data,
  title,
  subtitle,
  valuePrefix = '',
  valueSuffix = '',
  showTrend = true,
  accentColor = '#88da1c',
  variant = 'dark',
}: LineChartProps) {
  const isDark = variant === 'dark';

  // Chart dimensions
  const width = 600;
  const height = 300;
  const padding = { top: 40, right: 40, bottom: 60, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate scales
  const maxValue = Math.max(...data.map(d => d.value)) * 1.1;
  const minValue = Math.min(...data.map(d => d.value)) * 0.9;
  const valueRange = maxValue - minValue;

  // Generate path
  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * chartWidth,
    y: padding.top + chartHeight - ((d.value - minValue) / valueRange) * chartHeight,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;

  // Calculate trend
  const firstValue = data[0]?.value || 0;
  const lastValue = data[data.length - 1]?.value || 0;
  const trendPercent = ((lastValue - firstValue) / firstValue * 100).toFixed(1);
  const isPositive = lastValue >= firstValue;

  // Grid lines
  const gridLines = 5;
  const yGridValues = Array.from({ length: gridLines }, (_, i) =>
    minValue + (valueRange / (gridLines - 1)) * i
  );

  // Colors based on variant
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const fillClass = isDark ? 'fill-white/50' : 'fill-black/50';
  const pointFill = isDark ? '#000' : '#fff';

  const content = (
    <>
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <div className="flex items-center justify-between mb-1">
              <h3 className={`text-xl font-bold ${textColor}`}>{title}</h3>
              {showTrend && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${
                    isPositive ? 'bg-[#88da1c]/20 text-[#88da1c]' : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {isPositive ? '+' : ''}{trendPercent}%
                </motion.div>
              )}
            </div>
          )}
          {subtitle && <p className={`text-sm ${mutedColor}`}>{subtitle}</p>}
        </div>
      )}

      {/* Chart */}
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        <defs>
          <linearGradient id={`lineGradient-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </linearGradient>
          <filter id={`glow-${variant}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid lines */}
        {yGridValues.map((value, i) => {
          const y = padding.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={padding.left + chartWidth}
                y2={y}
                stroke={gridColor}
                strokeDasharray="4 4"
              />
              <text
                x={padding.left - 12}
                y={y + 4}
                textAnchor="end"
                className={`text-xs ${fillClass}`}
              >
                {valuePrefix}{Math.round(value)}{valueSuffix}
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {data.map((d, i) => (
          <text
            key={i}
            x={padding.left + (i / (data.length - 1)) * chartWidth}
            y={height - 20}
            textAnchor="middle"
            className={`text-xs ${fillClass}`}
          >
            {d.label}
          </text>
        ))}

        {/* Animated area fill */}
        <motion.path
          d={areaPath}
          fill={`url(#lineGradient-${variant})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* Animated line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={accentColor}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#glow-${variant})`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Data points */}
        {points.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={6}
            fill={pointFill}
            stroke={accentColor}
            strokeWidth={3}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 + i * 0.1, type: 'spring', stiffness: 200 }}
          />
        ))}
      </svg>
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

export default LineChart;
