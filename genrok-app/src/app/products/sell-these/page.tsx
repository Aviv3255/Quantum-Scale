'use client';

import { useState, useCallback } from 'react';
import { ExternalLink, Search, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { metaAdTemplates, MetaAdTemplate } from '@/data/meta-ad-templates';
import { BookmarkButton } from '@/components/BookmarkButton';

// Product Card with image error handling
function ProductCard({ template, index }: { template: MetaAdTemplate; index: number }) {
  const [imageError, setImageError] = useState(false);
  const [hoverImageError, setHoverImageError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleHoverImageError = useCallback(() => {
    setHoverImageError(true);
  }, []);

  // Generate a consistent color based on template ID
  const gradientColors = [
    ['#007DFF', '#0066CC'],
    ['#00C853', '#00A843'],
    ['#FF6D00', '#E66000'],
    ['#AA00FF', '#8E00DD'],
    ['#FF1744', '#E6143D'],
    ['#00BCD4', '#0097A7'],
    ['#FFD600', '#CCAB00'],
    ['#607D8B', '#546E7A'],
  ];
  const colorPair = gradientColors[template.id % gradientColors.length];

  const showPlaceholder = imageError || !template.coverImage;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
      className="group relative"
    >
      {/* Bookmark Button */}
      <div className="absolute top-2 right-2 z-20">
        <BookmarkButton
          itemType="product"
          itemId={String(template.id)}
          title={template.name}
          sourceUrl={template.canvaLink}
          description="Product Template - Click to edit in Canva"
          size="sm"
        />
      </div>

      {/* Card */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-[#f5f5f5] border border-[#e5e5e5] transition-all duration-300 group-hover:shadow-xl group-hover:border-[#007DFF]">
        {/* Cover Image or Placeholder */}
        {showPlaceholder ? (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${colorPair[0]}15 0%, ${colorPair[1]}25 100%)`,
            }}
          >
            <div className="text-center p-4">
              <div
                className="w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${colorPair[0]}20` }}
              >
                <ShoppingBag size={24} style={{ color: colorPair[0] }} />
              </div>
              <span className="text-sm font-medium text-[var(--text-secondary)] block mb-1">
                Product #{template.id}
              </span>
              <span className="text-xs text-[var(--text-muted)]">{template.name}</span>
            </div>
          </div>
        ) : (
          <>
            <img
              src={template.coverImage!}
              alt={template.name}
              onError={handleImageError}
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            />
            {/* Hover Image (Slide 2) */}
            {template.hoverImage && !hoverImageError && (
              <img
                src={template.hoverImage}
                alt={`${template.name} - Editable`}
                onError={handleHoverImageError}
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            )}
          </>
        )}

        {/* Hover Overlay with Button */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <a
            href={template.canvaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-all duration-200 transform scale-90 group-hover:scale-100"
            style={{
              background: '#007DFF',
              boxShadow: '0 4px 12px rgba(0, 125, 255, 0.4)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={16} />
            Edit on Canva
          </a>
        </div>
      </div>

      {/* Template Number Badge */}
      <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-black/60 text-white text-xs font-medium backdrop-blur-sm">
        #{template.id}
      </div>
    </motion.div>
  );
}

export default function SellTheseProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter templates based on search
  const filteredTemplates = metaAdTemplates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-content">
      <div className="page-wrapper">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header mb-8"
        >
          <h1>Meta Ad Templates</h1>
          <p className="mt-2 text-[var(--text-muted)]">
            {metaAdTemplates.length} ready-to-use ad templates. Click to edit in Canva.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-md">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#e5e5e5] bg-white text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#007DFF] focus:border-transparent transition-all"
            />
          </div>
        </motion.div>

        {/* Templates Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        >
          {filteredTemplates.map((template, index) => (
            <ProductCard key={template.id} template={template} index={index} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center">
              <Search size={32} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              No templates found
            </h3>
            <p className="text-[var(--text-muted)]">
              Try adjusting your search query
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
            Hover over a template to preview the editable version. Click "Edit on Canva" to customize.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
