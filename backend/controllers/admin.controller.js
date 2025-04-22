
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
        const admin = await User.findOne({ email }).select('password role fullName email');

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
            token, 
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
// UPDATE PERSONAL INFORMATION

export const updatePersonalInfo = async (req, res) => {
    try {
        const adminId = req.params.adminId;
        const updates = req.body;

        // Validate adminId
        if (!adminId) {
            return res.status(400).json({ message: "You are not authenticated", statusCode: 400, success: false });
        }

        // Validate updates
        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "No updates provided", statusCode: 400, success: false });
        }

        // Update personal information
        const updateAdmin = await User.findByIdAndUpdate(adminId, updates, { new: true });

        if (!updateAdmin) {
            return res.status(404).json({ message: "Admin not found", statusCode: 404, success: false });
        }

        return res.status(200).json({ message: "Personal information updated successfully", statusCode: 200, success: true, admin: updateAdmin });
    } catch (error) {
        console.error(error); // Log the error
        return res.status(500).json({ message: "Internal server error", statusCode: 500, success: false });
    }
};


// Update User Controller
export const updateInformation = async (req, res) => {
    try {
        const userId = req.params.adminId; // Assuming user ID is provided in the request URL
        const updates = req.body; // Assuming updates are passed in the request body

        // Validate that the request body is not empty
        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({ 
                message: 'No updates provided.',
                statusCode:400,
                success:false   
            });
        }
        // checking userId is valid or not
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found.", statusCode: 404, success: false });
        }

        // Find the user and apply updates
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updates }, // Use $set to dynamically update only the fields provided
            { new: true, runValidators: true } // Return the updated document and validate schema
        );

        // If user not found
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Respond with the updated user
        res.status(200).json({ message: 'User updated successfully.', updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user.', error: error.message ,
            success:false
        });
    }
};


// Update Social links Controller

export const updateSocialLinks = async (req, res) => {
    try {
        const adminId = req.params.adminId;
        const { github, linkedin, twitter, website } = req.body;
  

        // Validate adminId
        if (!adminId) {
            return res.status(400).json({ message: "Admin Id is required", statusCode: 400, success: false });
        }

        // validate social links
        if (!github && !linkedin && !twitter && !website) {
            return res.status(400).json({ message: "No social links provided", statusCode: 400, success: false });
        }

        // Upadate social links
        const updateAdmin = await User.findByIdAndUpdate(adminId, { socialLinks: { github, linkedin, twitter, website } }, { new: true });

        // If admin not found
        if (!updateAdmin) {
            return res.status(404).json({ message: "Admin not found", statusCode: 404, success: false });
        }

        return res.status(200).json({
            message: "Social links updated successfully", statusCode: 200,
            success: true, admin: updateAdmin
        });
    } catch (error) {
       return  res.status(500).json({ message: "Internal server error" || error.message, statusCode: 500, success: false });
    }
}

// Update password controller

export const updatePassword = async (req, res) => {
    try {
        const adminId = req.params.adminId;
        const { newPassword, confirmPassword } = req.body;

        // Validate adminId
        if (!adminId) {
            return res.status(400).json({
                message: "Admin ID is required",
                statusCode: 400,
                success: false,
            });
        }

        // Validate input fields
        if (!newPassword || !confirmPassword) {
            return res.status(400).json({
                message: "New Password and Confirm Password are required",
                statusCode: 400,
                success: false,
            });
        }

        // Check if newPassword and confirmPassword match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
                statusCode: 400,
                success: false,
            });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password
        const updatedAdmin = await User.findByIdAndUpdate(
            adminId,
            { password: hashedPassword },
            { new: true } // Return the updated document
        );

        // If admin not found
        if (!updatedAdmin) {
            return res.status(404).json({
                message: "Admin not found",
                statusCode: 404,
                success: false,
            });
        }

        return res.status(200).json({
            message: "Password updated successfully",
            statusCode: 200,
            success: true,
        });
    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).json({
            message: "Internal server error",
            statusCode: 500,
            success: false,
        });
    }
};


// Tech skills controller

export const updateTechSkills = async (req, res) => {
    try {
        const adminId = req.params.adminId;
        const { technicalSkills } = req.body;
        // Validate adminId
        if (!adminId) {
            return res.status(400).json({ message: "Admin Id is required", statusCode: 400, success: false });
        }
        // Validate tech skills
        if (!technicalSkills) {
            return res.status(400).json({ message: "No technical skills provided", statusCode: 400, success: false });
        }

        // Update tech skills
        const updateAdmin = await User.findByIdAndUpdate(adminId, { skills: technicalSkills }, { new: true });

        // If admin not found
        if (!updateAdmin) {
            return res.status(404).json({ message: "Admin not found", statusCode: 404, success: false });
        }

        return res.status(200).json({
            message: "Technical skills updated successfully",
            statusCode: 200,
            success: true,
            admin: updateAdmin
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error" || error.message,
            statusCode: 500,
            success: false
        })
    }
}

// LogOut Controller

export const logout = async (req, res) => {
    try {
        res.clearCookie('token',{
            httpOnly:true,
        });
        return res.status(200).json({
            message: "Admin logged out successfully",
            statusCode: 200,
            success: true
        }
    )
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error" || error.message,
            statusCode: 500,
            success: false
        })
    }
}