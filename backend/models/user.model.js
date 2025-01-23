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
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    imageUrl:{
        type:String,
        default:"https://imgcdn.stablediffusionweb.com/2024/11/1/b51f49a9-82a1-4659-905d-c8cd8643bade.jpg"
    },
    University:{
       type:String,
    },
    socialLinks: {
        github: String,
        linkedin: String,
        twitter: String,
        website: String,
    },
    bio: {
        type: String,
        default: "",
    },
    technicalSkills: {
        type: [String],
        default: [],
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
