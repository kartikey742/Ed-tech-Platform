const mongoose=require('mongoose');
const { type } = require('os');
const { ref } = require('process');
const courseSchema=new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    trim: true
  },
  courseDescription: {
    type: String,
    required: true,
    trim: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
  },
  whatYouWillLearn: {
    type: String,
    required: true,
    trim: true
  },
  courseContent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section'
  }],
  ratingAndReviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RatingAndReviews'
  }],
  price:{
    type: Number,
    required: true  

  },
  thumbNail: {
    type: String,
  },
  tag:{
    type:[String],
    required:true,
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category'
  },
  studentsEnrolled: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    'required': true
  }],
  instructions:{
    type:[String]

  },
  status:{
    type:String,
    enum:['Draft','Published']
  },
  createdAt: { type: Date, default: Date.now }

})
module.exports=mongoose.model('Course',courseSchema);