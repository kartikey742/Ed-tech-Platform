const mongoose=require('mongoose');
const { type } = require('os');
const { ref } = require('process');
const mailSender = require('../utils/mailSender');
const otp=new mongoose.Schema({
  email:{ 
    type:String,
    required:true,
    unique:true
  },
  otp:{
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now,
    expires:'5m' // OTP will expire after 5 minutes
  }
})
module.exports = mongoose.model("OTP", otp);
async function sendVerificationEmail(email, otp) {
  const mailResponse = await mailSender(email, 'OTP Verification',otp)
}
otp.pre('save', async function(next) {
  if (this.isNew) {
    await sendVerificationEmail(emails, otp);
  }
  next();
})

module.exports=mongoose.model('OTP',otp);