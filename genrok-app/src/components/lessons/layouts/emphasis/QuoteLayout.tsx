'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface QuoteLayoutProps {
  quote: string;
  author?: string;
  role?: string;
  accentColor?: string;
}

export function QuoteLayout({
  quote,
  author,
  role,
  accentColor = '#88da1c',
}: QuoteLayoutProps) {
  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-16 w-full max-w-4xl relative overflow-hidden">
        {/* Background quote mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.05, scale: 1 }}
          className="absolute top-8 left-8"
        >
          <Quote size={200} className="text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-relaxed mb-8"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            &ldquo;{quote}&rdquo;
          </motion.blockquote>

          {(author || role) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <div
                className="w-12 h-0.5 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <div>
                {author && (
                  <div className="font-semibold text-white">{author}</div>
                )}
                {role && (
                  <div className="text-sm text-white/50">{role}</div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default QuoteLayout;
