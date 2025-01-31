import Subtopic from "../models/subtopic.model.js";
import Topic from "../models/topic.model.js";

export const createSubtopic = async (req, res)=>{
    try {
        const {name, description, topicId} = req.body;

        // check if topic exist before adding a subtopic
        const topic = await Topic.findById(topicId);

        if(!topic){
            return res.status(400).json({
                message:"Topic not found",
                statusCode:400,
                success:false
            })
        }

        const newSubtopic = await Subtopic.create({
            name,description ,topicId
        })

        await newSubtopic.save();
        topic.subtopics.push(newSubtopic._id);
        await topic.save();

        return res.status(201).json({
            message:"Subtopic created successfully",
            statusCode:201,
            success:true,
            subtopic:newSubtopic
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            statusCode:500,
            success:false

        })
    }
}



export const getAllSubtopics = async (req,res)=>{
    try {
        const subtopics = await Subtopic.find().populate('topicId');

        if(!subtopics){
            return res.status(404).json({
                message:"Subtopics not found",
                statusCode:404,
                success:false
            })
        }

        return res.status(200).json({
            message:"Subtopics fetched successfully",
            statusCode:200,
            success:true,
            subtopics
        })
    } catch (error) {
        
    }
}

// Get all subtopics for a specific topic

export const getSubtopicsByTopic = async(req, res)=>{
    try {
        const {topicId} = req.params;
        
        
        // check if topic exists
        const topic = await Topic.findById(topicId);
        
        if(!topic){
            return res.status(404).json({
                message:"Topic not found",
                success:false,
                statusCode:404
            })
        }

        const sutopics = await Subtopic.find({topicId})

        return res.status(200).json({
            message:"Sutopics fetched successfully",
            success:true,
            statusCode:200,
            sutopics
        });
    } catch (error) {
        
    }
}

// get a single subtopic by id
export const getSubtopicId = async(req, res)=>{
    try {
        const {id} = req.params;
        
        const subtopic = await Subtopic.findById(id).populate("topicId","name description");

        if(!subtopic){
            return res.status(404).json({
                message:"Subtopic not found",
                success:false,
                statusCode:404
            })
        }

        return res.status(200).json({
            message:"Subtopic fetched successfully",
            success:false,
            statusCode:200
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
            statusCode:500
        })       
    }
}


// Update a subtopic by Id
export const updateSubtopic = async (req, res) => {
    try {
        const {id} = req.params;
        const {name,description} = req.body;

        const updatedSubtopic = await Subtopic.findByIdAndUpdate(id,{name,description},{new:true});
        
        if(!updatedSubtopic){
            return res.status(404).json({
                message:"Subtopic not found",
                success:false,
                statusCode:404
            })
        }

        return res.status(200).json({
            message:"Subtopic updated successfully",
            success:true,
            statusCode:200,
            subtopic:updatedSubtopic
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
            statusCode:500
        })
    }
}


// delete the subtopic by id

export const deleteSubtopic = async (req,res)=>{
    try {
        const {id} = req.params;

        const deleteSubtopic = await Subtopic.findByIdAndDelete(id);

        if(!deleteSubtopic){
            return res.status(404).json({
                message:"Subtopic not found",
                success:false,
                statusCode:404
            })
        }

        return res.status(200).json({
            message:"Subtopic deleted successfully",
            statusCode:200,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            statusCode:500,
            success:false
        })       
    }
}