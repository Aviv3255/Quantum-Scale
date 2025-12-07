'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Globe, ExternalLink, Star, Search } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function WebDesignPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredWebsites = websites.filter((site) => {
    const matchesCategory = selectedCategory === 'All' || site.category === selectedCategory;
    const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Page Header */}
        <header className="page-header">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1>Award-Winning eCommerce Designs</h1>
              <p>Study the best DTC brands and steal their design patterns</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-gold-bg)]">
              <Globe size={16} className="text-[var(--accent-gold)]" strokeWidth={1.5} />
              <span className="text-sm font-medium text-[var(--accent-gold)]">Web UI Inspiration</span>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          {/* Search */}
          <div className="search-input w-full md:w-64">
            <Search className="search-input-icon" size={18} strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
              style={{ paddingLeft: '44px' }}
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
            {categories.slice(0, 6).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-[var(--accent-gold)] text-white'
                    : 'bg-white text-[var(--text-secondary)] border border-[var(--border-light)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Websites Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid-3"
        >
          {filteredWebsites.map((site) => (
            <motion.div key={site.id} variants={itemVariants}>
              <div className="card card-hover h-full flex flex-col overflow-hidden" style={{ padding: 0 }}>
                {/* Preview Area */}
                <div className="h-40 bg-[var(--bg-secondary)] flex items-center justify-center">
                  <div className="text-center">
                    <Globe size={40} className="text-[var(--text-muted)] mx-auto mb-2" strokeWidth={1.5} />
                    <span className="text-sm text-[var(--text-muted)]">{site.name}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)]">{site.name}</h3>
                      <span className="text-sm text-[var(--accent-gold)]">{site.category}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(site.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-[var(--accent-gold)] text-[var(--accent-gold)]" />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-[var(--text-muted)] mb-4 flex-1">{site.description}</p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {site.highlights.map((highlight, i) => (
                      <span key={i} className="badge badge-gold">
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full justify-center"
                  >
                    Visit Site
                    <ExternalLink size={16} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
