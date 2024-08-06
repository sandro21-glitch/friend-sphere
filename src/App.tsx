import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import store from "./store";
import UserProfile from "./features/Dashboard/profile/UserProfile";
import PostFeed from "./features/Dashboard/postFeed/PostFeed";
import ProtectedRoute from "./ui/ProtectedRoute";
import PublicRoute from "./ui/PublicRoute";
import Community from "./features/Dashboard/communities/Community";
import SingleComunityPage from "./features/Dashboard/singleCommunityFeed/SingleComunityPage";
import PostComments from "./features/Dashboard/postComments/PostComments";
import SavedPosts from "./features/Dashboard/saved/SavedPosts";
import User from "./features/Dashboard/userPage/User";
import FollowingPeople from "./features/Dashboard/followingPeople/FollowingPeople";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    children: [
      {
        element: <PublicRoute />,
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
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
            children: [
              { index: true, element: <PostFeed /> },
              { path: "home", element: <PostFeed /> },
              { path: "profile", element: <UserProfile /> },
              { path: "communities", element: <Community /> },
              {
                path: "community/:communityName",
                element: <SingleComunityPage />,
              },
              {
                path: "post/:postId",
                element: <PostComments />,
              },
              {
                path: "saved",
                element: <SavedPosts />,
              },
              {
                path: "user/:userId",
                element: <User />,
              },
              {
                path: "following",
                element: <FollowingPeople />,
              },
            ],
          },
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
