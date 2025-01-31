import express from 'express';
import { auth } from '../middlewares/auth.middleware.js';
import { createTopic, deleteTopic, getAllTopics, getSingleTopic, updateTopic } from '../controllers/topic.controller.js';

const router = express.Router();
router.post('/admin/create', auth,createTopic)
router.get('/getalltopics',auth,getAllTopics)
router.get('/:id',auth,getSingleTopic)
router.put('/admin/update/:id',auth,updateTopic);
router.delete('/admin/delete/:id',auth,deleteTopic)

export default router;