'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  BookOpen,
  ArrowRight,
  Gift,
  Clock,
  Plus,
  ChevronDown,
  ChevronUp,
  Save,
  Trash2,
  FileCode,
  Link as LinkIcon,
  Type,
  Eye,
  X,
  Check,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getAllCourses } from '@/data/courses';

// Course Content Input Interface
interface CourseContentInput {
  id: string;
  courseName: string;
  mockupUrl: string;
  htmlBlocks: string;
  createdAt: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Course Content Input Form Component
const CourseContentInputForm = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [mockupUrl, setMockupUrl] = useState('');
  const [htmlBlocks, setHtmlBlocks] = useState('');
  const [savedContents, setSavedContents] = useState<CourseContentInput[]>([]);
  const [showSavedList, setShowSavedList] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load saved contents from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('courseContentInputs');
    if (saved) {
      setSavedContents(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    if (!courseName.trim()) {
      alert('Please enter a course name');
      return;
    }

    const newContent: CourseContentInput = {
      id: Date.now().toString(),
      courseName: courseName.trim(),
      mockupUrl: mockupUrl.trim(),
      htmlBlocks: htmlBlocks.trim(),
      createdAt: new Date().toISOString(),
    };

    const updated = [...savedContents, newContent];
    setSavedContents(updated);
    localStorage.setItem('courseContentInputs', JSON.stringify(updated));

    // Reset form
    setCourseName('');
    setMockupUrl('');
    setHtmlBlocks('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDelete = (id: string) => {
    const updated = savedContents.filter(c => c.id !== id);
    setSavedContents(updated);
    localStorage.setItem('courseContentInputs', JSON.stringify(updated));
  };

  const handleLoadContent = (content: CourseContentInput) => {
    setCourseName(content.courseName);
    setMockupUrl(content.mockupUrl);
    setHtmlBlocks(content.htmlBlocks);
    setShowSavedList(false);
  };

  return (
    <div className="w-full mb-8">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
        style={{
          backgroundColor: isExpanded ? '#7700fd' : '#f5f5f5',
          color: isExpanded ? '#ffffff' : '#666',
        }}
      >
        <Plus size={16} className={`transition-transform ${isExpanded ? 'rotate-45' : ''}`} />
        Course Content Input (Dev Tool)
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-6 rounded-2xl border border-[#eee] bg-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#111]">Add Course Content</h3>
                  <p className="text-sm text-[#666]">Enter course details and HTML blocks for building landing pages</p>
                </div>

                {/* Saved Contents Toggle */}
                <button
                  onClick={() => setShowSavedList(!showSavedList)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-[#f5f5f5] text-[#666] hover:bg-[#eee] transition-colors"
                >
                  <Eye size={14} />
                  Saved ({savedContents.length})
                </button>
              </div>

              {/* Saved Contents List */}
              <AnimatePresence>
                {showSavedList && savedContents.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mb-6 p-4 rounded-xl bg-[#fafafa] border border-[#eee]"
                  >
                    <h4 className="text-sm font-semibold text-[#111] mb-3">Saved Course Contents</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {savedContents.map(content => (
                        <div
                          key={content.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-white border border-[#eee]"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-[#111] truncate">{content.courseName}</p>
                            <p className="text-xs text-[#888]">
                              {new Date(content.createdAt).toLocaleDateString()} • {content.htmlBlocks.length} chars
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <button
                              onClick={() => handleLoadContent(content)}
                              className="p-2 rounded-lg hover:bg-[#f5f5f5] text-[#666]"
                              title="Load"
                            >
                              <FileCode size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(content.id)}
                              className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Course Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#333] mb-2">
                    <Type size={14} />
                    Course Name
                  </label>
                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="e.g., The Social Proof"
                    className="w-full px-4 py-3 rounded-xl border border-[#ddd] focus:border-[#7700fd] focus:outline-none text-sm"
                  />
                </div>

                {/* Mockup URL */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#333] mb-2">
                    <LinkIcon size={14} />
                    Mockup URL
                  </label>
                  <input
                    type="url"
                    value={mockupUrl}
                    onChange={(e) => setMockupUrl(e.target.value)}
                    placeholder="https://cdn.shopify.com/..."
                    className="w-full px-4 py-3 rounded-xl border border-[#ddd] focus:border-[#7700fd] focus:outline-none text-sm"
                  />
                </div>

                {/* HTML Blocks */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#333] mb-2">
                    <FileCode size={14} />
                    HTML Blocks (paste all your landing page HTML here)
                  </label>
                  <textarea
                    value={htmlBlocks}
                    onChange={(e) => setHtmlBlocks(e.target.value)}
                    placeholder="Paste all HTML blocks here... This will be stored and accessible for building the course layout."
                    className="w-full px-4 py-3 rounded-xl border border-[#ddd] focus:border-[#7700fd] focus:outline-none text-sm font-mono resize-y"
                    rows={12}
                  />
                  <p className="text-xs text-[#888] mt-2">
                    {htmlBlocks.length.toLocaleString()} characters
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => {
                      setCourseName('');
                      setMockupUrl('');
                      setHtmlBlocks('');
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#666] hover:bg-[#f5f5f5] transition-colors"
                  >
                    <X size={16} />
                    Clear
                  </button>

                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
                    style={{ backgroundColor: '#7700fd' }}
                  >
                    {saveSuccess ? (
                      <>
                        <Check size={16} />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Save Content
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Info Box */}
              <div className="mt-6 p-4 rounded-xl bg-[#f5f5f5] border border-[#eee]">
                <p className="text-sm text-[#666]">
                  <strong className="text-[#111]">How to use:</strong> Paste your course HTML blocks here and save.
                  The content will be stored in localStorage and accessible when building course layouts.
                  This saves Claude usage by keeping materials readily available.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function CoursesPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const courses = getAllCourses();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
        <div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      {/* Full-width wrapper - counteracts parent padding */}
      <div
        className="min-h-screen"
        style={{
          backgroundColor: '#ffffff',
          margin: '-40px -48px',
          width: 'calc(100% + 96px)',
        }}
      >
        {/* Full Width Header */}
        <div className="w-full px-6 lg:px-10 pt-8 pb-6">
          <h1 className="text-3xl font-bold text-[#111111] mb-2">Courses</h1>
          <p className="text-[#666666]">Premium frameworks to scale your eCommerce business</p>
        </div>

        {/* Course Content Input Form (Dev Tool) */}
        <div className="w-full px-6 lg:px-10">
          <CourseContentInputForm />
        </div>

        {/* Course Grid - Full Width */}
        <div className="w-full px-6 lg:px-10 pb-10">
          {courses.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {courses.map((course) => (
                <motion.div key={course.slug} variants={itemVariants}>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e5e5',
                    }}
                  >
                    {/* Image Section */}
                    <div
                      className="relative w-full flex items-center justify-center p-10"
                      style={{
                        backgroundColor: '#f8f8f8',
                        minHeight: '220px',
                      }}
                    >
                      {course.image ? (
                        <Image
                          src={course.image}
                          alt={course.title}
                          width={200}
                          height={160}
                          unoptimized
                          className="max-h-40 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                          style={{
                            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))',
                          }}
                        />
                      ) : (
                        <div className="w-24 h-32 bg-[#e5e5e5] rounded-lg flex items-center justify-center">
                          <BookOpen className="w-10 h-10 text-[#999999]" />
                        </div>
                      )}
                      {course.badge && (
                        <div
                          className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium"
                          style={{ backgroundColor: '#111111', color: '#ffffff' }}
                        >
                          {course.badge}
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      {/* Title */}
                      <h2 className="text-xl font-semibold text-[#111111] mb-2 group-hover:opacity-80 transition-opacity">
                        {course.title}
                      </h2>

                      {/* Subtitle */}
                      <p className="text-sm text-[#666666] mb-4 line-clamp-2">
                        {course.subtitle}
                      </p>

                      {/* Stats Row */}
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-[#888888]">
                        <div className="flex items-center gap-1.5">
                          <BookOpen size={14} />
                          <span>{course.stats[0]?.value} {course.stats[0]?.label}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} />
                          <span>{course.stats[1]?.value} {course.stats[1]?.label}</span>
                        </div>
                      </div>

                      {/* Bonuses indicator */}
                      {course.bonuses && course.bonuses.length > 0 && (
                        <div
                          className="flex items-center gap-2 mb-5 p-3 rounded-xl"
                          style={{ backgroundColor: '#f5f5f5' }}
                        >
                          <Gift className="w-4 h-4 text-[#666666]" />
                          <span className="text-xs text-[#666666]">
                            <strong className="text-[#111111]">{course.bonuses.length} bonuses</strong> worth ${course.bonuses.reduce((sum, b) => sum + b.value, 0)} included
                          </span>
                        </div>
                      )}

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between pt-5 border-t border-[#eeeeee]">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-[#111111]">
                            ${course.price}
                          </span>
                          {course.originalPrice && (
                            <span className="text-sm line-through text-[#999999]">
                              ${course.originalPrice}
                            </span>
                          )}
                        </div>

                        <div
                          className="flex items-center gap-1 text-sm font-medium transition-all duration-200 group-hover:gap-2"
                          style={{ color: '#111111' }}
                        >
                          View Course
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-[#f5f5f5]">
                <GraduationCap size={24} className="text-[#999999]" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-[#111111] mb-2">No courses available yet</h3>
              <p className="text-[#666666]">Check back soon for new learning materials</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
