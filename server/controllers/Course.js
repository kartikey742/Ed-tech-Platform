const Course=require('../models/Course');
const Category=require('../models/Category');
const User=require('../models/User');  
const Section=require('../models/Section')
const SubSection =require('../models/SubSection')
const CourseProgress =require ('../models/CourseProgress');
const RatingAndReviews=require('../models/RatingAndReview')
const mongoose=require('mongoose')
const  uploadImageToCloudinary  = require('../utils/uploadImage');
const {convertSecondsToDuration} =require('../utils/secToDuration')
const   createCourse=async(req,res)=>{
try{
  
  const {courseName,courseDescription,whatYouWillLearn,price,category,instructions,tag}=req.body
 const TAGS=JSON.parse(tag)
 const INST=JSON.parse(instructions)

  const thumbNail=req.files.thumbnailImage
  if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbNail ||  !instructions || !tag){
    return res.status(400).json({
      success:false,
      message:'All fields are required'
    })
  }
  console.log('main',typeof(price),instructions);
  
  const userId =new mongoose.Types.ObjectId(req.user.id);
  const category2 =new mongoose.Types.ObjectId(category);
 
  
  const instructorDetails=await User.findOne(userId)// we should use one because if we use only one then it will return an array and the if statement will always be true
  
        if(!instructorDetails){
            return res.status(404).json({ 
                success:false,
                message:'instructor doesnt exists'
            })
        }
    
        
        const categoryDetails=await Category.findById(category)
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:'category details not found'
            })
        }
        const thumbNailimage= await uploadImageToCloudinary(thumbNail,process.env.FOLDER_NAME)
        const newCourse=await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            category:category2,
            thumbNail:thumbNailimage.secure_url,
            instructions:INST,
            tag:TAGS
        })
       
     
        
        //update the courses array in User model
        r=await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id
                }
            },
            {new:true},
        )
  
        

         const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    )


      res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    })

}
catch(err){
    return res.status(500).json({ success: false,
      message: "Failed to create course",
      error: err.message})
}
}
const showAllCourses=async(req,res)=>{
    try{
        const allCourses=await Course.find({},{
            courseName:true,
            price:true,
            thumbNail:true,
            instructor:true,
            ratingsAndReviews:true,
            studentsEnrolled:true,


        }).populate('instructor').exec()
        return res.status(200).json({
            success:true,
            message:'data for all courses fetched',
            data:allCourses
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:true,
            message:'cannot fetch data for all courses',

        })
        
    }
}
const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }
    console.log(courseDetails);
    
    return res.status(200).json({
      success:true,
      message:'details fetched',
      courseDetails
    })
  }
    catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
const editCourse = async (req, res) => {
  try {
 
    
    const { courseId } = req.body
    const updates ={...req.body}
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
     
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbNail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
const getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }
    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
const getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({ instructor: instructorId })
  .sort({ createdAt: -1 })
  .populate({
    path: "courseContent",      // First populate courseContent
    populate: {
      path: "subSection",       // Then populate subSection inside courseContent
    }
  });

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}

const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message:"Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }
      await CourseProgress.findByIdAndDelete(courseId)
      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }
    //deleting course progress and deleting course progress from users
        const progressDocs = await CourseProgress.find({ courseID: courseId });
    const progressIds = progressDocs.map((doc) => doc._id);

    if (progressIds.length > 0) {
      // 2. Remove these progress IDs from all users
      await User.updateMany(
        { courseProgress: { $in: progressIds } },
        { $pull: { courseProgress: { $in: progressIds } } }
      );

      // 3. Delete the actual progress documents
      await CourseProgress.deleteMany({ _id: { $in: progressIds } });
    }
    //delete ratings and review
    const ratings=course.ratingAndReviews
    console.log(ratings);
    
    for(let rating of ratings){
      await RatingAndReviews.findByIdAndDelete(rating)
    }
    // Delete the course
    await Course.findByIdAndDelete(courseId)
     
    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}
module.exports={createCourse,showAllCourses,getCourseDetails,getFullCourseDetails,editCourse,getInstructorCourses,deleteCourse}