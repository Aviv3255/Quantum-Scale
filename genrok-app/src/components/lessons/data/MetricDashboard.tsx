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
  darkMode?: boolean;
}

/**
 * MetricDashboard - Multiple metrics in a grid
 * Elite design for KPI displays
 */
export function MetricDashboard({
  metrics,
  title,
  columns = 4,
  darkMode = true,
}: MetricDashboardProps) {
  const bgClass = darkMode ? 'bg-black' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-black';
  const mutedClass = darkMode ? 'text-white/50' : 'text-[#666666]';
  const cardBgClass = darkMode ? 'bg-white/5' : 'bg-[#F8F9FA]';

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
    <div className={`${bgClass} p-8 rounded-2xl`}>
      {title && (
        <h3 className={`text-xl font-bold ${textClass} mb-6`}>{title}</h3>
      )}

      <div className={`grid ${gridCols[columns]} gap-4`}>
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const ChangeIcon = metric.change ? TrendIcon[metric.change.direction] : null;

          return (
            <motion.div
              key={index}
              className={`${cardBgClass} rounded-xl p-5 ${
                metric.highlight ? 'ring-2 ring-[#88da1c]/50' : ''
              }`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Header with icon */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-medium uppercase tracking-wider ${mutedClass}`}>
                  {metric.label}
                </span>
                {Icon && (
                  <Icon size={16} className={mutedClass} />
                )}
              </div>

              {/* Value */}
              <motion.div
                className={`text-3xl font-bold ${metric.highlight ? 'text-[#88da1c]' : textClass} mb-2`}
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
  );
}

export default MetricDashboard;
