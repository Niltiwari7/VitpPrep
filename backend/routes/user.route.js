import express from 'express';
import { getProfile, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile/:id', auth, getProfile);
export default router;