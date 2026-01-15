# Complete Lesson Redesign Guide

> **Master document for transforming all lessons to world-class, premium quality.**
> This document captures all context, decisions, and learnings from the design process.

---

## Background & Why We're Doing This

### The Problem
Our current lessons are visually inconsistent and don't match the premium $100,000 MBA-level quality we're aiming for. Some lessons have:
- Oversized "hero page" typography (100px+ fonts) that looks unprofessional
- Inconsistent design patterns across lessons
- Custom code written for each slide instead of using our component library
- Generic startup landing page aesthetics instead of premium educational content

### The Vision
Transform every lesson to look like it belongs on **Apple, Stripe, or Linear's website**:
- Minimalistic, professional, clean design
- NOT flashy, NOT oversized, NOT cluttered
- Premium educational content that justifies our pricing

### The Solution
**Use our existing component library 90% of the time.** We've built 120+ professional components specifically for lessons. The problem is we weren't using them - we were recreating custom code for each lesson.

**Key insight:** Don't redesign components, just use them with different content (props).

---

## Architecture Overview

### Current State
- **Lessons location:** `genrok-app/public/lessons/[slug]/lesson.html`
- **Technology:** HTML files with inline React/JSX, compiled by Babel in the browser
- **Problem:** Can't directly import from component library (separate build systems)

### Solution: Shared Components Bundle
Create a pre-built JavaScript bundle that exposes all lesson components globally:

```
src/components/lessons/  →  [BUILD]  →  public/lessons/shared/components.bundle.js
```

After the bundle exists, any lesson can:
```html
<script src="/lessons/shared/components.bundle.js"></script>
<script type="text/babel">
  const { BeforeAfter, StatCard, ProgressRing } = window.LessonComponents;

  // Now use components with lesson-specific content:
  <BeforeAfter
    before={{ title: "Without MAYA", items: ["Confusing", "Foreign"] }}
    after={{ title: "With MAYA", items: ["Clear", "Familiar"] }}
  />
</script>
```

---

## Design System

### Colors
| Purpose | Value | Notes |
|---------|-------|-------|
| Primary accent | `#88da1c` | Lime green |
| Backgrounds | `#fff` (white) | Main slide background |
| Dark blocks | `#000` (black) | Accent containers |
| Error/Before | `#EF4444` | Red for negative |
| Success/After | `#88da1c` | Green for positive |

### Typography
| Element | Size | Weight | Notes |
|---------|------|--------|-------|
| Display headlines | 48-64px max | Bold/Black | **Never exceed 64px** |
| Section headers | 24-36px | Bold | |
| Body text | 14-16px | Normal | Line-height 1.6 |
| Captions | 11-12px | Semibold | Uppercase, letter-spacing |

### Spacing & Radius
- **Rounded corners:** `rounded-2xl` (16px) or `rounded-3xl` (24px) max
- **Shadows:** Subtle only - `shadow-sm` or `shadow-md`
- **Padding:** Generous (p-8 to p-12)
- **Max content width:** `max-w-3xl` or `max-w-4xl` (800px)

---

## Absolute Rules (Never Break)

### Content Rules
1. **Keep all existing lesson materials** - Never delete content, images, or educational substance
2. **Never use emojis** - Only SVG icons from Lucide
3. **Preserve lesson structure** - Same slides, same flow, same teaching points

### Fixed Templates (Same for ALL Lessons)
These slides use the **exact same template** across every lesson:

| Slide | Template Component | Description |
|-------|-------------------|-------------|
| Welcome | `WelcomeSlide` | White background, lesson title, learning goals, duration, "Start Learning" button |
| Quiz | `QuizSlide` | Multiple choice questions, celebration/empathy GIFs, feedback messages |
| Completion | `CompletionSlide` | **Always BRIGHT** (white background), success checkmark, key takeaways, next lesson preview |

### Design Do's
- Use generous whitespace
- Keep typography sizes reasonable (max 48-64px)
- Use subtle animations (fade, slide, scale)
- Create visual hierarchy through spacing, not size
- **Use components from the library 90% of the time**
- Make each lesson visually unique while maintaining consistency

