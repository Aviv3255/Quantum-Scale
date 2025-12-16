'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { getDefaultChecklist, ChecklistItem } from '@/data/course-checklists';

const STORAGE_PREFIX = 'course_checklist_progress_';

// Create an untyped supabase client for tables that may not exist in the database yet
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseUntyped = createClient(supabaseUrl, supabaseAnonKey);

interface UseChecklistReturn {
  items: ChecklistItem[];
  completedItems: string[];
  isLoading: boolean;
  progress: number;
  toggleItem: (itemId: string) => void;
  isItemCompleted: (itemId: string) => boolean;
  resetProgress: () => void;
}

export function useChecklist(courseSlug: string, userId?: string): UseChecklistReturn {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate progress percentage
  const progress = items.length > 0 ? Math.round((completedItems.length / items.length) * 100) : 0;

  // Load checklist items (from Supabase or defaults)
  useEffect(() => {
    async function loadChecklist() {
      setIsLoading(true);

      try {
        // Try to load custom checklist from Supabase
        const { data: customChecklist, error } = await supabaseUntyped
          .from('course_checklists')
          .select('items')
          .eq('course_slug', courseSlug)
          .single();

        if (!error && customChecklist?.items) {
          // Use custom checklist from admin
          setItems(customChecklist.items as ChecklistItem[]);
        } else {
          // Use default checklist
          setItems(getDefaultChecklist(courseSlug));
        }
      } catch {
        // Table doesn't exist yet, use defaults
        setItems(getDefaultChecklist(courseSlug));
      }

      setIsLoading(false);
    }

    loadChecklist();
  }, [courseSlug]);

  // Load user progress (localStorage first, then sync with Supabase)
  useEffect(() => {
    async function loadProgress() {
      const storageKey = `${STORAGE_PREFIX}${courseSlug}`;

      // First, load from localStorage for immediate feedback
      const localProgress = localStorage.getItem(storageKey);
      if (localProgress) {
        try {
          setCompletedItems(JSON.parse(localProgress));
        } catch {
          // Invalid JSON, ignore
        }
      }

      // If user is logged in, try to sync with Supabase
      if (userId) {
        try {
          const { data: cloudProgress } = await supabaseUntyped
            .from('user_checklist_progress')
            .select('completed_items')
            .eq('user_id', userId)
            .eq('course_slug', courseSlug)
            .single();

          if (cloudProgress?.completed_items) {
            const cloudItems = cloudProgress.completed_items as string[];

            // Merge local and cloud progress (union of both)
            const localItems = localProgress ? JSON.parse(localProgress) : [];
            const mergedItems = [...new Set([...localItems, ...cloudItems])];

            setCompletedItems(mergedItems);
            localStorage.setItem(storageKey, JSON.stringify(mergedItems));

            // Update Supabase with merged data if different
            if (mergedItems.length !== cloudItems.length) {
              await supabaseUntyped.from('user_checklist_progress').upsert({
                user_id: userId,
                course_slug: courseSlug,
                completed_items: mergedItems,
                updated_at: new Date().toISOString(),
              });
            }
          } else if (localProgress) {
            // No cloud data, but we have local - push to cloud
            await supabaseUntyped.from('user_checklist_progress').upsert({
              user_id: userId,
              course_slug: courseSlug,
              completed_items: JSON.parse(localProgress),
              updated_at: new Date().toISOString(),
            });
          }
        } catch {
          // Table doesn't exist yet, that's ok - use localStorage only
        }
      }
    }

    loadProgress();
  }, [courseSlug, userId]);

  // Toggle item completion
  const toggleItem = useCallback(
    (itemId: string) => {
      const storageKey = `${STORAGE_PREFIX}${courseSlug}`;

      setCompletedItems((prev) => {
        const isCompleted = prev.includes(itemId);
        const newCompleted = isCompleted ? prev.filter((id) => id !== itemId) : [...prev, itemId];

        // Save to localStorage immediately
        localStorage.setItem(storageKey, JSON.stringify(newCompleted));

        // Sync to Supabase if user is logged in (fire and forget)
        if (userId) {
          (async () => {
            try {
              await supabaseUntyped.from('user_checklist_progress').upsert({
                user_id: userId,
                course_slug: courseSlug,
                completed_items: newCompleted,
                updated_at: new Date().toISOString(),
              });
            } catch {
              // Error - data is still in localStorage
            }
          })();
        }

        return newCompleted;
      });
    },
    [courseSlug, userId]
  );

  // Check if item is completed
  const isItemCompleted = useCallback(
    (itemId: string) => {
      return completedItems.includes(itemId);
    },
    [completedItems]
  );

  // Reset all progress
  const resetProgress = useCallback(async () => {
    const storageKey = `${STORAGE_PREFIX}${courseSlug}`;

    setCompletedItems([]);
    localStorage.removeItem(storageKey);

    if (userId) {
      try {
        await supabaseUntyped
          .from('user_checklist_progress')
          .delete()
          .eq('user_id', userId)
          .eq('course_slug', courseSlug);
      } catch {
        // Table doesn't exist, that's ok
      }
    }
  }, [courseSlug, userId]);

  return {
    items,
    completedItems,
    isLoading,
    progress,
    toggleItem,
    isItemCompleted,
    resetProgress,
  };
}

