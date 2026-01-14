'use client';

import { useState, useMemo } from 'react';
import { ExternalLink, Search, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  aliexpressProducts,
  PRODUCT_CATEGORIES,
  type AffiliateProduct,
} from '@/data/aliexpress-products';

// Partner links
const MATE_LINK = 'https://erp.matedropshipping.com/login?invite_id=915';
const HYPERSKU_LINK = 'https://www.hypersku.com/campaign/optimize-dropshipping/?ref=nmmwogq';

export default function SellTheseProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return aliexpressProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: aliexpressProducts.length };
    aliexpressProducts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

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
            {aliexpressProducts.length.toLocaleString()} winning products ready to sell. Click any
            product to get the affiliate link.
          </p>
        </motion.div>

        {/* Partner Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-6 flex flex-wrap gap-3"
        >
          <a
            href={MATE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            <ExternalLink size={14} />
            Sign up for Mate
          </a>
          <a
            href={HYPERSKU_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-medium hover:from-purple-700 hover:to-purple-800 transition-all"
          >
            <ExternalLink size={14} />
            Sign up for HyperSKU
          </a>
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

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-black text-white'
                    : 'bg-white border border-[#e5e5e5] text-[var(--text-secondary)] hover:border-black'
                }`}
              >
                {cat.label}
                {categoryCounts[cat.id] > 0 && (
                  <span className="ml-1.5 text-xs opacity-70">({categoryCounts[cat.id]})</span>
                )}
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
            Showing {filteredProducts.length.toLocaleString()} products
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
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
            <p className="text-[var(--text-muted)]">Try adjusting your search or filters</p>
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
            Click on any product to open the AliExpress affiliate link. Sign up with our partners
            above to fulfill orders.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Product Card Component
function ProductCard({ product, index }: { product: AffiliateProduct; index: number }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Get partner badge color
  const partnerBadge = {
    mate: { bg: 'bg-blue-500', text: 'Mate' },
    hypersku: { bg: 'bg-purple-500', text: 'HyperSKU' },
    aliexpress: { bg: 'bg-orange-500', text: 'AliExpress' },
  };

  const badge = partnerBadge[product.partner] || partnerBadge.aliexpress;

  return (
    <motion.a
      href={product.affiliate_link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: Math.min(index * 0.01, 0.5), duration: 0.2 }}
      className="group block"
    >
      <div className="relative rounded-xl overflow-hidden bg-white border border-[#e5e5e5] transition-all duration-300 group-hover:shadow-xl group-hover:border-black group-hover:scale-105">
        {/* Image */}
        <div className="relative aspect-square bg-[#f5f5f5]">
          {!imageError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#f0f0f0] to-[#e5e5e5]" />
              )}
              <img
                src={product.image_url}
                alt={product.name}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                loading="lazy"
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f0f0f0] to-[#e5e5e5]">
              <ShoppingCart size={32} className="text-[var(--text-muted)]" />
            </div>
          )}

          {/* Partner Badge */}
          <div
            className={`absolute top-2 right-2 px-2 py-0.5 rounded-md ${badge.bg} text-white text-[10px] font-semibold`}
          >
            {badge.text}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-2 shadow-lg">
              <ExternalLink size={20} className="text-black" />
            </div>
          </div>
        </div>

        {/* Product Name */}
        <div className="p-3">
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 font-medium">
            {product.name}
          </p>
        </div>
      </div>
    </motion.a>
  );
}
