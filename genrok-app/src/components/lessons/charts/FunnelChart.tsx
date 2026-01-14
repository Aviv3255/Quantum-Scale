'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface FunnelStage {
  label: string;
  value: number;
  color?: string;
}

interface FunnelChartProps {
  data: FunnelStage[];
  title?: string;
  subtitle?: string;
  showConversion?: boolean;
}

/**
 * FunnelChart - Animated conversion funnel
 * White slide background with dark rounded block
 */
export function FunnelChart({
  data,
  title,
  subtitle,
  showConversion = true,
}: FunnelChartProps) {
  const maxValue = data[0]?.value || 100;

  // Default colors - gradient from green to amber
  const defaultColors = [
    '#88da1c',
    '#6DD400',
    '#52C41A',
    '#3B82F6',
    '#8B5CF6',
  ];

  return (
    <div className="bg-white p-8">
      <div className="bg-black rounded-2xl p-8">
        {/* Header */}
        {(title || subtitle) && (
          <div className="mb-8 text-center">
            {title && <h3 className="text-xl font-bold text-white mb-1">{title}</h3>}
            {subtitle && <p className="text-sm text-white/50">{subtitle}</p>}
          </div>
        )}

        {/* Funnel */}
        <div className="max-w-md mx-auto space-y-2">
          {data.map((stage, index) => {
            const widthPercent = (stage.value / maxValue) * 100;
            const color = stage.color || defaultColors[index % defaultColors.length];
            const prevValue = index > 0 ? data[index - 1].value : stage.value;
            const conversionRate = ((stage.value / prevValue) * 100).toFixed(1);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                {/* Stage bar */}
                <div className="flex justify-center">
                  <motion.div
                    className="relative h-16 rounded-lg flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPercent}%` }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2 + index * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {/* Inner glow */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: `linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)`,
                      }}
                    />

                    {/* Content */}
                    <motion.div
                      className="relative z-10 flex items-center gap-3 px-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.15 }}
                    >
                      <span className="text-black font-bold text-lg">
                        {stage.value.toLocaleString()}
                      </span>
                      <span className="text-black/70 text-sm font-medium">
                        {stage.label}
                      </span>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Conversion rate indicator */}
                {showConversion && index > 0 && (
                  <motion.div
                    className="flex justify-center items-center gap-2 py-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.15 }}
                  >
                    <ArrowDown size={14} className="text-white/50" />
                    <span className={`text-xs font-medium ${
                      parseFloat(conversionRate) >= 50 ? 'text-[#88da1c]' : 'text-amber-500'
                    }`}>
                      {conversionRate}% conversion
                    </span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Overall conversion */}
        {showConversion && data.length > 1 && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + data.length * 0.15 }}
          >
            <div className="text-sm text-white/50 mb-1">Overall Conversion</div>
            <div className="text-3xl font-bold text-[#88da1c]">
              {((data[data.length - 1].value / data[0].value) * 100).toFixed(1)}%
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default FunnelChart;
