'use client';

import { useState, useEffect } from 'react';
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
  ChevronLeft,
  ChevronRight,
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
  type LucideIcon,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { signOut } from '@/lib/supabase';
import { UserDropdown } from './UserDropdown';

interface SubNavItem {
  title: string;
  href: string;
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
      { title: "The Dream Team", href: "/backend/dream-team" },
      { title: "Secret Apps", href: "/apps/secret" },
      { title: "Discounted Shopify Apps", href: "/apps/shopify" },
      { title: "Private Agent", href: "/products/private-agent" }
    ]
  },
  {
    title: "Products",
    icon: ShoppingBag,
    isCategory: true,
    subItems: [
      { title: "Private Agent", href: "/products/private-agent" },
      { title: "AliExpress Stores", href: "/products/aliexpress" },
      { title: "Sell These Products", href: "/products/sell-these" }
    ]
  },
  {
    title: "Ads",
    icon: Megaphone,
    isCategory: true,
    subItems: [
      { title: "$6,000 TikTok Ads Credit", href: "/tiktok-credits" },
      { title: "1,000 Meta Ad Templates", href: "/ads/meta-templates" },
      { title: "Meta Ads Structure", href: "/ads/meta-structure" },
      { title: "AI Image Ads", href: "/ads/ai-image" },
      { title: "AI Video Ads", href: "/ads/ai-video" },
      { title: "Ad Copy Templates", href: "/ads/ad-copy-templates" },
      { title: "Google Negative Keywords", href: "/ads/google-negative-keywords" }
    ]
  },
  {
    title: "Business Planning",
    icon: Briefcase,
    isCategory: true,
    subItems: [
      { title: "Calculators & Forecasts", href: "/calculators" },
      { title: "$100K Blueprint", href: "/blueprint" }
    ]
  },
  {
    title: "Design",
    icon: Palette,
    isCategory: true,
    subItems: [
      { title: "Reference Store", href: "/design/reference" },
      { title: "Web UI Inspiration", href: "/design/web" },
      { title: "Sections Inspiration", href: "/design/sections" },
      { title: "Image Inspiration", href: "/design/images" },
      { title: "AI Tools", href: "/design/ai-tools" },
      { title: "Shrine Theme", href: "/design/shrine-theme" },
      { title: "A/B Test Results", href: "/design/ab-tests" }
    ]
  },
  {
    title: "Learning Center",
    icon: BookOpen,
    isCategory: true,
    subItems: [
      { title: "Lessons", href: "/learn" },
      { title: "The Quantum Podcast", href: "/podcast" },
      { title: "Learning Cards", href: "/learning-cards" }
    ]
  },
  {
    title: "Courses",
    icon: GraduationCap,
    isCategory: true,
    subItems: [
      { title: "Explore Courses", href: "/courses" },
      { title: "My Courses", href: "/my-courses" }
    ]
  },
  {
    title: "Data Center",
    href: "/data-center",
    icon: Database,
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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

      // Collapsed sidebar - show only icon with hover tooltip
      if (sidebarCollapsed && !isMobile) {
        return (
          <div key={index} className="relative group">
            <div
              className={`nav-item justify-center ${hasActiveChild ? 'active' : ''}`}
              title={item.title}
            >
              <Icon size={18} strokeWidth={1.5} className="text-[var(--text-tertiary)]" />
            </div>
            {/* Hover dropdown for collapsed state */}
            <div className="absolute left-full top-0 ml-2 hidden group-hover:block z-50 min-w-[200px]"
                 style={{
                   background: 'var(--bg-sidebar)',
                   border: '1px solid var(--border-subtle)',
                   borderRadius: '12px',
                   boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                 }}>
              <div className="p-2 space-y-1">
                {item.subItems?.map((subItem, subIdx) => (
                  <Link
                    key={subIdx}
                    href={subItem.href}
                    className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                      isSubItemActive(subItem) ? 'text-[var(--text-primary)] bg-[var(--bg-active)] font-medium' : 'text-[var(--text-tertiary)] hover:bg-[var(--bg-hover)]'
                    }`}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            </div>
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
              <Icon size={18} strokeWidth={1.5} className="text-[var(--text-tertiary)] flex-shrink-0" />
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
                <div className="pl-8 space-y-1 py-1">
                  {item.subItems?.map((subItem, subIdx) => (
                    <Link
                      key={subIdx}
                      href={subItem.href}
                      className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                        isSubItemActive(subItem)
                          ? 'text-[var(--text-primary)] bg-[var(--bg-active)] font-medium'
                          : 'text-[var(--text-tertiary)] hover:bg-[var(--bg-hover)]'
                      }`}
                      onClick={() => isMobile && setSidebarOpen(false)}
                    >
                      {subItem.title}
                    </Link>
                  ))}
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
          <Icon size={20} strokeWidth={1.5} className="text-[var(--text-tertiary)]" />
          {(!sidebarCollapsed || isMobile) && (
            <>
              <span className="flex-1">{item.title}</span>
              <ExternalLink size={14} className="opacity-50" />
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
        <Icon size={18} strokeWidth={1.5} className="text-[var(--text-tertiary)]" />
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
            src="https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Quantum_Scale_logo_6.jpg?v=1765196126"
            alt="Quantum Scale"
            className={sidebarCollapsed ? "w-10 h-10 rounded-xl object-cover" : "w-20 h-20 rounded-xl object-cover"}
          />
        </div>

        {/* Collapse Toggle (Desktop only) */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden md:flex absolute top-6 -right-3.5 w-7 h-7 rounded-full items-center justify-center transition-all z-50"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            color: 'var(--text-tertiary)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="space-y-1">
            {navigationItems.map((item, idx) => renderNavItem(item, idx, false))}
          </div>
        </nav>

        {/* User Section */}
        <div className="sidebar-user">
          {!sidebarCollapsed ? (
            <>
              <div className="sidebar-user-avatar">{userInitials}</div>
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">{userName}</div>
                <div className="sidebar-user-email">{userEmail}</div>
              </div>
            </>
          ) : (
            <div className="sidebar-user-avatar mx-auto" title={userName}>{userInitials}</div>
          )}
          <button
            onClick={handleSignOut}
            className="btn-icon"
            title="Sign out"
          >
            <LogOut size={18} strokeWidth={1.5} />
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className={`main-area ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Top Bar */}
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
            {/* Notifications */}
            <button className="btn-icon relative">
              <Bell size={20} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--primary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* User Dropdown */}
            <UserDropdown />
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
