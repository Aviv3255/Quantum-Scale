'use client';

import { motion } from 'framer-motion';

interface SparklineProps {
  data: number[];
  label?: string;
  value?: string;
  change?: number;
  accentColor?: string;
  width?: number;
  height?: number;
}

export function Sparkline({
  data,
  label,
  value,
  change,
  accentColor = '#88da1c',
  width = 120,
  height = 40,
}: SparklineProps) {
  const padding = 4;
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);

  const scaleX = (index: number) =>
    padding + (index * (width - 2 * padding)) / (data.length - 1);
  const scaleY = (val: number) =>
    height - padding - ((val - minValue) / (maxValue - minValue)) * (height - 2 * padding);

  const path = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(d)}`)
    .join(' ');

  const isPositive = change !== undefined ? change >= 0 : data[data.length - 1] >= data[0];
  const lineColor = isPositive ? accentColor : '#EF4444';

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-8">
        <div className="flex items-center gap-6">
          {/* Sparkline */}
          <svg width={width} height={height} className="flex-shrink-0">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
              d={path}
              fill="none"
              stroke={lineColor}
              strokeWidth="2"
            />
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 }}
              cx={scaleX(data.length - 1)}
              cy={scaleY(data[data.length - 1])}
              r="3"
              fill={lineColor}
            />
          </svg>

          {/* Info */}
          <div className="flex flex-col">
            {label && (
              <span className="text-white/50 text-sm">{label}</span>
            )}
            {value && (
              <span className="text-white text-2xl font-bold">{value}</span>
            )}
            {change !== undefined && (
              <span
                className="text-sm font-medium"
                style={{ color: isPositive ? accentColor : '#EF4444' }}
              >
                {isPositive ? '+' : ''}{change}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sparkline;
