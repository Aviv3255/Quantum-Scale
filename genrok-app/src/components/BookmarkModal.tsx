'use client';

/**
 * BookmarkModal Component
 * Small popup modal showing bookmarks by category
 */

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bookmark,
  BookOpen,
  Layers,
  GraduationCap,
  ShoppingBag,
  Image as ImageIcon,
  Sparkles,
  AppWindow,
  TrendingUp,
  LayoutTemplate,
  ExternalLink,
  ChevronRight,
  X,
} from 'lucide-react';
import { useBookmarksStore } from '@/store/bookmarks';
import { BOOKMARK_CATEGORIES, type BookmarkItemType, BOOKMARK_TYPE_LABELS } from '@/types/bookmarks';

interface BookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
}

// Map icon names to components
const iconMap: Record<string, React.ElementType> = {
  Bookmark,
  BookOpen,
  Layers,
  GraduationCap,
  ShoppingBag,
  Image: ImageIcon,
  ImageIcon,
  Sparkles,
  AppWindow,
  TrendingUp,
  LayoutTemplate,
};

export function BookmarkModal({ isOpen, onClose, anchorRef }: BookmarkModalProps) {
  const { bookmarks, counts, getBookmarksByType } = useBookmarksStore();
  const [activeCategory, setActiveCategory] = useState<BookmarkItemType | 'all'>('all');
  const modalRef = useRef<HTMLDivElement>(null);

  const filteredBookmarks = getBookmarksByType(activeCategory).slice(0, 5);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, anchorRef]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Reset category when modal closes
  useEffect(() => {
    if (!isOpen) {
      setActiveCategory('all');
    }
  }, [isOpen]);

  // Get categories that have bookmarks (or all)
  const visibleCategories = BOOKMARK_CATEGORIES.filter(
    (cat) => cat.id === 'all' || (counts[cat.id] || 0) > 0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full right-0 mt-2 w-[380px] max-h-[480px] bg-white rounded-xl border border-[var(--border-light)] shadow-xl overflow-hidden z-50"
          data-testid="bookmark-modal"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-light)] bg-[var(--bg-secondary)]">
            <div className="flex items-center gap-2">
              <Bookmark size={18} className="text-[var(--primary)]" />
              <span className="font-semibold text-[var(--text-primary)]">Bookmarks</span>
              <span className="text-xs text-[var(--text-muted)] bg-white px-2 py-0.5 rounded-full">
                {counts.all || 0}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white transition-colors"
            >
              <X size={16} className="text-[var(--text-muted)]" />
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex gap-1.5 px-3 py-2.5 overflow-x-auto scrollbar-hide border-b border-[var(--border-light)]">
            {visibleCategories.map((cat) => {
              const Icon = iconMap[cat.icon] || Bookmark;
              const isActive = activeCategory === cat.id;
              const count = counts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all
                    ${isActive
                      ? 'bg-[var(--primary)] text-black'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                    }
                  `}
                >
                  <Icon size={12} />
                  {cat.name}
                  {count > 0 && (
                    <span className={`${isActive ? 'opacity-70' : 'opacity-50'}`}>
                      ({count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bookmark List */}
          <div className="max-h-[280px] overflow-y-auto">
            {filteredBookmarks.length === 0 ? (
              <div className="p-8 text-center">
                <Bookmark
                  size={32}
                  className="mx-auto mb-2 text-[var(--text-muted)] opacity-40"
                />
                <p className="text-sm text-[var(--text-muted)]">
                  {activeCategory === 'all'
                    ? 'No bookmarks yet'
                    : `No ${BOOKMARK_TYPE_LABELS[activeCategory as BookmarkItemType]?.toLowerCase() || ''} bookmarks`}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[var(--border-light)]">
                {filteredBookmarks.map((bookmark) => (
                  <a
                    key={bookmark.id}
                    href={bookmark.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--bg-secondary)] transition-colors group"
                    data-testid="bookmark-item"
                  >
                    {bookmark.thumbnail_url ? (
                      <img
                        src={bookmark.thumbnail_url}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover bg-[var(--bg-secondary)] flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center flex-shrink-0">
                        <Bookmark size={16} className="text-[var(--text-muted)]" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                        {bookmark.title}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] truncate">
                        {bookmark.description || BOOKMARK_TYPE_LABELS[bookmark.item_type]}
                      </p>
                    </div>
                    <ExternalLink
                      size={14}
                      className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Footer - See All */}
          <div className="p-3 border-t border-[var(--border-light)] bg-[var(--bg-secondary)]">
            <Link
              href="/bookmarks"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[var(--text-primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              See all bookmarks
              <ChevronRight size={16} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BookmarkModal;
