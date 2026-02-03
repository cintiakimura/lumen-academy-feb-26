import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  LayoutDashboard, 
  Upload, 
  Users, 
  BarChart3, 
  Settings,
  LogOut,
  BookOpen,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import authService from './services/authService';
import storageService from './services/storageService';

export default function TeacherSidebar({ isOpen, onToggle }) {
  const location = useLocation();
  const branding = storageService.getBranding();
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', page: 'TeacherDashboard' },
    { icon: BookOpen, label: 'My Courses', page: 'TeacherCourses' },
    { icon: Users, label: 'Students', page: 'TeacherStudents' },
    { icon: BarChart3, label: 'Analytics', page: 'TeacherAnalytics' },
  ];

  const isActive = (page) => {
    return location.pathname === createPageUrl(page);
  };

  const handleLogout = () => {
    authService.logout();
    window.location.href = createPageUrl('Landing');
  };

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={onToggle}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -280 }}
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-100 z-40 flex flex-col',
          'lg:translate-x-0 lg:static'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            {branding.logo ? (
              <img src={branding.logo} alt="Logo" className="w-10 h-10 rounded-xl object-cover" />
            ) : (
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: branding.primaryColor }}
              >
                <BookOpen className="w-5 h-5 text-white" />
              </div>
            )}
            <div>
              <h1 className="font-bold text-slate-800">Lumen Academy</h1>
              <p className="text-xs text-slate-500">Teacher Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.page}
              to={createPageUrl(item.page)}
              onClick={() => window.innerWidth < 1024 && onToggle()}
            >
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                  isActive(item.page)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100">
          <Link to={createPageUrl('Settings')}>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
}