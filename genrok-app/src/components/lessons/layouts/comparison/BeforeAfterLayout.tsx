'use client';

import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

interface BeforeAfterLayoutProps {
  headline?: string;
  before: {
    title?: string;
    items: string[];
  };
  after: {
    title?: string;
    items: string[];
  };
}

export function BeforeAfterLayout({
  headline,
  before,
  after,
}: BeforeAfterLayoutProps) {
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
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 rounded-2xl overflow-hidden"
          >
            <div className="h-1.5 bg-[#EF4444]" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-8 h-8 rounded-full bg-[#EF4444] flex items-center justify-center">
                  <X size={16} className="text-white" strokeWidth={3} />
                </span>
                <h3 className="font-bold text-white">
                  {before.title || 'Before'}
                </h3>
              </div>

              <ul className="space-y-3">
                {before.items.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#EF4444]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X size={10} className="text-[#EF4444]" strokeWidth={3} />
                    </span>
                    <span className="text-white/60 text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white/5 rounded-2xl overflow-hidden"
          >
            <div className="h-1.5 bg-[#88da1c]" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-8 h-8 rounded-full bg-[#88da1c] flex items-center justify-center">
                  <Check size={16} className="text-black" strokeWidth={3} />
                </span>
                <h3 className="font-bold text-white">
                  {after.title || 'After'}
                </h3>
              </div>

              <ul className="space-y-3">
                {after.items.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#88da1c]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check
                        size={10}
                        className="text-[#88da1c]"
                        strokeWidth={3}
                      />
                    </span>
                    <span className="text-white/60 text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default BeforeAfterLayout;
