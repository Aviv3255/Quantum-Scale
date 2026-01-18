# Lesson Design Guide - World-Class Interactive Lessons

> **Required reading before designing any lesson**
> This guide ensures every lesson is visually stunning, educationally effective, and uses our 134+ component library to its full potential.

---

## Core Design Philosophy

### The 3 Pillars
1. **Visual Diversity** - Every lesson must feel unique with varied layouts and components
2. **Educational Impact** - Every visual must reinforce the learning, not just look pretty
3. **Professional Polish** - Apple/Stripe-level design quality, no amateur vibes

---

## Mandatory Rules

### Rule 1: Minimum 3 Unique Components Per Lesson
Every lesson MUST include at least **3 different unique component types** beyond the standard slides. Choose from different categories to maximize visual diversity.

**Bad Example (repetitive):**
- BeforeAfter slide
- BeforeAfter slide
- BeforeAfter slide

**Good Example (diverse):**
- SankeyDiagram (flow visualization)
- RadarChart (multi-axis comparison)
- CustomerJourneyMap (process view)

### Rule 2: No Repeated Layouts
If you use a SplitContent slide, the next content slide should be a different component type. Vary layouts every 2-3 slides maximum.

### Rule 3: Match Component to Content
| Content Type | Best Components |
|--------------|-----------------|
| Comparisons | BeforeAfter, ComparisonBars, SlopeChart |
| Processes | FunnelChart, SankeyDiagram, ProcessSteps, FlowChart |
| Hierarchies | PyramidChart, TreeMap, SunburstChart |
| Statistics | DonutChart, BarChart, RadarChart, GaugeChart |
| Relationships | VennDiagram, NetworkGraph, ChordDiagram |
| Journeys | CustomerJourneyMap, Timeline, RoadmapDiagram |
| Positioning | PerformanceMatrix, SWOT, CompetitorMap |
| KPIs | StatRow, KPICard, Scorecard, ProgressRing |

