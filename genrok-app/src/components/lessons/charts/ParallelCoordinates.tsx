'use client';

import { motion } from 'framer-motion';

interface ParallelCoordinatesData {
  label: string;
  values: number[];
  color?: string;
}

interface ParallelCoordinatesProps {
  data: ParallelCoordinatesData[];
  dimensions: string[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function ParallelCoordinates({
  data,
  dimensions,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: ParallelCoordinatesProps) {
  const isDark = variant === 'dark';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
  const mutedFill = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  const axisStroke = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  const legendTextClass = isDark ? 'text-white/70' : 'text-black/70';

  const width = 550;
  const height = 350;
  const padding = { top: 50, right: 30, bottom: 40, left: 30 };

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'];

  const axisSpacing = (width - padding.left - padding.right) / (dimensions.length - 1);

  // Calculate min/max for each dimension
  const minMax = dimensions.map((_, dimIndex) => {
    const values = data.map(d => d.values[dimIndex]);
    return { min: Math.min(...values), max: Math.max(...values) };
  });

  const scaleY = (value: number, dimIndex: number) => {
    const { min, max } = minMax[dimIndex];
    if (max === min) return height / 2;
    return height - padding.bottom - ((value - min) / (max - min)) * (height - padding.top - padding.bottom);
  };

  const getX = (dimIndex: number) => padding.left + dimIndex * axisSpacing;

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
        {/* Axes */}
        {dimensions.map((dim, i) => {
          const x = getX(i);
          return (
            <motion.g key={i}>
              <motion.line
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                x1={x}
                y1={padding.top}
                x2={x}
                y2={height - padding.bottom}
                stroke={axisStroke}
                strokeWidth="2"
                style={{ transformOrigin: `${x}px ${height / 2}px` }}
              />

              {/* Dimension label */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                x={x}
                y={padding.top - 15}
                textAnchor="middle"
                fill={labelFill}
                fontSize="10"
              >
                {dim}
              </motion.text>

              {/* Min/Max labels */}
              <text
                x={x}
                y={padding.top - 3}
                textAnchor="middle"
                fill={mutedFill}
                fontSize="8"
              >
                {minMax[i].max.toFixed(0)}
              </text>
              <text
                x={x}
                y={height - padding.bottom + 15}
                textAnchor="middle"
                fill={mutedFill}
                fontSize="8"
              >
                {minMax[i].min.toFixed(0)}
              </text>
            </motion.g>
          );
        })}

        {/* Lines */}
        {data.map((series, seriesIndex) => {
          const color = series.color || colors[seriesIndex % colors.length];
          const path = series.values
            .map((val, dimIndex) => {
              const x = getX(dimIndex);
              const y = scaleY(val, dimIndex);
              return dimIndex === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
            })
            .join(' ');

          return (
            <motion.path
              key={seriesIndex}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ delay: 0.3 + seriesIndex * 0.1, duration: 0.8 }}
              d={path}
              fill="none"
              stroke={color}
              strokeWidth="2"
            />
          );
        })}

        {/* Points */}
        {data.map((series, seriesIndex) => {
          const color = series.color || colors[seriesIndex % colors.length];

          return series.values.map((val, dimIndex) => (
            <motion.circle
              key={`${seriesIndex}-${dimIndex}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + seriesIndex * 0.1 + dimIndex * 0.02 }}
              cx={getX(dimIndex)}
              cy={scaleY(val, dimIndex)}
              r="4"
              fill={color}
            />
          ));
        })}
      </svg>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap justify-center gap-4 mt-4"
      >
        {data.map((series, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-3 h-0.5"
              style={{ backgroundColor: series.color || colors[i % colors.length] }}
            />
            <span className={`${legendTextClass} text-xs`}>{series.label}</span>
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

export default ParallelCoordinates;
