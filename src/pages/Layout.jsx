

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Calculator, CheckSquare, ShoppingBag, Sparkles, Package, Truck, Home, TrendingUp, BarChart3, Bell, Target, Menu, X, Lock, ExternalLink, Palette, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Briefcase, LogOut, BookOpen, Database } from "lucide-react";

const navigationItems = [
  {
    title: "Overview",
    url: createPageUrl("Home"),
    icon: Home,
  },
  {
    title: "Business Planning & Forecasts",
    icon: Briefcase,
    isCategory: true,
    subItems: [
      { title: "Calculators & Forecasts", url: createPageUrl("Calculators") },
      { title: "$100K Blueprint", url: createPageUrl("Blueprint100K") }
    ]
  },
  {
    title: "Checklists",
    icon: CheckSquare,
    isCategory: true,
    subItems: [
      { title: "Setup Checklist", url: createPageUrl("Checklist") },
      { title: "Scale Checklist", url: createPageUrl("ScaleChecklist") }
    ]
  },
  {
    title: "Learning Center",
    url: createPageUrl("LearningCenter"),
    icon: BookOpen,
  },
  {
    title: "Data Center",
    url: createPageUrl("DataCenter"),
    icon: Database,
  },
  {
    title: "Products",
    icon: ShoppingBag,
    isCategory: true,
    subItems: [
      { title: "AliExpress Stores", url: createPageUrl("AliExpress") },
      { title: "Sell These Products", url: createPageUrl("SellTheseProducts") },
      { title: "Private Agent", url: createPageUrl("PrivateAgent") }
    ]
  },
  {
    title: "Secret Apps",
    icon: Package,
    isCategory: true,
    subItems: [
      { title: "Discounted Shopify Apps", url: createPageUrl("ShopifyApps") },
      { title: "Secret Apps", url: createPageUrl("SecretApps") },
      { title: "Private Agent", url: createPageUrl("PrivateAgent") }
    ]
  },
  {
    title: "Design",
    icon: Palette,
    isCategory: true,
    subItems: [
      { title: "Web UI Inspiration", url: createPageUrl("WebUIInspiration") },
      { title: "Sections Inspiration", url: createPageUrl("SectionsInspiration") },
      { title: "Image Inspiration", url: createPageUrl("ImageInspiration") },
      { title: "AI Tools", url: createPageUrl("AITools") },
      { title: "Shrine Theme", url: createPageUrl("ShrineTheme") },
      { title: "A/B Test Results", url: createPageUrl("ABTestResults") }
    ]
  },
  {
    title: "$6,000 Credit for TikTok Ads",
    url: createPageUrl("TikTokCredits"),
    icon: TrendingUp,
  },
  {
    title: "Updates",
    url: createPageUrl("Updates"),
    icon: Bell,
  },
  {
    title: "Build a Bundle & Save 35%",
    url: "https://quantum-scale.co/pages/bundle-builder",
    icon: Package,
    external: true
  },
];

