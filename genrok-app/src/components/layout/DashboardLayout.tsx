'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Briefcase,
  BookOpen,
  ShoppingBag,
  Package,
  Palette,
  TrendingUp,
  Bell,
  LogOut,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  GraduationCap,
  Server,
  Megaphone,
  Image,
  Video,
  Users,
  Podcast,
  Layers,
  Database,
  Settings,
  User,
  Tag,
  Bookmark,
  Calculator,
  Map,
  Store,
  Truck,
  Gift,
  Sparkles,
  Zap,
  AppWindow,
  ShoppingCart,
  DollarSign,
  Target,
  LayoutGrid,
  Paintbrush,
  Lightbulb,
  TestTube,
  PlayCircle,
  CreditCard,
  FileText,
  Headphones,
  BadgeCheck,
  type LucideIcon,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { useBookmarksStore } from '@/store/bookmarks';
import { signOut } from '@/lib/supabase';
import { BookmarkModal } from '@/components/BookmarkModal';
import ChatbotWidget from '@/components/ChatbotWidget';
import { useThemeStore, applyTheme } from '@/store/theme';

interface SubNavItem {
  title: string;
  href: string;
  icon?: LucideIcon;
}

interface NavItem {
  title: string;
  href?: string;
  icon: LucideIcon;
  isCategory?: boolean;
  subItems?: SubNavItem[];
  external?: boolean;
}

const navigationItems: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Backend System",
    icon: Server,
    isCategory: true,
    subItems: [
      { title: "Dream Team", href: "/backend/dream-team", icon: Users },
      { title: "Secret Apps", href: "/apps/secret", icon: Sparkles },
      { title: "Shopify Apps", href: "/apps/shopify", icon: AppWindow },
      { title: "Private Agent", href: "/products/private-agent", icon: Truck }
    ]
  },
  {
    title: "Products",
    icon: ShoppingBag,
    isCategory: true,
    subItems: [
      { title: "Private Agent", href: "/products/private-agent", icon: Truck },
      { title: "AliExpress Stores", href: "/products/aliexpress", icon: Store },
      { title: "Sell These", href: "/products/sell-these", icon: Gift }
    ]
  },
  {
    title: "Ads",
    icon: Megaphone,
    isCategory: true,
    subItems: [
      { title: "TikTok Credits", href: "/tiktok-credits", icon: CreditCard },
      { title: "AI Image Ads", href: "/ads/ai-image", icon: Image },
      { title: "AI Video Ads", href: "/ads/ai-video", icon: Video },
      { title: "Meta Templates", href: "/ads/meta-templates", icon: Target },
      { title: "Ad Copy", href: "/ads/ad-copy-templates", icon: FileText },
      { title: "Negative Keywords", href: "/ads/google-negative-keywords", icon: Tag }
    ]
  },
  {
    title: "Business Planning",
    icon: Briefcase,
    isCategory: true,
    subItems: [
      { title: "Calculators", href: "/calculators", icon: Calculator },
      { title: "$100K Blueprint", href: "/blueprint", icon: Map }
    ]
  },
  {
    title: "Design",
    icon: Palette,
    isCategory: true,
    subItems: [
      { title: "Reference Store", href: "/design/reference", icon: Store },
      { title: "Web UI", href: "/design/web", icon: LayoutGrid },
      { title: "Sections", href: "/design/sections", icon: Layers },
      { title: "Images", href: "/design/images", icon: Image },
      { title: "AI Tools", href: "/design/ai-tools", icon: Sparkles },
      { title: "Shrine Theme", href: "/design/shrine-theme", icon: Paintbrush },
      { title: "A/B Tests", href: "/design/ab-tests", icon: TestTube }
    ]
  },
  {
    title: "Learning Center",
    icon: BookOpen,
    isCategory: true,
    subItems: [
      { title: "Lessons", href: "/learn", icon: BookOpen },
      { title: "Lessons V2", href: "/learn-v2", icon: PlayCircle },
      { title: "Podcast", href: "/podcast", icon: Headphones },
      { title: "Cards", href: "/learning-cards", icon: Layers }
    ]
  },
  {
    title: "Courses",
    icon: GraduationCap,
    isCategory: true,
    subItems: [
      { title: "Explore", href: "/courses", icon: GraduationCap },
      { title: "My Courses", href: "/my-courses", icon: BadgeCheck }
    ]
  },
  {
    title: "Data Center",
    href: "/data-center",
    icon: Database,
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
}

