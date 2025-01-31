import mongoose from 'mongoose';
import Topic from '../models/topic.model.js';

// create a topic
export const createTopic = async (req, res) => {
    try {
        const { name, description } = req.body;

        const existingTopic = await Topic.findOne({ name });
        if (existingTopic) {
            return res.status(400).json({ message: 'Topic already exists' });
        }

        const newTopic = new Topic({ name, description });
        await newTopic.save();

        res.status(201).json({
            message: "Topic created successfully",
            topic: newTopic,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
};

// getSingleTopic
export const getSingleTopic = async (req, res) => {
    try {
        const { id } = req.params;
        // Validate the ID parameter
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid topic ID',
                success: false,
                statusCode: 400
            });
        }

        const topic = await Topic.findById(id).populate('subtopics');

        if (!topic) {
            return res.status(404).json({
                message: 'Topic not found',
                success: false,
                statusCode: 404
            });
        }

        res.status(200).json({
            message: "Topic Found successfully",
            success: true,
            statusCode: 200,
            topic: topic
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error",
            success: false,
            statusCode: 500
        });
    }
};


// Get all topics
export const getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.find();
        if (!topics) {
            return res.status(404).json({
                message: "Topics not found",
                success: false,
                statusCode: 404
            })
        }
        return res.status(200).json({
            message: "Topics fetched successfully",
            success: true,
            statusCode: 200,
            topics: topics
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            statusCode: 500
        })
    }
}


//4.  Update a topics by Id
export const updateTopic = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const updateTopic = await Topic.findByIdAndUpdate(id, { name, description }, { new: true })

        if (!updateTopic) {
            return res.status(404).json({
                message: "Topic not found",
                success: false,
                statusCode: 404
            })
        }

        return res.status(200).json({
            message: "Topic updated successfully",
            success: true,
            statusCode: 200,
            topic: updateTopic
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            statusCode: 500
        })
    }
}


//5. Delete a topic by Id
export const deleteTopic = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTopic = await Topic.findByIdAndDelete(id);

        if (!deleteTopic) {
            return res.status(404).json({
                message: "Topic not found",
                success: false,
                statusCode: 404
            });
        }

        return res.status(200).json({
            message: "Topic deleted successfully",
            success: true,
            statusCode: 200
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            statusCode: 500
        });
    }
};

