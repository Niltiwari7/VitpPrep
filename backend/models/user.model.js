import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    favorites: {
        questions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question',
            },
        ],
        topics: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Topic',
            },
        ],
        subtopics: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subtopic',
            },
        ],
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
