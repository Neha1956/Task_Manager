const user=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const register=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message:"all fields are required"
            })
        }
        const existingUser=await user.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"user already registered"
            })
        }
        const salt=await bcrypt.genSalt();
        const hashpassword=await bcrypt.hash(password,salt);
        const newUser= await user.create({
            name,
            email,
            password:hashpassword,

        })
        const token=jwt.sign({userId:newUser._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            maxAge:30*24*60*60*1000,
        })
        res.status(201).json({
message:"user created successfully",
token:token,
User:newUser,
        })
        
       
    } catch(err){
            res.status(500).json({
                message:" internal server error"
            })
        }
}

module.exports=register;