import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, BookOpen, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', page: 'StudentDashboard' },
    { icon: BookOpen, label: 'Courses', page: 'Courses' },
    { icon: User, label: 'Profile', page: 'Profile' }
  ];

  const isActive = (page) => {
    return location.pathname === createPageUrl(page);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-100 safe-area-pb">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.page}
            to={createPageUrl(item.page)}
            className="relative flex flex-col items-center justify-center flex-1 h-full"
          >
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={cn(
                'flex flex-col items-center gap-1 transition-colors',
                isActive(item.page) ? 'text-blue-500' : 'text-slate-400'
              )}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
              
              {isActive(item.page) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-500 rounded-full"
                />
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </nav>
  );
}