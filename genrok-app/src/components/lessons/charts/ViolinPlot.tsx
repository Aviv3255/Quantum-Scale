'use client';

import { motion } from 'framer-motion';

interface ViolinPlotData {
  label: string;
  values: number[];
}

interface ViolinPlotProps {
  data: ViolinPlotData[];
  title?: string;
  accentColor?: string;
}

function kernelDensity(values: number[], bandwidth: number, points: number) {
  const sorted = [...values].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const step = (max - min) / points;
  const density: { y: number; density: number }[] = [];

  for (let i = 0; i <= points; i++) {
    const y = min + i * step;
    let sum = 0;
    for (const v of values) {
      const u = (y - v) / bandwidth;
      sum += Math.exp(-0.5 * u * u) / Math.sqrt(2 * Math.PI);
    }
    density.push({ y, density: sum / (values.length * bandwidth) });
  }

  return density;
}

export function ViolinPlot({
  data,
  title,
  accentColor = '#88da1c',
}: ViolinPlotProps) {
  const width = 500;
  const height = 300;
  const padding = 60;

  const allValues = data.flatMap(d => d.values);
  const globalMin = Math.min(...allValues);
  const globalMax = Math.max(...allValues);

  const scaleY = (val: number) =>
    height - padding - ((val - globalMin) / (globalMax - globalMin)) * (height - 2 * padding);

  const violinWidth = Math.min(80, (width - 2 * padding) / data.length - 10);

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-8 w-full max-w-2xl">
        {title && (
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold text-white text-center mb-6"
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
              stroke="rgba(255,255,255,0.1)"
            />
          ))}

          {/* Y axis */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />

          {/* Violins */}
          {data.map((d, i) => {
            const bandwidth = (Math.max(...d.values) - Math.min(...d.values)) / 10;
            const density = kernelDensity(d.values, bandwidth, 30);
            const maxDensity = Math.max(...density.map(p => p.density));
            const centerX = padding + ((i + 0.5) * (width - 2 * padding)) / data.length;

            const pathLeft = density
              .map((p, j) => {
                const x = centerX - (p.density / maxDensity) * (violinWidth / 2);
                const y = scaleY(p.y);
                return j === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
              })
              .join(' ');

            const pathRight = density
              .reverse()
              .map((p) => {
                const x = centerX + (p.density / maxDensity) * (violinWidth / 2);
                const y = scaleY(p.y);
                return `L ${x} ${y}`;
              })
              .join(' ');

            const sorted = [...d.values].sort((a, b) => a - b);
            const median = sorted[Math.floor(sorted.length / 2)];
            const q1 = sorted[Math.floor(sorted.length * 0.25)];
            const q3 = sorted[Math.floor(sorted.length * 0.75)];

            return (
              <motion.g key={i}>
                {/* Violin shape */}
                <motion.path
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  d={`${pathLeft} ${pathRight} Z`}
                  fill={`${accentColor}30`}
                  stroke={accentColor}
                  strokeWidth="2"
                />

                {/* Box plot inside */}
                <motion.rect
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  x={centerX - 8}
                  y={scaleY(q3)}
                  width={16}
                  height={scaleY(q1) - scaleY(q3)}
                  fill={accentColor}
                  rx="2"
                />

                {/* Median dot */}
                <motion.circle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  cx={centerX}
                  cy={scaleY(median)}
                  r="4"
                  fill="white"
                />

                {/* Label */}
                <text
                  x={centerX}
                  y={height - padding + 25}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="12"
                >
                  {d.label}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default ViolinPlot;
