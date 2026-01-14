'use client';

import { motion } from 'framer-motion';

interface RunChartProps {
  data: { label: string; value: number }[];
  title?: string;
  showMedian?: boolean;
  showRuns?: boolean;
  accentColor?: string;
}

export function RunChart({
  data,
  title,
  showMedian = true,
  showRuns = true,
  accentColor = '#88da1c',
}: RunChartProps) {
  const width = 500;
  const height = 300;
  const padding = 50;

  const values = data.map(d => d.value);
  const sortedValues = [...values].sort((a, b) => a - b);
  const median = sortedValues[Math.floor(sortedValues.length / 2)];

  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);

  const scaleX = (index: number) =>
    padding + (index * (width - 2 * padding)) / (data.length - 1);
  const scaleY = (val: number) =>
    height - padding - ((val - minValue) / (maxValue - minValue)) * (height - 2 * padding);

  const path = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(d.value)}`)
    .join(' ');

  // Calculate runs (consecutive points above or below median)
  const runs: { start: number; end: number; above: boolean }[] = [];
  let currentRun: { start: number; above: boolean } | null = null;

  data.forEach((d, i) => {
    const above = d.value > median;
    if (!currentRun || currentRun.above !== above) {
      if (currentRun) {
        runs.push({ ...currentRun, end: i - 1 });
      }
      currentRun = { start: i, above };
    }
    if (i === data.length - 1 && currentRun) {
      runs.push({ ...currentRun, end: i });
    }
  });

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
          {/* Grid */}
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

          {/* Run zones */}
          {showRuns &&
            runs.map((run, i) => (
              <motion.rect
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                x={scaleX(run.start) - 5}
                y={run.above ? padding : scaleY(median)}
                width={scaleX(run.end) - scaleX(run.start) + 10}
                height={(height - 2 * padding) / 2}
                fill={run.above ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'}
                rx="4"
              />
            ))}

          {/* Median line */}
          {showMedian && (
            <motion.line
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              x1={padding}
              y1={scaleY(median)}
              x2={width - padding}
              y2={scaleY(median)}
              stroke={accentColor}
              strokeWidth="2"
              strokeDasharray="8,4"
            />
          )}

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

          {/* Data line */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            d={path}
            fill="none"
            stroke="white"
            strokeWidth="2"
          />

          {/* Data points */}
          {data.map((d, i) => (
            <motion.circle
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + i * 0.03 }}
              cx={scaleX(i)}
              cy={scaleY(d.value)}
              r="4"
              fill={d.value > median ? '#22C55E' : '#EF4444'}
            />
          ))}

          {/* Median label */}
          {showMedian && (
            <text
              x={width - padding + 5}
              y={scaleY(median) + 4}
              fill={accentColor}
              fontSize="10"
            >
              Median
            </text>
          )}
        </svg>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-8 mt-4"
        >
          <div className="text-center">
            <p className="text-white/50 text-xs">Median</p>
            <p className="text-white font-bold">{median.toFixed(1)}</p>
          </div>
          <div className="text-center">
            <p className="text-white/50 text-xs">Total Runs</p>
            <p className="text-white font-bold">{runs.length}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default RunChart;
