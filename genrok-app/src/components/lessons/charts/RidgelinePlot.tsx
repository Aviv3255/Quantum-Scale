'use client';

import { motion } from 'framer-motion';

interface RidgelineData {
  label: string;
  values: number[];
  color?: string;
}

interface RidgelinePlotProps {
  data: RidgelineData[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

function kernelDensity(values: number[], bandwidth: number, min: number, max: number, points: number) {
  const step = (max - min) / points;
  const density: { x: number; y: number }[] = [];

  for (let i = 0; i <= points; i++) {
    const x = min + i * step;
    let sum = 0;
    for (const v of values) {
      const u = (x - v) / bandwidth;
      sum += Math.exp(-0.5 * u * u) / Math.sqrt(2 * Math.PI);
    }
    density.push({ x, y: sum / (values.length * bandwidth) });
  }

  return density;
}

export function RidgelinePlot({
  data,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: RidgelinePlotProps) {
  const isDark = variant === 'dark';
  const mutedFill = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
  const axisStroke = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';

  const width = 500;
  const height = 400;
  const padding = { top: 30, right: 30, bottom: 40, left: 80 };

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'];

  const allValues = data.flatMap(d => d.values);
  const globalMin = Math.min(...allValues);
  const globalMax = Math.max(...allValues);
  const bandwidth = (globalMax - globalMin) / 15;

  const rowHeight = (height - padding.top - padding.bottom) / data.length;
  const overlap = 0.5; // How much rows overlap

  const scaleX = (val: number) =>
    padding.left + ((val - globalMin) / (globalMax - globalMin)) * (width - padding.left - padding.right);

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
        {/* Ridgelines */}
        {data.map((series, i) => {
          const density = kernelDensity(series.values, bandwidth, globalMin, globalMax, 50);
          const maxDensity = Math.max(...density.map(d => d.y));
          const baseY = padding.top + i * rowHeight * (1 - overlap) + rowHeight;
          const color = series.color || colors[i % colors.length];

          const areaPath = density
            .map((d, j) => {
              const x = scaleX(d.x);
              const y = baseY - (d.y / maxDensity) * rowHeight * 0.8;
              return j === 0 ? `M ${x} ${baseY} L ${x} ${y}` : `L ${x} ${y}`;
            })
            .join(' ') + ` L ${scaleX(globalMax)} ${baseY} Z`;

          return (
            <motion.g key={i}>
              <motion.path
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 0.8, scaleY: 1 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                d={areaPath}
                fill={color}
                style={{ transformOrigin: `center ${baseY}px` }}
              />

              {/* Label */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                x={padding.left - 10}
                y={baseY - rowHeight * 0.4}
                textAnchor="end"
                fill={labelFill}
                fontSize="11"
              >
                {series.label}
              </motion.text>
            </motion.g>
          );
        })}

        {/* X axis */}
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke={axisStroke}
          strokeWidth="2"
        />

        {/* X axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const value = globalMin + ratio * (globalMax - globalMin);
          return (
            <text
              key={i}
              x={scaleX(value)}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              fill={mutedFill}
              fontSize="10"
            >
              {value.toFixed(0)}
            </text>
          );
        })}
      </svg>
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

export default RidgelinePlot;
