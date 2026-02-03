import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ArrowLeft,
  Upload,
  Palette,
  Type,
  Save,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import authService from '@/components/services/authService';
import storageService from '@/components/services/storageService';
import { base44 } from '@/api/base44Client';

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

export default function Settings() {
  const navigate = useNavigate();
  const [branding, setBranding] = useState(storageService.getBranding());
  const [logoPreview, setLogoPreview] = useState(branding.logo);
  const [saved, setSaved] = useState(false);

  const user = authService.getCurrentUser();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate(createPageUrl('Login'));
    }
  }, [navigate]);

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

  const handleSave = () => {
    storageService.setBranding(branding);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const goBack = () => {
    if (user?.role === 'teacher') {
      navigate(createPageUrl('TeacherDashboard'));
    } else {
      navigate(createPageUrl('Profile'));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 bg-white border-b border-slate-100 px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={goBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-slate-800">Settings</h1>
        </div>
      </header>

      <div className="p-6 max-w-2xl mx-auto space-y-6">
        {/* Branding Card */}
        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Logo */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                <Upload className="w-4 h-4 inline mr-2" />
                Logo
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
                    alt="Logo" 
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

            {/* Color */}
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

            {/* Font */}
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
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="p-6 rounded-xl"
              style={{ backgroundColor: branding.primaryColor, fontFamily: branding.font }}
            >
              <div className="flex items-center gap-3 mb-4">
                {logoPreview && (
                  <img src={logoPreview} alt="Logo" className="w-10 h-10 rounded-lg object-cover" />
                )}
                <span className="text-white font-bold text-lg">Lumen Academy</span>
              </div>
              <p className="text-white/80">This is how your app will look with the selected branding.</p>
              <Button className="mt-4 bg-white text-slate-800 hover:bg-white/90">
                Sample Button
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          className="w-full py-6 text-white font-semibold"
          style={{ backgroundColor: branding.primaryColor }}
        >
          {saved ? (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}