### Design Don'ts
- Use oversized "hero" text (no 100px+ fonts)
- Use flashy gradients or extreme glow effects
- Overcrowd slides with too many elements
- Use multiple competing accent colors
- Make it look like a startup landing page
- Use emojis ever

---

## Component Library Reference

### Location
`genrok-app/src/components/lessons/`

### Available Components (120+)

**Charts:**
- `BarChart` - Horizontal/vertical bar visualization
- `DonutChart` - Circular percentage charts
- `ProgressBar` - Animated progress indicators
- `ProgressRing` - Circular progress with percentage
- `SpeedometerChart` - Gauge-style visualization
- `VennDiagram` - Overlapping concept visualization

**Comparison:**
- `BeforeAfter` - Side-by-side with red/green accents (supports `variant="dark"` or `variant="light"`)
- `DosDonts` - Checkmarks vs X marks
- `ComparisonTable` - Feature comparison table
- `HighlightBox` - Callout boxes (success/warning/error/info variants)
- `ProConList` - Pros and cons lists

**Content:**
- `SplitContent` - 50/50 text + media layout
- `TextBlock` - Elegant typography blocks
- `CenteredContent` - Narrow centered content
- `CodeBlock` - Syntax highlighted code

**Data:**
- `StatCard` - Large number + label display
- `StatRow` - Multiple stats in a row

**Emphasis:**
- `QuoteBlock` - Quotes with attribution
- `KeyTakeaway` - Highlighted insight box
- `NumberedList` - Elegant numbered items
- `IconGrid` - Grid of icons with labels

**Layouts:**
- `BigIdeaLayout` - Hero concept presentation
- `StepByStepLayout` - Process/workflow layout

**Sequential:**
- `StepSequence` - Numbered vertical steps
- `HorizontalSteps` - Horizontal step indicators
- `Timeline` - Chronological milestones
- `Accordion` - Expandable sections

### When to Create Custom Components
Only when:
- The lesson teaches a unique concept needing custom visualization
- Existing components don't adequately represent the idea
- The data/concept is specific to this lesson only

**In 90% of cases, use existing components and just change the props.**

---

## Animation Guidelines

### Acceptable Animations
```jsx
// Subtle fade up
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4, ease: 'easeOut' }}

// Subtle slide in
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}

// Subtle scale
initial={{ scale: 0.95 }}
animate={{ scale: 1 }}

// Stagger delays
transition={{ delay: index * 0.08 }}
```

### Glow Effects
Glow effects for animations are **acceptable** when subtle:
```jsx
// OK - subtle glow
<motion.div
  animate={{ opacity: [0.5, 0.2, 0.5] }}
  className="bg-[#88da1c]/30 blur-xl"
/>
```

### Avoid
- Spring physics with high stiffness (looks bouncy)
- Large movement distances (no `y: 50+`)
- Rotation animations
- 3D transforms (`rotateY`, `rotateX`)
- Extreme pulse/glow effects

---

## Implementation Plan

### Phase 1: Setup (~1-2 hours, one-time)

**Create the shared components bundle:**

1. Create build script: `scripts/build-lesson-components.js`
   - Uses esbuild/webpack to compile all components
   - Outputs to `public/lessons/shared/components.bundle.js`
   - Exposes components via `window.LessonComponents`

2. Include necessary dependencies:
   - React, ReactDOM
   - Framer Motion
   - Lucide icons
   - Component library

**After this setup, every lesson can use any component.**

### Phase 2: Redesign Lessons (one by one)

For each lesson:

1. **Read existing lesson** - Understand content, slides, teaching points
2. **Map slides to components** - Which component fits each concept?
3. **Replace custom code with library components** - Don't recreate, import
4. **Modify only content** - Change props (text, numbers, labels, items)
5. **Test locally** - `npm run dev`, verify renders without errors
6. **Commit** - Push for review

**Estimated time per lesson:** 20-30 minutes

### Lesson Categories
| Category | Count | Status |
|----------|-------|--------|
| Copywriting | 20 | Pending |
| Psychology | TBD | Pending |
| Design | TBD | Pending |
| Marketing | TBD | Pending |

