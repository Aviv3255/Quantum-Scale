'use client';

import { motion } from 'framer-motion';

interface StepChartProps {
  data: { label: string; value: number }[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function StepChart({
  data,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: StepChartProps) {
  const isDark = variant === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const axisColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  const labelFill = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';

  const width = 500;
  const height = 300;
  const padding = 50;

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));

  const scaleX = (index: number) =>
    padding + (index * (width - 2 * padding)) / (data.length - 1);
  const scaleY = (val: number) =>
    height - padding - ((val - minValue) / (maxValue - minValue)) * (height - 2 * padding);

  // Build step path
  let path = '';
  data.forEach((d, i) => {
    const x = scaleX(i);
    const y = scaleY(d.value);
    if (i === 0) {
      path = `M ${x} ${y}`;
    } else {
      const prevX = scaleX(i - 1);
      path += ` L ${x} ${scaleY(data[i - 1].value)} L ${x} ${y}`;
    }
  });

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
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((pct, i) => (
          <motion.line
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 * i }}
            x1={padding}
            y1={padding + ((height - 2 * padding) * pct) / 100}
            x2={width - padding}
            y2={padding + ((height - 2 * padding) * pct) / 100}
            stroke={gridColor}
          />
        ))}

        {/* Axes */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke={axisColor}
          strokeWidth="2"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke={axisColor}
          strokeWidth="2"
        />

        {/* Step line */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          d={path}
          fill="none"
          stroke={accentColor}
          strokeWidth="3"
        />

        {/* Data points */}
        {data.map((d, i) => (
          <motion.circle
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            cx={scaleX(i)}
            cy={scaleY(d.value)}
            r="5"
            fill={accentColor}
          />
        ))}

        {/* X axis labels */}
        {data.map((d, i) => (
          <text
            key={i}
            x={scaleX(i)}
            y={height - padding + 20}
            textAnchor="middle"
            fill={labelFill}
            fontSize="10"
          >
            {d.label}
          </text>
        ))}
      </svg>
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

export default StepChart;
