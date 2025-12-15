'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileText,
  Trash2,
  Plus,
  GraduationCap,
  Save,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle,
  X,
  GripVertical,
} from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { supabase } from '@/lib/supabase';

interface Course {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  price: number;
  original_price: number | null;
  image_url: string | null;
  is_active: boolean;
}

interface CourseFile {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  file_path: string;
  file_size: number | null;
  order_index: number;
}

interface UploadingFile {
  file: File;
  title: string;
  description: string;
  progress: number;
  error?: string;
}

export default function AdminCoursesPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseFiles, setCourseFiles] = useState<CourseFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Admin email check (you can customize this)
  const ADMIN_EMAILS = ['admin@quantum-scale.co', 'your-email@example.com'];
  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    async function loadCourses() {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setCourses(data);
      }
      setIsLoading(false);
    }

    if (user) {
      loadCourses();
    }
  }, [user]);

  useEffect(() => {
    async function loadCourseFiles() {
      if (!selectedCourse) {
        setCourseFiles([]);
        return;
      }

      const { data, error } = await supabase
        .from('course_files')
        .select('*')
        .eq('course_id', selectedCourse.id)
        .order('order_index', { ascending: true });

      if (!error && data) {
        setCourseFiles(data);
      }
    }

    loadCourseFiles();
  }, [selectedCourse]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !selectedCourse) return;

    const newFiles: UploadingFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type === 'application/pdf') {
        newFiles.push({
          file,
          title: file.name.replace('.pdf', ''),
          description: '',
          progress: 0,
        });
      }
    }

    setUploadingFiles((prev) => [...prev, ...newFiles]);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const updateUploadingFile = (index: number, updates: Partial<UploadingFile>) => {
    setUploadingFiles((prev) => prev.map((f, i) => (i === index ? { ...f, ...updates } : f)));
  };

  const removeUploadingFile = (index: number) => {
    setUploadingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFile = async (uploadingFile: UploadingFile, index: number) => {
    if (!selectedCourse) return;

    const filePath = `${selectedCourse.slug}/${Date.now()}-${uploadingFile.file.name}`;

    try {
      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('course-files')
        .upload(filePath, uploadingFile.file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      updateUploadingFile(index, { progress: 50 });

      // Create database record
      const { error: dbError } = await supabase.from('course_files').insert({
        course_id: selectedCourse.id,
        title: uploadingFile.title,
        description: uploadingFile.description || null,
        file_path: filePath,
        file_size: uploadingFile.file.size,
        order_index: courseFiles.length + index,
      } as never);

      if (dbError) throw dbError;

      updateUploadingFile(index, { progress: 100 });

      // Refresh course files
      setTimeout(() => {
        removeUploadingFile(index);
        const { data } = supabase
          .from('course_files')
          .select('*')
          .eq('course_id', selectedCourse.id)
          .order('order_index', { ascending: true });

        data.then((result) => {
          if (result.data) {
            setCourseFiles(result.data);
          }
        });
      }, 1000);

      setMessage({ type: 'success', text: `${uploadingFile.title} uploaded successfully!` });
    } catch (error) {
      console.error('Upload error:', error);
      updateUploadingFile(index, { error: 'Upload failed. Please try again.' });
      setMessage({ type: 'error', text: 'Failed to upload file. Please try again.' });
    }
  };

  const uploadAllFiles = async () => {
    setIsSaving(true);
    for (let i = 0; i < uploadingFiles.length; i++) {
      if (!uploadingFiles[i].error && uploadingFiles[i].progress === 0) {
        await uploadFile(uploadingFiles[i], i);
      }
    }
    setIsSaving(false);
  };

  const deleteFile = async (file: CourseFile) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      // Delete from storage
      await supabase.storage.from('course-files').remove([file.file_path]);

      // Delete from database
      await supabase.from('course_files').delete().eq('id', file.id);

      setCourseFiles((prev) => prev.filter((f) => f.id !== file.id));
      setMessage({ type: 'success', text: 'File deleted successfully!' });
    } catch (error) {
      console.error('Delete error:', error);
      setMessage({ type: 'error', text: 'Failed to delete file.' });
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <DashboardLayout>
        <div className="page-wrapper">
          <div className="card text-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={40} className="text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Access Denied</h2>
            <p className="text-[var(--text-muted)]">
              You don&apos;t have permission to access this page.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Message Toast */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${
                message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}
            >
              {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              <span>{message.text}</span>
              <button onClick={() => setMessage(null)} className="ml-2">
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header"
        >
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1>Course Management</h1>
              <p className="mt-1">Upload and manage course PDF files</p>
            </div>
          </div>
        </motion.header>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Course List */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Courses</h2>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 size={24} className="animate-spin text-[var(--text-muted)]" />
                </div>
              ) : courses.length === 0 ? (
                <p className="text-[var(--text-muted)] text-center py-8">
                  No courses found. Run the database migration first.
                </p>
              ) : (
                <div className="space-y-2">
                  {courses.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => setSelectedCourse(course)}
                      className={`w-full text-left p-3 rounded-xl transition-colors ${
                        selectedCourse?.id === course.id
                          ? 'bg-[var(--primary)] text-white'
                          : 'hover:bg-[var(--bg-secondary)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <GraduationCap size={20} />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{course.title}</div>
                          <div
                            className={`text-xs ${
                              selectedCourse?.id === course.id
                                ? 'text-white/70'
                                : 'text-[var(--text-muted)]'
                            }`}
                          >
                            {course.slug}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* File Upload Area */}
          <div className="lg:col-span-2">
            {selectedCourse ? (
              <div className="space-y-6">
                {/* Course Info */}
                <div className="card">
                  <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {selectedCourse.title}
                  </h2>
                  <p className="text-[var(--text-muted)] text-sm">{selectedCourse.description}</p>
                </div>

                {/* Upload Area */}
                <div className="card">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4">Upload PDF Files</h3>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-[var(--border-light)] rounded-xl p-8 text-center hover:border-[var(--primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <Upload size={40} className="mx-auto mb-3 text-[var(--text-muted)]" />
                    <p className="font-medium text-[var(--text-primary)]">Click to upload PDFs</p>
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                      Select one or more PDF files
                    </p>
                  </button>

                  {/* Pending Uploads */}
                  {uploadingFiles.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <h4 className="font-medium text-[var(--text-primary)]">
                        Pending Uploads ({uploadingFiles.length})
                      </h4>
                      {uploadingFiles.map((file, index) => (
                        <div key={index} className="p-4 bg-[var(--bg-secondary)] rounded-xl">
                          <div className="flex items-start gap-4">
                            <FileText size={24} className="text-red-500 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <input
                                type="text"
                                value={file.title}
                                onChange={(e) => updateUploadingFile(index, { title: e.target.value })}
                                className="w-full font-medium bg-transparent border-b border-[var(--border-light)] focus:border-[var(--primary)] outline-none pb-1 mb-2"
                                placeholder="File title"
                              />
                              <input
                                type="text"
                                value={file.description}
                                onChange={(e) =>
                                  updateUploadingFile(index, { description: e.target.value })
                                }
                                className="w-full text-sm text-[var(--text-muted)] bg-transparent border-b border-[var(--border-light)] focus:border-[var(--primary)] outline-none pb-1"
                                placeholder="Description (optional)"
                              />
                              {file.progress > 0 && file.progress < 100 && (
                                <div className="mt-2 h-1 bg-[var(--border-light)] rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[var(--primary)] transition-all"
                                    style={{ width: `${file.progress}%` }}
                                  />
                                </div>
                              )}
                              {file.error && (
                                <p className="text-sm text-red-500 mt-2">{file.error}</p>
                              )}
                              {file.progress === 100 && (
                                <p className="text-sm text-green-500 mt-2 flex items-center gap-1">
                                  <CheckCircle size={14} /> Uploaded
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => removeUploadingFile(index)}
                              className="p-1 hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors"
                            >
                              <X size={18} className="text-[var(--text-muted)]" />
                            </button>
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={uploadAllFiles}
                        disabled={isSaving}
                        className="btn btn-primary w-full"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Save size={18} />
                            Upload All Files
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Existing Files */}
                <div className="card">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                    Course Files ({courseFiles.length})
                  </h3>

                  {courseFiles.length === 0 ? (
                    <p className="text-[var(--text-muted)] text-center py-8">
                      No files uploaded yet
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {courseFiles.map((file, index) => (
                        <div
                          key={file.id}
                          className="flex items-center gap-4 p-3 bg-[var(--bg-secondary)] rounded-xl"
                        >
                          <div className="text-[var(--text-muted)] cursor-grab">
                            <GripVertical size={20} />
                          </div>
                          <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                            <FileText size={20} className="text-red-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-[var(--text-primary)] truncate">
                              {file.title}
                            </div>
                            <div className="text-xs text-[var(--text-muted)]">
                              {file.file_size
                                ? `${(file.file_size / 1024 / 1024).toFixed(2)} MB`
                                : 'Unknown size'}
                            </div>
                          </div>
                          <button
                            onClick={() => deleteFile(file)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="card text-center py-16">
                <GraduationCap size={48} className="mx-auto mb-4 text-[var(--text-muted)]" />
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  Select a Course
                </h3>
                <p className="text-[var(--text-muted)]">
                  Choose a course from the list to manage its PDF files
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
