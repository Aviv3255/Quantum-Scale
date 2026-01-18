'use client';
// TEST VERSION - No authentication wrapper
// CRM v2 - Simplified Copywriting Lessons View with Image Upload & Component Previews

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
  Layers,
  RefreshCw,
  CheckCircle,
  Sparkles,
  Upload,
  X,
  Link as LinkIcon,
} from 'lucide-react';
import { copywritingLessonsConfig, LessonConfig, ComponentSlot, ComponentOption, SlideContent } from '@/data/copywriting-lessons-config';

// Types for saved data
interface SavedData {
  selections: {
    [lessonSlug: string]: {
      [slideIndex: number]: string; // componentId
    };
  };
  images: {
    [key: string]: string; // lessonSlug-slideIndex -> imageUrl
  };
}

// Load saved data from localStorage
const loadSavedData = (): SavedData => {
  if (typeof window === 'undefined') return { selections: {}, images: {} };
  try {
    const saved = localStorage.getItem('lesson-crm-data-v2');
    return saved ? JSON.parse(saved) : { selections: {}, images: {} };
  } catch {
    return { selections: {}, images: {} };
  }
};

// Save data to localStorage
const saveSavedData = (data: SavedData) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('lesson-crm-data-v2', JSON.stringify(data));
};

// ============================================
// COMPONENT PREVIEW RENDERERS
// ============================================

const PreviewVennDiagram = ({ data }: { data: Record<string, unknown> }) => {
  const d = data as { title?: string; leftLabel?: string; rightLabel?: string; overlapLabel?: string; leftItems?: string[]; rightItems?: string[]; overlapItems?: string[] };
  return (
    <div className="bg-white rounded-lg p-3 h-full">
      <p className="text-[10px] font-bold text-center mb-2 text-black">{d.title}</p>
      <div className="relative h-24 flex items-center justify-center">
        {/* Left Circle */}
        <div className="absolute left-2 w-16 h-16 rounded-full bg-[#88da1c]/20 border-2 border-[#88da1c] flex items-center justify-center">
          <span className="text-[8px] font-medium text-center px-1">{d.leftLabel}</span>
        </div>
        {/* Right Circle */}
        <div className="absolute right-2 w-16 h-16 rounded-full bg-black/10 border-2 border-black flex items-center justify-center">
          <span className="text-[8px] font-medium text-center px-1">{d.rightLabel}</span>
        </div>
        {/* Overlap */}
        <div className="absolute z-10 bg-[#88da1c] text-black text-[8px] font-bold px-2 py-1 rounded">
          {d.overlapLabel}
        </div>
      </div>
    </div>
  );
};

