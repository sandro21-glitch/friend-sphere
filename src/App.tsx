import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import PostFeed from "./features/Dashboard/rightPanel/PostFeed";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "signin",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <RegisterPage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [{ index: true, element: <PostFeed /> }],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
