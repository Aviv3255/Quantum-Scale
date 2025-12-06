'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Camera, Palette, Sparkles, ExternalLink, Check } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

const imageCategories = [
  {
    id: 1,
    name: 'Product Photography',
    description: 'Clean, professional product shots that sell. White backgrounds, lifestyle contexts, and detail shots.',
    icon: Camera,
    tips: [
      'Use natural lighting or softboxes',
      'Shoot multiple angles (minimum 5-6)',
      'Include scale reference objects',
      'Show product in use/context',
      'Capture texture and material details',
    ],
    resources: [
      { name: 'Unsplash', url: 'https://unsplash.com', description: 'Free high-res photos' },
      { name: 'Pexels', url: 'https://pexels.com', description: 'Free stock photos' },
      { name: 'Burst by Shopify', url: 'https://burst.shopify.com', description: 'Free eCommerce photos' },
    ],
  },
  {
    id: 2,
    name: 'Lifestyle Imagery',
    description: 'Show your products in real-life situations. Help customers imagine owning and using your products.',
    icon: Sparkles,
    tips: [
      'Feature diverse, relatable models',
      'Match your target audience aesthetic',
      'Use aspirational but achievable settings',
      'Include candid, natural moments',
      'Show the outcome/benefit, not just the product',
    ],
    resources: [
      { name: 'Moose Photos', url: 'https://photos.icons8.com', description: 'Diverse lifestyle photos' },
      { name: 'Nappy', url: 'https://nappy.co', description: 'Black & brown lifestyle' },
      { name: 'Reshot', url: 'https://reshot.com', description: 'Unique free photos' },
    ],
  },
  {
    id: 3,
    name: 'Color Palettes',
    description: 'Cohesive brand colors that evoke the right emotions. Color psychology drives buying decisions.',
    icon: Palette,
    tips: [
      'Limit to 3-5 core brand colors',
      'Use contrast for CTAs (orange/green work best)',
      'Consider cultural color meanings',
      'Test colors with your target audience',
      'Ensure accessibility (WCAG compliance)',
    ],
    palettes: [
      { name: 'Trust & Calm', colors: ['#1a365d', '#2c5282', '#4299e1', '#bee3f8'] },
      { name: 'Energy & Action', colors: ['#c53030', '#e53e3e', '#fc8181', '#feb2b2'] },
      { name: 'Growth & Nature', colors: ['#22543d', '#2f855a', '#48bb78', '#c6f6d5'] },
      { name: 'Luxury & Premium', colors: ['#1a202c', '#2d3748', '#4a5568', '#a0aec0'] },
    ],
    resources: [
      { name: 'Coolors', url: 'https://coolors.co', description: 'Palette generator' },
      { name: 'Color Hunt', url: 'https://colorhunt.co', description: 'Curated palettes' },
      { name: 'Adobe Color', url: 'https://color.adobe.com', description: 'Color wheel tool' },
    ],
  },
  {
    id: 4,
    name: 'UGC & Social Proof',
    description: 'User-generated content builds trust faster than any professional photo. Real customers, real results.',
    icon: ImageIcon,
    tips: [
      'Encourage customers to share with hashtags',
      'Offer incentives for photo reviews',
      'Curate the best content for your site',
      'Always ask permission before using',
      'Mix UGC with professional photos',
    ],
    resources: [
      { name: 'Loox', url: 'https://loox.app', description: 'Photo reviews for Shopify' },
      { name: 'Stamped.io', url: 'https://stamped.io', description: 'Reviews & UGC' },
      { name: 'Yotpo', url: 'https://yotpo.com', description: 'UGC platform' },
    ],
  },
];

const photoTips = [
  {
    title: 'The 5-Second Rule',
    description: 'Your hero image has 5 seconds to communicate what you sell and why it matters. Make it count.',
  },
  {
    title: 'Mobile First',
    description: '70%+ of visitors are on mobile. Test how your images look on a small screen.',
  },
  {
    title: 'Speed Matters',
    description: 'Compress images without losing quality. Slow loading = lost sales.',
  },
  {
    title: 'Consistency Wins',
    description: 'Use the same style, lighting, and editing across all product photos for a premium feel.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ImagesPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full" />
      </div>
    );
  }

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Page Header */}
        <header className="page-header">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1>Visual Brand Building</h1>
              <p>Great product photos are your #1 conversion driver</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-gold-bg)]">
              <ImageIcon size={16} className="text-[var(--accent-gold)]" strokeWidth={1.5} />
              <span className="text-sm font-medium text-[var(--accent-gold)]">Brand Imagery</span>
            </div>
          </div>
        </header>

        {/* Quick Tips */}
        <section className="grid md:grid-cols-4 gap-4 mb-8">
          {photoTips.map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card"
            >
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">{tip.title}</h3>
              <p className="text-sm text-[var(--text-muted)]">{tip.description}</p>
            </motion.div>
          ))}
        </section>

        {/* Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {imageCategories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <div className="card overflow-hidden" style={{ padding: 0 }}>
                {/* Header */}
                <div className="p-8 bg-[var(--accent-gold-bg)]">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--accent-gold)]/20 flex items-center justify-center">
                      <category.icon size={32} className="text-[var(--accent-gold)]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[var(--text-primary)]">{category.name}</h2>
                      <p className="text-[var(--text-muted)]">{category.description}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Tips */}
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)] mb-4">Best Practices</h3>
                      <ul className="space-y-3">
                        {category.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check size={20} className="text-green-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                            <span className="text-[var(--text-muted)]">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Resources or Palettes */}
                    <div>
                      {category.palettes && (
                        <>
                          <h3 className="font-semibold text-[var(--text-primary)] mb-4">Popular Palettes</h3>
                          <div className="space-y-4 mb-6">
                            {category.palettes.map((palette, i) => (
                              <div key={i}>
                                <p className="text-sm text-[var(--text-muted)] mb-2">{palette.name}</p>
                                <div className="flex gap-2">
                                  {palette.colors.map((color) => (
                                    <button
                                      key={color}
                                      onClick={() => copyColor(color)}
                                      className="w-12 h-12 rounded-lg shadow-sm hover:scale-110 transition-transform relative"
                                      style={{ backgroundColor: color }}
                                      title={color}
                                    >
                                      {copiedColor === color && (
                                        <span className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                                          <Check size={16} className="text-white" strokeWidth={1.5} />
                                        </span>
                                      )}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      <h3 className="font-semibold text-[var(--text-primary)] mb-4">Resources</h3>
                      <div className="space-y-3">
                        {category.resources.map((resource) => (
                          <a
                            key={resource.name}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
                          >
                            <div>
                              <p className="font-medium text-[var(--text-primary)]">{resource.name}</p>
                              <p className="text-sm text-[var(--text-muted)]">{resource.description}</p>
                            </div>
                            <ExternalLink size={16} className="text-[var(--text-muted)]" strokeWidth={1.5} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
