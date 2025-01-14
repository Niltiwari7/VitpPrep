import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: [{
        "questionId": mongoose.Schema.Types.ObjectId,
        ref: 'questions'
    },
    {
        "topicId": mongoose.Schema.Types.ObjectId,
        ref: 'topics'
    },
    {
        "subtopicId": mongoose.Schema.Types.ObjectId,
        ref: 'subtopics'
    }]
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

export default User;