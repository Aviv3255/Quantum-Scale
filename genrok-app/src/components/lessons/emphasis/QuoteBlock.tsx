'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface QuoteBlockProps {
  quote: string;
  author?: string;
  role?: string;
  accentColor?: string;
  darkMode?: boolean;
}

/**
 * QuoteBlock - Large quote with attribution
 * Elite design with icon decoration (no images)
 */
export function QuoteBlock({
  quote,
  author,
  role,
  accentColor = '#88da1c',
  darkMode = true,
}: QuoteBlockProps) {
  const bgClass = darkMode ? 'bg-black' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-black';
  const mutedClass = darkMode ? 'text-white/60' : 'text-[#666666]';

  return (
    <div className={`${bgClass} p-12 rounded-2xl relative overflow-hidden`}>
      {/* Large quote icon - decorative */}
      <motion.div
        className="absolute -top-4 -left-4 opacity-5"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Quote size={200} strokeWidth={1} className={textClass} />
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
            <Quote size={24} className="text-black" />
          </div>
        </motion.div>

        {/* Quote text */}
        <motion.blockquote
          className={`text-2xl md:text-3xl font-medium ${textClass} leading-relaxed mb-8`}
          style={{ fontFamily: "'General Sans', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          "{quote}"
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
                <div className={`font-semibold ${textClass}`}>{author}</div>
              )}
              {role && (
                <div className={`text-sm ${mutedClass}`}>{role}</div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default QuoteBlock;
