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
      console.log('[useAdmin] Checking admin status, user:', user?.id);

      if (!user?.id) {
        console.log('[useAdmin] No user ID, setting isAdmin=false');
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('is_admin')
          .eq('user_id', user.id)
          .single();

        console.log('[useAdmin] Query result:', { data, error });

        if (error) {
          console.error('[useAdmin] Error:', error);
          setIsAdmin(false);
        } else {
          const adminStatus = data?.is_admin === true;
          console.log('[useAdmin] Setting isAdmin:', adminStatus);
          setIsAdmin(adminStatus);
        }
      } catch (err) {
        console.error('[useAdmin] Catch error:', err);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkAdminStatus();
  }, [user?.id]);

  return { isAdmin, isLoading };
}
