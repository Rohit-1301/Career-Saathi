import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';
import { createUserProfile } from '../services/firestoreService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Loader2, Mail, Lock, User, Phone, UserPlus, LogIn, CheckCircle, Eye, EyeOff, AlertCircle, Check, X } from "lucide-react";

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
  
  // Interactive UI states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  
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

  // Interactive password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    let feedback = [];
    
    if (password.length >= 8) {
      score += 25;
    } else if (password.length > 0) {
      feedback.push("At least 8 characters");
    }
    
    if (/[A-Z]/.test(password)) {
      score += 25;
    } else if (password.length > 0) {
      feedback.push("One uppercase letter");
    }
    
    if (/[a-z]/.test(password)) {
      score += 25;
    } else if (password.length > 0) {
      feedback.push("One lowercase letter");
    }
    
    if (/\d/.test(password)) {
      score += 25;
    } else if (password.length > 0) {
      feedback.push("One number");
    }
    
    let strength = 'weak';
    let color = 'bg-red-500';
    
    if (score >= 100) {
      strength = 'strong';
      color = 'bg-green-500';
    } else if (score >= 75) {
      strength = 'good';
      color = 'bg-yellow-500';
    } else if (score >= 50) {
      strength = 'fair';
      color = 'bg-orange-500';
    }
    
    return { score, strength, color, feedback };
  };

  // Form completion calculation
  const calculateFormProgress = () => {
    let completed = 0;
    const totalFields = 4; // name, email, password, confirmPassword
    
    if (displayName.trim()) completed++;
    if (email.trim() && isValidEmail(email)) completed++;
    if (password.length >= 8 && isStrongPassword(password)) completed++;
    if (confirmPassword && password === confirmPassword) completed++;
    
    return Math.round((completed / totalFields) * 100);
  };

  // Update form progress when fields change
  useEffect(() => {
    setFormProgress(calculateFormProgress());
  }, [displayName, email, password, confirmPassword]);

  // Real-time validation functions
  const getEmailValidation = () => {
    if (!emailTouched) return null;
    if (!email) return { valid: false, message: "Email is required" };
    if (!isValidEmail(email)) return { valid: false, message: "Please enter a valid email address" };
    return { valid: true, message: "Valid email address" };
  };

  const getPasswordValidation = () => {
    if (!passwordTouched) return null;
    if (!password) return { valid: false, message: "Password is required" };
    const strength = calculatePasswordStrength(password);
    if (strength.score < 100) {
      return { valid: false, message: `Missing: ${strength.feedback.join(', ')}` };
    }
    return { valid: true, message: "Strong password!" };
  };

  const getConfirmPasswordValidation = () => {
    if (!confirmPasswordTouched) return null;
    if (!confirmPassword) return { valid: false, message: "Please confirm your password" };
    if (password !== confirmPassword) return { valid: false, message: "Passwords don't match" };
    return { valid: true, message: "Passwords match!" };
  };

  const getNameValidation = () => {
    if (!nameTouched) return null;
    if (!displayName.trim()) return { valid: false, message: "Name is required" };
    if (displayName.trim().length < 2) return { valid: false, message: "Name must be at least 2 characters" };
    return { valid: true, message: "Valid name" };
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
      
      // Mark this user as needing verification (for redirect after verification)
      localStorage.setItem(`user-${user.uid}-was-unverified`, 'true');

      setSuccess('✅ Account created successfully! Your profile has been saved. Please check your email to verify your account, then you will be redirected to complete your profile setup.');
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <Card className="w-full max-w-md shadow-xl transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">Create Account</CardTitle>
          <CardDescription className="text-gray-600">
            Join Career Saathi to discover your career path
          </CardDescription>
          
          {/* Form Progress Indicator */}
          {!showVerificationMessage && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Profile completion</span>
                <span>{formProgress}%</span>
              </div>
              <Progress value={formProgress} className="h-2" />
            </div>
          )}
        </CardHeader>
        <CardContent>
          {!showVerificationMessage ? (
            <form onSubmit={handleSignup} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-sm font-medium text-gray-700">
                  Full Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    onBlur={() => setNameTouched(true)}
                    placeholder="Enter your full name"
                    required
                    className={`pl-10 transition-all duration-200 ${
                      nameTouched 
                        ? getNameValidation()?.valid 
                          ? 'border-green-500 focus:border-green-500' 
                          : 'border-red-500 focus:border-red-500'
                        : 'focus:border-blue-500'
                    }`}
                    disabled={loading}
                  />
                  {nameTouched && getNameValidation() && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {getNameValidation()?.valid ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {nameTouched && getNameValidation() && (
                  <p className={`text-xs transition-all duration-200 ${
                    getNameValidation()?.valid ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {getNameValidation()?.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    placeholder="Enter your email"
                    required
                    className={`pl-10 transition-all duration-200 ${
                      emailTouched 
                        ? getEmailValidation()?.valid 
                          ? 'border-green-500 focus:border-green-500' 
                          : 'border-red-500 focus:border-red-500'
                        : 'focus:border-blue-500'
                    }`}
                    disabled={loading}
                  />
                  {emailTouched && getEmailValidation() && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {getEmailValidation()?.valid ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {emailTouched && getEmailValidation() && (
                  <p className={`text-xs transition-all duration-200 ${
                    getEmailValidation()?.valid ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {getEmailValidation()?.message}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number (optional)"
                    className="pl-10 transition-all duration-200 focus:border-blue-500"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setPasswordTouched(true)}
                    placeholder="Create a strong password"
                    required
                    className={`pl-10 pr-10 transition-all duration-200 ${
                      passwordTouched 
                        ? getPasswordValidation()?.valid 
                          ? 'border-green-500 focus:border-green-500' 
                          : 'border-red-500 focus:border-red-500'
                        : 'focus:border-blue-500'
                    }`}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {password && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Password strength</span>
                      <span className={`font-medium ${
                        calculatePasswordStrength(password).strength === 'strong' ? 'text-green-600' :
                        calculatePasswordStrength(password).strength === 'good' ? 'text-yellow-600' :
                        calculatePasswordStrength(password).strength === 'fair' ? 'text-orange-600' :
                        'text-red-600'
                      }`}>
                        {calculatePasswordStrength(password).strength.charAt(0).toUpperCase() + 
                         calculatePasswordStrength(password).strength.slice(1)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${calculatePasswordStrength(password).color}`}
                        style={{ width: `${calculatePasswordStrength(password).score}%` }}
                      ></div>
                    </div>
                    {calculatePasswordStrength(password).feedback.length > 0 && (
                      <p className="text-xs text-gray-600">
                        Add: {calculatePasswordStrength(password).feedback.join(', ')}
                      </p>
                    )}
                  </div>
                )}
                
                {passwordTouched && getPasswordValidation() && (
                  <p className={`text-xs transition-all duration-200 ${
                    getPasswordValidation()?.valid ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {getPasswordValidation()?.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => setConfirmPasswordTouched(true)}
                    placeholder="Confirm your password"
                    required
                    className={`pl-10 pr-10 transition-all duration-200 ${
                      confirmPasswordTouched 
                        ? getConfirmPasswordValidation()?.valid 
                          ? 'border-green-500 focus:border-green-500' 
                          : 'border-red-500 focus:border-red-500'
                        : 'focus:border-blue-500'
                    }`}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  {confirmPasswordTouched && getConfirmPasswordValidation() && (
                    <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                      {getConfirmPasswordValidation()?.valid ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {confirmPasswordTouched && getConfirmPasswordValidation() && (
                  <p className={`text-xs transition-all duration-200 ${
                    getConfirmPasswordValidation()?.valid ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {getConfirmPasswordValidation()?.message}
                  </p>
                )}
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50 animate-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <div className="text-red-800 text-sm ml-2">
                    {error}
                  </div>
                </Alert>
              )}

              {success && !showVerificationMessage && (
                <Alert className="border-green-200 bg-green-50 animate-in slide-in-from-top-2 duration-300">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div className="text-green-800 text-sm ml-2">
                    {success}
                  </div>
                </Alert>
              )}

              <Button 
                type="submit" 
                disabled={loading || formProgress < 100}
                className={`w-full h-11 text-base font-semibold transition-all duration-300 ${
                  formProgress === 100 
                    ? 'bg-green-600 hover:bg-green-700 hover:scale-105' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Free Account
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
              <div className="text-center p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <CheckCircle className="mx-auto h-12 w-12 text-blue-600 mb-4 animate-bounce" />
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  📧 Verify Your Email
                </h3>
                <p className="text-sm text-blue-800 mb-4 leading-relaxed">
                  We've sent a verification link to <strong>{email}</strong>. 
                  Please check your inbox and click the link to verify your account. After verification, you'll be automatically redirected to complete your profile setup.
                </p>
                <Button
                  onClick={() => navigate('/login')}
                  className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Back to Login
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        {!showVerificationMessage && (
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Button
                variant="link"
                onClick={() => navigate('/login')}
                className="p-0 h-auto font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                <LogIn className="mr-1 h-4 w-4" />
                Sign in here
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default SignupPage;
