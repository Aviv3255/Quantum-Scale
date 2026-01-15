'use client';

import { motion } from 'framer-motion';

interface StripDataPoint {
  category: string;
  value: number;
  label?: string;
}

interface StripPlotProps {
  data?: StripDataPoint[];
  title?: string;
  valueLabel?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
  jitterWidth?: number;
  dotRadius?: number;
}

const defaultData: StripDataPoint[] = [
  // Control
  ...Array.from({ length: 20 }, (_, i) => ({
    category: 'Control',
    value: 45 + Math.random() * 20,
    label: `C${i + 1}`,
  })),
  // Treatment A
  ...Array.from({ length: 18 }, (_, i) => ({
    category: 'Treatment A',
    value: 55 + Math.random() * 25,
    label: `A${i + 1}`,
  })),
  // Treatment B
  ...Array.from({ length: 22 }, (_, i) => ({
    category: 'Treatment B',
    value: 60 + Math.random() * 30,
    label: `B${i + 1}`,
  })),
  // Treatment C
  ...Array.from({ length: 16 }, (_, i) => ({
    category: 'Treatment C',
    value: 70 + Math.random() * 20,
    label: `C${i + 1}`,
  })),
];

export function StripPlot({
  data = defaultData,
  title = 'Strip Plot - Treatment Comparison',
  valueLabel = 'Response Value',
  accentColor = '#88da1c',
  variant = 'dark',
  jitterWidth = 0.3,
  dotRadius = 4,
}: StripPlotProps) {
  const isDark = variant === 'dark';
  const width = 500;
  const height = 400;
  const padding = { top: 50, right: 40, bottom: 80, left: 80 };

  const gridStroke = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';

  const categories = [...new Set(data.map(d => d.category))];
  const values = data.map(d => d.value);
  const minValue = Math.min(...values) - 5;
  const maxValue = Math.max(...values) + 5;

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const categoryWidth = chartWidth / categories.length;
  const scaleY = (value: number) =>
    padding.top + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;

  const colors = [accentColor, '#FF6B6B', '#4ECDC4', '#FFE66D'];

  // Calculate mean for each category
  const categoryStats = categories.map(cat => {
    const catData = data.filter(d => d.category === cat);
    const mean = catData.reduce((sum, d) => sum + d.value, 0) / catData.length;
    return { category: cat, mean };
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
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const y = padding.top + t * chartHeight;
          const value = maxValue - t * (maxValue - minValue);
          return (
            <motion.g key={i}>
              <motion.line
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.02 * i }}
                x1={padding.left}
                y1={y}
                x2={padding.left + chartWidth}
                y2={y}
                stroke={gridStroke}
                strokeWidth={1}
              />
              <text
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                fill={labelFill}
                fontSize="10"
              >
                {Math.round(value)}
              </text>
            </motion.g>
          );
        })}

        {/* Mean lines for each category */}
        {categoryStats.map((stat, i) => {
          const centerX = padding.left + categoryWidth * i + categoryWidth / 2;
          const y = scaleY(stat.mean);
          return (
            <motion.line
              key={stat.category}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              x1={centerX - categoryWidth * 0.35}
              y1={y}
              x2={centerX + categoryWidth * 0.35}
              y2={y}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              strokeDasharray="4,2"
            />
          );
        })}

        {/* Strip dots with jitter */}
        {data.map((point, i) => {
          const catIndex = categories.indexOf(point.category);
          const centerX = padding.left + categoryWidth * catIndex + categoryWidth / 2;
          const jitter = (Math.random() - 0.5) * categoryWidth * jitterWidth;
          const x = centerX + jitter;
          const y = scaleY(point.value);
          const color = colors[catIndex % colors.length];

          return (
            <motion.circle
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.7 }}
              transition={{ delay: 0.01 * i, duration: 0.3 }}
              cx={x}
              cy={y}
              r={dotRadius}
              fill={color}
              stroke={isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'}
              strokeWidth={0.5}
            />
          );
        })}

        {/* Category labels */}
        {categories.map((category, i) => {
          const centerX = padding.left + categoryWidth * i + categoryWidth / 2;
          const stat = categoryStats.find(s => s.category === category);
          return (
            <motion.g key={category}>
              <text
                x={centerX}
                y={height - 45}
                textAnchor="middle"
                fill={labelFill}
                fontSize="11"
                fontWeight="600"
              >
                {category}
              </text>
              <text
                x={centerX}
                y={height - 30}
                textAnchor="middle"
                fill={colors[i % colors.length]}
                fontSize="9"
              >
                Mean: {stat?.mean.toFixed(1)}
              </text>
              <rect
                x={centerX - 8}
                y={height - 20}
                width="16"
                height="4"
                fill={colors[i % colors.length]}
                rx="2"
              />
            </motion.g>
          );
        })}

        {/* Y-axis label */}
        <text
          x={20}
          y={padding.top + chartHeight / 2}
          textAnchor="middle"
          fill={labelFill}
          fontSize="12"
          transform={`rotate(-90, 20, ${padding.top + chartHeight / 2})`}
        >
          {valueLabel}
        </text>

        {/* Axes */}
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
          x1={padding.left}
          y1={padding.top + chartHeight}
          x2={padding.left + chartWidth}
          y2={padding.top + chartHeight}
          stroke={labelFill}
          strokeWidth={1}
        />
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + chartHeight}
          stroke={labelFill}
          strokeWidth={1}
        />

        {/* Legend */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <line
            x1={width - 100}
            y1={padding.top + 10}
            x2={width - 70}
            y2={padding.top + 10}
            stroke={labelFill}
            strokeWidth={2}
            strokeDasharray="4,2"
          />
          <text x={width - 65} y={padding.top + 14} fill={labelFill} fontSize="9">
            Mean
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

export default StripPlot;
