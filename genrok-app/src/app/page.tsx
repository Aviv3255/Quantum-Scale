'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  BarChart3,
  AppWindow,
  Palette,
  Sparkles,
  TrendingUp,
  Target,
  Zap,
  ChevronRight
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

const features = [
  {
    icon: BookOpen,
    title: 'Learning Center',
    description: '38+ in-depth articles on eCommerce psychology, LTV optimization, and scaling strategies.',
    href: '/learn',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: BarChart3,
    title: 'Advanced Calculators',
    description: 'Profit simulation and KPI X-Ray tools to diagnose and optimize your business metrics.',
    href: '/calculators',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: AppWindow,
    title: 'Curated Apps',
    description: 'Handpicked Shopify apps, secret tools, and AI solutions with exclusive discounts.',
    href: '/apps/shopify',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Palette,
    title: 'Design Inspiration',
    description: 'Award-winning eCommerce designs, conversion sections, and brand imagery.',
    href: '/design/web',
    color: 'from-pink-500 to-rose-500',
  },
];

const stats = [
  { value: '38+', label: 'In-Depth Articles' },
  { value: '$6,000', label: 'Free TikTok Credits' },
  { value: '22', label: 'Discounted Apps' },
  { value: '9', label: 'A/B Test Results' },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Your eCommerce Growth Partner</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Scale Your Brand to
              <span className="block gradient-text">7 Figures & Beyond</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Data-driven strategies, proven systems, and premium tools used by 8 & 9 figure brands.
              Everything you need to build an unstoppable eCommerce machine.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Explore Learning Center
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to
              <span className="gradient-text"> Win</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and resources designed for serious eCommerce entrepreneurs.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <Link
                  href={feature.href}
                  className="group block p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <span className="inline-flex items-center gap-1 text-blue-600 font-medium">
                    Learn more
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* LTV Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">The Secret to Scale</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Build a $1,000+ LTV Machine
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                When every customer is worth $1,000+ over their lifetime, scaling becomes simple.
                Learn the exact systems used by 8-figure brands to maximize customer value.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Post-purchase upsell sequences that add $7.4+ per order',
                  'Email & SMS flows that recover 80%+ of abandoned carts',
                  'Lookalike audiences built from your top 5% customers',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Start Learning
                <ArrowRight className="w-5 h-5" />
              </Link>
            </FadeIn>

            <FadeIn direction="right" className="relative">
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl p-8 border border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-6 text-center backdrop-blur-sm">
                    <Target className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                    <div className="text-3xl font-bold mb-1">$1,000+</div>
                    <div className="text-sm text-gray-400">12-Month LTV</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 text-center backdrop-blur-sm">
                    <Zap className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
                    <div className="text-3xl font-bold mb-1">5-7%</div>
                    <div className="text-sm text-gray-400">Conversion Rate</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 text-center backdrop-blur-sm">
                    <BarChart3 className="w-8 h-8 mx-auto mb-3 text-green-400" />
                    <div className="text-3xl font-bold mb-1">1:46</div>
                    <div className="text-sm text-gray-400">Upsell ROI</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 text-center backdrop-blur-sm">
                    <TrendingUp className="w-8 h-8 mx-auto mb-3 text-violet-400" />
                    <div className="text-3xl font-bold mb-1">80%+</div>
                    <div className="text-sm text-gray-400">Cart Recovery</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* TikTok Credits CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[2px]">
              <div className="bg-white rounded-3xl p-8 md:p-12">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-100 mb-6">
                      <span className="text-sm font-semibold text-pink-600">EXCLUSIVE PARTNERSHIP</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                      Get Up to $6,000 in Free TikTok Ad Credits
                    </h2>
                    <p className="text-xl text-gray-600 mb-6">
                      Scale faster with our exclusive TikTok partnership. Unlock your tier, launch instantly,
                      and get priority support from TikTok&apos;s growth team.
                    </p>
                    <Link
                      href="/tiktok-credits"
                      className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl hover:shadow-xl hover:shadow-pink-500/25 transition-all"
                    >
                      Claim Your Credits
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-cyan-50 rounded-2xl">
                      <div className="text-2xl font-bold text-cyan-600">$2K</div>
                      <div className="text-xs text-gray-600">Spend</div>
                      <div className="text-lg font-bold text-cyan-700 mt-1">$1K</div>
                      <div className="text-xs text-gray-500">Credit</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-2xl">
                      <div className="text-2xl font-bold text-purple-600">$5K</div>
                      <div className="text-xs text-gray-600">Spend</div>
                      <div className="text-lg font-bold text-purple-700 mt-1">$3K</div>
                      <div className="text-xs text-gray-500">Credit</div>
                    </div>
                    <div className="text-center p-4 bg-pink-50 rounded-2xl border-2 border-pink-200">
                      <div className="text-2xl font-bold text-pink-600">$10K</div>
                      <div className="text-xs text-gray-600">Spend</div>
                      <div className="text-lg font-bold text-pink-700 mt-1">$6K</div>
                      <div className="text-xs text-gray-500">Credit</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Scale Your Brand?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Join thousands of eCommerce entrepreneurs using Genrok to build 7 & 8 figure brands.
            </p>
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all"
            >
              Get Started Now — It&apos;s Free
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
