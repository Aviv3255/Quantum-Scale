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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (authLoading) return;

    // Redirect if not logged in
    if (!user) {
      router.push('/login');
      return;
    }

    // TEMPORARILY bypassing admin check for debugging - TODO: restore before going live
    // if (!isAdmin) {
    //   router.push('/dashboard');
    //   return;
    // }
  }, [mounted, user, authLoading, router]);

  // Show loading state
  if (!mounted || authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
      </div>
    );
  }

  // TEMPORARILY bypassing admin check for debugging - TODO: restore before going live
  // if (!isAdmin) {
  //   return null;
  // }

  return <>{children}</>;
}
