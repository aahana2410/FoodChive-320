import express from 'express';
import { registerUser, loginUser, getUser, updateUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

//sets routes for the users
const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get', protect, getUser);
router.post('/update', updateUser);

export default router;