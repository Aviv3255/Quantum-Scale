'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface BulletListLayoutProps {
  title: string;
  subtitle?: string;
  items: string[];
  accentColor?: string;
}

export function BulletListLayout({
  title,
  subtitle,
  items,
  accentColor = '#88da1c',
}: BulletListLayoutProps) {
  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-12 w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-white/50 mb-8"
            >
              {subtitle}
            </motion.p>
          )}

          <ul className="space-y-4">
            {items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.08 }}
                className="flex items-start gap-4"
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <Check size={14} style={{ color: accentColor }} />
                </span>
                <span className="text-white/70 text-lg">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default BulletListLayout;