### Rule 4: Dark Variant Default
All components should use `variant="dark"` for the premium dark card aesthetic:
- Black background (#0a0a0a or #1a1a1a gradient)
- Lime green accent (#88da1c)
- White text
- Subtle borders

---

## Component Selection Guide

### TIER 1: High-Impact Visualizations (Use 1-2 per lesson)
These create "wow" moments and should anchor key concepts:

| Component | Best For | Data Shape |
|-----------|----------|------------|
| **SankeyDiagram** | Flow/conversion paths | nodes + links with values |
| **CustomerJourneyMap** | User experience stages | stages with touchpoints |
| **RadarChart** | Multi-attribute comparison | axis + value pairs |
| **TreeMap** | Part-to-whole hierarchy | label + value items |
| **PerformanceMatrix** | 2x2 strategic positioning | items with x, y coordinates |
| **PyramidChart** | Hierarchical levels | label + value tiers |
| **SunburstChart** | Nested categories | hierarchical data |
| **NetworkGraph** | Relationships/connections | nodes + edges |

### TIER 2: Standard Data Visualization (Use 2-4 per lesson)
Essential for presenting data clearly:

| Component | Best For | Data Shape |
|-----------|----------|------------|
| **DonutChart** | Percentage breakdown | segments with values |
| **BarChart** | Value comparison | label + value items |
| **FunnelChart** | Conversion stages | label + value stages |
| **LineChart** | Trends over time | data points array |
| **GaugeChart** | Single metric progress | value + max |
| **StatRow** | Multiple KPIs | stat cards array |
| **ProgressRing** | Goal progress | value + target |

### TIER 3: Layout & Content (Use 2-3 per lesson)
For text-heavy content with visual interest:

| Component | Best For | Data Shape |
|-----------|----------|------------|
| **SplitContent** | Text + media side-by-side | content + media object |
| **BeforeAfter** | Transformation examples | before + after states |
| **Timeline** | Sequential events | milestone items |
| **ProcessSteps** | Step-by-step guide | numbered steps |
| **IconGrid** | Feature/benefit lists | icon + text items |
| **QuoteBlock** | Expert quotes | quote + attribution |

### TIER 4: Specialty (Use for specific needs)

| Component | Best For |
|-----------|----------|
| **VennDiagram** | Overlapping concepts |
| **SWOT** | Strategic analysis |
| **Heatmap** | Intensity patterns |
| **CalendarHeatmap** | Activity over time |
| **ComparisonSlider** | Before/after images |
| **DecisionTree** | Choice paths |
| **FlowChart** | Process logic |

---

## Lesson Structure Template

### Slide Flow Pattern
```
1. WelcomeSlide (fixed)
2. Hook slide (custom - grab attention)
3. HIGH-IMPACT COMPONENT #1 (Tier 1 - main concept)
4. SplitContent (explanation)
5. DATA VISUALIZATION #1 (Tier 2 - supporting data)
6. BeforeAfter (practical example)
7. HIGH-IMPACT COMPONENT #2 (Tier 1 - second concept)
8. ProcessSteps or Timeline (actionable steps)
9. QuoteBlock (authority)
10. DATA VISUALIZATION #2 (Tier 2 - results/proof)
11. StatRow (key metrics)
12. QuizSlide (fixed)
13. CompletionSlide (fixed)
```

### Component Rotation Strategy
To ensure diversity across lessons, rotate through these component "families":

**Family A (Flow):** SankeyDiagram, FunnelChart, FlowChart, CustomerJourneyMap
**Family B (Hierarchy):** PyramidChart, TreeMap, SunburstChart, IcicleChart
**Family C (Comparison):** RadarChart, PerformanceMatrix, ComparisonBars, SlopeChart
**Family D (Data):** DonutChart, BarChart, GaugeChart, Heatmap
**Family E (Network):** VennDiagram, NetworkGraph, ChordDiagram, MindMap

Each lesson should use components from at least 2-3 different families.

---

## Color System

### Primary Accent
```css
--accent: #88da1c;        /* Lime green - primary */
--accent-dark: #6fb816;   /* Darker variant */
--accent-light: #a3e635;  /* Lighter variant */
--accent-rgb: 136, 218, 28;
```

### Chart Colors (in order of preference)
```javascript
const chartColors = [
  '#88da1c', // Lime green (primary)
  '#22C55E', // Emerald
  '#3B82F6', // Blue
  '#A855F7', // Purple
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#06B6D4', // Cyan
  '#EC4899', // Pink
];
```

### Semantic Colors
```javascript
positive: '#22C55E'  // Green - success, good
neutral: '#F59E0B'   // Amber - neutral, caution
negative: '#EF4444'  // Red - error, bad
```

---

## Component Implementation Pattern

Every custom component should follow this inline structure:

```javascript
const MyCustomSlide = ({ data }) => {
  return (
    <div className="h-full flex flex-col justify-center px-6 md:px-12 max-w-5xl mx-auto py-6">
      {/* Badge/Label */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
             style={{ background: 'rgba(136, 218, 28, 0.1)', color: 'var(--accent)' }}>
          <Icons.Zap />
          <span>Category Label</span>
        </div>
        <h2 className="slide-title text-2xl md:text-3xl text-black">{data.title}</h2>
      </motion.div>

      {/* Dark Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl p-6 md:p-10 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
          border: '1px solid #333',
          boxShadow: '0 0 60px rgba(136, 218, 28, 0.1)'
        }}>
        {/* Accent top bar */}
        <div className="absolute top-0 left-0 right-0 h-1"
             style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />

        {/* Component content here */}
      </motion.div>
    </div>
  );
};
```

---

## Animation Guidelines

### Stagger Delays
```javascript
// Items in a list/grid
items.map((item, i) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 + i * 0.05 }} // Stagger by 50ms
  />
))
```

### Path Animations (for charts)
```javascript
<motion.path
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 1.5, ease: 'easeOut' }}
/>
```

### Scale Animations (for data points)
```javascript
<motion.circle
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
/>
```

---

## Quality Checklist

Before completing a lesson, verify:

### Visual Diversity
- [ ] At least 3 unique component types used
- [ ] Components from 2+ different families
- [ ] No more than 2 consecutive slides with same layout type
- [ ] At least 1 Tier 1 (high-impact) visualization

### Color Consistency
- [ ] All accents use lime green (#88da1c or var(--accent))
- [ ] No purple, teal, or off-brand colors
- [ ] Dark cards have consistent gradient background
- [ ] Chart colors follow the approved palette

### Content Match
- [ ] Each component type matches the data it displays
- [ ] Visualizations enhance understanding (not just decoration)
- [ ] Data labels are clear and readable

### Technical
- [ ] All animations use Framer Motion
- [ ] Components are defined inline (no bundle imports)
- [ ] Responsive classes for mobile/desktop

---

## Component Examples by Lesson Topic

### For Sales/Marketing Lessons
- **FunnelChart** - Conversion rates
- **CustomerJourneyMap** - Buyer journey
- **SankeyDiagram** - Traffic/revenue flow
- **PerformanceMatrix** - Product positioning

### For Psychology Lessons
- **RadarChart** - Cognitive biases
- **VennDiagram** - Overlapping concepts
- **PyramidChart** - Hierarchy of needs/effects
- **NetworkGraph** - Influence connections

### For Business Strategy Lessons
- **SWOT** - Strategic analysis
- **TreeMap** - Resource allocation
- **PerformanceMatrix** - BCG matrix
- **RoadmapDiagram** - Timeline planning

### For Data/Analytics Lessons
- **Heatmap** - Pattern visualization
- **BarChart** - Metric comparison
- **LineChart** - Trend analysis
- **Scorecard** - KPI dashboard

---

## Anti-Patterns (What NOT to Do)

### DON'T: Use the same component repeatedly
```javascript
// BAD
slides: [
  { type: 'before-after', ... },
  { type: 'before-after', ... },
  { type: 'before-after', ... },
]
```

### DON'T: Use generic charts for complex concepts
```javascript
// BAD - Simple bar chart for conversion funnel
{ type: 'bar-chart', data: [{ label: 'Stage 1', value: 100 }...] }

// GOOD - Actual funnel or Sankey
{ type: 'funnel-chart', data: [...] }
{ type: 'sankey-diagram', nodes: [...], links: [...] }
```

### DON'T: Ignore the component's intended purpose
```javascript
// BAD - Using RadarChart for time series data
// BAD - Using PyramidChart for non-hierarchical data
// BAD - Using CustomerJourneyMap without actual journey stages
```

### DON'T: Use off-brand colors
```javascript
// BAD
color: '#8b5cf6'  // Purple
color: '#0d9488'  // Teal

// GOOD
color: 'var(--accent)'
color: '#88da1c'
```

---

## Quick Reference Card

**Minimum per lesson:**
- 3+ unique component types
- 1+ Tier 1 (high-impact) visualization
- 2+ different component families

**Always use:**
- `variant="dark"` for dark theme
- Lime green (#88da1c) as primary accent
- Framer Motion for animations
- Staggered delays for lists

**Never use:**
- Purple (#8b5cf6)
- Teal (#0d9488)
- More than 2 consecutive same-type slides
- Generic charts where specialty charts fit better

---

*Last updated: January 2026*
