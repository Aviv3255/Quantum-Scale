'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, BookOpen, BarChart3, Sparkles, AppWindow, Palette, User, LogOut } from 'lucide-react';
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
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
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                  <ChevronDown className="w-3 h-3" />
                </Link>

                <AnimatePresence>
                  {activeDropdown === item.label && item.subItems && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-64 mt-1 py-2 bg-white rounded-xl shadow-xl border border-gray-100"
                    >
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <div className="font-medium text-gray-900">{subItem.label}</div>
                          <div className="text-xs text-gray-500">{subItem.description}</div>
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
                <span className="text-sm text-gray-600">{user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </div>
              ))}
              <div className="pt-4 border-t border-gray-100">
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-lg"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-3 text-white font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg"
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
