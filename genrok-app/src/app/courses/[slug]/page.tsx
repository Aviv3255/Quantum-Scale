'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
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
  MousePointer,
  ShoppingBag,
  RefreshCw,
  Repeat,
  Calculator,
  AlertTriangle,
  CheckCircle,
  Send,
  BarChart2,
  Inbox,
  UserCheck,
  Brain,
  Eye,
  Sparkles,
  ThumbsUp,
  Star,
  MessageCircle,
  Trophy,
  FileText,
  Plus,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { useCartStore, CartItem } from '@/store/cart';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getCourseBySlug, getAllCourses, Course } from '@/data/courses';
import RawHTMLRenderer from '@/components/RawHTMLRenderer';
import { getCourseHTML } from '@/data/course-html-blocks';
import { getStoredHTMLBlock } from '@/lib/html-blocks';

type TabType = 'content' | 'bonuses' | 'faq';

// ========== SHARED COMPONENTS ==========

// Get Access Bar - Shown at top of landing page
interface GetAccessBarProps {
  price: number;
  originalPrice?: number;
  onCheckout: () => void;
}

const GetAccessBar = ({ onCheckout }: GetAccessBarProps) => (
  <div className="w-full bg-white border-b border-[#eee] py-4 px-6 lg:px-10 sticky top-0 z-40">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Gift size={20} className="text-green-600" />
        <span className="text-xl font-bold text-green-600">FREE</span>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
          100% Free Access
        </span>
      </div>
      <button
        onClick={onCheckout}
        className="flex items-center justify-center gap-2 py-3 px-8 rounded-xl font-medium text-white transition-all hover:opacity-90 hover:scale-[1.02]"
        style={{ background: 'linear-gradient(150deg, #000 0%, #000 30%, #3a3a3a 50%, #000 70%, #000 100%)' }}
      >
        <Plus size={18} />
        Add to My Courses
      </button>
    </div>
  </div>
);

// Sticky Cart - Shown at bottom of landing page
interface StickyCartProps {
  title: string;
  price: number;
  originalPrice?: number;
  onCheckout: () => void;
}

const StickyCart = ({ title, onCheckout }: StickyCartProps) => (
  <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#eee] shadow-lg py-4 px-6" style={{ marginLeft: 'var(--sidebar-width, 260px)' }}>
    <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#111] truncate">{title}</p>
        <div className="flex items-center gap-2 mt-1">
          <Gift size={16} className="text-green-600" />
          <span className="text-lg font-bold text-green-600">FREE</span>
        </div>
      </div>
      <button
        onClick={onCheckout}
        className="flex items-center justify-center gap-2 py-3 px-8 rounded-xl font-medium text-white transition-all hover:opacity-90 hover:scale-[1.02] flex-shrink-0"
        style={{ background: 'linear-gradient(150deg, #000 0%, #000 30%, #3a3a3a 50%, #000 70%, #000 100%)' }}
      >
        <Plus size={18} />
        Add to My Courses
      </button>
    </div>
  </div>
);

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

// ========== SUBCONSCIOUS TRAP VISUALIZATIONS ==========

