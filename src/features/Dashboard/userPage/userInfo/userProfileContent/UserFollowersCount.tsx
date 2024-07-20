
type UserFollowersCountTypes = {
  followers: {
    userUid: string;
    name: string;
  }[];
};

const UserFollowersCount = ({ followers }: UserFollowersCountTypes) => {
  return (
    <li className="flex items-center gap-2 text-md font-semibold">
      {followers ? `${followers.length} followers` : "0 followers"}
    </li>
  );
};

export default UserFollowersCount;
