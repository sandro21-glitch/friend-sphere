import React from "react";

type UserFollowersCountTypes = {
  followers: {
    userUid: string;
    name: string;
  }[];
};

const UserFollowersCount: React.FC<UserFollowersCountTypes> = ({
  followers,
}) => {
  const followersArray = Object.values(followers);
  return (
    <li className="flex items-center gap-2 text-md font-semibold">
      {followersArray.length > 0
        ? `${followersArray.length} followers`
        : "0 followers"}
    </li>
  );
};

export default UserFollowersCount;
