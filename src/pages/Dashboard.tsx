import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import LeftPanel from "../features/Dashboard/leftPanel/LeftPanel";
import RightPanel from "../features/Dashboard/rightPanel/RightPanel";
import Modals from "../features/Dialogs/Modals";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useEffect } from "react";
import { database } from "../config/firebase";
import { onValue, ref } from "firebase/database";
import { setUser } from "../slices/user/authSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.auth); // Assuming you have user data in Redux store

  useEffect(() => {
    const userRef = ref(database, `users/${userData?.uid}`);
    const unsubscribe = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        dispatch(setUser(snapshot.val()));
      } else {
        console.log("No data available");
      }
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [userData?.uid, dispatch]);

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
      <Modals />
    </main>
  );
};

export default Dashboard;
