import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import {
  FiHome,
  FiList,
  FiPlusCircle,
  FiLogOut,
  FiTrash2,
} from 'react-icons/fi';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import { logout } from '../redux/slices/authSlice';
import {deleteAccount} from "../redux/slices/authSlice"
import Profile from '../pages/Profile';
import { toast } from 'react-toastify';


function Sidebar() {
  const user  = useSelector((state)=>state.auth.user)
  //console.log(user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = ()=>{
    toast.success("Logout successful");
  dispatch(logout())
  navigate("/")
}



const handleDeleteAccount = async () => {

  if(!user?._id){
  alert("User not found")
  return
}

  const confirmDelete = window.confirm(
    "Are you sure you want to delete your account?"
  )

  if(!confirmDelete) return

  const result = await dispatch(deleteAccount(user._id))

  if(result.meta.requestStatus === "fulfilled"){
    toast.success("Account deleted successfully");
    navigate("/")
  }else {
    toast.error("Failed to delete account");
  }

}

  const { toggle, darkMode,setToggle } = useContext(ThemeContext);

  return (
    <nav
      className={`
        ${darkMode === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}
        w-64 min-h-screen flex flex-col p-4 fixed  top-0 left-0  z-20
        ${toggle ? "block" : "hidden md:block"}
      `}
    >

      <div className='flex justify-between'>
        <h2 className="text-2xl font-semibold mb-6">
        Task Manager
      </h2>
      <h2 className='mt-3 md:hidden' onClick={()=>setToggle(false)}>
        <FaTimes size={25} />
      </h2>
      </div>

      <div>
        <Profile/>
      </div>

      <ul className="flex-1 space-y-4">

        <li>
          <Link
            to="/dashboard"
            className="flex items-center p-2 rounded hover:bg-gray-700 hover:text-white"
          >
            <FiHome className="mr-3" />
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/manageTask"
            className="flex items-center p-2 rounded hover:bg-gray-700 hover:text-white"
          >
            <FiList className="mr-3" />
            Manage Tasks
          </Link>
        </li>

        <li>
          <Link
            to="/createTask"
            className="flex items-center p-2 rounded hover:bg-gray-700 hover:text-white"
          >
            <FiPlusCircle className="mr-3" />
            Create Task
          </Link>
        </li>

      </ul>

      <div className="space-y-4 mt-auto md:mb-0">

        <button className="w-full flex items-center p-2 rounded text-red-500 hover:bg-red-200" onClick={handleLogout}>
          <FiLogOut className="mr-3" />
          Logout
        </button>

        <button className="w-full flex items-center p-2 rounded text-red-500 hover:bg-red-200"
        onClick={handleDeleteAccount}
        >
          <FiTrash2 className="mr-3" />
          Delete Account
        </button>

      </div>

    </nav>
  );
}

export default Sidebar;