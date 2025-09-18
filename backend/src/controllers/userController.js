import UserService from '../services/userService.js';
import admin from '../config/firebase.js';

/**
 * Get user profile by UID
 */
export const getUserProfile = async (req, res) => {
  try {
    const { uid } = req.params;
    
    // Verify that the requesting user can access this profile
    // (Either it's their own profile or they have admin privileges)
    if (req.user.uid !== uid && !req.user.admin) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const userProfile = await UserService.getUserProfile(uid);
    
    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    res.status(200).json({ profile: userProfile });
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get current user's profile (from token)
 */
export const getCurrentUserProfile = async (req, res) => {
  try {
    const uid = req.user.uid;
    
    const userProfile = await UserService.getUserProfile(uid);
    
    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    res.status(200).json({ profile: userProfile });
  } catch (error) {
    console.error('Error getting current user profile:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (req, res) => {
  try {
    const { uid } = req.params;
    
    // Verify that the requesting user can update this profile
    if (req.user.uid !== uid && !req.user.admin) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const {
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
      photoURL,
      address,
      preferences
    } = req.body;

    // Filter out undefined values to avoid overwriting with undefined
    const updateData = {};
    if (displayName !== undefined) updateData.displayName = displayName;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth;
    if (jobTitle !== undefined) updateData.jobTitle = jobTitle;
    if (company !== undefined) updateData.company = company;
    if (experience !== undefined) updateData.experience = experience;
    if (skills !== undefined) updateData.skills = skills;
    if (bio !== undefined) updateData.bio = bio;
    if (photoURL !== undefined) updateData.photoURL = photoURL;
    if (address !== undefined) updateData.address = address;
    if (preferences !== undefined) updateData.preferences = preferences;

    const updatedProfile = await UserService.updateUserProfile(uid, updateData);
    
    // Also update Firebase Auth profile if displayName or photoURL changed
    if (displayName !== undefined || photoURL !== undefined) {
      const authUpdateData = {};
      if (displayName !== undefined) authUpdateData.displayName = displayName;
      if (photoURL !== undefined) authUpdateData.photoURL = photoURL;
      
      await admin.auth().updateUser(uid, authUpdateData);
    }

    res.status(200).json({ 
      message: 'Profile updated successfully',
      profile: updatedProfile 
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update current user's profile (from token)
 */
export const updateCurrentUserProfile = async (req, res) => {
  try {
    const uid = req.user.uid;

    const {
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
      photoURL,
      address,
      preferences
    } = req.body;

    // Filter out undefined values
    const updateData = {};
    if (displayName !== undefined) updateData.displayName = displayName;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth;
    if (jobTitle !== undefined) updateData.jobTitle = jobTitle;
    if (company !== undefined) updateData.company = company;
    if (experience !== undefined) updateData.experience = experience;
    if (skills !== undefined) updateData.skills = skills;
    if (bio !== undefined) updateData.bio = bio;
    if (photoURL !== undefined) updateData.photoURL = photoURL;
    if (address !== undefined) updateData.address = address;
    if (preferences !== undefined) updateData.preferences = preferences;

    const updatedProfile = await UserService.updateUserProfile(uid, updateData);
    
    // Also update Firebase Auth profile if displayName or photoURL changed
    if (displayName !== undefined || photoURL !== undefined) {
      const authUpdateData = {};
      if (displayName !== undefined) authUpdateData.displayName = displayName;
      if (photoURL !== undefined) authUpdateData.photoURL = photoURL;
      
      await admin.auth().updateUser(uid, authUpdateData);
    }

    res.status(200).json({ 
      message: 'Profile updated successfully',
      profile: updatedProfile 
    });
  } catch (error) {
    console.error('Error updating current user profile:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete user profile (and auth account)
 */
export const deleteUserProfile = async (req, res) => {
  try {
    const { uid } = req.params;
    
    // Verify that the requesting user can delete this profile
    if (req.user.uid !== uid && !req.user.admin) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Delete from Firestore
    await UserService.deleteUserProfile(uid);
    
    // Delete from Firebase Auth
    await admin.auth().deleteUser(uid);

    res.status(200).json({ message: 'User profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting user profile:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get all users (admin only)
 */
export const getAllUsers = async (req, res) => {
  try {
    // Check if user has admin privileges
    if (!req.user.admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { limit = 10, lastDocId } = req.query;
    
    const result = await UserService.getAllUsers(parseInt(limit), lastDocId);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Search users by email (admin only)
 */
export const searchUsersByEmail = async (req, res) => {
  try {
    // Check if user has admin privileges
    if (!req.user.admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ error: 'Email query parameter is required' });
    }

    const users = await UserService.getUserByEmail(email);

    res.status(200).json({ users });
  } catch (error) {
    console.error('Error searching users by email:', error);
    res.status(500).json({ error: error.message });
  }
};