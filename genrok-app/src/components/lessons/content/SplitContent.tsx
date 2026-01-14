'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SplitContentProps {
  title: string;
  content: string | ReactNode;
  media: {
    type: 'image' | 'video';
    src: string;
    alt?: string;
  };
  reversed?: boolean;
  darkMode?: boolean;
  accentColor?: string;
}

/**
 * SplitContent - 50/50 split layout with text and media
 * Premium design with clean typography and subtle animations
 */
export function SplitContent({
  title,
  content,
  media,
  reversed = false,
  darkMode = false,
  accentColor = '#88da1c',
}: SplitContentProps) {
  const bgClass = darkMode ? 'bg-black' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-black';
  const mutedClass = darkMode ? 'text-white/70' : 'text-[#666666]';

  const textContent = (
    <motion.div
      initial={{ opacity: 0, x: reversed ? 30 : -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col justify-center"
    >
      {/* Accent line */}
      <div
        className="w-12 h-1 rounded-full mb-6"
        style={{ backgroundColor: accentColor }}
      />

      <h2
        className={`text-4xl font-bold ${textClass} mb-6 tracking-tight leading-tight`}
        style={{ fontFamily: "'General Sans', sans-serif" }}
      >
        {title}
      </h2>

      {typeof content === 'string' ? (
        <p className={`text-lg ${mutedClass} leading-relaxed`}>{content}</p>
      ) : (
        <div className={`text-lg ${mutedClass} leading-relaxed`}>{content}</div>
      )}
    </motion.div>
  );

  const mediaContent = (
    <motion.div
      initial={{ opacity: 0, x: reversed ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="flex items-center justify-center"
    >
      <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
        {media.type === 'image' ? (
          <img
            src={media.src}
            alt={media.alt || ''}
            className="w-full h-auto object-cover"
          />
        ) : (
          <video
            src={media.src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto"
          />
        )}
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );

  return (
    <div className={`min-h-[500px] ${bgClass} p-12`}>
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
          reversed ? 'lg:flex-row-reverse' : ''
        }`}
        style={{ direction: reversed ? 'rtl' : 'ltr' }}
      >
        <div style={{ direction: 'ltr' }}>{reversed ? mediaContent : textContent}</div>
        <div style={{ direction: 'ltr' }}>{reversed ? textContent : mediaContent}</div>
      </div>
    </div>
  );
}

export default SplitContent;
