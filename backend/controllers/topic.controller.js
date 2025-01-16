import mongoose from 'mongoose';
import Topic from '../models/topic.model.js';

export const getSingleTopic = async (req, res) => {
    try {
        const { id } = req.params; 
        // Validate the ID parameter
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid topic ID' });
        }

        const topic = await Topic.findById(id);

        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.find();

        if (!topics || topics.length === 0) {
            return res.status(404).json({ message: 'No topics found' });
        }

        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const createTopic = async (req, res) => {
    try {
        const { name, description, subtopics } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const newTopic = new Topic({
            name,
            description,
            subtopics
        });

        const savedTopic = await newTopic.save();

        res.status(201).json({ message: 'Topic created successfully', topic: savedTopic });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
