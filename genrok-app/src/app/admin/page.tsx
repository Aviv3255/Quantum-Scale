'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ImageIcon,
  GraduationCap,
  FileText,
  AlertCircle,
  CheckSquare,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

const adminSections = [
  {
    title: 'Lesson Thumbnails',
    description: 'Upload and manage thumbnails for interactive lessons',
    href: '/admin/lesson-thumbnails',
    icon: ImageIcon,
    color: '#8b5cf6',
    badge: 'NEW',
  },
  {
    title: 'Course Management',
    description: 'Upload and manage course PDF files',
    href: '/admin/courses',
    icon: GraduationCap,
    color: '#3b82f6',
  },
  {
    title: 'HTML Blocks',
    description: 'Manage reusable HTML content blocks',
    href: '/admin/html-blocks',
    icon: FileText,
    color: '#10b981',
  },
  {
    title: 'Issue Tracker',
    description: 'View and manage reported issues',
    href: '/admin/issues',
    icon: AlertCircle,
    color: '#ef4444',
  },
  {
    title: 'Checklists',
    description: 'Manage checklist templates',
    href: '/admin/checklists',
    icon: CheckSquare,
    color: '#f59e0b',
  },
];

export default function AdminPage() {
  const { user, isLoading: authLoading } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Admin email check
  const ADMIN_EMAILS = ['admin@quantum-scale.co', 'aviv32552@gmail.com'];
  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email);

  if (!mounted || authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <DashboardLayout>
        <div className="page-wrapper">
          <div className="card text-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={40} className="text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Access Denied</h2>
            <p className="text-[var(--text-muted)]">
              You don&apos;t have permission to access this page.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header"
        >
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1>Admin Dashboard</h1>
              <p className="mt-1">Manage content, courses, and system settings</p>
            </div>
          </div>
        </motion.header>

        {/* Admin Sections Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {adminSections.map((section, index) => (
            <motion.div
              key={section.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Link
                href={section.href}
                className="card card-hover group block relative overflow-hidden"
              >
                {section.badge && (
                  <span className="absolute top-4 right-4 px-2 py-1 text-xs font-bold rounded-full bg-[var(--primary)] text-white">
                    {section.badge}
                  </span>
                )}

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${section.color}15` }}
                >
                  <section.icon size={28} style={{ color: section.color }} />
                </div>

                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                  {section.title}
                </h3>

                <p className="text-sm text-[var(--text-muted)] mb-4">
                  {section.description}
                </p>

                <div className="flex items-center gap-1 text-sm font-medium text-[var(--primary)] group-hover:gap-2 transition-all">
                  Open
                  <ArrowRight size={16} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
