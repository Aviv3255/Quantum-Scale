'use client';

import { motion } from 'framer-motion';

interface KeyResult {
  title: string;
  current: number;
  target: number;
  unit?: string;
}

interface Objective {
  title: string;
  keyResults: KeyResult[];
}

interface OKRTrackerProps {
  objectives: Objective[];
  title?: string;
  variant?: 'dark' | 'light';
}

/**
 * OKRTracker - OKR progress tracking visualization
 * Shows objectives with their key results and progress
 */
export function OKRTracker({
  objectives = [
    {
      title: 'Increase Revenue',
      keyResults: [
        { title: 'Monthly recurring revenue', current: 85000, target: 100000, unit: '$' },
        { title: 'New customers acquired', current: 45, target: 50 },
        { title: 'Customer retention rate', current: 92, target: 95, unit: '%' },
      ],
    },
    {
      title: 'Improve Product Quality',
      keyResults: [
        { title: 'Bug fix rate', current: 88, target: 95, unit: '%' },
        { title: 'User satisfaction score', current: 4.2, target: 4.5 },
      ],
    },
  ],
  title,
  variant = 'dark',
}: OKRTrackerProps) {
  const isDark = variant === 'dark';
  const borderColor = isDark ? 'border-white/10' : 'border-black/10';
  const bgMuted = isDark ? 'bg-white/5' : 'bg-black/5';
  const trackBg = isDark ? 'bg-white/10' : 'bg-black/10';

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return '#34C759';
    if (percentage >= 70) return '#88da1c';
    if (percentage >= 40) return '#FF9500';
    return '#FF3B30';
  };

  const getOverallProgress = (obj: Objective) => {
    const total = obj.keyResults.reduce((acc, kr) => {
      const pct = Math.min((kr.current / kr.target) * 100, 100);
      return acc + pct;
    }, 0);
    return Math.round(total / obj.keyResults.length);
  };

  const formatValue = (value: number, unit?: string) => {
    if (unit === '$') return `$${value.toLocaleString()}`;
    if (unit === '%') return `${value}%`;
    return value.toLocaleString();
  };

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

      <div className="space-y-6">
        {objectives.map((objective, objIndex) => {
          const overallProgress = getOverallProgress(objective);
          const progressColor = getProgressColor(overallProgress);

          return (
            <motion.div
              key={objIndex}
              className={`${bgMuted} rounded-xl p-5 border ${borderColor}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + objIndex * 0.15 }}
            >
              {/* Objective header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: progressColor }}
                  >
                    O{objIndex + 1}
                  </div>
                  <h4 className="font-semibold" style={{ color: isDark ? '#fff' : '#000' }}>{objective.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-bold`} style={{ color: progressColor }}>
                    {overallProgress}%
                  </span>
                </div>
              </div>

              {/* Key Results */}
              <div className="space-y-4 ml-13">
                {objective.keyResults.map((kr, krIndex) => {
                  const percentage = Math.min((kr.current / kr.target) * 100, 100);
                  const krColor = getProgressColor(percentage);

                  return (
                    <motion.div
                      key={krIndex}
                      className="space-y-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + objIndex * 0.15 + krIndex * 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>KR{krIndex + 1}</span>
                          <span className="text-sm" style={{ color: isDark ? '#fff' : '#000' }}>{kr.title}</span>
                        </div>
                        <span className="text-sm font-medium" style={{ color: isDark ? '#fff' : '#000' }}>
                          {formatValue(kr.current, kr.unit)} / {formatValue(kr.target, kr.unit)}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className={`h-2 ${trackBg} rounded-full overflow-hidden`}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: krColor }}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: 0.6 + objIndex * 0.15 + krIndex * 0.1, duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>

                      {/* Percentage label */}
                      <div className="flex justify-end">
                        <span
                          className="text-xs font-medium"
                          style={{ color: krColor }}
                        >
                          {Math.round(percentage)}%
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Overall summary */}
      <motion.div
        className={`mt-6 flex justify-center gap-8 pt-4 border-t ${borderColor}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="text-center">
          <div className="text-3xl font-bold" style={{ color: isDark ? '#fff' : '#000' }}>
            {Math.round(objectives.reduce((acc, obj) => acc + getOverallProgress(obj), 0) / objectives.length)}%
          </div>
          <div className="text-xs mt-1" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Overall Progress</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold" style={{ color: isDark ? '#fff' : '#000' }}>
            {objectives.length}
          </div>
          <div className="text-xs mt-1" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Objectives</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold" style={{ color: isDark ? '#fff' : '#000' }}>
            {objectives.reduce((acc, obj) => acc + obj.keyResults.length, 0)}
          </div>
          <div className="text-xs mt-1" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Key Results</div>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        className="mt-4 flex justify-center gap-4 text-xs"
        style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#34C759' }} />
          <span>On Track (100%+)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#88da1c' }} />
          <span>Good (70-99%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#FF9500' }} />
          <span>At Risk (40-69%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#FF3B30' }} />
          <span>Behind (&lt;40%)</span>
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

export default OKRTracker;
