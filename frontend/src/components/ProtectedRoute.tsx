import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireEmailVerification?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireEmailVerification = true 
}) => {
  const { currentUser } = useAuth();
  
  // Not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // Logged in but email not verified
  if (requireEmailVerification && !currentUser.emailVerified) {
    return (
      <div style={{ 
        padding: '40px 20px', 
        textAlign: 'center', 
        maxWidth: '500px', 
        margin: '50px auto',
        border: '2px solid #ff9800',
        borderRadius: '8px',
        backgroundColor: '#fff3e0'
      }}>
        <h2 style={{ color: '#e65100', marginBottom: '20px' }}>✉️ Email Verification Required</h2>
        <p style={{ color: '#bf360c', marginBottom: '20px', lineHeight: '1.6' }}>
          Please verify your email address to access the dashboard. 
          Check your inbox at <strong>{currentUser.email}</strong> for a verification link.
        </p>
        <button 
          onClick={() => window.location.href = '/login'}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Back to Login
        </button>
      </div>
    );
  }
  
  // Fully authenticated and verified
  return <>{children}</>;
};

export default ProtectedRoute;