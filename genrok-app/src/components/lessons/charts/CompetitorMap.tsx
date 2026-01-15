'use client';

import { motion } from 'framer-motion';

interface Competitor {
  name: string;
  x: number; // 0-100 position on x-axis
  y: number; // 0-100 position on y-axis
  size?: number; // Market share or relative size
  isYou?: boolean;
}

interface CompetitorMapProps {
  competitors: Competitor[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  variant?: 'dark' | 'light';
}

/**
 * CompetitorMap - Competitive positioning map
 * Plots competitors on two dimensions (e.g., price vs quality)
 */
export function CompetitorMap({
  competitors = [
    { name: 'You', x: 70, y: 80, isYou: true },
    { name: 'Comp A', x: 30, y: 40 },
    { name: 'Comp B', x: 80, y: 30 },
    { name: 'Comp C', x: 50, y: 60 },
  ],
  title,
  xAxisLabel = 'Price',
  yAxisLabel = 'Quality',
  variant = 'dark',
}: CompetitorMapProps) {
  const isDark = variant === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const axisColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';

  const size = 320;
  const padding = 50;
  const chartSize = size - padding * 2;

  const defaultColors = ['#8E8E93', '#007AFF', '#FF9500', '#FF3B30', '#AF52DE', '#5AC8FA'];
  const yourColor = '#88da1c';

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

          {/* Grid lines */}
          {[25, 50, 75].map((pct, i) => (
            <g key={i}>
              <line
                x1={padding + (pct / 100) * chartSize}
                y1={padding}
                x2={padding + (pct / 100) * chartSize}
                y2={padding + chartSize}
                stroke={gridColor}
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <line
                x1={padding}
                y1={padding + (pct / 100) * chartSize}
                x2={padding + chartSize}
                y2={padding + (pct / 100) * chartSize}
                stroke={gridColor}
                strokeWidth={1}
                strokeDasharray="4 4"
              />
            </g>
          ))}

          {/* Axes */}
          <line
            x1={padding}
            y1={padding + chartSize}
            x2={padding + chartSize}
            y2={padding + chartSize}
            stroke={axisColor}
            strokeWidth={2}
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={padding + chartSize}
            stroke={axisColor}
            strokeWidth={2}
          />

          {/* Arrow heads */}
          <polygon
            points={`${padding + chartSize + 5},${padding + chartSize} ${padding + chartSize - 5},${padding + chartSize - 5} ${padding + chartSize - 5},${padding + chartSize + 5}`}
            fill={axisColor}
          />
          <polygon
            points={`${padding},${padding - 5} ${padding - 5},${padding + 5} ${padding + 5},${padding + 5}`}
            fill={axisColor}
          />

          {/* Competitor dots */}
          {competitors.map((comp, i) => {
            const cx = padding + (comp.x / 100) * chartSize;
            const cy = padding + ((100 - comp.y) / 100) * chartSize;
            const r = comp.size || (comp.isYou ? 24 : 18);
            const color = comp.isYou ? yourColor : defaultColors[i % defaultColors.length];

            return (
              <motion.g key={i}>
                {/* Pulse effect for "You" */}
                {comp.isYou && (
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={color}
                    fillOpacity={0.2}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}

                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={color}
                  fillOpacity={0.8}
                  stroke={isDark ? '#000' : '#fff'}
                  strokeWidth={2}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
                />

                <motion.text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-bold"
                  style={{ fill: comp.isYou ? '#000' : (isDark ? '#fff' : '#000') }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  {comp.isYou ? 'YOU' : comp.name.charAt(0)}
                </motion.text>
              </motion.g>
            );
          })}

          {/* Axis labels */}
          <motion.text
            x={size / 2}
            y={size - 5}
            textAnchor="middle"
            className="text-sm font-medium"
            style={{ fill: isDark ? '#fff' : '#000' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {xAxisLabel} →
          </motion.text>
          <motion.text
            x={15}
            y={size / 2}
            textAnchor="middle"
            className="text-sm font-medium"
            style={{ fill: isDark ? '#fff' : '#000' }}
            transform={`rotate(-90, 15, ${size / 2})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {yAxisLabel} →
          </motion.text>

          {/* Scale labels */}
          <text x={padding} y={size - 5} textAnchor="middle" className="text-xs" style={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Low</text>
          <text x={padding + chartSize} y={size - 5} textAnchor="middle" className="text-xs" style={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>High</text>
          <text x={padding - 15} y={padding + chartSize} textAnchor="middle" className="text-xs" style={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Low</text>
          <text x={padding - 15} y={padding + 10} textAnchor="middle" className="text-xs" style={{ fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>High</text>
        </svg>
      </div>

      {/* Legend */}
      <motion.div
        className="mt-6 flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {competitors.map((comp, i) => {
          const color = comp.isYou ? yourColor : defaultColors[i % defaultColors.length];
          return (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm" style={{ color: comp.isYou ? (isDark ? '#fff' : '#000') : (isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)') }}>
                {comp.name}
              </span>
            </div>
          );
        })}
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

export default CompetitorMap;
