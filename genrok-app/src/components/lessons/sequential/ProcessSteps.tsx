'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ProcessStep {
  title: string;
  description?: string;
  icon?: LucideIcon;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
  title?: string;
  currentStep?: number;
  accentColor?: string;
  variant?: 'dark' | 'light';
}

/**
 * ProcessSteps - Horizontal step indicators
 * Dark: White slide background with dark rounded block
 * Light: White background only
 */
export function ProcessSteps({
  steps,
  title,
  currentStep = -1,
  accentColor = '#88da1c',
  variant = 'dark',
}: ProcessStepsProps) {
  const isDark = variant === 'dark';

  // Color variables
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-white/50' : 'text-black/50';
  const inactiveBg = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const inactiveTextColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';

  // Content
  const content = (
    <>
      {title && (
        <h3 className={`text-xl font-bold ${textColor} mb-8 text-center`}>{title}</h3>
      )}

      {/* Steps */}
      <div className="flex items-start justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          const isLast = index === steps.length - 1;
          const Icon = step.icon;

          return (
            <div key={index} className="flex items-start flex-1">
              {/* Step content */}
              <motion.div
                className="flex flex-col items-center text-center flex-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                {/* Step number/icon */}
                <motion.div
                  className="relative mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.2 + index * 0.15,
                    type: 'spring',
                    stiffness: 200,
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg transition-colors"
                    style={{
                      backgroundColor: isActive ? accentColor : inactiveBg,
                      color: isActive ? '#000' : inactiveTextColor,
                    }}
                  >
                    {Icon ? <Icon size={24} /> : index + 1}
                  </div>

                  {/* Glow effect for active */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        boxShadow: `0 0 30px ${accentColor}40`,
                      }}
                    />
                  )}
                </motion.div>

                {/* Title */}
                <h4 className={`text-sm font-semibold ${isActive ? textColor : mutedColor} mb-1`}>
                  {step.title}
                </h4>

                {/* Description */}
                {step.description && (
                  <p className={`text-xs ${mutedColor} max-w-[140px]`}>
                    {step.description}
                  </p>
                )}
              </motion.div>

              {/* Connector */}
              {!isLast && (
                <motion.div
                  className="flex items-center justify-center pt-6 px-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.15 }}
                >
                  <ChevronRight
                    size={20}
                    className={index < currentStep ? '' : mutedColor}
                    style={index < currentStep ? { color: accentColor } : undefined}
                  />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );

  // Conditional rendering based on variant
  if (isDark) {
    return (
      <div className="bg-white p-8">
        <div className="bg-black rounded-2xl p-8">
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

export default ProcessSteps;
