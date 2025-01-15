import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    subtopics:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'subtopics'
        }
    ]
})

const Topic = mongoose.model('topics',TopicSchema);
export default Topic;