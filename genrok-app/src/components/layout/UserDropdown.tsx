'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, HelpCircle, LogOut, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { signOut } from '@/lib/supabase';
import { FeatureRequestModal } from '@/components/admin/FeatureRequestModal';

export function UserDropdown() {
  const { user, reset } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get user initials
  const getInitials = () => {
    if (!user?.email) return 'U';
    const parts = user.email.split('@')[0].split(/[._-]/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
    reset();
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-black/5 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-semibold">
            {getInitials()}
          </div>
          <ChevronDown
            className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-neutral-100 overflow-hidden z-50"
            >
              {/* User Info */}
              <div className="px-4 py-3 border-b border-neutral-100">
                <p className="text-sm font-medium text-neutral-900 truncate">
                  {user?.email || 'User'}
                </p>
                <p className="text-xs text-neutral-500">
                  Quantum Scale Member
                </p>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setShowFeatureModal(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Feature Request
                </button>

                <a
                  href="https://quantum-scale.onrender.com/learn"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-blue-500" />
                  Help / Docs
                </a>
              </div>

              {/* Sign Out */}
              <div className="border-t border-neutral-100 py-1">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Feature Request Modal */}
      <FeatureRequestModal
        isOpen={showFeatureModal}
        onClose={() => setShowFeatureModal(false)}
      />
    </>
  );
}
