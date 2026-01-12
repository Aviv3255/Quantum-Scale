'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bug, MapPin, AlertTriangle, CheckSquare, Zap } from 'lucide-react';
import { createIssue, generateDirectLink, detectPageType } from '@/lib/adminIssues';
import type { LessonSlideContext } from '@/types/admin';

interface BugTemplate {
  id: string;
  title: string;
  description: string;
}

// Default bug report templates
const defaultBugTemplates: BugTemplate[] = [
  { id: '1', title: 'Add running numbers', description: 'Add numbered list formatting to improve readability' },
  { id: '2', title: 'Improve paragraph readability', description: 'Paragraph is in boring layout and barely readable. Add bold words, line breakers, better formatting' },
  { id: '3', title: 'Slide shows white/blank', description: 'Slide is shown as white blank. Fix the rendering issue' },
  { id: '4', title: 'Image not loading', description: 'Image is broken or not displaying correctly' },
  { id: '5', title: 'Text overflow/cut off', description: 'Text is getting cut off or overflowing its container' },
  { id: '6', title: 'Mobile layout broken', description: 'Layout is broken on mobile devices, needs responsive fix' },
];

interface AdminReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonContext?: LessonSlideContext | null;
}

export function AdminReportModal({ isOpen, onClose, lessonContext }: AdminReportModalProps) {
  console.log('[AdminReportModal] Render - isOpen:', isOpen, 'lessonContext:', lessonContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'normal' | 'urgent'>('normal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usePlaywright, setUsePlaywright] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [bugTemplates, setBugTemplates] = useState<BugTemplate[]>(defaultBugTemplates);

  // Load templates from localStorage (synced with admin page)
  useEffect(() => {
    const saved = localStorage.getItem('bugTemplates');
    if (saved) {
      try {
        setBugTemplates(JSON.parse(saved));
      } catch {
        // Keep defaults if parse fails
      }
    }
  }, [isOpen]); // Reload when modal opens

  // Filter templates based on input
  const filteredTemplates = useMemo(() => {
    if (!title.trim()) return [];
    const query = title.toLowerCase();
    return bugTemplates.filter(
      (t) => t.title.toLowerCase().includes(query) || t.description.toLowerCase().includes(query)
    );
  }, [title, bugTemplates]);

  // Handle template selection
  const selectTemplate = (template: BugTemplate) => {
    setTitle(template.title);
    setDescription(template.description);
    setShowSuggestions(false);
  };

  const pageUrl = typeof window !== 'undefined' ? window.location.pathname : '';
  // Override pageType to 'lesson' when we have lesson context (iframe reports)
  const pageType = lessonContext ? 'lesson' : detectPageType(pageUrl);

  const locationInfo = lessonContext
    ? `Lesson: ${lessonContext.lessonSlug} | Slide ${lessonContext.slideIndex + 1} (${lessonContext.slideType})`
    : `Page: ${pageUrl}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    setIsSubmitting(true);

    try {
      const directLink = generateDirectLink(
        pageUrl,
        pageType,
        lessonContext?.lessonSlug,
        lessonContext?.slideIndex
      );

      await createIssue({
        page_url: pageUrl,
        page_type: pageType,
        lesson_slug: lessonContext?.lessonSlug || null,
        slide_index: lessonContext?.slideIndex ?? null,
        section_id: usePlaywright ? 'playwright_validate' : null,
        title: title.trim(),
        description: description.trim(),
        priority,
        direct_link: directLink,
      });

      // Reset form and close
      setTitle('');
      setDescription('');
      setPriority('normal');
      setUsePlaywright(true);
      onClose();
    } catch (err) {
      console.error('Error creating issue:', err);
      setError('Failed to create issue. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-[10001] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <Bug className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900">Report Issue</h2>
                  <p className="text-sm text-neutral-500">Describe the problem you found</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-neutral-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            {/* Location Info */}
            <div className="px-6 py-3 bg-neutral-50 border-b border-neutral-100">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <MapPin className="w-4 h-4 text-neutral-400" />
                <span className="font-medium">{locationInfo}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Quick Templates */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Quick Report
                </label>
                <div className="flex flex-wrap gap-2">
                  {bugTemplates.slice(0, 4).map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => selectTemplate(template)}
                      className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-medium text-neutral-600 transition-colors"
                    >
                      {template.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title with auto-suggest */}
              <div className="relative">
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Issue Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="e.g., Text overlapping image on mobile"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-neutral-400 focus:ring-0 outline-none transition-colors text-sm"
                  autoFocus
                />

                {/* Auto-suggest dropdown */}
                {showSuggestions && filteredTemplates.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-lg z-10 overflow-hidden">
                    {filteredTemplates.map((template) => (
                      <button
                        key={template.id}
                        type="button"
                        onMouseDown={() => selectTemplate(template)}
                        className="w-full px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0"
                      >
                        <div className="text-sm font-medium text-neutral-900">{template.title}</div>
                        <div className="text-xs text-neutral-500 truncate">{template.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide more details about the issue..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-neutral-400 focus:ring-0 outline-none transition-colors text-sm resize-none"
                />
              </div>

              {/* Priority Toggle */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Priority
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPriority('normal')}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                      priority === 'normal'
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    onClick={() => setPriority('urgent')}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                      priority === 'urgent'
                        ? 'bg-red-500 text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Urgent
                  </button>
                </div>
              </div>

              {/* Playwright Validation Checkbox */}
              <div
                onClick={() => setUsePlaywright(!usePlaywright)}
                className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 cursor-pointer hover:bg-neutral-50 transition-colors"
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                  usePlaywright ? 'bg-neutral-900' : 'bg-neutral-100 border border-neutral-300'
                }`}>
                  {usePlaywright && <CheckSquare className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-neutral-700">
                    Use Playwright to validate fix
                  </span>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Claude will use browser automation to verify the issue is fixed
                  </p>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Report Issue'}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
