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
  variant?: 'dark' | 'light';
}

/**
 * Timeline - Vertical timeline with milestones
 * Dark: White slide background with dark rounded block
 * Light: White background only
 */
export function Timeline({
  items,
  title,
  accentColor = '#88da1c',
  variant = 'dark',
}: TimelineProps) {
  const isDark = variant === 'dark';

  // Color variables
  const textColorValue = isDark ? '#fff' : '#000';
  const mutedColorValue = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const lineColor = isDark ? 'bg-white/10' : 'bg-black/10';
  const nodeBorder = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  const nodeIconColorValue = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';

  // Content
  const content = (
    <>
      {title && (
        <h3 className="text-xl font-bold mb-8" style={{ color: textColorValue }}>{title}</h3>
      )}

      <div className="relative pl-8">
        {/* Vertical line */}
        <motion.div
          className={`absolute left-3 top-2 bottom-2 w-0.5 ${lineColor}`}
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
                      border: item.completed ? 'none' : `2px solid ${nodeBorder}`,
                    }}
                  >
                    <Icon
                      size={12}
                      style={{ color: item.completed ? (isDark ? '#000' : '#fff') : nodeIconColorValue }}
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
                  <h4 className="text-lg font-semibold mb-1" style={{ color: textColorValue }}>
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-sm leading-relaxed" style={{ color: mutedColorValue }}>
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );

  // Conditional rendering based on variant
  if (isDark) {
    return (
      <div className="bg-white p-8">
        <div className="bg-black rounded-2xl p-8">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8">
      {content}
    </div>
  );
}

export default Timeline;
