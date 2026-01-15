'use client';

import { motion } from 'framer-motion';

interface SlopeChartData {
  label: string;
  start: number;
  end: number;
  color?: string;
}

interface SlopeChartProps {
  data: SlopeChartData[];
  startLabel?: string;
  endLabel?: string;
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function SlopeChart({
  data,
  startLabel = 'Before',
  endLabel = 'After',
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: SlopeChartProps) {
  const isDark = variant === 'dark';
  const columnLineColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';
  const headerColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const valueColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';

  const width = 400;
  const height = 350;
  const padding = { top: 60, right: 80, bottom: 40, left: 80 };

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'];

  const allValues = data.flatMap(d => [d.start, d.end]);
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);

  const scaleY = (val: number) =>
    height - padding.bottom - ((val - minValue) / (maxValue - minValue)) * (height - padding.top - padding.bottom);

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
        {/* Column lines */}
        <motion.line
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={height - padding.bottom}
          stroke={columnLineColor}
          strokeWidth="2"
        />
        <motion.line
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          x1={width - padding.right}
          y1={padding.top}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke={columnLineColor}
          strokeWidth="2"
        />

        {/* Column headers */}
        <motion.text
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          x={padding.left}
          y={padding.top - 20}
          textAnchor="middle"
          fill={headerColor}
          fontSize="12"
          fontWeight="bold"
        >
          {startLabel}
        </motion.text>
        <motion.text
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          x={width - padding.right}
          y={padding.top - 20}
          textAnchor="middle"
          fill={headerColor}
          fontSize="12"
          fontWeight="bold"
        >
          {endLabel}
        </motion.text>

        {/* Slopes */}
        {data.map((d, i) => {
          const color = d.color || colors[i % colors.length];
          const y1 = scaleY(d.start);
          const y2 = scaleY(d.end);
          const isIncrease = d.end >= d.start;

          return (
            <motion.g key={i}>
              {/* Line */}
              <motion.line
                initial={{ x2: padding.left, y2: y1 }}
                animate={{ x2: width - padding.right, y2 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                x1={padding.left}
                y1={y1}
                stroke={color}
                strokeWidth="3"
              />

              {/* Start point */}
              <motion.circle
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                cx={padding.left}
                cy={y1}
                r="8"
                fill={color}
              />

              {/* End point */}
              <motion.circle
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                cx={width - padding.right}
                cy={y2}
                r="8"
                fill={color}
              />

              {/* Start value */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                x={padding.left - 15}
                y={y1 + 4}
                textAnchor="end"
                fill={valueColor}
                fontSize="11"
              >
                {d.start}
              </motion.text>

              {/* End value */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                x={width - padding.right + 15}
                y={y2 + 4}
                textAnchor="start"
                fill={valueColor}
                fontSize="11"
              >
                {d.end}
              </motion.text>

              {/* Label */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                x={(padding.left + width - padding.right) / 2}
                y={(y1 + y2) / 2 - 8}
                textAnchor="middle"
                fill={color}
                fontSize="10"
                fontWeight="bold"
              >
                {d.label} {isIncrease ? '\u2191' : '\u2193'} {Math.abs(((d.end - d.start) / d.start) * 100).toFixed(0)}%
              </motion.text>
            </motion.g>
          );
        })}
      </svg>
    </>
  );

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      {isDark ? (
        <div className="bg-black rounded-2xl p-8 w-full max-w-md">
          {content}
        </div>
      ) : (
        <div className="w-full max-w-md">
          {content}
        </div>
      )}
    </div>
  );
}

export default SlopeChart;
