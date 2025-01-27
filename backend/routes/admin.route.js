import express from 'express';
import { getAdminInfo, logInAdmin, logout, RegisterAdmin, updateInformation, updatePassword, updatePersonalInfo, updateSocialLinks, updateTechSkills, uploadImage } from '../controllers/admin.controller.js';
import { auth } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.post('/create',RegisterAdmin);
router.post('/login',logInAdmin);
router.get('/getadmin/:adminId', auth,getAdminInfo)
router.post('/uploadimage/:adminId',auth,upload.single('image'),uploadImage);
router.put('/updatePersonalInfo/:adminId',auth, updatePersonalInfo);
router.put('/updateSocialLinks/:adminId',auth, updateSocialLinks);
router.put('/updatePassword/:adminId',auth, updatePassword);
router.put('/updateSkills/:adminId',auth, updateTechSkills);
router.post('/logout/:adminId',auth,logout);
// router.post('/update/:adminId',auth, updateInformation)

export default router;