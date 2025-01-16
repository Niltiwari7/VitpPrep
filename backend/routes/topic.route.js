import express from 'express';
import { createTopic, getAllTopics, getSingleTopic } from '../controllers/topic.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.get('/getSingleTopic/:id', getSingleTopic);
router.get('/getalltopic',getAllTopics);
router.post('/admin/createtopics',auth,createTopic);

export default router;