// Copywriting Lessons Configuration for CRM
// Each lesson has: image prompts (0-2) and component slots (2-4 slides with 3 options each)

export interface ImagePrompt {
  slideIndex: number;
  background: 'white' | 'black';
  prompt: string;
  context: string; // What the image should represent
}

export interface ComponentOption {
  id: string;
  name: string;
  description: string;
  previewData: Record<string, unknown>; // Pre-filled data for this lesson
}

export interface ComponentSlot {
  slideIndex: number;
  slideTitle: string;
  currentType: string; // Current slide type
  options: [ComponentOption, ComponentOption, ComponentOption]; // Always 3 options
}

export interface LessonConfig {
  slug: string;
  title: string;
  description: string;
  imagePrompts: ImagePrompt[];
  componentSlots: ComponentSlot[];
}

// Helper to create professional image prompts
const createImagePrompt = (
  slideIndex: number,
  background: 'white' | 'black',
  subject: string,
  style: string = 'minimalist'
): ImagePrompt => ({
  slideIndex,
  background,
  prompt: `Professional ${style} illustration on pure ${background === 'white' ? 'white (#FFFFFF)' : 'black (#000000)'} background. ${subject}. Ultra-clean, no text, no watermarks. Sharp edges, high contrast. Editorial quality, suitable for premium SaaS. 1024x1024.`,
  context: subject,
});

// ============================================
// COPYWRITING LESSONS CONFIGURATION
// ============================================