// Admin hook for managing checklist definitions
interface UseChecklistAdminReturn {
  items: ChecklistItem[];
  isLoading: boolean;
  isSaving: boolean;
  updateItems: (newItems: ChecklistItem[]) => Promise<void>;
  addItem: (item: Omit<ChecklistItem, 'id'>) => void;
  removeItem: (itemId: string) => void;
  moveItem: (fromIndex: number, toIndex: number) => void;
  updateItem: (itemId: string, updates: Partial<ChecklistItem>) => void;
  saveChanges: () => Promise<void>;
  resetToDefaults: () => void;
}

export function useChecklistAdmin(courseSlug: string): UseChecklistAdminReturn {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load checklist items
  useEffect(() => {
    async function loadChecklist() {
      setIsLoading(true);

      try {
        // Try to load custom checklist from Supabase
        const { data: customChecklist, error } = await supabaseUntyped
          .from('course_checklists')
          .select('items')
          .eq('course_slug', courseSlug)
          .single();

        if (!error && customChecklist?.items) {
          setItems(customChecklist.items as ChecklistItem[]);
        } else {
          // Use default checklist
          setItems(getDefaultChecklist(courseSlug));
        }
      } catch {
        // Table doesn't exist yet, use defaults
        setItems(getDefaultChecklist(courseSlug));
      }

      setIsLoading(false);
    }

    loadChecklist();
  }, [courseSlug]);

  // Update all items
  const updateItems = useCallback(async (newItems: ChecklistItem[]) => {
    setItems(newItems);
  }, []);

  // Add a new item
  const addItem = useCallback(
    (item: Omit<ChecklistItem, 'id'>) => {
      const newId = `${courseSlug}-item-${Date.now()}`;
      setItems((prev) => [...prev, { ...item, id: newId }]);
    },
    [courseSlug]
  );

  // Remove an item
  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  // Move an item (for reordering)
  const moveItem = useCallback((fromIndex: number, toIndex: number) => {
    setItems((prev) => {
      const newItems = [...prev];
      const [removed] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, removed);
      return newItems;
    });
  }, []);

  // Update a single item
  const updateItem = useCallback((itemId: string, updates: Partial<ChecklistItem>) => {
    setItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, ...updates } : item)));
  }, []);

  // Save changes to Supabase
  const saveChanges = useCallback(async () => {
    setIsSaving(true);

    try {
      await supabaseUntyped.from('course_checklists').upsert({
        course_slug: courseSlug,
        items: items,
        updated_at: new Date().toISOString(),
      });
    } catch {
      // Table might not exist yet
      throw new Error('Failed to save checklist. Please ensure the database table exists.');
    } finally {
      setIsSaving(false);
    }
  }, [courseSlug, items]);

  // Reset to default checklist
  const resetToDefaults = useCallback(() => {
    setItems(getDefaultChecklist(courseSlug));
  }, [courseSlug]);

  return {
    items,
    isLoading,
    isSaving,
    updateItems,
    addItem,
    removeItem,
    moveItem,
    updateItem,
    saveChanges,
    resetToDefaults,
  };
}
