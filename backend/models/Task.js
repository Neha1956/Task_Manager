const mongoose=require("mongoose");
const TaskSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    taskTitle:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:""
    },
    status:{
        type:String,
        enum:["pending","in-progress","completed"],
        default:"pending"
    },
    priority:{
        type:String,
        enum:["low","medium","high"],
        default:"medium"
    },
    dueDate:{
        type:Date
    },
    date:{
        type:Date,
        default:Date.now
    }
},
{timestamps:true}
)

const Task=mongoose.model("Task",TaskSchema);
module.exports=Task;