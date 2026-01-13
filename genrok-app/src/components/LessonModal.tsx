'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
import { X, Bookmark, BookmarkCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import { useBookmarksStore } from '@/store/bookmarks';
import { useLessonProgressStore } from '@/store/lessonProgress';
import type { BookmarkInput } from '@/types/bookmarks';

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
  // Track the current slide from iframe postMessage
  const [currentSlide, setCurrentSlide] = useState(initialSlide ?? 0);
  const [totalSlides, setTotalSlides] = useState(10); // Default, updated from iframe
  const currentSlideRef = useRef(initialSlide ?? 0);

  // Get progress store update function
  const updateProgress = useLessonProgressStore((s) => s.updateProgress);

  // ESC key to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  // Listen for slide changes from the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Listen for LESSON_SLIDE_UPDATE (correct message type from lesson HTML)
      if (event.data?.type === 'LESSON_SLIDE_UPDATE' && typeof event.data.slideIndex === 'number') {
        const newSlide = event.data.slideIndex;
        const slidesCount = event.data.totalSlides || totalSlides;

        currentSlideRef.current = newSlide;
        setCurrentSlide(newSlide);

        if (event.data.totalSlides) {
          setTotalSlides(event.data.totalSlides);
        }

        // Update the progress store to track lesson progress
        updateProgress(slug, newSlide, slidesCount);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [slug, totalSlides, updateProgress]);

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
          <div className="flex items-center gap-2">
            {/* Bookmark current slide - with text label */}
            <SlideBookmarkButton
              slug={slug}
              title={title}
              description={description}
              currentSlide={currentSlide}
            />
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-all"
              aria-label="Close lesson"
            >
              <X size={20} />
            </button>
          </div>
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

// Slide Bookmark Button with text label
interface SlideBookmarkButtonProps {
  slug: string;
  title: string;
  description: string;
  currentSlide: number;
}

function SlideBookmarkButton({ slug, title, description, currentSlide }: SlideBookmarkButtonProps) {
  const { user } = useAuthStore();
  const { isBookmarked, toggleBookmark } = useBookmarksStore();
  const [isAnimating, setIsAnimating] = useState(false);

  const itemId = `${slug}:${currentSlide}`;
  const bookmarked = isBookmarked('lesson_slide', itemId);

  const handleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!user?.id || isAnimating) return;

      setIsAnimating(true);

      const input: BookmarkInput = {
        item_type: 'lesson_slide',
        item_id: itemId,
        title: `${title} - Slide ${currentSlide + 1}`,
        source_url: `/learn?lesson=${slug}&slide=${currentSlide}`,
        description,
      };

      await toggleBookmark(user.id, input);
      setTimeout(() => setIsAnimating(false), 300);
    },
    [user?.id, isAnimating, itemId, title, currentSlide, slug, description, toggleBookmark]
  );

  if (!user) return null;

  return (
    <motion.button
      onClick={handleClick}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-xl
        transition-all duration-200 text-sm font-medium
        ${bookmarked
          ? 'bg-[var(--primary)] text-black'
          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
        }
      `}
      whileTap={{ scale: 0.95 }}
      aria-label={bookmarked ? 'Remove slide bookmark' : 'Bookmark this slide'}
    >
      <AnimatePresence mode="wait">
        {bookmarked ? (
          <motion.div
            key="bookmarked"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <BookmarkCheck size={16} strokeWidth={2} />
          </motion.div>
        ) : (
          <motion.div
            key="not-bookmarked"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Bookmark size={16} strokeWidth={1.5} />
          </motion.div>
        )}
      </AnimatePresence>
      <span>{bookmarked ? 'Slide saved' : 'Bookmark slide'}</span>
    </motion.button>
  );
}
