import { MdUpdate } from "react-icons/md";
import { UserType } from "../../../../slices/user/userTypes";
import { SlUserFollowing } from "react-icons/sl";

type UserInfoTypes = {
  singleUser: UserType;
};
const UserInfo = ({ singleUser }: UserInfoTypes) => {
  const { followers, following, joinedGroups, registeredDate, bio, interests } =
    singleUser;
  return (
    <ul className="flex flex-col items-start w-full">
      <li className="flex items-center gap-2 text-md">
        <MdUpdate />
        {registeredDate}
      </li>
      <li className="flex items-center gap-2 text-md">
        <SlUserFollowing />
        {following ? `${following.length} following` : "0 following"}
      </li>
      <li className="flex items-center gap-2 text-md font-semibold">
        {followers ? `${followers.length} followers` : "0 followers"}
      </li>
    </ul>
  );
};

export default UserInfo;
