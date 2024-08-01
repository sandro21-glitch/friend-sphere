import React from "react";
import { useAppSelector } from "../../../../../hooks/reduxHooks";

type UserFollowersCountTypes = {
  followers: {
    userUid: string;
    name: string;
  }[];
};

const UserFollowersCount: React.FC<UserFollowersCountTypes> = ({
  followers = [],
}) => {
  const { uid: currUserUid } =
    useAppSelector((store) => store.auth.userData) || {};

  const followersArray = Object.values(followers);

  const isUserFollowedByCurrUser = followersArray.some(
    (user) => user.userUid === currUserUid
  );

  // Generate the message based on follower count and whether the current user is following
  const generateFollowerMessage = () => {
    const followerCount = followersArray.length;

    if (followerCount === 0) {
      return "0 followers";
    }

    if (isUserFollowedByCurrUser) {
      const othersCount = followerCount - 1;
      return `Followed by you${
        othersCount > 0
          ? ` and ${othersCount} other${othersCount > 1 ? "s" : ""}`
          : ""
      }`;
    }

    return `${followerCount} follower${followerCount > 1 ? "s" : ""}`;
  };

  return (
    <li className="flex items-center gap-2 text-md font-semibold">
      {generateFollowerMessage()}
    </li>
  );
};

export default UserFollowersCount;
