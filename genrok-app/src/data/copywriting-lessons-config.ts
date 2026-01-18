// Copywriting Lessons Configuration for CRM
// Each lesson has: image prompts (0-2, ONLY when truly relevant) and component slots (2-4 slides with 3 options each)

export interface ImagePrompt {
  slideIndex: number;
  background: 'white' | 'black';
  prompt: string;
  context: string;
}

export interface ComponentOption {
  id: string;
  name: string;
  description: string;
  previewData: Record<string, unknown>;
}

export interface ComponentSlot {
  slideIndex: number;
  slideTitle: string;
  currentType: string;
  options: [ComponentOption, ComponentOption, ComponentOption];
}

export interface LessonConfig {
  slug: string;
  title: string;
  description: string;
  imagePrompts: ImagePrompt[];
  componentSlots: ComponentSlot[];
}

// ============================================
// COPYWRITING LESSONS CONFIGURATION
// ============================================

export const copywritingLessonsConfig: LessonConfig[] = [
  {
    slug: 'familiar-surprise-secret',
    title: 'The Familiar Surprise Secret',
    description: 'Master the MAYA principle - 70% familiar + 30% novel',
    imagePrompts: [], // No images needed - the lesson already has Spotify logo and the concepts are abstract ratios best shown with charts
    componentSlots: [
      {
        slideIndex: 3,
        slideTitle: 'The MAYA Principle',
        currentType: 'maya',
        options: [
          {
            id: 'VennDiagram',
            name: 'Venn Diagram',
            description: 'Two overlapping circles showing the sweet spot',
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
            id: 'DonutChart',
            name: 'Donut Chart',
            description: 'Visual 70/30 ratio with center label',
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
          {
            id: 'SlopeChart',
            name: 'Slope Chart',
            description: 'Before/after engagement comparison',
            previewData: {
              title: 'Spotify Discovery Weekly Results',
              leftLabel: '100% Novel',
              rightLabel: '70/30 MAYA',
              items: [
                { label: 'Engagement', leftValue: 2.1, rightValue: 6.8 },
                { label: 'Save Rate', leftValue: 12, rightValue: 36 },
                { label: 'Return Rate', leftValue: 23, rightValue: 46 },
              ],
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
                { value: '40%', label: 'Faster Processing', desc: 'Brain handles familiar faster' },
                { value: '0', label: 'Dopamine Spike', desc: 'Pure familiar = no excitement' },
                { value: '2x', label: 'Engagement Boost', desc: 'Novel-familiar mix doubles attention' },
              ],
            },
          },
          {
            id: 'BarChart',
            name: 'Comparison Bars',
            description: 'Side-by-side metric comparison',
            previewData: {
              title: 'Brain Response by Approach',
              bars: [
                { label: 'Processing Speed (Familiar)', value: 85 },
                { label: 'Attention (Novel)', value: 90 },
                { label: 'Trust (Familiar)', value: 95 },
                { label: 'Excitement (Novel)', value: 88 },
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
        ],
      },
    ],
  },

  {
    slug: 'red-button-effect',
    title: 'The Red Button Effect',
    description: 'Why "don\'t click this" makes people click 3x more',
    imagePrompts: [], // No images - the lesson is about psychological reactance, best conveyed through text and the interactive demo
    componentSlots: [
      {
        slideIndex: 4,
        slideTitle: 'Reactance Stats',
        currentType: 'reactance-stats',
        options: [
          {
            id: 'StatCard',
            name: 'Stat Cards',
            description: 'Three key reactance metrics',
            previewData: {
              stats: [
                { value: '200ms', label: 'Trigger Time', desc: 'Instant brain response' },
                { value: '3x', label: 'Desire Boost', desc: 'Restricted = more valuable' },
                { value: '+47%', label: 'CTR Increase', desc: 'Forbidden CTAs win' },
              ],
            },
          },
          {
            id: 'BarChart',
            name: 'CTR Comparison',
            description: 'Standard vs Forbidden CTA performance',
            previewData: {
              title: 'Click-Through Rate Comparison',
              bars: [
                { label: '"Add to Cart"', value: 2.1 },
                { label: '"Don\'t click unless..."', value: 6.8 },
              ],
            },
          },
          {
            id: 'GaugeChart',
            name: 'Response Meters',
            description: 'Psychological response intensity',
            previewData: {
              gauges: [
                { label: 'Reactance Trigger', value: 95, max: 100, color: '#ef4444' },
                { label: 'Desire Amplification', value: 300, max: 400, color: '#f97316' },
                { label: 'Action Likelihood', value: 78, max: 100, color: '#22c55e' },
              ],
            },
          },
        ],
      },
      {
        slideIndex: 3,
        slideTitle: 'Brain Response Cascade',
        currentType: 'brain-response',
        options: [
          {
            id: 'Timeline',
            name: 'Timeline Flow',
            description: 'Step-by-step brain response sequence',
            previewData: {
              title: 'The Reactance Cascade',
              steps: [
                { title: 'Restriction Detected', desc: '"Don\'t click this"' },
                { title: 'Freedom Threatened', desc: 'Brain rebels instantly' },
                { title: 'Tension Builds', desc: 'Must restore control' },
                { title: 'Action Taken', desc: 'CLICK' },
              ],
            },
          },
          {
            id: 'ProcessSteps',
            name: 'Process Steps',
            description: 'Numbered cascade visualization',
            previewData: {
              title: 'Psychological Cascade',
              steps: [
                { num: '01', title: 'Detect', desc: 'Brain spots restriction' },
                { num: '02', title: 'Rebel', desc: 'Freedom response fires' },
                { num: '03', title: 'Build', desc: 'Tension and desire grow' },
                { num: '04', title: 'Act', desc: 'Click to restore control' },
              ],
            },
          },
          {
            id: 'FunnelChart',
            name: 'Response Funnel',
            description: 'Psychological funnel to action',
            previewData: {
              title: 'Reactance to Action',
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
    ],
  },

  {
    slug: 'fred-method',
    title: 'The F.R.E.D. Method',
    description: 'The 4-letter framework for audience psychology',
    imagePrompts: [], // No images - the framework is abstract and best shown with component visualizations
    componentSlots: [
      {
        slideIndex: 4,
        slideTitle: 'The F.R.E.D. Framework',
        currentType: 'framework',
        options: [
          {
            id: 'ProcessSteps',
            name: 'Process Steps',
            description: 'Four-step framework with descriptions',
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
              title: 'Customer Psychology Map',
              items: [
                { icon: 'AlertTriangle', title: 'F - Fears', text: 'Their deepest worries' },
                { icon: 'Zap', title: 'R - Reactions', text: 'How they respond' },
                { icon: 'Heart', title: 'E - Emotions', text: 'What they feel' },
                { icon: 'Target', title: 'D - Desires', text: 'What they want' },
              ],
            },
          },
          {
            id: 'RadarChart',
            name: 'Radar Chart',
            description: 'Customer psychology profile visualization',
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
        slideTitle: 'F.R.E.D. Application',
        currentType: 'example',
        options: [
          {
            id: 'BeforeAfter',
            name: 'Before/After',
            description: 'Generic vs F.R.E.D. copy comparison',
            previewData: {
              before: { title: 'Generic Copy', text: 'Our product solves your problems effectively and efficiently.' },
              after: { title: 'F.R.E.D. Applied', text: 'Tired of lying awake worrying about bills? Join 10,000+ who finally breathe easy.' },
            },
          },
          {
            id: 'BarChart',
            name: 'Results Comparison',
            description: 'Conversion rate improvement',
            previewData: {
              title: 'Conversion Rate Impact',
              bars: [
                { label: 'Generic Copy', value: 1.2 },
                { label: 'F.R.E.D. Applied', value: 4.7 },
              ],
            },
          },
          {
            id: 'IconGrid',
            name: 'Checklist Grid',
            description: 'F.R.E.D. audit checklist',
            previewData: {
              title: 'F.R.E.D. Copy Audit',
              items: [
                { title: 'Fears Addressed?', text: 'Does it acknowledge their worries?' },
                { title: 'Reactions Predicted?', text: 'Does it meet their objections?' },
                { title: 'Emotions Triggered?', text: 'Does it create feeling?' },
                { title: 'Desires Connected?', text: 'Does it promise what they want?' },
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
    description: 'How 95% of buying decisions are made emotionally',
    imagePrompts: [], // No images - the concept is best shown through the donut/stats showing 95% emotional
    componentSlots: [
      {
        slideIndex: 4,
        slideTitle: 'The Decision Split',
        currentType: 'stats',
        options: [
          {
            id: 'DonutChart',
            name: 'Decision Donut',
            description: '95% emotional vs 5% logical split',
            previewData: {
              title: 'How Decisions Are Actually Made',
              segments: [
                { label: 'Emotional (Subconscious)', value: 95, color: '#88da1c' },
                { label: 'Logical (Conscious)', value: 5, color: '#666' },
              ],
              centerLabel: '95%',
              centerValue: 'Emotion',
            },
          },
          {
            id: 'StatCard',
            name: 'Key Stats',
            description: 'Three decision-making metrics',
            previewData: {
              stats: [
                { value: '95%', label: 'Emotional', desc: 'Decisions made subconsciously' },
                { value: '0.5s', label: 'Response Time', desc: 'Emotion triggers first' },
                { value: '3x', label: 'Conversion Lift', desc: 'Emotion-first copy wins' },
              ],
            },
          },
          {
            id: 'GaugeChart',
            name: 'Influence Gauges',
            description: 'Emotion vs Logic influence meters',
            previewData: {
              gauges: [
                { label: 'Emotional Influence', value: 95, max: 100, color: '#88da1c' },
                { label: 'Logical Influence', value: 5, max: 100, color: '#666' },
              ],
            },
          },
        ],
      },
      {
        slideIndex: 6,
        slideTitle: 'The Decision Sequence',
        currentType: 'process',
        options: [
          {
            id: 'Timeline',
            name: 'Decision Timeline',
            description: 'Sequential emotion-to-logic flow',
            previewData: {
              title: 'The Real Decision Process',
              steps: [
                { title: 'Emotional Trigger', desc: 'Heart responds first (0.5s)' },
                { title: 'Desire Forms', desc: '"I want this"' },
                { title: 'Logic Activates', desc: 'Brain seeks justification' },
                { title: 'Purchase Made', desc: 'With "rational" reasons' },
              ],
            },
          },
          {
            id: 'ProcessSteps',
            name: 'Process Steps',
            description: 'Four-step decision process',
            previewData: {
              title: 'How Customers Really Buy',
              steps: [
                { num: '01', title: 'Feel', desc: 'Emotion fires in 0.5 seconds' },
                { num: '02', title: 'Want', desc: 'Desire forms unconsciously' },
                { num: '03', title: 'Justify', desc: 'Logic finds reasons' },
                { num: '04', title: 'Buy', desc: 'Action feels "rational"' },
              ],
            },
          },
          {
            id: 'FunnelChart',
            name: 'Decision Funnel',
            description: 'Emotional to logical conversion',
            previewData: {
              title: 'Decision Journey',
              stages: [
                { label: 'Emotional Response', value: 100 },
                { label: 'Desire Created', value: 85 },
                { label: 'Logic Justifies', value: 70 },
                { label: 'Purchase', value: 45 },
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
    imagePrompts: [], // No images - the filtering concept is abstract and better shown with funnel/stats
    componentSlots: [
      {
        slideIndex: 4,
        slideTitle: 'The Attention Filter',
        currentType: 'stats',
        options: [
          {
            id: 'FunnelChart',
            name: 'Attention Funnel',
            description: 'Information filtering visualization',
            previewData: {
              title: 'What Gets Through',
              stages: [
                { label: 'Sensory Input (11M bits/sec)', value: 100 },
                { label: 'Subconscious Processing', value: 10 },
                { label: 'Attention Threshold', value: 1 },
                { label: 'Conscious Awareness', value: 0.0005 },
              ],
            },
          },
          {
            id: 'StatCard',
            name: 'Filter Stats',
            description: 'Key gatekeeper metrics',
            previewData: {
              stats: [
                { value: '11M', label: 'Bits/Second', desc: 'Sensory input to brain' },
                { value: '50', label: 'Bits Processed', desc: 'Conscious mind handles' },
                { value: '99.9%', label: 'Filtered Out', desc: 'Messages never seen' },
              ],
            },
          },
          {
            id: 'GaugeChart',
            name: 'Filter Gauges',
            description: 'Blocked vs through rates',
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
            description: 'Four bypass methods with icons',
            previewData: {
              title: 'The 4 Gatekeeper Keys',
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
              title: 'Gatekeeper Bypass Protocol',
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
            name: 'Effectiveness Radar',
            description: 'Technique effectiveness comparison',
            previewData: {
              title: 'Bypass Technique Effectiveness',
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
    imagePrompts: [], // No images - timing concept best shown with timeline/gauge components
    componentSlots: [
      {
        slideIndex: 3,
        slideTitle: 'The 3-Second Window',
        currentType: 'stats',
        options: [
          {
            id: 'Timeline',
            name: 'Second-by-Second',
            description: 'What happens each second',
            previewData: {
              title: 'The Critical 3 Seconds',
              steps: [
                { title: 'Second 1', desc: 'Eyes land, brain scans for relevance' },
                { title: 'Second 2', desc: 'Subconscious asks "Is this for me?"' },
                { title: 'Second 3', desc: 'Decision made: Stay or scroll' },
              ],
            },
          },
          {
            id: 'StatCard',
            name: 'Timing Stats',
            description: 'Key timing metrics',
            previewData: {
              stats: [
                { value: '3s', label: 'Decision Window', desc: 'Average attention span' },
                { value: '80%', label: 'Bounce Rate', desc: 'Visitors who leave' },
                { value: '50ms', label: 'First Impression', desc: 'Visual judgment formed' },
              ],
            },
          },
          {
            id: 'GaugeChart',
            name: 'Time Pressure',
            description: 'Visual countdown pressure',
            previewData: {
              gauges: [
                { label: 'Time Remaining', value: 3, max: 10, color: '#ef4444' },
                { label: 'Decision Certainty', value: 100, max: 100, color: '#88da1c' },
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
            description: 'Four requirements in 3 seconds',
            previewData: {
              title: 'The 3-Second Checklist',
              items: [
                { icon: 'Eye', title: 'Clear Value', text: 'What you get, instantly visible' },
                { icon: 'Target', title: 'Relevance', text: '"This is for ME" signal' },
                { icon: 'Zap', title: 'Curiosity', text: 'Reason to stay and learn more' },
                { icon: 'ArrowRight', title: 'Next Step', text: 'Obvious action to take' },
              ],
            },
          },
          {
            id: 'ProcessSteps',
            name: 'Sequential Check',
            description: 'Ordered requirements',
            previewData: {
              title: 'Page Review Checklist',
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
            name: 'Timed Checklist',
            description: 'Second-by-second requirements',
            previewData: {
              title: 'What Must Happen',
              steps: [
                { title: '0-1 second', desc: 'Eye-catching visual or headline' },
                { title: '1-2 seconds', desc: 'Relevance confirmed' },
                { title: '2-3 seconds', desc: 'Value clear, action obvious' },
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
