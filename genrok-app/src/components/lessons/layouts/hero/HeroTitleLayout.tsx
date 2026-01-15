'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ElementType } from 'react';

interface HeroTitleLayoutProps {
  title: string;
  subtitle?: string;
  iconName?: string;
  accentColor?: string;
}

export function HeroTitleLayout({
  title,
  subtitle,
  iconName,
  accentColor = '#88da1c',
}: HeroTitleLayoutProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = iconName ? (LucideIcons as any)[iconName] as ElementType : null;

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-16 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {Icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: accentColor }}
              >
                <Icon size={40} className="text-black" />
              </div>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/60 max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="w-24 h-1 rounded-full mx-auto mt-8"
            style={{ backgroundColor: accentColor }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default HeroTitleLayout;
