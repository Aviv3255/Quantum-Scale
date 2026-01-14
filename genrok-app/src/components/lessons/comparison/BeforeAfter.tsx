'use client';

import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

interface BeforeAfterProps {
  before: {
    title?: string;
    items: string[];
  };
  after: {
    title?: string;
    items: string[];
  };
  headline?: string;
}

/**
 * BeforeAfter - Side-by-side comparison with red/green accent
 * White slide background with dark rounded block
 */
export function BeforeAfter({
  before,
  after,
  headline,
}: BeforeAfterProps) {
  const CardSection = ({
    type,
    title,
    items,
    delay,
  }: {
    type: 'before' | 'after';
    title?: string;
    items: string[];
    delay: number;
  }) => {
    const isBefore = type === 'before';
    const accentColor = isBefore ? '#EF4444' : '#88da1c';
    const Icon = isBefore ? X : Check;

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="bg-white/5 rounded-2xl overflow-hidden"
      >
        {/* Accent bar */}
        <div
          className="h-1.5"
          style={{ backgroundColor: accentColor }}
        />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: accentColor }}
            >
              <Icon
                size={16}
                className={isBefore ? 'text-white' : 'text-black'}
                strokeWidth={3}
              />
            </span>
            <h3 className="text-xl font-bold text-white">
              {title || (isBefore ? 'Before' : 'After')}
            </h3>
          </div>

          {/* Items */}
          <ul className="space-y-4">
            {items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.1 + index * 0.08 }}
                className="flex items-start gap-3"
              >
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <Icon
                    size={10}
                    style={{ color: accentColor }}
                    strokeWidth={3}
                  />
                </span>
                <span className="text-white/70">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-white p-8">
      <div className="bg-black rounded-2xl p-12">
        {/* Headline */}
        {headline && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white text-center mb-10"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {headline}
          </motion.h2>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <CardSection
            type="before"
            title={before.title}
            items={before.items}
            delay={0}
          />
          <CardSection
            type="after"
            title={after.title}
            items={after.items}
            delay={0.15}
          />
        </div>
      </div>
    </div>
  );
}

export default BeforeAfter;
