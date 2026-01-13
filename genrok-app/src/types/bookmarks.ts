/**
 * Bookmark System Types
 * Quantum Scale Platform
 */

// All supported bookmark item types
export type BookmarkItemType =
  | 'product'       // Products from /products/sell-these
  | 'lesson'        // Lessons from /learn
  | 'lesson_slide'  // Specific slide: "slug:slideIndex"
  | 'course_page'   // PDF course page: "courseSlug:fileId:page"
  | 'creative'      // Meta ad templates
  | 'secret_app'    // Secret apps (id 1-9)
  | 'shopify_app'   // Shopify apps (id 1-12)
  | 'ab_test'       // A/B test results
  | 'image'         // Design images (URL as ID)
  | 'section';      // Design sections

// Full bookmark record from database
export interface Bookmark {
  id: string;
  user_id: string;
  item_type: BookmarkItemType;
  item_id: string;
  title: string;
  description?: string | null;
  thumbnail_url?: string | null;
  source_url: string;
  metadata?: Record<string, unknown> | null;
  created_at: string;
}

// Input for creating a new bookmark
export interface BookmarkInput {
  item_type: BookmarkItemType;
  item_id: string;
  title: string;
  description?: string;
  thumbnail_url?: string;
  source_url: string;
  metadata?: Record<string, unknown>;
}

// Category definition for UI
export interface BookmarkCategory {
  id: BookmarkItemType | 'all';
  name: string;
  icon: string; // Lucide icon name
}

// All bookmark categories with display info
export const BOOKMARK_CATEGORIES: BookmarkCategory[] = [
  { id: 'all', name: 'All', icon: 'Bookmark' },
  { id: 'lesson', name: 'Lessons', icon: 'BookOpen' },
  { id: 'lesson_slide', name: 'Slides', icon: 'Layers' },
  { id: 'course_page', name: 'Courses', icon: 'GraduationCap' },
  { id: 'product', name: 'Products', icon: 'ShoppingBag' },
  { id: 'creative', name: 'Creatives', icon: 'Image' },
  { id: 'secret_app', name: 'Secret Apps', icon: 'Sparkles' },
  { id: 'shopify_app', name: 'Shopify Apps', icon: 'AppWindow' },
  { id: 'ab_test', name: 'A/B Tests', icon: 'TrendingUp' },
  { id: 'image', name: 'Images', icon: 'ImageIcon' },
  { id: 'section', name: 'Sections', icon: 'LayoutTemplate' },
];

// Map of category IDs to their display names
export const BOOKMARK_TYPE_LABELS: Record<BookmarkItemType, string> = {
  product: 'Product',
  lesson: 'Lesson',
  lesson_slide: 'Slide',
  course_page: 'Course Page',
  creative: 'Creative',
  secret_app: 'Secret App',
  shopify_app: 'Shopify App',
  ab_test: 'A/B Test',
  image: 'Image',
  section: 'Section',
};
