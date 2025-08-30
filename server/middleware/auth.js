const jwt=require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');
const auth=async (req, res, next) => {
    try{
       
        
        const token=req.cookies.token || req.header("Authorization").replace('Bearer ', '');
        if(!token){
            return res.status(401).json({
                success: false,
                message: 'token is missing'
            });
        }
       
        try{
           
            const payload=jwt.verify(token, process.env.JWT_SECRET);
          
            req.user=payload
           
            
        }
        catch(error){
            console.log(error);
            
            return res.status(401).json({
                success: false,
                message: 'Invalid token',
                error:error
            });
        }
        next()
    }
    catch{
        return res.status(500).json({   
            success: false,
            message: 'smth went wrong in auth middleware'
        });
    }
}
const isStudent = async (req, res, next) => {
    try{
        if(req.user.accountType!=='Student'){
            return res.status(403).json({
                success: false,
                message: 'Access denied, you are not a student'
            });
        }
        next()
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: 'smth went wrong in isStudent middleware'
        });
    }
}
const isInstructor = async (req, res, next) => {
    try{
        if(req.user.accountType!=='Instructor'){
            return res.status(403).json({
                success: false,
                message: 'Access denied, you are not an instructor'
            });
        }
        next()
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: 'smth went wrong in isInstructor middleware'
        });
    }
}   
const isAdmin = async (req, res, next) => {
   
    
    try{
        if(req.user.accountType!=='Admin'){
            return res.status(403).json({
                success: false,
                message: 'Access denied, you are not an admin'
            });
        }
        next()
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: 'smth went wrong in isAdmin middleware'
        });
    }
}
module.exports={auth,isStudent,isInstructor,isAdmin}