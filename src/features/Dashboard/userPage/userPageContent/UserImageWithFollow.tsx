import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";
import Tooltip from "../../../../ui/Tooltip";
import { useAppSelector } from "../../../../hooks/reduxHooks";

type UserImageWithFollowProps = {
  name: string;
  uid: string;
};

const UserImageWithFollow = ({ name, uid }: UserImageWithFollowProps) => {
  const { uid: currUserUid, following = [] } =
    useAppSelector((store) => store.auth.userData) || {};

  const isFollowing = following
    ? Object.values(following).some((follow) => follow.userUid === uid)
    : false;

  return (
    <div className="relative w-fit mb-5">
      <img
        src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
        alt="user image"
        className="w-20 h-20"
      />
      {isFollowing ? (
        <span className="absolute bottom-0 -right-3 border border-red-600 w-8 h-8 rounded-full cursor-pointer flex items-center justify-center group">
          <SlUserUnfollow className="text-red-600" />
          {/* Tooltip */}
          <Tooltip action="unfollow" message={name} />
        </span>
      ) : (
        <span className="absolute bottom-0 -right-3 border border-azure-blue w-8 h-8 rounded-full cursor-pointer flex items-center justify-center group">
          <SlUserFollow className="text-azure-blue" />
          {/* Tooltip */}
          <Tooltip action="follow" message={name} />
        </span>
      )}
    </div>
  );
};

export default UserImageWithFollow;
