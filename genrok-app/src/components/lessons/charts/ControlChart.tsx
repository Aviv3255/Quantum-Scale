'use client';

import { motion } from 'framer-motion';

interface ControlChartProps {
  data: { label: string; value: number }[];
  title?: string;
  ucl?: number; // Upper Control Limit
  lcl?: number; // Lower Control Limit
  target?: number;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function ControlChart({
  data,
  title,
  ucl,
  lcl,
  target,
  accentColor = '#88da1c',
  variant = 'dark',
}: ControlChartProps) {
  const isDark = variant === 'dark';
  const axisColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  const dataLineColor = isDark ? 'white' : 'black';

  const width = 500;
  const height = 300;
  const padding = 50;

  const values = data.map(d => d.value);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const stdDev = Math.sqrt(
    values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length
  );

  const effectiveUcl = ucl ?? mean + 3 * stdDev;
  const effectiveLcl = lcl ?? mean - 3 * stdDev;
  const effectiveTarget = target ?? mean;

  const allValues = [...values, effectiveUcl, effectiveLcl];
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);

  const scaleX = (index: number) =>
    padding + (index * (width - 2 * padding)) / (data.length - 1);
  const scaleY = (val: number) =>
    height - padding - ((val - minValue) / (maxValue - minValue)) * (height - 2 * padding);

  const path = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(d.value)}`)
    .join(' ');

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-center mb-6"
          style={{ fontFamily: "'General Sans', sans-serif", color: isDark ? '#fff' : '#000' }}
        >
          {title}
        </motion.h3>
      )}

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        {/* Control limit zones */}
        <motion.rect
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          x={padding}
          y={scaleY(effectiveUcl)}
          width={width - 2 * padding}
          height={scaleY(effectiveLcl) - scaleY(effectiveUcl)}
          fill="rgba(34, 197, 94, 0.1)"
        />

        {/* UCL line */}
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          x1={padding}
          y1={scaleY(effectiveUcl)}
          x2={width - padding}
          y2={scaleY(effectiveUcl)}
          stroke="#EF4444"
          strokeWidth="2"
          strokeDasharray="8,4"
        />

        {/* LCL line */}
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          x1={padding}
          y1={scaleY(effectiveLcl)}
          x2={width - padding}
          y2={scaleY(effectiveLcl)}
          stroke="#EF4444"
          strokeWidth="2"
          strokeDasharray="8,4"
        />

        {/* Target/Mean line */}
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          x1={padding}
          y1={scaleY(effectiveTarget)}
          x2={width - padding}
          y2={scaleY(effectiveTarget)}
          stroke={accentColor}
          strokeWidth="2"
        />

        {/* Axes */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke={axisColor}
          strokeWidth="2"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke={axisColor}
          strokeWidth="2"
        />

        {/* Data line */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          d={path}
          fill="none"
          stroke={dataLineColor}
          strokeWidth="2"
        />

        {/* Data points */}
        {data.map((d, i) => {
          const isOutOfControl = d.value > effectiveUcl || d.value < effectiveLcl;
          return (
            <motion.circle
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.03 }}
              cx={scaleX(i)}
              cy={scaleY(d.value)}
              r={isOutOfControl ? 6 : 4}
              fill={isOutOfControl ? '#EF4444' : accentColor}
            />
          );
        })}

        {/* Labels */}
        <text
          x={width - padding + 5}
          y={scaleY(effectiveUcl) + 4}
          fill="#EF4444"
          fontSize="10"
        >
          UCL
        </text>
        <text
          x={width - padding + 5}
          y={scaleY(effectiveLcl) + 4}
          fill="#EF4444"
          fontSize="10"
        >
          LCL
        </text>
        <text
          x={width - padding + 5}
          y={scaleY(effectiveTarget) + 4}
          fill={accentColor}
          fontSize="10"
        >
          Target
        </text>
      </svg>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center gap-6 mt-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }} />
          <span className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>In Control</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>Out of Control</span>
        </div>
      </motion.div>
    </>
  );

  if (isDark) {
    return (
      <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
        <div className="bg-black rounded-2xl p-8 w-full max-w-2xl">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {content}
      </div>
    </div>
  );
}

export default ControlChart;
