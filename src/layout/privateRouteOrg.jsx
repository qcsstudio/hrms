import { useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";

const PrivateRouteOrg = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const [searchParams] = useSearchParams();

  const inviteToken = searchParams.get("token");


  if (!token && !inviteToken) {
    return <Navigate to="/" replace />;
  }

  // ✅ token ho ya invite token
  return children;
};

export default PrivateRouteOrg;
