import type { Metadata } from 'next';
import { Podcast } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Quantum Podcast | Quantum Scale',
  description: 'Listen to insights from successful eCommerce entrepreneurs',
};

export default function PodcastPage() {
  return (
    <div className="main-content">
      <div className="page-wrapper">
        <div className="page-header">
          <div className="flex items-center gap-3">
            <Podcast size={32} className="text-[var(--primary)]" strokeWidth={1.5} />
            <h1>The Quantum Podcast</h1>
          </div>
          <p className="mt-2">Insights from successful eCommerce entrepreneurs</p>
        </div>
        <div className="page-body">
          <div className="card text-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-6">
              <Podcast size={40} className="text-[var(--text-muted)]" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Coming Soon
            </h2>
            <p className="text-[var(--text-muted)] max-w-md mx-auto">
              We&apos;re preparing exclusive podcast episodes with successful entrepreneurs to help you scale your business.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
