'use client';

import { motion } from 'framer-motion';

interface TouchPoint {
  id: string;
  label: string;
  emotion?: 'positive' | 'neutral' | 'negative';
  description?: string;
}

interface JourneyStage {
  id: string;
  name: string;
  touchpoints: TouchPoint[];
  color?: string;
}

interface CustomerJourneyMapProps {
  stages: JourneyStage[];
  title?: string;
  customerName?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function CustomerJourneyMap({
  stages,
  title,
  customerName = 'Customer',
  accentColor = '#88da1c',
  variant = 'dark',
}: CustomerJourneyMapProps) {
  const isDark = variant === 'dark';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const lineColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';

  const stageColors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B'];

  const emotionIcons = {
    positive: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" fill="#22C55E" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="9" cy="10" r="1" fill="#fff" />
        <circle cx="15" cy="10" r="1" fill="#fff" />
      </svg>
    ),
    neutral: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" fill="#F59E0B" />
        <line x1="8" y1="14" x2="16" y2="14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <circle cx="9" cy="10" r="1" fill="#fff" />
        <circle cx="15" cy="10" r="1" fill="#fff" />
      </svg>
    ),
    negative: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" fill="#EF4444" />
        <path d="M8 16s1.5-2 4-2 4 2 4 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="9" cy="10" r="1" fill="#fff" />
        <circle cx="15" cy="10" r="1" fill="#fff" />
      </svg>
    ),
  };

  // Calculate emotion curve points
  const emotionLevels = { positive: 2, neutral: 1, negative: 0 };
  let allPoints: { x: number; y: number; emotion: string }[] = [];

  stages.forEach((stage, stageIndex) => {
    stage.touchpoints.forEach((tp, tpIndex) => {
      const emotion = tp.emotion || 'neutral';
      const x = (stageIndex + (tpIndex + 1) / (stage.touchpoints.length + 1)) / stages.length;
      const y = emotionLevels[emotion];
      allPoints.push({ x, y, emotion });
    });
  });

  const curvePoints = allPoints.map((p, i) => ({
    x: 50 + p.x * 500,
    y: 30 + (2 - p.y) * 40,
  }));

  const pathD = curvePoints.length > 0
    ? `M ${curvePoints.map(p => `${p.x},${p.y}`).join(' L ')}`
    : '';

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-center mb-2"
          style={{ fontFamily: "'General Sans', sans-serif", color: isDark ? '#fff' : '#000' }}
        >
          {title}
        </motion.h3>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center text-sm mb-6"
        style={{ color: mutedColor }}
      >
        {customerName}&apos;s Journey Experience
      </motion.p>

      {/* Emotion curve */}
      <div className="mb-6 relative">
        <svg viewBox="0 0 600 100" className="w-full h-24">
          {/* Emotion level lines */}
          {[0, 1, 2].map(level => (
            <motion.line
              key={level}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.2 }}
              x1="50"
              y1={30 + (2 - level) * 40}
              x2="550"
              y2={30 + (2 - level) * 40}
              stroke={lineColor}
              strokeDasharray="4,4"
            />
          ))}

          {/* Emotion labels */}
          {[
            { label: 'Happy', y: 30 },
            { label: 'Neutral', y: 70 },
            { label: 'Frustrated', y: 110 },
          ].map((item, i) => (
            <motion.text
              key={item.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              x="20"
              y={item.y - 35}
              fill={mutedColor}
              fontSize="8"
              textAnchor="start"
            >
              {item.label}
            </motion.text>
          ))}

          {/* Emotion curve */}
          {pathD && (
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 1.5 }}
              d={pathD}
              stroke={accentColor}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data points */}
          {curvePoints.map((point, i) => (
            <motion.circle
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}
              cx={point.x}
              cy={point.y}
              r="5"
              fill={
                allPoints[i].emotion === 'positive' ? '#22C55E' :
                allPoints[i].emotion === 'negative' ? '#EF4444' : '#F59E0B'
              }
            />
          ))}
        </svg>
      </div>

      {/* Stages */}
      <div className="flex gap-2">
        {stages.map((stage, stageIndex) => {
          const stageColor = stage.color || stageColors[stageIndex % stageColors.length];
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + stageIndex * 0.1 }}
              className="flex-1"
            >
              {/* Stage header */}
              <div
                className="p-2 rounded-t-lg text-center"
                style={{ backgroundColor: `${stageColor}20` }}
              >
                <div
                  className="text-xs font-bold"
                  style={{ color: stageColor }}
                >
                  {stage.name}
                </div>
              </div>

              {/* Touchpoints */}
              <div
                className="p-2 rounded-b-lg space-y-2"
                style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
              >
                {stage.touchpoints.map((touchpoint, tpIndex) => (
                  <motion.div
                    key={touchpoint.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + stageIndex * 0.1 + tpIndex * 0.05 }}
                    className="flex items-start gap-1.5 p-1.5 rounded"
                    style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {emotionIcons[touchpoint.emotion || 'neutral']}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium" style={{ color: isDark ? '#fff' : '#000' }}>
                        {touchpoint.label}
                      </p>
                      {touchpoint.description && (
                        <p className="text-xs mt-0.5 line-clamp-2" style={{ color: mutedColor }}>
                          {touchpoint.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );

  if (isDark) {
    return (
      <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
        <div className="bg-black rounded-2xl p-6 w-full max-w-4xl">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {content}
      </div>
    </div>
  );
}

export default CustomerJourneyMap;
