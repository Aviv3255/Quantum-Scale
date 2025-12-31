'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  ExternalLink,
  Info,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Store,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Tool data structure
interface Tool {
  id: number;
  name: string;
  role: string;
  shortDescription: string;
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

const dreamTeamTools: Tool[] = [
  {
    id: 1,
    name: 'DataDrew',
    role: 'Advanced Data Analytics',
    shortDescription: 'A completely free app. Advanced data monitoring including LTV across all time periods, Re-purchase rate, and more. Unstoppable power in ads with Top Spenders audiences and RFM Segments that can be exported directly from the app.',
    installUrl: 'https://apps.shopify.com/customer-lifetime-value?mref=lsbqcbva',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Satoshi_3.jpg?v=1761567329',
    hasExpandableInfo: false,
    isFree: true,
  },
  {
    id: 2,
    name: 'TxtCart',
    role: 'Abandoned Cart Recovery',
    shortDescription: 'Automatic abandoned cart recovery with AI - a merciless conversion machine. Sends a highly personalized SMS to customers after cart abandonment, engages in personal conversation as a customer service rep, and offers coupon codes.',
    installUrl: 'https://txtcartapp.com/affiliate/?mref=lsbqcbva',
    logo: 'https://cdn.shopify.com/app-store/listing_images/d4c5c9f8ac0b4a1b5ce5f51e7f7682b3/icon/CLHx8aD85fYCEAE=.png',
    hasExpandableInfo: false,
  },
  {
    id: 3,
    name: 'Mate',
    role: 'Primary Private Agent',
    shortDescription: 'Private agent/fulfillment company for dropshippers, one of the world\'s leading companies. Worldwide shipping in 5-7 days, home delivery, quality control, package consolidation, branding, no monthly fees, no commitment.',
    installUrl: 'https://erp.matedropshipping.com/login?invite_id=915',
    logo: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/COag0vSJxoUDEAE=.png',
    hasExpandableInfo: true,
    infoContent: {
      paragraphs: [
        'One of the main obstacles preventing eCommerce stores from scaling is their dependence on AliExpress: inconsistent shipping times, long delivery windows, poor support, damaged products, no home delivery, and multiple separate packages.',
        'Private Agent changes the game entirely: By partnering with one of the largest fulfillment companies in the world (serving over 220,000 clients), this private logistics service allows you to ship globally within an average of 5 days.',
        'Everything is handled through a dedicated personal agent - with no monthly fees, no minimum order quantity, and no upfront payments.',
        'Registering through our link grants you direct access to a personal WhatsApp support representative and exclusive partnership terms.',
      ],
    },
    warehouseImages: [
      'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/19%20(1).jpg',
      'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/21.jpg',
      'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/24.jpg',
    ],
  },
  {
    id: 4,
    name: 'HyperSKU',
    role: 'Backup Private Agent',
    shortDescription: 'Backup agent (same principles as Mate). Always connect this one to your store as well to compare prices on certain orders and choose the agent offering the same product at a lower price.',
    installUrl: 'https://www.hypersku.com/campaign/optimize-dropshipping/?ref=nmmwogq',
    logo: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/hypersku-logo.png',
    hasExpandableInfo: true,
    infoContent: {
      paragraphs: [
        'Having a backup private agent is crucial for any serious eCommerce operation.',
        'HyperSKU offers the same world-class fulfillment services as Mate, allowing you to compare prices and choose the best option for each order.',
        'No monthly fees, no minimum order quantity, and no upfront payments.',
      ],
    },
    warehouseImages: [
      'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/19%20(1).jpg',
      'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/21.jpg',
      'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/24.jpg',
    ],
  },
  {
    id: 5,
    name: 'Klaviyo',
    role: 'Email Marketing Powerhouse',
    shortDescription: 'The world\'s most advanced email marketing tool with integrations for all eCommerce platforms, thousands of Shopify apps, and the most advanced BI and AI capabilities.',
    installUrl: 'https://www.klaviyo.com/partner/signup?utm_source=001Nu00000NY5EeIAL&utm_medium=partner',
    logo: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/klaviyo-logo.png',
    hasExpandableInfo: false,
  },
  {
    id: 6,
    name: 'KeepCart',
    role: 'Coupon Code Blocker',
    shortDescription: 'Blocks 125+ coupon code browser extensions from your site. This is literally money on the floor - protect your margins from unauthorized discount leaks.',
    installUrl: 'https://platform.shoffi.app/r/rl_U2L0seLE',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T122003.978.png?v=1760088020',
    hasExpandableInfo: false,
  },
  {
    id: 7,
    name: 'Cart Upsell',
    role: 'AOV Booster',
    shortDescription: 'Half backend, half frontend, but a very simple and essential step that increases AOV by $5-8 on average. Add 20 lightweight products priced up to $50.',
    installUrl: 'https://platform.shoffi.app/r/rl_cm697iNI',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Satoshi_2.jpg?v=1761567244',
    hasExpandableInfo: false,
    specialBadge: '+$5-8 AOV',
  },
  {
    id: 8,
    name: 'Grapevine Surveys',
    role: 'Customer Intelligence',
    shortDescription: 'Who is your customer? What does he like? What drove him to buy - and what almost stopped him? Stop guessing and start knowing.',
    installUrl: 'https://apps.shopify.com/grapevine?mref=lsbqcbva',
    logo: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/grapevine-logo.png',
    hasExpandableInfo: true,
    infoContent: {
      paragraphs: [
        'Almost no one stops to ask the simplest, most important question: What does the customer really think?',
        'This data is worth its weight in gold. It tells you exactly what to change in order to double or even triple your conversion rate.',
      ],
      exampleQuestions: [
        {
          question: 'How did you first hear about us?',
          options: ['Saw an ad on Facebook/Instagram', 'Found you on Google', 'Through a friend', 'From an influencer'],
        },
        {
          question: 'What made you decide to buy right now?',
          options: ['A sale or discount', 'I finally wanted to try it', 'I saw reviews', 'Someone mentioned you'],
        },
        {
          question: 'Was there anything that made you hesitate?',
          options: ['No, I decided right away', 'Wasn\'t sure about product', 'Site trustworthiness', 'Return policy concerns'],
        },
      ],
    },
  },
  {
    id: 9,
    name: 'Triple Whale',
    role: '100% Attribution Accuracy',
    shortDescription: 'Meta is lying to you - and it\'s costing you money. Triple Whale uses advanced tracking technology to deliver 100% accurate attribution and bypass iOS14 limitations.',
    installUrl: 'https://triplewhale.com/',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-09T234106.192.png?v=1760042538',
    hasExpandableInfo: false,
    isFree: true,
    specialBadge: 'FREE Plan',
  },
  {
    id: 10,
    name: 'Geo Convert',
    role: 'Location-Based Conversion Bomber',
    shortDescription: 'Location-based announcement bar for your site with custom discount percentage based on visitor\'s purchasing power + adapted to local holidays. Increases conversion rate by 60-70%.',
    installUrl: 'https://geo-convert.com/',
    logo: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Geo%20Convert.jpg',
    hasExpandableInfo: false,
    specialBadge: '60-70% Lift',
  },
];

// Canvas layout rows - tools arranged in flowchart format
const canvasRows = [
  [0, 1, 2], // Row 1: DataDrew, TxtCart, Mate
  [3, 4],    // Row 2: HyperSKU, Klaviyo
  [5, 6, 7], // Row 3: KeepCart, Cart Upsell, Grapevine
  [8, 9],    // Row 4: Triple Whale, Geo Convert
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
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

export default function DreamTeamPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [modalTool, setModalTool] = useState<Tool | null>(null);
  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Zoom controls
  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.15, 1.5)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - 0.15, 0.5)), []);
  const resetZoom = useCallback(() => setZoom(1), []);

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

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-wrapper relative">
        {/* Page Header */}
        <header className="page-header mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center">
                  <Zap size={20} className="text-white" strokeWidth={2} />
                </div>
                <h1>The Dream Team</h1>
              </div>
              <p className="text-[var(--text-muted)] max-w-2xl">
                10 essential tools that form your ultimate backend infrastructure. Click any card for details.
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

        {/* Canvas Container */}
        <div className="overflow-auto pb-8" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <motion.div
            ref={canvasRef}
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s ease-out',
            }}
          >
            {/* FlowChart Canvas */}
            <div className="relative">
              {/* Tool Rows */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center gap-8"
              >
                {canvasRows.map((row, rowIndex) => (
                  <div key={rowIndex} className="relative">
                    {/* Row of Cards */}
                    <div className="flex items-center justify-center gap-6 flex-wrap">
                      {row.map((toolIndex) => {
                        const tool = dreamTeamTools[toolIndex];
                        return (
                          <motion.div
                            key={tool.id}
                            variants={cardVariants}
                            className="group"
                          >
                            <ToolCard tool={tool} onOpenModal={() => setModalTool(tool)} />
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Connection Lines (SVG) - Between rows */}
                    {rowIndex < canvasRows.length - 1 && (
                      <div className="flex justify-center mt-6">
                        <svg width="200" height="40" viewBox="0 0 200 40">
                          <defs>
                            <linearGradient id={`lineGrad${rowIndex}`} x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#E5E5EA" />
                              <stop offset="100%" stopColor="#D1D1D6" />
                            </linearGradient>
                          </defs>
                          <motion.path
                            d="M100 0 L100 40"
                            stroke={`url(#lineGrad${rowIndex})`}
                            strokeWidth="2"
                            strokeDasharray="6,4"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.5 + rowIndex * 0.2, duration: 0.5 }}
                          />
                          <motion.circle
                            cx="100"
                            cy="20"
                            r="4"
                            fill="#D1D1D6"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.7 + rowIndex * 0.2 }}
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}

                {/* Final Connection to Shopify */}
                <div className="flex flex-col items-center mt-4">
                  <svg width="200" height="60" viewBox="0 0 200 60">
                    <defs>
                      <linearGradient id="finalLineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#D1D1D6" />
                        <stop offset="100%" stopColor="#95BF47" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M100 0 L100 60"
                      stroke="url(#finalLineGrad)"
                      strokeWidth="3"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 1.5, duration: 0.6 }}
                    />
                    <motion.polygon
                      points="100,60 94,48 106,48"
                      fill="#95BF47"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2 }}
                    />
                  </svg>

                  {/* Shopify Store Node */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 2.2, type: 'spring' as const, stiffness: 200 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#95BF47] to-[#7AA835] flex items-center justify-center shadow-2xl">
                      <Store size={48} className="text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">Your Store</h3>
                    <p className="text-sm text-[var(--text-muted)]">Powered by the Dream Team</p>
                  </motion.div>
                </div>
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

// Tool Card Component - Elite Style
function ToolCard({ tool, onOpenModal }: { tool: Tool; onOpenModal: () => void }) {
  return (
    <div className="w-80 bg-white rounded-[20px] border border-[var(--border-light)] p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
      {/* Header Row */}
      <div className="flex items-start justify-between mb-4">
        {/* Logo */}
        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[var(--bg-secondary)] shadow-sm flex-shrink-0">
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

        {/* Badges */}
        <div className="flex flex-col items-end gap-2">
          {tool.isFree && (
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-green-50 text-green-700 border border-green-200">
              FREE
            </span>
          )}
          {tool.specialBadge && !tool.isFree && (
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-[var(--accent-gold-light)] text-[var(--accent-gold)] border border-[var(--border-gold)]">
              {tool.specialBadge}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
        {tool.name}
      </h3>

      {/* Role */}
      <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)] block mb-3">
        {tool.role}
      </span>

      {/* Description */}
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 line-clamp-3">
        {tool.shortDescription}
      </p>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {tool.hasExpandableInfo && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal();
            }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-sm font-medium hover:bg-[var(--bg-active)] transition-colors"
          >
            <Info size={16} />
            More Info
          </button>
        )}
        <a
          href={tool.installUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors ${
            tool.hasExpandableInfo ? 'flex-1' : 'w-full'
          }`}
        >
          Install
          <ExternalLink size={14} />
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
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[var(--border-light)] flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[var(--bg-secondary)] shadow-sm">
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
                  <span className="text-2xl font-bold text-[var(--text-muted)]">
                    {tool.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">{tool.name}</h2>
              <span className="text-sm text-[var(--text-muted)]">{tool.role}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors"
          >
            <X size={20} className="text-[var(--text-muted)]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Paragraphs */}
          {tool.infoContent?.paragraphs?.map((p, idx) => (
            <p key={idx} className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
              {p}
            </p>
          ))}

          {/* Example Questions (Grapevine) */}
          {tool.infoContent?.exampleQuestions && (
            <div className="mt-6">
              <h4 className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-4 font-semibold">
                Example Survey Questions
              </h4>
              <div className="space-y-3">
                {tool.infoContent.exampleQuestions.map((q, idx) => (
                  <div key={idx} className="p-4 bg-[var(--bg-secondary)] rounded-xl">
                    <p className="text-sm font-medium text-[var(--text-primary)] mb-3">
                      {q.question}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {q.options.map((opt, optIdx) => (
                        <span
                          key={optIdx}
                          className="text-xs px-3 py-1.5 bg-white rounded-full text-[var(--text-secondary)] border border-[var(--border-light)]"
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
            <div className="mt-6">
              <h4 className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-4 font-semibold">
                Fulfillment Centers
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {tool.warehouseImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-video rounded-xl overflow-hidden">
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
        <div className="p-6 border-t border-[var(--border-light)] bg-[var(--bg-secondary)]">
          <a
            href={tool.installUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full justify-center text-base py-3"
          >
            Install {tool.name}
            <ExternalLink size={18} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
