import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRouteOrg = ({ children, userData }) => {
  // const token = localStorage.getItem("authToken");
  const { token} = useSelector((state) => state.user)


  if (!token ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRouteOrg;
