'use client';

/**
 * Bookmarks Page
 * Dedicated page for viewing and managing all bookmarks
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  Trash2,
  Search,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { useBookmarksStore } from '@/store/bookmarks';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  BOOKMARK_CATEGORIES,
  BOOKMARK_TYPE_LABELS,
  type BookmarkItemType,
  type Bookmark as BookmarkType,
} from '@/types/bookmarks';

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

export default function BookmarksPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const { bookmarks, counts, getBookmarksByType, removeBookmark, initialize, isInitialized } =
    useBookmarksStore();
  const [activeCategory, setActiveCategory] = useState<BookmarkItemType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Initialize bookmarks if not already done
  useEffect(() => {
    if (user?.id && !isInitialized) {
      initialize(user.id);
    }
  }, [user?.id, initialize, isInitialized]);

  // Filter bookmarks by category and search
  const filteredBookmarks = getBookmarksByType(activeCategory).filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle bookmark removal
  const handleRemove = async (bookmark: BookmarkType) => {
    if (!user?.id) return;
    await removeBookmark(user.id, bookmark.item_type, bookmark.item_id);
  };

  // Get categories with bookmarks
  const visibleCategories = BOOKMARK_CATEGORIES.filter(
    (cat) => cat.id === 'all' || (counts[cat.id] || 0) > 0
  );

  // Loading state
  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Page Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Bookmark size={28} className="text-[var(--primary)]" />
                <h1>Your Bookmarks</h1>
              </div>
              <p className="text-[var(--text-muted)]">
                All your saved items in one place.{' '}
                <span className="font-medium text-[var(--text-secondary)]">
                  {counts.all || 0} items
                </span>{' '}
                saved.
              </p>
            </div>

            {/* Search */}
            <div className="search-input w-full md:w-72">
              <Search className="search-input-icon" size={18} />
              <input
                type="text"
                placeholder="Search bookmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
                style={{ paddingLeft: '44px' }}
              />
            </div>
          </div>
        </motion.header>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide"
        >
          {visibleCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || Bookmark;
            const isActive = activeCategory === cat.id;
            const count = counts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all text-sm font-medium
                  ${isActive
                    ? 'bg-[var(--primary)] text-black'
                    : 'bg-white text-[var(--text-secondary)] border border-[var(--border-light)] hover:bg-[var(--bg-hover)]'
                  }
                `}
              >
                <Icon size={16} />
                {cat.name}
                <span className={`${isActive ? 'opacity-70' : 'opacity-50'}`}>({count})</span>
              </button>
            );
          })}
        </motion.div>

        {/* Bookmarks Grid */}
        <AnimatePresence mode="wait">
          {filteredBookmarks.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card text-center py-16"
            >
              <Bookmark
                size={48}
                className="mx-auto mb-4 text-[var(--text-muted)] opacity-40"
              />
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                {searchQuery ? 'No bookmarks found' : 'No bookmarks yet'}
              </h3>
              <p className="text-[var(--text-muted)] max-w-md mx-auto">
                {searchQuery
                  ? 'Try adjusting your search query or select a different category.'
                  : 'Start bookmarking items to see them here. Look for the bookmark icon on products, lessons, courses, and more.'}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredBookmarks.map((bookmark, idx) => (
                <motion.div
                  key={bookmark.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="card group relative overflow-hidden"
                  style={{ padding: 0 }}
                  data-testid="bookmark-card"
                >
                  {/* Thumbnail */}
                  {bookmark.thumbnail_url ? (
                    <div className="aspect-[16/10] bg-[var(--bg-secondary)] overflow-hidden">
                      <img
                        src={bookmark.thumbnail_url}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-[var(--bg-secondary)] flex items-center justify-center">
                      <Bookmark size={32} className="text-[var(--text-muted)] opacity-30" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
                        {BOOKMARK_TYPE_LABELS[bookmark.item_type]}
                      </span>
                      <button
                        onClick={() => handleRemove(bookmark)}
                        className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove bookmark"
                        data-testid="remove-bookmark"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <h3 className="font-semibold text-[var(--text-primary)] mb-1 line-clamp-1">
                      {bookmark.title}
                    </h3>

                    {bookmark.description && (
                      <p className="text-sm text-[var(--text-muted)] mb-3 line-clamp-2">
                        {bookmark.description}
                      </p>
                    )}

                    <a
                      href={bookmark.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:opacity-80 transition-opacity"
                    >
                      <ExternalLink size={14} />
                      View original
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
