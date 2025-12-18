'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Maximize2, Minimize2 } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getUserProfile } from '@/lib/supabase';

// Lesson metadata for all interactive lessons
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
  'gatekeeper-method': {
    title: 'The Gatekeeper Method',
    description: 'Four moves to bypass the brain\'s attention filter',
  },
  'three-second-rule': {
    title: 'The 3-Second Rule',
    description: 'The critical window to capture attention before they scroll',
  },
  'science-of-selling': {
    title: 'The Science of Selling',
    description: 'The systematic, scientific approach to conversion',
  },
  'persuasion-blueprint': {
    title: 'The Persuasion Blueprint',
    description: 'The master architectural plan for influential copy',
  },
  'persuasion-stack': {
    title: 'The Persuasion Stack',
    description: 'Layered persuasion techniques building upon each other',
  },
  'architecture-of-influence': {
    title: 'Architecture of Influence',
    description: 'The structural framework of persuasive communication',
  },
  'wiifm-principle': {
    title: 'The WIIFM Principle',
    description: 'What\'s In It For Me - The only question your reader is asking',
  },
  'three-canons-of-craft': {
    title: 'The Three Canons of Craft',
    description: 'Three tests every sentence must pass',
  },
  'cpppb-proof-loop': {
    title: 'The CPPPB Proof Loop',
    description: 'Five-element framework for bulletproof persuasion',
  },
  'damaging-admission': {
    title: 'The Damaging Admission',
    description: 'Why revealing weakness makes strengths believable',
  },
  'emotional-precision': {
    title: 'Emotional Precision',
    description: 'Target precise emotions that drive action',
  },
  'blind-spot-effect': {
    title: 'The Blind Spot Effect',
    description: 'What your prospects can\'t see about themselves',
  },
  'customer-voice-mining': {
    title: 'Voice of Customer Mining',
    description: 'Extract the exact words your customers use',
  },
  'double-bind-of-fear': {
    title: 'The Double Bind of Fear',
    description: 'Leverage both action and inaction fears',
  },
  'emotion-spectrum': {
    title: 'The Emotion Spectrum',
    description: 'Map the full range of persuasive emotions',
  },
  'forty-forty-twenty-rule': {
    title: 'The 40/40/20 Rule',
    description: 'The marketing success formula that never fails',
  },
  'four-primal-needs': {
    title: 'The Four Primal Needs',
    description: 'The deep drivers behind every purchase',
  },
  'ocpb-formula': {
    title: 'The OCPB Formula',
    description: 'Offer, Copy, Proof, Bonus - the conversion stack',
  },
  'sales-message-anatomy': {
    title: 'Sales Message Anatomy',
    description: 'Dissect what makes sales copy convert',
  },
  'self-persuasion-architecture': {
    title: 'Self-Persuasion Architecture',
    description: 'Let prospects convince themselves to buy',
  },
  'structural-tension': {
    title: 'Structural Tension',
    description: 'Create irresistible forward momentum in copy',
  },
  'three-growth-levers': {
    title: 'The Three Growth Levers',
    description: 'Customers, frequency, transaction size - pull all three',
  },
  'three-levels-of-change': {
    title: 'The Three Levels of Change',
    description: 'Transform behavior, beliefs, and identity',
  },
  'trust-architecture': {
    title: 'The Trust Architecture',
    description: 'Build unshakeable credibility systematically',
  },
  'unique-mechanism': {
    title: 'The Unique Mechanism',
    description: 'The proprietary reason your solution works',
  },
  'master-key-framework': {
    title: 'The Master Key Framework',
    description: 'First-principles guide to copy that converts',
  },
  'rule-of-one': {
    title: 'The Rule of One',
    description: 'One reader, one idea, one offer, one action',
  },
  'architecture-of-belief': {
    title: 'The Architecture of Belief',
    description: 'Three levels of mastery: hook, strategy, psychology',
  },
  'copywriters-codex': {
    title: 'The Copywriter\'s Codex',
    description: 'A synthesized playbook from the masters',
  },
};

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const { user, isLoading } = useAuthStore();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [userName, setUserName] = useState<string>('Builder');

  // Derive lesson data from slug - no need for state
  const lesson = useMemo(() => lessonMeta[slug], [slug]);
  const lessonExists = Boolean(lesson);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Fetch user's name from profile or user metadata
  useEffect(() => {
    const fetchUserName = async () => {
      if (!user) return;

      // First try user_metadata
      const metaName = user.user_metadata?.full_name;
      if (metaName) {
        setUserName(metaName.split(' ')[0]);
        return;
      }

      // Fallback to profile
      const { data: profile } = await getUserProfile(user.id);
      if (profile?.full_name) {
        setUserName(profile.full_name.split(' ')[0]);
      }
    };

    fetchUserName();
  }, [user]);

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

  // Pass user's first name to the lesson via URL param
  const lessonUrl = `/lessons/${slug}/lesson.html?userName=${encodeURIComponent(userName)}`;

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
