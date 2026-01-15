'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SequenceEvent {
  id: string;
  title: string;
  description?: string;
  time?: string;
  icon?: 'start' | 'process' | 'milestone' | 'end' | 'error' | 'success';
  color?: string;
}

interface EventSequenceProps {
  events: SequenceEvent[];
  title?: string;
  accentColor?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'dark' | 'light';
}

export function EventSequence({
  events,
  title,
  accentColor = '#88da1c',
  orientation = 'horizontal',
  variant = 'dark',
}: EventSequenceProps) {
  const isDark = variant === 'dark';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const lineColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';

  const iconColors: Record<string, string> = {
    start: '#22C55E',
    process: '#3B82F6',
    milestone: '#F59E0B',
    end: '#A855F7',
    error: '#EF4444',
    success: '#22C55E',
  };

  const getIcon = (type: string = 'process') => {
    const icons: Record<string, ReactNode> = {
      start: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      process: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      milestone: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      end: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
      ),
      error: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      success: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    };
    return icons[type] || icons.process;
  };

  const isHorizontal = orientation === 'horizontal';

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-center mb-8"
          style={{ color: isDark ? '#fff' : '#000', fontFamily: "'General Sans', sans-serif" }}
        >
          {title}
        </motion.h3>
      )}

      <div className={`relative ${isHorizontal ? 'px-4' : 'py-4'}`}>
        {/* Timeline line */}
        <motion.div
          initial={{ [isHorizontal ? 'scaleX' : 'scaleY']: 0 }}
          animate={{ [isHorizontal ? 'scaleX' : 'scaleY']: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`absolute ${
            isHorizontal
              ? 'top-6 left-8 right-8 h-0.5 origin-left'
              : 'left-6 top-8 bottom-8 w-0.5 origin-top'
          }`}
          style={{ backgroundColor: lineColor }}
        />

        {/* Events */}
        <div
          className={`relative ${
            isHorizontal
              ? 'flex justify-between items-start'
              : 'flex flex-col gap-6'
          }`}
        >
          {events.map((event, i) => {
            const iconType = event.icon || 'process';
            const color = event.color || iconColors[iconType] || accentColor;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, [isHorizontal ? 'y' : 'x']: 20 }}
                animate={{ opacity: 1, [isHorizontal ? 'y' : 'x']: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={`relative ${
                  isHorizontal ? 'flex flex-col items-center flex-1' : 'flex items-start gap-4'
                }`}
              >
                {/* Event marker */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 300 }}
                  className="relative z-10"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: color }}
                  >
                    {getIcon(iconType)}
                  </div>

                  {/* Pulse effect for milestone */}
                  {iconType === 'milestone' && (
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  )}
                </motion.div>

                {/* Event content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className={`${
                    isHorizontal ? 'text-center mt-4 max-w-[120px]' : 'flex-1 pt-1'
                  }`}
                >
                  {event.time && (
                    <span
                      className="text-xs font-medium block mb-1"
                      style={{ color }}
                    >
                      {event.time}
                    </span>
                  )}
                  <h4 className="font-semibold text-sm" style={{ color: isDark ? '#fff' : '#000' }}>
                    {event.title}
                  </h4>
                  {event.description && (
                    <p
                      className={`text-xs mt-1 ${isHorizontal ? 'line-clamp-2' : ''}`}
                      style={{ color: mutedColor }}
                    >
                      {event.description}
                    </p>
                  )}
                </motion.div>

                {/* Connector animation */}
                {i < events.length - 1 && isHorizontal && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                    className="absolute top-6 left-1/2 right-0 h-0.5 origin-left z-0"
                    style={{
                      background: `linear-gradient(to right, ${color}, ${
                        events[i + 1]?.color || iconColors[events[i + 1]?.icon || 'process'] || accentColor
                      })`,
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );

  if (isDark) {
    return (
      <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
        <div className="bg-black rounded-2xl p-8 w-full max-w-3xl">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="w-full max-w-3xl">
        {content}
      </div>
    </div>
  );
}

export default EventSequence;
