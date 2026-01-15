'use client';

/**
 * BookmarksInitializer
 * Initializes the bookmarks store when user is authenticated
 * Resets the store when user logs out
 */

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/auth';
import { useBookmarksStore } from '@/store/bookmarks';

export function BookmarksInitializer() {
  const { user, isLoading: authLoading } = useAuthStore();
  const { initialize, reset, isInitialized } = useBookmarksStore();
  const lastUserId = useRef<string | null>(null);

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return;

    const currentUserId = user?.id ?? null;

    // User logged in
    if (currentUserId && currentUserId !== lastUserId.current) {
      console.log('[BookmarksInitializer] User logged in, initializing bookmarks');
      initialize(currentUserId);
      lastUserId.current = currentUserId;
    }

    // User logged out
    if (!currentUserId && lastUserId.current) {
      console.log('[BookmarksInitializer] User logged out, resetting bookmarks');
      reset();
      lastUserId.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, authLoading]);

  // This component doesn't render anything
  return null;
}
