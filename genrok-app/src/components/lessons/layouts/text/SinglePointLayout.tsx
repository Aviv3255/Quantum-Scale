'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ElementType } from 'react';

interface SinglePointLayoutProps {
  title: string;
  description: string;
  iconName?: string;
  accentColor?: string;
}

export function SinglePointLayout({
  title,
  description,
  iconName,
  accentColor = '#88da1c',
}: SinglePointLayoutProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = iconName ? (LucideIcons as any)[iconName] as ElementType : null;

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-12 w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {Icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
              style={{ backgroundColor: `${accentColor}20` }}
            >
              <Icon size={32} style={{ color: accentColor }} />
            </motion.div>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 leading-relaxed"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="w-16 h-1 rounded-full mt-8"
            style={{ backgroundColor: accentColor }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default SinglePointLayout;
