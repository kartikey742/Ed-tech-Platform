const mongoose=require('mongoose');
const { type } = require('os');
const { ref } = require('process');
const sectionSchema=new mongoose.Schema({
    sectionName:{
        type:String,
    },
    subSection:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SubSection'
    }],
})
module.exports=mongoose.model('Section',sectionSchema);