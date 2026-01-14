'use client';

import { motion } from 'framer-motion';

interface DensityPlotData {
  label: string;
  values: number[];
  color?: string;
}

interface DensityPlotProps {
  data: DensityPlotData[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

function kernelDensity(values: number[], bandwidth: number, min: number, max: number, points: number) {
  const step = (max - min) / points;
  const density: { x: number; density: number }[] = [];

  for (let i = 0; i <= points; i++) {
    const x = min + i * step;
    let sum = 0;
    for (const v of values) {
      const u = (x - v) / bandwidth;
      sum += Math.exp(-0.5 * u * u) / Math.sqrt(2 * Math.PI);
    }
    density.push({ x, density: sum / (values.length * bandwidth) });
  }

  return density;
}

export function DensityPlot({
  data,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: DensityPlotProps) {
  const isDark = variant === 'dark';
  const width = 500;
  const height = 300;
  const padding = 50;

  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedTextColor = isDark ? 'text-white/70' : 'text-black/70';
  const gridStroke = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const axisStroke = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';

  const allValues = data.flatMap(d => d.values);
  const globalMin = Math.min(...allValues);
  const globalMax = Math.max(...allValues);
  const bandwidth = (globalMax - globalMin) / 15;

  const densities = data.map(d => ({
    ...d,
    density: kernelDensity(d.values, bandwidth, globalMin, globalMax, 50),
  }));

  const maxDensity = Math.max(...densities.flatMap(d => d.density.map(p => p.density)));

  const scaleX = (val: number) =>
    padding + ((val - globalMin) / (globalMax - globalMin)) * (width - 2 * padding);
  const scaleY = (val: number) =>
    height - padding - (val / maxDensity) * (height - 2 * padding);

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B'];

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xl font-bold ${textColor} text-center mb-6`}
          style={{ fontFamily: "'General Sans', sans-serif" }}
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
            stroke={gridStroke}
          />
        ))}

        {/* Axes */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke={axisStroke}
          strokeWidth="2"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke={axisStroke}
          strokeWidth="2"
        />

        {/* Density curves */}
        {densities.map((d, i) => {
          const color = d.color || colors[i % colors.length] || accentColor;
          const pathLine = d.density
            .map((p, j) => {
              const x = scaleX(p.x);
              const y = scaleY(p.density);
              return j === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
            })
            .join(' ');

          const pathArea = `${pathLine} L ${scaleX(globalMax)} ${height - padding} L ${scaleX(globalMin)} ${height - padding} Z`;

          return (
            <motion.g key={i}>
              <motion.path
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                d={pathArea}
                fill={color}
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 1 }}
                d={pathLine}
                fill="none"
                stroke={color}
                strokeWidth="3"
              />
            </motion.g>
          );
        })}
      </svg>

      {/* Legend */}
      {data.length > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-6 mt-4"
        >
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: d.color || colors[i % colors.length] || accentColor }}
              />
              <span className={`${mutedTextColor} text-sm`}>{d.label}</span>
            </div>
          ))}
        </motion.div>
      )}
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

export default DensityPlot;
