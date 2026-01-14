'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ElementType } from 'react';

interface JourneyStage {
  title: string;
  description: string;
  iconName?: string;
  emotion?: 'positive' | 'neutral' | 'negative';
}

interface JourneyMapLayoutProps {
  headline?: string;
  subtitle?: string;
  stages: JourneyStage[];
  accentColor?: string;
}

export function JourneyMapLayout({
  headline,
  subtitle,
  stages,
  accentColor = '#88da1c',
}: JourneyMapLayoutProps) {
  const emotionColors = {
    positive: '#22C55E',
    neutral: '#F59E0B',
    negative: '#EF4444',
  };

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-10 w-full">
        {headline && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: "'General Sans', sans-serif" }}
            >
              {headline}
            </h2>
            {subtitle && (
              <p className="text-white/50 text-sm">{subtitle}</p>
            )}
          </motion.div>
        )}

        <div className="relative">
          {/* Journey line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-white/10" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stages.map((stage, index) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Icon = stage.iconName
                ? (LucideIcons as any)[stage.iconName] as ElementType
                : null;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Emotion indicator */}
                  {stage.emotion && (
                    <div
                      className="w-3 h-3 rounded-full mb-3"
                      style={{
                        backgroundColor: emotionColors[stage.emotion],
                      }}
                    />
                  )}

                  {/* Node */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative z-10"
                    style={{ backgroundColor: `${accentColor}20` }}
                  >
                    {Icon ? (
                      <Icon size={28} style={{ color: accentColor }} />
                    ) : (
                      <span
                        className="text-2xl font-bold"
                        style={{ color: accentColor }}
                      >
                        {index + 1}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-semibold text-white mb-2">
                    {stage.title}
                  </h3>

                  <p className="text-xs text-white/50 leading-relaxed">
                    {stage.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-6 mt-8"
        >
          {Object.entries(emotionColors).map(([emotion, color]) => (
            <div key={emotion} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-white/40 capitalize">
                {emotion}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default JourneyMapLayout;
