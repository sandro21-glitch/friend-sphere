import { GoLocation } from "react-icons/go";
import { FollowingUser } from "../../../../slices/user/userTypes";
import { Link } from "react-router-dom";

type SingleFollowingUserTypes = {
  user: FollowingUser;
};

const SingleFollowingUser = ({
  user: { location, name, registeredDate, uid },
}: SingleFollowingUserTypes) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <li>
      <Link
        to={`/user/${uid}`}
        className="bg-white w-full border p-4 rounded-md cursor-pointer block"
      >
        <div className="flex items-center mb-2">
          <img
            src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
            alt="user image"
            className="w-[3rem] h-[3rem] mr-2"
            loading="lazy"
          />
          <div>
            <h2 className="text-[1.1rem] font-semibold mb-1">{name}</h2>
            <p className="text-[.8rem] flex items-center gap-1 text-gray-500 italic">
              <GoLocation />
              {location || "Location not added"}
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold text-gray-500">Joined on</p>
          <p className="text-gray-500">{formatDate(registeredDate)}</p>
        </div>
      </Link>
    </li>
  );
};

export default SingleFollowingUser;
