'use client';

import { motion } from 'framer-motion';

interface RoadmapMilestone {
  id: string;
  title: string;
  description?: string;
  status?: 'completed' | 'in-progress' | 'planned';
  date?: string;
}

interface RoadmapPhase {
  id: string;
  name: string;
  milestones: RoadmapMilestone[];
  color?: string;
}

interface RoadmapDiagramProps {
  phases: RoadmapPhase[];
  title?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

export function RoadmapDiagram({
  phases,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: RoadmapDiagramProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const lineColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';

  const phaseColors = ['#88da1c', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B'];

  const statusStyles = {
    completed: {
      bg: '#22C55E',
      icon: (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    'in-progress': {
      bg: '#F59E0B',
      icon: (
        <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ),
    },
    planned: {
      bg: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
      icon: (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
  };

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

      <div className="relative">
        {/* Main timeline line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute top-8 left-0 right-0 h-1 rounded-full origin-left"
          style={{ backgroundColor: lineColor }}
        />

        {/* Phases */}
        <div className="flex justify-between relative">
          {phases.map((phase, phaseIndex) => {
            const phaseColor = phase.color || phaseColors[phaseIndex % phaseColors.length];
            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + phaseIndex * 0.15 }}
                className="flex flex-col items-center flex-1"
              >
                {/* Phase marker */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + phaseIndex * 0.15, type: 'spring', stiffness: 300 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center z-10 shadow-lg"
                  style={{ backgroundColor: phaseColor }}
                >
                  <span className="text-white font-bold text-lg">{phaseIndex + 1}</span>
                </motion.div>

                {/* Phase name */}
                <motion.h4
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + phaseIndex * 0.15 }}
                  className={`mt-4 font-semibold text-sm ${textColor}`}
                >
                  {phase.name}
                </motion.h4>

                {/* Milestones */}
                <div className="mt-4 space-y-2 w-full max-w-[140px]">
                  {phase.milestones.map((milestone, milestoneIndex) => {
                    const status = milestone.status || 'planned';
                    const statusStyle = statusStyles[status];
                    return (
                      <motion.div
                        key={milestone.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + phaseIndex * 0.15 + milestoneIndex * 0.08 }}
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                      >
                        <div className="flex items-start gap-2">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white mt-0.5"
                            style={{ backgroundColor: statusStyle.bg }}
                          >
                            {statusStyle.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-medium ${textColor} truncate`}>
                              {milestone.title}
                            </p>
                            {milestone.date && (
                              <p className="text-xs mt-0.5" style={{ color: mutedColor }}>
                                {milestone.date}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-6 mt-8 pt-4 border-t"
          style={{ borderColor: lineColor }}
        >
          {Object.entries(statusStyles).map(([status, style]) => (
            <div key={status} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: style.bg }}
              >
                {style.icon}
              </div>
              <span className="text-xs capitalize" style={{ color: mutedColor }}>
                {status.replace('-', ' ')}
              </span>
            </div>
          ))}
        </motion.div>
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

export default RoadmapDiagram;
