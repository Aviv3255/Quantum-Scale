# CLAUDE.md - Quantum Scale Project Guide

> **Autonomous AI Development Configuration**
> This file configures Claude Code to work autonomously with the full tech stack, QA pipeline, and external integrations.

---

## Project Overview

**Quantum Scale** is a premium SaaS platform for eCommerce education. The platform provides courses, tools, calculators, and resources to help entrepreneurs scale their online businesses.

- **Live URL:** https://quantum-scale.onrender.com
- **Repository:** GitHub - Quantum-Scale
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + Custom Design System
- **Backend:** Supabase (Auth, Database, Storage)
- **Deployment:** Render (Auto-deploy from main branch)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.0.7 (App Router) |
| Language | TypeScript 5 |
| UI | React 19.2.0 |
| Styling | Tailwind CSS 4 |
| State | Zustand 5 |
| Forms | React Hook Form + Zod |
| Animation | Framer Motion, GSAP, Lottie |
| Charts | Recharts |
| Icons | Lucide React |
| Auth | Supabase Auth |
| Database | Supabase PostgreSQL |
| Testing | Playwright |
| Visual Testing | Percy |
| Performance | Lighthouse CI |
| Accessibility | axe-core |

---

## Project Structure

```
Quantum-Scale/
├── .github/
│   └── workflows/
│       └── qa-pipeline.yml      # Automated QA pipeline
├── genrok-app/                   # Main Next.js application
│   ├── src/
│   │   ├── app/                  # Next.js App Router pages
│   │   │   ├── (auth)/           # Auth pages (login, signup, etc.)
│   │   │   ├── courses/          # Course pages
│   │   │   ├── dashboard/        # User dashboard
│   │   │   ├── learn/            # Learning articles
│   │   │   ├── design/           # Design resources
│   │   │   ├── calculators/      # Business calculators
│   │   │   ├── products/         # Product discovery
│   │   │   ├── apps/             # Recommended apps/tools
│   │   │   ├── globals.css       # Design System CSS
│   │   │   └── layout.tsx        # Root layout
│   │   ├── components/
│   │   │   ├── layout/           # Navbar, Footer, DashboardLayout
│   │   │   ├── animations/       # FadeIn, ScaleIn, Lottie
│   │   │   └── providers/        # AuthProvider
│   │   └── lib/
│   │       └── supabase.ts       # Supabase client
│   ├── public/
│   │   └── images/               # Static images
│   ├── tests/
│   │   └── e2e/                  # Playwright E2E tests
│   ├── package.json
│   ├── playwright.config.ts
│   ├── lighthouserc.json
│   └── .prettierrc
└── CLAUDE.md                     # This file
```

---

## Design System

### Color Palette

```css
/* Backgrounds */
--bg-primary: #FAFAFA;        /* Main background */
--bg-secondary: #F5F5F7;      /* Apple-style gray */
--bg-card: #FFFFFF;           /* Cards */

/* Text */
--text-primary: #000000;      /* Headlines */
--text-secondary: #1D1D1F;    /* Body text */
--text-muted: #86868B;        /* Captions */

/* Primary (Black) */
--primary: #000000;
--primary-hover: #1a1a1a;

/* Accent (Gold - USE SPARINGLY) */
--accent-gold: #B8860B;       /* Only for special highlights */

/* Functional */
--success: #34C759;
--warning: #FF9500;
--error: #FF3B30;
--info: #007AFF;
```

### Typography

```css
/* Font Family */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Sizes */
Display: 48px / 700 weight / -0.02em tracking
H1: 32px / 700 weight / -0.01em tracking
H2: 24px / 600 weight
H3: 18px / 600 weight
Body: 14px / 400 weight / 1.6 line-height
Caption: 11px / 600 weight / uppercase / 0.05em tracking
```

### Spacing System

Use consistent spacing values:
- `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `40px`, `48px`, `64px`, `80px`, `96px`

### Border Radius

- Small: `8px`
- Medium: `12px`
- Large: `16px`
- XL: `20px`
- Full: `9999px`

---

## Development Commands

Run all commands from the `genrok-app/` directory:

```bash
cd genrok-app

# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Production build
npm run start            # Start production server

# Quality Assurance
npm run qa               # Run full QA suite (lint + type-check + format)
npm run lint             # ESLint check
npm run lint:fix         # ESLint auto-fix
npm run type-check       # TypeScript check
npm run format           # Prettier format
npm run format:check     # Prettier check

