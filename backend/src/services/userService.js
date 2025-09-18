import { db } from '../config/firebase.js';

const USERS_COLLECTION = 'users';

/**
 * User Service - Handles all user-related database operations
 */
export class UserService {
  /**
   * Create a new user profile in Firestore
   * @param {string} uid - Firebase Auth UID
   * @param {Object} userData - User profile data
   * @returns {Promise<Object>} Created user data
   */
  static async createUserProfile(uid, userData) {
    try {
      const userProfile = {
        uid,
        email: userData.email,
        displayName: userData.displayName || '',
        phoneNumber: userData.phoneNumber || '',
        photoURL: userData.photoURL || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        // Additional profile fields
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        dateOfBirth: userData.dateOfBirth || '',
        address: userData.address || {},
        preferences: userData.preferences || {},
        // Career-related fields (assuming this is a career-focused app)
        jobTitle: userData.jobTitle || '',
        company: userData.company || '',
        experience: userData.experience || '',
        skills: userData.skills || [],
        bio: userData.bio || ''
      };

      await db.collection(USERS_COLLECTION).doc(uid).set(userProfile);
      return userProfile;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw new Error('Failed to create user profile');
    }
  }

  /**
   * Get user profile by UID
   * @param {string} uid - Firebase Auth UID
   * @returns {Promise<Object|null>} User profile data or null if not found
   */
  static async getUserProfile(uid) {
    try {
      const doc = await db.collection(USERS_COLLECTION).doc(uid).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw new Error('Failed to retrieve user profile');
    }
  }

  /**
   * Update user profile
   * @param {string} uid - Firebase Auth UID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated user data
   */
  static async updateUserProfile(uid, updateData) {
    try {
      const updatedData = {
        ...updateData,
        updatedAt: new Date().toISOString()
      };

      await db.collection(USERS_COLLECTION).doc(uid).update(updatedData);
      
      // Return the updated profile
      return await this.getUserProfile(uid);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new Error('Failed to update user profile');
    }
  }

  /**
   * Delete user profile
   * @param {string} uid - Firebase Auth UID
   * @returns {Promise<boolean>} Success status
   */
  static async deleteUserProfile(uid) {
    try {
      await db.collection(USERS_COLLECTION).doc(uid).delete();
      return true;
    } catch (error) {
      console.error('Error deleting user profile:', error);
      throw new Error('Failed to delete user profile');
    }
  }

  /**
   * Check if user profile exists
   * @param {string} uid - Firebase Auth UID
   * @returns {Promise<boolean>} Whether user profile exists
   */
  static async userExists(uid) {
    try {
      const doc = await db.collection(USERS_COLLECTION).doc(uid).get();
      return doc.exists;
    } catch (error) {
      console.error('Error checking user existence:', error);
      throw new Error('Failed to check user existence');
    }
  }

  /**
   * Get users by email (for admin purposes)
   * @param {string} email - User email
   * @returns {Promise<Array>} Array of users matching the email
   */
  static async getUserByEmail(email) {
    try {
      const snapshot = await db.collection(USERS_COLLECTION)
        .where('email', '==', email)
        .get();
      
      const users = [];
      snapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });
      
      return users;
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw new Error('Failed to get user by email');
    }
  }

  /**
   * Get all users (with pagination)
   * @param {number} limit - Number of users to retrieve
   * @param {string} lastDocId - Last document ID for pagination
   * @returns {Promise<Object>} Users data with pagination info
   */
  static async getAllUsers(limit = 10, lastDocId = null) {
    try {
      let query = db.collection(USERS_COLLECTION)
        .orderBy('createdAt', 'desc')
        .limit(limit);

      if (lastDocId) {
        const lastDoc = await db.collection(USERS_COLLECTION).doc(lastDocId).get();
        query = query.startAfter(lastDoc);
      }

      const snapshot = await query.get();
      const users = [];
      let newLastDocId = null;

      snapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
        newLastDocId = doc.id;
      });

      return {
        users,
        lastDocId: newLastDocId,
        hasMore: users.length === limit
      };
    } catch (error) {
      console.error('Error getting all users:', error);
      throw new Error('Failed to retrieve users');
    }
  }
}

export default UserService;