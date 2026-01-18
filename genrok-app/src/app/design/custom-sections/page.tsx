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
function GridPreview({
  html,
  isAnnouncement = false
}: {
  html: string;
  isAnnouncement?: boolean;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const scale = isAnnouncement ? 0.7 : 0.35;
  const containerHeight = isAnnouncement ? 120 : 240;
  const iframeWidth = 1200;
  const iframeHeight = isAnnouncement ? 80 : 680;

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
            min-height: 100%;
            background: #fff;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        </style>
      </head>
      <body>${html}</body>
      </html>
    `);
    doc.close();
    setIsLoaded(true);
  }, [html]);

  const scaledWidth = iframeWidth * scale;
  const scaledHeight = iframeHeight * scale;

  return (
    <div
      style={{
        width: '100%',
        height: `${containerHeight}px`,
        overflow: 'hidden',
        position: 'relative',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{
        width: `${scaledWidth}px`,
        height: `${Math.min(scaledHeight, containerHeight)}px`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <iframe
          ref={iframeRef}
          style={{
            width: `${iframeWidth}px`,
            height: `${iframeHeight}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            border: 'none',
            pointerEvents: 'none',
            flexShrink: 0,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.2s'
          }}
          title="Section Preview"
        />
      </div>
    </div>
  );
}

// Modal preview component - scales to fit container without scrolling
function ModalPreview({ html, isAnnouncement = false }: { html: string; isAnnouncement?: boolean }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [contentHeight, setContentHeight] = useState(isAnnouncement ? 120 : 600);

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

    // Measure actual content height after render
    setTimeout(() => {
      try {
        const bodyHeight = doc.body?.scrollHeight || (isAnnouncement ? 120 : 600);
        setContentHeight(Math.min(bodyHeight, 900));
      } catch {
        // Cross-origin errors
      }
    }, 100);
  }, [html, isAnnouncement]);

  // Calculate scale to fit container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const containerWidth = container.offsetWidth - 32; // padding
      const containerHeight = container.offsetHeight - 32;

      // Calculate scale to fit both width and height
      const scaleX = containerWidth / 1200;
      const scaleY = containerHeight / contentHeight;
      const newScale = Math.min(scaleX, scaleY, 1); // Never scale up beyond 1

      setScale(newScale);
    };

    updateScale();
    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [contentHeight]);

  const scaledWidth = 1200 * scale;
  const scaledHeight = contentHeight * scale;

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#f5f5f5',
        borderRadius: '12px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div style={{
        width: `${scaledWidth}px`,
        height: `${scaledHeight}px`,
        position: 'relative',
        background: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}>
        <iframe
          ref={iframeRef}
          style={{
            width: '1200px',
            height: `${contentHeight}px`,
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

  // Auth bypass for local development
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

  const generatedHtml = useMemo(() => {
    if (!selectedSection) return '';
    return selectedSection.generateHtml(fieldValues);
  }, [selectedSection, fieldValues]);

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
          <div className="flex flex-col gap-4 mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search sections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 bg-white"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all"
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

        {/* Sections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSections.map((section) => {
            const isAnnouncement = section.category === 'Announcement';

            return (
              <div
                key={section.id}
                className="group overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl cursor-pointer"
                style={{
                  background: '#fff',
                  border: '1px solid #E5E7EB',
                }}
                onClick={() => setSelectedSection(section)}
              >
                {/* Section Preview */}
                <div className="relative overflow-hidden">
                  <GridPreview
                    html={getDefaultHtml(section)}
                    isAnnouncement={isAnnouncement}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity px-5 py-2.5 bg-white rounded-full text-sm font-semibold text-gray-900 shadow-lg">
                      Customize
                    </span>
                  </div>
                </div>

                {/* Section Info */}
                <div className="p-4 border-t border-gray-100">
                  <div className="text-xs font-semibold text-indigo-600 mb-1 uppercase tracking-wide">{section.category}</div>
                  <h3 className="font-semibold text-gray-900">{section.name}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSections.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">No sections found matching your criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-4 text-indigo-600 font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-50 flex items-center justify-center"
            style={{
              top: 0,
              right: 0,
              bottom: 0,
              left: 'var(--sidebar-width, 250px)',
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(4px)',
              padding: '32px'
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl overflow-hidden flex shadow-2xl"
              style={{
                width: '100%',
                maxWidth: '1400px',
                height: 'calc(100vh - 64px)',
                maxHeight: '850px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Panel - Configuration (40%) */}
              <div
                className="flex flex-col"
                style={{ width: '40%', minWidth: 0, background: '#fafafa', borderRight: '1px solid #e5e7eb' }}
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex items-start justify-between flex-shrink-0 bg-white">
                  <div>
                    <div className="text-xs font-semibold text-indigo-600 mb-1 uppercase tracking-wide">
                      {selectedSection.category}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedSection.name}</h2>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors -mr-2 -mt-2"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Scrollable Config Area */}
                <div className="flex-1 overflow-y-auto p-6">
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

              {/* Right Panel - Preview (75%) + Copy Button (25%) */}
              <div
                className="flex flex-col"
                style={{ width: '60%', minWidth: 0 }}
              >
                {/* Preview Area */}
                <div
                  className="flex-1 flex flex-col p-5"
                  style={{ background: '#e8e8e8' }}
                >
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center justify-between">
                    <span>Live Preview</span>
                    <span className="text-gray-400 font-normal normal-case">Scaled to fit</span>
                  </div>
                  <div className="flex-1 min-h-0">
                    <ModalPreview
                      html={generatedHtml}
                      isAnnouncement={selectedSection.category === 'Announcement'}
                    />
                  </div>
                </div>

                {/* Copy Button Area */}
                <div
                  className="flex items-center justify-between p-5 gap-4"
                  style={{ background: '#111', flexShrink: 0 }}
                >
                  <div>
                    <p className="text-white font-medium text-sm">Ready to use</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {generatedHtml.length.toLocaleString()} characters
                    </p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: copied ? '#22c55e' : '#fff',
                      color: copied ? '#fff' : '#000'
                    }}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy HTML Code'}
                  </button>
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
  const baseClasses = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 bg-white transition-all";

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
          className={baseClasses}
          style={{ resize: 'vertical' }}
        />
      ) : field.type === 'color' ? (
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-12 h-12 rounded-xl cursor-pointer border-2 border-gray-200 hover:border-gray-300 transition-colors"
              style={{ padding: '2px' }}
            />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={baseClasses}
            style={{ flex: 1 }}
          />
        </div>
      ) : field.type === 'image' ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className={baseClasses}
        />
      ) : (
        <input
          type={field.type === 'number' ? 'number' : 'text'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={baseClasses}
        />
      )}
    </div>
  );
}
