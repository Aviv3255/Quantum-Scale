'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, X, Edit2, Trash2, Plus, Loader2, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  getPendingPollRequests,
  getAllPollRequests,
  updatePollRequest,
  deletePollRequest,
  PollRequest
} from '@/lib/supabase';

const ADMIN_EMAILS = ['aviv32552@gmail.com', 'avivgoldstein32@gmail.com', 'admin@quantumscale.com'];

export default function PollRequestsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const [requests, setRequests] = useState<PollRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'pending' | 'all'>('pending');
  const [editingRequest, setEditingRequest] = useState<PollRequest | null>(null);
  const [editQuestion, setEditQuestion] = useState('');
  const [editOptions, setEditOptions] = useState<string[]>([]);
  const [editButtons, setEditButtons] = useState<{ text: string; url: string }[]>([]);
  const [processing, setProcessing] = useState<string | null>(null);

  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email);

  useEffect(() => {
    // Wait for auth to complete
    if (authLoading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    if (!isAdmin) {
      router.push('/data-center');
    }
  }, [user, authLoading, isAdmin, router]);

  useEffect(() => {
    const loadRequests = async () => {
      if (!isAdmin) return;
      setLoading(true);
      try {
        const result = filter === 'pending'
          ? await getPendingPollRequests()
          : await getAllPollRequests();
        if (result.data) {
          setRequests(result.data);
        }
      } catch (e) {
        console.error('Error loading poll requests:', e);
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      loadRequests();
    }
  }, [isAdmin, filter]);

  const handleApprove = async (request: PollRequest) => {
    if (!user) return;
    setProcessing(request.id);
    try {
      await updatePollRequest(request.id, {
        status: 'approved',
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString()
      });
      setRequests(prev => prev.filter(r => r.id !== request.id));
    } catch (e) {
      console.error('Error approving poll:', e);
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (request: PollRequest) => {
    if (!user) return;
    setProcessing(request.id);
    try {
      await updatePollRequest(request.id, {
        status: 'rejected',
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString()
      });
      setRequests(prev => prev.filter(r => r.id !== request.id));
    } catch (e) {
      console.error('Error rejecting poll:', e);
    } finally {
      setProcessing(null);
    }
  };

  const handleDelete = async (request: PollRequest) => {
    if (!confirm('Are you sure you want to delete this poll request?')) return;
    setProcessing(request.id);
    try {
      await deletePollRequest(request.id);
      setRequests(prev => prev.filter(r => r.id !== request.id));
    } catch (e) {
      console.error('Error deleting poll:', e);
    } finally {
      setProcessing(null);
    }
  };

  const startEditing = (request: PollRequest) => {
    setEditingRequest(request);
    setEditQuestion(request.question);
    const options = Array.isArray(request.options)
      ? request.options.map((o: { text: string }) => o.text)
      : JSON.parse(request.options as unknown as string).map((o: { text: string }) => o.text);
    setEditOptions(options);
    const buttons = request.buttons
      ? (Array.isArray(request.buttons) ? request.buttons : JSON.parse(request.buttons as unknown as string))
      : [];
    setEditButtons(buttons);
  };

  const saveEdit = async () => {
    if (!editingRequest || !user) return;
    setProcessing(editingRequest.id);
    try {
      const validOptions = editOptions.filter(o => o.trim()).map(text => ({ text: text.trim() }));
      const validButtons = editButtons.filter(b => b.text.trim() && b.url.trim());

      await updatePollRequest(editingRequest.id, {
        question: editQuestion.trim(),
        options: validOptions,
        buttons: validButtons.length > 0 ? validButtons : undefined,
        status: 'approved',
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString()
      });

      setRequests(prev => prev.filter(r => r.id !== editingRequest.id));
      setEditingRequest(null);
    } catch (e) {
      console.error('Error saving poll:', e);
    } finally {
      setProcessing(null);
    }
  };

  const addButton = () => {
    setEditButtons([...editButtons, { text: '', url: '' }]);
  };

  const removeButton = (index: number) => {
    setEditButtons(editButtons.filter((_, i) => i !== index));
  };

  const updateButton = (index: number, field: 'text' | 'url', value: string) => {
    const newButtons = [...editButtons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    setEditButtons(newButtons);
  };

  if (authLoading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        <header className="page-header">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.push('/data-center')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1>Poll Requests</h1>
              <p>Review and approve user-submitted polls</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'pending'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-gray-200'
              }`}
            >
              All Requests
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--text-muted)]" />
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-[var(--text-muted)]">
              {filter === 'pending' ? 'No pending poll requests' : 'No poll requests found'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        request.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : request.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">
                        {new Date(request.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                      {request.question}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(Array.isArray(request.options)
                        ? request.options
                        : JSON.parse(request.options as unknown as string)
                      ).map((option: { text: string }, i: number) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[var(--bg-secondary)] rounded-full text-sm text-[var(--text-secondary)]"
                        >
                          {option.text}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-[var(--text-muted)]">
                      Submitted by: {request.submitted_by_email || request.submitted_by_name || 'Unknown'}
                    </p>
                  </div>

                  {request.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      {processing === request.id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <button
                            onClick={() => startEditing(request)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit & Approve"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleApprove(request)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <Check size={18} />
                          </button>
                          <button
                            onClick={() => handleReject(request)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <X size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(request)}
                            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editingRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Edit & Approve Poll</h3>
                <button
                  onClick={() => setEditingRequest(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Question
                  </label>
                  <input
                    type="text"
                    value={editQuestion}
                    onChange={(e) => setEditQuestion(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-[var(--bg-secondary)] border border-[var(--border-light)] focus:border-[var(--primary)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Options
                  </label>
                  <div className="space-y-2">
                    {editOptions.map((option, i) => (
                      <input
                        key={i}
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...editOptions];
                          newOptions[i] = e.target.value;
                          setEditOptions(newOptions);
                        }}
                        className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--bg-secondary)] border border-[var(--border-light)] focus:border-[var(--primary)] focus:outline-none"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    CTA Buttons (Optional)
                  </label>
                  <div className="space-y-3">
                    {editButtons.map((button, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          type="text"
                          value={button.text}
                          onChange={(e) => updateButton(i, 'text', e.target.value)}
                          placeholder="Button text"
                          className="flex-1 px-3 py-2 rounded-lg text-sm bg-[var(--bg-secondary)] border border-[var(--border-light)] focus:border-[var(--primary)] focus:outline-none"
                        />
                        <input
                          type="text"
                          value={button.url}
                          onChange={(e) => updateButton(i, 'url', e.target.value)}
                          placeholder="URL"
                          className="flex-1 px-3 py-2 rounded-lg text-sm bg-[var(--bg-secondary)] border border-[var(--border-light)] focus:border-[var(--primary)] focus:outline-none"
                        />
                        <button
                          onClick={() => removeButton(i)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={addButton}
                    className="mt-2 text-sm text-[var(--info)] hover:underline flex items-center gap-1"
                  >
                    <Plus size={14} /> Add CTA button
                  </button>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setEditingRequest(null)}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  disabled={processing === editingRequest.id}
                  className="btn btn-primary flex-1"
                >
                  {processing === editingRequest.id ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save & Approve'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
