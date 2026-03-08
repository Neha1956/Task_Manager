import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const { token } = useSelector((state) => state.auth);

  const storedToken = localStorage.getItem("token");

  if (!token && !storedToken) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;