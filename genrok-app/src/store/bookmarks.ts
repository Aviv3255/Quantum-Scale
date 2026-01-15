/**
 * Bookmark Store
 * Zustand state management for bookmarks with localStorage persistence
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Bookmark, BookmarkInput, BookmarkItemType } from '@/types/bookmarks';
import * as bookmarkApi from '@/lib/bookmarks';

interface BookmarksState {
  // State
  bookmarks: Bookmark[];
  counts: Record<string, number>;
  isLoading: boolean;
  isInitialized: boolean;

  // Actions
  initialize: (userId: string) => Promise<void>;
  toggleBookmark: (userId: string, input: BookmarkInput) => Promise<boolean>;
  removeBookmark: (userId: string, itemType: BookmarkItemType, itemId: string) => Promise<void>;
  isBookmarked: (itemType: BookmarkItemType, itemId: string) => boolean;
  getBookmarksByType: (type: BookmarkItemType | 'all') => Bookmark[];
  refreshCounts: () => void;
  reset: () => void;
}

export const useBookmarksStore = create<BookmarksState>()(
  persist(
    (set, get) => ({
      // Initial state
      bookmarks: [],
      counts: { all: 0 },
      isLoading: false,
      isInitialized: false,

      /**
       * Initialize bookmarks from database
       */
      initialize: async (userId: string) => {
        // Skip if already initialized
        if (get().isInitialized) return;

        set({ isLoading: true });

        try {
          const [bookmarks, counts] = await Promise.all([
            bookmarkApi.getUserBookmarks(userId),
            bookmarkApi.getBookmarkCounts(userId),
          ]);

          set({
            bookmarks,
            counts,
            isInitialized: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Failed to initialize bookmarks:', error);
          set({ isLoading: false });
        }
      },

      /**
       * Toggle bookmark state (add/remove)
       * Returns true if added, false if removed
       */
      toggleBookmark: async (userId: string, input: BookmarkInput) => {
        const { bookmarks } = get();
        const existingIndex = bookmarks.findIndex(
          (b) => b.item_type === input.item_type && b.item_id === input.item_id
        );
        const exists = existingIndex !== -1;

        // Optimistic update
        if (exists) {
          // Remove optimistically
          set((state) => ({
            bookmarks: state.bookmarks.filter(
              (b) => !(b.item_type === input.item_type && b.item_id === input.item_id)
            ),
          }));
        } else {
          // Add optimistically with temporary ID
          const tempBookmark: Bookmark = {
            id: `temp-${Date.now()}`,
            user_id: userId,
            item_type: input.item_type,
            item_id: input.item_id,
            title: input.title,
            description: input.description || null,
            thumbnail_url: input.thumbnail_url || null,
            source_url: input.source_url,
            metadata: input.metadata || null,
            created_at: new Date().toISOString(),
          };

          set((state) => ({
            bookmarks: [tempBookmark, ...state.bookmarks],
          }));
        }

        // Update counts immediately
        get().refreshCounts();

        // Sync with database
        try {
          const result = await bookmarkApi.toggleBookmark(userId, input);

          // If we added and got back a real bookmark, update the temp one
          if (result.added && result.bookmark) {
            set((state) => ({
              bookmarks: state.bookmarks.map((b) =>
                b.id.startsWith('temp-') &&
                b.item_type === input.item_type &&
                b.item_id === input.item_id
                  ? result.bookmark!
                  : b
              ),
            }));
          }

          return result.added;
        } catch (error) {
          console.error('Failed to toggle bookmark:', error);

          // Revert on error
          if (exists) {
            // Re-add the bookmark that was removed
            const removedBookmark = bookmarks[existingIndex];
            set((state) => ({
              bookmarks: [removedBookmark, ...state.bookmarks],
            }));
          } else {
            // Remove the optimistically added bookmark
            set((state) => ({
              bookmarks: state.bookmarks.filter(
                (b) => !(b.item_type === input.item_type && b.item_id === input.item_id)
              ),
            }));
          }

          get().refreshCounts();
          return exists; // Return previous state
        }
      },

      /**
       * Remove a bookmark
       */
      removeBookmark: async (userId: string, itemType: BookmarkItemType, itemId: string) => {
        const { bookmarks } = get();
        const existingBookmark = bookmarks.find(
          (b) => b.item_type === itemType && b.item_id === itemId
        );

        if (!existingBookmark) return;

        // Optimistic remove
        set((state) => ({
          bookmarks: state.bookmarks.filter(
            (b) => !(b.item_type === itemType && b.item_id === itemId)
          ),
        }));
        get().refreshCounts();

        try {
          await bookmarkApi.removeBookmark(userId, itemType, itemId);
        } catch (error) {
          console.error('Failed to remove bookmark:', error);

          // Revert on error
          set((state) => ({
            bookmarks: [existingBookmark, ...state.bookmarks],
          }));
          get().refreshCounts();
        }
      },

      /**
       * Check if an item is bookmarked (local check, instant)
       */
      isBookmarked: (itemType: BookmarkItemType, itemId: string) => {
        return get().bookmarks.some(
          (b) => b.item_type === itemType && b.item_id === itemId
        );
      },

      /**
       * Get bookmarks filtered by type
       */
      getBookmarksByType: (type: BookmarkItemType | 'all') => {
        const { bookmarks } = get();
        if (type === 'all') return bookmarks;
        return bookmarks.filter((b) => b.item_type === type);
      },

      /**
       * Recalculate counts from current bookmarks
       */
      refreshCounts: () => {
        const { bookmarks } = get();
        const counts: Record<string, number> = { all: bookmarks.length };

        bookmarks.forEach((b) => {
          counts[b.item_type] = (counts[b.item_type] || 0) + 1;
        });

        set({ counts });
      },

      /**
       * Reset store (on logout)
       */
      reset: () =>
        set({
          bookmarks: [],
          counts: { all: 0 },
          isLoading: false,
          isInitialized: false,
        }),
    }),
    {
      name: 'quantum-bookmarks',
      partialize: (state) => ({
        bookmarks: state.bookmarks,
        counts: state.counts,
      }),
    }
  )
);
