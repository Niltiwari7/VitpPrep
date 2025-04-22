import express from 'express';

import { createTopic, deleteTopic, getAllTopics, getQuestionByTopicId, getSingleTopic, updateTopic } from '../controllers/topic.controller.js';

const router = express.Router();
router.post('/admin/create',createTopic)
router.get('/getalltopics',getAllTopics)
router.get('/:id',getSingleTopic)
router.put('/admin/update/:id',updateTopic);
router.delete('/admin/delete/:id',deleteTopic)
router.get('/subtopic/:id',getQuestionByTopicId);

export default router;