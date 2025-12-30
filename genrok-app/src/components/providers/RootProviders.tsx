'use client';

import { useEffect, Component, type ReactNode } from 'react';
import { AuthProvider } from './AuthProvider';
import { AdminReportButton } from '@/components/admin/AdminReportButton';

// Error boundary to catch and log AdminReportButton errors
class AdminButtonErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('[AdminButtonErrorBoundary] Caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[AdminButtonErrorBoundary] Error details:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      console.log('[AdminButtonErrorBoundary] Rendering fallback due to error');
      return null;
    }
    return this.props.children;
  }
}

export function RootProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log('[RootProviders] Mounted - AdminReportButton should render after this');
  }, []);

  console.log('[RootProviders] Render');

  return (
    <AuthProvider>
      {children}
      <AdminButtonErrorBoundary>
        <AdminReportButton />
      </AdminButtonErrorBoundary>
    </AuthProvider>
  );
}
