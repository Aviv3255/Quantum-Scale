'use client';

import { motion } from 'framer-motion';

interface NumberedListLayoutProps {
  title: string;
  subtitle?: string;
  items: Array<{
    title: string;
    description?: string;
  }>;
  accentColor?: string;
}

export function NumberedListLayout({
  title,
  subtitle,
  items,
  accentColor = '#88da1c',
}: NumberedListLayoutProps) {
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

          <div className="space-y-6">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.08 }}
                className="flex items-start gap-5"
              >
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg font-bold"
                  style={{
                    backgroundColor: `${accentColor}20`,
                    color: accentColor,
                  }}
                >
                  {index + 1}
                </span>
                <div className="pt-1">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-white/50 text-sm">{item.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default NumberedListLayout;
