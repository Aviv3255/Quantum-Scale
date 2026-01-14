'use client';

import { motion } from 'framer-motion';

interface PolarAreaChartProps {
  data: { label: string; value: number; color?: string }[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function PolarAreaChart({
  data,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: PolarAreaChartProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const labelColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
  const legendColor = isDark ? 'text-white/70' : 'text-black/70';

  const width = 400;
  const height = 400;
  const cx = width / 2;
  const cy = height / 2;
  const maxRadius = 150;

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444', '#EC4899'];

  const maxValue = Math.max(...data.map(d => d.value));
  const angleStep = (2 * Math.PI) / data.length;

  const createWedgePath = (index: number, radius: number) => {
    const startAngle = index * angleStep - Math.PI / 2;
    const endAngle = (index + 1) * angleStep - Math.PI / 2;

    const startX = cx + radius * Math.cos(startAngle);
    const startY = cy + radius * Math.sin(startAngle);
    const endX = cx + radius * Math.cos(endAngle);
    const endY = cy + radius * Math.sin(endAngle);

    return `
      M ${cx} ${cy}
      L ${startX} ${startY}
      A ${radius} ${radius} 0 0 1 ${endX} ${endY}
      Z
    `;
  };

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xl font-bold ${textColor} text-center mb-4`}
          style={{ fontFamily: "'General Sans', sans-serif" }}
        >
          {title}
        </motion.h3>
      )}

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        {/* Grid circles */}
        {[0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <motion.circle
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 * i }}
            cx={cx}
            cy={cy}
            r={maxRadius * ratio}
            fill="none"
            stroke={gridColor}
            strokeWidth="1"
          />
        ))}

        {/* Wedges */}
        {data.map((d, i) => {
          const radius = (d.value / maxValue) * maxRadius;
          const color = d.color || colors[i % colors.length];

          return (
            <motion.path
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              transition={{ delay: 0.1 + i * 0.08, type: 'spring' }}
              d={createWedgePath(i, radius)}
              fill={color}
              stroke="rgba(0,0,0,0.3)"
              strokeWidth="2"
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          );
        })}

        {/* Labels */}
        {data.map((d, i) => {
          const angle = (i + 0.5) * angleStep - Math.PI / 2;
          const labelRadius = maxRadius + 25;
          const x = cx + labelRadius * Math.cos(angle);
          const y = cy + labelRadius * Math.sin(angle);

          return (
            <motion.text
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={labelColor}
              fontSize="10"
            >
              {d.label}
            </motion.text>
          );
        })}
      </svg>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap justify-center gap-4 mt-4"
      >
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: d.color || colors[i % colors.length] }}
            />
            <span className={`${legendColor} text-xs`}>{d.value}</span>
          </div>
        ))}
      </motion.div>
    </>
  );

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      {isDark ? (
        <div className="bg-black rounded-2xl p-8 w-full max-w-lg">
          {content}
        </div>
      ) : (
        <div className="w-full max-w-lg">
          {content}
        </div>
      )}
    </div>
  );
}

export default PolarAreaChart;
