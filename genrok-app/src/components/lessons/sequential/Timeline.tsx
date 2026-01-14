'use client';

import { motion } from 'framer-motion';
import { Circle, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface TimelineItem {
  title: string;
  description?: string;
  date?: string;
  icon?: LucideIcon;
  completed?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
  title?: string;
  accentColor?: string;
  darkMode?: boolean;
}

/**
 * Timeline - Vertical timeline with milestones
 * Elite design with smooth staggered animations
 */
export function Timeline({
  items,
  title,
  accentColor = '#88da1c',
  darkMode = true,
}: TimelineProps) {
  const bgClass = darkMode ? 'bg-black' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-black';
  const mutedClass = darkMode ? 'text-white/50' : 'text-[#666666]';
  const lineColor = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  return (
    <div className={`${bgClass} p-8 rounded-2xl`}>
      {title && (
        <h3 className={`text-xl font-bold ${textClass} mb-8`}>{title}</h3>
      )}

      <div className="relative pl-8">
        {/* Vertical line */}
        <motion.div
          className="absolute left-3 top-2 bottom-2 w-0.5"
          style={{ backgroundColor: lineColor }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          layoutId="timeline-line"
        />

        {/* Timeline items */}
        <div className="space-y-8">
          {items.map((item, index) => {
            const Icon = item.icon || (item.completed ? CheckCircle2 : Circle);

            return (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.15 }}
              >
                {/* Node */}
                <motion.div
                  className="absolute -left-8 top-1 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.3 + index * 0.15,
                    type: 'spring',
                    stiffness: 200,
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: item.completed ? accentColor : 'transparent',
                      border: item.completed ? 'none' : `2px solid ${darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}`,
                    }}
                  >
                    <Icon
                      size={12}
                      className={item.completed ? 'text-black' : mutedClass}
                      strokeWidth={2.5}
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <div>
                  {item.date && (
                    <span
                      className="text-xs font-semibold uppercase tracking-wider mb-1 block"
                      style={{ color: accentColor }}
                    >
                      {item.date}
                    </span>
                  )}
                  <h4 className={`text-lg font-semibold ${textClass} mb-1`}>
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className={`text-sm ${mutedClass} leading-relaxed`}>
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Timeline;
