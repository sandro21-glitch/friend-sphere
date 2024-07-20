type UserGroupTypes = {
  commonGroups: {
    groupId: string;
    groupName: string;
  }[];
};

const UserGroups = ({ commonGroups }: UserGroupTypes) => {
  const displayGroups = commonGroups.slice(0, 3);
  const remainingGroupsCount = commonGroups.length - displayGroups.length;

  const formattedGroups = displayGroups
    .map((commonG) => commonG.groupName)
    .join(", ");

  return (
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
  );
};

export default UserGroups;
