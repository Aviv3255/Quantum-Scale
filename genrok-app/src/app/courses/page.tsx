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
import { useCartStore } from '@/store/cart';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getAllCourses } from '@/data/courses';
import { ShoppingCart, Trash2 as TrashIcon, X as CloseIcon, Lock } from 'lucide-react';

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
      setUrlValidation(prev => ({ ...prev, [type]: 'idle' }));
      return;
    }

    setUrlValidation(prev => ({ ...prev, [type]: 'checking' }));

    try {
      // For GitHub Gist raw URLs, we just check the format
      if (url.includes('gist.githubusercontent.com') || url.includes('raw.githubusercontent.com')) {
        setUrlValidation(prev => ({ ...prev, [type]: 'valid' }));
        return;
      }

      // For other URLs, check if they look valid
      const urlObj = new URL(url);
      if (urlObj.protocol === 'https:' || urlObj.protocol === 'http:') {
        setUrlValidation(prev => ({ ...prev, [type]: 'valid' }));
      } else {
        setUrlValidation(prev => ({ ...prev, [type]: 'invalid' }));
      }
    } catch {
      setUrlValidation(prev => ({ ...prev, [type]: 'invalid' }));
    }
  };

  // Generate message for Claude
  const generateClaudeMessage = () => {
    if (!courseName.trim()) {
      alert('Please enter a course name');
      return '';
    }

    const lines = [
      `Course: ${courseName.trim()}`,
    ];

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
    saveCourses(savedCourses.filter(c => c.id !== id));
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
            <div className="mt-4 p-6 rounded-2xl border border-[#eee] bg-white">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#111]">Add Course Content</h3>
                  <p className="text-sm text-[#666]">Upload HTML to GitHub Gist, then paste the URL here</p>
                </div>

                {/* Saved Courses Toggle */}
                {savedCourses.length > 0 && (
                  <button
                    onClick={() => setShowSavedList(!showSavedList)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-[#f5f5f5] text-[#666] hover:bg-[#eee] transition-colors"
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
                    className="mb-6 p-4 rounded-xl bg-[#fafafa] border border-[#eee]"
                  >
                    <h4 className="text-sm font-semibold text-[#111] mb-3">Previous Courses</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {savedCourses.map(course => (
                        <div
                          key={course.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-white border border-[#eee]"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-[#111] truncate">{course.courseName}</p>
                            <p className="text-xs text-[#888]">{course.createdAt}</p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <button
                              onClick={() => handleLoadCourse(course)}
                              className="p-2 rounded-lg hover:bg-[#f5f5f5] text-[#666]"
                              title="Load"
                            >
                              <FileCode size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(course.id)}
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

              {/* Step 1: GitHub Gist Instructions */}
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-[#f6f8fa] to-[#f0f3f6] border border-[#d0d7de]">
                <div className="flex items-start gap-3">
                  <Github size={20} className="text-[#24292f] mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#24292f] mb-2">Step 1: Upload HTML to GitHub Gist</h4>
                    <ol className="text-sm text-[#57606a] space-y-1.5">
                      <li>1. Go to <a href="https://gist.github.com" target="_blank" rel="noopener noreferrer" className="text-[#0969da] hover:underline inline-flex items-center gap-1">gist.github.com <ExternalLink size={12} /></a></li>
                      <li>2. Paste your HTML content</li>
                      <li>3. Click <strong>"Create secret gist"</strong> (or public)</li>
                      <li>4. Click <strong>"Raw"</strong> button and copy the URL</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Step 2: Form Fields */}
              <div className="space-y-4">
                <h4 className="font-semibold text-[#111]">Step 2: Fill in the details</h4>

                {/* Course Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#333] mb-2">
                    <Type size={14} />
                    Course Name *
                  </label>
                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="e.g., Product Mapping Manipulation"
                    className="w-full px-4 py-3 rounded-xl border border-[#ddd] focus:border-[#7700fd] focus:outline-none text-sm"
                  />
                </div>

                {/* Mockup URL */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#333] mb-2">
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
                    className="w-full px-4 py-3 rounded-xl border border-[#ddd] focus:border-[#7700fd] focus:outline-none text-sm"
                  />
                </div>

                {/* HTML Source URL */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#333] mb-2">
                    <FileCode size={14} />
                    HTML Source URL (GitHub Gist Raw) *
                    {getValidationIcon(urlValidation.html)}
                  </label>
                  <input
                    type="url"
                    value={htmlSourceUrl}
                    onChange={(e) => setHtmlSourceUrl(e.target.value)}
                    onBlur={() => validateUrl(htmlSourceUrl, 'html')}
                    placeholder="https://gist.githubusercontent.com/username/..."
                    className="w-full px-4 py-3 rounded-xl border border-[#ddd] focus:border-[#7700fd] focus:outline-none text-sm font-mono"
                  />
                  <p className="text-xs text-[#888] mt-2">
                    Paste the <strong>Raw</strong> URL from your GitHub Gist
                  </p>
                </div>
              </div>

              {/* Step 3: Actions */}
              <div className="mt-6 pt-4 border-t border-[#eee]">
                <h4 className="font-semibold text-[#111] mb-4">Step 3: Copy and send to Claude</h4>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setCourseName('');
                      setMockupUrl('');
                      setHtmlSourceUrl('');
                      setUrlValidation({ mockup: 'idle', html: 'idle' });
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#666] hover:bg-[#f5f5f5] transition-colors"
                  >
                    <X size={16} />
                    Clear
                  </button>

                  <button
                    onClick={handleCopyForClaude}
                    disabled={!courseName.trim()}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <div className="mt-4 p-4 rounded-xl bg-[#111] text-white font-mono text-sm">
                  <p className="text-[#888] text-xs mb-2">Preview (what Claude will receive):</p>
                  <pre className="whitespace-pre-wrap text-green-400">
{generateClaudeMessage()}
                  </pre>
                </div>
              )}

              {/* Token Savings Info */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-800 mb-1">Token Savings: ~99%</h4>
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

// Cart Sidebar Component
const CartSidebar = () => {
  const { items, isOpen, closeCart, removeItem, getTotal, getOriginalTotal, clearCart } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsCheckingOut(false);
    clearCart();
    closeCart();
    alert('Purchase successful! You now have access to all courses in your cart.');
  };

  const savings = getOriginalTotal() - getTotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#eee]">
              <div className="flex items-center gap-3">
                <ShoppingCart size={24} className="text-[#111]" />
                <h2 className="text-xl font-bold text-[#111]">Your Cart</h2>
                <span className="px-2 py-1 rounded-full bg-[#111] text-white text-xs font-medium">
                  {items.length}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-[#f5f5f5] transition-colors"
              >
                <CloseIcon size={20} className="text-[#666]" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={48} className="text-[#ddd] mx-auto mb-4" />
                  <p className="text-[#666]">Your cart is empty</p>
                  <button
                    onClick={closeCart}
                    className="mt-4 text-sm font-medium text-[#111] underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.slug}
                      className="flex gap-4 p-4 rounded-xl bg-[#fafafa] border border-[#eee]"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0 flex items-center justify-center">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={80}
                          height={80}
                          unoptimized
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#111] text-sm truncate">{item.title}</h3>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="font-bold text-[#111]">${item.price}</span>
                          {item.originalPrice && (
                            <span className="text-xs line-through text-[#999]">${item.originalPrice}</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.slug)}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-500 self-start"
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#eee] bg-[#fafafa]">
                {savings > 0 && (
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className="text-[#666]">You're saving</span>
                    <span className="font-semibold text-green-600">${savings}</span>
                  </div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#666]">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[#111]">${getTotal()}</span>
                    {savings > 0 && (
                      <span className="block text-xs line-through text-[#999]">${getOriginalTotal()}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 rounded-xl font-medium text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
                  style={{
                    background: isCheckingOut
                      ? '#666'
                      : 'linear-gradient(150deg, #000 0%, #000 30%, #3a3a3a 50%, #000 70%, #000 100%)',
                  }}
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      Checkout - ${getTotal()}
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-4 mt-3 text-xs text-[#888]">
                  <span>30-day guarantee</span>
                  <span>•</span>
                  <span>Instant access</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Floating Cart Button
const FloatingCartButton = () => {
  const { openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  if (itemCount === 0) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      onClick={openCart}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 rounded-full text-white font-medium shadow-lg hover:scale-105 transition-transform"
      style={{ background: 'linear-gradient(150deg, #000 0%, #3a3a3a 50%, #000 100%)' }}
    >
      <ShoppingCart size={20} />
      <span>Cart ({itemCount})</span>
    </motion.button>
  );
};

// Cart Header Button - Clean button at top of page
const CartHeaderButton = () => {
  const { openCart, getItemCount, getTotal } = useCartStore();
  const itemCount = getItemCount();
  const total = getTotal();

  if (itemCount === 0) return null;

  return (
    <button
      onClick={openCart}
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-[#e5e5e5] bg-white hover:border-[#111] transition-colors"
    >
      <ShoppingCart size={18} className="text-[#111]" />
      <span className="text-sm font-medium text-[#111]">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
      <span className="text-sm font-bold text-[#111]">${total}</span>
    </button>
  );
};

export default function CoursesPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const { addItem, isInCart, openCart } = useCartStore();
  const courses = getAllCourses();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleAddToCart = (e: React.MouseEvent, course: typeof courses[0]) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCart(course.slug)) {
      openCart();
    } else {
      addItem({
        slug: course.slug,
        title: course.title,
        price: course.price,
        originalPrice: course.originalPrice,
        image: course.image,
      });
      openCart();
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
        <div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Floating Cart Button */}
      <FloatingCartButton />

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
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#111111] mb-2">Courses</h1>
              <p className="text-[#666666]">Premium frameworks to scale your eCommerce business</p>
            </div>
            {/* Cart Button */}
            <CartHeaderButton />
          </div>
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
                  <div
                    className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e5e5',
                    }}
                  >
                    {/* Image Section - Link to course */}
                    <Link href={`/courses/${course.slug}`}>
                      <div
                        className="relative w-full flex items-center justify-center"
                        style={{
                          backgroundColor: '#ffffff',
                          height: '280px',
                        }}
                      >
                        {course.image ? (
                          <Image
                            src={course.image}
                            alt={course.title}
                            fill
                            unoptimized
                            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
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
                    </Link>

                    {/* Content Section */}
                    <div className="p-6">
                      {/* Title - Link to course */}
                      <Link href={`/courses/${course.slug}`}>
                        <h2 className="text-xl font-semibold text-[#111111] mb-2 group-hover:opacity-80 transition-opacity">
                          {course.title}
                        </h2>
                      </Link>

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

                        {/* Add to Cart Button */}
                        <button
                          onClick={(e) => handleAddToCart(e, course)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
                          style={{
                            background: isInCart(course.slug)
                              ? '#22c55e'
                              : 'linear-gradient(150deg, #000 0%, #3a3a3a 50%, #000 100%)',
                            color: '#ffffff',
                          }}
                        >
                          {isInCart(course.slug) ? (
                            <>
                              <Check size={16} />
                              In Cart
                            </>
                          ) : (
                            <>
                              <Plus size={16} />
                              Add to Cart
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
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
