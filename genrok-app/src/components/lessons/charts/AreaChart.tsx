'use client';

import { motion } from 'framer-motion';

interface DataPoint {
  label: string;
  value: number;
}

interface AreaChartProps {
  data: DataPoint[];
  title?: string;
  subtitle?: string;
  accentColor?: string;
  showGrid?: boolean;
  darkMode?: boolean;
}

/**
 * AreaChart - Animated area chart with gradient fill
 * Elite design with smooth path animation
 */
export function AreaChart({
  data,
  title,
  subtitle,
  accentColor = '#88da1c',
  showGrid = true,
  darkMode = true,
}: AreaChartProps) {
  const bgClass = darkMode ? 'bg-black' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-black';
  const mutedClass = darkMode ? 'text-white/50' : 'text-[#666666]';
  const gridColor = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  // Chart dimensions
  const width = 600;
  const height = 280;
  const padding = { top: 30, right: 30, bottom: 50, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate scales
  const maxValue = Math.max(...data.map(d => d.value)) * 1.15;
  const minValue = 0;
  const valueRange = maxValue - minValue;

  // Generate smooth curve using cardinal spline
  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * chartWidth,
    y: padding.top + chartHeight - ((d.value - minValue) / valueRange) * chartHeight,
    value: d.value,
    label: d.label,
  }));

  // Create smooth bezier curve
  const createSmoothPath = () => {
    if (points.length < 2) return '';

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(i - 1, 0)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(i + 2, points.length - 1)];

      const tension = 0.3;
      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return path;
  };

  const linePath = createSmoothPath();
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;

  // Grid lines
  const gridLines = 5;
  const yValues = Array.from({ length: gridLines }, (_, i) =>
    Math.round((maxValue / (gridLines - 1)) * i)
  );

  return (
    <div className={`${bgClass} p-8 rounded-2xl`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h3 className={`text-xl font-bold ${textClass} mb-1`}>{title}</h3>}
          {subtitle && <p className={`text-sm ${mutedClass}`}>{subtitle}</p>}
        </div>
      )}

      {/* Chart */}
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        <defs>
          {/* Gradient fill */}
          <linearGradient id={`areaGrad-${accentColor.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.4" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.15" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </linearGradient>
          {/* Glow */}
          <filter id="areaGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid lines */}
        {showGrid && yValues.map((value, i) => {
          const y = padding.top + chartHeight - (value / maxValue) * chartHeight;
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
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                className={`text-xs ${mutedClass}`}
                fill="currentColor"
              >
                {value}
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={height - 15}
            textAnchor="middle"
            className={`text-xs ${mutedClass}`}
            fill="currentColor"
          >
            {p.label}
          </text>
        ))}

        {/* Animated area fill */}
        <motion.path
          d={areaPath}
          fill={`url(#areaGrad-${accentColor.replace('#', '')})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />

        {/* Animated line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={accentColor}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#areaGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Data points */}
        {points.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={5}
            fill={darkMode ? '#000' : '#fff'}
            stroke={accentColor}
            strokeWidth={2.5}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 + i * 0.08, type: 'spring', stiffness: 200 }}
          />
        ))}
      </svg>
    </div>
  );
}

export default AreaChart;
