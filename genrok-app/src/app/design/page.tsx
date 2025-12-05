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
    color: 'from-purple-500 to-pink-500',
    examples: ['Product Pages', 'Homepages', 'Checkout Flows', 'Navigation'],
  },
  {
    title: 'High-Converting Sections',
    description: 'Ready-to-use section designs that drive conversions. Trust badges, testimonials, feature highlights, and more.',
    icon: Layers,
    href: '/design/sections',
    color: 'from-blue-500 to-cyan-500',
    examples: ['Hero Sections', 'Trust Badges', 'Testimonials', 'CTAs'],
  },
  {
    title: 'Brand Imagery',
    description: 'Curated product photography, lifestyle shots, and visual inspiration for building a premium brand aesthetic.',
    icon: ImageIcon,
    href: '/design/images',
    color: 'from-orange-500 to-red-500',
    examples: ['Product Photos', 'Lifestyle Shots', 'Brand Aesthetics', 'Color Palettes'],
  },
];

export default function DesignPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 mb-6">
              <Palette className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Design Inspiration</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Design</span> That Converts
            </h1>
            <p className="text-xl text-gray-600">
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
                  <div className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all overflow-hidden h-full">
                    {/* Header */}
                    <div className={`p-8 bg-gradient-to-br ${category.color}`}>
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                        <category.icon className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-2">{category.title}</h2>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-gray-600 mb-6">{category.description}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {category.examples.map((example, i) => (
                          <span
                            key={i}
                            className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full"
                          >
                            {example}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">
                        Explore
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Design Tips for Higher Conversions</h2>
            <p className="text-gray-600">Apply these principles to your store</p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl border border-gray-100"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Less is More</h3>
              <p className="text-gray-600 text-sm">
                Clean, minimal designs convert better. Remove clutter and focus on your product.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-2xl border border-gray-100"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Mobile First</h3>
              <p className="text-gray-600 text-sm">
                80%+ of traffic is mobile. Design for mobile first, then adapt to desktop.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-2xl border border-gray-100"
            >
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Trust Elements</h3>
              <p className="text-gray-600 text-sm">
                Add reviews, badges, and guarantees above the fold to build instant credibility.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-2xl border border-gray-100"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">High-Quality Images</h3>
              <p className="text-gray-600 text-sm">
                Professional product photos are the #1 factor in purchase decisions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
