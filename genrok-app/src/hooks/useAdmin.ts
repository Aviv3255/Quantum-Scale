'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth';

export function useAdmin() {
  const { user } = useAuthStore();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAdminStatus() {
      console.log('[useAdmin] ========== ADMIN CHECK START ==========');
      console.log('[useAdmin] User object:', user);
      console.log('[useAdmin] User ID:', user?.id);
      console.log('[useAdmin] User email:', user?.email);

      if (!user?.id) {
        console.log('[useAdmin] NO USER ID - setting isAdmin=false');
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      try {
        console.log('[useAdmin] Querying profiles table for id:', user.id);
        const { data, error } = await supabase
          .from('profiles')
          .select('id, email, is_admin')
          .eq('id', user.id)
          .single();

        console.log('[useAdmin] RAW RESPONSE - data:', data);
        console.log('[useAdmin] RAW RESPONSE - error:', error);

        if (error) {
          console.error('[useAdmin] QUERY ERROR:', error.message, error.code, error.details);
          setIsAdmin(false);
        } else if (!data) {
          console.log('[useAdmin] NO DATA RETURNED - profile may not exist');
          setIsAdmin(false);
        } else {
          console.log('[useAdmin] Profile found:', data);
          console.log('[useAdmin] is_admin value:', data.is_admin, 'type:', typeof data.is_admin);
          const adminStatus = data.is_admin === true;
          console.log('[useAdmin] SETTING isAdmin to:', adminStatus);
          setIsAdmin(adminStatus);
        }
      } catch (err) {
        console.error('[useAdmin] CATCH ERROR:', err);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
        console.log('[useAdmin] ========== ADMIN CHECK END ==========');
      }
    }

    checkAdminStatus();
  }, [user?.id]);

  return { isAdmin, isLoading };
}
