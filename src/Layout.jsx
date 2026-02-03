import React, { useEffect } from 'react';
import storageService from '@/components/services/storageService';

export default function Layout({ children }) {
  const branding = storageService.getBranding();

  useEffect(() => {
    // Apply custom font - DM Sans (similar to Akkurat)
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    document.body.style.fontFamily = 'DM Sans, system-ui, sans-serif';

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        
        :root {
          --primary: #00D100;
          --primary-dark: #00B800;
          --accent: #00D100;
          --bg: #FFFFFF;
          --bg-secondary: #F5F5F5;
          --text: #1A1A1A;
          --text-secondary: #8B8B8B;
          --border: #E0E0E0;
          --surface: #2D2D2D;
        }
        
        body {
          background-color: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', system-ui, sans-serif;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .safe-area-pb {
          padding-bottom: env(safe-area-inset-bottom, 0);
        }
      `}</style>
      {children}
    </div>
  );
}