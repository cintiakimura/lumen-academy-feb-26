import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

export default function Header({ user, onMenuToggle, sidebarOpen }) {
  const [logoPreview, setLogoPreview] = useState(() => {
    const onboarding = localStorage.getItem('onboarding');
    return onboarding ? JSON.parse(onboarding).branding?.logo : null;
  });
  const [companyName] = useState(() => {
    const onboarding = localStorage.getItem('onboarding');
    return onboarding ? JSON.parse(onboarding).company : 'LUMEN';
  });
  const navigate = useNavigate();

  const handleLogout = async () => {
    await base44.auth.logout();
    navigate('/');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '80px',
      background: 'rgba(33, 33, 33, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #333333',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      zIndex: 30
    }}>
      {/* Left: Logo + Company Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '280px' }}>
        <button
          onClick={onMenuToggle}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#E0E0E0',
            cursor: 'pointer',
            fontSize: '20px',
            padding: '8px'
          }}
        >
          ☰
        </button>
        {logoPreview ? (
          <img src={logoPreview} alt="Logo" style={{
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            objectFit: 'cover'
          }} />
        ) : (
          <div style={{
            width: '48px',
            height: '48px',
            background: 'rgba(0, 198, 0, 0.2)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00c600',
            fontSize: '12px'
          }}>
            L
          </div>
        )}
        <span className="accurat-thin" style={{
          fontSize: '20px',
          color: '#E0E0E0'
        }}>
          {companyName}
        </span>
      </div>

      {/* Center: Page Title */}
      <div style={{ flex: 1, textAlign: 'center' }}>
        <h1 className="accurat-thin" style={{
          fontSize: '32px',
          color: '#00c600',
          margin: 0
        }}>
          Dashboard
        </h1>
      </div>

      {/* Right: User Info + Logout */}
      <div style({ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: 'rgba(0, 198, 0, 0.2)',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00c600',
          fontWeight: '600',
          fontSize: '14px'
        }}>
          {user?.full_name?.charAt(0) || 'U'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#E0E0E0' }}>
            {user?.full_name || 'User'}
          </p>
          <span style={{
            display: 'inline-block',
            background: 'rgba(0, 198, 0, 0.2)',
            color: '#00c600',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: '600',
            width: 'fit-content'
          }}>
            {user?.role === 'teacher' ? 'Teacher' : 'Student'}
          </span>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: 'transparent',
            color: '#00c600',
            border: '1px solid #00c600',
            borderRadius: '8px',
            padding: '6px 12px',
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#00c600';
            e.currentTarget.style.color = '#000000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#00c600';
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}