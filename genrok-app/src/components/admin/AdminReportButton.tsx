'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import { AdminReportModal } from './AdminReportModal';
import type { LessonSlideContext } from '@/types/admin';

export function AdminReportButton() {
  const { isAdmin, isLoading } = useAdmin();

  useEffect(() => {
    console.log('[AdminReportButton] Mounted, isAdmin:', isAdmin, 'isLoading:', isLoading);
  }, [isAdmin, isLoading]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lessonContext, setLessonContext] = useState<LessonSlideContext | null>(null);

  // Listen for lesson slide updates from iframe (via postMessage) and custom events
  useEffect(() => {
    // Handle postMessage from iframe directly
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'LESSON_SLIDE_UPDATE') {
        setLessonContext({
          lessonSlug: event.data.lessonSlug,
          slideIndex: event.data.slideIndex,
          slideType: event.data.slideType,
        });
      }
    };

    // Handle custom event dispatched by lesson page
    const handleCustomEvent = (event: CustomEvent) => {
      setLessonContext({
        lessonSlug: event.detail.lessonSlug,
        slideIndex: event.detail.slideIndex,
        slideType: event.detail.slideType,
      });
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('lessonSlideContext', handleCustomEvent as EventListener);
    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('lessonSlideContext', handleCustomEvent as EventListener);
    };
  }, []);

  // Clear lesson context when navigating away from lessons
  useEffect(() => {
    const pathname = window.location.pathname;
    if (!pathname.includes('/learn/lessons/')) {
      setLessonContext(null);
    }
  }, []);

  // Don't render if not admin or still loading
  if (isLoading || !isAdmin) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isModalOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 flex items-center justify-center z-[9999] transition-colors"
            title="Report an issue"
          >
            <Bug className="w-6 h-6" />

            {/* Pulse animation */}
            <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AdminReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lessonContext={lessonContext}
      />
    </>
  );
}
