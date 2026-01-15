'use client';

import { motion } from 'framer-motion';

interface CapabilityLevel {
  level: number;
  name: string;
  description?: string;
}

interface CapabilityArea {
  name: string;
  currentLevel: number;
  targetLevel?: number;
}

interface CapabilityModelProps {
  title?: string;
  levels?: CapabilityLevel[];
  areas: CapabilityArea[];
  accentColor?: string;
  variant?: 'dark' | 'light';
}

const defaultLevels: CapabilityLevel[] = [
  { level: 1, name: 'Initial', description: 'Ad hoc, unpredictable' },
  { level: 2, name: 'Managed', description: 'Reactive, project-based' },
  { level: 3, name: 'Defined', description: 'Proactive, standardized' },
  { level: 4, name: 'Quantitative', description: 'Measured, controlled' },
  { level: 5, name: 'Optimizing', description: 'Continuous improvement' },
];

export function CapabilityModel({
  title,
  levels = defaultLevels,
  areas,
  accentColor = '#88da1c',
  variant = 'dark',
}: CapabilityModelProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const mutedColor70 = isDark ? 'text-white/70' : 'text-black/70';
  const bgLevel = isDark ? 'bg-white/5' : 'bg-black/5';
  const borderColor = isDark ? 'border-white/10' : 'border-black/10';

  const levelColors = ['#EF4444', '#F59E0B', '#FBBF24', '#22C55E', accentColor];

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

      {/* Maturity levels header */}
      <div className="mb-6">
        <div className="flex gap-2 justify-center">
          {levels.map((level, i) => (
            <motion.div
              key={level.level}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="flex-1 text-center"
            >
              <div
                className="h-2 rounded-full mb-2"
                style={{ backgroundColor: levelColors[i] }}
              />
              <span className={`text-xs font-semibold ${mutedColor70}`}>
                L{level.level}
              </span>
              <p className={`text-xs ${mutedColor} mt-1`}>{level.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Capability areas */}
      <div className="space-y-4">
        {areas.map((area, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className={`${bgLevel} rounded-xl p-4`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`${textColor} font-semibold`}>{area.name}</span>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${mutedColor}`}>Level</span>
                <span
                  className="font-bold text-lg"
                  style={{ color: levelColors[area.currentLevel - 1] }}
                >
                  {area.currentLevel}
                </span>
                {area.targetLevel && area.targetLevel !== area.currentLevel && (
                  <>
                    <span className={mutedColor}>/</span>
                    <span className={`${mutedColor70} text-sm`}>
                      Target: {area.targetLevel}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Level indicators */}
            <div className="flex gap-1">
              {levels.map((level, levelIndex) => {
                const isCurrentLevel = levelIndex + 1 === area.currentLevel;
                const isBelow = levelIndex + 1 < area.currentLevel;
                const isTarget =
                  area.targetLevel && levelIndex + 1 === area.targetLevel;

                return (
                  <motion.div
                    key={level.level}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 + levelIndex * 0.03 }}
                    className={`flex-1 h-8 rounded-lg relative flex items-center justify-center ${
                      isBelow || isCurrentLevel
                        ? ''
                        : isDark
                          ? 'bg-white/10'
                          : 'bg-black/10'
                    }`}
                    style={{
                      backgroundColor:
                        isBelow || isCurrentLevel
                          ? levelColors[levelIndex]
                          : undefined,
                    }}
                  >
                    {isCurrentLevel && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring' }}
                        className="w-3 h-3 rounded-full bg-white"
                      />
                    )}
                    {isTarget && !isCurrentLevel && (
                      <div
                        className="absolute inset-0 rounded-lg border-2 border-dashed"
                        style={{ borderColor: levelColors[levelIndex] }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className={`mt-6 pt-6 border-t ${borderColor}`}
      >
        <div className="flex justify-between items-center">
          <span className={`${mutedColor} text-sm`}>Average Maturity Level</span>
          <span className="text-2xl font-bold" style={{ color: accentColor }}>
            {(areas.reduce((sum, a) => sum + a.currentLevel, 0) / areas.length).toFixed(
              1
            )}
          </span>
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

export default CapabilityModel;
