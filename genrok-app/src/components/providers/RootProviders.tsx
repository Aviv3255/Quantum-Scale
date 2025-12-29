'use client';

import { AuthProvider } from './AuthProvider';
import { AdminReportButton } from '@/components/admin/AdminReportButton';

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <AdminReportButton />
    </AuthProvider>
  );
}
