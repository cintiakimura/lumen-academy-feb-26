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
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69816fdfc8b62c2372da0c4b/1cf3c4952_lumenlogo.png"
          alt="LUMEN"
          style={{ height: '50px' }}
        />
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
      <section className="relative flex items-center" style={{ minHeight: '67vh', padding: '32px' }}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="grid grid-cols-2 h-full">
            <div className="relative h-full">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69816fdfc8b62c2372da0c4b/ee482fc99_Screenshot2026-02-03at074623.png" 
                alt="Professional learning" 
                className="w-full h-full object-cover opacity-20"
              />
            </div>
            <div className="relative h-full">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69816fdfc8b62c2372da0c4b/32b64ee3c_Screenshot2026-02-03at074745.png" 
                alt="Student learning" 
                className="w-full h-full object-cover opacity-20"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/80 via-[#1A1A1A]/60 to-[#1A1A1A]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-left">
          <h1 style={{ fontSize: '30px', color: '#00c600', marginBottom: '24px', lineHeight: 1.1, fontWeight: '100' }}>
            Learning made for you, and just for you
          </h1>
          <p style={{ fontSize: '24px', color: '#FFFFFF', maxWidth: '800px', marginBottom: '48px' }}>
            Cutting-edge AI meets neuroscience to transform any course into a truly personalized learning experience
          </p>
          <button 
            onClick={() => window.location.href = '#'}
            className="btn-primary uppercase tracking-wider"
            style={{ height: '48px' }}
          >
            GET STARTED
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 lg:px-8" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: '24px' }}>
            <div style={{ padding: '24px', background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', border: '1px solid var(--glass-border)', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '28.8px', color: '#00c600', marginBottom: '12px', fontWeight: '100' }}>Nobody learns the same way</h3>
              <p style={{ fontSize: '19.2px', color: '#FFFFFF', lineHeight: 1.6 }}>
                Some need to talk it out,<br/>
                Some need to see it first,<br/>
                Some need to imagine it step by step
              </p>
            </div>
            
            <div style={{ padding: '24px', background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', border: '1px solid var(--glass-border)', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '28.8px', color: '#00c600', marginBottom: '12px', fontWeight: '100' }}>Your brain your choice</h3>
              <p style={{ fontSize: '19.2px', color: '#FFFFFF', lineHeight: 1.6 }}>
                You set your rhythm,<br/>
                We adapt — to your pace, your style, even your mood,<br/>
                Short bursts when you're overwhelmed. Deeper dives when you're in flow
              </p>
            </div>
            
            <div style={{ padding: '24px', background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', border: '1px solid var(--glass-border)', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '28.8px', color: '#00c600', marginBottom: '12px', fontWeight: '100' }}>Empowering teachers</h3>
              <p style={{ fontSize: '19.2px', color: '#FFFFFF', lineHeight: 1.6 }}>
                Upload your content (videos, PDFs, text, anything),<br/>
                We reshape it so it fits you — and every person in your team.<br/>
                The result: real retention, real mastery, real progress
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-12 px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl lg:text-3xl text-white mb-4" style={{ fontWeight: '100' }}>
            A method backed by more than 103 studies
          </h2>

          <div className="space-y-8 text-left max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#00D100] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-[#1A1A1A] text-xl">AI</span>
              </div>
              <div>
                <h3 className="text-xl mb-2" style={{ color: '#00c600', fontWeight: '100' }}>You are not a number</h3>
                <p style={{ color: '#FFFFFF' }}>
                  For the first time a the learning experience designed to completely adapt to each individual user, same content unique experiences. From podcasts, videos, slides until deep conversations, you choose what works for you
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#00D100] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-[#1A1A1A] text-xl">🧠</span>
              </div>
              <div>
                <h3 className="text-xl mb-2" style={{ color: '#00c600', fontWeight: '100' }}>You are not alone</h3>
                <p style={{ color: '#FFFFFF' }}>
                  We will support and adapt until you succeed, no judgement, no pressure, because knowledge is yours, forever
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-8" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 style={{ fontSize: '32px', color: '#00c600', marginBottom: '32px', fontWeight: '100' }}>
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