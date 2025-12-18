'use client';

import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface LessonModalProps {
  slug: string;
  title: string;
  description: string;
  userName: string;
  onClose: () => void;
}

export default function LessonModal({
  slug,
  title,
  description,
  userName,
  onClose,
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

  // Generate iframe URL with userName
  const lessonUrl = `/lessons/${slug}/lesson.html?userName=${encodeURIComponent(userName)}`;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop - covers EVERYTHING including sidebar */}
      <div
        className="absolute inset-0 bg-black/70"
        style={{ backdropFilter: 'blur(16px)' }}
        onClick={onClose}
      />

      {/* Floating Lesson Card - 85% of total screen */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl overflow-hidden flex flex-col"
        style={{
          width: '85vw',
          height: '85vh',
          maxWidth: '1400px',
          maxHeight: '900px',
          boxShadow: '0 25px 100px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 md:px-6 py-3.5 border-b border-neutral-100 flex-shrink-0">
          <div>
            <p className="text-neutral-900 font-semibold text-sm">{title}</p>
            <p className="text-neutral-400 text-[10px]">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-all"
            aria-label="Close lesson"
          >
            <X size={18} />
          </button>
        </div>

        {/* Iframe - lesson content */}
        <div className="flex-1 relative">
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
