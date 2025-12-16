import { supabase } from './supabase';

// Types
export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  price: number;
  original_price: number | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CourseFile {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  file_path: string;
  file_size: number | null;
  order_index: number;
  created_at: string;
}

export interface UserPurchase {
  id: string;
  user_id: string;
  course_id: string;
  purchase_date: string;
  payment_id: string | null;
  amount_paid: number;
  status: 'pending' | 'completed' | 'refunded';
  created_at: string;
}

export interface UserSession {
  id: string;
  user_id: string;
  ip_address: string;
  user_agent: string | null;
  device_fingerprint: string | null;
  country: string | null;
  city: string | null;
  is_suspicious: boolean;
  created_at: string;
  last_active_at: string;
}

export interface PurchasedCourse {
  course_id: string;
  slug: string;
  title: string;
  description: string | null;
  image_url: string | null;
  purchase_date: string;
  file_count: number;
}

export interface IPCheckResult {
  unique_ips_24h: number;
  unique_ips_7d: number;
  is_new_ip: boolean;
  is_allowed: boolean;
  is_suspicious: boolean;
}

// Check if user has purchased a course
export const hasPurchasedCourse = async (userId: string, courseSlug: string): Promise<boolean> => {
  // Get course ID from slug
  const { data: course } = await supabase
    .from('courses')
    .select('id')
    .eq('slug', courseSlug)
    .single();

  if (!course) return false;

  const courseData = course as { id: string };

  // Check if user has purchased this course
  const { data, error } = await supabase
    .from('user_purchases')
    .select('id')
    .eq('user_id', userId)
    .eq('course_id', courseData.id)
    .eq('status', 'completed')
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking purchase:', error);
    return false;
  }

  return !!data;
};

// Get user's purchased courses
export const getUserCourses = async (userId: string): Promise<PurchasedCourse[]> => {
  // Get user's purchases with course details
  const { data: purchases, error } = await supabase
    .from('user_purchases')
    .select('course_id, purchase_date')
    .eq('user_id', userId)
    .eq('status', 'completed');

  if (error) {
    console.error('Error fetching user purchases:', error);
    return [];
  }

  if (!purchases || purchases.length === 0) return [];

  const typedPurchases = purchases as Array<{ course_id: string; purchase_date: string }>;

  // Get course details for each purchase
  const courseIds = typedPurchases.map(p => p.course_id);
  const { data: courses } = await supabase
    .from('courses')
    .select('id, slug, title, description, image_url')
    .in('id', courseIds);

  if (!courses) return [];

  const typedCourses = courses as Array<{
    id: string;
    slug: string;
    title: string;
    description: string | null;
    image_url: string | null;
  }>;

  // Get file counts for each course
  const { data: fileCounts } = await supabase
    .from('course_files')
    .select('course_id')
    .in('course_id', courseIds);

  const fileCountMap: Record<string, number> = {};
  if (fileCounts) {
    (fileCounts as Array<{ course_id: string }>).forEach(fc => {
      fileCountMap[fc.course_id] = (fileCountMap[fc.course_id] || 0) + 1;
    });
  }

  // Combine the data
  return typedCourses.map(course => {
    const purchase = typedPurchases.find(p => p.course_id === course.id);
    return {
      course_id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      image_url: course.image_url,
      purchase_date: purchase?.purchase_date || '',
      file_count: fileCountMap[course.id] || 0,
    };
  });
};

// Get course files for a purchased course
export const getCourseFiles = async (courseId: string): Promise<CourseFile[]> => {
  const { data, error } = await supabase
    .from('course_files')
    .select('*')
    .eq('course_id', courseId)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching course files:', error);
    return [];
  }

  return (data || []) as CourseFile[];
};

// Get signed URL for PDF file
export const getFileUrl = async (filePath: string): Promise<string | null> => {
  const { data, error } = await supabase
    .storage
    .from('course-files')
    .createSignedUrl(filePath, 3600); // 1 hour expiry

  if (error) {
    console.error('Error getting file URL:', error);
    return null;
  }

  return data?.signedUrl || null;
};

