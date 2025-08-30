const SubSection = require('../models/SubSection')
const Section = require('../models/Section')
const uploadImageToCloudinary=require('../utils/uploadImage')
const createSubSection = async (req, res) => {
   try {
       
       const { sectionId, title, description } = req.body
       const video = req.files.video
    //    console.log(sectionId,title,description,video);
      if (!sectionId || !title || !description || !video) {
         return res.status(500).json({
            success: false,
            message: 'all fields are required'
         })
      }
const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME)

const SubSectionDetails = await SubSection.create({
    title: title,
    timeDuration: uploadDetails.duration,
    description: description,
    videoUrl: uploadDetails.secure_url,
})

    const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},
      {
         $push:{
           subSection:SubSectionDetails._id
         },
      },
      {new:true}//in order to return updated details
    ).populate('subSection')
     return res.status(200).json({
                success:true,
                message:'section updated successfuly',
                data:updatedSection
            })

   }
   catch(err){
      return res.status(500).json({
            success: false,
            message: 'error in createSubsection'
         })
   }
}

const updateSubSection = async (req, res) => {
    try {
        const { sectionId,subSectionId, title, description } = req.body;
        const video = req.files?.video;

        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: "subSectionId is required",
            });
        }

        const updatedData = {};
        if (title) updatedData.title = title;
        if (description) updatedData.description = description;
        
        // If new video is uploaded
        if (video) {
            const uploadDetails = await uploadImageToCloudinary (video, process.env.FOLDER_NAME);
            updatedData.videoUrl = uploadDetails.secure_url;
             updatedData.timeDuration= uploadDetails.duration
        }

        const updatedSubSection = await SubSection.findByIdAndUpdate(
            subSectionId,
            updatedData,
            { new: true }
        );
  const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )
        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            data: updatedSection,
        });

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: "Error while updating subsection",
        });
    }
};

const deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body;

        if (!subSectionId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "subSectionId and sectionId are required",
            });
        }

        // Delete the subsection
        await SubSection.findByIdAndDelete(subSectionId);

        // Remove reference from section
       const updatedSection= await Section.findByIdAndUpdate(sectionId, {
            $pull: { subSection: subSectionId },
        },
    { new: true });

        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully",
            data:updatedSection
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while deleting subsection",
        });
    }
};
module.exports={createSubSection,updateSubSection,deleteSubSection}