# Testing
npm run test:e2e         # Run Playwright tests
npm run test:e2e:headed  # Run with browser UI
npm run test:e2e:debug   # Debug mode
npm run test:report      # View test report
```

---

## Automated QA Pipeline

The GitHub Actions pipeline runs automatically on every push. It includes 10 comprehensive testing stages:

### 1. Code Quality
- ESLint for code style
- TypeScript type checking
- Prettier format verification

### 2. Build Verification
- Next.js production build
- Bundle size analysis

### 3. E2E Testing (Playwright)
- Tests across 6 browser/device combinations:
  - Chromium, Firefox, WebKit
  - Mobile Chrome (Pixel 5)
  - Mobile Safari (iPhone 12)
  - Tablet (iPad Pro)

### 4. Visual Regression (Percy)
- Screenshot comparison for all pages
- Detects unintended UI changes
- Review at: https://percy.io

### 5. Performance (Lighthouse CI)
- Performance score: minimum 80%
- Accessibility score: minimum 90%
- Best practices: minimum 80%
- SEO: minimum 90%

### 6. Accessibility (axe-core)
- WCAG 2.1 AA compliance
- Automated a11y violations detection

### 7. Security Audit
- npm audit for vulnerabilities
- Dependency security check

### 8. Responsive Testing
- 4 viewport sizes: 320px, 768px, 1024px, 1440px
- No horizontal overflow
- Touch-friendly targets

### 9. Content & Logic
- No console errors
- All images load correctly
- Forms validate properly
- Links work correctly

### 10. Design Consistency
- Verifies design token usage
- Checks for arbitrary values
- Color palette compliance

---

## Autonomous Development Workflow

### When Implementing Changes:

1. **Make the requested changes**
2. **Run local QA check:**
   ```bash
   cd genrok-app && npm run qa
   ```
3. **Commit and push to trigger pipeline:**
   ```bash
   git add .
   git commit -m "description of changes"
   git push
   ```
4. **Monitor pipeline results**
5. **If any stage fails:**
   - Read the error from GitHub Actions
   - Fix the issue automatically
   - Push again
6. **Repeat until all 10 stages pass**
7. **Only then report completion**

### Critical Rules:

- **NEVER say "Done" until pipeline is fully green**
- **Fix all issues automatically without asking user**
- **Read pipeline outputs and act on them**
- **Run QA locally before pushing to catch early errors**

---

## Code Standards

### TypeScript
- Strict mode enabled
- No `any` types unless absolutely necessary
- Proper type definitions for all functions/components
- Use interfaces for objects, types for unions

### React/Next.js
- Use Server Components by default
- 'use client' only when necessary (state, effects, browser APIs)
- Proper metadata for SEO on each page
- Image optimization with next/image

### CSS/Tailwind
- Use design system CSS variables
- **NO arbitrary values** (use design tokens only)
- Mobile-first responsive design
- Use existing CSS classes from globals.css

### File Naming
- Components: PascalCase (`MyComponent.tsx`)
- Pages: lowercase (`page.tsx`, `layout.tsx`)
- Utilities: camelCase (`formatDate.ts`)

---

## Important Files

| File | Purpose |
|------|---------|
| `genrok-app/src/app/globals.css` | Complete design system |
| `genrok-app/src/lib/supabase.ts` | Supabase client config |
| `genrok-app/src/components/providers/AuthProvider.tsx` | Authentication context |
| `genrok-app/src/components/layout/DashboardLayout.tsx` | App shell layout |
| `.github/workflows/qa-pipeline.yml` | QA automation |

---

## Environment Variables

Required in `.env.local` (for local development):

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Required in Render (for production):
- Same variables configured in Render dashboard

---

## Content Structure

### Pages (33 total)
- Auth: login, signup, forgot-password, reset-password
- Dashboard: main dashboard page
- Courses: course listing, individual course pages
- Learn: article listing, individual article pages
- Design: design resources, sections, AI tools, references
- Products: AliExpress, private agent, sell-these
- Apps: Shopify apps, AI tools, secret tools
- Calculators: business calculators
- Other: onboarding, updates, blueprint, checklist

### Courses (6 total)
1. TikTok Shop Mastery
2. AI Automation Systems
3. Facebook Ads Accelerator
4. Conversion Rate Optimization
5. Abandoned Checkout Finisher
6. Email Marketing Revenue Engine

---

## DO's and DON'Ts

### DO:
- Follow the design system exactly
- Use existing CSS classes
- Run QA before every push
- Fix pipeline failures automatically
- Test on mobile viewports
- Write semantic HTML
- Add proper TypeScript types
- Use Server Components when possible

### DON'T:
- Use arbitrary Tailwind values (no `w-[347px]`)
- Skip the QA pipeline check
- Ask user about pipeline errors (fix them)
- Add emojis unless explicitly requested
- Create unnecessary files
- Over-engineer solutions
- Leave console.logs in production code
- Ignore accessibility requirements

---

## Quick Reference

### Adding a New Page

```tsx
// genrok-app/src/app/new-page/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title | Quantum Scale',
  description: 'Page description for SEO',
};

export default function NewPage() {
  return (
    <div className="main-content">
      <div className="page-wrapper">
        <div className="page-header">
          <h1>Page Title</h1>
          <p>Page description</p>
        </div>
        <div className="page-body">
          {/* Content */}
        </div>
      </div>
    </div>
  );
}
```

### Adding a Client Component

```tsx
// genrok-app/src/components/MyComponent.tsx
'use client';

import { useState } from 'react';

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="card">
      <h3>{title}</h3>
      <button className="btn btn-primary" onClick={onAction}>
        Action
      </button>
    </div>
  );
}
```

---

## Support

- **Documentation:** This CLAUDE.md file
- **Issues:** GitHub Issues
- **Deployment Status:** Render Dashboard
- **Visual Testing:** Percy Dashboard
- **Analytics:** Lighthouse CI Reports

---

*Last updated: December 2024*
