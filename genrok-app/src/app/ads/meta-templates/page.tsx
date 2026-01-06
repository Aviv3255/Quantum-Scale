'use client';

import { useState } from 'react';
import { ExternalLink, Search, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { metaAdTemplates, MetaAdTemplate } from '@/data/meta-ad-templates';

// Template card with toggle button (for first 12)
function TemplateCardWithToggle({ template }: { template: MetaAdTemplate }) {
  const [showEditable, setShowEditable] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowEditable(!showEditable);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <a
        href={template.canvaLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-square rounded-xl overflow-hidden bg-[#f5f5f5] border border-[#e5e5e5] transition-all duration-300 hover:shadow-xl hover:border-[#7435E6]"
      >
        {/* Cover Image */}
        {template.coverImage ? (
          <img
            src={template.coverImage}
            alt={template.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${showEditable && template.hoverImage ? 'opacity-0' : 'opacity-100'}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f0f0f0] to-[#e5e5e5]">
            <div className="text-center p-4">
              <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-[#7435E6]/10 flex items-center justify-center">
                <ExternalLink size={20} className="text-[#7435E6]" />
              </div>
              <span className="text-xs text-[var(--text-muted)]">
                {template.name}
              </span>
            </div>
          </div>
        )}

        {/* Editable Image (slide 2) */}
        {template.hoverImage && (
          <img
            src={template.hoverImage}
            alt={`${template.name} - Editable`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${showEditable ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        {/* Edit in Canva button - bottom right */}
        <div
          className="absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold z-20"
          style={{ backgroundColor: '#7435E6', color: '#FFFFFF' }}
        >
          <ExternalLink size={16} color="#FFFFFF" />
          Edit in Canva
        </div>
      </a>

      {/* Toggle button - bottom left, OUTSIDE the link (only if has editable version) */}
      {template.hoverImage && (
        <button
          onClick={handleToggle}
          className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 z-30 border-2 bg-white/90 backdrop-blur-sm"
          style={{ color: '#7435E6', borderColor: '#7435E6' }}
        >
          <RefreshCw size={14} color="#7435E6" />
          {showEditable ? 'See original' : 'See editable'}
        </button>
      )}
    </motion.div>
  );
}

// Original template card (keeps hover behavior)
function TemplateCard({ template }: { template: MetaAdTemplate }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <a
        href={template.canvaLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-square rounded-xl overflow-hidden bg-[#f5f5f5] border border-[#e5e5e5] transition-all duration-300 hover:shadow-xl hover:border-[#7435E6]"
      >
        {/* Cover Image (default) */}
        {template.coverImage ? (
          <img
            src={template.coverImage}
            alt={template.name}
            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f0f0f0] to-[#e5e5e5]">
            <div className="text-center p-4">
              <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-[#7435E6]/10 flex items-center justify-center">
                <ExternalLink size={20} className="text-[#7435E6]" />
              </div>
              <span className="text-xs text-[var(--text-muted)]">
                {template.name}
              </span>
            </div>
          </div>
        )}

        {/* Hover Image (editable version - slide 2) */}
        {template.hoverImage && (
          <img
            src={template.hoverImage}
            alt={`${template.name} - Editable`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        {/* Always visible button - bottom right */}
        <div
          className="absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-transform duration-200 group-hover:scale-105 z-20"
          style={{ backgroundColor: '#7435E6', color: '#FFFFFF' }}
        >
          <ExternalLink size={16} color="#FFFFFF" />
          Edit in Canva
        </div>
      </a>
    </motion.div>
  );
}

export default function MetaTemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter templates based on search
  const filteredTemplates = metaAdTemplates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen" style={{ background: '#FFFFFF', margin: '-40px -48px', padding: '48px' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-3">
              Meta Ad Templates
            </h1>
            <p className="text-[var(--text-muted)] text-lg">
              {metaAdTemplates.length} ready-to-use templates. Click to edit in Canva.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#e5e5e5] bg-white text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#7435E6] focus:border-transparent transition-all"
              />
            </div>
          </motion.div>

          {/* Templates Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredTemplates.map((template, index) => (
              // Use toggle version for first 12, hover version for rest
              index < 12 ? (
                <TemplateCardWithToggle key={template.id} template={template} />
              ) : (
                <TemplateCard key={template.id} template={template} />
              )
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
        </div>
      </div>
    </DashboardLayout>
  );
}
