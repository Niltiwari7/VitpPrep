import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if all fields are provided
    if (!fullName || !email || !password) {
      return res.status(400).json({
        status: 'error',  // Indicate error status
        message: 'All fields are required'
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user already exists
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: 'User already exists'
      });
    }

    // Create the new user
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword
    });

    // Create a JWT token
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set the token in an HTTP-only cookie
    res.cookie('token', token, { httpOnly: true });

    // Respond with status, message, user data, and token
    res.status(200).json({
      status: 'success',  // Indicate success status
      message: 'User created successfully',
      user: newUser,
      token: token
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',  // Indicate error status
      message: error.message
    });
  }
};



export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: 'All fields are required'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'Credentials are not valid'
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'Credentials are not valid'
      });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true });


    res.status(200).json({
      message: 'User logged in successfully',
      statusCode: 200,
      token,
      user,
      success: true
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: error.message
    });
  }
}

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({
      message: 'User LogOut successfully',
      statusCode:200,
      success:true
    });
  } catch (error) {
    return res.status(500).json({ 
      message: error.message,
      statusCode:500,
      success:false
     });
  }
}

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { fullName, email, password } = req.body;
    if (fullName) {
      user.fullName = fullName;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// get all User Count 
export const countUser = async (req, res) => {
  try {
    // Get the total number of users directly
    const userCount = await User.countDocuments();

    return res.status(200).json({
      message: "User count fetched successfully",
      statusCode: 200,
      success: true,
      count: userCount
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      success: false,
      error: error.message
    });
  }
};
