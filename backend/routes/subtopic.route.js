import express from 'express';
import { createSubtopic , getAllSubtopics } from '../controllers/subtopic.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create',auth,createSubtopic);
router.get('/getallsubtopic/:id',getAllSubtopics);

export default router;