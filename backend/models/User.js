const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        /*minlength:6 ,
        description: "password should be at least 6 characters long",
        maxlength:10,
        description: "password should be at most 10 characters long",*/
    },
    date:{
        type:Date,
        default:Date.now,
    }
    
},
{timestamps:true}
)

const user=mongoose.model("User",userSchema);
module.exports=user;