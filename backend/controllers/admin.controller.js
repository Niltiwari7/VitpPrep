
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
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
        const countAdmin = await User.countDocuments({role:'admin'})
        if (findUser && findUser.role === 'admin' && countAdmin>1) {
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
        
        const token = jwt.sign({email:newAdmin.email},process.env.JWT_SECRET,{expiresIn:'1d'});
        if(!token){
            return res.status(500).json({message:'Token not generated',
                statusCode:500,
                success:false
            })
        }
        res.cookie('token',token,{httpOnly:true});

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
            token:token,
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


