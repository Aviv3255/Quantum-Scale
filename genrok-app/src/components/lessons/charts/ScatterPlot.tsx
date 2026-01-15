'use client';

import { motion } from 'framer-motion';

interface DataPoint {
  x: number;
  y: number;
  label?: string;
  size?: number;
}

interface ScatterPlotProps {
  data: DataPoint[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  accentColor?: string;
  showTrendLine?: boolean;
  variant?: 'dark' | 'light';
}

export function ScatterPlot({
  data,
  title,
  xAxisLabel,
  yAxisLabel,
  accentColor = '#88da1c',
  showTrendLine = false,
  variant = 'dark',
}: ScatterPlotProps) {
  const isDark = variant === 'dark';
  const width = 500;
  const height = 300;
  const padding = 50;

  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const gridStroke = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const axisStroke = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';

  const xValues = data.map(d => d.x);
  const yValues = data.map(d => d.y);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);

  const scaleX = (val: number) =>
    padding + ((val - xMin) / (xMax - xMin)) * (width - 2 * padding);
  const scaleY = (val: number) =>
    height - padding - ((val - yMin) / (yMax - yMin)) * (height - 2 * padding);

  // Calculate trend line using least squares
  const calculateTrendLine = () => {
    const n = data.length;
    const sumX = data.reduce((acc, d) => acc + d.x, 0);
    const sumY = data.reduce((acc, d) => acc + d.y, 0);
    const sumXY = data.reduce((acc, d) => acc + d.x * d.y, 0);
    const sumXX = data.reduce((acc, d) => acc + d.x * d.x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
  };

  const trendLine = showTrendLine ? calculateTrendLine() : null;

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
            key={`h-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.02 }}
            x1={padding}
            y1={padding + ((height - 2 * padding) * pct) / 100}
            x2={width - padding}
            y2={padding + ((height - 2 * padding) * pct) / 100}
            stroke={gridStroke}
            strokeWidth="1"
          />
        ))}

        {/* X axis */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke={axisStroke}
          strokeWidth="2"
        />

        {/* Y axis */}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke={axisStroke}
          strokeWidth="2"
        />

        {/* Trend line */}
        {trendLine && (
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            x1={scaleX(xMin)}
            y1={scaleY(trendLine.slope * xMin + trendLine.intercept)}
            x2={scaleX(xMax)}
            y2={scaleY(trendLine.slope * xMax + trendLine.intercept)}
            stroke={accentColor}
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        )}

        {/* Data points */}
        {data.map((point, i) => (
          <motion.circle
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.03, type: 'spring' }}
            cx={scaleX(point.x)}
            cy={scaleY(point.y)}
            r={point.size || 6}
            fill={accentColor}
          />
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

export default ScatterPlot;
