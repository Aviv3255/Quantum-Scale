import { supabase } from './supabase';
import type { AdminIssue, AdminIssueCreate } from '@/types/admin';

// Type for database operations (Supabase doesn't know our custom table)
type AdminIssueInsert = {
  page_url: string;
  page_type: string;
  lesson_slug?: string | null;
  slide_index?: number | null;
  section_id?: string | null;
  title: string;
  description: string;
  priority: string;
  status: string;
  reported_by: string | null;
  direct_link: string;
};

// Create a new issue
export async function createIssue(issue: AdminIssueCreate) {
  const { data: userData } = await supabase.auth.getUser();

  const insertData: AdminIssueInsert = {
    page_url: issue.page_url,
    page_type: issue.page_type,
    lesson_slug: issue.lesson_slug,
    slide_index: issue.slide_index,
    section_id: issue.section_id,
    title: issue.title,
    description: issue.description,
    priority: issue.priority,
    direct_link: issue.direct_link,
    reported_by: userData.user?.id || null,
    status: 'pending',
  };

  const { data, error } = await supabase
    .from('admin_issues')
    .insert(insertData as never)
    .select()
    .single();

  if (error) throw error;
  return data as AdminIssue;
}

// Get all issues with optional filters
export async function getIssues(filters?: {
  status?: AdminIssue['status'];
  priority?: AdminIssue['priority'];
  page_type?: AdminIssue['page_type'];
}) {
  let query = supabase
    .from('admin_issues')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  if (filters?.priority) {
    query = query.eq('priority', filters.priority);
  }
  if (filters?.page_type) {
    query = query.eq('page_type', filters.page_type);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as AdminIssue[];
}

// Get a single issue by ID
export async function getIssue(id: string) {
  const { data, error } = await supabase
    .from('admin_issues')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as AdminIssue;
}

// Update issue status
export async function updateIssueStatus(
  id: string,
  status: AdminIssue['status'],
  fixedBy?: string
) {
  const updates: Record<string, string | null> = { status };

  if (status === 'fixed') {
    updates.fixed_at = new Date().toISOString();
    updates.fixed_by = fixedBy || 'Claude';
  } else if (status === 'validated') {
    updates.validated_at = new Date().toISOString();
  } else if (status === 'pending') {
    // Reopening - clear timestamps
    updates.fixed_at = null;
    updates.validated_at = null;
    updates.fixed_by = null;
  }

  const { data, error } = await supabase
    .from('admin_issues')
    .update(updates as never)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as AdminIssue;
}

// Delete an issue
export async function deleteIssue(id: string) {
  const { error } = await supabase
    .from('admin_issues')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Update issue feedback
export async function updateIssueFeedback(id: string, feedback: string) {
  const { data, error } = await supabase
    .from('admin_issues')
    .update({ feedback } as never)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as AdminIssue;
}

// Get issue counts by status
export async function getIssueCounts() {
  const { data, error } = await supabase
    .from('admin_issues')
    .select('status');

  if (error) throw error;

  const issues = (data || []) as { status: string }[];
  const counts = {
    all: issues.length,
    pending: issues.filter(i => i.status === 'pending').length,
    fixed: issues.filter(i => i.status === 'fixed').length,
    validated: issues.filter(i => i.status === 'validated').length,
  };

  return counts;
}

// Generate direct link based on page type
export function generateDirectLink(
  pageUrl: string,
  pageType: AdminIssue['page_type'],
  lessonSlug?: string | null,
  slideIndex?: number | null
): string {
  if (pageType === 'lesson' && lessonSlug && slideIndex !== null && slideIndex !== undefined) {
    return `/learn/lessons/${lessonSlug}?slide=${slideIndex}`;
  }
  return pageUrl;
}

// Detect page type from URL
export function detectPageType(pathname: string): AdminIssue['page_type'] {
  if (pathname.includes('/learn/lessons/')) return 'lesson';
  if (pathname.includes('/learn/')) return 'article';
  if (pathname.includes('/dashboard')) return 'dashboard';
  if (pathname.includes('/courses')) return 'course';
  if (pathname.includes('/calculators')) return 'calculator';
  if (pathname.includes('/design')) return 'design';
  return 'other';
}
