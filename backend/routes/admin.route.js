import express from 'express';
import { getAdminInfo, logInAdmin, logout, RegisterAdmin, updatePassword, updatePersonalInfo, updateSocialLinks, updateTechSkills, uploadImage } from '../controllers/admin.controller.js';
import { auth } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.post('/create',RegisterAdmin);
router.post('/login',logInAdmin);
router.get('/getadmin/:adminId', getAdminInfo)
router.post('/uploadimage/:adminId',upload.single('image'),uploadImage);
router.put('/updatePersonalInfo/:adminId', updatePersonalInfo);
router.put('/updateSocialLinks/:adminId', updateSocialLinks);
router.put('/updatePassword/:adminId', updatePassword);
router.put('/updateSkills/:adminId',updateTechSkills);
router.post('/logout/:adminId',logout);
// router.post('/update/:adminId',auth, updateInformation)

export default router;