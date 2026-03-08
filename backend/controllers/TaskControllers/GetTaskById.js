const Task=require("../../models/Task");
const GetTaskById=async(req,res)=>{
    try{
        const taskId=req.params.id;
        const task=await Task.findOne({_id:taskId,userId:req.user._id});
        if(!task){
            return res.status(404).json({           
                success:false,
                message:"Task not found"
            });
        }       
        res.status(200).json({
            success:true,
            task
        });
    }catch(error){
        console.error("Error fetching task:", error);
        res.status(500).json({      
            success:false,
            message:"Server error"
        });
    }
}
module.exports={GetTaskById};
