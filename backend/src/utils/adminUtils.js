import admin from '../config/firebase.js';

/**
 * Set custom claims for a user (admin privileges)
 * @param {string} uid - User UID
 * @param {object} customClaims - Custom claims to set
 * @returns {Promise<void>}
 */
export const setCustomClaims = async (uid, customClaims) => {
  try {
    await admin.auth().setCustomUserClaims(uid, customClaims);
    console.log(`Custom claims set for user ${uid}:`, customClaims);
  } catch (error) {
    console.error('Error setting custom claims:', error);
    throw error;
  }
};

/**
 * Make a user admin
 * @param {string} uid - User UID
 * @returns {Promise<void>}
 */
export const makeUserAdmin = async (uid) => {
  return await setCustomClaims(uid, { admin: true });
};

/**
 * Remove admin privileges from a user
 * @param {string} uid - User UID
 * @returns {Promise<void>}
 */
export const removeAdminPrivileges = async (uid) => {
  return await setCustomClaims(uid, { admin: false });
};

/**
 * Check if a user has admin privileges
 * @param {string} uid - User UID
 * @returns {Promise<boolean>}
 */
export const isUserAdmin = async (uid) => {
  try {
    const userRecord = await admin.auth().getUser(uid);
    return userRecord.customClaims?.admin === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

/**
 * Get user's custom claims
 * @param {string} uid - User UID
 * @returns {Promise<object>}
 */
export const getUserCustomClaims = async (uid) => {
  try {
    const userRecord = await admin.auth().getUser(uid);
    return userRecord.customClaims || {};
  } catch (error) {
    console.error('Error getting custom claims:', error);
    throw error;
  }
};