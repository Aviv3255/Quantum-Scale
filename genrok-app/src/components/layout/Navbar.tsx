'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, BookOpen, BarChart3, AppWindow, Palette, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { signOut } from '@/lib/supabase';

const navItems = [
  {
    label: 'Learn',
    href: '/learn',
    icon: BookOpen,
    subItems: [
      { label: 'Learning Center', href: '/learn', description: 'Articles & guides' },
      { label: 'A/B Test Results', href: '/ab-tests', description: 'Real data from real tests' },
      { label: 'Blueprint', href: '/blueprint', description: '$100K-$1M roadmap' },
    ],
  },
  {
    label: 'Tools',
    href: '/calculators',
    icon: BarChart3,
    subItems: [
      { label: 'Calculators', href: '/calculators', description: 'Profit simulation & KPI X-Ray' },
      { label: 'Data Center', href: '/data-center', description: 'Community polls' },
    ],
  },
  {
    label: 'Apps',
    href: '/apps',
    icon: AppWindow,
    subItems: [
      { label: 'Shopify Apps', href: '/apps/shopify', description: 'Discounted apps' },
      { label: 'Secret Apps', href: '/apps/secret', description: 'Must-have tools' },
      { label: 'AI Tools', href: '/apps/ai-tools', description: 'Premium AI tools' },
      { label: 'TikTok Credits', href: '/tiktok-credits', description: 'Free ad credits' },
    ],
  },
  {
    label: 'Design',
    href: '/design',
    icon: Palette,
    subItems: [
      { label: 'Web UI Inspiration', href: '/design/web', description: 'Award-winning designs' },
      { label: 'Sections', href: '/design/sections', description: 'Conversion sections' },
      { label: 'Images', href: '/design/images', description: 'Brand imagery' },
    ],
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, reset } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
    reset();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            {/* Monkey Icon */}
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#fdf6e3' }}>
              <span className="text-lg">🐵</span>
            </div>
            <span className="text-xl font-bold text-shimmer" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
              Quantum Scale
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all rounded-lg"
                  style={{
                    color: '#2c1810',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 105, 20, 0.04)';
                    e.currentTarget.style.color = '#8b6914';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#2c1810';
                  }}
                >
                  <item.icon className="w-4 h-4" strokeWidth={1.5} />
                  {item.label}
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </Link>

                <AnimatePresence>
                  {activeDropdown === item.label && item.subItems && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute top-full left-0 w-64 mt-2 py-2 bg-white rounded-xl"
                      style={{
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-3 transition-all"
                          style={{ color: '#2c1810' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(139, 105, 20, 0.04)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          <div className="font-medium text-sm" style={{ color: '#000' }}>{subItem.label}</div>
                          <div className="text-xs mt-0.5" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>{subItem.description}</div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>{user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-lg"
                  style={{ color: '#2c1810' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.06)';
                    e.currentTarget.style.color = '#ef4444';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#2c1810';
                  }}
                >
                  <LogOut className="w-4 h-4" strokeWidth={1.5} />
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium transition-all"
                  style={{ color: '#2c1810' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#8b6914';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#2c1810';
                  }}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-all"
                  style={{
                    background: '#8b6914',
                    boxShadow: '0 2px 8px rgba(139, 105, 20, 0.25)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#2c1810';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(44, 24, 16, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#8b6914';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 105, 20, 0.25)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 transition-all rounded-lg"
            style={{ color: '#2c1810' }}
          >
            {isOpen ? <X className="w-6 h-6" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white"
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 font-medium rounded-lg transition-all"
                    style={{ color: '#2c1810' }}
                  >
                    <item.icon className="w-5 h-5" strokeWidth={1.5} style={{ color: '#8b6914' }} />
                    {item.label}
                  </Link>
                </div>
              ))}
              <div className="pt-4 mt-2" style={{ borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}>
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg transition-all"
                    style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.06)' }}
                  >
                    <LogOut className="w-5 h-5" strokeWidth={1.5} />
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-3 text-white font-semibold rounded-lg"
                    style={{
                      background: '#8b6914',
                      boxShadow: '0 2px 8px rgba(139, 105, 20, 0.25)',
                    }}
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
