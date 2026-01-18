'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  Search,
  Filter,
  BarChart3,
  Image as ImageIcon,
  CheckCircle,
  Clock,
  PlayCircle,
  RefreshCw,
  ChevronRight,
  Palette,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { lessonMeta, LessonMeta } from '@/data/lessons';

// Types for CRM state
interface LessonCRMData {
  status: 'pending' | 'in_progress' | 'complete';
  components: { componentId: string; slideIndex: number }[];
  images: { slideIndex: number; type: string; prompt: string; url?: string }[];
  colorMigrated: boolean;
}

interface CRMState {
  lessons: Record<string, LessonCRMData>;
  componentUsage: Record<string, number>;
}

// Status config
const STATUS_CONFIG = {
  pending: { icon: Clock, color: '#6B7280', label: 'Pending', bg: 'rgba(107, 114, 128, 0.1)' },
  in_progress: { icon: PlayCircle, color: '#F59E0B', label: 'In Progress', bg: 'rgba(245, 158, 11, 0.1)' },
  complete: { icon: CheckCircle, color: '#22C55E', label: 'Complete', bg: 'rgba(34, 197, 94, 0.1)' },
};

// Default CRM state
const getDefaultCRMState = (): CRMState => ({
  lessons: {},
  componentUsage: {},
});

// Load CRM state from localStorage
const loadCRMState = (): CRMState => {
  if (typeof window === 'undefined') return getDefaultCRMState();
  try {
    const saved = localStorage.getItem('lesson-crm-state');
    return saved ? JSON.parse(saved) : getDefaultCRMState();
  } catch {
    return getDefaultCRMState();
  }
};

// Save CRM state to localStorage
const saveCRMState = (state: CRMState) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('lesson-crm-state', JSON.stringify(state));
};

// Get lesson data with defaults
const getLessonData = (slug: string, state: CRMState): LessonCRMData => {
  return state.lessons[slug] || {
    status: 'pending',
    components: [],
    images: [],
    colorMigrated: false,
  };
};

