'use client';

import { motion } from 'framer-motion';

interface RetentionData {
  day: number;
  retention: number;
}

interface RetentionCurveProps {
  data?: RetentionData[];
  benchmarkData?: RetentionData[];
  title?: string;
  accentColor?: string;
  benchmarkColor?: string;
  variant?: 'dark' | 'light';
}

const defaultData: RetentionData[] = [
  { day: 0, retention: 100 },
  { day: 1, retention: 65 },
  { day: 3, retention: 45 },
  { day: 7, retention: 32 },
  { day: 14, retention: 25 },
  { day: 21, retention: 20 },
  { day: 30, retention: 18 },
  { day: 60, retention: 15 },
  { day: 90, retention: 12 },
];

const defaultBenchmark: RetentionData[] = [
  { day: 0, retention: 100 },
  { day: 1, retention: 55 },
  { day: 3, retention: 35 },
  { day: 7, retention: 22 },
  { day: 14, retention: 15 },
  { day: 21, retention: 12 },
  { day: 30, retention: 10 },
  { day: 60, retention: 8 },
  { day: 90, retention: 6 },
];

export function RetentionCurve({
  data = defaultData,
  benchmarkData = defaultBenchmark,
  title = 'User Retention Over Time',
  accentColor = '#88da1c',
  benchmarkColor = '#666666',
  variant = 'dark',
}: RetentionCurveProps) {
  const isDark = variant === 'dark';
  const width = 500;
  const height = 300;
  const padding = 60;

  const textColor = isDark ? 'text-white' : 'text-black';
  const gridStroke = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const axisStroke = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';

  const maxDay = Math.max(...data.map(d => d.day));
  const scaleX = (day: number) => padding + (day / maxDay) * (width - 2 * padding);
  const scaleY = (ret: number) => height - padding - (ret / 100) * (height - 2 * padding);

  const createPath = (points: RetentionData[]) => {
    return points
      .map((point, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(point.day)} ${scaleY(point.retention)}`)
      .join(' ');
  };

  const createAreaPath = (points: RetentionData[]) => {
    const path = createPath(points);
    return `${path} L ${scaleX(maxDay)} ${scaleY(0)} L ${scaleX(0)} ${scaleY(0)} Z`;
  };

  const mainPath = createPath(data);
  const mainArea = createAreaPath(data);
  const benchmarkPath = createPath(benchmarkData);

  // Calculate key metrics
  const d1Retention = data.find(d => d.day === 1)?.retention || 0;
  const d7Retention = data.find(d => d.day === 7)?.retention || 0;
  const d30Retention = data.find(d => d.day === 30)?.retention || 0;

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

      <svg viewBox={`0 0 ${width} ${height + 60}`} className="w-full">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((pct, i) => (
          <motion.g key={i}>
            <motion.line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.03 * i }}
              x1={padding}
              y1={scaleY(pct)}
              x2={width - padding}
              y2={scaleY(pct)}
              stroke={gridStroke}
            />
            <text
              x={padding - 10}
              y={scaleY(pct) + 4}
              textAnchor="end"
              fill={labelFill}
              fontSize="10"
            >
              {pct}%
            </text>
          </motion.g>
        ))}

        {/* X-axis labels */}
        {[0, 7, 30, 60, 90].map((day, i) => (
          <text
            key={i}
            x={scaleX(day)}
            y={height - padding + 20}
            textAnchor="middle"
            fill={labelFill}
            fontSize="10"
          >
            D{day}
          </text>
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

        {/* Benchmark area */}
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          d={createAreaPath(benchmarkData)}
          fill={benchmarkColor}
        />

        {/* Main area */}
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          d={mainArea}
          fill={accentColor}
        />

        {/* Benchmark line */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          d={benchmarkPath}
          fill="none"
          stroke={benchmarkColor}
          strokeWidth="2"
          strokeDasharray="6 3"
        />

        {/* Main line */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          d={mainPath}
          fill="none"
          stroke={accentColor}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Data points */}
        {data.map((point, i) => (
          <motion.circle
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 + i * 0.05 }}
            cx={scaleX(point.day)}
            cy={scaleY(point.retention)}
            r="5"
            fill={accentColor}
          />
        ))}

        {/* Key metrics */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          {/* D1 */}
          <rect
            x={padding + 20}
            y={height - padding + 35}
            width="60"
            height="45"
            fill={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}
            rx="6"
          />
          <text
            x={padding + 50}
            y={height - padding + 52}
            textAnchor="middle"
            fill={labelFill}
            fontSize="10"
          >
            D1
          </text>
          <text
            x={padding + 50}
            y={height - padding + 70}
            textAnchor="middle"
            fill={accentColor}
            fontSize="16"
            fontWeight="bold"
          >
            {d1Retention}%
          </text>

          {/* D7 */}
          <rect
            x={padding + 100}
            y={height - padding + 35}
            width="60"
            height="45"
            fill={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}
            rx="6"
          />
          <text
            x={padding + 130}
            y={height - padding + 52}
            textAnchor="middle"
            fill={labelFill}
            fontSize="10"
          >
            D7
          </text>
          <text
            x={padding + 130}
            y={height - padding + 70}
            textAnchor="middle"
            fill={accentColor}
            fontSize="16"
            fontWeight="bold"
          >
            {d7Retention}%
          </text>

          {/* D30 */}
          <rect
            x={padding + 180}
            y={height - padding + 35}
            width="60"
            height="45"
            fill={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}
            rx="6"
          />
          <text
            x={padding + 210}
            y={height - padding + 52}
            textAnchor="middle"
            fill={labelFill}
            fontSize="10"
          >
            D30
          </text>
          <text
            x={padding + 210}
            y={height - padding + 70}
            textAnchor="middle"
            fill={accentColor}
            fontSize="16"
            fontWeight="bold"
          >
            {d30Retention}%
          </text>
        </motion.g>

        {/* Legend */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <line
            x1={width - padding - 120}
            y1={padding + 10}
            x2={width - padding - 100}
            y2={padding + 10}
            stroke={accentColor}
            strokeWidth="3"
          />
          <text
            x={width - padding - 95}
            y={padding + 14}
            fill={labelFill}
            fontSize="10"
          >
            Your App
          </text>

          <line
            x1={width - padding - 120}
            y1={padding + 28}
            x2={width - padding - 100}
            y2={padding + 28}
            stroke={benchmarkColor}
            strokeWidth="2"
            strokeDasharray="6 3"
          />
          <text
            x={width - padding - 95}
            y={padding + 32}
            fill={labelFill}
            fontSize="10"
          >
            Industry Avg
          </text>
        </motion.g>
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

export default RetentionCurve;
