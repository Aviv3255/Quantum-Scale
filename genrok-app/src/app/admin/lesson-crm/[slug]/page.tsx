'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Layers,
  BarChart3,
  Image as ImageIcon,
  CheckCircle,
  Clock,
  PlayCircle,
  Copy,
  Check,
  Plus,
  X,
  Eye,
  Sparkles,
  Palette,
  Save,
  Rocket,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { lessonMeta } from '@/data/lessons';
import { getAllComponents, LESSON_COMPONENTS } from '@/components/lessons';

// Types
interface LessonCRMData {
  status: 'pending' | 'in_progress' | 'complete';
  components: { componentId: string; slideIndex: number }[];
  images: { slideIndex: number; type: string; prompt: string; url?: string }[];
  colorMigrated: boolean;
}

interface CRMState {
  lessons: Record<string, LessonCRMData>;
  componentUsage: Record<string, number>;
}

// Image prompt templates
const PROMPT_TEMPLATES: Record<string, { white: string; black: string }> = {
  concept: {
    white: `Professional minimalist illustration on pure white (#FFFFFF) background. {DESCRIPTION}. Clean vector style, no text, sophisticated business aesthetic. High contrast, sharp edges. 1024x1024.`,
    black: `Professional illustration on pure black (#000000) background. {DESCRIPTION}. Elegant glowing elements, premium SaaS aesthetic. Subtle gradients, high contrast. 1024x1024.`,
  },
  experiment: {
    white: `Scientific experiment visualization on pure white background. {DESCRIPTION}. Clean laboratory aesthetic, data visualization style. Professional, editorial quality. 1024x1024.`,
    black: `Scientific experiment on black background. {DESCRIPTION}. Glowing data points, futuristic research aesthetic. 1024x1024.`,
  },
  metaphor: {
    white: `Visual metaphor on white background. {DESCRIPTION}. Simple, powerful conceptual imagery. Editorial illustration style. 1024x1024.`,
    black: `Visual metaphor on black background. {DESCRIPTION}. Dramatic lighting, abstract conceptual style. 1024x1024.`,
  },
  diagram: {
    white: `Clean process diagram on white background. {DESCRIPTION}. Infographic style, professional business aesthetic. 1024x1024.`,
    black: `Process diagram on black background. {DESCRIPTION}. Neon accents, tech aesthetic. 1024x1024.`,
  },
};

// Category config for components
const CATEGORY_LABELS: Record<string, string> = {
  slides: 'Fixed Slides',
  content: 'Content',
  chartsBasic: 'Basic Charts',
  chartsStatistical: 'Statistical',
  chartsHierarchical: 'Hierarchical',
  chartsNetwork: 'Network/Relations',
  chartsKPI: 'KPI & Progress',
  chartsSpecialty: 'Specialty',
  chartsBusiness: 'Business/Process',
  chartsStrategic: 'Strategic',
  data: 'Data/Stats',
  comparison: 'Comparison',
  sequential: 'Sequential',
  emphasis: 'Emphasis',
};

// Load/save CRM state
const loadCRMState = (): CRMState => {
  if (typeof window === 'undefined') return { lessons: {}, componentUsage: {} };
  try {
    const saved = localStorage.getItem('lesson-crm-state');
    return saved ? JSON.parse(saved) : { lessons: {}, componentUsage: {} };
  } catch {
    return { lessons: {}, componentUsage: {} };
  }
};

const saveCRMState = (state: CRMState) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('lesson-crm-state', JSON.stringify(state));
};

