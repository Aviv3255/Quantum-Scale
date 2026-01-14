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
}

/**
 * PieChart - Animated pie chart with segments
 * White slide background with dark rounded block
 */
export function PieChart({
  data,
  title,
  size = 240,
  showLabels = true,
}: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const center = size / 2;
  const radius = size / 2 - 10;

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

  return (
    <div className="bg-white p-8">
      <div className="bg-black rounded-2xl p-8">
        {title && (
          <h3 className="text-xl font-bold text-white mb-6 text-center">{title}</h3>
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
                  <span className="text-sm text-white">{segment.label}</span>
                  <span className="text-sm font-semibold text-white/60 ml-auto">
                    {(segment.percentage * 100).toFixed(0)}%
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PieChart;
