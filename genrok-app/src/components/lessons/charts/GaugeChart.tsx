'use client';

import { motion } from 'framer-motion';

interface GaugeChartProps {
  value: number;
  maxValue?: number;
  title?: string;
  label?: string;
  accentColor?: string;
}

/**
 * GaugeChart - Animated speedometer/gauge
 * White slide background with dark rounded block
 */
export function GaugeChart({
  value,
  maxValue = 100,
  title,
  label,
  accentColor = '#88da1c',
}: GaugeChartProps) {
  const size = 240;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // Half circle
  const percentage = Math.min(value / maxValue, 1);
  const strokeDashoffset = circumference - (percentage * circumference);

  return (
    <div className="bg-white p-8">
      <div className="bg-black rounded-2xl p-8">
        {title && (
          <h3 className="text-xl font-bold text-white mb-6 text-center">{title}</h3>
        )}

        <div className="flex justify-center">
          <div className="relative" style={{ width: size, height: size / 2 + 40 }}>
            <svg width={size} height={size / 2 + 20} className="overflow-visible">
              {/* Background arc */}
              <path
                d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />

              {/* Value arc */}
              <motion.path
                d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
                fill="none"
                stroke={accentColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ filter: `drop-shadow(0 0 10px ${accentColor}50)` }}
              />

              {/* Tick marks */}
              {[0, 25, 50, 75, 100].map((tick, i) => {
                const angle = (tick / 100) * 180 - 180;
                const rad = (angle * Math.PI) / 180;
                const x1 = size / 2 + (radius - 30) * Math.cos(rad);
                const y1 = size / 2 + (radius - 30) * Math.sin(rad);
                const x2 = size / 2 + (radius - 40) * Math.cos(rad);
                const y2 = size / 2 + (radius - 40) * Math.sin(rad);

                return (
                  <g key={i}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.3)" strokeWidth={2} />
                    <text
                      x={size / 2 + (radius - 55) * Math.cos(rad)}
                      y={size / 2 + (radius - 55) * Math.sin(rad)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xs fill-white/50"
                    >
                      {tick}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Center value */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 text-center"
              style={{ bottom: 0 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-4xl font-bold text-white">{value}</div>
              {label && <div className="text-sm text-white/50 mt-1">{label}</div>}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GaugeChart;
