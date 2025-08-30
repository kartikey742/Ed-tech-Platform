const Section = require('../models/Section')
const Course = require("../models/Course")
const SubSection = require("../models/SubSection")
const createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'fill all fields'
            })
        }
        //create section
        const newSection = await Section.create({
            sectionName
        })
        //update course with section ObjectId
        const updatedCourse = await Course.findByIdAndUpdate(courseId,
            {
                $push: {
                    courseContent: newSection._id
                }
            },
            { new: true }
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
            .exec()

        if (!updatedCourse) {   
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'section created successfully',
            data:updatedCourse
        })

    } catch (err) {
        return res.status(200).json({
            success: false,
            message: err.message
        })
    }
}
const updateSection = async (req, res) => {
    try {
        const { sectionName, sectionId,courseId} = req.body
        if (!sectionName || !sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'fill all fields'
            })
        }
        const section = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true })
        const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()
        return res.status(200).json({
            success: true,
            message: 'section updated successfuly',
            data:course
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'error in updating section'
        })
    }
}
const deleteSection = async (req, res) => {
  try {
   

    const { sectionId, courseId } =     req.body
    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        courseContent: sectionId,
      },
    })
    const section = await Section.findById(sectionId)

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      })
    }
    // Delete the associated subsections
    await SubSection.deleteMany({ _id: { $in: section.subSection } })

    await Section.findByIdAndDelete(sectionId)

    // find the updated course and return it
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.status(200).json({
      success: true,
      message: "Section deleted",
      data: course,
    })
  } catch (error) {
    console.error("Error deleting section:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
module.exports = { createSection, updateSection, deleteSection }