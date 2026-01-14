'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setSession, setLoading } = useAuthStore();

  useEffect(() => {
    console.log('[AuthProvider] Initializing auth...');

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('[AuthProvider] Got session:', session?.user?.email || 'no session');
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes - but avoid unnecessary re-renders
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[AuthProvider] Auth state change:', event);

      // Only update if user actually changed (different ID or signed out)
      const newUserId = session?.user?.id ?? null;
      const currentUserId = useAuthStore.getState().user?.id ?? null;

      if (newUserId !== currentUserId) {
        console.log('[AuthProvider] User changed, updating state');
        setSession(session);
        setUser(session?.user ?? null);
      } else if (event === 'TOKEN_REFRESHED') {
        // Token refreshed but same user - just update session silently
        console.log('[AuthProvider] Token refreshed, same user');
        setSession(session);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
