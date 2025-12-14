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
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getCourseBySlug } from '@/data/courses';

type TabType = 'content' | 'bonuses' | 'faq';

// ========== SHARED COMPONENTS ==========

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
    {/* Conversion Comparison */}
    <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">The Psychology Advantage</h2>
        <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">What happens when you apply subconscious triggers</p>
        <div className="p-8 rounded-2xl bg-white border border-[#eee]">
          <h3 className="text-lg font-semibold text-[#111] mb-6 text-center">Conversion Rate: Before vs After</h3>
          <div className="flex items-end justify-center gap-12">
            <div className="text-center">
              <div className="relative w-20 mx-auto mb-4">
                <div className="w-full bg-[#f0f0f0] rounded-t-lg" style={{ height: '80px' }} />
                <div className="absolute bottom-0 left-0 right-0 rounded-t-lg" style={{ height: '28px', backgroundColor: '#ddd' }} />
              </div>
              <div className="text-2xl font-bold text-[#999]">0.89%</div>
              <div className="text-sm text-[#888] mt-1">Before</div>
            </div>
            <div className="pb-16"><ArrowRight size={32} className="text-[#111]" /></div>
            <div className="text-center">
              <div className="relative w-20 mx-auto mb-4">
                <div className="w-full bg-[#f0f0f0] rounded-t-lg" style={{ height: '80px' }} />
                <motion.div initial={{ height: 0 }} whileInView={{ height: '80px' }} transition={{ duration: 1, delay: 0.3 }} viewport={{ once: true }} className="absolute bottom-0 left-0 right-0 rounded-t-lg" style={{ backgroundColor: '#111' }} />
              </div>
              <div className="text-2xl font-bold text-[#111]">6.54%</div>
              <div className="text-sm text-[#888] mt-1">After</div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-600 font-semibold"><ArrowUp size={16} />+635% Increase</span>
          </div>
        </div>
      </div>
    </div>

    {/* Key Metrics */}
    <div className="w-full py-16 px-6 lg:px-10 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">Psychology-Driven Metrics</h2>
        <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">What stores achieve with subconscious influence</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: MousePointer, label: 'Click Rate', before: '2.1%', after: '8.7%', increase: '+314%' },
            { icon: ShoppingBag, label: 'Add to Cart', before: '3.2%', after: '12.4%', increase: '+288%' },
            { icon: DollarSign, label: 'AOV', before: '$47', after: '$89', increase: '+89%' },
            { icon: Users, label: 'Trust Score', before: '42%', after: '91%', increase: '+117%' },
          ].map((metric, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="p-6 rounded-xl bg-white border border-[#eee] text-center">
              <div className="w-12 h-12 rounded-xl bg-[#f5f5f5] flex items-center justify-center mx-auto mb-4"><metric.icon size={24} className="text-[#111]" /></div>
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
      </div>
    </div>

    {/* Funnel */}
    <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
      <div className="max-w-3xl mx-auto">
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
              <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} viewport={{ once: true }} className="flex items-center gap-4">
                <div className="w-20 text-right text-sm text-[#888]">{step.label}</div>
                <div className="flex-1 h-10 bg-[#fafafa] rounded-lg overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: step.width }} transition={{ duration: 0.8, delay: index * 0.15 }} viewport={{ once: true }} className="h-full rounded-lg flex items-center justify-end pr-3" style={{ backgroundColor: step.color }}>
                    <span className={`text-sm font-medium ${index >= 3 ? 'text-white' : 'text-[#666]'}`}>{step.value}</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-[#888] mt-6">Industry average: 1-3% • With psychology triggers: 15-25%</p>
        </div>
      </div>
    </div>
  </>
);

// ========== LTV SYSTEM VISUALIZATIONS ==========

const LTVSystemVisuals = () => (
  <>
    {/* LTV Multiplier */}
    <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">The LTV Multiplier Effect</h2>
        <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">Transform one-time buyers into lifetime customers</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { value: '$47', label: 'First Purchase', desc: 'Average initial order', color: '#ddd' },
            { value: '$470', label: 'After 12 Months', desc: 'With LTV system', color: '#666' },
            { value: '$1,000+', label: 'Lifetime Value', desc: 'Customer potential', color: '#111' },
          ].map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.15 }} viewport={{ once: true }} className="p-8 rounded-2xl text-center" style={{ backgroundColor: item.color }}>
              <div className={`text-4xl font-bold mb-2 ${index === 0 ? 'text-[#666]' : 'text-white'}`}>{item.value}</div>
              <div className={`font-medium mb-1 ${index === 0 ? 'text-[#444]' : 'text-white'}`}>{item.label}</div>
              <div className={`text-sm ${index === 0 ? 'text-[#888]' : 'text-white/70'}`}>{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Customer Journey */}
    <div className="w-full py-16 px-6 lg:px-10 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-8 text-center">The Automated Revenue Loop</h2>
        <div className="p-8 rounded-2xl bg-white border border-[#eee]">
          <div className="relative">
            <div className="absolute top-6 left-8 right-8 h-0.5 bg-[#eee]" />
            <motion.div initial={{ width: '0%' }} whileInView={{ width: '100%' }} transition={{ duration: 1.5 }} viewport={{ once: true }} className="absolute top-6 left-8 h-0.5 bg-[#111]" style={{ maxWidth: 'calc(100% - 64px)' }} />
            <div className="flex justify-between relative">
              {[
                { step: 1, title: 'Purchase', desc: 'First sale', icon: ShoppingCart },
                { step: 2, title: 'Nurture', desc: 'Email flows', icon: Mail },
                { step: 3, title: 'Re-engage', desc: 'Smart triggers', icon: RefreshCw },
                { step: 4, title: 'Repeat', desc: 'Lifetime value', icon: Repeat },
              ].map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.2 }} viewport={{ once: true }} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#111] text-white flex items-center justify-center mb-3 relative z-10">
                    <item.icon size={20} />
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

    {/* Repeat Purchase Stats */}
    <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">Customer Retention Metrics</h2>
        <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">What the automation system achieves</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Repeat, label: 'Repeat Rate', before: '12%', after: '47%', increase: '+292%' },
            { icon: DollarSign, label: 'LTV', before: '$89', after: '$340', increase: '+282%' },
            { icon: Users, label: 'Retention', before: '23%', after: '68%', increase: '+196%' },
            { icon: Mail, label: 'Email Revenue', before: '8%', after: '35%', increase: '+338%' },
          ].map((metric, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="p-6 rounded-xl bg-white border border-[#eee] text-center">
              <div className="w-12 h-12 rounded-xl bg-[#f5f5f5] flex items-center justify-center mx-auto mb-4"><metric.icon size={24} className="text-[#111]" /></div>
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
      </div>
    </div>
  </>
);

// ========== EMAIL MARKETING VISUALIZATIONS ==========

const EmailMarketingVisuals = () => (
  <>
    {/* Email vs Social ROI */}
    <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">Email vs Social Media ROI</h2>
        <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">Research from January 2025 - EmailToolTester</p>
        <div className="p-8 rounded-2xl bg-white border border-[#eee]">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <h4 className="font-semibold text-[#888] mb-4">Social Media ROI</h4>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-[#f0f0f0] flex items-center justify-center">
                  <span className="text-3xl font-bold text-[#999]">$2</span>
                </div>
              </div>
              <p className="text-sm text-[#666]">Per $1 spent</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-[#111] mb-4">Email Marketing ROI</h4>
              <motion.div initial={{ scale: 0.8 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="relative w-32 h-32 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-[#111] flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">$42</span>
                </div>
              </motion.div>
              <p className="text-sm text-[#666]">Per $1 spent</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111] text-white font-semibold text-lg">
              Email generates 20X more revenue
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* The 3 Systems */}
    <div className="w-full py-16 px-6 lg:px-10 bg-[#111]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">The 3-Part System</h2>
        <p className="text-white/70 text-center mb-10 max-w-xl mx-auto">Three layers of technology that create an unfair advantage</p>
        <div className="space-y-4">
          {[
            { num: '1', title: 'Business Intelligence + World-Class Setup', desc: 'The most advanced BI configuration — optimizing send times, frequency, and content delivery on a per-customer basis.' },
            { num: '2', title: 'Smart Automation Powered by AI + Data', desc: 'Automated systems that send hyper-personalized messages based on behavioral data and AI-driven predictions.' },
            { num: '3', title: 'Precision-Engineered Email Copy', desc: 'Emails designed to strike the exact psychological trigger in each customer\'s mind — at the perfect moment.' },
          ].map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} viewport={{ once: true }} className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-white text-[#111] font-bold text-xl">{item.num}</div>
                <div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/60">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Email Stats */}
    <div className="w-full py-16 px-6 lg:px-10 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">What Top Brands Achieve</h2>
        <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">From our COVID story: 764 sales = $92,462 from one email</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { value: 45, suffix: '%', label: 'Open Rate', desc: 'vs 20% industry average' },
            { value: 12, suffix: '%', label: 'Click Rate', desc: 'vs 2.6% industry average' },
            { value: 92462, prefix: '$', suffix: '', label: 'Single Campaign', desc: 'From one email blast' },
          ].map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.15 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-[#111] text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="text-white font-medium mb-1">{stat.label}</div>
              <div className="text-white/50 text-sm">{stat.desc}</div>
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
      {/* Revenue Calculator */}
      <div className="w-full py-16 px-6 lg:px-10 bg-[#fafafa]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">Calculate Your Lost Revenue</h2>
          <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">See how much money you're leaving on the table</p>

          <div className="p-8 rounded-2xl bg-white border border-[#eee]">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-[#333] mb-2">Monthly Revenue ($)</label>
                <input
                  type="number"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-[#ddd] focus:border-[#111] focus:outline-none text-lg font-semibold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333] mb-2">Average Order Value ($)</label>
                <input
                  type="number"
                  value={aov}
                  onChange={(e) => setAov(Number(e.target.value) || 1)}
                  className="w-full px-4 py-3 rounded-xl border border-[#ddd] focus:border-[#111] focus:outline-none text-lg font-semibold"
                />
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#f5f5f5]">
                <span className="text-[#666]">Monthly completed orders</span>
                <span className="font-bold text-[#111]">{monthlyOrders.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#f5f5f5]">
                <span className="text-[#666]">Checkout starts (estimated)</span>
                <span className="font-bold text-[#111]">{checkoutStarts.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-red-50 border border-red-200">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={18} className="text-red-500" />
                  <span className="text-red-700 font-medium">Abandoned checkouts</span>
                </div>
                <span className="font-bold text-red-600">{abandonedCheckouts.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#111] text-center">
              <p className="text-white/70 mb-2">With 82% recovery rate, you could recover:</p>
              <div className="text-4xl font-bold text-green-400 mb-2">
                ${recoveredRevenue.toLocaleString()}/month
              </div>
              <div className="text-2xl font-semibold text-white mb-4">
                ${yearlyRecovered.toLocaleString()}/year
              </div>
              <div className="flex items-center justify-center gap-2 text-green-400">
                <CheckCircle size={20} />
                <span className="font-medium">{recoveredOrders} orders recovered monthly</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The 7-Email Sequence */}
      <div className="w-full py-16 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#111] mb-4 text-center">The 7-Email Recovery Sequence</h2>
          <p className="text-[#666] text-center mb-10 max-w-xl mx-auto">Strategic timing that converts 82% of abandoned checkouts</p>

          <div className="space-y-3">
            {[
              { time: '1 hour', title: 'Instant Reminder', desc: 'Catches them while you\'re fresh in their mind', color: '#111' },
              { time: '4 hours', title: 'Trust Builder', desc: 'Social proof + guarantees', color: '#333' },
              { time: '24 hours', title: 'Objection Handler', desc: 'Addresses shipping, returns, questions', color: '#444' },
              { time: '48 hours', title: 'Scarcity Trigger', desc: 'Creates authentic urgency', color: '#555' },
              { time: '72 hours', title: 'Value Stack', desc: 'Re-frames as investment', color: '#666' },
              { time: '5 days', title: 'Personal Touch', desc: 'Feels 1-on-1', color: '#777' },
              { time: '7 days', title: 'Final Push', desc: 'Last chance + incentive', color: '#888' },
            ].map((email, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} viewport={{ once: true }} className="flex items-center gap-4 p-4 rounded-xl border border-[#eee] hover:border-green-300 hover:bg-green-50/30 transition-all">
                <div className="w-20 text-center flex-shrink-0">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#f5f5f5] text-[#666]">{email.time}</span>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: email.color }}>
                  <Send size={16} className="text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[#111]">{email.title}</h4>
                  <p className="text-sm text-[#666]">{email.desc}</p>
                </div>
                <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="w-full py-16 px-6 lg:px-10 bg-[#111]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">Proven Results</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { value: 82, suffix: '%', label: 'Recovery Rate', desc: 'Of abandoned checkouts' },
              { value: 58, suffix: '%', label: 'Revenue Increase', desc: 'From recovered sales' },
              { value: 2, suffix: 'hrs', label: 'Setup Time', desc: 'Plug and play' },
            ].map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.15 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-4xl lg:text-5xl font-bold text-green-400 mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white font-medium mb-1">{stat.label}</div>
                <div className="text-white/50 text-sm">{stat.desc}</div>
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
        <h2 className="text-2xl font-bold text-white mb-4 text-center">The Psychology of Influence</h2>
        <p className="text-white/70 text-center mb-10 max-w-xl mx-auto">When one person buys, others follow — automatically</p>

        {/* Network Visualization */}
        <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden" style={{ minHeight: '300px' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Central Node */}
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="relative z-10">
              <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7700fd 0%, #9d00ff 100%)' }}>
                <ShoppingCart size={32} className="text-white" />
              </div>
              <motion.div initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 rounded-full" style={{ border: '2px solid #7700fd' }} />
            </motion.div>

            {/* Orbiting Nodes */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }} viewport={{ once: true }} className="absolute" style={{ transform: `rotate(${i * 60}deg) translateX(100px) rotate(-${i * 60}deg)` }}>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <Users size={20} className="text-white/80" />
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
            <p className="text-white/60 text-sm">One purchase triggers a cascade of conversions</p>
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
            <Link href="/courses" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white" style={{ background: 'linear-gradient(150deg, #000 0%, #222 50%, #000 100%)' }}>Back to Courses</Link>
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
      default:
        return <SubconsciousTrapVisuals />;
    }
  };

  return (
    <DashboardLayout>
      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={() => !isProcessing && setShowCheckout(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-md rounded-2xl overflow-hidden bg-white" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-[#eee]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#111]">Quick Checkout</h2>
                  {!isProcessing && (<button onClick={() => setShowCheckout(false)} className="p-2 rounded-full hover:bg-[#f5f5f5]"><X size={20} className="text-[#666]" /></button>)}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#666]"><Lock size={14} /><span>Secure checkout powered by Stripe</span></div>
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
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white bg-[#111]">{(customEmail || user?.email)?.charAt(0).toUpperCase() || 'U'}</div>
                      <div>
                        <p className="font-medium text-[#111] text-sm">{customEmail || user?.email}</p>
                        <p className="text-xs text-[#666]">Course will be sent to this email</p>
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
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#666]">Total</span>
                  <span className="text-2xl font-bold text-[#111]">${course.price}</span>
                </div>
                <button onClick={handlePurchase} disabled={isProcessing} className="w-full py-4 rounded-xl font-medium text-white flex items-center justify-center gap-2" style={{ background: isProcessing ? '#666' : 'linear-gradient(150deg, #000 0%, #000 30%, #222 50%, #000 70%, #000 100%)' }}>
                  {isProcessing ? (<><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Processing...</>) : (<><Lock size={18} />Complete Purchase</>)}
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
      <div className="min-h-screen bg-white" style={{ margin: '-40px -48px', width: 'calc(100% + 96px)' }}>
        {/* Back Button */}
        <div className="w-full px-6 lg:px-10 pt-6">
          <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-[#666] hover:text-[#111] transition-colors"><ChevronLeft size={16} />Back to Courses</Link>
        </div>

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

              <button onClick={() => setShowCheckout(true)} className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl font-medium text-white transition-all hover:opacity-90 hover:scale-[1.02]" style={{ background: 'linear-gradient(150deg, #000 0%, #000 30%, #222 50%, #000 70%, #000 100%)' }}>
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
            <div className="text-[#444] whitespace-pre-line leading-relaxed text-lg">{course.longDescription}</div>
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
                    <item.icon size={28} className="text-white" />
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
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap transition-all text-sm font-medium ${isActive ? 'bg-white text-[#111]' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
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
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white text-[#111] font-bold">{index + 1}</div>
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
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white"><Gift size={18} className="text-[#111]" /></div>
                          <div>
                            <h3 className="font-semibold text-white mb-1">{bonus.title}</h3>
                            <p className="text-sm text-white/60">{bonus.description}</p>
                          </div>
                        </div>
                        <div className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/10 text-white">${bonus.value} value</div>
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
                      <button onClick={() => setExpandedFaq(expandedFaq === index ? null : index)} className="w-full p-5 flex items-center justify-between text-left">
                        <span className="font-semibold text-white pr-4">{item.question}</span>
                        {expandedFaq === index ? (<ChevronUp size={20} className="text-white/60 flex-shrink-0" />) : (<ChevronDown size={20} className="text-white/60 flex-shrink-0" />)}
                      </button>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="px-5 pb-5">
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

        {/* Final CTA */}
        <div className="w-full py-16 px-6 lg:px-10 bg-black">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-white/70 mb-8 text-lg">
              Get instant access to {course.modules.length} modules{hasBonuses ? `, ${course.bonuses.length} bonuses worth $${totalBonusValue},` : ''} and start implementing today.
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-4xl font-bold text-white">${course.price}</span>
              {course.originalPrice && (<span className="text-xl line-through text-white/40">${course.originalPrice}</span>)}
            </div>
            <button onClick={() => setShowCheckout(true)} className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-medium transition-all hover:opacity-90 hover:scale-[1.02] bg-white text-[#111]">
              <ShoppingCart size={20} />Get Instant Access<ArrowRight size={18} />
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