const SubconsciousTrapVisuals = () => (
  <>
    {/* Hero Stats Banner */}
    <div className="w-full py-20 px-6 lg:px-10 bg-gradient-to-br from-[#111] via-[#1a1a1a] to-[#111] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4">PROVEN RESULTS</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">The Psychology Advantage</h2>
          <p className="text-white/60 max-w-lg mx-auto">What happens when you apply subconscious triggers</p>
        </motion.div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { value: '635%', label: 'Conversion Increase', icon: TrendingUp },
            { value: '314%', label: 'Click Rate Boost', icon: MousePointer },
            { value: '288%', label: 'Add to Cart Lift', icon: ShoppingBag },
            { value: '89%', label: 'AOV Growth', icon: DollarSign },
          ].map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
              <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center hover:bg-white/10 transition-all">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={28} className="text-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">+{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Before/After Transformation */}
    <div className="w-full py-20 px-6 lg:px-10 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#111] mb-3">Conversion Rate Transformation</h2>
          <p className="text-[#666]">Real results from applying psychological triggers</p>
        </motion.div>
        <div className="p-10 rounded-3xl bg-gradient-to-br from-[#fafafa] to-white border border-[#eee] shadow-sm">
          <div className="flex items-center justify-center gap-8 lg:gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="56" fill="none" stroke="#f0f0f0" strokeWidth="12" />
                  <circle cx="64" cy="64" r="56" fill="none" stroke="#ddd" strokeWidth="12" strokeDasharray="352" strokeDashoffset="349" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#999]">0.89%</span>
                </div>
              </div>
              <div className="text-lg font-semibold text-[#666]">Before</div>
              <div className="text-sm text-[#999]">Industry Average</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#111] flex items-center justify-center">
                <ArrowRight size={28} className="text-white" />
              </div>
              <span className="mt-2 text-xs font-bold text-[#111] bg-green-100 px-3 py-1 rounded-full">+635%</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="56" fill="none" stroke="#f0f0f0" strokeWidth="12" />
                  <motion.circle initial={{ strokeDashoffset: 352 }} whileInView={{ strokeDashoffset: 120 }} transition={{ duration: 1.5, delay: 0.5 }} viewport={{ once: true }} cx="64" cy="64" r="56" fill="none" stroke="#111" strokeWidth="12" strokeDasharray="352" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#111]">6.54%</span>
                </div>
              </div>
              <div className="text-lg font-semibold text-[#111]">After</div>
              <div className="text-sm text-[#666]">With Psychology</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>

    {/* Metrics Grid */}
    <div className="w-full py-20 px-6 lg:px-10 bg-[#fafafa]">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#111] mb-3">Psychology-Driven Metrics</h2>
          <p className="text-[#666]">What stores achieve with subconscious influence</p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: MousePointer, label: 'Click Rate', before: '2.1%', after: '8.7%', increase: '+314%' },
            { icon: ShoppingBag, label: 'Add to Cart', before: '3.2%', after: '12.4%', increase: '+288%' },
            { icon: DollarSign, label: 'AOV', before: '$47', after: '$89', increase: '+89%' },
            { icon: Users, label: 'Trust Score', before: '42%', after: '91%', increase: '+117%' },
          ].map((metric, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.08 }} viewport={{ once: true }} className="group">
              <div className="p-6 rounded-2xl bg-white border border-[#eee] text-center h-full hover:shadow-lg hover:border-[#ddd] transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#111] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <metric.icon size={26} className="text-white" />
                </div>
                <div className="text-sm font-medium text-[#888] mb-3">{metric.label}</div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-sm text-[#bbb] line-through">{metric.before}</span>
                  <ArrowRight size={14} className="text-[#ccc]" />
                  <span className="text-xl font-bold text-[#111]">{metric.after}</span>
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold">{metric.increase}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Optimized Funnel */}
    <div className="w-full py-20 px-6 lg:px-10 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#111] mb-3">Optimized Conversion Funnel</h2>
          <p className="text-[#666]">Industry average: 1-3% • With psychology triggers: 15-25%</p>
        </motion.div>
        <div className="p-10 rounded-3xl bg-gradient-to-br from-[#111] to-[#222]">
          <div className="max-w-lg mx-auto space-y-3">
            {[
              { label: 'Visitors', width: '100%', value: '100%', opacity: 0.2 },
              { label: 'Engaged', width: '75%', value: '75%', opacity: 0.35 },
              { label: 'Add to Cart', width: '45%', value: '45%', opacity: 0.5 },
              { label: 'Checkout', width: '30%', value: '30%', opacity: 0.75 },
              { label: 'Purchase', width: '22%', value: '22%', opacity: 1 },
            ].map((step, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} viewport={{ once: true }} className="flex items-center gap-4">
                <div className="w-24 text-right text-sm font-medium text-white/70">{step.label}</div>
                <div className="flex-1 h-12 bg-white/5 rounded-xl overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: step.width }} transition={{ duration: 0.8, delay: index * 0.15 }} viewport={{ once: true }} className="h-full rounded-xl flex items-center justify-end pr-4 bg-white" style={{ opacity: step.opacity }}>
                    <span className="text-sm font-bold text-[#111]">{step.value}</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }} viewport={{ once: true }} className="text-center mt-8">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-[#111] font-semibold text-sm">
              <TrendingUp size={18} />
              7X Higher Than Industry Average
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  </>
);

// ========== LTV SYSTEM VISUALIZATIONS ==========

const LTVSystemVisuals = () => (
  <>
    {/* LTV Multiplier - Premium Dark Section */}
    <div className="w-full py-20 px-6 lg:px-10 bg-gradient-to-br from-[#0a2e0a] via-[#0d3d0d] to-[#0a2e0a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #00bc0d 1px, transparent 0)', backgroundSize: '50px 50px' }} />
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#00bc0d]/20 text-[#00bc0d] text-sm font-medium mb-4">REVENUE MULTIPLICATION</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">The LTV Multiplier Effect</h2>
          <p className="text-white/60 max-w-lg mx-auto">Transform one-time buyers into lifetime customers</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { value: '$47', label: 'First Purchase', desc: 'Average initial order', highlight: false },
            { value: '$470', label: 'After 12 Months', desc: 'With LTV system', highlight: true },
            { value: '$1,000+', label: 'Lifetime Value', desc: 'Customer potential', highlight: true },
          ].map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.15 }} viewport={{ once: true }} className="group">
              <div className={`p-10 rounded-3xl text-center h-full transition-all duration-300 ${item.highlight ? 'bg-gradient-to-br from-[#00bc0d] to-[#009d0b] hover:shadow-2xl hover:shadow-[#00bc0d]/30' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>
                <motion.div initial={{ scale: 0.5 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }} viewport={{ once: true }} className={`text-5xl lg:text-6xl font-bold mb-3 ${item.highlight ? 'text-white' : 'text-white/70'}`}>{item.value}</motion.div>
                <div className={`font-semibold text-lg mb-1 ${item.highlight ? 'text-white' : 'text-white/80'}`}>{item.label}</div>
                <div className={`text-sm ${item.highlight ? 'text-white/80' : 'text-white/50'}`}>{item.desc}</div>
                {index < 2 && <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20"><ArrowRight className="text-[#00bc0d]" size={24} /></div>}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }} viewport={{ once: true }} className="text-center mt-10">
          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#111] font-bold text-lg">
            <TrendingUp size={22} className="text-[#00bc0d]" />
            21X Customer Value Increase
          </span>
        </motion.div>
      </div>
    </div>

    {/* Customer Journey - Interactive Timeline */}
    <div className="w-full py-20 px-6 lg:px-10 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-3xl font-bold text-[#111] mb-3">The Automated Revenue Loop</h2>
          <p className="text-[#666]">A self-perpetuating system that grows your revenue automatically</p>
        </motion.div>
        <div className="p-10 rounded-3xl bg-gradient-to-br from-[#fafafa] to-white border border-[#eee]">
          <div className="relative">
            <div className="absolute top-8 left-12 right-12 h-1 bg-[#eee] rounded-full hidden md:block" />
            <motion.div initial={{ width: '0%' }} whileInView={{ width: '100%' }} transition={{ duration: 2 }} viewport={{ once: true }} className="absolute top-8 left-12 h-1 bg-gradient-to-r from-[#00bc0d] to-[#00d410] rounded-full hidden md:block" style={{ maxWidth: 'calc(100% - 96px)' }} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
              {[
                { title: 'Purchase', desc: 'First sale', icon: ShoppingCart },
                { title: 'Nurture', desc: 'Email flows', icon: Mail },
                { title: 'Re-engage', desc: 'Smart triggers', icon: RefreshCw },
                { title: 'Repeat', desc: 'Lifetime value', icon: Repeat },
              ].map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }} viewport={{ once: true }} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-[#111] flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 group-hover:bg-[#00bc0d] transition-all duration-300 shadow-lg">
                    <item.icon size={28} className="text-white" />
                  </div>
                  <div className="text-base font-bold text-[#111] mb-1">{item.title}</div>
                  <div className="text-sm text-[#666]">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} viewport={{ once: true }} className="flex justify-center mt-10">
            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#111]">
              <Repeat size={20} className="text-[#00bc0d]" />
              <span className="text-white font-medium">Automated • 24/7 • Hands-off</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>

    {/* Retention Metrics */}
    <div className="w-full py-20 px-6 lg:px-10 bg-[#fafafa]">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#111] mb-3">Customer Retention Metrics</h2>
          <p className="text-[#666]">What the automation system achieves</p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Repeat, label: 'Repeat Rate', before: '12%', after: '47%', increase: '+292%' },
            { icon: DollarSign, label: 'LTV', before: '$89', after: '$340', increase: '+282%' },
            { icon: Users, label: 'Retention', before: '23%', after: '68%', increase: '+196%' },
            { icon: Mail, label: 'Email Revenue', before: '8%', after: '35%', increase: '+338%' },
          ].map((metric, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.08 }} viewport={{ once: true }} className="group">
              <div className="p-6 rounded-2xl bg-white border border-[#eee] text-center h-full hover:shadow-xl hover:border-[#00bc0d]/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00bc0d] to-[#009d0b] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-[#00bc0d]/20">
                  <metric.icon size={26} className="text-white" />
                </div>
                <div className="text-sm font-medium text-[#888] mb-3">{metric.label}</div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-sm text-[#bbb] line-through">{metric.before}</span>
                  <ArrowRight size={14} className="text-[#00bc0d]" />
                  <span className="text-xl font-bold text-[#111]">{metric.after}</span>
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#00bc0d]/10 text-[#00bc0d] text-xs font-bold">{metric.increase}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </>
);

// ========== EMAIL MARKETING VISUALIZATIONS ==========

const EmailMarketingVisuals = () => (
  <>
    {/* ROI Comparison - Premium Gold */}
    <div className="w-full py-20 px-6 lg:px-10 bg-gradient-to-br from-[#1a1510] via-[#2a2015] to-[#1a1510] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4B160 1px, transparent 0)', backgroundSize: '50px 50px' }} />
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4B160]/20 text-[#D4B160] text-sm font-medium mb-4">PROVEN DATA</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">Email vs Social Media ROI</h2>
          <p className="text-white/60 max-w-lg mx-auto">Research from January 2025 - EmailToolTester</p>
        </motion.div>
        <div className="p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-8 lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center">
              <h4 className="font-medium text-white/60 mb-4">Social Media ROI</h4>
              <div className="relative w-36 h-36 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <span className="text-4xl font-bold text-white/50">$2</span>
                </div>
              </div>
              <p className="text-sm text-white/50">Per $1 spent</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4B160] to-[#BD9B5E] flex items-center justify-center shadow-lg shadow-[#D4B160]/30">
                <ArrowRight size={28} className="text-white" />
              </div>
              <span className="mt-2 text-xs font-bold text-[#D4B160] bg-[#D4B160]/20 px-3 py-1 rounded-full">21X MORE</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center">
              <h4 className="font-medium text-[#D4B160] mb-4">Email Marketing ROI</h4>
              <motion.div initial={{ scale: 0.8 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.5 }} viewport={{ once: true }} className="relative w-36 h-36 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#D4B160] to-[#BD9B5E] flex items-center justify-center shadow-2xl shadow-[#D4B160]/40">
                  <span className="text-4xl font-bold text-white">$42</span>
                </div>
              </motion.div>
              <p className="text-sm text-white/70">Per $1 spent</p>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }} viewport={{ once: true }} className="mt-10 text-center">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4B160] to-[#BD9B5E] text-[#111] font-bold text-lg shadow-lg shadow-[#D4B160]/30">
              <TrendingUp size={22} />
              Email generates 20X more revenue
            </span>
          </motion.div>
        </div>
      </div>
    </div>

    {/* The 3-Part System */}
    <div className="w-full py-20 px-6 lg:px-10 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-3xl font-bold text-[#111] mb-3">The 3-Part System</h2>
          <p className="text-[#666]">Three layers of technology that create an unfair advantage</p>
        </motion.div>
        <div className="space-y-5">
          {[
            { num: '1', title: 'Business Intelligence + World-Class Setup', desc: 'The most advanced BI configuration — optimizing send times, frequency, and content delivery on a per-customer basis.' },
            { num: '2', title: 'Smart Automation Powered by AI + Data', desc: 'Automated systems that send hyper-personalized messages based on behavioral data and AI-driven predictions.' },
            { num: '3', title: 'Precision-Engineered Email Copy', desc: 'Emails designed to strike the exact psychological trigger in each customer\'s mind — at the perfect moment.' },
          ].map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.15 }} viewport={{ once: true }} className="group">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#fafafa] to-white border border-[#eee] hover:shadow-xl hover:border-[#D4B160]/30 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4B160] to-[#BD9B5E] flex items-center justify-center flex-shrink-0 text-white font-bold text-xl shadow-lg shadow-[#D4B160]/20 group-hover:scale-110 transition-transform">{item.num}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-[#111] mb-2">{item.title}</h3>
                    <p className="text-[#666] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Email Stats - Premium Cards */}
    <div className="w-full py-20 px-6 lg:px-10 bg-[#fafafa]">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#111] mb-3">What Top Brands Achieve</h2>
          <p className="text-[#666]">From our COVID story: 764 sales = $92,462 from one email</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { value: 45, suffix: '%', label: 'Open Rate', desc: 'vs 20% industry average', icon: Mail },
            { value: 12, suffix: '%', label: 'Click Rate', desc: 'vs 2.6% industry average', icon: MousePointer },
            { value: 92462, prefix: '$', suffix: '', label: 'Single Campaign', desc: 'From one email blast', icon: DollarSign },
          ].map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.15 }} viewport={{ once: true }} className="group">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#111] to-[#1a1a1a] text-center h-full hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4B160]/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4B160] to-[#BD9B5E] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#D4B160]/30 group-hover:scale-110 transition-transform">
                    <stat.icon size={26} className="text-white" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold mb-2 text-white">
                    <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <div className="font-semibold text-[#D4B160] mb-1">{stat.label}</div>
                  <div className="text-sm text-white/50">{stat.desc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </>
);

// ========== ABANDONED CHECKOUT VISUALIZATIONS + CALCULATOR ==========

const AbandonedCheckoutVisuals = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(10000);
  const [aov, setAov] = useState(100);

  // Calculations based on the HTML content
  const monthlyOrders = Math.round(monthlyRevenue / aov);
  const checkoutStarts = Math.round(monthlyOrders * 1.7); // 70% more start checkout than complete
  const abandonedCheckouts = checkoutStarts - monthlyOrders;
  const recoveredOrders = Math.round(abandonedCheckouts * 0.82); // 82% recovery rate
  const recoveredRevenue = recoveredOrders * aov;
  const yearlyRecovered = recoveredRevenue * 12;

  return (
    <>
      {/* Interactive Revenue Calculator */}
      <div className="w-full py-20 px-6 lg:px-10 bg-gradient-to-br from-[#0a1f0a] via-[#0d2d0d] to-[#0a1f0a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #00cc6e 1px, transparent 0)', backgroundSize: '50px 50px' }} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#00cc6e]/20 text-[#00cc6e] text-sm font-medium mb-4">REVENUE CALCULATOR</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">Calculate Your Lost Revenue</h2>
            <p className="text-white/60 max-w-lg mx-auto">See how much money you're leaving on the table</p>
          </motion.div>

          <div className="p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-3">Monthly Revenue ($)</label>
                <input
                  type="number"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value) || 0)}
                  className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white text-xl font-bold focus:border-[#00cc6e] focus:outline-none focus:ring-2 focus:ring-[#00cc6e]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-3">Average Order Value ($)</label>
                <input
                  type="number"
                  value={aov}
                  onChange={(e) => setAov(Number(e.target.value) || 1)}
                  className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white text-xl font-bold focus:border-[#00cc6e] focus:outline-none focus:ring-2 focus:ring-[#00cc6e]/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-3 mb-10">
              <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5">
                <span className="text-white/70">Monthly completed orders</span>
                <span className="font-bold text-white text-lg">{monthlyOrders.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5">
                <span className="text-white/70">Checkout starts (estimated)</span>
                <span className="font-bold text-white text-lg">{checkoutStarts.toLocaleString()}</span>
              </div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex items-center justify-between p-5 rounded-2xl bg-red-500/20 border border-red-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/30 flex items-center justify-center">
                    <AlertTriangle size={20} className="text-red-400" />
                  </div>
                  <span className="text-red-300 font-medium">Abandoned checkouts</span>
                </div>
                <span className="font-bold text-red-400 text-xl">{abandonedCheckouts.toLocaleString()}</span>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-3xl bg-gradient-to-br from-[#00cc6e] to-[#00aa5c] text-center shadow-2xl shadow-[#00cc6e]/30">
              <p className="text-white/80 mb-3 text-lg">With 82% recovery rate, you could recover:</p>
              <div className="text-5xl lg:text-6xl font-bold text-white mb-2">
                ${recoveredRevenue.toLocaleString()}<span className="text-2xl">/month</span>
              </div>
              <div className="text-2xl font-semibold text-white/90 mb-4">
                ${yearlyRecovered.toLocaleString()}/year
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 text-white font-medium">
                <CheckCircle size={20} />
                <span>{recoveredOrders} orders recovered monthly</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* The 7-Email Sequence */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#111] mb-3">The 7-Email Recovery Sequence</h2>
            <p className="text-[#666]">Strategic timing that converts 82% of abandoned checkouts</p>
          </motion.div>

          <div className="space-y-4">
            {[
              { time: '1 hour', title: 'Instant Reminder', desc: 'Catches them while you\'re fresh in their mind' },
              { time: '4 hours', title: 'Trust Builder', desc: 'Social proof + guarantees' },
              { time: '24 hours', title: 'Objection Handler', desc: 'Addresses shipping, returns, questions' },
              { time: '48 hours', title: 'Scarcity Trigger', desc: 'Creates authentic urgency' },
              { time: '72 hours', title: 'Value Stack', desc: 'Re-frames as investment' },
              { time: '5 days', title: 'Personal Touch', desc: 'Feels 1-on-1' },
              { time: '7 days', title: 'Final Push', desc: 'Last chance + incentive' },
            ].map((email, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.08 }} viewport={{ once: true }} className="group">
                <div className="flex items-center gap-5 p-5 rounded-2xl bg-gradient-to-br from-[#fafafa] to-white border border-[#eee] hover:shadow-lg hover:border-[#00cc6e]/30 transition-all duration-300">
                  <div className="w-20 text-center flex-shrink-0">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#00cc6e]/10 text-[#00cc6e]">{email.time}</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00cc6e] to-[#00aa5c] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#00cc6e]/20 group-hover:scale-110 transition-transform">
                    <Send size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#111] text-lg">{email.title}</h4>
                    <p className="text-sm text-[#666]">{email.desc}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#00cc6e]/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={22} className="text-[#00cc6e]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Proven Results Stats */}
      <div className="w-full py-20 px-6 lg:px-10 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#111] mb-3">Proven Results</h2>
            <p className="text-[#666]">What this recovery system achieves</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { value: 82, suffix: '%', label: 'Recovery Rate', desc: 'Of abandoned checkouts', icon: Target },
              { value: 58, suffix: '%', label: 'Revenue Increase', desc: 'From recovered sales', icon: TrendingUp },
              { value: 2, suffix: 'hrs', label: 'Setup Time', desc: 'Plug and play', icon: Clock },
            ].map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.15 }} viewport={{ once: true }} className="group">
                <div className="p-8 rounded-3xl bg-white border border-[#eee] text-center h-full hover:shadow-xl hover:border-[#00cc6e]/30 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00cc6e] to-[#00aa5c] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#00cc6e]/20 group-hover:scale-110 transition-transform">
                    <stat.icon size={30} className="text-white" />
                  </div>
                  <div className="text-5xl font-bold text-[#111] mb-2">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-semibold text-[#00cc6e] text-lg mb-1">{stat.label}</div>
                  <div className="text-sm text-[#666]">{stat.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// ========== SOCIAL PROOF VISUALIZATIONS ==========

const SocialProofVisuals = () => (
  <>
    {/* ROAS Transformation */}
    <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">The Social Proof Transformation</h2>
        <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">Real results from applying the Social Proof Tactic</p>
        <div className="p-8 rounded-2xl bg-white border border-[#eee]">
          <h3 className="text-lg font-semibold text-[#111] mb-6 text-center">ROAS: Before vs After Social Proof</h3>
          <div className="flex items-end justify-center gap-12">
            <div className="text-center">
              <div className="relative w-24 mx-auto mb-4">
                <div className="w-full bg-[#f0f0f0] rounded-t-lg" style={{ height: '120px' }} />
                <div className="absolute bottom-0 left-0 right-0 rounded-t-lg flex items-end justify-center pb-2" style={{ height: '35px', backgroundColor: '#ddd' }}>
                  <span className="text-sm font-bold text-[#666]">3.16x</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-[#999]">3.16x</div>
              <div className="text-sm text-[#888] mt-1">Before</div>
            </div>
            <div className="pb-16"><ArrowRight size={32} className="text-[#7700fd]" /></div>
            <div className="text-center">
              <div className="relative w-24 mx-auto mb-4">
                <div className="w-full bg-[#f0f0f0] rounded-t-lg" style={{ height: '120px' }} />
                <motion.div initial={{ height: 0 }} whileInView={{ height: '120px' }} transition={{ duration: 1, delay: 0.3 }} viewport={{ once: true }} className="absolute bottom-0 left-0 right-0 rounded-t-lg flex items-end justify-center pb-2" style={{ background: 'linear-gradient(180deg, #9d00ff 0%, #7700fd 100%)' }}>
                  <span className="text-sm font-bold text-white">27.13x</span>
                </motion.div>
              </div>
              <div className="text-2xl font-bold" style={{ color: '#7700fd' }}>27.13x</div>
              <div className="text-sm text-[#888] mt-1">After</div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-white" style={{ backgroundColor: '#7700fd' }}><ArrowUp size={16} />+758% ROAS Increase</span>
          </div>
        </div>
      </div>
    </div>

    {/* Social Proof Network Animation */}
    <div className="w-full py-16 px-6 lg:px-10" style={{ background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: '#ffffff' }}>The Psychology of Influence</h2>
        <p className="text-center mb-10 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>When one person buys, others follow — automatically</p>

        {/* Network Visualization */}
        <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden" style={{ minHeight: '300px' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Central Node */}
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="relative z-10">
              <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7700fd 0%, #9d00ff 100%)' }}>
                <ShoppingCart size={32} style={{ color: '#ffffff' }} />
              </div>
              <motion.div initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 rounded-full" style={{ border: '2px solid #7700fd' }} />
            </motion.div>

            {/* Orbiting Nodes */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }} viewport={{ once: true }} className="absolute" style={{ transform: `rotate(${i * 60}deg) translateX(100px) rotate(-${i * 60}deg)` }}>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <Users size={20} style={{ color: 'rgba(255,255,255,0.8)' }} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.line key={i} x1="50%" y1="50%" x2={`${50 + 30 * Math.cos((i * 60 * Math.PI) / 180)}%`} y2={`${50 + 30 * Math.sin((i * 60 * Math.PI) / 180)}%`} stroke="#7700fd" strokeWidth="1" strokeOpacity="0.3" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 + i * 0.1 }} viewport={{ once: true }} />
            ))}
          </svg>

          <div className="relative z-10 text-center mt-48">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>One purchase triggers a cascade of conversions</p>
          </div>
        </div>
      </div>
    </div>

    {/* Social Proof Elements */}
    <div className="w-full py-16 px-6 lg:px-10 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">5 Psychological Weapons You'll Master</h2>
        <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">Each weapon targets a different part of the human decision-making process</p>
        <div className="grid md:grid-cols-5 gap-4">
          {[
            { icon: Brain, label: 'Hidden Laws', desc: 'Psychology triggers', color: '#7700fd' },
            { icon: Eye, label: 'Perception', desc: 'Control beliefs', color: '#8800ff' },
            { icon: Sparkles, label: 'Conversion', desc: 'Bypass logic', color: '#9900ff' },
            { icon: ThumbsUp, label: 'Certainty', desc: 'Remove doubt', color: '#aa00ff' },
            { icon: Star, label: 'Dark Protocol', desc: 'Deep influence', color: '#bb00ff' },
          ].map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="p-5 rounded-xl bg-[#fafafa] border border-[#eee] text-center">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: item.color }}>
                <item.icon size={26} className="text-white" />
              </div>
              <div className="text-sm font-semibold text-[#111] mb-1">{item.label}</div>
              <div className="text-xs text-[#888]">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Cost Reduction Stats */}
    <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">Advertising Cost Reduction</h2>
        <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">What happens when social proof is applied correctly</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { metric: 'CTR', before: '0.8%', after: '4.2%', increase: '+425%' },
            { metric: 'CPM', before: '$18', after: '$6', increase: '-67%' },
            { metric: 'CPC', before: '$2.40', after: '$0.45', increase: '-81%' },
            { metric: 'CPA', before: '$48', after: '$8', increase: '-83%' },
          ].map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="p-6 rounded-xl bg-white border border-[#eee] text-center">
              <div className="text-sm font-semibold text-[#888] mb-3">{stat.metric}</div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-sm text-[#bbb] line-through">{stat.before}</span>
                <ArrowRight size={14} className="text-[#ccc]" />
                <span className="text-lg font-bold" style={{ color: '#7700fd' }}>{stat.after}</span>
              </div>
              <span className="text-xs font-medium text-green-500">{stat.increase}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111] text-white font-semibold">
            <TrendingUp size={20} />
            Up to 1,500% reduction in ad costs
          </div>
        </div>
      </div>
    </div>

    {/* Us vs Them Comparison */}
    <div className="w-full py-16 px-6 lg:px-10 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">We Do It Different</h2>
        <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">Most people think they understand social proof. They're wrong.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left text-sm font-bold bg-[#f5f5f5] border border-[#eee] text-[#666]">THEM (Traditional)</th>
                <th className="p-4 text-left text-sm font-bold border border-[#eee] text-white" style={{ backgroundColor: '#7700fd' }}>US (Social Proof System)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { them: 'Add reviews to product page and hope', us: 'Engineer proof into every ad, page, and funnel' },
                { them: 'Wait months for testimonials', us: 'Build authentic proof from day one' },
                { them: 'Rely on algorithms and luck', us: 'Use psychology that works anywhere' },
                { them: 'Focus on features and logic', us: 'Trigger subconscious buying response' },
                { them: 'Pray the algorithm doesn\'t kill you', us: 'Own a skill no platform can take away' },
              ].map((row, index) => (
                <tr key={index}>
                  <td className="p-4 text-sm text-[#666] bg-[#fafafa] border border-[#eee]">{row.them}</td>
                  <td className="p-4 text-sm text-[#111] font-medium bg-white border border-[#eee]">{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
);

// ========== SOCIAL PROOF ALTERNATIVE LAYOUT (VIEW 2) ==========

interface SocialProofAlternativeProps {
  course: {
    title: string;
    subtitle: string;
    price: number;
    originalPrice?: number;
    heroImage?: string;
    modules: { title: string; description: string }[];
    faq: { question: string; answer: string }[];
  };
  onCheckout: () => void;
}

const SocialProofAlternativeLayout = ({ course, onCheckout }: SocialProofAlternativeProps) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // 5 Psychological Weapons - What's Included
  const psychWeapons = [
    { title: 'The Hidden Laws of Human Psychology', desc: 'You\'ll be exposed to every hidden psychological law that makes a random stranger buy simply because someone else did. Understand exactly how the brain works and what drives the subconscious to make a purchasing decision behind the scenes.' },
    { title: 'The Social Perception Engine', desc: 'The complete system for controlling the human brain\'s perception of your potential customer. Together, from zero, we\'ll build an entire framework that causes the customer to purchase in an impossible way, devoid of any ability to resist, due to the magical power called The Social Proof Effect.' },
    { title: 'The Subconscious Conversion Machine', desc: 'Discover how to transform doubt into belief, and belief into emotion. Learn how to trigger emotional responses in the customer that bypass logic – excitement so powerful it leads them to buy without thinking twice.' },
    { title: 'The Psychology of Certainty', desc: 'Here you learn how to make the customer\'s brain perceive reality exactly as you want. How to make them see your brand as the leader, your product as the only solution, and their purchase as the smartest decision they\'ve ever made.' },
    { title: 'The Complete Dark Proof Protocol', desc: 'This is no longer persuasion – it\'s consciousness programming. Understand how to change the customer\'s deep beliefs about what "works," who\'s "worthy," and why you automatically become their safe and preferred choice again and again.' },
  ];

  // Comparison table rows
  const comparisonRows = [
    { them: 'Add some reviews to the product page and hope people buy', us: 'Engineer psychological proof directly into every ad, landing page, and funnel – creating an unstoppable buying environment' },
    { them: 'Wait months to collect real customer testimonials', us: 'Build authentic-looking social proof from day one using proven psychological frameworks' },
    { them: 'Rely on expensive products, perfect creatives, and algorithm luck', us: 'Use human psychology to sell any product, in any niche, regardless of creative quality' },
    { them: 'Focus on features, benefits, and logical selling', us: 'Trigger the subconscious "everyone\'s buying this" response that bypasses logic entirely' },
    { them: 'Pray the algorithm doesn\'t kill your account', us: 'Own a skill that works regardless of platform, algorithm, or market conditions' },
  ];

  // FAQ items from HTML
  const faqItems = [
    { question: 'Q: "I already use reviews on my product pages. Isn\'t that enough?"', answer: 'Product page reviews are just the tip of the iceberg. This is a comprehensive psychological system that makes customers believe everything you say - across your ads, landing pages, emails, and entire funnel. It goes far beyond simple testimonials. You\'ll learn how to engineer belief at the subconscious level.' },
    { question: 'Q: "This probably doesn\'t apply to my niche/business."', answer: 'Wrong. This is relevant to everyone. Social proof is the fundamental law of human psychology. Any business applying it can skyrocket conversion rates overnight. Billion-dollar brands have built empires on this principle alone. If you\'re selling to humans, this applies to you.' },
    { question: 'Q: What if I buy multiple courses - do they overlap?', answer: 'Every course is designed to solve a specific part of the conversion equation. They complement each other without repeating, so stacking them creates compounding impact.' },
    { question: 'Q: Will I get lifetime access?', answer: 'Yes. One-time payment, lifetime access. No subscriptions. No hidden fees.' },
    { question: 'Q: Is this just theory or can I apply it right away?', answer: 'This is 100% practical. You\'ll get a clear framework + real examples + plug and play templates that you can implement immediately.' },
    { question: 'Q: Do I need a team to apply this?', answer: 'Not at all. Every tactic was designed for solo operators. You can implement everything with minimal tech skills or outsource it easily if you prefer.' },
    { question: 'Q: "How long does it take to see results?"', answer: 'Most people see an immediate impact on their ad performance within 24-72 hours of implementation. Social proof works instantly because it taps into hardwired human psychology.' },
    { question: 'Q: "What if Facebook shuts down my ad account?"', answer: 'That\'s exactly why you need this. Social proof is a skill that transcends platforms. Whether you\'re on Facebook, TikTok, Google, or selling in person - human psychology doesn\'t change. You\'ll own a skill that can\'t be taken away.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Black Background */}
      <div className="w-full py-16 lg:py-20 px-6 lg:px-10" style={{ backgroundColor: '#000' }}>
        <div className="max-w-5xl mx-auto text-center">
          {/* Intro Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-8 py-3 rounded-full mb-6"
            style={{ backgroundColor: '#252525' }}
          >
            <span className="text-sm text-white">In a world where algorithms change overnight...</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-white leading-tight"
          >
            How to Force Anyone to Buy From You Using One Psychological Law
          </motion.h1>

          {/* Sub Headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg lg:text-xl mb-8 text-white/80"
          >
            (Turn every visitor into a buyer by triggering the most powerful force in human psychology)
          </motion.p>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff_5.jpg?v=1760517983"
              alt="Social Proof Power"
              className="max-w-full md:max-w-2xl mx-auto rounded-2xl"
              style={{
                boxShadow: '0 0 18px rgba(119, 0, 253, 0.6), 0 0 35px rgba(119, 0, 253, 0.4)',
              }}
            />
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-8"
          >
            <p className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
              <span className="line-through opacity-60 mr-4">${course.originalPrice || 197}</span>
              <span style={{ color: '#7700fd' }}>${course.price}</span>
            </p>

            {/* CTA Button */}
            <button
              onClick={onCheckout}
              className="inline-flex flex-col items-center justify-center px-16 lg:px-20 py-4 lg:py-5 rounded-full font-bold text-lg lg:text-xl text-white uppercase tracking-wide transition-all hover:scale-105 hover:shadow-2xl"
              style={{
                background: 'radial-gradient(ellipse at bottom, #b87dfe 0%, #7700fd 40%)',
                boxShadow: '0 10px 40px rgba(119, 0, 253, 0.5)',
                minHeight: '81px',
                minWidth: '380px'
              }}
            >
              <span>ADD TO MY SYSTEM!</span>
              <span className="text-xs lg:text-sm font-normal normal-case tracking-normal mt-1">
                (One-time payment • Instant access)
              </span>
            </button>
          </motion.div>

          {/* Secure Payment */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-white/60 text-sm"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Mastercard-Logo.wine.png?v=1758464867"
              alt="Secure"
              className="w-10 h-6 object-contain"
            />
            <span>Secure 256-bit SSL encrypted payment</span>
          </motion.div>
        </div>
      </div>

      {/* Story Section - White Background */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-black mb-6"
          >
            In a world of Chaos...
          </motion.h2>

          <p className="text-lg text-black mb-4">
            Millions of marketers are fighting to break the creative that sinks money, just to be profitable - and finally see some sales...
          </p>

          <p className="text-lg text-black font-bold mb-8">
            Because their algorithm &apos;went crazy&apos;...
          </p>

          {/* Marketer Struggling Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-03-25T135606.829.png?v=1742903802"
              alt="Marketer struggling"
              className="max-w-xs mx-auto"
            />
          </motion.div>

          {/* Highlight Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="inline-block px-6 py-3 rounded-lg font-bold text-black text-xl lg:text-2xl" style={{ backgroundColor: 'rgb(252, 237, 169)' }}>
              We turn every ad into a money-printing machine
            </div>
            <div className="inline-block px-6 py-3 rounded-lg font-bold text-black text-xl lg:text-2xl mt-2" style={{ backgroundColor: 'rgb(252, 237, 169)' }}>
              (For 3 years straight)
            </div>
            <div className="inline-block px-6 py-3 rounded-lg font-bold text-black text-xl lg:text-2xl mt-2" style={{ backgroundColor: 'rgb(252, 237, 169)' }}>
              using The Social Proof Tactic
            </div>
          </motion.div>

          <p className="text-lg text-black mt-10 font-bold">If you&apos;re in eCommerce, selling a service or product...</p>
          <p className="text-lg text-black">
            The page you&apos;re about to read until the end<br />
            is <strong>worth more than any video</strong> you&apos;ve seen in the past year
          </p>

          <p className="text-lg text-black mt-10 mb-1"><u><strong>Straight to the point:</strong></u></p>
          <h2 className="text-4xl lg:text-5xl font-bold mt-10 mb-10" style={{ color: '#7e42f4' }}>
            Social Proof = Money
          </h2>

          <h3 className="text-2xl lg:text-3xl font-bold text-black mb-4">And here&apos;s the proof...</h3>
          <p className="text-lg text-black">
            On 27.02.2024, we started using the Social Proof Tactic on one of our brands, Before that, we had a <strong>lame ROAS of 3.16</strong>...
          </p>

          {/* Before Screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="my-10"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Whatever_it_takes_We_got_you_5.png?v=1742904328"
              alt="Before: ROAS 3.16"
              className="w-full max-w-xl mx-auto rounded-lg"
            />
          </motion.div>

          <p className="text-lg text-black mt-10">
            And just a few days later... the <strong>ROAS skyrocketed to 27.13...</strong>
          </p>

          {/* After Screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="my-10"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Whatever_it_takes_We_got_you_6.png?v=1742904467"
              alt="After: ROAS 27.13"
              className="w-full max-w-xl mx-auto rounded-lg"
            />
          </motion.div>

          {/* Key Quote */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl font-bold text-black mt-10 mb-4"
          >
            &quot;Ads give you exposure, social proof makes sure they pull out their <u>credit card</u>.&quot;
          </motion.h2>

          <p className="text-sm italic text-black mb-8">
            (and make them buy impulsively and extremely)
          </p>

          {/* Fifth Brother GIF */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <img
              src="https://media.tenor.com/m-eTuvb1LOgAAAAM/fifth-brother-star-wars.gif"
              alt="Fifth Brother"
              className="max-w-xs md:max-w-sm mx-auto rounded-2xl"
            />
          </motion.div>

          {/* Pay Attention Section */}
          <div className="text-lg text-black leading-loose mb-16">
            <p className="font-bold">Pay attention...</p>
            <p>No reliance on Facebook algorithms,</p>
            <p>No endless product testing...</p>
            <p>No product page reviews,</p>
            <p>No creatives that competitors can copy...</p>
          </div>

          {/* Money Printing Skill */}
          <div className="text-2xl lg:text-3xl text-black mb-4">
            Creating social proof is a skill that can <span className="font-bold">print you money</span> In every ad, every hour
          </div>

          <p className="text-sm italic text-gray-600 mb-4">(Without relying on Zuckerberg&apos;s mercy)</p>

          {/* Zuckerberg GIF */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Zuckerberg-1.gif?v=1742904888"
              alt="Zuckerberg"
              className="max-w-xs mx-auto rounded-lg"
            />
          </motion.div>

          <p className="text-base text-black mt-6">
            Properly built social proof can turn every ad into a money-printing machine In scale, with no limit and without the need for endless testings.
          </p>

          {/* The Story */}
          <p className="text-2xl font-bold text-black mt-24">
            It all started 3 years ago, when we discovered the power of social proof...
          </p>
          <p className="text-lg text-black mt-6">At that moment...</p>
          <p className="text-lg font-bold text-black mt-6">Our lives changed.</p>

          <p className="text-lg italic text-black mt-20">We implemented the tactic in every ad...</p>

          <p className="text-xl lg:text-2xl text-black mt-10">
            Over the course of 3 years, we applied the social proof tactic in <strong>over 300 ads</strong>.
          </p>

          <p className="text-lg text-black mt-20">We studied and mastered the most powerful triggers found in psychology influence books</p>
          <p className="text-lg text-black">Until we reached a point where every time…</p>

          {/* Results Highlight */}
          <div className="my-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-black leading-tight">
              <span className="inline-block px-4 py-2" style={{ backgroundColor: 'rgb(252, 237, 169)' }}>
                the method reduces advertising costs by up
              </span>
            </h2>
            <h2 className="text-2xl lg:text-3xl font-bold text-black leading-tight mt-2">
              <span className="inline-block px-4 py-2" style={{ backgroundColor: 'rgb(252, 237, 169)' }}>
                to 1,500%
              </span>
            </h2>
            <h3 className="text-xl lg:text-2xl italic text-black mt-2">
              (CTR, CPM, CPC, CPA)
            </h3>
          </div>

          {/* Cat Buy More GIF */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <img
              src="https://media.tenor.com/tpOdbDAIhokAAAAM/cat-buy-more-roy.gif"
              alt="Cat Buy More"
              className="max-w-xs md:max-w-sm mx-auto rounded-2xl"
            />
          </motion.div>

          {/* Business Security */}
          <p className="text-lg italic text-black mt-40">But the most important thing we&apos;ve gained...</p>
          <p className="text-3xl font-bold text-black mt-16 mb-16">Business Security</p>
          <p className="text-lg text-black mt-10">It can change everything.</p>
          <p className="text-lg text-black">It doesn&apos;t matter if Facebook is messing with your ad account...</p>
          <p className="text-lg text-black">It doesn&apos;t matter if competitors are copying your creatives...</p>
          <p className="text-lg text-black mt-10">
            As long as you have the ability to generate social proof from scratch – the control is in your hands and <strong><span style={{ backgroundColor: 'rgb(255, 239, 166)' }}>no one can take it away from you</span>…</strong>
          </p>

          <p className="text-lg text-black mt-20">
            Once you have this knowledge,<br />
            replicate it on every possible ad to get…
          </p>
          <p className="text-3xl font-bold text-black mt-8 mb-6">Money in the Bank</p>
          <p className="text-lg text-black">So here... We&apos;ve decided to share all the knowledge we&apos;ve gained,</p>
          <p className="text-lg text-black">So you can turn ads into social proof machines, One that prints money on autopilot</p>

          <h3 className="text-lg font-bold text-black mt-16"><u>We promise you:</u></h3>
          <p className="text-lg text-black">
            <strong>I</strong>n a few days you will send us a message that you have no way of thanking us, and that we have changed your life.
          </p>
        </div>
      </div>

      {/* What's Included Section - Black Background */}
      <div className="w-full py-16 px-6 lg:px-10" style={{ backgroundColor: '#000' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white text-center mb-12">
            What&apos;s Included:
          </h2>

          <div className="space-y-6">
            {psychWeapons.map((weapon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl border-2"
                style={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
              >
                {/* Check Icon */}
                <div className="w-9 h-9 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)' }}>
                  <Check size={22} className="text-black" strokeWidth={3} />
                </div>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-white text-center mb-4">{weapon.title}</h3>
                <p className="text-base text-gray-400 text-center leading-relaxed">{weapon.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* We Do It Different - Comparison Section */}
      <div className="w-full py-16 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-extrabold text-black mb-6 text-center"
          >
            We Do it Different
          </motion.h2>

          <p className="text-lg text-black text-center mb-4">
            Most people think they understand social proof.<br />They&apos;re wrong.
          </p>

          <p className="text-base text-black text-center mb-10">
            Here&apos;s what separates us from everyone else:
          </p>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-left">
              <thead>
                <tr>
                  <th className="text-xl lg:text-2xl font-extrabold text-center p-5 bg-gray-300 border border-gray-300 w-1/2">
                    THEM<br />(Traditional Approach)
                  </th>
                  <th className="text-xl lg:text-2xl font-extrabold text-center p-5 bg-gray-300 border border-gray-300 w-1/2">
                    US<br />(The Social Proof System)
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={index}>
                    <td className="p-5 text-base text-black bg-gray-50 border border-gray-300 align-top">{row.them}</td>
                    <td className="p-5 text-base text-black bg-gray-50 border border-gray-300 align-top">{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-black italic mt-6 text-left">
            P.S. – This isn&apos;t about adding a few star ratings. This is about understanding the deep psychological mechanisms that make people incapable of saying no when they see others have already said yes.
          </p>

          {/* CTA Button */}
          <div className="text-center mt-10">
            <button
              onClick={onCheckout}
              className="inline-flex items-center justify-center gap-3 px-16 py-5 rounded-full font-bold text-xl text-white uppercase tracking-wide transition-all hover:scale-105 hover:shadow-2xl"
              style={{
                background: 'radial-gradient(ellipse at bottom, #b87dfe 0%, #7700fd 40%)',
                boxShadow: '0 10px 40px rgba(119, 0, 253, 0.5)',
                minWidth: '380px',
                minHeight: '81px'
              }}
            >
              <Lock size={20} />
              <div className="flex flex-col items-center">
                <span>GIVE ME THE SOCIAL PROOF SYSTEM</span>
                <span className="text-xs font-normal normal-case tracking-normal mt-1">(One-time payment • Instant access)</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full py-16 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-extrabold text-black mb-12 text-center"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden bg-black"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-[#1a1a1a] transition-colors"
                >
                  <span className="font-bold text-white pr-4 text-lg">{item.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp size={20} className="text-white flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-white flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-white/80 text-base"><strong>A:</strong> {item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <button
              onClick={onCheckout}
              className="inline-flex flex-col items-center justify-center px-20 py-6 rounded-full font-bold text-2xl lg:text-3xl text-white uppercase tracking-wide transition-all hover:shadow-2xl"
              style={{
                background: 'radial-gradient(ellipse at bottom, #b87dfe 0%, #7700fd 40%)',
                boxShadow: '0 10px 40px rgba(119, 0, 253, 0.5)',
                minWidth: '650px',
                minHeight: '120px'
              }}
            >
              <span>ADD TO MY SYSTEM!</span>
              <span className="text-base font-normal normal-case tracking-normal mt-1">(One-time payment • Instant access)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Final CTA Section - Black Gradient */}
      <div className="w-full py-20 px-6 lg:px-10" style={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-6">
              The Choice Is Simple
            </h2>

            <p className="text-xl text-gray-400 mb-10">
              Keep burning money on ads that rely on luck...<br />
              Or master the psychology that guarantees results.
            </p>

            {/* Highlight Box */}
            <div className="p-8 rounded-2xl mb-10" style={{ backgroundColor: 'rgba(119, 0, 253, 0.15)', border: '2px solid #7700fd' }}>
              <p className="text-xl lg:text-2xl font-bold text-white leading-relaxed">
                Every day you don&apos;t use social proof is a day you&apos;re leaving thousands on the table.<br /><br />
                Your competitors are already using these tactics.<br />
                Don&apos;t let them win.
              </p>
            </div>

            <p className="text-lg font-bold uppercase tracking-wide mb-8" style={{ color: '#ff6b6b' }}>
              Limited Time Offer
            </p>

            {/* Price */}
            <div className="mb-6">
              <p className="text-4xl lg:text-5xl font-extrabold text-white">
                <span className="line-through opacity-60 mr-4">${course.originalPrice || 197}</span>
                <span style={{ color: '#7700fd' }}>${course.price}</span>
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={onCheckout}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold text-lg text-white uppercase tracking-wide transition-all hover:scale-105 hover:shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #7700fd 0%, #9d00ff 100%)',
                boxShadow: '0 10px 40px rgba(119, 0, 253, 0.5)',
                minHeight: '81px',
                maxWidth: '480px'
              }}
            >
              <Lock size={20} />
              <div className="flex flex-col items-center">
                <span>YES, I WANT THE SOCIAL PROOF SYSTEM</span>
                <span className="text-xs font-normal normal-case tracking-normal mt-1">(One-time payment • Instant access)</span>
              </div>
            </button>

            {/* Guarantee Text */}
            <p className="text-base text-gray-500 mt-6 leading-relaxed">
              🔒 Secure 256-bit SSL encrypted payment<br />
              ✓ Instant access after purchase<br />
              ✓ Lifetime access, no subscriptions
            </p>

            {/* PS Note */}
            <p className="text-lg font-semibold italic text-white mt-12">
              P.S. – Remember: Ads get you exposure. Social proof gets you the sale.<br />
              Stop gambling with your ad budget. Start engineering conversions.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// ========== AI PHOTOGRAPHER ALTERNATIVE LAYOUT (VIEW 2) ==========

interface AIPhotographerAlternativeProps {
  course: {
    price: number;
    originalPrice?: number;
    faq: { question: string; answer: string }[];
  };
  onCheckout: () => void;
}

const AIPhotographerAlternativeLayout = ({ course, onCheckout }: AIPhotographerAlternativeProps) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [sliderPositions, setSliderPositions] = useState<{ [key: number]: number }>({});

  const handleSliderChange = (index: number, value: number) => {
    setSliderPositions(prev => ({ ...prev, [index]: value }));
  };

  const beforeAfterPairs = [
    { before: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/31.jpg?v=1749393421", after: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T192050.456.png?v=1749393420" },
    { before: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T192202.722.png?v=1749393643", after: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T192152.447.png?v=1749393643" },
    { before: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/33.jpg?v=1749393780", after: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/32.jpg?v=1749393780" },
    { before: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T192619.581.png?v=1749393900", after: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T192603.190.png?v=1749393900" },
    { before: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T193820.014.png?v=1749394000", after: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/34.jpg?v=1749394000" },
    { before: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/35.jpg?v=1749394100", after: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T193918.015.png?v=1749394100" },
    { before: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T194025.303.png?v=1749394200", after: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T194017.196.png?v=1749394200" },
    { before: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T194107.241.png?v=1749394300", after: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T194057.893.png?v=1749394300" },
    { before: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T194154.154.png?v=1749394400", after: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T194141.878.png?v=1749394400" },
    { before: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T194238.151.png?v=1749394500", after: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T194225.898.png?v=1749394500" },
    { before: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T194334.177.png?v=1749394600", after: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-09-02T194328.748.png?v=1749394600" },
  ];

  const faqItems = [
    { question: "Is there a refund policy?", answer: "Yes! We offer a 30-day money-back guarantee. If you're not completely satisfied, just let us know and we'll refund your purchase - no questions asked." },
    { question: "Do I need design experience?", answer: "Not at all! Our prompts are designed for complete beginners. If you can copy and paste, you can create stunning product photography." },
    { question: "Which AI tools does this work with?", answer: "Our prompts work with all major AI image generators including Midjourney, DALL-E, Stable Diffusion, and Leonardo AI." },
    { question: "How many prompts are included?", answer: "You get access to 50+ carefully crafted prompts covering various styles, backgrounds, lighting setups, and product types." },
    { question: "Will this work for my product type?", answer: "Yes! Our prompts are versatile and work for any physical product - from jewelry to electronics, fashion to food products." },
    { question: "How quickly can I create images?", answer: "Once you have the prompts, you can generate professional product images in minutes. Most users create their first stunning image within 10 minutes." },
    { question: "Is this a one-time purchase?", answer: "Yes! Pay once and get lifetime access to all prompts, including any future updates we release." },
    { question: "Can I use these images commercially?", answer: "Absolutely! All images you create using our prompts are yours to use for your business, ads, website, and social media." },
    { question: "Do you offer support?", answer: "Yes! We provide email support and access to our community where you can get help and share your creations." },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="w-full py-16 lg:py-20 px-6 lg:px-10" style={{ backgroundColor: '#9ba4a6' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 rounded-full mb-6 bg-white/20"
          >
            <span className="text-sm font-semibold text-white">AI-POWERED PHOTOGRAPHY</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold mb-6 text-white"
          >
            THE $10,000 AI PHOTOGRAPHER
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl lg:text-2xl mb-8 max-w-2xl mx-auto text-white/90"
          >
            Professional Product Photography Without the Professional Price Tag
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className="text-5xl lg:text-6xl font-bold text-white">${course.price}</span>
            {course.originalPrice && (
              <span className="text-2xl line-through text-white/50">${course.originalPrice}</span>
            )}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={onCheckout}
            className="inline-flex items-center gap-3 px-12 py-5 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-2xl bg-white"
            style={{ color: '#9ba4a6' }}
          >
            <ShoppingCart size={24} />
            GET INSTANT ACCESS
          </motion.button>

          <p className="text-sm mt-6 text-white/60">
            30-day money-back guarantee • Instant access • Lifetime updates
          </p>
        </div>
      </div>

      {/* Before/After Section */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#111] mb-4">
              See the Transformation
            </h2>
            <p className="text-xl text-[#666] max-w-2xl mx-auto">
              Drag the slider to see how AI transforms ordinary product photos into professional-grade imagery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {beforeAfterPairs.map((pair, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-2xl overflow-hidden shadow-xl"
                style={{ aspectRatio: '4/3' }}
              >
                {/* Before Image (base layer - shown on right side) */}
                <img
                  src={pair.before}
                  alt="Before"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* After Image (clipped - shown on left side) */}
                <img
                  src={pair.after}
                  alt="After"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ clipPath: `inset(0 ${100 - (sliderPositions[index] ?? 50)}% 0 0)` }}
                />
                {/* Slider Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                  style={{ left: `${sliderPositions[index] ?? 50}%`, transform: 'translateX(-50%)' }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <ChevronLeft size={16} className="text-[#666] -mr-1" />
                    <ChevronRight size={16} className="text-[#666] -ml-1" />
                  </div>
                </div>
                {/* Slider Input */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPositions[index] ?? 50}
                  onChange={(e) => handleSliderChange(index, Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
                />
                {/* Labels */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold text-white pointer-events-none" style={{ backgroundColor: '#9ba4a6' }}>
                  AFTER
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold bg-black/70 text-white pointer-events-none">
                  BEFORE
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="w-full py-20 px-6 lg:px-10 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#111] mb-4">
              Why AI Photography?
            </h2>
            <p className="text-xl text-[#666] max-w-2xl mx-auto">
              Compare the old way vs the new AI-powered approach
            </p>
          </motion.div>

          <div className="overflow-hidden rounded-2xl border border-[#eee]">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-5 text-left text-lg font-bold bg-[#f5f5f5] text-[#666]">
                    OLD WAY
                  </th>
                  <th className="p-5 text-left text-lg font-bold text-white" style={{ backgroundColor: '#9ba4a6' }}>
                    AI WAY
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { old: 'Hire expensive photographers ($500-$2000/session)', ai: 'Generate unlimited photos for $19 one-time' },
                  { old: 'Wait days or weeks for edited photos', ai: 'Get professional results in minutes' },
                  { old: 'Pay for studio rentals and equipment', ai: 'Create studio-quality images from anywhere' },
                  { old: 'Limited to photographer\'s availability', ai: 'Create content 24/7 on your schedule' },
                  { old: 'Re-shoots cost extra money and time', ai: 'Unlimited revisions at no extra cost' },
                ].map((row, index) => (
                  <tr key={index} className="border-t border-[#eee]">
                    <td className="p-5 text-[#666] bg-[#fafafa]">{row.old}</td>
                    <td className="p-5 text-[#111] font-medium bg-white">{row.ai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#111] mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-[#666] text-center mb-12">
            Everything you need to know before you start
          </p>

          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden bg-[#fafafa] border border-[#eee]"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-[#f0f0f0] transition-colors"
                >
                  <span className="font-semibold text-[#111] pr-4">{item.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp size={20} className="text-[#666] flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-[#666] flex-shrink-0" />
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
                      <p className="text-[#666]">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="w-full py-20 px-6 lg:px-10" style={{ backgroundColor: '#9ba4a6' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Product Photos?
          </h2>
          <p className="text-xl mb-4 text-white/80">
            Join thousands of entrepreneurs who are saving money and creating stunning visuals with AI
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-5xl lg:text-6xl font-bold text-white">${course.price}</span>
            {course.originalPrice && (
              <span className="text-2xl line-through text-white/50">${course.originalPrice}</span>
            )}
          </div>

          <button
            onClick={onCheckout}
            className="inline-flex items-center gap-3 px-12 py-5 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-2xl bg-white"
            style={{ color: '#9ba4a6' }}
          >
            <ShoppingCart size={24} />
            GET INSTANT ACCESS NOW
            <ArrowRight size={20} />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-8 mt-10 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Shield size={18} />
              <span>30-Day Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={18} />
              <span>Lifetime Updates</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== AD COPY TEMPLATES ALTERNATIVE LAYOUT (VIEW 2) ==========

interface AdCopyTemplatesAlternativeProps {
  course: {
    price: number;
    originalPrice?: number;
  };
  onCheckout: () => void;
}

const AdCopyTemplatesAlternativeLayout = ({ course, onCheckout }: AdCopyTemplatesAlternativeProps) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="w-full py-16 lg:py-20 px-6 lg:px-10" style={{ backgroundColor: '#D4B160' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 rounded-full mb-6 bg-white/20"
          >
            <span className="text-sm font-semibold text-white">PROVEN AD TEMPLATES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold mb-6 text-white"
          >
            50+ AD COPY TEMPLATES
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl lg:text-2xl mb-8 max-w-2xl mx-auto text-white/90"
          >
            Fill-in-the-Blank Templates That Turn Strangers Into Buyers
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className="text-5xl lg:text-6xl font-bold text-white">${course.price}</span>
            {course.originalPrice && (
              <span className="text-2xl line-through text-white/50">${course.originalPrice}</span>
            )}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={onCheckout}
            className="inline-flex items-center gap-3 px-12 py-5 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-2xl bg-white"
            style={{ color: '#D4B160' }}
          >
            <ShoppingCart size={24} />
            GET INSTANT ACCESS
          </motion.button>

          <p className="text-sm mt-6 text-white/60">
            30-day money-back guarantee • Instant access • Lifetime updates
          </p>
        </div>
      </div>

      {/* Problem Section */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#111] mb-6">
              The World's Best Copywriters Charge...
            </h2>
            <p className="text-xl text-[#666] mb-12 max-w-2xl mx-auto">
              What would it cost to hire them?
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-[#fafafa] border border-[#eee]"
            >
              <div className="text-4xl font-bold text-[#111] mb-2">$50,000</div>
              <div className="text-lg font-medium text-[#666] mb-1">Stefan Georgi</div>
              <div className="text-sm text-[#888]">per sales letter</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl bg-[#fafafa] border border-[#eee]"
            >
              <div className="text-4xl font-bold text-[#111] mb-2">$15,000</div>
              <div className="text-lg font-medium text-[#666] mb-1">Gary Halbert</div>
              <div className="text-sm text-[#888]">per page</div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl"
            style={{ backgroundColor: '#D4B160' }}
          >
            <p className="text-2xl lg:text-3xl font-bold text-white">
              Now you can get their proven formulas for just ${course.price}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Results Proof Section */}
      <div className="w-full py-20 px-6 lg:px-10 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#111] mb-4">
              These Templates Actually Work
            </h2>
            <p className="text-xl text-[#666] max-w-2xl mx-auto">
              Real results from real businesses using our ad copy templates
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/GQk7K0x.png?v=1749398780"
              alt="Results proof"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#111] mb-4">
              What You'll Get
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "50+ proven ad copy templates that convert",
              "Fill-in-the-blank format - just add your product",
              "Templates for Facebook, Instagram, TikTok & more",
              "Hooks, body copy, and CTAs that actually work",
              "Emotional triggers that drive purchases",
              "Instant access - start using them today",
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4B160' }}>
                  <Check size={18} className="text-white" />
                </div>
                <span className="text-lg text-[#333]">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Speed Section */}
      <div className="w-full py-20 px-6 lg:px-10 bg-[#111]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
              Create Winning Ads in Minutes
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              No more staring at a blank screen. Just fill in the blanks and launch.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl border-4"
            style={{ borderColor: '#D4B160' }}
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/ad-template-preview.jpg?v=1749398780"
              alt="Template preview"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* What's Inside Section */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#111] mb-4">
              What's Inside The Pack
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Hook Templates", desc: "15+ attention-grabbing hooks that stop the scroll" },
              { title: "Story Templates", desc: "10+ storytelling frameworks that build connection" },
              { title: "Offer Templates", desc: "12+ offer structures that drive urgency" },
              { title: "CTA Templates", desc: "15+ calls-to-action that get clicks" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-[#fafafa] border border-[#eee]"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#D4B160' }}>
                  <Trophy size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#111] mb-2">{item.title}</h3>
                <p className="text-[#666]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="w-full py-20 px-6 lg:px-10" style={{ backgroundColor: '#D4B160' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
            Ready to Write Ads That Sell?
          </h2>
          <p className="text-xl mb-4 text-white/80">
            Stop struggling with ad copy. Use the same templates that generate millions in revenue.
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-5xl lg:text-6xl font-bold text-white">${course.price}</span>
            {course.originalPrice && (
              <span className="text-2xl line-through text-white/50">${course.originalPrice}</span>
            )}
          </div>

          <button
            onClick={onCheckout}
            className="inline-flex items-center gap-3 px-12 py-5 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-2xl bg-white"
            style={{ color: '#D4B160' }}
          >
            <ShoppingCart size={24} />
            GET INSTANT ACCESS NOW
            <ArrowRight size={20} />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-8 mt-10 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Shield size={18} />
              <span>30-Day Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={18} />
              <span>Lifetime Updates</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== META AD TEMPLATES ALTERNATIVE LAYOUT (VIEW 2) ==========

interface MetaAdTemplatesAlternativeProps {
  course: {
    price: number;
    originalPrice?: number;
  };
  onCheckout: () => void;
}

const MetaAdTemplatesAlternativeLayout = ({ course, onCheckout }: MetaAdTemplatesAlternativeProps) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Black with Gold */}
      <div className="w-full py-12 lg:py-16 px-6 lg:px-10 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border"
            style={{ backgroundColor: 'rgba(239, 191, 4, 0.1)', borderColor: '#EFBF04' }}
          >
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#EFBF04' }} />
            <span className="text-sm font-semibold" style={{ color: '#EFBF04' }}>The creative library billion-dollar brands use</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-extrabold mb-4 text-white"
          >
            Generate Winning Ad Creatives In <span style={{ color: '#EFBF04' }}>10 Seconds</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-10 max-w-2xl mx-auto text-white/80"
          >
            Stop wasting 6 hours to find one winning creative. Get instant access to 1,000+ proven Meta ad templates.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/6574469f-6304-4b63-a8a5-9d260fc2739a.png?v=1760535779"
              alt="1000 Meta Ad Templates"
              className="w-full h-auto rounded-xl"
              style={{
                boxShadow: '0 0 30px rgba(239, 191, 4, 0.6), 0 0 60px rgba(239, 191, 4, 0.4), 0 20px 60px rgba(239, 191, 4, 0.3)'
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <span className="text-2xl line-through text-white/50 mr-3">${course.originalPrice}</span>
            <span className="text-3xl font-bold" style={{ color: '#EFBF04' }}>Only ${course.price}</span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={onCheckout}
            className="inline-flex items-center gap-3 px-12 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 text-white uppercase tracking-wide"
            style={{
              background: 'radial-gradient(ellipse at bottom, #FFF4CC 0%, #EFBF04 40%)',
              boxShadow: '0 10px 30px rgba(239, 191, 4, 0.4)'
            }}
          >
            <ShoppingCart size={24} />
            Get Instant Access Now
          </motion.button>
        </div>
      </div>

      {/* Problem Section */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-black mb-6"
          >
            Why struggle for hours thinking...
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-black mb-10"
          >
            Staring at a blank screen. Wondering what creative will work. Trying to come up with something "different"...
          </motion.p>

          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            src="https://media.tenor.com/4eF0XKHqDB4AAAAM/meeting-bored.gif"
            alt="Bored meeting"
            className="w-full max-w-lg mx-auto rounded-lg mb-12"
          />

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-black mb-10"
          >
            When you can generate a proven creative in <span style={{ color: '#EFBF04' }}>10 seconds?</span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-black mb-6"
          >
            On average, it takes a marketer about <strong>35 minutes</strong> to create a single creative...
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-black/70 italic mb-12"
          >
            That's 15 minutes brainstorming + 20 minutes actually creating it...
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-black mb-12"
          >
            And to find a winning creative? You need to test about <strong>10 different variations</strong>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-xl bg-black"
          >
            <p className="text-2xl font-bold text-white italic mb-4">
              Which means it takes you almost <span style={{ color: '#EFBF04' }}>6 HOURS</span> to create just ONE winning creative!
            </p>
            <p className="text-sm text-white/70 italic">
              (10 creatives × 35 minutes each = 350 minutes = 5.8 hours)
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-black mt-16"
          >
            There's a better way.
          </motion.p>
        </div>
      </div>

      {/* Solution - 3 Steps */}
      <div className="w-full py-20 px-6 lg:px-10 bg-[#f9f9f9]">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-center text-black mb-6"
          >
            Here's Your <span style={{ color: '#EFBF04' }}>New Solution</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-center text-[#333] mb-16"
          >
            In one simple file, over <strong>1,000</strong> Canva templates for Meta ads that are <strong>proven</strong> to work! No thinking required. No design skills needed. Just pick, customize, and launch.
          </motion.p>

          <div className="space-y-8">
            {[
              {
                step: "Step 1",
                title: "Choose Your Template",
                desc: "Pick from 1,000+ expertly designed static ad templates in Canva. Every template is battle-tested and proven to convert. 🎯",
                image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/canvagif1.webp?v=1752485872"
              },
              {
                step: "Step 2",
                title: "Customize in Canva",
                desc: "Edit your template in seconds 🎨 with your logo, colors, and copy. Simple drag-and-drop. No design experience needed.",
                image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/canvagif2.gif?v=1752485913"
              },
              {
                step: "Step 3",
                title: "Launch & Scale",
                desc: "Download your ad from Canva and plant this 💥 bomb in Ads Manager. Watch your ROAS climb while your competitors struggle with creative testing.",
                image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/canvagif3.gif?v=1752485958"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="max-w-lg mx-auto p-8 rounded-2xl bg-white border-2 text-center"
                style={{ borderColor: '#EFBF04', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              >
                <h3 className="text-lg font-black text-black mb-2">{item.step}</h3>
                <h4 className="text-xl font-black mb-4" style={{ color: '#EFBF04' }}>{item.title}</h4>
                <p className="text-[#333] mb-6">{item.desc}</p>
                <img src={item.image} alt={item.title} className="w-full max-w-sm mx-auto rounded-lg" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-center text-black mb-6"
          >
            What You Get With <span style={{ color: '#EFBF04' }}>1,000 Templates</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-center text-[#333] mb-16"
          >
            Everything you need to dominate Meta advertising with proven creative assets
          </motion.p>

          <div className="space-y-6">
            {[
              { bold: "No more creative block.", text: "Stop staring at blank screens wondering what to create. Every template is ready to customize in seconds." },
              { bold: "30 seconds and it's ready.", text: "From choosing a template to having your creative downloaded - in less time than it takes to make coffee." },
              { bold: "Zero financial investment in software.", text: "All templates work in Canva's free version. No expensive subscriptions. No hidden costs." },
              { bold: "Battle-tested on massive budgets.", text: "All creatives are proven to work. Tested on huge ad spends in Meta ads. No need to run dozens of blind tests!" },
              { bold: "Instant creative variety.", text: "Test multiple angles, hooks, and formats without spending hours designing each one from scratch." },
              { bold: "Scale faster than competitors.", text: "While they waste time in design tools, you're launching new campaigns and finding winners." }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-5 p-6 rounded-xl border-l-4"
                style={{ backgroundColor: 'rgba(239, 191, 4, 0.05)', borderLeftColor: '#EFBF04' }}
              >
                <span className="text-2xl font-black" style={{ color: '#EFBF04' }}>✓</span>
                <p className="text-lg text-black">
                  <strong>{benefit.bold}</strong> {benefit.text}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-10 rounded-xl text-center border-2"
            style={{ background: 'linear-gradient(135deg, rgba(239, 191, 4, 0.1), rgba(239, 191, 4, 0.05))', borderColor: '#EFBF04' }}
          >
            <p className="text-xl font-semibold italic text-black mb-4">
              "According to Meta experts, there's a direct correlation between creative volume and a brand's ability to scale - massive budgets reward output, not just quality."
            </p>
            <p className="text-[#666] font-medium">- Meta Advertising Research</p>
          </motion.div>
        </div>
      </div>

      {/* Examples Carousel */}
      <div className="w-full py-20 px-6 lg:px-10 bg-[#f9f9f9] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-center text-black mb-16"
          >
            Examples Of <span style={{ color: '#EFBF04' }}>Winning Creatives</span>
          </motion.h2>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {[
              "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Screenshot_2024-10-21_at_09.52.10-min.avif?v=1752488312",
              "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Screenshot_2024-10-21_at_12.46.26-min.avif?v=1752488312",
              "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Screenshot_2024-10-18_at_09.00.13-min.avif?v=1752488312",
              "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Screenshot_2024-10-28_at_17.18.04-min.avif?v=1752488312",
              "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/AAAAAAAAAAART52.avif?v=1752488312",
              "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Screenshot_2024-10-18_at_09.01.34-min.avif?v=1752488312",
              "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Screenshot_2024-10-21_at_14.56.55-min.avif?v=1752488312",
              "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Screenshot_2024-10-03_at_17.03.08-min.avif?v=1752488312"
            ].map((src, index) => (
              <motion.img
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                src={src}
                alt={`Creative Example ${index + 1}`}
                className="h-80 w-72 object-cover rounded-xl flex-shrink-0"
                style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="w-full py-20 px-6 lg:px-10 bg-black">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-white mb-6"
          >
            Stop Wasting Time.<br />Start <span style={{ color: '#EFBF04' }}>Winning</span> Today.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-white/80 mb-12"
          >
            Get instant access to 1,000+ battle-tested creative templates and transform your Meta advertising in minutes, not months.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-2xl mb-10 border-2"
            style={{ backgroundColor: 'rgba(239, 191, 4, 0.1)', borderColor: '#EFBF04' }}
          >
            <p className="text-lg text-white/70 mb-2">One-Time Payment • Lifetime Access</p>
            <p className="text-4xl font-extrabold text-white mb-4">
              <span className="line-through text-white/50 text-3xl mr-3">${course.originalPrice}</span>
              <span style={{ color: '#EFBF04' }}>Only ${course.price}</span>
            </p>
            <p className="text-white/70 italic">
              That's less than $0.02 per template. A single winning creative pays for this 50x over.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={onCheckout}
            className="inline-flex items-center gap-3 px-12 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 text-white uppercase tracking-wide"
            style={{
              background: 'radial-gradient(ellipse at bottom, #FFF4CC 0%, #EFBF04 40%)',
              boxShadow: '0 10px 30px rgba(239, 191, 4, 0.4)'
            }}
          >
            <ShoppingCart size={24} />
            Get Instant Access Now
          </motion.button>

          <p className="text-white/60 mt-8 text-sm">
            ✓ Instant delivery • ✓ Works with free Canva • ✓ No subscriptions
          </p>
        </div>
      </div>
    </div>
  );
};

// ========== THE SUBCONSCIOUS TRAP ALTERNATIVE LAYOUT (VIEW 2) ==========

interface SubconsciousTrapAlternativeProps {
  course: {
    price: number;
    originalPrice?: number;
  };
  onCheckout: () => void;
}

const SubconsciousTrapAlternativeLayout = ({ course, onCheckout }: SubconsciousTrapAlternativeProps) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Exact modules from course data
  const modules = [
    { title: "The Brain, Unlocked", description: "What triggers the brain to buy and how to activate those triggers on demand." },
    { title: "The Copywriting Secrets", description: "The exact button text that boosted our conversions by 39%." },
    { title: "The Power of Fonts", description: "Which fonts increase trust and perceived brand value." },
    { title: "Winning Layouts", description: "Data-backed page structures that psychologically convert." },
    { title: "Code-Based Conversion Hacks", description: "CSS tweaks that increased our purchase rate by 21%." },
    { title: "Color Manipulations", description: "The exact color tactics that knock out the subconscious." },
    { title: "Psychological Positioning", description: "How to charge double your competitors and still convert at 6%+." },
    { title: "The Subconscious Switch", description: "70+ step-by-step implementation tasks." }
  ];

  // Exact bonuses from course data with images (3 bonuses, total $341)
  const bonuses = [
    { title: "The Intelligence Agent", value: 97, desc: "For months, we trained an AI agent to legally mimic the exact tactics used by billion-dollar brands - pixel by pixel, word by word. For FREE.", image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/16.jpg?v=1752150697" },
    { title: "Einstein on Steroids", value: 97, desc: "An AI brain powered by 180 IQ logic and timeless business wisdom. At the push of a button, it thinks what others can't - and together with you, will take your store to levels you never imagined.", image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/17.jpg?v=1752151300" },
    { title: "Your Personal Conversion Map", value: 147, desc: "A guided tracking system that takes you step by step - all the way to success (6%+).", image: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/18.jpg?v=1752151730" }
  ];

  // Exact FAQs from course data
  const faqItems = [
    { question: "Will this really work if my site already looks professional?", answer: "Absolutely. \"Looking professional\" and \"converting visitors\" are two completely different things. Your site might look like a million-dollar brand, but if it's not using psychological triggers, you're leaving massive money on the table. This framework shows you exactly what's missing - the subconscious manipulations that drive purchases." },
    { question: "I'm already converting at 3%. Is this still worth it?", answer: "Let me put it this way: if you're converting 3% now, this framework could take you to 5-6%+. That means nearly DOUBLING your revenue from the exact same traffic. Same ad spend, double the sales. How much is that worth to you?" },
    { question: "Do I need to know how to code?", answer: "Not at all. The framework includes simple copy-paste instructions for every element. If you can use Shopify's theme editor, you can implement this. We've made it accessible for complete beginners while keeping it powerful enough for advanced users." },
    { question: "Will this work for my specific product/niche?", answer: "Yes. These are universal psychological principles that work on the human brain - regardless of what you're selling. Whether it's fashion, electronics, home goods, or anything else, the subconscious responds the same way to these triggers." },
    { question: "What if I implement everything and it doesn't work?", answer: "Simple: we refund you 100%. No questions, no hassle. We're that confident because this framework is built on thousands of A/B tests with proven results. But if somehow it doesn't increase your conversions, just let us know and we'll give you every penny back." },
    { question: "Why is it only $10?", answer: "Honest answer? We could easily charge $997+ for this. But we want every serious eCommerce entrepreneur to have access to it - not just the ones with big budgets. The framework itself (plus 3 bonuses worth $341) is available for just $10. One-time payment, lifetime access." }
  ];

  // GIFs from course data
  const visuals = [
    { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/facepalm-stress.gif?v=1760351539", caption: "Stop losing money on ineffective strategies" },
    { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/HOW_TO.gif?v=1760351539", caption: "Learn proven psychological triggers" },
    { url: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2.gif?v=1760351539", caption: "Watch your conversions skyrocket" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="w-full py-16 lg:py-24 px-6 lg:px-10" style={{ backgroundColor: '#000' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-2 rounded-full mb-6"
                style={{ backgroundColor: 'rgba(255, 79, 3, 0.15)', border: '1px solid rgba(255, 79, 3, 0.3)' }}
              >
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#ff4f03' }}>Psychology-Based CRO</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl lg:text-5xl xl:text-6xl font-black mb-6 text-white leading-tight"
              >
                Convert at <span style={{ color: '#ff4f03' }}>4-6%+</span>
                <br />
                <span className="text-white/90">Using Subconscious Influence</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg lg:text-xl mb-8 text-white/70 leading-relaxed"
              >
                A psychology-driven framework to increase conversions, boost AOV, and drive repeat purchases — <span style={{ color: '#ff4f03' }}>without spending more on ads.</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-6 mb-8"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 79, 3, 0.2)' }}>
                    <BookOpen size={20} style={{ color: '#ff4f03' }} />
                  </div>
                  <span className="text-white/80 text-sm">8 Modules</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 79, 3, 0.2)' }}>
                    <Clock size={20} style={{ color: '#ff4f03' }} />
                  </div>
                  <span className="text-white/80 text-sm">6+ Hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 79, 3, 0.2)' }}>
                    <FileText size={20} style={{ color: '#ff4f03' }} />
                  </div>
                  <span className="text-white/80 text-sm">50+ Templates</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="text-5xl lg:text-6xl font-black" style={{ color: '#ff4f03' }}>${course.price}</span>
                {course.originalPrice && (
                  <div className="flex flex-col">
                    <span className="text-xl line-through text-white/40">${course.originalPrice}</span>
                    <span className="text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: '#ff4f03', color: '#fff' }}>
                      SAVE {Math.round((1 - course.price / course.originalPrice) * 100)}%
                    </span>
                  </div>
                )}
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={onCheckout}
                className="inline-flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-base transition-all hover:scale-105 text-white uppercase tracking-wide"
                style={{
                  background: 'linear-gradient(135deg, #ff4f03 0%, #ff7a3d 50%, #ff4f03 100%)',
                  boxShadow: '0 10px 40px rgba(255, 79, 3, 0.4)'
                }}
              >
                <ShoppingCart size={20} />
                GET INSTANT ACCESS
                <ArrowRight size={18} />
              </motion.button>

              <p className="text-xs mt-6 text-white/40">
                30-day money-back guarantee • Instant access • 3 bonuses worth $341 included
              </p>
            </div>

            {/* Right - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-2xl" style={{ background: 'radial-gradient(circle at center, rgba(255, 79, 3, 0.3) 0%, transparent 70%)' }} />
              <img
                src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff.jpg?v=1760351539"
                alt="The Subconscious Trap Course"
                className="w-full rounded-2xl shadow-2xl relative z-10"
                style={{ boxShadow: '0 25px 80px rgba(255, 79, 3, 0.3)' }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* The Story Section with GIFs */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#111] mb-4">
              Your customers don&apos;t buy logically.
            </h2>
            <p className="text-xl text-[#666] max-w-2xl mx-auto">
              They buy emotionally — then justify it later.
            </p>
          </motion.div>

          {/* GIFs Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {visuals.map((visual, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="rounded-xl overflow-hidden mb-4 bg-[#fafafa] border border-[#eee]">
                  <img
                    src={visual.url}
                    alt={visual.caption}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <p className="text-sm text-[#666]">{visual.caption}</p>
              </motion.div>
            ))}
          </div>

          {/* The Problem */}
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-[#fafafa] border border-[#eee]"
            >
              <h3 className="text-xl font-bold text-[#111] mb-4">Every element of your store...</h3>
              <p className="text-[#666] leading-relaxed mb-4">
                From your headline to your checkout button — either builds buying momentum or kills it.
              </p>
              <p className="text-[#666] leading-relaxed">
                Most stores are unknowingly sabotaging themselves at every step. Your site might look like a million-dollar brand, but if it&apos;s not using psychological triggers, you&apos;re leaving massive money on the table.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border-2"
              style={{ borderColor: '#ff4f03', backgroundColor: 'rgba(255, 79, 3, 0.05)' }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#ff4f03' }}>
                  <TrendingUp size={32} className="text-white" />
                </div>
                <div>
                  <div className="text-4xl font-bold" style={{ color: '#ff4f03' }}>6%+</div>
                  <div className="text-sm text-[#666]">Target Conversion Rate</div>
                </div>
              </div>
              <p className="text-[#444] leading-relaxed">
                In this course, you&apos;ll learn exactly how to identify and fix these conversion killers, then install proven psychological triggers that turn browsers into buyers, and buyers into loyal customers.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Course Modules Section */}
      <div className="w-full py-20 px-6 lg:px-10" style={{ backgroundColor: '#111' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'rgba(255, 79, 3, 0.15)' }}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#ff4f03' }}>8 Complete Modules</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Inside The Subconscious Trap
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Every psychological principle is backed by real A/B test data
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-white" style={{ backgroundColor: '#ff4f03' }}>
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{module.title}</h3>
                  <p className="text-white/60 text-sm">{module.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Total Bonus Value Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 rounded-xl text-center"
            style={{ backgroundColor: 'rgba(255, 79, 3, 0.15)', border: '2px dashed rgba(255, 79, 3, 0.5)' }}
          >
            <p className="text-lg text-white">
              <span className="font-bold">Plus 3 Exclusive Bonuses</span>{' '}
              <span className="text-2xl font-black" style={{ color: '#ff4f03' }}>Worth $341</span>{' '}
              <span className="text-white/70">— All Included FREE</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bonuses Section with Images */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'rgba(255, 79, 3, 0.1)' }}>
              <span className="text-sm font-bold" style={{ color: '#ff4f03' }}>VALUED AT $341</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#111] mb-4">
              3 Exclusive Bonuses Included
            </h2>
            <p className="text-xl text-[#666] max-w-2xl mx-auto">
              Everything you need to implement these tactics immediately
            </p>
          </motion.div>

          {/* Bonus Cards with Images */}
          <div className="space-y-6">
            {bonuses.map((bonus, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-[#fafafa] border border-[#eee] overflow-hidden"
              >
                {/* Bonus Image */}
                <div className="w-full md:w-48 h-40 md:h-auto flex-shrink-0 rounded-xl overflow-hidden bg-white">
                  <img
                    src={bonus.image}
                    alt={bonus.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Bonus Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#ff4f03' }}>
                        <Gift size={16} className="text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-[#111]">{bonus.title}</h3>
                    </div>
                    <span className="text-sm font-bold px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255, 79, 3, 0.1)', color: '#ff4f03' }}>
                      ${bonus.value} Value
                    </span>
                  </div>
                  <p className="text-[#666] leading-relaxed">{bonus.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 p-8 rounded-2xl text-center"
            style={{ backgroundColor: 'rgba(255, 79, 3, 0.1)', border: '2px dashed #ff4f03' }}
          >
            <p className="text-xl">
              <span className="font-bold text-[#111]">Total Bonus Value:</span>{' '}
              <span className="text-3xl font-black" style={{ color: '#ff4f03' }}>$341</span>{' '}
              <span className="text-[#666]">— Yours FREE when you join today</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Two Paths Comparison */}
      <div className="w-full py-20 px-6 lg:px-10 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#111] mb-4">
              Two Paths. One Choice.
            </h2>
            <p className="text-xl text-[#666] max-w-2xl mx-auto">
              Where will you be 30 days from now?
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-white border border-[#eee]"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#eee] flex items-center justify-center mx-auto mb-4">
                  <X size={32} className="text-[#999]" />
                </div>
                <h3 className="text-xl font-bold text-[#666]">Stay the Same</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Keep guessing why visitors leave',
                  'Watch competitors convert better',
                  'Leave money on the table daily',
                  'Wonder what you\'re missing',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-[#666]">
                    <X size={16} className="flex-shrink-0 text-[#ccc]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border-2"
              style={{ borderColor: '#ff4f03', backgroundColor: 'rgba(255, 79, 3, 0.05)' }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#ff4f03' }}>
                  <Check size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold" style={{ color: '#ff4f03' }}>Take Action Today</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Understand exactly why visitors buy',
                  'Convert up to 44% more visitors',
                  'Implement proven psychological triggers',
                  'Build a store that sells on autopilot',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-[#444]">
                    <Check size={16} className="flex-shrink-0" style={{ color: '#ff4f03' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#111] mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-[#666] text-center mb-12">
            Everything you need to know before you start
          </p>

          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden bg-[#fafafa] border border-[#eee]"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-[#f0f0f0] transition-colors"
                >
                  <span className="font-semibold text-[#111] pr-4">{item.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp size={20} className="text-[#666] flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-[#666] flex-shrink-0" />
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
                      <p className="text-[#666]">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="w-full py-20 px-6 lg:px-10" style={{ backgroundColor: '#111' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
              Ready to Unlock the <span style={{ color: '#ff4f03' }}>Psychology</span> of Conversions?
            </h2>
            <p className="text-xl mb-4 text-white/70">
              Join 2,000+ store owners who've already discovered the subconscious triggers
            </p>

            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-5xl lg:text-7xl font-bold" style={{ color: '#ff4f03' }}>${course.price}</span>
              {course.originalPrice && (
                <span className="text-2xl line-through text-white/40">${course.originalPrice}</span>
              )}
            </div>

            <button
              onClick={onCheckout}
              className="inline-flex items-center gap-3 px-14 py-5 rounded-xl font-bold text-lg transition-all hover:scale-105 text-white uppercase tracking-wide"
              style={{
                background: 'linear-gradient(135deg, #ff4f03 0%, #ff7a3d 50%, #ff4f03 100%)',
                boxShadow: '0 10px 40px rgba(255, 79, 3, 0.4)'
              }}
            >
              <ShoppingCart size={24} />
              GET INSTANT ACCESS
              <ArrowRight size={20} />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-8 mt-10 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <Shield size={18} />
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift size={18} />
                <span>$341 in Bonuses</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// ========== THE LTV SYSTEM ALTERNATIVE LAYOUT (VIEW 2) ==========

interface LTVSystemAlternativeProps {
  course: {
    price: number;
    originalPrice?: number;
  };
  onCheckout: () => void;
}

const LTVSystemAlternativeLayout = ({ course, onCheckout }: LTVSystemAlternativeProps) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // 5 Weapons - Training Modules
  const weapons = [
    { number: 1, title: 'The LTV Engine Blueprint', desc: 'Discover the psychological and technical system that makes every customer worth $1,000+. A backend architecture built to multiply profits automatically.' },
    { number: 2, title: 'The Laws of Human Persuasion', desc: 'Harness the secret laws of human psychology that steer attention, trigger craving, and make customers load massive carts - again and again.' },
    { number: 3, title: 'The Automation Loop Protocols', desc: 'Build the self-sustaining system that runs your business 24/7 — loyalty, upsells, emails, all working together to generate infinite LTV.' },
    { number: 4, title: 'The Rebuy Technology System', desc: 'Master the brain loops that trigger automatic repeat purchases and oversized carts - used by luxury brands to multiply LTV effortlessly.' },
    { number: 5, title: 'The Empire Growth Formula', desc: 'The scaling logic that lets you outspend competitors fearlessly - using psychology, math, and automation instead of luck.' },
  ];

  // FAQ items from HTML
  const faqItems = [
    { question: 'Is this really possible? Can I actually get $1,000 from each customer?', answer: 'Yes, absolutely. This isn\'t theory - it\'s a proven system we use in our own stores and have taught to thousands of students. The screenshots and results you see are real. When you build a proper LTV system with the right psychology triggers, email sequences, and product ecosystem, customers naturally spend $1,000+ over their lifetime. And with our system, around $600 of that is pure profit going into your pocket.' },
    { question: 'Don\'t I need a huge brand or massive inventory to do this?', answer: 'Not at all. This is one of the biggest myths. The LTV system is built on psychology and automation, not on having 10,000 SKUs. You can start with as few as 10-20 products and build a money-printing machine. The key is understanding how to make customers come back automatically, which has nothing to do with inventory size and everything to do with the right triggers and sequences.' },
    { question: 'What if I have no prior experience, and my website is not live yet?', answer: 'Perfect. Do not begin before joining us. Most entrepreneurs with prior experience quickly realize that they must rebuild everything from the ground up, and in the right way. Joining us will save you a great deal of time and money, even as a beginner. We\'ll show you exactly how to set up your entire system correctly from day one.' },
    { question: 'Will this work in my niche or market?', answer: 'Yes, absolutely. The system is designed for every niche and every market. Whether you\'re selling in a small town or globally, whether you\'re offering beauty products, home goods, fitness equipment, or anything else - the psychology of high LTV works universally. We have students succeeding in dozens of different niches.' },
    { question: 'How long until I see results?', answer: 'LTV is a long-term game, but you\'ll start seeing the foundation working within 30-60 days. The beauty of this system is that once it\'s set up, it compounds. Month 1 might bring in $500 per customer, month 3 might be $700, and by month 12 you\'re hitting $1,000+ per customer. This isn\'t a "get rich quick" scheme - it\'s a "get rich for sure" system.' },
    { question: 'Why $10?', answer: 'An excellent question. This course contains the exact system we use to generate $180,000+ in monthly net profit. The information inside is worth tens of thousands of dollars in real-world value. When creating the course, we could have easily priced it at $2,000 or more - and it would still be worth it. However, we want this to be accessible to serious entrepreneurs who are ready to invest in a proven system. At $10, you\'re getting a complete blueprint that will transform every customer into a $1,000 money tree. This is a one-time payment with lifetime access and no hidden fees.' },
  ];

  // Comparison table data
  const comparisonRows = [
    { skip: 'Chasing $80 LTV customers forever', join: 'Building $1,000 LTV money trees' },
    { skip: 'Panic when CAC rises by 10%', join: 'Unbeatable - acquire customers at 0.5 ROAS and still profit massively' },
    { skip: 'Living in fear of algorithm changes', join: 'A proven system that prints $180,000+ monthly net profit' },
    { skip: 'One-time sales, constant stress', join: 'Automatic repeat purchases - customers come back again and again' },
    { skip: 'Settling for break-even or small profits', join: '$600 pure profit per customer going straight to your pocket' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Black Background */}
      <div className="w-full py-16 lg:py-20 px-6 lg:px-10" style={{ backgroundColor: '#000' }}>
        <div className="max-w-5xl mx-auto text-center">
          {/* Pulse Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8"
            style={{ backgroundColor: '#252525' }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: '#00bc0d',
                animation: 'pulse 1.6s infinite',
                boxShadow: '0 0 0 0 rgba(0, 188, 13, 0.7)'
              }}
            />
            <span className="text-sm text-white">The system that changes the rules of the game...</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight"
            style={{ color: '#ffffff' }}
          >
            How to earn <span style={{ color: '#00bc0d' }}>$1,000</span> per customer
          </motion.h1>

          {/* Sub Headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl lg:text-2xl mb-8 text-white/80 italic"
          >
            Even with $30-60 products, turn every customer into $600 net profit
          </motion.p>

          {/* Hero Screenshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/43.jpg?v=1760347643"
              alt="High LTV Dashboard"
              className="max-w-full md:max-w-3xl mx-auto rounded-lg"
              style={{
                boxShadow: '0 0 16px rgba(0, 188, 13, 0.9), 0 0 28px rgba(0, 188, 13, 0.6), 0 0 40px rgba(0, 188, 13, 0.3)',
                border: '2px solid rgba(0, 188, 13, 0.7)'
              }}
            />
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-8"
          >
            <p className="text-3xl lg:text-4xl font-semibold text-white mb-6">
              <span className="line-through opacity-60 mr-4">${course.originalPrice || 500}</span>
              Only ${course.price} Today
            </p>

            {/* CTA Button */}
            <button
              onClick={onCheckout}
              className="inline-flex flex-col items-center justify-center px-16 lg:px-24 py-4 lg:py-5 rounded-full font-bold text-lg lg:text-xl text-white uppercase tracking-wide transition-all hover:scale-105 hover:shadow-2xl"
              style={{
                background: 'radial-gradient(ellipse at bottom, #4BC978 0%, #00A820 40%)',
                boxShadow: '0 6px 20px rgba(0, 168, 32, 0.35)',
                minHeight: '80px'
              }}
            >
              <span>ADD THE LTV SYSTEM!</span>
              <span className="text-xs lg:text-sm font-normal normal-case tracking-normal mt-1">
                one time payment of ${course.price}, lifetime access.
              </span>
            </button>
          </motion.div>

          {/* Secure Payment */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-white/80 text-sm"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Mastercard-Logo.wine.png?v=1758464867"
              alt="Secure"
              className="w-7 h-7 object-contain"
            />
            <span>Secure 256-bit SSL encrypted payment</span>
          </motion.div>
        </div>
      </div>

      {/* Story Section - White Background */}
      <div className="w-full py-16 lg:py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-black text-black mb-4">
              Finally, a way to earn $1,000 per new customer...
            </h2>
          </motion.div>

          {/* Story Content */}
          <div className="space-y-6 text-lg text-black leading-relaxed">
            <p className="mb-16">Before you dive in... let me share something that completely transformed how we think about eCommerce.</p>

            <p className="mb-10">Most store owners are stuck in survival mode...</p>

            <p className="mb-10">Praying that their next ad campaign breaks even. Celebrating when they make $50 profit on a customer...</p>

            <div className="h-16" />

            <p className="mb-10">And here&apos;s the brutal truth... If your LTV (Customer&apos;s Lifetime Value) is only $80, you&apos;re one algorithm change away from <span className="font-bold text-red-600">bankruptcy</span>.</p>

            <p className="mb-6">When CAC rises from $30 to $45, you panic.<br/>When Meta changes something, you lose sleep.<br/><br/>Your entire business hangs by a thread.</p>

            <div className="h-12" />

            <p className="text-2xl mb-6">But what if you could spend <strong>$90 to acquire a customer</strong> and still smile... because you know they&apos;ll generate $1,000?</p>

            <div className="h-12" />

            <p className="text-center text-sm text-gray-500 mb-4">(ROAS 11 Overtime)</p>

            <p className="text-xl text-center mb-16">Exactly, you&apos;d become <strong>unstoppable</strong>. And that&apos;s exactly what you&apos;re about to become.</p>

            <p className="mb-6">The YouTube influencers won&apos;t tell you this... because they profit from keeping you stuck in the testing trap.</p>

            {/* Mentor GIF */}
            <div className="text-center my-10">
              <img
                src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/a-mentor-everybodys-talking-about-jamie.gif?v=1756821071"
                alt="Fake guru meme"
                className="max-w-xs mx-auto rounded-lg"
              />
            </div>

            <p className="text-3xl font-bold text-red-600 text-center my-10">&quot;Just lower the CPA!&quot;</p>

            <p className="text-center">But no one talks about what happens when it rises a bit... The fine line is crossed, and you start losing money.</p>
          </div>
        </div>
      </div>

      {/* The Truth Section */}
      <div className="w-full py-16 lg:py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-black mb-6">Here&apos;s what nobody talks about...</h2>

          <div className="space-y-6 text-lg text-black leading-relaxed">
            <p>The real difference between struggling stores and million-dollar stores isn&apos;t traffic.</p>

            <div className="h-6" />

            <p className="mb-12">It&apos;s not better products. It&apos;s not even better ads.</p>

            <div className="h-6" />

            <p className="mb-8">It&apos;s <strong>Customer Lifetime Value</strong>.</p>

            <p className="mb-6">The biggest leverage you can pull in eCommerce is simply making more from each customer.</p>

            <p className="mb-6">Instead of a per-customer turnover of $80 that leaves you with $20 profit (you&apos;d need 300 new customers per day for <strong>$180,000 profit per month</strong>...</p>

            <div className="h-12" />

            <p className="mb-2">your average customer will be worth $1,000 with a net profit of $600.</p>

            <p className="mb-6">Now, you&apos;ll only need <strong>10 new customers every day</strong> (instead of 300!) to maintain <strong>$180,000 profit per month</strong>... and guess what?</p>

            <p className="text-xl mb-8"><strong>Even if the algorithm breaks and your CPA increases by 50%... you&apos;re unbreakable.</strong></p>

            <p className="mb-8">Your profit per customer is so high, it simply doesn&apos;t concern you.</p>

            {/* Knockout GIF */}
            <div className="text-center my-10">
              <img
                src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/200w.gif?v=1760566014"
                alt="Knockout punch"
                className="max-w-xs mx-auto rounded-lg"
              />
              <p className="text-sm text-gray-500 mt-2 italic">This is the official knockout to the ruthless Zuckerberg</p>
            </div>

            <p className="mb-8">The stores printing money have cracked the code: turn one customer into multiple sales. Automatically.</p>

            <p className="mb-4">While everyone else fights over scraps... these stores dominate because they can afford to pay MORE for customers.</p>

            {/* Money Scrolling GIF */}
            <div className="text-center my-10">
              <img
                src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff_5__gm_optimized.gif?v=1760351611"
                alt="High AOV orders scrolling"
                className="max-w-2xl mx-auto rounded-lg w-full"
              />
              <p className="text-xs text-gray-500 mt-2 italic">*Women&apos;s fashion brand, items priced $40-60, average cart $340, within a year the customer is worth an average of $1,426</p>
            </div>

            <div className="h-6" />

            <p className="mb-6">I know this feeling intimately...</p>

            <p className="mb-8">That sinking sensation when you check your ad account and realize you just burned $200 to make $150 in revenue.</p>

            <p className="mb-6">The constant stress of wondering if you&apos;ll still be profitable tomorrow...</p>

            <p className="mb-6">Knowing that if tomorrow your ad account gets shut down, you won&apos;t make a single cent...</p>

            <div className="h-6" />

            <p className="text-2xl mb-16">Living month-to-month, <strong>never feeling secure.</strong></p>

            <div className="h-6" />

            <p className="mb-8">Everything changed when we discovered this truth:<br/><br/>Before you start chasing new clients, make sure you have an automated system that turns every new customer into a <strong>big chunk of money.</strong></p>

            {/* Cash Image */}
            <div className="text-center my-10">
              <img
                src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-13T123143.184.png?v=1760347916"
                alt="$600 cash profit"
                className="max-w-2xl mx-auto rounded-lg w-full"
              />
              <p className="text-xs text-gray-500 mt-2">*This is what $600 looks like - your pure profit from just ONE customer with the LTV system.</p>
            </div>

            <div className="h-6" />

            <h2 className="text-3xl font-black text-black text-center my-16">Sounds too good to be true? Now, it&apos;s possible...</h2>

            <p className="text-center mb-6">In recent years we developed, refined, tested, an automatic system that turns every customer into a seed of a money tree, that after he purchased from us grows automatically, and within a year reaches $1,000 alone - without spending more money on marketing for him...</p>

            {/* Money Tree Image */}
            <div className="text-center my-10">
              <img
                src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2500_x_1000_1.jpg?v=1756821177"
                alt="Money Tree Growth"
                className="max-w-full mx-auto rounded-lg shadow-lg"
              />
            </div>

            <p className="text-2xl font-bold mt-10 mb-4">This is your turning point...</p>

            <p className="mb-6">No more living in fear. No more barely breaking even.</p>

            <p className="mb-14">You&apos;re about to discover <strong>the only sustainable path</strong> to real wealth in eCommerce.</p>

            <p className="mb-10">A system where each customer becomes worth <strong>$1,000 automatically</strong>... generating cash flow while you focus on growth, not survival.</p>

            <p className="mb-6">Are you ready?</p>

            <p className="mb-8">Because what you&apos;re about to see will change everything you thought you knew about eCommerce...</p>
          </div>
        </div>
      </div>

      {/* Course Blueprint Section */}
      <div className="w-full py-16 lg:py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-gray-500 font-normal tracking-widest text-sm mb-4">THE COMPLETE BLUEPRINT:</p>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">THE LTV SYSTEM</h2>
          </div>

          <div className="space-y-6 text-lg text-black leading-relaxed">
            <p>This is the <strong>exact framework</strong> we use to generate over $180,000 in net monthly profit... by transforming every single customer into a recurring revenue machine worth $1,000.</p>

            <p className="italic text-base text-gray-600">(Yes, even if your average product price is just $30-60)</p>

            <div className="h-6" />

            <p>Inside, you&apos;ll discover the <strong>complete system...</strong></p>

            <p>Every psychology trigger... every automation sequence... every metric that matters. Nothing held back.</p>

            <div className="h-6" />

            <p>So you can start earn $1,000+ Per customer (on 12 months period, and $200-300$ within the first month),</p>

            <p>just like this...</p>

            {/* Revenue Screenshots */}
            <div className="space-y-4 my-10">
              <img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Screenshot_2025-10-17_161158.png?v=1760706795" alt="Revenue Screenshot 1" className="w-full rounded-lg" />
              <img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Screenshot_2025-10-17_161549.png?v=1760706973" alt="Revenue Screenshot 2" className="w-full rounded-lg" />
              <img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Screenshot_2025-10-17_164641.png?v=1760708904" alt="Revenue Screenshot 3" className="w-full rounded-lg" />
            </div>

            <p>This isn&apos;t theory from someone who &quot;teaches&quot; eCommerce. This is the battle-tested playbook from stores doing <strong>multiple 7-figures monthly</strong>.</p>

            <div className="h-6" />

            <p>And here&apos;s what makes it revolutionary...</p>

            <p className="mb-12">When your LTV hits $1,000 per customer... you become <strong>unstoppable</strong>. While competitors panic at $35 CAC, you&apos;re casually spending $60+ and still printing money. You own the market.</p>

            <h3 className="text-2xl font-black text-black mt-24 mb-8">This system eliminates guesswork and gambling</h3>

            <p>This is <strong>not</strong> about &quot;finding winners&quot; or hoping your next product goes viral.</p>

            <p className="mb-12">This is about building an asset that generates predictable, compound revenue. Month after month. Year after year.</p>

            <div className="h-12" />

            <p className="italic">Think about it...</p>

            <p className="mb-8">What if you had a <strong>proven blueprint</strong> that guarantees long-term profitability?</p>

            <div className="h-6" />

            <p>A system pouring cash into your account <strong>every hour of every day...</strong></p>

            <p className="italic text-sm text-gray-600 -mt-4 mb-8">(Completely on autopilot once it&apos;s set up)</p>

            <div className="h-6" />

            <p>Where acquiring customers at &quot;high&quot; CAC doesn&apos;t scare you... because each one generates $1,000?</p>

            <p className="mt-2 mb-8">That&apos;s your new reality. Starting now.</p>

            <p className="text-center text-2xl mb-16"><strong>Welcome to true financial freedom in eCommerce.</strong></p>

            <div className="h-6" />

            <p>Now listen, I want to be honest with you...</p>

            <p className="mb-16">I know how much you&apos;ve been burned in the past. I know the frustration. I know the fears. But deep down, both you and I know <strong>you are capable of achieving this</strong> - and in a very big way.</p>

            <div className="h-12" />

            <p className="text-2xl font-bold mb-1">Here&apos;s my commitment to you...</p>
            <p className="italic text-sm text-gray-600 mb-6">(From the founder of Quantum Scale)</p>

            <p className="mb-10">If you implement this system exactly as taught, <strong>you will transform your business</strong>. This isn&apos;t hype. It&apos;s mathematics. Higher LTV = unstoppable growth.</p>

            <p className="mb-12">You&apos;re here because you want real results, not empty promises. So let me show you exactly what you&apos;re getting...</p>

            <h3 className="text-2xl font-bold text-black mt-16 mb-6">The proof is in the numbers...</h3>

            <p className="mb-6">Here&apos;s what happens when you implement the LTV System:</p>

            {/* Comparison Table 1 */}
            <div className="overflow-x-auto my-8">
              <table className="w-full border-collapse shadow-lg text-sm">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-3 text-center bg-gray-100 font-bold"></th>
                    <th className="border border-gray-300 p-3 text-center bg-gray-100 font-bold">LTV $80</th>
                    <th className="border border-gray-300 p-3 text-center bg-gray-100 font-bold">LTV $1,000</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="border border-gray-300 p-3 text-left bg-gray-50 font-bold">Monthly Customers</th>
                    <td className="border border-gray-300 p-3 text-center">100</td>
                    <td className="border border-gray-300 p-3 text-center">100</td>
                  </tr>
                  <tr>
                    <th className="border border-gray-300 p-3 text-left bg-gray-50 font-bold">Revenue</th>
                    <td className="border border-gray-300 p-3 text-center">$8,000</td>
                    <td className="border border-gray-300 p-3 text-center font-bold" style={{ color: '#00bc0d' }}>$100,000</td>
                  </tr>
                  <tr>
                    <th className="border border-gray-300 p-3 text-left bg-gray-50 font-bold">Product+Fee Cost</th>
                    <td className="border border-gray-300 p-3 text-center">$2,640</td>
                    <td className="border border-gray-300 p-3 text-center">$33,000</td>
                  </tr>
                  <tr>
                    <th className="border border-gray-300 p-3 text-left bg-gray-50 font-bold">Ad Spend</th>
                    <td className="border border-gray-300 p-3 text-center">$3,000</td>
                    <td className="border border-gray-300 p-3 text-center">$3,000</td>
                  </tr>
                  <tr className="bg-red-50">
                    <th className="border border-gray-300 p-3 text-left bg-gray-50 font-bold">Net Profit (Future Monthly)</th>
                    <td className="border border-gray-300 p-3 text-center text-red-600 font-bold">-$1,640<br/>(monthly)</td>
                    <td className="border border-gray-300 p-3 text-center font-bold text-lg" style={{ color: '#00bc0d' }}>$64,000<br/>(monthly)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center italic text-sm text-gray-500 mb-12">* Based on 100 customers per month with $30 CAC</p>

            <h3 className="text-2xl font-bold text-black text-center mt-16 mb-6">But that&apos;s not all...</h3>

            <p className="mb-6">After you copy our system, you won&apos;t be afraid anymore of CAC rising with scale...</p>

            <p className="mb-6">Because if you raise the budget to $15,000 per day, you won&apos;t be afraid that the acquisition cost will rise to $60, because each customer is worth $1,000 to you, which means <strong>you become unbeatable...</strong></p>

            <p className="mb-8">You&apos;ll be able to raise budgets almost endlessly, and be significantly profitable. Which means - crushing your competition and anyone who stands in your way.</p>

            {/* Comparison Table 2 */}
            <div className="overflow-x-auto my-8">
              <table className="w-full border-collapse shadow-lg text-sm">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-3 text-center bg-gray-100 font-bold"></th>
                    <th className="border border-gray-300 p-3 text-center bg-gray-100 font-bold">LTV $80</th>
                    <th className="border border-gray-300 p-3 text-center bg-gray-100 font-bold">LTV $1,000</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="border border-gray-300 p-3 text-left bg-gray-50 font-bold">Monthly Customers</th>
                    <td className="border border-gray-300 p-3 text-center">7,500</td>
                    <td className="border border-gray-300 p-3 text-center">7,500</td>
                  </tr>
                  <tr>
                    <th className="border border-gray-300 p-3 text-left bg-gray-50 font-bold">Revenue</th>
                    <td className="border border-gray-300 p-3 text-center">$600,000</td>
                    <td className="border border-gray-300 p-3 text-center font-bold" style={{ color: '#00bc0d' }}>$7,500,000</td>
                  </tr>
                  <tr>
                    <th className="border border-gray-300 p-3 text-left bg-gray-50 font-bold">Product+Fee Cost</th>
                    <td className="border border-gray-300 p-3 text-center">$198,000</td>
                    <td className="border border-gray-300 p-3 text-center">$2,475,000</td>
                  </tr>
                  <tr>
                    <th className="border border-gray-300 p-3 text-left bg-gray-50 font-bold">Ad Spend</th>
                    <td className="border border-gray-300 p-3 text-center">$450,000</td>
                    <td className="border border-gray-300 p-3 text-center">$450,000</td>
                  </tr>
                  <tr className="bg-red-50">
                    <th className="border border-gray-300 p-3 text-left bg-gray-50 font-bold">Net Profit (Future Monthly)</th>
                    <td className="border border-gray-300 p-3 text-center text-red-600 font-bold">-$48,000<br/>(monthly)</td>
                    <td className="border border-gray-300 p-3 text-center font-bold text-lg" style={{ color: '#00bc0d' }}>$4,575,000<br/>(monthly)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center italic text-sm text-gray-500 mb-12">* Table calculated based on $15,000 daily budget - $60 CAC</p>

            <h3 className="text-2xl font-bold text-black mt-24 mb-6">Real results from real students...</h3>

            {/* Testimonial Images */}
            <div className="space-y-1 my-8">
              <img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-09-21_at_10.01.47_b3adc62a_c2c430a8-e580-4140-91cf-8525c28fef88.jpg?v=1758438491" alt="Student testimonials" className="w-full rounded-lg" />
              <img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-09-21_at_09.47.58_29fb6179.jpg?v=1758438412" alt="Student testimonials" className="w-full rounded-lg" />
              <img src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-09-21_at_09.06.37_d3541d83.jpg?v=1758438423" alt="Student testimonials" className="w-full rounded-lg" />
            </div>

            <h3 className="text-2xl font-bold text-black mt-24 mb-6">What&apos;s inside The LTV System:</h3>

            <div className="space-y-3">
              <p className="text-base">💰 The psychology framework that makes customers buy repeatedly (without feeling &quot;sold to&quot;)</p>
              <p className="text-base">💰 Email automation sequences that generate 40-60% of total revenue</p>
              <p className="text-base">💰 The product ecosystem strategy that naturally drives repeat purchases</p>
              <p className="text-base">💰 Scaling strategies that work at $10K/month and $1M/month</p>
              <p className="text-base">💰 The complete metrics dashboard to track and optimize your LTV</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Weapons Section */}
      <div className="w-full py-16 lg:py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-black text-black mb-4">The Arsenal That Transforms Customers Into Money Trees</h2>
            <p className="text-lg text-gray-700">Master the dark psychology and cutting-edge technology that forces customers to buy repeatedly</p>
          </motion.div>

          {/* Weapon Cards */}
          <div className="space-y-6">
            {weapons.map((weapon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="inline-block bg-black text-white px-5 py-2 rounded-full text-sm font-bold mb-5">
                  🎁 WEAPON {weapon.number}
                </div>
                <h3 className="text-2xl font-black mb-3" style={{ color: '#00bc0d' }}>{weapon.title}</h3>
                <p className="text-gray-700 text-base leading-relaxed">{weapon.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* We Do It Different / Comparison Section */}
      <div className="w-full py-16 lg:py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-black mb-6">We Do it Different</h2>

            <p className="text-lg text-black mb-8">
              For the price of a pair of socks, you&apos;re about to unlock life-changing content. Or... you can ignore this page... and stay trapped in the $80 LTV hamster wheel forever.
            </p>

            <p className="text-base text-black mb-10">
              You&apos;ve got 2 options, just choose who you&apos;d rather be.
            </p>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-left">
                <thead>
                  <tr>
                    <th className="text-2xl font-extrabold text-center p-5 bg-gray-300 border border-gray-300">❌ Skip this offer</th>
                    <th className="text-2xl font-extrabold text-center p-5 bg-gray-300 border border-gray-300">✅ Join Us</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr key={index}>
                      <td className="p-5 text-base text-black bg-gray-50 border border-gray-300 align-top">{row.skip}</td>
                      <td className="p-5 text-base text-black bg-gray-50 border border-gray-300 align-top">{row.join}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-black italic mt-6 mb-10 text-left">* P.S. 100% of the course price (${course.price}) is recognized as a business expense for tax purposes.</p>

            {/* CTA Button */}
            <button
              onClick={onCheckout}
              className="inline-flex items-center justify-center px-16 py-5 rounded-full font-bold text-2xl text-white uppercase tracking-wide transition-all hover:scale-105 hover:shadow-2xl mt-10"
              style={{
                background: 'radial-gradient(ellipse at bottom, #4BC978 0%, #00A820 40%)',
                boxShadow: '0 6px 20px rgba(0, 168, 32, 0.35)',
                minWidth: '380px',
                minHeight: '81px'
              }}
            >
              Turn Customers Into Money Trees!
            </button>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-extrabold text-black mb-4 text-center"
          >
            FAQ
          </motion.h2>
          <p className="text-center text-black mb-12 text-lg">
            (Got questions? I&apos;ve got no-BS answers.)
          </p>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden bg-black"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-[#1a1a1a] transition-colors"
                >
                  <span className="font-bold text-white pr-4 text-base">{item.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp size={20} className="text-white flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-white flex-shrink-0" />
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
                      <p className="text-white/80 text-base">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <button
              onClick={onCheckout}
              className="inline-flex items-center justify-center px-20 py-6 rounded-full font-bold text-2xl text-white uppercase tracking-wide transition-all hover:scale-105 hover:shadow-2xl"
              style={{
                background: 'radial-gradient(ellipse at bottom, #4BC978 0%, #00A820 40%)',
                boxShadow: '0 6px 20px rgba(0, 168, 32, 0.35)',
                minWidth: '480px',
                minHeight: '90px'
              }}
            >
              BUILD MY MONEY TREES!
            </button>

            <p className="text-base text-black mt-6">
              Everything will be in your email within 17 seconds.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// ========== EMAIL MARKETING ALTERNATIVE LAYOUT (VIEW 2) ==========

interface EmailMarketingAlternativeProps {
  course: {
    price: number;
    originalPrice?: number;
  };
  onCheckout: () => void;
}

const EmailMarketingAlternativeLayout = ({ course, onCheckout }: EmailMarketingAlternativeProps) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const systemParts = [
    { number: '1', title: 'Business Intelligence + World-Class Setup', desc: 'The most advanced BI configuration on the planet—optimizing send times, frequency, and content delivery on a per-customer basis. No more batch-and-blast. Every email hits when that specific person is most likely to convert.' },
    { number: '2', title: 'Smart Automation Powered by AI + Data', desc: 'Automated systems that send hyper-personalized messages based on a fusion of massive behavioral data and AI-driven predictions. Each customer gets a tailored experience that feels handcrafted—but runs 100% on autopilot.' },
    { number: '3', title: 'Precision-Engineered Email Copy', desc: 'Emails designed to strike the exact psychological trigger in each customer\'s mind—at the perfect moment—to convert them individually. No generic templates. Just proven frameworks that turn readers into buyers.' },
  ];

  const comparisonRows = [
    { old: 'Guessing what to send and when to send it, hoping something sticks', new: 'Using predictive BI systems that tell you exactly when each customer is ready to buy' },
    { old: 'Sending the same generic emails to everyone on your list', new: 'AI-powered personalization that adapts every message based on behavior and patterns' },
    { old: 'Treating email as just another marketing channel', new: 'Building email into a ruthless revenue engine that operates 24/7' },
    { old: 'Relying on constant discounts just to get opens', new: 'Using psychological triggers and strategic timing to create desire without slashing margins' },
    { old: 'Watching competitors get better results with less effort', new: 'Operating with the same technological advantage that billion-dollar brands use' },
  ];

  const faqItems = [
    { question: 'I already know email marketing. Why do I need this?', answer: 'This isn\'t about basics. This is about highly advanced tactics that take email marketing from "nice to have" to "impossible to compete with." These are the systems that give billion-dollar brands a technological advantage over everyone else.' },
    { question: 'I don\'t think I need email marketing for my business.', answer: 'A properly built email automation system places you in an entirely different game. You\'ll harness technology correctly and deliver a ruthless, data-driven advantage to your competitors—without them even understanding why.' },
    { question: 'What if I buy multiple courses - do they overlap?', answer: 'Every course is designed to solve a specific part of the conversion equation. They complement each other without repeating content, so stacking them creates compounding impact.' },
    { question: 'Will I get lifetime access?', answer: 'Yes. One-time payment, lifetime access. No subscriptions. No hidden fees.' },
    { question: 'Is this just theory or can I apply it right away?', answer: 'This is 100% practical. You\'ll get a clear framework + real examples + plug-and-play templates that you can implement immediately.' },
    { question: 'Do I need a team to apply this?', answer: 'Not at all. Every tactic was designed for solo operators. You can implement everything with minimal tech skills or outsource it easily if you prefer.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="w-full py-20 lg:py-28 px-6 lg:px-10" style={{ backgroundColor: '#000' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-8"
            style={{ backgroundColor: 'rgba(212, 177, 96, 0.15)', border: '1px solid rgba(212, 177, 96, 0.3)' }}
          >
            <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: '#D4B160', boxShadow: '0 0 10px #D4B160' }} />
            <span className="text-sm font-medium text-white">The same systems billion-dollar brands use</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ color: '#ffffff' }}
          >
            Turn Email Marketing Into a <span style={{ color: '#D4B160', textShadow: '0 0 15px rgba(212, 177, 96, 0.5)' }}>Revenue Engine</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg mb-10 text-white/70 italic"
          >
            (Steal the full billion-dollar system)
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto mb-10"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff_3.jpg?v=1760516155"
              alt="Email Marketing Dashboard"
              className="w-full rounded-xl"
              style={{ boxShadow: '0 15px 45px rgba(212, 177, 96, 0.5), 0 0 50px rgba(212, 177, 96, 0.45)', border: '2px solid rgba(212, 177, 96, 0.5)' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className="text-2xl line-through text-white/40">${course.originalPrice}</span>
            <span className="text-4xl lg:text-5xl font-bold" style={{ color: '#D4B160', textShadow: '0 0 20px rgba(212, 177, 96, 0.6)' }}>Only ${course.price} Today</span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={onCheckout}
            className="inline-flex items-center gap-3 px-14 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 text-white uppercase tracking-wide"
            style={{
              background: 'radial-gradient(ellipse at bottom, #F5D89A 0%, #D4B160 40%)',
              boxShadow: '0 10px 30px rgba(212, 177, 96, 0.4)'
            }}
          >
            <ShoppingCart size={24} />
            UNLOCK THE SYSTEM NOW!
          </motion.button>

          <p className="text-sm mt-6 text-white/50">
            Secure 256-bit SSL encrypted payment
          </p>
        </div>
      </div>

      {/* Story Section - "In a world where..." */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-[#111] mb-8 text-center italic"
          >
            In a world where...
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6 text-lg text-[#444]"
          >
            <p>
              Millions of brands fight for attention on social networks to "stay relevant" and get crumbs of views because <span className="font-semibold" style={{ color: '#BD9B5E' }}>"the algorithm went crazy again"</span>…
            </p>

            <div className="py-6">
              <div className="inline-block px-6 py-3 rounded-lg text-[#111] font-semibold" style={{ backgroundColor: '#FCEDA9' }}>
                Top brands generate $1M-$10M every year
              </div>
              <div className="inline-block px-6 py-3 rounded-lg text-[#111] font-semibold mt-2" style={{ backgroundColor: '#FCEDA9' }}>
                (for 5+ consecutive years) through their email list
              </div>
            </div>

            <p className="text-xl font-semibold text-[#111]">
              According to research: An email list generates <span style={{ color: '#BD9B5E' }}>20X more money</span> than any social platform.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Emails = Money Section */}
      <div className="w-full py-20 px-6 lg:px-10 bg-[#fafafa]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold mb-8"
            style={{ color: '#BD9B5E' }}
          >
            Emails = Money.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-[#444] mb-8"
          >
            On March 29, 2024, our eCommerce brand sent two short emails to a list of less than 15,000 subscribers… And we received over <span className="font-bold text-[#111]">921 hot orders</span> that brought in <span className="font-bold text-2xl text-[#111]">$238,250 in revenue</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl border-2"
            style={{ borderColor: '#BD9B5E', backgroundColor: 'rgba(189, 155, 94, 0.05)' }}
          >
            <p className="text-xl lg:text-2xl font-bold text-[#111] leading-relaxed">
              An email list is like an ATM, emails are like a <span style={{ color: '#BD9B5E' }}>black card with unlimited credit</span>
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-[#444] mt-8"
          >
            Not Facebook that can shut you down, Not Instagram that can get hacked… <span className="font-bold" style={{ color: '#BD9B5E' }}>An email list is the only digital asset you truly own</span>
          </motion.p>
        </div>
      </div>

      {/* 3-Part System Section */}
      <div className="w-full py-20 px-6 lg:px-10" style={{ backgroundColor: '#111' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>
              Here's What We're <span style={{ color: '#BD9B5E', textShadow: '0 0 20px rgba(189, 155, 94, 0.6)' }}>Combining</span>
            </h2>
            <p className="text-lg text-white/60">
              Three layers of technology that create an unfair advantage
            </p>
          </motion.div>

          <div className="space-y-5">
            {systemParts.map((part, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#BD9B5E] transition-all hover:bg-white/10"
              >
                <div className="text-4xl font-bold mb-4" style={{ color: '#BD9B5E', textShadow: '0 0 20px rgba(189, 155, 94, 0.5)' }}>
                  {part.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{part.title}</h3>
                <p className="text-white/70 leading-relaxed">{part.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-8 rounded-2xl text-center"
            style={{ backgroundColor: 'rgba(189, 155, 94, 0.1)', border: '2px solid rgba(189, 155, 94, 0.3)' }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#BD9B5E', textShadow: '0 0 20px rgba(189, 155, 94, 0.5)' }}>
              You'll Stop Playing Small
            </h3>
            <p className="text-white/80">
              No more relying on discounts, desperate promotions, or random guesswork. Instead, you'll operate in the same arena as the billion-dollar brands—with the tools and systems that transformed them into sales empires.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Why This Is Different - Comparison Table */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#111] mb-4">
              Why This Is <span style={{ color: '#BD9B5E' }}>Completely Different</span>
            </h2>
            <p className="text-lg text-[#666]">
              Most email marketing courses teach you the basics. This teaches you the system.
            </p>
          </motion.div>

          <div className="overflow-x-auto rounded-xl border border-[#ccc]">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-5 text-left text-lg font-bold bg-[#d0d0d0] text-[#111] w-1/2">
                    The Old Way
                  </th>
                  <th className="p-5 text-left text-lg font-bold text-[#111] w-1/2" style={{ background: 'linear-gradient(135deg, rgba(189, 155, 94, 0.2), rgba(189, 155, 94, 0.3))' }}>
                    Our System
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={index} className="border-t border-[#ccc]">
                    <td className="p-5 text-[#666] bg-[#f8f8f8]">{row.old}</td>
                    <td className="p-5 text-[#111] font-medium" style={{ background: 'linear-gradient(135deg, rgba(189, 155, 94, 0.05), rgba(189, 155, 94, 0.08))' }}>{row.new}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#666] italic mt-8"
          >
            <strong className="text-[#111]">P.S.</strong> - The brands crushing it with email aren't smarter than you. They're just using systems you haven't been shown yet. Systems that turn email from "nice to have" into "impossible to compete with."
          </motion.p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full py-20 px-6 lg:px-10 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#111] mb-12 text-center">
            Common Questions
          </h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left transition-colors text-white"
                  style={{ backgroundColor: '#111' }}
                >
                  <span className="font-bold pr-4">"{item.question}"</span>
                  {expandedFaq === index ? (
                    <ChevronUp size={20} className="flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white border border-[#111] border-t-0 p-5"
                    >
                      <p className="text-[#444]">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="w-full py-20 px-6 lg:px-10" style={{ backgroundColor: '#000' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#ffffff' }}>
              Ready to Build Your <span style={{ color: '#D4B160' }}>Revenue Engine</span>?
            </h2>

            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-2xl line-through text-white/40">${course.originalPrice}</span>
              <span className="text-5xl lg:text-6xl font-bold" style={{ color: '#D4B160' }}>${course.price}</span>
            </div>

            <button
              onClick={onCheckout}
              className="inline-flex items-center gap-3 px-14 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 text-white uppercase tracking-wide"
              style={{
                background: 'radial-gradient(ellipse at bottom, #F5D89A 0%, #D4B160 40%)',
                boxShadow: '0 10px 30px rgba(212, 177, 96, 0.4)'
              }}
            >
              <ShoppingCart size={24} />
              GET INSTANT ACCESS
              <ArrowRight size={20} />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-8 mt-10 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <Shield size={18} />
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={18} />
                <span>Lifetime Updates</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// ========== ABANDONED CHECKOUT ALTERNATIVE LAYOUT (VIEW 2) ==========

interface AbandonedCheckoutAlternativeProps {
  course: {
    price: number;
    originalPrice?: number;
  };
  onCheckout: () => void;
}

const AbandonedCheckoutAlternativeLayout = ({ course, onCheckout }: AbandonedCheckoutAlternativeProps) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const features = [
    { title: 'Strategic Timing', desc: 'Each email goes out at the exact right time. When people are most likely to come back and buy.' },
    { title: 'Proven Psychology', desc: 'These emails were tested on hundreds of thousands of sends. Every word handles objections. Every line rebuilds trust.' },
    { title: 'Ready to Deploy', desc: 'The full 7-email sequence is ready. Copy, paste, done. No testing. No guessing. Just proven templates.' },
  ];

  const comparisonRows = [
    { ignore: 'Watch 75% of ready-to-buy customers disappear forever', deploy: 'Automatically recover up to 82% of abandoned checkouts' },
    { ignore: 'Lose $16,400+ monthly in revenue you already earned', deploy: 'Generate an extra $200K+ annually from existing traffic' },
    { ignore: 'Rely on expensive ads to replace lost customers', deploy: 'Maximize every visitor with proven email automation' },
    { ignore: 'Keep guessing what might work to bring them back', deploy: 'Use battle-tested templates from 100,000+ successful sends' },
    { ignore: 'Spend months testing and losing more revenue', deploy: 'Plug-and-play system ready to deploy in under 2 hours' },
  ];

  const faqItems = [
    { question: 'Will this work for my platform (Shopify, WooCommerce, etc.)?', answer: 'Yes. The email sequence and strategy work universally across all e-commerce platforms. We provide specific integration guides for Shopify, WooCommerce, BigCommerce, and other major platforms.' },
    { question: 'Will I get lifetime access?', answer: 'Yes. One-time payment, lifetime access. No subscriptions. No hidden fees.' },
    { question: 'Is this just theory or can I apply it right away?', answer: 'This is 100% practical. You\'ll get a clear framework + real examples + plug & play templates that you can implement immediately.' },
    { question: 'I don\'t have many abandoned checkouts. Will this still work?', answer: 'If you\'re getting any traffic and making sales, you have abandoned checkouts. Even recovering just a few can significantly boost your profit margins. Plus, as you scale, this system becomes even more valuable.' },
    { question: 'Can\'t I just build this myself?', answer: 'You could try, but this system is built from analyzing hundreds of thousands of email sends. Building from scratch means months of testing and lost revenue. This gives you the shortcut to what already works.' },
    { question: 'How quickly will I see results?', answer: 'Once deployed, the system starts working immediately. You\'ll begin seeing recovered sales within 24-48 hours of your first abandoned checkout.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="w-full py-20 lg:py-28 px-6 lg:px-10" style={{ backgroundColor: '#000' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-8"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
          >
            <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: '#00ff88', boxShadow: '0 0 10px #00ff88' }} />
            <span className="text-sm font-medium text-white">Stop losing 75% of your potential revenue</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold mb-4 leading-tight"
            style={{ color: '#ffffff' }}
          >
            How to Convert <span style={{ color: '#00ff88' }}>82%</span> of Your Lost Customers
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm mb-8 text-white/70 italic"
          >
            (The system that recovers 82% of abandoned checkouts - automatically)
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/007dff_1.jpg?v=1760514814"
              alt="Revenue Recovery Dashboard"
              className="w-full"
              style={{ border: '2px solid #00ff88', boxShadow: '0 0 30px rgba(0, 255, 136, 0.6), 0 0 60px rgba(0, 255, 136, 0.3)' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className="text-xl line-through text-white/40">${course.originalPrice}</span>
            <span className="text-3xl lg:text-4xl font-bold text-white">Only ${course.price} Today</span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={onCheckout}
            className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 uppercase tracking-wide"
            style={{
              background: 'radial-gradient(ellipse at bottom, #7DFEA9 0%, #00CC6E 40%)',
              boxShadow: '0 6px 16px rgba(0, 255, 136, 0.4)',
              color: '#000'
            }}
          >
            ADD TO MY SYSTEM!
          </motion.button>

          <p className="text-xs mt-4 text-white/50">
            Secure 256-bit SSL encrypted payment
          </p>
        </div>
      </div>

      {/* Your Store Is Bleeding Money Section */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-[#111] mb-8"
          >
            Your Store Is Bleeding Money...
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg text-[#444]"
          >
            <p>Every day, stores lose sales. They don't even know it's happening. The problem isn't your ads. It's not your product. It's not your website.</p>
            <p className="font-semibold text-[#111]">It's the checkout.</p>
            <p>Here's the truth: For every 10 people who buy from you, <strong>7 more start checkout</strong>. They add items. They enter their card details. Then they leave.</p>
            <p>That's <strong>41% of people who were ready to buy</strong>. They just didn't finish.</p>
          </motion.div>
        </div>
      </div>

      {/* How Much Money Are You Losing Section */}
      <div className="w-full py-20 px-6 lg:px-10 bg-[#fafafa]">
        <div className="max-w-3xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-[#111] mb-8"
          >
            So, How Much Money Are You Actually Losing?
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pl-6 border-l-4 space-y-4 mb-8"
            style={{ borderColor: '#00cc6e' }}
          >
            <p className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#00cc6e' }} />
              <span><strong className="text-[#111]">6,800</strong> monthly visitors</span>
            </p>
            <p className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#00cc6e' }} />
              <span><strong className="text-[#111]">3.4%</strong> reach checkout = <strong className="text-[#111]">231</strong> people enter payment details</span>
            </p>
            <p className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#00cc6e' }} />
              <span><strong className="text-[#111]">136</strong> complete purchase + <strong className="text-[#111]">95</strong> abandon with details entered</span>
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-[#444] mb-8"
          >
            Without a recovery system, those 95 people are lost. They wanted to buy. They entered their card details. <strong>Then they left.</strong>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-[#444] mb-8"
          >
            With a 7-email sequence, you can get 78 of them back. That's <strong>82% recovery rate</strong>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold text-[#111] mb-4"
          >
            Here's what that means in dollars:
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-[#444] mb-8"
          >
            If your average order is <strong>$100</strong>, you gain <strong>$7,800 per month</strong>. That's <strong>$93,600 per year</strong>. All from fixing what's already broken.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl text-center text-white"
            style={{ backgroundColor: '#000', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)' }}
          >
            <h3 className="text-3xl font-bold mb-3" style={{ color: '#00ff88' }}>
              That's a 58% Revenue Increase
            </h3>
            <p className="text-white/70 italic">
              Extra $7,800 per month - starting immediately
            </p>
          </motion.div>
        </div>
      </div>

      {/* Why This Sequence Works */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-[#111] mb-12 text-center underline decoration-4 underline-offset-8"
          >
            Why This Sequence Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="p-7 rounded-2xl bg-white border-2 border-[#e8e8e8] hover:border-[#00cc6e] transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" style={{ background: 'linear-gradient(90deg, #00cc6e 0%, #00ff88 100%)' }} />
                <h3 className="text-xl font-bold text-[#111] mb-3">{feature.title}</h3>
                <p className="text-[#666]">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-[#444]">
              Most stores chase more traffic. But if checkout is broken, you'll keep losing sales. No matter how much you spend on ads.
            </p>
            <p className="text-lg text-[#111] font-semibold mt-4">
              This system stops the leak. It brings money back into your store. Every day. On autopilot.
            </p>
          </motion.div>
        </div>
      </div>

      {/* The Decision Is Simple - Comparison */}
      <div className="w-full py-20 px-6 lg:px-10 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#111] mb-4">
              The Decision Is Simple
            </h2>
            <p className="text-lg text-[#666]">
              For less than a dinner out, you're about to recover thousands in lost revenue.
            </p>
            <p className="text-lg text-[#111] font-semibold mt-4">
              You have 2 paths forward. Choose wisely.
            </p>
          </motion.div>

          <div className="overflow-x-auto rounded-xl border border-[#ccc]">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-5 text-lg font-bold bg-[#d0d0d0] text-[#111] w-1/2 text-center">
                    ❌ Ignore This System
                  </th>
                  <th className="p-5 text-lg font-bold text-[#111] w-1/2 text-center" style={{ background: 'linear-gradient(135deg, rgba(0, 204, 110, 0.15), rgba(0, 255, 136, 0.2))' }}>
                    ✅ Deploy Recovery Flow
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={index} className="border-t border-[#ccc]">
                    <td className="p-5 text-[#666] bg-[#f8f8f8]">{row.ignore}</td>
                    <td className="p-5 text-[#111] font-medium" style={{ background: 'linear-gradient(135deg, rgba(0, 204, 110, 0.05), rgba(0, 255, 136, 0.08))' }}>{row.deploy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#666] italic mt-6 text-sm"
          >
            * The entire ${course.price} investment is tax-deductible as a business expense. This system can pay for itself with just 1 recovered sale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <button
              onClick={onCheckout}
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 uppercase tracking-wide"
              style={{
                background: 'radial-gradient(ellipse at bottom, #7DFEA9 0%, #00CC6E 40%)',
                boxShadow: '0 6px 16px rgba(0, 255, 136, 0.4)',
                color: '#000'
              }}
            >
              STOP THE REVENUE LEAK!
            </button>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#111] mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left transition-colors text-white"
                  style={{ backgroundColor: '#111' }}
                >
                  <span className="font-bold pr-4">{item.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp size={20} className="flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white border border-[#111] border-t-0 p-5"
                    >
                      <p className="text-[#444]">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="w-full py-20 px-6 lg:px-10" style={{ backgroundColor: '#000' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#ffffff' }}>
              Start <span style={{ color: '#00ff88' }}>Recovering Sales</span> Today
            </h2>

            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-xl line-through text-white/40">${course.originalPrice}</span>
              <span className="text-5xl lg:text-6xl font-bold text-white">${course.price}</span>
            </div>

            <button
              onClick={onCheckout}
              className="inline-flex items-center justify-center gap-3 px-12 py-5 rounded-xl font-bold text-xl transition-all hover:scale-105 uppercase tracking-wide animate-pulse"
              style={{
                background: 'linear-gradient(135deg, #00ff88 0%, #00cc6e 100%)',
                boxShadow: '0 10px 40px rgba(0, 255, 136, 0.2)',
                color: '#000'
              }}
            >
              <ShoppingCart size={24} />
              START RECOVERING SALES NOW!
            </button>

            <p className="text-xs mt-4 text-white/50">
              Instant access • One-time payment
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 mt-10 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <Shield size={18} />
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={18} />
                <span>Lifetime Updates</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// ========== PRODUCT MAPPING VISUALIZATIONS ==========

const ProductMappingVisuals = () => (
  <>
    {/* AOV Transformation */}
    <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">The Product Mapping Effect</h2>
        <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">Strategic positioning drives higher average order values</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { value: '$47', label: 'Random Layout', desc: 'Without strategy', color: '#ddd', textColor: '#666666' },
            { value: '$89', label: 'Basic Mapping', desc: 'Entry-level structure', color: '#888', textColor: '#ffffff' },
            { value: '$156', label: 'Strategic Mapping', desc: 'Billion-dollar framework', color: '#111', textColor: '#ffffff' },
          ].map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.15 }} viewport={{ once: true }} className="p-8 rounded-2xl text-center" style={{ backgroundColor: item.color }}>
              <div className="text-4xl font-bold mb-2" style={{ color: item.textColor }}>{item.value}</div>
              <div className="font-medium mb-1" style={{ color: item.textColor }}>{item.label}</div>
              <div className="text-sm opacity-70" style={{ color: item.textColor }}>{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* The 5 Weapons */}
    <div className="w-full py-16 px-6 lg:px-10 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">5 Strategic Weapons You'll Master</h2>
        <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">Each weapon targets a different part of the purchase decision</p>
        <div className="grid md:grid-cols-5 gap-4">
          {[
            { icon: Target, label: 'Multiple Options', desc: 'Choice architecture' },
            { icon: BarChart2, label: 'Mapping System', desc: 'Billion-dollar framework' },
            { icon: Zap, label: 'Strategic Framework', desc: 'Data-driven placement' },
            { icon: DollarSign, label: 'Anchor Effect', desc: 'Value perception' },
            { icon: TrendingUp, label: 'Hidden Funnels', desc: 'Invisible conversion' },
          ].map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="p-5 rounded-xl bg-[#fafafa] border border-[#eee] text-center">
              <div className="w-14 h-14 rounded-xl bg-[#111] flex items-center justify-center mx-auto mb-3">
                <item.icon size={26} className="text-white" />
              </div>
              <div className="text-sm font-semibold text-[#111] mb-1">{item.label}</div>
              <div className="text-xs text-[#888]">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Value Perception Flow */}
    <div className="w-full py-16 px-6 lg:px-10 bg-[#111]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: '#ffffff' }}>The Anchor Product Effect</h2>
        <p className="text-center mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>How strategic positioning changes perceived value</p>
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between gap-4">
            {[
              { label: 'Premium', price: '$299', role: 'Anchor', highlight: false },
              { label: 'Standard', price: '$149', role: 'Target', highlight: true },
              { label: 'Basic', price: '$49', role: 'Decoy', highlight: false },
            ].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.2 }} viewport={{ once: true }} className={`flex-1 p-6 rounded-xl text-center ${item.highlight ? 'bg-white' : 'bg-white/10'}`}>
                <div className={`text-xs font-medium mb-2 ${item.highlight ? 'text-green-600' : 'text-white/60'}`}>{item.role}</div>
                <div className={`text-2xl font-bold mb-1 ${item.highlight ? 'text-[#111]' : 'text-white'}`}>{item.price}</div>
                <div className={`text-sm ${item.highlight ? 'text-[#666]' : 'text-white/60'}`}>{item.label}</div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm mt-6" style={{ color: 'rgba(255,255,255,0.5)' }}>73% of customers choose the middle option when presented strategically</p>
        </div>
      </div>
    </div>
  </>
);

// ========== A/B TEST RESULTS VISUALIZATIONS ==========

const ABTestResultsVisuals = () => (
  <>
    {/* Test Results Overview */}
    <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">37 Tests. Millions of Visitors. Proven Results.</h2>
        <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">Years of testing data compiled into one actionable resource</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { value: '37', label: 'Proven Tests', desc: 'Battle-tested results' },
            { value: '6-44%', label: 'Improvement Range', desc: 'Conversion lift' },
            { value: '100K+', label: 'Visitors Tested', desc: 'Per test minimum' },
          ].map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.15 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-white border border-[#eee] text-center">
              <div className="text-4xl font-bold text-[#111] mb-2">{item.value}</div>
              <div className="font-medium text-[#111] mb-1">{item.label}</div>
              <div className="text-sm text-[#888]">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Test Categories */}
    <div className="w-full py-16 px-6 lg:px-10 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">What's Inside the Data</h2>
        <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">Three categories of high-impact tests</p>
        <div className="space-y-4">
          {[
            { category: 'Button Text Changes', tests: 12, avgLift: '18%', icon: MousePointer, desc: 'Simple copy tweaks with massive impact' },
            { category: 'Page Structure', tests: 14, avgLift: '24%', icon: BarChart2, desc: 'Layout and element positioning' },
            { category: 'Messaging & Copy', tests: 11, avgLift: '31%', icon: Edit3, desc: 'Headlines and value propositions' },
          ].map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} viewport={{ once: true }} className="p-6 rounded-xl bg-[#fafafa] border border-[#eee]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#111] flex items-center justify-center flex-shrink-0">
                  <item.icon size={26} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-[#111]">{item.category}</h3>
                    <span className="text-green-600 font-bold">+{item.avgLift} avg</span>
                  </div>
                  <p className="text-sm text-[#666]">{item.desc}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#111]">{item.tests}</div>
                  <div className="text-xs text-[#888]">tests</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Sample Results */}
    <div className="w-full py-16 px-6 lg:px-10 bg-[#111]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: '#ffffff' }}>Sample Test Results</h2>
        <p className="text-center mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>Real data from real tests</p>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { test: 'Button: "Buy Now" → "Add to Cart"', lift: '+18%' },
            { test: 'Moving reviews above fold', lift: '+31%' },
            { test: 'Urgency messaging in header', lift: '+44%' },
            { test: 'Trust badges near CTA', lift: '+12%' },
          ].map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }} viewport={{ once: true }} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <span style={{ color: 'rgba(255,255,255,0.8)' }}>{item.test}</span>
              <span className="font-bold text-green-400">{item.lift}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </>
);

// ========== QUIZ TACTIC VISUALIZATIONS ==========

const QuizTacticVisuals = () => (
  <>
    {/* Conversion Transformation */}
    <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">The Quiz Tactic Transformation</h2>
        <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">From struggling conversions to money machine</p>
        <div className="p-8 rounded-2xl bg-white border border-[#eee]">
          <h3 className="text-lg font-semibold text-[#111] mb-6 text-center">Conversion Rate: Before vs After Quiz</h3>
          <div className="flex items-end justify-center gap-12">
            <div className="text-center">
              <div className="relative w-20 mx-auto mb-4">
                <div className="w-full bg-[#f0f0f0] rounded-t-lg" style={{ height: '100px' }} />
                <div className="absolute bottom-0 left-0 right-0 rounded-t-lg" style={{ height: '15px', backgroundColor: '#ddd' }} />
              </div>
              <div className="text-2xl font-bold text-[#999]">1-3%</div>
              <div className="text-sm text-[#888] mt-1">Without Quiz</div>
            </div>
            <div className="pb-16"><ArrowRight size={32} className="text-[#111]" /></div>
            <div className="text-center">
              <div className="relative w-20 mx-auto mb-4">
                <div className="w-full bg-[#f0f0f0] rounded-t-lg" style={{ height: '100px' }} />
                <motion.div initial={{ height: 0 }} whileInView={{ height: '100px' }} transition={{ duration: 1, delay: 0.3 }} viewport={{ once: true }} className="absolute bottom-0 left-0 right-0 rounded-t-lg" style={{ backgroundColor: '#111' }} />
              </div>
              <div className="text-2xl font-bold text-[#111]">8-10%</div>
              <div className="text-sm text-[#888] mt-1">With Quiz Tactic</div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-600 font-semibold"><ArrowUp size={16} />300-400% Improvement</span>
          </div>
        </div>
      </div>
    </div>

    {/* Quiz Funnel Flow */}
    <div className="w-full py-16 px-6 lg:px-10 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-8 text-center">The Quiz Funnel Magic</h2>
        <div className="p-8 rounded-2xl bg-white border border-[#eee]">
          <div className="relative">
            <div className="absolute top-6 left-8 right-8 h-0.5 bg-[#eee]" />
            <motion.div initial={{ width: '0%' }} whileInView={{ width: '100%' }} transition={{ duration: 1.5 }} viewport={{ once: true }} className="absolute top-6 left-8 h-0.5 bg-[#111]" style={{ maxWidth: 'calc(100% - 64px)' }} />
            <div className="flex justify-between relative">
              {[
                { step: 1, title: 'Engage', desc: 'Quiz starts', icon: Brain },
                { step: 2, title: 'Qualify', desc: 'Build profile', icon: UserCheck },
                { step: 3, title: 'Personalize', desc: 'Custom results', icon: Target },
                { step: 4, title: 'Convert', desc: '8-10% CR', icon: ShoppingCart },
              ].map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.2 }} viewport={{ once: true }} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center mb-3 relative z-10">
                    <item.icon size={20} className="text-white" />
                  </div>
                  <div className="text-sm font-semibold text-[#111]">{item.title}</div>
                  <div className="text-xs text-[#888] text-center max-w-[80px]">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* 6 Modules Preview */}
    <div className="w-full py-16 px-6 lg:px-10 bg-[#111]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: '#ffffff' }}>6 Modules to Quiz Mastery</h2>
        <p className="text-center mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>Everything you need to build conversion machines</p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { num: '01', title: 'Psychology Framework', desc: 'Why quizzes bypass resistance' },
            { num: '02', title: 'Quiz Architecture', desc: 'Proven question structures' },
            { num: '03', title: 'Personalization Engine', desc: 'Make visitors feel understood' },
            { num: '04', title: 'Implementation Templates', desc: 'Plug-and-play for any niche' },
            { num: '05', title: 'Data Collection', desc: 'Turn answers into gold' },
            { num: '06', title: 'Conversion Secrets', desc: 'The micro-optimizations that matter' },
          ].map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.08 }} viewport={{ once: true }} className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xs font-bold text-green-400 mb-2">{item.num}</div>
              <h3 className="font-semibold mb-1" style={{ color: '#ffffff' }}>{item.title}</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </>
);

// ========== LASER TARGETING VISUALIZATIONS ==========

const LaserTargetingVisuals = () => (
  <>
    {/* ROAS Transformation */}
    <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">The Laser Targeting Effect</h2>
        <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">Stop spraying bullets. Start targeting like a laser.</p>
        <div className="p-8 rounded-2xl bg-white border border-[#eee]">
          <h3 className="text-lg font-semibold text-[#111] mb-6 text-center">ROAS: Broad vs Laser Targeting</h3>
          <div className="flex items-end justify-center gap-12">
            <div className="text-center">
              <div className="relative w-24 mx-auto mb-4">
                <div className="w-full bg-[#f0f0f0] rounded-t-lg" style={{ height: '120px' }} />
                <div className="absolute bottom-0 left-0 right-0 rounded-t-lg flex items-end justify-center pb-2" style={{ height: '25px', backgroundColor: '#ddd' }}>
                  <span className="text-xs font-bold text-[#666]">1.5x</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-[#999]">1.5x</div>
              <div className="text-sm text-[#888] mt-1">Broad Targeting</div>
            </div>
            <div className="pb-16"><ArrowRight size={32} className="text-red-500" /></div>
            <div className="text-center">
              <div className="relative w-24 mx-auto mb-4">
                <div className="w-full bg-[#f0f0f0] rounded-t-lg" style={{ height: '120px' }} />
                <motion.div initial={{ height: 0 }} whileInView={{ height: '120px' }} transition={{ duration: 1, delay: 0.3 }} viewport={{ once: true }} className="absolute bottom-0 left-0 right-0 rounded-t-lg flex items-end justify-center pb-2 bg-gradient-to-t from-red-600 to-red-500">
                  <span className="text-sm font-bold text-white">14.84x</span>
                </motion.div>
              </div>
              <div className="text-2xl font-bold text-red-600">14.84x</div>
              <div className="text-sm text-[#888] mt-1">Laser Targeting</div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 font-semibold"><ArrowUp size={16} />+889% ROAS Improvement</span>
          </div>
        </div>
      </div>
    </div>

    {/* Targeting Precision */}
    <div className="w-full py-16 px-6 lg:px-10 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">The 0.001% Targeting Method</h2>
        <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">Reach only people who will crave your product</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { value: '52K', label: 'Data Points', desc: 'Meta collects per user' },
            { value: '23M+', label: 'Impressions', desc: 'Tested over 5 months' },
            { value: '0.001%', label: 'Precision', desc: 'Ready-to-buy audience' },
          ].map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.15 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-center">
              <div className="text-4xl font-bold text-white mb-2">{item.value}</div>
              <div className="font-medium text-white mb-1">{item.label}</div>
              <div className="text-sm text-white/70">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* 6 Modules */}
    <div className="w-full py-16 px-6 lg:px-10 bg-[#111]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: '#ffffff' }}>6 Modules to Targeting Mastery</h2>
        <p className="text-center mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>Train Meta's AI to work like a bloodhound</p>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { num: '01', title: 'The 0.001% Method', desc: 'Identify your perfect buyer' },
            { num: '02', title: 'Meta AI Injection', desc: 'Make the algorithm obsessed' },
            { num: '03', title: 'Multi-Angle Attack', desc: 'Surround your audience' },
            { num: '04', title: 'Avatar Mapping', desc: 'Target by psychology' },
            { num: '05', title: 'Remarketing Mastery', desc: 'Psychological compulsion' },
            { num: '06', title: 'The Bloodhound System', desc: '24/7 automated hunting' },
          ].map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} viewport={{ once: true }} className="p-5 rounded-xl bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{item.num}</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: '#ffffff' }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </>
);

// ========== AI PHOTOGRAPHER VISUALIZATIONS ==========

const AIPhotographerVisuals = () => {
  const [activeSlider, setActiveSlider] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const beforeAfterPairs = [
    {
      before: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/before1.jpg?v=1760000001",
      after: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/after1.jpg?v=1760000001",
      label: "Product Photography"
    },
    {
      before: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/before2.jpg?v=1760000002",
      after: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/after2.jpg?v=1760000002",
      label: "Model Shots"
    },
    {
      before: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/before3.jpg?v=1760000003",
      after: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/after3.jpg?v=1760000003",
      label: "Lifestyle Scenes"
    }
  ];

  return (
    <>
      {/* Cost Comparison */}
      <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">The Old Way vs The AI Way</h2>
          <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">Traditional photography costs are insane</p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Old Way */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl bg-white border-2 border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <X size={20} className="text-red-500" />
                </div>
                <h3 className="font-bold text-[#111]">The Old Way</h3>
              </div>
              <div className="space-y-3">
                {[
                  { item: "Photographer", cost: "$2,000 - $10,000" },
                  { item: "Models", cost: "$500 - $2,000/day" },
                  { item: "Studio Rental", cost: "$200 - $500/hour" },
                  { item: "Props & Styling", cost: "$500+" },
                  { item: "Post-Production", cost: "$50 - $200/image" },
                ].map((row, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-[#eee] last:border-0">
                    <span className="text-[#666]">{row.item}</span>
                    <span className="font-semibold text-red-500">{row.cost}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl bg-red-50">
                <div className="text-center">
                  <p className="text-sm text-red-600 mb-1">Total Per Shoot</p>
                  <p className="text-2xl font-bold text-red-600">$5,000 - $15,000</p>
                  <p className="text-xs text-red-500 mt-1">+ 2-4 weeks wait time</p>
                </div>
              </div>
            </motion.div>

            {/* AI Way */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl bg-[#111] border-2 border-[#333]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <Check size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-white">The AI Way</h3>
              </div>
              <div className="space-y-3">
                {[
                  { item: "AI Image Generation", cost: "FREE" },
                  { item: "AI Models", cost: "FREE" },
                  { item: "Any Background", cost: "FREE" },
                  { item: "Unlimited Variations", cost: "FREE" },
                  { item: "Instant Results", cost: "FREE" },
                ].map((row, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                    <span className="text-white/70">{row.item}</span>
                    <span className="font-semibold text-green-400">{row.cost}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl bg-green-500/20">
                <div className="text-center">
                  <p className="text-sm text-green-400 mb-1">Total Cost</p>
                  <p className="text-2xl font-bold text-green-400">$0</p>
                  <p className="text-xs text-green-300 mt-1">Ready in seconds</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Before/After Showcase */}
      <div className="w-full py-16 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">AI-Generated Results</h2>
          <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">See the transformation from basic to billion-dollar brand</p>

          <div className="p-8 rounded-2xl bg-[#111]">
            {/* Category Tabs */}
            <div className="flex justify-center gap-2 mb-8">
              {beforeAfterPairs.map((pair, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlider(index)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeSlider === index
                      ? 'bg-white text-[#111]'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {pair.label}
                </button>
              ))}
            </div>

            {/* Slider */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-[#222]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles size={48} className="text-white/20 mx-auto mb-4" />
                  <p className="text-white/40 text-sm">Before → After Comparison</p>
                  <p className="text-white/60 text-lg font-semibold mt-2">AI Photography Magic</p>
                </div>
              </div>

              {/* Slider Control */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm">
                <span className="text-white/70 text-xs">Before</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="w-32 h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
                />
                <span className="text-white/70 text-xs">After</span>
              </div>
            </div>

            <p className="text-center text-white/50 text-sm mt-4">
              Drag slider to compare before and after
            </p>
          </div>
        </div>
      </div>

      {/* What You'll Create */}
      <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">What You'll Create</h2>
          <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">Professional imagery for every use case</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ShoppingBag, title: "Product Shots", desc: "Clean, professional product photos on any background", examples: ["White background", "Lifestyle scenes", "360° views"] },
              { icon: Users, title: "Model Photography", desc: "AI-generated models wearing your products", examples: ["Diverse models", "Any pose", "Any setting"] },
              { icon: Sparkles, title: "Lifestyle Scenes", desc: "Products in context that tell a story", examples: ["Home settings", "Outdoor scenes", "Urban vibes"] },
            ].map((category, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.15 }} viewport={{ once: true }} className="p-6 rounded-2xl bg-white border border-[#eee]">
                <div className="w-12 h-12 rounded-xl bg-[#111] flex items-center justify-center mb-4">
                  <category.icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-[#111] mb-2">{category.title}</h3>
                <p className="text-sm text-[#666] mb-4">{category.desc}</p>
                <ul className="space-y-2">
                  {category.examples.map((example, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#888]">
                      <Check size={14} className="text-green-500" />
                      {example}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Time Savings */}
      <div className="w-full py-16 px-6 lg:px-10 bg-[#111]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: '#ffffff' }}>Time Is Money</h2>
          <p className="text-center mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>Traditional vs AI photography timeline</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="font-bold mb-4" style={{ color: '#ffffff' }}>Traditional Photography</h3>
              <div className="space-y-3">
                {[
                  { step: "Find & book photographer", time: "1-2 weeks" },
                  { step: "Schedule models & studio", time: "1 week" },
                  { step: "Photo shoot day", time: "1 day" },
                  { step: "Post-production editing", time: "1-2 weeks" },
                  { step: "Revisions & final delivery", time: "1 week" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>{item.step}</span>
                    <span className="font-medium text-red-400">{item.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-red-500/20 text-center">
                <p className="text-red-400 font-bold">Total: 4-6 weeks</p>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-green-500/30">
              <h3 className="font-bold mb-4" style={{ color: '#ffffff' }}>AI Photography</h3>
              <div className="space-y-3">
                {[
                  { step: "Write your prompt", time: "30 seconds" },
                  { step: "Generate image", time: "10 seconds" },
                  { step: "Refine if needed", time: "1 minute" },
                  { step: "Download & use", time: "5 seconds" },
                  { step: "Create variations", time: "Instant" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>{item.step}</span>
                    <span className="font-medium text-green-400">{item.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-green-500/20 text-center">
                <p className="text-green-400 font-bold">Total: Under 2 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ========== AD COPY TEMPLATES VISUALIZATIONS ==========

const AdCopyTemplatesVisuals = () => (
  <>
    {/* The Copywriter Problem */}
    <div className="w-full py-16 px-6 lg:px-10 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-[#111] mb-4">The World's Best Copywriters Charge...</h2>
        <p className="text-[#666] mb-10">What would it cost to hire them?</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Stefan Georgi", rate: "$50,000", desc: "per sales letter" },
            { name: "Gary Halbert", rate: "$15,000", desc: "per page" },
            { name: "David Ogilvy", rate: "Billions", desc: "in campaign value" },
          ].map((copywriter, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.15 }} viewport={{ once: true }} className="p-6 rounded-2xl bg-[#111] text-center">
              <p className="text-white/60 text-sm mb-2">{copywriter.name}</p>
              <p className="text-3xl font-bold text-white mb-1">{copywriter.rate}</p>
              <p className="text-white/40 text-xs">{copywriter.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mt-10 p-6 rounded-2xl bg-[#fafafa] border-2 border-dashed border-[#ddd]">
          <p className="text-[#666] mb-2">Now you can steal their exact frameworks for just</p>
          <p className="text-4xl font-bold text-[#111]">$19</p>
        </motion.div>
      </div>
    </div>

    {/* What's Inside */}
    <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">What's Inside The Templates</h2>
        <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">50+ fill-in-the-blank templates</p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Target, title: "15+ Headline Formulas", desc: "Stop-scroll headlines that demand attention. Each formula is proven to increase CTR.", items: ["Curiosity triggers", "Benefit-driven hooks", "Emotional headlines"] },
            { icon: Edit3, title: "Opening Hooks", desc: "First 3 seconds matter most. These hooks grab attention instantly.", items: ["Story openers", "Question hooks", "Shocking stats"] },
            { icon: Heart, title: "Story Frameworks", desc: "Narrative structures that build connection and desire.", items: ["Hero's journey", "Problem-agitate-solve", "Before/after"] },
            { icon: Zap, title: "CTA Templates", desc: "Calls-to-action that compel immediate clicks.", items: ["Urgency creators", "Value stackers", "Risk reversers"] },
          ].map((category, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="p-6 rounded-2xl bg-white border border-[#eee]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#111] flex items-center justify-center flex-shrink-0">
                  <category.icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#111] mb-1">{category.title}</h3>
                  <p className="text-sm text-[#666] mb-3">{category.desc}</p>
                  <ul className="space-y-1">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#888]">
                        <Check size={12} className="text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Battle-Tested Stats */}
    <div className="w-full py-16 px-6 lg:px-10 bg-[#111]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: '#ffffff' }}>Battle-Tested Results</h2>
        <p className="text-center mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>These templates have been proven on real ad spend</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { value: "$10M+", label: "Ad Spend Tested", desc: "Real money, real results" },
            { value: "50+", label: "Templates", desc: "Fill-in-the-blank ready" },
            { value: "∞", label: "Niches", desc: "Works for any product" },
          ].map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.15 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#4ade80' }}>{stat.value}</div>
              <div className="font-medium mb-1" style={{ color: '#ffffff' }}>{stat.label}</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* How It Works */}
    <div className="w-full py-16 px-6 lg:px-10 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">How To Use The Templates</h2>
        <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">3 simple steps to winning ad copy</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { num: "1", title: "Choose Template", desc: "Pick the template that fits your goal — headline, hook, story, or CTA" },
            { num: "2", title: "Fill In Blanks", desc: "Insert your product details, benefits, and brand voice into the framework" },
            { num: "3", title: "Launch & Win", desc: "Copy to your ad manager and watch your conversions climb" },
          ].map((step, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.15 }} viewport={{ once: true }} className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#111] flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{step.num}</span>
              </div>
              <h3 className="font-bold text-[#111] mb-2">{step.title}</h3>
              <p className="text-sm text-[#666]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Example Template Preview */}
    <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">Template Preview</h2>
        <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">Here's what a template looks like</p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-white border border-[#eee] shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#111] text-white text-xs font-medium">HEADLINE TEMPLATE #7</span>
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-medium">High Converting</span>
          </div>
          <div className="p-6 rounded-xl bg-[#f5f5f5] font-mono text-sm">
            <p className="text-[#666]">
              <span className="text-[#111]">"I was [</span>
              <span className="text-blue-500">PROBLEM/PAIN POINT</span>
              <span className="text-[#111]">] until I discovered [</span>
              <span className="text-blue-500">YOUR PRODUCT</span>
              <span className="text-[#111]">]. Now I [</span>
              <span className="text-blue-500">AMAZING RESULT</span>
              <span className="text-[#111]">] in just [</span>
              <span className="text-blue-500">TIMEFRAME</span>
              <span className="text-[#111]">]."</span>
            </p>
          </div>
          <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200">
            <p className="text-sm text-green-700 font-medium mb-2">Example:</p>
            <p className="text-sm text-green-600 italic">
              "I was spending 6 hours on ad creative until I discovered these templates. Now I create winning ads in just 10 minutes."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </>
);

// ========== META AD TEMPLATES VISUALIZATIONS ==========

const MetaAdTemplatesVisuals = () => {
  const creativeExamples = [
    "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Screenshot_2024-10-21_at_09.52.10-min.avif?v=1752488312",
    "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Screenshot_2024-10-21_at_12.46.26-min.avif?v=1752488312",
    "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Screenshot_2024-10-18_at_09.00.13-min.avif?v=1752488312",
    "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Screenshot_2024-10-28_at_17.18.04-min.avif?v=1752488312",
    "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/AAAAAAAAAAART52.avif?v=1752488312",
    "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Screenshot_2024-10-18_at_09.01.34-min.avif?v=1752488312",
    "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Screenshot_2024-10-21_at_14.56.55-min.avif?v=1752488312",
    "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Screenshot_2024-10-03_at_17.03.08-min.avif?v=1752488312",
  ];

  return (
    <>
      {/* The Problem */}
      <div className="w-full py-16 px-6 lg:px-10 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#111] mb-4">The Creative Struggle Is Real</h2>
          <p className="text-[#666] mb-8">On average, it takes 35 minutes to create ONE creative. To find a winner? Test 10 variations.</p>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-[#111] text-center">
            <p className="text-xl lg:text-2xl font-bold text-white mb-2">Which means it takes almost</p>
            <p className="text-4xl lg:text-5xl font-bold text-[#EFBF04] mb-2">6 HOURS</p>
            <p className="text-xl lg:text-2xl font-bold text-white">to create just ONE winning creative!</p>
            <p className="text-sm text-white/60 mt-4 italic">(10 creatives × 35 minutes = 350 minutes = 5.8 hours)</p>
          </motion.div>
        </div>
      </div>

      {/* The 3-Step Solution */}
      <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">The 3-Step Solution</h2>
          <p className="text-[#666] text-center mb-10">Pick, customize, launch. That's it.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: '1', title: 'Choose Template', desc: 'Pick from 1,000+ proven designs', icon: Target },
              { num: '2', title: 'Customize', desc: 'Add your logo & colors in seconds', icon: Edit3 },
              { num: '3', title: 'Launch & Scale', desc: 'Download and dominate', icon: TrendingUp },
            ].map((step, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.15 }} viewport={{ once: true }} className="p-6 rounded-2xl bg-white border-2 border-[#EFBF04] text-center">
                <div className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#EFBF04] font-bold text-lg">{step.num}</span>
                </div>
                <h3 className="font-bold text-[#111] mb-2">{step.title}</h3>
                <p className="text-sm text-[#666]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Time Comparison */}
      <div className="w-full py-16 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">Time Savings</h2>
          <p className="text-[#666] text-center mb-10">From hours to seconds</p>
          <div className="p-8 rounded-2xl bg-white border border-[#eee]">
            <div className="flex items-end justify-center gap-12">
              <div className="text-center">
                <div className="relative w-24 mx-auto mb-4">
                  <div className="w-full bg-[#f0f0f0] rounded-t-lg" style={{ height: '150px' }} />
                  <motion.div initial={{ height: 0 }} whileInView={{ height: '150px' }} transition={{ duration: 1 }} viewport={{ once: true }} className="absolute bottom-0 left-0 right-0 rounded-t-lg bg-red-400" />
                </div>
                <div className="text-2xl font-bold text-red-500">6 hours</div>
                <div className="text-sm text-[#888] mt-1">Traditional Way</div>
              </div>
              <div className="pb-20"><ArrowRight size={32} className="text-[#EFBF04]" /></div>
              <div className="text-center">
                <div className="relative w-24 mx-auto mb-4">
                  <div className="w-full bg-[#f0f0f0] rounded-t-lg" style={{ height: '150px' }} />
                  <motion.div initial={{ height: 0 }} whileInView={{ height: '8px' }} transition={{ duration: 0.5, delay: 0.5 }} viewport={{ once: true }} className="absolute bottom-0 left-0 right-0 rounded-t-lg bg-[#EFBF04]" />
                </div>
                <div className="text-2xl font-bold text-[#EFBF04]">10 seconds</div>
                <div className="text-sm text-[#888] mt-1">With Templates</div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111] text-white font-semibold">
                <Zap size={20} className="text-[#EFBF04]" />
                2,160x Faster
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Creative Examples Carousel */}
      <div className="w-full py-16 px-6 lg:px-10 bg-[#111] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: '#ffffff' }}>Examples Of Winning Creatives</h2>
          <p className="text-center mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>Real templates from the library</p>
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-4"
              animate={{ x: [0, -1600] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[...creativeExamples, ...creativeExamples].map((src, index) => (
                <div key={index} className="flex-shrink-0 w-64 h-72 rounded-xl overflow-hidden shadow-lg">
                  <img src={src} alt={`Creative example ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="w-full py-16 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#111] mb-10 text-center">What You Get</h2>
          <div className="space-y-4">
            {[
              { text: 'No more creative block', desc: 'Stop staring at blank screens' },
              { text: '30 seconds and it\'s ready', desc: 'From template to download' },
              { text: 'Zero software costs', desc: 'Works with free Canva' },
              { text: 'Battle-tested designs', desc: 'Proven on massive ad budgets' },
              { text: 'Instant variety', desc: 'Test multiple angles without designing' },
              { text: 'Scale faster', desc: 'While competitors waste time' },
            ].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} viewport={{ once: true }} className="flex items-start gap-4 p-4 rounded-xl bg-[#fafafa] border-l-4 border-[#EFBF04]">
                <CheckCircle size={24} className="text-[#EFBF04] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#111]">{item.text}</h3>
                  <p className="text-sm text-[#666]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// ========== MAIN COMPONENT ==========

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const { items: cartItems, addItem, removeItem, isInCart, getTotal, getOriginalTotal, clearCart } = useCartStore();
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showEmailChange, setShowEmailChange] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [useAlternativeLayout, setUseAlternativeLayout] = useState(false);
  const [showAddCourses, setShowAddCourses] = useState(false);

  const slug = params.slug as string;
  const course = getCourseBySlug(slug);
  const allCourses = getAllCourses();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Add current course to cart and show checkout
  const handleGetAccess = () => {
    if (course && !isInCart(course.slug)) {
      addItem({
        slug: course.slug,
        title: course.title,
        price: course.price,
        originalPrice: course.originalPrice,
        image: course.image,
      });
    }
    setShowCheckout(true);
  };

  const handlePurchase = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowCheckout(false);
    clearCart();
    alert('Purchase successful! You now have access to your courses.');
  };

  // Available courses to add (not already in cart)
  const availableToAdd = allCourses.filter(c => !isInCart(c.slug));

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
            <Link href="/courses" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white" style={{ background: 'linear-gradient(150deg, #000 0%, #3a3a3a 50%, #000 100%)' }}>Back to Courses</Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Only show bonuses tab if there are bonuses
  const hasBonuses = course.bonuses.length > 0;
  const tabs = [
    { id: 'content' as TabType, label: "What's Inside", icon: BookOpen },
    ...(hasBonuses ? [{ id: 'bonuses' as TabType, label: `Bonuses (${course.bonuses.length})`, icon: Gift }] : []),
    { id: 'faq' as TabType, label: 'FAQ', icon: HelpCircle },
  ];

  const totalBonusValue = course.bonuses.reduce((sum, b) => sum + b.value, 0);

  // Course-specific "Who This Is For" content
  const getCourseTargetAudience = () => {
    switch (slug) {
      case 'subconscious-trap':
        return [
          { icon: Target, title: 'Boost Conversions', desc: 'You want to increase conversions without spending more on ads' },
          { icon: TrendingUp, title: 'Ready to Scale', desc: "You're ready to scale but need a proven system to follow" },
          { icon: Zap, title: 'Fast Results', desc: 'You want results fast without years of trial and error' },
        ];
      case 'ltv-system':
        return [
          { icon: Repeat, title: 'Build Repeat Revenue', desc: 'You want customers to buy again and again automatically' },
          { icon: DollarSign, title: 'Maximize Value', desc: "You're leaving money on the table with one-time buyers" },
          { icon: Mail, title: 'Automate Growth', desc: 'You want revenue while you sleep' },
        ];
      case 'email-marketing':
        return [
          { icon: Inbox, title: 'Own Your Audience', desc: "You're tired of algorithm changes destroying your reach" },
          { icon: BarChart2, title: 'Maximize ROI', desc: 'You want 20X+ returns on your marketing' },
          { icon: UserCheck, title: 'Build Independence', desc: 'You want an asset Zuckerberg can\'t take away' },
        ];
      case 'abandoned-checkout':
        return [
          { icon: AlertTriangle, title: 'Stop The Leak', desc: 'You\'re losing 75% of ready-to-buy customers' },
          { icon: Calculator, title: 'Easy ROI', desc: 'You want a system that pays for itself with 1 sale' },
          { icon: Clock, title: 'Quick Setup', desc: 'You need results fast - deploy in under 2 hours' },
        ];
      case 'the-social-proof':
        return [
          { icon: Brain, title: 'Master Psychology', desc: 'You want to understand why people really buy' },
          { icon: MessageCircle, title: 'Build Trust Fast', desc: 'You need social proof without waiting months' },
          { icon: TrendingUp, title: 'Scale Without Limits', desc: 'You want ads that work regardless of algorithms' },
        ];
      default:
        return [
          { icon: Target, title: 'Boost Results', desc: 'You want to improve your metrics' },
          { icon: TrendingUp, title: 'Scale Up', desc: "You're ready for the next level" },
          { icon: Zap, title: 'Act Fast', desc: 'You want results now' },
        ];
    }
  };

  // Render course-specific visualizations
  const renderCourseVisuals = () => {
    switch (slug) {
      case 'subconscious-trap':
        return <SubconsciousTrapVisuals />;
      case 'ltv-system':
        return <LTVSystemVisuals />;
      case 'email-marketing':
        return <EmailMarketingVisuals />;
      case 'abandoned-checkout':
        return <AbandonedCheckoutVisuals />;
      case 'the-social-proof':
        return <SocialProofVisuals />;
      case 'product-mapping':
        return <ProductMappingVisuals />;
      case 'ab-test-results':
        return <ABTestResultsVisuals />;
      case 'quiz-tactic':
        return <QuizTacticVisuals />;
      case 'laser-targeting':
        return <LaserTargetingVisuals />;
      case 'meta-ad-templates':
        return <MetaAdTemplatesVisuals />;
      case 'ai-photographer':
        return <AIPhotographerVisuals />;
      case 'ad-copy-templates':
        return <AdCopyTemplatesVisuals />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={() => !isProcessing && setShowCheckout(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-lg rounded-2xl overflow-hidden bg-white max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-[#eee]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#111]">Your Order</h2>
                  {!isProcessing && (<button onClick={() => setShowCheckout(false)} className="p-2 rounded-full hover:bg-[#f5f5f5]"><X size={20} className="text-[#666]" /></button>)}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#666]"><Lock size={14} /><span>Secure checkout powered by Stripe</span></div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto">
                {/* Add More Courses Link - At top */}
                {availableToAdd.length > 0 && (
                  <div className="px-6 pt-4">
                    <button
                      onClick={() => setShowAddCourses(true)}
                      className="text-sm text-[#666] underline underline-offset-2 hover:text-[#111] transition-colors"
                    >
                      + Add more courses to your order
                    </button>
                  </div>
                )}

                <div className="p-6 border-b border-[#eee] space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.slug} className="flex gap-4">
                      <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-[#eee]">
                        <Image src={item.image} alt={item.title} width={80} height={64} unoptimized className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#111] text-sm">{item.title}</h3>
                        <p className="text-xs text-[#666] mt-1">Instant digital access</p>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="font-bold text-[#111]">${item.price}</span>
                          {item.originalPrice && <span className="text-xs line-through text-[#999]">${item.originalPrice}</span>}
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.slug)} className="p-1.5 h-fit rounded-lg hover:bg-[#f5f5f5] text-[#999] hover:text-red-500 transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Email Section */}
                <div className="p-6 border-b border-[#eee]">
                  {!showEmailChange ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white bg-[#111]">{(customEmail || user?.email)?.charAt(0).toUpperCase() || 'U'}</div>
                        <div>
                          <p className="font-medium text-[#111] text-sm">{customEmail || user?.email}</p>
                          <p className="text-xs text-[#666]">Courses will be sent to this email</p>
                        </div>
                      </div>
                      <button onClick={() => setShowEmailChange(true)} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-[#f5f5f5] text-[#666]"><Edit3 size={12} />Change</button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-[#111]">Send to a different email</p>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" size={16} />
                        <input type="email" value={customEmail} onChange={(e) => setCustomEmail(e.target.value)} placeholder="Enter email address" className="w-full h-11 pl-10 pr-4 rounded-lg text-sm border border-[#e5e5e5] focus:border-[#111] focus:outline-none" />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setShowEmailChange(false)} className="flex-1 py-2 text-sm font-medium rounded-lg bg-[#111] text-white">Confirm</button>
                        <button onClick={() => { setCustomEmail(''); setShowEmailChange(false); }} className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-[#f5f5f5] text-[#666]">Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Total & Purchase */}
              <div className="p-6 border-t border-[#eee] bg-[#fafafa]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#666]">Subtotal ({cartItems.length} {cartItems.length === 1 ? 'course' : 'courses'})</span>
                  <span className="font-medium text-[#111]">${getTotal()}</span>
                </div>
                {getOriginalTotal() > getTotal() && (
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-green-600">You save</span>
                    <span className="text-green-600 font-medium">${getOriginalTotal() - getTotal()}</span>
                  </div>
                )}
                <div className="flex items-center justify-between mb-4 pt-2 border-t border-[#eee]">
                  <span className="font-semibold text-[#111]">Total</span>
                  <span className="text-2xl font-bold text-[#111]">${getTotal()}</span>
                </div>
                <button onClick={handlePurchase} disabled={isProcessing || cartItems.length === 0} className="w-full py-4 rounded-xl font-medium text-white flex items-center justify-center gap-2" style={{ background: isProcessing || cartItems.length === 0 ? '#666' : 'linear-gradient(150deg, #000 0%, #000 30%, #3a3a3a 50%, #000 70%, #000 100%)' }}>
                  {isProcessing ? (<><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Processing...</>) : (<><Lock size={18} />Complete Purchase - ${getTotal()}</>)}
                </button>
                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-[#888]">
                  <span>30-day guarantee</span><span>•</span><span>Instant access</span><span>•</span><span>Lifetime updates</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add More Courses Modal */}
      <AnimatePresence>
        {showAddCourses && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={() => setShowAddCourses(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-lg rounded-2xl overflow-hidden bg-white max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-[#eee]">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#111]">Add Courses</h2>
                  <button onClick={() => setShowAddCourses(false)} className="p-2 rounded-full hover:bg-[#f5f5f5]"><X size={20} className="text-[#666]" /></button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {availableToAdd.length === 0 ? (
                  <p className="text-sm text-[#666] text-center py-8">All courses are already in your cart!</p>
                ) : (
                  availableToAdd.map((c) => (
                    <div key={c.slug} className="flex items-center gap-4 p-4 rounded-xl border border-[#eee] hover:border-[#ccc] transition-colors">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-[#eee]">
                        <Image src={c.image} alt={c.title} width={64} height={64} unoptimized className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-[#111] text-sm">{c.title}</h4>
                        <p className="text-xs text-[#666] mt-1 line-clamp-2">{c.description}</p>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="font-bold text-[#111]">${c.price}</span>
                          {c.originalPrice && <span className="text-xs line-through text-[#999]">${c.originalPrice}</span>}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          addItem({ slug: c.slug, title: c.title, price: c.price, originalPrice: c.originalPrice, image: c.image });
                        }}
                        className="px-4 py-2 rounded-lg bg-[#111] text-white text-sm font-medium hover:bg-[#333] transition-colors flex-shrink-0"
                      >
                        Add
                      </button>
                    </div>
                  ))
                )}
              </div>
              <div className="p-6 border-t border-[#eee] bg-[#fafafa]">
                <button onClick={() => setShowAddCourses(false)} className="w-full py-3 rounded-xl font-medium text-white" style={{ background: 'linear-gradient(150deg, #000 0%, #000 30%, #3a3a3a 50%, #000 70%, #000 100%)' }}>
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-width wrapper */}
      <div className="min-h-screen bg-white" style={{ margin: '-40px -48px', width: 'calc(100% + 96px)' }}>
        {/* Back Button + Layout Toggle for Social Proof */}
        <div className="w-full px-6 lg:px-10 pt-6 flex items-center justify-between">
          <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-[#666] hover:text-[#111] transition-colors"><ChevronLeft size={16} />Back to Courses</Link>

          {/* Layout Toggle - For courses with VIEW 2 */}
          {(slug === 'the-social-proof' || slug === 'ai-photographer' || slug === 'ad-copy-templates' || slug === 'meta-ad-templates' || slug === 'subconscious-trap' || slug === 'ltv-system' || slug === 'email-marketing' || slug === 'abandoned-checkout' || slug === 'ab-test-results' || slug === 'product-mapping' || slug === 'quiz-tactic' || slug === 'laser-targeting' || slug === 'meta-headlines' || slug === 'offer-workshop' || slug === '20-laws' || slug === 'ugly-ads') && (
            <button
              onClick={() => setUseAlternativeLayout(!useAlternativeLayout)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: useAlternativeLayout
                  ? (slug === 'the-social-proof' ? '#7700fd' : slug === 'ai-photographer' ? '#9ba4a6' : slug === 'ad-copy-templates' ? '#D4B160' : slug === 'meta-ad-templates' ? '#EFBF04' : slug === 'subconscious-trap' ? '#ff4f03' : slug === 'ltv-system' ? '#00bc0d' : slug === 'email-marketing' ? '#D4B160' : slug === 'abandoned-checkout' ? '#00cc6e' : slug === 'ab-test-results' ? '#8E5DFF' : slug === 'product-mapping' ? '#B33B28' : slug === 'quiz-tactic' ? '#00CFFF' : slug === 'laser-targeting' ? '#ff0017' : slug === 'meta-headlines' ? '#FF7A00' : slug === 'offer-workshop' ? '#1e9413' : slug === '20-laws' ? '#4A86C5' : slug === 'ugly-ads' ? '#7F8FA6' : '#111')
                  : '#f5f5f5',
                color: useAlternativeLayout ? '#ffffff' : '#666',
              }}
            >
              <RefreshCw size={16} />
              {useAlternativeLayout ? 'Original Layout' : 'Alternative Layout'}
            </button>
          )}
        </div>

        {/* Alternative Layouts - Priority: 1. localStorage, 2. code HTML blocks, 3. React components */}
        {useAlternativeLayout && (getStoredHTMLBlock(slug) || getCourseHTML(slug)) ? (
          <>
            <GetAccessBar price={course.price} originalPrice={course.originalPrice} onCheckout={handleGetAccess} />
            <div className="pb-24">
              <RawHTMLRenderer html={(getStoredHTMLBlock(slug) || getCourseHTML(slug))!} onCheckout={handleGetAccess} />
            </div>
            <StickyCart title={course.title} price={course.price} originalPrice={course.originalPrice} onCheckout={handleGetAccess} />
          </>
        ) : slug === 'ai-photographer' && useAlternativeLayout ? (
          <>
            <GetAccessBar price={course.price} originalPrice={course.originalPrice} onCheckout={handleGetAccess} />
            <div className="pb-24">
              <AIPhotographerAlternativeLayout course={course} onCheckout={handleGetAccess} />
            </div>
            <StickyCart title={course.title} price={course.price} originalPrice={course.originalPrice} onCheckout={handleGetAccess} />
          </>
        ) : slug === 'ad-copy-templates' && useAlternativeLayout ? (
          <>
            <GetAccessBar price={course.price} originalPrice={course.originalPrice} onCheckout={handleGetAccess} />
            <div className="pb-24">
              <AdCopyTemplatesAlternativeLayout course={course} onCheckout={handleGetAccess} />
            </div>
            <StickyCart title={course.title} price={course.price} originalPrice={course.originalPrice} onCheckout={handleGetAccess} />
          </>
        ) : slug === 'meta-ad-templates' && useAlternativeLayout ? (
          <>
            <GetAccessBar price={course.price} originalPrice={course.originalPrice} onCheckout={handleGetAccess} />
            <div className="pb-24">
              <MetaAdTemplatesAlternativeLayout course={course} onCheckout={handleGetAccess} />
            </div>
            <StickyCart title={course.title} price={course.price} originalPrice={course.originalPrice} onCheckout={handleGetAccess} />
          </>
        ) : slug === 'subconscious-trap' && useAlternativeLayout ? (
          <>
            <GetAccessBar price={course.price} originalPrice={course.originalPrice} onCheckout={handleGetAccess} />
            <div className="pb-24">
              <SubconsciousTrapAlternativeLayout course={course} onCheckout={handleGetAccess} />
            </div>
            <StickyCart title={course.title} price={course.price} originalPrice={course.originalPrice} onCheckout={handleGetAccess} />
          </>
        ) : slug === 'ltv-system' && useAlternativeLayout ? (
          <>
            <GetAccessBar price={course.price} originalPrice={course.originalPrice} onCheckout={handleGetAccess} />
            <div className="pb-24">
              <LTVSystemAlternativeLayout course={course} onCheckout={handleGetAccess} />
            </div>
            <StickyCart title={course.title} price={course.price} originalPrice={course.originalPrice} onCheckout={handleGetAccess} />
          </>
        ) : slug === 'email-marketing' && useAlternativeLayout ? (
          <>
            <GetAccessBar price={course.price} originalPrice={course.originalPrice} onCheckout={handleGetAccess} />
            <div className="pb-24">
              <EmailMarketingAlternativeLayout course={course} onCheckout={handleGetAccess} />
            </div>
            <StickyCart title={course.title} price={course.price} originalPrice={course.originalPrice} onCheckout={handleGetAccess} />
          </>
        ) : slug === 'abandoned-checkout' && useAlternativeLayout ? (
          <>
            <GetAccessBar price={course.price} originalPrice={course.originalPrice} onCheckout={handleGetAccess} />
            <div className="pb-24">
              <AbandonedCheckoutAlternativeLayout course={course} onCheckout={handleGetAccess} />
            </div>
            <StickyCart title={course.title} price={course.price} originalPrice={course.originalPrice} onCheckout={handleGetAccess} />
          </>
        ) : (
          <>
        {/* Hero Section */}
        <div className="w-full mt-6">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative min-h-[400px] lg:min-h-[500px]">
              <Image src={course.heroImage || course.image} alt={course.title} fill unoptimized className="object-cover" priority />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
              <div className="flex items-start justify-between mb-4">
                {course.badge && (<span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#111] text-white">{course.badge}</span>)}
                <button onClick={() => setIsWishlisted(!isWishlisted)} className="p-2 rounded-full hover:bg-[#f5f5f5] transition-colors">
                  <Heart size={22} className={isWishlisted ? 'text-red-500' : 'text-[#ccc]'} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
              <h1 className="text-2xl lg:text-4xl font-bold text-[#111] mb-3">{course.title}</h1>
              <p className="text-[#666] mb-6 leading-relaxed text-lg">{course.subtitle}</p>

              {/* Dynamic Stats from course data */}
              <div className="flex flex-wrap gap-3 mb-6">
                {course.stats.map((stat, index) => (
                  <div key={index} className="px-4 py-2 rounded-xl bg-[#f5f5f5]">
                    <span className="text-lg font-bold text-[#111]">{stat.value}</span>{' '}
                    <span className="text-sm text-[#666]">{stat.label}</span>
                  </div>
                ))}
              </div>

              {hasBonuses && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-[#f5f5f5] mb-6">
                  <Gift className="w-5 h-5 text-[#666]" />
                  <span className="text-sm"><strong className="text-[#111]">{course.bonuses.length} bonuses</strong><span className="text-[#666]"> worth ${totalBonusValue} included</span></span>
                </div>
              )}

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-[#111]">${course.price}</span>
                {course.originalPrice && (
                  <>
                    <span className="text-xl line-through text-[#999]">${course.originalPrice}</span>
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-[#111] text-white">Save {Math.round((1 - course.price / course.originalPrice) * 100)}%</span>
                  </>
                )}
              </div>

              <button onClick={() => setShowCheckout(true)} className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl font-medium text-white transition-all hover:opacity-90 hover:scale-[1.02]" style={{ background: 'linear-gradient(150deg, #000 0%, #000 30%, #3a3a3a 50%, #000 70%, #000 100%)' }}>
                <ShoppingCart size={20} />Get Instant Access
              </button>
              <p className="text-xs text-center text-[#888] mt-3">30-day money-back guarantee • Instant access • Lifetime updates</p>
            </div>
          </div>
        </div>

        {/* Course-Specific Visualizations */}
        {renderCourseVisuals()}

        {/* Real Results GIF Section */}
        {course.visuals && course.visuals.length > 0 && (
          <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">See It In Action</h2>
              <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">Real results from stores using these strategies</p>
              {/* Stack vertically for Social Proof course (before/after with arrow) */}
              <div className={`${slug === 'the-social-proof' ? 'flex flex-col gap-2 max-w-2xl mx-auto' : 'grid md:grid-cols-2 gap-6'}`}>
                {course.visuals.slice(0, slug === 'the-social-proof' ? course.visuals.length : 2).map((visual, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden bg-white border border-[#eee]">
                    <div className={`relative ${slug === 'the-social-proof' ? 'w-full' : 'aspect-video'}`}>
                      <Image src={visual.url} alt={visual.caption || 'Course visual'} width={800} height={slug === 'the-social-proof' ? 600 : 450} unoptimized className="w-full h-auto object-contain" />
                    </div>
                    {visual.caption && (<div className="p-4 text-center"><p className="text-sm text-[#666]">{visual.caption}</p></div>)}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* What You'll Learn */}
        <div className="w-full py-16 px-6 lg:px-10 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-[#111] mb-8 text-center">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(course.highlights || []).map((highlight, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} viewport={{ once: true }} className="flex items-start gap-3 p-5 rounded-xl bg-[#fafafa] border border-[#eee]">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#111] flex-shrink-0 mt-0.5"><Check size={14} className="text-white" /></div>
                  <span className="text-[#333]">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* About This Course */}
        <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#111] mb-6">About This Course</h2>
            <div className="text-[#444] whitespace-pre-line leading-relaxed text-lg mb-8">{course.longDescription}</div>

            {/* Embedded Visuals - Skip for Social Proof (already shown in See It In Action) */}
            {course.visuals && course.visuals.length > 0 && slug !== 'the-social-proof' && (
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                {course.visuals.map((visual, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="rounded-xl overflow-hidden bg-white border border-[#eee]"
                  >
                    <Image
                      src={visual.url}
                      alt={visual.caption || 'Course visual'}
                      width={600}
                      height={400}
                      unoptimized
                      className="w-full h-auto"
                    />
                    {visual.caption && (
                      <div className="p-3 text-center">
                        <p className="text-sm text-[#666]">{visual.caption}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Who This Is For - Course Specific */}
        <div className="w-full py-16 px-6 lg:px-10 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-[#111] mb-8 text-center">This Course Is Perfect For You If...</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {getCourseTargetAudience().map((item, index) => (
                <div key={index} className="p-6 rounded-xl text-center bg-[#fafafa] border border-[#eee]">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center bg-[#111]">
                    <item.icon size={28} style={{ color: '#ffffff' }} />
                  </div>
                  <h3 className="font-semibold text-[#111] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#666]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="w-full py-16 px-6 lg:px-10 bg-[#111]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap transition-all text-sm font-medium ${isActive ? 'bg-white' : 'hover:bg-white/10'}`} style={{ color: isActive ? '#111111' : 'rgba(255,255,255,0.7)' }}>
                    <Icon size={16} /><span>{tab.label}</span>
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
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white font-bold" style={{ color: '#111111' }}>{index + 1}</div>
                        <div>
                          <h3 className="font-semibold mb-1" style={{ color: '#ffffff' }}>{module.title}</h3>
                          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{module.description}</p>
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
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white"><Gift size={18} style={{ color: '#111111' }} /></div>
                          <div>
                            <h3 className="font-semibold mb-1" style={{ color: '#ffffff' }}>{bonus.title}</h3>
                            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{bonus.description}</p>
                          </div>
                        </div>
                        <div className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/10" style={{ color: '#ffffff' }}>${bonus.value} value</div>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-xl p-6 text-center mt-6 bg-white">
                    <p className="text-lg font-semibold mb-1" style={{ color: '#111111' }}>Total Bonus Value: ${totalBonusValue}</p>
                    <p className="text-sm" style={{ color: '#666666' }}>All included free with your purchase</p>
                  </div>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-3">
                  {course.faq.map((item, index) => (
                    <div key={index} className="rounded-xl overflow-hidden bg-white/5 border border-white/10">
                      <button onClick={() => setExpandedFaq(expandedFaq === index ? null : index)} className="w-full p-5 flex items-center justify-between text-left">
                        <span className="font-semibold pr-4" style={{ color: '#ffffff' }}>{item.question}</span>
                        {expandedFaq === index ? (<ChevronUp size={20} style={{ color: 'rgba(255,255,255,0.6)' }} className="flex-shrink-0" />) : (<ChevronDown size={20} style={{ color: 'rgba(255,255,255,0.6)' }} className="flex-shrink-0" />)}
                      </button>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="px-5 pb-5">
                            <p style={{ color: 'rgba(255,255,255,0.7)' }}>{item.answer}</p>
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

        {/* Final CTA */}
        <div className="w-full py-16 px-6 lg:px-10 bg-black">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#ffffff' }}>Ready to Get Started?</h2>
            <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Get instant access to {course.modules.length} modules{hasBonuses ? `, ${course.bonuses.length} bonuses worth $${totalBonusValue},` : ''} and start implementing today.
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-4xl font-bold" style={{ color: '#ffffff' }}>${course.price}</span>
              {course.originalPrice && (<span className="text-xl line-through" style={{ color: 'rgba(255,255,255,0.4)' }}>${course.originalPrice}</span>)}
            </div>
            <button onClick={() => setShowCheckout(true)} className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-medium transition-all hover:opacity-90 hover:scale-[1.02] bg-white" style={{ color: '#111111' }}>
              <ShoppingCart size={20} />Get Instant Access<ArrowRight size={18} />
            </button>
            <p className="text-sm mt-4" style={{ color: 'rgba(255,255,255,0.5)' }}>30-day money-back guarantee • No questions asked</p>
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
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
