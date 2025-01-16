import express from 'express';
import { createSubtopic } from '../controllers/subtopic.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create',auth,createSubtopic);

export default router;