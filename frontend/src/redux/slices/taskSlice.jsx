import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";


// CREATE TASK
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (data, thunkAPI) => {
    try {

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/tasks/AddTask",
        data,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      return res.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create task"
      );

    }
  }
);



// FETCH ALL TASKS
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, thunkAPI) => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get(
        "/tasks/GetAllTask",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
   console.log(res.data); 
      return res.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch tasks"
      );

    }
  }
);



// GET TASK BY ID
export const getTaskById = createAsyncThunk(
  "tasks/getTaskById",
  async (taskId, thunkAPI) => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get(
        `/tasks/${taskId}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      return res.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch task"
      );

    }
  }
);



// UPDATE TASK
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, updatedData }, thunkAPI) => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.put(
        `/tasks/updateTask/${taskId}`,
        updatedData,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      return res.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update task"
      );

    }
  }
);



// DELETE TASK
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, thunkAPI) => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(
        `/tasks/DeleteTaskById/${taskId}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      return taskId;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete task"
      );

    }
  }
);

// delete ALL TASKS
export const deleteAllTasks = createAsyncThunk(
  "tasks/deleteAllTasks",
  async (_, thunkAPI) => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.delete(
        "/tasks/DeleteAllTask",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
   console.log(res.data); 
      return res.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch tasks"
      );

    }
  }
);



const taskSlice = createSlice({

  name: "tasks",

  initialState:{
    tasks:[],
    selectedTask:null,
    loading:false,
    error:null
  },

  reducers:{},

  extraReducers:(builder)=>{


    // FETCH TASKS
    builder
      .addCase(fetchTasks.pending,(state)=>{
        state.loading=true
      })
      .addCase(fetchTasks.fulfilled,(state,action)=>{
        state.loading=false
        state.tasks=action.payload.tasks
      })
      .addCase(fetchTasks.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
      })


    // CREATE TASK
    builder.addCase(createTask.fulfilled,(state,action)=>{
      state.tasks.push(action.payload)
    })


    // GET TASK BY ID
    builder
      .addCase(getTaskById.pending,(state)=>{
        state.loading=true
      })
      .addCase(getTaskById.fulfilled,(state,action)=>{
        state.loading=false
        state.selectedTask=action.payload
      })
      .addCase(getTaskById.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
      })


    // UPDATE TASK
    builder.addCase(updateTask.fulfilled,(state,action)=>{

      const updatedTask = action.payload.task;
      const index = state.tasks.findIndex(
        (task)=>task._id === updatedTask._id
      )

      if(index !== -1){
        state.tasks[index] = updatedTask
      }

    })


    // DELETE TASK
    builder.addCase(deleteTask.fulfilled,(state,action)=>{
      state.tasks = state.tasks.filter(
        (task)=>task._id !== action.payload
      )
    })

    // DELETE ALL TASKS
    builder.addCase(deleteAllTasks.fulfilled,(state)=>{
      state.tasks = []
    })


  }

});

export default taskSlice.reducer;