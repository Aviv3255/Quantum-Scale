'use client';

import { motion } from 'framer-motion';

interface ThermometerChartProps {
  value: number;
  goal: number;
  title?: string;
  valuePrefix?: string;
  milestones?: { value: number; label: string }[];
  variant?: 'dark' | 'light';
}

/**
 * ThermometerChart - Goal thermometer visualization
 * White slide background with dark rounded block
 */
export function ThermometerChart({
  value,
  goal,
  title,
  valuePrefix = '$',
  milestones = [],
  variant = 'dark',
}: ThermometerChartProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const tubeColor = isDark ? 'bg-white/10' : 'bg-black/10';

  const percentage = Math.min((value / goal) * 100, 100);
  const isGoalReached = value >= goal;

  const getColor = () => {
    if (isGoalReached) return '#22C55E';
    if (percentage >= 75) return '#88da1c';
    if (percentage >= 50) return '#F59E0B';
    if (percentage >= 25) return '#F97316';
    return '#EF4444';
  };

  const fillColor = getColor();

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

      <div className="flex justify-center gap-8">
        {/* Thermometer */}
        <div className="relative flex flex-col items-center">
          {/* Goal label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`text-sm font-bold ${textColor} mb-2`}
          >
            Goal: {valuePrefix}{goal.toLocaleString()}
          </motion.div>

          {/* Tube */}
          <div className={`relative w-16 h-64 ${tubeColor} rounded-full overflow-hidden`}>
            {/* Fill */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 rounded-full"
              style={{ backgroundColor: fillColor }}
              initial={{ height: 0 }}
              animate={{ height: `${percentage}%` }}
              transition={{
                duration: 1.5,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            {/* Graduation marks */}
            {[25, 50, 75, 100].map((mark) => (
              <div
                key={mark}
                className={`absolute left-0 right-0 h-px ${isDark ? 'bg-white/30' : 'bg-black/30'}`}
                style={{ bottom: `${mark}%` }}
              />
            ))}
          </div>

          {/* Bulb */}
          <motion.div
            className="relative -mt-4 w-24 h-24 rounded-full flex items-center justify-center"
            style={{ backgroundColor: fillColor }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-white font-bold text-lg">
              {Math.round(percentage)}%
            </span>
          </motion.div>

          {/* Current value */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={`mt-4 text-center`}
          >
            <span className={`text-2xl font-bold ${textColor}`}>
              {valuePrefix}{value.toLocaleString()}
            </span>
            <span className={`block text-sm ${mutedColor}`}>Current</span>
          </motion.div>
        </div>

        {/* Milestones */}
        {milestones.length > 0 && (
          <div className="relative h-64 flex flex-col justify-between py-4">
            {milestones.sort((a, b) => b.value - a.value).map((milestone, index) => {
              const milestonePercent = (milestone.value / goal) * 100;
              const isReached = value >= milestone.value;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3"
                  style={{
                    position: 'absolute',
                    bottom: `${Math.min(milestonePercent, 100)}%`,
                    transform: 'translateY(50%)',
                  }}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isReached ? 'bg-[#22C55E]' : isDark ? 'bg-white/30' : 'bg-black/30'
                    }`}
                  />
                  <div className="flex flex-col">
                    <span className={`text-xs font-medium ${isReached ? 'text-[#22C55E]' : textColor}`}>
                      {milestone.label}
                    </span>
                    <span className={`text-xs ${mutedColor}`}>
                      {valuePrefix}{milestone.value.toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Status message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className={`text-center mt-6 text-sm ${
          isGoalReached ? 'text-[#22C55E]' : mutedColor
        }`}
      >
        {isGoalReached ? (
          'Goal reached!'
        ) : (
          `${valuePrefix}${(goal - value).toLocaleString()} remaining to reach goal`
        )}
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

export default ThermometerChart;
