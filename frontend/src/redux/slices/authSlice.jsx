import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";


// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data) => {
    const res = await API.post("/users/login", data);
    return res.data;
  }
);


// REGISTER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data) => {
    const res = await API.post("/users/register", data);
    return res.data;
  }
);


// DELETE ACCOUNT
export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (userId, thunkAPI) => {
    try {

      const token = localStorage.getItem("token");
     // console.log("Token:", token);

      const res = await API.delete(
        `/users/deleteAccount/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return res.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message
      );

    }
  }
);


const authSlice = createSlice({
  name: "auth",

  initialState: {
      token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
    
    loading: false
  },

  reducers: {

    // LOGOUT
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token")
       localStorage.removeItem("user")
    }

  },

  extraReducers: (builder) => {

    // LOGIN
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
       localStorage.setItem("token", action.payload.token);
         localStorage.setItem("user", JSON.stringify(action.payload.user))
         console.log(action.payload)
    });

    // REGISTER
    builder.addCase(registerUser.fulfilled, (state, action) => {
      // registration response may include a token, but we don't
      // persist it immediately so that users can see the login page
      // and explicitly sign in.  (If you prefer auto-login, you
      // could keep this code and navigate the user straight to
      // "/dashboard" instead of "/".)
      state.user = action.payload.user;
      state.token = action.payload.token;
      // NOTE: intentionally not calling localStorage.setItem here.
      // the component is responsible for clearing/storing as needed.
    });

    // DELETE ACCOUNT
    builder.addCase(deleteAccount.fulfilled, (state) => {
      state.user = null;
      state.token = null;
        localStorage.removeItem("token")
          localStorage.removeItem("user")
    });

  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;