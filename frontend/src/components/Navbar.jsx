import React from 'react'
import { FaMoon } from 'react-icons/fa';
import { FaSun } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
//import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';     

function Navbar() {
  const { toggleSidebar,toggleTheme,darkMode } = useContext(ThemeContext);
  //console.log(toggleSidebar);
  console.log(darkMode);

  return (
   <>
   <div className={`${darkMode === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"} p-4 flex justify-between items-center shadow-md fixed top-0 w-full z-10`}>
     <div className=" hidden md:block">
      <h1 className=" text-xl font-bold">Task Manager</h1>
    </div>
    <div className='md:hidden'>
    <button className={`${darkMode==="dark"?"text-white":"text-gray-800"} hover:bg-gray-700 px-3 py-2 rounded`} onClick={toggleSidebar}>
      <FaBars size={25} />
    </button>
    
    </div>
    <div>
      {
darkMode === "dark" ? (
        <button className="text-white hover:bg-gray-700 px-3 py-2 rounded" onClick={toggleTheme}>
     
           <FaSun size={20} />
        </button>
      ) : (
        <button className="text-gray-800 hover:bg-gray-300 px-3 py-2 rounded" onClick={toggleTheme}>
              <FaMoon size={20} />
        </button>
      )
      }

    </div>
   </div>

   </>
  )
}

export default Navbar
