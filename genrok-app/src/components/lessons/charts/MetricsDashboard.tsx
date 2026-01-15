'use client';

import { motion } from 'framer-motion';

interface Metric {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  sparkline?: number[];
  target?: number;
  icon?: 'users' | 'revenue' | 'chart' | 'time' | 'percent' | 'star';
}

interface MetricsDashboardProps {
  title?: string;
  metrics: Metric[];
  columns?: 2 | 3 | 4;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

const iconPaths: Record<string, string> = {
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  revenue: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  chart: 'M18 20V10M12 20V4M6 20v-6',
  time: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
  percent: 'M19 5L5 19M6.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM17.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
};

export function MetricsDashboard({
  title,
  metrics,
  columns = 3,
  accentColor = '#88da1c',
  variant = 'dark',
}: MetricsDashboardProps) {
  const isDark = variant === 'dark';
  const cardBg = isDark ? 'bg-white/5' : 'bg-black/5';
  const sparklineBg = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  const getTrendColor = (trend?: 'up' | 'down' | 'neutral', change?: number) => {
    if (trend === 'up') return '#22C55E';
    if (trend === 'down') return '#EF4444';
    if (change !== undefined) {
      return change >= 0 ? '#22C55E' : '#EF4444';
    }
    return '#F59E0B';
  };

  const renderSparkline = (data: number[], color: string) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 80;
    const height = 24;

    const points = data
      .map((value, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={(data.length - 1) / (data.length - 1) * width}
          cy={height - ((data[data.length - 1] - min) / range) * height}
          r="3"
          fill={color}
        />
      </svg>
    );
  };

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-center mb-8"
          style={{ fontFamily: "'General Sans', sans-serif", color: isDark ? '#fff' : '#000' }}
        >
          {title}
        </motion.h3>
      )}

      <div className={`grid ${gridCols[columns]} gap-4`}>
        {metrics.map((metric, i) => {
          const trendColor = getTrendColor(metric.trend, metric.change);
          const effectiveTrend =
            metric.trend ||
            (metric.change !== undefined
              ? metric.change >= 0
                ? 'up'
                : 'down'
              : 'neutral');

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className={`${cardBg} rounded-xl p-4`}
            >
              {/* Header with icon */}
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>{metric.label}</span>
                {metric.icon && (
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${accentColor}20` }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={accentColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={iconPaths[metric.icon]} />
                    </svg>
                  </div>
                )}
              </div>

              {/* Value */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "'General Sans', sans-serif", color: isDark ? '#fff' : '#000' }}
              >
                {metric.value}
              </motion.div>

              {/* Change and sparkline */}
              <div className="flex items-center justify-between">
                {metric.change !== undefined && (
                  <span
                    className="text-sm font-semibold flex items-center gap-1"
                    style={{ color: trendColor }}
                  >
                    {effectiveTrend === 'up'
                      ? '+'
                      : effectiveTrend === 'down'
                        ? ''
                        : ''}
                    {metric.change}%
                    <span className="text-xs">
                      {effectiveTrend === 'up'
                        ? '↑'
                        : effectiveTrend === 'down'
                          ? '↓'
                          : '→'}
                    </span>
                  </span>
                )}

                {metric.sparkline && metric.sparkline.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                  >
                    {renderSparkline(metric.sparkline, trendColor)}
                  </motion.div>
                )}
              </div>

              {/* Target */}
              {metric.target !== undefined && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  className="mt-3"
                >
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Progress</span>
                    <span style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>
                      {typeof metric.value === 'number'
                        ? Math.round((metric.value / metric.target) * 100)
                        : 0}
                      %
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: sparklineBg }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          typeof metric.value === 'number'
                            ? Math.min((metric.value / metric.target) * 100, 100)
                            : 0
                        }%`,
                      }}
                      transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </>
  );

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      {isDark ? (
        <div className="bg-black rounded-2xl p-8 w-full max-w-3xl">{content}</div>
      ) : (
        <div className="w-full max-w-3xl">{content}</div>
      )}
    </div>
  );
}

export default MetricsDashboard;
