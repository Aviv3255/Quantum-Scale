'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  BookOpen,
  Gift,
  HelpCircle,
  Check,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Zap,
  Target,
  TrendingUp,
  Shield,
  ArrowRight,
  Heart,
  X,
  Lock,
  Clock,
  Award,
  Mail,
  Edit3,
  ArrowUp,
  DollarSign,
  Users,
  BarChart3,
  Percent,
  MousePointer,
  Eye,
  ShoppingBag,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getCourseBySlug } from '@/data/courses';

type TabType = 'content' | 'bonuses' | 'faq';

// ========== CLEAN CODE-GENERATED VISUALIZATIONS ==========

// Animated Counter Component
const AnimatedNumber = ({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Conversion Rate Comparison Visual
const ConversionComparison = () => (
  <div className="p-8 rounded-2xl bg-white border border-[#eee]">
    <h3 className="text-lg font-semibold text-[#111] mb-6 text-center">Average Conversion Rate Improvement</h3>
    <div className="flex items-end justify-center gap-12">
      {/* Before */}
      <div className="text-center">
        <div className="relative w-20 mx-auto mb-4">
          <div className="w-full bg-[#f0f0f0] rounded-t-lg" style={{ height: '80px' }} />
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-lg transition-all duration-1000"
            style={{ height: '28px', backgroundColor: '#ddd' }}
          />
        </div>
        <div className="text-2xl font-bold text-[#999]">0.89%</div>
        <div className="text-sm text-[#888] mt-1">Before</div>
      </div>

      {/* Arrow */}
      <div className="pb-16">
        <ArrowRight size={32} className="text-[#111]" />
      </div>

      {/* After */}
      <div className="text-center">
        <div className="relative w-20 mx-auto mb-4">
          <div className="w-full bg-[#f0f0f0] rounded-t-lg" style={{ height: '80px' }} />
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '80px' }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="absolute bottom-0 left-0 right-0 rounded-t-lg"
            style={{ backgroundColor: '#111' }}
          />
        </div>
        <div className="text-2xl font-bold text-[#111]">6.54%</div>
        <div className="text-sm text-[#888] mt-1">After</div>
      </div>
    </div>
    <div className="mt-6 text-center">
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-600 font-semibold">
        <ArrowUp size={16} />
        +635% Increase
      </span>
    </div>
  </div>
);

// Key Metrics Visual
const KeyMetricsVisual = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {[
      { icon: MousePointer, label: 'Click Rate', before: '2.1%', after: '8.7%', increase: '+314%' },
      { icon: ShoppingBag, label: 'Add to Cart', before: '3.2%', after: '12.4%', increase: '+288%' },
      { icon: DollarSign, label: 'AOV', before: '$47', after: '$89', increase: '+89%' },
      { icon: Users, label: 'Repeat Rate', before: '12%', after: '34%', increase: '+183%' },
    ].map((metric, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="p-6 rounded-xl bg-white border border-[#eee] text-center"
      >
        <div className="w-12 h-12 rounded-xl bg-[#f5f5f5] flex items-center justify-center mx-auto mb-4">
          <metric.icon size={24} className="text-[#111]" />
        </div>
        <div className="text-sm text-[#888] mb-2">{metric.label}</div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-sm text-[#bbb] line-through">{metric.before}</span>
          <ArrowRight size={14} className="text-[#ccc]" />
          <span className="text-lg font-bold text-[#111]">{metric.after}</span>
        </div>
        <span className="text-xs font-medium text-green-500">{metric.increase}</span>
      </motion.div>
    ))}
  </div>
);

// Progress Path Visual
const ProgressPathVisual = () => (
  <div className="p-8 rounded-2xl bg-white border border-[#eee]">
    <h3 className="text-lg font-semibold text-[#111] mb-8 text-center">Your Transformation Journey</h3>
    <div className="relative">
      {/* Connection Line */}
      <div className="absolute top-6 left-8 right-8 h-0.5 bg-[#eee]" />
      <motion.div
        initial={{ width: '0%' }}
        whileInView={{ width: '100%' }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="absolute top-6 left-8 h-0.5 bg-[#111]"
        style={{ maxWidth: 'calc(100% - 64px)' }}
      />

      <div className="flex justify-between relative">
        {[
          { step: 1, title: 'Learn', desc: 'Psychology frameworks' },
          { step: 2, title: 'Apply', desc: 'Implement strategies' },
          { step: 3, title: 'Optimize', desc: 'Test & refine' },
          { step: 4, title: 'Scale', desc: 'Grow revenue' },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#111] text-white flex items-center justify-center font-bold mb-3 relative z-10">
              {item.step}
            </div>
            <div className="text-sm font-semibold text-[#111]">{item.title}</div>
            <div className="text-xs text-[#888] text-center max-w-[80px]">{item.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

// Results Stats Visual
const ResultsStatsVisual = () => (
  <div className="grid md:grid-cols-3 gap-6">
    {[
      { value: 158, suffix: '%', label: 'Avg. Conversion Lift', desc: 'Across all students' },
      { value: 2.4, suffix: 'x', label: 'Revenue Increase', desc: 'Within 90 days' },
      { value: 50, prefix: '$', suffix: 'M+', label: 'Revenue Generated', desc: 'By our students' },
    ].map((stat, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        viewport={{ once: true }}
        className="p-8 rounded-2xl bg-[#111] text-center"
      >
        <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
          <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
        </div>
        <div className="text-white font-medium mb-1">{stat.label}</div>
        <div className="text-white/50 text-sm">{stat.desc}</div>
      </motion.div>
    ))}
  </div>
);

// Funnel Comparison Visual
const FunnelVisual = () => (
  <div className="p-8 rounded-2xl bg-white border border-[#eee]">
    <h3 className="text-lg font-semibold text-[#111] mb-6 text-center">Optimized Conversion Funnel</h3>
    <div className="max-w-md mx-auto space-y-2">
      {[
        { label: 'Visitors', width: '100%', value: '100%', color: '#f5f5f5' },
        { label: 'Engaged', width: '75%', value: '75%', color: '#e5e5e5' },
        { label: 'Add to Cart', width: '45%', value: '45%', color: '#d5d5d5' },
        { label: 'Checkout', width: '30%', value: '30%', color: '#333' },
        { label: 'Purchase', width: '22%', value: '22%', color: '#111' },
      ].map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4"
        >
          <div className="w-20 text-right text-sm text-[#888]">{step.label}</div>
          <div className="flex-1 h-10 bg-[#fafafa] rounded-lg overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: step.width }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="h-full rounded-lg flex items-center justify-end pr-3"
              style={{ backgroundColor: step.color }}
            >
              <span className={`text-sm font-medium ${index >= 3 ? 'text-white' : 'text-[#666]'}`}>
                {step.value}
              </span>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
    <p className="text-center text-sm text-[#888] mt-6">Industry average: 1-3% • With our methods: 15-25%</p>
  </div>
);

// ========== MAIN COMPONENT ==========

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showEmailChange, setShowEmailChange] = useState(false);
  const [customEmail, setCustomEmail] = useState('');

  const slug = params.slug as string;
  const course = getCourseBySlug(slug);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handlePurchase = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowCheckout(false);
    alert('Purchase successful! You now have access to this course.');
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!course) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <h3 className="text-xl font-medium text-[#111] mb-2">Course not found</h3>
            <p className="text-[#666] mb-6">The course you're looking for doesn't exist.</p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white"
              style={{ background: 'linear-gradient(150deg, #000 0%, #222 50%, #000 100%)' }}
            >
              Back to Courses
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const tabs = [
    { id: 'content' as TabType, label: "What's Inside", icon: BookOpen },
    { id: 'bonuses' as TabType, label: `Bonuses (${course.bonuses.length})`, icon: Gift },
    { id: 'faq' as TabType, label: 'FAQ', icon: HelpCircle },
  ];

  const totalBonusValue = course.bonuses.reduce((sum, b) => sum + b.value, 0);

  return (
    <DashboardLayout>
      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            onClick={() => !isProcessing && setShowCheckout(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-2xl overflow-hidden bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-[#eee]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#111]">Quick Checkout</h2>
                  {!isProcessing && (
                    <button onClick={() => setShowCheckout(false)} className="p-2 rounded-full hover:bg-[#f5f5f5]">
                      <X size={20} className="text-[#666]" />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#666]">
                  <Lock size={14} />
                  <span>Secure checkout powered by Stripe</span>
                </div>
              </div>

              <div className="p-6 border-b border-[#eee]">
                <div className="flex gap-4">
                  <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#f5f5f5]">
                    <Image src={course.image} alt={course.title} width={80} height={64} unoptimized className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#111] text-sm">{course.title}</h3>
                    <p className="text-xs text-[#666] mt-1">Instant digital access</p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-bold text-[#111]">${course.price}</span>
                      {course.originalPrice && <span className="text-xs line-through text-[#999]">${course.originalPrice}</span>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-b border-[#eee]">
                {!showEmailChange ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white bg-[#111]">
                        {(customEmail || user?.email)?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="font-medium text-[#111] text-sm">{customEmail || user?.email}</p>
                        <p className="text-xs text-[#666]">Course will be sent to this email</p>
                      </div>
                    </div>
                    <button onClick={() => setShowEmailChange(true)} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-[#f5f5f5] text-[#666]">
                      <Edit3 size={12} />
                      Change
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-[#111]">Send to a different email</p>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" size={16} />
                      <input
                        type="email"
                        value={customEmail}
                        onChange={(e) => setCustomEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="w-full h-11 pl-10 pr-4 rounded-lg text-sm border border-[#e5e5e5] focus:border-[#111] focus:outline-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setShowEmailChange(false)} className="flex-1 py-2 text-sm font-medium rounded-lg bg-[#111] text-white">Confirm</button>
                      <button onClick={() => { setCustomEmail(''); setShowEmailChange(false); }} className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-[#f5f5f5] text-[#666]">Cancel</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#666]">Total</span>
                  <span className="text-2xl font-bold text-[#111]">${course.price}</span>
                </div>
                <button
                  onClick={handlePurchase}
                  disabled={isProcessing}
                  className="w-full py-4 rounded-xl font-medium text-white flex items-center justify-center gap-2"
                  style={{ background: isProcessing ? '#666' : 'linear-gradient(150deg, #000 0%, #000 30%, #222 50%, #000 70%, #000 100%)' }}
                >
                  {isProcessing ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Processing...</>
                  ) : (
                    <><Lock size={18} />Complete Purchase</>
                  )}
                </button>
                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-[#888]">
                  <span>30-day guarantee</span><span>•</span><span>Instant access</span><span>•</span><span>Lifetime updates</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-width wrapper */}
      <div
        className="min-h-screen bg-white"
        style={{ margin: '-40px -48px', width: 'calc(100% + 96px)' }}
      >
        {/* Back Button */}
        <div className="w-full px-6 lg:px-10 pt-6">
          <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-[#666] hover:text-[#111] transition-colors">
            <ChevronLeft size={16} />
            Back to Courses
          </Link>
        </div>

        {/* Hero Section */}
        <div className="w-full mt-6">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Side - Full Width */}
            <div className="relative min-h-[400px] lg:min-h-[500px]">
              <Image
                src={course.heroImage || course.image}
                alt={course.title}
                fill
                unoptimized
                className="object-cover"
                priority
              />
            </div>

            {/* Info Side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
              <div className="flex items-start justify-between mb-4">
                {course.badge && (
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#111] text-white">
                    {course.badge}
                  </span>
                )}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-2 rounded-full hover:bg-[#f5f5f5] transition-colors"
                >
                  <Heart size={22} className={isWishlisted ? 'text-red-500' : 'text-[#ccc]'} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              <h1 className="text-2xl lg:text-4xl font-bold text-[#111] mb-3">{course.title}</h1>
              <p className="text-[#666] mb-6 leading-relaxed text-lg">{course.subtitle}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="px-4 py-2 rounded-xl bg-[#f5f5f5]">
                  <span className="text-lg font-bold text-[#111]">8</span>{' '}
                  <span className="text-sm text-[#666]">modules</span>
                </div>
                <div className="px-4 py-2 rounded-xl bg-[#f5f5f5]">
                  <span className="text-lg font-bold text-[#111]">6+</span>{' '}
                  <span className="text-sm text-[#666]">hours</span>
                </div>
                <div className="px-4 py-2 rounded-xl bg-[#f5f5f5]">
                  <span className="text-lg font-bold text-[#111]">50+</span>{' '}
                  <span className="text-sm text-[#666]">templates</span>
                </div>
              </div>

              {/* Bonuses Value */}
              <div className="flex items-center gap-2 p-4 rounded-xl bg-[#f5f5f5] mb-6">
                <Gift className="w-5 h-5 text-[#666]" />
                <span className="text-sm">
                  <strong className="text-[#111]">{course.bonuses.length} bonuses</strong>
                  <span className="text-[#666]"> worth ${totalBonusValue} included</span>
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-[#111]">${course.price}</span>
                {course.originalPrice && (
                  <>
                    <span className="text-xl line-through text-[#999]">${course.originalPrice}</span>
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-[#111] text-white">
                      Save {Math.round((1 - course.price / course.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setShowCheckout(true)}
                className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl font-medium text-white transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: 'linear-gradient(150deg, #000 0%, #000 30%, #222 50%, #000 70%, #000 100%)' }}
              >
                <ShoppingCart size={20} />
                Get Instant Access
              </button>

              <p className="text-xs text-center text-[#888] mt-3">
                30-day money-back guarantee • Instant access • Lifetime updates
              </p>
            </div>
          </div>
        </div>

        {/* Visual: Conversion Comparison */}
        <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">See The Difference</h2>
            <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">Real results from stores implementing these psychological frameworks</p>
            <ConversionComparison />
          </div>
        </div>

        {/* Visual: Key Metrics */}
        <div className="w-full py-16 px-6 lg:px-10 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">Key Metrics Improvement</h2>
            <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">Average improvements our students achieve</p>
            <KeyMetricsVisual />
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-[#111] mb-8 text-center">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(course.highlights || []).map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 p-5 rounded-xl bg-white border border-[#eee]"
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#111] flex-shrink-0 mt-0.5">
                    <Check size={14} className="text-white" />
                  </div>
                  <span className="text-[#333]">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* About This Course */}
        <div className="w-full py-16 px-6 lg:px-10 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#111] mb-6">About This Course</h2>
            <div className="text-[#444] whitespace-pre-line leading-relaxed text-lg">
              {course.longDescription}
            </div>
          </div>
        </div>

        {/* Visual: Progress Path */}
        <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
          <div className="max-w-4xl mx-auto">
            <ProgressPathVisual />
          </div>
        </div>

        {/* Visual: Results Stats */}
        <div className="w-full py-16 px-6 lg:px-10 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">Proven Results</h2>
            <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">Numbers that speak for themselves</p>
            <ResultsStatsVisual />
          </div>
        </div>

        {/* Visual: Funnel */}
        <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
          <div className="max-w-3xl mx-auto">
            <FunnelVisual />
          </div>
        </div>

        {/* Who This Is For */}
        <div className="w-full py-16 px-6 lg:px-10 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-[#111] mb-8 text-center">This Course Is Perfect For You If...</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Target, title: 'Boost Conversions', desc: 'You want to increase conversions without spending more on ads' },
                { icon: TrendingUp, title: 'Ready to Scale', desc: "You're ready to scale but need a proven system to follow" },
                { icon: Zap, title: 'Fast Results', desc: 'You want results fast without years of trial and error' },
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-xl text-center bg-[#fafafa] border border-[#eee]">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center bg-[#111]">
                    <item.icon size={28} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-[#111] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#666]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section - Dark Background with White Text */}
        <div className="w-full py-16 px-6 lg:px-10 bg-[#111]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap transition-all text-sm font-medium ${
                      isActive ? 'bg-white text-[#111]' : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
              {activeTab === 'content' && (
                <div className="space-y-3">
                  {course.modules.map((module, index) => (
                    <div key={index} className="rounded-xl p-5 bg-white/5 border border-white/10">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white text-[#111] font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-1">{module.title}</h3>
                          <p className="text-sm text-white/60">{module.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'bonuses' && (
                <div className="space-y-3">
                  {course.bonuses.map((bonus, index) => (
                    <div key={index} className="rounded-xl p-5 bg-white/5 border border-white/10">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white">
                            <Gift size={18} className="text-[#111]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white mb-1">{bonus.title}</h3>
                            <p className="text-sm text-white/60">{bonus.description}</p>
                          </div>
                        </div>
                        <div className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/10 text-white">
                          ${bonus.value} value
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-xl p-6 text-center mt-6 bg-white">
                    <p className="text-lg font-semibold text-[#111] mb-1">Total Bonus Value: ${totalBonusValue}</p>
                    <p className="text-sm text-[#666]">All included free with your purchase</p>
                  </div>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-3">
                  {course.faq.map((item, index) => (
                    <div key={index} className="rounded-xl overflow-hidden bg-white/5 border border-white/10">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full p-5 flex items-center justify-between text-left"
                      >
                        <span className="font-semibold text-white pr-4">{item.question}</span>
                        {expandedFaq === index ? (
                          <ChevronUp size={20} className="text-white/60 flex-shrink-0" />
                        ) : (
                          <ChevronDown size={20} className="text-white/60 flex-shrink-0" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="px-5 pb-5"
                          >
                            <p className="text-white/70">{item.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Final CTA Section - White Text */}
        <div className="w-full py-16 px-6 lg:px-10 bg-black">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Store?</h2>
            <p className="text-white/70 mb-8 text-lg">
              Get instant access to {course.modules.length} modules, {course.bonuses.length} bonuses worth ${totalBonusValue}, and start implementing today.
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-4xl font-bold text-white">${course.price}</span>
              {course.originalPrice && (
                <span className="text-xl line-through text-white/40">${course.originalPrice}</span>
              )}
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-medium transition-all hover:opacity-90 hover:scale-[1.02] bg-white text-[#111]"
            >
              <ShoppingCart size={20} />
              Get Instant Access
              <ArrowRight size={18} />
            </button>
            <p className="text-sm text-white/50 mt-4">30-day money-back guarantee • No questions asked</p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="w-full py-10 px-6 lg:px-10 bg-white">
          <div className="flex flex-wrap items-center justify-center gap-10 text-sm text-[#888]">
            <div className="flex items-center gap-2"><Shield size={20} /><span>Secure Checkout</span></div>
            <div className="flex items-center gap-2"><Clock size={20} /><span>Instant Access</span></div>
            <div className="flex items-center gap-2"><Award size={20} /><span>30-Day Guarantee</span></div>
            <div className="flex items-center gap-2"><Gift size={20} /><span>Lifetime Updates</span></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
