'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ElementType } from 'react';

interface StepData {
  title: string;
  description?: string;
  iconName?: string;
}

interface StepByStepLayoutProps {
  headline?: string;
  steps: StepData[];
  currentStep?: number;
  accentColor?: string;
}

export function StepByStepLayout({
  headline,
  steps,
  currentStep,
  accentColor = '#88da1c',
}: StepByStepLayoutProps) {
  return (
    <div className="bg-white p-8 min-h-[500px] flex items-center justify-center">
      <div className="bg-black rounded-2xl p-10 w-full">
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

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {steps.map((step, index) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Icon = step.iconName
              ? (LucideIcons as any)[step.iconName] as ElementType
              : null;
            const isActive = currentStep !== undefined && index <= currentStep;
            const isCurrent = currentStep === index;

            return (
              <div key={index} className="flex items-center flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="flex flex-col items-center text-center flex-1"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                      isCurrent
                        ? 'scale-110'
                        : ''
                    }`}
                    style={{
                      backgroundColor: isActive
                        ? `${accentColor}20`
                        : 'rgba(255,255,255,0.05)',
                    }}
                  >
                    {Icon ? (
                      <Icon
                        size={24}
                        style={{ color: isActive ? accentColor : 'rgba(255,255,255,0.3)' }}
                      />
                    ) : (
                      <span
                        className="text-xl font-bold"
                        style={{ color: isActive ? accentColor : 'rgba(255,255,255,0.3)' }}
                      >
                        {index + 1}
                      </span>
                    )}
                  </div>

                  <h3
                    className="text-sm font-semibold mb-1"
                    style={{ color: isActive ? 'white' : 'rgba(255,255,255,0.4)' }}
                  >
                    {step.title}
                  </h3>

                  {step.description && (
                    <p
                      className="text-xs max-w-[150px]"
                      style={{ color: isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)' }}
                    >
                      {step.description}
                    </p>
                  )}
                </motion.div>

                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="hidden md:block h-0.5 flex-1 mx-2"
                    style={{
                      backgroundColor:
                        currentStep !== undefined && index < currentStep
                          ? accentColor
                          : 'rgba(255,255,255,0.1)',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StepByStepLayout;
