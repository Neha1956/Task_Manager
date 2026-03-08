import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute"; 
import {ToastContainer} from "react-toastify"
import { BrowserRouter, Routes,Route} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ManageTask from "./pages/taskPages/ManageTask";
import UpdateTask from "./pages/taskPages/UpdateTask";
import CreateTask from "./pages/taskPages/CreateTask";
function App(){
  return(
    <>
    <ToastContainer />
      
    <BrowserRouter>
    <Routes>
     
      <Route path="/" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
        {/* Dashboard layout */}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />

            <div className="flex">
              <div className="">
                <Sidebar />
              </div>
              <div className="flex-1 md:ml-64 md:mt-10 md:pl-2">
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </div>
             </div>
              </>
          }
          />
           
            {/* Manage task layout */}
        <Route
          path="/manageTask"
          element={
            <>
              <Navbar />

            <div className="flex">
              <div className="">
                <Sidebar />
              </div>
              <div className="flex-1 md:ml-64 md:mt-15 md:pl-2">
                <ManageTask/>
              </div>
             </div>
             
           
             
            </>
          }
        />
        
            {/* Create task layout */}
        <Route
          path="/createTask"
          element={
            <>
              <Navbar />

            <div className="flex">
              <div className="">
                <Sidebar />
              </div>
              <div className="flex-1 md:ml-64 mt-10 md:mt-15 md:pl-2">
                <CreateTask/>
              </div>
             </div>
             
           
             
            </>
          }
        />
        <Route path="/updateTask" element={<UpdateTask/>}/>

    </Routes>
    
     
    </BrowserRouter>
    </>
  )
}
export default App;

  

