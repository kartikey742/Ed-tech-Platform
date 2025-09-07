const OTP = require('../models/OTP');
const User = require('../models/User');
const Profile = require('../models/Profile');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpTemplate = require('../mail/templates/emailVerificationTemplate')
const mailSender = require('../utils/mailSender')
const {passwordUpdate}=require('../mail/templates/passwordUpdate')
require('dotenv').config(); 
//send otp
const sendOtp = async (req, res) => {//otp is sent to check email id is valid or not
  try {
    const { email } = req.body;

    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // 2. Generate a unique OTP
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });

    let existingOtp = await OTP.findOne({ otp });
    while(existingOtp){
      otp = otpGenerator.generate(6,{
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
        digits: true,
      });
      existingOtp = await OTP.findOne({ otp });
    }

    // 3. Save OTP to DB
    await OTP.create({ email, otp });

    // 4. Send the OTP Email
    const emailBody = otpTemplate(otp);
    await mailSender(email, "Verify your StudyNotion account", emailBody);

    // 5. Respond to client
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully to email",
    });
  } catch (error) {
    console.error("Error in sendOtp:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};





//signup

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp } = req.body;
    if (!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all the fields'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Password and confirmPassword do not match'
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }
    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: 'OTP not found'
      });
    }
    else if (recentOtp[0].otp !== otp.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
    });
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user
    });
  }
  catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({
      success: false,
      message: 'error during signup',
    });
  }
}

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all the fields'
      });
    }
  
    const user = await User.findOne({ email }).populate("additionalDetails");
    console.log(user);
    
    if (!user) {  //find method will always return an array so if statement will always be true so we should use   
      return res.status(400).json({ //findOne to check the uniqueness of email
        success: false,
        message: 'User not found'
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid password'
      });
    }
    const payload = {
      email: user.email,
      accountType: user.accountType,
      id: user._id
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
    user.token = token;
    user.password = undefined; // Remove password from response
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true
    };
    res.status(200).cookie('token', token, options).json({
      success: true,
      message: 'User logged in successfully',
      user,
      token
    });

  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({
      success: false,
      message: 'Error during login',
    });


  }
}

const changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id)

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    )
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" })
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10)
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    )

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdate(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      )
      console.log("Email sent successfully:", emailResponse.response)
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      })
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" })
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    })
  }
}
module.exports = {
  sendOtp,
  signUp,
  login,
  changePassword
};
//change password