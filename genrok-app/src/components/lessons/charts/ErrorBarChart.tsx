'use client';

import { motion } from 'framer-motion';

interface ErrorBarData {
  label: string;
  value: number;
  errorLow: number;
  errorHigh: number;
}

interface ErrorBarChartProps {
  data?: ErrorBarData[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

const defaultData: ErrorBarData[] = [
  { label: 'Control', value: 45, errorLow: 40, errorHigh: 50 },
  { label: 'Treatment A', value: 62, errorLow: 55, errorHigh: 69 },
  { label: 'Treatment B', value: 58, errorLow: 52, errorHigh: 64 },
  { label: 'Treatment C', value: 72, errorLow: 65, errorHigh: 79 },
  { label: 'Treatment D', value: 68, errorLow: 60, errorHigh: 76 },
];

export function ErrorBarChart({
  data = defaultData,
  title = 'Results with Confidence Intervals',
  accentColor = '#88da1c',
  variant = 'dark',
}: ErrorBarChartProps) {
  const isDark = variant === 'dark';
  const width = 500;
  const height = 320;
  const padding = 60;

  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const gridStroke = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const axisStroke = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';

  const allValues = data.flatMap(d => [d.errorLow, d.errorHigh]);
  const minValue = 0;
  const maxValue = Math.max(...allValues) * 1.1;

  const scaleY = (val: number) =>
    height - padding - ((val - minValue) / (maxValue - minValue)) * (height - 2 * padding);

  const barWidth = Math.min(40, (width - 2 * padding) / data.length - 15);
  const capWidth = barWidth * 0.6;

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
        {[0, 20, 40, 60, 80, 100].filter(v => v <= maxValue).map((val, i) => (
          <motion.g key={i}>
            <motion.line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.03 * i }}
              x1={padding}
              y1={scaleY(val)}
              x2={width - padding}
              y2={scaleY(val)}
              stroke={gridStroke}
            />
            <text
              x={padding - 10}
              y={scaleY(val) + 4}
              textAnchor="end"
              fill={labelFill}
              fontSize="10"
            >
              {val}
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

        {/* Data points with error bars */}
        {data.map((item, i) => {
          const centerX = padding + ((i + 0.5) * (width - 2 * padding)) / data.length;
          const valueY = scaleY(item.value);
          const errorLowY = scaleY(item.errorLow);
          const errorHighY = scaleY(item.errorHigh);

          return (
            <motion.g key={i}>
              {/* Error bar vertical line */}
              <motion.line
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.15 + i * 0.1 }}
                style={{ transformOrigin: `${centerX}px ${(errorLowY + errorHighY) / 2}px` }}
                x1={centerX}
                y1={errorLowY}
                x2={centerX}
                y2={errorHighY}
                stroke={mutedColor}
                strokeWidth="2"
              />

              {/* Lower cap */}
              <motion.line
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.25 + i * 0.1 }}
                x1={centerX - capWidth / 2}
                y1={errorLowY}
                x2={centerX + capWidth / 2}
                y2={errorLowY}
                stroke={mutedColor}
                strokeWidth="2"
              />

              {/* Upper cap */}
              <motion.line
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.25 + i * 0.1 }}
                x1={centerX - capWidth / 2}
                y1={errorHighY}
                x2={centerX + capWidth / 2}
                y2={errorHighY}
                stroke={mutedColor}
                strokeWidth="2"
              />

              {/* Main value point (diamond) */}
              <motion.path
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 300 }}
                d={`M ${centerX} ${valueY - 8} L ${centerX + 8} ${valueY} L ${centerX} ${valueY + 8} L ${centerX - 8} ${valueY} Z`}
                fill={accentColor}
              />

              {/* Value label */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                x={centerX}
                y={errorHighY - 12}
                textAnchor="middle"
                fill={accentColor}
                fontSize="11"
                fontWeight="600"
              >
                {item.value}
              </motion.text>

              {/* X-axis label */}
              <text
                x={centerX}
                y={height - padding + 18}
                textAnchor="middle"
                fill={labelFill}
                fontSize="10"
              >
                {item.label}
              </text>

              {/* Confidence interval range */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                x={centerX}
                y={errorLowY + 18}
                textAnchor="middle"
                fill={mutedColor}
                fontSize="9"
              >
                [{item.errorLow}-{item.errorHigh}]
              </motion.text>
            </motion.g>
          );
        })}

        {/* Legend */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <path
            d="M 370 30 L 378 38 L 370 46 L 362 38 Z"
            fill={accentColor}
          />
          <text
            x={385}
            y={42}
            fill={labelFill}
            fontSize="10"
          >
            Mean Value
          </text>

          <line
            x1={362}
            y1={60}
            x2={378}
            y2={60}
            stroke={mutedColor}
            strokeWidth="2"
          />
          <line
            x1={362}
            y1={55}
            x2={362}
            y2={65}
            stroke={mutedColor}
            strokeWidth="2"
          />
          <line
            x1={378}
            y1={55}
            x2={378}
            y2={65}
            stroke={mutedColor}
            strokeWidth="2"
          />
          <text
            x={385}
            y={64}
            fill={labelFill}
            fontSize="10"
          >
            95% CI
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

export default ErrorBarChart;
