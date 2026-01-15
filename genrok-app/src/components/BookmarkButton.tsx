'use client';

/**
 * BookmarkButton Component
 * Minimalistic bookmark icon button for any bookmarkable item
 */

import { useState, useCallback } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import { useBookmarksStore } from '@/store/bookmarks';
import type { BookmarkInput, BookmarkItemType } from '@/types/bookmarks';

interface BookmarkButtonProps {
  itemType: BookmarkItemType;
  itemId: string;
  title: string;
  sourceUrl: string;
  description?: string;
  thumbnailUrl?: string;
  metadata?: Record<string, unknown>;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTooltip?: boolean;
}

const sizes = {
  sm: { icon: 14, button: 'w-7 h-7' },
  md: { icon: 16, button: 'w-8 h-8' },
  lg: { icon: 18, button: 'w-10 h-10' },
};

export function BookmarkButton({
  itemType,
  itemId,
  title,
  sourceUrl,
  description,
  thumbnailUrl,
  metadata,
  size = 'md',
  className = '',
  showTooltip = true,
}: BookmarkButtonProps) {
  const { user } = useAuthStore();
  const { isBookmarked, toggleBookmark } = useBookmarksStore();
  const [isAnimating, setIsAnimating] = useState(false);

  const bookmarked = isBookmarked(itemType, itemId);
  const { icon: iconSize, button: buttonClass } = sizes[size];

  const handleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!user?.id || isAnimating) return;

      setIsAnimating(true);

      const input: BookmarkInput = {
        item_type: itemType,
        item_id: itemId,
        title,
        source_url: sourceUrl,
        description,
        thumbnail_url: thumbnailUrl,
        metadata,
      };

      await toggleBookmark(user.id, input);

      // Reset animation state after delay
      setTimeout(() => setIsAnimating(false), 300);
    },
    [user?.id, isAnimating, itemType, itemId, title, sourceUrl, description, thumbnailUrl, metadata, toggleBookmark]
  );

  // Don't render if user is not logged in
  if (!user) return null;

  return (
    <motion.button
      onClick={handleClick}
      className={`
        ${buttonClass}
        flex items-center justify-center rounded-lg
        transition-all duration-200
        ${bookmarked
          ? 'bg-[var(--primary)] text-black'
          : 'bg-white/90 backdrop-blur-sm text-[var(--text-muted)] hover:bg-white hover:text-[var(--text-primary)]'
        }
        border border-[var(--border-light)]
        shadow-sm hover:shadow-md
        ${className}
      `}
      whileTap={{ scale: 0.9 }}
      title={showTooltip ? (bookmarked ? 'Remove bookmark' : 'Add bookmark') : undefined}
      data-testid="bookmark-button"
      aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
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
            <BookmarkCheck size={iconSize} strokeWidth={2} />
          </motion.div>
        ) : (
          <motion.div
            key="not-bookmarked"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Bookmark size={iconSize} strokeWidth={1.5} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default BookmarkButton;
