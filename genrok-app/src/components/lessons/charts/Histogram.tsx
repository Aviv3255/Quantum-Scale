'use client';

import { motion } from 'framer-motion';

interface HistogramProps {
  data: number[];
  bins?: number;
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  accentColor?: string;
}

export function Histogram({
  data,
  bins = 10,
  title,
  xAxisLabel,
  yAxisLabel = 'Frequency',
  accentColor = '#88da1c',
}: HistogramProps) {
  const width = 500;
  const height = 300;
  const padding = 50;

  // Calculate histogram bins
  const min = Math.min(...data);
  const max = Math.max(...data);
  const binWidth = (max - min) / bins;

  const histogram: { start: number; end: number; count: number }[] = [];
  for (let i = 0; i < bins; i++) {
    const start = min + i * binWidth;
    const end = start + binWidth;
    const count = data.filter(
      d => d >= start && (i === bins - 1 ? d <= end : d < end)
    ).length;
    histogram.push({ start, end, count });
  }

  const maxCount = Math.max(...histogram.map(b => b.count));
  const barWidth = (width - 2 * padding) / bins - 2;

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

          {/* Axes */}
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />

          {/* Bars */}
          {histogram.map((bin, i) => {
            const barHeight = (bin.count / maxCount) * (height - 2 * padding);
            const x = padding + i * ((width - 2 * padding) / bins) + 1;
            const y = height - padding - barHeight;

            return (
              <motion.rect
                key={i}
                initial={{ height: 0, y: height - padding }}
                animate={{ height: barHeight, y }}
                transition={{ delay: 0.1 + i * 0.03, duration: 0.5 }}
                x={x}
                width={barWidth}
                fill={accentColor}
                rx="2"
              />
            );
          })}

          {/* X axis labels */}
          {histogram.map((bin, i) => (
            <text
              key={`label-${i}`}
              x={padding + (i + 0.5) * ((width - 2 * padding) / bins)}
              y={height - padding + 20}
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize="9"
            >
              {bin.start.toFixed(0)}
            </text>
          ))}

          {/* Axis labels */}
          {xAxisLabel && (
            <text
              x={width / 2}
              y={height - 5}
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize="12"
            >
              {xAxisLabel}
            </text>
          )}
          {yAxisLabel && (
            <text
              x={15}
              y={height / 2}
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize="12"
              transform={`rotate(-90, 15, ${height / 2})`}
            >
              {yAxisLabel}
            </text>
          )}
        </svg>
      </div>
    </div>
  );
}

export default Histogram;
