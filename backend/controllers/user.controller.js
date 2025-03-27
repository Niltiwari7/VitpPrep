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
      statusCode: 200,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      statusCode: 500,
      success: false
    });
  }
}

export const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: 'User profile fetched successfully',
      statusCode: 200,
      success: true,
      User: user
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const countUser = async (req, res) => {
  try {
    const user = await User.countDocuments();
    res.status(200).json({
      message: 'Total number of users',
      data: user
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// updating personal Information of the user

export const updatePersonalInfo = async (req, res) => {
  try {
    const userId = req.params.userId;

    const update = req.body;
    console.log(update);
    

    if (!userId) {
      return res.status(400).json({
        message: "You are not authenticated",
        statusCode: 400,
        success: false
      })
    }

    if (!update || Object.keys(update).length == 0) {
      return res.status(400).json({
        message: "No updates provided",
        statusCode: 400,
        success: false
      })
    }

    const updatedUser = await User.findByIdAndUpdate(userId, update, { new: true });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        statusCode: 404,
        success: false
      })
    }



    return res.status(200).json({
      message: "Personal Information updated successfully",
      statusCode: 200,
      User: updatedUser,
      success: true
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
      statusCode: 500,
      success: false
    })
  }
}

export const updateInformation = async (req, res) => {

  try {

    const userId = req.params.userId;

    const update = req.body;

    if (!update || Object.keys(update).length === 0) {
      return res.status(400).json({
        message: 'No updates Provided',
        statusCode: 400,
        success: false
      })
    }

    const user = await User.findByIdAndUpdate(userId, update, { new: true });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        statusCode: 404,
        success: false
      })
    }

    return res.status(200).json({
      message: 'User Information updated successfully',
      statusCode: 200,
      User: user
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      statusCode: 500,
      success: false,
      error: error.message
    })
  }
}


export const updateSocialLinks = async (req, res) => {
  try {
    const userId = req.params.userId;

    const { github, linkedin, twitter,website } = req.body;
  
    
    console.log(github, linkedin, twitter,website);
    
    if (!userId) {
      return res.status(400).json({
        message: "User is not authenticated",
        statusCode: 400,
        success: false
      })
    }

    if (!github && !linkedin && !twitter && !website) {
      return res.status(400).json({
        message: "No updates Provided",
        statusCode: 400,
        success: false
      })
    }


    const updatedUserSocial = await User.findByIdAndUpdate(userId, {
      socialLinks: { github, linkedin, twitter }
    }, { new: true })


    if (!updatedUserSocial) {
      return res.status(404).json({
        message: "User not found",
        statusCode: 404,
        success: false,
        User: updatedUserSocial
      })
    }

    return res.status(200).json({
      message: "Social Links updated successfully",
      statusCode: 200,
      success: true
    })

  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      statusCode: 500,
      success: false,
      error: error.message
    })
  }
}


export const updatePassword = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { newPassword, confirmPassword } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "User is not authenticated",
        statusCode: 400,
        success: false
      })
    }

    if (!newPassword || !confirmPassword) {
      return res.status(400).json(({
        message: "NewPassword and ConfirmPassword are required",
        statusCode: 400,
        success: false
      }))
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
        statusCode: 400,
        success: false
      })
    }

    // hash the password

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.findByIdAndUpdate(userId, {
      password: hashedPassword
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        statusCode: 404,
        success: false
      })
    }

    return res.status(200).json({
      message: "Password updated successfully",
      statusCode: 200,
      success: true
    })

  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      statusCode: 500,
      success: false,
    })
  }
}

export const updateTechSkills = async (req, res) => {
  try {
      const userId = req.params.userId;
      const { technicalSkills } = req.body;
      console.log(technicalSkills);
      

     
      if (!userId) {
          return res.status(400).json({ message: "User Id is required", statusCode: 400, success: false });
      }
    
      if (!technicalSkills || !Array.isArray(technicalSkills)) {
          return res.status(400).json({ message: "Valid technical skills array is required", statusCode: 400, success: false });
      }

   
      const updatedUser = await User.findByIdAndUpdate(userId, { technicalSkills: technicalSkills }, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ message: "User not found", statusCode: 404, success: false });
      }
      

      return res.status(200).json({
          message: "Technical skills updated successfully",
          statusCode: 200,
          success: true,
          User : updatedUser
      });
  } catch (error) {
      return res.status(500).json({
          message: error.message || "Internal server error",
          statusCode: 500,
          success: false
      });
  }
};


export const favQuestion = async(req,res)=>{
  try {
    const userId = req.params.userId;
    const question = await User.findById(userId).populate('favorites.questions');
    if(!question){
      return res.status(404).json({
        message:"No favorite question found",
        success:false,
        statusCode:404
      })
    }

    return res.status(200).json({
      message:"favorite question fetched successfully",
      success:true,
      statusCode:200,
      question:question
    })

  }
  catch(error){
    return res.status(500).json({
      message:'Internal Server Error',
      statusCode:500,
      success:false,
    })
  }
}