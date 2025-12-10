'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Smartphone, Check, ExternalLink, Plus, Trash2, Download, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════
interface BlockMarker {
  id: number;
  name: string;
  y_position: number;
  side: 'left' | 'right';
  install_link: string;
  install_text: string;
  completed: boolean;
}

interface PageData {
  page: string;
  label: string;
  desktop_screenshot: string;
  mobile_screenshot: string;
  blocks: BlockMarker[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// MOCK DATA - Will be replaced with real data later
// ═══════════════════════════════════════════════════════════════════════════════
const PAGES_DATA: PageData[] = [
  {
    page: 'home',
    label: 'Home Page',
    desktop_screenshot: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/screencapture-quantum-scale-co-2025-12-10-18_15_33.png?v=1765383376',
    mobile_screenshot: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/screencapture-quantum-scale-co-2025-12-10-18_07_47.png?v=1765382888',
    blocks: [
      { id: 1, name: 'Announcement Bar', y_position: 0, side: 'right', install_link: '#', install_text: 'Free Shopify feature', completed: false },
      { id: 2, name: 'Header Navigation', y_position: 45, side: 'left', install_link: '#', install_text: 'Theme default', completed: false },
      { id: 3, name: 'Hero Section', y_position: 120, side: 'right', install_link: '#', install_text: 'Theme section', completed: false },
      { id: 4, name: 'Featured Products', y_position: 580, side: 'left', install_link: '#', install_text: 'Theme section', completed: false },
      { id: 5, name: 'Trust Badges', y_position: 900, side: 'right', install_link: '#', install_text: 'Free app', completed: false },
    ],
  },
  {
    page: 'product',
    label: 'Product Page',
    desktop_screenshot: '',
    mobile_screenshot: '',
    blocks: [],
  },
  {
    page: 'cart',
    label: 'Cart',
    desktop_screenshot: '',
    mobile_screenshot: '',
    blocks: [],
  },
  {
    page: 'search',
    label: 'Search',
    desktop_screenshot: '',
    mobile_screenshot: '',
    blocks: [],
  },
  {
    page: 'contact',
    label: 'Contact',
    desktop_screenshot: '',
    mobile_screenshot: '',
    blocks: [],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function ReferenceStorePage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  // State
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [activePage, setActivePage] = useState('home');
  const [blocks, setBlocks] = useState<BlockMarker[]>(PAGES_DATA[0].blocks);
  const [editMode, setEditMode] = useState(false);
  const [markerPoints, setMarkerPoints] = useState<{ id: number; y: number; name: string }[]>([]);
  const [showMarkers, setShowMarkers] = useState(true);

  // Get current page data
  const currentPageData = PAGES_DATA.find(p => p.page === activePage) || PAGES_DATA[0];
  const screenshot = device === 'desktop' ? currentPageData.desktop_screenshot : currentPageData.mobile_screenshot;

  // Completed count
  const completedCount = blocks.filter(b => b.completed).length;

  // Auth check
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Update blocks when page changes
  useEffect(() => {
    const pageData = PAGES_DATA.find(p => p.page === activePage);
    if (pageData) {
      setBlocks(pageData.blocks);
    }
  }, [activePage]);

  // Handle scroll
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Toggle block completion
  const toggleBlockComplete = (blockId: number) => {
    setBlocks(prev => prev.map(b => b.id === blockId ? { ...b, completed: !b.completed } : b));
  };

  // Scroll to block in mockup
  const scrollToBlock = (yPosition: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: yPosition - 100,
        behavior: 'smooth'
      });
    }
  };

