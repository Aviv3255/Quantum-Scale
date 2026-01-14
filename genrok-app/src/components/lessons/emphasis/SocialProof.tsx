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
  variant?: 'dark' | 'light';
}

/**
 * SocialProof - Icon-based crowd illustration
 * Dark: White slide background with dark rounded block
 * Light: White background only
 */
export function SocialProof({
  stat,
  label,
  description,
  type = 'users',
  crowdSize = 24,
  accentColor = '#88da1c',
  variant = 'dark',
}: SocialProofProps) {
  const isDark = variant === 'dark';

  // Color variables
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/60' : 'text-black/60';
  const crowdIconColor = isDark ? 'text-white' : 'text-black';
  const typeIconBgColor = isDark ? 'text-black' : 'text-white';

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

  // Content
  const content = (
    <div className="relative overflow-hidden">
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
            <User size={20} className={crowdIconColor} />
          </motion.div>
        ))}
      </div>

      {/* Glow effect */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
      />

      {/* Content */}
      <div className="relative z-10 text-center py-10">
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
            <TypeIcon size={32} className={typeIconBgColor} />
          </div>
        </motion.div>

        {/* Stat */}
        <motion.div
          className={`text-6xl md:text-7xl font-bold ${textColor} mb-2`}
          style={{ fontFamily: "'General Sans', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {stat}
        </motion.div>

        {/* Label */}
        <motion.div
          className={`text-xl font-semibold ${textColor} mb-3`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {label}
        </motion.div>

        {/* Description */}
        {description && (
          <motion.p
            className={`text-sm ${mutedColor} max-w-md mx-auto`}
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
              <span className={`text-xs ${mutedColor}`}>
                {i === 1 ? 'Verified' : i === 2 ? 'Trusted' : 'Secure'}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );

  // Conditional rendering based on variant
  if (isDark) {
    return (
      <div className="bg-white p-8">
        <div className="bg-black rounded-2xl">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8">
      {content}
    </div>
  );
}

export default SocialProof;
