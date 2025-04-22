import express from 'express';

import { auth } from '../middlewares/auth.middleware.js';
import { createSubtopic, getAllSubtopics, getSubtopicsByTopic, getSubtopicId, updateSubtopic, deleteSubtopic, QuestionSubtopicById} from '../controllers/subtopic.controller.js';

const router = express.Router();

router.post('/admin/create',createSubtopic);

router.get('/',getAllSubtopics);

router.get('/:topicId',getSubtopicsByTopic);

router.get('/:id',getSubtopicId);

router.put('/admin/update/:id',updateSubtopic);

router.delete('/admin/delete/:id',deleteSubtopic);

router.get('/question/:subtopicId',QuestionSubtopicById);




export default router;