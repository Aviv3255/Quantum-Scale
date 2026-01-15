'use client';

import { motion } from 'framer-motion';

interface DataPoint {
  label: string;
  value: number;
  predicted?: boolean;
  upperBound?: number;
  lowerBound?: number;
}

interface PredictionBandProps {
  data: DataPoint[];
  title?: string;
  yAxisLabel?: string;
  valuePrefix?: string;
  variant?: 'dark' | 'light';
}

/**
 * PredictionBand - Chart with prediction confidence bands
 * White slide background with dark rounded block
 */
export function PredictionBand({
  data,
  title,
  yAxisLabel,
  valuePrefix = '',
  variant = 'dark',
}: PredictionBandProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  const chartHeight = 240;
  const chartWidth = 500;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };

  const allValues = data.flatMap(d => [
    d.value,
    d.upperBound ?? d.value,
    d.lowerBound ?? d.value,
  ]);
  const maxValue = Math.max(...allValues) * 1.1;
  const minValue = Math.min(...allValues, 0);
  const range = maxValue - minValue || 1;

  const getY = (value: number) => {
    return padding.top + ((maxValue - value) / range) * (chartHeight - padding.top - padding.bottom);
  };

  const getX = (index: number) => {
    return padding.left + (index / (data.length - 1)) * (chartWidth - padding.left - padding.right);
  };

  // Generate path for main line
  const linePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.value)}`)
    .join(' ');

  // Generate path for confidence band
  const predictedData = data.filter(d => d.predicted);
  const startIndex = data.findIndex(d => d.predicted);

  let bandPath = '';
  if (predictedData.length > 0 && startIndex >= 0) {
    // Upper bound path
    const upperPath = predictedData
      .map((d, i) => {
        const x = getX(startIndex + i);
        const y = getY(d.upperBound ?? d.value);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');

    // Lower bound path (reversed)
    const lowerPath = [...predictedData]
      .reverse()
      .map((d, i) => {
        const x = getX(startIndex + predictedData.length - 1 - i);
        const y = getY(d.lowerBound ?? d.value);
        return `L ${x} ${y}`;
      })
      .join(' ');

    bandPath = `${upperPath} ${lowerPath} Z`;
  }

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xl font-bold ${textColor} text-center mb-6`}
        >
          {title}
        </motion.h3>
      )}

      <div className="overflow-x-auto">
        <svg width={chartWidth} height={chartHeight} className="mx-auto">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = padding.top + ratio * (chartHeight - padding.top - padding.bottom);
            const value = maxValue - ratio * range;
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={chartWidth - padding.right}
                  y2={y}
                  stroke={gridColor}
                  strokeDasharray="4,4"
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  fill={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
                  fontSize={10}
                  textAnchor="end"
                >
                  {valuePrefix}{Math.round(value)}
                </text>
              </g>
            );
          })}

          {/* Confidence band */}
          {bandPath && (
            <motion.path
              d={bandPath}
              fill="#3B82F6"
              fillOpacity={0.2}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
          )}

          {/* Historical line */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="#88da1c"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Prediction divider */}
          {startIndex > 0 && (
            <motion.line
              x1={getX(startIndex)}
              y1={padding.top}
              x2={getX(startIndex)}
              y2={chartHeight - padding.bottom}
              stroke={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}
              strokeDasharray="8,4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            />
          )}

          {/* Data points */}
          {data.map((d, i) => (
            <motion.circle
              key={i}
              cx={getX(i)}
              cy={getY(d.value)}
              r={d.predicted ? 4 : 5}
              fill={d.predicted ? '#3B82F6' : '#88da1c'}
              stroke={isDark ? '#000' : '#fff'}
              strokeWidth={2}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05, type: 'spring', stiffness: 200 }}
            />
          ))}

          {/* X-axis labels */}
          {data.map((d, i) => (
            <motion.text
              key={i}
              x={getX(i)}
              y={chartHeight - 10}
              fill={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
              fontSize={10}
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
            >
              {d.label}
            </motion.text>
          ))}

          {/* Y-axis label */}
          {yAxisLabel && (
            <text
              x={15}
              y={chartHeight / 2}
              fill={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
              fontSize={10}
              textAnchor="middle"
              transform={`rotate(-90, 15, ${chartHeight / 2})`}
            >
              {yAxisLabel}
            </text>
          )}
        </svg>
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex justify-center gap-6 mt-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#88da1c]" />
          <span className={`text-xs ${mutedColor}`}>Historical</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
          <span className={`text-xs ${mutedColor}`}>Predicted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-3 rounded bg-[#3B82F6]/20" />
          <span className={`text-xs ${mutedColor}`}>Confidence Band</span>
        </div>
      </motion.div>
    </>
  );

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      {isDark ? (
        <div className="bg-black rounded-2xl p-8 w-full max-w-2xl">{content}</div>
      ) : (
        <div className="w-full max-w-2xl">{content}</div>
      )}
    </div>
  );
}

export default PredictionBand;
