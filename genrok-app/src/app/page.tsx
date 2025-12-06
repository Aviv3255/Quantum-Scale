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
  },
  {
    icon: BarChart3,
    title: 'Advanced Calculators',
    description: 'Profit simulation and KPI X-Ray tools to diagnose and optimize your business metrics.',
    href: '/calculators',
  },
  {
    icon: AppWindow,
    title: 'Curated Apps',
    description: 'Handpicked Shopify apps, secret tools, and AI solutions with exclusive discounts.',
    href: '/apps/shopify',
  },
  {
    icon: Palette,
    title: 'Design Inspiration',
    description: 'Award-winning eCommerce designs, conversion sections, and brand imagery.',
    href: '/design/web',
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
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 105, 20, 0.08) 0%, rgba(139, 105, 20, 0.02) 50%, transparent 70%)',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{ background: 'rgba(139, 105, 20, 0.08)', border: '1px solid rgba(139, 105, 20, 0.15)' }}
            >
              <span className="text-xl">🐵</span>
              <span className="text-sm font-medium" style={{ color: '#8b6914' }}>Follow the Monkey</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
            >
              Scale Your Brand to
              <span className="block" style={{ color: '#8b6914' }}>7 Figures & Beyond</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl max-w-3xl mx-auto mb-10" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
              Data-driven strategies, proven systems, and premium tools used by 8 & 9 figure brands.
              Everything you need to build an unstoppable eCommerce machine.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white rounded-xl transition-all"
                style={{
                  background: '#8b6914',
                  boxShadow: '0 4px 14px rgba(139, 105, 20, 0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2c1810';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(44, 24, 16, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#8b6914';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(139, 105, 20, 0.25)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl transition-all"
                style={{
                  background: '#fdf6e3',
                  color: '#2c1810',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 105, 20, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fdf6e3';
                }}
              >
                Explore Learning Center
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16" style={{ background: '#fdf6e3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <div
                  className="text-4xl md:text-5xl font-bold mb-2"
                  style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#8b6914' }}
                >
                  {stat.value}
                </div>
                <div style={{ color: 'rgba(44, 24, 16, 0.6)' }}>{stat.label}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
            >
              Everything You Need to
              <span style={{ color: '#8b6914' }}> Win</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
              Comprehensive tools and resources designed for serious eCommerce entrepreneurs.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <Link
                  href={feature.href}
                  className="group block p-8 bg-white rounded-2xl transition-all"
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
                  <div
                    className="inline-flex p-3 rounded-xl mb-6"
                    style={{ background: 'rgba(139, 105, 20, 0.1)' }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: '#8b6914' }} strokeWidth={1.5} />
                  </div>
                  <h3
                    className="text-2xl font-bold mb-3 transition-colors"
                    style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
                  >
                    {feature.title}
                  </h3>
                  <p className="mb-4" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>{feature.description}</p>
                  <span className="inline-flex items-center gap-1 font-medium" style={{ color: '#8b6914' }}>
                    Learn more
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* LTV Section */}
      <section className="py-24" style={{ background: '#2c1810' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ background: 'rgba(139, 105, 20, 0.2)', border: '1px solid rgba(139, 105, 20, 0.3)' }}
              >
                <TrendingUp className="w-4 h-4" style={{ color: '#8b6914' }} strokeWidth={1.5} />
                <span className="text-sm font-medium" style={{ color: '#8b6914' }}>The Secret to Scale</span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#fdf6e3' }}
              >
                Build a $1,000+ LTV Machine
              </h2>
              <p className="text-xl mb-8" style={{ color: 'rgba(253, 246, 227, 0.7)' }}>
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
                    <div
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: '#22c55e' }}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span style={{ color: 'rgba(253, 246, 227, 0.8)' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-xl transition-all"
                style={{ background: '#fdf6e3', color: '#2c1810' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#8b6914';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fdf6e3';
                  e.currentTarget.style.color = '#2c1810';
                }}
              >
                Start Learning
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </Link>
            </FadeIn>

            <FadeIn direction="right" className="relative">
              <div
                className="rounded-3xl p-8"
                style={{ background: 'rgba(139, 105, 20, 0.1)', border: '1px solid rgba(139, 105, 20, 0.2)' }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="rounded-2xl p-6 text-center"
                    style={{ background: 'rgba(253, 246, 227, 0.05)' }}
                  >
                    <Target className="w-8 h-8 mx-auto mb-3" style={{ color: '#8b6914' }} strokeWidth={1.5} />
                    <div className="text-3xl font-bold mb-1" style={{ color: '#fdf6e3' }}>$1,000+</div>
                    <div className="text-sm" style={{ color: 'rgba(253, 246, 227, 0.5)' }}>12-Month LTV</div>
                  </div>
                  <div
                    className="rounded-2xl p-6 text-center"
                    style={{ background: 'rgba(253, 246, 227, 0.05)' }}
                  >
                    <Zap className="w-8 h-8 mx-auto mb-3" style={{ color: '#8b6914' }} strokeWidth={1.5} />
                    <div className="text-3xl font-bold mb-1" style={{ color: '#fdf6e3' }}>5-7%</div>
                    <div className="text-sm" style={{ color: 'rgba(253, 246, 227, 0.5)' }}>Conversion Rate</div>
                  </div>
                  <div
                    className="rounded-2xl p-6 text-center"
                    style={{ background: 'rgba(253, 246, 227, 0.05)' }}
                  >
                    <BarChart3 className="w-8 h-8 mx-auto mb-3" style={{ color: '#8b6914' }} strokeWidth={1.5} />
                    <div className="text-3xl font-bold mb-1" style={{ color: '#fdf6e3' }}>1:46</div>
                    <div className="text-sm" style={{ color: 'rgba(253, 246, 227, 0.5)' }}>Upsell ROI</div>
                  </div>
                  <div
                    className="rounded-2xl p-6 text-center"
                    style={{ background: 'rgba(253, 246, 227, 0.05)' }}
                  >
                    <TrendingUp className="w-8 h-8 mx-auto mb-3" style={{ color: '#8b6914' }} strokeWidth={1.5} />
                    <div className="text-3xl font-bold mb-1" style={{ color: '#fdf6e3' }}>80%+</div>
                    <div className="text-sm" style={{ color: 'rgba(253, 246, 227, 0.5)' }}>Cart Recovery</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* TikTok Credits CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div
              className="rounded-3xl p-8 md:p-12"
              style={{ background: '#fdf6e3', border: '1px solid rgba(139, 105, 20, 0.15)' }}
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                    style={{ background: 'rgba(139, 105, 20, 0.1)', border: '1px solid rgba(139, 105, 20, 0.2)' }}
                  >
                    <Sparkles className="w-4 h-4" style={{ color: '#8b6914' }} strokeWidth={1.5} />
                    <span className="text-sm font-semibold" style={{ color: '#8b6914' }}>EXCLUSIVE PARTNERSHIP</span>
                  </div>
                  <h2
                    className="text-4xl md:text-5xl font-bold mb-4"
                    style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
                  >
                    Get Up to $6,000 in Free TikTok Ad Credits
                  </h2>
                  <p className="text-xl mb-6" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
                    Scale faster with our exclusive TikTok partnership. Unlock your tier, launch instantly,
                    and get priority support from TikTok&apos;s growth team.
                  </p>
                  <Link
                    href="/tiktok-credits"
                    className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white rounded-xl transition-all"
                    style={{ background: '#8b6914', boxShadow: '0 4px 14px rgba(139, 105, 20, 0.25)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#2c1810';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#8b6914';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Claim Your Credits
                    <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div
                    className="text-center p-4 rounded-2xl"
                    style={{ background: 'rgba(139, 105, 20, 0.08)' }}
                  >
                    <div className="text-2xl font-bold" style={{ color: '#8b6914' }}>$2K</div>
                    <div className="text-xs" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>Spend</div>
                    <div className="text-lg font-bold mt-1" style={{ color: '#2c1810' }}>$1K</div>
                    <div className="text-xs" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>Credit</div>
                  </div>
                  <div
                    className="text-center p-4 rounded-2xl"
                    style={{ background: 'rgba(139, 105, 20, 0.08)' }}
                  >
                    <div className="text-2xl font-bold" style={{ color: '#8b6914' }}>$5K</div>
                    <div className="text-xs" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>Spend</div>
                    <div className="text-lg font-bold mt-1" style={{ color: '#2c1810' }}>$3K</div>
                    <div className="text-xs" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>Credit</div>
                  </div>
                  <div
                    className="text-center p-4 rounded-2xl"
                    style={{ background: 'rgba(139, 105, 20, 0.15)', border: '1px solid rgba(139, 105, 20, 0.3)' }}
                  >
                    <div className="text-2xl font-bold" style={{ color: '#8b6914' }}>$10K</div>
                    <div className="text-xs" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>Spend</div>
                    <div className="text-lg font-bold mt-1" style={{ color: '#2c1810' }}>$6K</div>
                    <div className="text-xs" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>Credit</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24" style={{ background: '#fdf6e3' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="mb-8">
              <span className="text-6xl">🐵</span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
            >
              Ready to Scale Your Brand?
            </h2>
            <p className="text-xl mb-10" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
              Join thousands of eCommerce entrepreneurs using Quantum Scale to build 7 & 8 figure brands.
            </p>
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 px-10 py-5 text-xl font-bold text-white rounded-2xl transition-all"
              style={{ background: '#8b6914', boxShadow: '0 6px 20px rgba(139, 105, 20, 0.3)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2c1810';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#8b6914';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Get Started Now — It&apos;s Free
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
