import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Moon, Sun, Brain, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Landing() {

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero */}
      <header className="px-6 py-32 lg:py-48">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl lg:text-4xl font-light text-[#1F2937] mb-6 leading-relaxed tracking-tight">
            Your pace. Your way. We understand.
          </h1>
          <p className="text-base lg:text-lg text-[#6B7280] font-light leading-relaxed">
            Cutting-edge AI meets neuroscience — so every moment fits you.
          </p>
        </div>
      </header>

      {/* Pillars */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="border border-[#0EA5E9] rounded-lg p-6 text-center">
            <Moon className="w-8 h-8 text-[#0EA5E9] mx-auto mb-4 stroke-1" />
            <p className="text-sm text-[#1F2937] font-light leading-relaxed">
              Night owl? We wait till you're ready.
            </p>
          </div>
          
          <div className="border border-[#0EA5E9] rounded-lg p-6 text-center">
            <Sun className="w-8 h-8 text-[#0EA5E9] mx-auto mb-4 stroke-1" />
            <p className="text-sm text-[#1F2937] font-light leading-relaxed">
              Early bird? We start before dawn.
            </p>
          </div>
          
          <div className="border border-[#0EA5E9] rounded-lg p-6 text-center">
            <Brain className="w-8 h-8 text-[#0EA5E9] mx-auto mb-4 stroke-1" />
            <p className="text-sm text-[#1F2937] font-light leading-relaxed">
              Neurodivergent? Short bursts, no pressure — all progress.
            </p>
          </div>
          
          <div className="border border-[#0EA5E9] rounded-lg p-6 text-center">
            <RefreshCw className="w-8 h-8 text-[#0EA5E9] mx-auto mb-4 stroke-1" />
            <p className="text-sm text-[#1F2937] font-light leading-relaxed">
              Frustrated? We pause, adjust, go deeper when you're calm.
            </p>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="bg-[#F9FAFB] border border-[#0EA5E9] rounded-lg p-8">
            <p className="text-sm text-[#1F2937] font-light leading-relaxed">
              65% of people learn best through conversation — not slides. We make it feel like real talk.
            </p>
          </div>
          
          <div className="bg-[#F9FAFB] border border-[#0EA5E9] rounded-lg p-8">
            <p className="text-sm text-[#1F2937] font-light leading-relaxed">
              70% retain more with podcasts or audio — short, on-the-go. We turn content into bite-sized listening.
            </p>
          </div>
          
          <div className="bg-[#F9FAFB] border border-[#0EA5E9] rounded-lg p-8">
            <p className="text-sm text-[#1F2937] font-light leading-relaxed">
              Visual learners grab 65% more when they picture it first. We add diagrams — then mental rehearsal.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-[#6B7280] font-light mb-8">
            Backed by more than 103 studies — because one method doesn't fit everyone.
          </p>
          
          <Link to={createPageUrl('Login')}>
            <button className="px-6 py-2 border border-[#0EA5E9] text-[#0EA5E9] text-sm font-light rounded-md transition-all hover:bg-[#0EA5E9] hover:text-white hover:shadow-lg hover:shadow-[#0EA5E9]/20">
              See it live — 15 min demo
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}