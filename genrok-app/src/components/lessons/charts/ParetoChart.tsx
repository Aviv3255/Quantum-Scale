'use client';

import { motion } from 'framer-motion';

interface ParetoChartProps {
  data: { label: string; value: number }[];
  title?: string;
  accentColor?: string;
  showLine?: boolean;
  variant?: 'dark' | 'light';
}

export function ParetoChart({
  data,
  title,
  accentColor = '#88da1c',
  showLine = true,
  variant = 'dark',
}: ParetoChartProps) {
  const isDark = variant === 'dark';
  const mutedColor70 = isDark ? 'text-white/70' : 'text-black/70';
  const svgGridStroke = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const svgAxisStroke = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  const svgLabelFill = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const svgLabelFill40 = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

  const width = 500;
  const height = 300;
  const padding = { top: 40, right: 50, bottom: 60, left: 50 };

  // Sort by value descending
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const total = sortedData.reduce((sum, d) => sum + d.value, 0);

  // Calculate cumulative percentages
  let cumulative = 0;
  const enrichedData = sortedData.map(d => {
    cumulative += d.value;
    return {
      ...d,
      percentage: (d.value / total) * 100,
      cumulative: (cumulative / total) * 100,
    };
  });

  const maxValue = sortedData[0]?.value || 0;
  const barWidth = (width - padding.left - padding.right) / sortedData.length - 4;

  const scaleY = (val: number) =>
    height - padding.bottom - (val / maxValue) * (height - padding.top - padding.bottom);
  const scaleYPercent = (pct: number) =>
    height - padding.bottom - (pct / 100) * (height - padding.top - padding.bottom);

  const linePath = enrichedData
    .map((d, i) => {
      const x = padding.left + (i + 0.5) * ((width - padding.left - padding.right) / enrichedData.length);
      const y = scaleYPercent(d.cumulative);
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
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
        {/* Grid */}
        {[0, 25, 50, 75, 100].map((pct, i) => (
          <motion.line
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 * i }}
            x1={padding.left}
            y1={scaleYPercent(pct)}
            x2={width - padding.right}
            y2={scaleYPercent(pct)}
            stroke={svgGridStroke}
          />
        ))}

        {/* Axes */}
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke={svgAxisStroke}
          strokeWidth="2"
        />
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={height - padding.bottom}
          stroke={svgAxisStroke}
          strokeWidth="2"
        />
        <line
          x1={width - padding.right}
          y1={padding.top}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke={svgAxisStroke}
          strokeWidth="2"
        />

        {/* Bars */}
        {enrichedData.map((d, i) => {
          const barHeight = height - padding.bottom - scaleY(d.value);
          const x = padding.left + i * ((width - padding.left - padding.right) / enrichedData.length) + 2;

          return (
            <motion.rect
              key={i}
              initial={{ height: 0, y: height - padding.bottom }}
              animate={{ height: barHeight, y: scaleY(d.value) }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              x={x}
              width={barWidth}
              fill={accentColor}
              rx="3"
            />
          );
        })}

        {/* Cumulative line */}
        {showLine && (
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            d={linePath}
            fill="none"
            stroke="#F59E0B"
            strokeWidth="3"
          />
        )}

        {/* Line points */}
        {showLine &&
          enrichedData.map((d, i) => {
            const x = padding.left + (i + 0.5) * ((width - padding.left - padding.right) / enrichedData.length);
            const y = scaleYPercent(d.cumulative);

            return (
              <motion.circle
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                cx={x}
                cy={y}
                r="5"
                fill="#F59E0B"
              />
            );
          })}

        {/* 80% line */}
        <motion.line
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          x1={padding.left}
          y1={scaleYPercent(80)}
          x2={width - padding.right}
          y2={scaleYPercent(80)}
          stroke="#EF4444"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <text
          x={width - padding.right + 5}
          y={scaleYPercent(80) + 4}
          fill="#EF4444"
          fontSize="10"
        >
          80%
        </text>

        {/* X axis labels */}
        {enrichedData.map((d, i) => (
          <text
            key={i}
            x={padding.left + (i + 0.5) * ((width - padding.left - padding.right) / enrichedData.length)}
            y={height - padding.bottom + 20}
            textAnchor="middle"
            fill={svgLabelFill}
            fontSize="9"
          >
            {d.label}
          </text>
        ))}

        {/* Y axis labels */}
        {[0, 50, 100].map((pct, i) => (
          <text
            key={i}
            x={width - padding.right + 15}
            y={scaleYPercent(pct) + 4}
            fill={svgLabelFill40}
            fontSize="10"
          >
            {pct}%
          </text>
        ))}
      </svg>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex justify-center gap-6 mt-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: accentColor }} />
          <span className={`${mutedColor70} text-sm`}>Value</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-amber-500" />
          <span className={`${mutedColor70} text-sm`}>Cumulative %</span>
        </div>
      </motion.div>
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

export default ParetoChart;
