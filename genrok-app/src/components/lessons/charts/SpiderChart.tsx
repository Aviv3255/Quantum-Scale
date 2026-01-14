'use client';

import { motion } from 'framer-motion';

interface SpiderChartProps {
  data: { label: string; value: number }[];
  maxValue?: number;
  title?: string;
  accentColor?: string;
  fillOpacity?: number;
}

export function SpiderChart({
  data,
  maxValue,
  title,
  accentColor = '#88da1c',
  fillOpacity = 0.3,
}: SpiderChartProps) {
  const width = 400;
  const height = 400;
  const cx = width / 2;
  const cy = height / 2;
  const radius = 150;

  const effectiveMax = maxValue || Math.max(...data.map(d => d.value));
  const angleStep = (2 * Math.PI) / data.length;

  const getPoint = (index: number, value: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / effectiveMax) * radius;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  // Create polygon path
  const polygonPath = data
    .map((d, i) => {
      const point = getPoint(i, d.value);
      return i === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`;
    })
    .join(' ') + ' Z';

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-8 w-full max-w-lg">
        {title && (
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold text-white text-center mb-4"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {title}
          </motion.h3>
        )}

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
          {/* Grid polygons */}
          {[0.25, 0.5, 0.75, 1].map((ratio, gridIndex) => {
            const gridPath = data
              .map((_, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const r = radius * ratio;
                const x = cx + r * Math.cos(angle);
                const y = cy + r * Math.sin(angle);
                return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
              })
              .join(' ') + ' Z';

            return (
              <motion.path
                key={gridIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * gridIndex }}
                d={gridPath}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            );
          })}

          {/* Axis lines */}
          {data.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const endX = cx + radius * Math.cos(angle);
            const endY = cy + radius * Math.sin(angle);

            return (
              <motion.line
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.03 }}
                x1={cx}
                y1={cy}
                x2={endX}
                y2={endY}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            );
          })}

          {/* Data polygon fill */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: fillOpacity }}
            transition={{ delay: 0.3 }}
            d={polygonPath}
            fill={accentColor}
          />

          {/* Data polygon stroke */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            d={polygonPath}
            fill="none"
            stroke={accentColor}
            strokeWidth="3"
          />

          {/* Data points */}
          {data.map((d, i) => {
            const point = getPoint(i, d.value);

            return (
              <motion.circle
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                cx={point.x}
                cy={point.y}
                r="6"
                fill={accentColor}
              />
            );
          })}

          {/* Labels */}
          {data.map((d, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const labelRadius = radius + 30;
            const x = cx + labelRadius * Math.cos(angle);
            const y = cy + labelRadius * Math.sin(angle);

            return (
              <motion.text
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.03 }}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="11"
              >
                {d.label}
              </motion.text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default SpiderChart;
