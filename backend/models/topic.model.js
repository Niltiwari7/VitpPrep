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
            ref:'Subtopic'
        }
    ]
})

const Topic = mongoose.model('Topic',TopicSchema);
export default Topic;