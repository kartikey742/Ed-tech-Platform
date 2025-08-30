const mongoose = require('mongoose');
const { type } = require('os');
const { ref } = require('process');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    accountType: {
        type: String,
        required: true,
        enum: ['Student', 'Instructor','Admin'],
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Profile'
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
    image: {
        type: String,
        required: true
    },
    courseProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseProgress'

    }],
     token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    }
})
module.exports = mongoose.model('User', userSchema);