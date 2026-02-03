import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Upload, 
  Palette, 
  Type, 
  ArrowRight, 
  CheckCircle,
  GraduationCap,
  UserCircle,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import authService from '@/components/services/authService';
import storageService from '@/components/services/storageService';

const COLORS = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Emerald', value: '#10B981' },
  { name: 'Amber', value: '#F59E0B' },
  { name: 'Rose', value: '#F43F5E' }
];

const FONTS = [
  { name: 'Inter', value: 'Inter' },
  { name: 'Poppins', value: 'Poppins' },
  { name: 'Roboto', value: 'Roboto' }
];

export default function Onboarding() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(user?.role || 'student');
  const [branding, setBranding] = useState({
    logo: null,
    primaryColor: '#3B82F6',
    font: 'Inter'
  });
  const [logoPreview, setLogoPreview] = useState(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoPreview(event.target.result);
        setBranding(prev => ({ ...prev, logo: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = () => {
    // Update user role if changed
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      storageService.setUser({ ...currentUser, role });
    }
    
    // Save branding and complete onboarding
    authService.completeOnboarding(branding);
    
    // Redirect based on role
    navigate(createPageUrl(role === 'teacher' ? 'TeacherDashboard' : 'StudentDashboard'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          {/* Progress indicator */}
          <div className="h-1 bg-slate-100">
            <motion.div 
              className="h-full bg-blue-500"
              initial={{ width: '33%' }}
              animate={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
            />
          </div>

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {step === 1 && <UserCircle className="w-8 h-8 text-blue-500" />}
                  {step === 2 && <Palette className="w-8 h-8 text-blue-500" />}
                  {step === 3 && <CheckCircle className="w-8 h-8 text-blue-500" />}
                </div>
                <h1 className="text-2xl font-bold text-slate-800 mb-2">
                  {step === 1 && 'Choose Your Role'}
                  {step === 2 && 'Customize Your Experience'}
                  {step === 3 && 'All Set!'}
                </h1>
                <p className="text-slate-500">
                  {step === 1 && 'How will you be using Lumen Academy?'}
                  {step === 2 && 'Personalize the look and feel'}
                  {step === 3 && 'You\'re ready to start learning'}
                </p>
              </motion.div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <RadioGroup value={role} onValueChange={setRole} className="space-y-4">
                    <label className="cursor-pointer">
                      <div className={`p-5 rounded-2xl border-2 transition-all ${
                        role === 'student' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}>
                        <div className="flex items-center gap-4">
                          <RadioGroupItem value="student" id="student" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="w-5 h-5 text-blue-500" />
                              <span className="font-semibold text-slate-800">I'm a Student</span>
                            </div>
                            <p className="text-sm text-slate-500 mt-1">
                              Learn new skills through interactive courses
                            </p>
                          </div>
                        </div>
                      </div>
                    </label>

                    <label className="cursor-pointer">
                      <div className={`p-5 rounded-2xl border-2 transition-all ${
                        role === 'teacher' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}>
                        <div className="flex items-center gap-4">
                          <RadioGroupItem value="teacher" id="teacher" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <UserCircle className="w-5 h-5 text-blue-500" />
                              <span className="font-semibold text-slate-800">I'm a Teacher</span>
                            </div>
                            <p className="text-sm text-slate-500 mt-1">
                              Create and manage courses, track student progress
                            </p>
                          </div>
                        </div>
                      </div>
                    </label>
                  </RadioGroup>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Logo upload */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      <Upload className="w-4 h-4 inline mr-2" />
                      Logo (optional)
                    </label>
                    <div 
                      onClick={() => document.getElementById('logoInput').click()}
                      className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <input
                        id="logoInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoUpload}
                      />
                      {logoPreview ? (
                        <img 
                          src={logoPreview} 
                          alt="Logo preview" 
                          className="w-20 h-20 object-contain mx-auto rounded-xl"
                        />
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-sm text-slate-500">Click to upload</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Color picker */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      <Palette className="w-4 h-4 inline mr-2" />
                      Primary Color
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {COLORS.map((color) => (
                        <motion.button
                          key={color.value}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setBranding(prev => ({ ...prev, primaryColor: color.value }))}
                          className={`w-12 h-12 rounded-xl transition-all ${
                            branding.primaryColor === color.value 
                              ? 'ring-2 ring-offset-2 ring-slate-400' 
                              : ''
                          }`}
                          style={{ backgroundColor: color.value }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Font selector */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      <Type className="w-4 h-4 inline mr-2" />
                      Font Family
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {FONTS.map((font) => (
                        <button
                          key={font.value}
                          onClick={() => setBranding(prev => ({ ...prev, font: font.value }))}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            branding.font === font.value 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                          style={{ fontFamily: font.value }}
                        >
                          <span className="text-lg font-medium text-slate-800">Aa</span>
                          <p className="text-xs text-slate-500 mt-1">{font.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: branding.primaryColor + '20' }}
                  >
                    <Sparkles 
                      className="w-12 h-12" 
                      style={{ color: branding.primaryColor }}
                    />
                  </motion.div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">
                    Welcome, {role === 'teacher' ? 'Educator' : 'Learner'}!
                  </h2>
                  <p className="text-slate-500">
                    Your personalized academy is ready
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="mt-8 flex gap-4">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 py-6 rounded-xl"
                >
                  Back
                </Button>
              )}
              
              <Button
                onClick={() => step < 3 ? setStep(step + 1) : handleComplete()}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-6 rounded-xl"
                style={step === 3 ? { 
                  background: `linear-gradient(to right, ${branding.primaryColor}, ${branding.primaryColor}dd)` 
                } : {}}
              >
                {step < 3 ? (
                  <>
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    Let's Go!
                    <Sparkles className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}