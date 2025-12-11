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
  description: string;
  y_position: number;
  mobile_y_position: number;
  side: 'left' | 'right';
  install_link: string;
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
      { id: 1, name: 'Geo Announcement Bar', description: 'Geo-targeted announcement with personalized discount based on visitor\'s country + local holiday. Increases conversion by 60-70%.', y_position: 5, mobile_y_position: 26, side: 'right', install_link: 'https://geo-convert.com', completed: false },
      { id: 2, name: 'Transparent Header', description: 'Section name: Header #11', y_position: 49, mobile_y_position: 85, side: 'left', install_link: 'https://apps.shopify.com/section-factory?mref=lsbqcbva', completed: false },
      { id: 3, name: 'HD Hero Banner', description: 'Section name: Hero #1', y_position: 251, mobile_y_position: 395, side: 'right', install_link: 'https://apps.shopify.com/section-factory?mref=lsbqcbva', completed: false },
      { id: 4, name: 'Collection Grid/Slider', description: 'Section name: Slider #7', y_position: 547, mobile_y_position: 740, side: 'left', install_link: 'https://apps.shopify.com/section-factory?mref=lsbqcbva', completed: false },
      { id: 5, name: 'Featured Collection', description: 'Section name: Featured collection #18', y_position: 777, mobile_y_position: 1120, side: 'right', install_link: 'https://apps.shopify.com/section-factory?mref=lsbqcbva', completed: false },
      { id: 6, name: 'Featured Collection Tabs', description: 'Section name: Featured collection (tabs) #5', y_position: 1245, mobile_y_position: 1770, side: 'left', install_link: 'https://apps.shopify.com/section-factory?mref=lsbqcbva', completed: false },
      { id: 7, name: 'All Collections View', description: 'Section name: Collection #5', y_position: 1665, mobile_y_position: 2311, side: 'right', install_link: 'https://apps.shopify.com/section-factory?mref=lsbqcbva', completed: false },
      { id: 8, name: 'Slider/Banner', description: 'Section name: Slideshow #4', y_position: 1969, mobile_y_position: 2724, side: 'left', install_link: 'https://apps.shopify.com/section-factory?mref=lsbqcbva', completed: false },
      { id: 9, name: 'Featured Collection', description: 'Section name: Featured collection #18', y_position: 2346, mobile_y_position: 3273, side: 'right', install_link: 'https://apps.shopify.com/section-factory?mref=lsbqcbva', completed: false },
      { id: 10, name: 'Geo Location Banner', description: 'Section name: Square banner', y_position: 2737, mobile_y_position: 3815, side: 'left', install_link: 'https://geo-convert.com', completed: false },
      { id: 11, name: 'Footer', description: 'Section name: Footer #7', y_position: 3024, mobile_y_position: 4082, side: 'right', install_link: 'https://apps.shopify.com/section-factory?mref=lsbqcbva', completed: false },
    ],
  },
  {
    page: 'product',
    label: 'Product Page',
    desktop_screenshot: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/screencapture-quantum-scale-co-products-men-loafers-3-2025-12-11-16_00_45.png?v=1765461667',
    mobile_screenshot: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/screencapture-quantum-scale-co-products-men-loafers-3-2025-12-11-15_59_06.png?v=1765461561',
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
    desktop_screenshot: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/screencapture-quantum-scale-co-pages-new-test-2025-12-11-15_55_51.png?v=1765461368',
    mobile_screenshot: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/screencapture-quantum-scale-co-pages-new-test-2025-12-11-15_57_05.png?v=1765461438',
    blocks: [],
  },
  {
    page: 'entry-exit',
    label: 'Entry/Exit',
    desktop_screenshot: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-12-11_at_10.32.26_1f3e6185.jpg?v=1765442006',
    mobile_screenshot: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/quantum-scale.co__pb_0_iPhone_14_Pro_Max.png?v=1765442196',
    blocks: [
      { id: 1, name: 'Entry/Exit Popup', description: 'Geo-targeted popup with personalized offer. Captures visitors and increases conversion.', y_position: 250, mobile_y_position: 250, side: 'right', install_link: 'https://geo-convert.com', completed: false },
    ],
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

  // Mockup dimensions - smaller, crisp display
  const mockupWidth = device === 'desktop' ? 900 : 320;
  const mockupHeight = device === 'desktop' ? 560 : 693; // iPhone proportions

  return (
    <DashboardLayout>
      {/* Global styles for hiding scrollbar and crisp image rendering */}
      <style jsx global>{`
        .mockup-screen::-webkit-scrollbar {
          display: none;
        }
        .mockup-screen {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .mockup-screen img {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          image-rendering: -webkit-optimize-contrast;
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
            {PAGES_DATA.map(page => {
              const isEnabled = page.page === 'home' || page.page === 'entry-exit' || page.page === 'product' || page.page === 'contact';
              return (
                <button
                  key={page.page}
                  onClick={() => setActivePage(page.page)}
                  disabled={!isEnabled}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activePage === page.page
                      ? 'bg-white text-neutral-900 shadow-sm'
                      : isEnabled
                      ? 'text-neutral-500 hover:text-neutral-700'
                      : 'text-neutral-300 cursor-not-allowed'
                  }`}
                >
                  {page.label}
                </button>
              );
            })}
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

                {/* iPhone Dynamic Island - iPhone 15 style (thinner) */}
                {device === 'mobile' && (
                  <>
                    {/* iOS Status Bar */}
                    <div
                      className="absolute top-3 left-0 right-0 z-20 flex items-center justify-between px-6"
                      style={{ height: '20px' }}
                    >
                      <div className="flex items-center gap-1">
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>11:05</span>
                      </div>
                      <div
                        className="bg-black rounded-full"
                        style={{ width: '80px', height: '24px' }}
                      />
                      <div className="flex items-center gap-1">
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                          <path d="M1 4h2v8H1V4zm4-2h2v10H5V2zm4-2h2v12H9V0zm4 4h2v8h-2V4z" fill="#000"/>
                        </svg>
                        <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                          <path d="M7 2.5C9.5 2.5 11.5 4 12.5 5.5L14 4C12.5 2 10 0 7 0S1.5 2 0 4l1.5 1.5C2.5 4 4.5 2.5 7 2.5z" fill="#000"/>
                          <path d="M7 6C8.5 6 9.5 7 10 7.5L11.5 6C10.5 5 9 4 7 4S3.5 5 2.5 6L4 7.5C4.5 7 5.5 6 7 6z" fill="#000"/>
                          <circle cx="7" cy="10" r="2" fill="#000"/>
                        </svg>
                        <div className="flex items-center">
                          <div style={{ width: '22px', height: '10px', border: '1px solid #000', borderRadius: '3px', padding: '1px' }}>
                            <div style={{ width: '75%', height: '100%', background: '#000', borderRadius: '1px' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
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
                  {/* iOS Safari URL Bar */}
                  {device === 'mobile' && (
                    <div
                      className="sticky top-0 z-20"
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      {/* URL Bar */}
                      <div className="flex items-center justify-center px-4 py-2">
                        <div
                          className="flex items-center justify-center gap-2 w-full"
                          style={{
                            background: '#e5e5ea',
                            borderRadius: '12px',
                            padding: '8px 16px',
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 1L1 7l6 6m0-12v12" stroke="#8e8e93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-90 7 7)"/>
                          </svg>
                          <span style={{ color: '#000', fontSize: '15px', fontWeight: 400 }}>
                            Brand.com
                          </span>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="6" stroke="#8e8e93" strokeWidth="1.5"/>
                            <path d="M7 4v6M4 7h6" stroke="#8e8e93" strokeWidth="1.5" strokeLinecap="round" transform="rotate(45 7 7)"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Screenshot or Placeholder */}
                  {screenshot ? (
                    <img
                      src={screenshot}
                      alt={`${activePage} ${device} view`}
                      className="w-full block"
                      draggable={false}
                      style={{
                        minWidth: mockupWidth,
                        imageRendering: 'auto',
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                        willChange: 'transform',
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

              {/* Block Markers - Cards with connecting line */}
              {showMarkers && !editMode && blocks.length > 0 && (
                <>
                  {blocks.map((block) => {
                    const frameTop = device === 'desktop' ? 12 : 12;
                    const yPos = device === 'desktop' ? block.y_position : block.mobile_y_position;
                    const markerTop = frameTop + yPos - scrollTop;
                    const isVisible = markerTop > 10 && markerTop < mockupHeight - 30;
                    // Only fade at bottom edge, not at top
                    const edgeFade = markerTop > mockupHeight - 80 ? (mockupHeight - markerTop) / 80 : 1;
                    const isLeft = block.side === 'left';

                    return (
                      <AnimatePresence key={block.id}>
                        {isVisible && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: edgeFade }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className={`absolute flex items-center ${
                              isLeft ? 'right-full flex-row-reverse' : 'left-full flex-row'
                            }`}
                            style={{
                              top: markerTop,
                              [isLeft ? 'marginRight' : 'marginLeft']: '-80px',
                            }}
                          >
                            {/* Connecting line - deeper inside mockup */}
                            <div
                              style={{
                                width: '100px',
                                height: '1px',
                                background: '#374151',
                              }}
                            />
                            {/* Small dot at connection */}
                            <div
                              style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: '#374151',
                                flexShrink: 0,
                              }}
                            />
                            {/* Card - uniform dark gray */}
                            <div
                              style={{
                                width: '180px',
                                background: '#374151',
                                borderRadius: '6px',
                                padding: '10px 12px',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                marginLeft: isLeft ? '0' : '2px',
                                marginRight: isLeft ? '2px' : '0',
                              }}
                            >
                              <p
                                className="text-[12px] leading-snug font-normal"
                                style={{ color: '#ffffff' }}
                              >
                                {block.description}{' '}
                                <a
                                  href={block.install_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline underline-offset-2 transition-colors hover:opacity-80"
                                  style={{ color: '#60a5fa' }}
                                >
                                  Install
                                </a>
                              </p>
                            </div>
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
