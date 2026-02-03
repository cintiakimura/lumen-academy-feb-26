import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function ProgressBar({ 
  value = 0, 
  max = 100, 
  size = 'md',
  showLabel = true,
  className,
  color
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-medium text-slate-600">Progress</span>
          <span className="text-xs font-semibold text-slate-800">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn(
        'w-full bg-slate-100 rounded-full overflow-hidden',
        sizeClasses[size]
      )}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn(
            'h-full rounded-full',
            percentage >= 85 ? 'bg-emerald-500' : 
            percentage >= 50 ? 'bg-blue-500' : 
            'bg-amber-500'
          )}
          style={color ? { backgroundColor: color } : {}}
        />
      </div>
    </div>
  );
}