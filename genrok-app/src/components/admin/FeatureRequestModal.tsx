'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, Send } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { submitFeatureRequest } from '@/lib/supabase';

interface FeatureRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  { value: 'new_feature', label: 'New Feature' },
  { value: 'ui_ux', label: 'UI/UX Improvement' },
  { value: 'bug_fix', label: 'Bug Fix' },
  { value: 'content', label: 'Content Request' },
  { value: 'other', label: 'Other' },
];

export function FeatureRequestModal({ isOpen, onClose }: FeatureRequestModalProps) {
  const { user } = useAuthStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('new_feature');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Please enter a title for your request');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitFeatureRequest({
        user_id: user?.id || null,
        user_email: user?.email || 'anonymous',
        title: title.trim(),
        description: description.trim() || null,
        category,
      });

      setSuccess(true);
      setTimeout(() => {
        setTitle('');
        setDescription('');
        setCategory('new_feature');
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Error submitting feature request:', err);
      setError('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-[10001] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900">Feature Request</h2>
                  <p className="text-sm text-neutral-500">Share your ideas to improve Quantum Scale</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-neutral-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">Thank you!</h3>
                  <p className="text-sm text-neutral-500">Your feature request has been submitted.</p>
                </motion.div>
              ) : (
                <>
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Add dark mode support"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-neutral-400 focus:ring-0 outline-none transition-colors text-sm"
                      autoFocus
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-neutral-400 focus:ring-0 outline-none transition-colors text-sm bg-white"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Description (optional)
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your idea in more detail..."
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-neutral-400 focus:ring-0 outline-none transition-colors text-sm resize-none"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="px-4 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-black text-white font-medium hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Request
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
