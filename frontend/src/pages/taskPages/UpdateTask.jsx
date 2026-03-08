import React, { useState, useEffect ,useContext} from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../../redux/slices/taskSlice";
import { toast } from "react-toastify";

import { ThemeContext } from "../../context/ThemeContext";

function UpdateTask({ task, closeModal, saveTask }) {
  const dispatch = useDispatch();
  const { darkMode } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    taskTitle: "",
    description: "",
    priority: "Low",
    status: "Pending",
    dueDate: "",
  });

  // Populate form with selected task
  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "", // convert ISO date for input
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task || !task._id) return;

    // Dispatch the updateTask action using Redux
    dispatch(updateTask({ taskId: task._id, updatedData: formData }))
      .unwrap()
      .then(() => {
        closeModal(); // close modal
        toast.success("Task updated successfully");
      })
      .catch((err) => {
        toast.error("Failed to update task. Please try again.");
        console.error("Update task error:", err);
      });
  };
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black/40 z-50 ${darkMode === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className={`w-[400px] rounded-lg p-6 shadow-lg ${darkMode === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <h2 className="text-xl font-semibold mb-4">Update Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="taskTitle"
            value={formData.taskTitle}
            onChange={handleChange}
            placeholder="Task Title"
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Task Description"
            className="w-full border p-2 rounded"
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-4 pt-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateTask;