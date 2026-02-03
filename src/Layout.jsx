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
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        :root {
          --bg-dark: #212121;
          --glass-bg: rgba(255, 255, 255, 0.05);
          --glass-border: #333333;
          --primary-green: #00c600;
          --primary-hover: #00e600;
          --text-light: #e0e0e0;
          --text-muted: #a0a0a0;
          --shadow-inner: inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }
        
        body {
          background: var(--bg-dark);
          color: var(--text-light);
          font-family: 'Inter', system-ui, sans-serif;
        }
        
        .glass-card {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          box-shadow: var(--shadow-inner);
          border-radius: 16px;
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