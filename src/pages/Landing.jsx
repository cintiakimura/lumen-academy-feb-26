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
        <div className="text-2xl font-bold tracking-tight" style={{ color: 'var(--primary)' }}>
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
      <section className="relative flex items-center" style={{ minHeight: '100vh', padding: '32px' }}>
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
        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 style={{ fontSize: '80px', fontWeight: 600, color: 'var(--primary)', marginBottom: '24px', lineHeight: 1.2 }}>
            Learning made easy
          </h1>
          <p style={{ fontSize: '24px', fontWeight: 400, color: 'var(--text)', maxWidth: '640px' }}>
            Turn any content into adaptive micro-lessons
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 lg:px-8" style={{ paddingTop: '24px', paddingBottom: '24px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: '24px' }}>
            <div style={{ padding: '24px', background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', border: '1px solid var(--glass-border)', borderRadius: '16px' }}>
              <div style={{ color: 'var(--primary)', fontSize: '48px', fontWeight: 700, marginBottom: '16px' }}>01</div>
              <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text)', marginBottom: '12px' }}>Adaptive learning</h3>
              <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                AI-powered lessons that adapt to your pace, learning style, and schedule. Night owl or early bird, we're ready when you are.
              </p>
            </div>
            
            <div style={{ padding: '24px', background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', border: '1px solid var(--glass-border)', borderRadius: '16px' }}>
              <div style={{ color: 'var(--primary)', fontSize: '48px', fontWeight: 700, marginBottom: '16px' }}>02</div>
              <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text)', marginBottom: '12px' }}>Any format, any time</h3>
              <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Convert content into podcasts, videos, slides, or interactive conversations. Learn on-the-go or deep-dive at your desk.
              </p>
            </div>
            
            <div style={{ padding: '24px', background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', border: '1px solid var(--glass-border)', borderRadius: '16px' }}>
              <div style={{ color: 'var(--primary)', fontSize: '48px', fontWeight: 700, marginBottom: '16px' }}>03</div>
              <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text)', marginBottom: '12px' }}>Anywhere you need</h3>
              <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Deliver remote training with the same quality as in-person sessions. Access your courses from any device, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-6">
            Pioneering technology for your learning
          </h2>
          <p className="text-xl text-[#8B8B8B] mb-16 max-w-3xl mx-auto">
            Cutting-edge AI meets neuroscience research — every moment designed to fit your unique learning profile
          </p>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-left">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#00D100] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#1A1A1A] font-bold text-xl">AI</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Smart Content Engine</h3>
                  <p className="text-[#8B8B8B]">
                    Transforms any content into bite-sized, engaging lessons optimized for retention
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#00D100] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#1A1A1A] font-bold text-xl">🧠</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Adaptive Platform</h3>
                  <p className="text-[#8B8B8B]">
                    Monitors your progress and adjusts in real-time based on neuroscience principles
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#00D100]/20 to-transparent rounded-2xl flex items-center justify-center">
                <div className="text-[#00D100] text-8xl">📱</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-8" style={{ paddingTop: '24px', paddingBottom: '24px' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Backed by 103+ studies</p>
          <h2 style={{ fontSize: '32px', fontWeight: 600, color: 'var(--text)', marginBottom: '32px' }}>
            Because one method doesn't fit everyone
          </h2>
          <button 
            onClick={handleLogin}
            className="btn-primary uppercase tracking-wider"
            style={{ fontSize: '18px' }}
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}