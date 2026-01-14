'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ElementType } from 'react';

interface OptionData {
  title: string;
  description: string;
  iconName?: string;
  highlight?: boolean;
}

interface TwoOptionLayoutProps {
  headline?: string;
  subtitle?: string;
  optionA: OptionData;
  optionB: OptionData;
  vsText?: string;
  accentColor?: string;
}

export function TwoOptionLayout({
  headline,
  subtitle,
  optionA,
  optionB,
  vsText = 'vs',
  accentColor = '#88da1c',
}: TwoOptionLayoutProps) {
  const renderOption = (option: OptionData, delay: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Icon = option.iconName
      ? (LucideIcons as any)[option.iconName] as ElementType
      : null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className={`rounded-2xl p-8 text-center ${
          option.highlight
            ? 'bg-white/10 border border-white/20'
            : 'bg-white/5'
        }`}
      >
        {Icon && (
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{
              backgroundColor: option.highlight
                ? `${accentColor}20`
                : 'rgba(255,255,255,0.1)',
            }}
          >
            <Icon
              size={32}
              style={{ color: option.highlight ? accentColor : 'white' }}
            />
          </div>
        )}

        <h3
          className="text-xl font-bold mb-3"
          style={{ color: option.highlight ? accentColor : 'white' }}
        >
          {option.title}
        </h3>

        <p className="text-white/50 text-sm leading-relaxed">
          {option.description}
        </p>

        {option.highlight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.3 }}
            className="mt-6 inline-block px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{ backgroundColor: accentColor, color: 'black' }}
          >
            Recommended
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-10 w-full max-w-4xl">
        {headline && (
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white text-center mb-2"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {headline}
          </motion.h2>
        )}

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="text-white/50 text-center mb-10"
          >
            {subtitle}
          </motion.p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          {renderOption(optionA, 0.1)}

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <span className="text-2xl font-bold text-white/20">{vsText}</span>
          </motion.div>

          {renderOption(optionB, 0.15)}
        </div>
      </div>
    </div>
  );
}

export default TwoOptionLayout;
