import React from "react";
import {useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";

function Register() {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("") 
    const [checked,setChecked] = useState(false);
    function handleCheckboxChange() {
      setChecked(!checked);
    }
    const dispatch = useDispatch()
    const navigate=useNavigate();
    const handleRegister = async(e)=>{
        e.preventDefault()  
        const result = await dispatch(registerUser({
            name,
            email,
            password
        }));

        if (result.meta.requestStatus === "fulfilled") {
            toast.success("Registration successful");
            // registration thunk stores a token in localStorage, which
            // causes the login page's useEffect to immediately redirect to
            // "/dashboard".  remove it so the user stays on the login form
            // after signing up.
            localStorage.removeItem("token");
            navigate("/");
        } else {
            toast.error("Registration failed");
        }
    };

   
  return (
    <div className="min-h-screen  bg-gradient-to-r from-blue-500 to-purple-600 p-4">
        <h1 className="text-center font-bold p-4 text-2xl">Welcome to Task Manager </h1>
<div className="flex items-center justify-center">

      {/* Signup Card */}
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl 
                      w-full sm:w-[420px] md:w-[500px] lg:w-[600px]">

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Create your Task Manager account
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleRegister}>

          {/* Name */}
          <div>
            <label className="text-gray-600 text-sm">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-2 border rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-600 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-600 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              className="w-full mt-1 px-4 py-2 border rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

        
        

          {/* Terms */}
          <label className="flex items-center gap-2 text-sm"  onChange={handleCheckboxChange}>
            <input type="checkbox" value={checked} className="w-5 h-5 accent-blue-600" required />
            I agree to the Terms & Conditions
          </label>

          {/* Signup Button */}
          <button
          disabled={!name || !email || !password || !checked}
            className="w-full bg-blue-600 text-white py-2 rounded-lg 
            hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Sign Up
          </button>

        </form>

        {/* Login link */}
        <p className="text-center text-sm mt-5">
          Already have an account?
          <span className="text-blue-500 cursor-pointer ml-1" onClick={() => navigate("/")}>
            Login
          </span>
        </p>

      </div>
      </div>
      </div>
    
  );
}

export default Register;