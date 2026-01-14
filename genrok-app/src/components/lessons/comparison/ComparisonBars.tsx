'use client';

import { motion } from 'framer-motion';

interface ComparisonItem {
  label: string;
  value: number;
  maxValue?: number;
}

interface ComparisonBarsProps {
  itemA: ComparisonItem;
  itemB: ComparisonItem;
  title?: string;
  labelA?: string;
  labelB?: string;
  colorA?: string;
  colorB?: string;
  variant?: 'dark' | 'light';
}

/**
 * ComparisonBars - Side by side bar comparison
 * Supports dark (black container) and light (white background) variants
 */
export function ComparisonBars({
  itemA,
  itemB,
  title,
  labelA = 'Before',
  labelB = 'After',
  colorA = '#EF4444',
  colorB = '#88da1c',
  variant = 'dark',
}: ComparisonBarsProps) {
  const isDark = variant === 'dark';

  // Color variables
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const bgTrack = isDark ? 'bg-white/10' : 'bg-black/10';

  const maxValue = Math.max(
    itemA.maxValue || itemA.value,
    itemB.maxValue || itemB.value
  ) * 1.1;

  const percentA = (itemA.value / maxValue) * 100;
  const percentB = (itemB.value / maxValue) * 100;
  const improvement = ((itemB.value - itemA.value) / itemA.value * 100).toFixed(0);

  // Content to render
  const content = (
    <>
      {title && (
        <h3 className={`text-xl font-bold ${textColor} mb-8 text-center`}>{title}</h3>
      )}

      {/* Comparison visualization */}
      <div className="max-w-xl mx-auto">
        {/* Item A */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colorA }}
              />
              <span className={`text-sm font-medium ${textColor}`}>{labelA}</span>
            </div>
            <span className={`text-sm ${mutedColor}`}>{itemA.label}</span>
          </div>
          <div className={`h-12 ${bgTrack} rounded-lg overflow-hidden relative`}>
            <motion.div
              className="h-full rounded-lg flex items-center justify-end pr-4"
              style={{ backgroundColor: colorA }}
              initial={{ width: 0 }}
              animate={{ width: `${percentA}%` }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="text-white font-bold text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {itemA.value.toLocaleString()}
              </motion.span>
            </motion.div>
          </div>
        </motion.div>

        {/* Item B */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colorB }}
              />
              <span className={`text-sm font-medium ${textColor}`}>{labelB}</span>
            </div>
            <span className={`text-sm ${mutedColor}`}>{itemB.label}</span>
          </div>
          <div className={`h-12 ${bgTrack} rounded-lg overflow-hidden relative`}>
            <motion.div
              className="h-full rounded-lg flex items-center justify-end pr-4"
              style={{ backgroundColor: colorB }}
              initial={{ width: 0 }}
              animate={{ width: `${percentB}%` }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="text-black font-bold text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {itemB.value.toLocaleString()}
              </motion.span>
            </motion.div>
          </div>
        </motion.div>

        {/* Improvement indicator */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
            style={{ backgroundColor: `${colorB}20` }}
          >
            <span className={mutedColor}>Improvement:</span>
            <span
              className="text-2xl font-bold"
              style={{ color: colorB }}
            >
              +{improvement}%
            </span>
          </div>
        </motion.div>
      </div>
    </>
  );

  // Conditional rendering based on variant
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
      <div className="p-8">
        {content}
      </div>
    </div>
  );
}

export default ComparisonBars;
