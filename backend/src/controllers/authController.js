import admin from '../config/firebase.js';
import UserService from '../services/userService.js';

export const signup = async (req, res) => {
  const { 
    email, 
    password, 
    displayName, 
    phoneNumber,
    firstName,
    lastName,
    dateOfBirth,
    jobTitle,
    company,
    experience,
    skills,
    bio,
    photoURL
  } = req.body;

  try {
    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
      phoneNumber,
      photoURL
    });

    // Create user profile in Firestore
    const userProfileData = {
      email,
      displayName,
      phoneNumber,
      firstName,
      lastName,
      dateOfBirth,
      jobTitle,
      company,
      experience,
      skills: skills || [],
      bio,
      photoURL
    };

    const userProfile = await UserService.createUserProfile(userRecord.uid, userProfileData);

    res.status(201).json({ 
      message: 'User created successfully',
      uid: userRecord.uid,
      profile: userProfile
    });
  } catch (error) {
    console.error('Signup error:', error);
    
    // If user was created in Auth but profile creation failed, clean up
    if (error.message.includes('Failed to create user profile')) {
      try {
        // Try to get the user record to delete it
        const userRecord = await admin.auth().getUserByEmail(email);
        await admin.auth().deleteUser(userRecord.uid);
        console.log('Cleaned up auth user after profile creation failure');
      } catch (cleanupError) {
        console.error('Failed to cleanup auth user:', cleanupError);
      }
    }
    
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  // This is intentionally left blank. 
  // Client-side handles login with Firebase Auth.
  // The backend's role is to verify the ID token sent from the client
  // using the authMiddleware for protected routes.
  res.status(200).json({ message: 'Login status can be checked via token verification.' });
};
