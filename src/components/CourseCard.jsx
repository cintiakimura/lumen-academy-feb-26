import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Clock, BookOpen, Award, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import ProgressBar from './ui/ProgressBar';

export default function CourseCard({ 
  course, 
  progress,
  onClick,
  variant = 'default',
  className 
}) {
  const totalLessons = course.lessons?.length || 0;
  const completedLessons = progress?.completedLessons?.length || 0;
  const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  const totalDuration = course.lessons?.reduce((sum, l) => sum + (l.duration || 5), 0) || 0;

  const categoryColors = {
    auto_repair: 'from-[#2D2D2D] to-[#1A1A1A]',
    welding: 'from-[#8B8B8B] to-[#6B6B6B]',
    sales: 'from-[#00D100] to-[#00B800]',
    accounting: 'from-[#2D2D2D] to-[#1A1A1A]',
    other: 'from-[#8B8B8B] to-[#6B6B6B]'
  };

  const categoryLabels = {
    auto_repair: 'Auto Repair',
    welding: 'Welding',
    sales: 'Sales',
    accounting: 'Accounting',
    other: 'General'
  };

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={onClick}
        className={cn(
          'bg-white rounded-lg p-4 shadow-sm border border-[#E0E0E0] cursor-pointer transition-all hover:shadow-md',
          className
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0',
            categoryColors[course.category] || categoryColors.other
          )}>
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-[#1A1A1A] truncate">{course.title}</h4>
            <p className="text-xs text-[#8B8B8B]">{totalLessons} lessons • {totalDuration} min</p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#8B8B8B]" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className={cn(
        'bg-white rounded-lg overflow-hidden shadow-sm border border-[#E0E0E0] cursor-pointer transition-all duration-300 hover:shadow-md',
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden">
        {course.thumbnail ? (
          <img 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={cn(
            'w-full h-full bg-gradient-to-br',
            categoryColors[course.category] || categoryColors.other
          )} />
        )}
        
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className={cn(
            'px-3 py-1 rounded-md text-xs font-semibold text-white bg-gradient-to-r uppercase tracking-wider',
            categoryColors[course.category] || categoryColors.other
          )}>
            {categoryLabels[course.category] || 'Course'}
          </span>
        </div>

        {/* Certificate badge if completed */}
        {progressPercent === 100 && (
          <div className="absolute top-3 right-3">
            <div className="w-8 h-8 bg-[#00D100] rounded-lg flex items-center justify-center shadow-lg">
              <Award className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-[#1A1A1A] mb-2 line-clamp-1">
          {course.title}
        </h3>
        <p className="text-sm text-[#8B8B8B] mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-4 mb-4 text-sm text-[#8B8B8B]">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>{totalLessons} lessons</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{totalDuration} min</span>
          </div>
        </div>

        {/* Progress */}
        {progress && (
          <ProgressBar value={progressPercent} showLabel={true} size="md" color="#00D100" />
        )}
      </div>
    </motion.div>
  );
}