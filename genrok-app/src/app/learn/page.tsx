'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Clock,
  ChevronRight,
  Search,
  Sparkles,
  TrendingUp,
  Target,
  Zap,
  Users,
  BarChart3,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { processedArticles as articles, Article } from '@/data/articles';

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Articles', icon: BookOpen },
  { id: 'ltv', name: 'LTV & Growth', icon: TrendingUp },
  { id: 'conversion', name: 'Conversion', icon: Target },
  { id: 'marketing', name: 'Marketing', icon: Zap },
  { id: 'operations', name: 'Operations', icon: BarChart3 },
  { id: 'psychology', name: 'Psychology', icon: Users },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function LearnPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
      </div>
    );
  }

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter((a) => a.isFeatured);
  const regularArticles = filteredArticles.filter((a) => !a.isFeatured);

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Page Header */}
        <header className="page-header">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1>Learning Center</h1>
              <p>38+ in-depth articles on scaling strategies and proven systems</p>
            </div>

            {/* Search */}
            <div className="search-input w-full md:w-72">
              <Search className="search-input-icon" size={18} strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
                style={{ paddingLeft: '44px' }}
              />
            </div>
          </div>
        </header>

        {/* Categories Filter */}
        <div className="scrollbar-hide mb-8 flex items-center gap-2 overflow-x-auto pb-4">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[var(--primary)]'
                    : 'border border-[var(--border-light)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                }`}
                style={isActive ? { color: '#FFFFFF' } : undefined}
              >
                <category.icon
                  size={16}
                  strokeWidth={1.5}
                  style={isActive ? { color: '#FFFFFF' } : undefined}
                />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="section">
            <div className="section-header">
              <Sparkles size={20} className="section-icon" />
              <h2 className="section-title">Featured Articles</h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid-3"
            >
              {featuredArticles.map((article) => (
                <motion.div key={article.id} variants={itemVariants}>
                  <ArticleCard article={article} featured />
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* All Articles */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              {activeCategory === 'all'
                ? 'All Articles'
                : categories.find((c) => c.id === activeCategory)?.name}
              <span className="ml-2 font-normal text-[var(--text-muted)]">
                ({filteredArticles.length})
              </span>
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {filteredArticles.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid-3"
              >
                {regularArticles.map((article) => (
                  <motion.div key={article.id} variants={itemVariants}>
                    <ArticleCard article={article} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="empty-state"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--bg-secondary)]">
                  <Search size={24} className="text-[var(--text-tertiary)]" strokeWidth={1.5} />
                </div>
                <h3>No articles found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </DashboardLayout>
  );
}

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

function ArticleCard({ article, featured }: ArticleCardProps) {
  return (
    <Link
      href={`/learn/${article.slug}`}
      className={`card card-hover group block overflow-hidden ${featured ? 'border-[var(--border-strong)]' : ''}`}
      style={{ padding: 0 }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-secondary)]">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        {featured && <div className="badge badge-primary absolute left-4 top-4">Featured</div>}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/50 bg-white/90 px-3 py-1.5 backdrop-blur-md">
          <Clock size={14} className="text-[var(--text-muted)]" strokeWidth={1.5} />
          <span className="text-xs font-medium text-[var(--text-secondary)]">
            {article.readTime} min read
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="badge badge-gold capitalize">{article.category}</span>
        </div>

        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-[var(--text-primary)] transition-opacity group-hover:opacity-70">
          {article.title}
        </h3>

        <p className="mb-4 line-clamp-2 text-sm text-[var(--text-muted)]">{article.description}</p>

        {/* Stats if available */}
        {article.stats && article.stats.length > 0 && (
          <div className="mb-4 flex gap-4">
            {article.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-[var(--text-primary)]">{stat.value}</span>
                <span className="text-xs text-[var(--text-muted)]">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1 text-sm font-medium text-[var(--text-primary)] transition-all group-hover:gap-2">
          Read article
          <ChevronRight size={16} strokeWidth={1.5} />
        </div>
      </div>
    </Link>
  );
}
