import React, { useState } from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createTask } from "../../redux/slices/taskSlice";
import { ThemeContext } from "../../context/ThemeContext";
function CreateTask() {
  const { darkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();
const navigate = useNavigate();
 const [task, setTask] = useState({
  taskTitle: "",
  description: "",
  priority: "medium",
  status: "pending",
  dueDate: ""
});

  //console.log(task);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  dispatch(createTask(task));
  navigate("/dashboard");

  toast.success("Task created successfully");

  setTask({
    taskTitle: "",
    description: "",
    priority: "low",
    status: "pending",
    dueDate: ""
  });
};

  return (
    <div className={`p-6 w-full flex justify-center ${darkMode === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>

      <div className={`w-full max-w-lg ${darkMode === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} shadow-lg rounded-xl p-6`}>

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create New Task
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Task Title
            </label>
            <input
              type="text"
              name="taskTitle"
              value={task.taskTitle}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Enter task description"
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className={`w-full border p-2 rounded-lg focus:outline-none ${darkMode === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"}`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Status
            </label>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className={`w-full border p-2 rounded-lg focus:outline-none ${darkMode === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"}`}
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Create Task
          </button>

        </form>
      </div>

    </div>
  );
}

export default CreateTask;