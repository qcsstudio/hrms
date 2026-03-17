import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import DashboardComponent from "../Components/DashboardComponents/DashboardComponent";
import { setIsConfig } from "../Redux/sidebarSlice";
// import DashboardComponent from "../components/DashboardComponents/DashboardComponent";

const MainDashboardLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsConfig(location.pathname.startsWith("/config")));
  }, [dispatch, location.pathname]);

  return (
    <DashboardComponent>
      <Outlet />
    </DashboardComponent>
  );
};

export default MainDashboardLayout;
