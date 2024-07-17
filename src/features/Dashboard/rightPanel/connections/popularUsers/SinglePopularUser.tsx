import { Link } from "react-router-dom";
import { TopUserTypes } from "../../../../../slices/user/userTypes";
import ConnectButton from "../../../../../ui/ConnectButton";

type SinglePopularUserTypes = {
  user: TopUserTypes;
};
const SinglePopularUser = ({ user }: SinglePopularUserTypes) => {
  const { followersCount, name, id } = user;
  return (
    <li className="flex justify-between items-start">
      <div className="flex items-center gap-2">
        <img
          src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
          alt=""
          className="w-[2rem] h-[2rem]"
        />
        <div>
          <Link className="text-[16px] font-medium" to={`user/${id}`}>
            {name}
          </Link>
          <div className="text-[12px] capitalize text-gray-500">
            followers: {followersCount}
          </div>
        </div>
      </div>
      <ConnectButton name="follow" follow />
    </li>
  );
};

export default SinglePopularUser;