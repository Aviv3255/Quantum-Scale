/**
 * Lesson Progress Store
 * Tracks user progress through lessons (slides completed)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LessonProgress {
  slug: string;
  currentSlide: number;
  totalSlides: number;
  completedSlides: number[];
  isCompleted: boolean;
  lastAccessedAt: string;
  completedAt?: string; // Timestamp when lesson was marked as completed
}

interface LessonProgressState {
  progress: Record<string, LessonProgress>;

  // Actions
  updateProgress: (slug: string, currentSlide: number, totalSlides: number) => void;
  markSlideComplete: (slug: string, slideIndex: number) => void;
  markLessonComplete: (slug: string) => void;
  getProgress: (slug: string) => LessonProgress | null;
  getProgressPercentage: (slug: string) => number;
  isLessonCompleted: (slug: string) => boolean;
  getLessonsInProgress: () => LessonProgress[];
  getCompletedLessonsCount: () => number;
  getTotalSlidesCompleted: () => number;
  getLessonsCompletedByDay: (days: number) => { date: string; day: string; count: number; cumulative: number }[];
}

export const useLessonProgressStore = create<LessonProgressState>()(
  persist(
    (set, get) => ({
      progress: {},

      updateProgress: (slug, currentSlide, totalSlides) => {
        set((state) => {
          const existing = state.progress[slug] || {
            slug,
            currentSlide: 0,
            totalSlides,
            completedSlides: [],
            isCompleted: false,
            lastAccessedAt: new Date().toISOString(),
          };

          // Add current slide to completed if not already there
          const completedSlides = existing.completedSlides.includes(currentSlide)
            ? existing.completedSlides
            : [...existing.completedSlides, currentSlide];

          // Check if lesson is now complete (all slides visited)
          const isCompleted = completedSlides.length >= totalSlides;
          const wasAlreadyCompleted = existing.isCompleted;

          return {
            progress: {
              ...state.progress,
              [slug]: {
                ...existing,
                currentSlide,
                totalSlides,
                completedSlides,
                isCompleted,
                lastAccessedAt: new Date().toISOString(),
                // Set completedAt only when transitioning to completed state
                completedAt: isCompleted && !wasAlreadyCompleted
                  ? new Date().toISOString()
                  : existing.completedAt,
              },
            },
          };
        });
      },

      markSlideComplete: (slug, slideIndex) => {
        set((state) => {
          const existing = state.progress[slug];
          if (!existing) return state;

          const completedSlides = existing.completedSlides.includes(slideIndex)
            ? existing.completedSlides
            : [...existing.completedSlides, slideIndex];

          const isCompleted = completedSlides.length >= existing.totalSlides;
          const wasAlreadyCompleted = existing.isCompleted;

          return {
            progress: {
              ...state.progress,
              [slug]: {
                ...existing,
                completedSlides,
                isCompleted,
                // Set completedAt only when transitioning to completed state
                completedAt: isCompleted && !wasAlreadyCompleted
                  ? new Date().toISOString()
                  : existing.completedAt,
              },
            },
          };
        });
      },

      markLessonComplete: (slug) => {
        set((state) => {
          const existing = state.progress[slug];
          if (!existing) return state;

          const wasAlreadyCompleted = existing.isCompleted;

          return {
            progress: {
              ...state.progress,
              [slug]: {
                ...existing,
                isCompleted: true,
                completedSlides: Array.from({ length: existing.totalSlides }, (_, i) => i),
                // Set completedAt only if not already completed
                completedAt: wasAlreadyCompleted ? existing.completedAt : new Date().toISOString(),
              },
            },
          };
        });
      },

      getProgress: (slug) => {
        return get().progress[slug] || null;
      },

      getProgressPercentage: (slug) => {
        const progress = get().progress[slug];
        if (!progress || progress.totalSlides === 0) return 0;
        return Math.round((progress.completedSlides.length / progress.totalSlides) * 100);
      },

      isLessonCompleted: (slug) => {
        return get().progress[slug]?.isCompleted || false;
      },

      getLessonsInProgress: () => {
        const { progress } = get();
        return Object.values(progress)
          .filter((p) => p.completedSlides.length > 0 && !p.isCompleted)
          .sort((a, b) => new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime());
      },

      getCompletedLessonsCount: () => {
        const { progress } = get();
        return Object.values(progress).filter((p) => p.isCompleted).length;
      },

      getTotalSlidesCompleted: () => {
        const { progress } = get();
        return Object.values(progress).reduce((total, p) => total + p.completedSlides.length, 0);
      },

      getLessonsCompletedByDay: (days: number) => {
        const { progress } = get();
        const completedLessons = Object.values(progress).filter((p) => p.isCompleted && p.completedAt);

        // Generate array of past N days
        const result: { date: string; day: string; count: number; cumulative: number }[] = [];
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        // Count completions per day
        const completionsByDate: Record<string, number> = {};
        completedLessons.forEach((lesson) => {
          if (lesson.completedAt) {
            const dateKey = lesson.completedAt.split('T')[0]; // YYYY-MM-DD
            completionsByDate[dateKey] = (completionsByDate[dateKey] || 0) + 1;
          }
        });

        // Build result for past N days
        let cumulative = 0;

        // First, count all completions BEFORE the window (for cumulative baseline)
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - (days - 1));
        startDate.setHours(0, 0, 0, 0);

        completedLessons.forEach((lesson) => {
          if (lesson.completedAt) {
            const completedDate = new Date(lesson.completedAt);
            if (completedDate < startDate) {
              cumulative++;
            }
          }
        });

        // Now build daily data
        for (let i = days - 1; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateKey = date.toISOString().split('T')[0];
          const dayName = dayNames[date.getDay()];
          const count = completionsByDate[dateKey] || 0;
          cumulative += count;

          result.push({
            date: dateKey,
            day: dayName,
            count,
            cumulative,
          });
        }

        return result;
      },
    }),
    {
      name: 'lesson-progress-storage',
    }
  )
);