export default function DashboardLayout({ children, hideHeader = false }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { counts, initialize, isInitialized } = useBookmarksStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkModalOpen, setBookmarkModalOpen] = useState(false);
  const bookmarkButtonRef = useRef<HTMLButtonElement>(null);

  // Theme store
  const { sidebarStyle, setSidebarStyle } = useThemeStore();

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme('lime', sidebarStyle); // Always use lime accent
  }, [sidebarStyle]);

  // Initialize bookmarks when user is available
  useEffect(() => {
    if (user?.id && !isInitialized) {
      initialize(user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';
  const userInitials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/login';
  };

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Auto-expand category if a sub-item is active
  useEffect(() => {
    for (const item of navigationItems) {
      if (item.isCategory && item.subItems) {
        const hasActiveSubItem = item.subItems.some(sub =>
          pathname === sub.href || pathname.startsWith(sub.href + '/')
        );
        if (hasActiveSubItem) {
          setExpandedCategory(item.title);
          break;
        }
      }
    }
  }, [pathname]);

  const isItemActive = (item: NavItem): boolean => {
    if (item.external) return false;
    if (item.href) {
      if (item.title === "Overview") {
        return pathname === '/dashboard' || pathname === item.href;
      }
      return pathname === item.href || pathname.startsWith(item.href + '/');
    }
    return false;
  };

  const isSubItemActive = (subItem: SubNavItem): boolean => {
    return pathname === subItem.href || pathname.startsWith(subItem.href + '/');
  };

  const hasCategoryActiveItem = (item: NavItem): boolean => {
    if (!item.subItems) return false;
    return item.subItems.some(sub => isSubItemActive(sub));
  };

  const renderNavItem = (item: NavItem, index: number, isMobile: boolean = false) => {
    const Icon = item.icon;

    if (item.isCategory) {
      const isExpanded = expandedCategory === item.title;
      const hasActiveChild = hasCategoryActiveItem(item);

      // Collapsed sidebar - show only icon with hover dropdown using React state
      if (sidebarCollapsed && !isMobile) {
        const isHovered = hoveredCategory === item.title;
        return (
          <div
            key={index}
            className="relative"
            onMouseEnter={() => setHoveredCategory(item.title)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div
              className={`nav-item justify-center ${hasActiveChild ? 'active' : ''}`}
              title={item.title}
            >
              <Icon size={18} strokeWidth={1.5} className="text-white/70" />
            </div>
            {/* Hover dropdown for collapsed state - 2-column grid with icons */}
            {isHovered && (
              <div
                className="absolute left-full top-0 ml-2 z-50"
                style={{
                  background: '#000000',
                  border: '1px solid rgba(136, 218, 28, 0.2)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                  width: '240px'
                }}
                onMouseEnter={() => setHoveredCategory(item.title)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="p-2 text-xs font-semibold text-white/50 uppercase tracking-wider mb-1 px-2">
                  {item.title}
                </div>
                <div className="grid grid-cols-2 gap-2 p-2">
                  {item.subItems?.map((subItem, subIdx) => {
                    const SubIcon = subItem.icon;
                    return (
                      <Link
                        key={subIdx}
                        href={subItem.href}
                        className={`sidebar-subitem-card ${
                          isSubItemActive(subItem) ? 'active' : ''
                        }`}
                        onClick={() => setHoveredCategory(null)}
                      >
                        <div className="sidebar-subitem-icon">
                          {SubIcon && <SubIcon size={18} strokeWidth={1.5} />}
                        </div>
                        <span className="sidebar-subitem-title">{subItem.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      }

      return (
        <div key={index} className="space-y-1">
          <button
            onClick={() => {
              setExpandedCategory(isExpanded ? null : item.title);
              if (isMobile) setSidebarOpen(true);
            }}
            className={`nav-item w-full justify-between ${hasActiveChild ? 'active' : ''}`}
            style={{ textAlign: 'left' }}
          >
            <div className="flex items-center gap-2.5 flex-1">
              <Icon size={18} strokeWidth={1.5} className="text-white/70 flex-shrink-0" />
              <span className="text-left">{item.title}</span>
            </div>
            {isExpanded ? <ChevronUp size={14} className="flex-shrink-0" /> : <ChevronDown size={14} className="flex-shrink-0" />}
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                {/* 2-column grid layout for sub-items with icons */}
                <div className="grid grid-cols-2 gap-2 px-2 py-2">
                  {item.subItems?.map((subItem, subIdx) => {
                    const SubIcon = subItem.icon;
                    return (
                      <Link
                        key={subIdx}
                        href={subItem.href}
                        className={`sidebar-subitem-card ${
                          isSubItemActive(subItem) ? 'active' : ''
                        }`}
                        onClick={() => isMobile && setSidebarOpen(false)}
                      >
                        <div className="sidebar-subitem-icon">
                          {SubIcon && <SubIcon size={18} strokeWidth={1.5} />}
                        </div>
                        <span className="sidebar-subitem-title">{subItem.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    // External link
    if (item.external && item.href) {
      return (
        <a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item"
          title={sidebarCollapsed && !isMobile ? item.title : undefined}
          onClick={() => isMobile && setSidebarOpen(false)}
        >
          <Icon size={20} strokeWidth={1.5} className="text-white/70" />
          {(!sidebarCollapsed || isMobile) && (
            <>
              <span className="flex-1">{item.title}</span>
              <ExternalLink size={14} className="text-white/50" />
            </>
          )}
        </a>
      );
    }

    // Regular link
    const isActive = isItemActive(item);
    return (
      <Link
        key={index}
        href={item.href || '/dashboard'}
        className={`nav-item ${isActive ? 'active' : ''}`}
        title={sidebarCollapsed && !isMobile ? item.title : undefined}
        onClick={() => isMobile && setSidebarOpen(false)}
      >
        <Icon size={18} strokeWidth={1.5} className="text-white/70" />
        {(!sidebarCollapsed || isMobile) && <span>{item.title}</span>}
      </Link>
    );
  };

  return (
    <div className="app-wrapper">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sidebar-overlay open"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''} ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '12px 0' }}>
          <img
            src="https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Quantum%20Scale%20logo%20(16).png"
            alt="Quantum Scale"
            className={sidebarCollapsed ? "w-10 h-10 object-contain" : "w-16 h-16 object-contain"}
          />
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="space-y-1">
            {navigationItems.map((item, idx) => renderNavItem(item, idx, false))}
          </div>
        </nav>

        {/* Theme Customization - Only show when sidebar is expanded */}
        {!sidebarCollapsed && (
          <div className="sidebar-theme-section">
            {/* Sidebar Style Toggle */}
            <div className="sidebar-style-toggle">
              <span className="sidebar-style-toggle-label">Theme</span>
              <div className="sidebar-style-toggle-buttons">
                <button
                  className={`sidebar-style-btn ${sidebarStyle === 'black' ? 'active' : ''}`}
                  onClick={() => setSidebarStyle('black')}
                >
                  Black
                </button>
                <button
                  className={`sidebar-style-btn ${sidebarStyle === 'gradient' ? 'active' : ''}`}
                  onClick={() => setSidebarStyle('gradient')}
                >
                  Gradient
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Settings Block */}
        <div className="sidebar-profile-block">
          {!sidebarCollapsed ? (
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">{userInitials}</div>
                <div className="profile-info">
                  <div className="profile-name">{userName}</div>
                  <div className="profile-email">{userEmail}</div>
                </div>
              </div>
              <div className="profile-meta">
                <div className="profile-niche">
                  <Tag size={12} className="text-[var(--primary)]" />
                  <span>Men&apos;s Fashion</span>
                </div>
              </div>
              <div className="profile-actions">
                <Link href="/bookmarks" className="profile-settings-btn" title="Bookmarks">
                  <Bookmark size={14} />
                </Link>
                <Link href="/settings" className="profile-settings-btn">
                  <Settings size={14} />
                  <span>Settings</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="profile-collapsed">
              <div className="profile-avatar-sm" title={userName}>{userInitials}</div>
              <Link href="/settings" className="profile-settings-btn-sm" title="Settings">
                <Settings size={16} />
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Main Area */}
      <div className={`main-area ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Top Bar - conditionally rendered */}
        {!hideHeader && (
          <header className="topbar">
            <div className="topbar-left">
              {/* Mobile Menu Button */}
              <button
                className="btn-icon md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Search */}
              <div className="search-input hidden md:block">
                <Search className="search-input-icon" size={18} strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="Search anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input w-64"
                  style={{ paddingLeft: '44px', height: '40px' }}
                />
              </div>
            </div>

            <div className="topbar-right">
              {/* Bookmarks */}
              <div className="relative">
                <button
                  ref={bookmarkButtonRef}
                  onClick={() => setBookmarkModalOpen(!bookmarkModalOpen)}
                  className="topbar-notification-btn"
                  data-testid="topbar-bookmark-btn"
                  aria-label="Open bookmarks"
                >
                  <Bookmark size={20} strokeWidth={1.5} />
                  {(counts.all || 0) > 0 && (
                    <span className="notification-badge">{counts.all > 99 ? '99+' : counts.all}</span>
                  )}
                </button>
                <BookmarkModal
                  isOpen={bookmarkModalOpen}
                  onClose={() => setBookmarkModalOpen(false)}
                  anchorRef={bookmarkButtonRef}
                />
              </div>

              {/* Notifications */}
              <button className="topbar-notification-btn">
                <Bell size={20} strokeWidth={1.5} />
                <span className="notification-badge">3</span>
              </button>

              {/* User Profile */}
              <div className="topbar-user">
                <div className="topbar-user-avatar">
                  {userInitials}
                </div>
                <div className="topbar-user-info">
                  <span className="topbar-user-name">{userName}</span>
                  <span className="topbar-user-email">{userEmail}</span>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Main Content */}
        <main className={`main-content ${hideHeader ? 'no-header' : ''}`}>
          {children}
        </main>
      </div>

      {/* AI Chatbot Widget - Floating on all pages */}
      <ChatbotWidget userName={userName?.split(' ')[0] || 'Builder'} />
    </div>
  );
}
