'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface QuoteBlockProps {
  quote: string;
  author?: string;
  role?: string;
  accentColor?: string;
}

/**
 * QuoteBlock - Large quote with attribution
 * White slide background with dark rounded block
 */
export function QuoteBlock({
  quote,
  author,
  role,
  accentColor = '#88da1c',
}: QuoteBlockProps) {
  return (
    <div className="bg-white p-8">
      <div className="bg-black rounded-2xl p-12 relative overflow-hidden">
        {/* Large quote icon - decorative */}
        <motion.div
          className="absolute -top-4 -left-4 opacity-5"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Quote size={200} strokeWidth={1} className="text-white" />
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
            className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-8"
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
                  <div className="font-semibold text-white">{author}</div>
                )}
                {role && (
                  <div className="text-sm text-white/60">{role}</div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuoteBlock;
