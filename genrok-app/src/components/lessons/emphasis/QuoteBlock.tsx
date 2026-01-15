'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface QuoteBlockProps {
  quote: string;
  author?: string;
  role?: string;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

/**
 * QuoteBlock - Large quote with attribution
 * Dark: White slide background with dark rounded block
 * Light: White background only
 */
export function QuoteBlock({
  quote,
  author,
  role,
  accentColor = '#88da1c',
  variant = 'dark',
}: QuoteBlockProps) {
  const isDark = variant === 'dark';

  // Color variables
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/60' : 'text-black/60';
  const decorativeIconColor = isDark ? 'text-white' : 'text-black';
  // Icon on lime green accent should always be black for contrast
  const quoteIconBgColor = 'text-black';

  // Content
  const content = (
    <div className="relative overflow-hidden">
      {/* Large quote icon - decorative */}
      <motion.div
        className="absolute -top-4 -left-4 opacity-5"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Quote size={200} strokeWidth={1} className={decorativeIconColor} />
      </motion.div>

      {/* Accent line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: accentColor }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Content */}
      <div className="relative z-10 pl-8">
        {/* Quote icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: accentColor }}
          >
            <Quote size={24} className={quoteIconBgColor} />
          </div>
        </motion.div>

        {/* Quote text */}
        <motion.blockquote
          className={`text-2xl md:text-3xl font-medium ${textColor} leading-relaxed mb-8`}
          style={{ fontFamily: "'General Sans', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          &ldquo;{quote}&rdquo;
        </motion.blockquote>

        {/* Attribution */}
        {(author || role) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4"
          >
            {/* Avatar placeholder using initial */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
              style={{
                backgroundColor: `${accentColor}20`,
                color: accentColor,
              }}
            >
              {author?.charAt(0) || '?'}
            </div>

            <div>
              {author && (
                <div className={`font-semibold ${textColor}`}>{author}</div>
              )}
              {role && (
                <div className={`text-sm ${mutedColor}`}>{role}</div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  // Conditional rendering based on variant
  if (isDark) {
    return (
      <div className="bg-white p-8">
        <div className="bg-black rounded-2xl p-12">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8">
      <div className="p-12">
        {content}
      </div>
    </div>
  );
}

export default QuoteBlock;
