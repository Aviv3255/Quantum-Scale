'use client';

import { useState, useMemo } from 'react';
import { ExternalLink, Search, TrendingUp, DollarSign, Star, ShoppingCart, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { products, allNiches, nicheLabels, type ProductNiche, type Product } from '@/data/products';

export default function SellTheseProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState<ProductNiche | 'all'>('all');
  const [showTrendingOnly, setShowTrendingOnly] = useState(false);

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesNiche = selectedNiche === 'all' || product.niche === selectedNiche;
      const matchesTrending = !showTrendingOnly || product.trending;
      return matchesSearch && matchesNiche && matchesTrending;
    });
  }, [searchQuery, selectedNiche, showTrendingOnly]);

  return (
    <div className="main-content">
      <div className="page-wrapper">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header mb-8"
        >
          <h1>Sell These Products</h1>
          <p className="mt-2 text-[var(--text-muted)]">
            {products.length} winning products ready to sell. High profit margins, proven sellers.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#e5e5e5] bg-white text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {/* Trending Toggle */}
            <button
              onClick={() => setShowTrendingOnly(!showTrendingOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                showTrendingOnly
                  ? 'bg-[var(--primary)] text-black'
                  : 'bg-white border border-[#e5e5e5] text-[var(--text-secondary)] hover:border-[var(--primary)]'
              }`}
            >
              <TrendingUp size={16} />
              Trending Only
            </button>

            {/* Niche Filter */}
            <button
              onClick={() => setSelectedNiche('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedNiche === 'all'
                  ? 'bg-black text-white'
                  : 'bg-white border border-[#e5e5e5] text-[var(--text-secondary)] hover:border-black'
              }`}
            >
              All Niches
            </button>
            {allNiches.map((niche) => (
              <button
                key={niche}
                onClick={() => setSelectedNiche(niche)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedNiche === niche
                    ? 'bg-black text-white'
                    : 'bg-white border border-[#e5e5e5] text-[var(--text-secondary)] hover:border-black'
                }`}
              >
                {nicheLabels[niche]}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-6 flex items-center justify-between"
        >
          <p className="text-sm text-[var(--text-muted)]">
            Showing {filteredProducts.length} products
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center">
              <Search size={32} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              No products found
            </h3>
            <p className="text-[var(--text-muted)]">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-[var(--text-muted)]">
            All profit margins are estimated. Actual profits may vary based on shipping and marketing costs.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Product Card Component
function ProductCard({ product, index }: { product: Product; index: number }) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
      className="group relative"
    >
      <div className="relative rounded-xl overflow-hidden bg-white border border-[#e5e5e5] transition-all duration-300 group-hover:shadow-xl group-hover:border-[var(--primary)]">
        {/* Image */}
        <div className="relative aspect-square bg-[#f5f5f5]">
          {!imageError ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f0f0f0] to-[#e5e5e5]">
              <ShoppingCart size={48} className="text-[var(--text-muted)]" />
            </div>
          )}

          {/* Trending Badge */}
          {product.trending && (
            <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-md bg-[var(--primary)] text-black text-xs font-semibold">
              <TrendingUp size={12} />
              Trending
            </div>
          )}

          {/* Niche Badge */}
          <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/60 text-white text-xs font-medium backdrop-blur-sm">
            {nicheLabels[product.niche]}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Name */}
          <h3 className="font-semibold text-[var(--text-primary)] text-sm line-clamp-2 mb-2 group-hover:text-black transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-3">
            {product.description}
          </p>

          {/* Price Info */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[var(--text-muted)]">Cost:</span>
              <span className="font-medium text-[var(--text-primary)]">${product.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[var(--text-muted)]">Sell for:</span>
              <span className="font-medium text-[var(--text-primary)]">${product.suggestedRetail.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm pt-1 border-t border-[#e5e5e5]">
              <span className="text-[var(--text-muted)] flex items-center gap-1">
                <DollarSign size={14} />
                Profit:
              </span>
              <span className="font-bold text-green-600">${product.profit.toFixed(2)}</span>
            </div>
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mt-3 text-xs text-[var(--text-muted)]">
              <Star size={12} className="text-yellow-500 fill-yellow-500" />
              <span>{product.rating}</span>
              {product.orders && (
                <span className="ml-2">({product.orders.toLocaleString()} orders)</span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
