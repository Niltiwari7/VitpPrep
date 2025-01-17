import Question from "../models/question.model.js";


// Create a new Question
export const createQuestion = async (req, res) => {
    try {
        const { title, description, difficulty, tags, subtopicId, url, examples } = req.body;
        const newQuestion = new Question({ title, description, difficulty, tags, subtopicId, url, examples });
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a Question by ID
export const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).populate('subtopicId');
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a Question by ID
export const updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Question by ID
export const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Questions for a Subtopic
export const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find({ subtopicId: req.params.subtopicId });
        res.status(200).json(questions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
