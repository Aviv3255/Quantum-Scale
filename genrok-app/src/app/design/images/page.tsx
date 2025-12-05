'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Camera, Palette, Sparkles, Download, ExternalLink, Check } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

const imageCategories = [
  {
    id: 1,
    name: 'Product Photography',
    description: 'Clean, professional product shots that sell. White backgrounds, lifestyle contexts, and detail shots.',
    icon: Camera,
    color: 'from-blue-500 to-cyan-500',
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
    color: 'from-pink-500 to-rose-500',
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
    color: 'from-purple-500 to-violet-500',
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
    color: 'from-orange-500 to-amber-500',
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

export default function ImagesPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 mb-6">
              <ImageIcon className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-700">Brand Imagery</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Visual</span> Brand Building
            </h1>
            <p className="text-xl text-gray-600">
              Great product photos are your #1 conversion driver. Learn how to create
              a visual brand that customers trust and remember.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            {photoTips.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-100"
              >
                <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="space-y-12">
            {imageCategories.map((category) => (
              <StaggerItem key={category.id}>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  {/* Header */}
                  <div className={`p-8 bg-gradient-to-br ${category.color}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <category.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                        <p className="text-white/80">{category.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Tips */}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-4">Best Practices</h3>
                        <ul className="space-y-3">
                          {category.tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Resources or Palettes */}
                      <div>
                        {category.palettes ? (
                          <>
                            <h3 className="font-bold text-gray-900 mb-4">Popular Palettes</h3>
                            <div className="space-y-4">
                              {category.palettes.map((palette, i) => (
                                <div key={i}>
                                  <p className="text-sm text-gray-600 mb-2">{palette.name}</p>
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
                                            <Check className="w-4 h-4 text-white" />
                                          </span>
                                        )}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : null}

                        <h3 className="font-bold text-gray-900 mb-4 mt-6">Resources</h3>
                        <div className="space-y-3">
                          {category.resources.map((resource) => (
                            <a
                              key={resource.name}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <div>
                                <p className="font-medium text-gray-900">{resource.name}</p>
                                <p className="text-sm text-gray-500">{resource.description}</p>
                              </div>
                              <ExternalLink className="w-4 h-4 text-gray-400" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
