  const Profile=require('../models/Profile')
  const User=require('../models/User')
  const CourseProgress =require('../models/CourseProgress')
  const  {convertSecondsToDuration} =require('../utils/secToDuration')
  const uploadImageToCloudinary=require('../utils/uploadImage')
  const Course=require('../models/Course')
  const updateProfile=async(req,res)=>{
      try{
          const {firstName="",lastName="",dateOfBirth="",about="",contactNumber,gender}=req.body
          const id=req.user.id
          if(!contactNumber || !gender || !about){
              return res.status(500).json({
              success: false,
              message: "fill all fields",
          });
          }
          const userDetails=await User.findByIdAndUpdate(id,{firstName,lastName},{new:true})

          const profileDetails=await Profile.findById(userDetails.additionalDetails)
          console.log(profileDetails);
          
        const updatedUserDetails= await Profile.findByIdAndUpdate(profileDetails._id,
              {gender,dateOfBirth,about,contactNumber},{new:true}
          )
          userDetails.additionalDetails=updatedUserDetails
          return res.status(200).json({
              success:true,
              message:'profile data updated',
          updatedUserDetails:userDetails
          })
      }catch(err){
          return res.status(500).json({
              success:false, 
              message:'err',
          
          })
      }
  }
  const deleteAccount=async(req,res)=>{
      const id=req.user.id
      const userDetails=await User.findById(id)
      const profileDetails=await Profile.findById(userDetails.additionalDetails)
      await Profile.findByIdAndDelete(profileDetails._id)
      await User.findByIdAndDelete(id)
      return res.status(200).json({
          success:true,
          mesaage:'account deleted'
      })

  }
  const getAllUserDetails=async(req,res)=>{
      const id =req.user.id
      const userDetails=await User.findById(id).populate('additionalDetails').exec()
        return res.status(200).json({
          success:true,
          mesaage:'accounts fetched',
          userDetails
      })


  }
  const updateDisplayPicture = async (req, res) => {
    try {
      console.log(req);
      
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      ).populate('additionalDetails')
      res.send({
        success: true,
        message: `Image Updated successfully`,
        updatedUserDetails: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  const getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path: "courses",
          populate: {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
        })
        .exec()
      userDetails = userDetails.toObject()
      var SubsectionLength = 0
      for (var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
          totalDurationInSeconds += userDetails.courses[i].courseContent[
            j
          ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
          userDetails.courses[i].totalDuration = convertSecondsToDuration(
            totalDurationInSeconds
          )
          SubsectionLength +=
            userDetails.courses[i].courseContent[j].subSection.length
        }
        let courseProgressCount = await CourseProgress.findOne({
          courseID: userDetails.courses[i]._id,
          userId: userId,
        })
        courseProgressCount = courseProgressCount?.completedVideos.length
        if (SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2)
          userDetails.courses[i].progressPercentage =
            Math.round(
              (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier
        }
      }

      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  const instructorDashboard = async (req, res) => { 
    try {
      const courseDetails = await Course.find({ instructor: req.user.id })

      const courseData = courseDetails.map((course) => {
        const totalStudentsEnrolled = course.studentsEnrolled.length
        const totalAmountGenerated = totalStudentsEnrolled * course.price

        // Create a new object with the additional fields
        const courseDataWithStats = {
          _id: course._id,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          // Include other course properties as needed
          totalStudentsEnrolled,
          totalAmountGenerated,
        }

        return courseDataWithStats
      })

      res.status(200).json({ courses: courseData })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server Error",error:error })
    }
  }
  module.exports={updateProfile,deleteAccount,getAllUserDetails,updateDisplayPicture,getEnrolledCourses,instructorDashboard}