'use client';

import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface ProConLayoutProps {
  headline?: string;
  pros: string[];
  cons: string[];
}

export function ProConLayout({
  headline,
  pros,
  cons,
}: ProConLayoutProps) {
  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-10 w-full max-w-4xl">
        {headline && (
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white text-center mb-10"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {headline}
          </motion.h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pros */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#22C55E]/10 rounded-2xl p-6 border border-[#22C55E]/20"
          >
            <div className="flex items-center gap-2 mb-5">
              <ThumbsUp size={20} className="text-[#22C55E]" />
              <h3 className="font-bold text-white">Pros</h3>
            </div>

            <ul className="space-y-3">
              {pros.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-[#22C55E] mt-1">+</span>
                  <span className="text-white/70 text-sm">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Cons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[#EF4444]/10 rounded-2xl p-6 border border-[#EF4444]/20"
          >
            <div className="flex items-center gap-2 mb-5">
              <ThumbsDown size={20} className="text-[#EF4444]" />
              <h3 className="font-bold text-white">Cons</h3>
            </div>

            <ul className="space-y-3">
              {cons.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-[#EF4444] mt-1">-</span>
                  <span className="text-white/70 text-sm">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProConLayout;
