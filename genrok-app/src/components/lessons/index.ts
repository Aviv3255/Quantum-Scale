// Lesson Components - Premium Design System
// Export all lesson components for use in lessons and admin studio

// Fixed Slide Templates (same for ALL lessons)
export { WelcomeSlide } from './slides/WelcomeSlide';
export { QuizSlide } from './slides/QuizSlide';
export { CompletionSlide } from './slides/CompletionSlide';

// Content Layout Components
export { SplitContent } from './content/SplitContent';
export { FullWidthMedia } from './content/FullWidthMedia';
export { TextBlock } from './content/TextBlock';

// Data Visualization Components
export { StatCard } from './data/StatCard';
export { StatRow } from './data/StatRow';

// Comparison Components
export { BeforeAfter } from './comparison/BeforeAfter';

// Component Registry for Admin Studio
export const LESSON_COMPONENTS = {
  // Category A: Fixed Slides
  slides: [
    {
      id: 'WelcomeSlide',
      name: 'Welcome Slide',
      category: 'Fixed Slides',
      description: 'Lesson intro with hero image, title, learning goals, and duration badge',
      props: ['title', 'subtitle', 'learningGoals', 'duration', 'heroImage', 'darkMode'],
    },
    {
      id: 'QuizSlide',
      name: 'Quiz Slide',
      category: 'Fixed Slides',
      description: 'End-of-lesson quiz with multiple choice options and celebration',
      props: ['question', 'options', 'feedback', 'darkMode'],
    },
    {
      id: 'CompletionSlide',
      name: 'Completion Slide',
      category: 'Fixed Slides',
      description: 'Lesson complete with key takeaways and next lesson preview',
      props: ['lessonTitle', 'keyTakeaways', 'nextLesson', 'darkMode'],
    },
  ],
  // Category B: Content Layouts
  content: [
    {
      id: 'SplitContent',
      name: 'Split Content',
      category: 'Content',
      description: '50/50 split layout with text and media',
      props: ['title', 'content', 'media', 'reversed', 'darkMode', 'accentColor'],
    },
    {
      id: 'FullWidthMedia',
      name: 'Full Width Media',
      category: 'Content',
      description: 'Large image or video spanning full width with caption',
      props: ['src', 'type', 'alt', 'caption', 'aspectRatio', 'darkMode'],
    },
    {
      id: 'TextBlock',
      name: 'Text Block',
      category: 'Content',
      description: 'Elegant typography block with headline and body',
      props: ['headline', 'subheadline', 'body', 'alignment', 'size', 'darkMode', 'accentColor'],
    },
  ],
  // Category C: Data Visualization
  data: [
    {
      id: 'StatCard',
      name: 'Stat Card',
      category: 'Data',
      description: 'Large number with label and optional trend indicator',
      props: ['value', 'label', 'trend', 'darkMode', 'size', 'accentValue'],
    },
    {
      id: 'StatRow',
      name: 'Stat Row',
      category: 'Data',
      description: 'Multiple stats in a horizontal row',
      props: ['stats', 'darkMode', 'layout'],
    },
  ],
  // Category D: Comparison
  comparison: [
    {
      id: 'BeforeAfter',
      name: 'Before / After',
      category: 'Comparison',
      description: 'Side-by-side comparison with red/green accents',
      props: ['before', 'after', 'headline', 'darkMode'],
    },
  ],
};

// Get all components as a flat array
export const getAllComponents = () => {
  return [
    ...LESSON_COMPONENTS.slides,
    ...LESSON_COMPONENTS.content,
    ...LESSON_COMPONENTS.data,
    ...LESSON_COMPONENTS.comparison,
  ];
};

// Get components by category
export const getComponentsByCategory = (category: string) => {
  const key = category.toLowerCase() as keyof typeof LESSON_COMPONENTS;
  return LESSON_COMPONENTS[key] || [];
};
