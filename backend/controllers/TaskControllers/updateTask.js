const Task=require("../../models/Task");
const updateTask=async(req,res)=>{
    try{
        const taskId=req.params.id;
        const {taskTitle,description,status,priority,dueDate}=req.body;
        const task=await Task.findOne({_id:taskId,userId:req.user._id});
        if(!task){
            return res.status(404).json({   
                success:false,
                message:"Task not found"
            });
        }       
        task.taskTitle=taskTitle||task.taskTitle;
        task.description=description||task.description;
        task.status=status||task.status;    
        task.priority=priority||task.priority;
        task.dueDate=dueDate||task.dueDate;
        await task.save();
        res.status(200).json({
            success:true,
            message:"Task updated successfully",
            task
        });
    }
    catch(error){
        console.error("Error updating task:", error);
        res.status(500).json({  
            success:false,
            message:"Server error"


        } );
    }   
}
module.exports={updateTask};