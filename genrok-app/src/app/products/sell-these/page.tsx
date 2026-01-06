'use client';

import { useState } from 'react';
import { ExternalLink, Search, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { metaAdTemplates } from '@/data/meta-ad-templates';

export default function MetaAdTemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // Filter templates based on search
  const filteredTemplates = metaAdTemplates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

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
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02, duration: 0.3 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-[#f5f5f5] border border-[#e5e5e5] transition-all duration-300 group-hover:shadow-xl group-hover:border-[#007DFF]">
                {/* Cover Image (Slide 1) */}
                {template.coverImage ? (
                  <>
                    <img
                      src={template.coverImage}
                      alt={template.name}
                      className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                      onLoad={() => handleImageLoad(template.id)}
                    />
                    {/* Hover Image (Slide 2) */}
                    {template.hoverImage && (
                      <img
                        src={template.hoverImage}
                        alt={`${template.name} - Editable`}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    )}
                  </>
                ) : (
                  /* Placeholder with Canva embed preview */
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f0f0f0] to-[#e5e5e5]">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-[#007DFF]/10 flex items-center justify-center">
                        <ExternalLink size={24} className="text-[#007DFF]" />
                      </div>
                      <span className="text-xs text-[var(--text-muted)]">
                        {template.name}
                      </span>
                    </div>
                  </div>
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
