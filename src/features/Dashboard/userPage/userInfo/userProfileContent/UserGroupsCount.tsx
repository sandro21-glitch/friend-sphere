import { MdGroups } from "react-icons/md";

type UserGroupsCountTypes = {
  joinedGroups: {
    groupId: string;
    groupName: string;
  }[];
};

const UserGroupsCount = ({joinedGroups}:UserGroupsCountTypes) => {
  return (
    <li className="flex items-center gap-2 text-md ">
      <MdGroups />
      {joinedGroups.length > 0
        ? `${joinedGroups.length} community`
        : "Not a member of any communities"}
    </li>
  );
};

export default UserGroupsCount;
