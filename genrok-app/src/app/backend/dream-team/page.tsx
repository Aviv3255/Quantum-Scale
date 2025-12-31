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

// S/S/S Copy - Stupid Simple Sexy: Short, punchy, value-focused
const dreamTeamTools: Tool[] = [
  {
    id: 1,
    name: 'DataDrew',
    role: 'Analytics',
    shortDescription: 'Free LTV tracking. Export top spenders to ads. Know your numbers or lose.',
    installUrl: 'https://apps.shopify.com/customer-lifetime-value?mref=lsbqcbva',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Satoshi_3.jpg?v=1761567329',
    hasExpandableInfo: false,
    isFree: true,
  },
  {
    id: 2,
    name: 'TxtCart',
    role: 'Cart Recovery',
    shortDescription: 'AI texts abandoned carts. Talks like a human. Recovers sales on autopilot.',
    installUrl: 'https://txtcartapp.com/affiliate/?mref=lsbqcbva',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T121029.783.png?v=1760087435',
    hasExpandableInfo: false,
  },
  {
    id: 3,
    name: 'Mate',
    role: 'Private Agent',
    shortDescription: '5-day global shipping. No fees. No minimums. Your AliExpress replacement.',
    installUrl: 'https://erp.matedropshipping.com/login?invite_id=915',
    logo: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/COag0vSJxoUDEAE=.png',
    hasExpandableInfo: true,
    infoContent: {
      paragraphs: [
        'AliExpress is killing your business. Long shipping, damaged products, angry customers.',
        'Mate ships globally in 5 days. Personal WhatsApp agent. Zero monthly fees. Zero commitment.',
        'Our link = exclusive partnership terms + dedicated support.',
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
    role: 'Backup Agent',
    shortDescription: 'Compare prices. Pick the cheaper agent per order. Always have a backup.',
    installUrl: 'https://www.hypersku.com/campaign/optimize-dropshipping/?ref=nmmwogq',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T115639.885.png?v=1760086613',
    hasExpandableInfo: true,
    infoContent: {
      paragraphs: [
        'Never depend on one agent. Compare prices per order.',
        'Same benefits as Mate: fast shipping, quality control, no fees.',
        'Smart sellers use both.',
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
    role: 'Email Marketing',
    shortDescription: 'The email tool that prints money. Flows, segments, AI. Industry standard.',
    installUrl: 'https://www.klaviyo.com/partner/signup?utm_source=001Nu00000NY5EeIAL&utm_medium=partner',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T121113.691.png?v=1760087483',
    hasExpandableInfo: false,
  },
  {
    id: 6,
    name: 'KeepCart',
    role: 'Coupon Blocker',
    shortDescription: 'Blocks Honey + 125 extensions. Your margins are leaking. Plug the hole.',
    installUrl: 'https://platform.shoffi.app/r/rl_U2L0seLE',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T122003.978.png?v=1760088020',
    hasExpandableInfo: false,
  },
  {
    id: 7,
    name: 'Cart Upsell',
    role: 'AOV Booster',
    shortDescription: 'Starbucks checkout trick. Impulse items at cart. +$5-8 per order.',
    installUrl: 'https://platform.shoffi.app/r/rl_cm697iNI',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Satoshi_2.jpg?v=1761567244',
    hasExpandableInfo: false,
    specialBadge: '+$5-8 AOV',
  },
  {
    id: 8,
    name: 'Grapevine',
    role: 'Customer Intel',
    shortDescription: 'Ask buyers why they bought. Triple your conversion with their answers.',
    installUrl: 'https://apps.shopify.com/grapevine?mref=lsbqcbva',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-10T121408.753.png?v=1760087656',
    hasExpandableInfo: true,
    infoContent: {
      paragraphs: [
        'What made them buy? What almost stopped them? This data is gold.',
      ],
      exampleQuestions: [
        {
          question: 'How did you hear about us?',
          options: ['Facebook/Instagram', 'Google', 'Friend', 'Influencer'],
        },
        {
          question: 'What made you buy now?',
          options: ['Sale/discount', 'Reviews', 'Urgency', 'Finally ready'],
        },
      ],
    },
  },
  {
    id: 9,
    name: 'Triple Whale',
    role: 'Attribution',
    shortDescription: 'Meta lies. Triple Whale doesn\'t. 100% accurate tracking. Free plan.',
    installUrl: 'https://triplewhale.com/',
    logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-09T234106.192.png?v=1760042538',
    hasExpandableInfo: false,
    isFree: true,
  },
  {
    id: 10,
    name: 'Geo Convert',
    role: 'Geo Targeting',
    shortDescription: '60-70% conversion lift. Location-based discounts. Easy cheat code.',
    installUrl: 'https://geo-convert.com/',
    logo: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Geo%20Convert.jpg',
    hasExpandableInfo: false,
    specialBadge: '60-70% Lift',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
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
  const [zoom, setZoom] = useState(0.5); // Default zoomed out to fit all in one line
  const canvasRef = useRef<HTMLDivElement>(null);

  // Zoom controls
  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.1, 1.2)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - 0.1, 0.3)), []);
  const resetZoom = useCallback(() => setZoom(0.5), []);

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

  // Auth check
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
        <header className="page-header mb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center">
                  <Zap size={20} className="text-white" strokeWidth={2} />
                </div>
                <h1>The Dream Team</h1>
              </div>
              <p className="text-[var(--text-muted)] max-w-2xl">
                10 tools. 10X results. Scroll or pinch to zoom.
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

        {/* Canvas Container - Horizontal Scroll */}
        <div className="overflow-auto pb-8" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          <motion.div
            ref={canvasRef}
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
              transition: 'transform 0.2s ease-out',
            }}
          >
            {/* Single Horizontal Line of Tools */}
            <div className="relative py-8">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex items-start gap-6"
                style={{ minWidth: 'max-content' }}
              >
                {dreamTeamTools.map((tool, index) => (
                  <div key={tool.id} className="flex items-center">
                    <motion.div variants={cardVariants}>
                      <ToolCard tool={tool} onOpenModal={() => setModalTool(tool)} />
                    </motion.div>
                    {/* Connector Arrow */}
                    {index < dreamTeamTools.length - 1 && (
                      <div className="flex items-center mx-2">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-[#E5E5EA] to-[#D1D1D6]" />
                        <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-t-transparent border-b-transparent border-l-[#D1D1D6]" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Final Arrow to Store */}
                <div className="flex items-center mx-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-[#D1D1D6] to-[#95BF47]" />
                  <div className="w-0 h-0 border-t-6 border-b-6 border-l-8 border-t-transparent border-b-transparent border-l-[#95BF47]" />
                </div>

                {/* Shopify Store Node */}
                <motion.div
                  variants={cardVariants}
                  className="flex flex-col items-center"
                >
                  <div className="w-28 h-28 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#95BF47]/20">
                    <Image
                      src="https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Shopify%20(2).jpg"
                      alt="Your Shopify Store"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-[var(--text-primary)]">Your Store</h3>
                  <p className="text-xs text-[var(--text-muted)]">Powered by The Dream Team</p>
                </motion.div>
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

// Compact Tool Card Component
function ToolCard({ tool, onOpenModal }: { tool: Tool; onOpenModal: () => void }) {
  return (
    <div className="w-56 bg-white rounded-2xl border border-[var(--border-light)] p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
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

      {/* Description */}
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3 line-clamp-2">
        {tool.shortDescription}
      </p>

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
            <Info size={12} />
            Info
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
