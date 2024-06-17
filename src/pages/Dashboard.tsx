import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import LeftPanel from "../features/Dashboard/LeftPanel";

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
        <div className="bg-red-900 col-span-1 h-[85vh] sticky top-[5rem] border">
          right
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
