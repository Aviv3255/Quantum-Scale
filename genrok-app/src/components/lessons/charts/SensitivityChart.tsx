'use client';

import { motion } from 'framer-motion';

interface SensitivityData {
  parameter: string;
  lowValue: number;
  baseValue: number;
  highValue: number;
  lowImpact: number;
  highImpact: number;
}

interface SensitivityChartProps {
  data?: SensitivityData[];
  baselineOutput?: number;
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

const defaultData: SensitivityData[] = [
  { parameter: 'Price', lowValue: -20, baseValue: 0, highValue: 20, lowImpact: 35, highImpact: -25 },
  { parameter: 'Volume', lowValue: -15, baseValue: 0, highValue: 15, lowImpact: -28, highImpact: 22 },
  { parameter: 'COGS', lowValue: -10, baseValue: 0, highValue: 10, lowImpact: 18, highImpact: -15 },
  { parameter: 'Marketing', lowValue: -25, baseValue: 0, highValue: 25, lowImpact: -8, highImpact: 12 },
  { parameter: 'Overhead', lowValue: -5, baseValue: 0, highValue: 5, lowImpact: 5, highImpact: -4 },
];

export function SensitivityChart({
  data = defaultData,
  baselineOutput = 100,
  title = 'Sensitivity Analysis - Profit Impact',
  accentColor = '#88da1c',
  variant = 'dark',
}: SensitivityChartProps) {
  const isDark = variant === 'dark';
  const width = 500;
  const height = 350;
  const padding = 100;
  const barHeight = 30;
  const barGap = 15;

  const gridStroke = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const axisStroke = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';

  // Find the max impact range for scaling
  const allImpacts = data.flatMap(d => [Math.abs(d.lowImpact), Math.abs(d.highImpact)]);
  const maxImpact = Math.max(...allImpacts) * 1.2;

  const centerX = width / 2;
  const scaleX = (impact: number) => centerX + (impact / maxImpact) * ((width - 2 * padding) / 2);

  // Sort data by total swing (most sensitive first)
  const sortedData = [...data].sort((a, b) => {
    const swingA = Math.abs(a.highImpact - a.lowImpact);
    const swingB = Math.abs(b.highImpact - b.lowImpact);
    return swingB - swingA;
  });

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
        {[-maxImpact, -maxImpact / 2, 0, maxImpact / 2, maxImpact].map((val, i) => (
          <motion.g key={i}>
            <motion.line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.03 * i }}
              x1={scaleX(val)}
              y1={50}
              x2={scaleX(val)}
              y2={height - 30}
              stroke={val === 0 ? axisStroke : gridStroke}
              strokeWidth={val === 0 ? 2 : 1}
            />
            <text
              x={scaleX(val)}
              y={40}
              textAnchor="middle"
              fill={labelFill}
              fontSize="10"
            >
              {val > 0 ? '+' : ''}{Math.round(val)}%
            </text>
          </motion.g>
        ))}

        {/* Baseline indicator */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <text
            x={centerX}
            y={25}
            textAnchor="middle"
            fill={labelFill}
            fontSize="11"
            fontWeight="600"
          >
            Baseline: ${baselineOutput}K
          </text>
        </motion.g>

        {/* Tornado bars */}
        {sortedData.map((item, i) => {
          const y = 60 + i * (barHeight + barGap);
          const lowX = scaleX(Math.min(item.lowImpact, item.highImpact));
          const highX = scaleX(Math.max(item.lowImpact, item.highImpact));

          // Determine colors based on impact direction
          const negativeColor = '#FF3B30';
          const positiveColor = accentColor;

          return (
            <motion.g key={i}>
              {/* Parameter label */}
              <text
                x={padding - 10}
                y={y + barHeight / 2 + 4}
                textAnchor="end"
                fill={labelFill}
                fontSize="11"
                fontWeight="500"
              >
                {item.parameter}
              </text>

              {/* Low impact bar (left side) */}
              <motion.rect
                initial={{ width: 0, x: centerX }}
                animate={{
                  width: Math.abs(centerX - scaleX(item.lowImpact)),
                  x: item.lowImpact < 0 ? scaleX(item.lowImpact) : centerX,
                }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                y={y}
                height={barHeight}
                fill={item.lowImpact < 0 ? negativeColor : positiveColor}
                rx="4"
                opacity="0.8"
              />

              {/* High impact bar (right side) */}
              <motion.rect
                initial={{ width: 0, x: centerX }}
                animate={{
                  width: Math.abs(scaleX(item.highImpact) - centerX),
                  x: item.highImpact < 0 ? scaleX(item.highImpact) : centerX,
                }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                y={y}
                height={barHeight}
                fill={item.highImpact < 0 ? negativeColor : positiveColor}
                rx="4"
                opacity="0.8"
              />

              {/* Low value label */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                x={scaleX(item.lowImpact) + (item.lowImpact < 0 ? -5 : 5)}
                y={y + barHeight / 2 + 4}
                textAnchor={item.lowImpact < 0 ? 'end' : 'start'}
                fill={labelFill}
                fontSize="9"
              >
                {item.lowValue > 0 ? '+' : ''}{item.lowValue}%
              </motion.text>

              {/* High value label */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                x={scaleX(item.highImpact) + (item.highImpact > 0 ? 5 : -5)}
                y={y + barHeight / 2 + 4}
                textAnchor={item.highImpact > 0 ? 'start' : 'end'}
                fill={labelFill}
                fontSize="9"
              >
                {item.highValue > 0 ? '+' : ''}{item.highValue}%
              </motion.text>

              {/* Impact values on bars */}
              {Math.abs(item.lowImpact) > maxImpact * 0.15 && (
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  x={(centerX + scaleX(item.lowImpact)) / 2}
                  y={y + barHeight / 2 + 4}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="10"
                  fontWeight="600"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                >
                  {item.lowImpact > 0 ? '+' : ''}{item.lowImpact}%
                </motion.text>
              )}
              {Math.abs(item.highImpact) > maxImpact * 0.15 && (
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  x={(centerX + scaleX(item.highImpact)) / 2}
                  y={y + barHeight / 2 + 4}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="10"
                  fontWeight="600"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                >
                  {item.highImpact > 0 ? '+' : ''}{item.highImpact}%
                </motion.text>
              )}
            </motion.g>
          );
        })}

        {/* Legend */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <rect
            x={padding}
            y={height - 25}
            width="12"
            height="12"
            fill={accentColor}
            rx="2"
          />
          <text x={padding + 18} y={height - 15} fill={labelFill} fontSize="10">
            Positive Impact
          </text>

          <rect
            x={padding + 120}
            y={height - 25}
            width="12"
            height="12"
            fill="#FF3B30"
            rx="2"
          />
          <text x={padding + 138} y={height - 15} fill={labelFill} fontSize="10">
            Negative Impact
          </text>
        </motion.g>

        {/* Axis labels */}
        <text
          x={padding + 30}
          y={height - 5}
          fill={labelFill}
          fontSize="9"
        >
          Parameter Low
        </text>
        <text
          x={width - padding - 70}
          y={height - 5}
          fill={labelFill}
          fontSize="9"
        >
          Parameter High
        </text>
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

export default SensitivityChart;
