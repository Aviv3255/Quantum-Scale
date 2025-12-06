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
  Sparkles,
  TrendingUp,
  Target,
  Zap,
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
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 105, 20, 0.08) 0%, rgba(139, 105, 20, 0.02) 50%, transparent 70%)',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(139, 105, 20, 0.08)', border: '1px solid rgba(139, 105, 20, 0.15)' }}
            >
              <BookOpen className="w-4 h-4" style={{ color: '#8b6914' }} strokeWidth={1.5} />
              <span className="text-sm font-medium" style={{ color: '#8b6914' }}>Learning Center</span>
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
            >
              Master <span style={{ color: '#8b6914' }}>eCommerce Growth</span>
            </h1>
            <p className="text-xl mb-8" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
              38+ in-depth articles on scaling strategies, conversion psychology,
              and proven systems used by 8-figure brands.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: 'rgba(44, 24, 16, 0.4)' }}
                strokeWidth={1.5}
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl transition-all outline-none"
                style={{
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  color: '#2c1810',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border = '1px solid #8b6914';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 105, 20, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Categories */}
      <section
        className="py-8 sticky top-16 z-40 backdrop-blur-xl"
        style={{ background: 'rgba(253, 246, 227, 0.95)', borderTop: '1px solid rgba(0, 0, 0, 0.06)', borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all"
                style={{
                  background: activeCategory === category.id ? '#8b6914' : 'white',
                  color: activeCategory === category.id ? 'white' : '#2c1810',
                  border: activeCategory === category.id ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
                  boxShadow: activeCategory === category.id ? '0 4px 12px rgba(139, 105, 20, 0.25)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== category.id) {
                    e.currentTarget.style.background = 'rgba(139, 105, 20, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== category.id) {
                    e.currentTarget.style.background = 'white';
                  }
                }}
              >
                <category.icon className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="flex items-center gap-2 mb-8">
              <Sparkles className="w-5 h-5" style={{ color: '#8b6914' }} strokeWidth={1.5} />
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
              >
                Featured Articles
              </h2>
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
      <section className="py-16" style={{ background: '#fdf6e3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex items-center justify-between mb-8">
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
            >
              {activeCategory === 'all' ? 'All Articles' : categories.find(c => c.id === activeCategory)?.name}
              <span className="ml-2 font-normal text-lg" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>
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
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(139, 105, 20, 0.1)' }}
                >
                  <Search className="w-8 h-8" style={{ color: '#8b6914' }} strokeWidth={1.5} />
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
                >
                  No articles found
                </h3>
                <p style={{ color: 'rgba(44, 24, 16, 0.5)' }}>Try adjusting your search or filter criteria</p>
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
      className="group block bg-white rounded-2xl overflow-hidden transition-all"
      style={{
        border: featured ? '1px solid rgba(139, 105, 20, 0.2)' : '1px solid rgba(0, 0, 0, 0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.08)';
        e.currentTarget.style.borderColor = 'rgba(139, 105, 20, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = featured ? 'rgba(139, 105, 20, 0.2)' : 'rgba(0, 0, 0, 0.06)';
      }}
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
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full"
            style={{ background: '#8b6914' }}
          >
            <span className="text-xs font-semibold text-white">Featured</span>
          </div>
        )}
        <div
          className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 backdrop-blur-sm rounded-full"
          style={{ background: 'rgba(255, 255, 255, 0.9)' }}
        >
          <Clock className="w-3.5 h-3.5" style={{ color: 'rgba(44, 24, 16, 0.5)' }} strokeWidth={1.5} />
          <span className="text-xs font-medium" style={{ color: '#2c1810' }}>{article.readTime} min read</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full capitalize"
            style={{ background: 'rgba(139, 105, 20, 0.1)', color: '#8b6914' }}
          >
            {article.category}
          </span>
        </div>

        <h3
          className="text-lg font-bold mb-2 transition-colors line-clamp-2"
          style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
        >
          {article.title}
        </h3>

        <p className="text-sm mb-4 line-clamp-2" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
          {article.description}
        </p>

        {/* Stats if available */}
        {article.stats && article.stats.length > 0 && (
          <div className="flex gap-4 mb-4">
            {article.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-sm font-bold" style={{ color: '#8b6914' }}>{stat.value}</span>
                <span className="text-xs" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1 font-medium text-sm" style={{ color: '#8b6914' }}>
          Read article
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
        </div>
      </div>
    </Link>
  );
}
