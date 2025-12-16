'use client';

import React, { useEffect, useState, use, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  FileText,
  ChevronRight,
  ChevronLeft,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Loader2,
  Lock,
  AlertCircle,
  ListChecks,
  CheckCircle2,
  Circle,
  ChevronDown,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  hasPurchasedCourse,
  getCourseFiles,
  getFileUrl,
  logFileAccess,
  CourseFile,
  getFileProgress,
  saveFileProgress,
  FileProgress,
} from '@/lib/course-access';
import { supabase } from '@/lib/supabase';
import CourseChecklist from '@/components/CourseChecklist';
import { useChecklist } from '@/hooks/useChecklist';

interface CourseData {
  id: string;
  slug: string;
  title: string;
  description: string | null;
}

interface PDFViewerProps {
  file: CourseFile;
  fileUrl: string;
  onClose: () => void;
  courseSlug: string;
  userId?: string;
  courseId?: string;
  onProgressUpdate?: (fileId: string, progress: number) => void;
}

function PDFViewer({ file, fileUrl, onClose, courseSlug, userId, courseId, onProgressUpdate }: PDFViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(true);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { items, isLoading: checklistLoading, progress, toggleItem, isItemCompleted, resetProgress } =
    useChecklist(courseSlug, userId);

  // Track scroll progress
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll > 0) {
        const progressPercent = Math.round((scrollTop / maxScroll) * 100);
        setScrollProgress(progressPercent);

        // Save progress (debounced - only save when user stops scrolling)
        if (userId && courseId) {
          saveFileProgress(userId, courseId, file.id, progressPercent);
          onProgressUpdate?.(file.id, progressPercent);
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [userId, courseId, file.id, onProgressUpdate]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleExpand = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex flex-col"
      style={{ marginLeft: 'var(--sidebar-width, 260px)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[#1a1a1a] border-b border-[#333]">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#333] transition-colors text-white"
          >
            <X size={20} />
          </button>
          <div>
            <h3 className="text-white font-medium">{file.title}</h3>
            {file.description && (
              <p className="text-sm text-gray-400">{file.description}</p>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg hover:bg-[#333] transition-colors text-white"
            disabled={zoom <= 50}
          >
            <ZoomOut size={20} />
          </button>
          <span className="text-white text-sm min-w-[60px] text-center">{zoom}%</span>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg hover:bg-[#333] transition-colors text-white"
            disabled={zoom >= 200}
          >
            <ZoomIn size={20} />
          </button>
          <div className="w-px h-6 bg-[#333] mx-2" />
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-[#333] transition-colors text-white"
          >
            <Maximize2 size={20} />
          </button>
          <div className="w-px h-6 bg-[#333] mx-2" />
          <button
            onClick={() => setIsChecklistOpen(!isChecklistOpen)}
            className={`p-2 rounded-lg transition-colors text-white flex items-center gap-2 ${
              isChecklistOpen ? 'bg-[#333]' : 'hover:bg-[#333]'
            }`}
          >
            <ListChecks size={20} />
            <span className="text-sm">{progress}%</span>
          </button>
        </div>
      </div>

      {/* Main Content Area with PDF and Checklist */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* PDF Content */}
        <div ref={scrollContainerRef} className="flex-1 overflow-auto bg-[#2a2a2a] p-4">
          <div
            className="mx-auto transition-transform duration-200"
            style={{
              width: `${zoom}%`,
              maxWidth: `${zoom * 10}px`,
            }}
          >
            <iframe
              src={`${fileUrl}#toolbar=0&navpanes=0`}
              className="w-full bg-white rounded-lg shadow-2xl"
              style={{
                height: 'calc(100vh - 120px)',
                border: 'none',
              }}
              title={file.title}
            />
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#333]">
          <div
            className="w-full bg-green-500 transition-all duration-150"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>

        {/* Checklist Panel */}
        <AnimatePresence mode="wait">
          {isChecklistOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col bg-white border-l border-[#333] overflow-hidden"
            >
              {/* Checklist Header */}
              <div className="p-4 border-b border-[#eee] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ListChecks size={20} className="text-[var(--primary)]" />
                  <span className="font-semibold text-[var(--text-primary)]">Checklist</span>
                </div>
                <button
                  onClick={() => setIsChecklistOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <ChevronRight size={18} className="text-[var(--text-muted)]" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="px-4 py-3 border-b border-[#eee]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[var(--text-muted)]">Progress</span>
                  <span className="text-sm font-bold text-[var(--primary)]">{progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #000 0%, #333 100%)' }}
                  />
                </div>
              </div>

              {/* Checklist Items */}
              <div className="flex-1 overflow-y-auto p-3">
                {checklistLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : items.length === 0 ? (
                  <div className="text-center py-8 text-[var(--text-muted)] text-sm">
                    No checklist items
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {(() => {
                      let taskNumber = 0;
                      return items.map((item, index) => {
                        // Category header - simple text header
                        if (item.isCategory) {
                          return (
                            <div
                              key={item.id}
                              className={`${index > 0 ? 'mt-6 pt-4 border-t border-[#e5e5e5]' : ''}`}
                            >
                              <h4 className="text-xs font-semibold text-[#222]">
                                {item.title}:
                              </h4>
                            </div>
                          );
                        }

                        // Regular task item
                        taskNumber++;
                        const currentTaskNumber = taskNumber;
                        const isCompleted = isItemCompleted(item.id);

                        return (
                          <div
                            key={item.id}
                            className={`rounded-lg border transition-all ${
                              isCompleted
                                ? 'border-green-200 bg-green-50'
                                : 'border-[#eee] bg-white hover:border-[#ddd]'
                            }`}
                          >
                            <div className="flex items-start gap-2.5 p-3">
                              <button
                                onClick={() => toggleItem(item.id)}
                                className="mt-0.5 flex-shrink-0"
                              >
                                {isCompleted ? (
                                  <CheckCircle2 size={20} className="text-green-500" />
                                ) : (
                                  <Circle
                                    size={20}
                                    className="text-[#ccc] hover:text-[#999] transition-colors"
                                  />
                                )}
                              </button>
                              <div className="min-w-0 flex-1">
                                <span
                                  className={`text-sm font-medium leading-snug block ${
                                    isCompleted
                                      ? 'text-green-700 line-through'
                                      : 'text-[var(--text-primary)]'
                                  }`}
                                >
                                  {currentTaskNumber}. {item.title}
                                </span>

                                {/* Description */}
                                {item.description && (
                                  <p className={`mt-1 text-xs ${isCompleted ? 'text-green-600' : 'text-[var(--text-muted)]'}`}>
                                    {item.description}
                                  </p>
                                )}

                                {/* Link Button - Always visible */}
                                {item.link && (
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-[var(--primary)] px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-80"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <ExternalLink size={12} />
                                    {item.linkText || 'Open Link'}
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                )}
              </div>

              {/* Reset Footer */}
              <div className="p-3 border-t border-[#eee]">
                {showResetConfirm ? (
                  <div className="flex items-center gap-2">
                    <span className="flex-1 text-xs text-[var(--text-muted)]">Reset?</span>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="px-2 py-1 text-xs rounded bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-2 py-1 text-xs rounded bg-red-500 text-white"
                    >
                      Reset
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <RotateCcw size={14} />
                    Reset Progress
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed Checklist Toggle */}
        {!isChecklistOpen && (
          <button
            onClick={() => setIsChecklistOpen(true)}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[var(--primary)] text-white p-2 rounded-l-lg shadow-lg hover:bg-[#333] transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function CourseViewerPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const [course, setCourse] = useState<CourseData | null>(null);
  const [files, setFiles] = useState<CourseFile[]>([]);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<CourseFile | null>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [loadingFile, setLoadingFile] = useState<string | null>(null);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [fileProgressMap, setFileProgressMap] = useState<Record<string, FileProgress>>({});

  // Get checklist progress for displaying in course header
  const { progress: checklistProgress, items: checklistItems, completedItems } = useChecklist(
    resolvedParams.slug,
    user?.id
  );

  // Handle file progress updates from PDF viewer
  const handleProgressUpdate = useCallback((fileId: string, progress: number) => {
    setFileProgressMap((prev) => ({
      ...prev,
      [fileId]: {
        ...prev[fileId],
        file_id: fileId,
        progress,
        last_accessed: new Date().toISOString(),
      },
    }));
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    async function loadCourseData() {
      if (!user?.id) return;

      // Check if user has purchased this course
      const purchased = await hasPurchasedCourse(user.id, resolvedParams.slug);
      setHasAccess(purchased);

      if (purchased) {
        // Get course data
        const { data: courseData } = await supabase
          .from('courses')
          .select('*')
          .eq('slug', resolvedParams.slug)
          .single();

        const typedCourseData = courseData as CourseData | null;
        if (typedCourseData) {
          setCourse(typedCourseData);

          // Get course files
          const courseFiles = await getCourseFiles(typedCourseData.id);
          setFiles(courseFiles);

          // Load file progress
          const progressData = await getFileProgress(user.id, typedCourseData.id);
          setFileProgressMap(progressData);
        }
      }

      setIsLoading(false);
    }

    if (user?.id) {
      loadCourseData();
    }
  }, [user?.id, resolvedParams.slug]);

  const openFile = async (file: CourseFile) => {
    if (!user?.id || !course?.id) return;

    setLoadingFile(file.id);

    // Get signed URL
    const url = await getFileUrl(file.file_path);
    if (url) {
      // Log file access
      await logFileAccess(user.id, course.id, file.id);

      setSelectedFile(file);
      setSelectedFileUrl(url);
    }

    setLoadingFile(null);
  };

  const closeViewer = () => {
    setSelectedFile(null);
    setSelectedFileUrl(null);
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="page-wrapper">
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-[var(--text-muted)]" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (hasAccess === false) {
    return (
      <DashboardLayout>
        <div className="page-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-center py-16 max-w-lg mx-auto"
          >
            <div className="w-20 h-20 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-6">
              <Lock size={40} className="text-red-500" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Access Denied
            </h2>
            <p className="text-[var(--text-muted)] mb-6">
              You don&apos;t have access to this course. Please purchase it to access the content.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/my-courses"
                className="btn bg-[var(--bg-secondary)] text-[var(--text-primary)]"
              >
                <ArrowLeft size={18} />
                My Courses
              </Link>
              <Link
                href={`/courses/${resolvedParams.slug}`}
                className="btn btn-primary"
              >
                View Course
              </Link>
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Back Navigation */}
        <Link
          href="/my-courses"
          className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          Back to My Courses
        </Link>

        {/* Course Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header"
        >
          <h1>{course?.title || 'Course'}</h1>
          {course?.description && <p className="mt-2">{course.description}</p>}
        </motion.header>

        {/* Checklist Progress Card */}
        {checklistItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card mb-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center">
                  <ListChecks size={20} className="text-[var(--primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">Course Checklist</h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    {completedItems.length} of {checklistItems.length} tasks completed
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-[var(--primary)]">{checklistProgress}%</span>
                <button
                  onClick={() => setIsChecklistOpen(true)}
                  className="btn btn-primary text-sm py-2"
                >
                  View Checklist
                </button>
              </div>
            </div>
            <div className="h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${checklistProgress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #000 0%, #333 100%)' }}
              />
            </div>
          </motion.div>
        )}

        {/* Files List */}
        {files.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-center py-12"
          >
            <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              No files available yet
            </h3>
            <p className="text-[var(--text-muted)]">
              Course files will appear here once they are uploaded.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Course Files ({files.length})
            </h2>
            {files.map((file, index) => {
              const fileProgress = fileProgressMap[file.id];
              const hasProgress = fileProgress && fileProgress.progress > 0;

              return (
                <motion.button
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => openFile(file)}
                  disabled={loadingFile === file.id}
                  className="w-full card card-hover flex items-center gap-4 text-left relative overflow-hidden"
                >
                  {/* Progress background */}
                  {hasProgress && (
                    <div
                      className="absolute inset-y-0 left-0 bg-green-50 transition-all duration-300"
                      style={{ width: `${fileProgress.progress}%` }}
                    />
                  )}

                  <div className="relative flex items-center gap-4 w-full">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        hasProgress && fileProgress.progress === 100
                          ? 'bg-green-100'
                          : hasProgress
                            ? 'bg-blue-100'
                            : 'bg-red-100'
                      }`}
                    >
                      {hasProgress && fileProgress.progress === 100 ? (
                        <CheckCircle2 size={24} className="text-green-500" />
                      ) : (
                        <FileText
                          size={24}
                          className={hasProgress ? 'text-blue-500' : 'text-red-500'}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-[var(--text-primary)] truncate">
                          {file.title}
                        </h3>
                        {hasProgress && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              fileProgress.progress === 100
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {fileProgress.progress === 100 ? 'Completed' : `${fileProgress.progress}%`}
                          </span>
                        )}
                      </div>
                      {file.description && (
                        <p className="text-sm text-[var(--text-muted)] truncate">
                          {file.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-1">
                        {file.file_size && (
                          <span className="text-xs text-[var(--text-muted)]">
                            {(file.file_size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        )}
                        {hasProgress && fileProgress.last_accessed && (
                          <span className="text-xs text-[var(--text-muted)]">
                            Last read: {new Date(fileProgress.last_accessed).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    {loadingFile === file.id ? (
                      <Loader2 size={20} className="animate-spin text-[var(--text-muted)]" />
                    ) : (
                      <ChevronRight size={20} className="text-[var(--text-muted)]" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {selectedFile && selectedFileUrl && (
          <PDFViewer
            file={selectedFile}
            fileUrl={selectedFileUrl}
            onClose={closeViewer}
            courseSlug={resolvedParams.slug}
            userId={user?.id}
            courseId={course?.id}
            onProgressUpdate={handleProgressUpdate}
          />
        )}
      </AnimatePresence>

      {/* Course Checklist Panel (shown when not viewing PDF) */}
      {!selectedFile && (
        <CourseChecklist
          courseSlug={resolvedParams.slug}
          userId={user?.id}
          isOpen={isChecklistOpen}
          onToggle={() => setIsChecklistOpen(!isChecklistOpen)}
        />
      )}
    </DashboardLayout>
  );
}
