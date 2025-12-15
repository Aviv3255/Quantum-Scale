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
  Trash2,
  FileCode,
  Link as LinkIcon,
  Type,
  X,
  Check,
  Copy,
  ExternalLink,
  Github,
  AlertCircle,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getAllCourses } from '@/data/courses';

// Course Content Input Interface (URL-based for token efficiency)
interface CourseContentInput {
  id: string;
  courseName: string;
  mockupUrl: string;
  htmlSourceUrl: string; // URL to fetch HTML from (GitHub Gist, etc.)
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

// Course Content Input Form Component - URL-based approach for token efficiency
const CourseContentInputForm = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [mockupUrl, setMockupUrl] = useState('');
  const [htmlSourceUrl, setHtmlSourceUrl] = useState('');
  const [savedCourses, setSavedCourses] = useState<CourseContentInput[]>([]);
  const [showSavedList, setShowSavedList] = useState(false);
  const [copied, setCopied] = useState(false);
  const [urlValidation, setUrlValidation] = useState<{
    mockup: 'idle' | 'checking' | 'valid' | 'invalid';
    html: 'idle' | 'checking' | 'valid' | 'invalid';
  }>({ mockup: 'idle', html: 'idle' });

  // Load saved courses from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('courseInputsUrlBased');
    if (saved) {
      try {
        setSavedCourses(JSON.parse(saved));
      } catch {
        console.error('Failed to parse saved courses');
      }
    }
  }, []);

  // Save to localStorage whenever savedCourses changes
  const saveCourses = (courses: CourseContentInput[]) => {
    setSavedCourses(courses);
    localStorage.setItem('courseInputsUrlBased', JSON.stringify(courses));
  };

  // Validate URL is accessible
  const validateUrl = async (url: string, type: 'mockup' | 'html') => {
    if (!url.trim()) {
      setUrlValidation((prev) => ({ ...prev, [type]: 'idle' }));
      return;
    }

    setUrlValidation((prev) => ({ ...prev, [type]: 'checking' }));

    try {
      // For GitHub Gist raw URLs, we just check the format
      if (url.includes('gist.githubusercontent.com') || url.includes('raw.githubusercontent.com')) {
        setUrlValidation((prev) => ({ ...prev, [type]: 'valid' }));
        return;
      }

      // For other URLs, check if they look valid
      const urlObj = new URL(url);
      if (urlObj.protocol === 'https:' || urlObj.protocol === 'http:') {
        setUrlValidation((prev) => ({ ...prev, [type]: 'valid' }));
      } else {
        setUrlValidation((prev) => ({ ...prev, [type]: 'invalid' }));
      }
    } catch {
      setUrlValidation((prev) => ({ ...prev, [type]: 'invalid' }));
    }
  };

  // Generate message for Claude
  const generateClaudeMessage = () => {
    if (!courseName.trim()) {
      alert('Please enter a course name');
      return '';
    }

    const lines = [`Course: ${courseName.trim()}`];

    if (mockupUrl.trim()) {
      lines.push(`Mockup: ${mockupUrl.trim()}`);
    }

    if (htmlSourceUrl.trim()) {
      lines.push(`HTML: ${htmlSourceUrl.trim()}`);
    }

    return lines.join('\n');
  };

  // Copy message for Claude
  const handleCopyForClaude = () => {
    const message = generateClaudeMessage();
    if (message) {
      navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Also save to local list
      const newCourse: CourseContentInput = {
        id: Date.now().toString(),
        courseName: courseName.trim(),
        mockupUrl: mockupUrl.trim(),
        htmlSourceUrl: htmlSourceUrl.trim(),
        createdAt: new Date().toISOString().split('T')[0],
      };
      saveCourses([...savedCourses, newCourse]);
    }
  };

  // Load a saved course
  const handleLoadCourse = (course: CourseContentInput) => {
    setCourseName(course.courseName);
    setMockupUrl(course.mockupUrl);
    setHtmlSourceUrl(course.htmlSourceUrl);
    setShowSavedList(false);
  };

  // Delete a saved course
  const handleDeleteCourse = (id: string) => {
    saveCourses(savedCourses.filter((c) => c.id !== id));
  };

  // Get validation icon
  const getValidationIcon = (status: 'idle' | 'checking' | 'valid' | 'invalid') => {
    switch (status) {
      case 'checking':
        return <Loader2 size={14} className="animate-spin text-[#888]" />;
      case 'valid':
        return <CheckCircle size={14} className="text-green-500" />;
      case 'invalid':
        return <AlertCircle size={14} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-8 w-full">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all"
        style={{
          backgroundColor: isExpanded ? '#7700fd' : '#f5f5f5',
          color: isExpanded ? '#ffffff' : '#666',
        }}
      >
        <Plus size={16} className={`transition-transform ${isExpanded ? 'rotate-45' : ''}`} />
        Add New Course (Token-Efficient)
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
            <div className="mt-4 rounded-2xl border border-[#eee] bg-white p-6">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[#111]">Add Course Content</h3>
                  <p className="text-sm text-[#666]">
                    Upload HTML to GitHub Gist, then paste the URL here
                  </p>
                </div>

                {/* Saved Courses Toggle */}
                {savedCourses.length > 0 && (
                  <button
                    onClick={() => setShowSavedList(!showSavedList)}
                    className="flex items-center gap-2 rounded-lg bg-[#f5f5f5] px-3 py-2 text-sm font-medium text-[#666] transition-colors hover:bg-[#eee]"
                  >
                    <FileCode size={14} />
                    History ({savedCourses.length})
                  </button>
                )}
              </div>

              {/* Saved Courses List */}
              <AnimatePresence>
                {showSavedList && savedCourses.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mb-6 rounded-xl border border-[#eee] bg-[#fafafa] p-4"
                  >
                    <h4 className="mb-3 text-sm font-semibold text-[#111]">Previous Courses</h4>
                    <div className="max-h-48 space-y-2 overflow-y-auto">
                      {savedCourses.map((course) => (
                        <div
                          key={course.id}
                          className="flex items-center justify-between rounded-lg border border-[#eee] bg-white p-3"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium text-[#111]">{course.courseName}</p>
                            <p className="text-xs text-[#888]">{course.createdAt}</p>
                          </div>
                          <div className="ml-4 flex items-center gap-2">
                            <button
                              onClick={() => handleLoadCourse(course)}
                              className="rounded-lg p-2 text-[#666] hover:bg-[#f5f5f5]"
                              title="Load"
                            >
                              <FileCode size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(course.id)}
                              className="rounded-lg p-2 text-red-500 hover:bg-red-50"
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

              {/* Step 1: GitHub Gist Instructions */}
              <div className="mb-6 rounded-xl border border-[#d0d7de] bg-gradient-to-r from-[#f6f8fa] to-[#f0f3f6] p-4">
                <div className="flex items-start gap-3">
                  <Github size={20} className="mt-0.5 text-[#24292f]" />
                  <div>
                    <h4 className="mb-2 font-semibold text-[#24292f]">
                      Step 1: Upload HTML to GitHub Gist
                    </h4>
                    <ol className="space-y-1.5 text-sm text-[#57606a]">
                      <li>
                        1. Go to{' '}
                        <a
                          href="https://gist.github.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#0969da] hover:underline"
                        >
                          gist.github.com <ExternalLink size={12} />
                        </a>
                      </li>
                      <li>2. Paste your HTML content</li>
                      <li>
                        3. Click <strong>"Create secret gist"</strong> (or public)
                      </li>
                      <li>
                        4. Click <strong>"Raw"</strong> button and copy the URL
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Step 2: Form Fields */}
              <div className="space-y-4">
                <h4 className="font-semibold text-[#111]">Step 2: Fill in the details</h4>

                {/* Course Name */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#333]">
                    <Type size={14} />
                    Course Name *
                  </label>
                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="e.g., Product Mapping Manipulation"
                    className="w-full rounded-xl border border-[#ddd] px-4 py-3 text-sm focus:border-[#7700fd] focus:outline-none"
                  />
                </div>

                {/* Mockup URL */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#333]">
                    <LinkIcon size={14} />
                    Mockup Image URL
                    {getValidationIcon(urlValidation.mockup)}
                  </label>
                  <input
                    type="url"
                    value={mockupUrl}
                    onChange={(e) => setMockupUrl(e.target.value)}
                    onBlur={() => validateUrl(mockupUrl, 'mockup')}
                    placeholder="https://cdn.shopify.com/... or https://quantum-scale.co/..."
                    className="w-full rounded-xl border border-[#ddd] px-4 py-3 text-sm focus:border-[#7700fd] focus:outline-none"
                  />
                </div>

                {/* HTML Source URL */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#333]">
                    <FileCode size={14} />
                    HTML Source URL (GitHub Gist Raw) *{getValidationIcon(urlValidation.html)}
                  </label>
                  <input
                    type="url"
                    value={htmlSourceUrl}
                    onChange={(e) => setHtmlSourceUrl(e.target.value)}
                    onBlur={() => validateUrl(htmlSourceUrl, 'html')}
                    placeholder="https://gist.githubusercontent.com/username/..."
                    className="w-full rounded-xl border border-[#ddd] px-4 py-3 font-mono text-sm focus:border-[#7700fd] focus:outline-none"
                  />
                  <p className="mt-2 text-xs text-[#888]">
                    Paste the <strong>Raw</strong> URL from your GitHub Gist
                  </p>
                </div>
              </div>

              {/* Step 3: Actions */}
              <div className="mt-6 border-t border-[#eee] pt-4">
                <h4 className="mb-4 font-semibold text-[#111]">Step 3: Copy and send to Claude</h4>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setCourseName('');
                      setMockupUrl('');
                      setHtmlSourceUrl('');
                      setUrlValidation({ mockup: 'idle', html: 'idle' });
                    }}
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-[#666] transition-colors hover:bg-[#f5f5f5]"
                  >
                    <X size={16} />
                    Clear
                  </button>

                  <button
                    onClick={handleCopyForClaude}
                    disabled={!courseName.trim()}
                    className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ backgroundColor: copied ? '#22c55e' : '#7700fd' }}
                  >
                    {copied ? (
                      <>
                        <Check size={16} />
                        Copied! Paste to Claude
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy for Claude
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Preview of what will be copied */}
              {courseName.trim() && (
                <div className="mt-4 rounded-xl bg-[#111] p-4 font-mono text-sm text-white">
                  <p className="mb-2 text-xs text-[#888]">Preview (what Claude will receive):</p>
                  <pre className="whitespace-pre-wrap text-green-400">
                    {generateClaudeMessage()}
                  </pre>
                </div>
              )}

              {/* Token Savings Info */}
              <div className="mt-6 rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="mt-0.5 text-green-600" />
                  <div>
                    <h4 className="mb-1 font-semibold text-green-800">Token Savings: ~99%</h4>
                    <p className="text-sm text-green-700">
                      Instead of pasting 50,000+ characters of HTML, you send ~200 characters.
                      Claude fetches the HTML directly from the URL when building your landing page.
                    </p>
                  </div>
                </div>
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
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent" />
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
        <div className="w-full px-6 pb-6 pt-8 lg:px-10">
          <h1 className="mb-2 text-3xl font-bold text-[#111111]">Courses</h1>
          <p className="text-[#666666]">Premium frameworks to scale your eCommerce business</p>
        </div>

        {/* Course Content Input Form (Dev Tool) */}
        <div className="w-full px-6 lg:px-10">
          <CourseContentInputForm />
        </div>

        {/* Course Grid - Full Width */}
        <div className="w-full px-6 pb-10 lg:px-10">
          {courses.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3"
            >
              {courses.map((course) => (
                <motion.div key={course.slug} variants={itemVariants}>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="group block overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e5e5',
                    }}
                  >
                    {/* Image Section */}
                    <div
                      className="relative flex w-full items-center justify-center p-10"
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
                        <div className="flex h-32 w-24 items-center justify-center rounded-lg bg-[#e5e5e5]">
                          <BookOpen className="h-10 w-10 text-[#999999]" />
                        </div>
                      )}
                      {course.badge && (
                        <div
                          className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-medium"
                          style={{ backgroundColor: '#111111', color: '#ffffff' }}
                        >
                          {course.badge}
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      {/* Title */}
                      <h2 className="mb-2 text-xl font-semibold text-[#111111] transition-opacity group-hover:opacity-80">
                        {course.title}
                      </h2>

                      {/* Subtitle */}
                      <p className="mb-4 line-clamp-2 text-sm text-[#666666]">{course.subtitle}</p>

                      {/* Stats Row */}
                      <div className="mb-4 flex flex-wrap gap-4 text-sm text-[#888888]">
                        <div className="flex items-center gap-1.5">
                          <BookOpen size={14} />
                          <span>
                            {course.stats[0]?.value} {course.stats[0]?.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} />
                          <span>
                            {course.stats[1]?.value} {course.stats[1]?.label}
                          </span>
                        </div>
                      </div>

                      {/* Bonuses indicator */}
                      {course.bonuses && course.bonuses.length > 0 && (
                        <div
                          className="mb-5 flex items-center gap-2 rounded-xl p-3"
                          style={{ backgroundColor: '#f5f5f5' }}
                        >
                          <Gift className="h-4 w-4 text-[#666666]" />
                          <span className="text-xs text-[#666666]">
                            <strong className="text-[#111111]">
                              {course.bonuses.length} bonuses
                            </strong>{' '}
                            worth ${course.bonuses.reduce((sum, b) => sum + b.value, 0)} included
                          </span>
                        </div>
                      )}

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between border-t border-[#eeeeee] pt-5">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-[#111111]">${course.price}</span>
                          {course.originalPrice && (
                            <span className="text-sm text-[#999999] line-through">
                              ${course.originalPrice}
                            </span>
                          )}
                        </div>

                        <div
                          className="flex items-center gap-1 text-sm font-medium transition-all duration-200 group-hover:gap-2"
                          style={{ color: '#111111' }}
                        >
                          View Course
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f5f5]">
                <GraduationCap size={24} className="text-[#999999]" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-lg font-medium text-[#111111]">No courses available yet</h3>
              <p className="text-[#666666]">Check back soon for new learning materials</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
