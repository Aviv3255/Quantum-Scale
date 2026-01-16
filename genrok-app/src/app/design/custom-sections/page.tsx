'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { X, Copy, Check, Search, LayoutTemplate, Plus, Minus, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { sectionsData, categories } from './sections-data';
import { Section, CustomizableField } from './types';

// Preview settings type for adjustable grid previews
interface PreviewSettings {
  scale: number;
  offsetX: number;
  offsetY: number;
}

// Grid card preview component - renders scaled HTML in iframe
// isAnnouncement prop triggers larger scale for thin announcement bars
// customSettings allows per-section adjustment of scale and position
function GridPreview({
  html,
  isAnnouncement = false,
  customSettings
}: {
  html: string;
  isAnnouncement?: boolean;
  customSettings?: PreviewSettings;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Default scale and dimensions
  // Announcement bars: 0.7 scale, 120px container (thin sections)
  // Regular sections: 0.35 scale with 680px iframe height = 238px scaled (fits in 240px container)
  const defaultScale = isAnnouncement ? 0.7 : 0.35;
  const scale = customSettings?.scale ?? defaultScale;
  const offsetX = customSettings?.offsetX ?? 0;
  const offsetY = customSettings?.offsetY ?? 0;
  const containerHeight = isAnnouncement ? 120 : 240;

  // iframe dimensions - width is always 1200px to match desktop view
  // For announcements, use smaller height since they're thin bars
  // For regular sections, use 680px height to capture full section content
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
            /* Center content vertically for sections that are shorter than iframe height */
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
  }, [html, isAnnouncement]);

  // Calculate the scaled dimensions
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
      {/* Container for the scaled iframe - uses transform from center for proper centering */}
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
            transform: `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`,
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