export default function Layout({ children }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); 
  const [expandedCategory, setExpandedCategory] = useState(null);
  const hasCheckedAuth = useRef(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Prevent multiple checks
    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;
    
    const checkAuth = async () => {
      const auth = localStorage.getItem('quantum_auth');
      
      // If on onboarding page, skip auth check to prevent loops
      if (location.pathname === '/onboarding') {
        setIsChecking(false);
        return;
      }
      
      if (auth === 'true') {
        try {
          const user = await base44.auth.me();
          if (user) {
            const profiles = await base44.entities.UserProfile.list();
            if (profiles.length === 0 || !profiles[0].onboarding_completed) {
              setNeedsOnboarding(true);
              setIsAuthenticated(false);
            } else {
              setIsAuthenticated(true);
            }
          } else {
            // No user found, clear auth
            localStorage.removeItem('quantum_auth');
            setIsAuthenticated(false);
          }
        } catch (err) {
          console.error('Auth check error:', err);
          // Clear invalid auth state
          localStorage.removeItem('quantum_auth');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsChecking(false);
    };
    
    checkAuth();
  }, [location.pathname]);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = await base44.auth.me();
        if (user) {
          setCurrentUser(user);
          const profiles = await base44.entities.UserProfile.list();
          if (profiles.length > 0) {
            setUserProfile(profiles[0]);
          }
        }
      } catch (err) {
        console.error('Error loading user data:', err);
      }
    };
    
    if (isAuthenticated) {
      loadUserData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    for (const item of navigationItems) {
      if (item.isCategory && item.subItems) {
        const hasActiveSubItem = item.subItems.some(sub => {
          const subItemUrlPathname = new URL(sub.url, window.location.origin).pathname;
          return location.pathname === subItemUrlPathname;
        });
        if (hasActiveSubItem) {
          setExpandedCategory(item.title);
          break;
        }
      } else if (!item.external && location.pathname === new URL(item.url, window.location.origin).pathname) {
        // If a top-level item is active, ensure no category is expanded
        setExpandedCategory(null);
        break;
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    let currentTitle = "Quantum Scale";
    const getPathname = (fullUrl) => {
      try {
        if (!fullUrl.startsWith('http')) {
          return new URL(fullUrl, window.location.origin).pathname;
        }
        return new URL(fullUrl).pathname;
      } catch (e) {
        console.error("Invalid URL:", fullUrl, e);
        return fullUrl;
      }
    };

    for (const item of navigationItems) {
      if (item.isCategory && item.subItems) {
        for (const subItem of item.subItems) {
          if (getPathname(subItem.url) === location.pathname) {
            currentTitle = `${subItem.title} | Quantum Scale`;
            break;
          }
        }
      } else if (!item.external) {
        if (item.title === "Overview" && (location.pathname === '/' || getPathname(item.url) === location.pathname)) {
          currentTitle = `${item.title} | Quantum Scale`;
          break;
        } else if (getPathname(item.url) === location.pathname) {
          currentTitle = `${item.title} | Quantum Scale`;
          break;
        }
      }
      if (currentTitle !== "Quantum Scale") break;
    }
    document.title = currentTitle;
  }, [location.pathname]);

  const generateUserId = (email) => {
    if (!email) return 'QS00000';
    const hash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `QS${String(10000 + (hash % 90000)).padStart(5, '0')}`;
  };

  const userId = currentUser ? generateUserId(currentUser.email) : '';
  const fullName = userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : '';

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password === '999') {
      localStorage.setItem('quantum_auth', 'true');
      
      try {
        const user = await base44.auth.me();
        if (user) {
          const profiles = await base44.entities.UserProfile.list();
          if (profiles.length === 0 || !profiles[0].onboarding_completed) {
            window.location.href = '/onboarding';
          } else {
            setIsAuthenticated(true);
            hasCheckedAuth.current = false; // Reset for next check
          }
        } else {
          window.location.href = '/onboarding';
        }
      } catch (err) {
        console.error('Password submit error:', err);
        window.location.href = '/onboarding';
      }
    } else {
      setError('Incorrect password');
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setError('');
      }, 820);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('quantum_auth');
    localStorage.removeItem('quantum_user_name');
    localStorage.removeItem('quantum_onboarding_completed');
    hasCheckedAuth.current = false;
    base44.auth.logout();
    setIsAuthenticated(false);
    setNeedsOnboarding(false);
    setCurrentUser(null);
    setUserProfile(null);
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FFFFFF' }}>
        <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
             style={{ borderColor: '#3B82F6', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (needsOnboarding && location.pathname !== '/onboarding') {
    window.location.href = '/onboarding';
    return null;
  }

  if (!isAuthenticated && location.pathname !== '/onboarding') {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            background: #FFFFFF !important;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
          }

          .shake {
            animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
          }

          @keyframes subtleGlow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }

          .aura-glow {
            animation: subtleGlow 3s ease-in-out infinite;
          }
        `}</style>

        <div className="min-h-screen flex items-center justify-center p-4 relative" style={{ background: '#FFFFFF' }}>
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(0, 125, 255, 0.08), rgba(0, 196, 180, 0.05), transparent 70%)',
              filter: 'blur(60px)'
            }}
          />

          <div className={`w-full max-w-md relative z-10 ${isShaking ? 'shake' : ''}`}>
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center overflow-hidden"
                   style={{
                     background: '#FFFFFF',
                     boxShadow: '0 8px 24px rgba(0, 125, 255, 0.15)'
                   }}>
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e8dc64d4947e1a757921a8/72c207bdd_QuantumScalelogo13.png"
                  alt="Quantum Scale"
                  className="w-16 h-16 object-contain"
                />
              </div>
              
              <h1 className="text-2xl font-bold mb-1" style={{ 
                color: '#010C31',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Quantum Scale
              </h1>
              <p className="text-sm" style={{ color: '#7B7B7B' }}>Intelligence Dashboard</p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="p-8 rounded-3xl relative"
                  style={{
                    background: '#FFFFFF',
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(0, 125, 255, 0.1)'
                  }}>
              
              <h2 className="text-2xl font-bold mb-2 text-center" style={{ 
                color: '#010C31',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Access Your Growth Engine 🚀
              </h2>
              
              <p className="text-center mb-6" style={{ color: '#7B7B7B', fontSize: '14px' }}>
                Step into your personal control hub - where every click turns into growth.
              </p>

              <div className="mb-6">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Access Code"
                  className="w-full px-4 py-3 rounded-xl transition-all"
                  style={{
                    background: '#F9FBFF',
                    border: '1px solid #E5E7EB',
                    color: '#010C31',
                    outline: 'none',
                    fontSize: '15px'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#007DFF';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 125, 255, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E5E7EB';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {error && (
                  <p className="text-sm mt-2" style={{ color: '#EF4444' }}>{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold transition-all btn-primary"
                style={{
                  fontSize: '15px',
                  padding: '14px 24px',
                  borderRadius: '12px'
                }}
              >
                Enter Dashboard
              </button>

              <p className="text-center text-xs mt-6" style={{ color: '#9CA3AF' }}>
                Welcome to the system that scales stores beyond limits.
              </p>
            </form>
          </div>
        </div>
      </>
    );
  }

  const renderNavigationItem = (item, idx, isMobile = false) => {
    if (item.isCategory) {
      const isExpanded = expandedCategory === item.title;
      const hasActiveSubItem = item.subItems && item.subItems.some(sub => {
        const subItemUrlPathname = new URL(sub.url, window.location.origin).pathname;
        return location.pathname === subItemUrlPathname;
      });
      
      if (isSidebarCollapsed && !isMobile) {
        return (
          <div key={idx} className="relative group">
            <div
              className={`sidebar-item flex items-center justify-center px-4 py-3 text-sm ${hasActiveSubItem ? 'active' : ''}`}
              style={{ color: hasActiveSubItem ? '#FFFFFF' : '#94A3B8' }}
              title={item.title}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" style={{ color: hasActiveSubItem ? '#FFFFFF' : '#94A3B8' }} />
            </div>
            <div className="absolute left-full top-0 ml-2 hidden group-hover:block z-50 min-w-[200px]"
                 style={{
                   background: '#1E293B',
                   border: '1px solid #334155',
                   borderRadius: '12px',
                   boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                 }}>
              <div className="p-2 space-y-1">
                {item.subItems.map((subItem, subIdx) => {
                  const subItemUrlPathname = new URL(subItem.url, window.location.origin).pathname;
                  const isActive = location.pathname === subItemUrlPathname;
                  return (
                    <Link
                      key={subIdx}
                      to={subItem.url}
                      className={`block px-4 py-2 text-sm rounded-lg transition-colors ${isActive ? '' : ''}`}
                      style={{
                        color: isActive ? '#FFFFFF' : '#94A3B8',
                        fontWeight: isActive ? '600' : '500',
                        background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                      }}
                      onMouseEnter={(e) => !isActive && (e.currentTarget.style.background = 'rgba(148, 163, 184, 0.1)')}
                      onMouseLeave={(e) => !isActive && (e.currentTarget.style.background = 'transparent')}
                    >
                      {subItem.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }

      // For non-collapsed categories or mobile: render as an expandable category
      return (
        <div key={idx} className="space-y-1">
          <button
            onClick={() => {
              setExpandedCategory(isExpanded ? null : item.title);
              // For mobile, keep menu open to display expanded sub-items
              if (isMobile) setIsMobileMenuOpen(true);
            }}
            className={`sidebar-item flex items-center justify-between gap-3 px-4 py-3 text-sm w-full transition-colors ${hasActiveSubItem ? 'active' : ''}`}
            style={{ color: hasActiveSubItem ? '#FFFFFF' : '#94A3B8', fontWeight: hasActiveSubItem ? '600' : '500' }}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 flex-shrink-0" style={{ color: hasActiveSubItem ? '#FFFFFF' : '#94A3B8' }} />
              <span>{item.title}</span>
            </div>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {isExpanded && item.subItems && (
            <div className="pl-8 space-y-1"> {/* Indent sub-items */}
              {item.subItems.map((subItem, subIdx) => {
                const subItemUrlPathname = new URL(subItem.url, window.location.origin).pathname;
                const isActive = location.pathname === subItemUrlPathname;
                return (
                  <Link
                    key={subIdx}
                    to={subItem.url}
                    className={`block px-4 py-2 text-sm rounded-lg transition-colors ${isActive ? '' : ''}`}
                    style={{
                      color: isActive ? '#FFFFFF' : '#94A3B8',
                      fontWeight: isActive ? '600' : '500',
                      background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                    }}
                    onMouseEnter={(e) => !isActive && (e.currentTarget.style.background = 'rgba(148, 163, 184, 0.1)')}
                    onMouseLeave={(e) => !isActive && (e.currentTarget.style.background = 'transparent')}
                    onClick={() => isMobile && setIsMobileMenuOpen(false)} // Close mobile menu on sub-item click
                  >
                    {subItem.title}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }
    
    // Handle non-category items (regular links)
    if (!item.url) {
      return null; // Skip items without URLs
    }
    
    const itemUrlPathname = item.url.startsWith('http') ? new URL(item.url).pathname : new URL(item.url, window.location.origin).pathname;
    let isActive = false;

    if (!item.external) {
      if (item.title === "Overview") {
        isActive = location.pathname === '/' || location.pathname === itemUrlPathname;
      } else {
        isActive = location.pathname === itemUrlPathname;
      }
    }
    
    if (item.external) {
      return (
        <a
          key={idx}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-item flex items-center gap-3 px-4 py-3 text-sm"
          style={{ color: '#94A3B8', fontWeight: '500' }}
          title={isSidebarCollapsed && !isMobile ? item.title : ''}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          <item.icon className="w-5 h-5 flex-shrink-0" style={{ color: '#94A3B8' }} />
          {(!isSidebarCollapsed || isMobile) && (
            <>
              <span className="flex-1">{item.title}</span>
              <ExternalLink className="w-3 h-3 flex-shrink-0" style={{ opacity: 0.5 }} />
            </>
          )}
        </a>
      );
    }

    return (
      <Link
        key={idx}
        to={item.url}
        className={`sidebar-item flex items-center gap-3 px-4 py-3 text-sm ${isActive ? 'active' : ''}`}
        style={{ color: isActive ? '#FFFFFF' : '#94A3B8', fontWeight: isActive ? '600' : '500' }}
        title={isSidebarCollapsed && !isMobile ? item.title : ''}
        onClick={() => isMobile && setIsMobileMenuOpen(false)}
      >
        <item.icon className="w-5 h-5 flex-shrink-0" style={{ color: isActive ? '#FFFFFF' : '#94A3B8' }} />
        {(!isSidebarCollapsed || isMobile) && <span>{item.title}</span>}
      </Link>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: #FFFFFF !important;
          color: #1A1A1A;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          overflow-x: hidden;
        }

        .sidebar-item {
          position: relative;
          border-radius: 8px;
          transition: all 0.2s ease;
          overflow: visible;
          background: transparent;
          border: none;
        }

        .sidebar-item:hover {
          background: rgba(148, 163, 184, 0.1);
        }

        .sidebar-item.active {
          background: rgba(255, 255, 255, 0.1);
          color: #FFFFFF;
        }

        .sidebar-item.active::after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          background: #B8860B;
          border-radius: 2px 0 0 2px;
        }

        .mobile-menu-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 999;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }

        .mobile-menu {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>

      <div className="min-h-screen flex" style={{ background: '#FFFFFF' }}>
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4"
             style={{ background: '#000000', borderBottom: '1px solid #1E293B', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
          <h1 className="text-lg font-bold" style={{ color: '#FFFFFF', fontFamily: 'Poppins, sans-serif' }}>
            Quantum Scale
          </h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg transition-all"
            style={{ background: '#1E293B' }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" style={{ color: '#94A3B8' }} /> : <Menu className="w-6 h-6" style={{ color: '#94A3B8' }} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-overlay lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
        )}

        {/* Mobile Sidebar */}
        <div className={`lg:hidden fixed top-0 left-0 h-full w-72 z-[1000] transition-transform duration-300 mobile-menu ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
             style={{ background: '#000000', borderRight: '1px solid #1E293B', boxShadow: '2px 0 8px rgba(0,0,0,0.3)' }}>
          <div className="p-4 border-b" style={{ borderColor: '#1E293B' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                {fullName ? (
                  <>
                    <h2 className="text-base font-bold" style={{ color: '#FFFFFF' }}>{fullName}</h2>
                    <p className="text-xs" style={{ color: '#64748B' }}>User ID: {userId}</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-bold" style={{ color: '#FFFFFF' }}>Quantum Scale</h2>
                    <p className="text-xs" style={{ color: '#64748B' }}>Intelligence Dashboard</p>
                  </>
                )}
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X className="w-5 h-5" style={{ color: '#94A3B8' }} />
              </button>
            </div>
          </div>

          <nav className="p-4 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 160px)' }}>
            {navigationItems.map((item, idx) => renderNavigationItem(item, idx, true))}
            
            <button
              onClick={handleLogout}
              className="sidebar-item flex items-center gap-3 px-4 py-3 text-sm w-full mt-4"
              style={{ color: '#EF4444', fontWeight: '500', borderTop: '1px solid #1E293B', paddingTop: '16px' }}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" style={{ color: '#EF4444' }} />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Desktop Sidebar */}
        <div 
          className={`hidden lg:block flex-shrink-0 border-r transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-72'}`}
          style={{ 
            background: '#000000',
            borderColor: '#1E293B',
            boxShadow: '1px 0 3px rgba(0,0,0,0.2)',
            position: 'relative',
            overflow: 'visible'
          }}>
          <div style={{ overflowY: 'auto', overflowX: 'visible', height: '100%' }}>
            <div className="p-6 border-b relative" style={{ borderColor: '#1E293B', overflow: 'visible' }}>
              {!isSidebarCollapsed && (
                <>
                  {fullName && userId ? (
                    <>
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-lg"
                          style={{ background: 'linear-gradient(135deg, #007DFF 0%, #00A8FF 100%)' }}
                        >
                          {fullName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-base font-bold truncate" style={{ color: '#FFFFFF' }}>{fullName}</h2>
                          <p className="text-xs" style={{ color: '#64748B' }}>User ID: {userId}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-2">
                        <img 
                          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e8dc64d4947e1a757921a8/79c200aa5_QuantumScalelogo12.png"
                          alt="Quantum Scale"
                          className="h-10"
                        />
                      </div>
                      <h2 className="text-xl font-bold mb-1" style={{ color: '#FFFFFF', fontFamily: 'Poppins, sans-serif' }}>Quantum Scale</h2>
                      <p className="text-xs" style={{ color: '#64748B' }}>Intelligence Dashboard</p>
                    </>
                  )}
                </>
              )}
              
              {isSidebarCollapsed && (
                <div className="flex justify-center py-2">
                  {fullName ? (
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #007DFF 0%, #00A8FF 100%)' }}
                      title={`${fullName} (${userId})`}
                    >
                      {fullName.split(' ').map(n => n[0]).join('')}
                    </div>
                  ) : (
                    <img 
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e8dc64d4947e1a757921a8/79c200aa5_QuantumScalelogo12.png"
                      alt="Quantum Scale"
                      className="h-8 w-8 object-contain"
                    />
                  )}
                </div>
              )}
            </div>

            <nav className="p-4 space-y-1" style={{ paddingBottom: '80px' }}>
              {navigationItems.map((item, idx) => renderNavigationItem(item, idx, false))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t" style={{ borderColor: '#1E293B', background: '#000000' }}>
              <button
                onClick={handleLogout}
                className="sidebar-item flex items-center gap-3 px-4 py-3 text-sm w-full"
                style={{ color: '#EF4444', fontWeight: '500' }}
                title={isSidebarCollapsed ? 'Logout' : ''}
              >
                <LogOut className="w-5 h-5 flex-shrink-0" style={{ color: '#EF4444' }} />
                {!isSidebarCollapsed && <span>Logout</span>}
              </button>
            </div>
          </div>
          
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute top-6 -right-3.5 w-7 h-7 rounded-full flex items-center justify-center transition-all"
            style={{
              background: '#1E293B',
              border: '1px solid #334155',
              color: '#FFFFFF',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              zIndex: 100
            }}
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto pt-20 lg:pt-0" style={{ background: '#FFFFFF' }}>
          {children}
        </div>
      </div>
    </>
  );
}

