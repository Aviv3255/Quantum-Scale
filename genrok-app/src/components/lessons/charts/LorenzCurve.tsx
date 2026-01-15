'use client';

import { motion } from 'framer-motion';

interface LorenzPoint {
  population: number; // Cumulative % of population (x-axis)
  income: number; // Cumulative % of income (y-axis)
}

interface LorenzCurveProps {
  data?: LorenzPoint[];
  giniCoefficient?: number;
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

const defaultData: LorenzPoint[] = [
  { population: 0, income: 0 },
  { population: 10, income: 2 },
  { population: 20, income: 5 },
  { population: 30, income: 10 },
  { population: 40, income: 17 },
  { population: 50, income: 26 },
  { population: 60, income: 38 },
  { population: 70, income: 52 },
  { population: 80, income: 68 },
  { population: 90, income: 84 },
  { population: 100, income: 100 },
];

export function LorenzCurve({
  data = defaultData,
  giniCoefficient = 0.38,
  title = 'Lorenz Curve - Income Distribution',
  accentColor = '#88da1c',
  variant = 'dark',
}: LorenzCurveProps) {
  const isDark = variant === 'dark';
  const width = 400;
  const height = 400;
  const padding = 60;

  const mutedColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const gridStroke = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const axisStroke = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';

  const scaleX = (val: number) => padding + (val / 100) * (width - 2 * padding);
  const scaleY = (val: number) => height - padding - (val / 100) * (height - 2 * padding);

  const pathData = data
    .map((point, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(point.population)} ${scaleY(point.income)}`)
    .join(' ');

  // Area between equality line and Lorenz curve (for Gini visualization)
  const giniAreaPath = `M ${scaleX(0)} ${scaleY(0)} L ${scaleX(100)} ${scaleY(100)} L ${scaleX(100)} ${scaleY(100)} ${data.slice().reverse().map(point => `L ${scaleX(point.population)} ${scaleY(point.income)}`).join(' ')} Z`;

  const getGiniColor = (gini: number) => {
    if (gini < 0.3) return '#34C759';
    if (gini < 0.4) return '#88da1c';
    if (gini < 0.5) return '#FF9500';
    return '#FF3B30';
  };

  const getGiniLabel = (gini: number) => {
    if (gini < 0.25) return 'Very Low Inequality';
    if (gini < 0.35) return 'Low Inequality';
    if (gini < 0.45) return 'Moderate Inequality';
    if (gini < 0.55) return 'High Inequality';
    return 'Very High Inequality';
  };

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

      <svg viewBox={`0 0 ${width} ${height + 30}`} className="w-full max-w-md mx-auto">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((val, i) => (
          <motion.g key={i}>
            <motion.line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 * i }}
              x1={padding}
              y1={scaleY(val)}
              x2={width - padding}
              y2={scaleY(val)}
              stroke={gridStroke}
            />
            <motion.line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 * i }}
              x1={scaleX(val)}
              y1={padding}
              x2={scaleX(val)}
              y2={height - padding}
              stroke={gridStroke}
            />
            <text
              x={padding - 10}
              y={scaleY(val) + 4}
              textAnchor="end"
              fill={labelFill}
              fontSize="10"
            >
              {val}%
            </text>
            <text
              x={scaleX(val)}
              y={height - padding + 18}
              textAnchor="middle"
              fill={labelFill}
              fontSize="10"
            >
              {val}%
            </text>
          </motion.g>
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

        {/* Gini area (between equality line and Lorenz curve) */}
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          d={giniAreaPath}
          fill={getGiniColor(giniCoefficient)}
        />

        {/* Line of Perfect Equality (diagonal) */}
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          x1={scaleX(0)}
          y1={scaleY(0)}
          x2={scaleX(100)}
          y2={scaleY(100)}
          stroke={mutedColor}
          strokeWidth="2"
          strokeDasharray="8 4"
        />

        {/* Lorenz curve */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          d={pathData}
          fill="none"
          stroke={accentColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {data.map((point, i) => (
          <motion.circle
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 + i * 0.04 }}
            cx={scaleX(point.population)}
            cy={scaleY(point.income)}
            r="4"
            fill={accentColor}
          />
        ))}

        {/* Axis labels */}
        <text
          x={width / 2}
          y={height - 15}
          textAnchor="middle"
          fill={labelFill}
          fontSize="11"
        >
          Cumulative % of Population
        </text>
        <text
          x={20}
          y={height / 2}
          textAnchor="middle"
          fill={labelFill}
          fontSize="11"
          transform={`rotate(-90, 20, ${height / 2})`}
        >
          Cumulative % of Income
        </text>

        {/* Legend */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <line
            x1={width - padding - 100}
            y1={padding + 15}
            x2={width - padding - 80}
            y2={padding + 15}
            stroke={mutedColor}
            strokeWidth="2"
            strokeDasharray="6 3"
          />
          <text
            x={width - padding - 75}
            y={padding + 19}
            fill={labelFill}
            fontSize="9"
          >
            Perfect Equality
          </text>

          <line
            x1={width - padding - 100}
            y1={padding + 32}
            x2={width - padding - 80}
            y2={padding + 32}
            stroke={accentColor}
            strokeWidth="3"
          />
          <text
            x={width - padding - 75}
            y={padding + 36}
            fill={labelFill}
            fontSize="9"
          >
            Actual Distribution
          </text>
        </motion.g>

        {/* Gini Coefficient display */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <rect
            x={padding + 10}
            y={padding + 10}
            width="100"
            height="50"
            fill={isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)'}
            rx="8"
          />
          <text
            x={padding + 60}
            y={padding + 28}
            textAnchor="middle"
            fill={labelFill}
            fontSize="10"
          >
            Gini Coefficient
          </text>
          <text
            x={padding + 60}
            y={padding + 48}
            textAnchor="middle"
            fill={getGiniColor(giniCoefficient)}
            fontSize="18"
            fontWeight="bold"
          >
            {giniCoefficient.toFixed(2)}
          </text>
        </motion.g>

        {/* Gini interpretation */}
        <motion.text
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          x={width / 2}
          y={height + 20}
          textAnchor="middle"
          fill={getGiniColor(giniCoefficient)}
          fontSize="12"
          fontWeight="600"
        >
          {getGiniLabel(giniCoefficient)}
        </motion.text>
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

export default LorenzCurve;
