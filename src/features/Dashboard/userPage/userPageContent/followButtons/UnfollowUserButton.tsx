import { SlUserUnfollow } from "react-icons/sl";
import Tooltip from "../../../../../ui/Tooltip";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import { unfollowUser } from "../../../../../slices/user/userDataThunks";

type FollowUserButtonTypes = {
  name: string;
  uid: string;
};

const UnfollowUserButton = ({ name, uid }: FollowUserButtonTypes) => {
  const currentUserId = useAppSelector((store) => store.auth.userData?.uid);
  const unFollowingError = useAppSelector(
    (store) => store.userData.error?.unFollowingError
  );

  const dispatch = useAppDispatch();

  const handleUnfollowUser = async () => {
    if (uid && currentUserId) {
      try {
        await dispatch(
          unfollowUser({ currentUserId, unfollowUserId: uid })
        ).unwrap();
      } catch (error) {
        console.log(unFollowingError || "failed to unfollow user");
        alert(unFollowingError || "failed to unfollow user");
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleUnfollowUser}
      className="absolute bottom-0 -right-3 border border-red-600 w-8 h-8 rounded-full cursor-pointer flex items-center justify-center group"
    >
      <SlUserUnfollow className="text-red-600" />
      {/* Tooltip */}
      <Tooltip action="unfollow" message={name} />
    </button>
  );
};

export default UnfollowUserButton;
