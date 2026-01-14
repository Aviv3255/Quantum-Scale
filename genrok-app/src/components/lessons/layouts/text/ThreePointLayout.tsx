'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ElementType } from 'react';

interface PointData {
  title: string;
  description: string;
  iconName?: string;
}

interface ThreePointLayoutProps {
  headline?: string;
  points: [PointData, PointData, PointData];
  accentColor?: string;
}

export function ThreePointLayout({
  headline,
  points,
  accentColor = '#88da1c',
}: ThreePointLayoutProps) {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                transition={{ delay: 0.1 + index * 0.1 }}
                className="text-center p-6"
              >
                {Icon && (
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: `${accentColor}20` }}
                  >
                    <Icon size={28} style={{ color: accentColor }} />
                  </div>
                )}

                <h3 className="text-lg font-bold text-white mb-3">
                  {point.title}
                </h3>

                <p className="text-sm text-white/50 leading-relaxed">
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

export default ThreePointLayout;
