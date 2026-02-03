import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  Lock,
  Clock,
  BookOpen,
  Award,
  Download,
  MessageCircle,
  Volume2,
  Image as ImageIcon,
  FileText,
  Video
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from '@/components/ui/ProgressBar';
import ChatBox from '@/components/ChatBox';
import authService from '@/components/services/authService';
import storageService from '@/components/services/storageService';
import certificateService from '@/components/services/certificateService';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function CourseDetail() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('id');
  
  const [activeLesson, setActiveLesson] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  
  const branding = storageService.getBranding();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate(createPageUrl('Login'));
    }
  }, [navigate]);

  const { data: course } = useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      const courses = await base44.entities.Course.list();
      return courses.find(c => c.id === courseId);
    },
    enabled: !!courseId
  });

  const { data: progress = { completedLessons: [], mastery: 0 }, refetch: refetchProgress } = useQuery({
    queryKey: ['progress', courseId],
    queryFn: async () => {
      const user = await base44.auth.me();
      const allProgress = await base44.entities.StudentProgress.filter({
        student_id: user.id,
        course_id: courseId
      });
      return allProgress[0] || { completedLessons: [], mastery: 0 };
    },
    enabled: !!courseId,
    initialData: { completedLessons: [], mastery: 0 }
  });

  useEffect(() => {
    if (course?.lessons) {
      const firstIncomplete = course.lessons.findIndex(
        l => !progress.completedLessons?.includes(l.id)
      );
      if (firstIncomplete >= 0) {
        setActiveLesson(course.lessons[firstIncomplete]);
      }
    }
  }, [course, progress]);

  const handleLessonClick = (lesson, index) => {
    // Can only access completed lessons or the next one
    const canAccess = progress.completedLessons?.includes(lesson.id) || 
      index === (progress.completedLessons?.length || 0);
    
    if (canAccess) {
      setActiveLesson(lesson);
      setShowChat(false);
    }
  };

  const handleLessonComplete = async (lessonId) => {
    const user = await base44.auth.me();
    const newCompletedLessons = [...(progress.completedLessons || []), lessonId];
    
    const progressData = {
      student_id: user.id,
      course_id: courseId,
      completed_lessons: newCompletedLessons,
      mastery_score: progress.mastery || 0,
      certificate_earned: newCompletedLessons.length === course?.lessons?.length
    };

    if (progress.id) {
      await base44.entities.StudentProgress.update(progress.id, progressData);
    } else {
      await base44.entities.StudentProgress.create(progressData);
    }
    
    if (progressData.certificate_earned) {
      setShowCertificate(true);
    }
    
    refetchProgress();
  };

  const handleMasteryUpdate = async (score) => {
    const user = await base44.auth.me();
    const progressData = {
      student_id: user.id,
      course_id: courseId,
      completed_lessons: progress.completedLessons || [],
      mastery_score: score
    };

    if (progress.id) {
      await base44.entities.StudentProgress.update(progress.id, progressData);
    } else {
      await base44.entities.StudentProgress.create(progressData);
    }
    
    refetchProgress();
  };

  const handleNextLesson = () => {
    if (!activeLesson) return;
    
    // Mark current as complete if not already
    if (!progress.completedLessons?.includes(activeLesson.id)) {
      handleLessonComplete(activeLesson.id);
    }
    
    // Find next lesson
    const currentIndex = course.lessons?.findIndex(l => l.id === activeLesson.id);
    if (currentIndex < course.lessons.length - 1) {
      setActiveLesson(course.lessons[currentIndex + 1]);
      setShowChat(false);
    }
  };

  const formatIcons = {
    podcast: Volume2,
    slides: FileText,
    video: Video,
    infographic: ImageIcon
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-500">Loading...</div>
      </div>
    );
  }

  const completedCount = progress.completedLessons?.length || 0;
  const totalLessons = course.lessons?.length || 0;
  const progressPercent = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header 
        className="sticky top-0 z-30 px-4 py-3 flex items-center gap-4"
        style={{ background: `linear-gradient(135deg, ${branding.primaryColor}, ${branding.primaryColor}dd)` }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(createPageUrl('StudentDashboard'))}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-semibold text-white truncate">{course.title}</h1>
          <p className="text-sm text-white/70">{completedCount}/{totalLessons} lessons</p>
        </div>
        <div className="w-20">
          <ProgressBar value={progressPercent} showLabel={false} size="sm" color="white" />
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Lesson List - Sidebar on desktop */}
        <aside className="lg:w-80 lg:min-h-screen lg:border-r lg:border-slate-200 bg-white">
          <div className="p-4">
            <h2 className="font-semibold text-slate-800 mb-4">Course Content</h2>
            <div className="space-y-2">
              {course.lessons?.map((lesson, index) => {
                const isCompleted = progress.completedLessons?.includes(lesson.id);
                const isActive = activeLesson?.id === lesson.id;
                const canAccess = isCompleted || index === (progress.completedLessons?.length || 0);
                const FormatIcon = formatIcons[lesson.format] || BookOpen;

                return (
                  <motion.button
                    key={lesson.id}
                    whileTap={canAccess ? { scale: 0.98 } : {}}
                    onClick={() => handleLessonClick(lesson, index)}
                    disabled={!canAccess}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-blue-50 border-2 border-blue-200' 
                        : canAccess 
                          ? 'bg-slate-50 hover:bg-slate-100 border-2 border-transparent' 
                          : 'bg-slate-50 opacity-50 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isCompleted ? 'bg-emerald-500' : 
                        isActive ? 'bg-blue-500' : 
                        'bg-slate-200'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : canAccess ? (
                          <span className="text-white font-semibold text-sm">{index + 1}</span>
                        ) : (
                          <Lock className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium truncate ${isActive ? 'text-blue-700' : 'text-slate-700'}`}>
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                          <FormatIcon className="w-3 h-3" />
                          <span className="capitalize">{lesson.format}</span>
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          <span>{lesson.duration} min</span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8" style={{ background: 'linear-gradient(135deg, #1a2332 0%, #0f1419 100%)' }}>
          {activeLesson ? (
            <AnimatePresence mode="wait">
              {!showChat ? (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-3xl mx-auto"
                >
                  {/* Lesson Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                      <Clock className="w-4 h-4" />
                      <span>{activeLesson.duration} minutes</span>
                      <span>•</span>
                      <span className="capitalize">{activeLesson.format}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">{activeLesson.title}</h2>
                  </div>

                  {/* Content Placeholder based on format */}
                  <Card className="mb-6 overflow-hidden">
                    <CardContent className="p-0">
                      {activeLesson.format === 'video' ? (
                       <div className="aspect-video bg-slate-900">
                         <video 
                           controls 
                           className="w-full h-full"
                           poster={course.thumbnail}
                         >
                           <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                           Your browser does not support the video tag.
                         </video>
                       </div>
                      ) : activeLesson.format === 'audio' || activeLesson.format === 'podcast' ? (
                       <div className="bg-slate-900 p-8">
                         <div className="max-w-md mx-auto">
                           <img 
                             src={course.thumbnail}
                             alt=""
                             className="w-32 h-32 rounded-xl mx-auto mb-6 shadow-2xl"
                           />
                           <audio 
                             controls 
                             className="w-full"
                           >
                             <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
                             Your browser does not support the audio element.
                           </audio>
                         </div>
                       </div>
                      ) : (
                        <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center p-8">
                          <div className="text-center">
                            {activeLesson.format === 'slides' && <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />}
                            {activeLesson.format === 'infographic' && <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />}
                            <p className="text-slate-500">Interactive {activeLesson.format} content</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Lesson Content */}
                  <Card className="mb-6">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-slate-800 mb-3">Key Points</h3>
                      <p className="text-slate-600 leading-relaxed">{activeLesson.content}</p>
                    </CardContent>
                  </Card>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <Button
                      onClick={() => setShowChat(true)}
                      className="flex-1 py-6"
                      style={{ background: branding.primaryColor }}
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Practice with AI Tutor
                    </Button>
                    {progress.completedLessons?.includes(activeLesson.id) && (
                      <Button
                        variant="outline"
                        onClick={handleNextLesson}
                        className="py-6"
                      >
                        Next Lesson
                      </Button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-3xl mx-auto h-[calc(100vh-200px)]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      variant="ghost"
                      onClick={() => setShowChat(false)}
                      className="text-slate-600"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Lesson
                    </Button>
                    <h3 className="font-semibold text-slate-800">{activeLesson.title}</h3>
                  </div>
                  
                  <ChatBox
                    lessonContent={activeLesson.content}
                    onMasteryUpdate={handleMasteryUpdate}
                    onComplete={handleNextLesson}
                    className="h-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-600">Select a lesson to begin</h3>
            </div>
          )}
        </main>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowCertificate(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
              >
                <Award className="w-12 h-12 text-white" />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-slate-800 mb-2">🎉 Congratulations!</h2>
              <p className="text-slate-600 mb-6">
                You've completed <strong>{course.title}</strong> with {progress.mastery}% mastery!
              </p>

              <Button
                onClick={async () => {
                  const user = await base44.auth.me();
                  certificateService.generateCertificate(
                    course.title,
                    user?.full_name || 'Student',
                    progress.mastery_score || 85
                  );
                }}
                className="w-full py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Certificate
              </Button>

              <Button
                variant="ghost"
                className="w-full mt-3"
                onClick={() => {
                  setShowCertificate(false);
                  navigate(createPageUrl('StudentDashboard'));
                }}
              >
                Back to Dashboard
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}