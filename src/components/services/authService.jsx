import storageService from './storageService';

export const authService = {
  // Mock login - checks email domain for role
  login(email, password) {
    // Simple validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Determine role based on email
    const isTeacher = email.toLowerCase().endsWith('@teacher.com');
    
    const user = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      role: isTeacher ? 'teacher' : 'student',
      createdAt: new Date().toISOString()
    };

    storageService.setUser(user);
    return user;
  },

  // Check if user is logged in
  isAuthenticated() {
    return !!storageService.getUser();
  },

  // Get current user
  getCurrentUser() {
    return storageService.getUser();
  },

  // Check if user is teacher
  isTeacher() {
    const user = storageService.getUser();
    return user?.role === 'teacher';
  },

  // Check if user is student
  isStudent() {
    const user = storageService.getUser();
    return user?.role === 'student';
  },

  // Logout
  logout() {
    storageService.clearUser();
  },

  // Check if first time user (needs onboarding)
  needsOnboarding() {
    return this.isAuthenticated() && !storageService.isOnboarded();
  },

  // Complete onboarding
  completeOnboarding(branding) {
    storageService.setBranding(branding);
    storageService.setOnboarded(true);
  }
};

export default authService;