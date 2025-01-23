import express from 'express';
import { getAdminInfo, logInAdmin, RegisterAdmin, uploadImage } from '../controllers/admin.controller.js';
import { auth } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.post('/create',RegisterAdmin);
router.post('/login',logInAdmin);
router.get('/getadmin/:adminId', auth,getAdminInfo)
router.post('/uploadimage/:adminId',auth,upload.single('image'),uploadImage);
router.post('/admin/edit:adminId',auth, )
export default router;