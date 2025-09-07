const mailSender = require('../utils/mailSender');
const bcrypt=require('bcrypt')
const resetPasswordToken=async(req, res) => {
try{ const email = req.body.email;
    const user= await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    const token = crypto.randomUUID()
    const updatedDetails=await User.findOneAndUpdate(
      { email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5*60*1000 
      },
      { new: true }
    );
    const url=`http://localhost:3000/update-password/${token}`;
    await mailSender(email, 'Reset Password', `Click on this link to reset your password: ${url}`);
    return res.status(200).json({
      success: true,
      message: 'Reset password link sent to your email',
      user: updatedDetails
    });}catch (error) {
      console.error('Error during reset password:', error);
      return res.status(500).json({
        success: false,
        message: 'Error during reset password',
      });
    }
  }
  
  const resetPassword = async (req, res) => {
    console.log('request received');
    try {
      const { password, confirmPassword, token } = req.body
      
      if (confirmPassword !== password) {
        return res.json({
        success: false,
        message: "Password and Confirm Password Does not Match",
      })
    }
    const userDetails = await User.findOne({ token: token })
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid",
      })
    }
    if ((userDetails.resetPasswordExpires < Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      })
    }
    const encryptedPassword = await bcrypt.hash(password, 10)
    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    )
    res.json({
      success: true,
      message: `Password Reset Successful`,
    })
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Updating the Password`,
    })
  }
}
module.exports={resetPasswordToken,resetPassword}