'use client';

import { useEffect } from 'react';
import { AuthProvider } from './AuthProvider';
import { AdminReportButton } from '@/components/admin/AdminReportButton';

export function RootProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log('[RootProviders] Mounted');
  }, []);

  return (
    <AuthProvider>
      {children}
      <AdminReportButton />
    </AuthProvider>
  );
}
