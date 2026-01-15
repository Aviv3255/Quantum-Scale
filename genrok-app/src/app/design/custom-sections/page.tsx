'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { X, Copy, Check, Search, LayoutTemplate } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { sectionsData, categories } from './sections-data';
import { Section, CustomizableField } from './types';

// Grid card preview component - renders scaled HTML in iframe
// isAnnouncement prop triggers larger scale for thin announcement bars
function GridPreview({ html, isAnnouncement = false }: { html: string; isAnnouncement?: boolean }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Announcement bars need larger scale since they're thin strips
  const scale = isAnnouncement ? 0.4 : 0.35;
  const containerHeight = isAnnouncement ? 100 : 220;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=1200">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body {
            width: 1200px;
            background: #fff;
            overflow: hidden;
          }
        </style>
      </head>
      <body>${html}</body>
      </html>
    `);
    doc.close();
    setIsLoaded(true);
  }, [html]);

  // Calculate centering offset
  const scaledWidth = 1200 * scale;

  return (
    <div
      style={{
        width: '100%',
        height: `${containerHeight}px`,
        overflow: 'hidden',
        position: 'relative',
        background: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{
        width: `${scaledWidth}px`,
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <iframe
          ref={iframeRef}
          style={{
            width: '1200px',
            height: '800px',
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            border: 'none',
            pointerEvents: 'none',
            position: 'absolute',
            top: isAnnouncement ? 0 : 0,
            left: 0,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.2s'
          }}
          title="Section Preview"
        />
      </div>
    </div>
  );
}

// Modal preview component - renders at fixed desktop width (1200px) and scales to fit
function ModalPreview({ html }: { html: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=1200">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body {
            width: 1200px;
            background: #fff;
            min-height: 100%;
          }
        </style>
      </head>
      <body>${html}</body>
      </html>
    `);
    doc.close();
  }, [html]);

  // Calculate scale based on container width
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const containerWidth = container.offsetWidth;
      const newScale = Math.min(containerWidth / 1200, 1);
      setScale(newScale);
    };

    updateScale();
    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        background: '#fff',
        borderRadius: '8px',
        position: 'relative'
      }}
    >
      <div style={{
        width: `${1200 * scale}px`,
        height: `${800 * scale}px`,
        position: 'relative',
        margin: '0 auto'
      }}>
        <iframe
          ref={iframeRef}
          style={{
            width: '1200px',
            height: '800px',
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            border: 'none',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0
          }}
          title="Section Preview"
        />
      </div>
    </div>
  );
}

