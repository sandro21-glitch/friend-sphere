import { UserType } from "../../../../slices/user/userTypes";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import UserGroups from "./userProfileContent/UserGroups";
import UserFollowersCount from "./userProfileContent/UserFollowersCount";
import UserFollowingCount from "./userProfileContent/UserFollowingCount";
import UserGroupsCount from "./userProfileContent/UserGroupsCount";
import UserRegisterDate from "./userProfileContent/UserRegisterDate";
import UserInterestsInfo from "./userProfileContent/UserInterestsInfo";

type UserInfoTypes = {
  singleUser: UserType;
};

const UserInfo = ({ singleUser }: UserInfoTypes) => {
  const currUserGroups =
    useAppSelector((store) => store?.auth?.userData?.joinedGroups) || [];

  const {
    followers,
    following,
    joinedGroups = [],
    registeredDate,
    interests,
    name,
  } = singleUser;

  const commonGroups = joinedGroups?.filter((group) =>
    currUserGroups.some((currGroup) => currGroup.groupId === group.groupId)
  );

  return (
    <ul className="flex flex-col items-start w-full">
      <UserRegisterDate registeredDate={registeredDate} />
      <UserGroupsCount joinedGroups={joinedGroups} />
      <UserFollowingCount following={following} />
      <UserFollowersCount followers={followers} />
      {commonGroups.length > 0 ? (
        <UserGroups commonGroups={commonGroups} />
      ) : (
        <li className="text-md mb-2">You have no communities in common.</li>
      )}
      <UserInterestsInfo interests={interests} name={name} />
    </ul>
  );
};

export default UserInfo;
