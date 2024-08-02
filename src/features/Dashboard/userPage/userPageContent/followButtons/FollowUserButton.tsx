import { SlUserUnfollow } from "react-icons/sl";
import Tooltip from "../../../../../ui/Tooltip";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import { followUser } from "../../../../../slices/user/userDataThunks";

type FollowUserButtonTypes = {
  name: string;
  uid: string;
};

const FollowUserButton = ({ name, uid }: FollowUserButtonTypes) => {
  const { uid: currUserUid, name: currUserName } =
    useAppSelector((store) => store.auth.userData) || {};

  const {
    error: { followingError },
  } = useAppSelector((store) => store.userData);

  const dispatch = useAppDispatch();

  const handleFollowUser = async () => {
    if (currUserUid && currUserName) {
      try {
        await dispatch(
          followUser({
            currentUserId: currUserUid,
            currentUserName: currUserName,
            followUserId: uid,
            followUserName: name,
          })
        ).unwrap();
      } catch (error) {
        console.log(followingError || "failed to follow user");
        alert(followingError || "failed to follow user");
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleFollowUser}
      className="absolute bottom-0 -right-3 border border-red-600 w-8 h-8 rounded-full cursor-pointer flex items-center justify-center group"
    >
      <SlUserUnfollow className="text-red-600" />
      {/* Tooltip */}
      <Tooltip action="unfollow" message={name} />
    </button>
  );
};

export default FollowUserButton;
