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
}

/**
 * MetricDashboard - Multiple metrics in a grid
 * White slide background with dark rounded block
 */
export function MetricDashboard({
  metrics,
  title,
  columns = 4,
}: MetricDashboardProps) {
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

  return (
    <div className="bg-white p-8">
      <div className="bg-black rounded-2xl p-8">
        {title && (
          <h3 className="text-xl font-bold text-white mb-6">{title}</h3>
        )}

        <div className={`grid ${gridCols[columns]} gap-4`}>
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const ChangeIcon = metric.change ? TrendIcon[metric.change.direction] : null;

            return (
              <motion.div
                key={index}
                className={`bg-white/5 rounded-xl p-5 ${
                  metric.highlight ? 'ring-2 ring-[#88da1c]/50' : ''
                }`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Header with icon */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                    {metric.label}
                  </span>
                  {Icon && (
                    <Icon size={16} className="text-white/50" />
                  )}
                </div>

                {/* Value */}
                <motion.div
                  className={`text-3xl font-bold ${metric.highlight ? 'text-[#88da1c]' : 'text-white'} mb-2`}
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
      </div>
    </div>
  );
}

export default MetricDashboard;
