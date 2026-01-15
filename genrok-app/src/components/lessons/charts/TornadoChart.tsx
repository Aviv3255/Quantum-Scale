'use client';

import { motion } from 'framer-motion';

interface TornadoItem {
  id: string;
  label: string;
  low: number;
  high: number;
  baseline?: number;
  color?: string;
}

interface TornadoChartProps {
  items: TornadoItem[];
  title?: string;
  baselineValue?: number;
  xAxisLabel?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function TornadoChart({
  items,
  title,
  baselineValue = 0,
  xAxisLabel = 'Impact',
  accentColor = '#88da1c',
  variant = 'dark',
}: TornadoChartProps) {
  const isDark = variant === 'dark';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  // Sort items by range (largest impact first)
  const sortedItems = [...items].sort(
    (a, b) => Math.abs(b.high - b.low) - Math.abs(a.high - a.low)
  );

  // Calculate chart dimensions
  const width = 600;
  const height = 60 + sortedItems.length * 45;
  const leftPadding = 130;
  const rightPadding = 40;
  const topPadding = 40;
  const barHeight = 28;
  const barGap = 45;

  // Calculate scale
  const allValues = items.flatMap(item => [item.low, item.high, baselineValue]);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const range = maxValue - minValue;
  const chartWidth = width - leftPadding - rightPadding;

  const scale = (value: number) => {
    return leftPadding + ((value - minValue) / range) * chartWidth;
  };

  const baselineX = scale(baselineValue);

  // Generate grid lines
  const gridValues = [];
  const step = range / 5;
  for (let i = 0; i <= 5; i++) {
    gridValues.push(minValue + step * i);
  }

  const lowColor = '#EF4444';
  const highColor = '#22C55E';

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
        {/* Grid lines and labels */}
        {gridValues.map((value, i) => {
          const x = scale(value);
          return (
            <motion.g key={`grid-${i}`}>
              <motion.line
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                x1={x}
                y1={topPadding - 10}
                x2={x}
                y2={height - 20}
                stroke={gridColor}
                strokeDasharray="4,4"
              />
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                x={x}
                y={topPadding - 20}
                textAnchor="middle"
                fill={mutedColor}
                fontSize="10"
              >
                {value.toFixed(1)}
              </motion.text>
            </motion.g>
          );
        })}

        {/* Baseline */}
        <motion.line
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          x1={baselineX}
          y1={topPadding - 10}
          x2={baselineX}
          y2={height - 20}
          stroke={accentColor}
          strokeWidth="2"
          style={{ transformOrigin: `${baselineX}px ${topPadding}px` }}
        />

        {/* X-axis label */}
        <motion.text
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          x={width / 2}
          y={height - 5}
          textAnchor="middle"
          fill={mutedColor}
          fontSize="11"
          fontWeight="500"
        >
          {xAxisLabel}
        </motion.text>

        {/* Tornado bars */}
        {sortedItems.map((item, i) => {
          const y = topPadding + i * barGap;
          const lowX = scale(item.low);
          const highX = scale(item.high);
          const itemColor = item.color || accentColor;

          return (
            <motion.g key={item.id}>
              {/* Label */}
              <motion.text
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                x={leftPadding - 10}
                y={y + barHeight / 2 + 4}
                textAnchor="end"
                fill={isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)'}
                fontSize="11"
                fontWeight="500"
              >
                {item.label}
              </motion.text>

              {/* Low bar (left of baseline) */}
              {item.low < baselineValue && (
                <motion.rect
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                  x={lowX}
                  y={y}
                  width={baselineX - lowX}
                  height={barHeight}
                  fill={lowColor}
                  rx="4"
                  style={{ transformOrigin: `${baselineX}px ${y}px` }}
                />
              )}

              {/* High bar (right of baseline) */}
              {item.high > baselineValue && (
                <motion.rect
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.35 + i * 0.05, duration: 0.4 }}
                  x={baselineX}
                  y={y}
                  width={highX - baselineX}
                  height={barHeight}
                  fill={highColor}
                  rx="4"
                  style={{ transformOrigin: `${baselineX}px ${y}px` }}
                />
              )}

              {/* Value labels */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                x={lowX - 5}
                y={y + barHeight / 2 + 4}
                textAnchor="end"
                fill={lowColor}
                fontSize="9"
                fontWeight="600"
              >
                {item.low.toFixed(1)}
              </motion.text>

              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                x={highX + 5}
                y={y + barHeight / 2 + 4}
                textAnchor="start"
                fill={highColor}
                fontSize="9"
                fontWeight="600"
              >
                {item.high.toFixed(1)}
              </motion.text>
            </motion.g>
          );
        })}
      </svg>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex justify-center gap-6 mt-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 rounded-sm" style={{ backgroundColor: lowColor }} />
          <span className="text-xs" style={{ color: mutedColor }}>Low Scenario</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-0.5 h-4" style={{ backgroundColor: accentColor }} />
          <span className="text-xs" style={{ color: mutedColor }}>Baseline ({baselineValue})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 rounded-sm" style={{ backgroundColor: highColor }} />
          <span className="text-xs" style={{ color: mutedColor }}>High Scenario</span>
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

export default TornadoChart;
