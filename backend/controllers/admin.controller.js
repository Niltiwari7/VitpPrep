
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { uploadOnCloudinary } from "../config/cloudinary.config.js";
export const RegisterAdmin = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;

        // Validate required fields
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required',
                statusCode: 400,
                success: false,
            });
        }

        // Check if the user already exists
        const findUser = await User.findOne({ email });
        // I will allow only one admin creatation
        const countAdmin = await User.countDocuments({ role: 'admin' })
        if (findUser && findUser.role === 'admin' && countAdmin > 1) {
            return res.status(400).json({
                message: ' Admin  already exists. You are not allow to create another admin',
                statusCode: 400,
                success: false,
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new admin user
        const newAdmin = new User({
            fullName,
            email,
            password: hashedPassword,
            role: role
        });

        const token = jwt.sign({ email: newAdmin.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        if (!token) {
            return res.status(500).json({
                message: 'Token not generated',
                statusCode: 500,
                success: false
            })
        }
        res.cookie('token', token, { httpOnly: true });

        // Save the new admin to the database
        await newAdmin.save();

        return res.status(201).json({
            message: 'Admin registered successfully',
            statusCode: 201,
            success: true,
            user: {
                id: newAdmin._id,
                fullName: newAdmin.fullName,
                email: newAdmin.email,
                role: newAdmin.role,
            },
            token: token,
        });
    } catch (error) {
        // Handle server error
        return res.status(500).json({
            message: error.message,
            statusCode: 500,
            success: false,
        });
    }
};




export const logInAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required',
                statusCode: 400,
                success: false,
            });
        }

        // Find the user in the database
        const admin = await User.findOne({ email });

        // Check if admin exists and has the role of admin
        if (!admin || admin.role !== 'admin') {
            return res.status(404).json({
                message: 'Admin not found',
                statusCode: 404,
                success: false,
            });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid credentials',
                statusCode: 401,
                success: false,
            });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: admin._id, email: admin.email, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Token valid for 1 day
        );

        if (!token) {
            return res.status(500).json({
                message: 'Token generation failed',
                statusCode: 500,
                success: false,
            });
        }

        // Set the token as an HTTP-only cookie
        res.cookie('token', token, { httpOnly: true });

        // Send success response
        return res.status(200).json({
            message: 'Admin logged in successfully',
            statusCode: 200,
            success: true,
            admin: {
                id: admin._id,
                fullName: admin.fullName,
                email: admin.email,
            },
            token, // Optional: Send token in response for frontend use
        });
    } catch (error) {
        // Handle server errors
        return res.status(500).json({
            message: error.message,
            statusCode: 500,
            success: false,
        });
    }
};


export const getAdminInfo = async (req, res) => {
    try {
        const adminId = req.params.adminId;
        // Extract the adminId from req.params
        const admin = await User.findById(adminId);
        if (!admin) {
            return res.status(404).json({
                message: 'Admin not found',
                statusCode: 404,
                success: false
            });
        }
        return res.status(200).json({
            message: 'Admin info fetched successfully',
            statusCode: 200,
            success: true,
            admin: admin
        });
    } catch (error) {
        return res.status(500).json({
            message: 'An error occurred while fetching admin info',
            statusCode: 500,
            success: false,
            error: error.message
        });
    }
};


export const uploadImage = async (req, res) => {
    try {
        const localFilePath = req.file.path; // Path to the uploaded image on the local server
       
        
        const userId = req.params.adminId; // Extract the adminId from req.params
        
        if (!localFilePath) {
            return res.status(400).json({
                message: 'Image file is missing. Please try again.',
                statusCode: 400,
                success: false,
            });
        }

        // Upload the image to Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
        console.log(cloudinaryResponse);
        
        if (!cloudinaryResponse) {
            return res.status(500).json({
                message: 'Failed to upload image to Cloudinary.',
                statusCode: 500,
                success: false,
            });
        }
        console.log(cloudinaryResponse);

        // Extract the URL from the Cloudinary response
        const imageUrl = cloudinaryResponse.url;

        // Update the user with the Cloudinary URL
        const user = await User.findByIdAndUpdate(
            userId,
            { imageUrl }, // Add imageUrl to the user's document
            { new: true } // Return the updated document
        );

        if (!user) {
            return res.status(404).json({
                message: 'User not found.',
                statusCode: 404,
                success: false,
            });
        }

        return res.status(200).json({
            message: 'Image uploaded and user updated successfully.',
            statusCode: 200,
            success: true,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            statusCode: 500,
            success: false,
        });
    }
};

const editAdmin = async (req,res)=>{
    try{
       
    }catch(error){
        return res.status(500).json({message:error.message,statusCode:500,success:false});
    }
}