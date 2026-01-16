
import { Outlet } from "react-router-dom";
import DashboardComponent from "../Components/DashboardComponents/DashboardComponent";
// import DashboardComponent from "../components/DashboardComponents/DashboardComponent";

const MainDashboardLayout = () => {

  return (
    <DashboardComponent>
      <Outlet />
    </DashboardComponent>
  );
};

export default MainDashboardLayout;
