import { useEffect } from "react";
import DashboardPage from "../../../ui/DashboardPage";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fetchUserById } from "../../../slices/user/userDataThunks";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../../ui/ErrorMessage";
import PageDataLoader from "../../../ui/PageDataLoader";
import UserPageHeader from "./userPageContent/UserPageHeader";
import UserInfo from "./userInfo/UserInfo";

const User = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();

  const {
    loading: { fetchingSingleUser },
    error: { fetchSingleUserError },
    singleUser,
  } = useAppSelector((store) => store.userData);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  if (fetchingSingleUser) return <PageDataLoader />;
  if (fetchSingleUserError)
    return <ErrorMessage message={fetchSingleUserError || "user not found"} />;
  if (!singleUser) return null;

  const { name, location, bio, uid, isAdmin } = singleUser;

  return (
    <DashboardPage>
      <div className="p-5 flex flex-col justify-center items-center my-10">
        <UserPageHeader
          name={name}
          location={location}
          bio={bio}
          uid={uid}
          isAdmin={isAdmin}
        />
        <UserInfo singleUser={singleUser} />
      </div>
    </DashboardPage>
  );
};

export default User;