export default function LessonEditorPage() {
  const params = useParams();
  const slug = params.slug as string;
  const meta = lessonMeta[slug];

  const [crmState, setCRMState] = useState<CRMState>({ lessons: {}, componentUsage: {} });
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState<number | null>(null);
  const [showComponentPicker, setShowComponentPicker] = useState(false);
  const [showImagePrompt, setShowImagePrompt] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageType, setImageType] = useState<'concept' | 'experiment' | 'metaphor' | 'diagram'>('concept');
  const [imageBg, setImageBg] = useState<'white' | 'black'>('white');
  const [applying, setApplying] = useState(false);

  // Load state on mount
  useEffect(() => {
    setCRMState(loadCRMState());
    setIsLoaded(true);
  }, []);

  // Save state on change
  useEffect(() => {
    if (isLoaded) {
      saveCRMState(crmState);
    }
  }, [crmState, isLoaded]);

  // Get current lesson data
  const lessonData = useMemo((): LessonCRMData => {
    return crmState.lessons[slug] || {
      status: 'pending',
      components: [],
      images: [],
      colorMigrated: false,
    };
  }, [crmState, slug]);

  // Get all components with usage counts
  const allComponents = useMemo(() => {
    const components: { id: string; name: string; category: string; usage: number }[] = [];
    Object.entries(LESSON_COMPONENTS).forEach(([category, comps]) => {
      (comps as { id: string; name: string; category: string; description: string }[]).forEach(comp => {
        components.push({
          id: comp.id,
          name: comp.name,
          category,
          usage: crmState.componentUsage[comp.id] || 0,
        });
      });
    });
    // Sort by usage (lowest first for diversity)
    return components.sort((a, b) => a.usage - b.usage);
  }, [crmState.componentUsage]);

  // Suggested components (low usage)
  const suggestedComponents = useMemo(() => {
    return allComponents.filter(c => c.usage < 3).slice(0, 12);
  }, [allComponents]);

  // Update lesson data
  const updateLessonData = (updates: Partial<LessonCRMData>) => {
    setCRMState(prev => ({
      ...prev,
      lessons: {
        ...prev.lessons,
        [slug]: { ...lessonData, ...updates },
      },
    }));
  };

  // Add component to lesson
  const addComponent = (componentId: string) => {
    if (selectedSlide === null) return;
    if (lessonData.components.length >= 3) return;

    // Add to lesson
    const newComponents = [
      ...lessonData.components,
      { componentId, slideIndex: selectedSlide },
    ];
    updateLessonData({ components: newComponents, status: 'in_progress' });

    // Update global usage count
    setCRMState(prev => ({
      ...prev,
      componentUsage: {
        ...prev.componentUsage,
        [componentId]: (prev.componentUsage[componentId] || 0) + 1,
      },
    }));

    setShowComponentPicker(false);
  };

  // Remove component from lesson
  const removeComponent = (index: number) => {
    const removed = lessonData.components[index];
    const newComponents = lessonData.components.filter((_, i) => i !== index);
    updateLessonData({ components: newComponents });

    // Decrease global usage count
    if (removed) {
      setCRMState(prev => ({
        ...prev,
        componentUsage: {
          ...prev.componentUsage,
          [removed.componentId]: Math.max(0, (prev.componentUsage[removed.componentId] || 0) - 1),
        },
      }));
    }
  };

  // Generate image prompt
  const generatePrompt = () => {
    const template = PROMPT_TEMPLATES[imageType][imageBg];
    const description = `Illustration for "${meta?.title || slug}" lesson about ${meta?.description || 'business concepts'}`;
    return template.replace('{DESCRIPTION}', description);
  };

  // Copy prompt to clipboard
  const copyPrompt = async () => {
    await navigator.clipboard.writeText(generatePrompt());
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // Add image to lesson
  const addImage = () => {
    if (selectedSlide === null || !imageUrl) return;
    if (lessonData.images.filter(i => i.url).length >= 2) return;

    const newImages = [
      ...lessonData.images,
      { slideIndex: selectedSlide, type: imageType, prompt: generatePrompt(), url: imageUrl },
    ];
    updateLessonData({ images: newImages, status: 'in_progress' });
    setImageUrl('');
    setShowImagePrompt(false);
  };

  // Mark color as migrated
  const toggleColorMigrated = () => {
    updateLessonData({ colorMigrated: !lessonData.colorMigrated, status: 'in_progress' });
  };

  // Mark as complete
  const markComplete = () => {
    updateLessonData({ status: 'complete' });
  };

  // Apply changes via API
  const applyChanges = async () => {
    setApplying(true);
    try {
      const response = await fetch('/api/admin/lesson-crm/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          changes: {
            components: lessonData.components,
            images: lessonData.images.filter(i => i.url),
            migrateColor: !lessonData.colorMigrated,
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Mark color as migrated after successful apply
        updateLessonData({ colorMigrated: true });
        alert(`Success! ${result.appliedChanges.length} changes applied.\n\nChanges:\n${result.appliedChanges.join('\n')}`);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert(`Failed to apply changes: ${error}`);
    } finally {
      setApplying(false);
    }
  };

  if (!meta) {
    return (
      <DashboardLayout>
        <div className="page-wrapper">
          <div className="text-center py-12">
            <h2 className="text-xl font-bold text-black mb-2">Lesson not found</h2>
            <p className="text-[var(--text-muted)] mb-4">No lesson with slug "{slug}"</p>
            <Link href="/admin/lesson-crm" className="text-[#88da1c] hover:underline">
              Back to CRM
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link
            href="/admin/lesson-crm"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-black mb-4"
          >
            <ArrowLeft size={16} />
            Back to CRM
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#88da1c] to-[#6BB516] flex items-center justify-center">
                <Layers size={28} className="text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black">{meta.title}</h1>
                <p className="text-[var(--text-muted)]">{meta.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/lessons/${slug}/lesson.html`}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-xl hover:bg-black/5 transition-colors"
              >
                <Eye size={18} />
                Preview
                <ExternalLink size={14} />
              </Link>
              <button
                onClick={applyChanges}
                disabled={applying}
                className="flex items-center gap-2 px-4 py-2 bg-[#88da1c] text-black rounded-xl hover:bg-[#7bc918] transition-colors disabled:opacity-50"
              >
                {applying ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                      <Rocket size={18} />
                    </motion.div>
                    Applying...
                  </>
                ) : (
                  <>
                    <Rocket size={18} />
                    Apply Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Slides & Status */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-2xl border border-black/5 p-6"
            >
              <h3 className="font-semibold text-black mb-4">Status</h3>
              <div className="space-y-3">
                {/* Status Select */}
                <select
                  value={lessonData.status}
                  onChange={(e) => updateLessonData({ status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-black/10 rounded-xl text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="complete">Complete</option>
                </select>

                {/* Color Migration */}
                <button
                  onClick={toggleColorMigrated}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${
                    lessonData.colorMigrated
                      ? 'border-[#88da1c] bg-[#88da1c]/10'
                      : 'border-black/10 hover:border-black/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Palette size={18} className={lessonData.colorMigrated ? 'text-[#88da1c]' : 'text-[var(--text-muted)]'} />
                    <span className="text-sm font-medium">Color Palette Updated</span>
                  </div>
                  {lessonData.colorMigrated && <CheckCircle size={18} className="text-[#88da1c]" />}
                </button>
              </div>
            </motion.div>

            {/* Slide Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-black/5 p-6"
            >
              <h3 className="font-semibold text-black mb-4">Select Slide to Edit</h3>
              <p className="text-xs text-[var(--text-muted)] mb-4">
                Click a slide number to add components or images to that slide
              </p>
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 15 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSlide(i + 1)}
                    className={`aspect-square rounded-lg border text-sm font-medium transition-all ${
                      selectedSlide === i + 1
                        ? 'border-[#88da1c] bg-[#88da1c] text-black'
                        : 'border-black/10 hover:border-[#88da1c]/50 text-[var(--text-muted)]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              {selectedSlide && (
                <p className="text-sm text-[#88da1c] mt-4 font-medium">
                  Slide {selectedSlide} selected
                </p>
              )}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl border border-black/5 p-6"
            >
              <h3 className="font-semibold text-black mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => selectedSlide && setShowComponentPicker(true)}
                  disabled={!selectedSlide || lessonData.components.length >= 3}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-black/10 hover:border-[#88da1c]/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <BarChart3 size={18} className="text-[#3B82F6]" />
                  <span className="text-sm font-medium">Add Component ({lessonData.components.length}/3)</span>
                </button>
                <button
                  onClick={() => selectedSlide && setShowImagePrompt(true)}
                  disabled={!selectedSlide || lessonData.images.filter(i => i.url).length >= 2}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-black/10 hover:border-[#88da1c]/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ImageIcon size={18} className="text-[#EC4899]" />
                  <span className="text-sm font-medium">Add Image ({lessonData.images.filter(i => i.url).length}/2)</span>
                </button>
                <button
                  onClick={markComplete}
                  disabled={lessonData.status === 'complete'}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 hover:border-[#22C55E]/50 transition-colors disabled:opacity-50"
                >
                  <CheckCircle size={18} className="text-[#22C55E]" />
                  <span className="text-sm font-medium text-[#22C55E]">Mark as Complete</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Components & Images */}
          <div className="lg:col-span-2 space-y-6">
            {/* Added Components */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-black/5 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-black">Components ({lessonData.components.length}/3)</h3>
                <span className="text-xs text-[var(--text-muted)]">1-3 per lesson, diversified</span>
              </div>
              {lessonData.components.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-black/10 rounded-xl">
                  <BarChart3 size={32} className="mx-auto text-[var(--text-muted)] mb-2" />
                  <p className="text-sm text-[var(--text-muted)]">No components added yet</p>
                  <p className="text-xs text-[var(--text-muted)]">Select a slide, then click "Add Component"</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {lessonData.components.map((comp, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-4 py-3 bg-black/5 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center">
                          <BarChart3 size={16} className="text-[#3B82F6]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-black">{comp.componentId}</p>
                          <p className="text-xs text-[var(--text-muted)]">Slide {comp.slideIndex}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeComponent(i)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <X size={16} className="text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Added Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-2xl border border-black/5 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-black">Images ({lessonData.images.filter(i => i.url).length}/2)</h3>
                <span className="text-xs text-[var(--text-muted)]">0-2 per lesson</span>
              </div>
              {lessonData.images.filter(i => i.url).length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-black/10 rounded-xl">
                  <ImageIcon size={32} className="mx-auto text-[var(--text-muted)] mb-2" />
                  <p className="text-sm text-[var(--text-muted)]">No images added yet</p>
                  <p className="text-xs text-[var(--text-muted)]">Select a slide, then click "Add Image"</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {lessonData.images.filter(i => i.url).map((img, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={img.url}
                        alt={`Slide ${img.slideIndex} image`}
                        className="w-full aspect-video object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                        <p className="text-white text-sm font-medium">Slide {img.slideIndex}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Suggested Components */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-black/5 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-[#F59E0B]" />
                <h3 className="font-semibold text-black">Suggested Components</h3>
                <span className="text-xs text-[var(--text-muted)]">(Low usage = High diversity)</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {suggestedComponents.slice(0, 8).map(comp => (
                  <button
                    key={comp.id}
                    onClick={() => {
                      if (selectedSlide && lessonData.components.length < 3) {
                        addComponent(comp.id);
                      }
                    }}
                    disabled={!selectedSlide || lessonData.components.length >= 3}
                    className="p-3 rounded-xl border border-black/10 hover:border-[#88da1c]/50 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <p className="text-sm font-medium text-black truncate">{comp.id}</p>
                    <p className="text-xs text-[var(--text-muted)]">Used {comp.usage}x</p>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Component Picker Modal */}
        {showComponentPicker && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-black">Select Component for Slide {selectedSlide}</h2>
                <button onClick={() => setShowComponentPicker(false)} className="p-2 hover:bg-black/5 rounded-lg">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-6">
                {Object.entries(LESSON_COMPONENTS).map(([category, comps]) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-[var(--text-muted)] mb-3">
                      {CATEGORY_LABELS[category] || category}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {(comps as { id: string; name: string; category: string; description: string }[]).map(comp => {
                        const usage = crmState.componentUsage[comp.id] || 0;
                        return (
                          <button
                            key={comp.id}
                            onClick={() => addComponent(comp.id)}
                            className="p-3 rounded-xl border border-black/10 hover:border-[#88da1c] hover:bg-[#88da1c]/5 transition-all text-left"
                          >
                            <p className="text-sm font-medium text-black truncate">{comp.name}</p>
                            <p className={`text-xs ${usage < 3 ? 'text-[#22C55E]' : 'text-[var(--text-muted)]'}`}>
                              {usage === 0 ? '✨ Never used' : `Used ${usage}x`}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Image Prompt Modal */}
        {showImagePrompt && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-black">Generate Image for Slide {selectedSlide}</h2>
                <button onClick={() => setShowImagePrompt(false)} className="p-2 hover:bg-black/5 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              {/* Image Type */}
              <div className="mb-4">
                <label className="text-sm font-medium text-black mb-2 block">Image Type</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['concept', 'experiment', 'metaphor', 'diagram'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setImageType(type)}
                      className={`px-3 py-2 rounded-lg border text-sm capitalize transition-colors ${
                        imageType === type
                          ? 'border-[#88da1c] bg-[#88da1c]/10 text-black'
                          : 'border-black/10 text-[var(--text-muted)]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Color */}
              <div className="mb-4">
                <label className="text-sm font-medium text-black mb-2 block">Background</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setImageBg('white')}
                    className={`flex-1 px-3 py-2 rounded-lg border text-sm transition-colors ${
                      imageBg === 'white'
                        ? 'border-[#88da1c] bg-white text-black'
                        : 'border-black/10 text-[var(--text-muted)]'
                    }`}
                  >
                    White (#FFFFFF)
                  </button>
                  <button
                    onClick={() => setImageBg('black')}
                    className={`flex-1 px-3 py-2 rounded-lg border text-sm transition-colors ${
                      imageBg === 'black'
                        ? 'border-[#88da1c] bg-black text-white'
                        : 'border-black/10 text-[var(--text-muted)]'
                    }`}
                  >
                    Black (#000000)
                  </button>
                </div>
              </div>

              {/* Generated Prompt */}
              <div className="mb-4">
                <label className="text-sm font-medium text-black mb-2 block">Generated Prompt</label>
                <div className="relative">
                  <textarea
                    readOnly
                    value={generatePrompt()}
                    className="w-full h-32 px-4 py-3 border border-black/10 rounded-xl text-sm resize-none bg-black/5"
                  />
                  <button
                    onClick={copyPrompt}
                    className="absolute top-2 right-2 px-3 py-1.5 bg-black text-white rounded-lg text-xs flex items-center gap-1.5 hover:bg-black/80 transition-colors"
                  >
                    {copiedPrompt ? <Check size={14} /> : <Copy size={14} />}
                    {copiedPrompt ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-2">
                  Copy this prompt and paste it into ChatGPT/DALL-E to generate the image
                </p>
              </div>

              {/* Image URL Input */}
              <div className="mb-6">
                <label className="text-sm font-medium text-black mb-2 block">Image URL (after generation)</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-[#88da1c]"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowImagePrompt(false)}
                  className="px-4 py-2 border border-black/10 rounded-xl text-sm hover:bg-black/5"
                >
                  Cancel
                </button>
                <button
                  onClick={addImage}
                  disabled={!imageUrl}
                  className="px-4 py-2 bg-[#88da1c] text-black rounded-xl text-sm font-medium hover:bg-[#7bc918] disabled:opacity-50"
                >
                  Add Image
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
