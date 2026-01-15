'use client';

import { motion } from 'framer-motion';

interface DataPoint {
  x: number;
  y: number;
}

interface RegressionPlotProps {
  data?: DataPoint[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
  showEquation?: boolean;
}

const defaultData: DataPoint[] = [
  { x: 10, y: 25 },
  { x: 15, y: 32 },
  { x: 20, y: 38 },
  { x: 25, y: 48 },
  { x: 30, y: 52 },
  { x: 35, y: 58 },
  { x: 40, y: 65 },
  { x: 45, y: 72 },
  { x: 50, y: 78 },
  { x: 55, y: 82 },
  { x: 60, y: 88 },
  { x: 22, y: 42 },
  { x: 28, y: 45 },
  { x: 33, y: 55 },
  { x: 38, y: 60 },
  { x: 48, y: 70 },
  { x: 52, y: 75 },
  { x: 58, y: 85 },
];

function calculateRegression(data: DataPoint[]) {
  const n = data.length;
  const sumX = data.reduce((acc, p) => acc + p.x, 0);
  const sumY = data.reduce((acc, p) => acc + p.y, 0);
  const sumXY = data.reduce((acc, p) => acc + p.x * p.y, 0);
  const sumX2 = data.reduce((acc, p) => acc + p.x * p.x, 0);
  const sumY2 = data.reduce((acc, p) => acc + p.y * p.y, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // R-squared calculation
  const meanY = sumY / n;
  const ssTotal = data.reduce((acc, p) => acc + Math.pow(p.y - meanY, 2), 0);
  const ssResidual = data.reduce((acc, p) => acc + Math.pow(p.y - (slope * p.x + intercept), 2), 0);
  const rSquared = 1 - ssResidual / ssTotal;

  return { slope, intercept, rSquared };
}

export function RegressionPlot({
  data = defaultData,
  title = 'Linear Regression Analysis',
  xLabel = 'Ad Spend ($K)',
  yLabel = 'Revenue ($K)',
  accentColor = '#88da1c',
  variant = 'dark',
  showEquation = true,
}: RegressionPlotProps) {
  const isDark = variant === 'dark';
  const width = 480;
  const height = 350;
  const padding = 60;

  const gridStroke = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const axisStroke = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
  const pointFill = isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)';

  const { slope, intercept, rSquared } = calculateRegression(data);

  const minX = Math.min(...data.map(d => d.x)) - 5;
  const maxX = Math.max(...data.map(d => d.x)) + 5;
  const minY = Math.min(...data.map(d => d.y), intercept + slope * minX) - 5;
  const maxY = Math.max(...data.map(d => d.y), intercept + slope * maxX) + 5;

  const scaleX = (val: number) => padding + ((val - minX) / (maxX - minX)) * (width - 2 * padding);
  const scaleY = (val: number) => height - padding - ((val - minY) / (maxY - minY)) * (height - 2 * padding);

  // Regression line endpoints
  const lineStartX = minX;
  const lineEndX = maxX;
  const lineStartY = slope * lineStartX + intercept;
  const lineEndY = slope * lineEndX + intercept;

  // Residual lines (showing deviation from regression)
  const residuals = data.map(point => ({
    x: point.x,
    actual: point.y,
    predicted: slope * point.x + intercept,
  }));

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
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
          <motion.g key={i}>
            <motion.line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.03 * i }}
              x1={padding}
              y1={padding + pct * (height - 2 * padding)}
              x2={width - padding}
              y2={padding + pct * (height - 2 * padding)}
              stroke={gridStroke}
            />
            <motion.line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.03 * i }}
              x1={padding + pct * (width - 2 * padding)}
              y1={padding}
              x2={padding + pct * (width - 2 * padding)}
              y2={height - padding}
              stroke={gridStroke}
            />
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

        {/* Residual lines */}
        {residuals.map((r, i) => (
          <motion.line
            key={`residual-${i}`}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.3, pathLength: 1 }}
            transition={{ delay: 0.8 + i * 0.02 }}
            x1={scaleX(r.x)}
            y1={scaleY(r.actual)}
            x2={scaleX(r.x)}
            y2={scaleY(r.predicted)}
            stroke={r.actual > r.predicted ? '#34C759' : '#FF3B30'}
            strokeWidth="1"
            strokeDasharray="3 2"
          />
        ))}

        {/* Regression line */}
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          x1={scaleX(lineStartX)}
          y1={scaleY(lineStartY)}
          x2={scaleX(lineEndX)}
          y2={scaleY(lineEndY)}
          stroke={accentColor}
          strokeWidth="3"
        />

        {/* Data points */}
        {data.map((point, i) => (
          <motion.circle
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 + i * 0.03 }}
            cx={scaleX(point.x)}
            cy={scaleY(point.y)}
            r="5"
            fill={pointFill}
            stroke={isDark ? '#fff' : '#000'}
            strokeWidth="1.5"
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
          {xLabel}
        </text>
        <text
          x={20}
          y={height / 2}
          textAnchor="middle"
          fill={labelFill}
          fontSize="11"
          transform={`rotate(-90, 20, ${height / 2})`}
        >
          {yLabel}
        </text>

        {/* Equation and R-squared */}
        {showEquation && (
          <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <rect
              x={padding + 10}
              y={padding + 10}
              width="140"
              height="60"
              fill={isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.9)'}
              rx="8"
            />
            <text
              x={padding + 80}
              y={padding + 30}
              textAnchor="middle"
              fill={labelFill}
              fontSize="10"
            >
              y = {slope.toFixed(2)}x + {intercept.toFixed(1)}
            </text>
            <text
              x={padding + 80}
              y={padding + 48}
              textAnchor="middle"
              fill={labelFill}
              fontSize="10"
            >
              R² = {rSquared.toFixed(3)}
            </text>
            <text
              x={padding + 80}
              y={padding + 63}
              textAnchor="middle"
              fill={rSquared > 0.8 ? '#34C759' : rSquared > 0.5 ? '#FF9500' : '#FF3B30'}
              fontSize="9"
              fontWeight="600"
            >
              {rSquared > 0.8 ? 'Strong Fit' : rSquared > 0.5 ? 'Moderate Fit' : 'Weak Fit'}
            </text>
          </motion.g>
        )}

        {/* Legend */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <circle
            cx={width - padding - 80}
            cy={padding + 15}
            r="4"
            fill={pointFill}
            stroke={isDark ? '#fff' : '#000'}
            strokeWidth="1.5"
          />
          <text
            x={width - padding - 70}
            y={padding + 19}
            fill={labelFill}
            fontSize="9"
          >
            Data Points
          </text>

          <line
            x1={width - padding - 90}
            y1={padding + 32}
            x2={width - padding - 70}
            y2={padding + 32}
            stroke={accentColor}
            strokeWidth="3"
          />
          <text
            x={width - padding - 65}
            y={padding + 36}
            fill={labelFill}
            fontSize="9"
          >
            Best Fit Line
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

export default RegressionPlot;
