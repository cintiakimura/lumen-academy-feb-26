import React, { useEffect } from 'react';
import storageService from '@/components/services/storageService';

export default function Layout({ children }) {
  const branding = storageService.getBranding();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.cdnfonts.com/css/akkurat';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.body.style.fontFamily = 'Akkurat, system-ui, sans-serif';

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div style={{ fontFamily: 'Akkurat, system-ui, sans-serif' }}>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/akkurat');
        
        :root {
          --bg: #212121;
          --text: #E0E0E0;
          --text-muted: #4D4D4D;
          --primary: #00c600;
          --primary-hover: #00e600;
          --glass-bg: rgba(255, 255, 255, 0.05);
          --glass-border: #333333;
          --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --surface: #333333;
          --surface-light: #4D4D4D;
          --black: #000000;
        }
        
        [data-theme="light"] {
          --bg: #FFFFFF;
          --text: #212121;
          --text-muted: #4D4D4D;
          --primary: #00c600;
          --primary-hover: #00e600;
          --glass-bg: rgba(0, 0, 0, 0.04);
          --glass-border: #E0E0E0;
          --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --surface: #E0E0E0;
          --surface-light: #FFFFFF;
          --black: #000000;
        }
        
        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Akkurat', system-ui, sans-serif;
          transition: background 0.3s ease, color 0.3s ease;
        }
        
        .glass-card {
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 24px;
        }
        
        [data-theme="dark"] .glass-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid #333333;
        }
        
        [data-theme="light"] .glass-card {
          background: rgba(0, 0, 0, 0.04);
          border: 1px solid #E0E0E0;
        }
        
        .btn-primary {
          height: 48px;
          padding: 0 24px;
          border-radius: 12px;
          background: var(--primary);
          color: #000000;
          font-weight: 600;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
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
        
        h1, .text-headline { font-size: 32px; font-weight: 600; }
        .text-body { font-size: 16px; font-weight: 400; }
        .text-sub { font-size: 14px; font-weight: 400; }
        
        .section-spacing { padding: 24px 0; }
        .card-spacing { margin: 16px 0; }
        .hero-padding { padding: 32px; }
        
        .bottom-nav {
          height: 64px;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          border-top: 1px solid var(--glass-border);
        }
        
        .bottom-nav-icon {
          width: 28px;
          height: 28px;
        }
        
        .bottom-nav-label {
          font-size: 12px;
        }
        
        .sidebar {
          width: 280px;
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          border-right: 1px solid var(--glass-border);
        }
        
        .sidebar-header {
          height: 80px;
        }
        
        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
          }
        }
      `}</style>
      {children}
    </div>
  );
}