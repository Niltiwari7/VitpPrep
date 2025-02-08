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
        topicId:{
            type:String,
            required:true,
            ref:'Topic'
        },
        tags: {
            type: [String],
        },
        subtopicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subtopic', 
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
        hints:{
            type:Array,
        },
        constraints:{
            type:Array,
        },
        like:{
            type:Boolean,
            default:false
        },
        videoLink:{
            type:String
        }
        
    });

    // Register the Question model
    const Question = mongoose.model('Question', QuestionSchema);
    export default Question;