// Log file access
export const logFileAccess = async (
  userId: string,
  courseId: string,
  fileId: string,
  ipAddress?: string
): Promise<void> => {
  await supabase
    .from('course_file_access_log')
    .insert({
      user_id: userId,
      course_id: courseId,
      file_id: fileId,
      ip_address: ipAddress || null,
    } as never);
};

// Check IP activity (for account sharing detection)
export const checkIPActivity = async (userId: string, ipAddress: string): Promise<IPCheckResult | null> => {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    // Get sessions from last 24 hours
    const { data: sessions24h } = await supabase
      .from('user_sessions')
      .select('ip_address')
      .eq('user_id', userId)
      .gte('created_at', oneDayAgo);

    // Get sessions from last 7 days
    const { data: sessions7d } = await supabase
      .from('user_sessions')
      .select('ip_address')
      .eq('user_id', userId)
      .gte('created_at', sevenDaysAgo);

    // Count unique IPs
    const typedSessions24h = (sessions24h || []) as Array<{ ip_address: string }>;
    const typedSessions7d = (sessions7d || []) as Array<{ ip_address: string }>;
    const uniqueIps24h = new Set(typedSessions24h.map(s => s.ip_address)).size;
    const uniqueIps7d = new Set(typedSessions7d.map(s => s.ip_address)).size;

    // Check if this IP has been seen before
    const { data: existingSession } = await supabase
      .from('user_sessions')
      .select('id')
      .eq('user_id', userId)
      .eq('ip_address', ipAddress)
      .single();

    const isNewIp = !existingSession;

    // Check if IP is in allowlist
    const { data: allowedIp } = await supabase
      .from('user_ip_allowlist')
      .select('id')
      .eq('user_id', userId)
      .eq('ip_address', ipAddress)
      .eq('is_verified', true)
      .single();

    const isAllowed = !!allowedIp;

    return {
      unique_ips_24h: uniqueIps24h,
      unique_ips_7d: uniqueIps7d,
      is_new_ip: isNewIp,
      is_allowed: isAllowed,
      is_suspicious: (uniqueIps24h > 5 || uniqueIps7d > 10) && !isAllowed,
    };
  } catch (error) {
    console.error('Error checking IP activity:', error);
    return null;
  }
};

// Record user session
export const recordSession = async (
  userId: string,
  ipAddress: string,
  userAgent?: string,
  deviceFingerprint?: string
): Promise<void> => {
  // Check if session already exists for this IP
  const { data: existing } = await supabase
    .from('user_sessions')
    .select('id')
    .eq('user_id', userId)
    .eq('ip_address', ipAddress)
    .single();

  const typedExisting = existing as { id: string } | null;

  if (typedExisting) {
    // Update last_active_at
    await supabase
      .from('user_sessions')
      .update({ last_active_at: new Date().toISOString() } as never)
      .eq('id', typedExisting.id);
  } else {
    // Create new session
    await supabase
      .from('user_sessions')
      .insert({
        user_id: userId,
        ip_address: ipAddress,
        user_agent: userAgent || null,
        device_fingerprint: deviceFingerprint || null,
      } as never);
  }
};

