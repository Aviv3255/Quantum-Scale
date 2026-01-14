'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HeroSplitLayoutProps {
  title: string;
  description?: string;
  visual: ReactNode;
  reversed?: boolean;
  accentColor?: string;
}

export function HeroSplitLayout({
  title,
  description,
  visual,
  reversed = false,
  accentColor = '#88da1c',
}: HeroSplitLayoutProps) {
  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-12 w-full">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
            reversed ? 'direction-rtl' : ''
          }`}
          style={{ direction: reversed ? 'rtl' : 'ltr' }}
        >
          <motion.div
            initial={{ opacity: 0, x: reversed ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ direction: 'ltr' }}
          >
            <div
              className="w-12 h-1 rounded-full mb-6"
              style={{ backgroundColor: accentColor }}
            />
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight"
              style={{ fontFamily: "'General Sans', sans-serif" }}
            >
              {title}
            </h1>
            {description && (
              <p className="text-lg text-white/60 leading-relaxed">
                {description}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reversed ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ direction: 'ltr' }}
            className="flex items-center justify-center"
          >
            {visual}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HeroSplitLayout;
