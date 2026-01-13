'use client';

import { useEffect } from 'react';
import { AuthProvider } from './AuthProvider';
import { BookmarksInitializer } from './BookmarksInitializer';
import { AdminReportButton } from '@/components/admin/AdminReportButton';

export function RootProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log('[RootProviders] Mounted');
  }, []);

  return (
    <AuthProvider>
      <BookmarksInitializer />
      {children}
      <AdminReportButton />
    </AuthProvider>
  );
}
