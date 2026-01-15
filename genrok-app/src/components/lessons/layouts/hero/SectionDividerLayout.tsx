'use client';

import { motion } from 'framer-motion';

interface SectionDividerLayoutProps {
  title: string;
  subtitle?: string;
  accentColor?: string;
}

export function SectionDividerLayout({
  title,
  subtitle,
  accentColor = '#88da1c',
}: SectionDividerLayoutProps) {
  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-16 w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-0.5 rounded-full mx-auto mb-8"
            style={{ backgroundColor: accentColor }}
          />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-white/40"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-16 h-0.5 rounded-full mx-auto mt-8"
            style={{ backgroundColor: accentColor }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default SectionDividerLayout;
