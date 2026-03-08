import React, { useState } from "react";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
//import { useNavigate } from "react-router-dom";
import { useContext,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { ThemeContext } from "../../context/ThemeContext";
import { fetchTasks } from "../../redux/slices/taskSlice";
import { deleteTask } from "../../redux/slices/taskSlice";
import { deleteAllTasks } from "../../redux/slices/taskSlice";
import { updateTask } from "../../redux/slices/taskSlice";
import UpdateTask from "./UpdateTask";
import { toast } from "react-toastify";
function ManageTask() {
  const [selectedTask, setSelectedTask] = useState(null);
   // const navigate = useNavigate();
   /* const handleNavigate=()=>{
        navigate("/updateTask");
    }*/
    const { darkMode } = useContext(ThemeContext);

  const [search, setSearch] = useState("");
   const dispatch = useDispatch();
    
  const { tasks } = useSelector((state) => state.tasks);

useEffect(() => {
  dispatch(fetchTasks());
}, [dispatch]);

console.log(tasks);
    

 

  const filteredTasks = tasks.filter((task) =>
    task.taskTitle.toLowerCase().includes(search.toLowerCase())
  );

  

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    toast.success("Task deleted successfully");
  };
  const handleAllDelete = () => {
    dispatch(deleteAllTasks());
    window.confirm("Are you sure you want to delete all tasks?") &&
    toast.success("All tasks deleted successfully");
  };

  

  return (
    <div className={`p-6 w-full h-[100vh] ${darkMode === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>

      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Manage Tasks</h1>
<div className="flex justify-between">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-300 rounded-lg px-3 py-2 mb-6 w-full md:w-1/3">
        <FiSearch className="mr-2" color="black" />
        <input
          type="text"
          placeholder="Search tasks..."
          className="bg-transparent text-black outline-none w-full placeholder-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
      </div>

       <div>
        <button
        onClick={handleAllDelete}
          className=" text-red-500 px-4 py-2 text-sm rounded hover:bg-red-100 mb-4"
        >
          <FiTrash2 size={20} />Delete All Tasks
        </button>
      </div>
      </div>
     

      {/* Task Cards */}
      <div className={`grid md:grid-cols-3 sm:grid-cols-2 gap-6 ${darkMode === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}>

        {filteredTasks.map((task) => (
          <div
            key={task._id}
            
            className={`${darkMode === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"} shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition`}
          >

            {/* Title */}
            <h2 className="text-lg font-semibold">{task.taskTitle}</h2>

            {/* Description */}
            <p className=" text-sm mt-2">
              {task.description}
            </p>

            {/* Dates */}
            <div className="text-xs mt-2 text-gray-500">
              <p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>
              <p>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</p>
            </div>

            {/* Priority */}
            <span className="text-xs mt-3 inline-block bg-blue-100 text-blue-600 px-2 py-1 rounded">
              {task.priority}
            </span>
              {/* Status */}
            <span className="text-xs ml-5 mt-3 inline-block bg-blue-100 text-blue-600 px-2 py-1 rounded">
              {task.status}
            </span>

            {/* Buttons */}
            <div
              className="flex justify-between  mt-4"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                onClick={() => setSelectedTask(task)}
              //  onClick={handleNavigate}
                className="text-blue-500 hover:text-blue-700"
              >
                <FiEdit size={18} />
              </button>

              <button
                onClick={() => handleDelete(task._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash2 size={18} />
              </button>

            </div>
          </div>

          
        ))}
{selectedTask && (
  <UpdateTask
    task={selectedTask} // pass the selected task
    closeModal={() => setSelectedTask(null)}
    saveTask={(updatedTask) => {
      // Use selectedTask._id to make sure correct ID is sent
      dispatch(updateTask({ id: selectedTask._id, data: updatedTask }))
        .unwrap()
        .then(() => {
          setSelectedTask(null); // close modal
          toast.success("Task updated successfully");
        })
        .catch((err) => {
          toast.error("Failed to update task");
          console.error("Update task error:", err);
        });
    }}
  />
)}
        

        {filteredTasks.length === 0 && (
          <p className="text-center col-span-full">
            No tasks found. Please add some tasks.
          </p>
        )}

      </div>
    </div>
  );
}

export default ManageTask;