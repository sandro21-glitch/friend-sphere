import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";

const Dashboard = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Dashboard;
