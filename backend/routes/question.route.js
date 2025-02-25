import express from 'express'
import { createQuestion, deleteQuestion, getAllQuestions, getQuestionById, getQuestionWithProgress, Questions, toggleLikeQuestion, updateQuestion, updateQuestionWithProgress } from '../controllers/question.controller.js';

const router = express.Router();

router.post('/admin/create',createQuestion);
// get all question
router.get('/all',Questions);
router.get('/:id',getQuestionById);
router.put('/update/:id',updateQuestion);
router.delete('/delete/:id',deleteQuestion);
router.get('/subtopic/:subtopicId',getAllQuestions);

router.put('/update-progress',updateQuestionWithProgress);
router.post('/questions-with-progress',getQuestionWithProgress);

router.put('/toggle-like', toggleLikeQuestion);

export default router;