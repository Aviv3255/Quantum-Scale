'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Maximize2, Minimize2 } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Lesson metadata for the 4 interactive lessons
const lessonMeta: Record<string, { title: string; description: string }> = {
  'familiar-surprise-secret': {
    title: 'The Familiar Surprise Secret',
    description: 'Master the MAYA principle - Most Advanced Yet Acceptable',
  },
  'red-button-effect': {
    title: 'The Red Button Effect',
    description: 'Understanding psychological reactance and forbidden desire',
  },
  'fred-method': {
    title: 'The F.R.E.D. Method',
    description: 'A framework for understanding audience psychology',
  },
  'emotion-decides': {
    title: 'Emotion Decides, Logic Justifies',
    description: 'How emotions drive purchasing decisions',
  },
};

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const { user, isLoading } = useAuthStore();
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Derive lesson data from slug - no need for state
  const lesson = useMemo(() => lessonMeta[slug], [slug]);
  const lessonExists = Boolean(lesson);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!lessonExists) {
    return (
      <DashboardLayout>
        <div className="page-wrapper">
          <div className="empty-state">
            <h3>Lesson not found</h3>
            <p>The lesson you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/learn" className="btn btn-primary mt-4">
              Back to Learning Center
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const lessonUrl = `/lessons/${slug}/lesson.html`;

  return (
    <DashboardLayout>
      <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'page-wrapper'}`}>
        {/* Header */}
        <header className={`flex items-center justify-between gap-4 ${isFullscreen ? 'p-4 border-b border-[var(--border-light)]' : 'mb-6'}`}>
          <div className="flex items-center gap-4">
            <Link
              href="/learn"
              className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Learning Center
            </Link>
            <span className="text-[var(--text-tertiary)]">/</span>
            <div>
              <h1 className="text-lg font-semibold text-[var(--text-primary)]">{lesson.title}</h1>
              <p className="text-sm text-[var(--text-muted)]">{lesson.description}</p>
            </div>
          </div>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
          >
            {isFullscreen ? (
              <>
                <Minimize2 size={16} />
                Exit Fullscreen
              </>
            ) : (
              <>
                <Maximize2 size={16} />
                Fullscreen
              </>
            )}
          </button>
        </header>

        {/* Lesson Content */}
        <div
          className={`rounded-xl overflow-hidden border border-[var(--border-light)] bg-white ${
            isFullscreen ? 'h-[calc(100vh-80px)]' : 'h-[calc(100vh-200px)]'
          }`}
        >
          <iframe
            src={lessonUrl}
            className="w-full h-full border-0"
            title={lesson.title}
            allow="fullscreen"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
