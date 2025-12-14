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
  Layout,
  Sparkles,
  Star,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getCourseBySlug } from '@/data/courses';

type TabType = 'content' | 'bonuses' | 'faq';
type LayoutType = 1 | 2 | 3;

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
  const [currentLayout, setCurrentLayout] = useState<LayoutType>(1);
  const [showLayoutPicker, setShowLayoutPicker] = useState(false);

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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
        <div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!course) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
          <div className="text-center">
            <h3 className="text-xl font-medium text-[#111111] mb-2">Course not found</h3>
            <p className="text-[#666666] mb-6">The course you're looking for doesn't exist.</p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(150deg, #000000 0%, #222222 50%, #000000 100%)' }}
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

  // Shared Components
  const CheckoutModal = () => (
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
            className="w-full max-w-md rounded-2xl overflow-hidden"
            style={{ backgroundColor: '#ffffff' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[#eeeeee]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#111111]">Quick Checkout</h2>
                {!isProcessing && (
                  <button onClick={() => setShowCheckout(false)} className="p-2 rounded-full hover:bg-[#f5f5f5]">
                    <X size={20} className="text-[#666666]" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-[#666666]">
                <Lock size={14} />
                <span>Secure checkout powered by Stripe</span>
              </div>
            </div>

            <div className="p-6 border-b border-[#eeeeee]">
              <div className="flex gap-4">
                <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#f5f5f5]">
                  <Image src={course.image} alt={course.title} width={80} height={64} unoptimized className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#111111] text-sm">{course.title}</h3>
                  <p className="text-xs text-[#666666] mt-1">Instant digital access</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-bold text-[#111111]">${course.price}</span>
                    {course.originalPrice && <span className="text-xs line-through text-[#999999]">${course.originalPrice}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-b border-[#eeeeee]">
              {!showEmailChange ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white bg-[#111111]">
                      {(customEmail || user?.email)?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-medium text-[#111111] text-sm">{customEmail || user?.email}</p>
                      <p className="text-xs text-[#666666]">Course will be sent to this email</p>
                    </div>
                  </div>
                  <button onClick={() => setShowEmailChange(true)} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-[#f5f5f5] text-[#666666]">
                    <Edit3 size={12} />
                    Change
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-[#111111]">Send to a different email</p>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" size={16} />
                    <input
                      type="email"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full h-11 pl-10 pr-4 rounded-lg text-sm border border-[#e5e5e5] focus:border-[#111111] focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setShowEmailChange(false)} className="flex-1 py-2 text-sm font-medium rounded-lg bg-[#111111] text-white">Confirm</button>
                    <button onClick={() => { setCustomEmail(''); setShowEmailChange(false); }} className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-[#f5f5f5] text-[#666666]">Cancel</button>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#666666]">Total</span>
                <span className="text-2xl font-bold text-[#111111]">${course.price}</span>
              </div>
              <button
                onClick={handlePurchase}
                disabled={isProcessing}
                className="w-full py-4 rounded-xl font-medium text-white flex items-center justify-center gap-2"
                style={{ background: isProcessing ? '#666666' : 'linear-gradient(150deg, #000000 0%, #000000 30%, #222222 50%, #000000 70%, #000000 100%)' }}
              >
                {isProcessing ? (
                  <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Processing...</>
                ) : (
                  <><Lock size={18} />Complete Purchase</>
                )}
              </button>
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-[#888888]">
                <span>30-day guarantee</span><span>•</span><span>Instant access</span><span>•</span><span>Lifetime updates</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const TabsSection = () => (
    <div className="w-full py-16 px-6 lg:px-10" style={{ backgroundColor: '#111111' }}>
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
                  isActive ? 'text-[#111111] bg-white' : 'text-white/70 hover:text-white hover:bg-white/10'
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
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white text-[#111111] font-bold">{index + 1}</div>
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
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white"><Gift size={18} className="text-[#111111]" /></div>
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
                <p className="text-lg font-semibold text-[#111111] mb-1">Total Bonus Value: ${totalBonusValue}</p>
                <p className="text-sm text-[#666666]">All included free with your purchase</p>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-3">
              {course.faq.map((item, index) => (
                <div key={index} className="rounded-xl overflow-hidden bg-white/5 border border-white/10">
                  <button onClick={() => setExpandedFaq(expandedFaq === index ? null : index)} className="w-full p-5 flex items-center justify-between text-left">
                    <span className="font-semibold text-white pr-4">{item.question}</span>
                    {expandedFaq === index ? <ChevronUp size={20} className="text-white/60" /> : <ChevronDown size={20} className="text-white/60" />}
                  </button>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-5 pb-5">
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
  );

  const CTASection = () => (
    <div className="w-full py-16 px-6 lg:px-10" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Store?</h2>
        <p className="text-white/70 mb-8 text-lg">
          Get instant access to {course.modules.length} modules, {course.bonuses.length} bonuses worth ${totalBonusValue}, and start implementing today.
        </p>
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-4xl font-bold text-white">${course.price}</span>
          {course.originalPrice && <span className="text-xl line-through text-white/40">${course.originalPrice}</span>}
        </div>
        <button
          onClick={() => setShowCheckout(true)}
          className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-medium transition-all hover:opacity-90 hover:scale-[1.02] bg-white text-[#111111]"
        >
          <ShoppingCart size={20} />
          Get Instant Access
          <ArrowRight size={18} />
        </button>
        <p className="text-sm text-white/50 mt-4">30-day money-back guarantee • No questions asked</p>
      </div>
    </div>
  );

  const TrustBadges = () => (
    <div className="w-full py-10 px-6 lg:px-10 bg-white">
      <div className="flex flex-wrap items-center justify-center gap-10 text-sm text-[#888888]">
        <div className="flex items-center gap-2"><Shield size={20} /><span>Secure Checkout</span></div>
        <div className="flex items-center gap-2"><Clock size={20} /><span>Instant Access</span></div>
        <div className="flex items-center gap-2"><Award size={20} /><span>30-Day Guarantee</span></div>
        <div className="flex items-center gap-2"><Gift size={20} /><span>Lifetime Updates</span></div>
      </div>
    </div>
  );

  // ========== LAYOUT 1: Cinematic Full-Width ==========
  const Layout1 = () => (
    <>
      {/* Full-Width Hero Image */}
      <div className="w-full">
        <div className="relative w-full" style={{ height: '70vh', minHeight: '500px' }}>
          <Image
            src={course.heroImage || course.image}
            alt={course.title}
            fill
            unoptimized
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                {course.badge && (
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-[#111111]">{course.badge}</span>
                )}
                <button onClick={() => setIsWishlisted(!isWishlisted)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <Heart size={18} className={isWishlisted ? 'text-red-500' : 'text-white'} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">{course.title}</h1>
              <p className="text-xl text-white/80 mb-6 max-w-2xl">{course.subtitle}</p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-white">
                  <BookOpen size={18} /><span className="font-medium">8 Modules</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Clock size={18} /><span className="font-medium">6+ Hours</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Gift size={18} /><span className="font-medium">{course.bonuses.length} Bonuses</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setShowCheckout(true)}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-[#111111] bg-white hover:bg-white/90 transition-all"
                >
                  <ShoppingCart size={20} />
                  Get Access — ${course.price}
                  {course.originalPrice && <span className="text-sm line-through opacity-50">${course.originalPrice}</span>}
                </button>
                <p className="text-white/60 text-sm">30-day money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Learn */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111111] mb-12 text-center">What You'll Master</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(course.highlights || []).map((highlight, index) => (
              <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-[#fafafa]">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#111111] flex-shrink-0">
                  <Check size={16} className="text-white" />
                </div>
                <span className="text-[#333333] leading-relaxed">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="w-full py-20 px-6 lg:px-10 bg-[#fafafa]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111111] mb-8">About This Course</h2>
          <div className="text-lg text-[#444444] whitespace-pre-line leading-relaxed">{course.longDescription}</div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111111] mb-4 text-center">Real Results</h2>
          <p className="text-[#666666] text-center mb-12 max-w-xl mx-auto">See what store owners achieved with these frameworks</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden border border-[#eee]">
              <Image src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Comments_1.jpg?v=1760351539" alt="Testimonials" width={600} height={400} unoptimized className="w-full" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-[#eee]">
              <Image src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Hurdeep_6.png?v=1760351539" alt="Results" width={600} height={400} unoptimized className="w-full" />
            </div>
          </div>
        </div>
      </div>

      <TabsSection />
      <CTASection />
      <TrustBadges />
    </>
  );

  // ========== LAYOUT 2: Magazine Editorial ==========
  const Layout2 = () => (
    <>
      {/* Split Hero */}
      <div className="w-full bg-[#111111]">
        <div className="grid lg:grid-cols-2 min-h-[80vh]">
          {/* Left - Content */}
          <div className="flex flex-col justify-center p-8 lg:p-16 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6">
              {course.badge && <span className="px-4 py-2 rounded-full text-sm font-medium bg-white text-[#111111]">{course.badge}</span>}
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-yellow-400" fill="currentColor" />)}
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">{course.title}</h1>
            <p className="text-xl text-white/70 mb-8">{course.subtitle}</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 rounded-xl bg-white/5">
                <div className="text-2xl font-bold text-white">8</div>
                <div className="text-sm text-white/50">Modules</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5">
                <div className="text-2xl font-bold text-white">6+</div>
                <div className="text-sm text-white/50">Hours</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm text-white/50">Templates</div>
              </div>
            </div>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-5xl font-bold text-white">${course.price}</span>
              {course.originalPrice && (
                <>
                  <span className="text-2xl line-through text-white/40">${course.originalPrice}</span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400">
                    Save {Math.round((1 - course.price / course.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="flex items-center justify-center gap-3 w-full py-5 rounded-xl font-medium text-[#111111] bg-white hover:bg-white/90 transition-all text-lg"
            >
              <ShoppingCart size={22} />
              Enroll Now
            </button>

            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-white/50">
              <span className="flex items-center gap-2"><Shield size={14} />Secure</span>
              <span className="flex items-center gap-2"><Clock size={14} />Instant</span>
              <span className="flex items-center gap-2"><Award size={14} />Guaranteed</span>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative order-1 lg:order-2 min-h-[400px]">
            <Image src={course.heroImage || course.image} alt={course.title} fill unoptimized className="object-cover" priority />
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              <Heart size={22} className={isWishlisted ? 'text-red-500' : 'text-white'} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      {/* Highlights Strip */}
      <div className="w-full py-6 px-6 bg-[#fafafa] border-y border-[#eee]">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-8 text-sm">
          <span className="flex items-center gap-2 text-[#666]"><Check size={16} className="text-green-500" />Lifetime Access</span>
          <span className="flex items-center gap-2 text-[#666]"><Check size={16} className="text-green-500" />50+ Templates</span>
          <span className="flex items-center gap-2 text-[#666]"><Check size={16} className="text-green-500" />${totalBonusValue} in Bonuses</span>
          <span className="flex items-center gap-2 text-[#666]"><Check size={16} className="text-green-500" />30-Day Guarantee</span>
        </div>
      </div>

      {/* Content Cards */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - About */}
            <div>
              <h2 className="text-2xl font-bold text-[#111111] mb-6">About This Course</h2>
              <div className="text-[#555555] whitespace-pre-line leading-relaxed">{course.longDescription}</div>
            </div>

            {/* Right - What You'll Learn */}
            <div>
              <h2 className="text-2xl font-bold text-[#111111] mb-6">What You'll Learn</h2>
              <div className="space-y-4">
                {(course.highlights || []).map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#111111] flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-white" />
                    </div>
                    <span className="text-[#444444]">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Gallery */}
      <div className="w-full py-20 px-6 lg:px-10 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#111111] mb-4">Proven Results</h2>
            <p className="text-[#666666]">Real feedback from students using these methods</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden bg-white border border-[#eee]">
              <Image src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Comments_1.jpg?v=1760351539" alt="Testimonials" width={400} height={300} unoptimized className="w-full" />
            </div>
            <div className="rounded-2xl overflow-hidden bg-white border border-[#eee]">
              <Image src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Comments.jpg?v=1760351539" alt="More testimonials" width={400} height={300} unoptimized className="w-full" />
            </div>
            <div className="rounded-2xl overflow-hidden bg-white border border-[#eee]">
              <Image src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Hurdeep_6.png?v=1760351539" alt="Results" width={400} height={300} unoptimized className="w-full" />
            </div>
          </div>
        </div>
      </div>

      <TabsSection />
      <CTASection />
      <TrustBadges />
    </>
  );

  // ========== LAYOUT 3: Minimal Premium ==========
  const Layout3 = () => (
    <>
      {/* Centered Hero */}
      <div className="w-full py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            {course.badge && <span className="px-4 py-2 rounded-full text-sm font-semibold bg-[#111111] text-white">{course.badge}</span>}
            <button onClick={() => setIsWishlisted(!isWishlisted)} className="p-2 rounded-full hover:bg-[#f5f5f5]">
              <Heart size={20} className={isWishlisted ? 'text-red-500' : 'text-[#ccc]'} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-[#111111] mb-6 leading-tight">{course.title}</h1>
          <p className="text-xl text-[#666666] mb-10 max-w-2xl mx-auto">{course.subtitle}</p>

          {/* Hero Image - Full Width */}
          <div className="rounded-3xl overflow-hidden mb-10">
            <Image src={course.heroImage || course.image} alt={course.title} width={1200} height={600} unoptimized className="w-full" priority />
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#111111]">8</div>
              <div className="text-sm text-[#888888] uppercase tracking-wider">Modules</div>
            </div>
            <div className="w-px h-12 bg-[#eee]" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[#111111]">6+</div>
              <div className="text-sm text-[#888888] uppercase tracking-wider">Hours</div>
            </div>
            <div className="w-px h-12 bg-[#eee]" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[#111111]">50+</div>
              <div className="text-sm text-[#888888] uppercase tracking-wider">Templates</div>
            </div>
            <div className="w-px h-12 bg-[#eee]" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[#111111]">${totalBonusValue}</div>
              <div className="text-sm text-[#888888] uppercase tracking-wider">In Bonuses</div>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="inline-flex flex-col items-center p-8 rounded-2xl bg-[#fafafa]">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-5xl font-bold text-[#111111]">${course.price}</span>
              {course.originalPrice && (
                <>
                  <span className="text-2xl line-through text-[#999999]">${course.originalPrice}</span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#111111] text-white">
                    {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="flex items-center justify-center gap-2 w-full px-12 py-4 rounded-xl font-medium text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(150deg, #000000 0%, #000000 30%, #222222 50%, #000000 70%, #000000 100%)' }}
            >
              <ShoppingCart size={20} />
              Get Instant Access
            </button>
            <p className="text-sm text-[#888888] mt-4">30-day money-back guarantee • Instant access</p>
          </div>
        </div>
      </div>

      {/* Two-Column Content */}
      <div className="w-full py-20 px-6 lg:px-10 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-[#111111] mb-6">About This Course</h2>
            <div className="text-[#555555] whitespace-pre-line leading-relaxed mb-12">{course.longDescription}</div>

            <h2 className="text-2xl font-bold text-[#111111] mb-6">What You'll Learn</h2>
            <div className="grid gap-4">
              {(course.highlights || []).map((highlight, index) => (
                <div key={index} className="flex items-start gap-4 p-5 rounded-xl bg-white">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#111111] flex-shrink-0">
                    <Check size={14} className="text-white" />
                  </div>
                  <span className="text-[#333333]">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 space-y-6">
              <div className="rounded-2xl overflow-hidden bg-white border border-[#eee]">
                <div className="p-6 border-b border-[#eee]">
                  <h3 className="font-semibold text-[#111111] mb-2">Student Results</h3>
                  <p className="text-sm text-[#666666]">Real feedback from students</p>
                </div>
                <Image src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Comments_1.jpg?v=1760351539" alt="Testimonials" width={400} height={300} unoptimized className="w-full" />
              </div>

              <div className="rounded-2xl overflow-hidden bg-white border border-[#eee]">
                <div className="p-6 border-b border-[#eee]">
                  <h3 className="font-semibold text-[#111111] mb-2">Conversion Boost</h3>
                  <p className="text-sm text-[#666666]">A/B test results</p>
                </div>
                <Image src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Hurdeep_6.png?v=1760351539" alt="Results" width={400} height={300} unoptimized className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <TabsSection />
      <CTASection />
      <TrustBadges />
    </>
  );

  return (
    <DashboardLayout>
      <CheckoutModal />

      {/* Layout Picker Toggle */}
      <div className="fixed bottom-6 right-6 z-40">
        <AnimatePresence>
          {showLayoutPicker && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-16 right-0 p-4 rounded-2xl bg-white shadow-2xl border border-[#eee] w-72"
            >
              <p className="text-sm font-medium text-[#111111] mb-3">Choose Layout</p>
              <div className="space-y-2">
                {[
                  { id: 1, name: 'Cinematic', desc: 'Full-width hero with overlay' },
                  { id: 2, name: 'Magazine', desc: 'Split layout, editorial style' },
                  { id: 3, name: 'Minimal', desc: 'Centered, clean premium' },
                ].map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => { setCurrentLayout(layout.id as LayoutType); setShowLayoutPicker(false); }}
                    className={`w-full p-3 rounded-xl text-left transition-all ${
                      currentLayout === layout.id ? 'bg-[#111111] text-white' : 'bg-[#f5f5f5] hover:bg-[#eee] text-[#333]'
                    }`}
                  >
                    <div className="font-medium text-sm">{layout.name}</div>
                    <div className={`text-xs ${currentLayout === layout.id ? 'text-white/70' : 'text-[#888]'}`}>{layout.desc}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setShowLayoutPicker(!showLayoutPicker)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#111111] text-white shadow-lg hover:bg-[#222] transition-all"
        >
          <Layout size={18} />
          <span className="text-sm font-medium">Layout {currentLayout}</span>
        </button>
      </div>

      {/* Full-width wrapper */}
      <div
        className="min-h-screen bg-white"
        style={{
          margin: '-40px -48px',
          width: 'calc(100% + 96px)',
        }}
      >
        {/* Back Button */}
        <div className="w-full px-6 lg:px-10 pt-6 pb-4 bg-white">
          <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-[#666666] hover:text-[#111111] transition-colors">
            <ChevronLeft size={16} />
            Back to Courses
          </Link>
        </div>

        {/* Render Current Layout */}
        {currentLayout === 1 && <Layout1 />}
        {currentLayout === 2 && <Layout2 />}
        {currentLayout === 3 && <Layout3 />}
      </div>
    </DashboardLayout>
  );
}
