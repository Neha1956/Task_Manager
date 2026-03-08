const Task=require("../../models/Task");
const user = require("../../models/User");
const AddTask=async(req,res)=>{
    try{
        const {taskTitle,description,status,priority,dueDate}=req.body;
        if(!taskTitle){
            return res.status(400).json({
                success:false,
                message:"Task title is required"
            });
        }
        const newTask=new Task({
            userId:req.user._id,
            taskTitle,
            description,
            status,
            priority,
            dueDate
        });
        await newTask.save();
        res.status(201).json({
            success:true,
            message:"Task added successfully",
            task:newTask,
            user:await user.findById(req.user._id).select("-password")
        });


    }catch(error){  
        console.error("Error adding task:", error);
        res.status(500).json({
            success:false,
            message:"Server error"});
    }
}
module.exports={AddTask};