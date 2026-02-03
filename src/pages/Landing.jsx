import React from 'react';
import { base44 } from '@/api/base44Client';

export default function Landing() {
  const handleLogin = () => {
    base44.auth.redirectToLogin();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Top Nav */}
      <nav className="absolute top-0 left-0 right-0 p-6 lg:p-8 flex items-center justify-between z-50">
        <div className="text-2xl tracking-tight" style={{ color: 'var(--primary)' }}>
          LUMEN
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleLogin}
            className="btn-primary uppercase tracking-wider"
          >
            FREE DEMO
          </button>
          <button 
            onClick={handleLogin}
            className="uppercase tracking-wider"
            style={{ 
              height: '48px',
              padding: '0 24px',
              borderRadius: '12px',
              color: 'var(--primary)',
              border: '1px solid var(--primary)',
              background: 'transparent',
              fontWeight: 600,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--primary)';
              e.target.style.color = 'var(--bg)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'var(--primary)';
            }}
          >
            LOGIN
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex items-center" style={{ minHeight: '50vh', padding: '16px' }}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="grid grid-cols-2 h-full">
            <div className="relative h-full">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69816fdfc8b62c2372da0c4b/ee482fc99_Screenshot2026-02-03at074623.png" 
                alt="Professional learning" 
                className="w-full h-full object-cover opacity-40"
              />
            </div>
            <div className="relative h-full">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69816fdfc8b62c2372da0c4b/32b64ee3c_Screenshot2026-02-03at074745.png" 
                alt="Student learning" 
                className="w-full h-full object-cover opacity-40"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/80 via-[#1A1A1A]/60 to-[#1A1A1A]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl" style={{ textAlign: 'left' }}>
          <h1 style={{ fontSize: '48px', color: 'var(--primary)', marginBottom: '12px', lineHeight: 1.2 }}>
            Your brain. Your pace. We understand.
          </h1>
          <p style={{ fontSize: '22px', color: 'var(--text)', maxWidth: '640px' }}>
            Cutting-edge AI meets neuroscience to transform any course into a truly personalized learning experience.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 lg:px-8" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            <p style={{ fontSize: '19px', color: 'var(--text)', lineHeight: 1.8, maxWidth: '800px' }}>
              Nobody learns the same way.
            </p>
            <p style={{ fontSize: '19px', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '800px' }}>
              Some need to talk it out.<br/>
              Some need to see it first.<br/>
              Some need to imagine it step by step.
            </p>
            <p style={{ fontSize: '19px', color: 'var(--text)', lineHeight: 1.8, maxWidth: '800px' }}>
              We don't force one method on everyone.<br/>
              We adapt — to your pace, your style, your rhythm.
            </p>
            <p style={{ fontSize: '19px', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '800px' }}>
              Short bursts when you're overwhelmed. Deeper dives when you're in flow. No overload, no rigid structure, no one-size-fits-all.
            </p>
            <p style={{ fontSize: '19px', color: 'var(--text)', lineHeight: 1.8, maxWidth: '800px' }}>
              Upload your content (videos, PDFs, text, anything).<br/>
              We reshape it so it fits you — and every person in your team.
            </p>
            <p style={{ fontSize: '19px', color: 'var(--text)', lineHeight: 1.8, maxWidth: '800px' }}>
              The result: real retention, real mastery, real progress.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-12 px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <p style={{ fontSize: '19px', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '800px', marginBottom: '24px' }}>
            Backed by more than 103 studies on how the brain actually learns.
          </p>
          <p style={{ fontSize: '19px', color: 'var(--text)', lineHeight: 1.8, maxWidth: '800px' }}>
            Because the goal isn't to pass a test.<br/>
            It's to make you better at what you do.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-8" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
        <div className="max-w-4xl mx-auto text-center">
          <button 
            onClick={handleLogin}
            className="btn-primary uppercase tracking-wider"
            style={{ fontSize: '22px' }}
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}