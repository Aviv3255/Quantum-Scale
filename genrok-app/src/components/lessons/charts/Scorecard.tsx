'use client';

import { motion } from 'framer-motion';

interface ScoreItem {
  label: string;
  value: number;
  maxValue?: number;
  target?: number;
}

interface ScorecardProps {
  title?: string;
  items: ScoreItem[];
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function Scorecard({
  title,
  items,
  accentColor = '#88da1c',
  variant = 'dark',
}: ScorecardProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const mutedColor70 = isDark ? 'text-white/70' : 'text-black/70';
  const mutedColor40 = isDark ? 'text-white/40' : 'text-black/40';
  const bgTrack = isDark ? 'bg-white/10' : 'bg-black/10';
  const borderColor = isDark ? 'border-white/10' : 'border-black/10';
  const targetMarkerBg = isDark ? 'bg-white/50' : 'bg-black/50';

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xl font-bold ${textColor} text-center mb-8`}
          style={{ fontFamily: "'General Sans', sans-serif" }}
        >
          {title}
        </motion.h3>
      )}

      <div className="space-y-6">
        {items.map((item, i) => {
          const maxValue = item.maxValue || 100;
          const percentage = (item.value / maxValue) * 100;
          const isOnTarget = item.target !== undefined ? item.value >= item.target : true;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`${mutedColor70} text-sm`}>{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className={`${textColor} font-bold`}>{item.value}</span>
                  {item.target && (
                    <span className={`${mutedColor40} text-sm`}>/ {item.target}</span>
                  )}
                </div>
              </div>

              <div className={`relative h-3 ${bgTrack} rounded-full overflow-hidden`}>
                {/* Target marker */}
                {item.target && (
                  <div
                    className={`absolute top-0 bottom-0 w-0.5 ${targetMarkerBg} z-10`}
                    style={{ left: `${(item.target / maxValue) * 100}%` }}
                  />
                )}

                {/* Progress bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(percentage, 100)}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: isOnTarget ? accentColor : '#EF4444',
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className={`mt-8 pt-6 border-t ${borderColor}`}
      >
        <div className="flex justify-between items-center">
          <span className={`${mutedColor} text-sm`}>Overall Score</span>
          <span
            className="text-2xl font-bold"
            style={{ color: accentColor }}
          >
            {Math.round(
              items.reduce((sum, item) => {
                const max = item.maxValue || 100;
                return sum + (item.value / max) * 100;
              }, 0) / items.length
            )}%
          </span>
        </div>
      </motion.div>
    </>
  );

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      {isDark ? (
        <div className="bg-black rounded-2xl p-8 w-full max-w-lg">
          {content}
        </div>
      ) : (
        <div className="w-full max-w-lg">
          {content}
        </div>
      )}
    </div>
  );
}

export default Scorecard;
