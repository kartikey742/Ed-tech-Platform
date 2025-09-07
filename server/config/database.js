const mongoose=require('mongoose');
require('dotenv').config()
const dbconnect=async()=>{
    try{
        await mongoose.connect(process.env.LOCAL_MONGO_URL)
        console.log("Database connected successfully");
    }catch(err){
        console.error("Database connection failed", err);
    }
}
module.exports=dbconnect;