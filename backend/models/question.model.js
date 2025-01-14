import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
        enum:['easy','medium','hard']
    },
    tags: {
        type: Array
    },
    subtopicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subtopics'
    },
    miscellaneous: {
        type: Boolean,
        default: false
    },
    url: {
        type: String,
        required: true
    },
    examples: [
        {
            input: {
                type: String,
            },
            output: {
                type: String
            }
        }

    ]
})

const Question = mongoose.model('Question',questionSchema);
export default Question