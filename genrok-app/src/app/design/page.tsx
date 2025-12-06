'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Palette, Globe, Layers, Image as ImageIcon, ArrowRight, Sparkles } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

const categories = [
  {
    title: 'Web UI Inspiration',
    description: 'Award-winning eCommerce designs from the best brands worldwide. Get inspired by layouts, navigation, and user experience patterns.',
    icon: Globe,
    href: '/design/web',
    examples: ['Product Pages', 'Homepages', 'Checkout Flows', 'Navigation'],
  },
  {
    title: 'High-Converting Sections',
    description: 'Ready-to-use section designs that drive conversions. Trust badges, testimonials, feature highlights, and more.',
    icon: Layers,
    href: '/design/sections',
    examples: ['Hero Sections', 'Trust Badges', 'Testimonials', 'CTAs'],
  },
  {
    title: 'Brand Imagery',
    description: 'Curated product photography, lifestyle shots, and visual inspiration for building a premium brand aesthetic.',
    icon: ImageIcon,
    href: '/design/images',
    examples: ['Product Photos', 'Lifestyle Shots', 'Brand Aesthetics', 'Color Palettes'],
  },
];

export default function DesignPage() {
  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 105, 20, 0.08) 0%, rgba(139, 105, 20, 0.02) 50%, transparent 70%)',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(139, 105, 20, 0.08)', border: '1px solid rgba(139, 105, 20, 0.15)' }}
            >
              <Palette className="w-4 h-4" style={{ color: '#8b6914' }} strokeWidth={1.5} />
              <span className="text-sm font-medium" style={{ color: '#8b6914' }}>Design Inspiration</span>
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
            >
              <span style={{ color: '#8b6914' }}>Design</span> That Converts
            </h1>
            <p className="text-xl" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
              Curated design inspiration from the world's best eCommerce brands.
              Steal what works and apply it to your store.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <StaggerItem key={category.title}>
                <Link href={category.href}>
                  <div
                    className="group bg-white rounded-2xl overflow-hidden h-full transition-all"
                    style={{ border: '1px solid rgba(0, 0, 0, 0.06)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.08)';
                      e.currentTarget.style.borderColor = 'rgba(139, 105, 20, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.06)';
                    }}
                  >
                    {/* Header */}
                    <div className="p-8" style={{ background: '#fdf6e3' }}>
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                        style={{ background: 'rgba(139, 105, 20, 0.15)' }}
                      >
                        <category.icon className="w-8 h-8" style={{ color: '#8b6914' }} strokeWidth={1.5} />
                      </div>
                      <h2
                        className="text-2xl font-bold mb-2"
                        style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
                      >
                        {category.title}
                      </h2>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="mb-6" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>{category.description}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {category.examples.map((example, i) => (
                          <span
                            key={i}
                            className="text-xs font-medium px-2.5 py-1 rounded-full"
                            style={{ background: 'rgba(139, 105, 20, 0.08)', color: '#8b6914' }}
                          >
                            {example}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 font-semibold transition-colors" style={{ color: '#8b6914' }}>
                        Explore
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16" style={{ background: '#fdf6e3' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
            >
              Design Tips for Higher Conversions
            </h2>
            <p style={{ color: 'rgba(44, 24, 16, 0.6)' }}>Apply these principles to your store</p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl"
              style={{ border: '1px solid rgba(0, 0, 0, 0.06)' }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: 'rgba(139, 105, 20, 0.1)' }}
              >
                <Sparkles className="w-5 h-5" style={{ color: '#8b6914' }} strokeWidth={1.5} />
              </div>
              <h3
                className="font-bold mb-2"
                style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
              >
                Less is More
              </h3>
              <p className="text-sm" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
                Clean, minimal designs convert better. Remove clutter and focus on your product.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-2xl"
              style={{ border: '1px solid rgba(0, 0, 0, 0.06)' }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: 'rgba(139, 105, 20, 0.1)' }}
              >
                <Sparkles className="w-5 h-5" style={{ color: '#8b6914' }} strokeWidth={1.5} />
              </div>
              <h3
                className="font-bold mb-2"
                style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
              >
                Mobile First
              </h3>
              <p className="text-sm" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
                80%+ of traffic is mobile. Design for mobile first, then adapt to desktop.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-2xl"
              style={{ border: '1px solid rgba(0, 0, 0, 0.06)' }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: 'rgba(139, 105, 20, 0.1)' }}
              >
                <Sparkles className="w-5 h-5" style={{ color: '#8b6914' }} strokeWidth={1.5} />
              </div>
              <h3
                className="font-bold mb-2"
                style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
              >
                Trust Elements
              </h3>
              <p className="text-sm" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
                Add reviews, badges, and guarantees above the fold to build instant credibility.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-2xl"
              style={{ border: '1px solid rgba(0, 0, 0, 0.06)' }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: 'rgba(139, 105, 20, 0.1)' }}
              >
                <Sparkles className="w-5 h-5" style={{ color: '#8b6914' }} strokeWidth={1.5} />
              </div>
              <h3
                className="font-bold mb-2"
                style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
              >
                High-Quality Images
              </h3>
              <p className="text-sm" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
                Professional product photos are the #1 factor in purchase decisions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
