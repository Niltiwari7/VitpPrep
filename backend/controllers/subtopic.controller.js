import Subtopic from "../models/subtopic.model.js";
import Topic from "../models/topic.model.js";

export const createSubtopic = async (req, res) => {
    try {
        const { name, description, topicId } = req.body;

        // Validate required fields
        if (!name || !topicId) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name and Topic ID are required.' 
            });
        }

        // Ensure the referenced topic exists
        const topicExists = await Topic.findById(topicId);
        if (!topicExists) {
            return res.status(404).json({ 
                success: false, 
                message: 'Referenced topic does not exist.' 
            });
        }

        // Create new subtopic
        const newSubtopic = new Subtopic({
            name,
            description,
            topicId,
        });

        // Save to the database
        const savedSubtopic = await newSubtopic.save();

        // Optionally, add subtopic ID to the referenced topic (if desired)
        topicExists.subtopics = topicExists.subtopics || [];
        topicExists.subtopics.push(savedSubtopic._id);
        await topicExists.save();

        // Respond with success
        res.status(201).json({ 
            success: true, 
            message: 'Subtopic created successfully.', 
            data: savedSubtopic 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to create subtopic.', 
            error: error.message 
        });
    }
};
