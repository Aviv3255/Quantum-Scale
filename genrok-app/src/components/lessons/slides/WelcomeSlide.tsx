'use client';

import { motion } from 'framer-motion';
import { Clock, CheckCircle2, Sparkles, Zap, Target, TrendingUp, BarChart3, PieChart } from 'lucide-react';

interface WelcomeSlideProps {
  title: string;
  subtitle?: string;
  learningGoals: string[];
  duration: string;
  darkMode?: boolean;
}

/**
 * WelcomeSlide - Premium lesson intro with icon-based illustration
 * Fixed template for ALL lessons - consistent branding
 * Dark background design with animated icon grid (no images)
 */
export function WelcomeSlide({
  title,
  subtitle,
  learningGoals,
  duration,
  darkMode = true, // Default to dark for elite design
}: WelcomeSlideProps) {
  const bgClass = darkMode ? 'bg-black' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-black';
  const mutedClass = darkMode ? 'text-white/60' : 'text-[#666666]';

  // Animated floating icons for visual interest
  const floatingIcons = [
    { Icon: Sparkles, x: 85, y: 15, size: 28, delay: 0.5 },
    { Icon: Zap, x: 75, y: 25, size: 20, delay: 0.7 },
    { Icon: Target, x: 90, y: 35, size: 24, delay: 0.6 },
    { Icon: TrendingUp, x: 80, y: 50, size: 22, delay: 0.8 },
    { Icon: BarChart3, x: 88, y: 65, size: 26, delay: 0.9 },
    { Icon: PieChart, x: 72, y: 70, size: 18, delay: 1.0 },
  ];

  return (
    <div className={`${bgClass} min-h-[600px] relative overflow-hidden`}>
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${darkMode ? '#fff' : '#000'} 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />
      </div>

      {/* Animated floating icons - pure code decoration */}
      {floatingIcons.map(({ Icon, x, y, size, delay }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -20 }}
          animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
          transition={{
            delay,
            duration: 0.6,
            ease: 'backOut',
          }}
          className="absolute"
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Icon size={size} className="text-[#88da1c]" />
          </motion.div>
        </motion.div>
      ))}

      {/* Accent glow effect */}
      <div
        className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #88da1c 0%, transparent 70%)' }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-center min-h-[600px] px-16 py-12 max-w-4xl">
        {/* Duration badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            darkMode ? 'bg-white/10 text-white/80 border border-white/10' : 'bg-black/5 text-black/70'
          }`}>
            <Clock size={14} />
            {duration} read
          </span>
        </motion.div>

        {/* Title with gradient accent */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-5xl md:text-6xl font-bold ${textClass} mb-6 leading-tight`}
          style={{ fontFamily: "'General Sans', sans-serif" }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-xl ${mutedClass} mb-12 max-w-2xl leading-relaxed`}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Learning Goals with animated checkmarks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className={`text-xs font-semibold uppercase tracking-wider ${mutedClass} mb-5`}>
            What you'll learn
          </h3>
          <div className="space-y-4">
            {learningGoals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                className="flex items-center gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
                  className="flex-shrink-0 w-7 h-7 rounded-full bg-[#88da1c] flex items-center justify-center"
                >
                  <CheckCircle2
                    size={16}
                    className="text-black"
                    strokeWidth={2.5}
                  />
                </motion.div>
                <span className={`text-lg ${darkMode ? 'text-white/90' : 'text-black/90'}`}>
                  {goal}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Animated accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#88da1c] to-[#88da1c]/50"
          style={{ width: '240px', transformOrigin: 'left' }}
        />
      </div>

      {/* Large decorative "01" watermark */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.03, x: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className={`absolute -right-12 top-1/2 -translate-y-1/2 text-[350px] font-bold ${textClass} select-none pointer-events-none`}
        style={{ fontFamily: "'General Sans', sans-serif", lineHeight: 1 }}
      >
        01
      </motion.div>
    </div>
  );
}

export default WelcomeSlide;
