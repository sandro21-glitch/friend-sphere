import { SlUserFollowing } from "react-icons/sl";

type UserFollowingCountTypes = {
  following: {
    userUid: string;
    name: string;
  }[];
};

const UserFollowingCount = ({ following = [] }: UserFollowingCountTypes) => {
  const followingsArray = Object.values(following);

  return (
    <li className="flex items-center gap-2 text-md">
      <SlUserFollowing />
      {followingsArray ? `${followingsArray.length} following` : "0 following"}
    </li>
  );
};

export default UserFollowingCount;
