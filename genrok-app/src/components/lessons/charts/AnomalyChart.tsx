'use client';

import { motion } from 'framer-motion';

interface DataPoint {
  label: string;
  value: number;
  isAnomaly?: boolean;
  anomalyType?: 'high' | 'low';
  note?: string;
}

interface AnomalyChartProps {
  data: DataPoint[];
  title?: string;
  threshold?: { upper: number; lower: number };
  valuePrefix?: string;
  variant?: 'dark' | 'light';
}

/**
 * AnomalyChart - Time series with anomaly highlights
 * White slide background with dark rounded block
 */
export function AnomalyChart({
  data,
  title,
  threshold,
  valuePrefix = '',
  variant = 'dark',
}: AnomalyChartProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  const chartHeight = 260;
  const chartWidth = 520;
  const padding = { top: 30, right: 20, bottom: 50, left: 50 };

  const values = data.map(d => d.value);
  const maxValue = Math.max(...values, threshold?.upper ?? 0) * 1.1;
  const minValue = Math.min(...values, threshold?.lower ?? 0, 0) * 0.9;
  const range = maxValue - minValue || 1;

  const getY = (value: number) => {
    return padding.top + ((maxValue - value) / range) * (chartHeight - padding.top - padding.bottom);
  };

  const getX = (index: number) => {
    return padding.left + (index / (data.length - 1)) * (chartWidth - padding.left - padding.right);
  };

  // Generate line path
  const linePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.value)}`)
    .join(' ');

  // Generate area path
  const areaPath = `${linePath} L ${getX(data.length - 1)} ${chartHeight - padding.bottom} L ${getX(0)} ${chartHeight - padding.bottom} Z`;

  const anomalies = data.filter(d => d.isAnomaly);

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

          {/* Threshold bands */}
          {threshold && (
            <>
              {/* Upper threshold area */}
              <motion.rect
                x={padding.left}
                y={padding.top}
                width={chartWidth - padding.left - padding.right}
                height={getY(threshold.upper) - padding.top}
                fill="#EF4444"
                fillOpacity={0.1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
              {/* Lower threshold area */}
              <motion.rect
                x={padding.left}
                y={getY(threshold.lower)}
                width={chartWidth - padding.left - padding.right}
                height={chartHeight - padding.bottom - getY(threshold.lower)}
                fill="#F59E0B"
                fillOpacity={0.1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
              {/* Upper threshold line */}
              <motion.line
                x1={padding.left}
                y1={getY(threshold.upper)}
                x2={chartWidth - padding.right}
                y2={getY(threshold.upper)}
                stroke="#EF4444"
                strokeWidth={1}
                strokeDasharray="8,4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              />
              {/* Lower threshold line */}
              <motion.line
                x1={padding.left}
                y1={getY(threshold.lower)}
                x2={chartWidth - padding.right}
                y2={getY(threshold.lower)}
                stroke="#F59E0B"
                strokeWidth={1}
                strokeDasharray="8,4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              />
            </>
          )}

          {/* Area under line */}
          <motion.path
            d={areaPath}
            fill="url(#anomalyGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.5 }}
          />

          {/* Line */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="#88da1c"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Data points */}
          {data.map((d, i) => (
            <motion.g key={i}>
              {/* Normal point */}
              <motion.circle
                cx={getX(i)}
                cy={getY(d.value)}
                r={d.isAnomaly ? 6 : 4}
                fill={d.isAnomaly ? (d.anomalyType === 'high' ? '#EF4444' : '#F59E0B') : '#88da1c'}
                stroke={isDark ? '#000' : '#fff'}
                strokeWidth={2}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.03, type: 'spring', stiffness: 200 }}
              />

              {/* Anomaly pulse */}
              {d.isAnomaly && (
                <motion.circle
                  cx={getX(i)}
                  cy={getY(d.value)}
                  r={6}
                  fill="none"
                  stroke={d.anomalyType === 'high' ? '#EF4444' : '#F59E0B'}
                  strokeWidth={2}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
            </motion.g>
          ))}

          {/* X-axis labels */}
          {data.map((d, i) => (
            <motion.text
              key={i}
              x={getX(i)}
              y={chartHeight - 20}
              fill={d.isAnomaly ? (d.anomalyType === 'high' ? '#EF4444' : '#F59E0B') : isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
              fontSize={9}
              textAnchor="middle"
              fontWeight={d.isAnomaly ? 'bold' : 'normal'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.03 }}
            >
              {d.label}
            </motion.text>
          ))}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="anomalyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#88da1c" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#88da1c" stopOpacity={0} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Anomaly annotations */}
      {anomalies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-4"
        >
          <h4 className={`text-sm font-semibold ${textColor} mb-2`}>Detected Anomalies</h4>
          <div className="space-y-2">
            {anomalies.map((anomaly, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + i * 0.1 }}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                  isDark ? 'bg-white/5' : 'bg-black/5'
                }`}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: anomaly.anomalyType === 'high' ? '#EF4444' : '#F59E0B',
                  }}
                />
                <span className={`text-sm ${textColor}`}>
                  <span className="font-medium">{anomaly.label}:</span>{' '}
                  {valuePrefix}{anomaly.value} ({anomaly.anomalyType === 'high' ? 'Above' : 'Below'} threshold)
                </span>
                {anomaly.note && (
                  <span className={`text-xs ${mutedColor}`}>- {anomaly.note}</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex justify-center gap-6 mt-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#88da1c]" />
          <span className={`text-xs ${mutedColor}`}>Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
          <span className={`text-xs ${mutedColor}`}>High Anomaly</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
          <span className={`text-xs ${mutedColor}`}>Low Anomaly</span>
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

export default AnomalyChart;
