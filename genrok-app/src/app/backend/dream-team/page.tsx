import type { Metadata } from 'next';
import { Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dream Team | Quantum Scale',
  description: 'Build your dream team with our vetted freelancers and agencies',
};

export default function DreamTeamPage() {
  return (
    <div className="main-content">
      <div className="page-wrapper">
        <div className="page-header">
          <div className="flex items-center gap-3">
            <Users size={32} className="text-[var(--primary)]" strokeWidth={1.5} />
            <h1>Dream Team</h1>
          </div>
          <p className="mt-2">Build your dream team with our vetted freelancers and agencies</p>
        </div>
        <div className="page-body">
          <div className="card text-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-6">
              <Users size={40} className="text-[var(--text-muted)]" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Coming Soon
            </h2>
            <p className="text-[var(--text-muted)] max-w-md mx-auto">
              We&apos;re working on bringing you access to vetted freelancers and agencies to help scale your business.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
