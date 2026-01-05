'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb,
  Check,
  X,
  Trash2,
  Clock,
  Search,
  ArrowLeft,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';
import { getFeatureRequests, updateFeatureRequestStatus } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';

interface FeatureRequest {
  id: string;
  user_id: string | null;
  user_email: string;
  title: string;
  description: string | null;
  category: string;
  status: string;
  created_at: string;
}

type StatusFilter = 'all' | 'pending' | 'reviewed' | 'implemented' | 'rejected';

const CATEGORY_LABELS: Record<string, string> = {
  new_feature: 'New Feature',
  ui_ux: 'UI/UX',
  bug_fix: 'Bug Fix',
  content: 'Content',
  other: 'Other',
};

export default function AdminFeatureRequestsPage() {
  const [requests, setRequests] = useState<FeatureRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Fetch requests
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getFeatureRequests();
      setRequests(data || []);
    } catch (err) {
      console.error('Error fetching feature requests:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter by status and search
  const filteredRequests = requests.filter((req) => {
    if (statusFilter !== 'all' && req.status !== statusFilter) return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      req.title.toLowerCase().includes(query) ||
      (req.description && req.description.toLowerCase().includes(query)) ||
      req.user_email.toLowerCase().includes(query)
    );
  });

  // Count by status
  const counts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === 'pending').length,
    reviewed: requests.filter((r) => r.status === 'reviewed').length,
    implemented: requests.filter((r) => r.status === 'implemented').length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
  };

  // Handle status change
  const handleStatusChange = async (id: string, newStatus: string) => {
    setActionLoading(id);
    try {
      await updateFeatureRequestStatus(id, newStatus);
      await fetchData();
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setActionLoading(null);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this request?')) return;
    setActionLoading(id);
    try {
      await supabase.from('feature_requests').delete().eq('id', id);
      await fetchData();
    } catch (err) {
      console.error('Error deleting request:', err);
    } finally {
      setActionLoading(null);
    }
  };

  // Status badge colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'reviewed':
        return 'bg-blue-100 text-blue-700';
      case 'implemented':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  // Category badge colors
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'new_feature':
        return 'bg-purple-100 text-purple-700';
      case 'ui_ux':
        return 'bg-pink-100 text-pink-700';
      case 'bug_fix':
        return 'bg-orange-100 text-orange-700';
      case 'content':
        return 'bg-cyan-100 text-cyan-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
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
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-neutral-900">Feature Requests</h1>
              <p className="text-neutral-500 text-sm">Review user-submitted feature ideas</p>
            </div>
            <button
              onClick={fetchData}
              disabled={isLoading}
              className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 text-neutral-600 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Status Tabs */}
          <div className="flex gap-2 flex-wrap">
            {(['all', 'pending', 'reviewed', 'implemented', 'rejected'] as const).map((status) => (
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
            placeholder="Search by title, description, or email..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 bg-white focus:border-neutral-400 focus:ring-0 outline-none transition-colors text-sm"
          />
        </div>
      </div>

      {/* Requests List */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-20">
            <Lightbulb className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500">No feature requests found</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredRequests.map((req) => (
                <motion.div
                  key={req.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getCategoryColor(req.category)}`}>
                          {CATEGORY_LABELS[req.category] || req.category}
                        </span>
                      </div>

                      <h3 className="font-semibold text-neutral-900 mb-1">{req.title}</h3>

                      {req.description && (
                        <p className="text-sm text-neutral-500 mb-3">{req.description}</p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-neutral-400">
                        <span>{req.user_email}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(req.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2">
                      {/* Status Actions */}
                      {req.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(req.id, 'reviewed')}
                            disabled={actionLoading === req.id}
                            className="w-9 h-9 rounded-lg bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors disabled:opacity-50"
                            title="Mark as Reviewed"
                          >
                            <Check className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(req.id, 'rejected')}
                            disabled={actionLoading === req.id}
                            className="w-9 h-9 rounded-lg bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors disabled:opacity-50"
                            title="Reject"
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </button>
                        </>
                      )}

                      {req.status === 'reviewed' && (
                        <button
                          onClick={() => handleStatusChange(req.id, 'implemented')}
                          disabled={actionLoading === req.id}
                          className="w-9 h-9 rounded-lg bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors disabled:opacity-50"
                          title="Mark as Implemented"
                        >
                          <Check className="w-4 h-4 text-green-600" />
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(req.id)}
                        disabled={actionLoading === req.id}
                        className="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
