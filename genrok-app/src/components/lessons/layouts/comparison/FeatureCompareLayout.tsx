'use client';

import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';

interface Feature {
  name: string;
  optionA: boolean | 'partial';
  optionB: boolean | 'partial';
}

interface FeatureCompareLayoutProps {
  headline?: string;
  optionALabel: string;
  optionBLabel: string;
  features: Feature[];
  accentColor?: string;
}

export function FeatureCompareLayout({
  headline,
  optionALabel,
  optionBLabel,
  features,
  accentColor = '#88da1c',
}: FeatureCompareLayoutProps) {
  const renderIcon = (value: boolean | 'partial') => {
    if (value === true) {
      return (
        <span className="w-6 h-6 rounded-full bg-[#22C55E]/20 flex items-center justify-center">
          <Check size={14} className="text-[#22C55E]" />
        </span>
      );
    }
    if (value === 'partial') {
      return (
        <span className="w-6 h-6 rounded-full bg-[#F59E0B]/20 flex items-center justify-center">
          <Minus size={14} className="text-[#F59E0B]" />
        </span>
      );
    }
    return (
      <span className="w-6 h-6 rounded-full bg-[#EF4444]/20 flex items-center justify-center">
        <X size={14} className="text-[#EF4444]" />
      </span>
    );
  };

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-10 w-full max-w-3xl">
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

        <div className="overflow-hidden rounded-xl bg-white/5">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 p-4 border-b border-white/10">
            <div className="text-sm font-medium text-white/50">Feature</div>
            <div
              className="text-sm font-bold text-center"
              style={{ color: accentColor }}
            >
              {optionALabel}
            </div>
            <div className="text-sm font-bold text-white text-center">
              {optionBLabel}
            </div>
          </div>

          {/* Rows */}
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`grid grid-cols-3 gap-4 p-4 ${
                index < features.length - 1 ? 'border-b border-white/5' : ''
              }`}
            >
              <div className="text-sm text-white/70">{feature.name}</div>
              <div className="flex justify-center">
                {renderIcon(feature.optionA)}
              </div>
              <div className="flex justify-center">
                {renderIcon(feature.optionB)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeatureCompareLayout;
