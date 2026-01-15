'use client';

import { motion } from 'framer-motion';

interface SwarmDataPoint {
  category: string;
  value: number;
  label?: string;
}

interface SwarmPlotProps {
  data?: SwarmDataPoint[];
  title?: string;
  valueLabel?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
  dotRadius?: number;
}

const defaultData: SwarmDataPoint[] = [
  // Group A
  ...Array.from({ length: 25 }, (_, i) => ({
    category: 'Group A',
    value: 40 + Math.random() * 30 + (Math.random() > 0.8 ? 20 : 0),
    label: `A${i + 1}`,
  })),
  // Group B
  ...Array.from({ length: 30 }, (_, i) => ({
    category: 'Group B',
    value: 50 + Math.random() * 25 + (Math.random() > 0.7 ? 15 : 0),
    label: `B${i + 1}`,
  })),
  // Group C
  ...Array.from({ length: 20 }, (_, i) => ({
    category: 'Group C',
    value: 30 + Math.random() * 40,
    label: `C${i + 1}`,
  })),
  // Group D
  ...Array.from({ length: 28 }, (_, i) => ({
    category: 'Group D',
    value: 55 + Math.random() * 35,
    label: `D${i + 1}`,
  })),
];

export function SwarmPlot({
  data = defaultData,
  title = 'Beeswarm Distribution',
  valueLabel = 'Score',
  accentColor = '#88da1c',
  variant = 'dark',
  dotRadius = 5,
}: SwarmPlotProps) {
  const isDark = variant === 'dark';
  const width = 500;
  const height = 400;
  const padding = { top: 50, right: 40, bottom: 60, left: 80 };

  const textColor = isDark ? 'text-white' : 'text-black';
  const gridStroke = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const labelFill = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';

  const categories = [...new Set(data.map(d => d.category))];
  const values = data.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const categoryWidth = chartWidth / categories.length;
  const scaleY = (value: number) =>
    padding.top + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;

  const colors = [accentColor, '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3'];

  // Beeswarm algorithm - position dots to avoid overlap
  const positionedData = categories.flatMap((category, catIndex) => {
    const categoryData = data.filter(d => d.category === category);
    const centerX = padding.left + categoryWidth * catIndex + categoryWidth / 2;

    // Sort by value for better packing
    const sorted = [...categoryData].sort((a, b) => a.value - b.value);
    const positioned: { x: number; y: number; data: SwarmDataPoint; color: string }[] = [];

    sorted.forEach(point => {
      const y = scaleY(point.value);
      let x = centerX;
      let offset = 0;
      let direction = 1;

      // Find non-overlapping position
      while (positioned.some(p => {
        const dx = p.x - x;
        const dy = p.y - y;
        return Math.sqrt(dx * dx + dy * dy) < dotRadius * 2.2;
      })) {
        offset += dotRadius * 0.5;
        x = centerX + offset * direction;
        direction *= -1;
        if (direction === 1) offset += dotRadius * 0.5;

        // Limit spread
        if (Math.abs(x - centerX) > categoryWidth / 2 - dotRadius) {
          x = centerX + (Math.random() - 0.5) * (categoryWidth - dotRadius * 4);
          break;
        }
      }

      positioned.push({ x, y, data: point, color: colors[catIndex % colors.length] });
    });

    return positioned;
  });

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

        {/* Category separators */}
        {categories.map((_, i) => (
          <motion.line
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            x1={padding.left + categoryWidth * (i + 1)}
            y1={padding.top}
            x2={padding.left + categoryWidth * (i + 1)}
            y2={padding.top + chartHeight}
            stroke={gridStroke}
            strokeDasharray="4,4"
          />
        ))}

        {/* Swarm dots */}
        {positionedData.map((point, i) => (
          <motion.circle
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ delay: 0.01 * i, duration: 0.3 }}
            cx={point.x}
            cy={point.y}
            r={dotRadius}
            fill={point.color}
            stroke={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}
            strokeWidth={0.5}
          />
        ))}

        {/* Category labels */}
        {categories.map((category, i) => (
          <motion.g key={category}>
            <text
              x={padding.left + categoryWidth * i + categoryWidth / 2}
              y={height - 25}
              textAnchor="middle"
              fill={labelFill}
              fontSize="11"
              fontWeight="600"
            >
              {category}
            </text>
            <rect
              x={padding.left + categoryWidth * i + categoryWidth / 2 - 6}
              y={height - 15}
              width="12"
              height="4"
              fill={colors[i % colors.length]}
              rx="2"
            />
          </motion.g>
        ))}

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

export default SwarmPlot;