---

## Rejection Log & Learnings

### Rejection #1 (2026-01-15)
**User Feedback:** "These huge texts are unprofessional, should be more minimalistic"

**What was wrong:**
- Used 180px MAYA text
- 96px headlines
- Recreated components instead of using library
- Landing page aesthetics

**Learning:**
- Maximum headline size: 48-64px
- Don't use "hero page" design patterns for educational content
- Use existing components from library 90% of the time
- Only modify content (numbers, text, labels) - don't recreate components
- Make it feel like a premium course, not a startup landing page

### Rejection #2 (2026-01-15)
**User Feedback:** "Use components from library 90% of time, just modify content"

**What was wrong:**
- Writing custom JSX for every slide
- Not leveraging the existing component library

**Learning:**
- Components already have the right design, animations, styling
- Just change the props for lesson-specific content
- Same `BeforeAfter` component, different `items` array
- Same `StatCard` component, different `value` and `label`

---

## Quality Checklist (Per Lesson)

Before marking a lesson redesign as complete:

- [ ] No emojis anywhere (only SVG icons)
- [ ] Welcome slide uses `WelcomeSlide` template
- [ ] Quiz slide uses `QuizSlide` template
- [ ] Completion slide uses `CompletionSlide` template (BRIGHT/white)
- [ ] All existing content preserved
- [ ] Typography sizes reasonable (max 48-64px headlines)
- [ ] Animations are subtle
- [ ] Uses components from library (not custom code)
- [ ] Consistent with design system colors
- [ ] Mobile responsive
- [ ] No JavaScript errors (test in browser)

---

## Code Examples

### Bad (Rejected)
```jsx
// TOO BIG - unprofessional
<h1 className="text-[180px] font-black">MAYA</h1>

// CUSTOM CODE - should use library
<div className="grid grid-cols-2">
  <div className="bg-red-500">Before...</div>
  <div className="bg-green-500">After...</div>
</div>
```

### Good (Approved)
```jsx
// Professional size
<h1 className="text-4xl md:text-5xl font-bold">The MAYA Principle</h1>

// Using library component
<BeforeAfter
  headline="Transform Your Copy"
  before={{
    title: "Without MAYA",
    items: ["Confusing", "Foreign", "Overwhelming"]
  }}
  after={{
    title: "With MAYA",
    items: ["Clear", "Familiar", "Engaging"]
  }}
  variant="dark"
/>
```

---

## Reference Files

| File | Purpose |
|------|---------|
| `src/components/lessons/` | Component library (120+ components) |
| `genrok-app/LESSON-REDESIGN-GUIDE.md` | Design rules quick reference |
| `public/lessons/[slug]/lesson.html` | Existing lesson files |
| `src/components/lessons/slides/WelcomeSlide.tsx` | Welcome template |
| `src/components/lessons/slides/QuizSlide.tsx` | Quiz template |
| `src/components/lessons/slides/CompletionSlide.tsx` | Completion template |
| `src/components/lessons/comparison/BeforeAfter.tsx` | Before/After component |

---

## Getting Started

### Step 1: Create new branch
```bash
git checkout -b redesign-lessons
```

### Step 2: Build components bundle
```bash
# Create the build script and run it
node scripts/build-lesson-components.js
```

### Step 3: Pick first lesson
Start with `familiar-surprise-secret`:
```
genrok-app/public/lessons/familiar-surprise-secret/lesson.html
```

### Step 4: Redesign using components
Replace custom code with library components, keeping all content.

### Step 5: Test
```bash
cd genrok-app && npm run dev
# Open http://localhost:3000/lessons/familiar-surprise-secret
```

### Step 6: Commit & iterate
```bash
git add .
git commit -m "Redesign: familiar-surprise-secret lesson"
```

---

## Success Criteria

A lesson is successfully redesigned when:
1. Uses library components for 90% of slides
2. Looks like premium $100K MBA content
3. Matches Apple/Stripe/Linear aesthetics
4. All content preserved
5. No oversized typography
6. No emojis
7. Renders without errors

---

*Update this document with every piece of feedback to build institutional knowledge.*
