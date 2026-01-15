'use client';

import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';

interface TimelineItem {
  title: string;
  description?: string;
  date?: string;
  completed?: boolean;
}

interface TimelineLayoutProps {
  headline?: string;
  items: TimelineItem[];
  accentColor?: string;
}

export function TimelineLayout({
  headline,
  items,
  accentColor = '#88da1c',
}: TimelineLayoutProps) {
  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-10 w-full max-w-3xl">
        {headline && (
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white text-center mb-10"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {headline}
          </motion.h2>
        )}

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10" />

          <div className="space-y-6">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="relative flex items-start gap-6 pl-12"
              >
                {/* Node */}
                <div
                  className="absolute left-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: item.completed
                      ? accentColor
                      : 'rgba(255,255,255,0.1)',
                  }}
                >
                  {item.completed ? (
                    <Check size={16} className="text-black" strokeWidth={3} />
                  ) : (
                    <Circle size={8} className="text-white/50" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="flex items-center gap-3 mb-1">
                    <h3
                      className="font-semibold"
                      style={{ color: item.completed ? 'white' : 'rgba(255,255,255,0.5)' }}
                    >
                      {item.title}
                    </h3>
                    {item.date && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: item.completed
                            ? `${accentColor}20`
                            : 'rgba(255,255,255,0.05)',
                          color: item.completed
                            ? accentColor
                            : 'rgba(255,255,255,0.3)',
                        }}
                      >
                        {item.date}
                      </span>
                    )}
                  </div>

                  {item.description && (
                    <p
                      className="text-sm"
                      style={{ color: item.completed ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.3)' }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineLayout;