// Get user's sessions
export const getUserSessions = async (userId: string): Promise<UserSession[]> => {
  const { data, error } = await supabase
    .from('user_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('last_active_at', { ascending: false });

  if (error) {
    console.error('Error fetching user sessions:', error);
    return [];
  }

  return (data || []) as UserSession[];
};

// Add IP to allowlist
export const addIPToAllowlist = async (
  userId: string,
  ipAddress: string,
  label?: string
): Promise<boolean> => {
  const { error } = await supabase
    .from('user_ip_allowlist')
    .insert({
      user_id: userId,
      ip_address: ipAddress,
      label: label || null,
      is_verified: true,
    } as never);

  return !error;
};

// Remove IP from allowlist
export const removeIPFromAllowlist = async (userId: string, ipAddress: string): Promise<boolean> => {
  const { error } = await supabase
    .from('user_ip_allowlist')
    .delete()
    .eq('user_id', userId)
    .eq('ip_address', ipAddress);

  return !error;
};

// File reading progress tracking
export interface FileProgress {
  file_id: string;
  progress: number; // 0-100
  last_page?: number;
  total_pages?: number;
  last_accessed: string;
}

// Get file progress from localStorage and Supabase
export const getFileProgress = async (
  userId: string,
  courseId: string
): Promise<Record<string, FileProgress>> => {
  const localKey = `file-progress-${userId}-${courseId}`;
  console.log(`[getFileProgress] Loading progress for user=${userId}, course=${courseId}`);

  // Get from localStorage first
  let progress: Record<string, FileProgress> = {};
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(localKey);
    console.log(`[getFileProgress] localStorage key=${localKey}, stored=${stored ? 'found' : 'not found'}`);
    if (stored) {
      try {
        progress = JSON.parse(stored);
        console.log(`[getFileProgress] Parsed from localStorage:`, progress);
      } catch {
        console.error(`[getFileProgress] Failed to parse localStorage`);
      }
    }
  }

  // Try to sync from Supabase
  try {
    const { data, error } = await supabase
      .from('user_file_progress')
      .select('file_id, progress, last_page, total_pages, updated_at')
      .eq('user_id', userId)
      .eq('course_id', courseId);

    if (!error && data) {
      const typedData = data as Array<{
        file_id: string;
        progress: number;
        last_page: number | null;
        total_pages: number | null;
        updated_at: string;
      }>;

      // Merge with localStorage, keeping most recent
      typedData.forEach((item) => {
        const existing = progress[item.file_id];
        const dbDate = new Date(item.updated_at).getTime();
        const localDate = existing ? new Date(existing.last_accessed).getTime() : 0;

        if (!existing || dbDate > localDate) {
          progress[item.file_id] = {
            file_id: item.file_id,
            progress: item.progress,
            last_page: item.last_page || undefined,
            total_pages: item.total_pages || undefined,
            last_accessed: item.updated_at,
          };
        }
      });

      // Save merged progress to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(localKey, JSON.stringify(progress));
      }
    }
  } catch {
    // If Supabase fails, continue with localStorage data
  }

  return progress;
};

// Save file progress to localStorage and Supabase
export const saveFileProgress = async (
  userId: string,
  courseId: string,
  fileId: string,
  progressPercent: number,
  lastPage?: number,
  totalPages?: number
): Promise<void> => {
  const localKey = `file-progress-${userId}-${courseId}`;
  const now = new Date().toISOString();
  console.log(`[saveFileProgress] Saving progress: user=${userId}, course=${courseId}, file=${fileId}, progress=${progressPercent}%`);

  // Update localStorage
  if (typeof window !== 'undefined') {
    let progress: Record<string, FileProgress> = {};
    const stored = localStorage.getItem(localKey);
    if (stored) {
      try {
        progress = JSON.parse(stored);
      } catch {
        // Ignore parse errors
      }
    }

    progress[fileId] = {
      file_id: fileId,
      progress: progressPercent,
      last_page: lastPage,
      total_pages: totalPages,
      last_accessed: now,
    };

    localStorage.setItem(localKey, JSON.stringify(progress));
    console.log(`[saveFileProgress] Saved to localStorage:`, progress);
  }

  // Sync to Supabase (upsert)
  try {
    await supabase.from('user_file_progress').upsert(
      {
        user_id: userId,
        course_id: courseId,
        file_id: fileId,
        progress: progressPercent,
        last_page: lastPage || null,
        total_pages: totalPages || null,
        updated_at: now,
      } as never,
      { onConflict: 'user_id,course_id,file_id' }
    );
  } catch {
    // If Supabase fails, localStorage still has the data
  }
};

// Grant course access (for admin/payment webhook)
export const grantCourseAccess = async (
  userId: string,
  courseSlug: string,
  amountPaid: number,
  paymentId?: string
): Promise<boolean> => {
  // Get course ID from slug
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('id')
    .eq('slug', courseSlug)
    .single();

  if (courseError || !course) {
    console.error('Error finding course:', courseError);
    return false;
  }

  const typedCourse = course as { id: string };

  // Create purchase record
  const { error } = await supabase
    .from('user_purchases')
    .insert({
      user_id: userId,
      course_id: typedCourse.id,
      amount_paid: amountPaid,
      payment_id: paymentId || null,
      status: 'completed',
    } as never);

  if (error) {
    console.error('Error granting access:', error);
    return false;
  }

  return true;
};
