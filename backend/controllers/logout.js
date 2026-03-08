const logout=(req,res)=>{
    try{
res.cookie("token","",{
    httpOnly:true,
    expires:new Date(0),
})
res.status(200).json({
    message:"logout successful"
})
    }catch(err){
        res.status(500).json({
            message:"server error"
        })  

    }
}
module.exports=logout;