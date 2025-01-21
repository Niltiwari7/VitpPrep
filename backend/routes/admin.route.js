import express from 'express';
import { getAdminInfo, logInAdmin, RegisterAdmin } from '../controllers/admin.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create',RegisterAdmin);
router.post('/login',logInAdmin);
router.get('/getadmin/:id', auth,getAdminInfo)
export default router;