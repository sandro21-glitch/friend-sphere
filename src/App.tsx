import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import store from "./store";
import UserProfile from "./features/Dashboard/profile/UserProfile";
import PostFeed from "./features/Dashboard/postFeed/PostFeed";
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
        element: <Dashboard />,
        children: [
          { index: true, element: <PostFeed /> },
          { path: "home", element: <PostFeed /> },
          { path: "profile", element: <UserProfile /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
