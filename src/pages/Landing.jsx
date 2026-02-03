import React from 'react';
import { base44 } from '@/api/base44Client';

export default function Landing() {
  const handleLogin = () => {
    base44.auth.redirectToLogin();
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {/* Top Nav */}
      <nav className="absolute top-0 left-0 right-0 p-6 lg:p-8 flex items-center justify-between z-50">
        <div className="text-2xl font-bold text-[#00D100] tracking-tight">
          LUMEN
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleLogin}
            className="px-6 py-2 text-sm font-medium text-[#1A1A1A] bg-[#00D100] rounded-md hover:bg-[#00B800] transition-colors uppercase tracking-wider"
          >
            FREE DEMO
          </button>
          <button 
            onClick={handleLogin}
            className="px-6 py-2 text-sm font-medium text-[#00D100] border border-[#00D100] rounded-md hover:bg-[#00D100] hover:text-[#1A1A1A] transition-colors uppercase tracking-wider"
          >
            LOGIN
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
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
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-32">
          <h1 className="text-5xl lg:text-7xl font-light text-[#00D100] mb-6 leading-tight">
            Learning made easy
          </h1>
          <p className="text-xl lg:text-2xl text-white font-light max-w-2xl">
            Turn any content into adaptive micro-lessons
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="text-[#00D100] text-5xl font-bold">01</div>
              <h3 className="text-2xl font-light text-white">Adaptive learning</h3>
              <p className="text-[#8B8B8B] leading-relaxed">
                AI-powered lessons that adapt to your pace, learning style, and schedule. Night owl or early bird, we're ready when you are.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="text-[#00D100] text-5xl font-bold">02</div>
              <h3 className="text-2xl font-light text-white">Any format, any time</h3>
              <p className="text-[#8B8B8B] leading-relaxed">
                Convert content into podcasts, videos, slides, or interactive conversations. Learn on-the-go or deep-dive at your desk.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="text-[#00D100] text-5xl font-bold">03</div>
              <h3 className="text-2xl font-light text-white">Anywhere you need</h3>
              <p className="text-[#8B8B8B] leading-relaxed">
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
      <section className="py-24 px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-[#8B8B8B] mb-4 uppercase tracking-wider">Backed by 103+ studies</p>
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-8">
            Because one method doesn't fit everyone
          </h2>
          <button 
            onClick={handleLogin}
            className="px-12 py-4 text-lg font-medium text-[#1A1A1A] bg-[#00D100] rounded-lg hover:bg-[#00B800] transition-colors uppercase tracking-wider"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}