import { useAppSelector } from "../../../../hooks/reduxHooks";
import FollowUserButton from "./followButtons/FollowUserButton";
import UnfollowUserButton from "./followButtons/UnfollowUserButton";

type UserImageWithFollowProps = {
  name: string;
  uid: string;
};

const UserImageWithFollow = ({ name, uid }: UserImageWithFollowProps) => {
  const { following = [] } =
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
        loading="lazy"
      />
      {isFollowing ? (
        <UnfollowUserButton name={name} uid={uid} />
      ) : (
        <FollowUserButton name={name} uid={uid} />
      )}
    </div>
  );
};

export default UserImageWithFollow;
