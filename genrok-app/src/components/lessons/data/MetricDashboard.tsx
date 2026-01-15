'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Metric {
  label: string;
  value: string | number;
  change?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
  icon?: LucideIcon;
  highlight?: boolean;
}

interface MetricDashboardProps {
  metrics: Metric[];
  title?: string;
  columns?: 2 | 3 | 4;
  variant?: 'dark' | 'light';
}

/**
 * MetricDashboard - Multiple metrics in a grid
 * Dark: White slide background with dark rounded block
 * Light: White background, no dark container
 */
export function MetricDashboard({
  metrics,
  title,
  columns = 4,
  variant = 'dark',
}: MetricDashboardProps) {
  const isDark = variant === 'dark';

  // Color values based on variant
  const textColorValue = isDark ? '#fff' : '#000';
  const mutedColorValue = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const cardBg = isDark ? 'bg-white/5' : 'bg-black/5';

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };

  const TrendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus,
  };

  const trendColor = {
    up: '#88da1c',
    down: '#EF4444',
    neutral: '#666666',
  };

  const content = (
    <>
      {title && (
        <h3 className="text-xl font-bold mb-6" style={{ color: textColorValue }}>{title}</h3>
      )}

      <div className={`grid ${gridCols[columns]} gap-4`}>
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const ChangeIcon = metric.change ? TrendIcon[metric.change.direction] : null;

          return (
            <motion.div
              key={index}
              className={`${cardBg} rounded-xl p-5 ${
                metric.highlight ? 'ring-2 ring-[#88da1c]/50' : ''
              }`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Header with icon */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: mutedColorValue }}>
                  {metric.label}
                </span>
                {Icon && (
                  <Icon size={16} style={{ color: mutedColorValue }} />
                )}
              </div>

              {/* Value */}
              <motion.div
                className="text-3xl font-bold mb-2"
                style={{ color: metric.highlight ? '#88da1c' : textColorValue }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
              </motion.div>

              {/* Change indicator */}
              {metric.change && ChangeIcon && (
                <motion.div
                  className="flex items-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <ChangeIcon size={14} style={{ color: trendColor[metric.change.direction] }} />
                  <span
                    className="text-sm font-medium"
                    style={{ color: trendColor[metric.change.direction] }}
                  >
                    {metric.change.value}
                  </span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
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

  // Light variant
  return (
    <div className="bg-white p-8">
      <div className="p-8">
        {content}
      </div>
    </div>
  );
}

export default MetricDashboard;
