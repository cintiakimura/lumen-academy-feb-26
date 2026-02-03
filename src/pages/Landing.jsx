import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F2FE] via-white to-[#EEF2FF]" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500&display=swap');
        
        .handwritten-feel {
          font-variation-settings: 'wght' 300;
          letter-spacing: -0.02em;
        }
        
        .paper-texture {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
        }
        
        .polaroid-shadow {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 12px solid white;
          border-bottom-width: 40px;
        }
        
        .teal-glow:hover {
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.3);
        }
      `}</style>

      {/* Top Nav */}
      <nav className="absolute top-0 right-0 p-6 flex gap-3 z-10">
        <Link to={createPageUrl('Onboarding')}>
          <button className="px-4 py-2 text-sm text-[#1F2937] bg-white/50 backdrop-blur-sm rounded-full transition-all hover:bg-white hover:shadow-md teal-glow">
            I want to teach
          </button>
        </Link>
        <Link to={createPageUrl('Onboarding')}>
          <button className="px-4 py-2 text-sm text-[#1F2937] bg-white/50 backdrop-blur-sm rounded-full transition-all hover:bg-white hover:shadow-md teal-glow">
            I want to learn
          </button>
        </Link>
        <Link to={createPageUrl('Login')}>
          <button className="px-4 py-2 text-sm text-white bg-[#0EA5E9] rounded-full transition-all hover:bg-[#0284C7] hover:shadow-lg teal-glow">
            Login / Sign up
          </button>
        </Link>
      </nav>

      {/* Hero */}
      <section className="px-6 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto">
          {/* Headline */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl text-[#1F2937] mb-4 leading-relaxed handwritten-feel" style={{ fontWeight: 300 }}>
              Your pace. Your way. We understand.
            </h1>
          </div>

          {/* Photos Side by Side */}
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-16">
            <div className="polaroid-shadow rounded-sm rotate-[-2deg] hover:rotate-0 transition-transform">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop" 
                alt="Doctor on phone" 
                className="w-64 h-80 object-cover rounded-sm"
              />
            </div>
            <div className="polaroid-shadow rounded-sm rotate-[2deg] hover:rotate-0 transition-transform">
              <img 
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=500&fit=crop" 
                alt="Mechanic on phone" 
                className="w-64 h-80 object-cover rounded-sm"
              />
            </div>
          </div>

          {/* Body Text - Letter Style */}
          <div className="max-w-3xl mx-auto space-y-12">
            <p className="text-lg text-[#1F2937] leading-relaxed" style={{ fontWeight: 300 }}>
              Cutting-edge AI meets neuroscience — so every moment fits you.
            </p>

            <div className="space-y-3 paper-texture rounded-2xl p-8">
              <p className="text-base text-[#1F2937] leading-loose" style={{ fontWeight: 300 }}>
                Night owl? We wait till you're ready.
              </p>
              <p className="text-base text-[#1F2937] leading-loose" style={{ fontWeight: 300 }}>
                Early bird? We start before dawn.
              </p>
              <p className="text-base text-[#1F2937] leading-loose" style={{ fontWeight: 300 }}>
                Neurodivergent? Short bursts, no pressure — all progress.
              </p>
              <p className="text-base text-[#1F2937] leading-loose" style={{ fontWeight: 300 }}>
                Frustrated? We pause, adjust, go deeper when you're calm.
              </p>
            </div>

            <div className="space-y-6 paper-texture rounded-2xl p-8">
              <p className="text-base text-[#1F2937] leading-loose" style={{ fontWeight: 300 }}>
                <span className="text-[#0EA5E9]">65%</span> learn best through conversation — not slides. We make it feel like real talk.
              </p>
              <p className="text-base text-[#1F2937] leading-loose" style={{ fontWeight: 300 }}>
                <span className="text-[#0EA5E9]">70%</span> retain more with podcasts or audio — short, on-the-go. We turn content into bite-sized listening.
              </p>
              <p className="text-base text-[#1F2937] leading-loose" style={{ fontWeight: 300 }}>
                Visual learners grab <span className="text-[#0EA5E9]">65%</span> more when they picture it first. We add diagrams — then mental rehearsal.
              </p>
            </div>

            <p className="text-sm text-[#6B7280] text-center leading-relaxed" style={{ fontWeight: 300 }}>
              Backed by more than 103 studies — because one method doesn't fit everyone.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}