export const copywritingLessonsConfig: LessonConfig[] = [
  {
    slug: 'familiar-surprise-secret',
    title: 'The Familiar Surprise Secret',
    description: 'Master the MAYA principle - 70% familiar + 30% novel',
    imagePrompts: [
      createImagePrompt(3, 'white', 'A brain split in two halves - one side showing comfortable familiar patterns, other side with exciting new neural pathways lighting up. Metaphor for MAYA principle'),
      createImagePrompt(6, 'black', 'Golden ratio spiral transitioning from solid to innovative - representing the 70/30 balance of familiar to novel'),
    ],
    componentSlots: [
      {
        slideIndex: 3,
        slideTitle: 'The MAYA Principle',
        currentType: 'maya',
        options: [
          {
            id: 'VennDiagram',
            name: 'Venn Diagram',
            description: 'Two overlapping circles showing Familiar vs Novel',
            previewData: {
              title: 'The MAYA Sweet Spot',
              leftLabel: 'Familiar (70%)',
              leftItems: ['Known problems', 'Their language', 'Trusted formats'],
              rightLabel: 'Novel (30%)',
              rightItems: ['Unique mechanism', 'Fresh angle', 'Surprising twist'],
              overlapLabel: 'MAYA Zone',
              overlapItems: ['Maximum appeal', 'Instant trust + desire'],
            },
          },
          {
            id: 'SlopeChart',
            name: 'Slope Chart',
            description: 'Show engagement difference between approaches',
            previewData: {
              title: 'Engagement by Approach',
              leftLabel: '100% Novel',
              rightLabel: '70/30 MAYA',
              items: [
                { label: 'Click Rate', leftValue: 2.1, rightValue: 6.8 },
                { label: 'Trust Score', leftValue: 35, rightValue: 78 },
                { label: 'Conversion', leftValue: 0.8, rightValue: 3.2 },
              ],
            },
          },
          {
            id: 'DonutChart',
            name: 'Donut Chart',
            description: 'Visual ratio of 70% familiar / 30% novel',
            previewData: {
              title: 'The Perfect Balance',
              segments: [
                { label: 'Familiar Foundation', value: 70, color: '#88da1c' },
                { label: 'Novel Twist', value: 30, color: '#000' },
              ],
              centerLabel: 'MAYA',
              centerValue: 'Principle',
            },
          },
        ],
      },
      {
        slideIndex: 8,
        slideTitle: 'Brain Science Stats',
        currentType: 'stats',
        options: [
          {
            id: 'StatCard',
            name: 'Stat Cards',
            description: 'Three key metrics in card format',
            previewData: {
              stats: [
                { value: '40%', label: 'Faster Processing', desc: 'Brain handles familiar things faster' },
                { value: '0', label: 'Dopamine for Pure Familiar', desc: 'No excitement = no action' },
                { value: '2x', label: 'Engagement Boost', desc: 'Novel-familiar mix doubles attention' },
              ],
            },
          },
          {
            id: 'GaugeChart',
            name: 'Gauge Charts',
            description: 'Visual meters showing optimal levels',
            previewData: {
              gauges: [
                { label: 'Familiarity', value: 70, max: 100, color: '#88da1c' },
                { label: 'Novelty', value: 30, max: 100, color: '#000' },
                { label: 'Engagement', value: 85, max: 100, color: '#22c55e' },
              ],
            },
          },
          {
            id: 'BarChart',
            name: 'Comparison Bars',
            description: 'Side-by-side comparison of metrics',
            previewData: {
              title: 'Brain Response Metrics',
              bars: [
                { label: 'Processing Speed', familiar: 85, novel: 45 },
                { label: 'Attention Capture', familiar: 30, novel: 90 },
                { label: 'Trust Level', familiar: 95, novel: 20 },
              ],
            },
          },
        ],
      },
      {
        slideIndex: 11,
        slideTitle: 'MAYA Checklist',
        currentType: 'checklist',
        options: [
          {
            id: 'IconGrid',
            name: 'Icon Grid',
            description: 'Checklist with visual icons',
            previewData: {
              title: 'Quick MAYA Checklist',
              items: [
                { icon: 'MessageSquare', title: 'Headline', text: 'References a problem in their words?' },
                { icon: 'Lightbulb', title: 'Subheadline', text: 'Hints at fresh angle without confusion?' },
                { icon: 'FileText', title: 'Body Copy', text: 'Anchors to familiar before mechanism?' },
                { icon: 'MousePointer', title: 'CTA', text: 'Safe enough to click, exciting enough to want?' },
              ],
            },
          },
          {
            id: 'Timeline',
            name: 'Vertical Timeline',
            description: 'Step-by-step checklist flow',
            previewData: {
              title: 'MAYA Page Audit',
              steps: [
                { title: 'Headline', desc: 'Problem in their words', status: 'check' },
                { title: 'Subheadline', desc: 'Fresh angle hinted', status: 'check' },
                { title: 'Body', desc: 'Familiar → mechanism', status: 'check' },
                { title: 'CTA', desc: 'Safe + exciting', status: 'check' },
              ],
            },
          },
          {
            id: 'ProcessSteps',
            name: 'Process Steps',
            description: 'Numbered process flow',
            previewData: {
              title: 'Page Review Process',
              steps: [
                { num: '01', title: 'Check Headline', desc: 'Their words, their problem' },
                { num: '02', title: 'Check Subhead', desc: 'Novel angle, not confusing' },
                { num: '03', title: 'Check Body', desc: 'Familiar anchors first' },
                { num: '04', title: 'Check CTA', desc: 'Balanced appeal' },
              ],
            },
          },
        ],
      },
    ],
  },

  {
    slug: 'red-button-effect',
    title: 'The Red Button Effect',
    description: 'Why "don\'t click this" makes people click 3x more',
    imagePrompts: [
      createImagePrompt(2, 'black', 'A glowing red button with "DO NOT PRESS" label, surrounded by magnetic force lines pulling a hand toward it. Forbidden fruit psychology visualization'),
    ],
    componentSlots: [
      {
        slideIndex: 4,
        slideTitle: 'Reactance Stats',
        currentType: 'reactance-stats',
        options: [
          {
            id: 'StatCard',
            name: 'Stat Cards',
            description: 'Three reactance metrics',
            previewData: {
              stats: [
                { value: '200ms', label: 'Trigger Time', desc: 'Instant brain response to restriction' },
                { value: '3x', label: 'Desire Boost', desc: 'Restricted items feel more valuable' },
                { value: '47%', label: 'More Clicks', desc: 'Forbidden CTAs outperform standard' },
              ],
            },
          },
          {
            id: 'GaugeChart',
            name: 'Gauge Meters',
            description: 'Visual meters showing psychological response',
            previewData: {
              gauges: [
                { label: 'Reaction Speed', value: 95, max: 100 },
                { label: 'Desire Increase', value: 300, max: 400 },
                { label: 'CTR Boost', value: 47, max: 100 },
              ],
            },
          },
          {
            id: 'BarChart',
            name: 'Comparison Bars',
            description: 'Standard vs Forbidden CTA comparison',
            previewData: {
              title: 'CTA Performance',
              bars: [
                { label: 'Standard CTA', value: 2.1 },
                { label: 'Forbidden CTA', value: 6.8 },
              ],
            },
          },
        ],
      },
      {
        slideIndex: 3,
        slideTitle: 'Brain Response',
        currentType: 'brain-response',
        options: [
          {
            id: 'Timeline',
            name: 'Timeline Flow',
            description: 'Step-by-step brain response',
            previewData: {
              title: 'The Reactance Cascade',
              steps: [
                { title: 'Restriction Detected', desc: '"Don\'t click this"' },
                { title: 'Freedom Threatened', desc: 'Brain rebels instantly' },
                { title: 'Must Restore Control', desc: 'Tension builds' },
                { title: 'CLICK', desc: 'Action taken' },
              ],
            },
          },
          {
            id: 'ProcessSteps',
            name: 'Process Flow',
            description: 'Numbered cascade steps',
            previewData: {
              steps: [
                { num: '01', title: 'Detect', desc: 'Brain spots the restriction' },
                { num: '02', title: 'Rebel', desc: 'Freedom response triggers' },
                { num: '03', title: 'Build', desc: 'Tension and desire grow' },
                { num: '04', title: 'Act', desc: 'Click to restore control' },
              ],
            },
          },
          {
            id: 'FunnelChart',
            name: 'Funnel',
            description: 'Psychological funnel to action',
            previewData: {
              title: 'Reactance Funnel',
              stages: [
                { label: 'See Restriction', value: 100 },
                { label: 'Feel Threatened', value: 85 },
                { label: 'Build Tension', value: 70 },
                { label: 'Take Action', value: 47 },
              ],
            },
          },
        ],
      },
      {
        slideIndex: 6,
        slideTitle: 'The 5 Triggers',
        currentType: 'five-triggers',
        options: [
          {
            id: 'IconGrid',
            name: 'Trigger Cards',
            description: 'Five trigger patterns with examples',
            previewData: {
              items: [
                { title: '"Don\'t buy this if..."', text: 'Forces them to prove they ARE ready' },
                { title: '"This isn\'t for everyone"', text: 'Triggers need to qualify as exception' },
                { title: '"Warning: May cause..."', text: 'Positions product as powerful' },
                { title: '"Skip this if..."', text: 'Nobody wants to admit that' },
                { title: '"Only click if..."', text: 'Creates exclusive identity' },
              ],
            },
          },
          {
            id: 'StackedList',
            name: 'Stacked List',
            description: 'Expandable trigger examples',
            previewData: {
              items: [
                { trigger: '"Don\'t buy if..."', example: '"Don\'t buy if you\'re not ready for compliments."' },
                { trigger: '"Not for everyone"', example: '"This product isn\'t for casual shoppers."' },
                { trigger: '"Warning..."', example: '"Warning: May cause neighbors to ask where you got that."' },
                { trigger: '"Skip if..."', example: '"Skip if you\'re happy with slow results."' },
                { trigger: '"Only if..."', example: '"Only click if you\'re serious about transformation."' },
              ],
            },
          },
          {
            id: 'ComparisonBars',
            name: 'Trigger Effectiveness',
            description: 'Bar chart of each trigger\'s CTR boost',
            previewData: {
              title: 'Trigger Effectiveness',
              bars: [
                { label: 'Don\'t buy if...', value: 224 },
                { label: 'Not for everyone', value: 187 },
                { label: 'Warning...', value: 156 },
                { label: 'Skip if...', value: 142 },
                { label: 'Only if...', value: 198 },
              ],
            },
          },
        ],
      },
    ],
  },

  {
    slug: 'fred-method',
    title: 'The F.R.E.D. Method',
    description: 'The 4-letter framework for audience psychology',
    imagePrompts: [
      createImagePrompt(4, 'white', 'Four interconnected gears labeled F, R, E, D - each gear driving the next. Clean mechanical metaphor for the framework'),
      createImagePrompt(8, 'black', 'A detective magnifying glass revealing hidden customer fears, reactions, emotions, and desires - glowing text elements'),
    ],
    componentSlots: [
      {
        slideIndex: 4,
        slideTitle: 'The F.R.E.D. Framework',
        currentType: 'framework',
        options: [
          {
            id: 'ProcessSteps',
            name: 'Process Steps',
            description: 'Four-step framework visualization',
            previewData: {
              title: 'The F.R.E.D. Method',
              steps: [
                { num: 'F', title: 'Fears', desc: 'What keeps them up at night?' },
                { num: 'R', title: 'Reactions', desc: 'How do they respond to problems?' },
                { num: 'E', title: 'Emotions', desc: 'What do they feel about their situation?' },
                { num: 'D', title: 'Desires', desc: 'What do they secretly want?' },
              ],
            },
          },
          {
            id: 'IconGrid',
            name: 'Icon Grid',
            description: 'Four quadrants with icons',
            previewData: {
              items: [
                { icon: 'AlertTriangle', title: 'F - Fears', text: 'Their deepest worries and concerns' },
                { icon: 'Zap', title: 'R - Reactions', text: 'How they respond to problems' },
                { icon: 'Heart', title: 'E - Emotions', text: 'What they feel about the situation' },
                { icon: 'Target', title: 'D - Desires', text: 'What they secretly want most' },
              ],
            },
          },
          {
            id: 'RadarChart',
            name: 'Radar Chart',
            description: 'Customer psychology radar',
            previewData: {
              title: 'Customer Psychology Profile',
              axes: ['Fears', 'Reactions', 'Emotions', 'Desires'],
              data: [85, 70, 90, 95],
            },
          },
        ],
      },
      {
        slideIndex: 7,
        slideTitle: 'Application Example',
        currentType: 'example',
        options: [
          {
            id: 'BeforeAfter',
            name: 'Before/After',
            description: 'Without vs With F.R.E.D.',
            previewData: {
              before: { title: 'Generic Copy', text: 'Our product solves your problems effectively.' },
              after: { title: 'F.R.E.D. Applied', text: 'Tired of lying awake worrying about bills? Join 10,000+ who finally breathe easy.' },
            },
          },
          {
            id: 'SplitContent',
            name: 'Split Comparison',
            description: 'Side-by-side comparison',
            previewData: {
              left: { title: 'Before F.R.E.D.', items: ['Generic benefits', 'Feature lists', 'No emotional hook'] },
              right: { title: 'After F.R.E.D.', items: ['Speaks to fears', 'Triggers reactions', 'Taps desires'] },
            },
          },
          {
            id: 'ComparisonBars',
            name: 'Results Comparison',
            description: 'Conversion improvement',
            previewData: {
              title: 'Conversion Rate',
              bars: [
                { label: 'Generic Copy', value: 1.2 },
                { label: 'F.R.E.D. Applied', value: 4.7 },
              ],
            },
          },
        ],
      },
    ],
  },

  {
    slug: 'emotion-decides',
    title: 'Emotion Decides, Logic Justifies',
    description: 'How emotions drive purchases',
    imagePrompts: [
      createImagePrompt(3, 'white', 'A heart and brain connected by arrows - heart labeled "DECIDES" in bold, brain labeled "justifies" in smaller text. Shows emotional dominance in decision-making'),
    ],
    componentSlots: [
      {
        slideIndex: 4,
        slideTitle: 'The Decision Process',
        currentType: 'process',
        options: [
          {
            id: 'Timeline',
            name: 'Decision Timeline',
            description: 'Sequential decision flow',
            previewData: {
              steps: [
                { title: 'Emotional Trigger', desc: 'Heart responds first (0.5s)' },
                { title: 'Desire Forms', desc: '"I want this"' },
                { title: 'Logic Activates', desc: 'Brain seeks justification' },
                { title: 'Purchase', desc: 'Action taken with "reasons"' },
              ],
            },
          },
          {
            id: 'FunnelChart',
            name: 'Decision Funnel',
            description: 'Emotional to logical flow',
            previewData: {
              stages: [
                { label: 'Emotional Response', value: 100 },
                { label: 'Desire Created', value: 85 },
                { label: 'Logic Justifies', value: 70 },
                { label: 'Purchase', value: 45 },
              ],
            },
          },
          {
            id: 'ProcessSteps',
            name: 'Process Flow',
            description: 'Four-step decision process',
            previewData: {
              steps: [
                { num: '01', title: 'Feel', desc: 'Emotion triggers in 0.5 seconds' },
                { num: '02', title: 'Want', desc: 'Desire forms unconsciously' },
                { num: '03', title: 'Justify', desc: 'Logic finds supporting reasons' },
                { num: '04', title: 'Buy', desc: 'Action feels "rational"' },
              ],
            },
          },
        ],
      },
      {
        slideIndex: 7,
        slideTitle: 'Stats & Data',
        currentType: 'stats',
        options: [
          {
            id: 'DonutChart',
            name: 'Decision Split',
            description: 'Emotion vs Logic ratio',
            previewData: {
              segments: [
                { label: 'Emotional Decision', value: 95, color: '#88da1c' },
                { label: 'Logical Decision', value: 5, color: '#000' },
              ],
              centerLabel: '95%',
              centerValue: 'Emotion-Driven',
            },
          },
          {
            id: 'StatCard',
            name: 'Key Stats',
            description: 'Research-backed numbers',
            previewData: {
              stats: [
                { value: '95%', label: 'Emotional', desc: 'Decisions made subconsciously' },
                { value: '0.5s', label: 'Response Time', desc: 'Emotion triggers before logic' },
                { value: '3x', label: 'Conversion Lift', desc: 'Emotion-first copy performance' },
              ],
            },
          },
          {
            id: 'GaugeChart',
            name: 'Decision Gauge',
            description: 'Visual emotion vs logic meter',
            previewData: {
              gauges: [
                { label: 'Emotion Influence', value: 95, max: 100, color: '#88da1c' },
                { label: 'Logic Influence', value: 5, max: 100, color: '#666' },
              ],
            },
          },
        ],
      },
    ],
  },

  {
    slug: 'gatekeeper-method',
    title: 'The Gatekeeper Method',
    description: 'Bypass the brain\'s attention filter',
    imagePrompts: [
      createImagePrompt(3, 'black', 'A brain with a bouncer/gatekeeper at the entrance, letting only certain messages through a velvet rope. VIP access metaphor for attention'),
      createImagePrompt(7, 'white', 'A flood of messages hitting a filter, with only a few golden messages passing through. Shows attention scarcity'),
    ],
    componentSlots: [
      {
        slideIndex: 4,
        slideTitle: 'The Gatekeeper Stats',
        currentType: 'stats',
        options: [
          {
            id: 'StatCard',
            name: 'Attention Stats',
            description: 'Key gatekeeper metrics',
            previewData: {
              stats: [
                { value: '11M', label: 'Bits/Second', desc: 'Sensory input to brain' },
                { value: '50', label: 'Bits Processed', desc: 'What conscious mind handles' },
                { value: '99.9%', label: 'Filtered Out', desc: 'Messages never seen' },
              ],
            },
          },
          {
            id: 'FunnelChart',
            name: 'Attention Funnel',
            description: 'Information filtering funnel',
            previewData: {
              stages: [
                { label: 'Sensory Input', value: 11000000 },
                { label: 'Subconscious Processing', value: 100000 },
                { label: 'Attention Threshold', value: 1000 },
                { label: 'Conscious Awareness', value: 50 },
              ],
            },
          },
          {
            id: 'GaugeChart',
            name: 'Filter Gauge',
            description: 'Visual filtering representation',
            previewData: {
              gauges: [
                { label: 'Messages Blocked', value: 99.9, max: 100, color: '#ef4444' },
                { label: 'Messages Through', value: 0.1, max: 100, color: '#88da1c' },
              ],
            },
          },
        ],
      },
      {
        slideIndex: 6,
        slideTitle: 'Bypass Techniques',
        currentType: 'techniques',
        options: [
          {
            id: 'IconGrid',
            name: 'Technique Cards',
            description: 'Four bypass methods',
            previewData: {
              items: [
                { icon: 'AlertTriangle', title: 'Threat Detection', text: 'Danger signals bypass filter' },
                { icon: 'User', title: 'Self-Reference', text: 'Their name, their problem' },
                { icon: 'Sparkles', title: 'Pattern Break', text: 'Unexpected stops scrolling' },
                { icon: 'Heart', title: 'Emotional Charge', text: 'Strong feelings get through' },
              ],
            },
          },
          {
            id: 'ProcessSteps',
            name: 'Bypass Protocol',
            description: 'Step-by-step bypass method',
            previewData: {
              steps: [
                { num: '01', title: 'Pattern Break', desc: 'Stop the scroll with unexpected' },
                { num: '02', title: 'Self-Reference', desc: 'Make it about THEM' },
                { num: '03', title: 'Emotional Hook', desc: 'Trigger feeling, not thinking' },
                { num: '04', title: 'Curiosity Gap', desc: 'Create need to know more' },
              ],
            },
          },
          {
            id: 'RadarChart',
            name: 'Bypass Radar',
            description: 'Effectiveness of each technique',
            previewData: {
              title: 'Bypass Effectiveness',
              axes: ['Threat', 'Self-Ref', 'Pattern Break', 'Emotion'],
              data: [95, 88, 76, 92],
            },
          },
        ],
      },
    ],
  },

  {
    slug: 'three-second-rule',
    title: 'The 3-Second Rule',
    description: 'The critical window to capture attention',
    imagePrompts: [
      createImagePrompt(2, 'black', 'A stopwatch showing exactly 3 seconds, with sand falling through an hourglass in the background. Urgency visualization'),
    ],
    componentSlots: [
      {
        slideIndex: 3,
        slideTitle: 'The 3-Second Window',
        currentType: 'stats',
        options: [
          {
            id: 'GaugeChart',
            name: 'Time Gauge',
            description: 'Visual 3-second countdown',
            previewData: {
              gauges: [
                { label: 'Attention Window', value: 3, max: 10, color: '#88da1c' },
                { label: 'Decision Made', value: 100, max: 100, color: '#ef4444' },
              ],
            },
          },
          {
            id: 'Timeline',
            name: 'Critical Timeline',
            description: 'What happens in 3 seconds',
            previewData: {
              steps: [
                { title: 'Second 1', desc: 'Eyes land, brain scans' },
                { title: 'Second 2', desc: 'Relevance assessment' },
                { title: 'Second 3', desc: 'Stay or scroll decision' },
              ],
            },
          },
          {
            id: 'StatCard',
            name: 'Stat Cards',
            description: 'Key timing metrics',
            previewData: {
              stats: [
                { value: '3s', label: 'Decision Time', desc: 'Average attention window' },
                { value: '80%', label: 'Leave', desc: 'Visitors who bounce' },
                { value: '50ms', label: 'First Impression', desc: 'Visual judgment formed' },
              ],
            },
          },
        ],
      },
      {
        slideIndex: 6,
        slideTitle: 'Win the 3 Seconds',
        currentType: 'checklist',
        options: [
          {
            id: 'IconGrid',
            name: 'Checklist Grid',
            description: 'What must happen in 3 seconds',
            previewData: {
              items: [
                { icon: 'Eye', title: 'Clear Value Prop', text: 'What you get, instantly' },
                { icon: 'Target', title: 'Relevance Signal', text: '"This is for ME"' },
                { icon: 'Zap', title: 'Curiosity Hook', text: 'Reason to stay' },
                { icon: 'ArrowRight', title: 'Clear Next Step', text: 'What to do next' },
              ],
            },
          },
          {
            id: 'ProcessSteps',
            name: 'Process Steps',
            description: 'Sequential requirements',
            previewData: {
              steps: [
                { num: '01', title: 'Hook', desc: 'Stop the scroll instantly' },
                { num: '02', title: 'Relevance', desc: 'Show it\'s for them' },
                { num: '03', title: 'Promise', desc: 'Clear value proposition' },
                { num: '04', title: 'Direction', desc: 'Obvious next action' },
              ],
            },
          },
          {
            id: 'Timeline',
            name: 'Timeline Check',
            description: 'Second-by-second breakdown',
            previewData: {
              steps: [
                { title: '0-1s', desc: 'Eye-catching visual or headline' },
                { title: '1-2s', desc: 'Relevance confirmation' },
                { title: '2-3s', desc: 'Value prop + next step clear' },
              ],
            },
          },
        ],
      },
    ],
  },
];

// Export helper to get lesson config by slug
export const getLessonConfig = (slug: string): LessonConfig | undefined => {
  return copywritingLessonsConfig.find(l => l.slug === slug);
};

// Export all copywriting lesson slugs
export const copywritingLessonSlugs = copywritingLessonsConfig.map(l => l.slug);
