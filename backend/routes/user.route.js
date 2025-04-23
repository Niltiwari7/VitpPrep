import express from 'express';
import { countUser, favQuestion, getProfile, loginUser, logoutUser, registerUser, updatePassword, updatePersonalInfo, updateSocialLinks, updateTechSkills } from '../controllers/user.controller.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile/:id',  getProfile);
router.get('/count',countUser);
router.put('/updatePersonalInfo/:userId',updatePersonalInfo);
router.put('/updateSocialLinks/:userId',updateSocialLinks);
router.put('/updatePassword/:userId',updatePassword);
router.put('/updateSkills/:userId',updateTechSkills);
router.get('/likequestion/:userId',favQuestion)

export default router;  