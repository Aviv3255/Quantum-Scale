'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ListChecks,
  Save,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle,
  Plus,
  Trash2,
  GripVertical,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { coursesData } from '@/data/courses';
import { useChecklistAdmin } from '@/hooks/useChecklist';
import { ChecklistItem } from '@/data/course-checklists';

const ADMIN_EMAILS = ['aviv@lasercro.com', 'admin@quantum-scale.com'];

export default function AdminChecklistsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const courses = Object.values(coursesData).filter((c) => !c.hidden);

  // Check admin access
  useEffect(() => {
    if (!authLoading && (!user || !ADMIN_EMAILS.includes(user.email || ''))) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  // Auto-hide notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
      </div>
    );
  }

  if (!ADMIN_EMAILS.includes(user.email || '')) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="page-wrapper mx-auto max-w-5xl">
        {/* Back Navigation */}
        <Link
          href="/admin/courses"
          className="mb-6 inline-flex items-center gap-2 text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
        >
          <ArrowLeft size={18} />
          Back to Courses Admin
        </Link>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]">
              <ListChecks size={28} className="text-white" />
            </div>
            <div>
              <h1>Course Checklists</h1>
              <p className="mt-1 text-[var(--text-muted)]">
                Manage practical checklists for each course
              </p>
            </div>
          </div>
        </motion.header>

        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-6 flex items-center gap-3 rounded-xl p-4 ${
                notification.type === 'success'
                  ? 'border border-green-200 bg-green-50 text-green-700'
                  : 'border border-red-200 bg-red-50 text-red-700'
              }`}
            >
              {notification.type === 'success' ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              <span>{notification.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Course List */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="mb-4 font-semibold text-[var(--text-primary)]">Select Course</h3>
              <div className="space-y-2">
                {courses.map((course) => (
                  <button
                    key={course.slug}
                    onClick={() => setSelectedCourse(course.slug)}
                    className={`w-full rounded-xl p-3 text-left transition-all ${
                      selectedCourse === course.slug
                        ? 'bg-[var(--primary)] text-white'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[#e5e5e5]'
                    }`}
                  >
                    <p className="truncate text-sm font-medium">{course.title}</p>
                    <p
                      className={`mt-0.5 truncate text-xs ${
                        selectedCourse === course.slug
                          ? 'text-white/70'
                          : 'text-[var(--text-muted)]'
                      }`}
                    >
                      {course.modules.length} modules
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Checklist Editor */}
          <div className="lg:col-span-2">
            {selectedCourse ? (
              <ChecklistEditor courseSlug={selectedCourse} onNotification={setNotification} />
            ) : (
              <div className="card py-16 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--bg-secondary)]">
                  <ListChecks size={32} className="text-[var(--text-muted)]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
                  Select a Course
                </h3>
                <p className="text-[var(--text-muted)]">
                  Choose a course from the list to edit its checklist
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

interface ChecklistEditorProps {
  courseSlug: string;
  onNotification: (notification: { type: 'success' | 'error'; message: string }) => void;
}

function ChecklistEditor({ courseSlug, onNotification }: ChecklistEditorProps) {
  const {
    items,
    isLoading,
    isSaving,
    addItem,
    removeItem,
    moveItem,
    updateItem,
    saveChanges,
    resetToDefaults,
  } = useChecklistAdmin(courseSlug);

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      await saveChanges();
      onNotification({ type: 'success', message: 'Checklist saved successfully!' });
    } catch {
      onNotification({ type: 'error', message: 'Failed to save checklist' });
    }
  };

  const handleAddItem = () => {
    if (!newItemTitle.trim()) return;
    addItem({
      title: newItemTitle.trim(),
      description: newItemDescription.trim() || undefined,
    });
    setNewItemTitle('');
    setNewItemDescription('');
  };

  const handleReset = () => {
    resetToDefaults();
    setShowResetConfirm(false);
    onNotification({ type: 'success', message: 'Reset to default checklist' });
  };

  const courseName = coursesData[courseSlug]?.title || courseSlug;

  if (isLoading) {
    return (
      <div className="card flex items-center justify-center py-16">
        <Loader2 size={32} className="animate-spin text-[var(--text-muted)]" />
      </div>
    );
  }

  return (
    <div className="card">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-[var(--text-primary)]">{courseName}</h3>
          <p className="text-sm text-[var(--text-muted)]">{items.length} checklist items</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="rounded-lg p-2 transition-colors hover:bg-[var(--bg-secondary)]"
            title="Reset to defaults"
          >
            <RotateCcw size={18} className="text-[var(--text-muted)]" />
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Save Changes
          </button>
        </div>
      </div>

      {/* Reset Confirmation */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4"
          >
            <p className="mb-3 text-sm text-amber-800">
              This will reset the checklist to the default items. Unsaved changes will be lost.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="rounded-lg border border-[#ddd] bg-white px-3 py-1.5 text-sm text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-amber-600"
              >
                Reset to Defaults
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Items List */}
      <div className="mb-6 space-y-2">
        {items.map((item, index) => (
          <ChecklistItemEditor
            key={item.id}
            item={item}
            index={index}
            isEditing={editingItem === item.id}
            onStartEdit={() => setEditingItem(item.id)}
            onEndEdit={() => setEditingItem(null)}
            onUpdate={(updates) => updateItem(item.id, updates)}
            onDelete={() => removeItem(item.id)}
            onMoveUp={() => index > 0 && moveItem(index, index - 1)}
            onMoveDown={() => index < items.length - 1 && moveItem(index, index + 1)}
            isFirst={index === 0}
            isLast={index === items.length - 1}
          />
        ))}
      </div>

      {/* Add New Item */}
      <div className="rounded-xl bg-[var(--bg-secondary)] p-4">
        <h4 className="mb-3 font-medium text-[var(--text-primary)]">Add New Item</h4>
        <div className="space-y-3">
          <input
            type="text"
            value={newItemTitle}
            onChange={(e) => setNewItemTitle(e.target.value)}
            placeholder="Item title..."
            className="w-full rounded-xl border border-[#ddd] bg-white px-4 py-2.5 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none"
          />
          <input
            type="text"
            value={newItemDescription}
            onChange={(e) => setNewItemDescription(e.target.value)}
            placeholder="Description (optional)..."
            className="w-full rounded-xl border border-[#ddd] bg-white px-4 py-2.5 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none"
          />
          <button
            onClick={handleAddItem}
            disabled={!newItemTitle.trim()}
            className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Plus size={18} />
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}

interface ChecklistItemEditorProps {
  item: ChecklistItem;
  index: number;
  isEditing: boolean;
  onStartEdit: () => void;
  onEndEdit: () => void;
  onUpdate: (updates: Partial<ChecklistItem>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

function ChecklistItemEditor({
  item,
  index,
  isEditing,
  onStartEdit,
  onEndEdit,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: ChecklistItemEditorProps) {
  const [localTitle, setLocalTitle] = useState(item.title);
  const [localDescription, setLocalDescription] = useState(item.description || '');

  const handleSaveEdit = () => {
    onUpdate({
      title: localTitle.trim(),
      description: localDescription.trim() || undefined,
    });
    onEndEdit();
  };

  const handleCancelEdit = () => {
    setLocalTitle(item.title);
    setLocalDescription(item.description || '');
    onEndEdit();
  };

  return (
    <div className="group flex items-start gap-2 rounded-xl bg-[var(--bg-secondary)] p-3">
      {/* Drag Handle & Order Controls */}
      <div className="flex flex-col items-center gap-0.5 pt-1">
        <button
          onClick={onMoveUp}
          disabled={isFirst}
          className="rounded p-1 transition-colors hover:bg-white disabled:opacity-30"
        >
          <ChevronUp size={14} className="text-[var(--text-muted)]" />
        </button>
        <GripVertical size={16} className="text-[var(--text-muted)]" />
        <button
          onClick={onMoveDown}
          disabled={isLast}
          className="rounded p-1 transition-colors hover:bg-white disabled:opacity-30"
        >
          <ChevronDown size={14} className="text-[var(--text-muted)]" />
        </button>
      </div>

      {/* Index */}
      <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-lg bg-white text-xs font-medium text-[var(--text-primary)]">
        {index + 1}
      </span>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
              autoFocus
            />
            <input
              type="text"
              value={localDescription}
              onChange={(e) => setLocalDescription(e.target.value)}
              placeholder="Description..."
              className="w-full rounded-lg border border-[#ddd] bg-white px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveEdit}
                className="rounded-lg bg-[var(--primary)] px-3 py-1.5 text-sm text-white transition-opacity hover:opacity-90"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="rounded-lg border border-[#ddd] bg-white px-3 py-1.5 text-sm text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div onClick={onStartEdit} className="cursor-pointer">
            <p className="text-sm font-medium text-[var(--text-primary)]">{item.title}</p>
            {item.description && (
              <p className="mt-0.5 text-xs text-[var(--text-muted)]">{item.description}</p>
            )}
          </div>
        )}
      </div>

      {/* Delete */}
      {!isEditing && (
        <button
          onClick={onDelete}
          className="rounded-lg p-2 opacity-0 transition-all hover:bg-red-100 group-hover:opacity-100"
        >
          <Trash2 size={16} className="text-red-500" />
        </button>
      )}
    </div>
  );
}
