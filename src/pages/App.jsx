import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import Layout from '@/components/Layout';
import Landing from './Landing';
import Onboarding from './Onboarding';
import TeacherDashboard from './TeacherDashboard';
import TeacherCourses from './TeacherCourses';
import TeacherStudents from './TeacherStudents';
import TeacherAnalytics from './TeacherAnalytics';
import StudentDashboard from './StudentDashboard';
import CourseDetail from './CourseDetail';
import Courses from './Courses';
import Settings from './Settings';
import Profile from './Profile';

export default function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#212121',
        color: '#E0E0E0'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={user ? <Onboarding /> : <Navigate to="/" />} />
          <Route path="/teacher/dashboard" element={user?.role === 'teacher' ? <TeacherDashboard /> : <Navigate to="/" />} />
          <Route path="/teacher/courses" element={user?.role === 'teacher' ? <TeacherCourses /> : <Navigate to="/" />} />
          <Route path="/teacher/students" element={user?.role === 'teacher' ? <TeacherStudents /> : <Navigate to="/" />} />
          <Route path="/teacher/analytics" element={user?.role === 'teacher' ? <TeacherAnalytics /> : <Navigate to="/" />} />
          <Route path="/student/dashboard" element={user?.role === 'student' ? <StudentDashboard /> : <Navigate to="/" />} />
          <Route path="/course/:id" element={user ? <CourseDetail /> : <Navigate to="/" />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/settings" element={user ? <Settings /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}