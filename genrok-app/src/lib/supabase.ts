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
