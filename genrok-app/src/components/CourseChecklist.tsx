'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  RotateCcw,
  ListChecks,
  X,
  ExternalLink,
} from 'lucide-react';
import { useChecklist } from '@/hooks/useChecklist';

interface CourseChecklistProps {
  courseSlug: string;
  userId?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function CourseChecklist({
  courseSlug,
  userId,
  isOpen,
  onToggle,
}: CourseChecklistProps) {
  const { items, isLoading, progress, toggleItem, isItemCompleted, resetProgress } = useChecklist(
    courseSlug,
    userId
  );

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Filter out category headers for progress calculation
  const taskItems = items.filter((item) => !item.isCategory);
  const completedCount = taskItems.filter((item) => isItemCompleted(item.id)).length;

  // Keep track of item numbering (excluding categories)
  let taskNumber = 0;

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  // Mobile toggle button (shown when panel is closed)
  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-3 text-white shadow-lg transition-all hover:opacity-90 md:bottom-6 md:right-6"
      >
        <ListChecks size={20} />
        <span className="font-medium">Checklist</span>
        <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-sm">{progress}%</span>
      </button>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={onToggle}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl md:w-96"
            style={{ marginLeft: 'var(--sidebar-width, 0px)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#eee] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)]">
                  <ListChecks size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">Course Checklist</h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    {completedCount} of {taskItems.length} completed
                  </p>
                </div>
              </div>
              <button
                onClick={onToggle}
                className="rounded-lg p-2 transition-colors hover:bg-[var(--bg-secondary)]"
              >
                <X size={20} className="text-[var(--text-muted)]" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="border-b border-[#eee] px-4 py-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--text-primary)]">Progress</span>
                <span className="text-sm font-bold text-[var(--primary)]">{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-secondary)]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #000 0%, #333 100%)' }}
                />
              </div>
            </div>

            {/* Checklist Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
                </div>
              ) : items.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-[var(--text-muted)]">No checklist items available</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item, index) => {
                    // Category header - simple text header with colon
                    if (item.isCategory) {
                      return (
                        <div
                          key={item.id}
                          className={`${index > 0 ? 'mt-8 pt-5 border-t border-[#e5e5e5]' : 'mb-2'}`}
                        >
                          <h4 className="text-sm font-semibold text-[#222]">
                            {item.title}:
                          </h4>
                        </div>
                      );
                    }

                    // Regular task item
                    taskNumber++;
                    const currentTaskNumber = taskNumber;
                    const isCompleted = isItemCompleted(item.id);

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className={`rounded-xl border transition-all ${
                          isCompleted
                            ? 'border-green-200 bg-green-50'
                            : 'border-[#eee] bg-white hover:border-[#ddd]'
                        }`}
                      >
                        <div className="p-4">
                          <div className="flex items-start gap-3">
                            {/* Checkbox */}
                            <button
                              onClick={() => toggleItem(item.id)}
                              className="mt-0.5 flex-shrink-0"
                            >
                              {isCompleted ? (
                                <CheckCircle2 size={24} className="text-green-500" />
                              ) : (
                                <Circle
                                  size={24}
                                  className="text-[#ccc] transition-colors hover:text-[#999]"
                                />
                              )}
                            </button>

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                              <span
                                className={`text-[15px] font-medium leading-snug block ${
                                  isCompleted
                                    ? 'text-green-700 line-through'
                                    : 'text-[var(--text-primary)]'
                                }`}
                              >
                                {currentTaskNumber}. {item.title}
                              </span>

                              {/* Description */}
                              {item.description && (
                                <p
                                  className={`mt-1.5 text-sm ${
                                    isCompleted ? 'text-green-600' : 'text-[var(--text-muted)]'
                                  }`}
                                >
                                  {item.description}
                                </p>
                              )}

                              {/* Link Button - Always visible */}
                              {item.link && (
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ExternalLink size={14} />
                                  {item.linkText || 'Open Link'}
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-[#eee] p-4">
              {showResetConfirm ? (
                <div className="flex items-center gap-2">
                  <span className="flex-1 text-sm text-[var(--text-muted)]">
                    Reset all progress?
                  </span>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="rounded-lg bg-[var(--bg-secondary)] px-3 py-1.5 text-sm text-[var(--text-primary)] transition-colors hover:bg-[#e5e5e5]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReset}
                    className="rounded-lg bg-red-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-red-600"
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  <RotateCcw size={16} />
                  Reset Progress
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
