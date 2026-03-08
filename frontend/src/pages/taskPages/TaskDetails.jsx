//no in use yet, just a placeholder for future task details page implementation


import React from "react";
import { FiArrowLeft, FiEdit, FiTrash2, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";

function TaskDetails() {

  const task = {
    title: "Complete React Project",
    description: "Finish the task manager dashboard UI and connect backend APIs.",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-03-15",
    createdAt: "2026-03-01"
  };

  return (
    <div className="p-6 flex justify-center w-full">

      <div className="max-w-2xl w-full bg-white shadow-lg rounded-xl p-6">

        {/* Back Button */}
        <Link
          to="/tasks"
          className="flex items-center text-blue-500 mb-4 hover:underline"
        >
          <FiArrowLeft className="mr-2" />
          Back to Tasks
        </Link>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">{task.title}</h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">{task.description}</p>

        {/* Task Info */}
        <div className="grid md:grid-cols-2 gap-4">

          <div className="bg-gray-100 p-3 rounded">
            <p className="text-sm text-gray-500">Priority</p>
            <p className="font-semibold">{task.priority}</p>
          </div>

          <div className="bg-gray-100 p-3 rounded">
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-semibold">{task.status}</p>
          </div>

          <div className="bg-gray-100 p-3 rounded flex items-center">
            <FiCalendar className="mr-2 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Due Date</p>
              <p className="font-semibold">{task.dueDate}</p>
            </div>
          </div>

          <div className="bg-gray-100 p-3 rounded">
            <p className="text-sm text-gray-500">Created At</p>
            <p className="font-semibold">{task.createdAt}</p>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">

          <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <FiEdit className="mr-2" />
            Update
          </button>

          <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            <FiTrash2 className="mr-2" />
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default TaskDetails;