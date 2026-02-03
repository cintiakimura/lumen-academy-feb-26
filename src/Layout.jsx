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
    <div style={{ fontFamily: `Montserrat, ${branding.font}, system-ui, sans-serif` }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        
        :root {
          --primary: #2A5D9A;
          --accent: #C9A96E;
          --bg: #FAFAFA;
          --text: #1A1A1A;
          --primary-color: ${branding.primaryColor};
        }
        
        body {
          background-color: var(--bg);
          color: var(--text);
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