import express from 'express'
import { createQuestion, deleteQuestion, getAllQuestions, getQuestionById, Questions, updateQuestion } from '../controllers/question.controller.js';

const router = express.Router();

router.post('/admin/create',createQuestion);
// get all question
router.get('/all',Questions);
router.get('/:id',getQuestionById);
router.put('/update/:id',updateQuestion);
router.delete('/delete/:id',deleteQuestion);
router.get('/subtopic/:subtopicId',getAllQuestions);

export default router;