export default function CustomSectionsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Auth bypass for local development - TODO: remove before production
  const isDev = process.env.NODE_ENV === 'development';
  useEffect(() => {
    if (!isDev && !isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router, isDev]);

  // Initialize field values when section is selected
  useEffect(() => {
    if (selectedSection) {
      const defaults: Record<string, string> = {};
      selectedSection.fields.forEach(field => {
        defaults[field.id] = field.defaultValue;
      });
      setFieldValues(defaults);
    }
  }, [selectedSection]);

  const filteredSections = useMemo(() => {
    return sectionsData.filter(section => {
      const matchesSearch = section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           section.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || section.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleFieldChange = useCallback((fieldId: string, value: string) => {
    setFieldValues(prev => ({ ...prev, [fieldId]: value }));
  }, []);

  // Generate HTML based on current field values - updates preview and code
  const generatedHtml = useMemo(() => {
    if (!selectedSection) return '';
    return selectedSection.generateHtml(fieldValues);
  }, [selectedSection, fieldValues]);

  // Generate preview HTML for grid cards (with default values)
  const getDefaultHtml = useCallback((section: Section) => {
    const defaults: Record<string, string> = {};
    section.fields.forEach(field => {
      defaults[field.id] = field.defaultValue;
    });
    return section.generateHtml(defaults);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const closeModal = () => {
    setSelectedSection(null);
    setFieldValues({});
  };

  // Skip loading check in development
  if (!isDev && (isLoading || !user)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-wrapper relative" style={{ minHeight: '100%' }}>
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
               style={{ background: '#EEF2FF', border: '1px solid #E0E7FF' }}>
            <LayoutTemplate className="w-4 h-4" style={{ color: '#6366F1' }} />
            <span className="text-sm font-semibold" style={{ color: '#6366F1' }}>CUSTOM SECTIONS</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{
            color: '#1E1E1E',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '-0.02em'
          }}>
            Custom <span style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif', fontWeight: '700' }}>Sections</span>
          </h1>
          <p className="text-base md:text-lg mb-8" style={{ color: '#6B7280' }}>
            Professional HTML sections ready to embed in your Shopify store. Customize and copy the code.
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search sections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10"
                style={{ background: '#fff' }}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: activeCategory === cat.id ? '#000' : '#f5f5f5',
                    color: activeCategory === cat.id ? '#fff' : '#666'
                  }}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sections Grid - 3 columns with actual section previews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSections.map((section) => {
            const isAnnouncement = section.category === 'Announcement';
            return (
              <div
                key={section.id}
                onClick={() => setSelectedSection(section)}
                className="group cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: '#fff',
                  border: '1px solid #E5E7EB',
                }}
              >
                {/* Section Preview */}
                <div className="relative overflow-hidden">
                  <GridPreview html={getDefaultHtml(section)} isAnnouncement={isAnnouncement} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 bg-white rounded-lg text-sm font-semibold text-gray-900">
                      Customize
                    </span>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-100">
                  <div className="text-xs font-medium text-indigo-600 mb-1">{section.category}</div>
                  <h3 className="font-semibold text-gray-900 text-sm">{section.name}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSections.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No sections found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Modal - 50% Config | 50% (Preview + Code) - positioned within content area */}
      <AnimatePresence>
        {selectedSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(0,0,0,0.7)' }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full overflow-hidden flex"
              style={{ height: '90%', maxHeight: '900px' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Panel - 50% Configuration */}
              <div
                className="flex flex-col border-r border-gray-200"
                style={{ width: '50%', background: '#fafafa' }}
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedSection.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">{selectedSection.category}</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Scrollable Config Area */}
                <div className="flex-1 overflow-y-auto p-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Customize</h3>
                  <div className="space-y-5">
                    {selectedSection.fields.map((field) => (
                      <FieldInput
                        key={field.id}
                        field={field}
                        value={fieldValues[field.id] || ''}
                        onChange={(value) => handleFieldChange(field.id, value)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel - 50% (Preview top 50% + Code bottom 50%) */}
              <div
                className="flex flex-col"
                style={{ width: '50%' }}
              >
                {/* Preview Area - Top 50% */}
                <div
                  className="flex flex-col p-4 border-b border-gray-200"
                  style={{ height: '50%', background: '#f5f5f5' }}
                >
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex-shrink-0">
                    Live Preview
                  </div>
                  <div className="flex-1 overflow-hidden rounded-lg border border-gray-200">
                    <ModalPreview html={generatedHtml} />
                  </div>
                </div>

                {/* Code Area - Bottom 50% */}
                <div
                  className="flex flex-col"
                  style={{ height: '50%', background: '#1e1e1e' }}
                >
                  {/* Code Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 flex-shrink-0">
                    <span className="text-sm font-medium text-gray-400">HTML Code</span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
                      style={{
                        background: copied ? '#22c55e' : '#3b82f6',
                        color: '#fff'
                      }}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>

                  {/* Code Content */}
                  <div className="flex-1 overflow-auto p-4">
                    <pre className="text-xs leading-relaxed" style={{ color: '#d4d4d4' }}>
                      <code>{generatedHtml}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}

// Field Input Component
function FieldInput({
  field,
  value,
  onChange
}: {
  field: CustomizableField;
  value: string;
  onChange: (value: string) => void;
}) {
  const inputClasses = "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-300 bg-white";

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {field.label}
      </label>
      {field.type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          className={inputClasses}
          style={{ resize: 'vertical' }}
        />
      ) : field.type === 'color' ? (
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-12 h-10 rounded-lg cursor-pointer border border-gray-200"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={inputClasses}
            style={{ flex: 1 }}
          />
        </div>
      ) : (
        <input
          type={field.type === 'number' ? 'number' : 'text'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder || (field.type === 'image' ? 'https://...' : '')}
          className={inputClasses}
        />
      )}
    </div>
  );
}
