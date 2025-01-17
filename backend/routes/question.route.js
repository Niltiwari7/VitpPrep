import express from 'express'
import { createQuestion, deleteQuestion, getAllQuestions, getQuestionById, updateQuestion } from '../controllers/question.controller.js';

const router = express.Router();

router.post('/create',createQuestion);
router.get('/getquestionbyid/:id',getQuestionById);
router.put('/updatequestion/:id',updateQuestion);
router.delete('/deletequestion/:id',deleteQuestion);
router.get('/getallquestions/:subtopicId/questions',getAllQuestions);

export default router;