import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// Use placeholder values during build if env vars are not available
// This allows static generation to complete without errors
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase: SupabaseClient<Database> = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email: string, password: string, fullName?: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
};

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
  });
  return { data, error };
};

export const updatePassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
};

// User Profile types
export type UserProfile = {
  id: string;
  user_id: string;
  full_name: string | null;
  age: string | null;
  country: string | null;
  occupation: string | null;
  ecommerce_model: string | null;
  fulfillment_method: string | null;
  niche: string | null;
  platform: string | null;
  monthly_revenue: string | null;
  time_in_field: string | null;
  main_traffic_source: string | null;
  monthly_ad_budget: string | null;
  store_link: string | null;
  onboarding_completed: boolean;
  onboarding_step: number;
  created_at: string;
  updated_at: string;
};

// User Profile helpers
export const getUserProfile = async (userId: string): Promise<{ data: UserProfile | null; error: { code?: string; message: string } | null }> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  return { data: data as UserProfile | null, error };
};

export const createUserProfile = async (userId: string): Promise<{ data: UserProfile | null; error: { code?: string; message: string } | null }> => {
  const { data, error } = await supabase
    .from('user_profiles' as const)
    .insert({
      user_id: userId,
      onboarding_completed: false,
      onboarding_step: 0,
    } as never)
    .select()
    .single();
  return { data: data as UserProfile | null, error };
};

export const updateUserProfile = async (
  userId: string,
  updates: {
    full_name?: string;
    age?: string;
    country?: string;
    occupation?: string;
    ecommerce_model?: string;
    fulfillment_method?: string;
    niche?: string;
    platform?: string;
    monthly_revenue?: string;
    time_in_field?: string;
    main_traffic_source?: string;
    monthly_ad_budget?: string;
    store_link?: string | null;
    onboarding_completed?: boolean;
    onboarding_step?: number;
  }
): Promise<{ data: UserProfile | null; error: { code?: string; message: string } | null }> => {
  const { data, error } = await supabase
    .from('user_profiles' as const)
    .update({ ...updates, updated_at: new Date().toISOString() } as never)
    .eq('user_id', userId)
    .select()
    .single();
  return { data: data as UserProfile | null, error };
};

// Poll vote types
export type PollVote = {
  id: string;
  poll_id: number;
  option_index: number;
  user_id: string;
  user_email: string | null;
  user_name: string | null;
  created_at: string;
  updated_at: string;
};

// Poll vote helpers
export const submitPollVote = async (
  pollId: number,
  optionIndex: number,
  userId: string,
  userEmail?: string,
  userName?: string
): Promise<{ data: PollVote | null; error: { code?: string; message: string } | null }> => {
  const { data, error } = await supabase
    .from('poll_votes' as const)
    .upsert({
      poll_id: pollId,
      option_index: optionIndex,
      user_id: userId,
      user_email: userEmail || null,
      user_name: userName || null,
      updated_at: new Date().toISOString(),
    } as never, {
      onConflict: 'poll_id,user_id'
    })
    .select()
    .single();
  return { data: data as PollVote | null, error };
};

export const getUserPollVotes = async (userId: string): Promise<{ data: { poll_id: number; option_index: number }[] | null; error: { code?: string; message: string } | null }> => {
  const { data, error } = await supabase
    .from('poll_votes' as const)
    .select('poll_id, option_index')
    .eq('user_id', userId);
  return { data: data as { poll_id: number; option_index: number }[] | null, error };
};

export const getAllPollVotes = async (): Promise<{ data: { poll_id: number; option_index: number }[] | null; error: { code?: string; message: string } | null }> => {
  const { data, error } = await supabase
    .from('poll_votes' as const)
    .select('poll_id, option_index');
  return { data: data as { poll_id: number; option_index: number }[] | null, error };
};

// Poll request types
export type PollRequest = {
  id: string;
  question: string;
  options: { text: string }[];
  buttons: { text: string; url: string }[] | null;
  status: 'pending' | 'approved' | 'rejected';
  submitted_by: string;
  submitted_by_email: string | null;
  submitted_by_name: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

// Poll request helpers
export const submitPollRequest = async (
  question: string,
  options: { text: string }[],
  userId: string,
  userEmail?: string,
  userName?: string
): Promise<{ data: PollRequest | null; error: { code?: string; message: string } | null }> => {
  const { data, error } = await supabase
    .from('poll_requests' as const)
    .insert({
      question,
      options: JSON.stringify(options),
      submitted_by: userId,
      submitted_by_email: userEmail || null,
      submitted_by_name: userName || null,
    } as never)
    .select()
    .single();
  return { data: data as PollRequest | null, error };
};

export const getPendingPollRequests = async (): Promise<{ data: PollRequest[] | null; error: { code?: string; message: string } | null }> => {
  const { data, error } = await supabase
    .from('poll_requests' as const)
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });
  return { data: data as PollRequest[] | null, error };
};

export const getAllPollRequests = async (): Promise<{ data: PollRequest[] | null; error: { code?: string; message: string } | null }> => {
  const { data, error } = await supabase
    .from('poll_requests' as const)
    .select('*')
    .order('created_at', { ascending: false });
  return { data: data as PollRequest[] | null, error };
};

export const updatePollRequest = async (
  requestId: string,
  updates: {
    question?: string;
    options?: { text: string }[];
    buttons?: { text: string; url: string }[];
    status?: 'pending' | 'approved' | 'rejected';
    admin_notes?: string;
    reviewed_by?: string;
    reviewed_at?: string;
  }
): Promise<{ data: PollRequest | null; error: { code?: string; message: string } | null }> => {
  const updateData: Record<string, unknown> = {
    ...updates,
    updated_at: new Date().toISOString(),
  };
  if (updates.options) {
    updateData.options = JSON.stringify(updates.options);
  }
  if (updates.buttons) {
    updateData.buttons = JSON.stringify(updates.buttons);
  }

  const { data, error } = await supabase
    .from('poll_requests' as const)
    .update(updateData as never)
    .eq('id', requestId)
    .select()
    .single();
  return { data: data as PollRequest | null, error };
};

export const deletePollRequest = async (
  requestId: string
): Promise<{ error: { code?: string; message: string } | null }> => {
  const { error } = await supabase
    .from('poll_requests' as const)
    .delete()
    .eq('id', requestId);
  return { error };
};
