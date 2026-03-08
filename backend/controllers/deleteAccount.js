const user=require("../models/User");

const deleteAccount=async(req,res)=>{
  try{
    const userId=req.params.id;

    if(req.user._id.toString() !== userId){
      return res.status(403).json({
        message:"you are not authorized to delete this account"
      });
    }

    const deleteUser=await user.findByIdAndDelete(userId);

    if(!deleteUser){
      return res.status(404).json({
        message:"user not found"
      });
    }

    // Clear the authentication cookie to log out the user
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({
      message:"account deleted successfully"
    })

  }catch(err){
    res.status(500).json({
      message:`something went wrong: ${err.message}`,
    })
  }
}

module.exports=deleteAccount;