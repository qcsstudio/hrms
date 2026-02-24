import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, userData }) => {
  const token = localStorage.getItem("authToken");
  // const { token} = useSelector((state) => state.user)

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
