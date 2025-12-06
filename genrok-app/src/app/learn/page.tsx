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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full" />
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all text-sm font-medium ${
                activeCategory === category.id
                  ? 'bg-[var(--accent-gold)] text-white'
                  : 'bg-white text-[var(--text-secondary)] border border-[var(--border-light)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              <category.icon size={16} strokeWidth={1.5} />
              <span>{category.name}</span>
            </button>
          ))}
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              {activeCategory === 'all' ? 'All Articles' : categories.find(c => c.id === activeCategory)?.name}
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
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-[var(--accent-gold-bg)]">
                  <Search size={24} className="text-[var(--accent-gold)]" strokeWidth={1.5} />
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
      className={`card card-hover group block overflow-hidden ${featured ? 'border-[var(--border-gold)]' : ''}`}
      style={{ padding: 0 }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {featured && (
          <div className="absolute top-4 left-4 badge badge-gold">
            Featured
          </div>
        )}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 backdrop-blur-sm rounded-full bg-white/90">
          <Clock size={14} className="text-[var(--text-muted)]" strokeWidth={1.5} />
          <span className="text-xs font-medium text-[var(--text-secondary)]">{article.readTime} min read</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="badge badge-gold capitalize">
            {article.category}
          </span>
        </div>

        <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--accent-gold)] transition-colors">
          {article.title}
        </h3>

        <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">
          {article.description}
        </p>

        {/* Stats if available */}
        {article.stats && article.stats.length > 0 && (
          <div className="flex gap-4 mb-4">
            {article.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-[var(--accent-gold)]">{stat.value}</span>
                <span className="text-xs text-[var(--text-muted)]">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1 font-medium text-sm text-[var(--accent-gold)] group-hover:gap-2 transition-all">
          Read article
          <ChevronRight size={16} strokeWidth={1.5} />
        </div>
      </div>
    </Link>
  );
}
