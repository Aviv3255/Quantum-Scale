'use client';

import { motion } from 'framer-motion';

interface DonutSegment {
  label: string;
  value: number;
  color?: string;
}

interface DonutChartProps {
  data: DonutSegment[];
  centerValue?: string;
  centerLabel?: string;
  title?: string;
  size?: number;
  thickness?: number;
}

/**
 * DonutChart - Animated donut/ring chart with center stat
 * White slide background with dark rounded block
 */
export function DonutChart({
  data,
  centerValue,
  centerLabel,
  title,
  size = 280,
  thickness = 32,
}: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  // Default colors - premium palette
  const defaultColors = [
    '#88da1c', // Lime green (primary)
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#F59E0B', // Amber
    '#EC4899', // Pink
    '#10B981', // Emerald
  ];

  // Calculate segment positions
  let currentOffset = 0;
  const segments = data.map((item, index) => {
    const percentage = item.value / total;
    const strokeLength = percentage * circumference;
    const segment = {
      ...item,
      color: item.color || defaultColors[index % defaultColors.length],
      strokeLength,
      strokeOffset: currentOffset,
      percentage,
    };
    currentOffset += strokeLength;
    return segment;
  });

  return (
    <div className="bg-white p-8">
      <div className="bg-black rounded-2xl p-8">
        {title && (
          <h3 className="text-xl font-bold text-white mb-6 text-center">{title}</h3>
        )}

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Chart */}
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
              {/* Background circle */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={thickness}
              />

              {/* Animated segments */}
              {segments.map((segment, index) => (
                <motion.circle
                  key={index}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth={thickness}
                  strokeLinecap="round"
                  strokeDasharray={`${segment.strokeLength} ${circumference}`}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: circumference - segment.strokeOffset - segment.strokeLength }}
                  transition={{
                    duration: 1,
                    delay: 0.2 + index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    filter: `drop-shadow(0 0 8px ${segment.color}40)`,
                  }}
                />
              ))}
            </svg>

            {/* Center content */}
            {(centerValue || centerLabel) && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                {centerValue && (
                  <span className="text-4xl font-bold text-white">{centerValue}</span>
                )}
                {centerLabel && (
                  <span className="text-sm text-white/50">{centerLabel}</span>
                )}
              </motion.div>
            )}
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {segments.map((segment, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm text-white">{segment.label}</span>
                <span className="text-sm font-semibold text-white/50 ml-auto">
                  {(segment.percentage * 100).toFixed(0)}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonutChart;
