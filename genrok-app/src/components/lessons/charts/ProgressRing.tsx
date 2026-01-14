'use client';

import { motion } from 'framer-motion';

interface ProgressRingProps {
  value: number;
  maxValue?: number;
  size?: number;
  thickness?: number;
  label?: string;
  sublabel?: string;
  accentColor?: string;
  showPercent?: boolean;
  darkMode?: boolean;
}

/**
 * ProgressRing - Animated circular progress indicator
 * Elite design with smooth fill animation
 */
export function ProgressRing({
  value,
  maxValue = 100,
  size = 200,
  thickness = 16,
  label,
  sublabel,
  accentColor = '#88da1c',
  showPercent = true,
  darkMode = true,
}: ProgressRingProps) {
  const bgClass = darkMode ? 'bg-black' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-black';
  const mutedClass = darkMode ? 'text-white/50' : 'text-[#666666]';

  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min((value / maxValue) * 100, 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`${bgClass} p-8 rounded-2xl flex flex-col items-center`}>
      {label && (
        <h3 className={`text-lg font-bold ${textClass} mb-4`}>{label}</h3>
      )}

      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}
            strokeWidth={thickness}
          />

          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={accentColor}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{
              duration: 1.5,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }}
            style={{
              filter: `drop-shadow(0 0 12px ${accentColor}50)`,
            }}
          />
        </svg>

        {/* Center content */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {showPercent ? (
            <>
              <motion.span
                className={`text-4xl font-bold ${textClass}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {Math.round(percentage)}%
              </motion.span>
              {sublabel && (
                <span className={`text-sm ${mutedClass} mt-1`}>{sublabel}</span>
              )}
            </>
          ) : (
            <>
              <motion.span
                className={`text-4xl font-bold ${textClass}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {value.toLocaleString()}
              </motion.span>
              <span className={`text-sm ${mutedClass} mt-1`}>
                of {maxValue.toLocaleString()}
              </span>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default ProgressRing;
