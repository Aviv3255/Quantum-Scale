'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bug,
  Check,
  Clock,
  Filter,
  RefreshCw,
  Trash2,
  X,
  AlertCircle,
  CheckCircle2,
  Moon,
  Sun,
} from 'lucide-react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { supabase } from '@/lib/supabase';

interface BugReport {
  id: string;
  component_id: string;
  component_name: string;
  component_category: string;
  description: string;
  variant_mode: 'dark' | 'light';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  resolution: string | null;
  created_at: string;
  updated_at: string | null;
  resolved_at: string | null;
}

const STATUS_COLORS = {
  open: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle },
  in_progress: { bg: 'bg-amber-100', text: 'text-amber-700', icon: Clock },
  resolved: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2 },
  closed: { bg: 'bg-gray-100', text: 'text-gray-700', icon: X },
};

const PRIORITY_COLORS = {
  low: 'bg-blue-100 text-blue-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-700',
};

export default function BugReportsPage() {
  const [bugs, setBugs] = useState<BugReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'open' | 'in_progress' | 'resolved' | 'closed'>('all');
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchBugs = async () => {
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('component_bugs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBugs(data || []);
    } catch (error) {
      console.error('Error fetching bugs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const updateStatus = async (bugId: string, newStatus: BugReport['status']) => {
    setUpdating(bugId);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from('component_bugs')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
          resolved_at: newStatus === 'resolved' ? new Date().toISOString() : null,
        })
        .eq('id', bugId);

      setBugs(bugs.map(bug =>
        bug.id === bugId
          ? { ...bug, status: newStatus, updated_at: new Date().toISOString() }
          : bug
      ));
    } catch (error) {
      console.error('Error updating bug:', error);
    } finally {
      setUpdating(null);
    }
  };

  const deleteBug = async (bugId: string) => {
    if (!confirm('Are you sure you want to delete this bug report?')) return;

    setUpdating(bugId);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from('component_bugs')
        .delete()
        .eq('id', bugId);

      setBugs(bugs.filter(bug => bug.id !== bugId));
    } catch (error) {
      console.error('Error deleting bug:', error);
    } finally {
      setUpdating(null);
    }
  };

  const filteredBugs = filter === 'all' ? bugs : bugs.filter(bug => bug.status === filter);

  const stats = {
    total: bugs.length,
    open: bugs.filter(b => b.status === 'open').length,
    inProgress: bugs.filter(b => b.status === 'in_progress').length,
    resolved: bugs.filter(b => b.status === 'resolved').length,
  };

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Link
              href="/admin/lesson-studio"
              className="p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
            >
              <X size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-black flex items-center gap-2">
                <Bug size={24} className="text-red-500" />
                Component Bug Reports
              </h1>
              <p className="text-sm text-[var(--text-muted)]">
                Track and manage reported issues in lesson components
              </p>
            </div>
          </div>
          <button
            onClick={fetchBugs}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </motion.header>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total', value: stats.total, color: '#000' },
            { label: 'Open', value: stats.open, color: '#EF4444' },
            { label: 'In Progress', value: stats.inProgress, color: '#F59E0B' },
            { label: 'Resolved', value: stats.resolved, color: '#22C55E' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-4 border border-[#E5E5E5]">
              <div className="text-2xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-2 mb-6"
        >
          <Filter size={16} className="text-[var(--text-muted)]" />
          {(['all', 'open', 'in_progress', 'resolved', 'closed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-black text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              {status === 'all' ? 'All' : status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </motion.div>

        {/* Bug List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw size={32} className="animate-spin text-[var(--text-muted)]" />
          </div>
        ) : filteredBugs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <CheckCircle2 size={48} className="mx-auto text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-black mb-2">
              {filter === 'all' ? 'No bugs reported yet' : `No ${filter.replace('_', ' ')} bugs`}
            </h3>
            <p className="text-sm text-[var(--text-muted)]">
              {filter === 'all'
                ? 'Bug reports will appear here when users report issues'
                : 'Try a different filter or check back later'
              }
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <AnimatePresence>
              {filteredBugs.map((bug, index) => {
                const StatusIcon = STATUS_COLORS[bug.status].icon;
                return (
                  <motion.div
                    key={bug.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl border border-[#E5E5E5] p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Link
                            href={`/admin/lesson-studio/components?view=${bug.component_id}`}
                            className="font-semibold text-black hover:text-[#88da1c] transition-colors"
                          >
                            {bug.component_name}
                          </Link>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[bug.status].bg} ${STATUS_COLORS[bug.status].text}`}>
                            <StatusIcon size={12} className="inline mr-1" />
                            {bug.status.replace('_', ' ')}
                          </span>
                          <span className="px-2 py-0.5 rounded text-xs bg-[var(--bg-secondary)] text-[var(--text-muted)]">
                            {bug.component_category}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 ${bug.variant_mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'}`}>
                            {bug.variant_mode === 'dark' ? <Moon size={10} /> : <Sun size={10} />}
                            {bug.variant_mode}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] mb-3">
                          {bug.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                          <span>
                            Reported: {new Date(bug.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          {bug.resolved_at && (
                            <span className="text-green-600">
                              Resolved: {new Date(bug.resolved_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {bug.status !== 'resolved' && bug.status !== 'closed' && (
                          <>
                            {bug.status === 'open' && (
                              <button
                                onClick={() => updateStatus(bug.id, 'in_progress')}
                                disabled={updating === bug.id}
                                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors disabled:opacity-50"
                              >
                                <Clock size={14} className="inline mr-1" />
                                Start
                              </button>
                            )}
                            <button
                              onClick={() => updateStatus(bug.id, 'resolved')}
                              disabled={updating === bug.id}
                              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-colors disabled:opacity-50"
                            >
                              <Check size={14} className="inline mr-1" />
                              Resolve
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => deleteBug(bug.id)}
                          disabled={updating === bug.id}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
