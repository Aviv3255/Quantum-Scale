'use client';

import { motion } from 'framer-motion';

interface MatrixItem {
  label: string;
  x: number; // 0-100 position on x-axis
  y: number; // 0-100 position on y-axis
  size?: number;
  color?: string;
}

interface PerformanceMatrixProps {
  items: MatrixItem[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  quadrantLabels?: [string, string, string, string]; // [topLeft, topRight, bottomLeft, bottomRight]
  variant?: 'dark' | 'light';
}

/**
 * PerformanceMatrix - 2x2 BCG-style matrix chart
 * Plots items in four quadrants based on two dimensions
 */
export function PerformanceMatrix({
  items,
  title,
  xAxisLabel = 'Market Share',
  yAxisLabel = 'Growth Rate',
  quadrantLabels = ['Question Marks', 'Stars', 'Dogs', 'Cash Cows'],
  variant = 'dark',
}: PerformanceMatrixProps) {
  const isDark = variant === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const axisColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';

  const size = 320;
  const padding = 40;
  const chartSize = size - padding * 2;

  const defaultColors = ['#88da1c', '#007AFF', '#FF9500', '#FF3B30', '#AF52DE', '#5AC8FA'];

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
        <svg width={size} height={size} className="overflow-visible">
          {/* Grid background */}
          <rect
            x={padding}
            y={padding}
            width={chartSize}
            height={chartSize}
            fill="none"
            stroke={gridColor}
            strokeWidth={1}
          />

          {/* Quadrant dividers */}
          <line
            x1={padding + chartSize / 2}
            y1={padding}
            x2={padding + chartSize / 2}
            y2={padding + chartSize}
            stroke={axisColor}
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <line
            x1={padding}
            y1={padding + chartSize / 2}
            x2={padding + chartSize}
            y2={padding + chartSize / 2}
            stroke={axisColor}
            strokeWidth={1}
            strokeDasharray="4 4"
          />

          {/* Quadrant labels */}
          {quadrantLabels.map((label, i) => {
            const positions = [
              { x: padding + chartSize * 0.25, y: padding + chartSize * 0.25 },
              { x: padding + chartSize * 0.75, y: padding + chartSize * 0.25 },
              { x: padding + chartSize * 0.25, y: padding + chartSize * 0.75 },
              { x: padding + chartSize * 0.75, y: padding + chartSize * 0.75 },
            ];
            return (
              <motion.text
                key={i}
                x={positions[i].x}
                y={positions[i].y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs"
                style={{ fill: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {label}
              </motion.text>
            );
          })}

          {/* Items */}
          {items.map((item, i) => {
            const cx = padding + (item.x / 100) * chartSize;
            const cy = padding + ((100 - item.y) / 100) * chartSize;
            const r = item.size || 20;
            const color = item.color || defaultColors[i % defaultColors.length];

            return (
              <motion.g key={i}>
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={color}
                  fillOpacity={0.3}
                  stroke={color}
                  strokeWidth={2}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }}
                />
                <motion.text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-medium"
                  style={{ fill: isDark ? '#fff' : '#000' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  {item.label}
                </motion.text>
              </motion.g>
            );
          })}

          {/* Axis labels */}
          <motion.text
            x={size / 2}
            y={size - 5}
            textAnchor="middle"
            className="text-sm"
            style={{ fill: isDark ? '#fff' : '#000' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {xAxisLabel}
          </motion.text>
          <motion.text
            x={15}
            y={size / 2}
            textAnchor="middle"
            className="text-sm"
            style={{ fill: isDark ? '#fff' : '#000' }}
            transform={`rotate(-90, 15, ${size / 2})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {yAxisLabel}
          </motion.text>
        </svg>
      </div>

      {/* Legend */}
      <motion.div
        className="mt-6 flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color || defaultColors[i % defaultColors.length] }}
            />
            <span className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>{item.label}</span>
          </div>
        ))}
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

export default PerformanceMatrix;
