import express from 'express';
import { registerUser, loginUser, getUserProfile, getAllUsers } from '../Controllers/userController.js';
import { authenticateUser } from '../Middleware/authMiddleware.js';

const router = express.Router();

// Register/Login
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (Authentication Required)
router.get('/profile', authenticateUser, getUserProfile);
router.get('/users', authenticateUser, getAllUsers);

export default router;
