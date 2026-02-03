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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920')] bg-cover bg-center opacity-10" />
        
        <div className="relative px-6 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                Powered by Grok xAI
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Learn Skills Fast —{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
                  Auto Repair, Welding, Sales, Accounting
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Vocational training reimagined. Bite-sized lessons, AI tutoring, and real certificates. 
                Start learning today — no experience needed.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={createPageUrl('Login')}>
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-white text-blue-600 hover:bg-white/90 font-semibold text-lg px-8 py-6 rounded-xl shadow-xl"
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 font-medium text-lg px-8 py-6 rounded-xl"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full">
            <path d="M0 100V0C240 66 480 100 720 100C960 100 1200 66 1440 0V100H0Z" fill="white"/>
          </svg>
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
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">{feature.title}</h3>
                <p className="text-sm text-slate-500">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Courses */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Explore Our Courses
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
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