import Question from "../models/question.model.js";
import Subtopic from "../models/subtopic.model.js";
import Topic from "../models/topic.model.js";


// Create a new Question
export const createQuestion = async (req, res) => {
    try {
        let {
            title,
            description,
            difficulty,
            tags = [],
            topicId,
            subtopicId,
            url,
            miscellaneous = false,
            examples = [],
            hints = [],
            constraints = []
        } = req.body;

        // Input validation
        if (!title || !description || !difficulty || !topicId || !subtopicId || !url) {
            return res.status(400).json({
                success: false,
                message: "Title, description, difficulty, topicId, subtopicId, and url are required",
                statusCode: 400
            })
        }

        // check if topic Id is exists or not
        const topic = await Topic.findById(topicId);
        if (!topic) {
            return res.status(400).json({
                success: false,
                message: "Topic Id is invalid",
                success: false
            })
        }

        // If topic Id is provided check if it belongs to the given subtopicId
        if (subtopicId) {
            const subtopic = await Subtopic.findById(subtopicId);

            if (!subtopic) {
                return res.status(400).json({
                    message: "Invalid Subtopic Id",
                    statusCode: 400,
                    success: false
                })
            }
        }
        difficulty = difficulty.toLowerCase();

        // Checking for difficulty level
        if (!['easy', 'medium', 'hard'].includes(difficulty)) {
            return res.status(400).json({
                success: false,
                message: "Invalid difficulty level, Choose from 'easy' , 'medium', or 'hard'.",
                statusCode: 400
            })
        }

        const question = await Question.create({
            title,
            description,
            difficulty,
            tags,
            topicId,
            subtopicId,
            url,
            miscellaneous,
            examples,
            hints,
            constraints
        });
        // push the question to the subtopic model 
        await question.save();
        const subtopic = await Subtopic.findById(subtopicId);
        if (subtopic) {
            subtopic.questions.push(question._id);
            await subtopic.save();
        }

        return res.status(201).json({
            success: true,
            message: "Question Created Successfully",
            question: question
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server error',
            error: error.message
        })
    }
};




// Get a Question by ID
export const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;


        const question = await Question.findById(req.params.id).populate('subtopicId');
        if (!question) {
            return res.status(404).json({
                message: 'Question not found',
                statusCode: 404,
                success: false
            });
        }
        res.status(200).json({
            success: true,
            message: "Question fetched successfully",
            question: question
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            statusCode: 400,
            success: fasle
        });
    }
};

// Update a Question by ID
export const updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!question) {
            return res.status(404).json({
                message: 'Question not found',
                statusCode: 404,
                success: false
            });
        }

        res.status(200).json({
            success: true,
            statusCode: 200,
            question: question,
            message:'Question Updated successfully'
        });
    } catch (error) {
        console.error('Error updating question:', error);  // Log the error

        res.status(400).json({
            message: error.message,
            statusCode: 400,
            success: false
        });
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

// Get all questions
export const Questions = async (req, res) => {
    try {
        const questions = await Question.find({});

        if (questions.length === 0) {
            return res.status(404).json({
                message: "No question found",
                success: false,
                statusCode: 404
            })
        }

        return res.status(200).json({
            message: "Questions fetched successfully",
            success: true,
            statusCode: 200,
            questions: questions
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server error',
            error: error.message,
            success: false
        })
    }
}