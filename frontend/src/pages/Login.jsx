import React from "react";
import {useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";

function Login() {
  const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [checked,setChecked] = useState(false);
function handleCheckboxChange() {
  setChecked(!checked);
}

const dispatch = useDispatch()
  
    const navigate=useNavigate();

  const handleLogin = async(e)=>{
  e.preventDefault()

  const result = await dispatch(loginUser({
    email,
    password
  }))

  
if(!email || !password){
  toast.error("Please fill in all fields");
  return;
}
  if(result.meta.requestStatus === "fulfilled"){
     toast.success("Login successful");
    navigate("/dashboard")
  }else {
    toast.error("Invalid email or password");
  }
}
useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard");
  }
}, [navigate]);

const handleNavigate=()=>{
  navigate("/register")
}
  return (
    <div className="min-h-screen    text-xl  bg-gradient-to-r from-blue-500 to-purple-600 p-4">
<h1 className="text-center font-bold p-4 text-2xl">Welcome to Task Manager </h1>
<div className="flex items-center justify-center">
      {/* Login Card */}
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl 
                      w-full sm:w-[420px] md:w-[500px] lg:w-[600px]">
 
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2 md:mb-4">
          Login to your Task Manager account
        </h2>

        {/* Form */}
        <form className="space-y-4 " onSubmit={handleLogin}>

          {/* Email */}
          <div className=" md:mt-10">
            <label className="text-gray-600 text-xl">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div className="md:mt-6">
            <label className="text-gray-600 text-xl">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Remember */}
          <div className="flex justify-between text-xl mt-5">
            <label className="flex items-center gap-1 ">
              <input type="checkbox"
              value={checked} 
              onChange={handleCheckboxChange}
              required className="w-5 h-5"  />
              Remember me
            </label>
          </div>

          {/* Button */}
          <button
          type="submit"
            disabled={!email || !password || !checked}
            className="w-full bg-blue-600 text-white py-2 rounded-lg 
            hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Login
          </button>

        </form>

        {/* Register */}
        <p className="text-center text-xl mt-5">
          Don't have an account?
          <span className="text-blue-500 cursor-pointer ml-1" onClick={handleNavigate}>
            Sign up
          </span>
        </p>

      </div>
      </div>
    </div>
  );
}

export default Login;