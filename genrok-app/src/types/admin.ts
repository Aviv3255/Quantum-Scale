// Admin Issue Tracking System Types

export interface AdminIssue {
  id: string;

  // Location context
  page_url: string;
  page_type: 'lesson' | 'dashboard' | 'course' | 'article' | 'calculator' | 'design' | 'other';
  lesson_slug: string | null;
  slide_index: number | null;
  section_id: string | null;

  // Issue details
  title: string;
  description: string;
  priority: 'normal' | 'urgent';

  // Status workflow
  status: 'pending' | 'fixed' | 'validated';

  // Timestamps
  created_at: string;
  fixed_at: string | null;
  validated_at: string | null;

  // User tracking
  reported_by: string | null;
  fixed_by: string | null;

  // Direct link
  direct_link: string;

  // Feedback on fix (for issues marked as fixed)
  feedback: string | null;
}

export interface AdminIssueCreate {
  page_url: string;
  page_type: AdminIssue['page_type'];
  lesson_slug?: string | null;
  slide_index?: number | null;
  section_id?: string | null;
  title: string;
  description: string;
  priority: 'normal' | 'urgent';
  direct_link: string;
}

export interface LessonSlideContext {
  lessonSlug: string;
  slideIndex: number;
  slideType: string;
  elementId?: string; // For per-element reporting (e.g., 'HookSlide-2', 'QuizSlide-5')
}
