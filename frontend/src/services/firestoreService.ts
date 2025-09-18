import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { User } from 'firebase/auth';

// User profile interface
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  location?: string;
  education?: {
    level: string;
    institution?: string;
    field?: string;
    graduationYear?: number;
  };
  interests?: string[];
  skills?: string[];
  careerGoals?: string[];
  profileComplete: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Create user profile in Firestore
export const createUserProfile = async (user: User, additionalData: Partial<UserProfile> = {}) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    
    const userData: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      firstName: additionalData.firstName || '',
      lastName: additionalData.lastName || '',
      phoneNumber: additionalData.phoneNumber || '',
      dateOfBirth: additionalData.dateOfBirth || '',
      gender: additionalData.gender || '',
      location: additionalData.location || '',
      education: additionalData.education || {
        level: '',
        institution: '',
        field: ''
        // graduationYear omitted - only add if it has a value
      },
      interests: additionalData.interests || [],
      skills: additionalData.skills || [],
      careerGoals: additionalData.careerGoals || [],
      profileComplete: false,
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
      ...additionalData
    };

    // Clean the data by removing undefined values
    const cleanedUserData = removeUndefinedValues(userData);
    
    console.log('🧹 Cleaned user data for Firestore:', cleanedUserData);
    
    await setDoc(userRef, cleanedUserData);
    console.log('✅ User profile created in Firestore:', user.uid);
    return cleanedUserData;
  } catch (error) {
    console.error('❌ Error creating user profile:', error);
    throw error;
  }
};

// Get user profile from Firestore
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data() as UserProfile;
      console.log('✅ User profile retrieved:', uid);
      return userData;
    } else {
      console.log('❌ No user profile found for:', uid);
      return null;
    }
  } catch (error) {
    console.error('❌ Error getting user profile:', error);
    throw error;
  }
};

// Helper function to remove undefined values recursively
const removeUndefinedValues = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return null;
  }
  
  if (Array.isArray(obj)) {
    return obj.filter(item => item !== undefined).map(removeUndefinedValues);
  }
  
  if (typeof obj === 'object') {
    const cleaned: any = {};
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (value !== undefined) {
        cleaned[key] = removeUndefinedValues(value);
      }
    });
    return cleaned;
  }
  
  return obj;
};

// Update user profile
export const updateUserProfile = async (uid: string, updateData: Partial<UserProfile>) => {
  try {
    const userRef = doc(db, 'users', uid);
    
    // Clean the data by removing undefined values
    const cleanedData = removeUndefinedValues({
      ...updateData,
      updatedAt: serverTimestamp()
    });
    
    console.log('🧹 Cleaned data for Firestore:', cleanedData);
    
    // Check if document exists first
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      // Document exists, use updateDoc
      await updateDoc(userRef, cleanedData);
      console.log('✅ User profile updated:', uid);
    } else {
      // Document doesn't exist, create it with setDoc
      console.log('📝 Creating new user profile document for:', uid);
      
      // Get current user info from Firebase Auth
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('User not authenticated');
      }
      
      // Create a complete user profile with required fields
      const completeProfile: UserProfile = {
        uid: uid,
        email: currentUser.email || '',
        displayName: currentUser.displayName || '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        location: '',
        education: {
          level: '',
          institution: '',
          field: ''
        },
        interests: [],
        skills: [],
        careerGoals: [],
        profileComplete: false,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
        ...cleanedData // Override with provided data
      };
      
      const cleanedCompleteProfile = removeUndefinedValues(completeProfile);
      await setDoc(userRef, cleanedCompleteProfile);
      console.log('✅ User profile created:', uid);
    }
    
    return cleanedData;
  } catch (error) {
    console.error('❌ Error updating user profile:', error);
    throw error;
  }
};

// Mark profile as complete
export const markProfileComplete = async (uid: string) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      profileComplete: true,
      updatedAt: serverTimestamp()
    });
    console.log('✅ Profile marked as complete:', uid);
  } catch (error) {
    console.error('❌ Error marking profile complete:', error);
    throw error;
  }
};

// Check if user profile exists
export const checkUserProfileExists = async (uid: string): Promise<boolean> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists();
  } catch (error) {
    console.error('❌ Error checking user profile:', error);
    return false;
  }
};

// Save career assessment data
export const saveCareerAssessment = async (uid: string, assessmentData: any) => {
  try {
    const assessmentRef = doc(db, 'assessments', uid);
    const data = {
      uid,
      ...assessmentData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    await setDoc(assessmentRef, data);
    console.log('✅ Career assessment saved:', uid);
    return data;
  } catch (error) {
    console.error('❌ Error saving career assessment:', error);
    throw error;
  }
};

// Save learning progress
export const saveLearningProgress = async (uid: string, progressData: any) => {
  try {
    const progressRef = doc(collection(db, 'users', uid, 'learning_progress'));
    const data = {
      ...progressData,
      timestamp: serverTimestamp()
    };
    
    await setDoc(progressRef, data);
    console.log('✅ Learning progress saved:', uid);
    return data;
  } catch (error) {
    console.error('❌ Error saving learning progress:', error);
    throw error;
  }
};