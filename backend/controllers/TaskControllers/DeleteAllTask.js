const Task=require("../../models/Task");
const DeleteAllTask=async(req,res)=>{
    try{
        await Task.deleteMany({userId:req.user._id});
        res.status(200).json({
            success:true,
            message:"All tasks deleted successfully"
        });
    }
    catch(error){
        console.error("Error deleting tasks:", error);
        res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
}
module.exports={DeleteAllTask};