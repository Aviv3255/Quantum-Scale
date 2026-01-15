# Lesson Redesign Guide

> **Master document for redesigning all lessons to world-class, premium quality.**
> Update this document with every feedback/rejection to capture learnings.

---

## Core Philosophy

**Goal:** Create $100,000 MBA-level educational content that looks like it belongs on Apple, Stripe, or Linear's website.

**Style:** Minimalistic, professional, clean. NOT flashy, NOT oversized, NOT cluttered.

---

## Absolute Rules (Never Break)

### Content Rules
1. **Keep all existing lesson materials** - Never delete content, images, or educational substance
2. **Never use emojis** - Only SVG icons from the Icons library
3. **Preserve lesson structure** - Same slides, same flow, same teaching points

### Template Rules (Fixed Across ALL Lessons)
These slides use the **exact same template** for every lesson:

| Slide | Template | Notes |
|-------|----------|-------|
| Welcome | `WelcomeSlide` | White background, lesson title, learning goals, duration, "Start Learning" button |
| Quiz | `QuizSlide` | Multiple choice, celebration/empathy GIFs, feedback messages |
| Completion | `CompletionSlide` | **Always BRIGHT** (white background), success checkmark, key takeaway, next lesson preview |

### Design System
- **Primary accent:** `#88da1c` (lime green)
- **Backgrounds:** Pure white `#fff` for slides, black `#000` for dark accent blocks
- **Typography:** Inter font family
- **Rounded corners:** `rounded-2xl` (16px) or `rounded-3xl` (24px) max - NOT 32px
- **Shadows:** Subtle only - `shadow-sm` or `shadow-md`

---

## Design Principles

### DO
- Use generous whitespace
- Keep typography sizes reasonable (max 48-64px for headlines)
- Use subtle animations (fade, slide, scale)
- Create visual hierarchy through spacing, not size
- Use components from the component library
- Make each lesson visually unique while maintaining consistency

### DON'T
- Use oversized "hero" text (no 100px+ fonts)
- Use flashy gradients or glow effects
- Overcrowd slides with too many elements
- Use multiple competing accent colors
- Make it look like a startup landing page
- Use emojis ever

---

## Component Library Usage

> **CRITICAL: Use existing components 90% of the time!**
> Don't recreate components - import them and just modify the props/content.
> The components already have the right design, animations, and styling.

### Available Components (in `src/components/lessons/`)

**Charts:**
- `BarChart` - horizontal/vertical bars
- `DonutChart` - circular percentages
- `ProgressBar` - animated progress
- `ProgressRing` - circular progress indicator
- `SpeedometerChart` - gauge visualization
- `VennDiagram` - overlapping concepts

**Comparison:**
- `BeforeAfter` - side-by-side with red/green accents
- `DosDonts` - checkmarks vs X marks
- `ComparisonTable` - feature comparison
- `HighlightBox` - callout boxes (success/warning/error/info)
- `ProConList` - pros and cons

**Content:**
- `SplitContent` - 50/50 text + media
- `TextBlock` - elegant typography
- `CenteredContent` - narrow centered content
- `CodeBlock` - syntax highlighted code

**Data:**
- `StatCard` - large number + label
- `StatRow` - multiple stats in a row

**Emphasis:**
- `QuoteBlock` - quotes with attribution
- `KeyTakeaway` - highlighted insight box
- `NumberedList` - elegant numbered items
- `IconGrid` - grid of icons with labels

**Layouts:**
- `BigIdeaLayout` - hero concept presentation
- `StepByStepLayout` - process/workflow

**Sequential:**
- `StepSequence` - numbered vertical steps
- `HorizontalSteps` - horizontal step indicators
- `Timeline` - chronological milestones
- `Accordion` - expandable sections

### When to Create Custom Components
- When the lesson teaches a unique concept that needs custom visualization
- When existing components don't adequately represent the idea
- When the data/concept is specific to this lesson only

