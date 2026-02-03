import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Play, 
  Star, 
  Share2, 
  ArrowRight, 
  CheckCircle, 
  Zap,
  BookOpen,
  Award,
  Users,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import storageService from '@/components/services/storageService';

export default function Landing() {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const courses = storageService.getCourses().slice(0, 5);

  const features = [
    { icon: Zap, title: 'Learn Fast', desc: '5-minute lessons that fit your schedule' },
    { icon: BookOpen, title: 'Practical Skills', desc: 'Real-world vocational training' },
    { icon: Award, title: 'Certificates', desc: 'Earn certificates as you progress' },
    { icon: Users, title: 'AI Tutor', desc: 'Personalized help from Grok AI' }
  ];

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Lumen Academy',
        text: 'Learn vocational skills fast with AI-powered training!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero */}
      <header className="relative overflow-hidden bg-white">
        <div className="relative px-6 py-24 lg:py-40">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--primary)] rounded-full text-[var(--primary)] text-sm mb-8">
                <Sparkles className="w-4 h-4" />
                Powered by Grok xAI
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-semibold text-[var(--text)] mb-8 leading-relaxed">
                Master real skills through<br />
                <span className="text-[var(--accent)]">conversation and mental rehearsal</span>
              </h1>
              
              <p className="text-base lg:text-lg text-[var(--text)] opacity-70 mb-12 max-w-2xl mx-auto leading-relaxed">
                Vocational training reimagined. Learn by talking with AI, practicing in your mind, 
                and building genuine expertise.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={createPageUrl('Login')}>
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-white border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white font-medium text-base px-8 py-6 rounded-xl transition-all"
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto border-2 border-[var(--text)] border-opacity-20 text-[var(--text)] hover:bg-[var(--text)] hover:bg-opacity-5 font-medium text-base px-8 py-6 rounded-xl transition-all"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-md border border-[var(--primary)] border-opacity-20 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 border border-[var(--primary)] rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <h3 className="font-semibold text-[var(--text)] mb-1">{feature.title}</h3>
                <p className="text-sm text-[var(--text)] opacity-70">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Courses */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-semibold text-[var(--text)] mb-4">
              Explore Our Courses
            </h2>
            <p className="text-[var(--text)] opacity-70 max-w-2xl mx-auto">
              From automotive to accounting — master practical skills with guided, bite-sized lessons
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700">
                      {course.lessons?.length || 0} lessons
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-800 mb-2">{course.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2">{course.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to={createPageUrl('Login')}>
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 rounded-xl">
                View All Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Rating & Share */}
      <section className="py-20 px-6">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">How are we doing?</h3>
          
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="focus:outline-none"
              >
                <Star 
                  className={`w-10 h-10 transition-colors ${
                    star <= (hoveredStar || rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-300'
                  }`}
                />
              </motion.button>
            ))}
          </div>

          {rating > 0 && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-slate-600 mb-6"
            >
              Thanks for your {rating}-star rating! 🎉
            </motion.p>
          )}

          <Button 
            variant="outline" 
            onClick={handleShare}
            className="gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share with Friends
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-800">Lumen Academy</span>
          </div>
          
          <p className="text-sm text-slate-500 flex items-center gap-2">
            Powered by <span className="font-semibold text-slate-700">Grok xAI</span>
            <Sparkles className="w-4 h-4 text-blue-500" />
          </p>
        </div>
      </footer>
    </div>
  );
}