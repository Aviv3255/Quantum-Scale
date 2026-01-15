'use client';

import { motion } from 'framer-motion';

interface CircularBarChartProps {
  data: { label: string; value: number; color?: string }[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function CircularBarChart({
  data,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: CircularBarChartProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const centerFill = isDark ? 'white' : 'black';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
  const mutedFill = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const gridStroke = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  const width = 400;
  const height = 400;
  const cx = width / 2;
  const cy = height / 2;
  const innerRadius = 60;
  const maxRadius = 170;

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'];

  const maxValue = Math.max(...data.map(d => d.value));
  const angleStep = (2 * Math.PI) / data.length;
  const barWidth = angleStep * 0.7;
  const barGap = angleStep * 0.15;

  const createArcPath = (startAngle: number, endAngle: number, innerR: number, outerR: number) => {
    const startOuter = {
      x: cx + outerR * Math.cos(startAngle),
      y: cy + outerR * Math.sin(startAngle),
    };
    const endOuter = {
      x: cx + outerR * Math.cos(endAngle),
      y: cy + outerR * Math.sin(endAngle),
    };
    const startInner = {
      x: cx + innerR * Math.cos(endAngle),
      y: cy + innerR * Math.sin(endAngle),
    };
    const endInner = {
      x: cx + innerR * Math.cos(startAngle),
      y: cy + innerR * Math.sin(startAngle),
    };

    return `
      M ${startOuter.x} ${startOuter.y}
      A ${outerR} ${outerR} 0 0 1 ${endOuter.x} ${endOuter.y}
      L ${startInner.x} ${startInner.y}
      A ${innerR} ${innerR} 0 0 0 ${endInner.x} ${endInner.y}
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
        {/* Circular grid */}
        {[0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <motion.circle
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 * i }}
            cx={cx}
            cy={cy}
            r={innerRadius + ratio * (maxRadius - innerRadius)}
            fill="none"
            stroke={gridStroke}
            strokeWidth="1"
          />
        ))}

        {/* Bars */}
        {data.map((d, i) => {
          const startAngle = i * angleStep - Math.PI / 2 + barGap;
          const endAngle = startAngle + barWidth;
          const barRadius = innerRadius + (d.value / maxValue) * (maxRadius - innerRadius);
          const color = d.color || colors[i % colors.length];

          const labelAngle = i * angleStep - Math.PI / 2 + angleStep / 2;
          const labelRadius = maxRadius + 20;

          return (
            <motion.g key={i}>
              {/* Bar */}
              <motion.path
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.05, type: 'spring' }}
                d={createArcPath(startAngle, endAngle, innerRadius, barRadius)}
                fill={color}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />

              {/* Label */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                x={cx + labelRadius * Math.cos(labelAngle)}
                y={cy + labelRadius * Math.sin(labelAngle)}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={labelFill}
                fontSize="10"
              >
                {d.label}
              </motion.text>

              {/* Value */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 + i * 0.05 }}
                x={cx + (innerRadius + barRadius) / 2 * Math.cos((startAngle + endAngle) / 2)}
                y={cy + (innerRadius + barRadius) / 2 * Math.sin((startAngle + endAngle) / 2)}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="10"
                fontWeight="bold"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
              >
                {d.value}
              </motion.text>
            </motion.g>
          );
        })}

        {/* Center value */}
        <motion.text
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={centerFill}
          fontSize="20"
          fontWeight="bold"
        >
          {data.reduce((sum, d) => sum + d.value, 0)}
        </motion.text>
        <motion.text
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          x={cx}
          y={cy + 20}
          textAnchor="middle"
          fill={mutedFill}
          fontSize="10"
        >
          Total
        </motion.text>
      </svg>
    </>
  );

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      {isDark ? (
        <div className="bg-black rounded-2xl p-8 w-full max-w-lg">{content}</div>
      ) : (
        <div className="w-full max-w-lg">{content}</div>
      )}
    </div>
  );
}

export default CircularBarChart;
