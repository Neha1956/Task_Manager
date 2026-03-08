const express = require("express");
const connectDB=require("./db");
const dotenv = require("dotenv");
const usersRoutes=require("./routes/usersRoutes");
const TaskRoutes=require("./routes/TaskRoutes");
const { urlencoded } = require("body-parser");
const cors=require("cors");
const cookieParser=require("cookie-parser");
dotenv.config();
connectDB(process.env.MONGO_URL);
const PORT=process.env.PORT;
const app=express();
app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_URL || "http://localhost:5173",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"],
    credentials:true
}));
app.use(express.json());
app.use(urlencoded({extended:true}));

//endpoints
app.use("/api/users",usersRoutes);
app.use("/api/tasks",TaskRoutes);



app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
})