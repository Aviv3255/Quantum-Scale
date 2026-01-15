'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface ComparisonSliderProps {
  beforeLabel?: string;
  afterLabel?: string;
  beforeColor?: string;
  afterColor?: string;
  beforeValue?: string;
  afterValue?: string;
  title?: string;
  variant?: 'dark' | 'light';
}

/**
 * ComparisonSlider - Before/after comparison slider concept
 * White slide background with dark rounded block
 */
export function ComparisonSlider({
  beforeLabel = 'Before',
  afterLabel = 'After',
  beforeColor = '#EF4444',
  afterColor = '#22C55E',
  beforeValue = '25%',
  afterValue = '85%',
  title,
  variant = 'dark',
}: ComparisonSliderProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const borderColor = isDark ? 'border-white/20' : 'border-black/20';

  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const content = (
    <>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xl font-bold ${textColor} text-center mb-6`}
        >
          {title}
        </motion.h3>
      )}

      {/* Comparison Container */}
      <div className="relative w-full h-64 overflow-hidden rounded-xl">
        {/* Before Side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            backgroundColor: beforeColor,
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          <span className="text-white/70 text-sm font-medium mb-2">{beforeLabel}</span>
          <span className="text-white text-5xl font-bold">{beforeValue}</span>
        </motion.div>

        {/* After Side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            backgroundColor: afterColor,
            clipPath: `inset(0 0 0 ${sliderPosition}%)`,
          }}
        >
          <span className="text-white/70 text-sm font-medium mb-2">{afterLabel}</span>
          <span className="text-white text-5xl font-bold">{afterValue}</span>
        </motion.div>

        {/* Slider Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
            <div className="flex gap-1">
              <div className="w-0.5 h-4 bg-gray-400 rounded-full" />
              <div className="w-0.5 h-4 bg-gray-400 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Hidden Range Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />
      </div>

      {/* Labels */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-between mt-4"
      >
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: beforeColor }}
          />
          <span className={`text-sm ${mutedColor}`}>{beforeLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${mutedColor}`}>{afterLabel}</span>
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: afterColor }}
          />
        </div>
      </motion.div>

      {/* Instruction */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className={`text-center mt-4 text-xs ${mutedColor}`}
      >
        Drag the slider to compare
      </motion.p>
    </>
  );

  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      {isDark ? (
        <div className="bg-black rounded-2xl p-8 w-full max-w-2xl">{content}</div>
      ) : (
        <div className="w-full max-w-2xl">{content}</div>
      )}
    </div>
  );
}

export default ComparisonSlider;
