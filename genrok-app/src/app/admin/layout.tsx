'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { useAdmin } from '@/hooks/useAdmin';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const { isAdmin, isLoading: adminLoading } = useAdmin();
  const [mounted, setMounted] = useState(false);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  console.log('[AdminLayout] Render - mounted:', mounted, 'authLoading:', authLoading, 'adminLoading:', adminLoading, 'isAdmin:', isAdmin, 'user:', user?.email);

  useEffect(() => {
    console.log('[AdminLayout] Setting mounted=true');
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log('[AdminLayout] Auth check effect - mounted:', mounted, 'authLoading:', authLoading, 'adminLoading:', adminLoading);

    if (!mounted) {
      console.log('[AdminLayout] Not mounted yet, waiting...');
      return;
    }
    if (authLoading || adminLoading) {
      console.log('[AdminLayout] Still loading, waiting...');
      return;
    }

    console.log('[AdminLayout] All loading complete. user:', user?.email, 'isAdmin:', isAdmin);

    // Redirect if not logged in
    if (!user) {
      console.log('[AdminLayout] No user - redirecting to /login');
      router.push('/login');
      return;
    }

    // Redirect if not admin
    if (!isAdmin) {
      console.log('[AdminLayout] Not admin - redirecting to /dashboard');
      router.push('/dashboard');
      return;
    }

    console.log('[AdminLayout] Auth check passed! User is admin.');
    setAuthCheckComplete(true);
  }, [mounted, user, isAdmin, authLoading, adminLoading, router]);

  // Show loading state
  if (!mounted || authLoading || adminLoading) {
    console.log('[AdminLayout] Returning loading spinner');
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
      </div>
    );
  }

  // Don't render if not admin (but wait for auth check to complete)
  if (!isAdmin) {
    console.log('[AdminLayout] isAdmin is false, returning null');
    return null;
  }

  console.log('[AdminLayout] Rendering children - admin access granted!');
  return <>{children}</>;
}
