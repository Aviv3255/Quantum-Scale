'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bug,
  ExternalLink,
  Check,
  CheckCheck,
  RotateCcw,
  Trash2,
  AlertTriangle,
  Clock,
  Filter,
  Search,
  ArrowLeft,
  MessageSquare,
  Send,
} from 'lucide-react';
import Link from 'next/link';
import { getIssues, getIssueCounts, updateIssueStatus, deleteIssue, updateIssueFeedback } from '@/lib/adminIssues';
import type { AdminIssue } from '@/types/admin';

type StatusFilter = 'all' | 'pending' | 'fixed' | 'validated';

export default function AdminIssuesPage() {
  const [issues, setIssues] = useState<AdminIssue[]>([]);
  const [counts, setCounts] = useState({ all: 0, pending: 0, fixed: 0, validated: 0 });
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [expandedFeedback, setExpandedFeedback] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  // Fetch issues and counts
  const fetchData = async () => {
    try {
      const [issuesData, countsData] = await Promise.all([
        getIssues(statusFilter === 'all' ? undefined : { status: statusFilter }),
        getIssueCounts(),
      ]);
      setIssues(issuesData);
      setCounts(countsData);
    } catch (err) {
      console.error('Error fetching issues:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter]);

  // Filter by search
  const filteredIssues = issues.filter((issue) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      issue.title.toLowerCase().includes(query) ||
      issue.description.toLowerCase().includes(query) ||
      issue.page_url.toLowerCase().includes(query) ||
      (issue.lesson_slug && issue.lesson_slug.toLowerCase().includes(query))
    );
  });

  // Handle status change
  const handleStatusChange = async (id: string, newStatus: AdminIssue['status']) => {
    setActionLoading(id);
    try {
      await updateIssueStatus(id, newStatus);
      await fetchData();
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setActionLoading(null);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this issue?')) return;
    setActionLoading(id);
    try {
      await deleteIssue(id);
      await fetchData();
    } catch (err) {
      console.error('Error deleting issue:', err);
    } finally {
      setActionLoading(null);
    }
  };

  // Handle feedback submission
  const handleFeedbackSubmit = async (id: string) => {
    if (!feedbackText.trim()) return;
    setActionLoading(id);
    try {
      await updateIssueFeedback(id, feedbackText.trim());
      setFeedbackText('');
      setExpandedFeedback(null);
      await fetchData();
    } catch (err) {
      console.error('Error saving feedback:', err);
    } finally {
      setActionLoading(null);
    }
  };

  // Toggle feedback panel
  const toggleFeedback = (id: string, currentFeedback: string | null) => {
    if (expandedFeedback === id) {
      setExpandedFeedback(null);
      setFeedbackText('');
    } else {
      setExpandedFeedback(id);
      setFeedbackText(currentFeedback || '');
    }
  };

  // Status badge colors
  const getStatusColor = (status: AdminIssue['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'fixed':
        return 'bg-blue-100 text-blue-700';
      case 'validated':
        return 'bg-green-100 text-green-700';
    }
  };

  // Priority badge
  const getPriorityBadge = (priority: AdminIssue['priority']) => {
    if (priority === 'urgent') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium">
          <AlertTriangle className="w-3 h-3" />
          Urgent
        </span>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/dashboard"
              className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-neutral-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Issue Tracker</h1>
              <p className="text-neutral-500 text-sm">Manage reported issues across the platform</p>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex gap-2">
            {(['all', 'pending', 'fixed', 'validated'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                <span className="ml-2 px-1.5 py-0.5 rounded-md bg-white/20 text-xs">
                  {counts[status]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search issues by title, description, or page..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 bg-white focus:border-neutral-400 focus:ring-0 outline-none transition-colors text-sm"
          />
        </div>
      </div>

      {/* Issues List */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
          </div>
        ) : filteredIssues.length === 0 ? (
          <div className="text-center py-20">
            <Bug className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500">No issues found</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredIssues.map((issue) => (
                <motion.div
                  key={issue.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusColor(issue.status)}`}>
                          {issue.status}
                        </span>
                        {getPriorityBadge(issue.priority)}
                      </div>

                      <h3 className="font-semibold text-neutral-900 mb-1">{issue.title}</h3>

                      {issue.description && (
                        <p className="text-sm text-neutral-500 mb-3 line-clamp-2">{issue.description}</p>
                      )}

                      {/* Location */}
                      <div className="flex items-center gap-4 text-xs text-neutral-400">
                        <span className="flex items-center gap-1">
                          <span className="font-medium text-neutral-500">{issue.page_type}</span>
                          {issue.lesson_slug && (
                            <>
                              <span>·</span>
                              <span>{issue.lesson_slug}</span>
                            </>
                          )}
                          {issue.slide_index !== null && (
                            <>
                              <span>·</span>
                              <span>Slide {issue.slide_index + 1}</span>
                            </>
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(issue.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2">
                      {/* Direct Link */}
                      <Link
                        href={issue.direct_link}
                        target="_blank"
                        className="w-9 h-9 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                        title="Open in new tab"
                      >
                        <ExternalLink className="w-4 h-4 text-neutral-600" />
                      </Link>

                      {/* Status Actions */}
                      {issue.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(issue.id, 'fixed')}
                          disabled={actionLoading === issue.id}
                          className="w-9 h-9 rounded-lg bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors disabled:opacity-50"
                          title="Mark as Fixed"
                        >
                          <Check className="w-4 h-4 text-blue-600" />
                        </button>
                      )}

                      {issue.status === 'fixed' && (
                        <>
                          <button
                            onClick={() => toggleFeedback(issue.id, issue.feedback)}
                            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                              issue.feedback || expandedFeedback === issue.id
                                ? 'bg-purple-100 hover:bg-purple-200'
                                : 'bg-neutral-100 hover:bg-neutral-200'
                            }`}
                            title={issue.feedback ? 'View/Edit Feedback' : 'Add Feedback'}
                          >
                            <MessageSquare className={`w-4 h-4 ${issue.feedback || expandedFeedback === issue.id ? 'text-purple-600' : 'text-neutral-600'}`} />
                          </button>
                          <button
                            onClick={() => handleStatusChange(issue.id, 'validated')}
                            disabled={actionLoading === issue.id}
                            className="w-9 h-9 rounded-lg bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors disabled:opacity-50"
                            title="Validate"
                          >
                            <CheckCheck className="w-4 h-4 text-green-600" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(issue.id, 'pending')}
                            disabled={actionLoading === issue.id}
                            className="w-9 h-9 rounded-lg bg-yellow-100 hover:bg-yellow-200 flex items-center justify-center transition-colors disabled:opacity-50"
                            title="Reopen"
                          >
                            <RotateCcw className="w-4 h-4 text-yellow-600" />
                          </button>
                        </>
                      )}

                      {issue.status === 'validated' && (
                        <button
                          onClick={() => handleStatusChange(issue.id, 'pending')}
                          disabled={actionLoading === issue.id}
                          className="w-9 h-9 rounded-lg bg-yellow-100 hover:bg-yellow-200 flex items-center justify-center transition-colors disabled:opacity-50"
                          title="Reopen"
                        >
                          <RotateCcw className="w-4 h-4 text-yellow-600" />
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(issue.id)}
                        disabled={actionLoading === issue.id}
                        className="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>

                  {/* Feedback Panel (for fixed issues) */}
                  {expandedFeedback === issue.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-neutral-100"
                    >
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Feedback on Fix
                      </label>
                      <div className="flex gap-2">
                        <textarea
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          placeholder="Describe what's wrong with this fix or what needs to change..."
                          rows={2}
                          className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-purple-400 focus:ring-0 outline-none transition-colors text-sm resize-none"
                        />
                        <button
                          onClick={() => handleFeedbackSubmit(issue.id)}
                          disabled={actionLoading === issue.id || !feedbackText.trim()}
                          className="px-4 py-2.5 rounded-xl bg-purple-500 text-white hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Save
                        </button>
                      </div>
                      {issue.feedback && (
                        <div className="mt-3 p-3 rounded-lg bg-purple-50 text-sm text-purple-700">
                          <span className="font-medium">Current feedback:</span> {issue.feedback}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Show existing feedback indicator */}
                  {issue.feedback && expandedFeedback !== issue.id && (
                    <div className="mt-3 pt-3 border-t border-neutral-100">
                      <div className="flex items-start gap-2 text-sm text-purple-600">
                        <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <p className="line-clamp-1">{issue.feedback}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
