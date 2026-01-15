'use client';

import { motion } from 'framer-motion';

interface LollipopChartProps {
  data: { label: string; value: number }[];
  title?: string;
  orientation?: 'horizontal' | 'vertical';
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function LollipopChart({
  data,
  title,
  orientation = 'horizontal',
  accentColor = '#88da1c',
  variant = 'dark',
}: LollipopChartProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const axisColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  const labelColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';

  const width = 500;
  const height = 350;
  const padding = { top: 40, right: 30, bottom: 60, left: 120 };

  const maxValue = Math.max(...data.map(d => d.value));

  const isHorizontal = orientation === 'horizontal';
  const barSpace = isHorizontal
    ? (height - padding.top - padding.bottom) / data.length
    : (width - padding.left - padding.right) / data.length;

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
        {/* Grid */}
        {[0, 25, 50, 75, 100].map((pct, i) => {
          if (isHorizontal) {
            const x = padding.left + (pct / 100) * (width - padding.left - padding.right);
            return (
              <motion.line
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * i }}
                x1={x}
                y1={padding.top}
                x2={x}
                y2={height - padding.bottom}
                stroke={gridColor}
              />
            );
          } else {
            const y = height - padding.bottom - (pct / 100) * (height - padding.top - padding.bottom);
            return (
              <motion.line
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * i }}
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke={gridColor}
              />
            );
          }
        })}

        {/* Axis */}
        <line
          x1={padding.left}
          y1={isHorizontal ? padding.top : height - padding.bottom}
          x2={padding.left}
          y2={height - padding.bottom}
          stroke={axisColor}
          strokeWidth="2"
        />
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke={axisColor}
          strokeWidth="2"
        />

        {/* Lollipops */}
        {data.map((d, i) => {
          const valueRatio = d.value / maxValue;

          if (isHorizontal) {
            const y = padding.top + (i + 0.5) * barSpace;
            const x = padding.left + valueRatio * (width - padding.left - padding.right);

            return (
              <motion.g key={i}>
                {/* Stick */}
                <motion.line
                  initial={{ x2: padding.left }}
                  animate={{ x2: x }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  x1={padding.left}
                  y1={y}
                  y2={y}
                  stroke={accentColor}
                  strokeWidth="3"
                  strokeOpacity="0.5"
                />

                {/* Circle */}
                <motion.circle
                  initial={{ cx: padding.left, scale: 0 }}
                  animate={{ cx: x, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.05, type: 'spring' }}
                  cy={y}
                  r="10"
                  fill={accentColor}
                />

                {/* Value */}
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, x: x + 20 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  y={y + 4}
                  fill={labelColor}
                  fontSize="11"
                >
                  {d.value}
                </motion.text>

                {/* Label */}
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  fill={labelColor}
                  fontSize="11"
                >
                  {d.label}
                </text>
              </motion.g>
            );
          } else {
            const x = padding.left + (i + 0.5) * barSpace;
            const y = height - padding.bottom - valueRatio * (height - padding.top - padding.bottom);

            return (
              <motion.g key={i}>
                {/* Stick */}
                <motion.line
                  initial={{ y1: height - padding.bottom }}
                  animate={{ y1: y }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  x1={x}
                  x2={x}
                  y2={height - padding.bottom}
                  stroke={accentColor}
                  strokeWidth="3"
                  strokeOpacity="0.5"
                />

                {/* Circle */}
                <motion.circle
                  initial={{ cy: height - padding.bottom, scale: 0 }}
                  animate={{ cy: y, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.05, type: 'spring' }}
                  cx={x}
                  r="10"
                  fill={accentColor}
                />

                {/* Label */}
                <text
                  x={x}
                  y={height - padding.bottom + 20}
                  textAnchor="middle"
                  fill={labelColor}
                  fontSize="10"
                >
                  {d.label}
                </text>
              </motion.g>
            );
          }
        })}
      </svg>
    </>
  );

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      {isDark ? (
        <div className="bg-black rounded-2xl p-8 w-full max-w-2xl">
          {content}
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          {content}
        </div>
      )}
    </div>
  );
}

export default LollipopChart;
