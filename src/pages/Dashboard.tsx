import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import LeftPanel from "../features/Dashboard/leftPanel/LeftPanel";
import RightPanel from "../features/Dashboard/rightPanel/RightPanel";

const Dashboard = () => {
  return (
    <main className="relative bg-dashboard-bg">
      <Navbar />
      <section
        className="section-center section-x grid grid-cols-4 gap-10 min-h-screen "
        style={{ marginTop: "1rem" }}
      >
        <LeftPanel />
        <Outlet />
        <RightPanel />
      </section>
    </main>
  );
};

export default Dashboard;
