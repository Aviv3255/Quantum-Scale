'use client';

import Link from 'next/link';
import { ExternalLink, Mail, Twitter, Youtube, Instagram } from 'lucide-react';

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
    { label: 'AI Tools', href: '/apps/ai' },
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
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Genrok
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Scale your eCommerce brand with data-driven strategies and proven systems.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Learn
            </h3>
            <ul className="space-y-3">
              {footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Tools
            </h3>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Apps */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Apps
            </h3>
            <ul className="space-y-3">
              {footerLinks.apps.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Design */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Design
            </h3>
            <ul className="space-y-3">
              {footerLinks.design.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} Genrok. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://quantum-scale.co"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Visit Quantum Scale
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
