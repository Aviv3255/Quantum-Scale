'use client';

import { motion } from 'framer-motion';

interface ChapterIntroLayoutProps {
  chapterNumber: number;
  title: string;
  description?: string;
  accentColor?: string;
}

export function ChapterIntroLayout({
  chapterNumber,
  title,
  description,
  accentColor = '#88da1c',
}: ChapterIntroLayoutProps) {
  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-16 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              Chapter
            </span>
            <span
              className="text-6xl md:text-8xl font-bold"
              style={{ color: accentColor }}
            >
              {String(chapterNumber).padStart(2, '0')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-white/50 max-w-xl mx-auto"
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default ChapterIntroLayout;
