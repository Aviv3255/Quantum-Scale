'use client';

import { useState, useEffect } from 'react';
import { Bug } from 'lucide-react';

export function AdminReportButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('[AdminReportButton] Component mounted!');
    setMounted(true);
  }, []);

  // Always show a simple button for debugging
  return (
    <button
      onClick={() => alert('Admin button clicked! mounted=' + mounted)}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
      }}
      title="Report an issue (DEBUG MODE)"
    >
      <Bug style={{ width: '24px', height: '24px' }} />
    </button>
  );
}
