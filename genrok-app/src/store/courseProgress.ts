/**
 * Course Progress Store
 * Tracks user progress through courses
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CourseProgress {
  slug: string;
  progress: number; // 0-100
  completedModules: string[];
  totalModules: number;
  hoursSpent: number;
  lastAccessedAt: string;
  isCompleted: boolean;
}

interface CourseProgressState {
  courses: Record<string, CourseProgress>;

  // Actions
  updateProgress: (slug: string, progress: number) => void;
  completeModule: (slug: string, moduleId: string) => void;
  addHours: (slug: string, hours: number) => void;
  getProgress: (slug: string) => CourseProgress | null;
  getCompletedCoursesCount: () => number;
  getInProgressCoursesCount: () => number;
  getTotalHoursSpent: () => number;
  getWeeklyProgress: () => { day: string; hours: number }[];
}

// Helper to get current week's dates
function getWeekDates() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
}

export const useCourseProgressStore = create<CourseProgressState>()(
  persist(
    (set, get) => ({
      courses: {},

      updateProgress: (slug, progress) => {
        set((state) => {
          const existing = state.courses[slug] || {
            slug,
            progress: 0,
            completedModules: [],
            totalModules: 10,
            hoursSpent: 0,
            lastAccessedAt: new Date().toISOString(),
            isCompleted: false,
          };

          return {
            courses: {
              ...state.courses,
              [slug]: {
                ...existing,
                progress: Math.min(100, Math.max(0, progress)),
                isCompleted: progress >= 100,
                lastAccessedAt: new Date().toISOString(),
              },
            },
          };
        });
      },

      completeModule: (slug, moduleId) => {
        set((state) => {
          const existing = state.courses[slug];
          if (!existing) return state;

          const completedModules = existing.completedModules.includes(moduleId)
            ? existing.completedModules
            : [...existing.completedModules, moduleId];

          const progress = Math.round((completedModules.length / existing.totalModules) * 100);

          return {
            courses: {
              ...state.courses,
              [slug]: {
                ...existing,
                completedModules,
                progress,
                isCompleted: progress >= 100,
                lastAccessedAt: new Date().toISOString(),
              },
            },
          };
        });
      },

      addHours: (slug, hours) => {
        set((state) => {
          const existing = state.courses[slug] || {
            slug,
            progress: 0,
            completedModules: [],
            totalModules: 10,
            hoursSpent: 0,
            lastAccessedAt: new Date().toISOString(),
            isCompleted: false,
          };

          return {
            courses: {
              ...state.courses,
              [slug]: {
                ...existing,
                hoursSpent: existing.hoursSpent + hours,
                lastAccessedAt: new Date().toISOString(),
              },
            },
          };
        });
      },

      getProgress: (slug) => {
        return get().courses[slug] || null;
      },

      getCompletedCoursesCount: () => {
        return Object.values(get().courses).filter((c) => c.isCompleted).length;
      },

      getInProgressCoursesCount: () => {
        return Object.values(get().courses).filter((c) => c.progress > 0 && !c.isCompleted).length;
      },

      getTotalHoursSpent: () => {
        return Object.values(get().courses).reduce((total, c) => total + c.hoursSpent, 0);
      },

      getWeeklyProgress: () => {
        // Return mock data for now - would integrate with actual tracking
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const totalHours = get().getTotalHoursSpent();

        // Distribute hours across the week with some variation
        return days.map((day, i) => ({
          day,
          hours: Math.max(0, (totalHours / 7) * (0.5 + Math.random())),
        }));
      },
    }),
    {
      name: 'course-progress-storage',
    }
  )
);
