'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette,
  Wand2,
  Image as ImageIcon,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Eye,
  Layers,
  RefreshCw,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { copywritingLessonsConfig, LessonConfig, ComponentSlot } from '@/data/copywriting-lessons-config';

// Types for saved selections
interface SavedSelections {
  [lessonSlug: string]: {
    [slideIndex: number]: string; // componentId
  };
}

// Load saved selections from localStorage
const loadSelections = (): SavedSelections => {
  if (typeof window === 'undefined') return {};
  try {
    const saved = localStorage.getItem('lesson-crm-selections');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

// Save selections to localStorage
const saveSelections = (selections: SavedSelections) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('lesson-crm-selections', JSON.stringify(selections));
};

export default function LessonCRMPage() {
  const [migrationStatus, setMigrationStatus] = useState<{ migrated: number; pending: number; total: number } | null>(null);
  const [isMigrating, setIsMigrating] = useState(false);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [selections, setSelections] = useState<SavedSelections>({});
  const [previewComponent, setPreviewComponent] = useState<{ lesson: string; slot: ComponentSlot; optionIndex: number } | null>(null);

  // Load selections on mount
  useEffect(() => {
    setSelections(loadSelections());
    checkMigrationStatus();
  }, []);

  // Check color migration status
  const checkMigrationStatus = async () => {
    try {
      const res = await fetch('/api/admin/lesson-crm/migrate-colors');
      const data = await res.json();
      setMigrationStatus(data);
    } catch (error) {
      console.error('Failed to check migration status:', error);
    }
  };

  // Run global color migration
  const runMigration = async () => {
    setIsMigrating(true);
    try {
      const res = await fetch('/api/admin/lesson-crm/migrate-colors', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        await checkMigrationStatus();
        alert(`Migrated ${data.migratedLessons} lessons with ${data.totalChanges} color changes!`);
      }
    } catch (error) {
      console.error('Migration failed:', error);
      alert('Migration failed. Check console for details.');
    } finally {
      setIsMigrating(false);
    }
  };

  // Copy prompt to clipboard
  const copyPrompt = async (prompt: string, id: string) => {
    await navigator.clipboard.writeText(prompt);
    setCopiedPrompt(id);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  // Select a component for a slide
  const selectComponent = (lessonSlug: string, slideIndex: number, componentId: string) => {
    const newSelections = {
      ...selections,
      [lessonSlug]: {
        ...selections[lessonSlug],
        [slideIndex]: componentId,
      },
    };
    setSelections(newSelections);
    saveSelections(newSelections);
  };

  // Get selected component for a slide
  const getSelectedComponent = (lessonSlug: string, slideIndex: number): string | null => {
    return selections[lessonSlug]?.[slideIndex] || null;
  };

  // Check if lesson is complete (all slots have selections)
  const isLessonComplete = (lesson: LessonConfig): boolean => {
    return lesson.componentSlots.every(slot =>
      getSelectedComponent(lesson.slug, slot.slideIndex) !== null
    );
  };

  return (
    <DashboardLayout>
      <div className="page-wrapper max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#88da1c] to-[#6BB516] flex items-center justify-center">
              <Wand2 size={28} className="text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black">Lesson Redesign CRM</h1>
              <p className="text-[var(--text-muted)]">Copywriting Lessons - Quick Redesign Mode</p>
            </div>
          </div>
        </motion.header>

        {/* Global Color Migration */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black text-white rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#88da1c] flex items-center justify-center">
                <Palette size={24} className="text-black" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Global Color Migration</h2>
                <p className="text-white/60 text-sm">
                  {migrationStatus
                    ? `${migrationStatus.migrated}/${migrationStatus.total} lessons migrated to lime green`
                    : 'Checking status...'}
                </p>
              </div>
            </div>
            <button
              onClick={runMigration}
              disabled={isMigrating}
              className="flex items-center gap-2 px-6 py-3 bg-[#88da1c] text-black font-semibold rounded-xl hover:bg-[#a3e635] transition-colors disabled:opacity-50"
            >
              {isMigrating ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  Migrating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Migrate All Colors
                </>
              )}
            </button>
          </div>
          {migrationStatus && (
            <div className="mt-4">
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#88da1c] transition-all duration-500"
                  style={{ width: `${(migrationStatus.migrated / migrationStatus.total) * 100}%` }}
                />
              </div>
            </div>
          )}
        </motion.section>

        {/* Lessons List */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-black">Copywriting Lessons ({copywritingLessonsConfig.length})</h2>
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <CheckCircle size={16} className="text-[#88da1c]" />
              {copywritingLessonsConfig.filter(l => isLessonComplete(l)).length} complete
            </div>
          </div>

          <div className="space-y-4">
            {copywritingLessonsConfig.map((lesson, idx) => (
              <motion.div
                key={lesson.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
                className="bg-white rounded-2xl border border-black/5 overflow-hidden"
              >
                {/* Lesson Header */}
                <button
                  onClick={() => setExpandedLesson(expandedLesson === lesson.slug ? null : lesson.slug)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-black/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isLessonComplete(lesson) ? 'bg-[#88da1c]/10' : 'bg-black/5'
                    }`}>
                      {isLessonComplete(lesson) ? (
                        <CheckCircle size={20} className="text-[#88da1c]" />
                      ) : (
                        <Layers size={20} className="text-[var(--text-muted)]" />
                      )}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-black">{lesson.title}</h3>
                      <p className="text-sm text-[var(--text-muted)]">{lesson.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <ImageIcon size={14} className="text-[#EC4899]" />
                      <span>{lesson.imagePrompts.length} images</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Layers size={14} className="text-[#3B82F6]" />
                      <span>{lesson.componentSlots.length} components</span>
                    </div>
                    {expandedLesson === lesson.slug ? (
                      <ChevronDown size={20} className="text-[var(--text-muted)]" />
                    ) : (
                      <ChevronRight size={20} className="text-[var(--text-muted)]" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedLesson === lesson.slug && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-black/5"
                    >
                      <div className="p-6 space-y-8">
                        {/* Image Prompts */}
                        {lesson.imagePrompts.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-black mb-4 flex items-center gap-2">
                              <ImageIcon size={18} className="text-[#EC4899]" />
                              Image Prompts
                            </h4>
                            <div className="space-y-4">
                              {lesson.imagePrompts.map((img, imgIdx) => (
                                <div
                                  key={imgIdx}
                                  className={`p-4 rounded-xl border ${
                                    img.background === 'black'
                                      ? 'bg-black/5 border-black/10'
                                      : 'bg-white border-black/10'
                                  }`}
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <span className="px-2 py-1 text-xs font-medium bg-black/5 rounded">
                                        Slide {img.slideIndex + 1}
                                      </span>
                                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                                        img.background === 'black'
                                          ? 'bg-black text-white'
                                          : 'bg-white border border-black/20 text-black'
                                      }`}>
                                        {img.background} bg
                                      </span>
                                    </div>
                                    <button
                                      onClick={() => copyPrompt(img.prompt, `${lesson.slug}-${imgIdx}`)}
                                      className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-[#88da1c] text-black rounded-lg hover:bg-[#a3e635] transition-colors"
                                    >
                                      {copiedPrompt === `${lesson.slug}-${imgIdx}` ? (
                                        <>
                                          <Check size={14} />
                                          Copied!
                                        </>
                                      ) : (
                                        <>
                                          <Copy size={14} />
                                          Copy for ChatGPT
                                        </>
                                      )}
                                    </button>
                                  </div>
                                  <p className="text-sm text-[var(--text-muted)] mb-2">{img.context}</p>
                                  <p className="text-xs text-black/60 bg-black/5 p-3 rounded-lg font-mono">
                                    {img.prompt}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Component Slots */}
                        <div>
                          <h4 className="font-semibold text-black mb-4 flex items-center gap-2">
                            <Layers size={18} className="text-[#3B82F6]" />
                            Component Options (Choose 1 per slide)
                          </h4>
                          <div className="space-y-6">
                            {lesson.componentSlots.map((slot) => {
                              const selectedId = getSelectedComponent(lesson.slug, slot.slideIndex);
                              return (
                                <div key={slot.slideIndex} className="border border-black/10 rounded-xl p-4">
                                  <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 text-sm font-medium bg-[#3B82F6]/10 text-[#3B82F6] rounded-lg">
                                      Slide {slot.slideIndex + 1}
                                    </span>
                                    <span className="text-sm font-medium text-black">{slot.slideTitle}</span>
                                    <span className="text-xs text-[var(--text-muted)]">
                                      Current: {slot.currentType}
                                    </span>
                                  </div>

                                  {/* Three Options */}
                                  <div className="grid grid-cols-3 gap-4">
                                    {slot.options.map((option, optIdx) => {
                                      const isSelected = selectedId === option.id;
                                      return (
                                        <button
                                          key={option.id}
                                          onClick={() => selectComponent(lesson.slug, slot.slideIndex, option.id)}
                                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                                            isSelected
                                              ? 'border-[#88da1c] bg-[#88da1c]/5'
                                              : 'border-black/10 hover:border-[#88da1c]/50 hover:bg-black/[0.02]'
                                          }`}
                                        >
                                          <div className="flex items-start justify-between mb-2">
                                            <h5 className="font-semibold text-black text-sm">{option.name}</h5>
                                            {isSelected && (
                                              <CheckCircle size={18} className="text-[#88da1c]" />
                                            )}
                                          </div>
                                          <p className="text-xs text-[var(--text-muted)] mb-3">
                                            {option.description}
                                          </p>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setPreviewComponent({ lesson: lesson.slug, slot, optionIndex: optIdx });
                                            }}
                                            className="flex items-center gap-1 text-xs text-[#3B82F6] hover:underline"
                                          >
                                            <Eye size={12} />
                                            Preview Data
                                          </button>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Preview Modal */}
        <AnimatePresence>
          {previewComponent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setPreviewComponent(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              >
                <h3 className="text-xl font-bold text-black mb-4">
                  {previewComponent.slot.options[previewComponent.optionIndex].name} Preview
                </h3>
                <pre className="bg-black/5 p-4 rounded-xl text-xs overflow-x-auto">
                  {JSON.stringify(previewComponent.slot.options[previewComponent.optionIndex].previewData, null, 2)}
                </pre>
                <button
                  onClick={() => setPreviewComponent(null)}
                  className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
