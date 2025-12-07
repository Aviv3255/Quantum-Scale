'use client';

import Link from 'next/link';
import { Rocket, Target, BookOpen, Sparkles } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-container">
      {/* Left Panel - Branding */}
      <div className="auth-branding">
        <div className="auth-branding-content">
          {/* Logo */}
          <div className="auth-logo">
            <div className="w-12 h-12 bg-[var(--accent-gold-bg)] rounded-xl flex items-center justify-center">
              <Rocket size={24} className="text-[var(--accent-gold)]" />
            </div>
            <span>Quantum Scale</span>
          </div>

          {/* Monkey Illustration */}
          <div className="auth-monkey">
            <div className="w-full h-full rounded-3xl flex items-center justify-center bg-[var(--accent-gold-bg)] animate-float">
              {/* Replace with Lottie animation or SVG monkey */}
              <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Monkey body */}
                <ellipse cx="90" cy="110" rx="50" ry="45" fill="#B8860B" opacity="0.2"/>
                {/* Monkey head */}
                <circle cx="90" cy="70" r="40" fill="#C4A574"/>
                {/* Face inner */}
                <ellipse cx="90" cy="78" rx="28" ry="24" fill="#E8D5B7"/>
                {/* Eyes */}
                <circle cx="76" cy="68" r="8" fill="white"/>
                <circle cx="104" cy="68" r="8" fill="white"/>
                <circle cx="78" cy="69" r="4" fill="#2D1810"/>
                <circle cx="106" cy="69" r="4" fill="#2D1810"/>
                {/* Eye shine */}
                <circle cx="79" cy="67" r="1.5" fill="white"/>
                <circle cx="107" cy="67" r="1.5" fill="white"/>
                {/* Nose */}
                <ellipse cx="90" cy="80" rx="6" ry="4" fill="#A67B4C"/>
                {/* Smile */}
                <path d="M80 88 Q90 96 100 88" stroke="#A67B4C" strokeWidth="2" fill="none" strokeLinecap="round"/>
                {/* Ears */}
                <circle cx="52" cy="65" r="14" fill="#C4A574"/>
                <circle cx="52" cy="65" r="9" fill="#E8D5B7"/>
                <circle cx="128" cy="65" r="14" fill="#C4A574"/>
                <circle cx="128" cy="65" r="9" fill="#E8D5B7"/>
                {/* Crown/sparkle */}
                <path d="M70 30 L75 40 L65 35 L75 35 L65 40 Z" fill="#B8860B"/>
                <path d="M110 30 L115 40 L105 35 L115 35 L105 40 Z" fill="#B8860B"/>
              </svg>
            </div>
          </div>

          {/* Tagline */}
          <h1 className="auth-tagline">Follow the Monkey</h1>
          <p className="auth-subtitle">Your path to eCommerce success</p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <BookOpen size={14} className="text-[var(--accent-gold)]" />
                <span className="text-2xl font-bold text-[var(--text-primary)]">38+</span>
              </div>
              <span className="text-xs text-[var(--text-muted)]">Articles</span>
            </div>
            <div className="w-px h-10 bg-[var(--border-light)]" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Target size={14} className="text-[var(--accent-gold)]" />
                <span className="text-2xl font-bold text-[var(--text-primary)]">250</span>
              </div>
              <span className="text-xs text-[var(--text-muted)]">Checklist Steps</span>
            </div>
            <div className="w-px h-10 bg-[var(--border-light)]" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Sparkles size={14} className="text-[var(--accent-gold)]" />
                <span className="text-2xl font-bold text-[var(--text-primary)]">22</span>
              </div>
              <span className="text-xs text-[var(--text-muted)]">Tools</span>
            </div>
          </div>
        </div>

        {/* Background pattern */}
        <div className="auth-bg-pattern" />
      </div>

      {/* Right Panel - Form */}
      <div className="auth-form-side">
        <div className="auth-form-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
}