export default function LessonCRMPage() {
  const [crmState, setCRMState] = useState<CRMState>(getDefaultCRMState());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in_progress' | 'complete'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state on mount
  useEffect(() => {
    setCRMState(loadCRMState());
    setIsLoaded(true);
  }, []);

  // Save state on change
  useEffect(() => {
    if (isLoaded) {
      saveCRMState(crmState);
    }
  }, [crmState, isLoaded]);

  // Get all lessons with metadata
  const allLessons = useMemo(() => {
    return Object.entries(lessonMeta).map(([slug, meta]) => ({
      slug,
      ...meta,
      crm: getLessonData(slug, crmState),
    }));
  }, [crmState]);

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return allLessons.filter(lesson => {
      // Search filter
      if (search && !lesson.title.toLowerCase().includes(search.toLowerCase()) &&
          !lesson.slug.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      // Status filter
      if (statusFilter !== 'all' && lesson.crm.status !== statusFilter) {
        return false;
      }
      // Category filter
      if (categoryFilter !== 'all' && !lesson.categories.includes(categoryFilter as any)) {
        return false;
      }
      return true;
    });
  }, [allLessons, search, statusFilter, categoryFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = allLessons.length;
    const complete = allLessons.filter(l => l.crm.status === 'complete').length;
    const inProgress = allLessons.filter(l => l.crm.status === 'in_progress').length;
    const pending = allLessons.filter(l => l.crm.status === 'pending').length;
    const colorMigrated = allLessons.filter(l => l.crm.colorMigrated).length;
    const withComponents = allLessons.filter(l => l.crm.components.length > 0).length;
    const withImages = allLessons.filter(l => l.crm.images.some(img => img.url)).length;

    // Calculate diversity score (unique components used / total components possible)
    const uniqueComponents = Object.keys(crmState.componentUsage).length;
    const diversityScore = Math.min(100, Math.round((uniqueComponents / 168) * 100));

    return { total, complete, inProgress, pending, colorMigrated, withComponents, withImages, diversityScore };
  }, [allLessons, crmState]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    allLessons.forEach(l => l.categories.forEach(c => cats.add(c)));
    return Array.from(cats);
  }, [allLessons]);

  // Sync all lessons (initialize tracking)
  const syncAllLessons = () => {
    const newState = { ...crmState };
    allLessons.forEach(lesson => {
      if (!newState.lessons[lesson.slug]) {
        newState.lessons[lesson.slug] = {
          status: 'pending',
          components: [],
          images: [],
          colorMigrated: false,
        };
      }
    });
    setCRMState(newState);
  };

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#88da1c] to-[#6BB516] flex items-center justify-center">
                <Layers size={28} className="text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-black">Lesson Redesign CRM</h1>
                <p className="text-[var(--text-muted)]">
                  Manage color palette, components, and images for all lessons
                </p>
              </div>
            </div>
            <button
              onClick={syncAllLessons}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-black/80 transition-colors"
            >
              <RefreshCw size={18} />
              Sync All
            </button>
          </div>
        </motion.header>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl p-6 border border-black/5 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-black">Overall Progress</span>
            <span className="text-sm text-[var(--text-muted)]">
              {stats.complete}/{stats.total} lessons complete ({Math.round((stats.complete / stats.total) * 100)}%)
            </span>
          </div>
          <div className="h-3 bg-black/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(stats.complete / stats.total) * 100}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-[#88da1c] to-[#6BB516] rounded-full"
            />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6"
        >
          {[
            { label: 'Total', value: stats.total, color: '#000', icon: Layers },
            { label: 'Complete', value: stats.complete, color: '#22C55E', icon: CheckCircle },
            { label: 'In Progress', value: stats.inProgress, color: '#F59E0B', icon: PlayCircle },
            { label: 'Pending', value: stats.pending, color: '#6B7280', icon: Clock },
            { label: 'Color Done', value: stats.colorMigrated, color: '#88da1c', icon: Palette },
            { label: 'With Components', value: stats.withComponents, color: '#3B82F6', icon: BarChart3 },
            { label: 'Diversity', value: `${stats.diversityScore}%`, color: '#EC4899', icon: RefreshCw },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-4 border border-black/5"
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon size={16} style={{ color: stat.color }} />
                <span className="text-xs text-[var(--text-muted)]">{stat.label}</span>
              </div>
              <span className="text-2xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-4 mb-6"
        >
          {/* Search */}
          <div className="flex-1 min-w-[200px] relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search lessons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/10 rounded-xl text-sm focus:outline-none focus:border-[#88da1c]"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-[var(--text-muted)]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2.5 bg-white border border-black/10 rounded-xl text-sm focus:outline-none focus:border-[#88da1c]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="complete">Complete</option>
            </select>
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2.5 bg-white border border-black/10 rounded-xl text-sm focus:outline-none focus:border-[#88da1c]"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </motion.div>

        {/* Lesson Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filteredLessons.map((lesson, i) => {
            const statusConfig = STATUS_CONFIG[lesson.crm.status];
            const StatusIcon = statusConfig.icon;

            return (
              <motion.div
                key={lesson.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.02 * i }}
              >
                <Link href={`/admin/lesson-crm/${lesson.slug}`}>
                  <div className="bg-white rounded-xl border border-black/5 p-4 hover:shadow-lg hover:border-[#88da1c]/30 transition-all cursor-pointer group">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-black text-sm truncate group-hover:text-[#88da1c] transition-colors">
                          {lesson.title}
                        </h3>
                        <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">
                          {lesson.slug}
                        </p>
                      </div>
                      <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:text-[#88da1c] transition-colors flex-shrink-0" />
                    </div>

                    {/* Color Migration Indicator */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-4 h-4 rounded-full border-2"
                          style={{
                            backgroundColor: lesson.crm.colorMigrated ? '#88da1c' : '#8b5cf6',
                            borderColor: lesson.crm.colorMigrated ? '#6BB516' : '#7c3aed',
                          }}
                        />
                        {lesson.crm.colorMigrated && (
                          <>
                            <ArrowRight size={12} className="text-[var(--text-muted)]" />
                            <div
                              className="w-4 h-4 rounded-full border-2"
                              style={{ backgroundColor: '#88da1c', borderColor: '#6BB516' }}
                            />
                          </>
                        )}
                      </div>
                      <span className="text-xs text-[var(--text-muted)]">
                        {lesson.crm.colorMigrated ? 'Color Updated' : 'Old Palette'}
                      </span>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1.5">
                        <BarChart3 size={14} className="text-[#3B82F6]" />
                        <span className="text-xs font-medium">{lesson.crm.components.length}/3</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ImageIcon size={14} className="text-[#EC4899]" />
                        <span className="text-xs font-medium">
                          {lesson.crm.images.filter(i => i.url).length}/2
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg w-fit"
                      style={{ backgroundColor: statusConfig.bg }}
                    >
                      <StatusIcon size={14} style={{ color: statusConfig.color }} />
                      <span className="text-xs font-medium" style={{ color: statusConfig.color }}>
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-black/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">No lessons found</h3>
            <p className="text-[var(--text-muted)]">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
