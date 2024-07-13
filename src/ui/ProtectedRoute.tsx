import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.userData);

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;     
  }

  return <Outlet />;
};

export default ProtectedRoute;
