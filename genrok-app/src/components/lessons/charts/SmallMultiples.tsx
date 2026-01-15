'use client';

import { motion } from 'framer-motion';

interface ChartData {
  label: string;
  values: number[];
}

interface SmallMultiplesProps {
  data?: ChartData[];
  xLabels?: string[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
  columns?: number;
}

const defaultData: ChartData[] = [
  { label: 'North', values: [30, 45, 38, 52, 48, 60] },
  { label: 'South', values: [25, 32, 42, 38, 45, 52] },
  { label: 'East', values: [40, 35, 48, 55, 62, 70] },
  { label: 'West', values: [35, 42, 38, 48, 52, 58] },
  { label: 'Central', values: [28, 38, 45, 50, 55, 65] },
  { label: 'Overseas', values: [15, 25, 32, 42, 48, 55] },
];

const defaultXLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export function SmallMultiples({
  data = defaultData,
  xLabels = defaultXLabels,
  title = 'Regional Performance',
  accentColor = '#88da1c',
  variant = 'dark',
  columns = 3,
}: SmallMultiplesProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const gridStroke = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
  const mutedColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

  // Calculate global min/max for consistent scale across all charts
  const allValues = data.flatMap(d => d.values);
  const globalMin = Math.min(...allValues) * 0.8;
  const globalMax = Math.max(...allValues) * 1.1;

  // Single chart dimensions
  const chartWidth = 150;
  const chartHeight = 100;
  const chartPadding = 20;

  const rows = Math.ceil(data.length / columns);
  const totalWidth = columns * (chartWidth + 20);
  const totalHeight = rows * (chartHeight + 50);

  const scaleY = (val: number) =>
    chartHeight - chartPadding - ((val - globalMin) / (globalMax - globalMin)) * (chartHeight - 2 * chartPadding);

  const createLinePath = (values: number[]) => {
    const points = values.map((val, i) => {
      const x = chartPadding + (i / (values.length - 1)) * (chartWidth - 2 * chartPadding);
      const y = scaleY(val);
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  const createAreaPath = (values: number[]) => {
    const linePath = createLinePath(values);
    const lastX = chartPadding + ((values.length - 1) / (values.length - 1)) * (chartWidth - 2 * chartPadding);
    const firstX = chartPadding;
    const bottomY = chartHeight - chartPadding;
    return `${linePath} L ${lastX},${bottomY} L ${firstX},${bottomY} Z`;
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

      <svg viewBox={`0 0 ${totalWidth} ${totalHeight + 20}`} className="w-full">
        {data.map((chartData, index) => {
          const col = index % columns;
          const row = Math.floor(index / columns);
          const offsetX = col * (chartWidth + 20);
          const offsetY = row * (chartHeight + 50) + 10;

          const lastValue = chartData.values[chartData.values.length - 1];
          const firstValue = chartData.values[0];
          const change = ((lastValue - firstValue) / firstValue * 100).toFixed(0);
          const isPositive = lastValue >= firstValue;

          return (
            <motion.g
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              transform={`translate(${offsetX}, ${offsetY})`}
            >
              {/* Chart background */}
              <rect
                x="0"
                y="0"
                width={chartWidth}
                height={chartHeight}
                fill={isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'}
                rx="8"
              />

              {/* Grid lines */}
              {[0, 0.5, 1].map((pct, i) => (
                <line
                  key={i}
                  x1={chartPadding}
                  y1={chartPadding + pct * (chartHeight - 2 * chartPadding)}
                  x2={chartWidth - chartPadding}
                  y2={chartPadding + pct * (chartHeight - 2 * chartPadding)}
                  stroke={gridStroke}
                />
              ))}

              {/* Area fill */}
              <motion.path
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 0.2 + 0.1 * index }}
                d={createAreaPath(chartData.values)}
                fill={accentColor}
              />

              {/* Line */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.2 + 0.1 * index }}
                d={createLinePath(chartData.values)}
                fill="none"
                stroke={accentColor}
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Data points */}
              {chartData.values.map((val, i) => {
                const x = chartPadding + (i / (chartData.values.length - 1)) * (chartWidth - 2 * chartPadding);
                return (
                  <motion.circle
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 + 0.1 * index + i * 0.03 }}
                    cx={x}
                    cy={scaleY(val)}
                    r="3"
                    fill={accentColor}
                  />
                );
              })}

              {/* Chart title */}
              <text
                x={chartWidth / 2}
                y={chartHeight + 18}
                textAnchor="middle"
                fill={labelFill}
                fontSize="11"
                fontWeight="600"
              >
                {chartData.label}
              </text>

              {/* Change indicator */}
              <text
                x={chartWidth / 2}
                y={chartHeight + 35}
                textAnchor="middle"
                fill={isPositive ? '#34C759' : '#FF3B30'}
                fontSize="10"
                fontWeight="500"
              >
                {isPositive ? '+' : ''}{change}%
              </text>

              {/* First and last values */}
              <text
                x={chartPadding}
                y={chartHeight - 5}
                fill={mutedColor}
                fontSize="8"
              >
                {firstValue}
              </text>
              <text
                x={chartWidth - chartPadding}
                y={chartHeight - 5}
                textAnchor="end"
                fill={mutedColor}
                fontSize="8"
              >
                {lastValue}
              </text>
            </motion.g>
          );
        })}

        {/* Global legend */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <text
            x={totalWidth / 2}
            y={totalHeight + 10}
            textAnchor="middle"
            fill={mutedColor}
            fontSize="10"
          >
            {xLabels[0]} - {xLabels[xLabels.length - 1]} | Scale: {Math.round(globalMin)} - {Math.round(globalMax)}
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

export default SmallMultiples;
