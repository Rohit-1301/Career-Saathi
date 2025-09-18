import express from 'express';
import { 
  getUserProfile, 
  getCurrentUserProfile,
  updateUserProfile, 
  updateCurrentUserProfile,
  deleteUserProfile,
  getAllUsers,
  searchUsersByEmail
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Current user routes (based on token)
router.get('/profile', getCurrentUserProfile);
router.put('/profile', updateCurrentUserProfile);

// Specific user routes (by UID)
router.get('/profile/:uid', getUserProfile);
router.put('/profile/:uid', updateUserProfile);
router.delete('/profile/:uid', deleteUserProfile);

// Admin routes
router.get('/all', getAllUsers);
router.get('/search', searchUsersByEmail);

export default router;