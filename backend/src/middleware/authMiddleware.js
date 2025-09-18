import admin from '../config/firebase.js';
import UserService from '../services/userService.js';

/**
 * Basic token verification middleware
 * Only verifies the token and attaches decoded user to req.user
 */
export const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const idToken = authorization.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Check if user has admin claim
    const userRecord = await admin.auth().getUser(decodedToken.uid);
    decodedToken.admin = userRecord.customClaims?.admin || false;
    
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

/**
 * Enhanced middleware that includes user profile data
 * Useful for routes that need both auth verification and profile data
 */
export const verifyTokenWithProfile = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const idToken = authorization.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Check if user has admin claim
    const userRecord = await admin.auth().getUser(decodedToken.uid);
    decodedToken.admin = userRecord.customClaims?.admin || false;
    
    // Fetch user profile from Firestore
    try {
      const userProfile = await UserService.getUserProfile(decodedToken.uid);
      req.userProfile = userProfile;
    } catch (profileError) {
      console.warn('Could not fetch user profile:', profileError);
      // Don't fail the request if profile is not found
      req.userProfile = null;
    }
    
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

/**
 * Admin-only middleware
 * Ensures the user has admin privileges
 */
export const requireAdmin = async (req, res, next) => {
  await verifyToken(req, res, () => {
    if (!req.user.admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  });
};

// Default export for backward compatibility
export default verifyToken;
