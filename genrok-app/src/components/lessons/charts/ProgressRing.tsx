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
  variant?: 'dark' | 'light';
}

/**
 * ProgressRing - Animated circular progress indicator
 * White slide background with dark rounded block
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
  variant = 'dark',
}: ProgressRingProps) {
  const isDark = variant === 'dark';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const trackColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min((value / maxValue) * 100, 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const content = (
    <>
      {label && (
        <h3 className="text-lg font-bold mb-4" style={{ color: isDark ? '#fff' : '#000' }}>{label}</h3>
      )}

      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
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
                className="text-4xl font-bold"
                style={{ color: isDark ? '#fff' : '#000' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {Math.round(percentage)}%
              </motion.span>
              {sublabel && (
                <span className={`text-sm ${mutedColor} mt-1`}>{sublabel}</span>
              )}
            </>
          ) : (
            <>
              <motion.span
                className="text-4xl font-bold"
                style={{ color: isDark ? '#fff' : '#000' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {value.toLocaleString()}
              </motion.span>
              <span className={`text-sm ${mutedColor} mt-1`}>
                of {maxValue.toLocaleString()}
              </span>
            </>
          )}
        </motion.div>
      </div>
    </>
  );

  return (
    <div className="bg-white p-8">
      {isDark ? (
        <div className="bg-black rounded-2xl p-8 flex flex-col items-center">
          {content}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {content}
        </div>
      )}
    </div>
  );
}

export default ProgressRing;
