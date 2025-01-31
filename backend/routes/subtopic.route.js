import express from 'express';

import { auth } from '../middlewares/auth.middleware.js';
import { createSubtopic, getAllSubtopics, getSubtopicsByTopic, getSubtopicId, updateSubtopic, deleteSubtopic } from '../controllers/subtopic.controller.js';

const router = express.Router();

router.post('/admin/create',auth,createSubtopic);

router.get('/',auth,getAllSubtopics);

router.get('/:topicId',auth,getSubtopicsByTopic);

router.get('/:id',auth,getSubtopicId);

router.put('/admin/update/:id',auth,updateSubtopic);

router.delete('/admin/delete/:id',auth,deleteSubtopic);


export default router;