'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ElementType } from 'react';

interface PointData {
  title: string;
  description: string;
  iconName?: string;
}

interface TwoPointLayoutProps {
  headline?: string;
  points: [PointData, PointData];
  accentColor?: string;
}

export function TwoPointLayout({
  headline,
  points,
  accentColor = '#88da1c',
}: TwoPointLayoutProps) {
  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-12 w-full">
        {headline && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold text-white text-center mb-12"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {headline}
          </motion.h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {points.map((point, index) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Icon = point.iconName
              ? (LucideIcons as any)[point.iconName] as ElementType
              : null;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.15 }}
                className="bg-white/5 rounded-2xl p-8"
              >
                {Icon && (
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${accentColor}20` }}
                  >
                    <Icon size={24} style={{ color: accentColor }} />
                  </div>
                )}

                <h3 className="text-xl font-bold text-white mb-3">
                  {point.title}
                </h3>

                <p className="text-white/60 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TwoPointLayout;
