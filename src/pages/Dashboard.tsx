import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import LeftPanel from "../features/Dashboard/LeftPanel";

const Dashboard = () => {
  return (
    <main>
      <Navbar />
      <section
        className="section-center section-x"
        style={{ marginTop: "1rem" }}
      >
        <LeftPanel />
        <Outlet />
      </section>
    </main>
  );
};

export default Dashboard;
