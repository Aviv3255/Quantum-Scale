'use client';

import { motion } from 'framer-motion';

interface Skill {
  name: string;
  current: number; // 0-100
  target?: number; // 0-100
}

interface SkillRadarProps {
  skills: Skill[];
  title?: string;
  showTarget?: boolean;
  currentColor?: string;
  targetColor?: string;
  variant?: 'dark' | 'light';
}

/**
 * SkillRadar - Skills/competency radar chart
 * Shows current vs target skill levels in a spider chart
 */
export function SkillRadar({
  skills = [
    { name: 'Leadership', current: 80, target: 90 },
    { name: 'Technical', current: 70, target: 85 },
    { name: 'Communication', current: 85, target: 90 },
    { name: 'Problem Solving', current: 75, target: 80 },
    { name: 'Creativity', current: 60, target: 75 },
    { name: 'Teamwork', current: 90, target: 95 },
  ],
  title,
  showTarget = true,
  currentColor = '#88da1c',
  targetColor = '#007AFF',
  variant = 'dark',
}: SkillRadarProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const fillLabel = isDark ? 'fill-white' : 'fill-black';

  const size = 320;
  const center = size / 2;
  const radius = (size / 2) - 60;
  const levels = 5;
  const angleSlice = (Math.PI * 2) / skills.length;

  // Calculate polygon points
  const calculatePoint = (value: number, index: number) => {
    const normalizedValue = value / 100;
    const angle = angleSlice * index - Math.PI / 2;
    return {
      x: center + radius * normalizedValue * Math.cos(angle),
      y: center + radius * normalizedValue * Math.sin(angle),
    };
  };

  const currentPoints = skills.map((s, i) => calculatePoint(s.current, i));
  const targetPoints = showTarget ? skills.map((s, i) => calculatePoint(s.target || s.current, i)) : [];

  const currentPath = currentPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  const targetPath = targetPoints.length > 0
    ? targetPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
    : '';

  // Label positions
  const labelPoints = skills.map((_, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    const labelRadius = radius + 35;
    return {
      x: center + labelRadius * Math.cos(angle),
      y: center + labelRadius * Math.sin(angle),
    };
  });

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

      <div className="flex justify-center">
        <svg width={size} height={size} className="overflow-visible">
          <defs>
            <radialGradient id="currentGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={currentColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={currentColor} stopOpacity="0.1" />
            </radialGradient>
            <radialGradient id="targetGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={targetColor} stopOpacity="0.2" />
              <stop offset="100%" stopColor={targetColor} stopOpacity="0.05" />
            </radialGradient>
          </defs>

          {/* Grid levels */}
          {Array.from({ length: levels }).map((_, levelIndex) => {
            const levelRadius = (radius / levels) * (levelIndex + 1);
            const levelPoints = skills.map((_, i) => {
              const angle = angleSlice * i - Math.PI / 2;
              return {
                x: center + levelRadius * Math.cos(angle),
                y: center + levelRadius * Math.sin(angle),
              };
            });
            const levelPath = levelPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

            return (
              <motion.path
                key={levelIndex}
                d={levelPath}
                fill="none"
                stroke={gridColor}
                strokeWidth={1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: levelIndex * 0.05 }}
              />
            );
          })}

          {/* Axis lines */}
          {skills.map((_, i) => {
            const angle = angleSlice * i - Math.PI / 2;
            const endX = center + radius * Math.cos(angle);
            const endY = center + radius * Math.sin(angle);

            return (
              <motion.line
                key={i}
                x1={center}
                y1={center}
                x2={endX}
                y2={endY}
                stroke={gridColor}
                strokeWidth={1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.03 }}
              />
            );
          })}

          {/* Target polygon (if showing) */}
          {showTarget && targetPath && (
            <>
              <motion.path
                d={targetPath}
                fill="url(#targetGradient)"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{ transformOrigin: 'center' }}
              />
              <motion.path
                d={targetPath}
                fill="none"
                stroke={targetColor}
                strokeWidth={2}
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </>
          )}

          {/* Current polygon */}
          <motion.path
            d={currentPath}
            fill="url(#currentGradient)"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ transformOrigin: 'center' }}
          />
          <motion.path
            d={currentPath}
            fill="none"
            stroke={currentColor}
            strokeWidth={2.5}
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{ filter: `drop-shadow(0 0 8px ${currentColor}50)` }}
          />

          {/* Current points */}
          {currentPoints.map((point, i) => (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={6}
              fill={currentColor}
              stroke={isDark ? '#000' : '#fff'}
              strokeWidth={2}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + i * 0.05, type: 'spring', stiffness: 200 }}
            />
          ))}

          {/* Labels */}
          {labelPoints.map((point, i) => (
            <motion.g key={i}>
              <motion.text
                x={point.x}
                y={point.y - 8}
                textAnchor="middle"
                dominantBaseline="middle"
                className={`text-xs font-medium ${fillLabel}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.05 }}
              >
                {skills[i].name}
              </motion.text>
              <motion.text
                x={point.x}
                y={point.y + 8}
                textAnchor="middle"
                dominantBaseline="middle"
                className={`text-xs ${isDark ? 'fill-white/50' : 'fill-black/50'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.05 }}
              >
                {skills[i].current}%
              </motion.text>
            </motion.g>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <motion.div
        className="mt-6 flex justify-center gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-1 rounded"
            style={{ backgroundColor: currentColor }}
          />
          <span className={`text-sm ${mutedColor}`}>Current Level</span>
        </div>
        {showTarget && (
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-1 rounded"
              style={{ backgroundColor: targetColor, opacity: 0.5 }}
            />
            <span className={`text-sm ${mutedColor}`}>Target Level</span>
          </div>
        )}
      </motion.div>

      {/* Summary stats */}
      <motion.div
        className="mt-4 flex justify-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="text-center">
          <div className={`text-2xl font-bold ${textColor}`}>
            {Math.round(skills.reduce((acc, s) => acc + s.current, 0) / skills.length)}%
          </div>
          <div className={`text-xs ${mutedColor}`}>Avg. Current</div>
        </div>
        {showTarget && (
          <div className="text-center">
            <div className={`text-2xl font-bold ${textColor}`}>
              {Math.round(skills.reduce((acc, s) => acc + (s.target || s.current), 0) / skills.length)}%
            </div>
            <div className={`text-xs ${mutedColor}`}>Avg. Target</div>
          </div>
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

export default SkillRadar;
