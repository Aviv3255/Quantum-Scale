'use client';

import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding with Cream Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ background: '#fdf6e3' }}>
        {/* Subtle Gold Glow */}
        <div className="absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 105, 20, 0.12) 0%, rgba(139, 105, 20, 0.04) 40%, transparent 70%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(139, 105, 20, 0.1)' }}
            >
              <span className="text-xl">🐵</span>
            </div>
            <span
              className="text-2xl font-bold"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
            >
              Quantum Scale
            </span>
          </Link>

          {/* Main Content */}
          <div className="space-y-8 max-w-lg">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: 'rgba(139, 105, 20, 0.08)', border: '1px solid rgba(139, 105, 20, 0.15)' }}
            >
              <span className="text-sm">🎯</span>
              <span className="text-sm font-medium" style={{ color: '#8b6914' }}>
                Trusted by 10,000+ brands
              </span>
            </div>

            {/* Tagline */}
            <div>
              <h1
                className="text-4xl md:text-5xl font-bold leading-tight mb-4"
                style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
              >
                Follow the Monkey
              </h1>
              <p className="text-xl" style={{ color: '#8b6914' }}>
                He knows how to make you money.
              </p>
            </div>

            {/* Description */}
            <p className="text-lg" style={{ color: 'rgba(44, 24, 16, 0.7)' }}>
              Join thousands of eCommerce entrepreneurs using data-driven strategies
              and proven systems to scale to 7 figures and beyond.
            </p>

            {/* Monkey Illustration Placeholder */}
            <div className="flex justify-center py-8">
              <div
                className="w-48 h-48 rounded-3xl flex items-center justify-center animate-float"
                style={{ background: 'rgba(139, 105, 20, 0.06)' }}
              >
                <span className="text-8xl">🐵</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8">
            <div>
              <div className="text-3xl font-bold" style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}>
                38+
              </div>
              <div className="text-sm" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>In-Depth Articles</div>
            </div>
            <div className="w-px h-12" style={{ background: 'rgba(139, 105, 20, 0.2)' }} />
            <div>
              <div className="text-3xl font-bold" style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}>
                $6K
              </div>
              <div className="text-sm" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>Free Ad Credits</div>
            </div>
            <div className="w-px h-12" style={{ background: 'rgba(139, 105, 20, 0.2)' }} />
            <div>
              <div className="text-3xl font-bold" style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}>
                22
              </div>
              <div className="text-sm" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>Premium Apps</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
