'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Globe, ExternalLink, Star, Filter, Search } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

const websites = [
  {
    id: 1,
    name: 'Gymshark',
    category: 'Fitness',
    url: 'https://www.gymshark.com',
    description: 'Clean product pages with excellent mobile experience. Great use of lifestyle imagery and social proof.',
    highlights: ['Product Page Design', 'Mobile UX', 'Social Proof'],
    rating: 5,
  },
  {
    id: 2,
    name: 'Allbirds',
    category: 'Footwear',
    url: 'https://www.allbirds.com',
    description: 'Minimal, eco-focused design with emphasis on sustainability messaging. Excellent product photography.',
    highlights: ['Minimal Design', 'Brand Story', 'Product Photos'],
    rating: 5,
  },
  {
    id: 3,
    name: 'Warby Parker',
    category: 'Eyewear',
    url: 'https://www.warbyparker.com',
    description: 'Innovative virtual try-on feature. Clean navigation and seamless checkout experience.',
    highlights: ['Virtual Try-On', 'Navigation', 'Checkout Flow'],
    rating: 5,
  },
  {
    id: 4,
    name: 'Away',
    category: 'Luggage',
    url: 'https://www.awaytravel.com',
    description: 'Lifestyle-focused marketing with aspirational imagery. Great use of video content on product pages.',
    highlights: ['Lifestyle Marketing', 'Video Content', 'Hero Sections'],
    rating: 4,
  },
  {
    id: 5,
    name: 'Glossier',
    category: 'Beauty',
    url: 'https://www.glossier.com',
    description: 'Community-driven brand with excellent UGC integration. Playful, approachable design language.',
    highlights: ['UGC Integration', 'Community', 'Brand Voice'],
    rating: 5,
  },
  {
    id: 6,
    name: 'Casper',
    category: 'Home',
    url: 'https://casper.com',
    description: 'Excellent explanation of product features. Great use of comparison tables and trust elements.',
    highlights: ['Feature Explanation', 'Comparisons', 'Trust Elements'],
    rating: 4,
  },
  {
    id: 7,
    name: 'MVMT',
    category: 'Watches',
    url: 'https://www.mvmt.com',
    description: 'Bold, lifestyle-focused imagery. Great product photography and influencer integration.',
    highlights: ['Photography', 'Lifestyle', 'Influencer Content'],
    rating: 4,
  },
  {
    id: 8,
    name: 'Brooklinen',
    category: 'Bedding',
    url: 'https://www.brooklinen.com',
    description: 'Cozy brand aesthetic with excellent color palette. Great use of bundle offers.',
    highlights: ['Color Palette', 'Bundles', 'Cozy Aesthetic'],
    rating: 4,
  },
  {
    id: 9,
    name: 'Ritual',
    category: 'Supplements',
    url: 'https://ritual.com',
    description: 'Transparent ingredient sourcing. Science-backed messaging with clean, modern design.',
    highlights: ['Transparency', 'Science Messaging', 'Modern Design'],
    rating: 5,
  },
  {
    id: 10,
    name: 'Outdoor Voices',
    category: 'Activewear',
    url: 'https://www.outdoorvoices.com',
    description: 'Community-focused brand with excellent color blocking. Great mobile shopping experience.',
    highlights: ['Color Blocking', 'Community', 'Mobile UX'],
    rating: 4,
  },
  {
    id: 11,
    name: 'Hims',
    category: 'Health',
    url: 'https://www.forhims.com',
    description: 'Direct, confident messaging. Great quiz-based product recommendations.',
    highlights: ['Quiz Funnel', 'Messaging', 'Personalization'],
    rating: 4,
  },
  {
    id: 12,
    name: 'Everlane',
    category: 'Fashion',
    url: 'https://www.everlane.com',
    description: 'Radical transparency in pricing. Clean, sophisticated design with excellent product detail pages.',
    highlights: ['Price Transparency', 'Product Details', 'Sophistication'],
    rating: 5,
  },
];

const categories = ['All', 'Fitness', 'Footwear', 'Eyewear', 'Luggage', 'Beauty', 'Home', 'Watches', 'Bedding', 'Supplements', 'Activewear', 'Health', 'Fashion'];

export default function WebDesignPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWebsites = websites.filter((site) => {
    const matchesCategory = selectedCategory === 'All' || site.category === selectedCategory;
    const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              <Globe className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Web UI Inspiration</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Award-Winning</span> eCommerce Designs
            </h1>
            <p className="text-xl text-gray-600">
              Study the best DTC brands and steal their design patterns. Every site here is optimized for conversions.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-gray-100 sticky top-16 bg-white/80 backdrop-blur-xl z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.slice(0, 6).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Websites Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWebsites.map((site) => (
              <StaggerItem key={site.id}>
                <div className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all overflow-hidden h-full flex flex-col">
                  {/* Preview Area */}
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm text-gray-500">{site.name}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{site.name}</h3>
                        <span className="text-sm text-purple-600">{site.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(site.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 flex-1">{site.description}</p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {site.highlights.map((highlight, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Action */}
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all"
                    >
                      Visit Site
                      <ExternalLink className="w-4 h-4" />
                    </a>
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
