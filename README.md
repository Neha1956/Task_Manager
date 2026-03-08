# Task Manager

This repository is a full-stack task management application featuring a React/Vite frontend and an Express/MongoDB backend. Users can register, log in, and perform CRUD operations on their personal tasks. Each account only sees its own tasks thanks to JWT authentication.

---

## 📁 Project Structure

```
backend/
  db.js                 # MongoDB connection
  index.js              # Express server entry
  package.json
  controllers/          # request handlers
    deleteAccount.js
    login.js
    logout.js
    profile.js
    register.js
    TaskControllers/    # task-specific controllers
      AddTask.js
      DeleteAllTask.js
      DeleteTaskById.js
      GetAllTask.js
      GetTaskById.js
      updateTask.js
  middleware/
    authMiddleware.js   # JWT verification
  models/
    Task.js
    User.js
  routes/
    TaskRoutes.js
    usersRoutes.js

frontend/
  package.json
  vite.config.js
  public/
  src/
    api/axios.jsx       # axios instance with baseURL and withCredentials
    components/         # Navbar, Sidebar, ProtectedRoute, etc.
    context/ThemeContext.jsx
    pages/              # Login, Register, Dashboard, task pages
    redux/              # store and slices (authSlice, taskSlice)
    assets/

```

---

## 🚀 Getting Started

### Backend
1. Navigate to `backend/`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with at least:
   ```env
   MONGO_URI=<your mongo connection string>
   JWT_SECRET=<your jwt secret>
   ```
4. Start the server:
   ```bash
   npm run dev      # or node index.js
   ```
   The API will listen on `http://localhost:5000/api` by default.

### Frontend
1. From the project root or `frontend/`:
   ```bash
   cd frontend
   npm install
   ```
2. Ensure the backend is running and update `VITE_API_URL` in `.env` if necessary.
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` (or the port shown by Vite).

---

## 🔐 Authentication Flow

- **Registration**: `/users/register` returns a token but the frontend clears it so users can manually log in.
- **Login**: `/users/login` sets an HTTP-only cookie and returns a token/user. Frontend persists token in `localStorage` and dispatches Redux state.
- **Protected routes**: `authMiddleware` reads a token from either the cookie or an `Authorization: Bearer` header and populates `req.user`.
- **Logout**: `/users/logout` clears the cookie from the server.

The React app uses Redux Toolkit for state management; `authSlice` and `taskSlice` provide async thunks for API interaction.

---



## 🧠 Frontend Behavior

- **Routes** configured via React Router; protected views wrap content with `ProtectedRoute` which checks Redux state.
- **Task management**: Users can create, search, edit, delete individual tasks or clear all tasks. UI updates are handled via Redux state and async thunks.
- **Themes**: Light/dark support through `ThemeContext`.
- **Form validation**: Simple field checks and disables buttons until inputs are complete.

---

## 🛠 Notes & Tips

- Make sure CORS and cookie `SameSite=None; Secure` settings are correct if you need cross‑origin auth.
- Store secrets securely in production and enable HTTPS.
- Error messages from the backend are propagated via `toast` notifications.

---

## 📄 Existing README

The `frontend/README.md` contains the default Vite template documentation; it's not used in the actual task manager logic.


---

Feel free to extend or restructure this README as the project evolves!