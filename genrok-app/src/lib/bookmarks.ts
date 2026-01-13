/**
 * Bookmark API Functions
 * Supabase CRUD operations for bookmarks
 *
 * Note: Type assertions are used because the bookmarks table may not be
 * in the generated Supabase types yet. Regenerate types after running migration.
 */

import { supabase } from './supabase';
import type { Bookmark, BookmarkInput, BookmarkItemType } from '@/types/bookmarks';

// Helper to get typed bookmarks table (workaround for missing generated types)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bookmarksTable = () => supabase.from('bookmarks') as any;

/**
 * Get all bookmarks for a user
 */
export async function getUserBookmarks(userId: string): Promise<Bookmark[]> {
  const { data, error } = await bookmarksTable()
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching bookmarks:', error);
    throw error;
  }

  return (data || []) as Bookmark[];
}

/**
 * Get bookmarks filtered by type
 */
export async function getBookmarksByType(
  userId: string,
  itemType: BookmarkItemType
): Promise<Bookmark[]> {
  const { data, error } = await bookmarksTable()
    .select('*')
    .eq('user_id', userId)
    .eq('item_type', itemType)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching bookmarks by type:', error);
    throw error;
  }

  return (data || []) as Bookmark[];
}

/**
 * Get bookmark counts by type
 */
export async function getBookmarkCounts(
  userId: string
): Promise<Record<string, number>> {
  const { data, error } = await bookmarksTable()
    .select('item_type')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching bookmark counts:', error);
    throw error;
  }

  const counts: Record<string, number> = { all: data?.length || 0 };

  (data as { item_type: string }[] || []).forEach((bookmark) => {
    const type = bookmark.item_type;
    counts[type] = (counts[type] || 0) + 1;
  });

  return counts;
}

/**
 * Check if an item is bookmarked
 */
export async function isBookmarked(
  userId: string,
  itemType: BookmarkItemType,
  itemId: string
): Promise<boolean> {
  const { data, error } = await bookmarksTable()
    .select('id')
    .eq('user_id', userId)
    .eq('item_type', itemType)
    .eq('item_id', itemId)
    .maybeSingle();

  if (error) {
    console.error('Error checking bookmark:', error);
    throw error;
  }

  return !!data;
}

/**
 * Add a new bookmark
 */
export async function addBookmark(
  userId: string,
  input: BookmarkInput
): Promise<Bookmark> {
  const { data, error } = await bookmarksTable()
    .insert({
      user_id: userId,
      item_type: input.item_type,
      item_id: input.item_id,
      title: input.title,
      description: input.description || null,
      thumbnail_url: input.thumbnail_url || null,
      source_url: input.source_url,
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding bookmark:', error);
    throw error;
  }

  return data as Bookmark;
}

/**
 * Remove a bookmark
 */
export async function removeBookmark(
  userId: string,
  itemType: BookmarkItemType,
  itemId: string
): Promise<void> {
  const { error } = await bookmarksTable()
    .delete()
    .eq('user_id', userId)
    .eq('item_type', itemType)
    .eq('item_id', itemId);

  if (error) {
    console.error('Error removing bookmark:', error);
    throw error;
  }
}

/**
 * Toggle bookmark state (add if not exists, remove if exists)
 * Returns true if added, false if removed
 */
export async function toggleBookmark(
  userId: string,
  input: BookmarkInput
): Promise<{ added: boolean; bookmark?: Bookmark }> {
  const exists = await isBookmarked(userId, input.item_type, input.item_id);

  if (exists) {
    await removeBookmark(userId, input.item_type, input.item_id);
    return { added: false };
  } else {
    const bookmark = await addBookmark(userId, input);
    return { added: true, bookmark };
  }
}

/**
 * Remove a bookmark by its ID
 */
export async function removeBookmarkById(
  userId: string,
  bookmarkId: string
): Promise<void> {
  const { error } = await bookmarksTable()
    .delete()
    .eq('user_id', userId)
    .eq('id', bookmarkId);

  if (error) {
    console.error('Error removing bookmark by ID:', error);
    throw error;
  }
}

/**
 * Search bookmarks by title or description
 */
export async function searchBookmarks(
  userId: string,
  query: string
): Promise<Bookmark[]> {
  const { data, error } = await bookmarksTable()
    .select('*')
    .eq('user_id', userId)
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching bookmarks:', error);
    throw error;
  }

  return (data || []) as Bookmark[];
}
