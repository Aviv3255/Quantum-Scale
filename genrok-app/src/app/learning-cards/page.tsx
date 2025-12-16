import type { Metadata } from 'next';
import { Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Learning Cards | Quantum Scale',
  description: 'Quick reference cards for key eCommerce concepts',
};

export default function LearningCardsPage() {
  return (
    <div className="main-content">
      <div className="page-wrapper">
        <div className="page-header">
          <div className="flex items-center gap-3">
            <Layers size={32} className="text-[var(--primary)]" strokeWidth={1.5} />
            <h1>Learning Cards</h1>
          </div>
          <p className="mt-2">Quick reference cards for key eCommerce concepts</p>
        </div>
        <div className="page-body">
          <div className="card text-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-6">
              <Layers size={40} className="text-[var(--text-muted)]" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Coming Soon
            </h2>
            <p className="text-[var(--text-muted)] max-w-md mx-auto">
              We&apos;re creating bite-sized learning cards to help you quickly master key eCommerce concepts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
