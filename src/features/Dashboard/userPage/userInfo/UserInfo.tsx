import { MdGroups, MdUpdate } from "react-icons/md";
import { UserType } from "../../../../slices/user/userTypes";
import { SlUserFollowing } from "react-icons/sl";
import { useAppSelector } from "../../../../hooks/reduxHooks";

type UserInfoTypes = {
  singleUser: UserType;
};

const UserInfo = ({ singleUser }: UserInfoTypes) => {
  const currUserGroups =
    useAppSelector((store) => store?.auth?.userData?.joinedGroups) || [];

  const {
    followers,
    following,
    joinedGroups,
    registeredDate,
    bio,
    interests,
    uid,
  } = singleUser;

  // Ensure both joinedGroups and currUserGroups are arrays
  const commonGroups = joinedGroups.filter((group) =>
    currUserGroups.some((currGroup) => currGroup.groupId === group.groupId)
  );

  const displayGroups = commonGroups.slice(0, 3);
  const remainingGroupsCount = commonGroups.length - displayGroups.length;

  const formattedGroups = displayGroups
    .map((commonG) => commonG.groupName)
    .join(", ");

  return (
    <ul className="flex flex-col items-start w-full">
      <li className="flex items-center gap-2 text-md">
        <MdUpdate />
        {registeredDate}
      </li>
      <li className="flex items-center gap-2 text-md ">
        <MdGroups />
        {joinedGroups.length > 0
          ? `${joinedGroups.length} community`
          : "Not a member of any communities"}
      </li>
      <li className="flex items-center gap-2 text-md">
        <SlUserFollowing />
        {following ? `${following.length} following` : "0 following"}
      </li>
      <li className="flex items-center gap-2 text-md font-semibold">
        {followers ? `${followers.length} followers` : "0 followers"}
      </li>
      {commonGroups.length > 0 && (
        <li className="flex items-center gap-2 text-md">
          You both are members of{" "}
          <span className="font-bold text-deep-blue cursor-pointer">
            {formattedGroups}
            {remainingGroupsCount > 0 && (
              <span className="font-medium text-gray-500">
                {" and "}
                {remainingGroupsCount} other
                {remainingGroupsCount > 1 ? "s" : ""}
              </span>
            )}
          </span>
        </li>
      )}
    </ul>
  );
};

export default UserInfo;
