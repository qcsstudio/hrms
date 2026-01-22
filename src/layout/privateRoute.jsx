import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, userData }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
