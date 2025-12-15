'use client';

import { useEffect, useRef } from 'react';

interface RawHTMLRendererProps {
  html: string;
  onCheckout?: () => void;
}

export default function RawHTMLRenderer({ html, onCheckout }: RawHTMLRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Find all buttons with data-checkout attribute and attach checkout handler
    const checkoutButtons = containerRef.current.querySelectorAll('[data-checkout], .cta-button, [class*="cta"]');
    checkoutButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        if (onCheckout) onCheckout();
      });
    });

    // Execute any scripts in the HTML
    const scripts = containerRef.current.querySelectorAll('script');
    scripts.forEach((script) => {
      const newScript = document.createElement('script');
      if (script.src) {
        newScript.src = script.src;
      } else {
        newScript.textContent = script.textContent;
      }
      script.parentNode?.replaceChild(newScript, script);
    });

    return () => {
      // Cleanup event listeners
      checkoutButtons.forEach((button) => {
        button.removeEventListener('click', () => {});
      });
    };
  }, [html, onCheckout]);

  return (
    <div
      ref={containerRef}
      className="raw-html-container"
      style={{
        all: 'initial',
        display: 'block',
        width: '100%',
        margin: 0,
        padding: 0,
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
