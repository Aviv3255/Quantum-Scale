'use client';

import { motion } from 'framer-motion';

interface BigIdeaLayoutProps {
  statement: string;
  attribution?: string;
  accentColor?: string;
}

export function BigIdeaLayout({
  statement,
  attribution,
  accentColor = '#88da1c',
}: BigIdeaLayoutProps) {
  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-16 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[200px] font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ color: accentColor }}
          >
            "
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight relative z-10"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {statement}
          </motion.p>

          {attribution && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex items-center justify-center gap-3"
            >
              <span
                className="w-8 h-0.5 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <span className="text-white/40 text-sm">{attribution}</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default BigIdeaLayout;
