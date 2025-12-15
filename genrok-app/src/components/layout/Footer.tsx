'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const footerLinks = {
  learn: [
    { label: 'Learning Center', href: '/learn' },
    { label: 'A/B Test Results', href: '/ab-tests' },
    { label: 'Blueprint', href: '/blueprint' },
  ],
  tools: [
    { label: 'Calculators', href: '/calculators' },
    { label: 'Data Center', href: '/data-center' },
  ],
  apps: [
    { label: 'Shopify Apps', href: '/apps/shopify' },
    { label: 'Secret Apps', href: '/apps/secret' },
    { label: 'AI Tools', href: '/apps/ai-tools' },
  ],
  design: [
    { label: 'Web UI Inspiration', href: '/design/web' },
    { label: 'Sections', href: '/design/sections' },
    { label: 'Image Inspiration', href: '/design/images' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#2c1810' }}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: 'rgba(253, 246, 227, 0.15)' }}
              >
                <span className="text-base">🐵</span>
              </div>
              <span
                className="text-xl font-bold"
                style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#fdf6e3' }}
              >
                Quantum Scale
              </span>
            </Link>
            <p className="mt-4 text-sm" style={{ color: 'rgba(253, 246, 227, 0.6)' }}>
              Follow the Monkey to scale your eCommerce brand with data-driven strategies.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h3
              className="mb-4 text-xs font-semibold uppercase tracking-wider"
              style={{ color: '#8b6914' }}
            >
              Learn
            </h3>
            <ul className="space-y-3">
              {footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(253, 246, 227, 0.7)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#fdf6e3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(253, 246, 227, 0.7)';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3
              className="mb-4 text-xs font-semibold uppercase tracking-wider"
              style={{ color: '#8b6914' }}
            >
              Tools
            </h3>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(253, 246, 227, 0.7)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#fdf6e3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(253, 246, 227, 0.7)';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Apps */}
          <div>
            <h3
              className="mb-4 text-xs font-semibold uppercase tracking-wider"
              style={{ color: '#8b6914' }}
            >
              Apps
            </h3>
            <ul className="space-y-3">
              {footerLinks.apps.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(253, 246, 227, 0.7)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#fdf6e3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(253, 246, 227, 0.7)';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Design */}
          <div>
            <h3
              className="mb-4 text-xs font-semibold uppercase tracking-wider"
              style={{ color: '#8b6914' }}
            >
              Design
            </h3>
            <ul className="space-y-3">
              {footerLinks.design.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(253, 246, 227, 0.7)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#fdf6e3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(253, 246, 227, 0.7)';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 pt-8 md:flex-row"
          style={{ borderTop: '1px solid rgba(253, 246, 227, 0.1)' }}
        >
          <p className="text-sm" style={{ color: 'rgba(253, 246, 227, 0.4)' }}>
            © {currentYear} Quantum Scale. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://quantum-scale.co"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm transition-colors"
              style={{ color: 'rgba(253, 246, 227, 0.6)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#8b6914';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(253, 246, 227, 0.6)';
              }}
            >
              Visit Quantum Scale
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
