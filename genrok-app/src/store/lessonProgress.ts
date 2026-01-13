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

          return {
            progress: {
              ...state.progress,
              [slug]: {
                ...existing,
                currentSlide,
                totalSlides,
                completedSlides,
                lastAccessedAt: new Date().toISOString(),
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

          return {
            progress: {
              ...state.progress,
              [slug]: {
                ...existing,
                completedSlides,
                isCompleted,
              },
            },
          };
        });
      },

      markLessonComplete: (slug) => {
        set((state) => {
          const existing = state.progress[slug];
          if (!existing) return state;

          return {
            progress: {
              ...state.progress,
              [slug]: {
                ...existing,
                isCompleted: true,
                completedSlides: Array.from({ length: existing.totalSlides }, (_, i) => i),
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
    }),
    {
      name: 'lesson-progress-storage',
    }
  )
);
