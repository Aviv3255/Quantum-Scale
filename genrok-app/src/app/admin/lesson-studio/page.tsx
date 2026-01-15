'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  Layout,
  BarChart3,
  GitCompare,
  ArrowRight,
  Eye,
  CheckCircle,
  Sparkles,
  Grid3X3,
  Type,
  ListOrdered,
  Quote,
  Bug,
} from 'lucide-react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getAllComponents, LESSON_COMPONENTS } from '@/components/lessons';
import { getAllLayouts, LAYOUT_TEMPLATES } from '@/components/lessons/layouts';

// Category icons and colors
const CATEGORY_CONFIG: Record<string, { icon: typeof Sparkles; color: string; label: string }> = {
  slides: { icon: Sparkles, color: '#88da1c', label: 'Fixed Slides' },
  content: { icon: Layout, color: '#3B82F6', label: 'Content' },
  chartsBasic: { icon: BarChart3, color: '#EF4444', label: 'Charts - Basic' },
  chartsStatistical: { icon: BarChart3, color: '#F97316', label: 'Charts - Statistical' },
  chartsTimeSeries: { icon: BarChart3, color: '#F59E0B', label: 'Charts - Time Series' },
  chartsHierarchical: { icon: BarChart3, color: '#84CC16', label: 'Charts - Hierarchical' },
  chartsNetwork: { icon: BarChart3, color: '#22C55E', label: 'Charts - Network' },
  chartsKPI: { icon: BarChart3, color: '#14B8A6', label: 'Charts - KPI' },
  chartsSpecialty: { icon: BarChart3, color: '#06B6D4', label: 'Charts - Specialty' },
  chartsBusiness: { icon: BarChart3, color: '#7C3AED', label: 'Charts - Business' },
  chartsAnalysis: { icon: BarChart3, color: '#DC2626', label: 'Charts - Analysis' },
  chartsAdvanced: { icon: BarChart3, color: '#0891B2', label: 'Charts - Advanced' },
  chartsTechnical: { icon: BarChart3, color: '#4F46E5', label: 'Charts - Technical' },
  chartsInteractive: { icon: BarChart3, color: '#10B981', label: 'Charts - Interactive' },
  chartsStrategic: { icon: BarChart3, color: '#F472B6', label: 'Charts - Strategic' },
  chartsModels: { icon: BarChart3, color: '#818CF8', label: 'Charts - Models' },
  data: { icon: BarChart3, color: '#8B5CF6', label: 'Data' },
  comparison: { icon: GitCompare, color: '#F59E0B', label: 'Comparison' },
  sequential: { icon: ListOrdered, color: '#EC4899', label: 'Sequential' },
  emphasis: { icon: Quote, color: '#06B6D4', label: 'Emphasis' },
};

export default function LessonStudioPage() {
  const [filter, setFilter] = useState<string>('all');
  const allComponents = getAllComponents();
  const allLayouts = getAllLayouts();

  const filteredComponents = filter === 'all'
    ? allComponents
    : Object.entries(LESSON_COMPONENTS)
        .filter(([key]) => key === filter)
        .flatMap(([, comps]) => comps);

  const stats = {
    total: allComponents.length,
    layouts: allLayouts.length,
    slides: LESSON_COMPONENTS.slides.length,
    content: LESSON_COMPONENTS.content.length,
    data: LESSON_COMPONENTS.data.length,
    comparison: LESSON_COMPONENTS.comparison.length,
  };

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#88da1c] to-[#6BB516] flex items-center justify-center">
              <Layers size={28} className="text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black">Lesson Design Studio</h1>
              <p className="text-[var(--text-muted)]">
                Premium component library for award-winning lesson design
              </p>
            </div>
          </div>
        </motion.header>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8"
        >
          {[
            { label: 'Components', value: stats.total, color: '#000' },
            { label: 'Layouts', value: stats.layouts, color: '#EC4899' },
            { label: 'Fixed Slides', value: stats.slides, color: '#88da1c' },
            { label: 'Content', value: stats.content, color: '#3B82F6' },
            { label: 'Data', value: stats.data, color: '#8B5CF6' },
            { label: 'Comparison', value: stats.comparison, color: '#F59E0B' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-xl p-5 border border-[#E5E5E5]"
            >
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-black text-white'
                : 'bg-white border border-[#E5E5E5] text-[var(--text-secondary)] hover:border-black'
            }`}
          >
            All Components
          </button>
          {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  filter === key
                    ? 'text-white'
                    : 'bg-white border border-[#E5E5E5] text-[var(--text-secondary)] hover:border-black'
                }`}
                style={{
                  backgroundColor: filter === key ? config.color : undefined,
                }}
              >
                <Icon size={16} />
                {config.label}
              </button>
            );
          })}
        </motion.div>

        {/* Components Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredComponents.map((component, index) => {
            const categoryKey = Object.entries(LESSON_COMPONENTS).find(
              ([, comps]) => comps.some(c => c.id === component.id)
            )?.[0] || 'slides';
            const config = CATEGORY_CONFIG[categoryKey] || { icon: BarChart3, color: '#666', label: categoryKey };

            return (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <Link
                  href={`/admin/lesson-studio/components?view=${component.id}`}
                  className="block bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden hover:shadow-lg hover:border-[#88da1c] transition-all group"
                >
                  {/* Preview Area */}
                  <div className="aspect-[16/10] bg-gradient-to-br from-[#F8F9FA] to-[#EFEFEF] flex items-center justify-center relative">
                    <div className="text-6xl font-bold text-black/10">
                      {component.name.charAt(0)}
                    </div>
                    {/* Category Badge */}
                    <div
                      className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: config.color }}
                    >
                      {config.label}
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg text-sm font-medium">
                          <Eye size={16} />
                          Preview
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-black mb-2 group-hover:text-[#88da1c] transition-colors">
                      {component.name}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">
                      {component.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--text-muted)]">
                        {component.category}
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-[var(--text-muted)] group-hover:text-[#88da1c] transition-colors"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 bg-black rounded-2xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex-1 mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Component Browser
                </h3>
                <p className="text-white/60">
                  View live interactive demos of every component in the library
                </p>
              </div>
              <Link
                href="/admin/lesson-studio/components"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#88da1c] text-black font-semibold hover:bg-[#7BC615] transition-colors"
              >
                <Eye size={18} />
                Open Components ({stats.total})
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="p-8 bg-gradient-to-br from-[#EC4899] to-[#DB2777] rounded-2xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex-1 mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Layout Templates
                </h3>
                <p className="text-white/80">
                  Pre-built slide layouts combining multiple components
                </p>
              </div>
              <Link
                href="/admin/lesson-studio/layouts"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors"
              >
                <Grid3X3 size={18} />
                Open Layouts ({stats.layouts})
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-8 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex-1 mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Bug Reports
                </h3>
                <p className="text-white/80">
                  Track and manage reported issues in components
                </p>
              </div>
              <Link
                href="/admin/lesson-studio/bugs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors"
              >
                <Bug size={18} />
                View Bug Reports
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
