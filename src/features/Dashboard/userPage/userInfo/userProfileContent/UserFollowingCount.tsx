import { SlUserFollowing } from "react-icons/sl";

type UserFollowingCountTypes = {
  following: {
    userUid: string;
    name: string;
  }[];
};

const UserFollowingCount = ({ following }: UserFollowingCountTypes) => {
  return (
    <li className="flex items-center gap-2 text-md">
      <SlUserFollowing />
      {following ? `${following.length} following` : "0 following"}
    </li>
  );
};

export default UserFollowingCount;
