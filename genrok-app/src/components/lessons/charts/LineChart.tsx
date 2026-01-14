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
  darkMode?: boolean;
}

/**
 * LineChart - Animated line chart with gradient fill
 * Elite design with smooth path animations
 */
export function LineChart({
  data,
  title,
  subtitle,
  valuePrefix = '',
  valueSuffix = '',
  showTrend = true,
  accentColor = '#88da1c',
  darkMode = true,
}: LineChartProps) {
  const bgClass = darkMode ? 'bg-black' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-black';
  const mutedClass = darkMode ? 'text-white/50' : 'text-[#666666]';
  const gridColor = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

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

  // Area path (for gradient fill)
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

  return (
    <div className={`${bgClass} p-8 rounded-2xl`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <div className="flex items-center justify-between mb-1">
              <h3 className={`text-xl font-bold ${textClass}`}>{title}</h3>
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
          {subtitle && <p className={`text-sm ${mutedClass}`}>{subtitle}</p>}
        </div>
      )}

      {/* Chart */}
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        <defs>
          {/* Gradient fill */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </linearGradient>
          {/* Glow filter */}
          <filter id="glow">
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
                className={`text-xs ${mutedClass}`}
                fill="currentColor"
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
            className={`text-xs ${mutedClass}`}
            fill="currentColor"
          >
            {d.label}
          </text>
        ))}

        {/* Animated area fill */}
        <motion.path
          d={areaPath}
          fill="url(#lineGradient)"
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
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Data points */}
        {points.map((point, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={6}
              fill={darkMode ? '#000' : '#fff'}
              stroke={accentColor}
              strokeWidth={3}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1, type: 'spring', stiffness: 200 }}
            />
            {/* Value tooltip on hover */}
            <motion.g
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
            >
              <rect
                x={point.x - 25}
                y={point.y - 35}
                width={50}
                height={24}
                rx={6}
                fill={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}
                className="opacity-0 hover:opacity-100 transition-opacity"
              />
            </motion.g>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

export default LineChart;
