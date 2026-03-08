const User=require("../models/User");
const jwt=require("jsonwebtoken");
const authMiddleware=async (req,res,next)=>{
  try{
      // prefer cookie, but also accept Bearer token in Authorization header
      let token = req.cookies.token;
      if(!token) {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
          token = authHeader.split(" ")[1];
        }
      }

      if(!token){
          return res.status(401).json({message:"Access denied. No token provided."});
      }

      const decodedToken= jwt.verify(token, process.env.JWT_SECRET);
      req.user=await User.findById(decodedToken.userId);
      if (!req.user) {
        return res.status(401).json({message:"User not found."});
      }

      next();
  }catch(err){
    console.error("Auth middleware error:", err);
    res.status(401).json({message:"Invalid token."});
  }     
};
module.exports=authMiddleware;