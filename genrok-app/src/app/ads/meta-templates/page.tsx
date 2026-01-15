'use client';

import { useState, memo } from 'react';
import { ExternalLink, Search, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { metaAdTemplates, MetaAdTemplate } from '@/data/meta-ad-templates';

// Alternate layout card for first 12 templates - buttons below image
const TemplateCardAlt = memo(function TemplateCardAlt({ template }: { template: MetaAdTemplate }) {
  const [showEditable, setShowEditable] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowEditable(!showEditable);
  };

  return (
    <div className="flex flex-col py-2">
      {/* Image container - less rounded, no border on bottom */}
      <a
        href={template.canvaLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-square rounded-t overflow-hidden bg-[#f5f5f5] transition-shadow duration-200 hover:shadow-sm"
        style={{ borderTop: '1px solid #ddd', borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd' }}
      >
        {/* Cover Image - lazy loaded */}
        {template.coverImage ? (
          <Image
            src={template.coverImage}
            alt={template.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-opacity duration-200 ${showEditable && template.hoverImage ? 'opacity-0' : 'opacity-100'}`}
            loading="lazy"
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

        {/* Editable Image - only load when toggled */}
        {template.hoverImage && showEditable && (
          <Image
            src={template.hoverImage}
            alt={`${template.name} - Editable`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
            loading="lazy"
          />
        )}
      </a>

      {/* Button container below image - white with lighter border, responsive */}
      <div
        className="flex items-center justify-between gap-1 px-2 py-2 bg-white rounded-b"
        style={{ border: '1px solid #ddd' }}
      >
        {/* Toggle button - only if has editable version */}
        {template.hoverImage ? (
          <button
            onClick={handleToggle}
            className="flex items-center gap-1 px-2 py-1.5 rounded font-semibold border whitespace-nowrap text-xs"
            style={{ color: '#7435E6', borderColor: '#7435E6' }}
          >
            <RefreshCw size={12} className="flex-shrink-0" color="#7435E6" />
            {showEditable ? 'Original' : 'Editable'}
          </button>
        ) : (
          <div></div>
        )}

        {/* Edit in Canva button */}
        <a
          href={template.canvaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2 py-1.5 rounded font-semibold whitespace-nowrap text-xs"
          style={{ backgroundColor: '#7435E6', color: '#FFFFFF' }}
        >
          <ExternalLink size={12} className="flex-shrink-0" color="#FFFFFF" />
          Canva
        </a>
      </div>
    </div>
  );
});

// Original template card - prevents re-renders
const TemplateCard = memo(function TemplateCard({ template }: { template: MetaAdTemplate }) {
  const [showEditable, setShowEditable] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowEditable(!showEditable);
  };

  return (
    <div className="relative">
      <a
        href={template.canvaLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-square rounded-xl overflow-hidden bg-[#f5f5f5] border border-[#e5e5e5] transition-shadow duration-200 hover:shadow-xl hover:border-[#7435E6]"
      >
        {/* Cover Image - lazy loaded */}
        {template.coverImage ? (
          <Image
            src={template.coverImage}
            alt={template.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-opacity duration-200 ${showEditable && template.hoverImage ? 'opacity-0' : 'opacity-100'}`}
            loading="lazy"
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

        {/* Editable Image - only load when toggled */}
        {template.hoverImage && showEditable && (
          <Image
            src={template.hoverImage}
            alt={`${template.name} - Editable`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
            loading="lazy"
          />
        )}

        {/* Edit in Canva button */}
        <div
          className="absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold z-20"
          style={{ backgroundColor: '#7435E6', color: '#FFFFFF' }}
        >
          <ExternalLink size={16} color="#FFFFFF" />
          Edit in Canva
        </div>
      </a>

      {/* Toggle button - only if has editable version */}
      {template.hoverImage && (
        <button
          onClick={handleToggle}
          className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold z-30 border-2 bg-white/90 backdrop-blur-sm"
          style={{ color: '#7435E6', borderColor: '#7435E6' }}
        >
          <RefreshCw size={14} color="#7435E6" />
          {showEditable ? 'See original' : 'See editable'}
        </button>
      )}
    </div>
  );
});

// Category tabs configuration
const categories = [
  { id: 'all', label: 'All', filter: () => true },
  { id: 'bfcm', label: 'BFCM/Sales', filter: (t: MetaAdTemplate) => t.category === 'bfcm' },
  { id: 'digital', label: 'Digital Products/Service/SaaS', filter: (t: MetaAdTemplate) => t.category === 'digital' },
];

export default function MetaTemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter templates based on category and search
  const filteredTemplates = metaAdTemplates
    .filter(categories.find(c => c.id === activeCategory)?.filter || (() => true))
    .filter((template) =>
      searchQuery
        ? template.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  return (
    <DashboardLayout>
      <div className="min-h-screen" style={{ background: '#FFFFFF', margin: '-40px -48px', padding: '48px' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-3">
              Meta Ad Templates
            </h1>
            <p className="text-[var(--text-muted)] text-lg">
              {metaAdTemplates.length} ready-to-use templates. Click to edit in Canva.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-[#f5f5f5] rounded-xl p-1 gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-white text-[#7435E6] shadow-sm'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {cat.label}
                  <span className="ml-2 text-xs opacity-60">
                    ({cat.id === 'all'
                      ? metaAdTemplates.length
                      : metaAdTemplates.filter(cat.filter).length})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8 flex justify-center">
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
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#e5e5e5] bg-white text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#7435E6] focus:border-transparent"
              />
            </div>
          </div>

          {/* Results count */}
          <p className="text-center text-sm text-[var(--text-muted)] mb-6">
            Showing {filteredTemplates.length} templates
          </p>

          {/* Templates Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTemplates.map((template) => (
              <TemplateCardAlt key={template.id} template={template} />
            ))}
          </div>

          {/* Empty State */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center">
                <Search size={32} className="text-[var(--text-muted)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                No templates found
              </h3>
              <p className="text-[var(--text-muted)]">
                Try adjusting your search query
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
