import { CiLocationOn } from "react-icons/ci";

type UserIntroductionTypes = {
  name: string;
  location: string;
  bio: string;
};

const UserIntroduction = ({ location, name, bio }: UserIntroductionTypes) => {
  return (
    <div className="flex items-center flex-col">
      <h3 className="text-lg font-semibold">{name}</h3>
      <h6 className="flex items-center text-gray-500">
        <CiLocationOn />{" "}
        {location ? location : <span className="text-sm">N/A</span>}
      </h6>
      {bio ? (
        <p className="text-gray-700 mt-2 p-4 rounded-md bg-gray-100 shadow-sm italic">
          {bio}
        </p>
      ) : (
        <p className="text-gray-500 mt-2 italic">No bio available</p>
      )}
    </div>
  );
};

export default UserIntroduction;
