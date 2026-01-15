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
  accentColor?: string;
  variant?: 'dark' | 'light';
}

/**
 * SplitContent - 50/50 split layout with text and media
 * Dark: White slide background with dark rounded block
 * Light: Just white background, no dark container
 */
export function SplitContent({
  title,
  content,
  media,
  reversed = false,
  accentColor = '#88da1c',
  variant = 'dark',
}: SplitContentProps) {
  const isDark = variant === 'dark';

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
        className="text-4xl font-bold mb-6 tracking-tight leading-tight"
        style={{ fontFamily: "'General Sans', sans-serif", color: isDark ? '#fff' : '#000' }}
      >
        {title}
      </h2>

      {typeof content === 'string' ? (
        <p className="text-lg leading-relaxed" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>{content}</p>
      ) : (
        <div className="text-lg leading-relaxed" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>{content}</div>
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

  const gridContent = (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
        reversed ? 'lg:flex-row-reverse' : ''
      }`}
      style={{ direction: reversed ? 'rtl' : 'ltr' }}
    >
      <div style={{ direction: 'ltr' }}>{reversed ? mediaContent : textContent}</div>
      <div style={{ direction: 'ltr' }}>{reversed ? textContent : mediaContent}</div>
    </div>
  );

  if (isDark) {
    return (
      <div className="bg-white p-8">
        <div className="bg-black rounded-2xl p-12 min-h-[500px]">
          {gridContent}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 min-h-[500px]">
      <div className="p-4">
        {gridContent}
      </div>
    </div>
  );
}

export default SplitContent;
