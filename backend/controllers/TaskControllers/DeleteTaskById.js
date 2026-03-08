const Task=require("../../models/Task");
const DeleteTaskById=async(req,res)=>{
    try{
        const taskId=req.params.id;     
        const task=await Task.findOneAndDelete({_id:taskId,userId:req.user._id});
        if(!task){
            return res.status(404).json({   
                success:false,
                message:"Task not found"
            });
        }
        res.status(200).json({
            success:true,
            message:"Task deleted successfully"
        });
    }
    catch(error){
        console.error("Error deleting task:", error);
        res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
}
module.exports={DeleteTaskById};