// Modal preview component - renders at fixed desktop width (1200px) and scales to fit
// Section is ALWAYS centered in the preview area
function ModalPreview({ html, isAnnouncement = false }: { html: string; isAnnouncement?: boolean }) {
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

  const scaledWidth = 1200 * scale;
  const scaledHeight = (isAnnouncement ? 120 : 600) * scale;

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        background: '#fff',
        borderRadius: '8px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Centered container for scaled iframe */}
      <div style={{
        width: `${scaledWidth}px`,
        height: `${scaledHeight}px`,
        position: 'relative',
        background: '#fff',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <iframe
          ref={iframeRef}
          style={{
            width: '1200px',
            height: isAnnouncement ? '120px' : '600px',
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

  // Preview settings for each section - allows adjusting scale and position
  // These are temporary controls to fine-tune each section's preview
  const [previewSettings, setPreviewSettings] = useState<Record<string, PreviewSettings>>({});
  const [showPreviewControls, setShowPreviewControls] = useState(true); // Toggle to show/hide controls

  // Functions to adjust preview settings
  const adjustScale = (sectionId: string, delta: number, isAnnouncement: boolean) => {
    setPreviewSettings(prev => {
      const current = prev[sectionId] || { scale: isAnnouncement ? 0.7 : 0.35, offsetX: 0, offsetY: 0 };
      return {
        ...prev,
        [sectionId]: { ...current, scale: Math.max(0.1, Math.min(1.5, current.scale + delta)) }
      };
    });
  };

  const adjustPosition = (sectionId: string, axis: 'X' | 'Y', delta: number, isAnnouncement: boolean) => {
    setPreviewSettings(prev => {
      const current = prev[sectionId] || { scale: isAnnouncement ? 0.7 : 0.35, offsetX: 0, offsetY: 0 };
      return {
        ...prev,
        [sectionId]: {
          ...current,
          [`offset${axis}`]: current[`offset${axis}`] + delta
        }
      };
    });
  };

  // Log all settings to console for saving
  const logAllSettings = () => {
    console.log('=== PREVIEW SETTINGS ===');
    console.log(JSON.stringify(previewSettings, null, 2));
  };

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

        {/* Toggle for preview controls */}
        {showPreviewControls && (
          <div className="mb-4 flex gap-4 items-center p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <span className="text-sm font-medium text-yellow-800">Preview Adjustment Mode</span>
            <button
              onClick={logAllSettings}
              className="px-3 py-1 bg-yellow-600 text-white rounded text-xs font-medium hover:bg-yellow-700"
            >
              Log Settings to Console
            </button>
            <button
              onClick={() => setShowPreviewControls(false)}
              className="px-3 py-1 bg-gray-600 text-white rounded text-xs font-medium hover:bg-gray-700"
            >
              Hide Controls
            </button>
          </div>
        )}

        {/* Sections Grid - 3 columns with actual section previews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSections.map((section) => {
            const isAnnouncement = section.category === 'Announcement';
            const settings = previewSettings[section.id];
            const currentScale = settings?.scale ?? (isAnnouncement ? 0.7 : 0.35);
            const currentX = settings?.offsetX ?? 0;
            const currentY = settings?.offsetY ?? 0;

            return (
              <div
                key={section.id}
                className="group overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg"
                style={{
                  background: '#fff',
                  border: '1px solid #E5E7EB',
                }}
              >
                {/* Section Preview */}
                <div
                  className="relative overflow-hidden cursor-pointer"
                  onClick={() => setSelectedSection(section)}
                >
                  <GridPreview
                    html={getDefaultHtml(section)}
                    isAnnouncement={isAnnouncement}
                    customSettings={settings}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 bg-white rounded-lg text-sm font-semibold text-gray-900">
                      Customize
                    </span>
                  </div>
                </div>

                {/* Preview Controls - Temporary for adjustment */}
                {showPreviewControls && (
                  <div className="p-2 bg-gray-50 border-t border-gray-200">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      {/* Scale controls */}
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-gray-500 w-8">Scale:</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); adjustScale(section.id, -0.05, isAnnouncement); }}
                          className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-100"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-[10px] font-mono w-10 text-center">{currentScale.toFixed(2)}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); adjustScale(section.id, 0.05, isAnnouncement); }}
                          className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-100"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Position controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); adjustPosition(section.id, 'X', -20, isAnnouncement); }}
                          className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-100"
                        >
                          <ArrowLeft size={12} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); adjustPosition(section.id, 'Y', -20, isAnnouncement); }}
                          className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-100"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); adjustPosition(section.id, 'Y', 20, isAnnouncement); }}
                          className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-100"
                        >
                          <ArrowDown size={12} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); adjustPosition(section.id, 'X', 20, isAnnouncement); }}
                          className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-100"
                        >
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                    {/* Current position display */}
                    <div className="text-[9px] text-gray-400 text-center font-mono">
                      X: {currentX} | Y: {currentY}
                    </div>
                  </div>
                )}

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

      {/* Modal - Fixed floating overlay positioned from sidebar to right edge */}
      <AnimatePresence>
        {selectedSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-50 flex items-center justify-center"
            style={{
              // Position from sidebar (250px) to right edge, full height
              top: 0,
              right: 0,
              bottom: 0,
              left: 'var(--sidebar-width, 250px)',
              background: 'rgba(0,0,0,0.6)',
              padding: '24px'
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl overflow-hidden flex shadow-2xl"
              style={{
                width: '100%',
                maxWidth: '1100px',
                height: 'auto',
                maxHeight: 'calc(100vh - 100px)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Panel - Configuration (50%) */}
              <div
                className="flex flex-col border-r border-gray-200"
                style={{ flex: '1 1 50%', minWidth: 0, background: '#fafafa' }}
              >
                {/* Header */}
                <div className="p-5 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{selectedSection.name}</h2>
                    <p className="text-xs text-gray-500 mt-0.5">{selectedSection.category}</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Scrollable Config Area */}
                <div className="flex-1 overflow-y-auto p-5" style={{ maxHeight: '500px' }}>
                  <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Customize</h3>
                  <div className="space-y-4">
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

              {/* Right Panel - Preview + Code stacked (50%) */}
              <div
                className="flex flex-col"
                style={{ flex: '1 1 50%', minWidth: 0 }}
              >
                {/* Preview Area */}
                <div
                  className="flex flex-col p-4 border-b border-gray-200"
                  style={{ height: '280px', background: '#f5f5f5' }}
                >
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex-shrink-0">
                    Live Preview
                  </div>
                  <div className="flex-1 overflow-hidden rounded-lg border border-gray-200">
                    <ModalPreview
                      html={generatedHtml}
                      isAnnouncement={selectedSection.category === 'Announcement'}
                    />
                  </div>
                </div>

                {/* Code Area */}
                <div
                  className="flex flex-col"
                  style={{ height: '280px', background: '#1e1e1e' }}
                >
                  {/* Code Header */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-700 flex-shrink-0">
                    <span className="text-sm font-medium text-gray-400">HTML Code</span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: copied ? '#22c55e' : '#3b82f6',
                        color: '#fff'
                      }}
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
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
