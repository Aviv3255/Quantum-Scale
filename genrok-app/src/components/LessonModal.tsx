'use client';

import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface LessonModalProps {
  slug: string;
  title: string;
  description: string;
  userName: string;
  onClose: () => void;
  initialSlide?: number | null;
}

export default function LessonModal({
  slug,
  title,
  description,
  userName,
  onClose,
  initialSlide,
}: LessonModalProps) {
  // ESC key to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  // Generate iframe URL with userName and optional initialSlide
  const lessonUrl = `/lessons/${slug}/lesson.html?userName=${encodeURIComponent(userName)}${initialSlide !== null && initialSlide !== undefined ? `&slide=${initialSlide}` : ''}`;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop - covers EVERYTHING including sidebar */}
      <div
        className="absolute inset-0 bg-black/70"
        style={{ backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      />

      {/* Floating Lesson Card - 90% of total screen with 3D light rays */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl overflow-hidden flex flex-col"
        style={{
          width: '90vw',
          height: '90vh',
          maxWidth: '1600px',
          maxHeight: '950px',
          boxShadow: `
            0 0 0 1px rgba(255, 255, 255, 0.1),
            0 25px 100px rgba(0, 0, 0, 0.5),
            0 0 120px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 rgba(0, 0, 0, 0.05)
          `,
          background: `
            linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,250,252,1) 100%)
          `,
        }}
      >
        {/* Subtle light rays overlay for 3D effect */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,255,255,0.4) 0%, transparent 50%),
              radial-gradient(ellipse 60% 30% at 10% 10%, rgba(255,255,255,0.15) 0%, transparent 40%),
              radial-gradient(ellipse 60% 30% at 90% 10%, rgba(255,255,255,0.15) 0%, transparent 40%)
            `,
            zIndex: 1,
          }}
        />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-6 md:px-8 py-4 border-b border-neutral-100/80 flex-shrink-0 bg-white/50 backdrop-blur-sm">
          <div>
            <p className="text-neutral-900 font-bold text-base">{title}</p>
            <p className="text-neutral-400 text-xs">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-all"
            aria-label="Close lesson"
          >
            <X size={20} />
          </button>
        </div>

        {/* Iframe - lesson content */}
        <div className="flex-1 relative z-10">
          <iframe
            src={lessonUrl}
            className="absolute inset-0 w-full h-full border-0"
            title={title}
            allow="fullscreen"
          />
        </div>
      </div>
    </div>
  );
}