  // Edit mode: Add marker point
  const handleMockupClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!editMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const y = e.clientY - rect.top + scrollContainer.scrollTop;
    const newId = markerPoints.length + 1;
    setMarkerPoints(prev => [...prev, { id: newId, y: Math.round(y), name: `Point ${newId}` }]);
  };

  // Edit mode: Remove marker point
  const removeMarkerPoint = (id: number) => {
    setMarkerPoints(prev => prev.filter(p => p.id !== id));
  };

  // Edit mode: Export positions
  const exportPositions = () => {
    const json = JSON.stringify(markerPoints, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activePage}-${device}-positions.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading || !user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full" />
      </div>
    );
  }

  // Mockup dimensions - much larger for crisp image quality
  const mockupWidth = device === 'desktop' ? 1100 : 375;
  const mockupHeight = device === 'desktop' ? 680 : 812; // iPhone proportions

  return (
    <DashboardLayout>
      {/* Global styles for hiding scrollbar */}
      <style jsx global>{`
        .mockup-screen::-webkit-scrollbar {
          display: none;
        }
        .mockup-screen {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div
        className="reference-store-page flex flex-col bg-white overflow-hidden"
        style={{
          margin: '-40px -48px -40px -48px',
          width: 'calc(100% + 96px)',
          height: 'calc(100vh - 64px)',
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        {/* TOP BAR - Toggles */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-neutral-100">
          {/* Left - Device Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-neutral-100">
            <button
              onClick={() => setDevice('desktop')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                device === 'desktop'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              <Monitor size={16} strokeWidth={1.5} />
              Desktop
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                device === 'mobile'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              <Smartphone size={16} strokeWidth={1.5} />
              Mobile
            </button>
          </div>

          {/* Center - Page Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-neutral-100">
            {PAGES_DATA.map(page => (
              <button
                key={page.page}
                onClick={() => setActivePage(page.page)}
                disabled={page.page !== 'home'}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activePage === page.page
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : page.page === 'home'
                    ? 'text-neutral-500 hover:text-neutral-700'
                    : 'text-neutral-300 cursor-not-allowed'
                }`}
              >
                {page.label}
              </button>
            ))}
          </div>

          {/* Right - Edit Mode Toggle (Temporary) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMarkers(!showMarkers)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                showMarkers ? 'text-neutral-700' : 'text-neutral-400'
              }`}
            >
              {showMarkers ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                editMode
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              <Plus size={16} />
              {editMode ? 'Exit Edit Mode' : 'Edit Positions'}
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex overflow-hidden">
          {/* CENTER - Mockup (centered between sidebar and right panel) */}
          <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
            <div className="relative">
              {/* Device Frame */}
              <div
                className="relative"
                style={{
                  width: device === 'desktop' ? mockupWidth + 24 : mockupWidth + 24,
                  height: device === 'desktop' ? 'auto' : mockupHeight + 24,
                  background: '#1a1a1a',
                  borderRadius: device === 'desktop' ? '12px' : '54px',
                  padding: device === 'desktop' ? '12px 12px 32px 12px' : '12px',
                  boxShadow: device === 'desktop'
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                    : '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 0 0 2px #333'
                }}
              >
                {/* Desktop Camera */}
                {device === 'desktop' && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#1a1a1a] rounded-b-xl flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neutral-700" />
                  </div>
                )}

                {/* iPhone Dynamic Island */}
                {device === 'mobile' && (
                  <div
                    className="absolute top-4 left-1/2 -translate-x-1/2 bg-black rounded-full z-10"
                    style={{ width: '120px', height: '34px' }}
                  />
                )}

                {/* iPhone Side Buttons */}
                {device === 'mobile' && (
                  <>
                    <div className="absolute -right-0.5 top-32 w-1 h-24 rounded-r-sm" style={{ background: '#2a2a2a' }} />
                    <div className="absolute -left-0.5 top-28 w-1 h-8 rounded-l-sm" style={{ background: '#2a2a2a' }} />
                    <div className="absolute -left-0.5 top-40 w-1 h-14 rounded-l-sm" style={{ background: '#2a2a2a' }} />
                    <div className="absolute -left-0.5 top-56 w-1 h-14 rounded-l-sm" style={{ background: '#2a2a2a' }} />
                  </>
                )}

                {/* Screen Container */}
                <div
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  onClick={handleMockupClick}
                  className={`mockup-screen relative bg-white ${editMode ? 'cursor-crosshair' : ''}`}
                  style={{
                    width: mockupWidth,
                    height: mockupHeight,
                    borderRadius: device === 'desktop' ? '8px' : '44px',
                    overflow: 'auto',
                    scrollbarWidth: 'none',
                  }}
                >
                  {/* Screenshot or Placeholder */}
                  {screenshot ? (
                    <img
                      src={screenshot}
                      alt={`${activePage} ${device} view`}
                      className="w-full block"
                      draggable={false}
                      style={{
                        minWidth: mockupWidth,
                      }}
                    />
                  ) : (
                    <div
                      className="w-full flex flex-col items-center justify-center text-neutral-300"
                      style={{ height: 2000 }}
                    >
                      <div className="text-center p-8">
                        <div className="text-6xl mb-4">📸</div>
                        <p className="text-lg font-medium text-neutral-400">Screenshot coming soon</p>
                        <p className="text-sm text-neutral-300 mt-2">
                          {device === 'desktop' ? 'Desktop' : 'Mobile'} view of {currentPageData.label}
                        </p>
                      </div>
                      {/* Grid lines for position reference in edit mode */}
                      {editMode && (
                        <div className="absolute inset-0 pointer-events-none">
                          {[...Array(20)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute left-0 right-0 border-t border-dashed border-neutral-200"
                              style={{ top: i * 100 }}
                            >
                              <span className="absolute left-2 -top-3 text-[10px] text-neutral-300">
                                {i * 100}px
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Edit Mode Markers */}
                  {editMode && markerPoints.map(point => (
                    <div
                      key={point.id}
                      className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 z-20"
                      style={{ top: point.y }}
                    >
                      <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-white shadow-lg" />
                      <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded font-medium">
                        {point.name}: {point.y}px
                      </span>
                    </div>
                  ))}
                </div>

                {/* Desktop base */}
                {device === 'desktop' && (
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-3 bg-[#1a1a1a] rounded-b-lg" />
                )}
              </div>

              {/* Block Markers - Outside the frame */}
              {showMarkers && !editMode && blocks.length > 0 && (
                <>
                  {blocks.map((block) => {
                    const frameTop = device === 'desktop' ? 12 : 12;
                    const markerTop = frameTop + block.y_position - scrollTop;
                    const isVisible = markerTop > 0 && markerTop < mockupHeight;

                    return (
                      <AnimatePresence key={block.id}>
                        {isVisible && (
                          <motion.div
                            initial={{ opacity: 0, x: block.side === 'left' ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className={`absolute flex items-center gap-3 ${
                              block.side === 'left' ? 'right-full mr-6' : 'left-full ml-6'
                            }`}
                            style={{ top: markerTop }}
                          >
                            {block.side === 'left' && (
                              <>
                                <div className="flex flex-col items-end">
                                  <span className="text-sm font-medium text-neutral-800">{block.name}</span>
                                  <a
                                    href={block.install_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-neutral-400 hover:text-neutral-600 flex items-center gap-1 transition-colors"
                                  >
                                    {block.install_text}
                                    <ExternalLink size={10} />
                                  </a>
                                </div>
                                <div className="w-8 h-px bg-neutral-300" />
                              </>
                            )}
                            {block.side === 'right' && (
                              <>
                                <div className="w-8 h-px bg-neutral-300" />
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium text-neutral-800">{block.name}</span>
                                  <a
                                    href={block.install_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-neutral-400 hover:text-neutral-600 flex items-center gap-1 transition-colors"
                                  >
                                    {block.install_text}
                                    <ExternalLink size={10} />
                                  </a>
                                </div>
                              </>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    );
                  })}
                </>
              )}
            </div>
          </div>

          {/* RIGHT PANEL - Blocks List */}
          <div className="w-64 flex-shrink-0 border-l border-neutral-100 p-6 overflow-y-auto">
            {editMode ? (
              /* Edit Mode Panel */
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-neutral-800">Marker Points</h3>
                  <span className="text-xs text-neutral-400">{markerPoints.length} points</span>
                </div>

                <p className="text-xs text-neutral-500 mb-4">
                  Click on the mockup to add marker points. Y positions will be recorded.
                </p>

                <div className="space-y-2 mb-4">
                  {markerPoints.map(point => (
                    <div
                      key={point.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-neutral-50"
                    >
                      <div>
                        <span className="text-sm font-medium text-neutral-700">{point.name}</span>
                        <span className="text-xs text-neutral-400 ml-2">Y: {point.y}px</span>
                      </div>
                      <button
                        onClick={() => removeMarkerPoint(point.id)}
                        className="p-1 text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                {markerPoints.length > 0 && (
                  <button
                    onClick={exportPositions}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
                  >
                    <Download size={14} />
                    Export Positions
                  </button>
                )}
              </div>
            ) : (
              /* Normal Mode Panel */
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-neutral-800">Blocks</h3>
                  <span className="text-xs text-neutral-400">
                    {completedCount}/{blocks.length} Done
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 bg-neutral-100 rounded-full mb-6 overflow-hidden">
                  <motion.div
                    className="h-full bg-neutral-900 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: blocks.length > 0 ? `${(completedCount / blocks.length) * 100}%` : '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Blocks List */}
                <div className="space-y-1">
                  {blocks.map(block => (
                    <div
                      key={block.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer group"
                      onClick={() => scrollToBlock(block.y_position)}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBlockComplete(block.id);
                        }}
                        className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-all ${
                          block.completed
                            ? 'bg-neutral-900 border-neutral-900'
                            : 'border-neutral-300 hover:border-neutral-400'
                        }`}
                      >
                        {block.completed && <Check size={12} className="text-white" strokeWidth={2.5} />}
                      </button>
                      <span
                        className={`text-sm flex-1 ${
                          block.completed ? 'text-neutral-400 line-through' : 'text-neutral-700'
                        }`}
                      >
                        {block.name}
                      </span>
                      <a
                        href={block.install_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-neutral-600 transition-all"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  ))}
                </div>

                {blocks.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-sm text-neutral-400">No blocks defined yet</p>
                    <p className="text-xs text-neutral-300 mt-1">
                      Use Edit Mode to add marker positions
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
