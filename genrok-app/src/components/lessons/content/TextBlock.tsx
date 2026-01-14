'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TextBlockProps {
  headline?: string;
  subheadline?: string;
  body: string | ReactNode;
  alignment?: 'left' | 'center';
  size?: 'normal' | 'large';
  accentColor?: string;
  variant?: 'dark' | 'light';
}

/**
 * TextBlock - Elegant typography block for text-heavy content
 * Dark: White slide background with dark rounded block
 * Light: Just white background, no dark container
 */
export function TextBlock({
  headline,
  subheadline,
  body,
  alignment = 'left',
  size = 'normal',
  accentColor = '#88da1c',
  variant = 'dark',
}: TextBlockProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/70' : 'text-black/70';

  const alignClass = alignment === 'center' ? 'text-center items-center' : 'text-left items-start';
  const headlineSize = size === 'large' ? 'text-5xl' : 'text-3xl';
  const bodySize = size === 'large' ? 'text-xl' : 'text-lg';

  const textContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl mx-auto flex flex-col ${alignClass}`}
    >
      {/* Subheadline / Eyebrow */}
      {subheadline && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm font-semibold uppercase tracking-widest mb-4"
          style={{ color: accentColor }}
        >
          {subheadline}
        </motion.p>
      )}

      {/* Headline */}
      {headline && (
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={`${headlineSize} font-bold ${textColor} mb-6 tracking-tight leading-tight`}
          style={{ fontFamily: "'General Sans', sans-serif" }}
        >
          {headline}
        </motion.h2>
      )}

      {/* Body */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`${bodySize} ${mutedColor} leading-relaxed`}
      >
        {typeof body === 'string' ? (
          <p>{body}</p>
        ) : (
          body
        )}
      </motion.div>
    </motion.div>
  );

  if (isDark) {
    return (
      <div className="bg-white p-8">
        <div className="bg-black rounded-2xl p-12">
          {textContent}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8">
      <div className="p-4">
        {textContent}
      </div>
    </div>
  );
}

export default TextBlock;
