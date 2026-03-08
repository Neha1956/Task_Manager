const profile=async(req,res)=>{
    try{
        const user=req.user;
        if(!user){
            return res.status(404).json({
                message:"user not found"
            });
        }
        res.status(200).json({
            message:"Profile retrieved successfully",
            user
        });

    }catch(err){    
        res.status(500).json({
            message:`something went wrong ${err.message}`,
        })
    }
}
module.exports=profile;