const Task=require("../../models/Task");
const GetAllTask=async(req,res)=>{
    try{
        const tasks=await Task.find({userId:req.user._id});
        if(tasks.length===0){
            return res.status(404).json({   
                success:false,  
                message:"No tasks found"
            });
        }
        res.status(200).json({
            success:true,
            tasks
        });
    }catch(error){
        console.error("Error fetching tasks:", error);
        res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
}
module.exports={GetAllTask};    