import type { Metadata } from 'next';
import { Image } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Image Ads | Quantum Scale',
  description: 'Create stunning product images with AI for your ads',
};

export default function AIImageAdsPage() {
  return (
    <div className="main-content">
      <div className="page-wrapper">
        <div className="page-header">
          <div className="flex items-center gap-3">
            <Image size={32} className="text-[var(--primary)]" strokeWidth={1.5} />
            <h1>AI Image Ads</h1>
          </div>
          <p className="mt-2">Create stunning product images with AI for your ads</p>
        </div>
        <div className="page-body">
          <div className="card text-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-6">
              <Image size={40} className="text-[var(--text-muted)]" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Coming Soon
            </h2>
            <p className="text-[var(--text-muted)] max-w-md mx-auto">
              We&apos;re building AI-powered tools to help you create stunning product images for your advertising campaigns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
