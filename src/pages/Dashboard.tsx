import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../ui/Navbar";
import LeftPanel from "../features/Dashboard/leftPanel/LeftPanel";
import RightPanel from "../features/Dashboard/rightPanel/RightPanel";
import Modals from "../features/Dialogs/Modals";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useEffect, useRef } from "react";
import { database } from "../config/firebase";
import { onValue, ref } from "firebase/database";
import { setUser } from "../slices/user/authSlice";
import { fetchNonJoinedCommunities } from "../slices/community/communityThunks";
import { UserData, UserType } from "../slices/user/userTypes";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (userData?.uid) {
      const userRef = ref(database, `users/${userData.uid}`);
      const unsubscribe = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val() as UserData;
          const { password, ...filteredUserData } = userData;

          dispatch(setUser(filteredUserData as UserType));
        } else {
          console.log("No data available");
        }
      });

      return () => unsubscribe();
    }
  }, [userData?.uid, dispatch]);

  // fetch non-joined communities when path changes but avoid unnecessary fetches
  useEffect(() => {
    if (userData?.uid) {
      const currentPath = location.pathname;

      if (prevPathRef.current !== currentPath) {
        dispatch(fetchNonJoinedCommunities(userData.uid));
        prevPathRef.current = currentPath;
      }
    }
  }, [location.pathname, userData?.uid, dispatch]);

  return (
    <main className="relative bg-dashboard-bg">
      <Navbar />
      <section
        className="section-center section-x grid grid-cols-4 gap-10"
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
