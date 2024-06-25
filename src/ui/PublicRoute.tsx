
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

const PublicRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.userData);

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default PublicRoute;
