'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  ExternalLink,
  ChevronDown,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Tool data structure
interface Tool {
  id: number;
  name: string;
  role: string;
  shortDescription: string;
  fullDescription?: string;
  installUrl: string;
  logo?: string;
  hasExpandableInfo: boolean;
  infoContent?: {
    paragraphs?: string[];
    exampleQuestions?: { question: string; options: string[] }[];
  };
  warehouseImages?: string[];
  isFree?: boolean;
  specialBadge?: string;
}

// 16-22 word descriptions with expandable content
const dreamTeamTools: Tool[] = [
  {
    id: 1,
    name: 'DataDrew',
    role: 'Analytics',
    shortDescription: 'Free lifetime value tracking for every customer. Export your top spenders directly to ad platforms for lookalike audiences.',
    fullDescription: 'Know exactly how much each customer is worth. Export your highest-value buyers to Meta and Google for laser-targeted lookalike audiences. Most stores fly blind without LTV data.',
    installUrl: 'https://apps.shopify.com/customer-lifetime-value?mref=lsbqcbva',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Satoshi_3.jpg?v=1761567329',
    hasExpandableInfo: false,
    isFree: true,
  },
  {
    id: 2,
    name: 'TxtCart',
    role: 'Cart Recovery',
    shortDescription: 'AI-powered SMS that recovers abandoned carts automatically. Conversations feel human, not robotic. Proven 25-40% recovery rates.',
    fullDescription: 'Most cart recovery emails get ignored. TxtCart sends AI-powered text messages that feel like a real person. Customers actually reply. Recovery rates of 25-40% are common.',
    installUrl: 'https://txtcartapp.com/affiliate/?mref=lsbqcbva',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-12T140826.947.png?v=1760267314',
    hasExpandableInfo: false,
  },
  {
    id: 3,
    name: 'Mate',
    role: 'Private Agent',
    shortDescription: '5-day global shipping replaces AliExpress nightmare. No monthly fees, no minimums, personal WhatsApp support for every order.',
    fullDescription: 'Stop losing customers to 30-day shipping times. Mate delivers worldwide in 5 days with quality control, branded packaging, and a personal agent on WhatsApp. Zero commitment.',
    installUrl: 'https://erp.matedropshipping.com/login?invite_id=915',
    logo: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/COag0vSJxoUDEAE=.png',
    hasExpandableInfo: true,
    infoContent: {
      paragraphs: [
        'AliExpress is killing your business. Long shipping times, damaged products, angry customers leaving bad reviews.',
        'Mate ships globally in 5 days. You get a personal WhatsApp agent who handles everything. Zero monthly fees. Zero commitment.',
        'Use our exclusive link for partnership terms and dedicated priority support.',
      ],
    },
    warehouseImages: [
      'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/19%20(1).jpg',
      'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/21.jpg',
      'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/24.jpg',
    ],
    isFree: true,
  },
  {
    id: 4,
    name: 'HyperSKU',
    role: 'Backup Agent',
    shortDescription: 'Smart sellers use two agents. Compare prices per order, pick the cheaper option. Never get stuck when one has issues.',
    fullDescription: 'Never depend on a single fulfillment source. Compare pricing per product, pick the cheaper agent for each order. When one has stock issues, the other has your back.',
    installUrl: 'https://www.hypersku.com/campaign/optimize-dropshipping/?ref=nmmwogq',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T115639.885.png?v=1760086613',
    hasExpandableInfo: true,
    infoContent: {
      paragraphs: [
        'One agent goes down? You lose sales. Smart sellers always have a backup.',
        'HyperSKU offers the same benefits: fast shipping, quality control, branded packaging, no monthly fees.',
        'Compare prices between agents per product. Always choose the cheaper option.',
      ],
    },
    warehouseImages: [
      'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/19%20(1).jpg',
      'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/21.jpg',
      'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/24.jpg',
    ],
    isFree: true,
  },
  {
    id: 5,
    name: 'Klaviyo',
    role: 'Email Marketing',
    shortDescription: 'The email platform that prints money while you sleep. Advanced flows, smart segments, AI subject lines. Industry gold standard.',
    fullDescription: 'Every 8-figure store uses Klaviyo. Automated flows for abandoned carts, post-purchase, win-back campaigns. AI writes subject lines. Segments update automatically.',
    installUrl: 'https://www.klaviyo.com/partner/signup?utm_source=001Nu00000NY5EeIAL&utm_medium=partner',
    logo: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/klaviyoblog.jpg',
    hasExpandableInfo: false,
  },
  {
    id: 6,
    name: 'KeepCart',
    role: 'Coupon Blocker',
    shortDescription: 'Honey and 125+ browser extensions are stealing your margins. KeepCart blocks them all. Plug this profit leak immediately.',
    fullDescription: 'Coupon extensions like Honey scrape your discount codes and share them publicly. Every customer finds your secret codes. KeepCart blocks all 125+ extensions instantly.',
    installUrl: 'https://platform.shoffi.app/r/rl_U2L0seLE',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T122003.978.png?v=1760088020',
    hasExpandableInfo: false,
    isFree: true,
  },
  {
    id: 7,
    name: 'Cart Upsell',
    role: 'AOV Booster',
    shortDescription: 'The Starbucks checkout psychology trick. Show impulse-buy items at cart. Average stores add $5-8 pure profit per order.',
    fullDescription: 'Ever notice how Starbucks puts snacks at checkout? Same psychology. Show complementary products in cart drawer. Most stores see $5-8 extra per order. Pure profit.',
    installUrl: 'https://platform.shoffi.app/r/rl_cm697iNI',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Satoshi_2.jpg?v=1761567244',
    hasExpandableInfo: false,
    specialBadge: '+$5-8 AOV',
  },
  {
    id: 8,
    name: 'Grapevine',
    role: 'Customer Intel',
    shortDescription: 'Post-purchase surveys reveal exactly why customers bought. This data triples conversion rates when you use it in your ads.',
    fullDescription: 'What made them buy? What almost stopped them? Where did they hear about you? This data is pure gold for ad targeting and conversion optimization.',
    installUrl: 'https://apps.shopify.com/grapevine?mref=lsbqcbva',
    logo: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Loyalty%20app%20Screenshots.png',
    hasExpandableInfo: true,
    infoContent: {
      paragraphs: [
        'What made them buy NOW? What almost stopped them? Where did they first hear about you?',
        'This data is pure gold. Use customer language in your ads. Triple your conversion rate.',
      ],
      exampleQuestions: [
        {
          question: 'How did you first hear about us?',
          options: ['Facebook/Instagram', 'Google Search', 'Friend/Family', 'Influencer'],
        },
        {
          question: 'What finally made you buy today?',
          options: ['Sale/Discount', 'Reviews', 'Urgency', 'Finally Ready'],
        },
      ],
    },
  },
  {
    id: 9,
    name: 'Triple Whale',
    role: 'Attribution',
    shortDescription: 'Meta and Google lie about conversions. Triple Whale shows 100% accurate attribution. See exactly where each sale came from.',
    fullDescription: 'iOS14 broke Meta tracking. You are flying blind with their numbers. Triple Whale uses first-party data for 100% accurate attribution. Free under $250K revenue.',
    installUrl: 'https://triplewhale.com/',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-09T234106.192.png?v=1760042538',
    hasExpandableInfo: false,
    isFree: true,
  },
  {
    id: 10,
    name: 'Geo Convert',
    role: 'Geo Targeting',
    shortDescription: 'Location-based purchasing power discounts. Proven 60-70% conversion lift. The easiest conversion cheat code that actually works.',
    fullDescription: 'Visitors from lower-income countries see adjusted pricing based on purchasing power. Fair for them, more conversions for you. 60-70% lift is standard.',
    installUrl: 'https://geo-convert.com/',
    logo: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Geo%20Convert.jpg',
    hasExpandableInfo: false,
    specialBadge: '60-70% CVR increase',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 25 },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

// Content dimensions - measured at scale=1 to ensure proper fit
// These values must be LARGER than actual content to guarantee no clipping
// Cards: 5 × 240px + gaps + shadows + hover effects + badge overflow
const CONTENT_WIDTH = 1500;  // Must fit all 5 cards + badges + shadows
const CONTENT_HEIGHT = 720;  // Must fit 2 rows + connectors + Shopify node
const MAX_ZOOM = 1.5;
const MIN_ZOOM_FLOOR = 0.65; // Ensure content is never too small

export default function DreamTeamPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [modalTool, setModalTool] = useState<Tool | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [minZoom, setMinZoom] = useState(0.5); // Dynamic, calculated on mount
  const [zoom, setZoom] = useState(0.5); // Will be set to minZoom on mount
  const [isPanning, setIsPanning] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Calculate optimal zoom to fit ALL content in viewport - NEVER cut off
  useEffect(() => {
    const calculateOptimalZoom = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const viewportWidth = containerRect.width;
      const viewportHeight = containerRect.height;

      // Calculate zoom to fit content completely
      // Use 98% of available space for maximum utilization (minimal margins)
      const zoomForWidth = (viewportWidth * 0.98) / CONTENT_WIDTH;
      const zoomForHeight = (viewportHeight * 0.98) / CONTENT_HEIGHT;

      // Use the SMALLER of the two to ensure BOTH dimensions fit
      // This guarantees content is never cut off on any screen
      const optimalZoom = Math.max(
        MIN_ZOOM_FLOOR,
        Math.min(zoomForWidth, zoomForHeight, MAX_ZOOM)
      );

      // This is our MIN_ZOOM - content fits completely at this level
      setMinZoom(optimalZoom);
      setZoom(optimalZoom);
      // Start with content shifted down slightly for better default view
      setPanOffset({ x: 0, y: 40 });
    };

    // Calculate after layout settles (multiple timers for stability)
    calculateOptimalZoom();
    const timers = [100, 300, 500].map(ms =>
      setTimeout(calculateOptimalZoom, ms)
    );

    // Recalculate on window resize
    window.addEventListener('resize', calculateOptimalZoom);
    return () => {
      window.removeEventListener('resize', calculateOptimalZoom);
      timers.forEach(clearTimeout);
    };
  }, []);

  // Zoom controls with dynamic minZoom
  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.08, MAX_ZOOM)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - 0.08, minZoom)), [minZoom]);
  const resetZoom = useCallback(() => {
    setZoom(minZoom);
    setPanOffset({ x: 0, y: 40 });  // Same as initial offset
  }, [minZoom]);

  // Toggle card expansion
  const toggleCardExpansion = (id: number) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Keyboard shortcuts for zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === '=' || e.key === '+') {
          e.preventDefault();
          zoomIn();
        } else if (e.key === '-') {
          e.preventDefault();
          zoomOut();
        } else if (e.key === '0') {
          e.preventDefault();
          resetZoom();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomIn, zoomOut, resetZoom]);

  // Scroll = Zoom when mouse is inside canvas ONLY - MUST use non-passive listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();  // This ONLY works with { passive: false }
      e.stopPropagation(); // CRITICAL: Prevent affecting sidebar/navbar
      if (e.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
    };

    // MUST use { passive: false } to allow preventDefault()
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [zoomIn, zoomOut]);

  // Mouse drag to pan
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) { // Left click only
      setIsPanning(true);
      setStartPan({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  }, [panOffset]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const scaledWidth = CONTENT_WIDTH * zoom;
      const scaledHeight = CONTENT_HEIGHT * zoom;

      // Calculate max pan limits - content edges shouldn't go past container edges
      // Allow some margin (50px) so content doesn't stick exactly to edge
      const margin = 50;
      const maxPanX = Math.max(0, (scaledWidth - containerRect.width) / 2 + margin);
      const maxPanY = Math.max(0, (scaledHeight - containerRect.height) / 2 + margin);

      // Calculate new offset
      let newX = e.clientX - startPan.x;
      let newY = e.clientY - startPan.y;

      // Clamp to limits
      newX = Math.max(-maxPanX, Math.min(maxPanX, newX));
      newY = Math.max(-maxPanY, Math.min(maxPanY, newY));

      setPanOffset({ x: newX, y: newY });
    }
  }, [isPanning, startPan, zoom]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Global mouseup listener for better pan UX (catches mouseup outside container)
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsPanning(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  // Auth check - temporarily disabled for visual QA
  // useEffect(() => {
  //   if (!isLoading && !user) {
  //     router.push('/login');
  //   }
  // }, [user, isLoading, router]);

  // if (isLoading || !user) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-white">
  //       <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
  //     </div>
  //   );
  // }

  // Split tools into rows for flowchart layout (5 per row)
  const row1 = dreamTeamTools.slice(0, 5);
  const row2 = dreamTeamTools.slice(5, 10);

  return (
    <DashboardLayout>
      {/* Page container - MUST NOT exceed viewport to prevent body scroll */}
      {/* -mx-12 = 48px to escape main-content horizontal padding (48px) */}
      {/* -my-10 = 40px to escape main-content vertical padding (40px) */}
      <div
        className="relative -mx-12 -my-10 flex flex-col"
        style={{
          height: 'calc(100vh - 64px)',
          overflow: 'hidden',
          // NO background here - canvas keeps original gray (#FAFAFA)
        }}
      >
        {/* Page Header - FULL WIDTH pure white background from edge to edge */}
        <header
          className="relative z-50 border-b border-[var(--border-light)] py-3 px-12 shrink-0"
          style={{
            width: '100%',
            backgroundColor: '#FFFFFF',  // Pure white - explicit
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[var(--primary)] flex items-center justify-center">
              <Zap size={14} className="text-white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">The Dream Team</h1>
              <p className="text-[10px] text-[var(--text-muted)]">
                10 tools that power 8-figure stores. Scroll to zoom, drag to pan.
              </p>
            </div>
          </div>
        </header>

        {/* Zoom Controls */}
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white rounded-2xl shadow-xl border border-[var(--border-light)] p-2">
          <button
            onClick={zoomOut}
            className="p-3 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors"
            title="Zoom Out (Ctrl+-)"
          >
            <ZoomOut size={18} className="text-[var(--text-secondary)]" />
          </button>
          <span className="px-3 py-1 text-sm font-medium text-[var(--text-muted)] min-w-16 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={zoomIn}
            className="p-3 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors"
            title="Zoom In (Ctrl++)"
          >
            <ZoomIn size={18} className="text-[var(--text-secondary)]" />
          </button>
          <div className="w-px h-6 bg-[var(--border-light)]" />
          <button
            onClick={resetZoom}
            className="p-3 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors"
            title="Reset Zoom (Ctrl+0)"
          >
            <Maximize2 size={18} className="text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Canvas Container - Full-bleed, Scroll = Zoom, Drag = Pan */}
        <div
          ref={containerRef}
          className={`relative z-10 overflow-hidden flex-1 ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{
            isolation: 'isolate',  // Creates new stacking context
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <motion.div
            ref={canvasRef}
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
              transformOrigin: 'top center',
              transition: isPanning ? 'none' : 'transform 0.2s ease-out',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingTop: '8px',
            }}
          >
            {/* Vertical Flowchart Layout */}
            <div ref={contentRef} className="relative flex flex-col items-center">

              {/* Row 1: First 5 tools */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex justify-center gap-2 mb-1"
              >
                {row1.map((tool) => (
                  <motion.div key={tool.id} variants={cardVariants}>
                    <ToolCard
                      tool={tool}
                      onOpenModal={() => setModalTool(tool)}
                      isExpanded={expandedCards.has(tool.id)}
                      onToggleExpand={() => toggleCardExpansion(tool.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Ultra Premium Connector Lines - Row 1 to Center */}
              <svg className="w-full h-8 overflow-visible" viewBox="0 0 1232 32" preserveAspectRatio="xMidYMid meet">
                <defs>
                  {/* Premium gradient for lines */}
                  <linearGradient id="premiumGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#E8E8ED" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#D1D1D6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#C7C7CC" stopOpacity="0.4" />
                  </linearGradient>
                  {/* Subtle glow filter */}
                  <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Elegant curved lines with smooth bezier */}
                {[0, 1, 2, 3, 4].map((i) => {
                  const startX = 120 + i * 248;
                  const controlY = 18 + Math.abs(i - 2) * 2;
                  return (
                    <g key={`connector1-${i}`}>
                      {/* Shadow line */}
                      <motion.path
                        d={`M ${startX} 0 C ${startX} ${controlY}, 616 ${controlY}, 616 32`}
                        fill="none"
                        stroke="rgba(0,0,0,0.03)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, delay: 0.3 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                      />
                      {/* Main elegant line */}
                      <motion.path
                        d={`M ${startX} 0 C ${startX} ${controlY}, 616 ${controlY}, 616 32`}
                        fill="none"
                        stroke="url(#premiumGradient1)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        filter="url(#softGlow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.3 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                      />
                    </g>
                  );
                })}
                {/* Center convergence node */}
                <motion.circle
                  cx="616"
                  cy="32"
                  r="2.5"
                  fill="#C7C7CC"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.6 }}
                  transition={{ delay: 1.2, duration: 0.4 }}
                />
              </svg>

              {/* Row 2: Next 5 tools */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex justify-center gap-2 mb-1"
              >
                {row2.map((tool) => (
                  <motion.div key={tool.id} variants={cardVariants}>
                    <ToolCard
                      tool={tool}
                      onOpenModal={() => setModalTool(tool)}
                      isExpanded={expandedCards.has(tool.id)}
                      onToggleExpand={() => toggleCardExpansion(tool.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Ultra Premium Connector Lines - Row 2 to Shopify */}
              <svg className="w-full h-10 overflow-visible" viewBox="0 0 1232 40" preserveAspectRatio="xMidYMid meet">
                <defs>
                  {/* Premium Shopify gradient */}
                  <linearGradient id="shopifyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#C7C7CC" stopOpacity="0.5" />
                    <stop offset="40%" stopColor="#A8D08D" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#95BF47" stopOpacity="0.9" />
                  </linearGradient>
                  {/* Shopify glow */}
                  <filter id="shopifyGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Elegant curved lines flowing to Shopify */}
                {[0, 1, 2, 3, 4].map((i) => {
                  const startX = 120 + i * 248;
                  const controlY = 22 + Math.abs(i - 2) * 3;
                  return (
                    <g key={`connector2-${i}`}>
                      {/* Deep shadow for depth */}
                      <motion.path
                        d={`M ${startX} 0 C ${startX} ${controlY}, 616 ${controlY}, 616 40`}
                        fill="none"
                        stroke="rgba(149,191,71,0.08)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.4, delay: 0.6 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                      />
                      {/* Mid glow layer */}
                      <motion.path
                        d={`M ${startX} 0 C ${startX} ${controlY}, 616 ${controlY}, 616 40`}
                        fill="none"
                        stroke="rgba(149,191,71,0.15)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.4, delay: 0.6 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                      />
                      {/* Main premium line */}
                      <motion.path
                        d={`M ${startX} 0 C ${startX} ${controlY}, 616 ${controlY}, 616 40`}
                        fill="none"
                        stroke="url(#shopifyGradient)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        filter="url(#shopifyGlow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.4, delay: 0.6 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                      />
                    </g>
                  );
                })}
                {/* Convergence ring before Shopify */}
                <motion.circle
                  cx="616"
                  cy="38"
                  r="4"
                  fill="none"
                  stroke="#95BF47"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ delay: 1.8, duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="616"
                  cy="38"
                  r="2"
                  fill="#95BF47"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.8 }}
                  transition={{ delay: 1.6, duration: 0.4 }}
                />
              </svg>

              {/* Shopify Store Node at Bottom - 15% larger */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6, type: 'spring' }}
                className="flex flex-col items-center"
              >
                {/* Glowing ring effect - 15% larger */}
                <div className="relative">
                  <div className="absolute inset-0 bg-[#95BF47]/20 rounded-full blur-md scale-125" />
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-md border-2 border-[#95BF47]/30 bg-white">
                    <Image
                      src="https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Shopify%20(2).jpg"
                      alt="Your Shopify Store"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                </div>
                <h3 className="mt-2 text-base font-bold text-[var(--text-primary)]">Your Store</h3>
                <span className="px-3 py-1 text-[10px] font-semibold bg-[#95BF47]/10 text-[#5E8E3E] rounded-full border border-[#95BF47]/20">
                  10 Tools Connected
                </span>
              </motion.div>

            </div>
          </motion.div>
        </div>

        {/* Info Modal */}
        <AnimatePresence>
          {modalTool && (
            <InfoModal tool={modalTool} onClose={() => setModalTool(null)} />
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}

// Tool Card Component with expandable description
function ToolCard({
  tool,
  onOpenModal,
  isExpanded,
  onToggleExpand,
}: {
  tool: Tool;
  onOpenModal: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) {
  const hasMoreContent = tool.fullDescription || tool.hasExpandableInfo;

  return (
    <div className="w-60 bg-white rounded-2xl border border-[var(--border-light)] p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      {/* Header Row */}
      <div className="flex items-start justify-between mb-3">
        {/* Logo */}
        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[var(--bg-secondary)] shadow-sm flex-shrink-0">
          {tool.logo ? (
            <Image
              src={tool.logo}
              alt={tool.name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-lg font-bold text-[var(--text-muted)]">
                {tool.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-col items-end gap-1">
          {tool.isFree && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-green-50 text-green-700 border border-green-200">
              FREE
            </span>
          )}
          {tool.specialBadge && !tool.isFree && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[var(--accent-gold-light)] text-[var(--accent-gold)] border border-[var(--border-gold)]">
              {tool.specialBadge}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-0.5">
        {tool.name}
      </h3>

      {/* Role */}
      <span className="text-[10px] font-medium uppercase tracking-wide text-[var(--text-muted)] block mb-2">
        {tool.role}
      </span>

      {/* Description - Expandable */}
      <div className="mb-3">
        <p className={`text-xs text-[var(--text-secondary)] leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
          {isExpanded && tool.fullDescription ? tool.fullDescription : tool.shortDescription}
        </p>
        {hasMoreContent && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (tool.hasExpandableInfo && tool.infoContent) {
                onOpenModal();
              } else {
                onToggleExpand();
              }
            }}
            className="mt-1 text-[10px] font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-0.5 transition-colors"
          >
            {isExpanded ? 'Show less' : 'Read more'}
            <ChevronDown size={10} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5">
        {tool.hasExpandableInfo && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal();
            }}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-xs font-medium hover:bg-[var(--bg-active)] transition-colors"
          >
            Details
          </button>
        )}
        <a
          href={tool.installUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-[var(--primary)] text-white text-xs font-medium hover:bg-[var(--primary-hover)] transition-colors ${
            tool.hasExpandableInfo ? 'flex-1' : 'w-full'
          }`}
        >
          Install
          <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}

// Info Modal Component
function InfoModal({ tool, onClose }: { tool: Tool; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-lg w-full max-h-[80vh] overflow-hidden shadow-2xl"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-[var(--border-light)] flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[var(--bg-secondary)] shadow-sm">
              {tool.logo ? (
                <Image
                  src={tool.logo}
                  alt={tool.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xl font-bold text-[var(--text-muted)]">
                    {tool.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">{tool.name}</h2>
              <span className="text-xs text-[var(--text-muted)]">{tool.role}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors"
          >
            <X size={18} className="text-[var(--text-muted)]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto max-h-[50vh]">
          {/* Paragraphs */}
          {tool.infoContent?.paragraphs?.map((p, idx) => (
            <p key={idx} className="text-sm text-[var(--text-secondary)] mb-3 leading-relaxed">
              {p}
            </p>
          ))}

          {/* Example Questions (Grapevine) */}
          {tool.infoContent?.exampleQuestions && (
            <div className="mt-4">
              <h4 className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-3 font-semibold">
                Example Questions
              </h4>
              <div className="space-y-2">
                {tool.infoContent.exampleQuestions.map((q, idx) => (
                  <div key={idx} className="p-3 bg-[var(--bg-secondary)] rounded-xl">
                    <p className="text-xs font-medium text-[var(--text-primary)] mb-2">
                      {q.question}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {q.options.map((opt, optIdx) => (
                        <span
                          key={optIdx}
                          className="text-[10px] px-2 py-1 bg-white rounded-full text-[var(--text-secondary)] border border-[var(--border-light)]"
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warehouse Images */}
          {tool.warehouseImages && (
            <div className="mt-4">
              <h4 className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-3 font-semibold">
                Fulfillment Centers
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {tool.warehouseImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={img}
                      alt={`${tool.name} warehouse ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-[var(--border-light)] bg-[var(--bg-secondary)]">
          <a
            href={tool.installUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full justify-center text-sm py-2.5"
          >
            Install {tool.name}
            <ExternalLink size={14} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
