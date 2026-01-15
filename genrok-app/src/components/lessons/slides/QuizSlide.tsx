'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';

interface QuizOption {
  text: string;
  correct: boolean;
}

interface QuizSlideProps {
  question: string;
  options: QuizOption[];
  feedback?: {
    correct: string;
    incorrect: string;
  };
  variant?: 'dark' | 'light';
}

/**
 * QuizSlide - Fixed template for ALL lessons (end-of-lesson quiz)
 * Premium design with celebration animation on correct answer
 * Supports dark/light variants
 */
export function QuizSlide({
  question,
  options,
  feedback = {
    correct: 'Excellent! You got it right.',
    incorrect: 'Not quite. Review the lesson and try again.',
  },
  variant = 'dark',
}: QuizSlideProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const isDark = variant === 'dark';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const cardBg = isDark ? 'bg-white/5' : 'bg-[#F8F9FA]';
  const cardBorder = isDark ? 'border-white/10' : 'border-[#E5E5E5]';

  const isCorrect = selectedIndex !== null && options[selectedIndex]?.correct;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedIndex(index);
    setTimeout(() => setShowFeedback(true), 300);
  };

  const content = (
    <div className={`min-h-[600px] ${isDark ? 'bg-black' : ''} p-12 flex flex-col items-center justify-center`}>
      {/* Quiz Container */}
      <div className="w-full max-w-2xl">
        {/* Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#88da1c]/10 text-[#88da1c] text-sm font-semibold mb-6">
            <Sparkles size={14} />
            Knowledge Check
          </span>
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: "'General Sans', sans-serif", color: isDark ? '#fff' : '#000' }}
          >
            {question}
          </h2>
        </motion.div>

        {/* Options */}
        <div className="space-y-4">
          {options.map((option, index) => {
            const isSelected = selectedIndex === index;
            const isOptionCorrect = option.correct;
            let optionStyle = `${cardBg} border ${cardBorder}`;

            if (showFeedback && isSelected) {
              optionStyle = isOptionCorrect
                ? 'bg-[#88da1c] border-[#88da1c] text-black'
                : 'bg-[#EF4444] border-[#EF4444] text-white';
            } else if (showFeedback && isOptionCorrect) {
              optionStyle = 'bg-[#88da1c]/20 border-[#88da1c]';
            }

            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08 }}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                className={`w-full p-5 rounded-2xl text-left transition-all duration-300 ${optionStyle} ${
                  !showFeedback ? 'hover:scale-[1.02] hover:shadow-lg cursor-pointer' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-lg font-medium"
                    style={{ color: showFeedback && isSelected ? undefined : (isDark ? '#fff' : '#000') }}
                  >
                    {option.text}
                  </span>
                  {showFeedback && isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex-shrink-0"
                    >
                      {isOptionCorrect ? (
                        <Check size={24} strokeWidth={3} />
                      ) : (
                        <X size={24} strokeWidth={3} />
                      )}
                    </motion.span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-8 p-6 rounded-2xl ${
                isCorrect ? 'bg-[#88da1c]/10' : 'bg-[#EF4444]/10'
              }`}
            >
              <div className="flex items-start gap-4">
                <span
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    isCorrect ? 'bg-[#88da1c]' : 'bg-[#EF4444]'
                  }`}
                >
                  {isCorrect ? (
                    <Check size={20} className="text-black" strokeWidth={3} />
                  ) : (
                    <X size={20} className="text-white" strokeWidth={3} />
                  )}
                </span>
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: isDark ? '#fff' : '#000' }}>
                    {isCorrect ? 'Correct!' : 'Not Quite'}
                  </h3>
                  <p className={mutedColor}>
                    {isCorrect ? feedback.correct : feedback.incorrect}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Celebration particles for correct answer */}
        {showFeedback && isCorrect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 pointer-events-none overflow-hidden"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: '50%',
                  y: '50%',
                  scale: 0,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 0.3,
                  ease: 'easeOut',
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#88da1c', '#FFD700', '#00D4FF'][i % 3],
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
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

export default QuizSlide;