---

## Slide Design Guidelines

### Content Slides (Teaching Slides)
- **Headlines:** 24-36px, font-bold or font-black
- **Body text:** 14-16px, adequate line-height (1.6)
- **Max content width:** 800px (use `max-w-3xl` or `max-w-4xl`)
- **Padding:** Generous (p-8 to p-12)
- **One main idea per slide**

### Data/Stats Slides
- Use StatCard, ProgressRing, or BarChart components
- Keep numbers readable (not too large)
- Include context/labels for every number
- Animate numbers on entry (subtle, not flashy)

### Comparison Slides
- Use BeforeAfter or DosDonts components
- Clear visual distinction (red for bad, green for good)
- Equal visual weight to both sides

### Example/Case Study Slides
- Include real-world context
- Use quotes or specific examples
- Show the transformation (before → after)

---

## Animation Guidelines

### Acceptable Animations
- `initial={{ opacity: 0, y: 20 }}` - subtle fade up
- `initial={{ opacity: 0, x: -20 }}` - subtle slide in
- `initial={{ scale: 0.95 }}` - subtle scale
- Stagger delays: 0.05s to 0.1s between items

### Avoid
- Spring physics with high stiffness (looks bouncy/unprofessional)
- Large movement distances (no y: 50+)
- Rotation animations
- Glow/pulse effects
- 3D transforms (rotateY, rotateX)

---

## Rejection Log & Learnings

### Rejection #1 (2026-01-15)
**Feedback:** "These huge texts are unprofessional, should be more minimalistic"

**Issue:** Used 180px MAYA text, 96px headlines, recreated components instead of using library

**Learning:**
- Maximum headline size should be 48-64px
- Don't use "hero page" design patterns for educational content
- **Glow effects for animations are GOOD - keep them**
- Use existing components from library 90% of the time
- Only modify content (numbers, text, labels) - don't recreate components

**Changes to make:**
- Reduce all oversized typography
- **USE THE COMPONENT LIBRARY** - import existing components
- Just change the props/content, not the component design
- Make it feel like a premium course, not a landing page

---

## Quality Checklist

Before marking a lesson redesign as complete, verify:

- [ ] No emojis anywhere (only SVG icons)
- [ ] Welcome slide uses standard template
- [ ] Quiz slide uses standard template
- [ ] Completion slide uses standard template (BRIGHT/white)
- [ ] All existing content preserved
- [ ] Typography sizes are reasonable (max 48-64px headlines)
- [ ] Animations are subtle (no bounce, no glow)
- [ ] Uses components from library where appropriate
- [ ] Consistent with design system colors
- [ ] Mobile responsive
- [ ] No JavaScript errors (test in browser)

---

## Example: Good vs Bad

### Bad (Rejected)
```jsx
// TOO BIG - unprofessional
<h1 className="text-[180px] font-black">MAYA</h1>

// TOO FLASHY - glow effects
style={{ boxShadow: '0 0 60px rgba(136,218,28,0.5)' }}

// TOO BOUNCY - spring physics
transition={{ type: 'spring', stiffness: 150 }}
```

### Good (Approved)
```jsx
// Professional size
<h1 className="text-4xl md:text-5xl font-bold">The MAYA Principle</h1>

// Subtle shadow
style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}

// Smooth animation
transition={{ duration: 0.4, ease: 'easeOut' }}
```

---

## Lesson Categories & Count

| Category | Lessons | Status |
|----------|---------|--------|
| Copywriting | 20 | Pending |
| Psychology | TBD | Pending |
| Design | TBD | Pending |
| Marketing | TBD | Pending |

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-15 | 0.1 | Initial guide created |
| 2026-01-15 | 0.2 | Added rejection #1 - reduce typography sizes, more minimalistic |

---

*This document should be updated with every piece of feedback to build institutional knowledge for lesson redesigns.*
