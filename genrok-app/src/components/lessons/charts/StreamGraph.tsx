'use client';

import { motion } from 'framer-motion';

interface StreamGraphSeries {
  label: string;
  values: number[];
  color?: string;
}

interface StreamGraphProps {
  data: StreamGraphSeries[];
  labels?: string[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function StreamGraph({
  data,
  labels,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: StreamGraphProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const mutedFill = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const legendTextClass = isDark ? 'text-white/70' : 'text-black/70';

  const width = 550;
  const height = 350;
  const padding = { top: 40, right: 30, bottom: 50, left: 30 };

  const colors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444', '#EC4899'];

  const periods = data[0]?.values.length || 0;

  // Calculate stacked values centered around baseline
  const stackedData: { top: number[]; bottom: number[] }[] = [];

  for (let i = 0; i < data.length; i++) {
    const series = data[i];
    const top: number[] = [];
    const bottom: number[] = [];

    for (let j = 0; j < periods; j++) {
      // Calculate total at this point
      const totalBefore = data.slice(0, i).reduce((sum, s) => sum + s.values[j], 0);
      const totalAfter = data.slice(i + 1).reduce((sum, s) => sum + s.values[j], 0);
      const total = data.reduce((sum, s) => sum + s.values[j], 0);

      // Center around middle
      const baseline = -total / 2;
      bottom.push(baseline + totalBefore);
      top.push(baseline + totalBefore + series.values[j]);
    }

    stackedData.push({ top, bottom });
  }

  // Find max extent for scaling
  const allValues = stackedData.flatMap(s => [...s.top, ...s.bottom]);
  const maxExtent = Math.max(...allValues.map(Math.abs));

  const scaleX = (index: number) =>
    padding.left + (index / (periods - 1)) * (width - padding.left - padding.right);
  const scaleY = (val: number) =>
    height / 2 - (val / maxExtent) * ((height - padding.top - padding.bottom) / 2);

  // Create smooth path
  const createStreamPath = (topValues: number[], bottomValues: number[]) => {
    const topPath = topValues
      .map((val, i) => {
        const x = scaleX(i);
        const y = scaleY(val);
        if (i === 0) return `M ${x} ${y}`;

        // Curve to next point
        const prevX = scaleX(i - 1);
        const cpX = (prevX + x) / 2;
        return `C ${cpX} ${scaleY(topValues[i - 1])}, ${cpX} ${y}, ${x} ${y}`;
      })
      .join(' ');

    const bottomPath = [...bottomValues]
      .reverse()
      .map((val, i) => {
        const actualIndex = bottomValues.length - 1 - i;
        const x = scaleX(actualIndex);
        const y = scaleY(val);

        if (i === 0) return `L ${x} ${y}`;

        const nextIndex = actualIndex + 1;
        const nextX = scaleX(nextIndex);
        const cpX = (x + nextX) / 2;
        return `C ${cpX} ${scaleY(bottomValues[nextIndex])}, ${cpX} ${y}, ${x} ${y}`;
      })
      .join(' ');

    return `${topPath} ${bottomPath} Z`;
  };

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
        {/* Streams */}
        {stackedData.map((stream, i) => {
          const color = data[i].color || colors[i % colors.length];

          return (
            <motion.path
              key={i}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 0.8, scaleY: 1 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              d={createStreamPath(stream.top, stream.bottom)}
              fill={color}
              style={{ transformOrigin: `center ${height / 2}px` }}
            />
          );
        })}

        {/* X axis labels */}
        {labels?.map((label, i) => (
          <motion.text
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.02 }}
            x={scaleX(i)}
            y={height - padding.bottom + 25}
            textAnchor="middle"
            fill={mutedFill}
            fontSize="10"
          >
            {label}
          </motion.text>
        ))}
      </svg>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex flex-wrap justify-center gap-4 mt-4"
      >
        {data.map((series, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: series.color || colors[i % colors.length] }}
            />
            <span className={`${legendTextClass} text-xs`}>{series.label}</span>
          </div>
        ))}
      </motion.div>
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

export default StreamGraph;
