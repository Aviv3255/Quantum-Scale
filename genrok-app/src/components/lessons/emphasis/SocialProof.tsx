'use client';

import { motion } from 'framer-motion';
import { User, Users, Star, TrendingUp, Award, CheckCircle } from 'lucide-react';

interface SocialProofProps {
  stat: string;
  label: string;
  description?: string;
  type?: 'users' | 'rating' | 'growth' | 'award';
  crowdSize?: number;
  accentColor?: string;
  darkMode?: boolean;
}

/**
 * SocialProof - Icon-based crowd illustration
 * Elite design with animated user icons (no images)
 */
export function SocialProof({
  stat,
  label,
  description,
  type = 'users',
  crowdSize = 24,
  accentColor = '#88da1c',
  darkMode = true,
}: SocialProofProps) {
  const bgClass = darkMode ? 'bg-black' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-black';
  const mutedClass = darkMode ? 'text-white/60' : 'text-[#666666]';

  // Generate crowd of user icons
  const crowdIcons = Array.from({ length: crowdSize }, (_, i) => ({
    id: i,
    delay: 0.02 * i,
    scale: 0.7 + Math.random() * 0.6,
    opacity: 0.3 + Math.random() * 0.7,
  }));

  // Icon based on type
  const TypeIcon = {
    users: Users,
    rating: Star,
    growth: TrendingUp,
    award: Award,
  }[type];

  return (
    <div className={`${bgClass} p-10 rounded-2xl relative overflow-hidden`}>
      {/* Animated crowd background */}
      <div className="absolute inset-0 flex flex-wrap justify-center items-center p-4 opacity-10">
        {crowdIcons.map((icon) => (
          <motion.div
            key={icon.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: icon.opacity * 0.3, scale: icon.scale }}
            transition={{
              delay: 0.5 + icon.delay,
              type: 'spring',
              stiffness: 100,
            }}
            className="p-1"
          >
            <User
              size={20}
              className={darkMode ? 'text-white' : 'text-black'}
            />
          </motion.div>
        ))}
      </div>

      {/* Glow effect */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
      />

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Icon */}
        <motion.div
          className="mb-6 flex justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: accentColor }}
          >
            <TypeIcon size={32} className="text-black" />
          </div>
        </motion.div>

        {/* Stat */}
        <motion.div
          className={`text-6xl md:text-7xl font-bold ${textClass} mb-2`}
          style={{ fontFamily: "'General Sans', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {stat}
        </motion.div>

        {/* Label */}
        <motion.div
          className={`text-xl font-semibold ${textClass} mb-3`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {label}
        </motion.div>

        {/* Description */}
        {description && (
          <motion.p
            className={`text-sm ${mutedClass} max-w-md mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {description}
          </motion.p>
        )}

        {/* Trust indicators */}
        <motion.div
          className="mt-6 flex items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-1.5">
              <CheckCircle size={14} style={{ color: accentColor }} />
              <span className={`text-xs ${mutedClass}`}>
                {i === 1 ? 'Verified' : i === 2 ? 'Trusted' : 'Secure'}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default SocialProof;
