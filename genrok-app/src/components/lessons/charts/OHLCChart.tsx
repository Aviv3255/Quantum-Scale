'use client';

import { motion } from 'framer-motion';

interface OHLCData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface OHLCChartProps {
  data: OHLCData[];
  title?: string;
  upColor?: string;
  downColor?: string;
  variant?: 'dark' | 'light';
}

export function OHLCChart({
  data,
  title,
  upColor = '#22C55E',
  downColor = '#EF4444',
  variant = 'dark',
}: OHLCChartProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/70' : 'text-black/70';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const axisColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  const labelFill = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';

  const width = 500;
  const height = 300;
  const padding = 50;

  const allPrices = data.flatMap(d => [d.open, d.high, d.low, d.close]);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  const scaleY = (val: number) =>
    height - padding - ((val - minPrice) / (maxPrice - minPrice)) * (height - 2 * padding);

  const barSpacing = (width - 2 * padding) / data.length;
  const tickWidth = Math.min(8, barSpacing / 3);

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
            stroke={gridColor}
          />
        ))}

        {/* Y axis */}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke={axisColor}
          strokeWidth="2"
        />

        {/* OHLC bars */}
        {data.map((bar, i) => {
          const isUp = bar.close >= bar.open;
          const color = isUp ? upColor : downColor;
          const centerX = padding + (i + 0.5) * barSpacing;

          return (
            <motion.g key={i}>
              {/* High-Low line */}
              <motion.line
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.1 + i * 0.02 }}
                x1={centerX}
                y1={scaleY(bar.high)}
                x2={centerX}
                y2={scaleY(bar.low)}
                stroke={color}
                strokeWidth="2"
              />

              {/* Open tick (left) */}
              <motion.line
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.15 + i * 0.02 }}
                x1={centerX - tickWidth}
                y1={scaleY(bar.open)}
                x2={centerX}
                y2={scaleY(bar.open)}
                stroke={color}
                strokeWidth="2"
              />

              {/* Close tick (right) */}
              <motion.line
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.15 + i * 0.02 }}
                x1={centerX}
                y1={scaleY(bar.close)}
                x2={centerX + tickWidth}
                y2={scaleY(bar.close)}
                stroke={color}
                strokeWidth="2"
              />
            </motion.g>
          );
        })}

        {/* Y axis labels */}
        {[0, 0.5, 1].map((pct, i) => {
          const value = minPrice + pct * (maxPrice - minPrice);
          return (
            <text
              key={i}
              x={padding - 10}
              y={scaleY(value) + 4}
              textAnchor="end"
              fill={labelFill}
              fontSize="10"
            >
              ${value.toFixed(0)}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center gap-6 mt-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5" style={{ backgroundColor: upColor }} />
          <span className={`${mutedColor} text-sm`}>Up</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5" style={{ backgroundColor: downColor }} />
          <span className={`${mutedColor} text-sm`}>Down</span>
        </div>
      </motion.div>
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

export default OHLCChart;
