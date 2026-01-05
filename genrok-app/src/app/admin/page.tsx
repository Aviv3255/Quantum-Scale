'use client';

import Link from 'next/link';
import {
  MessageSquare,
  BookOpen,
  CheckSquare,
  Code,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

const adminSections = [
  {
    title: 'Feature Requests',
    description: 'View and manage user feature requests',
    href: '/admin/feature-requests',
    icon: MessageSquare,
  },
  {
    title: 'Courses',
    description: 'Manage course content and settings',
    href: '/admin/courses',
    icon: BookOpen,
  },
  {
    title: 'Checklists',
    description: 'Manage checklist items',
    href: '/admin/checklists',
    icon: CheckSquare,
  },
  {
    title: 'HTML Blocks',
    description: 'Edit HTML content blocks',
    href: '/admin/html-blocks',
    icon: Code,
  },
  {
    title: 'Issues',
    description: 'View reported issues',
    href: '/admin/issues',
    icon: AlertCircle,
  },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">Admin Dashboard</h1>
          <p className="text-[#86868B]">Manage your platform settings and content</p>
        </div>

        {/* Admin Sections Grid */}
        <div className="grid gap-4">
          {adminSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group flex items-center justify-between p-6 bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                  <section.icon className="w-6 h-6 text-neutral-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#1D1D1F] group-hover:text-black">
                    {section.title}
                  </h2>
                  <p className="text-sm text-[#86868B]">{section.description}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-600 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>

        {/* Back to Dashboard */}
        <div className="mt-10 pt-6 border-t border-neutral-200">
          <Link
            href="/dashboard"
            className="text-sm text-[#86868B] hover:text-[#1D1D1F] transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
