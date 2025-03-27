import express from 'express';
import { countUser, favQuestion, getProfile, loginUser, logoutUser, registerUser, updatePassword, updatePersonalInfo, updateSocialLinks, updateTechSkills } from '../controllers/user.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile/:id', auth, getProfile);
router.get('/count',auth,countUser);
router.put('/updatePersonalInfo/:userId',auth,updatePersonalInfo);
router.put('/updateSocialLinks/:userId',auth,updateSocialLinks);
router.put('/updatePassword/:userId',auth,updatePassword);
router.put('/updateSkills/:userId',auth,updateTechSkills);
router.get('/likequestion/:userId',auth,favQuestion)

export default router;