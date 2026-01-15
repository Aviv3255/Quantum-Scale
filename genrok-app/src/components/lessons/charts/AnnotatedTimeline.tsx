'use client';

import { motion } from 'framer-motion';

interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  type?: 'milestone' | 'event' | 'highlight';
}

interface AnnotatedTimelineProps {
  events: TimelineEvent[];
  title?: string;
  variant?: 'dark' | 'light';
}

/**
 * AnnotatedTimeline - Timeline with annotation callouts
 * White slide background with dark rounded block
 */
export function AnnotatedTimeline({
  events,
  title,
  variant = 'dark',
}: AnnotatedTimelineProps) {
  const isDark = variant === 'dark';
  const lineColor = isDark ? 'bg-white/20' : 'bg-black/20';

  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'milestone': return '#88da1c';
      case 'highlight': return '#3B82F6';
      default: return isDark ? '#ffffff' : '#000000';
    }
  };

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-center mb-8"
          style={{ color: isDark ? '#fff' : '#000' }}
        >
          {title}
        </motion.h3>
      )}

      <div className="relative">
        {/* Timeline line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute top-6 left-0 right-0 h-0.5 ${lineColor} origin-left`}
        />

        {/* Events */}
        <div className="relative flex justify-between">
          {events.map((event, index) => {
            const isTop = index % 2 === 0;
            const typeColor = getTypeColor(event.type);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: isTop ? -20 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.15 }}
                className={`relative flex flex-col items-center ${
                  isTop ? 'flex-col' : 'flex-col-reverse'
                }`}
                style={{ width: `${100 / events.length}%` }}
              >
                {/* Connector line */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.5 + index * 0.15 }}
                  className={`w-0.5 h-8 ${lineColor} ${isTop ? 'origin-bottom' : 'origin-top'}`}
                />

                {/* Node */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.4 + index * 0.15,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  className="relative z-10"
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2`}
                    style={{
                      borderColor: typeColor,
                      backgroundColor: event.type === 'milestone' ? typeColor : 'transparent',
                    }}
                  />
                  {event.type === 'milestone' && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: typeColor }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  )}
                </motion.div>

                {/* Connector line */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.5 + index * 0.15 }}
                  className={`w-0.5 h-8 ${lineColor} ${isTop ? 'origin-top' : 'origin-bottom'}`}
                />

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.15 }}
                  className={`text-center max-w-32 ${isTop ? 'order-first' : 'order-last'}`}
                >
                  {/* Annotation pointer */}
                  <div
                    className={`mx-auto w-3 h-3 rotate-45 ${
                      isDark ? 'bg-white/10' : 'bg-black/5'
                    } ${isTop ? 'mb-[-6px]' : 'mt-[-6px]'}`}
                  />

                  <div
                    className={`p-3 rounded-lg ${
                      isDark ? 'bg-white/10' : 'bg-black/5'
                    }`}
                  >
                    <span
                      className="text-xs font-bold block mb-1"
                      style={{ color: typeColor }}
                    >
                      {event.date}
                    </span>
                    <span className="text-sm font-medium block" style={{ color: isDark ? '#fff' : '#000' }}>
                      {event.title}
                    </span>
                    {event.description && (
                      <span className="text-xs block mt-1" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
                        {event.description}
                      </span>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex justify-center gap-6 mt-8"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#88da1c]" />
          <span className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Milestone</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
          <span className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Highlight</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full border-2 ${
              isDark ? 'border-white' : 'border-black'
            }`}
          />
          <span className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Event</span>
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

export default AnnotatedTimeline;
