'use client';

import { useState, useEffect } from 'react';
import { Bug } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import { AdminReportModal } from './AdminReportModal';
import type { LessonSlideContext } from '@/types/admin';

export function AdminReportButton() {
  const { isAdmin, isLoading } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lessonContext, setLessonContext] = useState<LessonSlideContext | null>(null);

  // Debug logging
  console.log('[AdminReportButton] Render - isAdmin:', isAdmin, 'isLoading:', isLoading);

  // Send admin status to iframes when admin status changes
  useEffect(() => {
    console.log('[AdminReportButton] useEffect - isLoading:', isLoading, 'isAdmin:', isAdmin);
    if (!isLoading) {
      // Send to all iframes
      const iframes = document.querySelectorAll('iframe');
      console.log('[AdminReportButton] Found iframes:', iframes.length);
      iframes.forEach((iframe, index) => {
        try {
          console.log('[AdminReportButton] Sending ADMIN_STATUS to iframe', index, 'isAdmin:', isAdmin);
          iframe.contentWindow?.postMessage({ type: 'ADMIN_STATUS', isAdmin }, '*');
        } catch (e) {
          console.log('[AdminReportButton] Error sending to iframe', index, e);
        }
      });
    }
  }, [isAdmin, isLoading]);

  // Listen for slide context from lesson iframes
  useEffect(() => {
    const handleSlideContext = (event: CustomEvent<LessonSlideContext>) => {
      setLessonContext(event.detail);
    };

    // Listen for messages from lesson iframes
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'ADMIN_REPORT_REQUEST') {
        // Admin wants to report an issue for a specific slide/element
        setLessonContext({
          slideIndex: event.data.slideIndex,
          slideType: event.data.slideType,
          lessonSlug: event.data.lessonSlug,
          elementId: event.data.elementId
        });
        setIsModalOpen(true);
      } else if (event.data?.type === 'LESSON_SLIDE_UPDATE') {
        // Just update context (for floating button)
        setLessonContext({
          slideIndex: event.data.slideIndex,
          slideType: event.data.slideType,
          lessonSlug: event.data.lessonSlug
        });
      } else if (event.data?.type === 'CHECK_ADMIN_STATUS') {
        // Iframe is asking for admin status - respond
        const sourceWindow = event.source as Window;
        if (sourceWindow) {
          sourceWindow.postMessage({ type: 'ADMIN_STATUS', isAdmin }, '*');
        }
      }
    };

    window.addEventListener('lessonSlideContext', handleSlideContext as EventListener);
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('lessonSlideContext', handleSlideContext as EventListener);
      window.removeEventListener('message', handleMessage);
    };
  }, [isAdmin]);

  // TEMPORARILY showing for all users (for debugging) - TODO: restore admin check before going live
  if (isLoading) {
    console.log('[AdminReportButton] NOT RENDERING - isLoading:', isLoading);
    return null;
  }

  console.log('[AdminReportButton] RENDERING BUTTON for all users (debug mode)');

  return (
    <>
      {/* Floating Report Button */}
      <button
        onClick={() => {
          console.log('[AdminReportButton] Button clicked! Opening modal...');
          setIsModalOpen(true);
        }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)';
        }}
        title={lessonContext
          ? `Report issue for Slide ${lessonContext.slideIndex + 1} (${lessonContext.slideType})`
          : 'Report an issue on this page'
        }
      >
        <Bug style={{ width: '24px', height: '24px' }} />
      </button>

      {/* Report Modal */}
      <AdminReportModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          // Clear element-specific context after closing
          if (lessonContext?.elementId) {
            setLessonContext(prev => prev ? { ...prev, elementId: undefined } : null);
          }
        }}
        lessonContext={lessonContext}
      />
    </>
  );
}
