import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  sendEmailVerification,
  reload
} from 'firebase/auth';
import { auth } from '../firebase';
import { UserProfile, getUserProfile, createUserProfile } from '../services/firestoreService';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  emailVerified: boolean;
  profileLoading: boolean;
  isNewlyVerified: boolean;
  signOut: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  refreshUser: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  clearNewlyVerifiedFlag: () => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userProfile: null,
  loading: true,
  emailVerified: false,
  profileLoading: false,
  isNewlyVerified: false,
  signOut: async () => {},
  sendVerificationEmail: async () => {},
  refreshUser: async () => {},
  refreshUserProfile: async () => {},
  clearNewlyVerifiedFlag: () => {}
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isNewlyVerified, setIsNewlyVerified] = useState(false);

  // Load user profile from Firestore
  const loadUserProfile = async (uid: string) => {
    setProfileLoading(true);
    try {
      let profile = await getUserProfile(uid);
      
      // If profile doesn't exist, create a basic one for existing users
      if (!profile && currentUser) {
        console.log('📝 Creating missing profile for existing user:', uid);
        const basicProfileData = {
          firstName: currentUser.displayName?.split(' ')[0] || '',
          lastName: currentUser.displayName?.split(' ').slice(1).join(' ') || '',
          phoneNumber: ''
        };
        
        profile = await createUserProfile(currentUser, basicProfileData);
        console.log('✅ Basic profile created for existing user');
      }
      
      setUserProfile(profile);
      console.log('📋 User profile loaded from Firestore');
    } catch (error) {
      console.error('Error loading user profile:', error);
      setUserProfile(null);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      // Check if user just verified their email
      if (user && user.emailVerified) {
        // Check if user was previously unverified (stored in localStorage)
        const wasUnverified = localStorage.getItem(`user-${user.uid}-was-unverified`) === 'true';
        if (wasUnverified) {
          console.log('🎉 User just verified their email, marking as newly verified');
          setIsNewlyVerified(true);
          localStorage.removeItem(`user-${user.uid}-was-unverified`);
        }
      } else if (user && !user.emailVerified) {
        // Store that this user is currently unverified
        localStorage.setItem(`user-${user.uid}-was-unverified`, 'true');
      }
      
      setEmailVerified(user?.emailVerified || false);
      
      // Load user profile if user is authenticated
      if (user) {
        console.log('👤 User authenticated:', {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          displayName: user.displayName
        });
        
        // Load Firestore profile
        await loadUserProfile(user.uid);
      } else {
        console.log('🚪 User signed out');
        setUserProfile(null);
        setIsNewlyVerified(false);
      }
      
      setLoading(false);
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      console.log('🚪 Successfully signed out');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const sendVerificationEmail = async () => {
    if (currentUser && !currentUser.emailVerified) {
      try {
        await sendEmailVerification(currentUser);
        console.log('✉️ Verification email sent');
      } catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
      }
    }
  };

  const refreshUser = async () => {
    if (currentUser) {
      try {
        await reload(currentUser);
        setEmailVerified(currentUser.emailVerified);
        console.log('🔄 User data refreshed');
      } catch (error) {
        console.error('Error refreshing user:', error);
        throw error;
      }
    }
  };

  const clearNewlyVerifiedFlag = () => {
    setIsNewlyVerified(false);
  };

  const refreshUserProfile = async () => {
    if (currentUser) {
      await loadUserProfile(currentUser.uid);
    }
  };

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    profileLoading,
    emailVerified,
    isNewlyVerified,
    signOut,
    sendVerificationEmail,
    refreshUser,
    refreshUserProfile,
    clearNewlyVerifiedFlag
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};