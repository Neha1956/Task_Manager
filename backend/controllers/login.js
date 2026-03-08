const user=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"all fields are required"
            })
        }
        const existingUser=await user.findOne({email});
        if(!existingUser){
            return res.status(400).json({
                message:"user not registered"
            })
        }
     
    const isPasswordMatch=await bcrypt.compare(password,existingUser.password);
    if(!isPasswordMatch){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }
    const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRET,{expiresIn:"1d"});
     res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            maxAge:30*24*60*60*1000,
        })
    res.status(200).json({
        message:"login successful",
        token:token,
        user:existingUser,
    })
        
       
    } catch(err){
            res.status(500).json({
                message:"server error"
            })
        }
}

module.exports=login;