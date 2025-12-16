'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  FileText,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Loader2,
  Lock,
  AlertCircle,
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
} from '@/lib/course-access';
import { supabase } from '@/lib/supabase';
import CourseChecklist from '@/components/CourseChecklist';

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
}

function PDFViewer({ file, fileUrl, onClose }: PDFViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto bg-[#2a2a2a] p-4">
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
            {files.map((file, index) => (
              <motion.button
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => openFile(file)}
                disabled={loadingFile === file.id}
                className="w-full card card-hover flex items-center gap-4 text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[var(--text-primary)] truncate">
                    {file.title}
                  </h3>
                  {file.description && (
                    <p className="text-sm text-[var(--text-muted)] truncate">
                      {file.description}
                    </p>
                  )}
                  {file.file_size && (
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      {(file.file_size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  )}
                </div>
                {loadingFile === file.id ? (
                  <Loader2 size={20} className="animate-spin text-[var(--text-muted)]" />
                ) : (
                  <ChevronRight size={20} className="text-[var(--text-muted)]" />
                )}
              </motion.button>
            ))}
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
          />
        )}
      </AnimatePresence>

      {/* Course Checklist Panel */}
      <CourseChecklist
        courseSlug={resolvedParams.slug}
        userId={user?.id}
        isOpen={isChecklistOpen}
        onToggle={() => setIsChecklistOpen(!isChecklistOpen)}
      />
    </DashboardLayout>
  );
}
