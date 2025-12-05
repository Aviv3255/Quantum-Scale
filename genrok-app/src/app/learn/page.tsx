'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Clock,
  ChevronRight,
  Search,
  Filter,
  Sparkles,
  TrendingUp,
  Zap,
  Target,
  Users,
  BarChart3,
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
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

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Learning Center</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Master <span className="gradient-text">eCommerce Growth</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              38+ in-depth articles on scaling strategies, conversion psychology,
              and proven systems used by 8-figure brands.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-y border-gray-100 bg-gray-50/50 sticky top-16 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="flex items-center gap-2 mb-8">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <h2 className="text-2xl font-bold">Featured Articles</h2>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <StaggerItem key={article.id}>
                  <ArticleCard article={article} featured />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {activeCategory === 'all' ? 'All Articles' : categories.find(c => c.id === activeCategory)?.name}
              <span className="ml-2 text-gray-400 font-normal text-lg">
                ({filteredArticles.length})
              </span>
            </h2>
          </FadeIn>

          <AnimatePresence mode="wait">
            {filteredArticles.length > 0 ? (
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularArticles.map((article) => (
                  <StaggerItem key={article.id}>
                    <ArticleCard article={article} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
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
      className={`group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all ${
        featured ? 'ring-2 ring-blue-100' : ''
      }`}
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
          <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 rounded-full">
            <span className="text-xs font-semibold text-yellow-900">Featured</span>
          </div>
        )}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
          <Clock className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-xs font-medium text-gray-700">{article.readTime} min read</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full capitalize">
            {article.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {article.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.description}</p>

        {/* Stats if available */}
        {article.stats && article.stats.length > 0 && (
          <div className="flex gap-4 mb-4">
            {article.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-blue-600">{stat.value}</span>
                <span className="text-xs text-gray-500">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1 text-blue-600 font-medium text-sm">
          Read article
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
