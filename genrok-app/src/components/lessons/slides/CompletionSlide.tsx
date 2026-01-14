'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Trophy, Star } from 'lucide-react';

interface CompletionSlideProps {
  lessonTitle: string;
  keyTakeaways: string[];
  nextLesson?: {
    title: string;
    description: string;
    slug: string;
  };
  darkMode?: boolean;
}

/**
 * CompletionSlide - Fixed template for ALL lessons
 * Premium celebration with key takeaways and next lesson preview
 */
export function CompletionSlide({
  lessonTitle,
  keyTakeaways,
  nextLesson,
  darkMode = false,
}: CompletionSlideProps) {
  const bgClass = darkMode ? 'bg-black' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-black';
  const mutedClass = darkMode ? 'text-white/60' : 'text-[#666666]';
  const cardBg = darkMode ? 'bg-white/5' : 'bg-[#F8F9FA]';

  return (
    <div className={`min-h-[600px] ${bgClass} p-12 flex flex-col items-center justify-center`}>
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative mb-8"
      >
        {/* Glow ring */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-[#88da1c]/30 blur-xl"
          style={{ width: 120, height: 120, margin: -20 }}
        />
        <div className="w-20 h-20 rounded-full bg-[#88da1c] flex items-center justify-center relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <CheckCircle size={40} className="text-black" strokeWidth={2.5} />
          </motion.div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-10"
      >
        <h2
          className={`text-4xl font-bold ${textClass} mb-3`}
          style={{ fontFamily: "'General Sans', sans-serif" }}
        >
          Lesson Complete!
        </h2>
        <p className={`text-lg ${mutedClass}`}>
          You've finished "{lessonTitle}"
        </p>
      </motion.div>

      {/* Key Takeaways */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`w-full max-w-xl ${cardBg} rounded-2xl p-8 mb-8`}
      >
        <div className="flex items-center gap-3 mb-6">
          <Trophy size={20} className="text-[#88da1c]" />
          <h3 className={`text-lg font-bold ${textClass}`}>Key Takeaways</h3>
        </div>
        <ul className="space-y-4">
          {keyTakeaways.map((takeaway, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-start gap-3"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#88da1c]/20 flex items-center justify-center mt-0.5">
                <Star size={12} className="text-[#88da1c]" fill="currentColor" />
              </span>
              <span className={textClass}>{takeaway}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Next Lesson Card */}
      {nextLesson && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-xl"
        >
          <p className={`text-sm font-semibold uppercase tracking-widest ${mutedClass} mb-4`}>
            Up Next
          </p>
          <a
            href={`/lessons/${nextLesson.slug}`}
            className={`block ${cardBg} rounded-2xl p-6 border-2 border-transparent hover:border-[#88da1c] transition-all duration-300 group`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className={`text-xl font-bold ${textClass} mb-2 group-hover:text-[#88da1c] transition-colors`}>
                  {nextLesson.title}
                </h4>
                <p className={mutedClass}>{nextLesson.description}</p>
              </div>
              <motion.span
                whileHover={{ x: 5 }}
                className="flex-shrink-0 w-12 h-12 rounded-full bg-[#88da1c] flex items-center justify-center"
              >
                <ArrowRight size={20} className="text-black" />
              </motion.span>
            </div>
          </a>
        </motion.div>
      )}
    </div>
  );
}

export default CompletionSlide;
