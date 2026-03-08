import React from "react";
import { useContext,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { ThemeContext } from "../context/ThemeContext";
import { fetchTasks } from "../redux/slices/taskSlice";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";





const COLORS = ["#facc15", "#3b82f6", "#22c55e"];

function Dashboard() {
  const dispatch = useDispatch();
  
  useEffect(()=>{
  dispatch(fetchTasks())
   console.log(tasks);
  
},[dispatch])
 const { tasks } = useSelector((state) => state.tasks);
 
  

 
    const{ darkMode }=useContext(ThemeContext);
     const totalTasks = tasks.length;
     const pendingTasks = tasks.filter(
  (task) => task.status === "pending"
);

const inProgressTasks = tasks.filter(
  (task) => task.status === "in-progress"
);

const completedTasks = tasks.filter(
  (task) => task.status === "completed"
);


const statusData = [
  { name: "Pending", value: pendingTasks.length },
  { name: "In Progress", value: inProgressTasks.length },
  { name: "Completed", value: completedTasks.length },
];

const highPriority = tasks.filter(
  (task) => task.priority === "high"
);

const mediumPriority = tasks.filter(
  (task) => task.priority === "medium"
);

const lowPriority = tasks.filter(
  (task) => task.priority === "low"
);

const priorityData = [
  { name: "High", tasks: highPriority.length },
  { name: "Medium", tasks: mediumPriority.length },
  { name: "Low", tasks: lowPriority.length },
];
  return (
    <div className={`${darkMode==="dark"?"bg-gray-800 text-white":"bg-gray-100 text-black"} w-full p-6 bg-gray-100 min-h-screen`}>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Task Dashboard</h1>

      {/* Cards */}
       {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        {/* Total */}
        <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg">Total Tasks</h2>
          <p className="text-3xl font-bold">{totalTasks}</p>
        </div>

        <div className="bg-yellow-400 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg">Pending Tasks</h2>
          <p className="text-3xl font-bold">{pendingTasks.length}</p>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg">In Progress</h2>
          <p className="text-3xl font-bold">{inProgressTasks.length}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg">Completed</h2>
          <p className="text-3xl font-bold">{completedTasks.length}</p>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Status Chart */}
        <div className={`${darkMode==="dark"?"bg-gray-700 text-white":"bg-white text-black"} p-6 rounded-xl shadow-md flex flex-col items-center justify-center`}>

          <h2 className="text-xl font-semibold mb-4">
            Task Status
          </h2>

          <div className="flex justify-center">

            <PieChart width={350} height={300}>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>

          </div>

        </div>

        {/* Priority Chart */}
        <div className={`${darkMode==="dark"?"bg-gray-700 text-white":"bg-white text-black"} p-6 rounded-xl shadow-md flex flex-col items-center justify-center`}>

          <h2 className="text-xl font-semibold mb-4">
            Task Priority
          </h2>

          <BarChart width={350} height={300} data={priorityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="tasks" fill="#6366f1" />
          </BarChart>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;