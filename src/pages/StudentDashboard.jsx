import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  TrendingUp,
  ChevronRight,
  Sparkles,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import BottomNav from '@/components/BottomNav';
import CourseCard from '@/components/CourseCard';
import ProgressBar from '@/components/ui/ProgressBar';
import authService from '@/components/services/authService';
import storageService from '@/components/services/storageService';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({});
  
  const user = authService.getCurrentUser();
  const branding = storageService.getBranding();

  useEffect(() => {
    base44.auth.isAuthenticated().then(isAuth => {
      if (!isAuth) {
        base44.auth.redirectToLogin();
      }
    });
  }, [navigate]);

  const { data: courses = [] } = useQuery({
    queryKey: ['all-courses'],
    queryFn: () => base44.entities.Course.filter({ is_published: true }),
    initialData: []
  });

  const enrolledCourses = courses.slice(0, 3); // Mock enrolled courses
  
  const totalLessons = enrolledCourses.reduce((sum, c) => sum + (c.lessons?.length || 0), 0);
  const completedLessons = Object.values(progress).reduce(
    (sum, p) => sum + (p?.completedLessons?.length || 0), 0
  );
  const avgMastery = Object.values(progress).length > 0
    ? Math.round(Object.values(progress).reduce((sum, p) => sum + (p?.mastery || 0), 0) / Object.values(progress).length)
    : 0;

  const handleCourseClick = (course) => {
    navigate(createPageUrl('CourseDetail') + `?id=${course.id}`);
  };

  // Get current lesson to continue
  const currentCourse = enrolledCourses[0];
  const currentProgress = progress[currentCourse?.id] || { completedLessons: [] };
  const currentLessonIndex = currentProgress.completedLessons?.length || 0;
  const currentLesson = currentCourse?.lessons?.[currentLessonIndex];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header 
        className="px-6 pt-12 pb-8"
        style={{ background: '#2D2D2D' }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-white/60 text-sm uppercase tracking-wider">Welcome back,</p>
          <h1 className="text-3xl font-bold text-white mb-6">{user?.name || 'Learner'}</h1>
          
          {/* Continue Learning Card */}
          {currentLesson && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-[#00D100] border-0 shadow-lg">
                <CardContent className="p-4">
                  <p className="text-black/70 text-xs mb-2 uppercase tracking-wider">Continue Learning</p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-black">{currentLesson.title}</h3>
                      <p className="text-sm text-black/70">{currentCourse.title}</p>
                    </div>
                    <Button
                      onClick={() => handleCourseClick(currentCourse)}
                      className="bg-black text-white hover:bg-black/90 font-semibold"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Resume
                    </Button>
                  </div>
                  <div className="mt-3">
                    <ProgressBar 
                      value={currentLessonIndex}
                      max={currentCourse.lessons?.length || 1}
                      showLabel={false}
                      size="sm"
                      color="black"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </header>

      <div className="px-6 -mt-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: BookOpen, value: enrolledCourses.length, label: 'Courses', color: 'bg-[#2D2D2D]' },
            { icon: Trophy, value: completedLessons, label: 'Lessons', color: 'bg-[#00D100]' },
            { icon: TrendingUp, value: `${avgMastery}%`, label: 'Mastery', color: 'bg-[#8B8B8B]' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Card className="overflow-hidden border-[#E0E0E0]">
                <CardContent className="p-4 text-center">
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-[#1A1A1A]">{stat.value}</p>
                  <p className="text-xs text-[#8B8B8B] uppercase tracking-wider">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* My Courses */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#1A1A1A]">My Courses</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm text-[#00D100] hover:text-[#00B800] hover:bg-[#F5F5F5]"
              onClick={() => navigate(createPageUrl('Courses'))}
            >
              See All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-4">
            {enrolledCourses.map((course, index) => {
              const courseProgress = progress[course.id];
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CourseCard
                    course={course}
                    progress={courseProgress}
                    variant="compact"
                    onClick={() => handleCourseClick(course)}
                  />
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Recommended */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#00D100]" />
              <h2 className="text-xl font-bold text-[#1A1A1A]">Recommended</h2>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
            {courses.slice(0, 4).map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-64"
              >
                <CourseCard
                  course={course}
                  onClick={() => handleCourseClick(course)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Daily Goal */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-[#F5F5F5] border-[#E0E0E0]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8B8B8B] text-sm uppercase tracking-wider">Daily Goal</p>
                  <p className="text-3xl font-bold text-[#1A1A1A] mt-1">
                    {completedLessons} / 3 lessons
                  </p>
                </div>
                <div className="w-16 h-16 bg-[#00D100] rounded-lg flex items-center justify-center">
                  <Clock className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <ProgressBar 
                  value={completedLessons}
                  max={3}
                  showLabel={false}
                  size="md"
                  color="#00D100"
                />
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>

      <BottomNav />
    </div>
  );
}