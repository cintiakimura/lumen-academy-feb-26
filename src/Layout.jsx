import React, { useEffect } from 'react';
import storageService from '@/components/services/storageService';

export default function Layout({ children }) {
  const branding = storageService.getBranding();

  useEffect(() => {
    // Apply custom font
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${branding.font}:wght@400;500;600;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Apply font to body
    document.body.style.fontFamily = `${branding.font}, system-ui, sans-serif`;

    return () => {
      document.head.removeChild(link);
    };
  }, [branding.font]);

  return (
    <div style={{ fontFamily: `${branding.font}, system-ui, sans-serif` }}>
      <style>{`
        :root {
          --primary-color: ${branding.primaryColor};
        }
        
        /* Custom scrollbar */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Safe area for mobile */
        .safe-area-pb {
          padding-bottom: env(safe-area-inset-bottom, 0);
        }
      `}</style>
      {children}
    </div>
  );
}