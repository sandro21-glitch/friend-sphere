import { Link } from "react-router-dom";

type UserProfileLinkTypes = {
  id: string;
  name: string;
  followersCount: number;
};

const UserProfileLink = ({
  followersCount,
  id,
  name,
}: UserProfileLinkTypes) => {
  return (
    <Link to={`user/${id}`} className="flex items-center gap-2">
      <img
        src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
        alt=""
        className="w-[2rem] h-[2rem]"
        loading="lazy"
      />
      <div>
        <div className="text-[16px] font-medium">{name}</div>
        <div className="text-[12px] capitalize text-gray-500">
          followers: {followersCount}
        </div>
      </div>
    </Link>
  );
};

export default UserProfileLink;
