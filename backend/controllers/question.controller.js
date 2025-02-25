import Question from "../models/question.model.js";
import Subtopic from "../models/subtopic.model.js";
import Topic from "../models/topic.model.js";
import User from "../models/user.model.js";


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
            success: false
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

// update question progress

export const updateQuestionWithProgress = async (req, res) => {
    try {
        const { userId, questionId } = req.body;

        if (!userId || !questionId) {
            return res.status(400).json({
                message: "User ID and Question ID are required",
                success: false,
                statusCode: 400,
            });
        }

        // Find the user first
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                statusCode: 404,
            });
        }

        // Check if the question is already marked as completed
        const isCompleted = user.CompleteQuestions.includes(questionId);

        // Update action based on completion status
        const updateAction = isCompleted
            ? { $pull: { CompleteQuestions: questionId } } // Remove if completed
            : { $addToSet: { CompleteQuestions: questionId } }; // Add if not completed

        // Perform update
        const updatedUser = await User.findByIdAndUpdate(userId, updateAction, { new: true });

        return res.status(200).json({
            message: `Question progress updated successfully, status: ${isCompleted ? "Incomplete" : "Completed"}`,
            success: true,
            statusCode: 200,
            completed: !isCompleted, // Return the new status
            updatedUser
        });

    } catch (error) {
       
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false,
        });
    }
};

// get Question with progress

export const getQuestionWithProgress = async (req, res) => {
    try {
        const { subtopicId, userId } = req.body;
        
        
        const questions = await Question.find({ subtopicId });

        if (!questions.length) {
            return res.status(404).json({
                message: "No questions found",
                success: false,
                statusCode: 404,
            });
        }

  
        const user = await User.findById(userId).select("CompleteQuestions");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                statusCode: 404,
                success: false,
            });
        }

     
        const completedQuestions = new Set(user.CompleteQuestions.map((q) => q.toString()));

      
        const questionWithProgress = questions.map((question) => ({
            ...question.toObject(),
            completed: completedQuestions.has(question._id.toString()),
        }));

        return res.status(200).json({
            message:"Question fetched successfully",
            success:true,
            statusCode:200,
            questions:questionWithProgress
        });
    } catch (error) {
      
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false,
        });
    }
};

// Toggle like on a question

export const toggleLikeQuestion = async (req, res) => {
    try {
        const { userId, questionId } = req.body;

        if (!userId || !questionId) {
            return res.status(400).json({ message: "User ID and Question ID are required.", success: false });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found.", success: false });
        }

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found.", success: false });
        }

        const isLiked = question.likedBy.includes(userId);

        let updateUserQuery, updateQuestionQuery;
        if (isLiked) {
            updateUserQuery = { $pull: { "favorites.questions": questionId } };
            updateQuestionQuery = { 
                $pull: { likedBy: userId }, 
                $inc: { likesCount: -1 } 
            };
        } else {
            updateUserQuery = { $addToSet: { "favorites.questions": questionId } };
            updateQuestionQuery = { 
                $addToSet: { likedBy: userId }, 
                $inc: { likesCount: 1 } 
            };
        }

        await User.findByIdAndUpdate(userId, updateUserQuery, { new: true });
        const updatedQuestion = await Question.findByIdAndUpdate(questionId, updateQuestionQuery, { new: true });

        return res.status(200).json({
            message: isLiked ? "Question unliked." : "Question liked.",
            success: true,
            likesCount: updatedQuestion.likesCount,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message, success: false });
    }
};
