'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  CheckSquare,
  BookOpen,
  Wrench,
  AppWindow,
  Palette,
  FileText,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  Rocket,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { signOut } from '@/lib/supabase';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

const mainNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} strokeWidth={1.5} /> },
  { label: 'Checklist', href: '/checklist', icon: <CheckSquare size={20} strokeWidth={1.5} />, badge: '250' },
  { label: 'Learning Center', href: '/learn', icon: <BookOpen size={20} strokeWidth={1.5} /> },
  { label: 'Tools', href: '/calculators', icon: <Wrench size={20} strokeWidth={1.5} /> },
];

const resourceNavItems: NavItem[] = [
  { label: 'Apps', href: '/apps/shopify', icon: <AppWindow size={20} strokeWidth={1.5} /> },
  { label: 'Design', href: '/design/web', icon: <Palette size={20} strokeWidth={1.5} /> },
  { label: 'Templates', href: '/templates', icon: <FileText size={20} strokeWidth={1.5} /> },
];

function getTimeBasedGreeting(userName: string) {
  const hour = new Date().getHours();
  const firstName = userName?.split(' ')[0] || 'there';

  if (hour >= 5 && hour < 12) {
    return {
      greeting: `Good morning, ${firstName}`,
      icon: Sun,
      message: "Fresh start, fresh opportunities. Let's make today count.",
    };
  } else if (hour >= 12 && hour < 17) {
    return {
      greeting: `Good afternoon, ${firstName}`,
      icon: Rocket,
      message: "You're in the zone. Keep that momentum going.",
    };
  } else if (hour >= 17 && hour < 21) {
    return {
      greeting: `Good evening, ${firstName}`,
      icon: Sparkles,
      message: "Wrapping up? Take a moment to celebrate your wins today.",
    };
  } else {
    return {
      greeting: `Working late, ${firstName}?`,
      icon: Moon,
      message: "Night owls build empires. But don't forget to rest.",
    };
  }
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';
  const userInitials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  const { greeting, icon: GreetingIcon, message } = getTimeBasedGreeting(userName);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/login';
  };

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

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
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="w-8 h-8 bg-[var(--accent-gold-bg)] rounded-lg flex items-center justify-center">
            <Rocket size={18} className="text-[var(--accent-gold)]" />
          </div>
          <span>Quantum Scale</span>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {/* Main Section */}
          <div className="sidebar-section">
            <div className="sidebar-section-title">Main</div>
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${pathname === item.href || pathname.startsWith(item.href + '/') ? 'active' : ''}`}
              >
                <span className="nav-item-icon">{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && <span className="nav-item-badge">{item.badge}</span>}
              </Link>
            ))}
          </div>

          {/* Resources Section */}
          <div className="sidebar-section">
            <div className="sidebar-section-title">Resources</div>
            {resourceNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${pathname === item.href || pathname.startsWith(item.href.split('/').slice(0, 2).join('/')) ? 'active' : ''}`}
              >
                <span className="nav-item-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* User Section */}
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">{userInitials}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{userName}</div>
            <div className="sidebar-user-email">{userEmail}</div>
          </div>
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
      <div className="main-area">
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
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent-gold)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Settings */}
            <Link href="/settings" className="btn-icon">
              <Settings size={20} strokeWidth={1.5} />
            </Link>
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
