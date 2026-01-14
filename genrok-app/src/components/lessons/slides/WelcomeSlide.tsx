'use client';

import { motion } from 'framer-motion';
import { Clock, Check } from 'lucide-react';

interface WelcomeSlideProps {
  title: string;
  subtitle?: string;
  learningGoals: string[];
  duration: string;
  heroImage?: string;
  variant?: 'dark' | 'light';
}

/**
 * WelcomeSlide - Fixed template for ALL lessons
 * Premium design with animated learning goals
 * Supports dark/light variants
 */
export function WelcomeSlide({
  title,
  subtitle,
  learningGoals,
  duration,
  heroImage,
  variant = 'dark',
}: WelcomeSlideProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';

  const content = (
    <div className={`min-h-[600px] ${isDark ? 'bg-black' : ''} p-12 flex`}>
      {/* Left Content */}
      <div className="flex-1 flex flex-col justify-center pr-12">
        {/* Duration Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#88da1c] text-black text-sm font-semibold">
            <Clock size={14} />
            {duration}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-5xl font-bold ${textColor} mb-4 tracking-tight leading-tight`}
          style={{ fontFamily: "'General Sans', sans-serif" }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`text-xl ${mutedColor} mb-8 leading-relaxed`}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Learning Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className={`text-sm font-semibold uppercase tracking-widest ${mutedColor}`}>
            What you'll learn
          </h3>
          <ul className="space-y-3">
            {learningGoals.map((goal, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                className="flex items-start gap-3"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#88da1c] flex items-center justify-center mt-0.5">
                  <Check size={14} className="text-black" strokeWidth={3} />
                </span>
                <span className={`text-lg ${textColor}`}>{goal}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Right - Hero Image */}
      {heroImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 flex items-center justify-center"
        >
          <div className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={heroImage}
              alt=""
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </motion.div>
      )}
    </div>
  );

  // Dark variant: wrap in white background with black rounded container
  // Light variant: just white background, no container
  if (isDark) {
    return (
      <div className="bg-white p-8">
        <div className="rounded-3xl overflow-hidden">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {content}
    </div>
  );
}

export default WelcomeSlide;
