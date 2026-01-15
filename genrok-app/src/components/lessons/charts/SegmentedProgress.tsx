'use client';

import { motion } from 'framer-motion';

interface Segment {
  label: string;
  value: number;
  max: number;
  color: string;
}

interface SegmentedProgressProps {
  segments: Segment[];
  title?: string;
  showPercentages?: boolean;
  variant?: 'dark' | 'light';
}

/**
 * SegmentedProgress - Multi-segment progress bar visualization
 * White slide background with dark rounded block
 */
export function SegmentedProgress({
  segments,
  title,
  showPercentages = true,
  variant = 'dark',
}: SegmentedProgressProps) {
  const isDark = variant === 'dark';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const trackColor = isDark ? 'bg-white/10' : 'bg-black/10';

  const totalValue = segments.reduce((sum, s) => sum + s.value, 0);
  const totalMax = segments.reduce((sum, s) => sum + s.max, 0);
  const overallPercentage = (totalValue / totalMax) * 100;

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-center mb-6"
          style={{ color: isDark ? '#fff' : '#000' }}
        >
          {title}
        </motion.h3>
      )}

      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium" style={{ color: isDark ? '#fff' : '#000' }}>Overall Progress</span>
          <span className="text-sm font-bold" style={{ color: isDark ? '#fff' : '#000' }}>
            {Math.round(overallPercentage)}%
          </span>
        </div>
        <div className={`h-4 ${trackColor} rounded-full overflow-hidden`}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-[#88da1c]"
            initial={{ width: 0 }}
            animate={{ width: `${overallPercentage}%` }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>
      </motion.div>

      {/* Individual Segments */}
      <div className="space-y-4">
        {segments.map((segment, index) => {
          const percentage = (segment.value / segment.max) * 100;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {/* Segment Header */}
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  <span className="text-sm font-medium" style={{ color: isDark ? '#fff' : '#000' }}>
                    {segment.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${mutedColor}`}>
                    {segment.value}/{segment.max}
                  </span>
                  {showPercentages && (
                    <span
                      className="text-xs font-bold"
                      style={{ color: segment.color }}
                    >
                      {Math.round(percentage)}%
                    </span>
                  )}
                </div>
              </div>

              {/* Segment Bar */}
              <div className={`h-2 ${trackColor} rounded-full overflow-hidden`}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: segment.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stacked Bar View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <span className="text-sm font-medium mb-2 block" style={{ color: isDark ? '#fff' : '#000' }}>
          Distribution
        </span>
        <div className="flex h-8 rounded-lg overflow-hidden">
          {segments.map((segment, index) => {
            const widthPercent = (segment.max / totalMax) * 100;
            const fillPercent = (segment.value / segment.max) * 100;

            return (
              <motion.div
                key={index}
                className="relative"
                style={{ width: `${widthPercent}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.05 }}
              >
                {/* Background */}
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: `${segment.color}30` }}
                />
                {/* Fill */}
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{ backgroundColor: segment.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${fillPercent}%` }}
                  transition={{
                    duration: 0.6,
                    delay: 1 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                {/* Divider */}
                {index < segments.length - 1 && (
                  <div
                    className={`absolute right-0 top-0 bottom-0 w-px ${
                      isDark ? 'bg-black' : 'bg-white'
                    }`}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className={`text-center mt-4 text-sm ${mutedColor}`}
      >
        {segments.filter(s => s.value >= s.max).length} of {segments.length} segments completed
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

export default SegmentedProgress;
