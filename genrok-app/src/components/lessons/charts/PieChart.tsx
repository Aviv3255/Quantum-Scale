'use client';

import { motion } from 'framer-motion';

interface PieSegment {
  label: string;
  value: number;
  color?: string;
}

interface PieChartProps {
  data: PieSegment[];
  title?: string;
  size?: number;
  showLabels?: boolean;
  variant?: 'dark' | 'light';
}

/**
 * PieChart - Animated pie chart with segments
 * Supports dark (black container) and light (pure white) variants
 */
export function PieChart({
  data,
  title,
  size = 240,
  showLabels = true,
  variant = 'dark',
}: PieChartProps) {
  const isDark = variant === 'dark';
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const center = size / 2;
  const radius = size / 2 - 10;

  // Colors based on variant - using inline styles for proper contrast

  const defaultColors = ['#88da1c', '#3B82F6', '#8B5CF6', '#F59E0B', '#EC4899', '#10B981'];

  // Calculate segments
  let currentAngle = -90;
  const segments = data.map((item, index) => {
    const percentage = item.value / total;
    const angle = percentage * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    const path = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    return {
      ...item,
      path,
      color: item.color || defaultColors[index % defaultColors.length],
      percentage,
    };
  });

  const content = (
    <>
      {title && (
        <h3 className="text-xl font-bold mb-6 text-center" style={{ color: isDark ? '#fff' : '#000' }}>{title}</h3>
      )}

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Pie */}
        <svg width={size} height={size} className="overflow-visible">
          {segments.map((segment, index) => (
            <motion.path
              key={index}
              d={segment.path}
              fill={segment.color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.1 + index * 0.1,
                duration: 0.5,
                ease: 'backOut',
              }}
              style={{ transformOrigin: 'center' }}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          ))}
        </svg>

        {/* Legend */}
        {showLabels && (
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
                <span className="text-sm" style={{ color: isDark ? '#fff' : '#000' }}>{segment.label}</span>
                <span className="text-sm font-semibold ml-auto" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>
                  {(segment.percentage * 100).toFixed(0)}%
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );

  if (isDark) {
    return (
      <div className="bg-white p-8">
        <div className="bg-black rounded-2xl p-8">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8">
      {content}
    </div>
  );
}

export default PieChart;
