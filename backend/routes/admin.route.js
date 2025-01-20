import express from 'express';
import { logInAdmin, RegisterAdmin } from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/create',RegisterAdmin);
router.post('/login',logInAdmin);
export default router;