const PreviewDonutChart = ({ data }: { data: Record<string, unknown> }) => {
  const d = data as { title?: string; segments?: { label: string; value: number; color: string }[]; centerLabel?: string; centerValue?: string };
  return (
    <div className="bg-white rounded-lg p-3 h-full">
      <p className="text-[10px] font-bold text-center mb-2 text-black">{d.title}</p>
      <div className="relative w-20 h-20 mx-auto">
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#88da1c" strokeWidth="3" strokeDasharray="70, 100" />
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#000" strokeWidth="3" strokeDasharray="30, 100" strokeDashoffset="-70" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold">{d.centerLabel}</span>
          <span className="text-[8px] text-gray-500">{d.centerValue}</span>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-2">
        {d.segments?.map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-[7px]">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PreviewStatCards = ({ data }: { data: Record<string, unknown> }) => {
  const d = data as { stats?: { value: string; label: string; desc?: string }[] };
  return (
    <div className="bg-white rounded-lg p-2 h-full">
      <div className="grid grid-cols-3 gap-1">
        {d.stats?.slice(0, 3).map((stat, i) => (
          <div key={i} className="bg-black/5 rounded p-2 text-center">
            <p className="text-sm font-bold text-[#88da1c]">{stat.value}</p>
            <p className="text-[7px] font-medium text-black">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PreviewTimeline = ({ data }: { data: Record<string, unknown> }) => {
  const d = data as { title?: string; steps?: { title: string; desc?: string }[] };
  return (
    <div className="bg-white rounded-lg p-3 h-full">
      <p className="text-[10px] font-bold mb-2 text-black">{d.title}</p>
      <div className="space-y-1">
        {d.steps?.slice(0, 4).map((step, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="w-4 h-4 rounded-full bg-[#88da1c] flex items-center justify-center flex-shrink-0">
              <span className="text-[8px] font-bold text-black">{i + 1}</span>
            </div>
            <div>
              <p className="text-[9px] font-semibold text-black">{step.title}</p>
              <p className="text-[7px] text-gray-500">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PreviewProcessSteps = ({ data }: { data: Record<string, unknown> }) => {
  const d = data as { title?: string; steps?: { num?: string; title: string; desc?: string }[] };
  return (
    <div className="bg-white rounded-lg p-3 h-full">
      <p className="text-[10px] font-bold mb-2 text-black">{d.title}</p>
      <div className="grid grid-cols-2 gap-1">
        {d.steps?.slice(0, 4).map((step, i) => (
          <div key={i} className="bg-black/5 rounded p-1.5">
            <span className="text-[10px] font-bold text-[#88da1c]">{step.num || `0${i + 1}`}</span>
            <p className="text-[8px] font-medium text-black">{step.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PreviewGaugeChart = ({ data }: { data: Record<string, unknown> }) => {
  const d = data as { gauges?: { label: string; value: number; max?: number; color?: string }[] };
  return (
    <div className="bg-white rounded-lg p-3 h-full">
      <div className="space-y-2">
        {d.gauges?.slice(0, 3).map((gauge, i) => (
          <div key={i}>
            <div className="flex justify-between text-[8px] mb-0.5">
              <span className="font-medium">{gauge.label}</span>
              <span className="font-bold">{gauge.value}%</span>
            </div>
            <div className="h-2 bg-black/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(gauge.value / (gauge.max || 100)) * 100}%`,
                  backgroundColor: gauge.color || '#88da1c',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PreviewBarChart = ({ data }: { data: Record<string, unknown> }) => {
  const d = data as { title?: string; bars?: { label: string; value: number }[] };
  const maxVal = Math.max(...(d.bars?.map(b => b.value) || [1]));
  return (
    <div className="bg-white rounded-lg p-3 h-full">
      <p className="text-[10px] font-bold mb-2 text-black">{d.title}</p>
      <div className="space-y-1">
        {d.bars?.slice(0, 4).map((bar, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[7px] w-16 truncate">{bar.label}</span>
            <div className="flex-1 h-3 bg-black/10 rounded overflow-hidden">
              <div
                className="h-full bg-[#88da1c] rounded"
                style={{ width: `${(bar.value / maxVal) * 100}%` }}
              />
            </div>
            <span className="text-[8px] font-bold w-8">{bar.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PreviewIconGrid = ({ data }: { data: Record<string, unknown> }) => {
  const d = data as { title?: string; items?: { title: string; text?: string }[] };
  return (
    <div className="bg-white rounded-lg p-3 h-full">
      <p className="text-[10px] font-bold mb-2 text-black">{d.title}</p>
      <div className="grid grid-cols-2 gap-1">
        {d.items?.slice(0, 4).map((item, i) => (
          <div key={i} className="bg-[#88da1c]/10 rounded p-1.5">
            <p className="text-[8px] font-semibold text-black">{item.title}</p>
            <p className="text-[6px] text-gray-600 line-clamp-2">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PreviewFunnelChart = ({ data }: { data: Record<string, unknown> }) => {
  const d = data as { title?: string; stages?: { label: string; value: number }[] };
  return (
    <div className="bg-white rounded-lg p-3 h-full">
      <p className="text-[10px] font-bold mb-2 text-black">{d.title}</p>
      <div className="space-y-1">
        {d.stages?.slice(0, 4).map((stage, i) => {
          const width = 100 - i * 15;
          return (
            <div key={i} className="flex items-center justify-center">
              <div
                className="h-4 bg-[#88da1c] rounded flex items-center justify-center"
                style={{ width: `${width}%`, opacity: 1 - i * 0.15 }}
              >
                <span className="text-[7px] font-medium text-black">{stage.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PreviewRadarChart = ({ data }: { data: Record<string, unknown> }) => {
  const d = data as { title?: string; axes?: string[]; data?: number[] };
  return (
    <div className="bg-white rounded-lg p-3 h-full">
      <p className="text-[10px] font-bold text-center mb-1 text-black">{d.title}</p>
      <div className="relative w-20 h-20 mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Background grid */}
          <polygon points="50,10 90,35 90,75 50,90 10,75 10,35" fill="none" stroke="#e5e7eb" strokeWidth="1" />
          <polygon points="50,25 75,40 75,65 50,75 25,65 25,40" fill="none" stroke="#e5e7eb" strokeWidth="1" />
          {/* Data polygon */}
          <polygon points="50,15 85,38 80,72 50,85 20,72 15,38" fill="rgba(136,218,28,0.3)" stroke="#88da1c" strokeWidth="2" />
        </svg>
      </div>
      <div className="flex flex-wrap justify-center gap-1 mt-1">
        {d.axes?.slice(0, 4).map((axis, i) => (
          <span key={i} className="text-[6px] bg-black/5 px-1 rounded">{axis}</span>
        ))}
      </div>
    </div>
  );
};

const PreviewSlopeChart = ({ data }: { data: Record<string, unknown> }) => {
  const d = data as { title?: string; leftLabel?: string; rightLabel?: string; items?: { label: string; leftValue: number; rightValue: number }[] };
  return (
    <div className="bg-white rounded-lg p-3 h-full">
      <p className="text-[10px] font-bold mb-2 text-black">{d.title}</p>
      <div className="flex justify-between text-[7px] text-gray-500 mb-1">
        <span>{d.leftLabel}</span>
        <span>{d.rightLabel}</span>
      </div>
      <div className="space-y-1">
        {d.items?.slice(0, 3).map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="text-[8px] font-bold w-6">{item.leftValue}</span>
            <div className="flex-1 h-0.5 bg-[#88da1c] mx-1" style={{ transform: 'rotate(-10deg)' }} />
            <span className="text-[8px] font-bold text-[#88da1c] w-6 text-right">{item.rightValue}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PreviewBeforeAfter = ({ data }: { data: Record<string, unknown> }) => {
  const d = data as { before?: { title: string; text: string }; after?: { title: string; text: string } };
  return (
    <div className="bg-white rounded-lg p-2 h-full">
      <div className="grid grid-cols-2 gap-2 h-full">
        <div className="bg-red-50 rounded p-1.5 border border-red-200">
          <p className="text-[8px] font-bold text-red-600">{d.before?.title}</p>
          <p className="text-[6px] text-red-800 line-clamp-3">{d.before?.text}</p>
        </div>
        <div className="bg-green-50 rounded p-1.5 border border-green-200">
          <p className="text-[8px] font-bold text-green-600">{d.after?.title}</p>
          <p className="text-[6px] text-green-800 line-clamp-3">{d.after?.text}</p>
        </div>
      </div>
    </div>
  );
};

// Component preview router (returns just the component)
const ComponentPreviewContent = ({ option }: { option: ComponentOption }) => {
  const { id, previewData } = option;

  const previewMap: Record<string, React.FC<{ data: Record<string, unknown> }>> = {
    VennDiagram: PreviewVennDiagram,
    DonutChart: PreviewDonutChart,
    StatCard: PreviewStatCards,
    Timeline: PreviewTimeline,
    ProcessSteps: PreviewProcessSteps,
    GaugeChart: PreviewGaugeChart,
    BarChart: PreviewBarChart,
    IconGrid: PreviewIconGrid,
    FunnelChart: PreviewFunnelChart,
    RadarChart: PreviewRadarChart,
    SlopeChart: PreviewSlopeChart,
    BeforeAfter: PreviewBeforeAfter,
    ComparisonBars: PreviewBarChart,
    SplitContent: PreviewBeforeAfter,
    StackedList: PreviewIconGrid,
  };

  const PreviewComponent = previewMap[id];

  if (PreviewComponent) {
    return <PreviewComponent data={previewData} />;
  }

  // Fallback for unknown components
  return (
    <div className="bg-white rounded-lg p-3 h-full flex items-center justify-center">
      <div className="text-center">
        <Layers size={24} className="mx-auto mb-1 text-[#88da1c]" />
        <p className="text-[10px] font-bold text-black">{option.name}</p>
        <p className="text-[7px] text-gray-500">Preview</p>
      </div>
    </div>
  );
};

// Full-width slide preview that mimics the actual lesson slide
const SlidePreview = ({
  option,
  slideContent,
  slideIndex
}: {
  option: ComponentOption;
  slideContent: SlideContent;
  slideIndex: number;
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg">
      {/* Actual slide mockup - full width, proper aspect ratio */}
      <div className="relative aspect-[16/9] bg-white flex flex-col">
        {/* Top bar - like actual lesson */}
        <div className="h-8 bg-black flex items-center justify-between px-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-white/60">Slide {slideIndex + 1}</span>
            <div className="flex gap-1 ml-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${i === slideIndex ? 'bg-[#88da1c]' : 'bg-white/30'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main slide content area */}
        <div className="flex-1 p-6 flex flex-col overflow-hidden">
          {/* Slide title */}
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold text-black leading-tight">{slideContent.title}</h2>
            {slideContent.subtitle && (
              <p className="text-xs text-[#88da1c] font-medium mt-1">{slideContent.subtitle}</p>
            )}
            <div className="w-12 h-0.5 bg-[#88da1c] mx-auto mt-2 rounded-full" />
          </div>

          {/* Body text if present */}
          {slideContent.body && (
            <p className="text-xs text-gray-600 text-center mb-4 max-w-md mx-auto">
              {slideContent.body}
            </p>
          )}

          {/* Component visualization area */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-lg h-full">
              <ComponentPreviewContent option={option} />
            </div>
          </div>
        </div>

        {/* Bottom navigation - like actual lesson */}
        <div className="h-12 bg-gray-50 border-t border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
          <button className="px-4 py-1.5 text-xs text-gray-500 bg-white border border-gray-200 rounded-lg">
            ← Back
          </button>
          <button className="px-4 py-1.5 text-xs text-black font-medium bg-[#88da1c] rounded-lg">
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function TestLessonCRMPage() {
  const [migrationStatus, setMigrationStatus] = useState<{ migrated: number; pending: number; total: number } | null>(null);
  const [isMigrating, setIsMigrating] = useState(false);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [savedData, setSavedData] = useState<SavedData>({ selections: {}, images: {} });
  const [imageInputs, setImageInputs] = useState<Record<string, string>>({});

  // Load saved data on mount
  useEffect(() => {
    const data = loadSavedData();
    setSavedData(data);
    setImageInputs(data.images);
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

  // Save image URL
  const saveImageUrl = (lessonSlug: string, slideIndex: number, url: string) => {
    const key = `${lessonSlug}-${slideIndex}`;
    const newImages = { ...savedData.images, [key]: url };
    const newData = { ...savedData, images: newImages };
    setSavedData(newData);
    setImageInputs({ ...imageInputs, [key]: url });
    saveSavedData(newData);
  };

  // Get saved image URL
  const getSavedImage = (lessonSlug: string, slideIndex: number): string => {
    return savedData.images[`${lessonSlug}-${slideIndex}`] || '';
  };

  // Select a component for a slide
  const selectComponent = (lessonSlug: string, slideIndex: number, componentId: string) => {
    const newSelections = {
      ...savedData.selections,
      [lessonSlug]: {
        ...savedData.selections[lessonSlug],
        [slideIndex]: componentId,
      },
    };
    const newData = { ...savedData, selections: newSelections };
    setSavedData(newData);
    saveSavedData(newData);
  };

  // Get selected component for a slide
  const getSelectedComponent = (lessonSlug: string, slideIndex: number): string | null => {
    return savedData.selections[lessonSlug]?.[slideIndex] || null;
  };

  // Check if lesson is complete
  const isLessonComplete = (lesson: LessonConfig): boolean => {
    const allComponentsSelected = lesson.componentSlots.every(slot =>
      getSelectedComponent(lesson.slug, slot.slideIndex) !== null
    );
    const allImagesUploaded = lesson.imagePrompts.every(img =>
      getSavedImage(lesson.slug, img.slideIndex) !== ''
    );
    return allComponentsSelected && (lesson.imagePrompts.length === 0 || allImagesUploaded);
  };

  // No DashboardLayout wrapper - direct rendering for testing
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="page-wrapper max-w-7xl mx-auto px-6 py-8">
        {/* Test Mode Banner */}
        <div className="bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-2 mb-6 flex items-center gap-2">
          <span className="text-yellow-700 font-medium">TEST MODE</span>
          <span className="text-yellow-600 text-sm">- Authentication bypassed for testing</span>
        </div>

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
              <p className="text-gray-500">Copywriting Lessons - Quick Redesign Mode</p>
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
            <div className="flex items-center gap-2 text-sm text-gray-500">
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
                        <Layers size={20} className="text-gray-400" />
                      )}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-black">{lesson.title}</h3>
                      <p className="text-sm text-gray-500">{lesson.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <ImageIcon size={14} className="text-[#EC4899]" />
                      <span>{lesson.imagePrompts.filter(img => getSavedImage(lesson.slug, img.slideIndex)).length}/{lesson.imagePrompts.length}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Layers size={14} className="text-[#3B82F6]" />
                      <span>{lesson.componentSlots.filter(slot => getSelectedComponent(lesson.slug, slot.slideIndex)).length}/{lesson.componentSlots.length}</span>
                    </div>
                    {expandedLesson === lesson.slug ? (
                      <ChevronDown size={20} className="text-gray-400" />
                    ) : (
                      <ChevronRight size={20} className="text-gray-400" />
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
                        {/* Image Prompts with Upload */}
                        {lesson.imagePrompts.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-black mb-4 flex items-center gap-2">
                              <ImageIcon size={18} className="text-[#EC4899]" />
                              Image Prompts
                            </h4>
                            <div className="space-y-4">
                              {lesson.imagePrompts.map((img, imgIdx) => {
                                const imageKey = `${lesson.slug}-${img.slideIndex}`;
                                const savedUrl = getSavedImage(lesson.slug, img.slideIndex);
                                return (
                                  <div
                                    key={imgIdx}
                                    className={`p-4 rounded-xl border ${
                                      img.background === 'black'
                                        ? 'bg-black/5 border-black/10'
                                        : 'bg-white border-black/10'
                                    }`}
                                  >
                                    <div className="flex items-start justify-between mb-3">
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
                                        {savedUrl && (
                                          <span className="px-2 py-1 text-xs font-medium bg-[#88da1c]/20 text-[#88da1c] rounded flex items-center gap-1">
                                            <Check size={12} /> Uploaded
                                          </span>
                                        )}
                                      </div>
                                      <button
                                        onClick={() => copyPrompt(img.prompt, imageKey)}
                                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-[#88da1c] text-black rounded-lg hover:bg-[#a3e635] transition-colors"
                                      >
                                        {copiedPrompt === imageKey ? (
                                          <>
                                            <Check size={14} />
                                            Copied!
                                          </>
                                        ) : (
                                          <>
                                            <Copy size={14} />
                                            Copy Prompt
                                          </>
                                        )}
                                      </button>
                                    </div>

                                    <p className="text-sm text-gray-500 mb-2">{img.context}</p>
                                    <p className="text-xs text-black/60 bg-black/5 p-3 rounded-lg font-mono mb-4">
                                      {img.prompt}
                                    </p>

                                    {/* Image URL Input */}
                                    <div className="flex gap-2">
                                      <div className="flex-1 relative">
                                        <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                          type="url"
                                          placeholder="Paste image URL here..."
                                          value={imageInputs[imageKey] || ''}
                                          onChange={(e) => setImageInputs({ ...imageInputs, [imageKey]: e.target.value })}
                                          className="w-full pl-10 pr-4 py-2 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-[#88da1c]"
                                        />
                                      </div>
                                      <button
                                        onClick={() => saveImageUrl(lesson.slug, img.slideIndex, imageInputs[imageKey] || '')}
                                        disabled={!imageInputs[imageKey]}
                                        className="flex items-center gap-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                      >
                                        <Upload size={16} />
                                        Save
                                      </button>
                                    </div>

                                    {/* Image Preview */}
                                    {savedUrl && (
                                      <div className="mt-3 relative">
                                        <img
                                          src={savedUrl}
                                          alt={`Slide ${img.slideIndex + 1}`}
                                          className="w-32 h-32 object-cover rounded-lg border border-black/10"
                                        />
                                        <button
                                          onClick={() => saveImageUrl(lesson.slug, img.slideIndex, '')}
                                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                        >
                                          <X size={14} />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Component Slots with Visual Previews */}
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
                                    {selectedId && (
                                      <span className="px-2 py-1 text-xs font-medium bg-[#88da1c]/20 text-[#88da1c] rounded flex items-center gap-1">
                                        <Check size={12} /> Selected
                                      </span>
                                    )}
                                  </div>

                                  {/* Three Options - Full-width slide previews */}
                                  <div className="space-y-4">
                                    {slot.options.map((option) => {
                                      const isSelected = selectedId === option.id;
                                      return (
                                        <div
                                          key={option.id}
                                          className={`rounded-xl border-2 overflow-hidden transition-all ${
                                            isSelected
                                              ? 'border-[#88da1c] ring-2 ring-[#88da1c]/20'
                                              : 'border-black/10 hover:border-[#88da1c]/50'
                                          }`}
                                        >
                                          {/* Option header with select button */}
                                          <div className={`flex items-center justify-between p-3 ${isSelected ? 'bg-[#88da1c]/10' : 'bg-gray-50'}`}>
                                            <div className="flex items-center gap-3">
                                              {isSelected && (
                                                <CheckCircle size={20} className="text-[#88da1c]" />
                                              )}
                                              <div>
                                                <h5 className="font-semibold text-black">{option.name}</h5>
                                                <p className="text-xs text-gray-500">{option.description}</p>
                                              </div>
                                            </div>
                                            <button
                                              onClick={() => selectComponent(lesson.slug, slot.slideIndex, option.id)}
                                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                isSelected
                                                  ? 'bg-[#88da1c] text-black'
                                                  : 'bg-black text-white hover:bg-black/80'
                                              }`}
                                            >
                                              {isSelected ? 'Selected ✓' : 'Select This'}
                                            </button>
                                          </div>

                                          {/* Full-width slide preview */}
                                          <div className="p-4 bg-gray-100">
                                            <SlidePreview
                                              option={option}
                                              slideContent={slot.slideContent}
                                              slideIndex={slot.slideIndex}
                                            />
                                          </div>
                                        </div>
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
      </div>
    </div>
  );
}
