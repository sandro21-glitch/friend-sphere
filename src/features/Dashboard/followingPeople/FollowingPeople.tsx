import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import DashboardPage from "../../../ui/DashboardPage";
import FollowingPeopleHeader from "./content/FollowingPeopleHeader";
import { fetchFollowingUsers } from "../../../slices/user/userDataThunks";
import ErrorMessage from "../../../ui/ErrorMessage";
import PageDataLoader from "../../../ui/PageDataLoader";
import SingleFollowingUser from "./content/SingleFollowingUser";

const FollowingPeople = () => {
  const {
    followingUsers,
    loading: { fetchingFollowingUsers },
    error: { fetchFollowingUsersError },
  } = useAppSelector((store) => store.userData);
  const userId = useAppSelector((store) => store.auth.userData?.uid);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchFollowingUsers(userId));
    }
  }, [dispatch, userId]);

  if (fetchingFollowingUsers) return <PageDataLoader />;

  if (fetchFollowingUsersError)
    return (
      <ErrorMessage
        message={fetchFollowingUsersError || "Failed to fetch following users"}
      />
    );

  if (followingUsers === null || followingUsers.length === 0) {
    return (
      <ErrorMessage message="No followers found. Start following users to see them here." />
    );
  }
  return (
    <DashboardPage>
      <div className="flex flex-col">
        <FollowingPeopleHeader />
        <ul className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {followingUsers.map((user, index) => {
            return <SingleFollowingUser key={index} user={user} />;
          })}
        </ul>
      </div>
    </DashboardPage>
  );
};

export default FollowingPeople;
