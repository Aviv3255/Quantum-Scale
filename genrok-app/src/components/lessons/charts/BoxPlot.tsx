'use client';

import { motion } from 'framer-motion';

interface BoxPlotData {
  label: string;
  values: number[];
}

interface BoxPlotProps {
  data: BoxPlotData[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

function calculateStats(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const min = sorted[0];
  const max = sorted[n - 1];
  const q1 = sorted[Math.floor(n * 0.25)];
  const median = sorted[Math.floor(n * 0.5)];
  const q3 = sorted[Math.floor(n * 0.75)];
  const iqr = q3 - q1;
  const lowerWhisker = Math.max(min, q1 - 1.5 * iqr);
  const upperWhisker = Math.min(max, q3 + 1.5 * iqr);
  const outliers = sorted.filter(v => v < lowerWhisker || v > upperWhisker);

  return { min, max, q1, median, q3, lowerWhisker, upperWhisker, outliers };
}

export function BoxPlot({
  data,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: BoxPlotProps) {
  const isDark = variant === 'dark';
  const width = 500;
  const height = 300;
  const padding = 60;

  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const gridStroke = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const axisStroke = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
  const pointFill = isDark ? '#000' : '#fff';

  const allValues = data.flatMap(d => d.values);
  const globalMin = Math.min(...allValues);
  const globalMax = Math.max(...allValues);

  const scaleY = (val: number) =>
    height - padding - ((val - globalMin) / (globalMax - globalMin)) * (height - 2 * padding);

  const boxWidth = Math.min(60, (width - 2 * padding) / data.length - 20);

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

        {/* Y axis */}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke={axisStroke}
          strokeWidth="2"
        />

        {/* Box plots */}
        {data.map((d, i) => {
          const stats = calculateStats(d.values);
          const centerX = padding + ((i + 0.5) * (width - 2 * padding)) / data.length;

          return (
            <motion.g key={i}>
              {/* Whiskers */}
              <motion.line
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                x1={centerX}
                y1={scaleY(stats.lowerWhisker)}
                x2={centerX}
                y2={scaleY(stats.q1)}
                stroke={mutedColor}
                strokeWidth="2"
              />
              <motion.line
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                x1={centerX}
                y1={scaleY(stats.q3)}
                x2={centerX}
                y2={scaleY(stats.upperWhisker)}
                stroke={mutedColor}
                strokeWidth="2"
              />

              {/* Whisker caps */}
              <motion.line
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                x1={centerX - boxWidth / 4}
                y1={scaleY(stats.lowerWhisker)}
                x2={centerX + boxWidth / 4}
                y2={scaleY(stats.lowerWhisker)}
                stroke={mutedColor}
                strokeWidth="2"
              />
              <motion.line
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                x1={centerX - boxWidth / 4}
                y1={scaleY(stats.upperWhisker)}
                x2={centerX + boxWidth / 4}
                y2={scaleY(stats.upperWhisker)}
                stroke={mutedColor}
                strokeWidth="2"
              />

              {/* Box */}
              <motion.rect
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.15 + i * 0.1 }}
                x={centerX - boxWidth / 2}
                y={scaleY(stats.q3)}
                width={boxWidth}
                height={scaleY(stats.q1) - scaleY(stats.q3)}
                fill={`${accentColor}40`}
                stroke={accentColor}
                strokeWidth="2"
                rx="4"
              />

              {/* Median line */}
              <motion.line
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.35 + i * 0.1 }}
                x1={centerX - boxWidth / 2}
                y1={scaleY(stats.median)}
                x2={centerX + boxWidth / 2}
                y2={scaleY(stats.median)}
                stroke={accentColor}
                strokeWidth="3"
              />

              {/* Outliers */}
              {stats.outliers.map((o, j) => (
                <motion.circle
                  key={j}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 + j * 0.02 }}
                  cx={centerX}
                  cy={scaleY(o)}
                  r="4"
                  fill={pointFill}
                  stroke={mutedColor}
                  strokeWidth="2"
                />
              ))}

              {/* Label */}
              <text
                x={centerX}
                y={height - padding + 25}
                textAnchor="middle"
                fill={labelFill}
                fontSize="12"
              >
                {d.label}
              </text>
            </motion.g>
          );
        })}
      </svg>
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

export default BoxPlot;
