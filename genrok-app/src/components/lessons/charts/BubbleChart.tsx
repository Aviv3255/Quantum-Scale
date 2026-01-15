'use client';

import { motion } from 'framer-motion';

interface BubbleData {
  x: number;
  y: number;
  size: number;
  label?: string;
  color?: string;
}

interface BubbleChartProps {
  data: BubbleData[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function BubbleChart({
  data,
  title,
  xAxisLabel,
  yAxisLabel,
  accentColor = '#88da1c',
  variant = 'dark',
}: BubbleChartProps) {
  const isDark = variant === 'dark';
  const width = 500;
  const height = 300;
  const padding = 50;

  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const gridStroke = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const axisStroke = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  const labelFill = isDark ? 'white' : 'black';

  const xValues = data.map(d => d.x);
  const yValues = data.map(d => d.y);
  const sizeValues = data.map(d => d.size);

  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);
  const sizeMin = Math.min(...sizeValues);
  const sizeMax = Math.max(...sizeValues);

  const scaleX = (val: number) =>
    padding + ((val - xMin) / (xMax - xMin)) * (width - 2 * padding);
  const scaleY = (val: number) =>
    height - padding - ((val - yMin) / (yMax - yMin)) * (height - 2 * padding);
  const scaleSize = (val: number) =>
    10 + ((val - sizeMin) / (sizeMax - sizeMin)) * 30;

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
        {/* Grid */}
        {[0, 25, 50, 75, 100].map((pct, i) => (
          <motion.line
            key={`grid-${i}`}
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

        {/* Bubbles */}
        {data.map((bubble, i) => (
          <motion.g key={i}>
            <motion.circle
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.7 }}
              transition={{ delay: 0.2 + i * 0.05, type: 'spring' }}
              cx={scaleX(bubble.x)}
              cy={scaleY(bubble.y)}
              r={scaleSize(bubble.size)}
              fill={bubble.color || accentColor}
            />
            {bubble.label && (
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                x={scaleX(bubble.x)}
                y={scaleY(bubble.y) + 4}
                textAnchor="middle"
                fill={labelFill}
                fontSize="10"
                fontWeight="bold"
              >
                {bubble.label}
              </motion.text>
            )}
          </motion.g>
        ))}

        {/* Axis labels */}
        {xAxisLabel && (
          <text
            x={width / 2}
            y={height - 10}
            textAnchor="middle"
            fill={mutedColor}
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
            fill={mutedColor}
            fontSize="12"
            transform={`rotate(-90, 15, ${height / 2})`}
          >
            {yAxisLabel}
          </text>
        )}
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

export default BubbleChart;
