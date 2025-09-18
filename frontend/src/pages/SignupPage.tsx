import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';
import { createUserProfile } from '../services/firestoreService';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Redirect if user is already authenticated
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password strength validation
  const isStrongPassword = (password: string) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Enhanced validation
    if (!email || !password || !confirmPassword || !displayName) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    if (!isStrongPassword(password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
      setLoading(false);
      return;
    }

    try {
      console.log('🚀 Starting signup process for:', email);
      
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('✅ User account created:', user.uid);

      // Update user profile with display name
      await updateProfile(user, {
        displayName: displayName
      });
      
      console.log('✅ Profile updated with display name');

      // Create user profile in Firestore
      const additionalData = {
        firstName: displayName.split(' ')[0] || '',
        lastName: displayName.split(' ').slice(1).join(' ') || '',
        phoneNumber: phoneNumber
      };
      
      await createUserProfile(user, additionalData);
      console.log('📋 User profile created in Firestore');

      // Send email verification
      await sendEmailVerification(user);
      console.log('✉️ Verification email sent');

      setSuccess('✅ Account created successfully! Your profile has been saved. Please check your email to verify your account.');
      setShowVerificationMessage(true);
      
      // Don't auto-navigate - let user manually go back to login
    } catch (err: any) {
      console.error('Signup error details:', {
        code: err.code,
        message: err.message,
        fullError: err
      });
      
      // Provide user-friendly error messages
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('An account with this email already exists');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Please use at least 6 characters');
          break;
        case 'auth/operation-not-allowed':
          setError('❌ Email/password authentication is not enabled. Please enable it in Firebase Console → Authentication → Sign-in method → Email/Password');
          break;
        default:
          setError(`Error: ${err.code || 'Unknown'} - ${err.message || 'Failed to create account'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Full Name *"
            required
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email *"
            required
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number (optional)"
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password * (min 8 chars, 1 uppercase, 1 lowercase, 1 number)"
            required
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password *"
            required
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '10px', 
            fontSize: '16px',
            backgroundColor: loading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px', padding: '10px', backgroundColor: '#fee', border: '1px solid #fcc', borderRadius: '4px' }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: '10px', padding: '10px', backgroundColor: '#efe', border: '1px solid #cfc', borderRadius: '4px' }}>{success}</p>}
      {showVerificationMessage && (
        <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#e3f2fd', border: '1px solid #2196f3', borderRadius: '4px' }}>
          <h4 style={{ color: '#1976d2', margin: '0 0 10px 0' }}>📧 Verify Your Email</h4>
          <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#1565c0' }}>
            We've sent a verification link to <strong>{email}</strong>. 
            Please check your inbox and click the link to verify your account before logging in.
          </p>
          <button
            onClick={() => navigate('/login')}
            style={{
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              fontSize: '14px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2196f3'}
          >
            ← Back to Login
          </button>
        </div>
      )}
      {!showVerificationMessage && (
        <p style={{ marginTop: '15px' }}>
          Already have an account? <button
            onClick={() => navigate('/login')}
            style={{
              background: 'none',
              border: 'none',
              color: '#007bff',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Log in here
          </button>
        </p>
      )}
    </div>
  );
};

export default SignupPage;
