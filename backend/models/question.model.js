import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard'],
    },
    tags: {
        type: [String], // Explicitly specify the type of elements in the array
    },
    subtopicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subtopic', // Corrected reference to 'Subtopic'
    },
    miscellaneous: {
        type: Boolean,
        default: false,
    },
    url: {
        type: String,
        required: true,
    },
    examples: [
        {
            input: {
                type: String,
            },
            output: {
                type: String,
            },
        },
    ],
});

// Register the Question model
const Question = mongoose.model('Question', QuestionSchema);
export default Question;
