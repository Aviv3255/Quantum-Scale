import { supabase } from './supabase';
import type { AdminIssue, AdminIssueCreate } from '@/types/admin';

// Create a new issue
export async function createIssue(issue: AdminIssueCreate) {
  const { data: userData } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('admin_issues')
    .insert({
      ...issue,
      reported_by: userData.user?.id || null,
      status: 'pending',
    })
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
  const updates: Partial<AdminIssue> = { status };

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
    .update(updates)
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

// Get issue counts by status
export async function getIssueCounts() {
  const { data, error } = await supabase
    .from('admin_issues')
    .select('status');

  if (error) throw error;

  const counts = {
    all: data?.length || 0,
    pending: data?.filter(i => i.status === 'pending').length || 0,
    fixed: data?.filter(i => i.status === 'fixed').length || 0,
    validated: data?.filter(i => i.status === 'validated').length || 0,
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
