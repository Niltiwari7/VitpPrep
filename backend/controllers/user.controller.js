import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'
export const registerUser = async(req,res)=>{
    try {
        const {fullName,email,password} = req.body;
        if(!fullName || !email || !password){
            return res.status(400).json({message:'All fields are required'});
        }
        
        const hashedPassword = await bcrypt.hash(password,10);
        
        const findUser = await User.findOne({email});
        if(findUser){
            return res.status(400).json({message:'User already exists'});
        }

        const newUser = await User.create({
            fullName,
            email,
            password:hashedPassword
        })
        
        const token = jwt.sign({email:newUser.email,id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.cookie('token',token,{httpOnly:true});
        res.status(200).json({message:'User created successfully'});            
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


export const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:'All fields are required'});
        }

        const findUser = await User.findOne({email});
        if(!findUser){
            return res.status(404).json({message:'Credentials are not valid'});
        }

        const isPasswordCorrect = await bcrypt.compare(password,findUser.password);

        if(!isPasswordCorrect){
            return res.status(404).json({message:'Credentials are not valid'});
        }

        const token = jwt.sign({email:findUser.email,id:findUser._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.cookie('token',token,{ httpOnly:true });

        res.status(200).json({message:'User logged in successfully'});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const logoutUser = async(req,res)=>{
    try {
        res.clearCookie('token');
       return res.status(200).json({message:'User LogOut successfully'});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const getProfile = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}