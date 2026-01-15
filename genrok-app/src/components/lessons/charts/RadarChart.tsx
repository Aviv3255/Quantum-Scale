'use client';

import { motion } from 'framer-motion';

interface RadarDataPoint {
  axis: string;
  value: number;
}

interface RadarChartProps {
  data: RadarDataPoint[];
  maxValue?: number;
  title?: string;
  accentColor?: string;
  showLabels?: boolean;
  variant?: 'dark' | 'light';
}

/**
 * RadarChart - Animated spider/radar chart
 * Supports dark (black container) and light (pure white) variants
 */
export function RadarChart({
  data,
  maxValue = 100,
  title,
  accentColor = '#88da1c',
  showLabels = true,
  variant = 'dark',
}: RadarChartProps) {
  const isDark = variant === 'dark';
  const size = 300;
  const center = size / 2;
  const radius = (size / 2) - 50;
  const levels = 5;
  const angleSlice = (Math.PI * 2) / data.length;

  // Colors based on variant
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const fillLabelColor = isDark ? '#fff' : '#000';
  const pointStroke = isDark ? '#000' : '#fff';

  const gradientId = `radarGradient-${variant}`;
  const glowId = `radarGlow-${variant}`;

  // Calculate polygon points
  const calculatePoint = (value: number, index: number) => {
    const normalizedValue = value / maxValue;
    const angle = angleSlice * index - Math.PI / 2;
    return {
      x: center + radius * normalizedValue * Math.cos(angle),
      y: center + radius * normalizedValue * Math.sin(angle),
    };
  };

  const dataPoints = data.map((d, i) => calculatePoint(d.value, i));
  const polygonPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  // Label positions (slightly outside the chart)
  const labelPoints = data.map((_, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    const labelRadius = radius + 30;
    return {
      x: center + labelRadius * Math.cos(angle),
      y: center + labelRadius * Math.sin(angle),
    };
  });

  const content = (
    <>
      {title && (
        <h3 className="text-xl font-bold mb-6 text-center" style={{ color: isDark ? '#fff' : '#000' }}>{title}</h3>
      )}

      <div className="flex justify-center">
        <svg width={size} height={size} className="overflow-visible">
          <defs>
            {/* Gradient fill */}
            <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0.1" />
            </radialGradient>
            {/* Glow */}
            <filter id={glowId}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid levels */}
          {Array.from({ length: levels }).map((_, levelIndex) => {
            const levelRadius = (radius / levels) * (levelIndex + 1);
            const levelPoints = data.map((_, i) => {
              const angle = angleSlice * i - Math.PI / 2;
              return {
                x: center + levelRadius * Math.cos(angle),
                y: center + levelRadius * Math.sin(angle),
              };
            });
            const levelPath = levelPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

            return (
              <motion.path
                key={levelIndex}
                d={levelPath}
                fill="none"
                stroke={gridColor}
                strokeWidth={1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: levelIndex * 0.1 }}
              />
            );
          })}

          {/* Axis lines */}
          {data.map((_, i) => {
            const angle = angleSlice * i - Math.PI / 2;
            const endX = center + radius * Math.cos(angle);
            const endY = center + radius * Math.sin(angle);

            return (
              <motion.line
                key={i}
                x1={center}
                y1={center}
                x2={endX}
                y2={endY}
                stroke={gridColor}
                strokeWidth={1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              />
            );
          })}

          {/* Data polygon - filled */}
          <motion.path
            d={polygonPath}
            fill={`url(#${gradientId})`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: 'backOut' }}
            style={{ transformOrigin: 'center' }}
          />

          {/* Data polygon - stroke */}
          <motion.path
            d={polygonPath}
            fill="none"
            stroke={accentColor}
            strokeWidth={2.5}
            strokeLinejoin="round"
            filter={`url(#${glowId})`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Data points */}
          {dataPoints.map((point, i) => (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={5}
              fill={accentColor}
              stroke={pointStroke}
              strokeWidth={2}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + i * 0.08, type: 'spring', stiffness: 200 }}
            />
          ))}

          {/* Labels */}
          {showLabels && labelPoints.map((point, i) => (
            <motion.text
              key={i}
              x={point.x}
              y={point.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-medium"
              style={{ fill: fillLabelColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.05 }}
            >
              {data[i].axis}
            </motion.text>
          ))}
        </svg>
      </div>

      {/* Legend with values */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {data.map((item, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + i * 0.05 }}
          >
            <span className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>{item.axis}:</span>
            <span className="text-sm font-bold" style={{ color: isDark ? '#fff' : '#000' }}>{item.value}</span>
          </motion.div>
        ))}
      </div>
    </>
  );

  if (isDark) {
    return (
      <div className="bg-white p-8">
        <div className="bg-black rounded-2xl p-8">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8">
      {content}
    </div>
  );
}

export default RadarChart;
