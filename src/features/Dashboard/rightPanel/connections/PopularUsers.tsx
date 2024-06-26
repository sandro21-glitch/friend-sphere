import { Link } from "react-router-dom";
import ConnectButton from "../../../../ui/ConnectButton";
const tempPopUsers = [
  {
    id: 1,
    name: "Username",
    followers: 0,
  },
  {
    id: 2,
    name: "Username2",
    followers: 0,
  },
  {
    id: 3,
    name: "Username3",
    followers: 0,
  },
];

const PopularUsers = () => {
  return (
    <div>
      <h5 className="font-semibold text-[16px] mb-5">
        Popular Users to Follow
      </h5>
      <ul className="flex flex-col gap-5">
        {tempPopUsers.map((user) => {
          return (
            <li key={user.id} className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <img
                  src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
                  alt=""
                  className="w-[1.7rem] h-[1.7rem]"
                />
                <div>
                  <Link className="text-[14px] font-medium" to="/">
                    {user.name}
                  </Link>
                  <div className="text-[12px] capitalize text-gray-500">
                    followers: {user.followers}
                  </div>
                </div>
              </div>
              <ConnectButton name="follow" follow />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PopularUsers;
