import mongoose from "mongoose";

const SubtopicSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    topicId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Topic'
    },
    questions:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
      }  
    ]
})

const Subtopic = mongoose.model('Subtopic',SubtopicSchema);
export default Subtopic;