import React, { useEffect } from 'react';
import storageService from '@/components/services/storageService';

export default function Layout({ children }) {
  const branding = storageService.getBranding();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.body.style.fontFamily = 'Inter, system-ui, sans-serif';

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        :root {
          --bg: #212121;
          --text: #E0E0E0;
          --text-muted: #A0A0A0;
          --primary: #00c600;
          --primary-hover: #00e600;
          --glass-bg: rgba(255, 255, 255, 0.05);
          --glass-border: #333333;
          --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --surface: #2D2D2D;
          --surface-light: #4D4D4D;
        }
        
        [data-theme="light"] {
          --bg: #FFFFFF;
          --text: #212121;
          --text-muted: #6B7280;
          --primary: #00c600;
          --primary-hover: #00e600;
          --glass-bg: rgba(0, 0, 0, 0.04);
          --glass-border: #E0E0E0;
          --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --surface: #F5F5F5;
          --surface-light: #E0E0E0;
        }
        
        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', system-ui, sans-serif;
          transition: background 0.3s ease, color 0.3s ease;
        }
        
        * {
          font-weight: 400 !important;
        }
        
        .glass-card {
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          max-width: 320px;
          padding: 24px;
          margin: 16px;
        }
        
        @media (max-width: 768px) {
          .glass-card {
            max-width: 90%;
            width: 90%;
          }
        }
        
        .btn-primary {
          height: 48px;
          padding: 0 24px;
          border-radius: 12px;
          background: var(--primary);
          color: var(--bg);
          font-weight: 600;
          transition: all 0.2s ease;
        }
        
        .btn-primary:hover {
          background: var(--primary-hover);
          transform: scale(1.03);
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        
        .progress-bar {
          height: 8px;
          border-radius: 9999px;
          background: var(--surface);
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: var(--primary);
          transition: width 0.3s ease;
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
        
        h1, .text-headline { font-size: 32px; }
        .text-body { font-size: 16px; }
        .text-sub { font-size: 14px; }
        
        .section-spacing { padding: 24px 0; }
        .card-spacing { margin: 16px 0; }
        .hero-padding { padding: 32px; }
      `}</style>
      {children}
    </div>
  );
}